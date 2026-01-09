import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';
import CarDetail from './CarDetail';
import CartItem from './CartItem';
import AboutUs from './AboutUs.jsx'; 
import Footer from './components/Footer.jsx'; 
import Navbar from './components/Navbar.jsx'; 
import LegalPage from './LegalPage.jsx'; 

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* GLOBAL NAVBAR - ALWAYS VISIBLE */}
      <Navbar /> 

      {/* Main Content */}
      <div style={{ flex: 1, marginTop: '80px' }}> {/* Margin top to push content below fixed Navbar */}
        <Routes>
          <Route path="/" element={<AboutUs/>} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/cars" element={<ProductList />} />
          <Route path="/cart" element={<CartItem />} />
          <Route path="/cars/:id" element={<CarDetail />} />
          
          <Route path="/termeni" element={<LegalPage title="Termeni și Condiții" />} />
          <Route path="/confidentialitate" element={<LegalPage title="Politica de Confidențialitate" />} />
          <Route path="/faq" element={<LegalPage title="Întrebări Frecvente" />} />
          <Route path="/contact" element={<LegalPage title="Contact" />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;