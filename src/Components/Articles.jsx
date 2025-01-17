import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaSearch } from 'react-icons/fa';
import './Articles.css';

const Articles = () => {
  return (
    <div className="page-container">
      <div className="article-container">
        {/* Search Bar */}
        <div className="search-wrapper">
          <div className="search-container">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search articles..."
              />
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="article-content">
          <h1 className="article-title">
            Maximizing Productivity: Essential Tips for Remote Work Success
          </h1>
          <div className="author-profile">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
              alt="Author"
              className="author-profile-img"
            />
            <div className="author-profile-info">
              <h2 className="author-profile-name">Sarah Johnson</h2>
              <p className="author-profile-role">
                Professional Career Coach & Remote Work Specialist
              </p>
            </div>
          </div>
          <p className="article-description">
            In today's rapidly evolving work landscape, remote work has become
            more prevalent than ever. This comprehensive guide explores essential
            strategies for maintaining productivity and work-life balance in a
            remote setting.
          </p>
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            alt="Remote Work"
            className="main-image"
          />
          <p className="image-caption">
            One of the key aspects of successful remote work is establishing a
            dedicated workspace. This helps create boundaries between work and
            personal life, leading to improved focus and productivity.
          </p>
        </div>

        {/* Social Media Section */}
        <div className="reaction-section">
          <div className="reaction-buttons">
            <button className="reaction-btn facebook">
              <FaFacebookF size={18} />
            </button>
            <button className="reaction-btn twitter">
              <FaTwitter size={18} />
            </button>
            <button className="reaction-btn linkedin">
              <FaLinkedinIn size={18} />
            </button>
          </div>
        </div>

        {/* Related Articles Section */}
        <div className="related-articles">
          <h2>Related Articles</h2>
          <div className="related-grid">
            <div className="related-article">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Team Culture"
              />
              <h3>Building Strong Virtual Team Culture</h3>
            </div>
            <div className="related-article">
              <img
                src="https://images.unsplash.com/photo-1531498860502-7c67cf02f657?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Digital Tools"
              />
              <h3>Digital Tools for Remote Collaboration</h3>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="comments-section">
          <h2>Comments</h2>
          <textarea
            className="comment-input"
            placeholder="Leave a comment..."
          ></textarea>
          <button className="post-comment-btn">Post Comment</button>
        </div>
      </div>
    </div>
  );
};

export default Articles;