import React, { useEffect, useState } from 'react';
import { pizzaAPI, cartAPI } from '../services/apiService';

const OrderPizza = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await pizzaAPI.getAll();
        setPizzas(data);
      } catch (err) {
        setError('Failed to load pizzas. Please try again later.');
        console.error('Error fetching pizzas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  const addToCart = async (pizza) => {
    try {
      setAddingToCart(pizza.id || pizza._id);
      const item = {
        name: pizza.name,
        price: pizza.price,
        quantity: 1,
        image: pizza.image,
        toppings: pizza.topping || [],
      };

      await cartAPI.add(item);
      alert(`${pizza.name} added to cart!`);
    } catch (err) {
      alert('Failed to add item to cart. Please try again.');
      console.error('Error adding to cart:', err);
    } finally {
      setAddingToCart(null);
    }
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
      <div className="row">
        {pizzas.map((pizza) => {
          const pizzaId = pizza.id || pizza._id;
          const isAdding = addingToCart === pizzaId;
          return (
            <div className="col-md-6 mb-4" key={pizzaId}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col-8">
                      <h5 className="card-title">{pizza.name}</h5>
                      <div className="mb-2">
                        <span
                          className={
                            pizza.type === 'veg' ? 'veg-icon' : 'nonveg-icon'
                          }
                        ></span>
                        <span className="text-muted text-uppercase pizza-type">
                          {pizza.type}
                        </span>
                      </div>
                      <h6 className="card-subtitle mb-2 text-muted">
                        ₹{pizza.price}.00
                      </h6>
                      <p className="card-text small">{pizza.description}</p>
                      <p className="card-text small">
                        <b>Ingredients:</b> {pizza.ingredients?.join(', ') || 'N/A'}
                      </p>
                      <p className="card-text small">
                        <b>Toppings:</b> {pizza.topping?.join(', ') || 'N/A'}
                      </p>
                      <button
                        className="btn btn-warning btn-sm mt-2"
                        onClick={() => addToCart(pizza)}
                        disabled={isAdding}
                      >
                        {isAdding ? 'Adding...' : 'Add to Cart'}
                      </button>
                    </div>
                    <div className="col-4 d-flex align-items-center">
                      <img
                        src={pizza.image}
                        alt={pizza.name}
                        className="img-fluid rounded-circle pizza-image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderPizza;