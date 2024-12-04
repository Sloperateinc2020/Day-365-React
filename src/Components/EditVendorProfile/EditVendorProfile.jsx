import React, { useState } from 'react';
import Footer from '../Footer';

const EditVendorProfile = () => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    yearsOfExperience: '',
    licenseNumber: '',
    servicesOffered: '',
  });

  const [serviceData, setServiceData] = useState({
    hourlyRate: '',
    serviceArea: '',
    availability: true,
    services: {
      residential: false,
      commercial: false,
      emergency: false,
      maintenance: false,
    },
    paymentMethods: { 
      cash: false,
      creditCard: false,
      online: false,
      bankAccount: false,
    },
    pricePerService: '',
  });

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  const handleToggleAvailability = () => {
    setServiceData({ ...serviceData, availability: !serviceData.availability });
  };

  const handleServiceCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setServiceData({
      ...serviceData,
      services: { ...serviceData.services, [name]: checked },
    });
  };
  const handlePaymentCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setServiceData({
      ...serviceData,
      paymentMethods: { ...serviceData.paymentMethods, [name]: checked },
    });
  };
  const handlePriceChange = (e) => {
    const value = e.target.value;
    setServiceData({ ...serviceData, pricePerService: value });
  };  
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!profileData.fullName) return "Full Name is required.";
    if (!emailRegex.test(profileData.email)) return "A valid Email is required.";
    if (!profileData.phoneNumber) return "Phone Number is required.";
    if (!profileData.yearsOfExperience) return "Years of Experience is required.";
    if (!profileData.licenseNumber) return "License Number is required.";
    if (!profileData.servicesOffered) return "Services Offered are required.";
    if (!serviceData.hourlyRate) return "Hourly Rate is required.";
    if (!serviceData.serviceArea) return "Service Area is required.";
    const paymentMethodsSelected = Object.values(serviceData.paymentMethods).some((value) => value);
    if (!paymentMethodsSelected) return "Please select at least one Payment Method.";
    const servicesSelected = Object.values(serviceData.services).some((value) => value);
    if (!servicesSelected) return "Please select at least one Service.";
    if (!serviceData.pricePerService || serviceData.pricePerService <= 0) {
      return "Please set a valid Price per Service.";
    }
  
    return null; // Form is valid
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationMessage = validateForm();
    if (validationMessage) {
      alert(validationMessage);
      return;
    }

    const requestData = { ...profileData, ...serviceData };

    try {
      console.log("Sending request data:", requestData);

      const response = await fetch('http://localhost:8080/api/vendor-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const contentType = response.headers.get('Content-Type');
      const responseText = await response.text();

      if (contentType && contentType.includes('application/json')) {
        try {
          const result = JSON.parse(responseText);
          console.log('Profile saved successfully:', result);
          alert('Profile saved successfully!');
        } catch (error) {
          console.error('Error parsing JSON response:', error);
          alert('Failed to parse the JSON response.');
        }
      } else if (contentType && contentType.includes('text/plain')) {
        console.log('Response (plain text):', responseText);
        alert(responseText);
      } else {
        console.error('Unexpected content type. Response:', responseText);
        alert('Unexpected response from server.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the profile.');
    }
  };

  return (
    <>
      <div style={{ maxWidth: '500px', margin: '100px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'left', marginTop: '30px' }}>Edit Plumber Profile</h2>

        <p style={{ textAlign: 'left', color: 'gray' }}>Update your profile and service information</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="fullName" style={{ display: 'block', marginBottom: '5px' }}>Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={profileData.fullName}
              onChange={handleProfileChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleProfileChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" style={{ display: 'block', marginBottom: '5px' }}>Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleProfileChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label htmlFor="yearsOfExperience" style={{ display: 'block', marginBottom: '5px' }}>Years of Experience</label>
            <input
              type="number"
              id="yearsOfExperience"
              name="yearsOfExperience"
              value={profileData.yearsOfExperience}
              onChange={handleProfileChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label htmlFor="licenseNumber" style={{ display: 'block', marginBottom: '5px' }}>License Number</label>
            <input
              type="text"
              id="licenseNumber"
              name="licenseNumber"
              value={profileData.licenseNumber}
              onChange={handleProfileChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label htmlFor="servicesOffered" style={{ display: 'block', marginBottom: '5px' }}>Services Offered</label>
            <textarea
              id="servicesOffered"
              name="servicesOffered"
              value={profileData.servicesOffered}
              onChange={handleProfileChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '60px' }}
            />
          </div>

          <div>
            <label htmlFor="hourlyRate" style={{ display: 'block', marginBottom: '5px' }}>Hourly Rate ($)</label>
            <input
              type="number"
              id="hourlyRate"
              name="hourlyRate"
              value={serviceData.hourlyRate}
              onChange={handleServiceChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label htmlFor="serviceArea" style={{ display: 'block', marginBottom: '5px' }}>Service Area</label>
            <select
              id="serviceArea"
              name="serviceArea"
              value={serviceData.serviceArea}
              onChange={handleServiceChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="10 miles">10 miles</option>
              <option value="15 miles">15 miles</option>
              <option value="20 miles">20 miles</option>
              <option value="25 miles">25 miles</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Price per Service</label>
            <input
              type="number"
              name="pricePerService"
              value={serviceData.pricePerService}
              onChange={handlePriceChange}
              placeholder="Enter price"
              step="1"
              min="0"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Payment Methods Accepted</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <label>
                <input
                  type="checkbox"
                  name="cash"
                  checked={serviceData.paymentMethods.cash}
                  onChange={handlePaymentCheckboxChange}
                  style={{ marginRight: '5px' }}
                />
                Cash
              </label>
              <label>
                <input
                  type="checkbox"
                  name="creditCard"
                  checked={serviceData.paymentMethods.creditCard}
                  onChange={handlePaymentCheckboxChange}
                  style={{ marginRight: '5px' }}
                />
                Credit Card
              </label>
              <label>
                <input
                  type="checkbox"
                  name="online"
                  checked={serviceData.paymentMethods.online}
                  onChange={handlePaymentCheckboxChange}
                  style={{ marginRight: '5px' }}
                />
                Online
              </label>
              <label>
                <input
                  type="checkbox"
                  name="bankAccount"
                  checked={serviceData.paymentMethods.bankAccount}
                  onChange={handlePaymentCheckboxChange}
                  style={{ marginRight: '5px' }}
                />
                Bank Account
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="availability" style={{ display: 'block', marginBottom: '5px' }}>Availability</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                onClick={handleToggleAvailability}
                style={{
                  display: 'inline-block',
                  width: '50px',
                  height: '24px',
                  backgroundColor: serviceData.availability ? '#4caf50' : '#ccc',
                  borderRadius: '24px',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    left: serviceData.availability ? '28px' : '2px',
                    transition: 'left 0.2s',
                  }}
                ></div>
              </div>
              <span>{serviceData.availability ? 'Currently Available for Work' : 'Not Available'}</span>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Services</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <label>
                <input
                  type="checkbox"
                  name="residential"
                  checked={serviceData.services.residential}
                  onChange={handleServiceCheckboxChange}
                  style={{ marginRight: '5px' }}
                />
                Residential
              </label>
              <label>
                <input
                  type="checkbox"
                  name="commercial"
                  checked={serviceData.services.commercial}
                  onChange={handleServiceCheckboxChange}
                  style={{ marginRight: '5px' }}
                />
                Commercial
              </label>
              <label>
                <input
                  type="checkbox"
                  name="emergency"
                  checked={serviceData.services.emergency}
                  onChange={handleServiceCheckboxChange}
                  style={{ marginRight: '5px' }}
                />
                Emergency
              </label>
              <label>
                <input
                  type="checkbox"
                  name="maintenance"
                  checked={serviceData.services.maintenance}
                  onChange={handleServiceCheckboxChange}
                  style={{ marginRight: '5px' }}
                />
                Maintenance
              </label>
            </div>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: '#007bff', // Blue shade
              color: '#fff',
              padding: '10px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'center',
              fontWeight: 'bold', // Bold text
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
              transition: 'background-color 0.3s ease', // Smooth color transition
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')} // Darker blue on hover
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')} // Original blue on mouse leave
          >
            Save Changes
          </button>

        </form>
      </div>

      <Footer />
    </>
  );
};

export default  EditVendorProfile;
