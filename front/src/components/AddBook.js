import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const [book, setBook] = useState({ title: '', author: '', year: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);  // Loading state
    const navigate = useNavigate();

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!book.title || !book.author || !book.year) {
            setError('All fields are required.');
            return;
        }

        try {
            setLoading(true);  // Start loading
            await axios.post('http://localhost:5000/books', book);
            setLoading(false);  // Stop loading
            navigate('/');  // Redirect after success
        } catch (err) {
            setLoading(false);  // Stop loading
            setError('Failed to add book. Please try again later.');
            console.error('Error adding book:', err);
        }
    };

    return (
        <div>
            <h1>Add New Book</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={book.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Author</label>
                    <input
                        type="text"
                        name="author"
                        className="form-control"
                        value={book.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Year</label>
                    <input
                        type="number"
                        name="year"
                        className="form-control"
                        value={book.year}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Book'}
                </button>
            </form>
        </div>
    );
};

export default AddBook;