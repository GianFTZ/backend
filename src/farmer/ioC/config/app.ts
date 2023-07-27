import express, { Express } from "express"
import cors from 'cors'
import { setupRoutes } from "./routes"

export const setupApp = async (): Promise<Express> => {
  const app = express()
  app.use(express.json())
  app.use(cors())
  setupRoutes(app)
  return app
}