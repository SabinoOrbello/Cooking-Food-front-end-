import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/index";
import { fetchIngredients, toggleIngredientSelection } from "../slice/ingredientsSlice";
import RecipeResults from "./RecipeResults";

const IngredientGrid: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allIngredients, selectedIngredients, loading, error } = useSelector((state: RootState) => state.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients()); // chiamata al thuck per ottenere gli elementi
  }, [dispatch]);
  console.log(Array.isArray(allIngredients)); // Questo dovrebbe essere true se allIngredients è un array
  console.log(allIngredients);
  const handleIngredientClick = (ingredientId: number) => {
    dispatch(toggleIngredientSelection(ingredientId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container d-flex flex-wrap justify-content-center mt-5">
      {allIngredients.map((ingredient) => (
        <div
          key={ingredient.ingredientId}
          className={`card m-2 p-2 ${selectedIngredients.includes(ingredient.ingredientId) ? "border-primary" : ""}`}
          style={{ cursor: "pointer", width: "150px", textAlign: "center" }}
          onClick={() => handleIngredientClick(ingredient.ingredientId)}
        >
          {ingredient.name}
        </div>
      ))}
      <div>
        <RecipeResults />
      </div>
    </div>
  );
};

export default IngredientGrid;
