import DataService from "services/data";
import CookieService from "services/cookie";

export default async (req, res) => {
  try {
    const tokenRequest = await DataService.fetch("/user/create", {
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
