import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, UserIcon, MessageSquareIcon } from 'lucide-react';
import Footer from "../Footer";

import ContactMobile from './ContactMobile';

const Contact = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  const infoItems = [
    {
      icon: <MapPin style={{ width: '24px', height: '24px', color: '#4F46E5' }} />,
      title: 'Address',
      content: '123 Business Avenue, Tech City, TC 12345'
    },
    {
      icon: <Phone style={{ width: '24px', height: '24px', color: '#4F46E5' }} />,
      title: 'Phone',
      content: '+1(555)123-4567'
    },
    {
      icon: <Mail style={{ width: '24px', height: '24px', color: '#4F46E5' }} />,
      title: 'Email',
      content: 'contact@company.com'
    },
    {
      icon: <Clock style={{ width: '24px', height: '24px', color: '#4F46E5' }} />,
      title: 'Business Hours',
      content: 'Monday-Friday: 9:00 AM-6:00 PM'
    }
  ];

  if (isMobile) {
    return <ContactMobile />;
  }

  return (
    <>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {/* Left Section - Contact Form */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '32px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',marginLeft:'-45px' }}>
            <div style={{ 
              height: '200px',
              borderRadius: '8px',
              marginBottom: '32px',
              position: 'relative',
              backgroundImage: 'url("https://images.unsplash.com/photo-1557425955-df376b5903c8?ixlib=rb-4.0.3")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '8px'
              }} />
              <h1 style={{ 
                color: 'white',
                fontSize: '2.25rem',
                fontWeight: 'bold',
                position: 'relative',
                zIndex: 1
              }}>Contact Us</h1>
            </div>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Name
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <UserIcon style={{ width: '20px', height: '20px', color: '#9CA3AF' }} />
                  </div>
                  <input
                    type="text"
                    placeholder="Your name"
                    style={{
                      width: '100%',
                      padding: '8px 12px 8px 40px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Email
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <Mail style={{ width: '20px', height: '20px', color: '#9CA3AF' }} />
                  </div>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    style={{
                      width: '100%',
                      padding: '8px 12px 8px 40px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Message subject"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Message
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '12px', top: '12px', pointerEvents: 'none' }}>
                    <MessageSquareIcon style={{ width: '20px', height: '20px', color: '#9CA3AF' }} />
                  </div>
                  <textarea
                    placeholder="Your message"
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '8px 12px 8px 40px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '150px',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                  />
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
          </div>

          {/* Right Section - Company Information */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '32px',    marginLeft: "-38px", // Adjust the value to move the box to the left
 }}>
            <h2 style={{ 
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '24px',

            }}>
              Company Information
            </h2>

            <div style={{ marginBottom: '32px' }}>
              {infoItems.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827', marginBottom: '4px' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: 0 }}>{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ 
              width: '100%',
              height: '300px',
              backgroundColor: '#F3F4F6',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1647951865992!5m2!1sen!2sus"
                style={{ width: '100%', height: '100%', border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;