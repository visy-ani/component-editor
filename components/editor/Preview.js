"use client";
import { useCallback, useEffect, useRef } from "react";

export function Preview({ code }) {
  const iframeRef = useRef(null);
  const isIframeLoaded = useRef(false);

  const postCodeToIframe = useCallback(() => {
    if (iframeRef.current?.contentWindow && code && isIframeLoaded.current) {
      iframeRef.current.contentWindow.postMessage(
        { type: "RENDER_CODE", payload: { code } },
        "*"
      );
    }
  }, [code]);

  // Handle iframe load
  const handleIframeLoad = useCallback(() => {
    isIframeLoaded.current = true;
    // Send code once iframe is ready
    if (code) {
      postCodeToIframe();
    }
  }, [code, postCodeToIframe]);

  // Re-send whenever code changes, but only if iframe is already loaded
  useEffect(() => {
    if (isIframeLoaded.current) {
      postCodeToIframe();
    }
  }, [code, postCodeToIframe]);

  return (
    <iframe
      ref={iframeRef}
      src="/iframe-preview.html"
      title="Component Preview"
      className="w-full h-full border-none bg-white"
      onLoad={handleIframeLoad}
    />
  );
}
