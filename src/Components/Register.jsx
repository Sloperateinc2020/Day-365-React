import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    city: '',
    zipCode: '',
    state: '',
    country: '',
    skills: '',
    idProof: null
  });
  const [fileName, setFileName] = useState(''); // New state for file name

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      idProof: file
    }));
    setFileName(file ? file.name : ''); // Set file name if a file is selected
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <h1 className="register-title">Become a Service Pro</h1>
        <p className="register-subtitle">
          Join the community of local service <br /> professionals who are dedicated to delivering <br />
          great experiences for Customers
        </p>
      </div>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">First Name*</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your First Name"
              className="form-input"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Last Name*</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your Last Name"
              className="form-input"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Email address*</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              className="form-input"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone number*</label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              className="form-input"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Gender*</label>
            <select
              name="gender"
              className="form-input"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Date of Birth*</label>
            <input
              type="date"
              name="dateOfBirth"
              className="form-input"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Address*</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your Address"
              className="form-input"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">City*</label>
            <input
              type="text"
              name="city"
              placeholder="Enter your City"
              className="form-input"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">ZipCode*</label>
            <input
              type="text"
              name="zipCode"
              placeholder="Enter your Zipcode"
              className="form-input"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">State*</label>
            <select
              name="state"
              className="form-input"
              value={formData.state}
              onChange={handleInputChange}
              required
            >
              <option value="">Select State</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Country*</label>
            <input
              type="text"
              name="country"
              placeholder="Enter your Country"
              className="form-input"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Skills*</label>
            <select
              name="skills"
              className="form-input"
              value={formData.skills}
              onChange={handleInputChange}
              required
            >
              <option value="">Select your Skills</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="carpentry">Carpentry</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="upload-label">Upload ID Proof*</label>
          <div className="file-upload-container">
            <button
              type="button"
              onClick={() => document.getElementById('file-upload').click()}
              className="file-upload-button"
            >
              Choose Files
            </button>
            <span className="file-name">{fileName}</span> {/* Display selected file name */}
            <div className="share-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
              </svg>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden-input"
              onChange={handleFileChange}
              required
            />
          </div>
        </div>

        <div className="registration-fee">
          <input type="checkbox" id="registration-fee" required />
          <label htmlFor="registration-fee" className="fee-label">
          <strong>Registration fee</strong><br /> will be charged in the registration fee of 99 INRS
          </label>
        </div>

        <button type="submit" className="submit-button">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}

export default Register;
