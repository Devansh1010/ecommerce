import { NextResponse } from 'next/server'
import { registerUser } from '@/app/lib/services/auth.service'

export async function POST(req: Request) {
    try {
        const body = await req.json()

        if (!body.email || !body.name || !body.password || !body.phone) {
            return NextResponse.json(
                { message: 'Please Provide All Credentials' },
                { status: 400 }
            )
        }

        const user = await registerUser({
            name: body.name,
            email: body.email,
            password: body.password,
            phone: body.phone,
        })

        return NextResponse.json(
            { message: 'User registered successfully', user },
            { status: 201 }
        )
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Registration failed' },
            { status: 400 }
        )
    }
}
