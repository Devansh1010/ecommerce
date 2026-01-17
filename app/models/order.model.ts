import { Schema, model, models } from 'mongoose'
import { Order } from '@/types/order.types'

const OrderSchema = new Schema<Order>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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

        title: {
          type: String,
          required: true,
        },

        sku: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        pricing: {
          mrp: {
            type: Number,
            required: true,
          },
          sellingPrice: {
            type: Number,
            required: true,
          },
          gstPercent: {
            type: Number,
            required: true,
          },
          taxInclusive: {
            type: Boolean,
            required: true,
          },
        },

        subtotal: {
          type: Number,
          required: true,
        },
      },
    ],

    pricingSummary: {
      itemsTotal: {
        type: Number,
        required: true,
      },
      gstTotal: {
        type: Number,
        required: true,
      },
      shippingCharge: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
      },
      grandTotal: {
        type: Number,
        required: true,
      },
    },

    shippingAddress: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      addressLine1: {
        type: String,
        required: true,
      },
      addressLine2: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
    },

    orderStatus: {
      type: String,
      enum: [
        'CREATED',
        'CONFIRMED',
        'PACKED',
        'SHIPPED',
        'DELIVERED',
        'CANCELLED',
        'RETURNED',
      ],
      default: 'CREATED',
      index: true,
    },

    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'],
      default: 'PENDING',
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

export const OrderModel =
  models.Order || model<Order>('Order', OrderSchema)
