import { FoodModel } from "../models/food";

export interface IFarmerPlantFoodRepository {
  plant: (food: FoodModel, identifier: string) => Promise<FoodModel>
}