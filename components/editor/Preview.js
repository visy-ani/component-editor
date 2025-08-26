"use client";
import { useCallback, useEffect, useRef } from "react";

export function Preview({ code }) {
  const iframeRef = useRef(null);

  const postCodeToIframe = useCallback(() => {
    if (iframeRef.current?.contentWindow && code) {
      iframeRef.current.contentWindow.postMessage(
        { type: "RENDER_CODE", payload: { code } },
        "*"
      );
    }
  }, [code]);

  // Re-send whenever code changes, but only if iframe is already loaded
  useEffect(() => {
    postCodeToIframe();
  }, [code, postCodeToIframe]);

  return (
    <iframe
      ref={iframeRef}
      src="/iframe-preview.html"
      title="Component Preview"
      className="w-full h-full border-none bg-white"
      onLoad={postCodeToIframe} // send code once iframe is ready
    />
  );
}
