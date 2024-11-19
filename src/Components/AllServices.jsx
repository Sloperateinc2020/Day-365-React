import React, { useState, useEffect } from "react";
import config from "../config"; // Import the config file for the API URL
import { Search } from 'lucide-react'; // Import Search icon from lucide-react
import { Calendar, Phone } from 'lucide-react'; // Import Calendar and Phone icons

const AllServices = () => {
  const [services, setServices] = useState([]); // State to hold the services
  const [originalServices, setOriginalServices] = useState([]); // Preserve the original data
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [locationQuery, setLocationQuery] = useState(""); // State for the location query
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(config.SERVICE_API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        console.log("API Data:", data); // Log the JSON data

        // Access the correct property based on the API structure
        if (data && Array.isArray(data.services)) {
          setServices(data.services); // Populate services state with data from the API
          setOriginalServices(data.services); // Save the original data for resets
        } else {
          setError("Services data is missing or malformed");
        }
      } catch (err) {
        console.error("Error:", err); // Log error details
        setError(err.message); // Set error message if something goes wrong
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchServices();
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  // Filter services based on search and location queries
  const handleFilter = () => {
    const filtered = originalServices.filter(
      (service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        service.location.toLowerCase().includes(locationQuery.toLowerCase())
    );
    setServices(filtered);
  };

  // Reset filters to show all services
  const resetFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setServices(originalServices);
  };

  // Update search query state
  const handleServiceSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  console.log("Services:", services); // Log services to see if they are being set correctly

  if (loading) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header Text with Search Icon */}
      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
        <Search size={20} style={{ marginRight: '10px' }} />
        <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#333" }}></h2>
      </div>

      {/* Search Bar - All fields side by side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Search Input */}
        <div style={{ position: "relative", flex: 1 }}>
          <Search 
            size={16} 
            style={{
              position: "absolute", 
              left: "10px", 
              top: "50%", 
              transform: "translateY(-50%)", 
              color: "#A0A0A0"
            }} 
          />
          <input
            type="text"
            value={searchQuery}
            onChange={handleServiceSearch}
            placeholder="Search your Services"
            style={{
              padding: '10px 10px 10px 30px', // Added padding to make space for the icon
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: "14px",
              width: "700px", // Adjust width if necessary
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
      width: "1000px", // Adjust width if necessary
      marginRight: "100px", // Remove or reduce margin-right to bring it closer
    }}
  />

{/* Filter Button */}
<button
  onClick={handleFilter}
  style={{
    padding: "8px 16px",
    backgroundColor: "#f3f4f6", // Same background color as the Location input
    color: "black", // Black text to match the Location input
    border: "1px solid #ddd", // Add border similar to Location input
    borderRadius: "4px",
    cursor: "pointer",
  }}
>
  Filter
</button>


        <button
          onClick={resetFilters}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f3f4f6",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* Services Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {services.length > 0 ? (
          services.map((service, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "1px",
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
                  color: "black", // Color for the text
                  padding: "2px 8px",
                  borderRadius: "9999px",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                <span style={{ color: "#FFD700", fontSize: "16px" }}>★</span> {service.rating}
              </div>

              {/* Profile Content */}
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
                    marginTop: "5px", // Reduced margin to move closer to the top
                    marginBottom: "1px",
                  }}
                >
                  {service.city}
                </p>

                {/* Service Name */}
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6666ff", // Light blue color
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
                    gap: "10px",
                    padding: "5px",
                    border: "1px solid black",
                    borderRadius: "4px",
                    width: "100%",
                    height: "55px",
                    marginBottom: "1px", // Reduced margin bottom
                  }}
                >
                  <button
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                      padding: "10px",
                      fontSize: "12px",
                      border: "none",
                      backgroundColor: "transparent",
                      color: "black", // Set icon and text color to black
                      cursor: "pointer",
                    }}
                  >
                    <Calendar size={16} color="black" /> {/* Black Calendar Icon */}
                    <span>Availability</span>
                  </button>

                  {/* Divider Column */}
                  <div
                    style={{
                      height: "50px",
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
                      color: "black", // Set icon and text color to black
                      cursor: "pointer",
                    }}
                  >
                    <Phone size={16} color="black" /> {/* Black Phone Icon */}
                    <span>Call now</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No services available</div>
        )}
      </div>
    </div>
  );
};

export default AllServices;
