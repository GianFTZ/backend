import { describe } from "node:test";
import { expect, test, vi } from "vitest";
import { FarmerModel } from "../../../../farmer/data/models/farmer";
import { CreateFarmerService } from "../../../../farmer/data/services/create";
import { ICreateFarmerRepository } from "../../../../farmer/data/contracts/create-repository";

class CreateFarmerRepositoryStub implements ICreateFarmerRepository {
  public async create(data: FarmerModel): Promise<FarmerModel> {
    return data
  }
}

async function makeSut() {
  const repository = new CreateFarmerRepositoryStub()
  const sut = new CreateFarmerService(repository);
  return {
    sut,
    repository
  }
}

describe("create farmer service", () => {
  test("should create farmer if correct values provided", async () => {
    const data: FarmerModel = {
      name: "valid.user",
      farmName: "valid.farm",
      arableArea: 1,
      foodsPlanted: [{ name: "Algodao", quantity: 1}],
      city: "valid.city",
      identifier: "valid.identifier",
      state: "valid.state",
      vegetationArea: 1
    }
    const { sut } = await makeSut()
    const response = await sut.create(data)
    expect(response).toEqual({ name: data.name })
  })

  test("should pass farmer dto to database instead original data", async () => {
    const data: FarmerModel = {
      name: "valid.user",
      farmName: "valid.farm",
      arableArea: 1,
      foodsPlanted: [{ name: "Algodao", quantity: 1}],
      city: "valid.city",
      identifier: "valid.identifier",
      state: "valid.state",
      vegetationArea: 1
    }
    const { sut, repository } = await makeSut()
    const spy = vi.spyOn(repository, "create")
    await sut.create(data)
    expect(spy).toHaveBeenLastCalledWith({
      arableArea: data.arableArea,
      name: data.name,
      identifier: data.identifier,
      city: data.city,
      farmName: data.farmName,
      foodsPlanted: data.foodsPlanted.map(food => { return { name: food.name.toLowerCase(), quantity: food.quantity } }),
      state: data.state,
      vegetationArea: data.vegetationArea
    })
  })

  test("should throws if database throws", async () => {
    const data = {
      name: "invalid.user",
      farmName: "valid.farm",
      arableArea: 1,
      foodsPlanted: [{ name: "Algodao", quantity: 1}],
      city: "valid.city",
      identifier: "valid.identifier",
      state: "valid.state",
    }
    const { sut, repository } = await makeSut()
    vi.spyOn(repository, "create").mockRejectedValueOnce({})
    // @ts-ignore
    const response = sut.create(data)
    expect(response).rejects.toThrow()
  })
})