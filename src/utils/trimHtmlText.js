import { limit, substring, length } from "stringz";

export default function getTextSummary(text, size = 300) {
  let textLength = text.length;

  if (!textLength) {
    return text;
  }
  if (!size) {
    return text;
  }

  if (length(text) <= size) {
    return text;
  }

  let summary = limit(text, size);
  let endSentence = ['.', '!', '?', '...', '>'];
  if(!endSentence.includes(summary[summary.length - 1])) {
    summary += '...';
  }

  let max_rpos = length(summary);
  let min_rpos = max_rpos;

  let reversed = reverseString(summary);

  let break_points = [];

  break_points.push({
    tag: "</p>",
    prior: 0,
  });

  // If no complete paragraph then treat line breaks as paragraphs.
  let line_breaks = [
    {
      tag: "<br />",
      prior: 6,
    },
    {
      tag: "<br>",
      prior: 4,
    },
  ];

  break_points.push(...line_breaks);
  break_points.push(
    {
      tag: ". ",
      prior: 1,
    },
    {
      tag: "! ",
      prior: 1,
    },
    {
      tag: "? ",
      prior: 1,
    },
    {
      tag: "。",
      prior: 0,
    },
    {
      tag: "؟ ",
      prior: 1,
    }
  );

  for (let point of break_points) {
    const { tag, prior } = point;
    let rpos = reversed.indexOf(reverseString(tag));
    if (rpos) {
      min_rpos = Math.min(rpos + prior, min_rpos);
    }
  }
  if (min_rpos !== max_rpos) {
    summary = min_rpos === 0 ? summary : reverseString(substring(reversed, min_rpos));
  }

  return summary;
}

function reverseString(str) {
  // Step 1. Use the split() method to return a new array
  var splitString = str.split(""); // var splitString = "hello".split("");
  // ["h", "e", "l", "l", "o"]

  // Step 2. Use the reverse() method to reverse the new created array
  var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
  // ["o", "l", "l", "e", "h"]

  // Step 3. Use the join() method to join all elements of the array into a string
  var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
  // "olleh"

  //Step 4. Return the reversed string
  return joinArray; // "olleh"
}
