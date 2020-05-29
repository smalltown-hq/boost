import CookieService from "lib/cookie";

export default async (req, res) => {
  CookieService.removeAuthCookies(res);
  res.end();
};
