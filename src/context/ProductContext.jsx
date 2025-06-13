import React, { createContext, useContext, useEffect, useState } from 'react';
import * as api from '../api/mockApi';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  async function addProduct(product) {
    try {
      const newProduct = await api.addProduct(product);
      setProducts((prev) => [...prev, newProduct]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function updateProduct(id, updatedFields) {
    try {
      const updated = await api.updateProduct(id, updatedFields);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <ProductContext.Provider
      value={{ products, loading, error, addProduct, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error('useProducts must be used within ProductProvider');
  return context;
}
