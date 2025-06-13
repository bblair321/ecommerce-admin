import React, { useState, useId, useRef, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import styles from '../styles/AddProductPage.module.css';

export default function AddProductPage() {
  const { addProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    origin: '',
    price: '',
  });

  const idPrefix = useId();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await addProduct({ ...formData, price: parseFloat(formData.price) });
    setFormData({ name: '', description: '', origin: '', price: '' });
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Add New Coffee</h2>
      <label htmlFor={`${idPrefix}-name`}>Name:</label>
      <input
        id={`${idPrefix}-name`}
        name="name"
        value={formData.name}
        onChange={handleChange}
        ref={inputRef}
        required
      />

      <label htmlFor={`${idPrefix}-description`}>Description:</label>
      <input
        id={`${idPrefix}-description`}
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label htmlFor={`${idPrefix}-origin`}>Origin:</label>
      <input
        id={`${idPrefix}-origin`}
        name="origin"
        value={formData.origin}
        onChange={handleChange}
        required
      />

      <label htmlFor={`${idPrefix}-price`}>Price:</label>
      <input
        id={`${idPrefix}-price`}
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <button type="submit">Add Product</button>
    </form>
  );
}
