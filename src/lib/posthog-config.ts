export const ANALYTICS_APP = "landing" as const;

export const POSTHOG_PROXY_PATH = "/ingest";

export function getPostHogToken() {
  return process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim();
}

export function getPostHogHost() {
  return process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim();
}

export function getPostHogUiHost(ingestHost?: string) {
  const host = ingestHost ?? getPostHogHost() ?? "";
  return host.includes("eu.")
    ? "https://eu.posthog.com"
    : "https://us.posthog.com";
}
