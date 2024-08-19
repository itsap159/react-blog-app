import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogForm from './BlogForm';
import './App.css';
function App() {
  const [posts, setPosts] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:${process.env.REACT_APP_API_PORT || 5000}/api/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:${process.env.REACT_APP_API_PORT || 5000}/api/posts/${id}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdate = (message) => {
    fetchPosts();
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    setEditingBlog(null); // Reset form to creation mode
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
  };

  const toggleContent = (postId) => {
    if (selectedBlog && selectedBlog._id === postId) {
      setSelectedBlog(null); // Hide content if the same post is clicked again
    } else {
      const post = posts.find(p => p._id === postId);
      setSelectedBlog(post); // Show content of the clicked post
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>Blog Posts</h2>
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <div
                className="post-title"
                onClick={() => toggleContent(post._id)}
              >
                {post.title}
              </div>
              {selectedBlog && selectedBlog._id === post._id && (
                <div className="post-content">
                  <p>{post.content}</p>
                  <button className="delete-button" onClick={() => handleDelete(post._id)}>Delete</button>
                  <button className="edit-button" onClick={() => handleEdit(post)}>Edit</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="form-container">
        <h1>{editingBlog ? 'Edit Blog Post' : 'Create a Blog Post'}</h1>
        <BlogForm onUpdate={handleUpdate} blog={editingBlog} />
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
      </div>
    </div>
  );
}

export default App;
