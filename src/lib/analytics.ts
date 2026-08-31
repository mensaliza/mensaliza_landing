"use client";

import posthog from "posthog-js";

export type AnalyticsProperties = Record<string, unknown>;

export function captureEvent(event: string, properties?: AnalyticsProperties) {
  try {
    posthog.capture(event, properties);
  } catch {
    // analytics must never break the product
  }
}

export function captureClientException(
  error: unknown,
  properties?: AnalyticsProperties,
) {
  try {
    posthog.captureException(error, properties);
  } catch {
    // analytics must never break the product
  }
}

export function captureClientLog(
  body: string,
  level: "info" | "warn" | "error" = "info",
  attributes?: Record<string, string | number | boolean>,
) {
  try {
    posthog.captureLog({ body, level, attributes });
  } catch {
    // analytics must never break the product
  }
}
