import jwt from 'jsonwebtoken';

const generateToken = (id, isAdmin = false) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: isAdmin ? '7d' : '24h', // Longer expiration for admins
  });
};


export default generateToken;
