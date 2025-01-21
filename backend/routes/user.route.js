import express from 'express';
import { registerUser, loginUser } from '../controllers/user.controller.js';
import { protect } from '../middleware/authMiddleware.js'; // Add the middleware for token verification

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Example of a protected route (you can use this for user-related operations after login)
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Fetch user details using the user ID from the token
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ name: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
