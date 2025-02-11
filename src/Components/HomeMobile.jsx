import React, { useState, useEffect } from 'react';
import { Search, Mic, Star, Play, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

function HomeMobile() {
  const [allServices, setAllServices] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  // Featured service videos data
  const serviceVideos = [
    {
      id: 1,
      title: "Painting Service",
      thumbnail: "/videos/vd1-thumbnail.jpg", // Add a thumbnail for the video
      videoUrl: "/videos/vd.1.mp4", // Local video path
      category: "Painting",
      description: "Expert wall painting services."
    },
    {
      id: 1,
      title: "Painting Service",
      thumbnail: "/videos/vd2-thumbnail.jpg", 
      videoUrl: "/videos/vd.2.mp4", 
      category: "Painting",
      description: "Expert wall painting services."
    },
    {
      id: 1,
      title: "Painting Service",
      thumbnail: "/videos/v3-thumbnail.jpg", 
      videoUrl: "/videos/vd.3.mp4", 
      category: "Painting",
      description: "Expert wall painting services."
    },
    {
      id: 1,
      title: "Painting Service",
      thumbnail: "/videos/v4-thumbnail.jpg", 
      videoUrl: "/videos/vd.4.mp4", 
      category: "Painting",
      description: "Expert wall painting services."
    }
  ];
  

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(config.SERVICE_API_URL);
      const data = await response.json();
      setAllServices(data.services || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const filteredServices = allServices.filter(service =>
    service.service.toLowerCase().includes(searchValue.toLowerCase())
  );

  const startSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported by your browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchValue(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
      alert('Error occurred during speech recognition.');
    };
  };

  const ServiceCard = ({ service }) => (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease',
        cursor: 'pointer',
      }}
      onClick={() => navigate('/service-details', { state: { service } })}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{
        width: '100%',
        height: '100px',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '12px'
      }}>
        <img
          src={service.imageUrl}
          alt={service.service}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      <h3 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '8px',
        textAlign: 'center'
      }}>
        {service.service}
      </h3>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px'
      }}>
        <Star size={12} style={{ color: '#FFD700', fill: '#FFD700' }} />
        <span style={{ fontSize: '12px', color: '#666' }}>
          4.8 (200+ reviews)
        </span>
      </div>
    </div>
  );

  const VideoCard = ({ video }) => (
    <div
      style={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        width: '150px',
        height: '230px',
        flexShrink: 0,
        marginRight: '12px',
      }}
      onClick={() => navigate('/video-details', { state: { videos: serviceVideos, startIndex: video.id - 1 } })}
    >
      {/* Video Element */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '12px',
          objectFit: 'cover'
        }}
      >
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
  
      {/* 🔹 Watermark "Urban Maverick" */}
      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '500',
          textAlign: 'center',
          opacity: '0.8',
          pointerEvents: 'none', // Prevent interactions
        }}
      >
        © Urban Maverick
      </div>
    </div>
  );
  
  
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: 'lightblue',
        padding: '16px 20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <div
            onClick={() => navigate('/signup')}
            style={{
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              color: "white",
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>SignIn</span>
            <span style={{ color: '#e0e7ff' }}>|</span>
            <span>Register</span>
          </div>
          <button
            onClick={() => navigate('/join-as-vendor')}
            style={{
              backgroundColor: 'black',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 600,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            Join As A Vendor
          </button>
        </div>
        <div style={{ position: 'relative', marginTop: '4px' }}>
          <Search
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6366f1'
            }}
            size={18}
          />
          <input
            type="text"
            placeholder="What are you looking for?"
            style={{
              width: '100%',
              padding: '12px 44px',
              borderRadius: '9999px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 4px rgba(99, 102, 241, 0.1)',
              fontSize: '15px',
              color: '#4b5563'
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Mic
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6366f1',
              cursor: 'pointer'
            }}
            size={18}
            onClick={startSpeechRecognition}
          />
        </div>
      </header>
      <main style={{ paddingTop: '120px', paddingLeft: '16px', paddingRight: '16px' }}>
        <section style={{ marginBottom: '24px',marginTop:"10px"
         }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: '400',
              color: '#1f2937'
            }}>
              Popular Services
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px'
          }}>
            {filteredServices.slice(0, 6).map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </section>
        <div style={{
          marginBottom: '24px',
          backgroundImage: 'url(https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '200px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: 'white',
          textAlign: 'center',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 1
          }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '16px',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              Premium Beauty Services
            </h3>
            <button
              onClick={() => navigate('/beautyServices')}
              style={{
                backgroundColor: '#ffffff',
                color: '#6366f1',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Explore Beauty Services
            </button>
          </div>
        </div>
        <section style={{ marginBottom: '24px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '530', color: '#1f2937' }}>
              Popular Service Videos
            </h2>
          </div>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '12px', padding: '8px 0', scrollBehavior: 'smooth' }}>
            {serviceVideos.map((video) => (
              <div key={video.id} style={{ flexShrink: 0, marginBottom: '20px' }}>
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomeMobile;