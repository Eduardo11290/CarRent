import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './CarDetail.css'; 

const CarDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cart.items);

    //State for the current car ---
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [days, setDays] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Fetch to find the specific car
        fetch('https://autorentpremium.runasp.net/api/cars')
            .then(res => res.json())
            .then(data => {
                // Search for the car across all categories
                const foundCar = data
                    .flatMap(category => category.cars)
                    .find(c => c.id === id);
                
                setCar(foundCar);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div style={{color:'white', textAlign:'center', marginTop:'100px'}}>Se încarcă detaliile...</div>;

    if (!car) {
        return (
            <div style={{padding: '100px', textAlign: 'center', background: '#000', minHeight: '100vh', color: 'white'}}>
                <h2>Mașina nu a fost găsită.</h2>
                <div onClick={() => navigate('/cars')} style={{color: '#ff4d4d', cursor: 'pointer', textDecoration: 'underline', marginTop: '20px'}}>
                    Înapoi la Flotă
                </div>
            </div>
        );
    }

    const isAdded = cartItems.some(item => item.id === car.id);

    const nextImage = () => setCurrentImgIndex((prev) => (prev === car.images.length - 1 ? 0 : prev + 1));
    const prevImage = () => setCurrentImgIndex((prev) => (prev === 0 ? car.images.length - 1 : prev - 1));

    const handleCalculate = () => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = end - start;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

            if (diffDays > 0) {
                setDays(diffDays);
                setTotalPrice(diffDays * car.cost);
            } else {
                alert("Data de returnare incorectă!");
            }
        } else {
            alert("Te rog selectează ambele date!");
        }
    };

    const handleAddToCart = () => {
        if (!isAdded) {
            let finalStart = startDate;
            let finalEnd = endDate;
            let rentalDays = days;

            if (!startDate || !endDate) {
                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);

                finalStart = today.toISOString().split('T')[0];
                finalEnd = tomorrow.toISOString().split('T')[0];
                rentalDays = 1;
            }

            dispatch(addItem({ 
                ...car, 
                quantity: rentalDays > 0 ? rentalDays : 1,
                startDate: finalStart,
                endDate: finalEnd
            }));
        }
    };

    return (
        <div className="car-detail-page">
            <div className="detail-container" style={{paddingTop: '40px'}}>
                <div className="left-content">
                    <div onClick={() => navigate(-1)} style={{ color: '#aaa', cursor: 'pointer', marginBottom: '20px', display: 'inline-flex', alignItems: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        <span>‹</span> &nbsp; ÎNAPOI LA LISTĂ
                    </div>

                    <h1 className="car-title">{car.name}</h1>
                    
                    <div className="image-gallery-box">
                        <img src={car.images[currentImgIndex]} alt={car.name} className="main-image" />
                        {car.images.length > 1 && (
                            <>
                                <button className="slider-btn left-btn" onClick={prevImage}>❮</button>
                                <button className="slider-btn right-btn" onClick={nextImage}>❯</button>
                                <div className="slide-counter">{currentImgIndex + 1} / {car.images.length}</div>
                            </>
                        )}
                    </div>
                    
                    <div className="section-card">
                        <h3>Despre Mașină</h3>
                        <p style={{lineHeight: '1.6', color: '#ccc', marginBottom: '20px', fontSize: '1.05rem'}}>
                            {car.description}
                        </p>
                        
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', background: '#1a1a1a', padding: '20px', borderRadius: '15px'}}>
                            {car.specs && Object.entries(car.specs).map(([key, value]) => (
                                <div key={key} style={{display: 'flex', flexDirection: 'column'}}>
                                    <span style={{fontSize: '12px', color: '#888', textTransform: 'uppercase'}}>{key}</span>
                                    <span style={{fontWeight: 'bold', color: 'white'}}>{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="features-container">
                        <h3 className="section-title" style={{marginTop: '40px', marginBottom: '20px'}}>Dotări și Echipamente</h3>
                        {car.features && (
                            <>
                                <details className="feature-accordion" open>
                                    <summary>Audio și Tehnologie</summary>
                                    <ul className="feature-list">{car.features.audio && car.features.audio.map((item, i) => <li key={i}>✓ {item}</li>)}</ul>
                                </details>
                                <details className="feature-accordion">
                                    <summary>Confort</summary>
                                    <ul className="feature-list">{car.features.comfort && car.features.comfort.map((item, i) => <li key={i}>✓ {item}</li>)}</ul>
                                </details>
                                <details className="feature-accordion">
                                    <summary>Siguranță</summary>
                                    <ul className="feature-list">{car.features.safety && car.features.safety.map((item, i) => <li key={i}>✓ {item}</li>)}</ul>
                                </details>
                            </>
                        )}
                    </div>
                </div>

                <div className="right-sidebar">
                    <div className="calculator-card">
                        <div className="price-tag">
                            €{car.cost} <span style={{fontSize: '14px', color: '#888', fontWeight: 'normal'}}>/ zi</span>
                        </div>

                        <div className="calc-inputs">
                            <div className="date-group">
                                <div className="date-field">
                                    <label>📅 Preluare</label>
                                    <input type="date" onChange={(e) => setStartDate(e.target.value)} className="premium-date-input"/>
                                </div>
                                <div className="date-field">
                                    <label>📅 Returnare</label>
                                    <input type="date" onChange={(e) => setEndDate(e.target.value)} className="premium-date-input"/>
                                </div>
                            </div>
                            <button onClick={handleCalculate} className="calc-btn">Calculează Preț</button>
                        </div>

                        {totalPrice > 0 && (
                            <div className="result-box">
                                <div className="result-row"><span>Durată:</span><strong>{days} Zile</strong></div>
                                <div className="result-total"><span>Total:</span><strong>€{totalPrice}</strong></div>
                                <button 
                                    className="finalize-btn"
                                    onClick={handleAddToCart}
                                    disabled={isAdded}
                                    style={{ backgroundColor: isAdded ? '#333' : '#ff4d4d', color: isAdded ? '#777' : 'white', cursor: isAdded ? 'default' : 'pointer', marginTop: '15px', width: '100%', padding: '15px', border: 'none', borderRadius: '8px', fontWeight: 'bold', textTransform: 'uppercase'}}
                                >
                                    {isAdded ? 'Rezervat ✓' : 'Rezervă Acum'}
                                </button>
                            </div>
                        )}
                        
                         {totalPrice === 0 && (
                             <button className="finalize-btn" onClick={handleAddToCart} disabled={isAdded} style={{backgroundColor: isAdded ? '#333' : '#ff4d4d', color: isAdded ? '#777' : 'white', cursor: isAdded ? 'default' : 'pointer', marginTop: '15px', width: '100%', padding: '15px', border: 'none', borderRadius: '8px', fontWeight: 'bold', textTransform: 'uppercase'}}>
                                 {isAdded ? 'Rezervat ✓' : 'Rezervă Acum (Rapid)'}
                             </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetail;