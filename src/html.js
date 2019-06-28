import React from "react";
import PropTypes from "prop-types";

export default function HTML(props) {
  const inlineStyle = `
    .site-root:empty {
        position: absolute;
        width: 80px;
        height: 80px;
        top: calc(50% - 80px);
        left: calc(50% - calc(80px / 2));
        border: 8px solid #f3f3f3;
        border-top: 8px solid #006950;
        border-radius: 50%;
        animation: spin 1.5s linear infinite;
    }
    @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `;
  
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <style children={inlineStyle} />
        <div
          key={`body`}
          id="___gatsby"
          className="site-root"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
