import { ICreateFarmerUseCase } from "../../domain/usecases/create";
import { ICreateFarmerRepository } from "../contracts/create-repository";
import { FarmerModel } from "../models/farmer";

export class CreateFarmerService implements ICreateFarmerUseCase {
  constructor(private readonly createFarmerRepository: ICreateFarmerRepository){}
  public async create(farmer: FarmerModel): Promise<Pick<FarmerModel, "name">> {
    const data = await this.createFarmerRepository.create({
      arableArea: farmer.arableArea,
      name: farmer.name,
      identifier: farmer.identifier,
      city: farmer.city,
      farmName: farmer.farmName,
      foodsPlanted: farmer.foodsPlanted.map(food => { return { name: food.name.toLowerCase(), quantity: food.quantity } }),
      state: farmer.state,
      vegetationArea: farmer.vegetationArea
    })
    if(!data) throw new Error(`Failed to create`)
    return {
      name: data.name
    }
  }
}