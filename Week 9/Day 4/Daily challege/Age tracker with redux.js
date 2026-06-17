import React from 'react';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// 1. Async Thunks (Simulating Delays)
export const ageUpAsync = createAsyncThunk('age/up', async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
});

export const ageDownAsync = createAsyncThunk('age/down', async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
});

// 2. Redux Slice
const ageSlice = createSlice({
  name: 'age',
  initialState: { value: 20, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ageUpAsync.pending, (state) => { state.loading = true; })
      .addCase(ageUpAsync.fulfilled, (state) => {
        state.loading = false;
        state.value += 1;
      })
      .addCase(ageDownAsync.pending, (state) => { state.loading = true; })
      .addCase(ageDownAsync.fulfilled, (state) => {
        state.loading = false;
        state.value -= 1;
      });
  }
});

// 3. Redux Store
const store = configureStore({
  reducer: { age: ageSlice.reducer }
});

// 4. React Components
function AgeDisplay() {
  const { value, loading } = useSelector((state) => state.age);
  return (
    <div>
      <h2>Age: {value}</h2>
      {loading && <p>⌛ Updating...</p>}
    </div>
  );
}

function AgeControls() {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(ageUpAsync())}>Age Up</button>
      <button onClick={() => dispatch(ageDownAsync())}>Age Down</button>
    </div>
  );
}

// 5. Root Wrapper
export default function App() {
  return (
    <Provider store={store}>
      <h1>Daily Challenge: Age Tracker</h1>
      <AgeDisplay />
      <AgeControls />
    </Provider>
  );
}
