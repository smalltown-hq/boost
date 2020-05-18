import CookieService from "services/cookie";
import DataService from "services/data";

export default async (req, res) => {
  const request = await DataService.fetch(
    `/questions/${req.query.id}/vote?voter=${req.query.voter}`,
    {
      headers: {
        Cookie: CookieService.createCookie(CookieService.getAuthToken(req)),
      },
    }
  );

  if (request.ok) {
    res.json(await request.json());
  } else {
    res.status(request.status).end(await request.text());
  }
};
