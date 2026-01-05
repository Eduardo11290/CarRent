import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './ProductList.css';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    // --- AM ADĂUGAT CATEGORIA "features" LA FIECARE MAȘINĂ ---
    const carsData = [
        {
            category: "Economic & Compact",
            cars: [
                { 
                    id: "toyota-corolla",
                    name: "Toyota Corolla", 
                    image: "https://ireland.apollo.olxcdn.com/v1/files/xbnijot1n4hd3-AUTOVITRO/image;s=644x461", 
                    description: "Toyota Corolla este alegerea ideală pentru deplasările urbane și extraurbane.", 
                    cost: 45,
                    specs: { transmission: "Automată", fuel: "Hibrid", year: "2022", engine: "1.8L", power: "122 CP" },
                    features: {
                        audio: ["Apple CarPlay", "Android Auto", "Bluetooth", "Ecran tactil 8 inch"],
                        comfort: ["Climatronic", "Scaune încălzite", "Geamuri electrice", "Cotieră față"],
                        safety: ["ABS", "ESP", "Pilot automat adaptiv", "Senzori parcare", "Camera marșarier"]
                    }
                },
                { 
                    id: "vw-golf-8",
                    name: "Volkswagen Golf 8", 
                    image: "https://ireland.apollo.olxcdn.com/v1/files/mrfnp7hz7gm2-AUTOVITRO/image;s=644x461", 
                    description: "Volkswagen Golf 8 combină designul modern cu tehnologia avansată.", 
                    cost: 65,
                    specs: { transmission: "Automată", fuel: "Benzină", year: "2023", engine: "1.5 TSI", power: "150 CP" },
                    features: {
                        audio: ["Sistem Navigație Discover", "Comenzi vocale", "USB-C", "Digital Cockpit"],
                        comfort: ["Iluminare ambientală", "Volan piele", "Keyless Go", "Start-Stop"],
                        safety: ["Lane Assist", "Front Assist", "Airbag-uri cortină", "ISOFIX"]
                    }
                },
                { 
                    id: "ford-focus",
                    name: "Ford Focus", 
                    image: "https://ireland.apollo.olxcdn.com/v1/files/krkhq7w7tgfk2-AUTOVITRO/image;s=644x461", 
                    description: "Ford Focus oferă o experiență de condus plăcută și manevrabilitate excelentă.", 
                    cost: 58,
                    specs: { transmission: "Manuală", fuel: "Diesel", year: "2021", engine: "1.5 EcoBlue", power: "120 CP" },
                    features: {
                        audio: ["Radio SYNC 3", "Bluetooth", "6 difuzoare"],
                        comfort: ["Aer condiționat manual", "Oglinzi electrice", "Volan reglabil"],
                        safety: ["ABS", "ESP", "Asistență la plecarea din rampa"]
                    }
                }
            ]
        },
        {
            category: "Luxury & Executive",
            cars: [
                { 
                    id: "mercedes-s-class",
                    name: "Mercedes-Benz S-Class", 
                    image: "https://ireland.apollo.olxcdn.com/v1/files/hfsoh6is1nzg3-AUTOVITRO/image;s=644x461", 
                    description: "Mercedes-Benz S-Class reprezintă standardul suprem al luxului auto.", 
                    cost: 230,
                    specs: { transmission: "Automată", fuel: "Diesel", year: "2023", engine: "3.0L", power: "286 CP" },
                    features: {
                        audio: ["Sistem Burmester 3D", "MBUX Augmented Reality", "Tablete spate"],
                        comfort: ["Scaune cu masaj", "Suspensie pneumatică", "Piele Nappa", "Trapă panoramică"],
                        safety: ["Distronic Plus", "Night Vision", "Parcare autonomă", "Camere 360"]
                    }
                },
                { 
                    id: "bmw-7-series",
                    name: "BMW Seria 7", 
                    image: "https://ireland.apollo.olxcdn.com/v1/files/lucdujgwhjuv-AUTOVITRO/image;s=644x461", 
                    description: "BMW Seria 7 oferă un echilibru perfect între performanță sportivă și confort.", 
                    cost: 190,
                    specs: { transmission: "Automată", fuel: "Benzină", year: "2023", engine: "3.0L", power: "340 CP" },
                    features: {
                        audio: ["Harman Kardon", "Gesture Control", "Head-up Display"],
                        comfort: ["Soft Close", "Cheie cu display", "Perdeluțe electrice"],
                        safety: ["Driving Assistant Professional", "Laserlight", "BMW Drive Recorder"]
                    }
                }
            ]
        },
        {
            category: "SUV & Family",
            cars: [
                { 
                    id: "range-rover-sport",
                    name: "Range Rover Sport", 
                    image: "https://ireland.apollo.olxcdn.com/v1/files/8daz3offo1b72-AUTOVITRO/image;s=644x461", 
                    description: "Range Rover Sport este un SUV puternic și versatil.", 
                    cost: 150,
                    specs: { transmission: "Automată", fuel: "Diesel", year: "2022", engine: "3.0L", power: "300 CP" },
                    features: {
                        audio: ["Meridian Sound", "Pivi Pro", "Apple CarPlay Wireless"],
                        comfort: ["Suspensie aer", "Terrain Response", "Scaune ventilate"],
                        safety: ["Blind Spot Assist", "Wade Sensing", "ClearSight Mirror"]
                    }
                },
                { 
                    id: "volvo-xc90",
                    name: "Volvo XC90", 
                    image: "https://ireland.apollo.olxcdn.com/v1/files/zw86f7bxnm541-AUTOVITRO/image;s=644x461", 
                    description: "Volvo XC90 este SUV-ul perfect pentru familii, punând accent pe siguranță.", 
                    cost: 130,
                    specs: { transmission: "Automată", fuel: "Hibrid Plug-in", year: "2023", engine: "2.0L", power: "455 CP" },
                    features: {
                        audio: ["Bowers & Wilkins", "Google Automotive", "Subwoofer"],
                        comfort: ["7 Locuri", "Purificator aer", "Crystal Gear Shift"],
                        safety: ["City Safety", "Pilot Assist", "Cross Traffic Alert"]
                    }
                }
            ]
        },
        {
            category: "Electric & Hybrid",
            cars: [
                { 
                    id: "tesla-model-3",
                    name: "Tesla Model 3", 
                    image: "https://ireland.apollo.olxcdn.com/v1/files/t6w0ezrjbebw-AUTOVITRO/image;s=644x461", 
                    description: "Tesla Model 3 este o alegere modernă 100% electrică.", 
                    cost: 110,
                    specs: { transmission: "Automată", fuel: "Electric", year: "2022", engine: "Dual Motor", power: "490 CP" },
                    features: {
                        audio: ["Sistem Premium Tesla", "Netflix/Youtube", "Gaming"],
                        comfort: ["Plafon sticlă", "Precondiționare app", "Scaune încălzite toate"],
                        safety: ["Autopilot", "Sentry Mode", "Dashcam integrat"]
                    }
                }
            ]
        }
    ];

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
    };

    const isAddedToCart = (carId) => {
        return cartItems.some(item => item.id === carId);
    };

    const navbarStyle = {
        backgroundColor: '#000', // Navbar negru
        color: '#fff',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid #333'
    };

    if (showCart) {
        return <CartItem onContinueShopping={() => setShowCart(false)} />;
    }

    return (
        <div className="main-container">
            <div style={navbarStyle}>
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                    <h3 style={{margin:0, textTransform: 'uppercase', letterSpacing: '1px'}}>AutoRent <span style={{color: '#ff4d4d'}}>Premium</span></h3>
                </Link>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <span onClick={() => setShowCart(false)} style={{ cursor: 'pointer', fontWeight: 'bold', color: '#ccc' }}>Flota Auto</span>
                    <div onClick={() => setShowCart(true)} style={{ cursor: 'pointer', fontSize: '24px' }}>
                        🛒 {cartItems.length > 0 && <span style={{fontSize: '14px', background: '#ff4d4d', borderRadius: '50%', padding: '2px 6px', verticalAlign: 'top'}}>{cartItems.length}</span>}
                    </div>
                </div>
            </div>

            <div className="product-grid" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', background: '#050505' }}>
                {carsData.map((category, index) => (
                    <div key={index} style={{ marginBottom: '50px' }}>
                        <h2 style={{ borderBottom: '1px solid #333', paddingBottom: '15px', color: '#fff', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1.5rem' }}>
                            {category.category}
                        </h2>
                        
                        <div className="product-list">
                            {category.cars.map((car) => (
                                <div className="product-card" key={car.id} style={{ 
                                    border: '1px solid #222', 
                                    borderRadius: '15px', 
                                    overflow: 'hidden', 
                                    background: '#121212', 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    transition: 'all 0.3s ease'
                                }}>
                                    
                                    <Link to={`/cars/${car.id}`} style={{ height: '240px', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
                                        <img src={car.image} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div style={{position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'}}></div>
                                    </Link>
                                    
                                    <div style={{ padding: '25px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <h3 style={{ margin: '0 0 10px 0', color: 'white', fontSize: '1.4rem' }}>{car.name}</h3>
                                        <p style={{ color: '#aaa', fontSize: '14px', flexGrow: 1, lineHeight: '1.6' }}>{car.description.substring(0, 100)}...</p>
                                        
                                        <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#ff4d4d', margin: '20px 0' }}>
                                            €{car.cost} <span style={{fontSize: '14px', color: '#888', fontWeight: 'normal'}}>/ zi</span>
                                        </div>

                                        <Link to={`/cars/${car.id}`} style={{ 
                                            display: 'block', textAlign: 'center', textDecoration: 'none', color: 'white', 
                                            background: '#333', padding: '12px', borderRadius: '8px', marginBottom: '10px', fontWeight: '600', transition: '0.3s'
                                        }} className="details-btn">
                                            Vezi Detalii & Dotări
                                        </Link>

                                        <button 
                                            onClick={() => handleAddToCart(car)}
                                            disabled={isAddedToCart(car.id)}
                                            style={{
                                                width: '100%', padding: '12px', 
                                                backgroundColor: isAddedToCart(car.id) ? '#444' : '#ff4d4d',
                                                color: 'white', border: 'none', borderRadius: '8px', 
                                                cursor: isAddedToCart(car.id) ? 'default' : 'pointer', fontWeight: 'bold', textTransform: 'uppercase'
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