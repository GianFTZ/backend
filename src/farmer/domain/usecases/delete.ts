import { Farmer } from "../entities/farmer";

export interface IDeleteFarmerUseCase {
  delete: (farmer: Pick<Farmer, "name">) => Promise<void>
}