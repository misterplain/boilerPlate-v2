const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  console.log('veryify JWT middleware accessed')
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized cannot verify web token " });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    console.log('jwt token verified through middleware')
    next();
  });
};

module.exports = verifyJWT;
