import React from "react";

export default function getTextSummary(html) {
  let text = html.replace(/<[^>]*>/g, "");
  text = text.replace(/&nbsp;/g, " ");
  return <p>{text.substring(0, 300).trim() + "..."}</p>;
}
