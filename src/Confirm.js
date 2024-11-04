// Confirm.js
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Confirm = ({ setCart }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const orderDetails = location.state?.orderDetails;
    const cart = location.state?.cart || [];
    const creditCard = location.state?.creditCard || "";

    // Redact credit card information
    const maskedCreditCard = `**** **** **** ${creditCard.slice(-4)}`;

    const handleContinueShopping = () => {
        setCart([]); // Clear the cart
        navigate('/'); // Navigate back to the shop
    };

    if (!orderDetails) {
        return (
            <div className="bg-green-900 min-h-screen flex items-center justify-center p-4">
                <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
                    <p className="text-gray-700 mb-4">
                        It looks like there was an issue with your order. Please try again.
                    </p>
                    <button
                        onClick={handleContinueShopping}
                        className="px-4 py-2 bg-green-900 text-white rounded"
                    >
                        Return to Shop
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-green-900 min-h-screen flex items-center justify-center p-4">
            <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Thank You for Your Purchase!</h2>
                <p className="text-gray-700 mb-4">
                    Your order has been successfully processed and will be shipped to you shortly.
                </p>

                {/* Order Summary Section */}
                <div className="text-left mb-6">
                    <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                    <p><strong>Name:</strong> {orderDetails.name}</p>
                    <p><strong>Address:</strong> {orderDetails.address}</p>
                    <p><strong>Credit Card:</strong> {maskedCreditCard}</p>
                </div>

                {/* Items Purchased Section */}
                <div className="text-left mb-6">
                    <h3 className="text-lg font-semibold mb-2">Items Purchased</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cart.map((item, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                                <img
                                    className="w-32 h-32 object-cover rounded mb-4"
                                    src={item.image}
                                    alt={item.title}
                                />
                                <h4 className="text-lg font-semibold text-center">{item.title}</h4>
                                <p className="text-green-900 font-bold text-center mb-4">${item.price.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Total and Price Breakdown */}
                <div className="text-left mb-6">
                    <h3 className="text-lg font-semibold mb-2">Total Purchase Amount</h3>
                    <p><strong>Total:</strong> ${orderDetails.total.toFixed(2)}</p>
                </div>

                <button
                    onClick={handleContinueShopping}
                    className="px-4 py-2 bg-green-900 text-white rounded"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default Confirm;
