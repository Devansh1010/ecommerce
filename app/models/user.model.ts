import { Schema, model, models } from 'mongoose'
import type { User, Address } from '@/types/user.types'
import { ADDRESS_LABEL, USER_ROLE } from '../lib/constants/user.constant'

const AddressSchema = new Schema<Address>(
    {
        label: {
            type: String,
            enum: Object.values(ADDRESS_LABEL),
            default: ADDRESS_LABEL.HOME,
        },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: String,
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        country: { type: String, default: 'India' },
        isDefault: { type: Boolean, default: false },
    },
    { _id: false }
)

const UserSchema = new Schema<User>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        passwordHash: { type: String, required: true, select: false },
        phone: String,

        role: {
            type: String,
            enum: Object.values(USER_ROLE),
            default: USER_ROLE.CUSTOMER,
        },

        //Insted of delete the user make it false to restict user form login
        isActive: { type: Boolean, default: true },

        name: { type: String, required: true },
        avatar: String,

        addresses: { type: [AddressSchema], default: [] },

        orderCount: { type: Number, default: 0 },
        lastOrderAt: Date,
        lastLoginAt: Date,

        loginProvider: {
            type: String,
            enum: ['credentials', 'google'],
            default: 'credentials',
        },
    },
    { timestamps: true }
)

export const UserModel =
    models.User || model<User>('User', UserSchema)
