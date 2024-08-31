import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe } from "../slice/recipesSlice";
import { RootState, AppDispatch } from "../store";
import { fetchIngredients, toggleIngredientSelection } from "../slice/ingredientsSlice";
import { Spinner, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AddRecipeForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState<number>(0);
  const [selectedCategoria, setSelectedCategoria] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState("");

  // Ottieni gli ingredienti e stato dal Redux
  const { allIngredients, selectedIngredients, loading, error } = useSelector((state: RootState) => state.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients()); // Carica gli ingredienti al montaggio del componente
  }, [dispatch]);

  const handleIngredientClick = (ingredientId: number) => {
    dispatch(toggleIngredientSelection(ingredientId)); // Usa il toggle del slice per gestire la selezione
  };

  const handleCategoryClick = (categoriaId: number) => {
    setSelectedCategoria(categoriaId); // Aggiorna lo stato con la categoria selezionata
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cookingTimeNumber = typeof cookingTime === "number" ? cookingTime : Number(cookingTime);
    dispatch(
      addRecipe({
        title,
        instructions,
        description,
        cookingTime: cookingTimeNumber,
        imageUrl,
        ingredientIds: selectedIngredients,
        categoryId: selectedCategoria,
      })
    );
  };

  if (loading) {
    return (
      <div className="container mt-5 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add a New Recipe</h2>
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <Form.Group className="mb-3">
          <Form.Label>Recipe Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Enter instructions"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cooking Time (minutes)</Form.Label>
          <Form.Control
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(Number(e.target.value))}
            placeholder="Enter cooking time"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Ingredients</Form.Label>
          <div className="d-flex flex-wrap">
            {allIngredients.map((ingredient) => (
              <Button
                key={ingredient.ingredientId}
                variant={selectedIngredients.includes(ingredient.ingredientId) ? "primary" : "outline-primary"}
                className="m-1"
                onClick={() => handleIngredientClick(ingredient.ingredientId)}
              >
                {ingredient.name}
              </Button>
            ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Category</Form.Label>
          <div className="d-flex flex-wrap">
            <Button
              variant={selectedCategoria === 0 ? "primary" : "outline-primary"}
              className="m-1"
              onClick={() => handleCategoryClick(0)}
            >
              All
            </Button>
            <Button
              variant={selectedCategoria === 1 ? "primary" : "outline-primary"}
              className="m-1"
              onClick={() => handleCategoryClick(1)}
            >
              Breakfast
            </Button>
            <Button
              variant={selectedCategoria === 2 ? "primary" : "outline-primary"}
              className="m-1"
              onClick={() => handleCategoryClick(2)}
            >
              Lunch
            </Button>
            <Button
              variant={selectedCategoria === 3 ? "primary" : "outline-primary"}
              className="m-1"
              onClick={() => handleCategoryClick(3)}
            >
              Dinner
            </Button>
            <Button
              variant={selectedCategoria === 4 ? "primary" : "outline-primary"}
              className="m-1"
              onClick={() => handleCategoryClick(4)}
            >
              Side Dishes
            </Button>
          </div>
        </Form.Group>

        <Button type="submit" variant="success" className="bt w-100">
          Add Recipe
        </Button>
      </Form>
    </div>
  );
};

export default AddRecipeForm;
