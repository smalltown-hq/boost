import CookieService from "services/cookie";
import DataService from "services/data";

export default async (req, res) => {
  const request = await DataService.fetch("/deploy", {
    method: "POST",
    headers: {
      Cookie: CookieService.createCookie(
        CookieService.AUTH_TOKEN_NAME,
        CookieService.getAuthToken(req)
      ),
    },
  });

  if (request.ok) {
    res.end();
  } else {
    res.status(request.status).end(await request.text());
  }
};
