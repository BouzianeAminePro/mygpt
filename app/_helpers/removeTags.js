export function removeTags(str) {
  if (str === null || str === "") return "";

  const replacements = [
    { regex: /<[^>]*>/g, replacement: "" },
    { regex: /&quot;/g, replacement: '"' },
    { regex: /&#39;/g, replacement: "'" },
    { regex: /&amp;/g, replacement: "&" },
    { regex: /</g, replacement: "<" },
    { regex: />/g, replacement: ">" },
  ];

  const nonASCIIReplacement = (c) => {
    const code = c.charCodeAt(0).toString(16);
    return "&#" + ("0000" + code).slice(-4) + ";";
  };

  str = str.toString();
  for (const { regex, replacement } of replacements) {
    str = str.replace(regex, replacement);
  }
  str = str.replace(/([^\x00-\x7F])/g, nonASCIIReplacement);

  return str;
}
