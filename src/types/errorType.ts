import { FormikErrors } from "formik";

export type foodErrorType = FormikErrors<{
  name: string;
  category: string | undefined;
  ingredients: string;
  price: number;
  isSale: boolean;
  salePercent: number;
}>;
export type categoryErrorType = FormikErrors<{
  categoryName: string;
}>;
