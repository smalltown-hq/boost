import { serialize, parse } from "cookie";
import ms from "ms";

// _BoostId
const NAME = "_bid";

function createCookie(data) {
  return serialize(NAME, data, {
    // tell the cookie how long it should last
    maxAge: ms("12h") / 1000,
    expires: new Date(Date.now() + ms("12h")),
    // don't allow JS to read cookies, only send with HTTP requests
    httpOnly: true,
    // only send on https requests
    secure: process.env.NODE_ENV === "production",
    // TODO: read more about this
    path: "/",
    // TODO: read more about this
    sameSite: "lax",
  });
}

function getAuthToken(cookies) {
  return cookies[NAME];
}

export default { createCookie, getAuthToken };
