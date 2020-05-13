import { Magic } from "@magic-sdk/admin";
import Iron from "@hapi/iron";
import CookieService from "services/cookie";

const SECRET = process.env.SECRET || "this-is-super-secure-secret-do-not-peek";

let magic;

function getInstance() {
  if (!magic) {
    magic = new Magic(process.env.MAGIC_SECRET_KEY);
  }

  return magic;
}

async function getUserAndCreateToken(did) {
  const user = await getInstance().users.getMetadataByToken(did);

  return Iron.seal(user, SECRET, Iron.defaults);
}

function verify(req) {
  const token = CookieService.getAuthToken(req.cookies);

  return token && Iron.unseal(token, SECRET, Iron.defaults);
}

export default { getUserAndCreateToken, verify };
