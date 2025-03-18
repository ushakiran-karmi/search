import React from 'react';
import SearchBar from './SearchBar';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <h1 className="text-2xl text-white">Movie App</h1>
            <SearchBar />
        </nav>
    );
};

export default Navbar;
