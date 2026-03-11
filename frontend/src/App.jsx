import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Pricing from './pages/Pricing';
import Doctors from './pages/Doctors';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';

function App() {
    // Basic state-based routing for a seamless SPA without breaking existing links
    const [currentPage, setCurrentPage] = useState('home');

    // Make global navigate function available if needed, or pass it as prop
    const navigateTo = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <div className="w-full min-h-screen font-['Inter'] flex flex-col items-center">
            {currentPage === 'home' && <Home onNavigate={navigateTo} />}
            {currentPage === 'login' && <Login onNavigate={navigateTo} />}
            {currentPage === 'pricing' && <Pricing onNavigate={navigateTo} />}
            {currentPage === 'doctors' && <Doctors onNavigate={navigateTo} />}
            {currentPage === 'contact' && <Contact onNavigate={navigateTo} />}
            {currentPage === 'dashboard' && <Dashboard onNavigate={navigateTo} />}
        </div>
    );
}

export default App;
