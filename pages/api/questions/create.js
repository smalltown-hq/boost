import CookieService from "services/cookie";
import DataService from "services/data";

export default async (req, res) => {
  const request = await DataService.fetch(
    `/questions/create?event=${req.query.event}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: CookieService.createCookie(
          CookieService.AUTH_TOKEN_NAME,
          CookieService.getAuthToken(req)
        ),
      },
      body: JSON.stringify(req.body),
    }
  );

  if (request.ok) {
    res.json(await request.json());
  } else {
    res.status(request.status).end(await request.text());
  }
};
