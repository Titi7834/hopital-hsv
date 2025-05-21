import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import DashboardPage from './pages/DashboardPage';
<<<<<<< HEAD
import './pages/HomePage.'; // Import CSS file for HomePage
=======
import './App.css'; // Import CSS file for styling
>>>>>>> f098293c3d2b5e2846605695e57df7758addf8c2

function App() {
 return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;