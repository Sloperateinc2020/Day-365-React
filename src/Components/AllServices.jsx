import React, { useState, useEffect } from "react";
import config from "../config"; // Import the config file for the API URL
import { Search } from "lucide-react"; // Import Search icon from lucide-react
import { Calendar, Phone } from "lucide-react"; // Import Calendar and Phone icons
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Footer from './Footer';  

const AllServices = () => {
  const [services, setServices] = useState([]); // State to hold the services
  const [originalServices, setOriginalServices] = useState([]); // Preserve the original data
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [locationQuery, setLocationQuery] = useState(""); // State for the location query
  const [filterQuery, setFilterQuery] = useState(""); // State for the filter query (Category or any other filter)
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Initialize useNavigate for navigation

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
    navigate(`/availability/${serviceId}`); // Navigate to the availability page for the selected service
  };

  if (loading) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header Text with Search Icon */}
        <div style={{ margintop: "10px", display: "flex", alignItems: "center" }}>
          <Search size={20} style={{ marginRight: "10px" }} />
          <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#333" }}></h2>
        </div>

        {/* Search Bar - All fields side by side */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Search Input */}
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

          {/* Location Input */}
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

          {/* Filter Input with Custom Hamburger Menu Icon on Left */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", flex: 1 }}>
            {/* Hamburger Menu Icon */}
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
              {/* Line 1 - Wider */}
              <div
                style={{
                  width: "20px",
                  height: "3px",
                  backgroundColor: "#A0A0A0",
                  borderRadius: "2px",
                }}
              />
              {/* Line 2 - Narrower */}
              <div
                style={{
                  width: "15px",
                  height: "3px",
                  backgroundColor: "#A0A0A0",
                  borderRadius: "2px",
                }}
              />
              {/* Line 3 - Narrowest */}
              <div
                style={{
                  width: "10px",
                  height: "3px",
                  backgroundColor: "#A0A0A0",
                  borderRadius: "2px",
                }}
              />
            </div>

            {/* Filter Input */}
            <input
              type="text"
              placeholder="Filter"
              value={filterQuery}
              onChange={handleFilterChange}
              style={{
                padding: "10px 12px 10px 35px", // Extra padding on left to make space for hamburger icon
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px",
                width: "100%",
                border: "1px solid black",
                fontWeight: "bold",
              }}
            />

            {/* Filter Button on Right */}
            <button
              onClick={resetFilters} // Trigger the reset function when clicked
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
                marginLeft: "10px", // space between the input and button
              }}
            >
              <Search size={16} color="white" />
              Search
            </button>
          </div>
        </div>

        {/* Services Grid */}
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
                {/* Rating Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    color: "black",
                    padding: "2px 8px",
                    borderRadius: "9999px",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  {service.rating ? service.rating : "N/A"}★
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
                      onClick={() => handleAvailabilityClick(service.id)} // Navigate to availability page
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
