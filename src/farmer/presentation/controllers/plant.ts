import { z } from "zod"
import { Controller } from "../protocols/controller"
import { Http } from "../protocols/http"
import { IFarmerPlantFoodUseCase } from "../../domain/usecases/plant"

export class PlantFoodFarmerController implements Controller {
  private schema = z.object({
      identifier: z.string().nonempty({ message: "a identifier is required" }),
      food: z.object({
        name: z.string().nonempty(),
        quantity: z.number()
      })
  })
  constructor(
      private readonly service: IFarmerPlantFoodUseCase
  ) { }
  public async handle(req: Http.Request): Promise<Http.Response> {
      try {
          this.schema.parse(req.body)
          const response = await this.service.plant(req.body.food, req.body.identifier)
          return {
             status: 201,
             body: response
          }
      } catch (error) {
          return {
              body: { message: `a required field was not filled` },
              status: 400
          }
      }
  }
}