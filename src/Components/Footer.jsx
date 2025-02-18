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
      backgroundColor: '#fff',
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
      color: isMobile ? '#111' : '#111',
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
      marginTop: isMobile ? '20px' : '',
    },
    mobileActionsContainer: {
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      gap: '15px',
      marginTop: '15px',
    },
    columnTitle: {
      color: 'green',
      fontWeight: 'bold',
      fontSize: '16px',
      marginBottom: '15px',
      display: 'block',
    },
    columnLink: {
      color: isMobile ? '#666' : '#111',
      fontSize: '14px',
      marginBottom: '10px',
      display: 'block',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      position: 'relative',
      cursor: 'pointer',
      width: 'fit-content',
    },
    columnLinkHover: {
      '&:hover': {
        color: 'green',
        textDecoration: 'underline',
        textUnderlineOffset: '4px',
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
      color: isMobile ? '#666' : '#111',
      fontSize: '14px',
      marginBottom: '20px',
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: isMobile ? '#f5f5f5' : '#f5f5f5',
      borderRadius: '8px',
      padding: '8px 15px',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '10px' : '0',
    },
    input: {
      flex: '1',
      color: isMobile ? '#111' : '#111',
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
      backgroundColor: isMobile ? '#f5f5f5' : '#f5f5f5',
      padding: '8px 15px',
      borderRadius: '6px',
      color: isMobile ? '#111' : '#111',
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
      backgroundColor: isMobile ? '#f5f5f5' : '#f5f5f5',
      borderRadius: '6px',
      padding: '10px',
      marginBottom: '5px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      zIndex: 1000,
    },
    languageOption: {
      color: isMobile ? '#111' : '#111',
      padding: '8px 15px',
      cursor: 'pointer',
      borderRadius: '4px',
    },
    copyright: {
      color: isMobile ? '#666' : '#666',
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
    },
  };

  const LinkWithHover = ({ to, children }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const linkStyle = {
      ...footerStyles.columnLink,
      color: isHovered ? 'green' : (isMobile ? '#666' : '#111'),
      textDecoration: isHovered ? 'underline' : 'none',
      textUnderlineOffset: '4px',
    };

    return (
      <Link 
        to={to || '#'} 
        style={linkStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </Link>
    );
  };

  return (
    <footer style={footerStyles.container}>
      <div style={footerStyles.topSection}>
        <div style={footerStyles.logo}>
          <span style={footerStyles.logoText}>LOGO</span>
        </div>

        <div style={footerStyles.column}>
          <span style={footerStyles.columnTitle}>Product</span>
          <LinkWithHover to="/allservices">All Services</LinkWithHover>
          <LinkWithHover>Companies</LinkWithHover>
          <LinkWithHover>Candidates</LinkWithHover>
        </div>

        <div style={footerStyles.column}>
          <span style={footerStyles.columnTitle}>Resources</span>
          <LinkWithHover to="/Blog">Blog</LinkWithHover>
          <LinkWithHover>User Guides</LinkWithHover>
          <LinkWithHover>Webinars</LinkWithHover>
        </div>

        <div style={footerStyles.companyColumn}>
          <div>
            <span style={footerStyles.columnTitle}>Company</span>
            <LinkWithHover to="/about">About</LinkWithHover>
            <LinkWithHover>Join Us</LinkWithHover>
            <LinkWithHover to="/Articles">Articles</LinkWithHover>
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
                  <FaTwitter size={20} color="black" style={footerStyles.socialIcon} />
                  <FaFacebookF size={20} color="black" style={footerStyles.socialIcon} />
                  <FaLinkedinIn size={20} color="black" style={footerStyles.socialIcon} />
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
            <FaTwitter size={20} color="black" style={footerStyles.socialIcon} />
            <FaFacebookF size={20} color="black" style={footerStyles.socialIcon} />
            <FaLinkedinIn size={20} color="black" style={footerStyles.socialIcon} />
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