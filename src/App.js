import React from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Checkout from './checkout.js';
import Shop from './Shopping';
import Confirm from './Confirm.js';
import './index.css'; // or './tailwind.css' if that’s the file you created
function App() {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  return (
    <Router>
      <Routes>
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} cartTotal={cartTotal} setCartTotal={setCartTotal} />} />
        <Route
                    path="/confirm"
                    element={<Confirm setCart={setCart} />}
                />
        <Route path="/" element={<Shop cart={cart} setCart={setCart} cartTotal={cartTotal} setCartTotal={setCartTotal} />} /> {/* Default view */}
        
      </Routes>
    </Router>
  );
}

export default App;
