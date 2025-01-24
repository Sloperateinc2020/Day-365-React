import React, { useState, useEffect, useRef } from "react";
import { 
  ChevronDown, Upload, CheckCircle, AlertCircle, Camera, X, Clock,
  MapPin, Calendar, Briefcase, Phone, Mail, User, Shield, Award
} from "lucide-react";
import Footer from "../Footer";

const VendorRegistrationMobile = ({
  showOtpSection,
  otp,
  isBackgroundDisabled,
  handleVerifyClick,
  handleOtpChange,
  handleConfirmClick,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formProgress, setFormProgress] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const formRef = useRef(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [experience, setExperience] = useState({ years: 0, months: 0 });
  const [availability, setAvailability] = useState({
    weekdays: true,
    weekends: false,
    emergency: false
  });

  const skillsList = [
    { id: 1, name: 'Plumbing', icon: '🔧' },
    { id: 2, name: 'Electrical', icon: '⚡' },
    { id: 3, name: 'Carpentry', icon: '🔨' },
    { id: 4, name: 'Painting', icon: '🎨' },
    { id: 5, name: 'Cleaning', icon: '🧹' },
    { id: 6, name: 'Gardening', icon: '🌱' },
    { id: 7, name: 'Moving', icon: '📦' },
    { id: 8, name: 'Assembly', icon: '🛠️' },
    { id: 9, name: 'Appliance Repair', icon: '🔌' },
    { id: 10, name: 'IT Support', icon: '💻' }
  ];

  const steps = [
    { title: 'Personal Info', icon: User },
    { title: 'Contact', icon: Phone },
    { title: 'Professional', icon: Briefcase },
    { title: 'Verification', icon: Shield }
  ];

  useEffect(() => {
    let timer;
    if (showOtpSection && otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [showOtpSection, otpTimer]);

  const handleResendOtp = () => {
    if (canResend) {
      setOtpTimer(30);
      setCanResend(false);
      // Add your OTP resend logic here
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) 
          ? 'Please enter a valid email address' 
          : '';
      case 'phone':
        return !value.match(/^\+?[\d\s-]{10,}$/) 
          ? 'Please enter a valid phone number' 
          : '';
      case 'aadhaar':
        return !value.match(/^\d{12}$/) 
          ? 'Aadhaar number must be 12 digits' 
          : '';
      case 'pincode':
        return !value.match(/^\d{6}$/) 
          ? 'PIN code must be 6 digits' 
          : '';
      default:
        return value.trim() === '' ? 'This field is required' : '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));

    // Calculate progress
    const totalFields = document.querySelectorAll('input, select, textarea').length;
    const filledFields = Object.values(formData).filter(Boolean).length;
    setFormProgress((filledFields / totalFields) * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key] || '');
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      // Scroll to first error
      const firstError = document.querySelector('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Handle success
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    container: {
      padding: '1rem',
      background: '#fff',
      minHeight: '100vh',
    },
    progressContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '4px',
      background: '#f0f0f0',
      zIndex: 1000,
    },
    progressBar: {
      height: '100%',
      width: `${formProgress}%`,
      background: 'linear-gradient(90deg, #0066cc, #0052a3)',
      transition: 'width 0.3s ease',
      borderRadius: '0 2px 2px 0',
      boxShadow: '0 0 10px rgba(0, 102, 204, 0.5)',
    },
    progressText: {
      position: 'fixed',
      top: '8px',
      right: '16px',
      fontSize: '0.875rem',
      color: '#666',
      zIndex: 1000,
    },
    form: {
      background: '#fff',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    },
    formGroup: {
      marginBottom: '1.5rem',
      animation: 'fadeIn 0.5s ease',
      position: 'relative',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      color: '#333',
      fontWeight: '600',
      fontSize: '0.95rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    input: (hasError) => ({
      width: '100%',
      padding: '0.875rem',
      border: `2px solid ${hasError ? '#dc3545' : '#e1e1e1'}`,
      borderRadius: '8px',
      fontSize: '1rem',
      backgroundColor: '#fff',
      transition: 'all 0.3s ease',
      outline: 'none',
    }),
    error: {
      color: '#dc3545',
      fontSize: '0.875rem',
      marginTop: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    },
    submitButton: {
      width: '100%',
      padding: '1rem',
      background: isSubmitting ? '#ccc' : '#0066cc',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: isSubmitting ? 'not-allowed' : 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
    },
    submitLoader: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '1.5rem',
      height: '1.5rem',
      border: '2px solid #fff',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    stepIndicator: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      marginBottom: '2rem',
      position: 'relative',
    },
    step: (isActive, isCompleted) => ({
      width: '3rem',
      height: '3rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: isCompleted ? '#4CAF50' : isActive ? '#0066cc' : '#e1e1e1',
      color: isCompleted || isActive ? 'white' : '#666',
      transition: 'all 0.3s ease',
      position: 'relative',
      zIndex: 2,
    }),
    stepLine: {
      position: 'absolute',
      top: '50%',
      left: '10%',
      right: '10%',
      height: '2px',
      background: '#e1e1e1',
      zIndex: 1,
    },
    skillsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '0.75rem',
      padding: '1rem',
    },
    skillItem: (isSelected) => ({
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem',
      borderRadius: '8px',
      border: `2px solid ${isSelected ? '#0066cc' : '#e1e1e1'}`,
      background: isSelected ? 'rgba(0, 102, 204, 0.1)' : 'white',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }),
    experienceSelector: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      marginBottom: '1.5rem',
    },
    numberInput: {
      width: '4rem',
      textAlign: 'center',
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #e1e1e1',
    },
    availabilityToggle: (isActive) => ({
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      border: `2px solid ${isActive ? '#0066cc' : '#e1e1e1'}`,
      background: isActive ? 'rgba(0, 102, 204, 0.1)' : 'white',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    }),
    successMessage: {
      position: 'fixed',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#4CAF50',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      animation: 'slideUp 0.3s ease',
      zIndex: 1000,
    },
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <User size={16} /> First Name
                {errors.firstName && <AlertCircle size={16} color="#dc3545" />}
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                style={styles.input(errors.firstName)}
                onChange={handleInputChange}
                data-error={!!errors.firstName}
              />
              {errors.firstName && (
                <div style={styles.error}>
                  <AlertCircle size={14} />
                  {errors.firstName}
                </div>
              )}
            </div>
            
            {/* Profile Photo Upload */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Camera size={16} /> Profile Photo
              </label>
              <div style={{
                border: '2px dashed #e1e1e1',
                borderRadius: '8px',
                padding: '1rem',
                textAlign: 'center',
                cursor: 'pointer',
                position: 'relative',
              }}>
                {selectedFile ? (
                  <div style={{ position: 'relative' }}>
                    <img 
                      src={URL.createObjectURL(selectedFile)} 
                      alt="Preview"
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        margin: '0 auto',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      style={{
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Camera size={32} style={{ color: '#666', marginBottom: '0.5rem' }} />
                    <p style={{ margin: '0', color: '#666' }}>
                      Take a photo or upload
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>
          </>
        );
      
      case 2:
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Mail size={16} /> Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                style={styles.input(errors.email)}
                onChange={handleInputChange}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Phone size={16} /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                style={styles.input(errors.phone)}
                onChange={handleInputChange}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                <MapPin size={16} /> Location
              </label>
              <button
                type="button"
                onClick={() => setShowLocationPicker(true)}
                style={{
                  ...styles.input(false),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <span>Select your service area</span>
                <ChevronDown size={20} />
              </button>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Award size={16} /> Skills
              </label>
              <div style={styles.skillsGrid}>
                {skillsList.map(skill => (
                  <div
                    key={skill.id}
                    style={styles.skillItem(selectedSkills.includes(skill.id))}
                    onClick={() => {
                      setSelectedSkills(prev =>
                        prev.includes(skill.id)
                          ? prev.filter(id => id !== skill.id)
                          : [...prev, skill.id]
                      );
                    }}
                  >
                    <span style={{ marginRight: '0.5rem' }}>{skill.icon}</span>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Briefcase size={16} /> Experience
              </label>
              <div style={styles.experienceSelector}>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={experience.years}
                  onChange={(e) => setExperience(prev => ({
                    ...prev,
                    years: parseInt(e.target.value) || 0
                  }))}
                  style={styles.numberInput}
                />
                <span>Years</span>
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={experience.months}
                  onChange={(e) => setExperience(prev => ({
                    ...prev,
                    months: parseInt(e.target.value) || 0
                  }))}
                  style={styles.numberInput}
                />
                <span>Months</span>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Calendar size={16} /> Availability
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {Object.entries(availability).map(([key, value]) => (
                  <button
                    key={key}
                    type="button"
                    style={styles.availabilityToggle(value)}
                    onClick={() => setAvailability(prev => ({
                      ...prev,
                      [key]: !prev[key]
                    }))}
                  >
                    {value ? <CheckCircle size={16} /> : <Clock size={16} />}
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Shield size={16} /> Aadhaar Number
              </label>
              <input
                type="text"
                name="aadhaar"
                placeholder="Enter your 12-digit Aadhaar number"
                style={styles.input(errors.aadhaar)}
                onChange={handleInputChange}
                maxLength="12"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Upload size={16} /> ID Proof
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  // Handle ID proof upload
                }}
                style={{
                  ...styles.input(false),
                  padding: '0.5rem',
                }}
              />
              <small style={{ color: '#666', marginTop: '0.5rem' }}>
                Upload a clear photo of your government ID
              </small>
            </div>

            <button
              type="button"
              onClick={handleVerifyClick}
              style={{
                ...styles.submitButton,
                marginTop: '1rem',
                background: '#28a745',
              }}
            >
              Verify Documents
            </button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div style={styles.container}>
        {/* Progress Bar */}
        <div style={styles.progressContainer}>
          <div style={styles.progressBar} />
        </div>
        <div style={styles.progressText}>
          {Math.round(formProgress)}% Complete
        </div>

        {/* Step Indicator */}
        <div style={styles.stepIndicator}>
          <div style={styles.stepLine} />
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div
                key={index}
                style={styles.step(
                  currentStep === index + 1,
                  currentStep > index + 1
                )}
              >
                <StepIcon size={20} />
              </div>
            );
          })}
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} ref={formRef} style={styles.form}>
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem',
          }}>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                style={{
                  ...styles.submitButton,
                  background: '#666',
                  flex: 1,
                  marginBottom:"20px"

                }}
              >
                Back
              </button>
            )}
            
            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                style={{
                  ...styles.submitButton,
                  flex: 1,
                  marginBottom:"20px"
                }}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                style={{
                  ...styles.submitButton,
                  flex: 1,
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div style={styles.submitLoader} />
                    <span style={{ opacity: 0 }}>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Registration</span>
                    <CheckCircle size={20} />
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        {/* OTP Modal */}
        {showOtpSection && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
            zIndex: 101,
            width: '90%',
            maxWidth: '400px',
            animation: 'slideUp 0.3s ease',
          }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
              Verification Code
            </h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
              Enter the code sent to your phone
            </p>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem',
            }}>
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  style={{
                    width: '3rem',
                    height: '3rem',
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    border: '2px solid #e1e1e1',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              {otpTimer > 0 ? (
                <p style={{ color: '#666' }}>
                  <Clock size={16} style={{ marginRight: '0.5rem' }} />
                  Resend code in {otpTimer}s
                </p>
              ) : (
                <button
                  onClick={handleResendOtp}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0066cc',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  Resend Code
                </button>
              )}
            </div>

            <button
              onClick={handleConfirmClick}
              style={{
                width: '100%',
                padding: '1rem',
                background: '#0066cc',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              Verify Code
            </button>
          </div>
        )}

        {/* Success Message */}
        {showSuccessMessage && (
          <div style={styles.successMessage}>
            <CheckCircle size={20} />
            Registration successful!
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translate(-50%, 20px); }
            to { opacity: 1; transform: translate(-50%, -50%); }
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          input:focus, select:focus, textarea:focus {
            border-color: #0066cc !important;
            box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
          }

          input::placeholder, textarea::placeholder {
            color: #999;
          }

          button:active {
            transform: scale(0.98);
          }

          .shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
          }

          @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
          }
        `}
      </style>
    </>
  );
};

export default VendorRegistrationMobile;