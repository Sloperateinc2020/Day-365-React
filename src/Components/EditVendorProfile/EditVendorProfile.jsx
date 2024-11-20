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
    serviceArea: '15 miles',
    pricePerService: '', // Correct field name
    paymentMethods: [],
    availability: true,
    services: {
      residential: false,
      commercial: false,
      emergency: false,
      maintenance: false,
    },
  });

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  const handlePaymentChange = (method) => {
    setServiceData((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter((item) => item !== method)
        : [...prev.paymentMethods, method],
    }));
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

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!profileData.fullName) return 'Full Name is required.';
    if (!emailRegex.test(profileData.email)) return 'A valid Email is required.';
    if (!profileData.phoneNumber) return 'Phone Number is required.';
    if (!profileData.yearsOfExperience) return 'Years of Experience is required.';
    if (!profileData.licenseNumber) return 'License Number is required.';
    if (!profileData.servicesOffered) return 'Services Offered are required.';
    if (!serviceData.hourlyRate) return 'Hourly Rate is required.';
    if (!serviceData.serviceArea) return 'Service Area is required.';
    if (!serviceData.pricePerService) return 'Price per Service is required.';

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
      console.log('Sending request data:', requestData);

      const response = await fetch('http://localhost:8080/api/vendor-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.text();

      if (response.ok) {
        console.log('Profile saved successfully:', result);
        alert('Profile saved successfully!');
      } else {
        console.error('Error:', result);
        alert('Failed to save the profile: ' + result);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the profile.');
    }
  };

  return (
    <>
      <div style={{ maxWidth: '600px', margin: '100px auto', fontFamily: 'Arial, sans-serif' }}>
        <h2>Edit Vendor Profile</h2>
        <p style={{ color: 'gray' }}>Update your profile and service information</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Profile Fields */}
          <div>
            <label htmlFor="fullName" style={{ fontWeight: 'bold' }}>Full Name</label>
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
            <label htmlFor="email" style={{ fontWeight: 'bold' }}>Email</label>
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
            <label htmlFor="phoneNumber" style={{ fontWeight: 'bold' }}>Phone Number</label>
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
            <label htmlFor="yearsOfExperience" style={{ fontWeight: 'bold' }}>Years of Experience</label>
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
            <label htmlFor="licenseNumber" style={{ fontWeight: 'bold' }}>License Number</label>
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
            <label htmlFor="servicesOffered" style={{ fontWeight: 'bold' }}>Services Offered</label>
            <textarea
              id="servicesOffered"
              name="servicesOffered"
              value={profileData.servicesOffered}
              onChange={handleProfileChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '60px' }}
            />
          </div>

          {/* Service Settings Fields */}
          <div>
            <label htmlFor="hourlyRate" style={{ fontWeight: 'bold' }}>Hourly Rate ($)</label>
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
            <label htmlFor="serviceArea" style={{ fontWeight: 'bold' }}>Service Area</label>
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
            <label htmlFor="pricePerService" style={{ fontWeight: 'bold' }}>Price per Service ($)</label>
            <input
              type="number"
              id="pricePerService"
              name="pricePerService"
              value={serviceData.pricePerService}
              onChange={handleServiceChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ fontWeight: 'bold' }}>Payment Methods Accepted</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {['Cash', 'Credit Card', 'Online', 'Bank Account'].map((method) => (
                <label key={method}>
                  <input
                    type="checkbox"
                    checked={serviceData.paymentMethods.includes(method)}
                    onChange={() => handlePaymentChange(method)}
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>
          <div>
  <label style={{ fontWeight: 'bold' }}>Availability</label>
  <div
    onClick={handleToggleAvailability}
    style={{
      cursor: 'pointer',
      marginTop: '5px',
      display: 'flex',
      alignItems: 'center',
    }}
  >
    {/* Toggle Button */}
    <div
      style={{
        width: '50px',
        height: '24px',
        backgroundColor: serviceData.availability ? 'black' : '#ccc',
        borderRadius: '12px',
        position: 'relative',
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
      />
    </div>

    {/* Availability Status Text */}
    <span style={{ marginLeft: '10px', color: 'black' }}>
      {serviceData.availability ? 'Currently Available for Work' : 'Not Available'}
    </span>
  </div>
</div>

          <div>
            <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Types of Services</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {['residential', 'commercial', 'emergency', 'maintenance'].map((serviceType) => (
                <label key={serviceType} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    name={serviceType}
                    checked={serviceData.services[serviceType]}
                    onChange={handleServiceCheckboxChange}
                  />
                  {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 20px',
              cursor: 'pointer',
            }}
          >
            Save Changes
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditVendorProfile;
