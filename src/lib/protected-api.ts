// import { authServer } from '@/config/auth.config'
// import { NextRequest, NextResponse } from 'next/server'

// // Type for protected handler
// type ProtectedHandler = (
//   req: NextRequest,
//   user: {
//     id: string
//     email: string
//     name?: string | null
//     image?: string | null
//   }
// ) => Promise<Response>

// // Wrapper to protect any API route
// export function protectedAPI(handler: ProtectedHandler) {
//   return async (req: NextRequest): Promise<NextResponse> => {
//     try {
//       const session = await authServer.getSession()

//       if (!session.user) {
//         return NextResponse.json(
//           { error: 'Unauthorized: Login required' },
//           { status: 401 }
//         )
//       }

//       // Call the actual handler with the user
//       return await handler(req, session.user)
//     } catch (err) {
//       console.error('Auth error in protected route:', err)
//       return NextResponse.json(
//         { error: 'Internal server error' },
//         { status: 500 }
//       )
//     }
//   }
// }