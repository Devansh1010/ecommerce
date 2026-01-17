export type UserRole = 'customer' | 'admin' | 'staff'
export type LoginProvider = 'credentials' | 'google'
export type AddressLabel = 'home' | 'office' | 'other'

export interface Address {
    label: AddressLabel
    name: string
    phone: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    pincode: string
    country: string
    isDefault: boolean
}

export interface User {
    _id: string

    // Identity
    email: string
    passwordHash: string
    phone?: string

    // Role & status
    role: UserRole
    isActive: boolean

    // Profile
    name: string
    avatar?: string

    // Addresses
    addresses: Address[]

    // Activity
    orderCount: number
    lastOrderAt?: Date
    lastLoginAt?: Date
    loginProvider: LoginProvider

    // System
    createdAt: Date
    updatedAt: Date
}
