import { IReadFarmerUseCase } from "../../domain/usecases/read";
import { IReadFarmerRepository } from "../contracts/read-repository";
import { FarmerModel } from "../models/farmer";

export class ReadFarmerService implements IReadFarmerUseCase {
  constructor(private readonly readFarmerRepository: IReadFarmerRepository){}
  public async read(farmerIdentifier: string): Promise<FarmerModel> {
    try {
      const farmer = await this.readFarmerRepository.read(farmerIdentifier)
      if(!farmer) throw new Error()
      return farmer
    } catch(e) {
      throw new Error("Error deleting")
    }
  }
}