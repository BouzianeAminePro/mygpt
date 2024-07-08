export function removeTags(str) {
  if (str === null || str === "") return "";
  else str = str.toString();

  return str
    .replace(/<[^>]*>/g, "") // remove HTML tags
    .replace(/&quot;/g, '"') // replace &quot; with "
    .replace(/&#39;/g, "'") // replace &#39; with '
    .replace(/&amp;/g, "&") // replace &amp; with &
    .replace(/&lt;/g, "<") // replace &lt; with <
    .replace(/&gt;/g, ">") // replace &gt; with >
    .replace(/[^\x00-\x7F]/g, function (c) {
      // convert non-ASCII characters to their corresponding ASCII characters
      var code = c.charCodeAt(0).toString(16);
      return "&#" + ("0000" + code).slice(-4) + ";";
    });
}
