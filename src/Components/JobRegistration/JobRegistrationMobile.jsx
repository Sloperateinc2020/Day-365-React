import React, { useState, useEffect } from 'react';
import Footer from '../Footer';

const RegistrationJob = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

   

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      paymentMethods: checked
        ? [...prevFormData.paymentMethods, name]
        : prevFormData.paymentMethods.filter((method) => method !== name),
    }));
  };  const [isSubmitted, setIsSubmitted] = useState(false);
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
    profilePicture: null, 
    alternatePhone: '', 
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

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.email) newErrors.email = 'Email Address is required';
    if (!formData.phone) newErrors.phone = 'Phone Number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };
  if (!isMobile) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>This form is only available on mobile devices.</h2>
      </div>
    );
  }

  return ( 
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '0px',width:'100%', overflowX: 'hidden', // Prevent horizontal scrolling
    }}>
      <style>
        {`
          @media (max-width: 768px) {
            form {
              display: flex;
              flex-direction: column;
              gap: 16px;
               body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }
             div {
            width: 400px;
          }
            }
          }
        `}
      </style>
      <div
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ fontSize: '25px', fontWeight: '500', color: '#333', marginBottom: '10px' }}>
          Service Provider Registration
        </h1>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
          Please fill out the form to register as a service provider
        </p>

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '16px' }}>
              Personal Information
            </h2>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '6px' }}>
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
                placeholder="John Doe"
              />
              {errors.fullName && <p style={{ color: 'red', fontSize: '12px' }}>{errors.fullName}</p>}
            </div>
           {/* Date of Birth */}
<div style={{ marginBottom: '13px' }}> {/* Set marginBottom to 0 to remove the gap */}
  <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '6px' }}>
    Date of Birth
  </label>
  <input
    type="date"
    name="dob"
    value={formData.dob}
    onChange={handleInputChange}
    style={{
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
    }}
  />
  {errors.dob && <p style={{ color: 'red', fontSize: '12px' }}>{errors.dob}</p>}
</div>

{/* Profile Picture */}
<div style={{ marginBottom: '16px' }}> {/* No additional margin on top */}
  <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '6px' }}>
    Profile Picture
  </label>
  <input
    type="file"
    name="profilePicture"
    onChange={handleFileChange}
    style={{
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
    }}
  />
</div>
</div>

          

          {/* Contact Information */}
          <div style={{ marginTop: '-35px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
              Contact Information
            </h2>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '6px' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
                placeholder="john@example.com"
              />
              {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '6px' }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && <p style={{ color: 'red', fontSize: '12px' }}>{errors.phone}</p>}
            </div>
          </div>
 {/* Alternate Contact Number */}
 <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '6px' }}>
                Alternate Contact Number (optional)
              </label>
              <input
                type="tel"
                name="alternatePhone"
                value={formData.alternatePhone}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
                placeholder="+1 (555) 987-6543"
              />
            </div>
          

          {/* Service Details */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '16px' }}>
              Service Details
            </h2>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '6px' }}>
                Service Category
              </label>
              <select
                name="serviceCategory"
                value={formData.serviceCategory}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              >
                <option value="">Select a category</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
              </select>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '6px' }}>
                Specific Services Offered
              </label>
              <textarea
                name="specificServices"
                value={formData.specificServices}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
                placeholder="e.g., Pipe fitting, leak repairs, etc."
              ></textarea>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '6px' }}>
                Years of Experience
              </label>
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
                placeholder="5"
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '6px' }}>
                Certification/License Number
              </label>
              <input
                type="text"
                name="certificationNumber"
                value={formData.certificationNumber}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
                placeholder="License number"
              />
            </div>
            <div style={{ marginBottom: '-16px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '6px' }}>
                Portfolio/Work Samples (optional)
              </label>
              <input
                type="file"
                name="portfolio"
                onChange={handleFileChange}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              />
            </div>
          </div>
                      {/* Service Hours */}
                      <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '6px' }}>
                Service Hours
              </label>
              <input
                type="text"
                name="serviceHours"
                value={formData.serviceHours}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
                placeholder="e.g., Mon-Fri: 9AM-5PM, Sat: 10AM-2PM"
              />
            </div>

            {/* Preferred Work Locations */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '6px' }}>
                Preferred Work Locations
              </label>
              <input
                type="text"
                name="preferredLocations"
                value={formData.preferredLocations}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
                placeholder="e.g., Downtown, Suburbs, etc."
              />
            </div>
            {/* Address Information */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '6px' }}>
                Current Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  resize: 'none',
                }}
                placeholder="Full address"
                rows="3"
              ></textarea>
            </div>

            {/* Service Area Radius */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '6px' }}>
                Service Area Radius (miles)
              </label>
              <input
                type="number"
                name="serviceAreaRadius"
                value={formData.serviceAreaRadius}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
                placeholder="25"
              />
            </div>
            {/* Payment Information */}
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '16px' }}>
                Payment Information
              </h2>
              <label style={{ display: 'block', fontSize: '14px', color: '#333', marginBottom: '6px' }}>
                Hourly/Flat Rate ($)
              </label>
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
                placeholder="50.00"
              />
            </div>

            
