import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Definizione dell'interfaccia per l'utente
interface User {
  userId: number;
  username: string;
  email: string;
}

// Definizione dell'interfaccia per lo stato di autenticazione
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Stato iniziale per l'autenticazione
const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem("token"),
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Thunk asincrono per il login dell'utente
export const loginUser = createAsyncThunk<
  { token: string; user: User },
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (credentials, thunkAPI) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("https://localhost:7029/api/auth/login", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Login failed.");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Creazione dello slice per l'autenticazione
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
