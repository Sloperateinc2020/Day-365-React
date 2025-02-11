import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Footer from '../Footer'; // Make sure this path is correct

const UserVendorProfileMobile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleEditProfileClick = () => {
    setIsEditable(!isEditable);
  };

  // Initialize formData state with empty strings or appropriate initial values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
  });

  // Function to handle changes to form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div style={{ position: "relative", padding: "20px", fontFamily: "Arial, sans-serif", marginTop: "50px" }}>
      {/* Cover Background */}
      <div style={{
        position: "absolute",
        top: "-100px",
        left: 0,
        width: "100%",
        height: "15%",
        backgroundColor: "#3f51b5",
        zIndex: -1
      }}></div>

      {/* Change Cover Button */}
      <button
        style={{
          position: "absolute",
          top: "-30px",
          right: "25px",
          backgroundColor: "white",
          color: "#1c237e",
          border: "2px solid #1c237e",
          borderRadius: "8px",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          cursor: "pointer",
          boxShadow: "0px 2px 5px rgba(15, 12, 201, 0.2)",
        }}
      >
        <span>📷</span> Change Cover
      </button>

      {/* Profile Container */}
      <div style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        marginBottom: "20px",
      }}>
        {/* Profile Picture */}
        <div style={{
          width: "80px",
          height: "80px",
          backgroundColor: "#ccc",
          borderRadius: "50%",
          margin: "0 auto 10px",
        }}></div>

        <h3 style={{ margin: "0 0 5px" }}>Thirupathi Raju Vattem</h3>
        <p style={{ margin: "0", color: "gray" }}>Haryak Inc.</p>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "space-around", margin: "20px 0" }}>
          <div>
            <span>Opportunities applied</span>
            <br />
            <strong style={{ color: "green" }}>2</strong>
          </div>
          <div>
            <span>Completed Bookings</span>
            <br />
            <strong style={{ color: "green" }}>26</strong>
          </div>
          <div>
            <span>Upcoming Bookings</span>
            <br />
            <strong style={{ color: "green" }}>6</strong>
          </div>
        </div>

        {/* Public Profile Button */}
        <button
          style={{
            padding: "10px 15px",
            border: "none",
            backgroundColor: "#007BFF",
            color: "white",
            borderRadius: "5px",
            width: "100%",
          }}
        >
          View Public Profile
        </button>

        {/* Profile Link */}
        <input
          type="text"
          value="https://app.ahiregro.com"
          readOnly
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            textAlign: "center",
          }}
        />
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "10px" }}>
        <button
          style={{
            padding: "10px 20px",
            border: "1px solid #007bff",
            backgroundColor: "#fff",
            color: "#007bff",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={() => navigate("/account-settings")}
        >
          Account Settings
        </button>
      </div>

      {/* Form Section */}
      <div style={{
        background: "#fff",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "30px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}>
        <form>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {[
              { label: "First Name", name: "firstName", type: "text" },
              { label: "Last Name", name: "lastName", type: "text" },
              { label: "Phone Number", name: "phone", type: "text" },
              { label: "Email Address", name: "email", type: "email" },
              { label: "City", name: "city", type: "text" },
              { label: "State", name: "state", type: "text" },
              { label: "Postcode", name: "postcode", type: "text" },
              { label: "Country", name: "country", type: "text" },
            ].map((field, index) => (
              <div key={index} style={{ flex: "1 5 calc(50% - 5px)" }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  value={formData[field.name]}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              type="button"
              onClick={handleEditProfileClick}
              style={{
                backgroundColor: isEditable ? '#28a745' : '#007bff',
                color: 'white',
                padding: '12px',
                border: 'none',
                width: '30%',
                borderRadius: '5px',
                cursor: 'pointer',
                marginLeft: -210
              }}
            >
              {isEditable ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default UserVendorProfileMobile;