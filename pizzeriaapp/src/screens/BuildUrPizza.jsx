import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BuildUrPizza = () => {
    const [ingredients, setIngredients] = useState([]);
    const [pizzas, setPizzas] = useState([]);
    const [selectedPizzaId, setSelectedPizzaId] = useState(null);
    const [checkedItems, setCheckedItems] = useState({});
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:4000/api/ingredients')
            .then(res => setIngredients(res.data))
            .catch(err => console.log(err));

        axios.get('http://localhost:4000/api/pizzas')
            .then(res => setPizzas(res.data))
            .catch(err => console.log(err));
    }, []);

    // When a pizza is selected, initialize checked items based on its toppings
    useEffect(() => {
        const pizza = pizzas.find(p => p._id === selectedPizzaId || p.id === selectedPizzaId);
        if (!pizza) {
            setCheckedItems({});
            setTotalCost(0);
            return;
        }

        // Map ingredients presence
        const mapping = {};
        ingredients.forEach(ing => {
            mapping[ing.tname] = pizza.topping.includes(ing.tname);
        });
        setCheckedItems(mapping);
        setTotalCost(pizza.price || 0);
    }, [selectedPizzaId, pizzas, ingredients]);

    // Recompute total cost when checked items change
    useEffect(() => {
        const pizza = pizzas.find(p => p._id === selectedPizzaId || p.id === selectedPizzaId);
        if (!pizza) return;

        let total = pizza.price || 0;

        ingredients.forEach(ing => {
            const inBase = pizza.topping.includes(ing.tname);
            const checked = !!checkedItems[ing.tname];

            if (checked && !inBase) total += ing.price; // added extra
            if (!checked && inBase) total -= ing.price; // removed from base
        });

        setTotalCost(total);
    }, [checkedItems, selectedPizzaId, pizzas, ingredients]);

    const handleCheckbox = (ing, event) => {
        const isChecked = event.target.checked;
        setCheckedItems(prev => ({ ...prev, [ing.tname]: isChecked }));
    };

    const handleBuild = () => {
        if (!selectedPizzaId) {
            alert('Please select a base pizza to customize');
            return;
        }

        const pizza = pizzas.find(p => p._id === selectedPizzaId || p.id === selectedPizzaId);
        const selectedToppings = Object.keys(checkedItems).filter(key => checkedItems[key]);

        const item = {
            name: `${pizza.name} (Custom)` ,
            price: totalCost,
            quantity: 1,
            image: pizza.image,
            toppings: selectedToppings
        };

        axios.post('http://localhost:4000/api/cart', item)
            .then(res => {
                alert('Custom Pizza added to cart!');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-4">
            <p className="text-center mb-4">Choose an existing pizza to customize, then add or remove toppings.</p>

            <div className="row mb-4">
                <div className="col-md-6">
                    <label className="form-label">Select Base Pizza</label>
                    <select className="form-select" value={selectedPizzaId || ''} onChange={(e) => setSelectedPizzaId(e.target.value)}>
                        <option value="">-- Select a pizza --</option>
                        {pizzas.map(p => (
                            <option key={p._id || p.id} value={p._id || p.id}>{p.name} - ₹{p.price}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-6">
                    {selectedPizzaId && (() => {
                        const pizza = pizzas.find(p => p._id === selectedPizzaId || p.id === selectedPizzaId);
                        if (!pizza) return null;
                        return (
                            <div className="d-flex align-items-center">
                                <img src={pizza.image} alt={pizza.name} style={{width:80, height:80, objectFit:'cover', borderRadius:8, marginRight:12}} />
                                <div>
                                    <div className="fw-bold">{pizza.name}</div>
                                    <div className="text-muted">Base Price: ₹{pizza.price}</div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </div>

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
                                            checked={!!checkedItems[ing.tname]}
                                            disabled={!selectedPizzaId}
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
                Total Cost : ₹{totalCost}.00
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