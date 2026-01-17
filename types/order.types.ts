import { ObjectId } from 'mongoose'

export interface Order {
  _id: ObjectId

  orderNumber: string        // ORD-2026-000123

  userId: ObjectId           // customer

  items: {
    productId: ObjectId
    variantId: ObjectId

    title: string            // snapshot
    sku: string

    quantity: number

    pricing: {
      mrp: number
      sellingPrice: number
      gstPercent: number
      taxInclusive: boolean
    }

    subtotal: number
  }[]

  pricingSummary: {
    itemsTotal: number
    gstTotal: number
    shippingCharge: number
    discount: number
    grandTotal: number
  }

  shippingAddress: {
    name: string
    phone: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    pincode: string
  }

  orderStatus:
    | 'CREATED'
    | 'CONFIRMED'
    | 'PACKED'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'CANCELLED'
    | 'RETURNED'

  paymentStatus:
    | 'PENDING'
    | 'PAID'
    | 'FAILED'
    | 'REFUNDED'

  createdAt: Date
  updatedAt: Date
}
