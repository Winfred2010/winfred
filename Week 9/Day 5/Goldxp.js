import React, { useState, useCallback } from 'react';
import { configureStore, createSlice, createSelector } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// 1. Redux Slice
const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    products: [
      { id: 1, name: 'Laptop', price: 999 },
      { id: 2, name: 'Headphones', price: 149 },
      { id: 3, name: 'Mouse', price: 29 }
    ],
    cart: []
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.cart.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    }
  }
});

const { addToCart } = shopSlice.actions;

// 2. Memoized Performance Selectors
const selectProducts = (state) => state.shop.products;
const selectCartItems = (state) => state.shop.cart;

const calculateTotalPrice = createSelector(
  [selectCartItems],
  (cart) => cart.reduce((total, item) => total + (item.price * item.quantity), 0)
);

// 3. Store Configuration
const store = configureStore({
  reducer: { shop: shopSlice.reducer }
});

// 4. React Component
function ShoppingCart() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(calculateTotalPrice);

  // Performance optimized interaction handler
  const handleAdd = useCallback((product) => {
    dispatch(addToCart(product));
  }, [dispatch]);

  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id}>
          <span>{product.name} - ${product.price}</span>
          <button onClick={() => handleAdd(product)}>Add to Cart</button>
        </div>
      ))}

      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <div key={item.id}>
          {item.name} (x{item.quantity}) - ${item.price * item.quantity}
        </div>
      ))}
      
      <h3>Total Price: ${totalPrice}</h3>
    </div>
  );
}

// 5. App Entry
export default function App() {
  return (
    <Provider store={store}>
      <ShoppingCart />
    </Provider>
  );
}
