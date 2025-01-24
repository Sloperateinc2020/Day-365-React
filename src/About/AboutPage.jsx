import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

const AboutPage = () => {
  const navigate = useNavigate();
  const serviceListRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const images = [
    {
      src: "https://media.istockphoto.com/id/866699668/photo/gourmet-chef-cooking-in-a-commercial-kitchen.jpg?s=612x612&w=0&k=20&c=rvWTwbW54nIHwsZIjSU8TzX1_VQqzAnjjJuWm5zOlhw=",
      alt: "Chef Service",
    },
    {
      src: "https://media.istockphoto.com/id/166736424/photo/mowing-the-grass.jpg?s=612x612&w=0&k=20&c=Bt91WCdmICMIO19uL9q2ijTOgtf-wPtIIU7hJ-stcf8=",
      alt: "Lawn Mowing Service",
    },
    {
      src: "https://cdn.create.vista.com/api/media/small/319583350/stock-photo-interested-doctor-earphones-having-online-consultation-digital-tablet-clinic-office",
      alt: "Online Consultation",
    },
    {
      src: "https://media.istockphoto.com/id/1049775258/photo/smiling-handsome-electrician-repairing-electrical-box-with-pliers-in-corridor-and-looking-at.jpg?s=612x612&w=0&k=20&c=stdWozouV2XsrHk2xXD3C31nT90BG7ydZvcpAn1Fx7I=",
      alt: "Electrician Service",
    },
    {
      src: "https://media.istockphoto.com/id/1042342584/photo/investors-and-contractors-on-construction-site.jpg?s=612x612&w=0&k=20&c=dfpqU0nr9BccCHOdHNyI1UanHGLt1nD2t6jZp95YUe4=",
      alt: "Construction Service",
    },
  ];

  const styles = {
    container: {
      maxWidth: '100%',
      margin: '0 auto',
      padding: isMobile ? '16px' : '24px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    header: {
      position: 'relative',
      width: '100%',
      height: isMobile ? '200px' : '400px',
      marginBottom: '24px',
      borderRadius: '8px',
      overflow: 'hidden'
    },
    headerImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    headerText: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: '#fff',
      width: '90%',
      padding: '0 16px'
    },
    headerTitle: {
      fontSize: isMobile ? '24px' : '32px',
      marginBottom: '8px',
      fontWeight: '600'
    },
    headerDescription: {
      fontSize: isMobile ? '14px' : '16px',
      lineHeight: '1.5'
    },
    whyChoose: {
      padding: '24px 0',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%'
    },
    sectionTitle: {
      fontSize: '24px',
      textAlign: 'center',
      marginBottom: '40px',
      color: '#333',
      fontWeight: '600'
    },
    featuresContainer: {
      padding: '0 16px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '24px'
    },
    featuresRow: {
      display: 'flex',
      gap: '16px',
      marginBottom: isMobile ? '16px' : '0'
    },
    feature: {
      flex: 1,
      backgroundColor: '#fff',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      minHeight: isMobile ? '150px' : '220px'
    },
    featureTitle: {
      fontSize: '20px',
      color: '#333',
      fontWeight: '600',
      marginBottom: '16px'
    },
    featureText: {
      fontSize: '14px',
      color: '#666',
      lineHeight: '1.6'
    },
    popularServices: {
      padding: '24px 0'
    },
    serviceListContainer: {
      width: '100%',
      overflow: 'hidden'
    },
    serviceList: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)',
      gap: '16px',
      padding: '0 16px'
    },
    serviceImage: {
      width: '100%',
      aspectRatio: '1',
      objectFit: 'cover',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    booking: {
      textAlign: 'center',
      padding: '32px 16px',
      backgroundColor: '#fff',
      borderRadius: '12px',
      margin: '24px 16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    bookingText: {
      fontSize: '18px',
      marginBottom: '16px',
      color: '#333',
      fontWeight: '500'
    },
    bookingButton: {
      padding: '12px 32px',
      fontSize: '16px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      boxShadow: '0 2px 4px rgba(0,123,255,0.2)'
    }
  };

  const handleExploreNowClick = () => {
    navigate('/allservices');
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.header}>
          <img src="/service.jpg" alt="Day 365" style={styles.headerImage} />
          <div style={styles.headerText}>
            <h1 style={styles.headerTitle}>What is Day 365?</h1>
            <p style={styles.headerDescription}>
              Day 365 is a trusted platform for people to receive local services.
              Day 365 is the best choice for low-cost quality professional services.
            </p>
          </div>
        </div>

        <section style={styles.whyChoose}>
          <h2 style={styles.sectionTitle}>Why choose Day 365?</h2>
          <div style={styles.featuresContainer}>
            {isMobile ? (
              <>
                <div style={styles.featuresRow}>
                  <div style={styles.feature}>
                    <h3 style={styles.featureTitle}>Convenient</h3>
                    <p style={styles.featureText}>
                      Day 365 is your 24/7 personal assistant providing you with convenient services.
                    </p>
                  </div>
                  <div style={styles.feature}>
                    <h3 style={styles.featureTitle}>Reliable</h3>
                    <p style={styles.featureText}>
                      All Day 365 service providers are professionals who have been background-checked and reviewed by other customers.
                    </p>
                  </div>
                </div>
                <div style={styles.featuresRow}>
                  <div style={styles.feature}>
                    <h3 style={styles.featureTitle}>Affordable</h3>
                    <p style={styles.featureText}>
                      Day 365 offers a transparent pricing system that allows you to see the cost of the service before you book.
                    </p>
                  </div>
                  <div style={styles.feature}>
                    <h3 style={styles.featureTitle}>Professional</h3>
                    <p style={styles.featureText}>
                      Day 365 provides a wide range of services, including cleaning, moving, delivery, and more, to meet all your needs.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={styles.feature}>
                  <h3 style={styles.featureTitle}>Convenient</h3>
                  <p style={styles.featureText}>
                    Day 365 is your 24/7 personal assistant providing you with convenient services.
                  </p>
                </div>
                <div style={styles.feature}>
                  <h3 style={styles.featureTitle}>Reliable</h3>
                  <p style={styles.featureText}>
                    All Day 365 service providers are professionals who have been background-checked and reviewed by other customers.
                  </p>
                </div>
                <div style={styles.feature}>
                  <h3 style={styles.featureTitle}>Affordable</h3>
                  <p style={styles.featureText}>
                    Day 365 offers a transparent pricing system that allows you to see the cost of the service before you book.
                  </p>
                </div>
                <div style={styles.feature}>
                  <h3 style={styles.featureTitle}>Professional</h3>
                  <p style={styles.featureText}>
                    Day 365 provides a wide range of services, including cleaning, moving, delivery, and more, to meet all your needs.
                  </p>
                </div>
              </>
            )}
          </div>
        </section>

        <section style={styles.popularServices}>
          <h2 style={styles.sectionTitle}>OUR MOST POPULAR SERVICES</h2>
          <div style={styles.serviceListContainer}>
            <div style={styles.serviceList} ref={serviceListRef}>
              {images.map((image, index) => (
                <img 
                  key={index} 
                  src={image.src} 
                  alt={image.alt} 
                  style={styles.serviceImage}
                />
              ))}
            </div>
          </div>
        </section>

        <div style={styles.booking}>
          <p style={styles.bookingText}>Ready to book a service?</p>
          <button 
            onClick={handleExploreNowClick} 
            style={styles.bookingButton}
          >
            Explore Now
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;