import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import loginSlice from "../slice/loginSlice";
import ingredientSlice from "../slice/ingredientsSlice";
import recipeSlice from "../slice/recipesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    login: loginSlice,
    ingredients: ingredientSlice,
    recipes: recipeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
