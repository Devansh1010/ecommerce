import { cookies } from 'next/headers'
import { verifyToken } from '@/app/lib/utils/jwt'
import { UserModel } from '@/app/models/user.model'

export async function requireAuth() {
    const token = (await cookies()).get('access_token')?.value

    if (!token) {
        throw new Error('Unauthorized')
    }

    const payload = verifyToken(token)

    const user = await UserModel.findById(payload.userId).select(
        '_id email role isActive'
    )

    if (!user || !user.isActive) {
        throw new Error('Account disabled')
    }

    return user
}
