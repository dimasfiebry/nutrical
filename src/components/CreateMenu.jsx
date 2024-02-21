import React, { useState, useEffect } from "react";
import { bahan } from "../data/bahan";

const CreateMenu = () => {
  const [searchInput, setSearchInput] = useState("");
  const [beratInput, setBeratInput] = useState("");
  const [showDatalist, setShowDatalist] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [calculatedValues, setCalculatedValues] = useState(null);
  const [totalValues, setTotalValues] = useState(null);

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
      // Cek apakah bahan ada dalam database
      const bahanData = bahan.find(item => item.nama.toLowerCase() === searchInput.toLowerCase());
      if (bahanData) {
        const menu = {
          nama: searchInput,
          berat: berat
        };
        setMenuList([...menuList, menu]);
        setShowMenu(true);
        setSearchInput('');
        setBeratInput('');
      } else {
        alert("Bahan tidak ada dalam database.");
      }
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
    const totalValues = {};

    menuList.forEach(menu => {
      const bahanData = bahan.find(item => item.nama.toLowerCase() === menu.nama.toLowerCase());
      if (bahanData) {
        for (let key in bahanData) {
          if (key !== "id" && key !== "nama" && key !== "gambar") { // Memastikan tidak menghitung nilai gambar
            if (!calculatedValues[key]) {
              calculatedValues[key] = 0;
            }
            calculatedValues[key] += (menu.berat / 100) * bahanData[key];
            // Hitung total
            if (!totalValues[key]) {
              totalValues[key] = 0;
            }
            totalValues[key] += (menu.berat / 100) * bahanData[key];
          }
        }
      }
    });

    setCalculatedValues(calculatedValues);
    setTotalValues(totalValues);
  };

  const copyAllToClipboard = () => {
    if (!menuList.length) {
      alert('Tambahkan bahan terlebih dahulu sebelum menyalin.');
      return;
    }
  
    // Prepare data for the table
    const tableData = [];
  
    // Get all nutrient names
    const nutrientNames = Object.keys(bahan[0]).filter(key => !['id', 'nama', 'gambar'].includes(key));
  
    // Header row: nutrient names
    tableData.push(["Nama Bahan", ...nutrientNames]);
  
    // Data rows: bahan names and their nutrient values
    menuList.forEach(menu => {
      const bahanData = bahan.find(item => item.nama.toLowerCase() === menu.nama.toLowerCase());
      if (bahanData) {
        const rowData = [menu.nama];
        nutrientNames.forEach(nutrient => {
          const value = ((menu.berat / 100) * bahanData[nutrient]).toFixed(2);
          rowData.push(value);
        });
        tableData.push(rowData);
      }
    });
  
    // Total row: total nutrient values of all bahan
    const totalRow = ["Total"];
    nutrientNames.forEach(nutrient => {
      const totalValue = totalValues[nutrient].toFixed(2);
      totalRow.push(totalValue);
    });
    tableData.push(totalRow);
  
    // Convert tableData to text format
    const textData = tableData.map(row => row.join('\t')).join('\n');
  
    // Copy text to clipboard
    navigator.clipboard.writeText(textData)
      .then(() => alert('Data berhasil disalin ke clipboard.'))
      .catch(() => alert('Gagal menyalin data ke clipboard.'));
  };
  

  const copyMacroToClipboard = () => {
    if (!totalValues) {
      alert('Hitung nilai terlebih dahulu sebelum menyalin.');
      return;
    }
  
    // Prepare data for the table
    const tableData = [];
  
    // Nutrient names for macro
    const macroNutrients = ['energi', 'karbohidrat', 'protein', 'lemak'];
    
    // Header row: nutrient names
    tableData.push(["Nama Bahan", ...macroNutrients]);
  
    // Data rows: bahan names and their nutrient values
    menuList.forEach(menu => {
      const bahanData = bahan.find(item => item.nama.toLowerCase() === menu.nama.toLowerCase());
      if (bahanData) {
        const rowData = [menu.nama];
        macroNutrients.forEach(nutrient => {
          const value = ((menu.berat / 100) * bahanData[nutrient]).toFixed(2);
          rowData.push(value);
        });
        tableData.push(rowData);
      }
    });
  
    // Total row: total nutrient values of all bahan
    const totalRow = ["Total"];
    macroNutrients.forEach(nutrient => {
      const totalValue = totalValues[nutrient].toFixed(2);
      totalRow.push(totalValue);
    });
    tableData.push(totalRow);
  
    // Convert tableData to text format
    const textData = tableData.map(row => row.join('\t')).join('\n');
  
    // Copy text to clipboard
    navigator.clipboard.writeText(textData)
      .then(() => alert('Data berhasil disalin ke clipboard.'))
      .catch(() => alert('Gagal menyalin data ke clipboard.'));
  };
  

  return (
    <div className='max-w-[1640px] mx-auto flex flex-col justify-center items-center px-8 py-4 sm:px-10 md:px-16 lg:px-24'>
      <div className=' flex flex-col w-full border-2 border-green-800 rounded-md '>
        <h1 className=' px-4 py-2 w-full bg-green-800 text-white tracking-wider font-semibold text-sm md:text-base'>Buat Menu Makan</h1>

        {showMenu && (
          <div className='py-8 flex flex-col justify-center items-center w-auto gap-5' id="divTampilkan">
            {menuList.map((menu, index) => (
              <div className="flex flex-row gap-2 items-center" key={index}>
                <p className="border border-green-800 flex flex-row justify-start text-left items-center px-4 py-2 rounded-md text-xs md:text-sm lg:text-base w-[160px]">{menu.nama}</p>
                <p className="border border-green-800 flex flex-row justify-center items-center px-2 py-2 rounded-md text-xs md:text-sm lg:text-base min-w-[60px]">{menu.berat} g</p>
                <button className="border border-red-800 hover:bg-red-800 bg-white flex flex-row justify-center items-center px-2 rounded-md text-xl max-w-[40px] text-red-800 hover:text-white" onClick={() => hapusMenu(index)}> - </button>
              </div>
            ))}
          </div>
        )}

        <div className='py-8 px-8 flex flex-col  items-center w-auto gap-4'>
          <div className='flex flex-row justify-between items-center w-full'>
            <div className='flex flex-col justify-center items-start w-[140px] sm:w-[240px] md:w-[340px] lg:w-[550px] '>
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
            <div className='flex flex-col justify-center items-start max-w-[85px] sm:w-[120px] lg:w-[200px]'>
              <label className='text-sm font-medium pb-1 md:text-base text-green-800' htmlFor="">Berat</label>
              <input className='border border-green-800 w-full rounded-md focus:outline-none py-1 px-4 placeholder:text-xs bg-transparent lg:py-2' type="number" placeholder='Berat (g)' value={beratInput} onChange={(e) => setBeratInput(e.target.value)} />
            </div>
            <div className='justify-center items-center hidden sm:flex'>
              <button className='border border-green-800 hover:scale-105 px-4 rounded-md w-[100px] py-1 duration-150 mt-7 lg:w-[160px] lg:py-2' onClick={tambahMenu}>Tambah</button>
            </div>
            <div className='justify-center items-center hidden lg:flex'>
              <button className='border border-green-800 bg-green-800 hover:bg-white w-[150px] sm:w-full px-4 rounded-md py-1 sm:py-2 text-white hover:text-black hover:scale-105 duration-200 lg:mt-7 lg:w-[160px]' onClick={hitungDetailZat}>Hitung</button>
            </div>
          </div>

          <div className='flex flex-row w-full items-center gap-6 lg:hidden'>
            <button className='border border-green-800 hover:scale-105 px-4 rounded-md w-[280px] py-1 duration-150 sm:hidden' onClick={tambahMenu}>Tambah</button>
            <button className='border border-green-800 bg-green-800 hover:bg-white w-[150px] sm:w-full px-4 rounded-md py-1 sm:py-2 text-white hover:text-black hover:scale-105 duration-200 lg:hidden' onClick={hitungDetailZat}>Hitung</button>
          </div>

        </div>

      </div>
      <div className="w-full" id="tampilDetail">
        <h2 className="text-xl font-semibold text-green-800 my-4">Detail Zat Gizi</h2>
        {calculatedValues && (
          <div className="flex flex-col gap-8 sm:gap-12">
            {menuList.map((menu, index) => (
              <DetailZatGizi
                key={index}
                nama={menu.nama}
                berat={menu.berat}
                copyAllToClipboard={copyAllToClipboard}
                copyMacroToClipboard={copyMacroToClipboard} // Pass the function as a prop
              />
            ))}
          </div>
        )}
        {totalValues && (
          <div className='w-full flex flex-col gap-4 mt-12'>

            <div className=' flex flex-col justify-center items-center w-full border-2 border-green-800 rounded-md'>
              <div className="w-full flex flex-row bg-green-800">
                <h1 className=' px-4 py-3 md:py-4 w-full  text-white tracking-wider font-semibold text-sm md:text-base md:pl-52'>Total</h1>
                <div className="py-2 px-2 flex flex-row bg-green-800 gap-4 sm:pr-4 md:pr-8 lg:pr-16 md:py-3">
                  <button className="px-2 text-xs md:text-sm border border-white text-white hover:bg-white hover:text-green-800 bg-green-800 rounded-md group" onClick={copyAllToClipboard}>
                    <p className="absolute rounded px-2 py-1 border border-green-800 -translate-y-12 md:-translate-y-[56px] -translate-x-2 hidden group-hover:flex">Salin semua nilai zat</p>
                    <p>All</p>
                  </button><button className="px-2 text-xs md:text-sm border border-white text-white hover:bg-white hover:text-green-800 bg-green-800 rounded-md group" onClick={copyMacroToClipboard}>
                    <p className="absolute rounded px-2 py-1 border border-green-800 -translate-y-12 md:-translate-y-[56px] -translate-x-8 hidden group-hover:flex">Copy macro</p><p>Macro</p></button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 sm:gap-10 md:gap-10 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 py-8">
                {Object.entries(totalValues).map(([nutrient, value]) => (
                  <div key={nutrient} className='border-[1.5px] border-green-800 rounded-md max-w-[120px]'>
                    <p className='border-b-green-800 border-b-[1.5px] w-full text-white bg-green-800 px-2 py-1'>{nutrient}</p>
                    <p className='py-1 px-2'>{value.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        )}
      </div>
    </div>

  )
}

export default CreateMenu;

const DetailZatGizi = ({ nama, berat, copyNutrientValues }) => {
  const bahanData = bahan.find(item => item.nama.toLowerCase() === nama.toLowerCase());
  const calculatedValues = {};

  if (bahanData) {
    for (let key in bahanData) {
      if (key !== "id" && key !== "nama" && key !== "gambar") {
        calculatedValues[key] = (berat / 100) * bahanData[key];
      }
    }
  }

  const copyValuesToClipboard = (selectedNutrients) => {
    if (!calculatedValues) {
      alert('Hitung nilai terlebih dahulu sebelum menyalin.');
      return;
    }

    // Filter selected nutrients
    const filteredValues = {};
    selectedNutrients.forEach(nutrient => {
      filteredValues[nutrient] = calculatedValues[nutrient].toFixed(2);
    });

    // Extract nutrient titles and values
    const tableData = Object.entries(filteredValues);
    const [titles, values] = [[], []];

    tableData.forEach(([nutrient, value]) => {
      titles.push(nutrient);
      values.push(value);
    });

    // Create text data with nutrient titles and values in horizontal format
    const textData = titles.join('\t') + '\n' + values.join('\t');

    // Copy text to clipboard
    navigator.clipboard.writeText(textData)
      .then(() => alert('Data berhasil disalin ke clipboard.'))
      .catch(() => alert('Gagal menyalin data ke clipboard.'));
  };

  const copyAllValuesToClipboard = () => {
    const allNutrients = Object.keys(calculatedValues);
    copyValuesToClipboard(allNutrients);
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      <div className=' flex flex-col justify-center items-center w-full border-2 border-green-800 rounded-md'>
        <div className="w-full flex flex-row bg-green-800">
          <h1 className='px-4 py-3 md:py-4 w-full text-white tracking-wider font-semibold text-sm md:text-base md:pl-52'>{nama}</h1>
          <div className="py-2 px-2 flex flex-row bg-green-800 gap-4 sm:pr-4 md:pr-8 lg:pr-16 md:py-3">
            <button className="px-2 text-xs md:text-sm border border-white text-white hover:bg-white hover:text-green-800 bg-green-800 rounded-md group" onClick={copyAllValuesToClipboard}>
              <p className="absolute rounded px-2 py-1 border border-green-800 -translate-y-12 md:-translate-y-[56px] -translate-x-2 hidden group-hover:flex">Copy semua zat</p>
              <p>All</p>
            </button>
            <button className="px-2 text-xs md:text-sm border border-white text-white hover:bg-white hover:text-green-800 bg-green-800 rounded-md group" onClick={() => copyValuesToClipboard(["energi", "protein", "karbohidrat", "lemak"])}>
              <p className="absolute rounded px-2 py-1 border border-green-800 -translate-y-12 md:-translate-y-[56px] -translate-x-8 hidden group-hover:flex">Copy macro</p>
              <p>Macro</p>
            </button>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-6 sm:gap-10 md:gap-10 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 py-8'>
          {Object.entries(calculatedValues).map(([nutrient, value]) => (
            <div key={nutrient} className='border-[1.5px] border-green-800 rounded-md max-w-[120px]'>
              <p className='border-b-green-800 border-b-[1.5px] w-full text-white bg-green-800 px-2 py-1'>{nutrient}</p>
              <p className='py-1 px-2'>{value.toFixed(2)}</p> {/* Fixed to 2 decimal places */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

