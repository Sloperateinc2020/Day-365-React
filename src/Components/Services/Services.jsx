import React from 'react';

const Service = () => {
  const popularServices = Array(12).fill(null);
  const specialOffers = Array(4).fill(null);
  const topProviders = Array(6).fill(null);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Search Header */}
      <div style={{ 
        display: 'flex',
        alignItems: 'stretch',
        marginBottom: '24px',
        height: '36px',
        border: '1px solid #ccc',
        borderRadius: '2px',
        backgroundColor: '#fff',
        marginTop:"100px"
      }}>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          padding: '0 8px',
          borderRight: '1px solid #ccc'
        }}>
          <img 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'%3E%3C/path%3E%3C/svg%3E"
            style={{ width: '16px', height: '16px' }}
            alt=""
          />
        </div>
        <input 
          type="text" 
          placeholder="Search services" 
          style={{ 
            flex: '1',
            padding: '0 8px',
            border: 'none',
            outline: 'none',
            fontSize: '13px',
            borderRight: '1px solid #ccc'
          }}
        />
        <input 
          type="text" 
          placeholder="Location" 
          style={{ 
            width: '120px',
            padding: '0 8px',
            border: 'none',
            outline: 'none',
            fontSize: '13px',
            borderRight: '1px solid #ccc'
          }}
        />
        <div style={{
          position: 'relative',
          borderRight: '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          width: '80px'
        }}>
          <select style={{ 
            width: '100%',
            height: '100%',
            border: 'none',
            outline: 'none',
            fontSize: '13px',
            backgroundColor: 'transparent',
            appearance: 'none',
            padding: '0 24px 0 8px',
            cursor: 'pointer'
          }}>
            <option>Filter</option>
          </select>
          <img 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E"
            style={{ 
              width: '12px',
              height: '12px',
              position: 'absolute',
              right: '8px',
              pointerEvents: 'none'
            }}
            alt=""
          />
        </div>
        <button style={{ 
          backgroundColor: '#4F46E5',
          color: 'white',
          border: 'none',
          padding: '0 16px',
          fontSize: '13px',
          cursor: 'pointer',
          whiteSpace: 'nowrap'
        }}>
          Search
        </button>
      </div>

      {/* Rest of the component remains the same */}
      {/* Popular Services */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Popular services near you</h2>
          <button style={{ color: '#4F46E5', background: 'none', border: 'none', cursor: 'pointer' }}>See all</button>
        </div>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '16px'
        }}>
          {popularServices.map((_, index) => (
            <div key={`popular-${index}`} style={{ animation: 'pulse 2s infinite' }}>
              <div style={{ 
                backgroundColor: '#f1f5f9',
                borderRadius: '8px',
                height: '120px',
                marginBottom: '8px'
              }}></div>
              <div style={{ 
                backgroundColor: '#f1f5f9',
                height: '16px',
                width: '70%',
                borderRadius: '4px'
              }}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Special Offers</h2>
          <button style={{ color: '#4F46E5', background: 'none', border: 'none', cursor: 'pointer' }}>See all</button>
        </div>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          {specialOffers.map((_, index) => (
            <div key={`offer-${index}`} style={{ animation: 'pulse 2s infinite' }}>
              <div style={{ 
                backgroundColor: '#f1f5f9',
                borderRadius: '8px',
                height: '160px',
                marginBottom: '12px'
              }}></div>
              <div>
                <div style={{ 
                  backgroundColor: '#f1f5f9',
                  height: '16px',
                  width: '100%',
                  borderRadius: '4px',
                  marginBottom: '8px'
                }}></div>
                <div style={{ 
                  backgroundColor: '#f1f5f9',
                  height: '14px',
                  width: '60%',
                  borderRadius: '4px'
                }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Rated Providers */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Top rated providers</h2>
          <button style={{ color: '#4F46E5', background: 'none', border: 'none', cursor: 'pointer' }}>See all</button>
        </div>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '16px'
        }}>
          {topProviders.map((_, index) => (
            <div key={`provider-${index}`} style={{ animation: 'pulse 2s infinite' }}>
              <div style={{ 
                backgroundColor: '#f1f5f9',
                borderRadius: '8px',
                height: '90px',
                marginBottom: '8px'
              }}></div>
              <div style={{ 
                backgroundColor: '#f1f5f9',
                height: '16px',
                width: '75%',
                borderRadius: '4px',
                marginBottom: '4px'
              }}></div>
              <div style={{ 
                backgroundColor: '#f1f5f9',
                height: '16px',
                width: '50%',
                borderRadius: '4px'
              }}></div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
        `}
      </style>
    </div>
  );
};

export default Service;