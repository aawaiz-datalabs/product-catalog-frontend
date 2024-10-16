import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  console.log('Middleware executing for path:', req.nextUrl.pathname)
  
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  try {
    const { data: { session } } = await supabase.auth.getSession()
    console.log('Session:', session)

    if (!session) {
      console.log('No session, redirecting to login')
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Fetch the user's profile
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('userType')
      .eq('id', session.user.id)
      .single()
    console.log('Profile:', profile, 'Error:', error)

    if (error || !profile || profile.userType !== 'Admin') {
      console.log('Not an admin, redirecting to unauthorized')
      // Redirect to unauthorized page if there's an error, no profile, or the user is not an admin
      return NextResponse.redirect(new URL('/', req.url))
    }

    console.log('Admin access granted')
    // If we made it here, the user is an admin
    return res
  } catch (error) {
    console.error('Error in middleware:', error)
    return NextResponse.redirect(new URL('/error', req.url))
  }
}

export const config = {
  matcher: ['/admin/admin-panel']
}