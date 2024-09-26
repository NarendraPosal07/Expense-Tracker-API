const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Role ${req.user.role} is not authorized` });
    }
    next();
  };
};

module.exports = {
  protect,
  authorizeRoles
}