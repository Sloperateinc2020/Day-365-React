import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VendorAvailability.css';
import { Star, MapPin, Check, ChevronLeft, ChevronRight } from 'lucide-react';

const VendorAvailability = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    // Add logic to handle selected date and time if needed
    navigate('/confirmbooking');
  };

  return (
    <div className="vendor-profile">
      {/* Profile Section */}
      <div className="profile-section">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop"
          alt="Raju Yadhav"
          className="profile-image"
        />
        <div className="profile-info">
          <h2>Raju Yadhav</h2>
          <div className="profile-location">
            <MapPin size={14} />
            <span>Chilakaluripet</span>
          </div>
          <div className="profile-stats">
            4.8 (1,000+ trips) • Age 30
          </div>
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
      <p className="description">
        I'm a professional driver with over 1000 trips under my belt. I have a clean driving record and am rated 4.8 stars by my passengers. I can help you move, deliver items, or serve as your road destination.
      </p>

      {/* Verification Section */}
      <div className="verification-section">
        <h3 className="section-title">Verified</h3>
        <div className="verification-items">
          <div className="verification-item">
            <Check size={14} className="verification-icon" />
            <span>Identity</span>
          </div>
          <div className="verification-item">
            <Check size={14} className="verification-icon" />
            <span>Driver's license</span>
          </div>
          <div className="verification-item">
            <Check size={14} className="verification-icon" />
            <span>Vehicle</span>
          </div>
        </div>
      </div>

      {/* Booking Grid - Calendar and Time Slots Side by Side */}
      <div className="booking-grid">
        {/* Availability Section */}
        <div className="availability-section">
          <h3 className="section-title centered-title">Availability</h3>
          <div className="calendar">
            <div className="calendar-header">
              <button className="calendar-nav">
                <ChevronLeft size={20} />
              </button>
              <span className="calendar-month">October</span>
              <button className="calendar-nav">
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="calendar-grid">
              <div className="weekdays">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
              </div>
              <div className="days">
                {Array.from({ length: 31 }, (_, i) => (
                  <div
                    key={i + 1}
                    className={`day ${i + 1 === 15 ? 'selected' : ''}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Time Slots Section */}
        <div className="time-slots-section">
          <h3 className="section-title centered-title">Time Slots</h3>
          <div className="time-inputs">
            {/* Start Time */}
            <div className="time-input">
              <label>Start Time</label>
              <div className="time-input-group">
                <input type="text" placeholder="HH:MM" />
                <select>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            {/* End Time */}
            <div className="time-input">
              <label>End Time</label>
              <div className="time-input-group">
                <input type="text" placeholder="HH:MM" />
                <select>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>
          <p className="time-instruction">
            Select your time slots to book your service
          </p>
          <button className="book-button" onClick={handleBookNow}>
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorAvailability;