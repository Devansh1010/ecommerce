import { cookies } from 'next/headers'
import { successResponse } from '@/app/lib/utils/api-responce'
import { HTTP_STATUS } from '@/app/lib/constants/http-status.constant'

export async function POST() {
  const cookieStore = await cookies()

  cookieStore.set('access_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0, // immediately expires
  })

  return successResponse(
    null,
    HTTP_STATUS.NO_CONTENT,
    'Logged out successfully'
  )
}
