import { useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { MARGIN_PRESETS, PAPER_DIMENSIONS } from "@resume/pdf";
import { ResumeRenderer } from "@resume/renderer";
import { getTheme } from "@resume/themes";
import { getFont } from "../fonts";
import { useAppStore } from "../store";

const PANE_PADDING = 48;

/** The paper: page frame + rendered resume. Shared by the on-screen preview and the print view. */
export function ResumePage({ pageRef }: { pageRef: RefObject<HTMLDivElement | null> }) {
  const resume = useAppStore((s) => s.resume);
  const themeId = useAppStore((s) => s.themeId);
  const fontId = useAppStore((s) => s.fontId);
  const bgColor = useAppStore((s) => s.bgColor);
  const paperSize = useAppStore((s) => s.paperSize);
  const marginPreset = useAppStore((s) => s.marginPreset);

  const theme = getTheme(themeId);
  const paper = PAPER_DIMENSIONS[paperSize];
  const effectiveBg = bgColor ?? theme.tokens.colors.background;

  // User overrides win over theme tokens: ResumeRenderer merges `style` last.
  const font = getFont(fontId);
  const overrides = {
    ...(font.stack ? { "--rb-font-body": font.stack, "--rb-font-heading": font.stack } : {}),
    ...(bgColor ? { "--rb-color-background": bgColor } : {}),
  } as CSSProperties;
  const styleOverride = Object.keys(overrides).length > 0 ? overrides : undefined;

  return (
    <div
      ref={pageRef}
      className="resume-page mx-auto shadow-[0_1px_2px_rgba(0,0,0,0.08),0_12px_40px_-8px_rgba(24,24,27,0.25)] ring-1 ring-black/5"
      style={
        {
          width: paper.width,
          minHeight: paper.height,
          background: effectiveBg,
          "--print-margin": `${MARGIN_PRESETS[marginPreset]}mm`,
        } as CSSProperties
      }
    >
      {/*
       * Print frame: browsers cannot paint backgrounds into @page margins,
       * so we print with margin 0 and make our own margins inside the page.
       * The thead/tfoot spacers repeat on every printed page, giving each
       * page top/bottom margins that keep the page background color.
       * On screen the spacers are 0-height and the table is invisible.
       */}
      <table className="rb-page-frame">
        <thead>
      <tr>
        <td>
          <div className="rb-page-spacer" aria-hidden />
        </td>
      </tr>
        </thead>
        <tbody>
      <tr>
        <td>
          <ResumeRenderer data={resume} theme={theme} style={styleOverride} />
        </td>
      </tr>
        </tbody>
        <tfoot>
      <tr>
        <td>
          <div className="rb-page-spacer" aria-hidden />
        </td>
      </tr>
        </tfoot>
      </table>
    </div>
  );
}

export function Preview({ pageRef }: { pageRef: RefObject<HTMLDivElement | null> }) {
  const paperSize = useAppStore((s) => s.paperSize);
  const paper = PAPER_DIMENSIONS[paperSize];

  const paneRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Scale the page down to fit the pane; never scale up past 100%.
  useLayoutEffect(() => {
    const pane = paneRef.current;
    if (!pane) return;
    const compute = () =>
      setScale(Math.min(1, (pane.clientWidth - PANE_PADDING) / paper.widthPx));
    compute();
    const observer = new ResizeObserver(compute);
    observer.observe(pane);
    return () => observer.disconnect();
  }, [paper.widthPx]);

  return (
    <div ref={paneRef} className="preview-scroll h-full overflow-auto bg-zinc-100 p-6">
      {/* zoom scales layout too, so scrollbars stay correct; the printed node itself is untouched */}
      <div className="preview-zoom" style={{ zoom: scale }}>
        <ResumePage pageRef={pageRef} />
      </div>
    </div>
  );
}
