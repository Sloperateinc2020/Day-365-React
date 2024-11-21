import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Use the useLocation hook to get URL parameters
import config from '../../config'; // Adjust the path as needed

const SearchResults = () => {
  const [services, setServices] = useState([]);
  const location = useLocation();  // Get the current location (URL) object
  const query = new URLSearchParams(location.search).get('q');  // Get the query parameter 'q'

  // Fetch services based on the search query
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`${config.POPULARSERVICESNEARYOU_API_URL}?search=${query}`);
        const data = await response.json();
        setServices(data.popularServicesNearYou); // Assuming the data structure matches
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchSearchResults();  // Fetch search results when the query parameter is available
    }
  }, [query]);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Search Results for "{query}"</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
        {services.length ? (
          services.map((service) => (
            <div key={service.id}>
              <div
                style={{
                  backgroundImage: `url(${service.image})`,
                  backgroundSize: 'cover',
                  borderRadius: '8px',
                  height: '120px',
                  marginBottom: '8px',
                }}
              ></div>
              <div
                style={{
                  height: '16px',
                  width: '70%',
                  borderRadius: '4px',
                  textAlign: 'center',
                }}
              >
                {service.name}
              </div>
            </div>
          ))
        ) : (
          <div>No services found for "{query}"</div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
