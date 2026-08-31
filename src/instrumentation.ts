export async function register() {
  // PostHog server client is created lazily in src/lib/posthog-server.ts
}

export const onRequestError = async (
  err: Error,
  request: {
    path: string;
    method: string;
    headers: Record<string, string | string[] | undefined>;
  },
) => {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { captureException, flushPostHog, getDistinctIdFromRequest } =
    await import("@/lib/posthog-server");

  const distinctId =
    getDistinctIdFromRequest({ headers: request.headers }) ?? undefined;

  captureException(err, distinctId, {
    source: "next_on_request_error",
    path: request.path,
    method: request.method,
  });

  await flushPostHog();
};
