import { Farmer } from "../entities/farmer";

export interface ICreateFarmerUseCase {
  create: (farmer: Farmer) => Promise<Pick<Farmer, "name">>
}