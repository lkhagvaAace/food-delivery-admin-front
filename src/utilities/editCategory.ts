import { Category } from "@/types/CategoryType";

export const editCategory = async (
  e: React.FormEvent<HTMLFormElement>,
  category: Category | null,
  newCategory: string,
  error: string | undefined
) => {
  e.preventDefault();
  try {
    if (error) return alert("Please enter valid name!");
    const res = await fetch("http://localhost:8080/editCategory", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: category,
        newCategoryName: newCategory,
      }),
    });
    return res.status;
  } catch (error) {
    console.error("error in editCategory", error);
  }
};
