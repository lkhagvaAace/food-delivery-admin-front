import { instance } from "@/Instance";
import { Category } from "@/types/CategoryType";
export const getCategoriesFromDatabass = async (
  getCategoriesFunction: (data: Category[]) => void
) => {
  try {
    const res = await instance.get("/getCategories");
    getCategoriesFunction(res.data);
  } catch (error) {
    console.error(error);
  }
};
