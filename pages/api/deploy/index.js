import CookieService from "services/cookie";
import ApiService from "services/api";

export default async (req, res) => {
  const request = await ApiService.fetch("/deploy", {
    method: "POST",
    headers: {
      Cookie: CookieService.createCookie(
        CookieService.getAuthToken(req.cookies)
      ),
    },
  });

  if (request.ok) {
    res.end();
  } else {
    res.status(request.status).end(await request.text());
  }
};
