import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);

  const fetchCart = () => {
    axios.get('http://localhost:4000/api/cart')
      .then(res => setCart(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => { fetchCart(); }, []);

  const deleteItem = (id) => {
      axios.delete(`http://localhost:4000/api/cart/${id}`)
        .then(() => fetchCart());
  };

  const updateQty = (id, currentQty, amount) => {
      const newQty = currentQty + amount;
      if(newQty < 1) return; // Prevent going below 1

      axios.put(`http://localhost:4000/api/cart/${id}`, { quantity: newQty })
        .then(() => fetchCart());
  };

  const calculateTotal = () => {
      return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  return (
    <div className="container mt-4">
        <h2 className="mb-4">Shopping Cart</h2>
        
        {cart.length === 0 ? (
            <div className="alert alert-info">Your cart is empty.</div>
        ) : (
            <div className="row">
                <div className="col-md-8">
                    {cart.map(item => (
                        <div className="card mb-3 shadow-sm" key={item._id}>
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <img 
                                            src={item.image} 
                                            className="img-fluid rounded" 
                                            alt={item.name}
                                            style={{height: '80px', width: '80px', objectFit:'cover'}}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <h5 className="mb-1">{item.name}</h5>
                                        {/* Show toppings if they exist */}
                                        {item.toppings && item.toppings.length > 0 && (
                                            <small className="text-muted">
                                                Toppings: {item.toppings.join(", ")}
                                            </small>
                                        )}
                                    </div>
                                    <div className="col-md-3">
                                        <div className="input-group input-group-sm" style={{width: '100px'}}>
                                            <button className="btn btn-outline-secondary" onClick={() => updateQty(item._id, item.quantity, -1)}>-</button>
                                            <span className="form-control text-center">{item.quantity}</span>
                                            <button className="btn btn-outline-secondary" onClick={() => updateQty(item._id, item.quantity, 1)}>+</button>
                                        </div>
                                    </div>
                                    <div className="col-md-1 fw-bold">
                                        ₹{item.price * item.quantity}
                                    </div>
                                    <div className="col-md-1">
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteItem(item._id)}>
                                            X
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-warning text-white">
                            Order Summary
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <span>Subtotal</span>
                                <span>₹{calculateTotal()}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Tax (5%)</span>
                                <span>₹{Math.round(calculateTotal() * 0.05)}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between fw-bold mb-4">
                                <span>Grand Total</span>
                                <span>₹{Math.round(calculateTotal() * 1.05)}</span>
                            </div>
                            <button className="btn btn-dark text-warning w-100 fw-bold">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default Cart;