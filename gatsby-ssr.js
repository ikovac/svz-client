/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import reduxProviderWrap from "./redux-provider-wrap";

export const wrapRootElement = reduxProviderWrap;
