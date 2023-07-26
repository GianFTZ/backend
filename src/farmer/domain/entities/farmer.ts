import { Food } from "./food.js"

export type Farmer = {
  identifier: string
  name: string
  farmName: string
  city: string
  state: string
  arableArea: number
  vegetationArea: number
  foodsPlanted: Food[]
}