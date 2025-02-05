import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

const AccountSettingsMobile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
          marginBottom: "0px",
        }}
      >
        {/* Profile Picture */}
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#ccc",
            borderRadius: "50%",
            margin: "0 auto 10px",
          }}
        ></div>

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
          value="https://app.ahiregro..."
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
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "5px" }}>
        <button
          style={{
            padding: "5px",
            border: "1px solid #007bff",
            background: "#007bff",
            color: "#fff",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Account Settings
        </button>
        <button
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            background: "#fff",
            cursor: "pointer",
            borderRadius: "10px",marginLeft: 70
          }}
          onClick={() => navigate("/documents")}
        >
          Documents
        </button>
        <button
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            background: "#fff",
            cursor: "pointer",
            borderRadius: "5px",marginLeft: 70
          }}
          onClick={() => navigate("/bankdetails")}
        >
          Bank Details
        </button>
      </div>

      {/* Form Section */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "30px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
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
        </form>

        <button
          style={{
            marginTop: "10px",
            padding: "5px 10px",
            border: "none",
            backgroundColor: "#3f51b5",
            color: "white",
            borderRadius: "5px",
            width: "20%",
          }}
        >
          Update
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default AccountSettingsMobile;
