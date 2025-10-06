import React, { useState, useEffect } from 'react';
import { Product } from './types';
import { productApi } from './api';
import './App.css';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productApi.getAllProducts();
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. Make sure the backend is running.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate and convert string values to numbers for API
      const price = parseFloat(formData.price);
      const quantity = parseInt(formData.quantity);
      
      if (isNaN(price) || price < 0) {
        setError('Please enter a valid price');
        return;
      }
      
      if (isNaN(quantity) || quantity < 0) {
        setError('Please enter a valid quantity');
        return;
      }
      
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: price,
        quantity: quantity,
      };
      
      if (editingProduct) {
        await productApi.updateProduct(editingProduct.id, productData);
        setEditingProduct(null);
      } else {
        await productApi.createProduct(productData);
      }
      setFormData({ name: '', description: '', price: '', quantity: '' });
      setIsFormOpen(false);
      setError(null);
      fetchProducts();
    } catch (err) {
      setError('Failed to save product');
      console.error('Error saving product:', err);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      quantity: product.quantity.toString(),
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productApi.deleteProduct(id);
        fetchProducts();
      } catch (err) {
        setError('Failed to delete product');
        console.error('Error deleting product:', err);
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', quantity: '' });
    setEditingProduct(null);
    setIsFormOpen(false);
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Manager</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setIsFormOpen(true)}
        >
          Add New Product
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  min="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  placeholder="0"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-success">
                  {editingProduct ? 'Update' : 'Create'} Product
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="products-container">
        <h2>Products ({products.length})</h2>
        {products.length === 0 ? (
          <p>No products found. Add some products to get started!</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-details">
                  <span className="price">${product.price.toFixed(2)}</span>
                  <span className="quantity">Qty: {product.quantity}</span>
                </div>
                <div className="product-actions">
                  <button 
                    className="btn btn-outline"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;