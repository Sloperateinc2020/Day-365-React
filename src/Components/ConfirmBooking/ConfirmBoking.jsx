import React, { useState } from 'react';
import Footer from "../Footer";

const ConfirmBooking = () => {
  const [serviceType, setServiceType] = useState('normal');
  const [paymentMethod, setPaymentMethod] = useState('payAfterService');
  const [isEditingDateTime, setIsEditingDateTime] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2024-10-10');
  const [selectedTime, setSelectedTime] = useState('21:30');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    pincode: ''
  });
    // New state for booking confirmation
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateTimeEdit = () => {
    setIsEditingDateTime(!isEditingDateTime);
  };

  const handleDateTimeSubmit = () => {
    setIsEditingDateTime(false);
  };

  const formatDateTime = () => {
    const date = new Date(selectedDate + 'T' + selectedTime);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };
  // Handle Confirm Booking
  const handleConfirmBooking = () => {
    // Check if all required fields are filled
    const { name, email, address, phone, pincode } = formData;
    if (!name || !email || !address || !phone || !pincode) {
      alert("Please fill in all the required fields.");
      return; // Prevent confirmation if any field is empty
    }

    // If all fields are filled, proceed to confirm the booking
    setIsBookingConfirmed(true);
  };

  

  return (
    <div style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: 'white',
      border: '1px solid #e6e6fa',
      borderRadius: '8px',
      boxShadow: '0 0 0 1px #e6e6fa',
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        marginTop: '40px',
      }}>Confirm Booking</h1>

      {/* Service Provider */}
      <div>
        <h2 style={{ fontSize: '15px', fontWeight: 'bold', color: 'black' }}>Service Provider</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <img 
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop" 
              alt="Suresh Babu"
              style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '-5px' }}>Suresh Babu</p>
              <p style={{ fontSize: '12px', color: 'blue' }}>Plumber</p>
              <div style={{ display: 'flex', gap: '4px', fontSize: '12px', color: '#666' }}>
                <span>4.7</span>
                <span>•</span>
                <span>1,000 reviews</span>
              </div>
            </div>
          </div>
          <span style={{ color: '#666' }}>›</span>
        </div>
      </div>

      {/* Service Type */}
      <div>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', marginTop: '-10px', color: 'black' }}>Service Type</h2>
        <div style={{ display: 'flex', gap: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="serviceType"
              value="normal"
              checked={serviceType === 'normal'}
              onChange={(e) => setServiceType(e.target.value)}
              style={{ accentColor: '#4F46E5' }}
            />
            <span style={{ fontSize: '14px' }}>Normal</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="serviceType"
              value="immediate"
              checked={serviceType === 'immediate'}
              onChange={(e) => setServiceType(e.target.value)}
              style={{ accentColor: '#4F46E5' }}
            />
            <span style={{ fontSize: '14px' }}>Immediate</span>
          </label>
        </div>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '14px' }}>
          (Note: Immediate service may charge an extra $20)
        </p>
      </div>

      {/* Customer Details */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '-15px', color: 'black' }}>Customer Details</h2>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            style={{ color: '#4F46E5', fontSize: '15px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            EDIT
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', borderColor: 'black' }}>NAME</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your Name"
              disabled={!isEditing}
              style={{ 
                width: '70%', 
                padding: '12px', 
                border: '1px solid #ddd', 
                borderRadius: '4px', 
                fontSize: '13px',
                borderColor: 'black',
                backgroundColor: isEditing ? 'white' : '#f5f5f5'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold' }}>EMAIL</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your Email"
              disabled={!isEditing}
              style={{ 
                width: '70%', 
                padding: '12px', 
                border: '1px solid #ddd', 
                borderRadius: '4px', 
                fontSize: '13px',
                borderColor: 'black',
                backgroundColor: isEditing ? 'white' : '#f5f5f5'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold' }}>HOME ADDRESS</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your Address"
              disabled={!isEditing}
              style={{ 
                width: '70%', 
                padding: '12px', 
                border: '1px solid #ddd', 
                borderRadius: '4px', 
                fontSize: '13px',
                borderColor: 'black',
                backgroundColor: isEditing ? 'white' : '#f5f5f5'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold' }}>PHONE</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your Number"
              disabled={!isEditing}
              style={{ 
                width: '70%', 
                padding: '12px', 
                border: '1px solid #ddd', 
                borderRadius: '4px', 
                fontSize: '13px',
                borderColor: 'black',
                backgroundColor: isEditing ? 'white' : '#f5f5f5'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold' }}>PINCODE</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              placeholder="Enter Pincode"
              disabled={!isEditing}
              style={{ 
                width: '70%', 
                padding: '12px', 
                border: '1px solid #ddd', 
                borderRadius: '4px', 
                fontSize: '13px',
                borderColor: 'black',
                backgroundColor: isEditing ? 'white' : '#f5f5f5'
              }}
            />
          </div>
        </div>
      </div>

      {/* Booking Date & Time */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '-15px', color: 'black' }}>Booking Date & Time</h2>
          <button 
            onClick={handleDateTimeEdit}
            style={{ color: '#4F46E5', fontSize: '14px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            EDIT
          </button>
        </div>
        {isEditingDateTime ? (
          <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
          }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Select Time</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }}
              />
            </div>
            <button
              onClick={handleDateTimeSubmit}
              style={{
                backgroundColor: '#4F46E5',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 16px',
                fontSize: '13px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Confirm Date & Time
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 'bold' }}>
            <span style={{ color: '#666' }}>📅</span>
            <span>{formatDateTime()}</span>
          </div>
        )}
      </div>

      {/* Payment Method */}
      <div>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '-10px', color: 'black' }}>Payment Method</h2>
        <div style={{ display: 'flex', gap: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="paymentMethod"
              value="payOnline"
              checked={paymentMethod === 'payOnline'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ accentColor: '#4F46E5' }}
            />
            <span style={{ fontSize: '14px' }}>Pay Online</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="paymentMethod"
              value="payOnApp"
              checked={paymentMethod === 'payOnApp'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ accentColor: '#4F46E5' }}
            />
            <span style={{ fontSize: '14px' }}>Pay On App</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="paymentMethod"
              value="payAfterService"
              checked={paymentMethod === 'payAfterService'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ accentColor: '#4F46E5' }}
            />
            <span style={{ fontSize: '14px' }}>Pay After Service</span>
          </label>
        </div>
      </div>

      {/* Total */}
      <div>
        <div style={{ padding: '20px', marginLeft: '-30px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              margin: '0',
              color: '#000'
            }}>
              Total
            </h2>
            <span style={{ 
              fontSize: '14px',
              color: '#666',
              marginTop: '6px'
            }}>
              (Note: Platform fee of $20 has to be paid to Confirm Booking)
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '13px', color: 'black' }}>Platform Fee (has to pay Now to confirm)</span>
          <span style={{ fontSize: '13px' }}>$20</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <span style={{ fontSize: '13px', color: 'black' }}>Service Fee</span>
          <span style={{ fontSize: '13px' }}>$160</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '15px' }}>
          <span style={{ fontSize: '14px', fontWeight: '200', color: '#666' }}>Total</span>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>$180</span>
        </div>
      </div>

      {/* Confirm Button */}
      <button style={{
        width: '20%',
        padding: '12px',
        backgroundColor: '#4F46E5',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        cursor: 'pointer',
        marginTop: '20px',
        marginLeft: '400px'
      }}
        onClick={handleConfirmBooking}
        >
        ₹99 Confirm Booking
      </button>
       {/* Booking Confirmation Message */}
       {isBookingConfirmed && (
        <p style={{ color: 'green', textAlign: 'center', marginTop: '20px', fontSize: '16px' }}>
          Your booking has been confirmed! 🎉
        </p>
        
      )}

      <Footer />
    </div>
  );
};

export default ConfirmBooking;