import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import config from '../../config';
import Footer from "../Footer";

// Custom hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const SearchResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');
  const searchLocation = queryParams.get('location');

  return (
    <div>
      <h1>Search Results</h1>
      <p>Search query: {searchQuery}</p>
      <p>Location: {searchLocation}</p>
    </div>
  );
};

const Services = () => {
  const [popularServices, setPopularServices] = useState([]);
  const [specialOffers, setSpecialOffers] = useState([]);
  const [topProviders, setTopProviders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchPopularServices = async () => {
      try {
        const response = await fetch(config.POPULARSERVICESNEARYOU_API_URL);
        const data = await response.json();
        setPopularServices(data.popularServicesNearYou);
      } catch (error) {
        console.error('Error fetching popular services:', error);
      }
    };

    const fetchSpecialOffers = async () => {
      try {
        const response = await fetch(config.SPECIALOFFERS_API_URL);
        const data = await response.json();
        setSpecialOffers(data.specialOffers);
      } catch (error) {
        console.error('Error fetching special offers:', error);
      }
    };

    const fetchTopProviders = async () => {
      try {
        const response = await fetch(config.SERVICE_API_URL);
        const data = await response.json();
        const allProviders = data.services.flatMap(service => 
          service.persons.map(person => ({
            ...person,
            service: service.service,
            serviceIcon: service.icon,
            serviceImageUrl: service.imageUrl
          }))
        );
        const sortedProviders = allProviders.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        setTopProviders(sortedProviders);
      } catch (error) {
        console.error('Error fetching top-rated providers:', error);
      }
    };

    fetchPopularServices();
    fetchSpecialOffers();
    fetchTopProviders();
  }, []);

  const handleSearchClick = () => {
    if (searchQuery.trim() || location.trim()) {
      const queryString = `?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`;
      navigate(`/search-result${queryString}`);
    }
  };

  const handleSeeAll = (category) => {
    navigate(`/services/${category}`);
  };

  return (
    <>
      <div style={{ 
        padding: isMobile ? '10px' : '20px', 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
        {/* Search Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '24px',
          height: '36px',
          border: '1px solid #ccc',
          borderRadius: '2px',
          backgroundColor: '#fff',
          marginTop: isMobile ? '8px' : '60px',
          ...(isMobile && {
            flexWrap: 'nowrap',
            height: '36px',
          })
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 8px',
            borderRight: '1px solid #ccc',
            height: '100%'
          }}>
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'%3E%3C/path%3E%3C/svg%3E"
              style={{ width: '16px', height: '16px' }}
              alt=""
            />
          </div>
          <input
            type="text"
            placeholder="Search services"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: isMobile ? '1' : '1',
              padding: '0 8px',
              border: 'none',
              outline: 'none',
              fontSize: '13px',
              borderRight: '1px solid #ccc',
              height: '100%',
              minWidth: isMobile ? '80px' : 'auto'
            }}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              width: isMobile ? '60px' : '120px',
              padding: '0 8px',
              border: 'none',
              outline: 'none',
              fontSize: '13px',
              borderRight: '1px solid #ccc',
              height: '100%'
            }}
          />
          <div style={{
            position: 'relative',
            borderRight: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            width: isMobile ? '50px' : '80px',
            height: '100%'
          }}>
            <select
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                outline: 'none',
                fontSize: '13px',
                backgroundColor: 'transparent',
                appearance: 'none',
                padding: '0 24px 0 8px',
                cursor: 'pointer',
              }}
            >
              <option>Filter</option>
            </select>
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E"
              style={{ width: '12px', height: '12px', position: 'absolute', right: '8px', pointerEvents: 'none' }}
              alt=""
            />
          </div>
          <button
            onClick={handleSearchClick}
            style={{
              backgroundColor: '#4F46E5',
              color: 'white',
              border: 'none',
              padding: isMobile ? '0 8px' : '0 16px',
              fontSize: '13px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              height: '100%'
            }}
          >
            Search
          </button>
        </div>

        {/* Popular Services */}
        <div style={{ marginBottom: '25px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginTop: '30px',
            padding: isMobile ? '0 10px' : '0'
          }}>
            <h2 style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: '600' }}>
              Popular services near you
            </h2>
            <button
              style={{ color: '#4F46E5', background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => handleSeeAll('popular-services')}
            >
              See all
            </button>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(4, 1fr)' : 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: isMobile ? '8px' : '16px',
            padding: isMobile ? '10px' : '0',
          }}>
            {popularServices.map((service) => (
              <div key={service.id}>
                <div style={{
                  backgroundImage: `url(${service.image})`,
                  backgroundSize: 'cover',
                  borderRadius: '8px',
                  height: isMobile ? '60px' : '120px',
                  width: isMobile ? '70px' : '170px',
                  marginBottom: '8px',
                }}></div>
                <div style={{
                  height: '16px',
                  width: '100%',
                  borderRadius: '4px',
                  textAlign: 'center',
                  fontSize: isMobile ? '8px' : '14px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {service.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Offers */}
        <div style={{ marginBottom: '3px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            padding: isMobile ? '0 10px' : '0'
          }}>
            <h2 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '600' }}>
              Special Offers
            </h2>
            <button
              style={{ color: '#4F46E5', background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => handleSeeAll('special-offers')}
            >
              See all
            </button>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: isMobile ? '10px' : '16px',
            padding: isMobile ? '10px' : '0'
          }}>
            {specialOffers.slice(0, isMobile ? 3 : undefined).map((offer) => (
              <div key={offer.id}>
                <div style={{
                  backgroundImage: `url(${offer.image})`,
                  backgroundSize: 'cover',
                  borderRadius: '8px',
                  height: isMobile ? '120px' : '160px',
                  width: '100%',
                  marginBottom: '8px',
                }}></div>
                <div style={{
                  height: '16px',
                  width: '80%',
                  borderRadius: '4px',
                  textAlign: 'center',
                  marginBottom: '4px',
                  fontSize: isMobile ? '8px' : '14px'
                }}>
                  {offer.offer}
                </div>
                <div style={{
                  height: '16px',
                  width: '50%',
                  borderRadius: '4px',
                  textAlign: 'center',
                  fontSize: isMobile ? '12px' : '14px'
                }}>
                  {offer.discount}
                </div>
              </div>
            ))}
          </div>
        </div>

{/* Top Rated Providers */}
<div style={{ marginBottom: '32px' }}>
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    padding: isMobile ? '0 10px' : '0'
  }}>
    <h2 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '600' }}>
      Top rated providers
    </h2>
    <button
      style={{ color: '#4F46E5', background: 'none', border: 'none', cursor: 'pointer' }}
      onClick={() => handleSeeAll('top-providers')}
    >
      See all
    </button>
  </div>
  <div style={{
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: isMobile ? '10px' : '16px',
    padding: isMobile ? '10px' : '0',
  }}>
    {topProviders.slice(0, 4).map((provider, index) => (
      <div key={`provider-${index}`} style={{
        backgroundColor: isMobile ? provider.color : 'transparent', // Apply color only in mobile
        padding: '8px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'column',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{
          width: isMobile ? '40px' : '150px',
          height: isMobile ? '40px' : '100px',
          borderRadius: isMobile ? '50%' : '8px',
          overflow: 'hidden',
        }}>
          <img 
            src={provider.personimageUrl} 
            alt={provider.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
        <div style={{
          fontSize: isMobile ? '8px' : '14px',
          fontWeight: '500',
          textAlign: 'center'
        }}>
          {provider.name}
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: isMobile ? '8px' : '12px',
        }}>
          ⭐ {provider.rating}
        </div>


                {isMobile && (
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '4px'
                }}>
                  <button style={{
                    padding: '4px 8px',
                    fontSize: isMobile ? '5px' : '12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: 'white'
                  }}>
                    Message
                  </button>
                  <button style={{
                    padding: '4px 8px',
                    fontSize: isMobile ? '5px' : '12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: 'white'
                  }}>
                    View all
                  </button>
                </div>
)}
              </div>
            ))}
          </div>
        </div>

        <style>
          {`
            @keyframes pulse {
              0% { opacity: 0.6; }
              50% { opacity: 1; }
              100% { opacity: 0.6; }
            }
          `}
        </style>
      </div>
      <Footer />
    </>
  );
};

export default Services;