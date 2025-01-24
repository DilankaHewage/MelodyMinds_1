import express from 'express';
import { createEvent, getEvents } from '../controllers/event.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createEvent);
router.get('/', getEvents);

export default router;
