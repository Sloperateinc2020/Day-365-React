import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import config from '../config';

function Home() {
  const [allServices, setAllServices] = useState([]);
  const [displayedServices, setDisplayedServices] = useState([]);
  const [stateValue, setStateValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [pincodeValue, setPincodeValue] = useState('');
  const [latestServices, setLatestServices] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [pincodeSuggestions, setPincodeSuggestions] = useState([]);
  const [showPincodeSuggestions, setShowPincodeSuggestions] = useState(false);

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

  const handleSearch = (e) => {
    e.preventDefault();
    let filteredServices = allServices;

    if (pincodeValue) {
      filteredServices = allServices.filter(service =>
        service.pincode.toString() === pincodeValue
      );
    } else if (stateValue || cityValue) {
      filteredServices = allServices.filter(service => {
        const matchesState = stateValue ? service.state === stateValue : true;
        const matchesCity = cityValue ? service.city === cityValue : true;
        return matchesState && matchesCity;
      });
    }

    setDisplayedServices(filteredServices.slice(0, 4));
    setIsSearchActive(true);
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

  const handleSeeMore = () => {
    setDisplayedServices(prevDisplayedServices => {
      const currentLength = prevDisplayedServices.length;
      const nextItems = allServices.slice(currentLength, currentLength + 4);
      return [...prevDisplayedServices, ...nextItems];
    });
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
    }
  };

  const handlePincodeSelect = (pincode) => {
    setPincodeValue(pincode);
    setShowPincodeSuggestions(false);
    setStateValue('');
    setCityValue('');
  };

  const handleStateChange = (e) => {
    setStateValue(e.target.value);
    setPincodeValue('');
  };

  const handleCityChange = (e) => {
    setCityValue(e.target.value);
    setPincodeValue('');
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      <div style={{
        background: '#D6E4FF',
        padding: '60px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ flex: 1, paddingRight: '40px', marginLeft: '50px' }}>
          <h1 style={{
            fontSize: '38px',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>
            Welcome to <span style={{ color: '#4A90E2' }}>Day</span> 365
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
            At <span style={{ fontWeight: 'bold' }}>Day 365</span>, we make it easier than ever to book trusted local services
            online. Whether you need a plumber, electrician, driver, or any other
            professional, we've got you covered with a network of experts ready to
            serve you.
          </p>
          <button style={{
            backgroundColor: '#4A90E2',
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
              placeholder="Search for Services"
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '5px',
                flex: 1,
                marginRight: '10px'
              }}
            />
          </div>

          <select
            value={stateValue}
            onChange={handleStateChange}
            disabled={!!pincodeValue}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
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

          <input
            type="text"
            value={cityValue}
            onChange={handleCityChange}
            placeholder="Enter City"
            disabled={!!pincodeValue}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              width: '150px',
              marginRight: '10px',
              backgroundColor: pincodeValue ? '#f0f0f0' : 'white'
            }}
          />

          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={pincodeValue}
              onChange={(e) => filterPincodes(e.target.value)}
              placeholder="Pincode"
              disabled={!!stateValue || !!cityValue}
              style={{
                padding: '10px',
                border: '1px solid #ccc',
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
          <button
            onClick={handlePrevService}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              opacity: isSearchActive ? 0.5 : 1
            }}
            disabled={isSearchActive}
          >
            ←
          </button>

          {displayedServices.map((service, index) => (
            <div key={index} style={{
              padding: '15px',
              borderRadius: '10px',
              textAlign: 'center',
              width: '160px',
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
              opacity: isSearchActive ? 0.5 : 1
            }}
            disabled={isSearchActive}
          >
            →
          </button>
        </div>

        <button
          onClick={handleSeeMore}
          style={{
            backgroundColor: '#6666ff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            marginTop: '20px',
            cursor: 'pointer'
          }}
        >
          See More
        </button>
        {/* </div> */}
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h3 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#6666ff'
          }}>Latest Services</h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {latestServices.map((service, index) => (
              <div key={index} style={{
                borderRadius: '10px',
                backgroundColor: '#f9f9f9',
                padding: '20px',
                boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
                position: 'relative'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                  <img src={service.iconUrl} alt="Service Icon" style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '5px',
                    marginRight: '10px'
                  }} />
                  <div>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      margin: 0
                    }}>{service.title}</h4>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      margin: 0
                    }}>{`₹${service.salaryRange.minimum} - ₹${service.salaryRange.maximum}`}</p>
                  </div>
                  {service.isHot && (
                    <span style={{
                      backgroundColor: '#FDEDEC',
                      color: '#FF6666',
                      padding: '2px 6px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      borderRadius: '5px',
                      marginLeft: '10px'
                    }}>Hot</span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <img src={service.location.districtIconUrl} alt="District Icon" style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '8px'
                  }} />
                  <p style={{
                    fontSize: '12px',
                    color: '#666',
                    margin: 0
                  }}>{service.location.district}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <img src={service.location.cityIconUrl} alt="City Icon" style={{
                    width: '16px',
                    height: '16px',
                    marginRight: '8px'
                  }} />
                  <p style={{
                    fontSize: '12px',
                    color: '#666',
                    margin: 0
                  }}>{service.location.city}, {service.location.pincode}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={service.workTypeIconUrl} alt="Work Type Icon" style={{
                    width: '16px',
                    height: '16px',
                    marginRight: '8px'
                  }} />
                  <p style={{
                    fontSize: '12px',
                    color: '#666',
                    margin: 0
                  }}>{service.workType}</p>
                </div>
              </div>
            ))}
          </div>


          <button style={{
            backgroundColor: '#6666ff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            marginTop: '20px',
            cursor: 'pointer'
          }}>
            See More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
