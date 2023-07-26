import { FarmerModel } from "../models/farmer";

export interface ICreateFarmerRepository {
  create: (farmer: FarmerModel) => Promise<Omit<FarmerModel, "foodsPlanted">>;
}