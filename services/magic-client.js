import { Magic, RPCError, RPCErrorCode } from "magic-sdk";

let magic;

function getInstance() {
  if (!magic) {
    magic = new Magic(process.env.magicPublicKey);
  }

  return magic;
}

export default {
  preload() {
    return getInstance().preload();
  },
  logout() {
    return getInstance().user.logout();
  },
  async login(email) {
    let did;
    let error;

    try {
      // get a did or decentralized ID from Magic Link
      did = await getInstance().auth.loginWithMagicLink({ email });

      console.log(did);
    } catch (error) {
      console.log(error);
      if (error instanceof RPCError) {
        switch (error.code) {
          case RPCErrorCode.MagicLinkFailedVerification:
            error = "Verification failed.";
            break;
          case RPCErrorCode.MagicLinkExpired:
            error = "Your verification link has expired.";
            break;
          case RPCErrorCode.MagicLinkRateLimited:
            error = "Our fault. We hit our authorization limit.";
            break;
          case RPCErrorCode.UserAlreadyLoggedIn:
            error = "No need to worry, you are already logged in!";
            break;
        }
      }
    }

    return { did, error };
  },
};
