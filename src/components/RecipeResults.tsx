import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipesByIngredients } from "../slice/recipesSlice";
import { RootState, AppDispatch } from "../store";

const RecipeResults: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading, error } = useSelector((state: RootState) => state.recipes);
  const { selectedIngredients } = useSelector((state: RootState) => state.ingredients);

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      dispatch(fetchRecipesByIngredients(selectedIngredients));
    }
  }, [dispatch, selectedIngredients]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="recipe-results">
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((recipe) => (
            <li key={recipe.recipeId}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} />}
              <p>Cooking Time: {recipe.cookingTime} minutes</p>
              <p>Instructions: {recipe.instructions}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes found for the selected ingredients.</p>
      )}
    </div>
  );
};

export default RecipeResults;
