import React from 'react';
import Footer from '../Footer'; 


const RegistrationJob = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const formStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '50px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '4px'
  };

  const subtitleStyle = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '24px'
  };

  const sectionStyle = {
    marginBottom: '24px'
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '16px'
  };

  const formGroupStyle = {
    marginBottom: '16px',
    fontWeight:'550',
    color:'black'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    color: '#333',
    marginBottom: '6px'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    color: '#333',
    height:'40px'
    
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '80px',
    resize: 'vertical'
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23999' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '16px'
  };

  const checkboxContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
    marginTop: '8px'
  };

  const checkboxLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#333',
    gap: '8px'
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
    marginTop: '24px'
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
                <input type="text" style={inputStyle} placeholder="John Doe" />
              </div>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Date of Birth</label>
                <input type="date" style={inputStyle} />
              </div>
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Profile Picture</label>
              <input type="file" style={inputStyle} />
            </div>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Contact Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Email Address</label>
                <input type="email" style={inputStyle} placeholder="john@example.com" />
              </div>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" style={inputStyle} placeholder="+1 (555) 123-4567" />
              </div>
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Alternate Contact Number (optional)</label>
              <input type="tel" style={inputStyle} placeholder="+1 (555) 987-6543" />
            </div>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Service Details</h2>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Service Category</label>
              <select style={selectStyle}>
                <option value="">Select a category</option>
                <option>Plumbing</option>
                <option>Electrical</option>
                <option>Carpentry</option>
              </select>
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Specific Services Offered</label>
              <textarea style={textareaStyle} placeholder="e.g., Pipe fitting, leak repairs, etc." />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Years of Experience</label>
                <input type="number" style={inputStyle} placeholder="5" />
              </div>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Certification/License Number (if applicable)</label>
                <input type="text" style={inputStyle} placeholder="License number" />
              </div>
              <div style={formGroupStyle}>
              <label style={labelStyle}>Portfolio/Work Samples (optional)</label>
              <input type="file" style={inputStyle} multiple />
            </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Availability</h2>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Service Hours</label>
              <input type="text" style={inputStyle} placeholder="e.g., Mon-Fri: 9AM-5PM, Sat: 10AM-2PM" />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Preferred Work Locations</label>
              <textarea style={textareaStyle} placeholder="e.g., Downtown, Suburbs, etc." />
            </div>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Address Information</h2>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Current Address</label>
              <textarea style={textareaStyle} placeholder="Full address" />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Service Area Radius (miles)</label>
              <input type="number" style={inputStyle} placeholder="25" />
            </div>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Payment Information</h2>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Hourly/Flat Rate ($)</label>
              <input type="number" style={inputStyle} placeholder="$0.00" />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Payment Methods Accepted</label>
              <div style={checkboxContainerStyle}>
                <label style={checkboxLabelStyle}>
                  <input type="checkbox" /> Cash
                </label>
                <label style={checkboxLabelStyle}>
                  <input type="checkbox" /> Credit Card
                </label>
                <label style={checkboxLabelStyle}>
                  <input type="checkbox" /> PayPal
                </label>
                <label style={checkboxLabelStyle}>
                  <input type="checkbox" /> Bank Account
                </label>
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Additional Information</h2>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Languages Spoken</label>
              <input type="text" style={inputStyle} placeholder="e.g., English, Spanish" />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Emergency Contact Information (optional)</label>
              <input type="text" style={inputStyle} placeholder="Name, Relationship & Phone Number" />
            </div>
          </div>

          <div style={formGroupStyle}>
            <label style={checkboxLabelStyle}>
              <input type="checkbox" required />
              I agree to the Terms & Conditions
            </label>
          </div>
          <div style={formGroupStyle}>
            <label style={checkboxLabelStyle}>
              <input type="checkbox" required />
              I authorize a background check
            </label>
          </div>

          <button type="submit" style={submitButtonStyle}>
            Submit Registration
          </button>
        </form>
      </div>
      <Footer /> 
    </div>
  );
};

export default RegistrationJob;