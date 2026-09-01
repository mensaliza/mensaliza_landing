import { ImageResponse } from "next/og";

import {
  BRAND_ICON_BACKGROUND,
  BRAND_MARK_COLOR,
  BRAND_MARK_PATH,
  BRAND_MARK_VIEWBOX,
} from "@/lib/brand-mark";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_ICON_BACKGROUND,
          borderRadius: 36,
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox={BRAND_MARK_VIEWBOX}
          fill="none"
        >
          <path d={BRAND_MARK_PATH} fill={BRAND_MARK_COLOR} />
        </svg>
      </div>
    ),
    size
  );
}
