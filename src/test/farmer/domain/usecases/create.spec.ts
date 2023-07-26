import { describe, expect, test } from "vitest";
import { ICreateFarmerUseCase } from "../../../../farmer/domain/usecases/create";
import { Farmer } from "../../../../farmer/domain";


class CreateFarmerRepositoryStub {
  public async create(data: Farmer): Promise<Farmer> {
    return data
  }
}

class CreateFarmerServiceStub implements ICreateFarmerUseCase {
  constructor(private readonly createFarmerRepository: CreateFarmerRepositoryStub){}
  public async create(farmer: Farmer): Promise<Pick<Farmer, "name">> {
    const data = await this.createFarmerRepository.create(farmer)
    if(!data) throw new Error(`Failed to create`)
    return {
      name: data.name
    }
  }
}

async function makeSut() {
  const repository = new CreateFarmerRepositoryStub()
  const sut = new CreateFarmerServiceStub(repository);
  return {
    sut,
    repository
  }
}

describe("create farmer use case", () => {
  test("should create farmer if correct values provided", async () => {
    const data: Farmer = {
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
    expect(response).toEqual({name: data.name})
  })
})