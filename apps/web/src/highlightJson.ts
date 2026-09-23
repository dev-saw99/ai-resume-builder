const TOKEN_REGEX =
  /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g;

/** Wraps JSON literals in colored spans for the editor's highlight overlay. */
export function highlightJson(text: string): string {
  const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return escaped.replace(TOKEN_REGEX, (match) => {
    let className = "json-number";
    if (match.startsWith('"')) {
      className = /:$/.test(match) ? "json-key" : "json-string";
    } else if (match === "true" || match === "false") {
      className = "json-boolean";
    } else if (match === "null") {
      className = "json-null";
    }
    return `<span class="${className}">${match}</span>`;
  });
}
