/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import reduxProviderWrap from "./redux-provider-wrap";

export const wrapRootElement = reduxProviderWrap;

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `Aplikacija je ažurirana. ` +
      `Želite li osvježiti stranicu kako bi se prikazali najnoviji podaci?`
  );

  if (answer === true) {
    window.location.reload();
  }
};
