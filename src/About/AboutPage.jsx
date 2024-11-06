import React, { useState, useEffect, useRef } from 'react';
import './AboutPage.css';

const AboutPage = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const serviceListRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://mocki.io/v1/02042842-81dc-4965-b5d7-aaebd1b65c3b');
        
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        const data = await response.json();
        const topServices = data.topServices;

        if (!Array.isArray(topServices)) {
          throw new Error("Unexpected data structure: 'topServices' is not an array");
        }

        const popularImages = topServices.filter(service => service.isPopularService === true);
        const nonPopularImages = topServices.filter(service => service.isPopularService === false);

        const selectedImages = [...popularImages.slice(0, 5)];
        if (selectedImages.length < 5) {
          selectedImages.push(...nonPopularImages.slice(0, 5 - selectedImages.length));
        }

        setImages(selectedImages);
        setError(null);
      } catch (error) {
        console.error("Error fetching images:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();

    // Prevent scrolling the main page while swiping horizontally in .service-list
    const handleTouchMove = (e) => {
      if (serviceListRef.current && serviceListRef.current.contains(e.target)) {
        e.preventDefault();
        serviceListRef.current.scrollLeft += e.touches[0].clientX - serviceListRef.current.clientX;
      }
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
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
            {isLoading ? (
              <p>Loading services...</p>
            ) : error ? (
              <p>Error loading images: {error}</p>
            ) : images.length > 0 ? (
              images.map((service, index) => (
                <img key={index} src={service.iconUrl} alt={service.title} className="service-image" />
              ))
            ) : (
              <p>No popular services available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <div className="booking">
        <p>Ready to book a service?</p>
        <button>Explore Now</button>
      </div>
    </div>
  );
};

export default AboutPage;
