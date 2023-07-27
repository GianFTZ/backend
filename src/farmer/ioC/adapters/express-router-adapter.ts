import { Request, Response } from 'express'
import { Controller } from '../../presentation'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
    }
    const httpResponse = await controller.handle({ body: request })
    if (httpResponse.status >= 200 && httpResponse.status <= 299) {
      res.status(httpResponse.status).json(httpResponse.body)
    } else {
      res.status(httpResponse.status).json({
        error: httpResponse.body.message
      })
    }
  }
}