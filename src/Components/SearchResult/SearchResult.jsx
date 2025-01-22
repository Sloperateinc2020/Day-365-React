import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Importing useNavigate and useLocation
import config from "../../config"; // Adjust the path as needed
import { Search } from "lucide-react"; // Import Search icon from lucide-react
import { Calendar, Phone } from "lucide-react"; // Import Calendar and Phone icons
import Footer from "../Footer"; // Adjust the path accordingly

const SearchResults = () => {
  const [services, setServices] = useState([]); // State to hold the services
  const [originalServices, setOriginalServices] = useState([]); // Preserve the original data
  const [searchQuery, setSearchQuery] = useState(""); // Store the query input
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [locationQuery, setLocationQuery] = useState(""); // Add state for location query
  const [filterQuery, setFilterQuery] = useState(""); // Add state for filter query

  const location = useLocation(); // Hook to get current location (URL)
  const query = new URLSearchParams(location.search).get("q"); // Get the query parameter 'q' from URL
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Fetch services from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(config.SERVICE_API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        if (data && Array.isArray(data.services)) {
          // Flatten persons array with additional service details
          const persons = data.services.flatMap((service) =>
            (service.persons || []).map((person) => ({
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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchServices();
  }, []);
  

  // If query parameter 'q' exists, set the searchQuery to that value
  useEffect(() => {
    if (query) {
      setSearchQuery(query); // Set the query from the URL
    } else {
      // If no query in URL, show all services by default
      setSearchQuery("");
    }
  }, [query]);

  useEffect(() => {
    const filtered = originalServices.filter((person) => {
      const serviceName = person.service ? person.service.toLowerCase() : "";
      const personName = person.name ? person.name.toLowerCase() : "";
      const personCity = person.city ? person.city.toLowerCase() : "";
  
      return (
        serviceName.includes(searchQuery.toLowerCase()) &&
        personCity.includes(locationQuery.toLowerCase()) &&
        (personName.includes(filterQuery.toLowerCase()) || filterQuery === "")
      );
    });
  
    setServices(filtered);
  }, [searchQuery, locationQuery, filterQuery, originalServices]);
  

  // Handle input change and set the search query
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle location query change
  const handleLocationChange = (e) => {
    setLocationQuery(e.target.value); // Fix location query handler
  };

  // Handle filter query change
  const handleFilterChange = (e) => {
    setFilterQuery(e.target.value); // Fix filter query handler
  };

  // Reset the filters
  const resetFilters = () => {
    setSearchQuery(""); // Clear the search input
    setLocationQuery(""); // Clear the location input
    setFilterQuery(""); // Clear the filter input
    setServices(originalServices); // Reset services to original data
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
        <div style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
          <Search size={20} style={{ marginRight: "10px", marginBottom: "-20px" }} />
          <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#333" }}>
            {searchQuery ? `Search Results for "${searchQuery}"` : "Search for a Service"}
          </h2>
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
              value={searchQuery || ""}
              onChange={handleSearchChange}
              placeholder="Search your Services"
              style={{
                padding: "10px 10px 10px 30px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "14px",
                width: "720px",
                fontWeight: "bold",
              }}
            />
          </div>

          {/* Location Input */}
          <input
            type="text"
            placeholder="Location"
            value={locationQuery}
            onChange={handleLocationChange} // Use the new handler here
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
              onChange={handleFilterChange} // Use the new handler here
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
    marginTop: "40px",
  }}
>
  {services.length > 0 ? (
    services.map((person, index) => (
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
          <span style={{ color: "#FFD700", fontSize: "20px" }}>☆</span> {person.rating || "N/A"}
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
            src={person.personimageUrl}
            alt={person.name}
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
            {person.name}
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "#4F46E5",
              marginBottom: "1px",
            }}
          >
            {person.availableServices}
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
            {person.city}
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
            {person.service}
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
            {/* Availability Button */}
            <button
              onClick={() => navigate(`/vendoravailability/${person.id}`)}
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

            {/* Divider */}
            <div
              style={{
                height: "45px",
                backgroundColor: "#e5e7eb",
                border: "1px solid black",
              }}
            />

            {/* Call Now Button */}
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

export default SearchResults;
