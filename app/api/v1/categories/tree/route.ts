import { CategoryModel } from '@/app/models/catagory.model'
import { successResponse, errorResponse } from '@/app/lib/utils/api-responce'
import { HTTP_STATUS } from '@/app/lib/constants/http-status.constant'

export async function GET() {
    try {
        const categories = await CategoryModel.find({ isActive: true })
            .select('-__v')
            .lean()

        const map = new Map<string, any>()
        const roots: any[] = []

        // prepare nodes
        categories.forEach(cat => {
            map.set(cat._id.toString(), { ...cat, children: [] })
        })

        // build tree
        categories.forEach(cat => {
            if (cat.parentId) {
                const parent = map.get(cat.parentId.toString())
                parent?.children.push(map.get(cat._id.toString()))
            } else {
                roots.push(map.get(cat._id.toString()))
            }
        })

        return successResponse(roots, HTTP_STATUS.OK)
    } catch {
        return errorResponse('Failed to build category tree', HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
}
