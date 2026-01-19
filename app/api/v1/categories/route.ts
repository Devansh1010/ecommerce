// app/api/categories/route.ts
import { NextRequest } from 'next/server'
import { CategoryModel } from '@/app/models/catagory.model'
import { successResponse, errorResponse } from '@/app/lib/utils/api-responce'
import { requireAdmin } from '@/app/lib/middleware/role'
import { requireAuth } from '@/app/lib/middleware/auth'
import { HTTP_STATUS } from '@/app/lib/constants/http-status.constant'

export async function POST(req: NextRequest) {
    try {
        await requireAdmin()

        const body = await req.json()
        const { name, slug, description, parentId, attributes } = body

        if (!name || !slug) {
            return errorResponse('Name and slug required', 400)
        }

        const exists = await CategoryModel.findOne({ slug })
        if (exists) {
            return errorResponse('Category already exists', 409)
        }

        const category = await CategoryModel.create({
            name,
            slug,
            description,
            parentId: parentId || null,
            attributes,
            isActive: true,
        })

        return successResponse(category, 201, "Category Created")
    } catch (err: any) {
        return errorResponse(err.message, 500)
    }
}

export async function GET() {
    try {

        await requireAuth()

        const categories = await CategoryModel.find({ isActive: true })
            .select('-__v')
            .lean()

        return successResponse(categories, HTTP_STATUS.OK)
    } catch {
        return errorResponse('Failed to fetch categories', HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
}

