import { HTTP_STATUS } from "@/app/lib/constants/http-status.constant";
import { requireAuth } from "@/app/lib/middleware/auth";
import { errorResponse, successResponse } from "@/app/lib/utils/api-responce";
import { UserModel } from "@/app/models/user.model";

export async function GET() {

    const userDetails = await requireAuth()

    const userId = userDetails._id

    if (!userId) {
        return errorResponse(
            'User Not Found',
            HTTP_STATUS.UNAUTHORIZED
        )
    }
    const user = await UserModel.findById(userId).select(
        '-passwordHash -__v'
    )

    if (!user) {
        return errorResponse(
            'User Details Not Found',
            HTTP_STATUS.UNAUTHORIZED
        )
    }

    return successResponse(
        user,
        HTTP_STATUS.OK,
        'User Details Fetched Successfully'
    )
}