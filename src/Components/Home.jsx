import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import config from '../config';
import Footer from './Footer';


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
      setFilteredServices(data.services); // Set initial filtered services
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
      setDisplayedServices(allServices.slice(0, 4));
      setFilteredServices(allServices);
      setIsSearchActive(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let results = allServices;

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

    setFilteredServices(results); 
    setDisplayedServices(results.slice(0, 4));
    setIsSearchActive(true);
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
            At <span style={{ fontWeight: 'bold' }}>Day 365</span>, we make it easier than ever to book trusted local services,<br></br>
            online. Whether you need a plumber, electrician, driver, or any other<br></br>
            professional, we've got you covered with a network of experts ready to<br></br>
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
              value={serviceSearchValue}
              onChange={handleServiceSearch}
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

          <div style={{ position: 'relative' }}>
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
                position: 'relative',
                width:'250px'
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
      <div style={{ padding: '40px 0', textAlign: 'center' }}>
      <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
        Top <span style={{ color: '#6666ff' }}>Services</span>
      </h2>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '50px',
      }}>
        {topServices.slice(0, 4).map((service, index) => (
          <div key={index} style={{
            flex: '0 0 13%', 
            borderRadius: '8px',
            padding: '20px',
            alignItems: 'center',
            border: '1px solid #f5f5f5',
            backgroundColor: '#f1f1f1',
            textAlign: 'center'
          }}>
            <img
              src={service.iconUrl}
              alt={service.title}
              style={{
                width: '50px',
                height: '50px',
                marginBottom: '8px'
              }}
            />
            <h3 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '4px',
              textAlign: 'center'
            }}>
              {service.title}
            </h3>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '4px'
            }}>
              <span style={{
                color: '#4A90E2',
                textDecoration: 'underline',
                fontSize: '14px',
                marginRight: '4px'
              }}>
                {service.jobCount} jobs
              </span>
              <span style={{
                color: '#333',
                fontSize: '14px'
              }}>
                | {service.location}
              </span>
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
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#6666ff',
      borderRadius: '10px',
      padding: '20px',
      marginTop: '60px',
      margin: '0 10px',
      justifyContent: 'space-between',
      width: '900px', // Increased width
      marginLeft: '190px',
    }}>
      {/* Banner Content */}
      <div style={{
        flex: 1,
        backgroundColor: '#6666ff'
      }}>
        <h2 style={{
          color: '#FFFFFF',
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '10px',
          marginLeft: '30px',
          marginTop: '40px'
        }}>
          Build a Vendor Profile
        </h2>
        <p style={{
          color: '#FFFFFF',
          fontSize: '13px',
          marginBottom: '15px',
          marginLeft: '30px',
          whiteSpace: 'pre-line' // Ensures newline handling
        }}>
          With dedication, dedication to duty in mind,{'\n'}
          effort is made to execute responsibilities {'\n'}
          in the best possible way.
        </p>
        <button style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '5px',
          padding: '8px 20px',
          marginTop: '10px',
          alignItems: 'center',
          width: '80px',
          marginLeft: '30px',
          marginBottom: '30px',
          border: 'none',
          cursor: 'pointer'
        }}>
          <span style={{
            color: '#4A90E2',
            fontSize: '16px'
          }}>
            Create
          </span>
        </button>
      </div>

      {/* Main Image */}
      <img
        src="https://img.freepik.com/free-photo/day-office-travel-agency_23-2150769946.jpg"
        alt="Banner Main"
        style={{
          width: '300px',
          height: '200px',
          borderRadius: '50px'
        }}
      />
    </div>
    <div style={{ padding: '40px 0', textAlign: 'center' }}>
      {/* Section Title */}
      <h2 style={{
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#333',
        marginTop: '70px'
      }}>
        For Customers – Get Help When You Need It
      </h2>
      <p style={{
        textAlign: 'center',
        color: '#666',
        marginBottom: '20px',
        marginTop: '15px'
      }}>
        Exercitation dolore reprehenderit fugi
      </p>

      {/* Card Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        padding: '0 5px',
        marginLeft: '220px',
        marginTop: '20px'
      }}>
        {/* Card 1 */}
        <div style={{
          width: '24%', // Reduced width for each card
          backgroundColor: '#f5f5f5',
          borderRadius: '10px',
          padding: '10px',
          alignItems: 'flex-start',
          marginRight: '18px',
          textAlign: 'left'
        }}>
          <img
            src="https://media.istockphoto.com/id/1358911296/photo/businesspersons-having-a-meeting-in-an-office.jpg?s=612x612&w=0&k=20&c=UFkexkrxrYYx3Y-_HryVnhraANA5yrM3ieKANzDLr1w="
            alt="Card 1"
            style={{
              width: '90%',
              height: '130px',
              borderRadius: '10px',
              marginBottom: '10px'
            }}
          />
          <p style={{
            fontSize: '12px',
            color: '#6666ff',
            marginBottom: '5px'
          }}>
            Do consectetur
          </p>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '10px'
          }}>
            Register with Ease
          </h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // Moves "1 min read" to the right
            marginTop: '5px',
            marginBottom: '10px'
          }}>
            <p style={{ fontSize: '12px', color: '#999' }}>Dec 22, 2022</p>
            <p style={{
              fontSize: '12px',
              color: '#333',
              backgroundColor: '#f0f0f0',
              padding: '4px 8px',
              borderRadius: '5px'
            }}>
              1 min read
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div style={{
          width: '24%', // Reduced width for each card
          backgroundColor: '#f5f5f5',
          borderRadius: '10px',
          padding: '10px',
          alignItems: 'flex-start',
          marginRight: '18px',
          textAlign: 'left'
        }}>
          <img
            src="https://www.shutterstock.com/image-photo/busy-diverse-professional-business-people-260nw-2346440433.jpg"
            alt="Card 2"
            style={{
              width: '90%',
              height: '130px',
              borderRadius: '10px',
              marginBottom: '10px'
            }}
          />
          <p style={{
            fontSize: '12px',
            color: '#6666ff',
            marginBottom: '5px'
          }}>
            Consequat labore
          </p>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '10px'
          }}>
            Manage Your Schedule
          </h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // Moves "1 min read" to the right
            marginTop: '5px',
            marginBottom: '10px'
          }}>
            <p style={{ fontSize: '12px', color: '#999' }}>Dec 22, 2022</p>
            <p style={{
              fontSize: '12px',
              color: '#333',
              backgroundColor: '#f0f0f0',
              padding: '4px 8px',
              borderRadius: '5px'
            }}>
              1 min read
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div style={{
          width: '24%', // Reduced width for each card
          backgroundColor: '#f5f5f5',
          borderRadius: '10px',
          padding: '10px',
          alignItems: 'flex-start',
          textAlign: 'left'
        }}>
          <img
            src="https://www.shutterstock.com/image-photo/portrait-enthusiastic-hispanic-young-woman-260nw-2242410029.jpg"
            alt="Card 3"
            style={{
              width: '90%',
              height: '130px',
              borderRadius: '10px',
              marginBottom: '10px'
            }}
          />
          <p style={{
            fontSize: '12px',
            color: '#6666ff',
            marginBottom: '5px'
          }}>
            Do consectetur
          </p>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '10px'
          }}>
            Platform Fee
          </h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // Moves "1 min read" to the right
            marginTop: '5px',
            marginBottom: '10px'
          }}>
            <p style={{ fontSize: '12px', color: '#999' }}>Dec 22, 2022</p>
            <p style={{
              fontSize: '12px',
              color: '#333',
              backgroundColor: '#f0f0f0',
              padding: '4px 8px',
              borderRadius: '5px'
            }}>
              1 min read
            </p>
          </div>
        </div>
      </div>

      {/* See More Articles Button */}
      <button style={{
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#6666ff',
        borderRadius: '5px',
        color: '#fff',
        border: 'none',
        cursor: 'pointer'
      }}>
        See more articles
      </button>
    </div>
    <Footer />

    </div>

  );
}

export default Home;
