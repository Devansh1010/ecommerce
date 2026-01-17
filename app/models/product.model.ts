import { Schema, model, models } from 'mongoose'
import { Product } from '@/types/product.types'
import {
  KITCHEN_TYPES,
  PRODUCT_STATUS,
} from '@/app/lib/constants/product.constant'

const ProductSchema = new Schema<Product>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    description: {
      type: String,
    },

    brand: {
      type: String,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    kitchenType: {
      type: String,
      enum: Object.values(KITCHEN_TYPES),
      required: true,
    },

    variants: [
      {
        sku: {
          type: String,
          required: true,
          unique: true,
        },

        attributes: {
          type: Map,
          of: Schema.Types.Mixed,
          required: true,
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
          discountPercent: {
            type: Number,
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

        inventory: {
          total: {
            type: Number,
            required: true,
          },
          reserved: {
            type: Number,
            default: 0,
          },
          available: {
            type: Number,
            required: true,
          },
          lowStockThreshold: {
            type: Number,
            default: 5,
          },
        },

        media: {
          images: {
            type: [String],
            required: true,
          },
          videos: {
            type: [String],
          },
        },
      },
    ],

    compliance: {
      foodGrade: {
        type: Boolean,
      },
      bpaFree: {
        type: Boolean,
      },
      isoCertified: {
        type: Boolean,
      },
    },

    status: {
      type: String,
      enum: Object.values(PRODUCT_STATUS),
      default: PRODUCT_STATUS.DRAFT,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

export const ProductModel =
  models.Product || model<Product>('Product', ProductSchema)
