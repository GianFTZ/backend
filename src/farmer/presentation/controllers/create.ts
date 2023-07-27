import { z } from "zod"
import { Controller } from "../protocols/controller"
import { Http } from "../protocols/http"
import { ICreateFarmerUseCase } from "../../domain/usecases/create"

export class CreateFarmerController implements Controller {
  private schema = z.object({
      identifier: z.string().nonempty({ message: "a name is required" }).max(50),
      name: z.string().nonempty({ message: "an name is required" }),
      city: z.string().nonempty({ message: "an city is required" }),
      state: z.string().nonempty({ message: "an state is required" }),
      arableArea: z.string().nonempty({ message: "an arableArea is required" }),
      vegetationArea: z.string().nonempty({ message: "an vegetationArea is required" }),
      farmName: z.string().nonempty({ message: "a farmName is required" }).min(8).max(100)
  })
  constructor(
      private readonly service: ICreateFarmerUseCase
  ) { }
  public async handle(req: Http.Request): Promise<Http.Response> {
      try {
          this.schema.parse(req.body)
          const response = await this.service.create({
            name: req.body.name,
            arableArea: req.body.arableArea,
            city: req.body.city,
            farmName: req.body.farmName,
            foodsPlanted: [],
            identifier: req.body.identifier,
            state: req.body.state,
            vegetationArea: req.body.vegetationArea
          })
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