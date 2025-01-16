import React, { useState, useEffect } from "react";
import config from "../config";
import { Search, Calendar, Phone, Filter } from "lucide-react";
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile;
};

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [originalServices, setOriginalServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(config.SERVICE_API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
  
        if (data && Array.isArray(data.services)) {
          const persons = data.services.flatMap(service => 
            (service.persons || []).map(person => ({
              ...person,
              service: service.service,
              details: service.details,
              icon: service.icon,
              color: service.color,
            }))
          );
  
          setServices(persons);
          setOriginalServices(persons);
        } else {
          setError("Services data is missing or malformed");
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchServices();
  }, []);
  
  useEffect(() => {
    const filtered = originalServices.filter((person) => {
      const serviceName = person.service ? person.service.toLowerCase() : '';
      const personName = person.name ? person.name.toLowerCase() : '';
      const personCity = person.city ? person.city.toLowerCase() : '';
  
      return (
        serviceName.includes(searchQuery.toLowerCase()) &&
        personCity.includes(locationQuery.toLowerCase()) &&
        (personName.includes(filterQuery.toLowerCase()) || filterQuery === '')
      );
    });
  
    setServices(filtered);
  }, [searchQuery, locationQuery, filterQuery, originalServices]);

  const resetFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setFilterQuery("");
    setServices(originalServices);
  };

  const handleServiceSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterQuery(e.target.value);
  };

  const handleAvailabilityClick = (serviceId) => {
    navigate(`/vendoravailability`);
  };

  if (loading) return <div>Loading services...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div style={{ 
        padding: isMobile ? "10px" : "20px", 
        maxWidth: "1200px", 
        margin: "0 auto"
      }}>
        {/* Search Container */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
          width: "100%",
          marginTop: isMobile ? "" : "50px",

        }}>
          {/* Search Bar Container */}
          <div style={{
            display: "flex",
            gap: "8px",
            width: "100%"
          }}>
            {/* Search Input with Container */}
            <div style={{ 
              position: "relative", 
              flex: 1,
              display: "flex",
              border: "1px solid #ddd",
              borderRadius: "4px",
              overflow: "hidden",
              backgroundColor: "white"
            }}>
              <input
                type="text"
                value={searchQuery}
                onChange={handleServiceSearch}
                placeholder="Search"
                style={{
                  flex: 1,
                  padding: "8px 8px 8px 32px",
                  border: "none",
                  outline: "none",
                  fontSize: "14px",
                }}
              />
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#666",
                }}
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => {}}
              style={{
                padding: "8px",
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Filter size={16} color="#666" />
            </button>

            {/* Search Button */}
            <button
              onClick={resetFilters}
              style={{
                padding: "8px 16px",
                backgroundColor: "#4F46E5",
                color: "white",
                border: "none",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Search size={16} color="white" />
            </button>
          </div>

          {/* Selected Filters Text */}
          <div style={{
            fontSize: "12px",
            color: "#666"
          }}>
            Selected: "Driver" from "Dilsukhnagar"
          </div>
        </div>

        {/* Services Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(250px, 1fr))",
          gap: isMobile ? "10px" : "20px",
          marginTop: "20px",
        }}>
          {services.length > 0 ? (
            services.map((person, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                {/* Rating Badge */}
                <div style={{
                  position: "absolute",
                  top: "8px",
                  left: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  backgroundColor: "white",
                  padding: "2px 6px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}>
                  <span style={{ color: "#FFD700" }}>★</span>
                  <span style={{ fontSize: "12px" }}>{person.rating || "N/A"}</span>
                </div>

                {/* Content */}
                <div style={{
                  padding: isMobile ? "12px" : "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}>
                  <img
                    src={person.personimageUrl}
                    alt={person.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <h3 style={{
                    fontSize: isMobile ? "14px" : "16px",
                    fontWeight: "600",
                    margin: 0,
                  }}>
                    {person.name}
                  </h3>
                  <p style={{
                    fontSize: isMobile ? "12px" : "14px",
                    color: "#4F46E5",
                    margin: 0,
                  }}>
                    {/* {person.availableServices} */}
                  </p>
                  <div style={{
                    backgroundColor: "#f3f4f6",
                    padding: "4px 12px",
                    borderRadius: "16px",
                    fontSize: isMobile ? "11px" : "12px",
                  }}>
                    {person.service}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: "flex",
                  borderTop: "1px solid #ddd",
                  marginTop: "auto",
                }}>
                  <button
                    onClick={() => handleAvailabilityClick(person.id)}
                    style={{
                      flex: 1,
                      padding: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: isMobile ? "9px" : "14px",
                    }}
                  >
                    <Calendar size={16} />
                    <span>Availability</span>
                  </button>
                  <div style={{ width: "1px", backgroundColor: "#ddd" }} />
                  <button
                    style={{
                      flex: 1,
                      padding: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: isMobile ? "9px" : "14px",
                    }}
                  >
                    <Phone size={16} />
                    <span>Call now</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ 
              textAlign: "center", 
              gridColumn: "1 / -1",
              padding: "20px",
            }}>
              No services found
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllServices;