import AuthService from "services/auth";

export default async (req, res) => {
  const user = await AuthService.verify(req);

  if (!user) {
    res.status(401).end();
  } else {
    res.json(user);
  }
};
