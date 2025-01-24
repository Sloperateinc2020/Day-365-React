import React from 'react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      date: "2/14/2024",
      author: "Sarah Johnson",
      title: "How can we start Work with Urban Maverick Blog?",
      description: "Discover proven strategies to excel in your freelance career and build a sustainable business model",
      category: "Career Growth",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3"
    },
    {
      id: 2,
      date: "2/14/2024",
      author: "Michael Chen",
      title: "Feature of Working with Urban Maverick Blog!",
      description: "Explore the latest trends and predictions shaping the landscape of remote work and digital nomadism",
      category: "Remote Work",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3"
    },
    {
      id: 3,
      date: "2/13/2024",
      author: "Emma Wilson",
      title: "Building Your Personal Brand Online",
      description: "Learn essential techniques to establish and grow your personal brand in the digital marketplace.",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3"
    }
  ];

  return (
    <div className="blog-container">
      <div className="header">
        <h1 className="title">Urban Maverick Blog</h1>
        <div className="filters">
          <input type="text" placeholder="Search blogs.." className="search-input" />
          <select className="category-select">
            <option>All Categories</option>
          </select>
          <select className="category-select">
            <option>Latest</option>
          </select>
        </div>
      </div>

      <div className="blog-grid">
        {blogPosts.map(post => (
          <div key={post.id} className="blog-post">
            <img src={post.image} alt={post.title} className="blog-image" />
            <div className="post-content">
              <div className="post-meta">
                <span className="post-date">{post.date}</span>
                <span className="post-author">• {post.author}</span>
              </div>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-description">{post.description}</p>
              <div className="post-footer">
                <span className="category-tag">{post.category}</span>
                <button className="read-more">Read More →</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        /* Blog Container */
        .blog-container {
          padding: 20px;
          max-width: 1300px;
          margin: 0 auto;
        }

        /* Header Styles */
        .header {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 30px;
        }

        .title {
          font-size: 24px;
          font-weight: bold;
          margin: 0;
          margin-top: 50px;
        }

        .filters {
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }

        .search-input,
        .category-select {
          padding: 8px 12px;
          border-radius: 2px;
          border: 1px solid #ddd;
        }

        /* Blog Grid */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-top: 10px;
        }

        .blog-post {
          border: 1px solid #eee;
          border-radius: 8px;
          overflow: hidden;
        }

        .blog-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .post-content {
          padding: 16px;
        }

        .post-meta {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 10px;
        }

        .post-date,
        .post-author {
          color: #666;
        }

        .post-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .post-description {
          color: #666;
          margin-bottom: 15px;
          line-height: 1.5;
        }

        .post-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .category-tag {
          background-color: #f0f0f0;
          padding: 12px;
          border-radius: 10px;
          font-size: 12px;
        }

        .read-more {
          color: #3b82f6;
          border: none;
          background: none;
          cursor: pointer;
        }

        /* Responsive Styles for Mobile */
        @media (max-width: 768px) {
          .blog-container {
            padding: 16px;
          }

          .header {
            margin-bottom: 20px;
          }

          .title {
            font-size: 20px;
            margin-top: 20px;
            text-align: center;
          }

          .filters {
            flex-direction: row;
            flex-wrap: nowrap;
            gap: 8px;
          }

          .search-input {
            flex: 2;
            min-width: 0;
            font-size: 14px;
          }

          .category-select {
            flex: 1;
            min-width: 0;
            padding: 5px;
            font-size: 13px;
          }

          .blog-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .blog-post {
            margin-bottom: 0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .blog-image {
            height: 180px;
          }

          .post-content {
            padding: 16px;
          }

          .post-meta {
            margin-bottom: 8px;
          }

          .post-title {
            font-size: 16px;
            margin-bottom: 8px;
          }

          .post-description {
            font-size: 14px;
            margin-bottom: 12px;
          }

          .post-footer {
            margin-top: 12px;
          }

          .category-tag {
            padding: 8px 12px;
            font-size: 15px;
          }

          .read-more {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default Blog;