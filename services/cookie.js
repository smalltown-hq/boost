import { serialize, parse } from "cookie";
import ms from "ms";

// _BoostId
const NAME = "_bid";

function removeAuthCookie() {
  if (!process.browser) {
    return false;
  }

  document.cookie = createCookie("", {
    maxAge: 0,
    expires: new Date(Date.now() - ms("1h")),
  });

  return true;
}

function createCookie(data, options = {}) {
  return serialize(NAME, data, {
    maxAge: ms("12h") / 1000,
    expires: new Date(Date.now() + ms("12h")),
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    ...options,
  });
}

function getAuthToken(cookies) {
  return cookies[NAME];
}

export default { createCookie, getAuthToken, removeAuthCookie };
