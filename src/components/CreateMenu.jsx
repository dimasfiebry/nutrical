import React, { useState, useEffect } from "react";
import { bahan } from "../data/bahan";

const CreateMenu = () => {
  const [searchInput, setSearchInput] = useState("");
  const [beratInput, setBeratInput] = useState("");
  const [showDatalist, setShowDatalist] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [calculatedValues, setCalculatedValues] = useState(null);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
    if (inputValue.length >= 1) {
      setShowDatalist(true);
    } else {
      setShowDatalist(false);
    }
  };

  const tambahMenu = () => {
    const berat = parseInt(beratInput);

    // Memastikan beratInput adalah angka yang valid dan lebih besar dari 0
    if (searchInput.trim() !== '' && !isNaN(berat) && berat > 0) {
      const menu = {
        nama: searchInput,
        berat: berat
      };
      setMenuList([...menuList, menu]);
      setShowMenu(true);
      setSearchInput('');
      setBeratInput('');
    } else {
      alert("Masukkan bahan dan berat yang valid.");
    }
  };

  const hapusMenu = (index) => {
    const newMenuList = [...menuList];
    newMenuList.splice(index, 1);
    setMenuList(newMenuList);
    if (newMenuList.length === 0) {
      setShowMenu(false);
    }
  };

  const hitungDetailZat = () => {
    const calculatedValues = {};

    menuList.forEach(menu => {
      const bahanData = bahan.find(item => item.nama.toLowerCase() === menu.nama.toLowerCase());
      if (bahanData) {
        for (let key in bahanData) {
          if (key !== "id" && key !== "nama" && key !== "gambar") { // Memastikan tidak menghitung nilai gambar
            if (!calculatedValues[key]) {
              calculatedValues[key] = 0;
            }
            calculatedValues[key] += (menu.berat / 100) * bahanData[key];
          }
        }
      }
    });

    setCalculatedValues(calculatedValues);
  };

  return (
    <div className='max-w-[1640px] mx-auto flex flex-col justify-center items-center px-8 py-4 sm:px-10 md:px-16 lg:px-24'>
      <div className=' flex flex-col w-full border-2 border-green-800 rounded-md '>
        <h1 className=' px-4 py-2 w-full bg-green-800 text-white tracking-wider font-semibold text-sm md:text-base'>Buat Menu Makan</h1>

        {showMenu && (
          <div className='py-8 px-8 flex flex-col justify-center items-start w-auto gap-5' id="divTampilkan">
            {menuList.map((menu, index) => (
              <div className="flex flex-row gap-4" key={index}>
                <p className="border border-green-800 flex flex-row justify-start items-center px-4 py-2 rounded-md text-xs md:text-sm lg:text-base w-[300px]">{menu.nama}</p>
                <p className="border border-green-800 flex flex-row justify-start items-center px-4 py-2 rounded-md text-xs md:text-sm lg:text-base w-[60px]">{menu.berat}g</p>
                <button className="border border-red-800 hover:bg-red-800 bg-white flex flex-row justify-center items-center px-4 rounded-md text-xl w-[60px] text-red-800 hover:text-white" onClick={() => hapusMenu(index)}> - </button>
              </div>
            ))}
          </div>
        )}

        <div className='py-8 px-8 flex flex-col justify-between items-center w-auto gap-4'>
          <div className='flex flex-row justify-between items-center w-full'>
            <div className='flex flex-col justify-center items-start w-[260px] sm:w-[240px] md:w-[340px] lg:w-[550px] '>
              <label className='text-sm font-medium pb-1 md:text-base text-green-800' htmlFor="">Nama Bahan</label>
              <input className='border border-green-800 w-full rounded-md focus:outline-none py-1 px-4 placeholder:text-xs bg-transparent lg:py-2' type="text" placeholder='Masukkan nama bahan' value={searchInput}
                onChange={handleInputChange}
                list={showDatalist ? "bahanList" : null}
              />
              {showDatalist && (
                <datalist id="bahanList">
                  {bahan.map((b) => (
                    <option key={b.id} value={b.nama} />
                  ))}
                </datalist>
              )}
            </div>
            <div className='flex flex-col justify-center items-start w-[150px] sm:w-[120px] lg:w-[200px]'>
              <label className='text-sm font-medium pb-1 md:text-base text-green-800' htmlFor="">Berat Bahan</label>
              <input className='border border-green-800 w-full rounded-md focus:outline-none py-1 px-4 placeholder:text-xs bg-transparent lg:py-2' type="number" placeholder='Berat (g)' value={beratInput} onChange={(e) => setBeratInput(e.target.value)} />
            </div>
            <div className='justify-center items-center hidden sm:flex'>
              <button className='border border-green-800 hover:scale-105 px-4 rounded-md w-[100px] py-1 duration-150 mt-7 lg:w-[160px] lg:py-2' onClick={tambahMenu}>Tambah</button>
            </div>
            <div className='justify-center items-center hidden lg:flex'>
              <button className='border border-green-800 bg-green-800 hover:bg-white w-[150px] sm:w-full px-4 rounded-md py-1 sm:py-2 text-white hover:text-black hover:scale-105 duration-200 lg:mt-7 lg:w-[160px]' onClick={hitungDetailZat}>Hitung</button>
            </div>
          </div>

          <div className='flex flex-row justify-between w-full items-center gap-6 lg:hidden'>
            <button className='border border-green-800 hover:scale-105 px-4 rounded-md w-[260px] py-1 duration-150 sm:hidden' onClick={tambahMenu}>Tambah</button>
            <button className='border border-green-800 bg-green-800 hover:bg-white w-[150px] sm:w-full px-4 rounded-md py-1 sm:py-2 text-white hover:text-black hover:scale-105 duration-200 lg:hidden' onClick={hitungDetailZat}>Hitung</button>
          </div>

        </div>

      </div>
      <div className="w-full" id="tampilDetail">
        <h2 className="text-xl font-semibold text-green-800 my-4">Detail Zat Gizi</h2>
        {calculatedValues && (
          <div>
            {menuList.map((menu, index) => (
              <DetailZatGizi key={index} nama={menu.nama} berat={menu.berat} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateMenu;

const DetailZatGizi = ({ nama, berat }) => {
  const bahanData = bahan.find(item => item.nama.toLowerCase() === nama.toLowerCase());
  const calculatedValues = {};

  if (bahanData) {
    for (let key in bahanData) {
      if (key !== "id" && key !== "nama" && key !== "gambar") {
        calculatedValues[key] = (berat / 100) * bahanData[key];
      }
    }
  }

  return (
    <div className='w-full '>

      <div className=' flex flex-col justify-center items-center w-full border-2 border-green-800 rounded-md '>
        <h1 className=' px-4 py-2 w-full bg-green-800 text-white tracking-wider font-semibold text-sm md:text-base'>{nama}</h1>

        <div className='grid grid-cols-3 gap-6 sm:gap-10 md:gap-10 lg:gap-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 py-4'>
          {Object.entries(calculatedValues).map(([nutrient, value]) => (
            <div key={nutrient} className='border-[1.5px] border-green-800 rounded-md max-w-[120px]'>
              <p className='border-b-green-800 border-b-[1.5px] w-full text-white bg-green-800 px-2 py-1'>{nutrient}</p>
              <p className='py-1 px-2'>{value.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>


  );
};
