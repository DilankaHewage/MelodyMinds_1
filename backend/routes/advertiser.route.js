import express from 'express';
import { registerAdvertiser, loginAdvertiser } from '../controllers/advertiser.controller.js';

const router = express.Router();

// POST /register (Advertiser Registration)
router.post('/register', registerAdvertiser);

// POST /login (Advertiser Login)
router.post('/login', loginAdvertiser);

export default router;
