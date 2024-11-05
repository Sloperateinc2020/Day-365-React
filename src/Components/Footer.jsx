import React, { useState } from 'react';
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { IoMailOutline, IoChevronDown } from 'react-icons/io5';

export default function Footer() {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English'); // Initial language is English

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language); // Update the selected language
    setShowLanguageDropdown(false); // Close the dropdown after selecting
  };

  return (
    <div style={{ backgroundColor: '#111', padding: '20px', paddingTop: '50px', marginTop: '40px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px', marginLeft: '20px' }}>
        <div style={{ marginBottom: '20px', marginLeft: '50px' }}>
          <span style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>LOGO</span>
        </div>
        <div style={{ width: '140px', marginLeft: '130px' }}>
          <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px', marginBottom: '7px', display: 'block' }}>Product</span>
          <span style={{ color: '#ccc', fontSize: '14px', marginBottom: '7px', display: 'block' }}>All Services</span>
          <span style={{ color: '#ccc', fontSize: '14px', marginBottom: '7px', display: 'block' }}>Companies</span>
          <span style={{ color: '#ccc', fontSize: '14px', marginBottom: '7px', display: 'block' }}>Candidates</span>
        </div>
        <div style={{ width: '140px' }}>
          <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px', marginBottom: '7px', display: 'block' }}>Resources</span>
          <span style={{ color: '#ccc', fontSize: '14px', marginBottom: '7px', display: 'block' }}>Blog</span>
          <span style={{ color: '#ccc', fontSize: '14px', marginBottom: '7px', display: 'block' }}>User Guides</span>
          <span style={{ color: '#ccc', fontSize: '14px', marginBottom: '7px', display: 'block' }}>Webinars</span>
        </div>
        <div style={{ width: '140px' }}>
          <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px', marginBottom: '7px', display: 'block' }}>Company</span>
          <span style={{ color: '#ccc', fontSize: '14px', marginBottom: '7px', display: 'block' }}>About</span>
          <span style={{ color: '#ccc', fontSize: '14px', marginBottom: '7px', display: 'block' }}>Join Us</span>
        </div>
        <div style={{ width: '260px', marginLeft: '150px' }}>
          <span style={{ color: '#6666ff', fontSize: '16px' }}>Subscribe to our newsletter</span>
          <span style={{ color: '#ccc', fontSize: '12px', marginBottom: '30px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', width: '800px' }}>
            For product announcements and exclusive insights
          </span>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#333', borderRadius: '5px', padding: '5px 10px' }}>
            <IoMailOutline size={16} color="#999" style={{ marginRight: '5px' }} />
            <input placeholder="Input your email" style={{ flex: 1, color: '#fff', fontSize: '14px', padding: '5px', background: 'none', border: 'none', outline: 'none' }} />
            <button style={{ backgroundColor: '#6666ff', padding: '8px 15px', borderRadius: '5px', marginLeft: '60px', color: '#fff', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px' }}>
        <div style={{ position: 'relative', marginLeft: '70px' }}>
          {/* Language Button */}
          <button onClick={toggleLanguageDropdown} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#333', padding: '8px 12px', borderRadius: '5px', color: '#fff', border: 'none', cursor: 'pointer' }}>
            <span style={{ color: '#fff', fontSize: '14px', marginRight: '5px' }}>{selectedLanguage}</span>
            <IoChevronDown size={14} color="#fff" />
          </button>

          {/* Language Dropdown */}
          {showLanguageDropdown && (
            <div style={{ position: 'absolute', bottom: '100%', left: '0', backgroundColor: '#333', color: '#fff', borderRadius: '5px', marginBottom: '5px', padding: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
              <p onClick={() => handleLanguageSelect('Telugu')} style={{ margin: '0', padding: '5px 10px', cursor: 'pointer' }}>Telugu</p>
              <p onClick={() => handleLanguageSelect('Hindi')} style={{ margin: '0', padding: '5px 10px', cursor: 'pointer' }}>Hindi</p>
              <p onClick={() => handleLanguageSelect('English')} style={{ margin: '0', padding: '5px 10px', cursor: 'pointer' }}>English</p>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#888', fontSize: '12px', marginRight: '540px' }}>© 2024 Brand, Inc. • Privacy • Terms • Sitemap</span>
          <div style={{ display: 'flex', marginRight: "50px" }}>
            <FaTwitter size={18} color="#4A90E2" style={{ margin: '0 5px' }} />
            <FaFacebookF size={18} color="#4A90E2" style={{ margin: '0 5px' }} />
            <FaLinkedinIn size={18} color="#4A90E2" style={{ margin: '0 5px' }} />
            <FaYoutube size={18} color="#FF0000" style={{ margin: '0 5px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
