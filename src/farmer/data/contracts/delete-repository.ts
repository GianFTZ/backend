import { FarmerModel } from "../models/farmer";

export interface IDeleteFarmerRepository {
  delete: (farmerIdentifier: string) => Promise<Pick<FarmerModel, "name">>
}