<form>
  <div style={{ marginBottom: '16px' }}>
    <h2 style={{ fontSize: '13px', color: '#333', marginBottom: '16px' }}>
      Payment Methods Accepted
    </h2>
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '400px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <input
            type="checkbox"
            name="Cash"
            checked={formData.paymentMethods.includes('Cash')}
            onChange={handleCheckboxChange}
          />
          Cash
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <input
            type="checkbox"
            name="PayPal"
            checked={formData.paymentMethods.includes('PayPal')}
            onChange={handleCheckboxChange}
          />
          PayPal
        </label>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <input
            type="checkbox"
            name="Credit Card"
            checked={formData.paymentMethods.includes('Credit Card')}
            onChange={handleCheckboxChange}
          />
          Credit Card
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <input
            type="checkbox"
            name="Bank Account"
            checked={formData.paymentMethods.includes('Bank Account')}
            onChange={handleCheckboxChange}
          />
          Bank Account
        </label>
      </div>
    </div>
  </div>
</form>

 {/* Additional Information Section */}
 <div style={{ marginBottom: '-15px' }}>
    <h2 style={{ fontSize: '13px', color: '#333', marginBottom: '16px' }}>
      Additional Information
    </h2>
    <div style={{ marginBottom: '16px' }}>
      <label
        style={{
          display: 'block',
          fontSize: '14px',
          color: '#333',
          marginBottom: '6px',
        }}
      >
        Languages Spoken
      </label>
      <input
        type="text"
        name="languagesSpoken"
        value={formData.languagesSpoken}
        onChange={handleInputChange}
        placeholder="e.g., English, Spanish"
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      />
    </div>
    <div style={{ marginBottom: '16px' }}>
      <label
        style={{
          display: 'block',
          fontSize: '14px',
          color: '#333',
          marginBottom: '6px',
        }}
      >
        Emergency Contact Information (optional)
      </label>
      <textarea
        name="emergencyContact"
        value={formData.emergencyContact}
        onChange={handleInputChange}
        placeholder="Name, Relationship, Phone Number"
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px',
          resize: 'none',
        }}
        rows="3"
      ></textarea>
    </div>
  </div>
    {/* Terms and Conditions Section */}
    <div style={{ marginBottom: '-20px' }}>
    <div style={{ marginBottom: '12px' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#333' }}>
        <input
          type="checkbox"
          name="termsAndConditions"
          checked={formData.termsAndConditions}
          onChange={(e) =>
            setFormData({ ...formData, termsAndConditions: e.target.checked })
          }
        />
        I agree to the Terms & Conditions
      </label>
    </div>
    <div style={{ marginBottom: '24px' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#333' }}>
        <input
          type="checkbox"
          name="backgroundCheck"
          checked={formData.backgroundCheck}
          onChange={(e) =>
            setFormData({ ...formData, backgroundCheck: e.target.checked })
          }
        />
        I authorize a background check
      </label>
    </div>
  </div>
          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4F46E5',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
            }}
          >
            Submit Registration
          </button>
        </form>

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
            }}
          >
            <div
              style={{
                padding: '30px',
                backgroundColor: '#fff',
                borderRadius: '8px',
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
