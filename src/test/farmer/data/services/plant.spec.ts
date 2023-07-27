import { Farmer } from "@prisma/client";
import { IFarmerPlantFoodRepository } from "../../../../farmer/data/contracts/plant-repository";
import { PlantFoodFarmerService } from "../../../../farmer/data/services/plant";
import { Food } from "../../../../farmer/domain";
import { describe, expect, test, vi } from "vitest";
import { FoodModel } from "../../../../farmer/data/models/food";

class FarmerPlantFoodRepositoryStub implements IFarmerPlantFoodRepository {
  private data: {name: string, foods: FoodModel[]}[] = [{ name: "tester", foods: [{name: "Algodao", quantity: 1}] }]
  public async plant(food: FoodModel, identifier: string): Promise<FoodModel> {
    try {
      this.data
      .find(farmer => farmer.name == identifier)
      ?.foods.find(_food => {
        if(_food.name == food.name) {
          _food.quantity += food.quantity
        }
      })
      const res = this.data
      .find(farmer => farmer.name == identifier)
      ?.foods.find(_food => _food.name == food.name)
      if(!res) throw new Error()
    } catch (_) {
      this.data.find(food => food.name == identifier)?.foods.push(food)
    } finally {
      return food
    }
  }
}

async function makeSut() {
  const repository = new FarmerPlantFoodRepositoryStub()
  const sut = new PlantFoodFarmerService(repository)
  return {
    sut,
    repository
  }
}

describe("plant food farmer service", () => {
  test("should calls the food repository if valid params provided", async () => {
    const data: { food: Food, identifier: string } = {
      food: {
        name: "Milho",
        quantity: 2
      },
      identifier: "tester"
    }
    const { repository, sut } = await makeSut()
    const spy = vi.spyOn(repository, "plant")
    await sut.plant(data.food, data.identifier)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test("should throw an error if the food repository throws", async () => {
    const data: { food: Food, identifier: string } = {
      food: {
        name: "Milho",
        quantity: 2
      },
      identifier: "tester"
    }
    const { repository, sut } = await makeSut()
    vi.spyOn(repository, "plant").mockRejectedValue({})
    const res = sut.plant(data.food, data.identifier)
    expect(res).rejects.toThrow("Could not plant this food")
  })
})