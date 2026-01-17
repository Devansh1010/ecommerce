import { Schema, model, models } from 'mongoose'
import { Cart } from '@/types/cart.types'

const CartSchema = new Schema<Cart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // one cart per user
      index: true,
    },

    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },

        variantId: {
          type: Schema.Types.ObjectId,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

export const CartModel =
  models.Cart || model<Cart>('Cart', CartSchema)
