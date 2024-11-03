import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

const Shop = () => {
    const [catalog, setCatalog] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const someResponse = await fetch("./products.json");
            const data = await someResponse.json();
            setCatalog(data);
            console.log(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const total = () => {
            let totalAmount = 0;
            for (let i = 0; i < cart.length; i++) {
                totalAmount += cart[i].price;
            }
            setCartTotal(totalAmount);
            console.log(totalAmount);
        };
        total();
    }, [cart]);

    const howManyofThis = (id) => {
        let hmot = cart.filter((cartItem) => cartItem.id === id);
        return hmot.length;
    };

    const addToCart = (el) => {
        setCart([...cart, el]);
    };

    const removeFromCart = (el) => {
        let itemFound = false;
        const updatedCart = cart.filter((cartItem) => {
            if (cartItem.id === el.id && !itemFound) {
                itemFound = true;
                return false;
            }
            return true;
        });
        if (itemFound) {
            setCart(updatedCart);
        }
    };

    const listItems = catalog.map((el) => (
        <div className="row border-top border-bottom" key={el.id}>
            <div className="row main align-items-center">
                <div className="col-2">
                    <img className="img-fluid" src={el.image} alt={el.title} />
                </div>
                <div className="col">
                    <div className="row text-muted">{el.title}</div>
                    <div className="row">{el.category}</div>
                </div>
                <div className="col">
                    <button type="button" className="btn btn-light" onClick={() => removeFromCart(el)}> - </button>{" "}
                    <button type="button" className="btn btn-light" onClick={() => addToCart(el)}> + </button>
                </div>
                <div className="col">
                    ${el.price} <span className="close">&#10005;</span>{howManyofThis(el.id)}
                </div>
            </div>
        </div>
    ));

    const cartItems = cart.map((el, index) => (
        <div key={index}>
            <img className="img-fluid" src={el.image} width={150} alt={el.title} />
            {el.title} ${el.price}
        </div>
    ));

    return (
        <div>
            <h2>STORE SE/ComS3190</h2>
            <div className="card">
                <div className="row">
                    <div className="col-md-8 cart">
                        <div className="title">
                            <div className="row">
                                <div className="col">
                                    <h4><b>3190 Shopping Cart</b></h4>
                                </div>
                                <div className="col align-self-center text-right text-muted">
                                    <h4><b>Products selected {cart.length}</b></h4>
                                </div>
                                <div className="col align-self-center text-right text-muted">
                                    <h4><b>Order total: ${cartTotal}</b></h4>
                                </div>
                            </div>
                        </div>
                        <div>{listItems}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
