import { FarmerModel } from "../models/farmer";

export interface IReadFarmerRepository {
  read: (farmerIdentifier: string) => Promise<FarmerModel>;
}