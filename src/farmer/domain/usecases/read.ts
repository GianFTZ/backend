import { Farmer } from "../entities/farmer";

export interface IReadFarmerUseCase {
  read: (farmerIdentifier: string) => Promise<Farmer>
}