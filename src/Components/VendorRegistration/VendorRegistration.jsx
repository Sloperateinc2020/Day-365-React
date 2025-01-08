import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import "./VendorRegistration.css";
import Footer from "../Footer";

const VendorRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    city: "",
    zipCode: "",
    state: "",
    country: "",
    skills: "",
    aadhaarNumber: "",
    panCard: ""
  });
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isBackgroundDisabled, setIsBackgroundDisabled] = useState(false);
  const [aadhaarError, setAadhaarError] = useState("");
  const [panCardError, setPanCardError] = useState("");
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const supabaseUrl = "https://ztoddnqhksgmlanzcaqi.supabase.co";
  const supabaseKey = "e7b579035c0fb435601ff4448ae7746917d38c4da1eb68fe243b9047e139e94c";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const STORAGE_CONFIG = {
    BUCKET_NAME: "images",
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

  const handleLogin = async () => {
    try {
      const { data: session, error } = await supabase.auth.signInWithPassword({
        email: "thirupathiraju52@outlook.in",
        password: "Haryak@552",
      });

      if (error) throw error;
      setUser(session.user);
      return session.user;
    } catch (err) {
      throw err;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const loggedInUser = await handleLogin();

      if (!loggedInUser) {
        throw new Error("Authentication required");
      }

      if (!aadhaarFile || !panFile) {
        throw new Error("Please upload both Aadhaar and PAN card files.");
      }

      const aadhaarResult = await uploadImage(aadhaarFile, STORAGE_CONFIG.BUCKET_NAME);
      const panResult = await uploadImage(panFile, STORAGE_CONFIG.BUCKET_NAME);

      const { error } = await supabase
        .from('vendors')
        .insert([{
          ...formData,
          aadhaar_url: aadhaarResult.url,
          pan_url: panResult.url,
          user_id: loggedInUser.id,
          status: 'pending'
        }]);

      if (error) throw error;

      setShowOtpSection(true);
      setIsBackgroundDisabled(true);
    } catch (error) {
      alert(`Error during form submission: ${error.message}`);
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

  return (
    <>
      <div className="vendor-registration-container">
        {isBackgroundDisabled && <div className="overlay"></div>}

        {showOtpSection && (
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
        )}

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
                name="phone"
                value={formData.phone}
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
                name="zipCode"
                value={formData.zipCode}
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