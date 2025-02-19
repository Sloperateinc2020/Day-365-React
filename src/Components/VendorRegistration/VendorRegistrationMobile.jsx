import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import "./VendorRegistrationMobile.css";
import Footer from "../Footer";
import config from "../../config";

const VendorRegistrationMobile = () => {
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

  const [isBackgroundDisabled, setIsBackgroundDisabled] = useState(false);
  const [aadhaarError, setAadhaarError] = useState("");
  const [panCardError, setPanCardError] = useState("");
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");

  const navigate = useNavigate();
  const supabase = createClient(
    config.REACT_APP_SUPABASE_URL,
    config.REACT_APP_SUPABASE_KEY
  );

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
      const response = await fetch("https://day365-java-9d7bebac1a3b.herokuapp.com/api/vendor/register", {
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

      const { data: urlData } = await supabase.storage
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
        if (response.message.includes("This phone number is already associated with a vendor account.")) {
          setPhoneErrorMessage("Vendor already exists with this mobile number. Please provide a different one.");
        } else if (response.message.includes("No user found with the provided phone number. Please register as a user first.")) {
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

  return (
    <div className="mobile-vendor-registration">
      {isBackgroundDisabled && <div className="mobile-overlay"></div>}

      {successMessage && (
        <div className="mobile-popup">
          <div className="mobile-popup-content">
            <p>{successMessage}</p>
            <button
              className="mobile-close-button"
              onClick={() => {
                setSuccessMessage("");
                navigate("/");
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {phoneErrorMessage && (
        <div className="mobile-popup">
          <div className="mobile-popup-content">
            <p>{phoneErrorMessage}</p>
            <button
              className="mobile-close-button"
              onClick={() => setPhoneErrorMessage("")}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <h1 className="mobile-title">Become a Service Provider</h1>
      <p className="mobile-subtitle">
        Join our community of local service professionals
      </p>

      <form className="mobile-form" onSubmit={handleFormSubmit}>
        <div className="mobile-form-field">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter First Name"
            required
          />
        </div>

        <div className="mobile-form-field">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter Last Name"
            required
          />
        </div>

        <div className="mobile-form-field">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="mobile-form-field">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter Phone Number"
            required
          />
        </div>

        <div className="mobile-form-field">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mobile-form-field">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mobile-form-field">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter Address"
            required
          />
        </div>

        <div className="mobile-form-field">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Enter City"
            required
          />
        </div>

        <div className="mobile-form-field">
          <label>Zip Code</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            placeholder="Enter Zip Code"
            required
          />
        </div>

        <div className="mobile-form-field">
          <label>State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
          >
            <option value="">Select State</option>
            <option value="maharashtra">Maharashtra</option>
            <option value="tamil_nadu">Tamil Nadu</option>
            <option value="karnataka">Karnataka</option>
          </select>
        </div>

        <div className="mobile-form-field">
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Enter Country"
            required
          />
        </div>

        <div className="mobile-form-field">
          <label>Skills</label>
          <select
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Skills</option>
            <option value="plumber">Plumber</option>
            <option value="electrician">Electrician</option>
            <option value="it_technician">IT Technician</option>
          </select>
        </div>

        <div className="mobile-form-field">
          <label>Aadhaar Number</label>
          <input
            type="text"
            name="aadhaarNumber"
            value={formData.aadhaarNumber}
            onChange={handleAadhaarChange}
            placeholder="Enter Aadhaar Number"
            required
          />
          {aadhaarError && <p className="mobile-error">{aadhaarError}</p>}
        </div>

        <div className="mobile-form-field">
          <label>Upload Aadhaar Card</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => setAadhaarFile(e.target.files[0])}
            required
          />
          <small>Upload clear image of Aadhaar card</small>
        </div>

        <div className="mobile-form-field">
          <label>PAN Card Number</label>
          <input
            type="text"
            name="panCard"
            value={formData.panCard}
            onChange={handlePanCardChange}
            placeholder="Enter PAN Card Number"
            required
          />
          {panCardError && <p className="mobile-error">{panCardError}</p>}
        </div>

        <div className="mobile-form-field">
          <label>Upload PAN Card</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => setPanFile(e.target.files[0])}
            required
          />
          <small>Upload clear image of PAN card</small>
        </div>

        <button
          type="submit"
          className="mobile-submit-button"
          disabled={isLoading}
        >
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
      <Footer />
    </div>
  );
};

export default VendorRegistrationMobile;