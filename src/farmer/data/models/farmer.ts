import { Farmer } from "../../domain";

export type FarmerModel = Omit<Farmer, "foodsPlanted"> & {
  foodsPlanted: {
    name: string,
    quantity: number
  }[]
}