export default function excapeHtml(html = "") {
  let text = html.replace(/<[^>]*>/g, "");
  text = text.replace(/&nbsp;/g, " ");

  return text;
}
