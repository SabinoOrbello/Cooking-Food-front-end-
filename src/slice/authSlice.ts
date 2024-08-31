import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// Definizione dell'interfaccia per l'utente
interface User {
  userId: number;
  username: string;
  email: string;
}

// Definizione dell'interfaccia per lo stato di registrazione
interface AuthState {
  registrationSuccess: boolean;
  user: User | null; // Usa l'interfaccia User
  loading: boolean;
  error: string | null;
}

// Stato iniziale per la registrazione
const initialState: AuthState = {
  registrationSuccess: false,
  user: null,
  loading: false,
  error: null,
};

// Thunk asincrono per la registrazione dell'utente
export const registerUser = createAsyncThunk<
  User,
  { username: string; email: string; password: string },
  { rejectValue: string }
>("auth/registerUser", async (userDetails, thunkAPI) => {
  try {
    const response = await fetch("https://localhost:7029/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Registration failed.");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Creazione dello slice per la registrazione
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.registrationSuccess = true;
        state.user = action.payload; // Usa il tipo User per i dati dell'utente
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Gestisci l'errore
      });
  },
});

export default authSlice.reducer;
