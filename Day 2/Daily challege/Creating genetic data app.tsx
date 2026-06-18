import React, { useEffect } from 'react';
import { configureStore, createSlice, createAsyncThunk, PayloadAction, AsyncThunk } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================
export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
}

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface RootState {
  recipes: FetchState<Recipe[]>;
}

// ==========================================
// 2. MOCK API GATEWAY
// ==========================================
const fetchRecipes = async (): Promise<Recipe[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      id: 1,
      title: "Garlic Butter Shrimp Pasta",
      image: "https://unsplash.com",
      readyInMinutes: 25,
      servings: 4
    },
    {
      id: 2,
      title: "Avocado Quinoa Salad Bowl",
      image: "https://unsplash.com",
      readyInMinutes: 15,
      servings: 2
    }
  ];
};

// ==========================================
// 3. REDUX ARCHITECTURE (SLICE & STORE)
// ==========================================
export const getRecipes = createAsyncThunk<Recipe[], void, { rejectValue: string }>(
  'recipes/getRecipes',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchRecipes();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch recipes');
    }
  }
);

const initialState: FetchState<Recipe[]> = {
  data: null,
  loading: false,
  error: null
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'An unexpected error occurred';
      });
  }
});

const store = configureStore({
  reducer: {
    recipes: recipeSlice.reducer
  }
});

// ==========================================
// 4. GENERIC DATA FETCHER COMPONENT
// ==========================================
interface DataFetcherProps<T> {
  title: string;
  stateSelector: (state: RootState) => FetchState<T[]>;
  fetchAction: AsyncThunk<T[], void, any>;
  renderItem: (item: T) => React.ReactNode;
}

export function DataFetcher<T>({
  title,
  stateSelector,
  fetchAction,
  renderItem
}: DataFetcherProps<T>): React.JSX.Element {
  const dispatch = useDispatch<any>();
  const { data, loading, error } = useSelector(stateSelector);

  useEffect(() => {
    dispatch(fetchAction());
  }, [dispatch, fetchAction]);

  if (loading) return <div className="loading-state">Loading data...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;
  if (!data || data.length === 0) return <div className="empty-state">No records found.</div>;

  return (
    <div className="data-container">
      <h2>{title}</h2>
      <div className="data-grid">
        {data.map((item, index) => (
          <React.Fragment key={index}>
            {renderItem(item)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 5. ENTRANCE & DISPLAY ORCHESTRATION
// ==========================================
function Dashboard() {
  return (
    <div className="app-layout">
      <DataFetcher<Recipe>
        title="Available Recipes"
        stateSelector={(state: RootState) => state.recipes}
        fetchAction={getRecipes}
        renderItem={(recipe) => (
          <div className="recipe-card">
            <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div className="recipe-details">
              <h3>{recipe.title}</h3>
              <p>{recipe.readyInMinutes} mins | {recipe.servings} servings</p>
            </div>
          </div>
        )}
      />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}
