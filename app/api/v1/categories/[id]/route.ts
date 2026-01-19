// app/api/categories/[id]/route.ts
import { NextRequest } from 'next/server'
import { CategoryModel } from '@/app/models/catagory.model'
import { successResponse, errorResponse } from '@/app/lib/utils/api-responce'
import { requireAdmin } from '@/app/lib/middleware/role'
import { HTTP_STATUS } from '@/app/lib/constants/http-status.constant'

export async function GET(
    _: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        console.log(params)
        const category = await CategoryModel.findById(params.id)
            .select('-__v')
            .lean()

        if (!category) {
            return errorResponse('Category not found', HTTP_STATUS.NOT_FOUND)
        }

        return successResponse(category, HTTP_STATUS.OK)
    } catch {
        return errorResponse('Invalid category id', HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await requireAdmin()

        const body = await req.json()

        const updated = await CategoryModel.findByIdAndUpdate(
            params.id,
            { $set: body },
            { new: true }
        )

        if (!updated) {
            return errorResponse('Category not found', HTTP_STATUS.NOT_FOUND)
        }

        return successResponse(updated, HTTP_STATUS.CREATED)
    } catch (err: any) {
        return errorResponse(err.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {

        await requireAdmin()

        const category = await CategoryModel.findByIdAndUpdate(
            params.id,
            { isActive: false },
            { new: true }
        )

        if (!category) {
            return errorResponse('Category not found', HTTP_STATUS.NOT_FOUND)
        }

        return successResponse(
            null,
            HTTP_STATUS.OK,
            'Category deactivated successfully'
        )
    } catch (error: any) {
        return errorResponse(error.message || 'Failed to delete category', HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
}

