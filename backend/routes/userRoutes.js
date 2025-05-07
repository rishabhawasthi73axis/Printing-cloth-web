import express from 'express';
import { registerUser, loginUser, getUserProfile, checkAdminCredentials } from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', loginUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/admin/check').get(protect, admin, (req, res) => {
    res.json({ valid: true });
  });
  router.post('/admin/auth', checkAdminCredentials);

// Exporting the router as default
export default router;
