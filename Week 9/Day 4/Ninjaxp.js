import React, { useEffect } from 'react';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// 1. Thunk
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await fetch('https://fakestoreapi.com');
  return res.json();
});

// 2. Slices
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null },
  reducers: {
    login: (state) => { state.user = 'GuestUser'; },
    logout: (state) => { state.user = null; }
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => { state.list = action.payload; });
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    add: (state, action) => { state.items.push(action.payload); },
    remove: (state, action) => { state.items = state.items.filter(i => i.id !== action.payload); }
  }
});

export const { login, logout } = authSlice.actions;
export const { add, remove } = cartSlice.actions;

// 3. Store
const store = configureStore({
  reducer: { auth: authSlice.reducer, products: productSlice.reducer, cart: cartSlice.reducer }
});

// 4. Components
function AuthForm() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  return (
    <div>
      {user ? <button onClick={() => dispatch(logout())}>Log Out ({user})</button> : <button onClick={() => dispatch(login())}>Log In</button>}
    </div>
  );
}

function ProductListing() {
  const list = useSelector(state => state.products.list);
  const dispatch = useDispatch();

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  return (
    <div>
      {list.map(p => (
        <div key={p.id}>
          <span>{p.title} (${p.price})</span>
          <button onClick={() => dispatch(add(p))}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

function ShoppingCart() {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  return (
    <div>
      <h3>Cart ({items.length})</h3>
      {items.map(i => (
        <div key={i.id}>
          <span>{i.title}</span>
          <button onClick={() => dispatch(remove(i.id))}>Remove</button>
        </div>
      ))}
    </div>
  );
}

// 5. App Wrap
export default function App() {
  return (
    <Provider store={store}>
      <AuthForm />
      <ProductListing />
      <ShoppingCart />
    </Provider>
  );
}
