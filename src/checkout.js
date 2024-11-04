import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import './index.css';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cart, setCart, setCartTotal }) => {
    const [name, setName] = useState("");
    const [creditCard, setCreditCard] = useState("");
    const [address, setAddress] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);

    
    useEffect(() => {
        const total = cart.reduce((total, item) => total + item.price, 0);
        setCartTotal(total);
        setTotalAmount(total);
    }, [cart, setCartTotal]);

    const navigate = useNavigate();

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
    
        const orderDetails = {
            name,
            address,
            total: totalAmount,
        };
    
        // Navigate to confirmation page, passing credit card last 4 digits
        navigate('/confirm', { state: { orderDetails, cart, creditCard } });
    };


    return (
        <div className="bg-green-900 min-h-screen p-4">
            <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mx-auto">Checkout</h2>

                {/* Cart Items Summary */}
                <div className="text-left mb-6">
                    <h3 className="text-lg font-semibold mb-2">Items in Your Cart</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cart.map((item, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                                <img
                                    className="w-32 h-32 object-cover rounded mb-4"
                                    src={item.image}
                                    alt={item.title}
                                />
                                <h4 className="text-lg font-semibold text-center">{item.title}</h4>
                                <p className="text-green-900 font-bold text-center mb-4">${item.price}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cart Total */}
                <div className="mt-6">
                    <h3 className="text-lg font-bold">Total: ${totalAmount.toFixed(2)}</h3>
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
                                pattern="\d{4} \d{4} \d{4} \d{4}" // Pattern to match xxxx xxxx xxxx xxxx
                                title="Please enter a credit card number in the format: xxxx xxxx xxxx xxxx"
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

                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-900 text-white rounded"
                        >
                            Proceed to Checkout
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
