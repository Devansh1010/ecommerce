import { Schema, model, models } from 'mongoose'
import { Category } from '@/types/catagory.types'

const CategorySchema = new Schema<Category>(
  {
    name: {
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

    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },

    attributes: [
      {
        key: {
          type: String,
          required: true,
        },
        label: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ['string', 'number', 'boolean', 'select'],
          required: true,
        },
        required: {
          type: Boolean,
          default: false,
        },
        filterable: {
          type: Boolean,
          default: false,
        },
        options: {
          type: [String],
          default: [],
        },
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

export const CategoryModel =
  models.Category || model<Category>('Category', CategorySchema)
