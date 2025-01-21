import Advertiser from '../models/advertiser.model.js';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from './utils/passwordUtils.js';

// Helper function to generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Advertiser Registration
export const registerAdvertiser = async (req, res) => {
  const {
    firstName, lastName, email, password, country,
    telephone, nicNumber, companyName, companyPosition, companyWebsite, companyTelephone
  } = req.body;

  // Validate required fields
  if (
    !firstName || !lastName || !email || !password || !country || !telephone ||
    !nicNumber || !companyName || !companyPosition || !companyTelephone
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if advertiser already exists by email
    const existingAdvertiser = await Advertiser.findOne({ email });
    if (existingAdvertiser) {
      return res.status(400).json({ message: 'Advertiser already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await hashPassword(password);

    // Create a new advertiser
    const advertiser = new Advertiser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      country,
      telephone,
      nicNumber,
      companyName,
      companyPosition,
      companyWebsite,
      companyTelephone
    });

    // Save the advertiser to the database
    await advertiser.save();

    // Generate a JWT token for the advertiser
    const token = generateToken(advertiser._id);

    // Respond with success message and token
    res.status(201).json({
      message: 'Advertiser registered successfully!',
      token,
    });

  } catch (error) {
    console.error("Error registering advertiser:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// For Advertiser Login
export const loginAdvertiser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // Find the advertiser by email
    const advertiser = await Advertiser.findOne({ email });
    if (!advertiser) {
      console.log('Advertiser not found');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the entered password with the hashed password in the database using comparePassword function
    const isMatch = await comparePassword(password, advertiser.password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken(advertiser._id);

    // Respond with success message and token
    console.log('Login successful');
    res.status(200).json({
      message: 'Login successful',
      token,
    });

    // Additional log to confirm response is sent
    console.log('Response sent to frontend');

  } catch (error) {
    console.error("Error logging in advertiser:", error);
    res.status(500).json({ message: 'Server error' });
  }
};