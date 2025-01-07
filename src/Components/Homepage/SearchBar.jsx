import React from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({
  serviceSearchValue,
  handleServiceSearch,
  stateValue,
  handleStateChange,
  cityValue,
  handleCityChange,
  pincodeValue,
  filterPincodes,
  allServices,
  showCitySuggestions,
  citySuggestions,
  handleCitySelect,
  showPincodeSuggestions,
  pincodeSuggestions,
  handlePincodeSelect,
  applyFilters // This function will be passed as a prop
}) => {
  const navigate = useNavigate();  // Initialize useNavigate

  const handleSearchClick = () => {
    // Check if no filters (state, city, or pincode) are selected
    if (!stateValue && !cityValue && !pincodeValue) {
      navigate('/services');  // Redirect to the services page only if no filters are selected
    } else {
      // If filters are selected, apply filters but don't navigate
      if (applyFilters) {
        applyFilters();  // Apply filters if it's a valid function
      } else {
        console.error('applyFilters is not a function');
      }
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px',
      backgroundColor: 'white',
      borderRadius: '10px',
      marginTop: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      height: '50px'
    }}>
      <SearchInput 
        value={serviceSearchValue}
        onChange={handleServiceSearch}
      />

      <StateSelect 
        value={stateValue}
        onChange={handleStateChange}
        disabled={!!pincodeValue}
        allServices={allServices}
      />

      <CityInput 
        value={cityValue}
        onChange={handleCityChange}
        disabled={!!pincodeValue || !stateValue}
        showSuggestions={showCitySuggestions}
        suggestions={citySuggestions}
        onSelect={handleCitySelect}
      />

      <PincodeInput 
        value={pincodeValue}
        onChange={filterPincodes}
        disabled={!!stateValue || !!cityValue}
        showSuggestions={showPincodeSuggestions}
        suggestions={pincodeSuggestions}
        onSelect={handlePincodeSelect}
      />

      <SearchButton onClick={handleSearchClick} />  {/* Updated to use the handleSearchClick */}
    </div>
  );
};

// SearchInput Component
const SearchInput = ({ value, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
    <Search size={20} style={{ marginRight: '10px' }} />
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search for Services"
      style={{
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        flex: 1,
        marginRight: '10px',
        backgroundColor: '#f0f0f0'
      }}
    />
  </div>
);

// StateSelect Component
const StateSelect = ({ value, onChange, disabled, allServices }) => {
  const availableStates = Array.from(new Set(allServices.map(service => service.state)));
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={{
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        width: '150px',
        marginRight: '10px',
        backgroundColor: disabled ? '#f0f0f0' : 'white'
      }}
    >
      <option value="">Select State</option>
      {availableStates.map((state, index) => (
        <option key={index} value={state}>{state}</option>
      ))}
    </select>
  );
};

// CityInput Component
const CityInput = ({ value, onChange, disabled, showSuggestions, suggestions, onSelect }) => (
  <div style={{ position: 'relative' }}>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Enter City"
      disabled={disabled}
      style={{
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        width: '150px',
        marginRight: '10px',
        backgroundColor: disabled ? '#f0f0f0' : 'white'
      }}
    />
    {showSuggestions && (
      <SuggestionsList suggestions={suggestions} onSelect={onSelect} />
    )}
  </div>
);

// PincodeInput Component
const PincodeInput = ({ value, onChange, disabled, showSuggestions, suggestions, onSelect }) => (
  <div style={{ position: 'relative' }}>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)} // Ensure you capture value on typing
      placeholder="Pincode"
      disabled={disabled}
      style={{
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        width: '100px',
        marginRight: '10px',
        backgroundColor: disabled ? '#f0f0f0' : 'white'
      }}
    />
    {showSuggestions && (
      <SuggestionsList suggestions={suggestions} onSelect={onSelect} />
    )}
  </div>
);

// SuggestionsList Component
const SuggestionsList = ({ suggestions, onSelect }) => (
  <div style={{
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    maxHeight: '150px',
    overflowY: 'auto',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '5px',
    zIndex: 1000
  }}>
    {suggestions.map((item, index) => (
      <div
        key={index}
        onClick={() => onSelect(item)}
        style={{ padding: '10px', cursor: 'pointer' }}
      >
        {item}
      </div>
    ))}
  </div>
);

// SearchButton Component
const SearchButton = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: '#6666ff',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      cursor: 'pointer'
    }}
  >
    <Search size={16} />
    Search
  </button>
);

export default SearchBar;
