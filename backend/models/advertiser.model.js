import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const advertiserSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure unique email
    password: { type: String, required: true }, // Plain text password
    country: { type: String, required: true },
    telephone: { type: String, required: true },
    nicNumber: { type: String, required: true },
    companyName: { type: String, required: true },
    companyPosition: { type: String, required: true },
    companyWebsite: { type: String, required: false },
    companyTelephone: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Pre-save hook to hash the password before saving
advertiserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // Skip hashing if the password hasn't changed
  }

  // Hash the password before saving
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare entered password with stored hash
advertiserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Advertiser = mongoose.model('Advertiser', advertiserSchema);

export default Advertiser;
