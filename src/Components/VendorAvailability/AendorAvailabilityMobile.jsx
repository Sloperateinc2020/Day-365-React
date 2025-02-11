import React from 'react';
import { Star, MapPin, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import './VendorAvailabilityMobile.css';

const VendorAvailabilityMobile = () => {
  return (
    <div className="vendor-profile-mobile">
      {/* Profile Section */}
      <div className="profile-section-mobile">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop"
          alt="Raju Yadhav"
          className="profile-image-mobile"
        />
        <div className="profile-info-mobile">
          <h2>Raju Yadhav</h2>
          <div className="profile-location-mobile">
            <MapPin size={14} />
            <span>Chilakaluripet</span>
          </div>
          <div className="profile-stats-mobile">
            4.8 (1,000+ trips) • Age 30
          </div>
        </div>
      </div>

      {/* Rating Section */}
      <div className="rating-section-mobile">
        <div className="rating-header-mobile">
          <span className="rating-number-mobile">4.9</span>
          <div className="rating-stars-mobile">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Star key={index} size={16} fill="currentColor" />
            ))}
          </div>
          <span className="rating-count-mobile">1,000 reviews</span>
        </div>
        <div className="rating-bars-mobile">
          {[
            { stars: 5, percentage: 86 },
            { stars: 4, percentage: 10 },
            { stars: 3, percentage: 2 },
            { stars: 2, percentage: 1 },
            { stars: 1, percentage: 1 }
          ].map(({ stars, percentage }) => (
            <div key={stars} className="rating-bar-mobile">
              <span className="bar-label-mobile">{stars}</span>
              <div className="bar-container-mobile">
                <div className="bar-fill-mobile" style={{ width: `${percentage}%` }} />
              </div>
              <span className="bar-percentage-mobile">{percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="description-mobile">
        I'm a professional driver with over 1000 trips under my belt. I have a clean driving record and am rated 4.8 stars by my passengers. I can help you move, deliver items, or serve as your road destination.
      </p>

      {/* Verification Section */}
      <div className="verification-section-mobile">
        <h3 className="section-title-mobile">Verified</h3>
        <div className="verification-items-mobile">
          <div className="verification-item-mobile">
            <Check size={14} className="verification-icon-mobile" />
            <span>Identity</span>
          </div>
          <div className="verification-item-mobile">
            <Check size={14} className="verification-icon-mobile" />
            <span>Driver's license</span>
          </div>
          <div className="verification-item-mobile">
            <Check size={14} className="verification-icon-mobile" />
            <span>Vehicle</span>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="calendar-section-mobile">
        <h3 className="section-title-mobile centered-title">Select Date & Time</h3>
        <div className="calendar-mobile">
          <div className="calendar-header-mobile">
            <button className="calendar-nav-mobile">
              <ChevronLeft size={20} />
            </button>
            <span className="calendar-month-mobile">October</span>
            <button className="calendar-nav-mobile">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="calendar-grid-mobile">
            <div className="weekdays-mobile">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="days-mobile">
              {Array.from({ length: 31 }, (_, i) => (
                <div
                  key={i + 1}
                  className={`day-mobile ${i + 1 === 15 ? 'selected' : ''}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Time Slots Section */}
      <div className="time-slots-section-mobile">
        <div className="time-inputs-mobile">
          <div className="time-input-mobile">
            <label>Start Time</label>
            <div className="time-input-group-mobile">
              <input type="text" placeholder="HH:MM" />
              <select>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <div className="time-input-mobile">
            <label>End Time</label>
            <div className="time-input-group-mobile">
              <input type="text" placeholder="HH:MM" />
              <select>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>
        <p className="time-instruction-mobile">
          Select your time slots to book your service
        </p>
      </div>

      {/* Book Button */}
      <button className="book-button-mobile">
        BOOK NOW
      </button>
    </div>
  );
};

export default VendorAvailabilityMobile;