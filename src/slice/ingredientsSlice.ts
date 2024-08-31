import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Definizione interfaccia ingrediente
interface Ingredient {
  ingredientId: number;
  name: string;
}

// Stato iniziale per lo stato degli ingredienti
interface IngredientState {
  allIngredients: Ingredient[]; // Lista di tutti gli ingredienti
  selectedIngredients: number[]; // Lista degli ID di tutti gli ingredienti selezionati
  loading: boolean;
  error: string | null;
}

// Tipo per il payload quando è un oggetto con una proprietà `$values`
interface IngredientsResponse {
  $values?: Ingredient[];
}

// Stato iniziale
const initialState: IngredientState = {
  allIngredients: [],
  selectedIngredients: [],
  loading: false,
  error: null,
};

// Thunk per recuperare gli ingredienti
export const fetchIngredients = createAsyncThunk<Ingredient[] | IngredientsResponse>(
  "ingredients/fetchIngredients",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("https://localhost:7029/api/ingredient"); // Endpoint API per ottenere gli ingredienti
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to fetch ingredients.");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk per creare un nuovo ingrediente
export const createIngredient = createAsyncThunk<Ingredient, { name: string }>(
  "ingredients/createIngredient",
  async ({ name }, thunkAPI) => {
    try {
      const response = await fetch("https://localhost:7029/api/ingredient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Failed to create ingredient.");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Type guard per controllare se un oggetto è del tipo `IngredientsResponse`
const isIngredientsResponse = (data: any): data is IngredientsResponse => {
  return data && typeof data === "object" && "$values" in data;
};

// Slice di Redux per gli ingredienti
const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    toggleIngredientSelection(state, action: PayloadAction<number>) {
      const ingredientId = action.payload;
      if (state.selectedIngredients.includes(ingredientId)) {
        state.selectedIngredients = state.selectedIngredients.filter((id) => id !== ingredientId);
      } else {
        state.selectedIngredients.push(ingredientId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;

        if (Array.isArray(action.payload)) {
          // Se il payload è un array, assegnalo direttamente
          state.allIngredients = action.payload;
        } else if (isIngredientsResponse(action.payload) && Array.isArray(action.payload.$values)) {
          // Se il payload ha una proprietà $values, usa quella
          state.allIngredients = action.payload.$values;
        } else {
          // In caso di formato inaspettato, imposta un array vuoto
          state.allIngredients = [];
        }
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createIngredient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createIngredient.fulfilled, (state, action) => {
        state.loading = false;
        state.allIngredients.push(action.payload); // Aggiungi il nuovo ingrediente alla lista
      })
      .addCase(createIngredient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { toggleIngredientSelection } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
