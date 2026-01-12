import React, { useEffect, useState } from 'react';
import { cartAPI } from '../services/apiService';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cartAPI.getAll();
      setCart(data);
    } catch (err) {
      setError('Failed to load cart. Please try again later.');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const deleteItem = async (id) => {
    try {
      setUpdating(id);
      await cartAPI.delete(id);
      await fetchCart();
    } catch (err) {
      alert('Failed to delete item. Please try again.');
      console.error('Error deleting item:', err);
    } finally {
      setUpdating(null);
    }
  };

  const updateQty = async (id, currentQty, amount) => {
    const newQty = currentQty + amount;
    if (newQty < 1) return; // Prevent going below 1

    try {
      setUpdating(id);
      await cartAPI.update(id, { quantity: newQty });
      await fetchCart();
    } catch (err) {
      alert('Failed to update quantity. Please try again.');
      console.error('Error updating quantity:', err);
    } finally {
      setUpdating(null);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return Math.round(calculateTotal() * 0.05);
  };

  const calculateGrandTotal = () => {
    return Math.round(calculateTotal() * 1.05);
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="loading-spinner">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cart.map((item) => {
              const itemId = item._id;
              const isUpdating = updating === itemId;
              return (
                <div className="card mb-3 shadow-sm" key={itemId}>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-3">
                        <img
                          src={item.image}
                          className="img-fluid rounded cart-item-image"
                          alt={item.name}
                        />
                      </div>
                      <div className="col-md-4">
                        <h5 className="mb-1">{item.name}</h5>
                        {item.toppings && item.toppings.length > 0 && (
                          <small className="text-muted">
                            Toppings: {item.toppings.join(', ')}
                          </small>
                        )}
                      </div>
                      <div className="col-md-3">
                        <div className="input-group input-group-sm quantity-control">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => updateQty(itemId, item.quantity, -1)}
                            disabled={isUpdating}
                          >
                            -
                          </button>
                          <span className="form-control text-center">
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => updateQty(itemId, item.quantity, 1)}
                            disabled={isUpdating}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-1 fw-bold">
                        ₹{item.price * item.quantity}
                      </div>
                      <div className="col-md-1">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteItem(itemId)}
                          disabled={isUpdating}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
                  <span>₹{calculateTax()}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold mb-4">
                  <span>Grand Total</span>
                  <span>₹{calculateGrandTotal()}</span>
                </div>
                <button className="btn btn-dark text-warning w-100 fw-bold">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;