import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import config from '../config';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import VendorBanner from './Homepage/VendorBanner';
import CustomerHelp from './Homepage/CustomerHelp';
import LatestServices from './LatestServices/LatestServices';
import TopServices from './TopServices/TopServices'; // Import TopServices component

function Home() {
  const [allServices, setAllServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]); // Store filtered results here
  const [displayedServices, setDisplayedServices] = useState([]);
  const [stateValue, setStateValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [pincodeValue, setPincodeValue] = useState('');
  const [serviceSearchValue, setServiceSearchValue] = useState('');
  const [latestServices, setLatestServices] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [pincodeSuggestions, setPincodeSuggestions] = useState([]);
  const [showPincodeSuggestions, setShowPincodeSuggestions] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  

  useEffect(() => {
    fetchServices();
    fetchLatestServices();
    fetchTopServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(config.SERVICE_API_URL);
      const data = await response.json();
      setAllServices(data.services);
      setFilteredServices(data.services); 
      setDisplayedServices(data.services.slice(0, 4));
      setIsSearchActive(false);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchLatestServices = async () => {
    try {
      const response = await fetch(config.LATESTSERVICE_API_URL);
      const data = await response.json();
      setLatestServices(data.latestServices);
    } catch (error) {
      console.error('Error fetching latest services:', error);
    }
  };

  const fetchTopServices = async () => {
    try {
      const response = await fetch(config.TOPSERVICE_API_URL);
      const data = await response.json();
      setTopServices(data.topServices);
    } catch (error) {
      console.error('Error fetching top services:', error);
    }
  };

  const handleServiceSearch = (e) => {
    const searchValue = e.target.value;
    setServiceSearchValue(searchValue);
  
    if (!searchValue) {
      setStateValue('');
      setCityValue('');
      setPincodeValue('');
      setDisplayedServices(allServices.slice(0, 4));
      setFilteredServices(allServices);
      setIsSearchActive(false);
    } else {
      const filteredResults = allServices.filter(service =>
        typeof service.service === 'string' &&
        service.service.toLowerCase().includes(searchValue.toLowerCase())
      );
      
      setFilteredServices(filteredResults);
      setDisplayedServices(filteredResults.slice(0, 4));
      setIsSearchActive(true);
    }
  };
  
  

  const handleSearch = (e) => {
    e.preventDefault();
    let results = allServices;

    const hasLocationFilter = stateValue || cityValue || pincodeValue;

    if (serviceSearchValue) {
      results = results.filter(service =>
        typeof service.service === 'string' &&
        service.service.toLowerCase().includes(serviceSearchValue.toLowerCase())
      );
    }
  
    if (pincodeValue) {
      results = results.filter(service =>
        service.pincode.toString() === pincodeValue
      );
    } else if (stateValue || cityValue) {
      results = results.filter(service => {
        const matchesState = stateValue ? service.state === stateValue : true;
        const matchesCity = cityValue ? service.city === cityValue : true;
        return matchesState && matchesCity;
      });
    }
  
    if (!hasLocationFilter) {
      // No filters selected, so redirect to the services page
      navigate('/services');
    } else {
      // Filters are applied, update the displayed services
      setFilteredServices(results);
      setDisplayedServices(results.slice(0, 4));
      setIsSearchActive(true);
    }
  };
  const handleSeeMore = () => {
    const currentLength = displayedServices.length;
    const nextItems = filteredServices.slice(currentLength, currentLength + 4); 
    setDisplayedServices(prevDisplayedServices => [...prevDisplayedServices, ...nextItems]);
  };

  const handleNextService = () => {
    if (!isSearchActive) {
      setDisplayedServices(prevDisplayedServices => {
        const nextIndex = (currentIndex + 1) % allServices.length;
        const newService = allServices[(currentIndex + 4) % allServices.length];
        setCurrentIndex(nextIndex);
        return [...prevDisplayedServices.slice(1), newService];
      });
    }
  };

  const handlePrevService = () => {
    if (!isSearchActive) {
      setDisplayedServices(prevDisplayedServices => {
        const prevIndex = (currentIndex - 1 + allServices.length) % allServices.length;
        const newService = allServices[prevIndex];
        setCurrentIndex(prevIndex);
        return [newService, ...prevDisplayedServices.slice(0, 3)];
      });
    }
  };

  const filterPincodes = (input) => {
    setPincodeValue(input);

    if (input) {
      const filteredPincodes = allServices
        .filter(service => service.pincode.toString().startsWith(input))
        .map(service => service.pincode);
      const uniquePincodes = Array.from(new Set(filteredPincodes));
      setPincodeSuggestions(uniquePincodes);
      setShowPincodeSuggestions(true);
    } else {
      setShowPincodeSuggestions(false);
      if (!stateValue && !cityValue) {
        setDisplayedServices(allServices.slice(0, 4));
        setFilteredServices(allServices);
        setIsSearchActive(false);
      }
    }
  };

  const handlePincodeSelect = (pincode) => {
    setPincodeValue(pincode);
    setShowPincodeSuggestions(false);
    setStateValue('');
    setCityValue('');
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setStateValue(state);
    setPincodeValue('');
    setCityValue('');
    setCitySuggestions([]);

    if (!state && !cityValue) {
      setDisplayedServices(allServices.slice(0, 4));
      setFilteredServices(allServices);
      setIsSearchActive(false);
    }
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setCityValue(city);
    setPincodeValue('');

    if (city) {
      const filteredCities = allServices
        .filter(service => 
          service.city.toLowerCase().startsWith(city.toLowerCase()) && 
          (!stateValue || service.state === stateValue)
        )
        .map(service => service.city);
      const uniqueCities = Array.from(new Set(filteredCities));
      setCitySuggestions(uniqueCities);
      setShowCitySuggestions(true);
    } else {
      setShowCitySuggestions(false);
    }

    if (!stateValue && !city) {
      setDisplayedServices(allServices.slice(0, 4));
      setFilteredServices(allServices);
      setIsSearchActive(false);
    }
  };

  const handleCitySelect = (city) => {
    setCityValue(city);
    setShowCitySuggestions(false);
    
    const service = allServices.find(service => service.city === city);
    setStateValue(service ? service.state : '');
  };
  const navigate = useNavigate();

  // const handleSeeMoreTopServices = () => {
  //   navigate('/top-services');
  // };

  // const handleSeeMoreLatestServices = () => {
  //   navigate('/latestservices');
  // };
  
  return (
    <div style={{ overflowX: 'hidden', position: 'fixed', width: '100%', height: '90%',marginTop:"40px" }}>

    <div style={{ overflowX: 'hidden' }}>
      <div style={{
        background: '#D6E4FF',
        padding: '60px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ flex: 1, paddingRight: '40px', marginLeft: '50px' }}>
          <h1 style={{
            fontSize: '38px',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>
            Welcome to <span style={{ color: '#4A90E2' }}>Urban</span> Maverick
          </h1>
          <p style={{
            fontSize: '13px',
            fontWeight: 'bold',
            marginBottom: '10px',
            marginLeft: '170px'
          }}>
            - Local Services at Your Fingertips!
          </p>
          <p style={{
            fontSize: '12px',
            color: '#666',
            marginBottom: '24px',
            lineHeight: '22px'
          }}>
            At <span style={{ fontWeight: 'bold' }}>Day 365</span>, we make it easier than ever to book trusted local services,<br />
            online. Whether you need a plumber, electrician, driver, or any other<br />
            professional, we've got you covered with a network of experts ready to<br />
            serve you.
          </p>
          <button style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            width: '120px',
            height: '40px',
            cursor: 'pointer'
          }}>
            Explore now
          </button>
        </div>

        <div style={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            position: 'relative',
            width: '400px',
            height: '160px',
            backgroundColor: '#6666ff',
            borderRadius: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            padding: '20px',
          }}>
            <img src="https://www.shutterstock.com/image-photo/happy-young-guy-flag-us-260nw-2000077403.jpg" alt="Person 1" style={{
              position: 'absolute',
              top: '-0px',
              left: '-0px',
              width: '70px',
              height: '60px',
              borderRadius: '50%',
              border: '4px solid white',
            }} />

            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '15px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              marginRight: '40px',
              zIndex: 1,
              width:"200px",
              marginTop:'70px'
            }}>
              <img src="https://www.shutterstock.com/image-vector/user-circle-isolated-icon-round-260nw-2459622791.jpg" alt="Plumber Icon" style={{
                width: '30px',
                height: '30px',
                marginBottom: '8px',
              }} />
              <h3 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '0',
              }}>Plumber</h3>
              <p style={{
                fontSize: '12px',
                color: '#6666ff',
                margin: '0',
              }}>Book with Ease</p>
            </div>

            <div style={{
              position: 'absolute',
              top: '30%',
              right: '20px',
              transform: 'translateY(-50%)',
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '15px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              zIndex: 1,
              width:"150px"
            }}>
              <img src="https://img.freepik.com/premium-vector/businessman-driver-icon-flat-character-with-steering-wheel_176411-4417.jpg" alt="Driver Icon" style={{
                width: '30px',
                height: '30px',
                marginBottom: '8px',
              }} />
              <h3 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '0',
              }}>Driver</h3>
              <p style={{
                fontSize: '12px',
                color: 'blue',
                margin: '0',
              }}>Book at Cheep COST</p>
            </div>

            <img src="https://via.placeholder.com/50" alt="Person 2" style={{
              position: 'absolute',
              bottom: '-20px',
              right: '-20px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '4px solid white',
            }} />

            {/* Location Icon */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '-10px',
              backgroundColor: 'white',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ff4081',
              fontSize: '16px',
              fontWeight: 'bold',
              zIndex: 2,
            }}>
              📍
            </div>
          </div>
          </div>
          </div>

      <div style={{ padding: '20px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          Explore more <span style={{ color: '#6666ff' }}>Services</span>
        </h2>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px',
          backgroundColor: 'white',
          borderRadius: '10px',
          marginTop: '20px',
          maxWidth: '800px',
          margin: '0 auto',
          height: '50px'
        }}>
