import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Importing jsonwebtoken
import User from '../models/user.model.js';

// Generate JWT Token (assuming a JWT secret is stored in environment variables)
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' }); // Adjust expiry as needed
};

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Debug: Log the received user data
    console.log('Registering user with email:', email);
    
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Debug: Log the hashed password (for testing purposes, remove in production)
    console.log('Hashed password:', hashedPassword);

    // Save the user to the database
    await user.save();

    // Debug: Log user details after saving to DB
    console.log('User registered successfully:', user);

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// User Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // Debug: Log the received login data
    console.log('Login attempt for email:', email);

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ message: 'Invalid email' });
    }

    // Debug: Log the stored password hash (for testing purposes, remove in production)
    console.log('Stored hashed password:', user.password);

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch); // Debug: Log the result of the password comparison

    if (!isMatch) {
      console.log('Invalid password attempt for email:', email);
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Debug: Log the generated token (for testing purposes, remove in production)
    console.log('Generated JWT token:', token);

    // Respond with success message and token
    res.status(200).json({
      message: 'Login successful',
      token,
    });

  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: 'Server error' });
  }
};
