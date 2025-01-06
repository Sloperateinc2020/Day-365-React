import React from 'react';
import { useLocation } from 'react-router-dom';

const SpecialOffers = () => {
  const location = useLocation();
  const offers = location.state?.data || [];

  return (
    <div>
      <h1>All Special Offers</h1>
      <ul>
        {offers.map((offer) => (
          <li key={offer.id}>{offer.offer}</li>
        ))}
      </ul>
    </div>
  );
};

export default SpecialOffers;
