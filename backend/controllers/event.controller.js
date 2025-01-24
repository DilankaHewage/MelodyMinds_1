
import Event from '../models/event.model.js';

export const createEvent = async (req, res) => {
  const { name, date, location } = req.body;

  try {
    const event = await Event.create({ name, date, location, user: req.user.id });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

