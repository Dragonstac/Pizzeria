import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BuildUrPizza = () => {
  const [ingredients, setIngredients] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  // Keep track of checked items: { "Pepperoni": true, "Mushroom": false }
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    axios.get('http://localhost:4000/api/ingredients')
      .then(res => setIngredients(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleCheckbox = (ing, event) => {
    const isChecked = event.target.checked;
    
    // Update State
    setCheckedItems(prev => ({ ...prev, [ing.tname]: isChecked }));
    
    // Update Price
    setTotalCost(prev => isChecked ? prev + ing.price : prev - ing.price);
  };

  const handleBuild = () => {
      // Get array of names where value is true
      const selectedToppings = Object.keys(checkedItems).filter(key => checkedItems[key]);

      if(selectedToppings.length === 0) {
          alert("Please select at least one topping!");
          return;
      }

      const item = {
          name: "Custom Built Pizza",
          price: totalCost,
          quantity: 1,
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR04C08iX1750iFk620G6tC50rV2jWd0C6w-Q&s", // Generic pizza image
          toppings: selectedToppings
      };

      axios.post('http://localhost:4000/api/cart', item)
        .then(res => {
            alert("Custom Pizza added to cart!");
            // Optional: Reset form
        })
        .catch(err => console.log(err));
  };

  return (
    <div className="container mt-4">
        <p className="text-center mb-4">Pizzeria now gives you options to build your own pizza. Customize your pizza by choosing ingredients from the list given below</p>
        
        <div className="table-responsive">
            <table className="table table-bordered align-middle">
                <tbody>
                    {ingredients.map(ing => (
                        <tr key={ing.id}>
                            <td style={{width: '100px'}} className="text-center">
                                <img 
                                    src={ing.image.replace('%22', '')} 
                                    width="50" 
                                    height="50" 
                                    alt={ing.tname} 
                                    style={{objectFit:'contain'}}
                                />
                            </td>
                            <td>
                                <div className="d-flex justify-content-between px-4">
                                    <span className="fw-bold">{ing.tname}</span>
                                    <span className="text-danger">₹{ing.price}.00</span>
                                </div>
                            </td>
                            <td style={{width: '100px'}} className="text-center">
                                <div className="form-check d-flex align-items-center justify-content-center">
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input border-warning" 
                                        onChange={(e) => handleCheckbox(ing, e)} 
                                        id={`check-${ing.id}`}
                                    />
                                    <label className="form-check-label ms-2 text-warning fw-bold" htmlFor={`check-${ing.id}`}>
                                        Add
                                    </label>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="mt-4 p-3 border border-dark text-primary fw-bold" style={{maxWidth: '300px'}}>
             Total Cost : {totalCost}
        </div>

        <div className="text-center mt-4">
            <button className="btn btn-black text-warning border-warning p-3 bg-dark" onClick={handleBuild}>
                Build Ur Pizza
            </button>
        </div>
    </div>
  );
};

export default BuildUrPizza;