<div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
  <Search size={20} style={{ marginRight: '10px' }} />
  <input
    type="text"
    value={serviceSearchValue}
    onChange={handleServiceSearch}
    placeholder="Search for Services"
    style={{
      border: 'none', 
      padding: '10px',
      borderRadius: '5px',
      flex: 1,
      marginRight: '10px',
      backgroundColor: '#f0f0f0' 
    }}
  />
</div>
<select
  value={stateValue}
  onChange={handleStateChange}
  disabled={!!pincodeValue}
  style={{
    padding: '10px',
    border: 'none', 
    borderRadius: '5px',
    width: '150px',
    marginRight: '10px',
    backgroundColor: pincodeValue ? '#f0f0f0' : 'white'
  }}
>
  <option value="">Select State</option>
  {Array.from(new Set(allServices.map(service => service.state))).map((state, index) => (
    <option key={index} value={state}>{state}</option>
  ))}
</select>

<div style={{ position: 'relative' }}>
  <input
    type="text"
    value={cityValue}
    onChange={handleCityChange}
    placeholder="Enter City"
    disabled={!!pincodeValue}
    style={{
      padding: '10px',
      border: 'none', 
      borderRadius: '5px',
      width: '150px',
      marginRight: '10px',
      backgroundColor: pincodeValue ? '#f0f0f0' : 'white'
    }}
  />
  {showCitySuggestions && (
    <div style={{
      position: 'absolute',
      top: '100%',
      left: 0,
      width: '150px',
      maxHeight: '150px',
      overflowY: 'auto',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '5px',
      zIndex: 1000
    }}>
      {citySuggestions.map((city, index) => (
        <div
          key={index}
          onClick={() => handleCitySelect(city)}
          style={{ padding: '10px', cursor: 'pointer' }}
        >
          {city}
        </div>
      ))}
    </div>
  )}
