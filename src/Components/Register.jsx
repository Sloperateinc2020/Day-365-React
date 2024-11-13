import React, { useState } from 'react';
import './Register.css';
import Footer from './Footer';
import { BsDownload, BsChevronDown } from 'react-icons/bs';

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
    newSkill: '',
    idProof: null
  });

  const [fileName, setFileName] = useState('');
  const [skillsList, setSkillsList] = useState([
    'Plumbing', 'Electrical', 'Carpentry'
  ]);
  const [isAddingNewSkill, setIsAddingNewSkill] = useState(false);

  // List of states (for dropdown)
  const statesList = [
    'California', 'New York', 'Texas', 'Florida', 'Illinois', 'Ohio', 'Georgia', 'North Carolina'
  ];

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
    setFileName(file ? file.name : '');
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    if (value === 'addSkills') {
      setIsAddingNewSkill(true);
      setFormData(prev => ({
        ...prev,
        skills: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        skills: value
      }));
      setIsAddingNewSkill(false);
    }
  };

  const handleNewSkillChange = (e) => {
    setFormData(prev => ({
      ...prev,
      newSkill: e.target.value
    }));
  };

  const handleAddNewSkill = () => {
    if (formData.newSkill && !skillsList.includes(formData.newSkill)) {
      setSkillsList(prevSkills => [...prevSkills, formData.newSkill]);
      setFormData(prev => ({
        ...prev,
        skills: formData.newSkill,
        newSkill: ''
      }));
      setIsAddingNewSkill(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
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
              <div className="select-wrapper">
                <select
                  name="gender"
                  className="form-input select-input"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select your Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <BsChevronDown className="select-arrow" />
              </div>
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
              <div className="select-wrapper">
                <select
                  name="state"
                  className="form-input select-input"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select your State</option>
                  {statesList.map((state, index) => (
                    <option key={index} value={state}>{state}</option>
                  ))}
                </select>
                <BsChevronDown className="select-arrow" />
              </div>
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
              <div className="select-wrapper">
                <select
                  name="skills"
                  className="form-input select-input"
                  value={formData.skills}
                  onChange={handleSkillsChange}
                  required
                >
                  <option value="">Select your Skills</option>
                  {skillsList.map((skill, index) => (
                    <option key={index} value={skill}>{skill}</option>
                  ))}
                  <option value="addSkills">+ Add New Skill</option>
                </select>
                <BsChevronDown className="select-arrow" />
              </div>
            </div>
          </div>

          {isAddingNewSkill && (
            <div className="form-group">
              <label className="form-label">Enter New Skill</label>
              <div className="add-skill-container">
                <input
                  type="text"
                  name="newSkill"
                  placeholder="Enter new skill"
                  className="form-input"
                  value={formData.newSkill}
                  onChange={handleNewSkillChange}
                />
                <button
                  type="button"
                  className="add-skill-button"
                  onClick={handleAddNewSkill}
                >
                  Add Skill
                </button>
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Upload ID Proof*</label>
            <div className="file-upload-container">
              <div className="file-upload-wrapper">
                <div className="choose-files-btn">
                  Choose Files
                  <input
                    id="file-upload"
                    type="file"
                    className="file-input"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                {fileName && <span className="file-name-display">{fileName}</span>}
                <BsDownload className="download-icon" size={18} />
              </div>
            </div>
          </div>

          <div className="registration-fee">
            <input type="checkbox" id="registration-fee" required />
            <label htmlFor="registration-fee" className="fee-label">
              <strong>Registration fee</strong><br /> will be charged in the registration fee of 99 INR
            </label>
          </div>

          <button type="submit" className="submit-button">
            Proceed to Payment
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Register;
