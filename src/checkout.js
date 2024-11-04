import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import './index.css';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cart, setCart, setCartTotal }) => {
    const [name, setName] = useState("");
    const [creditCard, setCreditCard] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        const totalAmount = cart.reduce((total, item) => total + item.price, 0);
        setCartTotal(totalAmount);
    }, [cart, setCartTotal]);

    const removeFromCart = (product) => {
        const updatedCart = cart.filter(item => item.id !== product.id);
        setCart(updatedCart);
    };

    const increaseQuantity = (product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
    };

    const decreaseQuantity = (product) => {
        const updatedCart = cart.filter(item => item.id !== product.id || (item.id === product.id && itemCount(product.id) > 1));
        setCart(updatedCart);
    };

    const itemCount = (id) => cart.filter((item) => item.id === id).length;

    const uniqueCartItems = Array.from(new Set(cart.map(item => item.id))).map(id => {
        return cart.find(item => item.id === id);
    });

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        // Handle payment logic here (e.g., API call to process payment)
        console.log("Payment Information Submitted:", { name, creditCard, address });
    };

    const navigate = useNavigate();

    return (
        <div className="bg-green-900 min-h-screen p-4">
            <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-center mx-auto">Your Shopping Cart</h2>
                    <button onClick={() => navigate('/')} className="px-4 py-2 bg-green-900 text-white rounded">Continue Shopping</button>
                </div>

                {/* Cart Items Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-600">Your cart is empty.</p>
                    ) : (
                        uniqueCartItems.map((product) => (
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
                                        onClick={() => decreaseQuantity(product)}
                                    >
                                        -
                                    </button>
                                    <span>{itemCount(product.id)}</span>
                                    <button
                                        className="px-3 py-1 bg-white text-black border border-black rounded"
                                        onClick={() => increaseQuantity(product)}
                                    >
                                        +
                                    </button>
                                    <button
                                        className="px-3 py-1 bg-red-600 text-white rounded"
                                        onClick={() => removeFromCart(product)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Cart Total */}
                <div className="mt-6">
                    <h3 className="text-lg font-bold">Total: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</h3>
                </div>

                {/* Payment Information Section */}
                <div className="mt-6">
                    <h3 className="text-2xl font-bold mb-4">Payment Information</h3>
                    <form onSubmit={handlePaymentSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full p-2 border rounded-md"
                                placeholder="Full Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Credit Card Number</label>
                            <input
                                type="text"
                                value={creditCard}
                                onChange={(e) => setCreditCard(e.target.value)}
                                required
                                className="w-full p-2 border rounded-md"
                                placeholder="1234 5678 9012 3456"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className="w-full p-2 border rounded-md"
                                placeholder="123 Main St, City, State, ZIP"
                            />
                        </div>
                    </form>
                </div>

                {/* Checkout Button */}
                {cart.length > 0 && (
                    <div className="mt-4">
                        <button
                            onClick={() => navigate('/confirm')}
                            className="px-4 py-2 bg-green-900 text-white rounded"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
