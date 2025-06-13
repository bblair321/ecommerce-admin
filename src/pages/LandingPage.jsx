import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import styles from '../styles/LandingPage.module.css';

export default function LandingPage() {
  const { addProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    origin: '',
    price: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    await addProduct({ ...formData, price: parseFloat(formData.price) });
    setFormData({ name: '', description: '', origin: '', price: '' });
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>☕ Big Coffee</h1>
      <p className={styles.description}>You can add a new product to your inventory here. Or on the Add Product Page.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Add a New Product</h2>
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          name="origin"
          placeholder="Origin"
          value={formData.origin}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
