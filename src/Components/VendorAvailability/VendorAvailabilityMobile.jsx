import React, { useState } from 'react';
import { Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VendorAvailabilityMobile = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timePeriodStart, setTimePeriodStart] = useState('AM'); // AM/PM for start time
  const [timePeriodEnd, setTimePeriodEnd] = useState('AM'); // AM/PM for end time
  const navigate = useNavigate(); // Hook for navigation

  const handleBookNow = () => {
    if (!selectedDate || !startTime || !endTime) {
      alert('Please select a date and time before booking.');
      return;
    }

    // Combine time and period for start and end times
    const formattedStartTime = `${startTime} ${timePeriodStart}`;
    const formattedEndTime = `${endTime} ${timePeriodEnd}`;

    // Redirect to ConfirmBooking page with selected date and time
    navigate('/confirmbooking', {
      state: { date: selectedDate, time: `${formattedStartTime} - ${formattedEndTime}` },
    });
  };

  return (
    <div style={{ maxWidth: '100%', width: '100%', marginBottom: '60px', padding: '16px', background: 'white' }}>
      {/* Profile Section */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop"
          alt="Raju Yadhav"
          style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '8px' }}
        />
        <h2 style={{ margin: '0', fontSize: '24px', fontWeight: '600' }}>Raju Yadhav</h2>
        <div style={{ color: '#666', fontSize: '14px', marginTop: '4px' }}>
          <MapPin size={14} /> Chilakaluripet
        </div>
        <div style={{ color: '#666', fontSize: '14px', marginTop: '4px' }}>
          4.8 (1,000+ trips) • Age 30
        </div>
      </div>

      {/* Rating Section */}
      <div className="rating-section">
        <div className="rating-header">
          <span className="rating-number">4.9</span>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Star key={index} size={16} fill="currentColor" />
            ))}
          </div>
          <span className="rating-count">1,000 reviews</span>
        </div>
        <div className="rating-bars">
          {[
            { stars: 5, percentage: 86 },
            { stars: 4, percentage: 10 },
            { stars: 3, percentage: 2 },
            { stars: 2, percentage: 1 },
            { stars: 1, percentage: 1 }
          ].map(({ stars, percentage }) => (
            <div key={stars} className="rating-bar">
              <span className="bar-label">{stars}</span>
              <div className="bar-container">
                <div className="bar-fill" style={{ width: `${percentage}%` }} />
              </div>
              <span className="bar-percentage">{percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', margin: '16px 0' }}>
        I'm a professional driver with over 1000 trips under my belt. I have a clean driving record and am rated 4.8 stars by my passengers.
      </p>

      {/* Calendar Section */}
      <div
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '16px',
          background: '#f9fafb',
          marginBottom: '24px',
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: '600', textAlign: 'center' }}>Select a Date</h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px',
            background: 'white',
            borderRadius: '8px',
          }}
        >
          <button style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <ChevronLeft size={18} />
          </button>
          <span style={{ fontWeight: '700' }}>October</span>
          <button style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <ChevronRight size={18} />
          </button>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '8px',
            marginTop: '12px',
          }}
        >
          {Array.from({ length: 31 }, (_, i) => (
            <div
              key={i + 1}
              onClick={() => setSelectedDate(i + 1)}
              style={{
                textAlign: 'center',
                padding: '8px',
                borderRadius: '50%',
                cursor: 'pointer',
                background: selectedDate === i + 1 ? '#4f46e5' : 'white',
                color: selectedDate === i + 1 ? 'white' : 'black',
                border: selectedDate === i + 1 ? 'none' : '1px solid #ccc',
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>      

{/* Time Slots Section */}
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', paddingTop: '10px' }}>Time Slots</h3>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '12px' }}>
          {/* Start Time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: '500' }}>Start Time:</label>
            <input
              type="text"
              placeholder="HH:MM"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{
                padding: '8px',
                textAlign: 'center',
                width: '70px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
            <select
              value={timePeriodStart}
              onChange={(e) => setTimePeriodStart(e.target.value)}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                cursor: 'pointer',
              }}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          {/* End Time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: '500' }}>End Time:</label>
            <input
              type="text"
              placeholder="HH:MM"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={{
                padding: '8px',
                textAlign: 'center',
                width: '70px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
            <select
              value={timePeriodEnd}
              onChange={(e) => setTimePeriodEnd(e.target.value)}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                cursor: 'pointer',
              }}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleBookNow}
          style={{
            width: '90%',
            padding: '20px',
            background: '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '400',
            cursor: 'pointer',
            marginTop: '15px',
          }}
        >
          BOOK NOW
        </button>
      </div>
    </div>
  );
};

export default VendorAvailabilityMobile;