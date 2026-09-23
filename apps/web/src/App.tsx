import { useEffect, useRef, useState } from "react";
import { useResumePdf } from "@resume/pdf";
import { getTheme } from "@resume/themes";
import { JsonEditor } from "./components/JsonEditor";
import { Preview, ResumePage } from "./components/Preview";
import { ThemePicker } from "./components/ThemePicker";
import { downloadServerPdf } from "./exportPdf";
import { getFont } from "./fonts";
import { TopBar } from "./components/TopBar";
import { useAppStore } from "./store";

function EditorApp() {
  const pageRef = useRef<HTMLDivElement>(null);
  const resume = useAppStore((s) => s.resume);
  const paperSize = useAppStore((s) => s.paperSize);
  const themeId = useAppStore((s) => s.themeId);
  const bgColor = useAppStore((s) => s.bgColor);
  const fontId = useAppStore((s) => s.fontId);
  const marginPreset = useAppStore((s) => s.marginPreset);
  const [exporting, setExporting] = useState(false);

  const baseName = resume.basics.name.toLowerCase().replace(/\s+/g, "-") + "-resume";

  // The PDF's title metadata comes from the document title.
  useEffect(() => {
    document.title = `${resume.basics.name} — Resume`;
  }, [resume.basics.name]);

  // Browser print dialog: only the fallback when server-side rendering is unavailable.
  const printInBrowser = useResumePdf({
    contentRef: pageRef,
    documentTitle: baseName,
    paperSize,
    backgroundColor: bgColor ?? getTheme(themeId).tokens.colors.background,
  });

  const handleDownload = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      const done = await downloadServerPdf({
        resume,
        theme: themeId,
        font: getFont(fontId).id === "theme" ? null : fontId,
        bg: bgColor,
        paper: paperSize,
        margin: marginPreset,
        filename: `${baseName}.pdf`,
      });
      if (!done) printInBrowser();
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex h-dvh flex-col bg-white text-zinc-900">
      <TopBar onPrint={handleDownload} exporting={exporting} />
      <main className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] md:grid-cols-[minmax(360px,2fr)_minmax(0,3fr)_auto] md:grid-rows-1">
        {/* Mobile: preview only. Desktop: split view. */}
        <div className="app-chrome hidden min-h-0 md:block">
          <JsonEditor />
        </div>
        <Preview pageRef={pageRef} />
        <ThemePicker />
      </main>
    </div>
  );
}

/**
 * `?print=1` — just the paper, no app chrome, no zoom. Used by the server-side
 * PDF renderer so pagination is decided purely by the paper size, never by the
 * editor layout around it.
 */
function PrintView() {
  const pageRef = useRef<HTMLDivElement>(null);
  const resume = useAppStore((s) => s.resume);
  const themeId = useAppStore((s) => s.themeId);
  const bgColor = useAppStore((s) => s.bgColor);

  useEffect(() => {
    document.title = `${resume.basics.name} — Resume`;
    // Paint the page color under any unfilled area of the last page (dark themes).
    document.documentElement.style.background = bgColor ?? getTheme(themeId).tokens.colors.background;
    document.body.style.margin = "0";
  }, [resume.basics.name, themeId, bgColor]);

  return <ResumePage pageRef={pageRef} />;
}

export default function App() {
  const printView = new URLSearchParams(window.location.search).get("print") === "1";
  return printView ? <PrintView /> : <EditorApp />;
}
