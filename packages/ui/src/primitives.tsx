import type { ReactNode } from "react";

/** Format "2022-01" / "2022" into "Jan 2022" / "2022". */
export function formatDate(date?: string): string {
  if (!date) return "";
  const [year, month] = date.split("-");
  if (!month) return year;
  const names = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const index = Number(month) - 1;
  return names[index] ? `${names[index]} ${year}` : year;
}

export function formatDateRange(start?: string, end?: string): string {
  if (!start && !end) return "";
  const from = formatDate(start);
  const to = end ? formatDate(end) : "Present";
  return from ? `${from} — ${to}` : to;
}

/** A titled resume section. Widow/orphan-safe heading via CSS. */
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rb-section">
      <h2 className="rb-section-title">{title}</h2>
      <div className="rb-section-body">{children}</div>
    </section>
  );
}

export interface EntryHeaderProps {
  title: string;
  titleUrl?: string;
  subtitle?: string;
  meta?: string;
  aside?: string;
}

/** Two-column entry header: title/subtitle on the left, date/location right. */
export function EntryHeader({ title, titleUrl, subtitle, meta, aside }: EntryHeaderProps) {
  return (
    <header className="rb-entry-header">
      <div className="rb-entry-main">
        <span className="rb-entry-title">
          {titleUrl ? (
            <a href={titleUrl} className="rb-link">
              {title}
            </a>
          ) : (
            title
          )}
        </span>
        {subtitle ? <span className="rb-entry-subtitle">{subtitle}</span> : null}
      </div>
      <div className="rb-entry-aside">
        {meta ? <span className="rb-entry-meta">{meta}</span> : null}
        {aside ? <span className="rb-entry-location">{aside}</span> : null}
      </div>
    </header>
  );
}

/** Render `**bold**` spans inside plain text — the only markup resumes need. */
export function InlineMarkdown({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  if (parts.length === 1) return <>{text}</>;
  return <>{parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}</>;
}

/** Highlight bullets — real list semantics for ATS parsers. */
export function Bullets({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="rb-bullets">
      {items.map((item, i) => (
        <li key={i}>
          <InlineMarkdown text={item} />
        </li>
      ))}
    </ul>
  );
}

/** Comma/dot separated inline list (keywords, tech stacks). */
export function InlineList({ items, separator = " · " }: { items?: string[]; separator?: string }) {
  if (!items?.length) return null;
  return <span className="rb-inline-list">{items.join(separator)}</span>;
}

/** Contact line item with separators handled in CSS. */
export function ContactItem({ href, children }: { href?: string; children: ReactNode }) {
  return (
    <span className="rb-contact-item">
      {href ? (
        <a href={href} className="rb-link">
          {children}
        </a>
      ) : (
        children
      )}
    </span>
  );
}

/** Strip protocol for display while keeping the real href. */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
