import React, { useState, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import './Availability.css';
import Footer from '../Components/Footer';

const Availability = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('10:00 AM - 11:00 AM');
    const [location, setLocation] = useState('Chilakaluripet');
    const [locations, setLocations] = useState([]);
    const [availabilityEntries, setAvailabilityEntries] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    // Fetch locations from the Mock API
    useEffect(() => {
        fetch('https://mocki.io/v1/5fbe5a6d-8103-4ad7-9668-633e1960405d')
            .then((response) => response.json())
            .then((data) => {
                const serviceLocations = data.topServices.map(service => service.location);
                const uniqueLocations = [...new Set(serviceLocations)];
                setLocations(uniqueLocations);
            })
            .catch((error) => console.error('Error fetching locations:', error));
    }, []);

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleSave = () => {
        const newEntry = { date: startDate, time: selectedTime, location };
        if (isEditing) {
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
        setSelectedTime('10:00 AM - 11:00 AM');
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

    const generateCalendarDays = () => {
        const startDay = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        const days = [];
        for (let i = 0; i < startDay.getDay(); i++) {
            days.push(null);
        }
        while (startDay.getMonth() === startDate.getMonth()) {
            days.push(new Date(startDay));
            startDay.setDate(startDay.getDate() + 1);
        }
        return days;
    };

    const calendarDays = generateCalendarDays();

    const handleNextMonth = () => {
        const newDate = new Date(startDate);
        newDate.setMonth(startDate.getMonth() + 1);
        setStartDate(newDate);
    };

    const handlePreviousMonth = () => {
        const newDate = new Date(startDate);
        newDate.setMonth(startDate.getMonth() - 1);
        setStartDate(newDate);
    };

    const handleDayClick = (day) => {
        if (day) {
            setStartDate(day);
        }
    };

    return (
        <>
            <div className="availability-container">
                <div className="availability-calendar">
                    <h2>Manage your availability</h2>
                    <p>Choose the days and times you're available for appointments. You'll receive a notification when someone books an appointment.</p>

                    <div className="calendar">
                        <div className="calendar-header">
                            <button className="month-button" onClick={handlePreviousMonth}>&lt;</button>
                            <span className="month-year">
                                {startDate.toLocaleString('default', { month: 'long' })} {startDate.getFullYear()}
                            </span>
                            <button className="month-button" onClick={handleNextMonth}>&gt;</button>
                        </div>
                        <div className="calendar-day-header">
                            <div>Su</div>
                            <div>Mo</div>
                            <div>Tu</div>
                            <div>We</div>
                            <div>Th</div>
                            <div>Fr</div>
                            <div>Sa</div>
                        </div>
                        <div className="calendar-days">
                            {calendarDays.map((day, index) => (
                                <div 
                                    key={index} 
                                    className="calendar-day" 
                                    onClick={() => handleDayClick(day)}
                                    style={{ 
                                        cursor: 'pointer', 
                                        backgroundColor: day && day.toDateString() === startDate.toDateString() ? '#e0ebff' : 'transparent' 
                                    }}
                                >
                                    {day ? day.getDate() : ''}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="time-slots">
                        <h3>Time Slots</h3>
                        {['9:00 AM', '10:00 AM', '11:00 AM'].map((time) => (
                            <button
                                key={time}
                                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                                onClick={() => handleTimeSelect(time)}
                            >
                                {time}
                            </button>
                        ))}
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

                    <button className="save-button" onClick={handleSave}>Save</button>
                </div>

                <div className="availability-summary-container">
                    <div className="availability-summary">
                        <h3>Availability Entries</h3>
                        {availabilityEntries.map((entry, index) => (
                            <div key={index} className="availability-item">
                                <div className="availability-info">
                                    <div className="availability-date-time">
                                        <FaCalendarAlt className="calendar-icon" />
                                        <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
                                            {entry.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <span className="availability-location">
                                            <IoLocationSharp /> {entry.location}
                                        </span>
                                    </div>
                                    <p className="availability-time">
                                        {entry.time}
                                    </p>
                                </div>
                                <div className="availability-actions">
                                    <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer outside the main content container */}
            <Footer />
        </>
    );
};

export default Availability;
