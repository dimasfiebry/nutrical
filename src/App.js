import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MaterialPage from './pages/MaterialPage';

function App() {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = () => {
    // Lakukan sesuatu dengan hasil pencarian, misalnya: simpan dalam state atau langsung navigasi ke MaterialPage
    // Di sini, saya akan langsung mengirimkan hasil pencarian ke MaterialPage
    if (searchInput.trim() !== '') {
      window.location.href = `/material-page/${encodeURIComponent(searchInput)}`;
    }
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navbar setSearchInput={setSearchInput} handleSearchSubmit={handleSearchSubmit} />}
          />
          <Route path="/material-page/:bahanName" element={<MaterialPage />} />
        </Routes>
      </Router>
    </div>
  );
}

// Komponen langsung untuk konten halaman utama
function AppContent() {
  return (
    <div>
      <Navbar />
      {/* Jika Anda ingin menambahkan konten lain di halaman utama, Anda bisa tambahkan di sini */}
    </div>
  );
}

export default App;
