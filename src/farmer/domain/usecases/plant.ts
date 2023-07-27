import { Food } from "../entities/food";

export interface IFarmerPlantFoodUseCase {
  plant: (food: Food, identifier: string) => Promise<Pick<Food, "name">>
}