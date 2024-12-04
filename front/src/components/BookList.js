import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/books');
                setBooks(response.data);
            } catch (err) {
                console.error('Failed to fetch books:', err);
            }
        };
        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/books/${id}`);
            setBooks(books.filter((book) => book._id !== id));
        } catch (err) {
            console.error('Failed to delete book:', err);
        }
    };

    return (
        <div>
            <h1>Book List</h1>
            <Link to="/add" className="btn btn-primary mb-3">Add Book</Link>
            <ul className="list-group">
                {books.map((book) => (
                    <li key={book._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{book.title} by {book.author} ({book.year})</span>
                        <div>
                            <Link to={`/edit/${book._id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                            <button onClick={() => handleDelete(book._id)} className="btn btn-sm btn-danger">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
