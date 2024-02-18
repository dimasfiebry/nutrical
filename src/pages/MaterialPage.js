import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MaterialCard from '../components/MaterialCard';
import { bahan } from '../data/bahan';

const MaterialPage = () => {
    // Menggunakan useParams untuk mendapatkan parameter dari URL
    const { bahanName } = useParams();

    // Filter data bahan berdasarkan inputan pengguna
    const filteredBahan = bahan.filter(b => b.nama.toLowerCase() === bahanName.toLowerCase());

    return (
        <div>
            <Navbar />
            {/* Mencetak MaterialCard dengan satu bahan */}
            {filteredBahan.length > 0 ? (
                <MaterialCard bahan={filteredBahan[0]} />
            ) : (
                <p>Bahan tidak ditemukan</p>
            )}
        </div>
    );
};

export default MaterialPage;
