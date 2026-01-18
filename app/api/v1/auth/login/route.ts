import { successResponse, errorResponse } from '@/app/lib/utils/api-responce'
import { HTTP_STATUS } from '@/app/lib/constants/http-status.constant'
import { loginUser } from '@/app/lib/services/auth.service'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
    try {
        const body = await req.json()

        if (!body.email || !body.password) {
            return errorResponse('Invalid credentials', HTTP_STATUS.BAD_REQUEST)
        }

        const { token, user } = await loginUser({
            email: body.email,
            password: body.password,
        })

        const cookieStore = await cookies()

        cookieStore.set('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
        })

        return successResponse(
            user,
            HTTP_STATUS.OK,
            'Login successful'
        )
    } catch (err: any) {
        return errorResponse(
            err.message,
            HTTP_STATUS.UNAUTHORIZED
        )
    }
}
