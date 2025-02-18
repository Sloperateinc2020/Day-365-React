import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaChevronLeft, FaEdit } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";

const ConfirmBooking = () => {
  const location = useLocation();
  const { date, time } = location.state || {};
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedPayment, setSelectedPayment] = useState("Pay Online");
  const [selectedService, setSelectedService] = useState("Normal");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
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

  const handleConfirmBooking = () => {
    const { name, email, address, phone, pincode } = formData;
    if (!name || !email || !address || !phone || !pincode) {
      alert("Please fill in all the required fields.");
      return;
    }
    setIsBookingConfirmed(true);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleServiceSelection = (service) => {
    setSelectedService(service);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#fff", minHeight: "100vh", position: "relative" }}>
      {/* Confirmation Popup */}
      {showConfirmation && (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "rgba(255, 255, 255, 0.95)", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", width: "80%", maxWidth: "300px" }}>
          <IoCheckmarkCircle style={{ color: "#4CAF50", fontSize: "50px" }} />
          <h3 style={{ margin: "0", color: "#333", fontSize: "18px", textAlign: "center" }}>Booking Confirmed!</h3>
          <p style={{ margin: "0", color: "#666", fontSize: "14px", textAlign: "center" }}>Your service has been successfully booked.</p>
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <FaChevronLeft style={{ fontSize: "18px", cursor: "pointer" }} />
        <h2 style={{ flex: 1, textAlign: "center", margin: "0", fontSize: "18px" }}>Confirm Booking</h2>
      </div>

      {/* User Info */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <p style={{ margin: "0", fontWeight: "bold" }}>Suresh Babu</p>
          <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>+27-xxxx-xxxx</p>
        </div>
        <FaChevronLeft style={{ fontSize: "14px", transform: "rotate(180deg)", cursor: "pointer" }} />
      </div>

      {/* Service Type */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", backgroundColor: "#f0f0f0", borderRadius: "10px", padding: "5px" }}>
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

      <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>(Note: Immediate service may charge extra 20%)</p>

      {/* Edit Option */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
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
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>{field}</label>
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
        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>Booking Date & Time</label>
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
            <div style={{ display: "flex", gap: "10px", padding: "10px", backgroundColor: "#fff", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ flex: 1, padding: "8px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px" }}
              />
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                style={{ flex: 1, padding: "8px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px" }}
              />
              <button
                onClick={handleDateTimeEdit}
                style={{ padding: "8px 16px", backgroundColor: "#000", color: "#fff", border: "none", borderRadius: "4px", fontSize: "14px", cursor: "pointer" }}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Payment Options */}
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f9f9f9", borderRadius: "25px", padding: "5px" }}>
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
          marginBottom: '70px'
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
};

export default ConfirmBooking;