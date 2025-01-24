import React, { useState, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import './Availability.css';
import Footer from '../Components/Footer';

const Availability = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [startDate, setStartDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('10:00 AM');
    const [location, setLocation] = useState('Chilakaluripet');
    const [locations, setLocations] = useState([]);
    const [availabilityEntries, setAvailabilityEntries] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const timeSlots = [
        "10:00 AM",
        "11:30 AM",
        "12:00 PM",
        "05:00 PM",
        "10:00 PM",
    ];

    const days = ["S", "M", "T", "W", "T", "F", "S"];

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        
        // Fetch locations
        fetch('https://mocki.io/v1/5fbe5a6d-8103-4ad7-9668-633e1960405d')
            .then((response) => response.json())
            .then((data) => {
                const serviceLocations = data.topServices.map(service => service.location);
                const uniqueLocations = [...new Set(serviceLocations)];
                setLocations(uniqueLocations);
            })
            .catch((error) => console.error('Error fetching locations:', error));

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleSave = () => {
        const newEntry = { date: startDate, time: selectedTime, location };
        if (isEditing && editIndex !== null) {
            const updatedEntries = [...availabilityEntries];
            updatedEntries[editIndex] = newEntry;
            setAvailabilityEntries(updatedEntries);
            setIsEditing(false);
            setEditIndex(null);
        } else {
            setAvailabilityEntries([...availabilityEntries, newEntry]);
        }
        resetForm();
    };

    const resetForm = () => {
        setStartDate(new Date());
        setSelectedTime('10:00 AM');
        setLocation('Chilakaluripet');
    };

    const handleEdit = (index) => {
        const entryToEdit = availabilityEntries[index];
        setStartDate(entryToEdit.date);
        setSelectedTime(entryToEdit.time);
        setLocation(entryToEdit.location);
        setIsEditing(true);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedEntries = availabilityEntries.filter((_, i) => i !== index);
        setAvailabilityEntries(updatedEntries);
    };

// Mobile version
if (isMobile) {
    const handleMonthChange = (direction) => {
        const currentMonth = startDate.getMonth();
        const currentYear = startDate.getFullYear();

        let newMonth = currentMonth + direction;
        let newYear = currentYear;

        if (newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear += 1;
        }

        setStartDate(new Date(newYear, newMonth, startDate.getDate()));
    };

    return (
        <div style={{ padding: "16px", fontFamily: "Arial, sans-serif" }}>
            {/* Header */}
            <header style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                <button
                    style={{
                        background: "none",
                        border: "none",
                        fontSize: "20px",
                        cursor: "pointer",
                    }}
                >
                </button>
               
            </header>
            
            <h2 style={{ marginTop: "-20px" }}>Manage your availability</h2>


                  

            {/* Month and Year Navigation */}
  <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px", // Adds a small gap between the elements
    marginBottom: "16px",
    
  }}
>
  {/* Previous Button */}
  <button
    onClick={() => handleMonthChange(-1)}
    style={{
      background: "none",
      border: "none",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: "bold",
      color: "black",
      marginTop: "10px",
      marginRight:'100px'

    }}
  >
    {"<"}
  </button>

  {/* Month and Year */}
  <h3
    style={{
      marginTop: "10px",
      fontSize: "16px",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      marginRight:'100px'
    }}
  >
    {startDate.toLocaleString("default", { month: "long" })} {startDate.getFullYear()}
  </h3>

  {/* Next Button */}
  <button
    onClick={() => handleMonthChange(1)}
    style={{
      background: "none",
      border: "none",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: "bold",
      color: "black",
      marginTop: "10px",

    }}
  >
    {">"}
  </button>
</div>
            {/* Calendar Section */}
            <div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(7, 1fr)",
                        gap: "8px",
                        marginBottom: "8px",
                    }}
                >
                    {days.map((day, index) => (
                        <div
                            key={index}
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "#555",
                                fontSize: "14px",
                            }}
                        >
                            {day}
                        </div>
                    ))}
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(7, 1fr)",
                        gap: "8px",
                    }}
                >
                    {Array.from(
                        { length: new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate() },
                        (_, i) => i + 1
                    ).map((date) => (
                        <div
                            key={date}
                            onClick={() => {
                                const newDate = new Date(startDate.getFullYear(), startDate.getMonth(), date);
                                setStartDate(newDate);
                            }}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "40px",
                                borderRadius: "8px",
                                backgroundColor: startDate.getDate() === date ? "#4e6ef2" : "#fff",
                                color: startDate.getDate() === date ? "#fff" : "#555",
                                fontWeight: "bold",
                                fontSize: "14px",
                                cursor: "pointer",
                            }}
                        >
                            {date}
                        </div>
                    ))}
                </div>
            </div>

            {/* Time Slots Section */}
            <div>
                <h3 style={{ fontSize: "16px", margin: "16px 0 8px" }}>Available time slots</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {timeSlots.map((slot) => (
                        <button
                            key={slot}
                            onClick={() => handleTimeSelect(slot)}
                            style={{
                                padding: "10px 16px",
                                border: "none",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                backgroundColor: selectedTime === slot ? "#000" : "#eaeaea",
                                color: selectedTime === slot ? "#fff" : "#333",
                            }}
                        >
                            {slot}
                        </button>
                    ))}
                </div>
            </div>

            {/* Location Section */}
            <div className="location-section">
                <h3>Location</h3>
                <div className="locations">
                    {locations.map((loc) => (
                        <button
                            key={loc}
                            className={`location ${location === loc ? "selected" : ""}`}
                            onClick={() => setLocation(loc)}
                        >
                            {loc}
                        </button>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Add location preference"
                    className="location-input"
                    onChange={handleLocationChange}
                    value={location}
                />
            </div>

            {/* Save Button */}
            <button
                onClick={handleSave}
                style={{
                    display: "block",
                    width: "100%",
                    marginTop: "24px",
                    padding: "16px",
                    backgroundColor: "#4e6ef2",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                }}
            >
                {isEditing ? "Update Availability" : "Save Availability"}
            </button>

            {/* Availability List */}
            <div style={{ marginTop: "24px" }}>
                {availabilityEntries.map((entry, index) => (
                    <div
                        key={index}
                        style={{
                            padding: "16px",
                            backgroundColor: "#f5f5f5",
                            borderRadius: "8px",
                            marginBottom: "12px",
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <p style={{ margin: "0", fontWeight: "bold" }}>{entry.date.toLocaleDateString()}</p>
                                <p style={{ margin: "4px 0", color: "#666" }}>{entry.time}</p>
                                <p style={{ margin: "0", color: "#666" }}>{entry.location}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleEdit(index)}
                                    style={{
                                        padding: "8px",
                                        marginRight: "8px",
                                        border: "none",
                                        borderRadius: "4px",
                                        backgroundColor: "#4e6ef2",
                                        color: "#fff",
                                        cursor: "pointer",
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(index)}
                                    style={{
                                        padding: "8px",
                                        border: "none",
                                        borderRadius: "4px",
                                        backgroundColor: "#ff4444",
                                        color: "#fff",
                                        cursor: "pointer",
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


    // Desktop version
    return (
        <>
            <div className="availability-container">
                <div className="availability-calendar">
                    <h2>Manage your availability</h2>
                    <p>Choose the days and times you're available for appointments. You'll receive a notification when someone books an appointment.</p>

                    <div className="calendar">
                        <div className="calendar-header">
                            <button 
                                className="month-button" 
                                onClick={() => {
                                    const newDate = new Date(startDate);
                                    newDate.setMonth(startDate.getMonth() - 1);
                                    setStartDate(newDate);
                                }}
                            >
                                &lt;
                            </button>
                            <span className="month-year">
                                {startDate.toLocaleString('default', { month: 'long' })} {startDate.getFullYear()}
                            </span>
                            <button 
                                className="month-button"
                                onClick={() => {
                                    const newDate = new Date(startDate);
                                    newDate.setMonth(startDate.getMonth() + 1);
                                    setStartDate(newDate);
                                }}
                            >
                                &gt;
                            </button>
                        </div>
                        <div className="calendar-day-header">
                            {days.map((day, index) => (
                                <div key={index}>{day}</div>
                            ))}
                        </div>
                        <div className="calendar-days">
                            {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                                <div
                                    key={date}
                                    className={`calendar-day ${startDate.getDate() === date ? 'selected' : ''}`}
                                    onClick={() => {
                                        const newDate = new Date(startDate);
                                        newDate.setDate(date);
                                        setStartDate(newDate);
                                    }}
                                >
                                    {date}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="time-slots">
                        <h3>Time Slots</h3>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                            {timeSlots.map((time) => (
                                <button
                                    key={time}
                                    className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                                    onClick={() => handleTimeSelect(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="location-section">
                        <h3>Location</h3>
                        <div className="locations">
                            {locations.map((loc) => (
                                <button
                                    key={loc}
                                    className={`location ${location === loc ? 'selected' : ''}`}
                                    onClick={() => setLocation(loc)}
                                >
                                    {loc}
                                </button>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Add location preference"
                            className="location-input"
                            onChange={handleLocationChange}
                            value={location}
                        />
                    </div>

                    <button className="save-button" onClick={handleSave}>
                        {isEditing ? 'Update Availability' : 'Save Availability'}
                    </button>
                </div>

                <div className="availability-summary-container">
                    <div className="availability-summary">
                        <h3>Availability Entries</h3>
                        {availabilityEntries.map((entry, index) => (
                            <div key={index} className="availability-item">
                                <div className="availability-info">
                                    <div className="availability-date-time">
                                        <FaCalendarAlt className="calendar-icon" />
                                        <span>
                                            {entry.date.toLocaleDateString('en-US', { 
                                                month: 'long', 
                                                day: 'numeric', 
                                                year: 'numeric' 
                                            })}
                                        </span>
                                        <span className="availability-location">
                                            <IoLocationSharp /> {entry.location}
                                        </span>
                                    </div>
                                    <p className="availability-time">{entry.time}</p>
                                </div>
                                <div className="availability-actions">
                                    <button className="edit-button" onClick={() => handleEdit(index)}>
                                        Edit
                                    </button>
                                    <button className="delete-button" onClick={() => handleDelete(index)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Availability;
