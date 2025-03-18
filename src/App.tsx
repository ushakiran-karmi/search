import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchResults from './pages/SearchResults';

const App: React.FC = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-900 text-white">
                <Navbar />
                <Routes>
                    <Route path="/search" element={<SearchResults />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
