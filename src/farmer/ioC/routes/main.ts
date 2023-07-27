import { Router } from "express"
import { adaptRoute } from "../adapters/express-router-adapter"
import { Controller } from "../../presentation"
import { PrismaRepository } from "../../infra/repositories/prisma"
import { CreateFarmerController } from "../../presentation/controllers/create"
import { DeleteFarmerController } from "../../presentation/controllers/delete"
import { CreateFarmerService } from "../../data/services/create"
import { DeleteFarmerService } from "../../data/services/delete"
import { PlantFoodFarmerService } from "../../data/services/plant"
import { PlantFoodFarmerController } from "../../presentation/controllers/plant"
import { ReadFarmerController } from "../../presentation/controllers/read"
import { ReadFarmerService } from "../../data/services/read"

function createFarmerFactory(): Controller {
  const repository = new PrismaRepository()
  const service = new CreateFarmerService(repository)
  const controller = new CreateFarmerController(service)
  return controller
}

function deleteFarmerFactory(): Controller {
  const repository = new PrismaRepository()
  const service = new DeleteFarmerService(repository)
  const controller = new DeleteFarmerController(service)
  return controller
}

function plantFoodFarmerFactory(): Controller {
  const repository = new PrismaRepository()
  const service = new PlantFoodFarmerService(repository)
  const controller = new PlantFoodFarmerController(service)
  return controller
}

function readFarmerFactory(): Controller {
  const repository = new PrismaRepository()
  const service = new ReadFarmerService(repository)
  const controller = new ReadFarmerController(service)
  return controller
}


export default async function (router: Router): Promise<void> {
  const createFarmer = createFarmerFactory()
  const deleteFarmer = deleteFarmerFactory()
  const plantFood = plantFoodFarmerFactory()
  const readFarmer = readFarmerFactory()


  router.post('/', adaptRoute(createFarmer))
  router.delete('/', adaptRoute(deleteFarmer))
  router.post('/plant', adaptRoute(plantFood))
  router.post('/farmer', adaptRoute(readFarmer))

}