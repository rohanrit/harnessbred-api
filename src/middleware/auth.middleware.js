import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Optional: Also support token in cookies (useful for some setups)
  // else if (req.cookies?.token) {
  //   token = req.cookies.token;
  // }

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Not authorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    console.error('Auth middleware error:', error);
    return res.status(401).json({ message: 'Not authorized: Token failed' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    // This assumes you fetch the user's role from the DB in the protect middleware
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "User role not authorized to perform this action" });
    }
    next();
  };
};