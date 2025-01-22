import React, { useState, useEffect } from 'react';
import './Payments.css';
import Sidebar from './Sidebar';
import Footer from './Footer';
import config from '../config';

const Payments = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(config.PAYMENTS_API_URL);
        const data = await response.json();
        
        if (Array.isArray(data.payments)) {
          setTransactions(data.payments);
        } else {
          console.error('Payments data is not an array:', data.payments);
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const MobileCards = () => (
    <div style={{ 
      display: isMobile ? 'block' : 'none',
      padding: '16px',
      background: '#f5f5f5'
    }}>
      {transactions.map((transaction, index) => (
        <div key={index} style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          border: '1px solid #f0f0f0'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '16px'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#333'
            }}>{transaction.clientName}</div>
            <div style={{
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '500',
              background: transaction.statusOfWork === 'Completed' ? '#e6f4ea' : '#fff3e0',
              color: transaction.statusOfWork === 'Completed' ? '#1e8e3e' : '#ff6d00'
            }}>
              {transaction.statusOfWork}
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px',
            color: '#666'
          }}>
            <span style={{ marginRight: '8px', fontSize: '16px' }}>📍</span>
            <span style={{ fontSize: '15px' }}>{transaction.location}</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px',
            color: '#666'
          }}>
            <span style={{ marginRight: '8px', fontSize: '16px' }}>📅</span>
            <span style={{ fontSize: '15px' }}>{transaction.date}</span>
          </div>

          <div style={{
            background: '#fafafa',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px',
              alignItems: 'center'
            }}>
              <span style={{ color: '#666', fontSize: '15px' }}>Paid Amount:</span>
              <span style={{ 
                color: '#2e7d32', 
                fontWeight: '600', 
                fontSize: '18px'
              }}>{transaction.paidAmount}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ color: '#666', fontSize: '15px' }}>Payment Type:</span>
              <span style={{ 
                color: '#333', 
                fontSize: '15px',
                fontWeight: '500'
              }}>{transaction.paymentType}</span>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid #f0f0f0',
            paddingTop: '16px',
            color: '#888',
            fontSize: '13px'
          }}>
            <div style={{ marginBottom: '6px' }}>Transaction ID: {transaction.transactionId}</div>
            <div>Order ID: {transaction.orderId}</div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ 
      display: 'flex',
      minHeight: '100vh',
      flexDirection: isMobile ? 'column' : 'row'
    }}>
      <Sidebar isActive="payments" isMobile={isMobile} />

      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: '100vh',
        position: 'relative',
        paddingLeft: isMobile ? '0px' : '100px'
      }}>
        <div style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: isMobile ? '6px' : '100px'
        }}>
          <h1 className="title">Payments</h1>
          
          <div style={{
            ...(isMobile ? {
              padding: '16px',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              whiteSpace: 'nowrap',
              display: 'flex',
              gap: '12px'
            } : {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: '20px',
              marginTop: '20px'
            })
          }}>
            <div className="card mint" style={{
              ...(isMobile ? {
                flex: '0 0 260px',
                minWidth: '260px',
                padding: '16px',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                background: '#e6f4ea',
                display: 'inline-block'
              } : {
                flex: '1 0 30%',
                maxWidth: '30%'
              })
            }}>
              <div className="card-text">Total Transaction Amount</div>
              <div className="amount">$3,000</div>
            </div>
            
            <div className="card orange" style={{
              ...(isMobile ? {
                flex: '0 0 260px',
                minWidth: '260px',
                padding: '16px',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                background: '#fff3e0',
                display: 'inline-block'
              } : {
                flex: '1 0 30%',
                maxWidth: '30%'
              })
            }}>
              <div className="card-text">
                Remaining Balance Amount to<br />
                <span className="get-tag">Get</span>
              </div>
              <div className="amount">$1,200</div>
            </div>
            
            <div className="card green" style={{
              ...(isMobile ? {
                flex: '0 0 260px',
                minWidth: '260px',
                padding: '16px',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                background: '#e8f5e9',
                display: 'inline-block'
              } : {
                flex: '1 0 30%',
                maxWidth: '30%'
              })
            }}>
              <div className="card-text">Total Paid Amount</div>
              <div className="amount">$1,800</div>
            </div>
          </div>

          <MobileCards />

          <div style={{ display: isMobile ? 'none' : 'block' }}>
            <h2 className="subtitle">Transaction History</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>CLIENT NAME</th>
                    <th>LOCATION</th>
                    <th>DATE</th>
                    <th>STATUS OF WORK</th>
                    <th>PAID AMOUNT</th>
                    <th>TRANSACTION ID</th>
                    <th>ORDER ID</th>
                    <th>PAYMENT TYPE</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.clientName}</td>
                      <td>{transaction.location}</td>
                      <td>{transaction.date}</td>
                      <td>
                        <span className={`status ${transaction.statusOfWork === 'Completed' ? 'completed' : 'progress'}`}>
                          {transaction.statusOfWork}
                        </span>
                      </td>
                      <td>{transaction.paidAmount}</td>
                      <td>{transaction.transactionId}</td>
                      <td>{transaction.orderId}</td>
                      <td>{transaction.paymentType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="pagination">
              <button className="prev">← Previous</button>
              <span className="page-info">Page 1 of 10</span>
              <button className="next">Next →</button>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 'auto',
          width: '100%'
        }}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Payments;