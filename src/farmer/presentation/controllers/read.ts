import { z } from "zod"
import { Controller } from "../protocols/controller"
import { Http } from "../protocols/http"
import { ICreateFarmerUseCase } from "../../domain/usecases/create"
import { IReadFarmerUseCase } from "../../domain/usecases/read"

export class ReadFarmerController implements Controller {
  private schema = z.object({
      identifier: z.string().nonempty({ message: "a name is required" }).max(50),
  })
  constructor(
      private readonly service: IReadFarmerUseCase
  ) { }
  public async handle(req: Http.Request): Promise<Http.Response> {
      try {
          this.schema.parse(req.body)
          const response = await this.service.read(req.body.identifier)
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