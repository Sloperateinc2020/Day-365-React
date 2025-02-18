import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaChevronLeft, FaEdit, FaCalendarAlt } from "react-icons/fa";
import Footer from "../Footer";
import { IoCheckmarkCircle } from "react-icons/io5";

const ConfirmBooking = () => {
  const location = useLocation();
  const { date, time } = location.state || {};
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedPayment, setSelectedPayment] = useState("Pay Online");
const [selectedService, setSelectedService] = useState("Normal");
const [showConfirmation, setShowConfirmation] = useState(false);
// Add these to your existing useState declarations at the top
const [showDateTimePicker, setShowDateTimePicker] = useState(false);


 // Hide the confirmation after 3 seconds
 setTimeout(() => {
  setShowConfirmation(false);
}, 3000);

const handleEditClick = () => {
  setIsEditing((prev) => !prev);
};

const handleServiceSelection = (service) => {
  setSelectedService(service);
};



  const [serviceType, setServiceType] = useState('normal');
  const [paymentMethod, setPaymentMethod] = useState('payAfterService');
  const [isEditingDateTime, setIsEditingDateTime] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date || '2024-10-10');
  const [selectedTime, setSelectedTime] = useState(time || '21:30');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({

    name: '',
    email: '',
    address: '',
    phone: '',
    pincode: ''
  });
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateTimeEdit = () => {
    setShowDateTimePicker(!showDateTimePicker);
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

  const handleConfirmBooking = () => {
    const { name, email, address, phone, pincode } = formData;
    if (!name || !email || !address || !phone || !pincode) {
      alert("Please fill in all the required fields.");
      return;
    }
    setIsBookingConfirmed(true);
  };

 
  // Mobile version
  if (isMobile) {
    return (
      <div
        style={{
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#fff",
          minHeight: "100vh",
          position: "relative", // Added for popup positioning
        }}
      >
        {/* Confirmation Popup */}
        {showConfirmation && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              width: "80%",
              maxWidth: "300px",
            }}
          >
            <IoCheckmarkCircle
              style={{
                color: "#4CAF50",
                fontSize: "50px",
              }}
            />
            <h3
              style={{
                margin: "0",
                color: "#333",
                fontSize: "18px",
                textAlign: "center",
              }}
            >
              Booking Confirmed!
            </h3>
            <p
              style={{
                margin: "0",
                color: "#666",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              Your service has been successfully booked.
            </p>
          </div>
        )}

        {/* Rest of your existing mobile version code */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          <FaChevronLeft style={{ fontSize: "18px", cursor: "pointer" }} />
          <h2 style={{ flex: 1, textAlign: "center", margin: "0", fontSize: "18px" }}>
            Confirm Booking
          </h2>
        </div>

        {/* User Info */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <p style={{ margin: "0", fontWeight: "bold" }}>Suresh Babu</p>
            <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
              +27-xxxx-xxxx
            </p>
          </div>
          <FaChevronLeft
            style={{ fontSize: "14px", transform: "rotate(180deg)", cursor: "pointer" }}
          />
        </div>

        {/* Service Type */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            backgroundColor: "#f0f0f0",
            borderRadius: "10px",
            padding: "5px",
          }}
        >
          <button
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: selectedService === "Normal" ? "#fff" : "#f0f0f0",
              color: selectedService === "Normal" ? "#000" : "#666",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => handleServiceSelection("Normal")}
          >
            Normal
          </button>
          <button
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: selectedService === "Immediate" ? "#fff" : "#f0f0f0",
              color: selectedService === "Immediate" ? "#000" : "#666",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => handleServiceSelection("Immediate")}
          >
            Immediate
          </button>
        </div>

        <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>
          (Note: Immediate service may charge extra 20%)
        </p>

        {/* Edit Option Above Name */}
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}
        >
          <button
            style={{
              padding: "5px 15px",
              border: "1px solid #ddd",
              borderRadius: "15px",
              backgroundColor: "#f9f9f9",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
            }}
            onClick={handleEditClick}
          >
            EDIT
          </button>
        </div>

        {/* Input Fields */}
        {["NAME", "EMAIL", "HOME ADDRESS", "PHONE", "PINCODE"].map((field) => (
          <div key={field} style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {field}
            </label>
            <input
              type="text"
              placeholder={field}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "14px",
                backgroundColor: isEditing ? "#fff" : "#f9f9f9",
                pointerEvents: isEditing ? "auto" : "none",
              }}
            />
          </div>
        ))}

