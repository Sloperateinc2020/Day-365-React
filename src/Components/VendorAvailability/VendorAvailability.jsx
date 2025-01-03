import React, { useState } from 'react';
import { format, addMonths, subMonths, addYears, subYears, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  calendarSection: {
    flex: '1',
    marginRight: '80px'
  },
  header: {
    fontSize: '30px',
    marginBottom: '24px',
    fontWeight: 'bold',
    color: '#000'
  },
  monthSelector: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 8px',
    border: '2px solid #000',
    marginBottom: '24px',
    width: '290px'  // Increased width to accommodate year
  },
  monthText: {
    fontSize: '24px',
    fontWeight: '600'
  },
  monthButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
    color: '#000',
    padding: '4px', // Adjust padding to reduce the gap
  },
  monthButtonPrevYear: {
    paddingRight: '0', // Remove the right padding from the previous year button
  },
  calendar: {
    width: '50px',
    borderCollapse: 'separate',
    borderSpacing: '4px',
  },
  dayHeader: {
    padding: '8px',
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: '700',
    color: '#000'
  },
  day: {
    padding: '8px',
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '4px',
    color: 'black'
  },
  selectedDay: {
    background: '#6366F1',
    color: 'white',
    borderRadius: '4px'
  },
  timeSection: {
    flex: '1'
  },
  timeGrid: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gap: '40px',
    marginBottom: '40px'
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'relative'
  },
  timeLabel: {
    fontSize: '20px',
    fontWeight: '500',
    marginBottom: '16px',
    color: '#000'
  },
  timeValue: {
    fontSize: '32px',
    fontWeight: '500',
    color: '#000',
    borderBottom: '2px solid #000',
    minWidth: '100px',
    textAlign: 'center',
    paddingBottom: '4px',
    cursor: 'pointer'
  },
  timeDropdown: {
    position: 'absolute',
    top: '100%',
    left: '0',
    width: '100px',
    maxHeight: '200px',
    overflowY: 'auto',
    background: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    zIndex: 1000
  },
  timeOption: {
    padding: '8px',
    cursor: 'pointer',
    textAlign: 'center',
    ':hover': {
      backgroundColor: '#f5f5f5'
    }
  },
  message: {
    fontSize: '20px',
    marginBottom: '24px',
    fontWeight: '400'
  },
  bookButton: {
    backgroundColor: '#6366F1',
    color: 'white',
    padding: '16px 10px',
    borderColor: 'black',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '200px',
    marginLeft: '60px',
  }
};

const VendorAvailability = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState({ hours: '00', minutes: '00',  });
  const [showHours, setShowHours] = useState(false);
  const [showMinutes, setShowMinutes] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const navigate = useNavigate();

  // Generate hours in 24-hour format
  const hours24 = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const getDaysInMonth = (date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end });
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextYear = () => {
    setCurrentDate(addYears(currentDate, 1));
  };

  const prevYear = () => {
    setCurrentDate(subYears(currentDate, 1));
  };

  const handleHourClick = (hour) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    setSelectedTime({ ...selectedTime, hours: hour, period });
    setShowHours(false);
  };

  const handleMinuteClick = (minute) => {
    setSelectedTime({ ...selectedTime, minutes: minute });
    setShowMinutes(false);
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
  };

  const days = getDaysInMonth(currentDate);

  const handleBookNow = () => {
    const bookingDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''; 
    const bookingTime = `${selectedTime.hours}:${selectedTime.minutes} ${selectedTime.period}`;
  
    navigate('/confirmbooking', {
      state: {
        date: bookingDate,
        time: bookingTime,
      }
    });
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.calendarSection}>
          <h2 style={styles.header}>Availability</h2>
          <div style={styles.monthSelector}>
            <button style={styles.monthButton} onClick={prevMonth}>◀</button>
            <span style={styles.monthText}>
              {format(currentDate, 'MMMM')} {format(currentDate, 'yyyy')}
            </span>
            <button style={styles.monthButton} onClick={nextMonth}>▶</button>
          </div>
          <table style={styles.calendar}>
            <thead>
              <tr>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <th key={index} style={styles.dayHeader}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => (
                <tr key={weekIndex}>
                  {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
                    <td
                      key={dayIndex}
                      style={styles.day}
                      onClick={() => handleDayClick(day)}
                    >
                      <div
                        style={selectedDate && selectedDate.getDate() === day.getDate() ? styles.selectedDay : {}}
                      >
                        {format(day, 'd')}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.timeSection}>
          <h2 style={styles.header}>Time Slots</h2>
          <div style={styles.timeGrid}>
            <div style={styles.timeContainer}>
              <div style={styles.timeLabel}>Time</div>
              <div 
                style={styles.timeValue} 
                onClick={() => setShowHours(!showHours)}
              >
                {selectedTime.hours} {selectedTime.period}
              </div>
              {showHours && (
                <div style={styles.timeDropdown}>
                  {hours24.map((hour) => (
                    <div
                      key={hour}
                      style={styles.timeOption}
                      onClick={() => handleHourClick(hour)}
                    >
                      {hour} {hour >= 12 ? 'PM' : 'AM'}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={styles.timeContainer}>
              <div style={styles.timeLabel}>Minutes</div>
              <div 
                style={styles.timeValue}
                onClick={() => setShowMinutes(!showMinutes)}
              >
                {selectedTime.minutes}
              </div>
              {showMinutes && (
                <div style={styles.timeDropdown}>
                  {minutes.map((minute) => (
                    <div
                      key={minute}
                      style={styles.timeOption}
                      onClick={() => handleMinuteClick(minute)}
                    >
                      {minute}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <p style={styles.message}>Select your time slots to book your service</p>
          <button style={styles.bookButton} onClick={handleBookNow}>BOOK NOW</button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default VendorAvailability;