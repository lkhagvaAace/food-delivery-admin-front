import { instance } from "@/Instance";
import { Category } from "@/types/CategoryType";

export const deleteCategory = async (deleteableCategory: Category) => {
  try {
    const res = await fetch("http://localhost:3005/deleteCategory", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deleteableCategory),
    });
    return await res.status;
  } catch (error) {
    console.error("error in deleteCategory", error);
  }
};
