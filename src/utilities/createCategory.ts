import { categoryErrorType } from "@/types/errorType";

export const createCategory = async (
  e: React.FormEvent<HTMLFormElement>,
  errors: categoryErrorType,
  values: { categoryName: string }
) => {
  e.preventDefault();

  try {
    if (errors.categoryName) return alert("Not Valid");
    const res = await fetch("http://localhost:8080/createCategory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: values.categoryName }),
    });
    return await res.status;
  } catch (error) {
    console.error("errors in createCategory");
  }
};
