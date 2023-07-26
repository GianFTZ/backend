import { prisma } from "../../../../lib/common/prisma";
import { ICreateFarmerRepository } from "../../../data/contracts/create-repository";
import { FarmerModel } from "../../../data/models/farmer";

export class PrismaRepository implements ICreateFarmerRepository {
  public async create(farmer: FarmerModel): Promise<Omit<FarmerModel, "foodsPlanted">> {
    return await prisma.farmer.create({
      data: {
        name: farmer.name,
        arableArea: farmer.arableArea,
        city: farmer.city,
        farmName: farmer.farmName,
        state: farmer.state,
        vegetationArea: farmer.vegetationArea,
        foodsPlanted: {
          createMany: {
            data: farmer.foodsPlanted,
            skipDuplicates: true
          }
        },
        identifier: farmer.identifier
      },
      select: {
        name: true,
        arableArea: true,
        city: true,
        farmName: true,
        vegetationArea: true,
        state: true,
        identifier: true
      }
    })
  }
}