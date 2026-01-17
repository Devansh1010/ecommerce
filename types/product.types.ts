import { ObjectId } from 'mongoose'
import { KitchenType, ProductStatus } from '@/app/lib/constants/product.constant'

export interface Product {
  _id: ObjectId

  title: string
  slug: string
  description: string
  brand?: string

  categoryId: ObjectId
  sellerId: ObjectId

  kitchenType: KitchenType

  variants: {
    _id: ObjectId
    sku: string

    attributes: Record<string, string | string[]>

    pricing: {
      mrp: number
      sellingPrice: number
      discountPercent?: number
      gstPercent: number
      taxInclusive: boolean
    }

    inventory: {
      total: number
      reserved: number
      available: number
      lowStockThreshold: number
    }

    media: {
      images: string[]
      videos?: string[]
    }
  }[]

  compliance?: {
    foodGrade?: boolean
    bpaFree?: boolean
    isoCertified?: boolean
  }

  status: ProductStatus
  isActive: boolean

  createdAt: Date
  updatedAt: Date
}
