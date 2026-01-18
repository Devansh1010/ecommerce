import { registerUser } from '@/app/lib/services/auth.service'
import { HTTP_STATUS } from '@/app/lib/constants/http-status.constant'
import { errorResponse, successResponse } from '@/app/lib/utils/api-responce'

export async function POST(req: Request) {
    try {
        const body = await req.json()

        if (!body.email || !body.name || !body.password || !body.phone) {
            return errorResponse('Please provide all the credentials', HTTP_STATUS.BAD_REQUEST)
        }

        const user = await registerUser({
            name: body.name,
            email: body.email,
            password: body.password,
            phone: body.phone,
        })

        return successResponse(user, HTTP_STATUS.CREATED, "User Created Successfully")
        
    } catch (error: any) {
        return errorResponse('Error Occured while Registering User', HTTP_STATUS.CONFLICT)
    }
}
