import AuthService from "services/auth";
import ApiService from "services/api";
import CookieService from "services/cookie";

export default async (req, res) => {
  try {
    const tokenRequest = await ApiService.fetch("/user/create", {
      method: "POST",
      headers: {
        authorization: req.headers.authorization,
      },
    });

    if (tokenRequest.ok) {
      // Tell the browser to set this cookie
      res.setHeader(
        "Set-Cookie",
        CookieService.createCookie(await tokenRequest.text())
      );
      res.end();
    } else {
      throw new Error(
        (await tokenRequest.text()) || "An unexpected error occured."
      );
    }
  } catch (error) {
    res.status(401).end(error.message);
  }
};
