import React, { useState, useEffect } from 'react';
import axios from 'axios';
function BlogForm({ onUpdate, blog }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [blog]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (blog) {
                // Update existing blog
                await axios.put(`http://localhost:${process.env.REACT_APP_API_PORT || 5000}/api/posts/${blog._id}`, {
                    title,
                    content
                });
                onUpdate('Post updated successfully!');
            } else {
                console.log("The prot is " + process.env.REACT_APP_API_PORT)
                // Create new blog
                await axios.post(`http://localhost:${process.env.REACT_APP_API_PORT || 5000}/api/generate`, { prompt: title });
                onUpdate('Post created successfully!');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to save post, try again.');
        }
    };

    return (
        <div className="blog-form">
            <form onSubmit={handleSubmit}>
                <textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                    rows="2"
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
                {blog && (
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter blog content"
                        rows="10"
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', marginTop: '10px' }}
                    />
                )}
                <button type="submit" style={{ marginTop: '10px', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: '#fff' }}>
                    {blog ? 'Update' : 'Submit'}
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default BlogForm;
