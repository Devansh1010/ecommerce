import { HTTP_STATUS } from "@/app/lib/constants/http-status.constant"
import { errorResponse, successResponse } from "@/app/lib/utils/api-responce"
import { CategoryModel } from "@/app/models/catagory.model"

export async function GET() {
    try {
        // 1. Fetch all active categories (flat)
        const categories = await CategoryModel.find({ isActive: true })
            .select('-__v')
            .lean()

        // 2. Create a map for O(1) lookup
        const categoryMap = new Map<string, any>()
        const tree: any[] = []

        // 3. Initialize map with empty children array
        for (const category of categories) {
            categoryMap.set(category._id.toString(), {
                ...category,
                children: [],
            })
        }

        // 4. Build parent → children relationship
        for (const category of categories) {
            const categoryId = category._id.toString()

            if (category.parentId) {
                const parentId = category.parentId.toString()
                const parent = categoryMap.get(parentId)

                if (parent) {
                    parent.children.push(categoryMap.get(categoryId))
                }
            } else {
                // Root category
                tree.push(categoryMap.get(categoryId))
            }
        }

        return successResponse(tree, HTTP_STATUS.OK)
    } catch (error: any) {
        return errorResponse(
            error.message || 'Failed to fetch category tree',
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        )
    }
}