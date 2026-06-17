import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// ============================================================================
// 1. DATA TYPE DEFINITIONS (types.ts)
// ============================================================================
export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

interface FetchState {
  data: any[];
  loading: boolean;
  error: string | null;
}

// ============================================================================
// 2. API SIMULATION LAYER (api.ts)
// ============================================================================
async function fetchRecipesFromApi(): Promise<Recipe[]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [
    { id: 101, title: 'Garlic Butter Shrimp Pasta', image: 'https://placehold.co', readyInMinutes: 20 },
    { id: 102, title: 'Classic Margherita Pizza', image: 'https://placehold.co', readyInMinutes: 30 },
    { id: 103, title: 'Avocado Toast with Poached Egg', image: 'https://placehold.co', readyInMinutes: 10 }
  ];
}

async function fetchUsersFromApi(): Promise<User[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
    { id: 2, name: 'Bob Jones', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' }
  ];
}

// ============================================================================
// 3. REDUX STATE STORE MANAGEMENT (dataSlice.ts)
// ============================================================================
const initialState: FetchState = {
  data: [],
  loading: false,
  error: null,
};

export const getRecipesThunk = createAsyncThunk('dataStore/getRecipes', async () => {
  return await fetchRecipesFromApi();
});

export const getUsersThunk = createAsyncThunk('dataStore/getUsers', async () => {
  return await fetchUsersFromApi();
});

const dataSlice = createSlice({
  name: 'dataEngine',
  initialState,
  reducers: {
    clearStore: (state) => {
      state.data = [];
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecipesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecipesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRecipesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to pull recipes payload.';
      })
      .addCase(getUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to pull users payload.';
      });
  },
});

export const { clearStore } = dataSlice.actions;

// Configure and mount structural local runtime store instance
const store = configureStore({
  reducer: {
    appState: dataSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// ============================================================================
// 4. GENERIC DATA FETCHING COMPONENT (DataFetcher.tsx)
// ============================================================================
interface DataFetcherProps<T> {
  fetchAction: () => any;
  selectData: (state: RootState) => T[];
  selectLoading: (state: RootState) => boolean;
  selectError: (state: RootState) => string | null;
  renderLayout: (items: T[]) => React.ReactNode;
}

export function DataFetcher<T>({
  fetchAction,
  selectData,
  selectLoading,
  selectError,
  renderLayout,
}: DataFetcherProps<T>) {
  const dispatch = useDispatch<AppDispatch>();
  
  const data = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchAction());
  }, [dispatch, fetchAction]);

  if (loading) {
    return <div style={{ padding: '15px', color: '#555', fontStyle: 'italic' }}>Loading live dataset values...</div>;
  }

  if (error) {
    return <div style={{ padding: '15px', color: '#c53030', fontWeight: 'bold' }}>Error Encountered: {error}</div>;
  }

  return <div style={{ marginTop: '10px' }}>{renderLayout(data)}</div>;
}

// ============================================================================
// 5. MAIN CORE DASHBOARD CONTAINER (App.tsx Execution)
// ============================================================================
function DashboardTabsView() {
  const [activeTab, setActiveTab] = useState<'recipes' | 'users'>('recipes');
  const dispatch = useDispatch<AppDispatch>();

  function toggleTab(tab: 'recipes' | 'users'): void {
    dispatch(clearStore());
    setActiveTab(tab);
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
      <h2>Daily Challenge: Generic Redux Data Fetcher</h2>
      <hr style={{ border: '0', borderTop: '1px solid #ccc', marginBottom: '20px' }} />

      {/* Tabs Selector Bar */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
        <button 
          onClick={() => toggleTab('recipes')} 
          style={{ padding: '8px 16px', cursor: 'pointer', fontWeight: activeTab === 'recipes' ? 'bold' : 'normal' }}
        >
          View Recipes Dashboard
        </button>
        <button 
          onClick={() => toggleTab('users')} 
          style={{ padding: '8px 16px', cursor: 'pointer', fontWeight: activeTab === 'users' ? 'bold' : 'normal' }}
        >
          View Active System Users
        </button>
      </div>

      {/* Dynamic Conditional Rendering via Single Generic Controller Instance */}
      {activeTab === 'recipes' ? (
        <DataFetcher<Recipe>
          fetchAction={getRecipesThunk}
          selectData={(state) => state.appState.data as Recipe[]}
          selectLoading={(state) => state.appState.loading}
          selectError={(state) => state.appState.error}
          renderLayout={(recipes) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recipes.map((recipe) => (
                <div key={recipe.id} style={{ display: 'flex', gap: '15px', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '6px', alignItems: 'center' }}>
                  <img src={recipe.image} alt={recipe.title} style={{ width: '50px', height: '50px', borderRadius: '4px', backgroundColor: '#eee' }} />
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', color: '#1a202c' }}>{recipe.title}</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#718096' }}>🕒 Ready inside {recipe.readyInMinutes} minutes</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        />
      ) : (
        <DataFetcher<User>
          fetchAction={getUsersThunk}
          selectData={(state) => state.appState.data as User[]}
          selectLoading={(state) => state.appState.loading}
          selectError={(state) => state.appState.error}
          renderLayout={(users) => (
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              {users.map((user) => (
                <li key={user.id} style={{ margin: '10px 0', fontSize: '15px' }}>
                  <strong>{user.name}</strong> — <span style={{ color: '#4a5568' }}>{user.email}</span>
                </li>
              ))}
            </ul>
          )}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <DashboardTabsView />
    </Provider>
  );
}
