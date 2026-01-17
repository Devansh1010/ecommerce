import { ObjectId } from 'mongoose'

export interface Cart {
  _id: ObjectId

  userId: ObjectId

  items: {
    productId: ObjectId
    variantId: ObjectId
    quantity: number
  }[]

  updatedAt: Date
  createdAt: Date
}
