import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Definisci l'interfaccia per una ricetta
interface Recipe {
  recipeId: number;
  title: string;
  description: string;
  cookingTime: number;
  instructions: string;
  ingredients: number[];
  categories: number;
  imageUrl: string;
}

// Definisci lo stato per il slice delle ricette
interface RecipesState {
  recipes: Recipe[];
  searchResults: Recipe[]; // Nuovo stato per i risultati della ricerca
  loading: boolean;
  error: string | null;
}

// Stato iniziale
const initialState: RecipesState = {
  recipes: [],
  searchResults: [],
  loading: false,
  error: null,
};

// Thunk asincrono per aggiungere una nuova ricetta
export const addRecipe = createAsyncThunk(
  "recipes/addRecipe",
  async (
    recipeData: {
      title: string;
      instructions: string;
      description: string;
      cookingTime: number;
      imageUrl: string;
      ingredientIds: number[];
      categoryId: number;
    },
    thunkAPI
  ) => {
    try {
      const response = await fetch("https://localhost:7029/api/recipe/add-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        throw new Error("Failed to add recipe.");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk asincrono per recuperare le ricette basate sugli ingredienti selezionati
export const fetchRecipesByIngredients = createAsyncThunk<Recipe[], number[]>(
  "recipes/fetchRecipesByIngredients",
  async (ingredientsIds, thunkAPI) => {
    const queryString = ingredientsIds.map((id) => `ingredientIds=${id}`).join("&");
    const url = `https://localhost:7029/api/Recipe?${queryString}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to fetch recipes.");
      }
      const data = await response.json();
      // Gestisci la struttura dei dati
      return data.$values || []; // Usa $values se esiste
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Crea il slice delle ricette
const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    // Azioni sincrone, se necessarie
  },
  extraReducers: (builder) => {
    // Gestisci il thunk addRecipe
    builder
      .addCase(addRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRecipe.fulfilled, (state, action: PayloadAction<Recipe>) => {
        state.loading = false;
        state.recipes.push(action.payload); // Aggiungi la nuova ricetta allo stato
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Imposta l'errore nello stato
      });

    // Gestisci il thunk fetchRecipesByIngredients
    builder
      .addCase(fetchRecipesByIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipesByIngredients.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
        state.loading = false;
        state.searchResults = action.payload; // Imposta i risultati della ricerca
      })
      .addCase(fetchRecipesByIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Imposta l'errore nello stato
      });
  },
});

// Esporta le azioni e il reducer del slice
// eslint-disable-next-line no-empty-pattern
export const {} = recipesSlice.actions; // Se ci sono azioni sincrone, esportale qui
export default recipesSlice.reducer;
