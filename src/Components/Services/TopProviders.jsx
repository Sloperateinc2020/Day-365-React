import React from 'react';
import { useLocation } from 'react-router-dom';

const TopProviders = () => {
  const location = useLocation();
  const providers = location.state?.data || [];

  return (
    <div>
      <h1>All Top Providers</h1>
      <ul>
        {providers.map((provider) => (
          <li key={provider.id}>{provider.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopProviders;
