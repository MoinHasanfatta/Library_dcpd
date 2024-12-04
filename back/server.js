const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Book = require('./models/Books');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/bookdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
// Get all books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch books' });
    }
});

// Get a single book
app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch book' });
    }
});

// Add a new book
app.post('/books', async (req, res) => {
    const { title, author, year } = req.body;
    try {
        const newBook = new Book({ title, author, year });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add book' });
    }
});

// Update a book
app.put('/books/:id', async (req, res) => {
    const { title, author, year } = req.body;
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { title, author, year }, { new: true });
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update book' });
    }
});

// Delete a book
app.delete('/books/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete book' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
