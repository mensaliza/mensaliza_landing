"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "@posthog/react";

import {
  ANALYTICS_APP,
  POSTHOG_PROXY_PATH,
  getPostHogUiHost,
} from "@/lib/posthog-config";

const POSTHOG_TOKEN = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (typeof window !== "undefined" && POSTHOG_TOKEN && POSTHOG_HOST) {
  posthog.init(POSTHOG_TOKEN, {
    api_host: POSTHOG_PROXY_PATH,
    ui_host: getPostHogUiHost(POSTHOG_HOST),
    defaults: "2026-05-30",
    capture_exceptions: true,
    tracing_headers: ["mensaliza.com", "www.mensaliza.com", "localhost"],
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

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <PHProvider client={posthog}>{children}</PHProvider>;
}
