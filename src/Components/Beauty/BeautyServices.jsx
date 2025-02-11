// BeautyServices.js
import React, { useState, useEffect } from 'react';
import { Star, Clock, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import beautyServicesData from '../data/beautyServices.json';
import Footer from '../Footer'; // Import the Footer component

function BeautyServices() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768); // Default to desktop if width > 768px
  const navigate = useNavigate();

  // Update isDesktop state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredServices = beautyServicesData.categories.flatMap(category => {
    if (selectedCategory === 'all' || selectedCategory === category.id) {
      return category.services.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return [];
  });

  return (
    <>
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#fff',
      marginBottom: '10px'
    }}>
      {/* Banner Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
        padding: '30px 20px',
        backgroundImage: 'url(https://img.freepik.com/free-vector/flat-design-makeup-artist-facebook-post_23-2149344918.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '20px',
        position: 'relative',
        color: '#fff',
        marginTop: isDesktop ? '50px' : '0',
        height: isDesktop ? '' : '150px',
      }}>
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '20px',
          borderRadius: '20px',
          marginTop: isDesktop ? '' : '-20px',
        }}>
          <h1 style={{
            fontSize: '20px',
            fontWeight: '700',
          }}>
            Beauty & Wellness Services
          </h1>
          <button
            onClick={() => navigate('/beauty')}
            style={{
              marginTop: '12px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '600',
              borderRadius: '8px',
              backgroundColor: '#ff69b4',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              transition: '0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ff1493'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ff69b4'}
          >
            Explore More Services
          </button>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          position: 'relative',
          flex: '1',
          maxWidth: '400px'
        }}>
          <Search style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#718096'
          }} size={18} />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 40px',
              fontSize: '14px',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              outline: 'none'
            }}
          />
        </div>

        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: selectedCategory === 'all' ? '#805ad5' : '#e2e8f0',
              color: selectedCategory === 'all' ? '#ffffff' : '#4a5568',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            All Services
          </button>
          {beautyServicesData.categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: selectedCategory === category.id ? '#805ad5' : '#e2e8f0',
                color: selectedCategory === category.id ? '#ffffff' : '#4a5568',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isDesktop ? 'repeat(auto-fill, minmax(250px, 1fr))' : 'repeat(2, 1fr)',
        gap: '20px',
        padding: '20px 0'
      }}>
        {filteredServices.map((service, index) => (
          <React.Fragment key={service.id}>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                <img
                  src={service.image}
                  alt={service.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: '#ffffff',
                  padding: '5px 10px',
                  borderRadius: '15px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Clock size={12} />
                  {service.duration}
                </div>
              </div>
              <div style={{ padding: '15px' }}>
                <h3 style={{
                  fontSize: isDesktop ? '18px' : '14px',
                  fontWeight: '600',
                  color: '#2d3748',
                  marginBottom: '8px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%'
                }}>
                  {service.name}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#805ad5' }}>
                    {service.price}
                  </span>
                </div>
                <button style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#805ad5',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}>
                  Book Now
                </button>
              </div>
            </div>
            {isDesktop ? (
              index === 5 && (
                <div style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  margin: '30px 0',
                  padding: '30px 20px',
                  backgroundImage: 'url(https://naomisheadmasters.com/wp-content/uploads/2023/10/Top-10-Salons-In-India.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '20px',
                  position: 'relative',
                  color: '#fff',
                }}>
                  <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '20px', borderRadius: '20px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: '700' }}>
                      Special Beauty Offers
                    </h1>
                    <p style={{ fontSize: '14px', maxWidth: '500px', margin: '0 auto' }}>
                      Get exclusive discounts on premium services. Book now!
                    </p>
                    <button
                      onClick={() => navigate('/beauty-offers')}
                      style={{
                        marginTop: '12px',
                        padding: '8px 16px',
                        fontSize: '13px',
                        fontWeight: '600',
                        borderRadius: '8px',
                        backgroundColor: '#ff69b4',
                        border: 'none',
                        color: '#fff',
                        cursor: 'pointer',
                        transition: '0.3s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ff1493'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ff69b4'}
                    >
                      Explore Offers
                    </button>
                  </div>
                </div>
              )
            ) : (
              index === 1 && (
                <div style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  margin: '30px 0',
                  padding: '30px 20px',
                  backgroundImage: 'url(https://naomisheadmasters.com/wp-content/uploads/2023/10/Top-10-Salons-In-India.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '20px',
                  position: 'relative',
                  color: '#fff',
                  height: '150px',
                }}>
                  <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '20px', borderRadius: '20px', marginTop: '-24px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700' }}>
                      Special Beauty Offers
                    </h3>
                    <p style={{ fontSize: '14px', maxWidth: '500px', margin: '0 auto' }}>
                      Get exclusive discounts on premium services. Book now!
                    </p>
                    <button
                      onClick={() => navigate('/beauty-offers')}
                      style={{
                        marginTop: '12px',
                        padding: '8px 16px',
                        fontSize: '13px',
                        fontWeight: '600',
                        borderRadius: '8px',
                        backgroundColor: '#ff69b4',
                        border: 'none',
                        color: '#fff',
                        cursor: 'pointer',
                        transition: '0.3s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ff1493'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ff69b4'}
                    >
                      Explore Offers
                    </button>
                  </div>
                </div>
              )
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
          <Footer />
        </>
  );
}

export default BeautyServices;