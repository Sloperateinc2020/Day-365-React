import React, { useEffect, useState } from 'react';
import './Booking.css';
import config from '../../config'; // Adjust the import path as necessary
import Footer from '../Footer';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(config.BOOKING_API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBookings(data); // Set the bookings data from the API
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(booking =>
    booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.mobile.includes(searchTerm)
  );

  return (
    <>

      <div className="bookings-container">
        <h1 className="header">Booking Management</h1>
        <div className="filters">
          <input
            type="date"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
            className="date-filter"
          />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>

        <h2>Completed Bookings</h2>

        <div className="bookings-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Amount Paid</th>
                <th>Status</th>
                <th>Address</th>
                <th>Date</th>
                <th>Service Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.name}</td>
                  <td>{booking.mobile}</td>
                  <td>{booking.amountPaid}</td>
                  <td>
                    <span className={`status ${booking.status}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>{booking.address}</td>
                  <td>{booking.date}</td>
                  <td>{booking.serviceType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button className="prev-btn">← Previous</button>
          <span>Page 1 of 10</span>
          <button className="next-btn">Next →</button>
        </div>
      </div>

      <Footer /> {/* Footer also outside the main container */}
    </>
  );
};

export default Booking;
