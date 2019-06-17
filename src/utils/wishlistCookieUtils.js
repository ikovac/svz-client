import cookie from "./cookieUtils";

export function addToWishlistCookie(article_id) {
  const currentWishlist = getWishlistCookieItems();

  if (currentWishlist && currentWishlist.includes(article_id)) {
    return;
  }

  cookie.set(
    "odabrana_lista",
    currentWishlist
      ? JSON.stringify([...currentWishlist, article_id])
      : JSON.stringify([article_id]),
    { exdays: 5, path: "/" }
  );
}

export function removeFromWishlistCookie(article_id) {
  const currentWishlist = getWishlistCookieItems();

  if (
    !currentWishlist ||
    !currentWishlist.length ||
    !currentWishlist.includes(Number(article_id))
  ) {
    return;
  }

  const newWishlist = currentWishlist.filter(
    item => item !== Number(article_id)
  );
  cookie.set("odabrana_lista", JSON.stringify(newWishlist), {
    exdays: 5,
    path: "/",
  });
}

export function getWishlistCookieItems() {
  if (!cookie.check("odabrana_lista")) {
    return null;
  }

  const items = cookie.get("odabrana_lista");
  return JSON.parse(items);
}

export function deleteWishlistCookie() {
  if (!cookie.check("odabrana_lista")) {
    return null;
  }

  cookie.set("odabrana_lista", "", {
    exdays: -1,
    path: "/",
  });
}
