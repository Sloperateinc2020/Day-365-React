import React, { useEffect, useState } from "react";
import { MapPin, Phone, Mail, MessageSquareIcon, User} from 'lucide-react';


const ContactPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width and update the state
  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768); // Set true if screen width <= 768px
    };

    checkScreenWidth(); // Initial check on component mount
    window.addEventListener("resize", checkScreenWidth); // Listen to window resize
    return () => window.removeEventListener("resize", checkScreenWidth); // Cleanup
  }, []);

  // Render nothing if not on a mobile device
  if (!isMobile) {
    return null;
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "0",
        padding: "0",
        boxSizing: "border-box",
      }}
    >
      {/* Header Section with Background Image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "200px",
          backgroundImage:
            "url('https://th.bing.com/th/id/R.17013ddb36dc9d88ab9748fea3982e25?rik=ugMhFf7G%2fzDndw&riu=http%3a%2f%2fwww.eesolutions.co.uk%2fwp-content%2fuploads%2f2017%2f02%2fcontact-us.jpg&ehk=kG9mgx6GBrKnq0aqtXe75LjfT25X%2b37vJCVI%2bQkEysw%3d&risl=&pid=ImgRaw&r=0')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>

      {/* Form Section */}
      <form style={{ width: "90%", maxWidth: "400px", margin: "20px auto" }}>
    <div style={{ marginBottom: "10px", position: "relative" }}>
      <label
        htmlFor="name"
        style={{
          display: "block",
          fontSize: "14px",
          marginBottom: "8px",
          marginLeft: "10px",
          marginTop: "15px",
        }}
      >
        Name
      </label>

      {/* Icon inside the input field */}
      <div
        style={{
          position: "absolute",
          left: "10px", // Adjust left spacing as needed
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none", // Ensures the icon is not interactive
        }}
      >
        <User style={{ width: "20px", height: "20px", color: "#9CA3AF",marginBottom:'-15px' }} />
      </div>

      {/* Input field with padding to accommodate the icon */}
      <input
        type="text"
        id="name"
        placeholder="Enter your name"
        style={{
          width: "100%",
          padding: "8px",
          paddingLeft: "40px", // Space for the icon
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginLeft: "3px",
        }}
      />
    </div>
    <div style={{ marginBottom: "10px", position: "relative" }}>
    <label
      htmlFor="email"
      style={{
        display: "block",
        fontSize: "14px",
        marginBottom: "5px",
        marginLeft: "10px",
        marginTop: "15px",
      }}
    >
      Email
    </label>

    {/* Mail icon */}
    <div
      style={{
        position: "absolute",
        left: "18px", // Adjust left spacing as needed
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none", // Ensure the icon is not interactive
      }}
    >
      <Mail style={{ width: "20px", height: "20px", color: "#9CA3AF",marginBottom:'-15px',marginLeft:'-10px' }} />
    </div>

    {/* Email input field */}
    <input
      type="email"
      id="email"
      placeholder="Enter your email"
      style={{
        width: "100%",
        padding: "8px",
        paddingLeft: "40px", // Adjust padding for the icon
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginLeft: "3px",
      }}
    />
  </div>
        
        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="subject"
            style={{
              display: "block",
              fontSize: "14px",
              marginBottom: "5px",
              marginLeft: "10px",
              marginTop: "15px",
            }}
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Enter your subject"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginLeft: "2px",
            }}
          />
<div style={{ marginBottom: "10px", position: "relative" }}>
    <label
      htmlFor="message"
      style={{
        display: "block",
        fontSize: "14px",
        marginBottom: "5px",
        marginLeft: "10px",
        marginTop: "15px",
      }}
    >
      Message
    </label>

    {/* Message icon */}
    <div
      style={{
        position: "absolute",
        left: "18px", // Adjust left spacing as needed
        top: "40px", // Adjust top spacing to align with the textarea
        transform: "translateY(-50%)",
        pointerEvents: "none", // Ensure the icon is not interactive
      }}
    >
      <MessageSquareIcon style={{ width: "20px", height: "20px", color: "#9CA3AF" }} />
    </div>

    {/* Message textarea */}
    <textarea
      id="message"
      placeholder="Enter your message"
      rows="4"
      style={{
        width: "100%",
        padding: "8px",
        paddingLeft: "40px", // Adjust padding for the icon
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginLeft: "2px",
      }}
    ></textarea>
    </div>
     </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#4F46E5',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    outline: 'none'
                  }}
                >
                  Send Message
                </button>
              </div>
      </form>

      {/* Company Information */}
      <div
        style={{
          width: "90%",
          maxWidth: "600px",
          fontFamily: "Arial, sans-serif",
          margin: "20px auto",
        }}
      >
        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
          Company Information
        </h3>
        <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "15px", gap: "10px" }}>
  {/* Address Icon */}
  <MapPin style={{ width: "24px", height: "24px", color: "#4F46E5" }} />
  
  {/* Address Data */}
  <div>
    <p style={{ fontSize: "16px", fontWeight: "500", color: "#111827", margin: "0" }}>
      123 Business Avenue, Tech City, TC 12345
    </p>
  </div>
</div>
<div style={{ display: "flex", alignItems: "flex-start", marginBottom: "15px", gap: "12px" }}>
  {/* Phone Icon */}
  <Phone style={{ width: "24px", height: "24px", color: "#4F46E5" }} />
  
  {/* Phone Data */}
  <div>
    <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>Phone</p>
    <p style={{ margin: 0, color: "#555" }}>+1(555)123-4567</p>
  </div>
</div>

<div style={{ display: "flex", alignItems: "flex-start", marginBottom: "15px", gap: "12px" }}>
  {/* Mail Icon */}
  <Mail style={{ width: "24px", height: "24px", color: "#4F46E5" }} />
  
  {/* Email Data */}
  <div>
    <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>Email</p>
    <p style={{ margin: 0, color: "#555" }}>contact@company.com</p>
  </div>
</div>

<div style={{ display: "flex", alignItems: "flex-start", marginBottom: "15px", gap: "12px" }}>
  {/* Message Icon */}
  <MessageSquareIcon style={{ width: "24px", height: "24px", color: "#4F46E5" }} />
  
  {/* Business Hours Data */}
  <div>
    <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>Business Hours</p>
    <p style={{ margin: 0, color: "#555" }}>Monday-Friday: 9:00 AM-6:00 PM</p>
  </div>
</div>
</div>

      {/* Map Section */}
      <div
        style={{
          width: "90%",
          maxWidth: "400px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          overflow: "hidden",
          marginBottom: "90px",
          marginLeft:'15px'
        }}
      >
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9991477364396!2d2.2944813156748123!3d48.85837007928737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66ef62eb95b3b%3A0x40b82c3688c9460!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1605115454633!5m2!1sen!2sfr"
          width="100%"
          height="200"
          style={{
            border: "none",
          }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
