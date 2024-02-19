import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MaterialCard from '../components/MaterialCard';
import { bahan } from '../data/bahan';

const MaterialPage = () => {
    const { bahanName } = useParams();

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                // Navigasi kembali ke halaman yang sama
                window.location.reload();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const filteredBahan = bahan.filter(b => b.nama.toLowerCase() === bahanName.toLowerCase());

    return (
        <div>
            <Navbar />
            {filteredBahan.length > 0 ? (
                <MaterialCard bahan={filteredBahan[0]} />
            ) : (
                <p>Bahan tidak ditemukan</p>
            )}
        </div>
    );
};

export default MaterialPage;
