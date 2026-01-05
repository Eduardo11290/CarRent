import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CarDetail.css'; 

const CarDetail = () => {
    const { id } = useParams();

    // --- DATE ACTUALIZATE CU LISTE DE IMAGINI (Exterior + Interior) ---
    const carsData = [
        {
            category: "Economic & Compact",
            cars: [
                { 
                    id: "toyota-corolla",
                    name: "Toyota Corolla", 
                    // Acum avem un ARRAY de imagini
                    images: [
                        "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?q=80&w=2000&auto=format&fit=crop", // Exterior
                        "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2000&auto=format&fit=crop", // Interior
                        "https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?q=80&w=2000&auto=format&fit=crop"  // Spate
                    ],
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
                    images: [
                        "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=2000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1623194017996-0c8413a29b63?q=80&w=2000&auto=format&fit=crop"
                    ],
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
                    images: [
                        "https://images.unsplash.com/photo-1610889243763-71887e50269f?q=80&w=2000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1609520505218-742184325a75?q=80&w=2000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2000&auto=format&fit=crop"
                    ],
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
                    images: [
                        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=2000&auto=format&fit=crop", // Interior
                        "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2000&auto=format&fit=crop"
                    ],
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
                    images: [
                        "https://images.unsplash.com/photo-1556189250-72ba954e96b5?q=80&w=2000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1555215696-99ac45e43d3e?q=80&w=2000&auto=format&fit=crop", // Interior
                        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2000&auto=format&fit=crop"
                    ],
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
                    images: [
                        "https://images.unsplash.com/photo-1606220838315-056192d5e927?q=80&w=2000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1605218427306-635ba7429b3f?q=80&w=2000&auto=format&fit=crop", // Interior
                        "https://images.unsplash.com/photo-1563720223523-491275cd7027?q=80&w=2000&auto=format&fit=crop"
                    ],
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
                    images: [
                        "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2000&auto=format&fit=crop", // Interior
                        "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=2000&auto=format&fit=crop"
                    ],
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
                    images: [
                        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1565514020176-db7658c9730f?q=80&w=2000&auto=format&fit=crop", // Interior
                        "https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=2000&auto=format&fit=crop"
                    ],
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

    const car = carsData
        .flatMap(category => category.cars)
        .find(c => c.id === id);

    // --- LOGICA PENTRU GALERIE (SLIDER) ---
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [days, setDays] = useState(0);

    if (!car) {
        return (
            <div style={{padding: '50px', textAlign: 'center', background: '#050505', minHeight: '100vh', color: 'white'}}>
                <h2>Mașina nu a fost găsită.</h2>
                <Link to="/cars" style={{color: '#ff4d4d'}}>Înapoi la Flotă</Link>
            </div>
        );
    }

    // Funcții pentru butoane
    const nextImage = () => {
        setCurrentImgIndex((prev) => (prev === car.images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        setCurrentImgIndex((prev) => (prev === 0 ? car.images.length - 1 : prev - 1));
    };

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
                alert("Data de returnare trebuie să fie după data de preluare!");
            }
        } else {
            alert("Te rog selectează ambele date!");
        }
    };

    return (
        <div className="car-detail-page">
            <div style={{background: '#000', padding: '15px 30px', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100}}>
                <Link to="/cars" style={{color: '#aaa', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center'}}>
                    <span style={{marginRight: '5px'}}>‹</span> Înapoi
                </Link>
                <span style={{marginLeft: '20px', color: '#ff4d4d', fontWeight: 'bold'}}> | {car.name}</span>
            </div>

            <div className="detail-container">
                <div className="left-content">
                    <h1 className="car-title">{car.name}</h1>
                    
                    {/* --- GALERIE FOTO CU BUTOANE --- */}
                    <div className="image-gallery-box">
                        <img src={car.images[currentImgIndex]} alt={car.name} className="main-image" />
                        
                        {/* Buton Stânga */}
                        <button className="slider-btn left-btn" onClick={prevImage}>❮</button>
                        
                        {/* Buton Dreapta */}
                        <button className="slider-btn right-btn" onClick={nextImage}>❯</button>

                        {/* Indicator Poze (ex: 1/3) */}
                        <div className="slide-counter">
                            {currentImgIndex + 1} / {car.images.length}
                        </div>
                    </div>
                    
                    <div className="section-card">
                        <h3 className="section-title">Specificații Tehnice</h3>
                        <p className="car-desc">{car.description}</p>
                        
                        <div className="specs-grid">
                            <div className="spec-item"><span className="spec-label">Transmisie</span><span className="spec-value">{car.specs?.transmission}</span></div>
                            <div className="spec-item"><span className="spec-label">Combustibil</span><span className="spec-value">{car.specs?.fuel}</span></div>
                            <div className="spec-item"><span className="spec-label">An</span><span className="spec-value">{car.specs?.year}</span></div>
                            <div className="spec-item"><span className="spec-label">Motor</span><span className="spec-value">{car.specs?.engine || 'N/A'}</span></div>
                            <div className="spec-item"><span className="spec-label">Putere</span><span className="spec-value">{car.specs?.power || 'N/A'}</span></div>
                        </div>
                    </div>

                    <div className="features-container">
                        <h3 className="section-title" style={{marginTop: '40px', marginBottom: '20px'}}>Dotări și Echipamente</h3>
                        {car.features && (
                            <>
                                <details className="feature-accordion" open><summary>Audio și Tehnologie</summary><ul className="feature-list">{car.features.audio.map((item, i) => <li key={i}>✓ {item}</li>)}</ul></details>
                                <details className="feature-accordion"><summary>Confort și Echipamente</summary><ul className="feature-list">{car.features.comfort.map((item, i) => <li key={i}>✓ {item}</li>)}</ul></details>
                                <details className="feature-accordion"><summary>Siguranță și Asistență</summary><ul className="feature-list">{car.features.safety.map((item, i) => <li key={i}>✓ {item}</li>)}</ul></details>
                            </>
                        )}
                    </div>
                </div>

                <div className="right-sidebar">
                    <div className="calculator-card">
                        <div className="price-tag">€{car.cost} <span>/ zi</span></div>
                        <p style={{color: '#888', fontSize: '13px', textAlign: 'center', marginBottom: '20px'}}>TVA inclus</p>
                        <div className="calc-inputs">
                            <label>Data Preluare</label><input type="date" onChange={(e) => setStartDate(e.target.value)} />
                            <label>Data Returnare</label><input type="date" onChange={(e) => setEndDate(e.target.value)} />
                            <button onClick={handleCalculate} className="calc-btn">Calculează Preț</button>
                        </div>
                        {totalPrice > 0 && (
                            <div className="result-box">
                                <div className="result-row"><span>Durată:</span><strong>{days} Zile</strong></div>
                                <div className="result-total"><span>Total:</span><strong>€{totalPrice}</strong></div>
                                <button className="finalize-btn">Rezervă Acum</button>
                            </div>
                        )}
                        <div className="trust-badges"><div>🛡️ Verificat</div><div>⭐ Premium</div></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetail;