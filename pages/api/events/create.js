import CookieService from "services/cookie";
import DataService from "services/data";

export default async (req, res) => {
  const request = await DataService.fetch("/events/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: CookieService.createCookie(CookieService.getAuthToken(req)),
    },
    body: JSON.stringify(req.body),
  });

  if (request.ok) {
    res.end(await request.text());
  } else {
    res.status(request.status).end(await request.text());
  }
};
