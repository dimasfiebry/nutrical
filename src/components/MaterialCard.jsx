import React, { useState } from 'react';

const MaterialCard = ({ bahan }) => {
    const [berat, setBerat] = useState(0);
    const [calculatedValues, setCalculatedValues] = useState(null);

    const handleHitung = () => {
        if (!isNaN(berat) && berat > 0) {
            const calculatedValues = {
                air: ((berat / 100) * bahan.air).toFixed(2),
                energi: ((berat / 100) * bahan.energi).toFixed(2),
                protein: ((berat / 100) * bahan.protein).toFixed(2),
                lemak: ((berat / 100) * bahan.lemak).toFixed(2),
                karbohidrat: ((berat / 100) * bahan.karbohidrat).toFixed(2),
                serat: ((berat / 100) * bahan.serat).toFixed(2),
                abu: ((berat / 100) * bahan.abu).toFixed(2),
                kalsium: ((berat / 100) * bahan.kalsium).toFixed(2),
                fosfor: ((berat / 100) * bahan.fosfor).toFixed(2),
                besi: ((berat / 100) * bahan.besi).toFixed(2),
                natrium: ((berat / 100) * bahan.natrium).toFixed(2),
                kalium: ((berat / 100) * bahan.kalium).toFixed(2),
                tembaga: ((berat / 100) * bahan.tembaga).toFixed(2),
                seng: ((berat / 100) * bahan.seng).toFixed(2),
                retinol: ((berat / 100) * bahan.retinol).toFixed(2),
                bKaroten: ((berat / 100) * bahan.bKaroten).toFixed(2),
                karotenTotal: ((berat / 100) * bahan.karotenTotal).toFixed(2),
                thiamin: ((berat / 100) * bahan.thiamin).toFixed(2),
                riboflavin: ((berat / 100) * bahan.riboflavin).toFixed(2),
                niasin: ((berat / 100) * bahan.niasin).toFixed(2),
                vitaminC: ((berat / 100) * bahan.vitaminC).toFixed(2),
                bdd: ((berat / 100) * bahan.bdd).toFixed(2),
            };
            setCalculatedValues(calculatedValues);
        } else {
            alert('Masukkan berat dengan nilai yang valid.');
        }
    };

    const copyToClipboard = () => {
        if (!calculatedValues) {
            alert('Hitung nilai terlebih dahulu sebelum menyalin.');
            return;
        }
    
        const tableData = Object.entries(calculatedValues);
    
        // Create two arrays for titles and values
        const titles = tableData.map(([nutrient, _]) => nutrient);
        const values = tableData.map(([_, value]) => value);
    
        // Create text data with titles and values in horizontal format
        const textData = titles.join('\t') + '\n' + values.join('\t');
    
        // Copy text to clipboard
        navigator.clipboard.writeText(textData);
    };
    

    return (
        <div className='max-w-[1640px] mx-auto flex justify-center items-center px-8 py-4 sm:px-10 md:px-16 lg:px-24'>
            <div className=' flex flex-col py-4 w-full justify-center items-center ml-6 border-2 border-green-800 rounded-lg relative max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[800px]'>
                <h1 className=' text-green-800 font-bold text-lg sm:text-xl md:text-2xl py-4'>{bahan.nama}</h1>
                <div className='max-w-[200px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] rounded-lg flex'>
                    <img className=' object-cover w-full rounded-lg' src={bahan.gambar} alt={bahan.nama} />
                </div>

                <div className=' grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 justify-center py-6 text-green-900 max-w-[210px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px]'>
                    <input
                        className=' focus:outline-none placeholder:text-xs py-1 w-full border border-green-800 px-4 rounded-md'
                        type="number"
                        placeholder='masukkan berat'
                        value={berat}
                        onChange={(e) => setBerat(parseFloat(e.target.value))}
                    />

                    <div className='flex flex-row gap-4'>
                    <button
                        className=' bg-green-800 w-full h-[40px] text-white font-medium text-xs px-2 rounded-md hover:bg-white border-2 border-green-800 hover:text-green-800'
                        onClick={handleHitung}
                    >
                        Hitung
                    </button>
                    <button
                        className=' bg-green-800  text-white font-medium text-xs px-2 rounded-md hover:bg-white border-2 border-green-800 hover:text-green-800'
                        onClick={copyToClipboard}
                    >
                        Salin
                    </button>
                    </div>
                    
                </div>

                {calculatedValues && (
                    <div className='grid grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                        {Object.entries(calculatedValues).map(([nutrient, value]) => (
                            <div key={nutrient} className='border-[1.5px] border-green-800 rounded-md max-w-[120px]'>
                                <p className='border-b-green-800 border-b-[1.5px] w-full text-white bg-green-800'>{nutrient}</p>
                                <p className='py-[0.8px]'>{value}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MaterialCard;
