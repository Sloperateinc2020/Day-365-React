import React from 'react';

const CustomerHelp = () => {
  return (
    <div style={{
      padding: '40px 20px',
      textAlign: 'center',
      maxWidth: '1000px', // Reduced max width for the section
      margin: '0 auto', // Center the section
    }}>
      <h2 style={{
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#333',
        marginTop: '70px',
      }}>
        For Customers – Get Help When You Need It
      </h2>
      <p style={{
        textAlign: 'center',
        color: '#666',
        marginBottom: '20px',
        marginTop: '15px',
      }}>
        Exercitation dolore reprehenderit fugi
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap', // Allow cards to wrap on smaller screens
        gap: '15px', // Adjust gap for consistent spacing
        marginTop: '20px',
      }}>
        <ArticleCard
          image="https://media.istockphoto.com/id/1358911296/photo/businesspersons-having-a-meeting-in-an-office.jpg?s=612x612&w=0&k=20&c=UFkexkrxrYYx3Y-_HryVnhraANA5yrM3ieKANzDLr1w="
          tag="Do consectetur"
          title="Register with Ease"
          date="Dec 22, 2022"
        />
        <ArticleCard
          image="https://www.shutterstock.com/image-photo/busy-diverse-professional-business-people-260nw-2346440433.jpg"
          tag="Consequat labore"
          title="Manage Your Schedule"
          date="Dec 22, 2022"
        />
        <ArticleCard
          image="https://www.shutterstock.com/image-photo/portrait-enthusiastic-hispanic-young-woman-260nw-2242410029.jpg"
          tag="Do consectetur"
          title="Platform Fee"
          date="Dec 22, 2022"
        />
      </div>

      <button style={{
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#6666ff',
        borderRadius: '5px',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
      }}>
        See more articles
      </button>
    </div>
  );
};

const ArticleCard = ({ image, tag, title, date }) => (
  <div style={{
    flex: '1 1 calc(30% - 15px)', // Adjust card width for reduced section width
    maxWidth: '270px', // Reduce card width
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    padding: '10px',
    textAlign: 'left',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  }}>
    <img
      src={image}
      alt={title}
      style={{
        width: '100%',
        height: '140px', // Slightly reduced height
        borderRadius: '10px',
        marginBottom: '10px',
      }}
    />
    <p style={{
      fontSize: '12px',
      color: '#6666ff',
      marginBottom: '5px',
    }}>
      {tag}
    </p>
    <h3 style={{
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px',
    }}>
      {title}
    </h3>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '5px',
      marginBottom: '10px',
    }}>
      <p style={{ fontSize: '12px', color: '#999' }}>{date}</p>
      <p style={{
        fontSize: '12px',
        color: '#333',
        backgroundColor: '#f0f0f0',
        padding: '4px 8px',
        borderRadius: '5px',
      }}>
        1 min read
      </p>
    </div>
  </div>
);

export default CustomerHelp;
