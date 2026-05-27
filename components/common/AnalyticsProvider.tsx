"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

function pushToDataLayer(event: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  pushToDataLayer({ event: eventName, ...params });
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName);
  }
}

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize Clarity
    if (process.env.NEXT_PUBLIC_CLARITY_ID) {
      (function (c: Window, l: Document, a: string, r: string, i: string) {
        // @ts-expect-error clarity snippet
        c[a] = c[a] || function (...args: unknown[]) { (c[a].q = c[a].q || []).push(args); };
        const t = l.createElement(r) as HTMLScriptElement;
        t.async = true;
        t.src = "https://www.clarity.ms/tag/" + i;
        const y = l.getElementsByTagName(r)[0];
        y.parentNode?.insertBefore(t, y);
      })(window, document, "clarity", "script", process.env.NEXT_PUBLIC_CLARITY_ID);
    }

    // Initialize Meta Pixel
    if (process.env.NEXT_PUBLIC_META_PIXEL_ID) {
      const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
      // @ts-expect-error pixel snippet
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      // @ts-expect-error pixel snippet
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      // @ts-expect-error pixel snippet
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      // @ts-expect-error pixel snippet
      n.queue=[];t=b.createElement(e);t.async=!0;
      // @ts-expect-error pixel snippet
      t.src=v;s=b.getElementsByTagName(e)[0];
      // @ts-expect-error pixel snippet
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq?.("init", pixelId);
      window.fbq?.("track", "PageView");
    }
  }, []);

  // Track page views
  useEffect(() => {
    pushToDataLayer({
      event: "page_view",
      page_path: pathname + (searchParams ? `?${searchParams}` : ""),
    });
  }, [pathname, searchParams]);

  return <>{children}</>;
}
