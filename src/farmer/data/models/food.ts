import { Food } from "../../domain";

export type FoodModel = Omit<Food, "name"> & {
  name: string
}