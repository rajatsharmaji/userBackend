import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY;

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const tokenVerification = jwt.verify(token, SECRET_KEY);
    console.log("token: ", tokenVerification);
    if (tokenVerification) {
      next();
    }
  } catch (err) {
    res.send({ msg: "token verification failed", err });
  }
};
