import React, { useState, useEffect } from "react";
import config from "../config";
import { Search, Calendar, Phone } from "lucide-react";
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [originalServices, setOriginalServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(config.SERVICE_API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();

        if (data && Array.isArray(data.services)) {
          setServices(data.services);
          setOriginalServices(data.services);
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
    const filtered = originalServices.filter((service) => {
      const serviceName = service.service ? service.service.toLowerCase() : '';
      const serviceLocation = service.city ? service.city.toLowerCase() : '';
      const serviceCategory = service.category ? service.category.toLowerCase() : '';

      return (
        serviceName.includes(searchQuery.toLowerCase()) &&
        serviceLocation.includes(locationQuery.toLowerCase()) &&
        (serviceCategory.includes(filterQuery.toLowerCase()) || filterQuery === '')
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

  const StarIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FFD700"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );

  if (loading) return <div>Loading services...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
          <Search size={20} style={{ marginRight: "10px" }} />
          <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#333" }}></h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#A0A0A0",
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={handleServiceSearch}
              placeholder="Search your Services"
              style={{
                padding: "10px 10px 10px 30px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "14px",
                width: "720px",
                border: "1px solid black",
                fontWeight: "bold",
              }}
            />
          </div>

          <input
            type="text"
            placeholder="Location"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            style={{
              padding: "10px 12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
              width: "200px",
              border: "1px solid black",
              fontWeight: "bold",
            }}
          />

          <div style={{ position: "relative", display: "flex", alignItems: "center", flex: 1 }}>
            <div
              style={{
                position: "absolute",
                left: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "18px",
                width: "18px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "3px",
                  backgroundColor: "#A0A0A0",
                  borderRadius: "2px",
                }}
              />
              <div
                style={{
                  width: "15px",
                  height: "3px",
                  backgroundColor: "#A0A0A0",
                  borderRadius: "2px",
                }}
              />
              <div
                style={{
                  width: "10px",
                  height: "3px",
                  backgroundColor: "#A0A0A0",
                  borderRadius: "2px",
                }}
              />
            </div>

            <input
              type="text"
              placeholder="Filter"
              value={filterQuery}
              onChange={handleFilterChange}
              style={{
                padding: "10px 12px 10px 35px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px",
                width: "100%",
                border: "1px solid black",
                fontWeight: "bold",
              }}
            />

            <button
              onClick={resetFilters}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                padding: "10px 10px",
                backgroundColor: "#4F46E5",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                marginLeft: "10px",
              }}
            >
              <Search size={16} color="white" />
              Search
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "80px",
          }}
        >
          {services.length > 0 ? (
            services.map((service, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  borderRadius: "1px",
                  padding: "0px",
                  border: "1px solid black",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    padding: "2px 8px",
                    borderRadius: "9999px",
                    fontSize: "12px",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <StarIcon />
                  <span style={{ color: "black" }}>{service.rating || "N/A"}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={service.personimageUrl}
                    alt={service.name}
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginBottom: "5px",
                    }}
                  />
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      marginBottom: "4px",
                    }}
                  >
                    {service.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#4F46E5",
                      marginBottom: "1px",
                    }}
                  >
                    {service.profession}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "black",
                      fontWeight: "bold",
                      marginTop: "5px",
                      marginBottom: "1px",
                    }}
                  >
                    {service.city}
                  </p>

                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6666ff",
                      fontWeight: "italic",
                      padding: "10px 10px",
                      border: "1px solid #374151",
                      borderRadius: "40px",
                      display: "inline-block",
                      width: "150px",
                      marginBottom: "10px",
                    }}
                  >
                    {service.service}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "0px",
                      padding: "0px",
                      border: "1px solid black",
                      borderRadius: "4px",
                      width: "100%",
                      height: "45px",
                      marginBottom: "1px",
                    }}
                  >
                    <button
                      onClick={() => handleAvailabilityClick(service.id)}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px",
                        padding: "5px",
                        fontSize: "12px",
                        border: "none",
                        backgroundColor: "transparent",
                        color: "black",
                        cursor: "pointer",
                      }}
                    >
                      <Calendar size={16} color="black" />
                      <span>Availability</span>
                    </button>

                    <div
                      style={{
                        height: "45px",
                        backgroundColor: "#e5e7eb",
                        border: "1px solid black",
                      }}
                    />

                    <button
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px",
                        padding: "5px",
                        fontSize: "12px",
                        border: "none",
                        backgroundColor: "transparent",
                        color: "black",
                        cursor: "pointer",
                      }}
                    >
                      <Phone size={16} color="black" />
                      <span>Call now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No services found</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllServices;