import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import "./VendorRegistration.css";
import Footer from "../Footer";
import config from "../../config";
import VendorRegistrationMobile from "./VendorRegistrationMobile"; // Import the mobile version


const VendorRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
    skills: "",
    aadhaarNumber: "",
    panCard: ""
  });
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [isBackgroundDisabled, setIsBackgroundDisabled] = useState(false);
  const [aadhaarError, setAadhaarError] = useState("");
  const [panCardError, setPanCardError] = useState("");
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);


  const supabase = createClient(
    config.REACT_APP_SUPABASE_URL,
    config.REACT_APP_SUPABASE_KEY
  );
    const navigate = useNavigate();


  const STORAGE_CONFIG = {
    BUCKET_NAME: "urban-maverick",
    MAX_FILE_SIZE: 2 * 1024 * 1024,
    ALLOWED_MIME_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAadhaarChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,12}$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        aadhaarNumber: value
      }));
      setAadhaarError("");
    } else {
      setAadhaarError("Aadhaar number must be exactly 12 digits.");
    }
  };

  const handlePanCardChange = (e) => {
    const value = e.target.value.toUpperCase();
    setFormData(prev => ({
      ...prev,
      panCard: value
    }));
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (panRegex.test(value)) {
      setPanCardError("");
    } else {
      setPanCardError("PAN card must be in the format: ABCDE1234F");
    }
  };

  const sendToAPI = async (vendorData) => {
    try {
      const response = await fetch("http://localhost:8080/api/vendor/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vendorData),
      });

      if (response.status === 409) {
        const errorText = await response.text();
        return { status: 409, message: errorText };
      }
  
      if (!response.ok) {
        throw new Error("Failed to register vendor");
      }
  
      return response;
    } catch (error) {
      console.error("Error sending data to API:", error);
      throw error;
    }
  };

  

  async function uploadImage(file, bucket) {
    try {
      if (file.size > STORAGE_CONFIG.MAX_FILE_SIZE) {
        throw new Error("File size exceeds 2MB limit");
      }

      if (!STORAGE_CONFIG.ALLOWED_MIME_TYPES.includes(file.type)) {
        throw new Error("Invalid file type. Only images are allowed.");
      }
      
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      if (!urlData?.publicUrl) {
        throw new Error("Failed to get public URL");
      }

      return {
        url: urlData.publicUrl,
        path: data.path,
      };
    } catch (err) {
      throw err;
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(""); 
    setPhoneErrorMessage("");  
  
    try {
      if (!aadhaarFile || !panFile) {
        throw new Error("Please upload both Aadhaar and PAN card files.");
      }
  
      
      const aadhaarResult = await uploadImage(aadhaarFile, STORAGE_CONFIG.BUCKET_NAME);
      const panResult = await uploadImage(panFile, STORAGE_CONFIG.BUCKET_NAME);
  
      const vendorData = {
        ...formData,
        aadhaarUrl: aadhaarResult.url,  
        panUrl: panResult.url,          
        status: 'pending',              
      };
    
      const response = await sendToAPI(vendorData);
  
      if (response.ok) {
        setSuccessMessage("Your details have been successfully submitted. Your status will be updated soon.");
        setIsBackgroundDisabled(true);
      } 
      
      if (response.status === 409) {
        if (response.status === 409 && response.message.includes("This phone number is already associated with a vendor account.")) {
          setPhoneErrorMessage("Vendor already exists with this mobile number. Please provide a different one."); 
        }else if (response.message.includes("No user found with the provided phone number. Please register as a user first.")) {
          setPhoneErrorMessage("This mobile number is not registered as a user.");
        }
        return;
      }
    } catch (error) {
      setPhoneErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    if (showOtpSection) {
      document.body.classList.add("scroll-locked");
    } else {
      document.body.classList.remove("scroll-locked");
    }

    return () => {
      document.body.classList.remove("scroll-locked");
    };
  }, [showOtpSection]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the threshold as needed
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    // Render the mobile version if on a mobile device
    return <VendorRegistrationMobile />;
  }
  return (
    <>
      <div className="vendor-registration-container">
        {isBackgroundDisabled && <div className="overlay"></div>}

        {successMessage && (
          <div className="success-message-popup">
            <div className="popup-content">
              <p>{successMessage}</p>
              <button
                className="close-button"
                onClick={() =>{
                  setSuccessMessage("")
                  navigate("/");
                } 
                }
              >
                Close
              </button>
            </div>
          </div>
        )}

        {phoneErrorMessage && (
          <div className="success-message-popup">
            <div className="popup-content">
              <p>{phoneErrorMessage}</p>
              <button
                className="close-button"
                onClick={() => setPhoneErrorMessage("")}
              >
                Close
              </button>
            </div>
          </div>
        )}


        {/* {showOtpSection && (
          <div className="otp-modal">
            <h2 className="otp-title">Verification Code</h2>
            <p className="otp-subtitle">
              We have sent a code to your registered mobile number.
            </p>
            <div className="otp-fields">
              {otp.map((value, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => {
                    const updatedOtp = [...otp];
                    updatedOtp[index] = e.target.value.slice(0, 1);
                    setOtp(updatedOtp);
                    
                    if (e.target.value && index < 3) {
                      const nextInput = e.target.parentElement.children[index + 1];
                      nextInput?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !value && index > 0) {
                      const prevInput = e.target.parentElement.children[index - 1];
                      prevInput?.focus();
                    }
                  }}
                  className="otp-input"
                />
              ))}
            </div>
            <div className="otp-actions">
              <button type="button" className="resend-button">
                Resend
              </button>
              <button
                type="button"
                className="confirm-button"
                onClick={() => {
                  setShowOtpSection(false);
                  setIsBackgroundDisabled(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        )} */}

        <h1 className="title">Become a Service Provider</h1>
        <p className="subtitle">
          Join the community of local service professionals who are dedicated to
          delivering great experiences for Customers
        </p>

        <form className="vendor-registration-form" onSubmit={handleFormSubmit}>
          <div className="form-row">
            <div className="form-text">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your First Name"
              />
            </div>
            <div className="form-text">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your Last Name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-text">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Email Address"
              />
            </div>
            <div className="form-text">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-text">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-text">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-text">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your Address"
              />
            </div>
            <div className="form-text">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter your City"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-text">
              <label>Zip Code</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Enter your Zipcode"
              />
            </div>
            <div className="form-text">
              <label>State</label>
              <select name="state" value={formData.state} onChange={handleInputChange}>
                <option value="">Select State</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="tamil_nadu">Tamil Nadu</option>
                <option value="karnataka">Karnataka</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-text">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Enter your Country"
              />
            </div>
            <div className="form-text">
              <label>Skills</label>
              <select name="skills" value={formData.skills} onChange={handleInputChange}>
                <option value="">Select your Skills</option>
                <option value="plumber">Plumber</option>
                <option value="electrician">Electrician</option>
                <option value="it_technician">IT Technician</option>
              </select>
            </div>
          </div>

          <div className="form-row" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <div className="form-text">
              <label>Aadhaar Number</label>
              <input
                type="text"
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleAadhaarChange}
                placeholder="Enter your Aadhaar Number"
              />
              {aadhaarError && <p style={{ color: "red" }}>{aadhaarError}</p>}
            </div>

            <div className="form-text">
              <label>Upload AdharCard</label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => setAadhaarFile(e.target.files[0])}
              />
              <small>Please upload a clear image of your government-issued ID.</small>
            </div>
          </div>

          <div className="form-row">
            <div className="form-text">
              <label>PAN Card</label>
              <input
                type="text"
                name="panCard"
                value={formData.panCard}
                onChange={handlePanCardChange}
                placeholder="Enter your PAN Card"
              />
              {panCardError && <p style={{ color: "red" }}>{panCardError}</p>}
            </div>
            <div className="form-text">
              <label>Upload PAN Card</label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => setPanFile(e.target.files[0])}
              />
              <small>Please upload a clear image of your government-issued ID.</small>
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              "Register as Vendor"
            )}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default VendorRegistration;