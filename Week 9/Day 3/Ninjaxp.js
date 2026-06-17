import React, { useState } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// 1. Redux Slice
const inventorySlice = createSlice({
  name: 'inventory',
  initialState: { products: [] },
  reducers: {
    addProduct: (state, action) => {
      state.products.push({
        id: Date.now(),
        name: action.payload.name,
        quantity: action.payload.quantity
      });
    },
    updateQuantity: (state, action) => {
      const product = state.products.find(p => p.id === action.payload.id);
      if (product) product.quantity = Math.max(0, action.payload.quantity);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    }
  }
});

const { addProduct, updateQuantity, removeProduct } = inventorySlice.actions;

// 2. Redux Store
const store = configureStore({
  reducer: { inventory: inventorySlice.reducer }
});

// 3. Components
function AddProduct() {
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !qty) return;
    dispatch(addProduct({ name: name.trim(), quantity: parseInt(qty, 10) }));
    setName('');
    setQty('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" />
      <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="Quantity" min="0" />
      <button type="submit">Add Product</button>
    </form>
  );
}

function InventoryList() {
  const products = useSelector((state) => state.inventory.products);
  const dispatch = useDispatch();

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <span>{product.name} (Qty: {product.quantity})</span>
          
          <button onClick={() => dispatch(updateQuantity({ id: product.id, quantity: product.quantity + 1 }))}>+</button>
          <button onClick={() => dispatch(updateQuantity({ id: product.id, quantity: product.quantity - 1 }))}>-</button>
          <button onClick={() => dispatch(removeProduct(product.id))}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

// 4. Root Wrapper
export default function App() {
  return (
    <Provider store={store}>
      <h1>Inventory Management</h1>
      <AddProduct />
      <InventoryList />
    </Provider>
  );
}
