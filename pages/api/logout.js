import CookieService from "services/cookie";

export default async (req, res) => {
  CookieService.removeAuthCookies(res);
  res.end();
};
