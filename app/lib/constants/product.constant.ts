export const KITCHEN_TYPES = {
  COOKWARE: 'COOKWARE',
  UTENSIL: 'UTENSIL',
  STORAGE: 'STORAGE',
  APPLIANCE: 'APPLIANCE',
} as const

export type KitchenType =
  typeof KITCHEN_TYPES[keyof typeof KITCHEN_TYPES]


export const PRODUCT_STATUS = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
  ARCHIVED: 'ARCHIVED',
} as const

export type ProductStatus =
  typeof PRODUCT_STATUS[keyof typeof PRODUCT_STATUS]
