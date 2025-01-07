import React, { useState, useEffect } from 'react';
import config from '../../config'; // Import the config file
import SearchBar from './SearchBar'; // Import the SearchBar component

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Index of the first visible service
  const servicesPerPage = 4; // Number of services to display at a time

  // Search filters
  const [serviceSearchValue, setServiceSearchValue] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [pincodeValue, setPincodeValue] = useState('');
  const [pincodeSuggestions, setPincodeSuggestions] = useState([]);
  const [showPincodeSuggestions, setShowPincodeSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(true); // To control the visibility of filters

  // Cities for a selected state
  const [availableCities, setAvailableCities] = useState([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false); // Manage city dropdown visibility

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    applyFilters(); // Run the filtering when any filter value changes
  }, [serviceSearchValue, stateValue, cityValue, pincodeValue, services]);

  useEffect(() => {
    // When state changes, filter cities (without auto selecting any city)
    if (stateValue) {
      const citiesInState = Array.from(new Set(services.filter(service => service.state === stateValue).map(service => service.city)));
      setAvailableCities(citiesInState);
    } else {
      setAvailableCities([]); // If no state is selected, reset the cities
      setCityValue(''); // Reset city selection if state is cleared
    }
  }, [stateValue, services]);

  const fetchServices = async () => {
    try {
      const response = await fetch(config.SERVICE_API_URL);
      const data = await response.json();
      if (data && Array.isArray(data.services)) {
        setServices(data.services);
        setFilteredServices(data.services); // Initialize filtered services
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    }
  };

  const applyFilters = () => {
    const filtered = services.filter((service) => {
      return (
        (serviceSearchValue
          ? service.service.toLowerCase().includes(serviceSearchValue.toLowerCase())
          : true) &&
        (stateValue ? service.state === stateValue : true) &&
        (cityValue ? service.city === cityValue : true) &&
        (pincodeValue ? service.pincode === pincodeValue : true)
      );
    });
    setFilteredServices(filtered);
    setCurrentIndex(0); // Reset to the first page
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      Math.max(prevIndex - servicesPerPage, 0)
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + servicesPerPage, filteredServices.length - servicesPerPage)
    );
  };

  const handlePincodeChange = (value) => {
    setPincodeValue(value);

    // If user starts typing, show suggestions and other filters
    if (value.length > 0) {
      setShowPincodeSuggestions(true);
      setShowFilters(true); // Show all filters
    } else {
      setShowPincodeSuggestions(false); // Hide suggestions when no input
      setShowFilters(true); // Show other filters again if pincode is cleared
    }

    // Filter pincode suggestions based on input
    const filteredSuggestions = services
      .map(service => service.pincode)
      .filter(pincode => pincode.startsWith(value));

    setPincodeSuggestions(filteredSuggestions);
  };

  const handlePincodeSelect = (pincode) => {
    // When a pincode is selected, hide the filters and only show the pincode filter
    setPincodeValue(pincode);
    setShowFilters(false); // Hide the other filters
    setShowPincodeSuggestions(false); // Hide pincode suggestions
  };

  const handlePincodeClear = () => {
    // When clearing pincode, show the filters again
    setPincodeValue('');
    setShowFilters(true); // Show all filters again
    setShowPincodeSuggestions(false); // Hide suggestions
  };

  const handleCitySelect = (city) => {
    setCityValue(city);  // Set the selected city
    setShowCityDropdown(false); // Hide the dropdown after city is selected
  };

  const handleSearchClick = () => {
    if (!stateValue && !cityValue && !pincodeValue) {
      // If no filter is selected, navigate to the services page
      window.location.href = '/services'; // Change the URL
    } else {
      // Apply filters if any filter is selected
      applyFilters(); // Call the applyFilters function here
    }
  };

  const displayedServices = filteredServices.slice(
    currentIndex,
    currentIndex + servicesPerPage
  );

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' ,marginLeft:"70px"}}>
        <span style={{ color: 'black' }}>Explore More </span>
        <span style={{ color: '#6666ff' }}>Services</span>
      </h2>
      <SearchBar
        serviceSearchValue={serviceSearchValue}
        handleServiceSearch={(e) => setServiceSearchValue(e.target.value)}
        stateValue={stateValue}
        handleStateChange={(e) => setStateValue(e.target.value)}
        cityValue={cityValue}
        handleCityChange={(e) => {
          setCityValue(e.target.value);  // Update city value
          setShowCityDropdown(true);     // Show dropdown when user interacts with city field
        }}
        pincodeValue={pincodeValue}
        filterPincodes={handlePincodeChange}
        handleSearch={handleSearchClick} // Trigger search and filter action
        allServices={services}
        showCitySuggestions={showCityDropdown} // Show city suggestions if dropdown is visible
        citySuggestions={availableCities} // Use availableCities for state-based cities
        handleCitySelect={handleCitySelect} // Allow city selection
        showPincodeSuggestions={showPincodeSuggestions}
        pincodeSuggestions={pincodeSuggestions}
        handlePincodeSelect={handlePincodeSelect} // Select pincode from suggestions
        handlePincodeClear={handlePincodeClear} // Clear pincode and show filters again
        showFilters={showFilters} // Pass the state to conditionally show filters
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '20px', marginLeft:"60px"}}>
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
            color: currentIndex === 0 ? '#ccc' : '#333',
            fontSize: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          &#8249;
        </button>

        <div style={{ display: 'flex', gap: '20px' }}>
          {displayedServices.length > 0 ? (
            displayedServices.map((service, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#f9f9f9',
                  borderRadius: '10px',
                  padding: '15px',
                  textAlign: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  width: '200px',
                }}
              >
                <img
                  src={service.imageUrl || 'https://via.placeholder.com/60'}
                  alt={service.service || 'Service'}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '30px',
                    marginBottom: '10px',
                  }}
                />
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#333',
                  }}
                >
                  {service.service || 'Unknown Service'}
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    color: '#666',
                  }}
                >
                  {service.availableServices || 'N/A'}
                </p>
              </div>
            ))
          ) : (
            <p style={{ fontStyle: 'italic', color: '#999' }}>No services available</p>
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex + servicesPerPage >= filteredServices.length}
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor:
              currentIndex + servicesPerPage >= filteredServices.length
                ? 'not-allowed'
                : 'pointer',
            color:
              currentIndex + servicesPerPage >= filteredServices.length ? '#ccc' : '#333',
            fontSize: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default ServiceList;
