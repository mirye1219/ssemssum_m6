"use client";

import * as amplitude from "@amplitude/analytics-browser";

const AMPLITUDE_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

let amplitudeReady = false;

type Props = Record<string, string | number | boolean | undefined>;

function readUtm() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign"] as const;
  const utm: Record<string, string> = {};
  for (const key of keys) {
    const value = params.get(key);
    if (value) {
      utm[key] = value;
      sessionStorage.setItem(key, value);
    } else {
      const stored = sessionStorage.getItem(key);
      if (stored) utm[key] = stored;
    }
  }
  return utm;
}

export function initAnalytics() {
  if (typeof window === "undefined") return;

  const utm = readUtm();
  if (!sessionStorage.getItem("landing_path")) {
    sessionStorage.setItem("landing_path", window.location.pathname);
  }

  if (AMPLITUDE_KEY && !amplitudeReady) {
    amplitude.init(AMPLITUDE_KEY, { autocapture: false });
    amplitudeReady = true;
  }

  if (amplitudeReady) {
    amplitude.identify(
      new amplitude.Identify()
        .set("utm_source", utm.utm_source ?? "direct")
        .set("utm_medium", utm.utm_medium ?? "none")
        .set("utm_campaign", utm.utm_campaign ?? "none")
        .set("landing_path", sessionStorage.getItem("landing_path") ?? "/"),
    );
  }
}

export function track(event: string, properties: Props = {}) {
  if (typeof window === "undefined") return;
  initAnalytics();

  const payload = { ...readUtm(), ...properties };

  if (amplitudeReady) {
    amplitude.track(event, payload);
  }

  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (GA_ID && gtag) {
    gtag("event", event, payload);
  }
}

export function trackPageView(path: string) {
  track("page_viewed", { path });
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (GA_ID && gtag) {
    gtag("event", "page_view", { page_path: path });
  }
}
