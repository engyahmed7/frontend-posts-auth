import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './showPosts.css';

export default function ShowPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get('http://localhost/api/posts', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(response.data.data);

        if (Array.isArray(response.data.data)) {
          setPosts(response.data.data);
          setFilteredPosts(response.data.data);
        } else {
          setError('Invalid data format.');
        }
      } catch (err) {
        setError('Failed to fetch posts.');
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    if (Array.isArray(posts)) {
      setFilteredPosts(
        posts.filter(post =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setCurrentPage(1); 
    }
  }, [searchTerm, posts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <div className="show-posts-container">
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        {Array.isArray(currentPosts) && currentPosts.length > 0 ? (
          currentPosts.map(post => (
            <div key={post.id} className="col-md-4 mb-4">
              <div className="card shadow-sm border-light">
                <img src={post.image || 'https://via.placeholder.com/300'} className="card-img-top" alt={post.title} />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.content.substring(0, 100)}...</p>
                  <p className="card-text text-muted">
                    Categories: {Array.isArray(post.categories.name) ? post.categories.name.join(', ') : ''}
                  </p>
                  <p className="card-text text-muted">
                    By {post.user} | {new Date(post.created_at).toLocaleDateString()}
                  </p>
                  <a href={`/posts/${post.id}`} className="btn btn-primary">Read More</a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">No posts found</div>
        )}
      </div>
      <div className="pagination justify-content-center">
        {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`btn ms-1 ${currentPage === i + 1 ? 'active' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
