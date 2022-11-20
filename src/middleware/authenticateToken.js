import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.status(400);
  console.log(req.headers);
  jwt.verify(token, process.env.SECRETKEY, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    user.password=undefined
    res.status(200).json({user})
    next();
  });
};
export default verifyToken;
