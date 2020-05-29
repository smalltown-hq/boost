import CookieService from "lib/cookie";
import DataService from "lib/data";

export default async (req, res) => {
  const { route, body, method } = req.body;

  const request = await DataService.fetch(route, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Cookie: CookieService.createCookie(
        CookieService.AUTH_TOKEN_NAME,
        CookieService.getAuthToken(req)
      ),
    },
    body,
  });

  if (request.ok) {
    const contentType = request.headers["content-type"];

    if (!contentType) {
      return res.status(request.status).end(await request.text());
    }

    res.json(await request.json());
  } else {
    res.status(request.status).end(await request.text());
  }
};
