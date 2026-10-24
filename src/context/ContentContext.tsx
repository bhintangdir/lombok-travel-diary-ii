"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import defaultContent from "@/data/content.json";

export type ContentData = typeof defaultContent;

interface ContentContextType {
  content: ContentData;
  setContent: React.Dispatch<React.SetStateAction<ContentData>>;
}

const ContentContext = createContext<ContentContextType>({
  content: defaultContent as ContentData,
  setContent: () => {},
});

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ContentData>(defaultContent as ContentData);

  useEffect(() => {
    // Dengarkan pesan postMessage jika ada integrasi editor CMS (seperti WadahWeb di gading-trans-lombok)
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "WADAH_WEB_UPDATE_CONTENT" && event.data?.content) {
        setContent(event.data.content);
      }
    };

    window.addEventListener("message", handleMessage);

    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: "WADAH_WEB_PREVIEW_READY" }, "*");
    }

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <ContentContext.Provider value={{ content, setContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
