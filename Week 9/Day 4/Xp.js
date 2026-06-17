import React, { useEffect } from 'react';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

export const fetchUser = createAsyncThunk('user/fetch', async () => {
  const res = await fetch('https://typicode.com');
  return res.json();
});

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => { state.loading = true; })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  }
});

const store = configureStore({
  reducer: { user: userSlice.reducer }
});

function UserData() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (!data) return null;

  return (
    <div>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <UserData />
    </Provider>
  );
}
