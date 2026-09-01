import "server-only";

import { PostHog } from "posthog-node";

import { ANALYTICS_APP, getPostHogHost, getPostHogToken } from "@/lib/posthog-config";

type AnalyticsProperties = Record<
  string,
  string | number | boolean | null | undefined
>;

let posthogClient: PostHog | null = null;

export function getPostHogServer() {
  const token = getPostHogToken();
  const host = getPostHogHost();

  if (!token || !host) {
    return null;
  }

  if (!posthogClient) {
    posthogClient = new PostHog(token, {
      host,
      flushAt: 1,
      flushInterval: 0,
    });
  }

  return posthogClient;
}

export function captureEvent(input: {
  distinctId: string;
  event: string;
  properties?: AnalyticsProperties;
}) {
  try {
    const client = getPostHogServer();
    if (!client) return;

    client.capture({
      distinctId: input.distinctId,
      event: input.event,
      properties: {
        ...compactProperties(input.properties),
        app: ANALYTICS_APP,
      },
    });
  } catch {
    // analytics must never break the product
  }
}

export function captureException(
  error: unknown,
  distinctId?: string,
  properties?: AnalyticsProperties,
) {
  try {
    const client = getPostHogServer();
    if (!client) return;

    client.captureException(error, distinctId, {
      ...compactProperties(properties),
      app: ANALYTICS_APP,
    });
  } catch {
    // analytics must never break the product
  }
}

export async function flushPostHog() {
  try {
    const client = getPostHogServer();
    if (!client) return;
    await client.flush();
  } catch {
    // analytics must never break the product
  }
}

export function getDistinctIdFromRequest(input: {
  headers: Headers | Record<string, string | string[] | undefined>;
}) {
  const headers = normalizeRequestHeaders(input.headers);
  if (headers.distinctId) return headers.distinctId;

  const token = getPostHogToken();
  if (!headers.cookie || !token) return null;

  return parsePostHogDistinctId(headers.cookie, token);
}

function joinHeader(value: string | string[] | undefined) {
  if (!value) return null;
  return Array.isArray(value) ? value.join("; ") : value;
}

function normalizeRequestHeaders(
  headers: Headers | Record<string, string | string[] | undefined>,
) {
  if (typeof (headers as Headers).get === "function") {
    const requestHeaders = headers as Headers;
    return {
      cookie: requestHeaders.get("cookie"),
      distinctId: requestHeaders.get("x-posthog-distinct-id"),
    };
  }

  const record = headers as Record<string, string | string[] | undefined>;

  return {
    cookie: joinHeader(record.cookie),
    distinctId: joinHeader(
      record["x-posthog-distinct-id"] ?? record["X-POSTHOG-DISTINCT-ID"],
    ),
  };
}

function parsePostHogDistinctId(cookieHeader: string, token: string) {
  const cookieName = `ph_${token}_posthog=`;
  const parts = cookieHeader.split(";");

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed.startsWith(cookieName)) continue;

    try {
      const decoded = decodeURIComponent(trimmed.slice(cookieName.length));
      const parsed = JSON.parse(decoded) as { distinct_id?: unknown };
      return typeof parsed.distinct_id === "string" ? parsed.distinct_id : null;
    } catch {
      return null;
    }
  }

  return null;
}

function compactProperties(properties?: AnalyticsProperties) {
  if (!properties) return undefined;

  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined),
  );
}
