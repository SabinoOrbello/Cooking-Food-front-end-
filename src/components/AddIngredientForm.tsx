import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredient } from "../slice/ingredientsSlice";
import { RootState, AppDispatch } from "../store";

const AddIngredientForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const { loading, error } = useSelector((state: RootState) => state.ingredients);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createIngredient({ name }));
    setName(""); // Resetta il campo input dopo l'aggiunta
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ingredient Name"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Ingredient"}
      </button>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
    </form>
  );
};

export default AddIngredientForm;
