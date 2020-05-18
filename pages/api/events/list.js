import CookieService from "services/cookie";
import ApiService from "services/api";

export default async (req, res) => {
  const request = await ApiService.fetch(
    `/events/list?page=${req.query.page || 0}`,
    {
      headers: {
        Cookie: CookieService.createCookie(
          CookieService.getAuthToken(req.cookies)
        ),
      },
    }
  );

  if (request.ok) {
    res.json(await request.json());
  } else {
    res.status(request.status).end(await request.text());
  }
};
