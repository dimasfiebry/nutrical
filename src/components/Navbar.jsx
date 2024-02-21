import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Menggunakan useNavigate
import { UilBars } from "@iconscout/react-unicons";
import { UilSearchAlt } from "@iconscout/react-unicons";
import { bahan } from "../data/bahan";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [showDatalist, setShowDatalist] = useState(false);
    const navigate = useNavigate(); // Menggunakan useNavigate

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setSearchInput(inputValue);
        if (inputValue.length >= 1) {
            setShowDatalist(true);
        } else {
            setShowDatalist(false);
        }
    };

    const handleSearchSubmit = () => {
        const ingredientExists = bahan.find(
            (b) => b.nama.toLowerCase() === searchInput.toLowerCase()
        );
        if (ingredientExists) {
            // Menggunakan navigate untuk navigasi ke halaman MaterialPage dengan input disertakan
            navigate(`/material-page/${encodeURIComponent(searchInput)}`);
        } else {
            alert("Bahan tidak ada dalam data.");
            console.log("hahahaha");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearchSubmit();
        }
    };

    return (
        <div className=" max-w-[1640px] mx-auto flex justify-between items-center px-8 py-4 sm:px-10 md:px-16 lg:px-24">
            <div className="flex flex-row justify-between items-center gap-8 w-full">
                <Link className="flex justify-center items-center" to="/">
                    <div className="flex justify-center items-center gap-0">
                        <img className="w-10" src="/assets/images/logo.png" alt="" />

                        <h1 className="text-green-900 font-extrabold tracking-wider hidden sm:flex">
                            utri<span className="text-yellow-600">C</span>al
                        </h1>
                    </div>
                </Link>

                <div className="hidden md:flex px-4">
                    <ul className=" flex flex-row justify-between items-center w-full gap-8 lg:gap-16">
                        <li>
                            <Link to="/">
                                <button className="text-green-800 text-sm lg:text-base hover:text-yellow-600 font-semibold">
                                    <p>Home</p>
                                </button>
                            </Link>
                        </li>

                        <li>
                            <Link to="/Food-Menu">
                                <button className="text-green-800 text-sm lg:text-base hover:text-yellow-600 font-semibold">
                                    <p>Menu Makan</p>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Daily-Menu">
                                <button className="text-green-800 text-sm lg:text-base hover:text-yellow-600 font-semibold">
                                    <p>Menu Harian</p>
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="bg-transparent flex flex-row px-2 w-[200px] p-1 border border-green-800 rounded-lg sm:w-[270px] md:w-[240px] lg:w-[300px]">
                    <UilSearchAlt className="text-green-800 " size={20} />
                    <input
                        className="w-full ml-2 text-sm placeholder:text-sm focus-within:outline-none"
                        type="text"
                        placeholder="cari bahan"
                        value={searchInput}
                        onChange={handleInputChange}
                        list={showDatalist ? "bahanList" : null}
                        onKeyDown={handleKeyDown} // Attach handleKeyDown event
                    />
                    {showDatalist && (
                        <datalist id="bahanList">
                            {bahan.map((b) => (
                                <option key={b.id} value={b.nama} />
                            ))}
                        </datalist>
                    )}
                </div>
                <div onClick={() => setNav(!nav)} className=" cursor-pointer md:hidden">
                    <UilBars size={25} className="text-green-800" />
                </div>

                {/* Mobile Menu */}

                {nav ? (
                    <div className="bg-black opacity-25 fixed w-full h-screen z-10 top-0 right-0"></div>
                ) : (
                    ""
                )}
                <div
                    className={
                        nav
                            ? "fixed top-0 w-full sm:w-[36%] md:w-[32%] lg:w-[28%]   right-0 h-screen bg-white z-10 transition-all ease-in-out duration-700"
                            : "fixed top-0 w-full sm:w-[36%] md:w-[32%] lg:w-[28%]   left-[100%] h-screen bg-white z-10 transition-all ease-in-out duration-700"
                    }
                >
                    <UilBars
                        onClick={() => setNav(!nav)}
                        size={30}
                        className=" absolute text-yellow-600 left-4 top-8 cursor-pointer"
                    />

                    <nav>
                        <ul className="flex flex-col gap-8 mt-16">
                            <li>
                                <Link to="/">
                                    <button className="text-green-800 text-sm lg:text-base hover:text-yellow-600 font-semibold">
                                        <p>Home</p>
                                    </button>
                                </Link>
                            </li>

                            <li>
                                <Link to="/Food-Menu">
                                    <button className="text-green-800 text-sm lg:text-base hover:text-yellow-600 font-semibold">
                                        <p>Menu Makan</p>
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Daily-Menu">
                                    <button className="text-green-800 text-sm lg:text-base hover:text-yellow-600 font-semibold">
                                        <p>Menu Harian</p>
                                    </button>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
