const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const moment = require('moment');
require('dotenv').config({ path: '.env' });


const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


// Blog Schema
const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdAt: {
        type: String,
        default: () => moment().format('YYYY-MM-DD HH:mm:ss')
    }
});

const Blog = mongoose.model('Blog', blogSchema);

// Generate Blog Post
app.post('/api/generate', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === '') {
        return res.status(400).json({ error: 'Prompt cannot be empty' });
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant that writes blog posts in a fun way. If the user specifies the length of the blog, use it or else make the blog concise." },
                { role: "user", content: prompt }
            ],
            max_tokens: 500
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const generatedContent = response.data.choices[0].message.content;

        const blogPost = new Blog({ title: prompt, content: generatedContent });
        await blogPost.save();

        res.json({ content: generatedContent, id: blogPost._id });
    } catch (error) {
        console.error('OpenAI API Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error generating post', details: error.message });
    }
});

// Get All Blog Posts
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Blog.find();
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Error fetching posts' });
    }
});

// Delete Blog Post
app.delete('/api/posts/:id', async (req, res) => {
    try {
        const result = await Blog.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(204).end();
        console.log("Deleted Successfully")
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Error deleting post' });
    }
});

// Update Blog Post
app.put('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedPost = await Blog.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );
        res.json(updatedPost);
        console.log("Updated Successfully")
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Error updating post' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
