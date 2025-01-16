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
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px', 
          marginBottom: '30px' 
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between' 
          }}>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              margin: '0',
              marginTop:"50px"
            }}>
              Urban Maverick Blog
            </h1>
          </div>
  
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            <input 
              type="text" 
              placeholder="Search blogs.." 
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
            <select style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd' }}>
              <option>All Categories</option>
            </select>
            <select style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd' }}>
              <option>Latest</option>
            </select>
          </div>
        </div>
  
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {blogPosts.map(post => (
            <div key={post.id} style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
              <img 
                src={post.image} 
                alt={post.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ color: '#666' }}>{post.date}</span>
                  <span style={{ color: '#666' }}>•</span>
                  <span style={{ color: '#666' }}>{post.author}</span>
                </div>
                
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>{post.title}</h2>
                <p style={{ color: '#666', marginBottom: '15px', lineHeight: '1.5' }}>{post.description}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ 
                    backgroundColor: '#f0f0f0', 
                    padding: '4px 12px', 
                    borderRadius: '16px', 
                    fontSize: '14px' 
                  }}>
                    {post.category}
                  </span>
                  <button style={{ 
                    color: '#3b82f6', 
                    border: 'none', 
                    background: 'none', 
                    cursor: 'pointer' 
                  }}>
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Blog;
  