import React, { useState } from 'react';
import Footer from '../Footer'; 

const RegistrationJob = () => {
  const [isSubmitted, setIsSubmitted] = useState(false); // Step 1: State to track form submission
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    email: '',
    phone: '',
    alternatePhone: '',
    serviceCategory: '',
    specificServices: '',
    yearsOfExperience: '',
    certificationNumber: '',
    portfolio: null,
    serviceHours: '',
    preferredLocations: '',
    address: '',
    serviceAreaRadius: '',
    hourlyRate: '',
    paymentMethods: [],
    languagesSpoken: '',
    emergencyContact: '',
    termsAndConditions: false,
    backgroundCheck: false,
  });

  const [errors, setErrors] = useState({}); // For error handling

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handlePaymentMethodChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      paymentMethods: checked
        ? [...formData.paymentMethods, name]
        : formData.paymentMethods.filter((method) => method !== name),
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.email) newErrors.email = 'Email Address is required';
    if (!formData.phone) newErrors.phone = 'Phone Number is required';
    if (!formData.serviceCategory) newErrors.serviceCategory = 'Service Category is required';
    if (!formData.specificServices) newErrors.specificServices = 'Specific Services are required';
    if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of Experience is required';
    if (!formData.hourlyRate) newErrors.hourlyRate = 'Hourly Rate is required';
    if (!formData.termsAndConditions) newErrors.termsAndConditions = 'You must agree to the Terms & Conditions';
    if (!formData.backgroundCheck) newErrors.backgroundCheck = 'You must authorize a background check';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const formStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '50px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '4px',
  };

  const subtitleStyle = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '24px',
  };

  const sectionStyle = {
    marginBottom: '24px',
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '16px',
  };

  const formGroupStyle = {
    marginBottom: '16px',
    fontWeight: '550',
    color: 'black',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    color: '#333',
    marginBottom: '6px',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    color: '#333',
    height: '40px',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '80px',
    resize: 'vertical',
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23999' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '16px',
  };

  const checkboxContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
    marginTop: '8px',
  };

  const checkboxLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#333',
    gap: '8px',
  };

  const submitButtonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4F46E5',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '24px',
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
      <div style={formStyle}>
        <h1 style={titleStyle}>Service Provider Registration</h1>
        <p style={subtitleStyle}>Please fill out the form to register as a service provider</p>

        <form onSubmit={handleSubmit}>
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Personal Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="John Doe"
                />
                {errors.fullName && <p style={{ color: 'red', fontSize: '12px' }}>{errors.fullName}</p>}
              </div>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  style={inputStyle}
                />
                {errors.dob && <p style={{ color: 'red', fontSize: '12px' }}>{errors.dob}</p>}
              </div>
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Profile Picture</label>
              <input
                type="file"
                name="profilePicture"
                onChange={handleFileChange}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Contact Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="john@example.com"
                />
                {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
              </div>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p style={{ color: 'red', fontSize: '12px' }}>{errors.phone}</p>}
              </div>
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Alternate Contact Number (optional)</label>
              <input
                type="tel"
                name="alternatePhone"
                value={formData.alternatePhone}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="+1 (555) 987-6543"
              />
            </div>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Service Details</h2>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Service Category</label>
              <select
                name="serviceCategory"
                value={formData.serviceCategory}
                onChange={handleInputChange}
                style={selectStyle}
              >
                <option value="">Select a category</option>
                <option>Plumbing</option>
                <option>Electrical</option>
                <option>Carpentry</option>
              </select>
              {errors.serviceCategory && <p style={{ color: 'red', fontSize: '12px' }}>{errors.serviceCategory}</p>}
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Specific Services Offered</label>
              <textarea
                name="specificServices"
                value={formData.specificServices}
                onChange={handleInputChange}
                style={textareaStyle}
                placeholder="e.g., Pipe fitting, leak repairs, etc."
              />
              {errors.specificServices && <p style={{ color: 'red', fontSize: '12px' }}>{errors.specificServices}</p>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Years of Experience</label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="5"
                />
                {errors.yearsOfExperience && <p style={{ color: 'red', fontSize: '12px' }}>{errors.yearsOfExperience}</p>}
              </div>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Certification/License Number (if applicable)</label>
                <input
                  type="text"
                  name="certificationNumber"
                  value={formData.certificationNumber}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="License number"
                />
              </div>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Portfolio/Work Samples (optional)</label>
                <input
                  type="file"
                  name="portfolio"
                  onChange={handleFileChange}
                  style={inputStyle}
                  multiple
                />
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Availability</h2>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Service Hours</label>
              <input
                type="text"
                name="serviceHours"
                value={formData.serviceHours}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="e.g., Mon-Fri: 9AM-5PM, Sat: 10AM-2PM"
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Preferred Work Locations</label>
              <textarea
                name="preferredLocations"
                value={formData.preferredLocations}
                onChange={handleInputChange}
                style={textareaStyle}
                placeholder="e.g., Downtown, Suburbs, etc."
              />
            </div>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Address Information</h2>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Current Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                style={textareaStyle}
                placeholder="Full address"
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Service Area Radius (miles)</label>
              <input
                type="number"
                name="serviceAreaRadius"
                value={formData.serviceAreaRadius}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="25"
              />
            </div>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Payment Information</h2>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Hourly/Flat Rate ($)</label>
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="$0.00"
              />
              {errors.hourlyRate && <p style={{ color: 'red', fontSize: '12px' }}>{errors.hourlyRate}</p>}
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Payment Methods Accepted</label>
              <div style={checkboxContainerStyle}>
                <label style={checkboxLabelStyle}>
                  <input
                    type="checkbox"
                    name="Cash"
                    checked={formData.paymentMethods.includes('Cash')}
                    onChange={handlePaymentMethodChange}
                  /> Cash
                </label>
                <label style={checkboxLabelStyle}>
                  <input
                    type="checkbox"
                    name="Credit Card"
                    checked={formData.paymentMethods.includes('Credit Card')}
                    onChange={handlePaymentMethodChange}
                  /> Credit Card
                </label>
                <label style={checkboxLabelStyle}>
                  <input
                    type="checkbox"
                    name="PayPal"
                    checked={formData.paymentMethods.includes('PayPal')}
                    onChange={handlePaymentMethodChange}
                  /> PayPal
                </label>
                <label style={checkboxLabelStyle}>
                  <input
                    type="checkbox"
                    name="Bank Account"
                    checked={formData.paymentMethods.includes('Bank Account')}
                    onChange={handlePaymentMethodChange}
                  /> Bank Account
                </label>
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Additional Information</h2>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Languages Spoken</label>
              <input
                type="text"
                name="languagesSpoken"
                value={formData.languagesSpoken}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="e.g., English, Spanish"
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Emergency Contact Information (optional)</label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="Name, Relationship & Phone Number"
              />
            </div>
          </div>

          <div style={formGroupStyle}>
            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                name="termsAndConditions"
                checked={formData.termsAndConditions}
                onChange={handleCheckboxChange}
                required
              />
              I agree to the Terms & Conditions
            </label>
            {errors.termsAndConditions && (
              <p style={{ color: 'red', fontSize: '12px' }}>{errors.termsAndConditions}</p>
            )}
          </div>
          <div style={formGroupStyle}>
            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                name="backgroundCheck"
                checked={formData.backgroundCheck}
                onChange={handleCheckboxChange}
                required
              />
              I authorize a background check
            </label>
            {errors.backgroundCheck && (
              <p style={{ color: 'red', fontSize: '12px' }}>{errors.backgroundCheck}</p>
            )}
          </div>

          <button type="submit" style={submitButtonStyle}>
            Submit Registration
          </button>
        </form>

        {/* Step 3: Show the success message popup */}
        {isSubmitted && (
          <div
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: '1000',
            }}
          >
            <div
              style={{
                padding: '30px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
              }}
            >
              <h2 style={{ color: '#4F46E5' }}>Registration Successful!</h2>
              <p>Your registration has been successfully submitted.</p>
              <button
                onClick={() => setIsSubmitted(false)}
                style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  backgroundColor: '#4F46E5',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RegistrationJob;
