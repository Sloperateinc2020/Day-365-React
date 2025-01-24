import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';

const VendorAvailability = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState({ hours: '00', minutes: '00' });
  const [showHours, setShowHours] = useState(false);
  const [showMinutes, setShowMinutes] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mobileStyles = {
    outerContainer: {
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
      
    },
    sectionsWrapper: {
      display: 'flex',
      gap: '20px',
      marginBottom: '20px',
      // marginTop: isMobile ? '100%' : '80%',

    },
    calendarSection: {
      flex: '1',
      minWidth: '180px'
    },
    header: {
      fontSize: '16px',
      marginBottom: '10px',
      fontWeight: '600',
    },
    monthSelector: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '15px',
      border: '1px solid #ddd',
      padding: '8px',
      backgroundColor: '#fff'
    },
    calendar: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '20px',
      backgroundColor: '#fff',
      border: '1px solid #ddd'
    },
    dayHeader: {
      padding: '8px',
      fontSize: '12px',
      fontWeight: '500',
      textAlign: 'center',
      borderBottom: '1px solid #ddd'
      
    },
    day: {
      padding: '8px',
      textAlign: 'center',
      fontSize: '12px',
      cursor: 'pointer'
    },
    timeSection: {
      flex: '1',
      minWidth: '140px'
    },
    timeHeader: {
      fontSize: '16px',
      marginBottom: '15px'
    },
    timeGrid: {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      gap: '40px',
      marginBottom: '40px',
      marginLeft:"10px"
    },
    timeContainer: {
      position: 'relative'
    },
    timeSelect: {
      width: '100%',
      padding: '8px',
      fontSize: '14px',
      borderBottom: '1px solid #000',
      backgroundColor: '#fff',
      textAlign: 'center',
      cursor: 'pointer'
    },
    dropdownList: {
      position: 'absolute',
      top: '100%',
      left: 0,
      width: '100%',
      maxHeight: '200px',
      overflowY: 'auto',
      backgroundColor: '#fff',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      zIndex: 1000,
      border: '1px solid #ddd'
    },
    dropdownItem: {
      padding: '8px',
      borderBottom: '1px solid #eee',
      cursor: 'pointer',
      textAlign: 'center'
    },
    message: {
      fontSize: '14px',
      marginBottom: '15px',
      textAlign: 'center',
      color: '#666'
    },
    bookButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#FFD700',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer'
    },
    timeLabel: {
      fontSize: '14px',
      marginBottom: '8px'
    }
  };

  const desktopStyles = {
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
      fontWeight: 'bold'
    },
    monthSelector: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px',
      border: '2px solid #000',
      marginBottom: '24px',
      width: '290px'
    },
    calendar: {
      width: '350px',
      borderCollapse: 'separate',
      borderSpacing: '4px'
    },
    dayHeader: {
      padding: '8px',
      fontSize: '20px',
      fontWeight: '700'
    },
    day: {
      padding: '8px',
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: 'bold',
      cursor: 'pointer'
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
      position: 'relative'
    },
    timeLabel: {
      fontSize: '20px',
      marginBottom: '16px'
    },
    timeValue: {
      fontSize: '32px',
      fontWeight: '500',
      borderBottom: '2px solid #000',
      minWidth: '100px',
      textAlign: 'center',
      paddingBottom: '4px',
      cursor: 'pointer'
    },
    message: {
      fontSize: '20px',
      marginBottom: '24px'
    },
    bookButton: {
      backgroundColor: '#6366F1',
      color: 'white',
      padding: '16px 10px',
      borderColor: 'black',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderRadius: '4px',
      fontSize: '15px',
      fontWeight: '600',
      width: '200px',
      marginLeft: '60px'
    }
  };

  const styles = isMobile ? mobileStyles : desktopStyles;

  const hours24 = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const getDaysInMonth = (date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end });
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const handleHourClick = (hour) => {
    setSelectedTime({ ...selectedTime, hours: hour });
    setShowHours(false);
  };

  const handleMinuteClick = (minute) => {
    setSelectedTime({ ...selectedTime, minutes: minute });
    setShowMinutes(false);
  };

  const handleDayClick = (day) => setSelectedDate(day);

  const handleBookNow = () => {
    const bookingDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
    const bookingTime = `${selectedTime.hours}:${selectedTime.minutes}`;
    navigate('/confirmbooking', {
      state: { date: bookingDate, time: bookingTime }
    });
  };

  const days = getDaysInMonth(currentDate);

  const renderMobileVersion = () => (
    <div style={styles.outerContainer}>
      <div style={styles.sectionsWrapper}>
        <div style={styles.calendarSection}>
          <h2 style={styles.header}>Availability</h2>
          <div style={styles.monthSelector}>
            <button onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>◀</button>
            <span>{format(currentDate, 'MMMM')}</span>
            <button onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>▶</button>
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
                      style={{
                        ...styles.day,
                        backgroundColor: selectedDate && selectedDate.getDate() === day.getDate() ? '#6366F1' : 'transparent',
                        color: selectedDate && selectedDate.getDate() === day.getDate() ? 'white' : 'black'
                      }}
                      onClick={() => handleDayClick(day)}
                    >
                      {format(day, 'd')}
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
                style={styles.timeSelect}
                onClick={() => {
                  setShowHours(!showHours);
                  setShowMinutes(false);
                }}
              >
                {selectedTime.hours}
              </div>
              {showHours && (
                <div style={styles.dropdownList}>
                  {hours24.map((hour) => (
                    <div
                      key={hour}
                      style={styles.dropdownItem}
                      onClick={() => handleHourClick(hour)}
                    >
                      {hour}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={styles.timeContainer}>
              <div style={styles.timeLabel}>Minutes</div>
              <div 
                style={styles.timeSelect}
                onClick={() => {
                  setShowMinutes(!showMinutes);
                  setShowHours(false);
                }}
              >
                {selectedTime.minutes}
              </div>
              {showMinutes && (
                <div style={styles.dropdownList}>
                  {minutes.map((minute) => (
                    <div
                      key={minute}
                      style={styles.dropdownItem}
                      onClick={() => handleMinuteClick(minute)}
                    >
                      {minute}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <p style={styles.message}>Select your time slots to book your service</p>
      <button style={styles.bookButton} onClick={handleBookNow}>
        BOOK NOW
      </button>
    </div>
  );

  const renderDesktopVersion = () => (
    <>
      <div style={styles.container}>
        <div style={styles.calendarSection}>
          <h2 style={styles.header}>Availability</h2>
          <div style={styles.monthSelector}>
            <button onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>◀</button>
            <span style={{ fontSize: '24px', fontWeight: '600' }}>
              {format(currentDate, 'MMMM yyyy')}
            </span>
            <button onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>▶</button>
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
                      style={{
                        ...styles.day,
                        backgroundColor: selectedDate && selectedDate.getDate() === day.getDate() ? '#6366F1' : 'transparent',
                        color: selectedDate && selectedDate.getDate() === day.getDate() ? 'white' : 'black'
                      }}
                      onClick={() => handleDayClick(day)}
                    >
                      {format(day, 'd')}
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
              <div style={styles.timeValue} onClick={() => setShowHours(!showHours)}>
                {selectedTime.hours}
              </div>
              {showHours && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  width: '100%',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  background: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  zIndex: 1000
                }}>
                  {hours24.map((hour) => (
                    <div
                      key={hour}
                      style={{
                        padding: '8px',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                      onClick={() => handleHourClick(hour)}
                    >
                      {hour}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={styles.timeContainer}>
              <div style={styles.timeLabel}>Minutes</div>
              <div style={styles.timeValue} onClick={() => setShowMinutes(!showMinutes)}>
                {selectedTime.minutes}
              </div>
              {showMinutes && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  width: '100%',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  background: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  zIndex: 1000
                }}>
                  {minutes.map((minute) => (
                    <div
                      key={minute}
                      style={{
                        padding: '8px',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
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
          <button style={styles.bookButton} onClick={handleBookNow}>
            BOOK NOW
          </button>
        </div>
      </div>
      <Footer />
    </>
  );

  return isMobile ? renderMobileVersion() : renderDesktopVersion();
};

export default VendorAvailability;