import { prisma } from "../../../../lib/common/prisma";
import { ICreateFarmerRepository } from "../../../data/contracts/create-repository";
import { FarmerModel } from "../../../data/models/farmer";

export class PrismaRepository implements ICreateFarmerRepository {
  public create(farmer: FarmerModel): Promise<FarmerModel> {
    prisma
  }
}