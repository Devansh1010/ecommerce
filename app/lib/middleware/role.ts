import { requireAuth } from './auth'
import { USER_ROLE } from '@/app/lib/constants/user.constant'

export async function requireAdmin() {
    const user = await requireAuth()

    if (user.role !== USER_ROLE.ADMIN) {
        throw new Error('Forbidden')
    }

    return user
}
