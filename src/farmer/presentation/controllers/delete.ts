import { z } from "zod"
import { Controller } from "../protocols/controller"
import { Http } from "../protocols/http"
import { IDeleteFarmerUseCase } from "../../domain/usecases/delete"

export class DeleteFarmerController implements Controller {
  private schema = z.object({
      identifier: z.string().nonempty({ message: "a name is required" }).max(50),
  })
  constructor(
      private readonly service: IDeleteFarmerUseCase
  ) { }
  public async handle(req: Http.Request): Promise<Http.Response> {
      try {
          this.schema.parse(req.body)
          await this.service.delete(req.body.identifier)
          return {
             status: 202,
             body: "success",
          }
      } catch (error) {
          return {
              body: { message: `a required field was not filled` },
              status: 400
          }
      }
  }
}