import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import './index.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const Shop = ({cart,setCart,cartTotal,setCartTotal}) => {
    const [catalog, setCatalog] = useState([]);
    const [filteredCatalog, setFilteredCatalog] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const response = await fetch("./products.json");
                const data = await response.json();
                setCatalog(data);
                setFilteredCatalog(data); // Initialize filteredCatalog with all products
            } catch (error) {
                console.error("Error fetching catalog:", error);
            }
        };
        fetchCatalog();
    }, []);

    useEffect(() => {
        const totalAmount = cart.reduce((total, item) => total + item.price, 0);
        setCartTotal(totalAmount);
    }, [cart]);

    const itemCount = (id) => cart.filter((item) => item.id === id).length;

    const addToCart = (product) => {
        if (itemCount(product.id) >= 10) return;
        setCart((prevCart) => [...prevCart, product]);
    };

    const removeFromCart = (product) => {
        const itemIndex = cart.findIndex((item) => item.id === product.id);
        if (itemIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart.splice(itemIndex, 1);
            setCart(updatedCart);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = catalog.filter((product) =>
            product.title.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
        setFilteredCatalog(filtered);
    };

    const navigate = useNavigate();
    return (
        <div className="bg-green-900 min-h-screen p-4">
            <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-center mx-auto">Cade and Henry's Camping Shop</h2>
                    <button onClick={() => navigate('/checkout')} className="px-4 py-2 bg-green-900 text-white rounded">Checkout</button>
                </div>

                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search"
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                {/* Catalog Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {filteredCatalog.map((product) => (
                        <div key={product.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                            <img
                                className="w-32 h-32 object-cover rounded mb-4"
                                src={product.image}
                                alt={product.title}
                            />
                            <h4 className="text-lg font-semibold text-center">{product.title}</h4>
                            <p className="text-gray-500 text-center mb-2">{product.category}</p>
                            <p className="text-green-900 font-bold text-center mb-4">${product.price}</p>

                            {/* Add and Remove Buttons */}
                            <div className="flex items-center space-x-2">
                                <button
                                    className="px-3 py-1 bg-white text-black border border-black rounded"
                                    onClick={() => removeFromCart(product)}
                                >
                                    -
                                </button>
                                <span>{itemCount(product.id)}</span>
                                <button
                                    className="px-3 py-1 bg-white text-black border border-black rounded"
                                    onClick={() => addToCart(product)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;