{/* Booking Date & Time */}
<div style={{ marginBottom: "15px" }}>
  <label
    style={{
      display: "block",
      marginBottom: "5px",
      fontSize: "14px",
      fontWeight: "bold",
    }}
  >
    Booking Date & Time
  </label>
  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="text"
        value={`${selectedDate || "YYYY-MM-DD"} ${selectedTime || "HH:MM"}`}
        readOnly
        style={{
          flex: 1,
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          fontSize: "14px",
          backgroundColor: "#f9f9f9",
        }}
      />
      <button
        onClick={handleDateTimeEdit}
        style={{
          marginLeft: "-35px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "14px",
          color: "#666",
        }}
      >
        <FaEdit />
      </button>
    </div>
    
    {showDateTimePicker && (
      <div style={{ 
        display: "flex", 
        gap: "10px",
        padding: "10px",
        backgroundColor: "#fff",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px"
          }}
        />
        <input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px"
          }}
        />
        <button
          onClick={handleDateTimeEdit}
          style={{
            padding: "8px 16px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "14px",
            cursor: "pointer"
          }}
        >
          Save
        </button>
      </div>
    )}
  </div>
</div>


        {/* Payment Options */}
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
            borderRadius: "25px",
            padding: "5px",
          }}
        >
          <button
            onClick={() => setSelectedPayment("Pay Online")}
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              borderRadius: "25px",
              backgroundColor: selectedPayment === "Pay Online" ? "#fff" : "transparent",
              cursor: "pointer",
              boxShadow: selectedPayment === "Pay Online" ? "0px 0px 5px rgba(0,0,0,0.1)" : "none",
              fontSize: "9.9px",
            }}
          >
            Pay Online
          </button>
          <button
            onClick={() => setSelectedPayment("Pay On App")}
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              borderRadius: "25px",
              backgroundColor: selectedPayment === "Pay On App" ? "#fff" : "transparent",
              cursor: "pointer",
              boxShadow: selectedPayment === "Pay On App" ? "0px 0px 5px rgba(0,0,0,0.1)" : "none",
              color: selectedPayment === "Pay On App" ? "#000" : "#666",
              fontSize: "9.9px",
            }}
          >
            Pay On App
          </button>
          <button
            onClick={() => setSelectedPayment("Pay After Service")}
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              borderRadius: "25px",
              backgroundColor: selectedPayment === "Pay After Service" ? "#fff" : "transparent",
              cursor: "pointer",
              boxShadow: selectedPayment === "Pay After Service" ? "0px 0px 5px rgba(0,0,0,0.1)" : "none",
              color: selectedPayment === "Pay After Service" ? "#000" : "#666",
              fontSize: "9.9px",
            }}
          >
            Pay After Service
          </button>
        </div>

        {/* Fees Breakdown */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
            <span style={{ fontSize: "14px", color: "#666" }}>Platform Fee</span>
            <span style={{ fontSize: "14px", fontWeight: "300" }}>$20</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
            <span style={{ fontSize: "14px", color: "#666" }}>Service Fee</span>
            <span style={{ fontSize: "14px", fontWeight: "300" }}>$160</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "14px", color: "#666" }}>Immediate Service Fee</span>
            <span style={{ fontSize: "14px", fontWeight: "300" }}>$0</span>
          </div>
        </div>

        {/* Total Amount */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>Total $180</span>
        </div>

        {/* Confirm Booking Button */}
        <button
          onClick={handleConfirmBooking}
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom:'70px'
          }}
        >
          Pay $20 & Confirm Booking
        </button>
         {/* Booking Confirmation Message */}
      {isBookingConfirmed && (
        <p style={{ color: 'green', textAlign: 'center', marginTop: '20px', fontSize: '16px' }}>
          Your booking has been confirmed! 🎉
        </p>
      )}
      </div>
    );
  }
  // Desktop version
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
              <p style={{ fontSize: '12px', color: 'blue',marginTop:'12px',marginLeft:'12px' }}>Plumber</p>
              <div style={{ display: 'flex', gap: '4px', fontSize: '12px', color: '#666',marginTop:'8px' }}>
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
            style={{
              fontSize: '16px',
              color: '#4F46E5',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight:'bold',
              marginTop:'-100px',
            }}>
            {isEditingDateTime ? 'Save' : 'Edit'}
          </button>
        </div>

        {isEditingDateTime ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)} 
              style={{ fontSize: '14px', padding: '5px' }}
            />
            <input 
              type="time" 
              value={selectedTime} 
              onChange={(e) => setSelectedTime(e.target.value)} 
              style={{ fontSize: '14px', padding: '5px' }}
            />
            <button 
              onClick={handleDateTimeSubmit} 
              style={{
                fontSize: '14px',
                color: '#4F46E5',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}>
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 'bold' }}>
            <span style={{ color: '#666' }}>📅</span>
            <span>{date ? date : selectedDate} at {time ? time : selectedTime}</span>
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