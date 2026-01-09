import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'; // <--- (1) Am adăugat useLocation
import './ProductList.css';
import { addItem } from './CartSlice';

function ProductList() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const location = useLocation(); // <--- (2) Hook pentru a citi URL-ul (hash-ul)
    
    const [carsData, setCarsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://autorentpremium.runasp.net/api/cars')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCarsData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Eroare la preluarea datelor:", error);
                setLoading(false);
            });

        // --- (3) COD NOU: SCROLL AUTOMAT LA CATEGORIE ---
        // Verificăm dacă există un hash în URL (ex: #cat-0)
        if (location.hash) {
            const id = location.hash.replace('#', '');
            // Așteptăm puțin (500ms) ca să fim siguri că datele s-au randat pe ecran
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        }
        // -----------------------------------------------

    }, [location]); // Se re-execută dacă se schimbă URL-ul

    const saveScrollPosition = () => {
        sessionStorage.setItem('scrollPosition', window.scrollY);
    };

    const isAddedToCart = (carId) => {
        return cartItems.some(item => item.id === carId);
    };

    const handleAddToCart = (product) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const startDate = today.toISOString().split('T')[0];
        const endDate = tomorrow.toISOString().split('T')[0];

        dispatch(addItem({
            ...product,
            quantity: 1,
            startDate: startDate,
            endDate: endDate
        }));
    };

    if (loading) {
        return <div style={{color: 'white', textAlign: 'center', marginTop: '100px'}}><h2>Se încarcă flota...</h2></div>;
    }

    return (
        <div className="main-container">
            <div className="product-grid">
                {carsData.map((category, index) => (
                    // ID-ul este critic pentru scroll: cat-0, cat-1...
                    <div key={index} id={`cat-${index}`} style={{ marginBottom: '50px', scrollMarginTop: '100px' }}>
                        <h2>{category.category}</h2>
                        
                        <div className="product-list">
                            {category.cars.map((car) => (
                                <div className="product-card" key={car.id}>
                                    <Link to={`/cars/${car.id}`} onClick={saveScrollPosition} style={{ height: '200px', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
                                        <img src={car.images && car.images.length > 0 ? car.images[0] : 'https://via.placeholder.com/300'} alt={car.name} />
                                        <div style={{position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'}}></div>
                                    </Link>
                                    
                                    <div style={{ padding: '25px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <h3 style={{ margin: '0 0 10px 0', color: 'white', fontSize: '1.4rem' }}>{car.name}</h3>
                                        <p style={{ color: '#aaa', fontSize: '14px', flexGrow: 1, lineHeight: '1.6', marginBottom: '20px' }}>
                                            {car.description ? car.description.substring(0, 80) : "Descriere indisponibilă"}...
                                        </p>
                                        
                                        <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#ff4d4d', marginBottom: '20px' }}>
                                            €{car.cost} <span style={{fontSize: '14px', color: '#888', fontWeight: 'normal'}}>/ zi</span>
                                        </div>

                                        <Link 
                                            to={`/cars/${car.id}`} 
                                            onClick={saveScrollPosition}
                                            style={{ 
                                                display: 'block', textAlign: 'center', textDecoration: 'none', color: 'white', 
                                                background: '#333', padding: '12px', borderRadius: '8px', marginBottom: '10px', fontWeight: '600', transition: '0.3s'
                                            }} 
                                            className="details-btn"
                                        >
                                            Vezi Detalii & Dotări
                                        </Link>

                                        <button 
                                            onClick={() => handleAddToCart(car)}
                                            disabled={isAddedToCart(car.id)}
                                            style={{
                                                width: '100%', 
                                                padding: '12px', 
                                                backgroundColor: isAddedToCart(car.id) ? '#444' : '#ff4d4d', 
                                                color: isAddedToCart(car.id) ? '#aaa' : 'white',
                                                border: 'none', 
                                                borderRadius: '6px', 
                                                cursor: isAddedToCart(car.id) ? 'default' : 'pointer', 
                                                fontWeight: 'bold',
                                                textTransform: 'uppercase'
                                            }}
                                        >
                                            {isAddedToCart(car.id) ? 'În Coș' : 'Rezervă Acum'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;