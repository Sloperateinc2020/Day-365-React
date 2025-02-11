import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function VideoDetails() {
  const location = useLocation();
  const { videos, startIndex } = location.state || {};
  
  // Make sure the starting video index is valid
  const [currentVideoIndex, setCurrentVideoIndex] = useState(startIndex || 0);

  // Update the current video index whenever the startIndex changes
  useEffect(() => {
    setCurrentVideoIndex(startIndex);
  }, [startIndex]);

  // Handle the 'next' button click (go to next video)
  const handleNext = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  // Handle the 'previous' button click (go to previous video)
  const handlePrev = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  if (!videos || videos.length === 0) {
    return <div>No videos available.</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <header style={{ padding: '16px', backgroundColor: '#6366f1', color: 'white' }}>
        <h2>Video Details</h2>
      </header>

      <main style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Display Current Video */}
          <div style={{ position: 'relative' }}>
            <video
              controls
              style={{
                width: '100%',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                maxHeight: '400px', // Keep the video within a certain height
                objectFit: 'contain'
              }}
            >
              <source src={videos[currentVideoIndex].videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Navigation Buttons */}
            <div style={{ position: 'absolute', top: '50%', left: '10px', zIndex: 1 }}>
              <button
                onClick={handlePrev}
                style={{
                  padding: '10px',
                  backgroundColor: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '18px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                ❮
              </button>
            </div>
            <div style={{ position: 'absolute', top: '50%', right: '10px', zIndex: 1 }}>
              <button
                onClick={handleNext}
                style={{
                  padding: '10px',
                  backgroundColor: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '18px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                ❯
              </button>
            </div>
          </div>

          {/* Video Thumbnails (Optional) */}
          <div style={{ display: 'flex', overflowX: 'auto', gap: '12px', padding: '8px 0' }}>
            {videos.map((video, index) => (
              <div
                key={video.id}
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#ffffff',
                  width: '150px',
                  height: '100px',
                  flexShrink: 0,
                  marginRight: '12px',
                  opacity: index === currentVideoIndex ? 1 : 0.5,
                  transition: 'opacity 0.3s',
                }}
                onClick={() => setCurrentVideoIndex(index)}
              >
                <video
                  muted
                  loop
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '12px',
                    objectFit: 'cover',
                  }}
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default VideoDetails;
