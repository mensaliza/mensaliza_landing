/**
 * Ad attribution that has to survive the jump from the landing to the app.
 *
 * The app reads `utm_*` from the `/auth/register` URL and saves them on the
 * new account, so every link to sign-up must carry them. Visitors often land
 * on a blog post or `/?utm_source=…` and click later on another page, so the
 * first-touch values are kept in sessionStorage for the visit.
 */

const STORAGE_KEY = "mensaliza:attribution";

export const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

type Attribution = Partial<Record<(typeof ATTRIBUTION_PARAMS)[number], string>>;

function readStored(): Attribution {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

function fromSearch(search: string): Attribution {
  const params = new URLSearchParams(search);
  const found: Attribution = {};
  for (const key of ATTRIBUTION_PARAMS) {
    const value = params.get(key)?.trim();
    if (value) found[key] = value;
  }
  return found;
}

/** Call once per page load. Keeps the first values seen in this visit. */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  const current = fromSearch(window.location.search);
  if (Object.keys(current).length === 0) return;
  if (Object.keys(readStored()).length > 0) return;

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // storage blocked (private mode): the current URL still works below
  }
}

/** Adds the visit's attribution to an app URL without overwriting its own params. */
export function withAttribution(href: string): string {
  if (typeof window === "undefined") return href;

  const attribution = {
    ...fromSearch(window.location.search),
    ...readStored(),
  };
  if (Object.keys(attribution).length === 0) return href;

  try {
    const url = new URL(href, window.location.href);
    for (const [key, value] of Object.entries(attribution)) {
      if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
    }
    return url.toString();
  } catch {
    return href;
  }
}
