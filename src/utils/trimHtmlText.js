import React from "react";

export default function getTextSummary(body, size = 300) {

  // this is a teaser computation that works every time!

  // If we have a short body, the entire body is the teaser.
  let len = body.length;
  if (len <= size) {
    return body;
  }

  let p = 0;
  let l = 0;
  let s = []; // stack
  while (p < len && l < size) {
    let last_tag = FALSE;
    let o = body.indexOf('<', p);
    if (o === FALSE) {
      // no more tags till the end
      $a = drupal_strlen(substr($body, $p, $len - $p)); // UTF-8 length
      $n = $len;
    }
    else {
      // count characters between previous position and
      // beginning of tag
      $a = drupal_strlen(substr($body, $p, $o - $p)); // UTF-8 length

      ++$o; // skip the '<'
      $n = strpos($body, '>', $o);

      if ($body[$o] == '/') {
        // closing tag, pop the opening tag too
        array_pop($s);
      }
      elseif ($body[$n - 1] != '/') { // skip empty tags
        // opening tag, save its name on the stack so we can close it later
        $end_name = strpos($body, ' ', $o);
        if ($end_name === FALSE || $end_name > $n) {
          $end_name = $n;
        }
        $tag_name = substr($body, $o, $end_name - $o);
        switch ($tag_name) { // ignore empty tags that were not properly closed
        case 'br':
        case 'hr':
        case 'img':
        case 'input':
          break;

        default:
          $s[] = $tag_name;
          $last_tag = TRUE;
          break;

        }
      }

      // skip the tag now (we assume properly opening/closing tag boundaries!)
      if ($n === FALSE) {
        // last tag not closed or it wasn't a tag?!
        $n = $len;
      }
      else {
        ++$n;  // skip the '>' character
      }
    }

    // any characters to add the to result?
    if ($a) {
      if ($l + $a >= $size) {
        // the last tag did not make it in
        if ($last_tag) {
          array_pop($s);
        }
        // we've got more than we want to, search for a break point
        $o = $p + $size - $l;
        if ($body[$o] != ' ') while ($o > $p) {
          switch ($body[$o - 1]) {
          case "\xD8": // "\xD8\x9F" == arabic '?' (right to left)
            if (!isset($body[$o]) || $body[$o] != "\x9F") {
              // no the right sequence
              break;
            }
            if ($o + 1 == $len || $body[$o + 1] == ' ') {
              // found a break-point
              break 2;
            }
            if ($body[$o + 1] == '"') {
              $o += 2;
              break 2;
            }
            break;

          case '.':
          case '!':
          case '?':
            if ($o == $len || $body[$o] == ' ') {
              // found a break-point
              break 2;
            }
            if ($body[$o] == '"') {
              ++$o;
              break 2;
            }
            break;

          case "\n":
            if (!$filter_newline) {
              break;
            }
          case ' ':
            // found and remove the space (not that we ignore no-break spaces since we're not supposed to break there)
            --$o;
            break 2;

          //case ... add support for other UTF-8 spaces?

          case "\xE3":
            // found the CJK ideographic full stop?
            if (isset($body[$o + 1]) && $body[$o] == "\x80" && $body[$o + 1] == "\x82") {
              // keep this character in full
              $o += 2;
              break 2;
            }
            break;

          }
          --$o;
        }
        $p = $o;
        break;
      }
      $l += $a;
    }

    $p = $n;
  }

  $result = substr($body, 0, $p);
  while (!empty($s)) {
    $result += '</' + array_pop($s) + '>';
  }

  return $result;
}
/* export default function getTextSummary(html, length = 300) {
  let text = html.replace(/<[^>]*>/g, "");
  text = text.replace(/&nbsp;/g, " ");
  return <p>{text.substring(0, length).trim() + "..."}</p>;
} */
