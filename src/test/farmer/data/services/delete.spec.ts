import { describe, expect, test, vi } from "vitest";
import { IDeleteFarmerRepository } from "../../../../farmer/data/contracts/delete-repository";
import { FarmerModel } from "../../../../farmer/data/models/farmer";
import { DeleteFarmerService } from "../../../../farmer/data/services/delete";


class DeleteFarmerRepositoryStub implements IDeleteFarmerRepository {
  private data = [{identifier: "farmer-stub", name: "john doe"}]
  public async delete(farmerIdentifier: string): Promise<Pick<FarmerModel, "name">> {
    const res = this.data.find(farmer => farmer.identifier == farmerIdentifier)
    if(!res) throw new Error("Couldn't find farmer with this identifier")
    return {
      name: res.name
    }
  }
}

async function makeSut() {
  const repository = new DeleteFarmerRepositoryStub()
  const sut = new DeleteFarmerService(repository)
  return {
    sut,
    repository
  }
}

describe("delete farmer service", () => {
  test("should delete if correct values is provided", async () => {
    const data = {
      identifier: "farmer-stub"
    }
    const { sut } = await makeSut()
    const res = sut.delete(data.identifier)
    expect(res).not.rejects
  })

  test("should does not delete if invalid values is provided", async () => {
    const data = {
      identifier: "farmer"
    }
    const { sut } = await makeSut()
    const res = sut.delete(data.identifier)
    expect(res).rejects.toThrow("Error deleting")
  })

  test("should throw an error if db doesn't return a name", async () => {
    const data = {
      identifier: "farmer"
    }
    const { sut, repository } = await makeSut()
    // @ts-ignore
    const spy = vi.spyOn(repository, "delete").mockResolvedValue({ email: "test@sample" })
    const res = sut.delete(data.identifier)
    expect(res).rejects.toThrow("Error deleting")
  })
})