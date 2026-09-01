import posthog from "posthog-js";

import {
  ANALYTICS_APP,
  POSTHOG_PROXY_PATH,
  POSTHOG_TRACING_HEADERS,
  getPostHogHost,
  getPostHogToken,
  getPostHogUiHost,
} from "@/lib/posthog-config";

const POSTHOG_TOKEN = getPostHogToken();
const POSTHOG_HOST = getPostHogHost();

if (POSTHOG_TOKEN && POSTHOG_HOST) {
  posthog.init(POSTHOG_TOKEN, {
    api_host: POSTHOG_PROXY_PATH,
    ui_host: getPostHogUiHost(POSTHOG_HOST),
    defaults: "2026-05-30",
    capture_pageleave: true,
    capture_exceptions: true,
    tracing_headers: [...POSTHOG_TRACING_HEADERS],
    session_recording: {
      maskAllInputs: true,
      maskCapturedNetworkRequestFn: (request) => {
        if (request.name.includes("/api/demo-request")) {
          request.requestBody = undefined;
          request.responseBody = undefined;
        }

        return request;
      },
    },
  });

  posthog.register({ app: ANALYTICS_APP });
}
