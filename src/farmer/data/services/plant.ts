import { Food } from "../../domain";
import { IFarmerPlantFoodUseCase } from "../../domain/usecases/plant";
import { IFarmerPlantFoodRepository } from "../contracts/plant-repository";
import { FoodModel } from "../models/food";

export class PlantFoodFarmerService implements IFarmerPlantFoodUseCase {
  constructor(private readonly farmerPlantFoodRepository: IFarmerPlantFoodRepository){}
  public async plant(food: Food, identifier: string): Promise<Pick<FoodModel, "name">> {
    try {
      const plantedFood = await this.farmerPlantFoodRepository.plant(food, identifier);
      if(!plantedFood) throw new Error()
      return {
        name: plantedFood.name
      }
    } catch (_) {
      throw new Error("Could not plant this food")
    }
  }
}