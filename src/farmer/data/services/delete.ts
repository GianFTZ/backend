import { IDeleteFarmerUseCase } from "../../domain/usecases/delete";
import { IDeleteFarmerRepository } from "../contracts/delete-repository";

export class DeleteFarmerService implements IDeleteFarmerUseCase {
  constructor(private readonly deleteFarmerRepository: IDeleteFarmerRepository){}
  public async delete(farmerIdentifier: string): Promise<void> {
    try {
      const deletedFarmer = await this.deleteFarmerRepository.delete(farmerIdentifier)
      if(!deletedFarmer.name) throw new Error()
    } catch(e) {
      throw new Error("Error deleting")
    }
  }
}