import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Column 1: Brand & About */}
        <div className="footer-section about">
          <h3 className="footer-logo">AutoRent <span className="highlight">Premium</span></h3>
          <p className="footer-description">
            Oferim servicii de închirieri auto adaptate nevoilor tale, fie că este vorba de
            deplasări urbane, călătorii de afaceri sau vacanțe. Flota noastră include
            autoturisme moderne, verificate constant pentru siguranță și confort maxim.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon"><FaFacebookF /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Column 2: Useful Links (Navigation) */}
        <div className="footer-section links">
          <h4>Informații Clienți</h4>
          <ul>
            <li><Link to="/cars">Flota Noastră</Link></li>
            <li><Link to="/termeni">Termeni și Condiții</Link></li>
            <li><Link to="/confidentialitate">Politica de Confidențialitate</Link></li>
            <li><Link to="/faq">Întrebări Frecvente (FAQ)</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="footer-section contact">
          <h4>Contactează-ne</h4>
          <div className="contact-item">
            <FaMapMarkerAlt className="icon" />
            <span>Bulevardul Unirii 1, București, România</span>
          </div>
          <div className="contact-item">
            <FaPhoneAlt className="icon" />
            <span>+40 712 345 678</span>
          </div>
          <div className="contact-item">
            <FaEnvelope className="icon" />
            <span>contact@autorent-premium.ro</span>
          </div>
          <div className="program">
            <p><strong>Program:</strong> Luni – Duminică: 08:00 – 22:00</p>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AutoRent Premium România. Toate drepturile rezervate.</p>
      </div>
    </footer>
  );
};

export default Footer;