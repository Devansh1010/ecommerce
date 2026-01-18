import bcrypt from 'bcrypt'
import { UserModel } from '@/app/models/user.model'
import { USER_ROLE, LOGIN_PROVIDER } from '@/app/lib/constants/user.constant'
import { signToken } from '../utils/jwt'

export async function registerUser(input: {
  name: string
  email: string
  password: string
  phone?: string
}) {
  const email = input.email.toLowerCase().trim()

  const existingUser = await UserModel.findOne({ email })
  if (existingUser) {
    throw new Error('Email already registered')
  }

  const passwordHash = await bcrypt.hash(input.password, 10)

  const user = await UserModel.create({
    name: input.name,
    email,
    phone: input.phone,
    passwordHash,
    role: USER_ROLE.CUSTOMER,
    loginProvider: LOGIN_PROVIDER.CREDENTIALS,
    isActive: true,
  })

  return {
    id: user._id,
    email: user.email,
    name: user.name,
  }
}

export async function loginUser(input: {
  email: string
  password: string
}) {
  const email = input.email.toLowerCase().trim()

  const user = await UserModel
    .findOne({ email })
    .select('+passwordHash')

  if (!user) {
    throw new Error('Invalid credentials')
  }

  if (!user.isActive) {
    throw new Error('Account is disabled')
  }

  const isMatch = await bcrypt.compare(
    input.password,
    user.passwordHash
  )

  if (!isMatch) {
    throw new Error('Invalid credentials')
  }

  const token = signToken({
    userId: user._id.toString(),
    role: user.role,
  })

  user.lastLoginAt = new Date()
  await user.save()

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
  }
}
