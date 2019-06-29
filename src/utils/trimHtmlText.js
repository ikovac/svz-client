import React from "react";

export default function getTextSummary(body, size = 300) {
  let bodyLength = body.length;

  if(!bodyLength) {
    return body;
  }
  if(!size) {
    return body;
  }

  if(bodyLength <= size) {
    return body;
  }
}