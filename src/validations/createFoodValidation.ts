import * as yup from "yup";
export const CreateFoodSchema = yup.object().shape({
  name: yup.string().min(3).max(50).required("Name required!"),
  ingredients: yup.string().min(10).max(100).required("Required"),
  price: yup.number().required("Required"),
  salePercent: yup.number().min(1).max(100).required(),
  img: yup.object().required(),
});
