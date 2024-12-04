import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditBook = () => {
    const [book, setBook] = useState({ title: '', author: '', year: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/books/${id}`);
                setBook(response.data);
            } catch (err) {
                console.error('Failed to fetch book:', err);
            }
        };
        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/books/${id}`, book);
            navigate('/');
        } catch (err) {
            console.error('Failed to update book:', err);
            setError('Failed to update book');
        }
    };

    return (
        <div>
            <h1>Edit Book</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input type="text" name="title" className="form-control" value={book.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Author</label>
                    <input type="text" name="author" className="form-control" value={book.author} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Year</label>
                    <input type="number" name="year" className="form-control" value={book.year} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Update Book</button>
            </form>
        </div>
    );
};

export default EditBook;
