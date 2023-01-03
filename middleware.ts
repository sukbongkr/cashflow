// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export { default } from 'next-auth/middleware'

// See "Matching Paths" below to learn more
export const config = { matcher: ['/'],}