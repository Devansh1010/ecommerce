import { NextResponse } from 'next/server'
import { HTTP_STATUS } from '@/app/lib/constants/http-status.constant'

export function successResponse(
  data: any,
  status: number = HTTP_STATUS.OK,
  message?: string
) {
  return NextResponse.json(
    { success: true, data, message },
    { status }
  )
}

export function errorResponse(
  error: string,
  status: number =  HTTP_STATUS.BAD_REQUEST
) {
  return NextResponse.json(
    { success: false, error },
    { status }
  )
}
