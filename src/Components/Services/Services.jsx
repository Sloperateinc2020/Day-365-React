import React, { useEffect, useState } from 'react';
import config from '../../config'; // Adjust the path as needed
import Footer from "../Footer"; // Import the Footer component


const Services = () => {
  const [popularServices, setPopularServices] = useState([]);
  const [specialOffers, setSpecialOffers] = useState([]);
  const [topProviders, setTopProviders] = useState([]); // State to hold top-rated providers data

  // Fetch popular services, special offers, and top-rated providers
  useEffect(() => {
    // Fetch popular services from the API
    const fetchPopularServices = async () => {
      try {
        const response = await fetch(config.POPULARSERVICESNEARYOU_API_URL);
        const data = await response.json();
        setPopularServices(data.popularServicesNearYou); // Assuming the data structure matches
      } catch (error) {
        console.error('Error fetching popular services:', error);
      }
    };

    // Fetch special offers from the API
    const fetchSpecialOffers = async () => {
      try {
        const response = await fetch(config.SPECIALOFFERS_API_URL);
        const data = await response.json();
        setSpecialOffers(data.specialOffers); // Assuming the data structure matches
      } catch (error) {
        console.error('Error fetching special offers:', error);
      }
    };

    // Fetch top-rated providers from the API
    const fetchTopProviders = async () => {
      try {
        const response = await fetch(config.TOPRATEDPROVIDERS_API_URL);
        const data = await response.json();
        setTopProviders(data.topRatedProviders); // Assuming the data structure matches
      } catch (error) {
        console.error('Error fetching top-rated providers:', error);
      }
    };

    // Call all the fetch functions when the component mounts
    fetchPopularServices();
    fetchSpecialOffers();
    fetchTopProviders();
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  return (
    <>
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Search Header */}
      <div style={{
        display: 'flex',
        alignItems: 'stretch',
        marginBottom: '24px',
        height: '36px',
        border: '1px solid #ccc',
        borderRadius: '2px',
        backgroundColor: '#fff',
        marginTop: "100px"
      }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px', borderRight: '1px solid #ccc' }}>
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'%3E%3C/path%3E%3C/svg%3E"
            style={{ width: '16px', height: '16px' }}
            alt=""
          />
        </div>
        <input
          type="text"
          placeholder="Search services"
          style={{ flex: '1', padding: '0 8px', border: 'none', outline: 'none', fontSize: '13px', borderRight: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Location"
          style={{ width: '120px', padding: '0 8px', border: 'none', outline: 'none', fontSize: '13px', borderRight: '1px solid #ccc' }}
        />
        <div style={{ position: 'relative', borderRight: '1px solid #ccc', display: 'flex', alignItems: 'center', width: '80px' }}>
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
              cursor: 'pointer'
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
          style={{
            backgroundColor: '#4F46E5',
            color: 'white',
            border: 'none',
            padding: '0 16px',
            fontSize: '13px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          Search
        </button>
      </div>

      {/* Popular Services */}
      <div style={{ marginBottom: '25x' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Popular services near you</h2>
          <button
            style={{ color: '#4F46E5', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            See all
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
          {popularServices.map((service) => (
            <div key={service.id}>
              <div
                style={{
                  backgroundImage: `url(${service.image})`,
                  backgroundSize: 'cover',
                  borderRadius: '8px',
                  height: '120px',
                  marginBottom: '8px'
                }}
              ></div>
              <div
                style={{
                  // backgroundColor: '#f1f5f9',
                  height: '16px',
                  width: '70%',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}
              >
                {service.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <div style={{ marginBottom: '32px',fontSize:'20px',}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Special Offers</h2>
          <button
            style={{ color: '#4F46E5', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            See all
          </button>

        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
          {specialOffers.map((offer) => (
            <div key={offer.id}>
              <div
                style={{
                  backgroundImage: `url(${offer.image})`,
                  backgroundSize: 'cover',
                  borderRadius: '8px',
                  height: '160px',
                  width: '100%',
                  marginBottom: '8px'
                }}
              ></div>
              <div
                style={{
                  // backgroundColor: '#f1f5f9',
                  height: '16px',
                  width: '80%',
                  borderRadius: '4px',
                  textAlign: 'center',
                  marginBottom: '4px'
                }}
              >
                {offer.offer}
              </div>
              <div
                style={{
                  // backgroundColor: '#f1f5f9',
                  height: '16px',
                  width: '50%',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}
              >
                {offer.discount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Rated Providers */}
      <div style={{ marginBottom: '32px',fontSize:'20px', }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Top rated providers</h2>
          <button
            style={{ color: '#4F46E5', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            See all
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
          {topProviders.map((provider, index) => (
            <div key={`provider-${index}`} >
              <div
                style={{
                  backgroundImage: `url(${provider.image})`, // Assuming provider has an image property
                  backgroundSize: 'cover',
                  borderRadius: '8px',
                  height: '90px',
                  marginBottom: '8px'
                }}
              ></div>
              <div
                style={{
                  // backgroundColor: '#f1f5f9',
                  height: '16px',
                  width: '75%',
                  borderRadius: '4px',
                  marginBottom: '4px'
                }}
              >
                {provider.name}
              </div>
              <div
                style={{
                  // backgroundColor: '#f1f5f9',
                  height: '16px',
                  width: '50%',
                  borderRadius: '4px'
                }}
              >
                {provider.rating}
              </div>
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
