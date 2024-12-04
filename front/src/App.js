import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import BookList from './components/BookList';

const App = () => {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/" element={<BookList />} />
                    <Route path="/add" element={<AddBook />} />
                    <Route path="/edit/:id" element={<EditBook />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
