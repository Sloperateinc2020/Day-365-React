import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

const BankDetailsMobile = () => {
  const [activeTab, setActiveTab] = useState("Bank Details");
  const [linkText, setLinkText] = useState("https://app.ahiregro...");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "Documents") {
      navigate("/documents");
    } else if (tab === "Account Settings") {
      navigate("/accountsettings");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(linkText);
    setLinkText("Copied");
    setTimeout(() => {
      setLinkText("https://app.ahiregro...");
    }, 2000);
  };

  return (
    <>
      <div style={{ position: "relative", padding: "20px", fontFamily: "Arial, sans-serif", marginTop: "50px" }}>
        {/* Cover Background */}
        <div style={{
          position: "absolute",
          top: "-100px",
          left: 0,
          width: "100%",
          height: "30%",
          backgroundColor: "#3f51b5",
          zIndex: -1
        }}></div>

        {/* Change Cover Button */}
        <button style={{
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
          boxShadow: "0px 2px 5px rgba(15, 12, 201, 0.2)"
        }}>
          <span>📷</span> Change Cover
        </button>

        {/* Profile Container */}
        <div style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
          marginBottom: "20px"
        }}>
          {/* Profile Picture */}
          <div style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#ccc",
            borderRadius: "50%",
            margin: "0 auto 10px"
          }}></div>

          <h3 style={{ margin: "0 0 5px" }}>Thirupathi Raju Vattem</h3>
          <p style={{ margin: "0", color: "gray" }}>Haryak Inc.</p>

          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "space-around", margin: "20px 0" }}>
            <div><span>Opportunities applied</span><br /><strong style={{ color: "green" }}>2</strong></div>
            <div><span>Completed Bookings</span><br /><strong style={{ color: "green" }}>26</strong></div>
            <div><span>Upcoming Bookings</span><br /><strong style={{ color: "green" }}>6</strong></div>
          </div>

          {/* Public Profile Button */}
          <button style={{
            padding: "10px 15px",
            border: "none",
            backgroundColor: "#007BFF",
            color: "white",
            borderRadius: "5px",
            width: "100%"
          }}>
            View Public Profile
          </button>

          {/* Copy Link */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
            backgroundColor: "#f1f1f1",
            padding: "5px",
            borderRadius: "5px"
          }}>
            <span style={{
              marginRight: "10px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "80%"
            }}>
              {linkText}
            </span>
            <button onClick={handleCopy} style={{
              padding: "5px",
              border: "none",
              backgroundColor: "#ddd",
              cursor: "pointer"
            }}>📋</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "space-around", margin: "20px 0" }}>
          {["Account Settings", "Documents", "Bank Details"].map(tab => (
            <button key={tab} onClick={() => handleTabClick(tab)} style={{
              backgroundColor: activeTab === tab ? "#007BFF" : "#ddd",
              padding: "10px",
              borderRadius: "5px"
            }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Bank Details Form */}
        {activeTab === "Bank Details" && (
          <div style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
          }}>
            <form style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              maxWidth: "600px",
              margin: "0 auto"
            }}>
              {["First Name", "Last Name", "Account Number", "Confirm Account Number", "IFSC", "Branch", "Mobile", "Email"].map((label, index) => (
                <div key={index} style={{ width: "48%", marginBottom: "10px" }}>
                  <label>{label}</label>
                  <input type={label === "Email" ? "email" : "text"} style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                  }} />
                </div>
              ))}
            </form>
            <button style={{
              marginTop: "10px",
              padding: "5px 10px",
              border: "none",
              backgroundColor: " #3f51b5",
              color: "white",
              borderRadius: "5px",
              width: "20%"
            }}>
              Update
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BankDetailsMobile;
