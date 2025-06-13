import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import styles from '../styles/ProductPage.module.css';

export default function ProductPage() {
  const { products, loading, error, updateProduct } = useProducts();
  const [editId, setEditId] = useState(null);
  const [editPrice, setEditPrice] = useState('');

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  function startEdit(product) {
    setEditId(product.id);
    setEditPrice(product.price.toFixed(2));
  }

  async function saveEdit() {
    await updateProduct(editId, { price: parseFloat(editPrice) });
    setEditId(null);
  }

  return (
    <div className={styles.container}>
      <h2>All Products</h2>
      <ul className={styles.list}>
        {products.map((product) => (
          <li key={product.id} className={styles.listItem}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Origin: {product.origin}</p>
            <p>
              Price: $
              {editId === product.id ? (
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                />
              ) : (
                product.price.toFixed(2)
              )}
            </p>
            {editId === product.id ? (
              <button onClick={saveEdit}>Save</button>
            ) : (
              <button onClick={() => startEdit(product)}>Edit Price</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
