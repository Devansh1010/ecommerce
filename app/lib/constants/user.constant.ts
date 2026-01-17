export const USER_ROLE = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  STAFF: 'staff',
} as const

export type UserRole =
  typeof USER_ROLE[keyof typeof USER_ROLE]

/* ------------------------------------ */

export const LOGIN_PROVIDER = {
  CREDENTIALS: 'credentials',
  GOOGLE: 'google',
} as const

export type LoginProvider =
  typeof LOGIN_PROVIDER[keyof typeof LOGIN_PROVIDER]

/* ------------------------------------ */

export const ADDRESS_LABEL = {
  HOME: 'home',
  OFFICE: 'office',
  OTHER: 'other',
} as const

export type AddressLabel =
  typeof ADDRESS_LABEL[keyof typeof ADDRESS_LABEL]
