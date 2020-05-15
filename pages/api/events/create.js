import CookieService from "services/cookie";
import ApiService from "services/api";

export default async (req, res) => {
  const request = await ApiService.fetch("/events/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: CookieService.createCookie(
        CookieService.getAuthToken(req.cookies)
      ),
    },
    body: JSON.stringify(req.body),
  });

  if (request.ok) {
    res.end(await request.text());
  } else {
    res.status(request.status).end(await request.text());
  }
};
