const STORAGE_KEY = 'mock-products';

// Initialize localStorage with mock data if empty
const initialProducts = [
  {
    id: 1,
    name: 'Vanilla bean',
    description: 'Medium Roast, nutty flavor',
    origin: 'Columbia',
    price: 10.0,
  },
  {
    id: 2,
    name: 'House Blend',
    description: 'Dark Roast, Rich flavor',
    origin: 'Vietnam',
    price: 12.0,
  },
];

function loadProducts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
    return initialProducts;
  }
  return JSON.parse(stored);
}

function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// Simulate async delay
function wait(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getProducts() {
  await wait();
  return loadProducts();
}

export async function addProduct(product) {
  await wait();
  const products = loadProducts();
  const newProduct = { ...product, id: Date.now() }; // unique id based on timestamp
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

export async function updateProduct(id, updatedFields) {
  await wait();
  const products = loadProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) throw new Error('Product not found');
  products[index] = { ...products[index], ...updatedFields };
  saveProducts(products);
  return products[index];
}
