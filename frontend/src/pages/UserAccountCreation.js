import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import './UserAccountCreation.css'; // Your custom CSS

const UserAccountCreation = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input Changed: ${name} = ${value}`); // Log input changes
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    console.log('Form submitted'); // Log that form was submitted

    // Combine firstName and lastName into a single name field
    const combinedData = {
      name: `${formData.firstName} ${formData.lastName}`, // Combine first and last name
      email: formData.email,
      password: formData.password,
    };

    console.log('Form Data Before Submission:', combinedData); // Log form data before submitting

    try {
      // Send data to backend API (POST request)
      const response = await axios.post('http://localhost:5000/api/users/register', combinedData);
      console.log('User Account Created Response:', response.data); // Log successful response from API
      alert('Account created successfully!');
    } catch (error) {
      console.error('Error creating account:', error); // Log error in case of failure
      alert('Failed to create account');

      if (error.response) {
        console.log('Error Response:', error.response.data); // Log error response from the server
      } else if (error.request) {
        console.log('Error Request:', error.request); // Log the request in case the response is missing
      } else {
        console.log('General Error:', error.message); // Log any other error message
      }
    }
  };

  return (
    <div className="user-account-creation-container">
      <div className="user-account-box">
        <h2>Create User Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserAccountCreation;
