import React, { useState } from 'react';
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { IoMailOutline, IoChevronDown } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
  };

  const footerStyles = {
    container: {
      backgroundColor: isMobile ? '#fff' : '#111',
      padding: '20px',
      paddingTop: '10px',
      marginTop: '4px',
      overflow: 'hidden',
      marginBottom: isMobile ? '50px' : '',

    },
    topSection: {
      display: isMobile ? 'grid' : 'flex',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'none',
      flexWrap: isMobile ? 'nowrap' : 'wrap',
      justifyContent: 'flex-start',
      marginBottom: '2px',
      padding: '0 2px',
      gap: isMobile ? '4px' : '30px',
    },
    logo: {
      marginBottom: '20px',
      minWidth: '120px',
      gridColumn: isMobile ? '1 / -1' : 'auto',
    },
    logoText: {
      color: isMobile ? '#111' : '#fff',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    column: {
      flex: '1',
      minWidth: '140px',
    },
    companyColumn: {
      flex: '1',
      minWidth: '140px',
      display: isMobile ? 'flex' : 'block',
      flexDirection: isMobile ? 'column' : 'unset',
      justifyContent: isMobile ? 'space-between' : 'unset',
    },
    mobileActionsContainer: {
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      gap: '15px',
      marginTop: '15px',
    },
    columnTitle: {
      color: isMobile ? '#111' : '#fff',
      fontWeight: 'bold',
      fontSize: '16px',
      marginBottom: '15px',
      display: 'block',
    },
    columnLink: {
      color: isMobile ? '#666' : '#ccc',
      fontSize: '14px',
      marginBottom: '10px',
      display: 'block',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
      ':hover': {
        color: isMobile ? '#111' : '#fff',
      },
    },
    newsletterSection: {
      flex: '2',
      minWidth: '300px',
      gridColumn: isMobile ? '1 / -1' : 'auto',
    },
    newsletterTitle: {
      color: '#6666ff',
      fontSize: '18px',
      marginBottom: '10px',
    },
    newsletterDescription: {
      color: isMobile ? '#666' : '#ccc',
      fontSize: '14px',
      marginBottom: '20px',
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: isMobile ? '#f5f5f5' : '#333',
      borderRadius: '8px',
      padding: '8px 15px',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '10px' : '0',
    },
    input: {
      flex: '1',
      color: isMobile ? '#111' : '#fff',
      fontSize: '16px',
      padding: '8px',
      background: 'none',
      border: 'none',
      outline: 'none',
      width: '100%',
    },
    subscribeButton: {
      backgroundColor: '#6666ff',
      padding: '10px 20px',
      borderRadius: '6px',
      color: '#fff',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      width: isMobile ? '100%' : 'auto',
      ':hover': {
        backgroundColor: '#5555ee',
      },
    },
    bottomSection: {
      display: isMobile ? 'none' : 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '2px',
      marginTop: '2px',
      gap: '20px',
      textAlign: isMobile ? 'center' : 'left',
    },
    languageSelector: {
      position: 'relative',
    },
    languageButton: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: isMobile ? '#f5f5f5' : '#333',
      padding: '8px 15px',
      borderRadius: '6px',
      color: isMobile ? '#111' : '#fff',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      marginLeft: isMobile ? '150px' : '',
      marginTop: isMobile ? '-122px' : '',
      marginBottom: isMobile ? '12px' : '',
    },
    languageDropdown: {
      position: 'absolute',
      bottom: '100%',
      left: '0',
      backgroundColor: isMobile ? '#f5f5f5' : '#333',
      borderRadius: '6px',
      padding: '10px',
      marginBottom: '5px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      zIndex: 1000,
    },
    languageOption: {
      color: isMobile ? '#111' : '#fff',
      padding: '8px 15px',
      cursor: 'pointer',
      borderRadius: '4px',
      ':hover': {
        backgroundColor: isMobile ? '#e5e5e5' : '#444',
      },
    },
    copyright: {
      color: isMobile ? '#666' : '#888',
      fontSize: '14px',
      order: isMobile ? 2 : 0,
      marginTop: isMobile ? '30px' : 0,
      textAlign: 'center',
    },
    socialIcons: {
      display: 'flex',
      gap: '15px',
      order: isMobile ? 1 : 0,
      marginLeft: isMobile ? '150px' : '',
    },
    socialIcon: {
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
      ':hover': {
        transform: 'translateY(-2px)',
      },
    },
  };

  return (
    <footer style={footerStyles.container}>
      <div style={footerStyles.topSection}>
        <div style={footerStyles.logo}>
          <span style={footerStyles.logoText}>LOGO</span>
        </div>

        <div style={footerStyles.column}>
          <span style={footerStyles.columnTitle}>Product</span>
          <Link to="/allservices" style={footerStyles.columnLink}>All Services</Link>
          <Link style={footerStyles.columnLink}>Companies</Link>
          <Link style={footerStyles.columnLink}>Candidates</Link>
        </div>

        <div style={footerStyles.column}>
          <span style={footerStyles.columnTitle}>Resources</span>
          <Link to="/Blog" style={footerStyles.columnLink}>Blog</Link>
          <Link style={footerStyles.columnLink}>User Guides</Link>
          <Link style={footerStyles.columnLink}>Webinars</Link>
        </div>

        <div style={footerStyles.companyColumn}>
          <div>
            <span style={footerStyles.columnTitle}>Company</span>
            <Link to="/about" style={footerStyles.columnLink}>About</Link>
            <Link style={footerStyles.columnLink}>Join Us</Link>
            <Link to="/Articles" style={footerStyles.columnLink}>Articles</Link>
          </div>
          
          {isMobile && (
            <div style={footerStyles.mobileActionsContainer}>
              <div style={footerStyles.languageSelector}>
                <button onClick={toggleLanguageDropdown} style={footerStyles.languageButton}>
                  <span style={{ marginRight: '8px' }}>{selectedLanguage}</span>
                  <IoChevronDown size={14} />
                </button>

                {showLanguageDropdown && (
                  <div style={footerStyles.languageDropdown}>
                    {['Telugu', 'Hindi', 'English'].map((language) => (
                      <div
                        key={language}
                        onClick={() => handleLanguageSelect(language)}
                        style={footerStyles.languageOption}
                      >
                        {language}
                      </div>
                    ))}
                  </div>
                )}

              <div style={footerStyles.socialIcons}>
                <FaTwitter size={20} color="#4A90E2" style={footerStyles.socialIcon} />
                <FaFacebookF size={20} color="#4A90E2" style={footerStyles.socialIcon} />
                <FaLinkedinIn size={20} color="#4A90E2" style={footerStyles.socialIcon} />
                <FaYoutube size={20} color="#FF0000" style={footerStyles.socialIcon} />
              </div>
              </div>

            </div>
          )}
        </div>

        <div style={footerStyles.newsletterSection}>
          <span style={footerStyles.newsletterTitle}>Subscribe to our newsletter</span>
          <p style={footerStyles.newsletterDescription}>
            For product announcements and exclusive insights
          </p>
          <div style={footerStyles.inputContainer}>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <IoMailOutline size={20} color="#999" style={{ marginRight: '10px' }} />
              <input
                placeholder="Input your email"
                style={footerStyles.input}
              />
            </div>
            <button style={footerStyles.subscribeButton}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {!isMobile && (
        <div style={footerStyles.bottomSection}>
          <div style={footerStyles.languageSelector}>
            <button onClick={toggleLanguageDropdown} style={footerStyles.languageButton}>
              <span style={{ marginRight: '8px' }}>{selectedLanguage}</span>
              <IoChevronDown size={14} />
            </button>

            {showLanguageDropdown && (
              <div style={footerStyles.languageDropdown}>
                {['Telugu', 'Hindi', 'English'].map((language) => (
                  <div
                    key={language}
                    onClick={() => handleLanguageSelect(language)}
                    style={footerStyles.languageOption}
                  >
                    {language}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={footerStyles.copyright}>
            © 2024 Brand, Inc. • Privacy • Terms • Sitemap
          </div>

          <div style={footerStyles.socialIcons}>
            <FaTwitter size={20} color="#4A90E2" style={footerStyles.socialIcon} />
            <FaFacebookF size={20} color="#4A90E2" style={footerStyles.socialIcon} />
            <FaLinkedinIn size={20} color="#4A90E2" style={footerStyles.socialIcon} />
            <FaYoutube size={20} color="#FF0000" style={footerStyles.socialIcon} />
          </div>
        </div>
      )}

      {isMobile && (
        <div style={footerStyles.copyright}>
          © 2024 Brand, Inc. • Privacy • Terms • Sitemap
        </div>
      )}
    </footer>
  );
}