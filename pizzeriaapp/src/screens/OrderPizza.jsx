import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderPizza = () => {
  const [pizzas, setPizzas] = useState([]);

  // Fetch Pizzas on load
  useEffect(() => {
    axios.get('http://localhost:4000/api/pizzas')
      .then(res => setPizzas(res.data))
      .catch(err => console.log(err));
  }, []);

  const addToCart = (pizza) => {
    const item = {
        name: pizza.name,
        price: pizza.price,
        quantity: 1,
        image: pizza.image,
        toppings: pizza.topping
    };

    axios.post('http://localhost:4000/api/cart', item)
        .then(res => {
            alert(`${pizza.name} added to cart!`);
        })
        .catch(err => console.log(err));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {pizzas.map(pizza => (
          <div className="col-md-6 mb-4" key={pizza.id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <div className="row">
                    <div className="col-8">
                        <h5 className="card-title">{pizza.name}</h5>
                        <div className="mb-2">
                            <span className={pizza.type === 'veg' ? 'veg-icon' : 'nonveg-icon'}></span>
                            <span className="text-muted text-uppercase" style={{fontSize: '0.8rem'}}>{pizza.type}</span>
                        </div>
                        <h6 className="card-subtitle mb-2 text-muted">₹{pizza.price}.00</h6>
                        <p className="card-text small">{pizza.description}</p>
                        <p className="card-text small"><b>Ingredients:</b> {pizza.ingredients.join(", ")}</p>
                        <p className="card-text small"><b>Toppings:</b> {pizza.topping.join(", ")}</p>
                        
                        <button 
                            className="btn btn-warning btn-sm mt-2" 
                            onClick={() => addToCart(pizza)}>
                            Add to Cart
                        </button>
                    </div>
                    <div className="col-4 d-flex align-items-center">
                        <img 
                            src={pizza.image}
                            alt={pizza.name}
                            className="img-fluid rounded-circle"
                            style={{width: '120px', height: '120px', objectFit: 'cover'}}
                        />
                    </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPizza;