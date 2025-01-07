import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AboutPage.css';
import Footer from '../Components/Footer';

const AboutPage = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  // Static images for services
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

  const serviceListRef = useRef(null);

  const handleExploreNowClick = () => {
    navigate('/allservices'); // Navigate to All Services page
  };

  return (
    <>
      <div className="container">
        {/* Header Section */}
        <div className="header">
          <img src="/service.jpg" alt="Day 365" className="header-image" />
          <div className="header-text">
            <h1>What is Day 365?</h1>
            <p>
              Day 365 is a trusted platform for people to receive local services.
              Day 365 is the best choice for low-cost<br /> quality professional services.
            </p>
          </div>
        </div>

        {/* Why Choose Section */}
        <section className="why-choose">
          <h2>Why choose Day 365?</h2>
          <div className="features">
            <div className="feature">
              <h3>Convenient</h3>
              <p>Day 365 is your 24/7 personal assistant providing you with convenient services.</p>
            </div>
            <div className="feature">
              <h3>Reliable</h3>
              <p>All Day 365 service providers are professionals who have been background-checked and reviewed by other customers.</p>
            </div>
            <div className="feature">
              <h3>Affordable</h3>
              <p>Day 365 offers a transparent pricing system that allows you to see the cost of the service before you book.</p>
            </div>
            <div className="feature">
              <h3>Professional</h3>
              <p>Day 365 provides a wide range of services, including cleaning, moving, delivery, and more, to meet all your needs.</p>
            </div>
          </div>
        </section>

        {/* Popular Services Section */}
        <section className="popular-services">
          <h2>OUR MOST POPULAR SERVICES</h2>
          <div className="service-list-container">
            <div className="service-list" ref={serviceListRef}>
              {images.map((image, index) => (
                <img key={index} src={image.src} alt={image.alt} className="service-image" />
              ))}
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <div className="booking">
          <p>Ready to book a service?</p>
          <button onClick={handleExploreNowClick}>Explore Now</button> {/* Attach the click handler */}
        </div>
      </div>

      {/* Footer outside the main content container */}
      <Footer />
    </>
  );
};

export default AboutPage;
