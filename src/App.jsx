import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AddProductPage from './pages/AddProductPage';
import ProductPage from './pages/ProductPage';
import styles from './styles/App.module.css';


export default function App() {
  return (
    <>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.link} end>
          Home
        </NavLink>
        <NavLink to="/add" className={styles.link}>
          Add Product
        </NavLink>
        <NavLink to="/products" className={styles.link}>
          Products
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/add" element={<AddProductPage />} />
        <Route path="/products" element={<ProductPage />} />
      </Routes>
    </>
  );
}
