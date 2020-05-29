import DataService from "lib/data";
import CookieService from "lib/cookie";

export default async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const tokenRequest = await DataService.fetch("/api/user/create", {
      method: "POST",
      headers: {
        authorization: req.headers.authorization,
      },
    });

    if (tokenRequest.ok) {
      CookieService.setTokenCookie(res, await tokenRequest.text());
      res.end();
    } else {
      throw new Error(
        (await tokenRequest.text()) || "An unexpected error occured."
      );
    }
  } catch (error) {
    console.log(error);
    res.status(401).end(error.message);
  }
};