</div>

<div style={{ position: 'relative' }}>
  <input
    type="text"
    value={pincodeValue}
    onChange={(e) => filterPincodes(e.target.value)}
    placeholder="Pincode"
    disabled={!!stateValue || !!cityValue}
    style={{
      padding: '10px',
      border: 'none', // Removed border
      borderRadius: '5px',
      width: '100px',
      marginRight: '10px',
      backgroundColor: (stateValue || cityValue) ? '#f0f0f0' : 'white'
    }}
  />
  {showPincodeSuggestions && (
    <div style={{
      position: 'absolute',
      top: '100%',
      left: 0,
      width: '100%',
      maxHeight: '150px',
      overflowY: 'auto',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '5px',
      zIndex: 1000
    }}>
      {pincodeSuggestions.map((pincode, index) => (
        <div
          key={index}
          onClick={() => handlePincodeSelect(pincode)}
          style={{ padding: '10px', cursor: 'pointer' }}
        >
          {pincode}
        </div>
      ))}
    </div>
  )}
</div>
          <button
            onClick={handleSearch}
            style={{
              backgroundColor: '#6666ff',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              cursor: 'pointer'
            }}
          >
            <Search size={20} />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Service Cards Section */}
      <div style={{
        padding: '4px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}>
         <div style={{ display: 'flex', alignItems: 'center' }}>
  <button
    onClick={handlePrevService}
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      opacity: isSearchActive ? 0.5 : 1,
      fontSize: '24px',
      color: '#bbb',
      padding: '10px'
    }}
    disabled={isSearchActive}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15 19L8 12L15 5" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>

  {displayedServices.map((service, index) => (
    <div key={index} style={{
      padding: '15px',
      borderRadius: '10px',
      textAlign: 'center',
      width: '170px',
      margin: '8px',
      backgroundColor: service.color || '#f9f9f9',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <img src={service.imageUrl} alt={service.service} style={{
        width: '60px',
        height: '60px',
        borderRadius: '30px',
        marginBottom: '10px'
      }} />
      <p style={{
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333'
      }}>{service.service}</p>
      <p style={{
        fontSize: '12px',
        color: '#666'
      }}>{service.availableServices}</p>
    </div>
  ))}

  <button
    onClick={handleNextService}
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      opacity: isSearchActive ? 0.5 : 1,
      fontSize: '24px',
      color: '#bbb',
      padding: '10px'
    }}
    disabled={isSearchActive}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 5L16 12L9 19" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>
</div>
</div>
  <LatestServices limit={3} hideFooter={true} hideDescription={true} />
   <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => navigate('/latestservices')}
            style={{
              backgroundColor: '#6666ff',
              color: 'white',
              padding: '10px 24px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }}
          >
            See More
          </button>
        </div>
    </div>

        <TopServices limit={4} hideFooter={true} hideDescription={true} />
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => navigate('/top-services')}
            style={{
              backgroundColor: '#6666ff',
              color: 'white',
              padding: '10px 24px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }}
          >
            See More
          </button>
      </div>
    {/* Vendor Banner Section */}
    <div style={{ marginTop: '60px' }}>
        <VendorBanner />
      </div>

     {/* Customer Help Section */}
     <div style={{ marginTop: '60px' }}>
        <CustomerHelp />
      </div>
    </div>
    <Footer />

    </div>

  );
}

export default Home;