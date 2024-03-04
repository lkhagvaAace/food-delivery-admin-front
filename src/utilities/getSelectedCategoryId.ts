import { instance } from "@/Instance";
import { Category } from "@/types/CategoryType";

export const getSelectedCategoryId = async (name: string) => {
  try {
    const res = await instance.get("/getCategories");
    const data: Category[] = res.data;
    const id = data.filter((el) => {
      return el.name === name;
    });
    return id[0]._id;
  } catch (error) {
    console.error("error in getIdByCategoryName", error);
    return alert("No Food In This Category");
  }
};
