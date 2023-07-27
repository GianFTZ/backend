import { Farmer } from "../entities/farmer";

export interface IDeleteFarmerUseCase {
  delete: (farmerIdentifier: string) => Promise<void>
}