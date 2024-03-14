import { Food } from "./FoodType";
import { User } from "./userType";

export type Order = {
  foods: Food[];
  orderNumber: number;
  process: string;
  totalPrice: number;
  userId: User;
  _id: string;
  createdDate: string;
};
