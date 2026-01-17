import { ObjectId } from 'mongoose'

export interface Category {
  _id: ObjectId

  name: string
  slug: string
  description?: string

  parentId?: ObjectId | null

  attributes: {
    key: string
    label: string
    type: 'string' | 'number' | 'boolean' | 'select'
    required: boolean
    filterable: boolean
    options?: string[]
  }[]

  isActive: boolean

  createdAt: Date
  updatedAt: Date
}
