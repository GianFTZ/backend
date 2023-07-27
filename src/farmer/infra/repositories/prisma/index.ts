import { prisma } from "../../../../lib/common/prisma";
import { ICreateFarmerRepository } from "../../../data/contracts/create-repository";
import { IDeleteFarmerRepository } from "../../../data/contracts/delete-repository";
import { IFarmerPlantFoodRepository } from "../../../data/contracts/plant-repository";
import { IReadFarmerRepository } from "../../../data/contracts/read-repository";
import { FarmerModel } from "../../../data/models/farmer";
import { FoodModel } from "../../../data/models/food";

export class PrismaRepository
 implements ICreateFarmerRepository, 
            IDeleteFarmerRepository,
            IFarmerPlantFoodRepository,
            IReadFarmerRepository
{
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

  public async delete (farmerIdentifier: string): Promise<Pick<FarmerModel, "name">> {
    return await prisma.farmer.delete({
      where: {
        id: (await prisma.farmer.findFirst({where: { identifier: farmerIdentifier }, select: {id: true}}))?.id
      },
      select: {
        name: true
      }
    })
  }

  public async plant(food: FoodModel, identifier: string): Promise<FoodModel> {
    return (await prisma.farmer.update({
      where: {
        id: (await prisma.farmer.findFirst({where: { identifier: identifier }, select: {id: true}}))?.id
      },
      data: {
        foodsPlanted: {
          update: {
            where: {
              id: (await prisma.foodsPlanted.findFirst({ where: { name: food.name }, select: { id: true } }))?.id
            },
            data: {
              quantity: {
                increment: food.quantity
              }
            }
          }
        }
      },
      select: {
        foodsPlanted: {
          select: {
            name: true,
            quantity: true
          }
        }
      }
    })).foodsPlanted[0]
  }

  public async read(farmerIdentifier: string): Promise<FarmerModel> {
    const res = await prisma.farmer.findUnique(
      {
        where: { 
          identifier: farmerIdentifier
        },
        select: {
          arableArea: true,
          city: true,
          farmName: true,
          foodsPlanted: true,
          identifier: true,
          name: true,
          state: true,
          vegetationArea: true
        }
      }
    )
    if(!res) throw new Error("User not found")
    return res
  }
}