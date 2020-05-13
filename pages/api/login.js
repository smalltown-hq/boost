import AuthService from "services/auth";
import CookieService from "services/cookie";

export default async (req, res) => {
  try {
    // get the decentralized ID from the authorization header
    const did = req.headers.authorization
      ?.split("Bearer")
      .pop()
      .trim();

    // get the user data from Magic Link using the decentralized Id and use it
    // to create a token to store as a cookie and allow access to our
    // restricted resources
    const token = await AuthService.getUserAndCreateToken(did);

    // Tell the browser to set this cookie
    res.setHeader("Set-Cookie", CookieService.createCookie(token));
    res.end();
  } catch (error) {
    console.log(error);
    res.status(401).end();
  }
};
