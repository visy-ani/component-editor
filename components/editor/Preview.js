"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export function Preview({ code }) {
  const iframeRef = useRef(null);
  const isIframeLoaded = useRef(false);
  const [fetchedCode, setFetchedCode] = useState(null);

  const activeCode = code || fetchedCode;

  const postCodeToIframe = useCallback(() => {
    if (
      iframeRef.current?.contentWindow &&
      activeCode &&
      isIframeLoaded.current
    ) {
      iframeRef.current.contentWindow.postMessage(
        { type: "RENDER_CODE", payload: { code: activeCode } },
        "*"
      );
    }
  }, [activeCode]);

  const handleIframeLoad = useCallback(() => {
    isIframeLoaded.current = true;
    postCodeToIframe();
  }, [postCodeToIframe]);

  useEffect(() => {
    if (code) return; 

    const id = localStorage.getItem("savedComponentId");
    if (!id) return;

    fetch(`/api/component/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data?.code) {
          setFetchedCode(data.code);
        }
      })
      .catch((err) => {
        console.error("Error loading component:", err);
      });
  }, [code]);

  useEffect(() => {
    if (activeCode && isIframeLoaded.current) {
      postCodeToIframe();
    }
  }, [activeCode, postCodeToIframe]);

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
