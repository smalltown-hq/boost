import { serialize, parse } from "cookie";
import ms from "ms";

const TOKEN_NAME = "token";
const MAX_AGE = 60 * 60 * 8;

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

function createCookie(token, options = {}) {
  return serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    ...options,
  });
}

function setTokenCookie(res, token) {
  res.setHeader("Set-Cookie", createCookie(token));
}

function getAuthToken(req) {
  return req.cookies[TOKEN_NAME];
}

export default { setTokenCookie, removeAuthCookie, getAuthToken, createCookie };
