import { instance } from "@/Instance";
import { foodErrorType } from "@/types/errorType";
import { valuesType } from "@/types/valuesType";

export const createNewFood = async (
  e: React.FormEvent<HTMLFormElement>,
  errors: foodErrorType,
  saleFunction: () => Object,
  values: valuesType,
  category: any,
  img: File | null
) => {
  e.preventDefault();
  try {
    if (
      errors.name ||
      errors.ingredients ||
      errors.price ||
      values.img ||
      values.category ||
      values.ingredients ||
      values.name ||
      values.price ||
      values.salePercent
    ) {
      alert("Not valid. Please check the form for errors.");
      return;
    }

    if (!img) {
      alert("Please select an image.");
      return;
    }

    const form = new FormData();
    form.append("image", img);
    const newFood = {
      name: values.name,
      category: category,
      ingredients: values.ingredients,
      price: Number(values.price),
      isSale: saleFunction(),
    };
    form.append("newFood", JSON.stringify(newFood));

    const res = await fetch("http://localhost:8080/createFood", {
      method: "POST",
      body: form,
    });

    console.log("Response:", res);
  } catch (error) {
    console.error("Error in createNewFood", error);
  }
};
