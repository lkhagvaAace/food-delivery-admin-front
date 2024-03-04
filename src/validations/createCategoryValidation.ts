import * as yup from "yup";
export const CreateCategorySchema = yup.object().shape({
  categoryName: yup.string().min(3).max(30).required("Required"),
});
