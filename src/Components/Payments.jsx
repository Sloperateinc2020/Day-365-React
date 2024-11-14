import React, { useState, useEffect } from 'react';
import './Payments.css';
import Footer from './Footer';  

import config from '../config';  

const Payments = () => {
  const [transactions, setTransactions] = useState([]); 
  const [loading, setLoading] = useState(true); 

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

  return (
    <>
      <div className="container">
        <h1 className="title">Payments</h1>
        
        <div className="cards">
          <div className="card mint">
            <div className="card-text">Total Transaction Amount</div>
            <div className="amount">$3,000</div> 
          </div>
          
          <div className="card orange">
            <div className="card-text">
              Remaining Balance Amount to<br></br>
              <span className="get-tag">Get</span>
            </div>
            <div className="amount">$1,200</div> 
          </div>
          
          <div className="card green">
            <div className="card-text">Total Paid Amount</div>
            <div className="amount">$1,800</div> 
          </div>
        </div>

        <div className="history">
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
                      <span className={`status ${
                        transaction.status === 'Completed' ? 'completed' : 'progress'
                      }`}>
                        {transaction.status}
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

      <Footer />
    </>
  );
};

export default Payments;
