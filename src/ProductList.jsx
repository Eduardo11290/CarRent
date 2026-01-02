import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './ProductList.css';
import CartItem from './CartItem';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const dispatch = useDispatch();

    // Noua structură de date pentru MAȘINI
    const carsArray = [
        {
            category: "Economic & Compact",
            cars: [
                { 
                    name: "Toyota Corolla", 
                    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=1000&auto=format&fit=crop", 
                    description: "Consum redus, ideală pentru oraș. 5 locuri.", 
                    cost: "$35" 
                },
                { 
                    name: "Volkswagen Golf", 
                    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1000&auto=format&fit=crop", 
                    description: "Hatchback fiabil, ușor de parcat.", 
                    cost: "$40" 
                },
                { 
                    name: "Ford Focus", 
                    image: "https://images.unsplash.com/photo-1627454819213-f77f30010836?q=80&w=1000&auto=format&fit=crop", 
                    description: "Dinamică și confortabilă pentru drumuri medii.", 
                    cost: "$38" 
                }
            ]
        },
        {
            category: "Luxury & Executive",
            cars: [
                { 
                    name: "Mercedes-Benz S-Class", 
                    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000&auto=format&fit=crop", 
                    description: "Eleganță supremă și confort de top.", 
                    cost: "$200" 
                },
                { 
                    name: "BMW Seria 7", 
                    image: "https://images.unsplash.com/photo-1555215695-3004980adade?q=80&w=1000&auto=format&fit=crop", 
                    description: "Performanță sportivă într-o limuzină de lux.", 
                    cost: "$190" 
                },
                { 
                    name: "Audi A8", 
                    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1000&auto=format&fit=crop", 
                    description: "Tehnologie avansată și interior spațios.", 
                    cost: "$185" 
                }
            ]
        },
        {
            category: "SUV & Family",
            cars: [
                { 
                    name: "Range Rover Sport", 
                    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=1000&auto=format&fit=crop", 
                    description: "Puternic, spațios, perfect pentru orice teren.", 
                    cost: "$150" 
                },
                { 
                    name: "Volvo XC90", 
                    image: "https://images.unsplash.com/photo-1605218427306-633ba80c979d?q=80&w=1000&auto=format&fit=crop", 
                    description: "Cel mai sigur SUV pentru familia ta.", 
                    cost: "$130" 
                }
            ]
        },
        {
            category: "Electric & Hybrid",
            cars: [
                { 
                    name: "Tesla Model 3", 
                    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop", 
                    description: "Autonomie mare, pilot automat inclus.", 
                    cost: "$110" 
                },
                { 
                    name: "Porsche Taycan", 
                    image: "https://images.unsplash.com/photo-1611016186353-9af29c7e7d80?q=80&w=1000&auto=format&fit=crop", 
                    description: "Viteză electrică pură și design futurist.", 
                    cost: "$250" 
                }
            ]
        }
    ];

    // Stilul a fost schimbat din Verde (#4CAF50) in Gri Inchis/Navy (#2c3e50)
    const styleObj = {
        backgroundColor: '#2c3e50',
        color: '#fff',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    };

    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        paddingRight: '20px'
    };

    const styleA = {
        color: 'white',
        fontSize: '18px',
        textDecoration: 'none',
        fontWeight: 'bold',
        cursor: 'pointer'
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handleCarsClick = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart((prevState) => ({
            ...prevState,
            [product.name]: true,
        }));
    };

    return (
        <div className="main-container">
            {/* Navbar */}
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        {/* Iconita masina in loc de planta */}
                        <img src="https://cdn-icons-png.flaticon.com/512/3202/3202926.png" alt="car-logo" style={{width: '50px', filter: 'invert(1)'}} />
                        <a href="/" onClick={handleHomeClick} style={{textDecoration: 'none'}}>
                            <div>
                                <h3 style={{ color: 'white', margin: 0 }}>AutoRent Premium</h3>
                                <i style={{ color: '#ccc', fontSize: '14px' }}>Drive the Experience</i>
                            </div>
                        </a>
                    </div>
                </div>

                <div style={styleObjUl}>
                    <div><a href="#" onClick={handleCarsClick} style={styleA}>Flota Auto</a></div>
                    <div>
                        <a href="#" onClick={handleCartClick} style={styleA}>
                            <div className="cart" style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                                <span style={{fontSize: '30px'}}>🛒</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Content Switcher: Lista Masini vs Cos */}
            {!showCart ? (
                <div className="product-grid" style={{padding: '20px'}}>
                    {carsArray.map((category, index) => (
                        <div key={index}>
                            <h2 style={{borderBottom: '2px solid #2c3e50', paddingBottom: '10px', marginTop: '30px', color: '#333'}}>
                                {category.category}
                            </h2>
                            <div className="product-list">
                                {category.cars.map((car, i) => (
                                    <div className="product-card" key={i} style={{borderColor: '#ddd'}}>
                                        <div className="image-container" style={{height: '200px', overflow: 'hidden'}}>
                                            <img className="product-image" src={car.image} alt={car.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                        </div>
                                        <div className="product-details" style={{padding: '10px'}}>
                                            <div className="product-title" style={{fontWeight: 'bold', fontSize: '1.2em'}}>{car.name}</div>
                                            <div className="product-description" style={{color: '#666', fontSize: '0.9em', margin: '10px 0'}}>{car.description}</div>
                                            <div className="product-cost" style={{color: '#2c3e50', fontWeight: 'bold', fontSize: '1.2em'}}>{car.cost} / zi</div>
                                            <button 
                                                className="product-button" 
                                                onClick={() => handleAddToCart(car)}
                                                style={{
                                                    backgroundColor: addedToCart[car.name] ? '#ccc' : '#2c3e50',
                                                    color: 'white',
                                                    border: 'none',
                                                    padding: '10px 20px',
                                                    cursor: addedToCart[car.name] ? 'default' : 'pointer',
                                                    borderRadius: '5px',
                                                    width: '100%',
                                                    marginTop: '10px'
                                                }}
                                                disabled={addedToCart[car.name]}
                                            >
                                                {addedToCart[car.name] ? 'Rezervat' : 'Rezervă Acum'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
