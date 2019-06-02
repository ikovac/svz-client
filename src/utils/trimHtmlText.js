import React from "react";

export default function getTextSummary(html, length = 300) {
  let text = html.replace(/<[^>]*>/g, "");
  text = text.replace(/&nbsp;/g, " ");
  return <p>{text.substring(0, length).trim() + "..."}</p>;
}
