import React from 'react';
import { useLocation } from 'react-router-dom';

const PopularServices = () => {
  const location = useLocation();
  const services = location.state?.data || [];

  if (!services.length) {
    return <h1>No services available.</h1>;
  }

  return (
    <div>
      <h1>Popular Services</h1>
      <ul>
        {services.map((service) => (
          <li key={service.id}>{service.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopularServices;
