import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

export async function middleware(request: NextRequest) {
  console.log('Middleware running');
  // Only run on homepage
  if (request.nextUrl.pathname === '/') {
    console.log('Checking token');
      const token = request.cookies.get('mailingList');

      if (!token) {
        console.log('No token found');
        return NextResponse.next();
      }

      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jose.jwtVerify(token.value, secret);
        console.log('Token is valid');
        return NextResponse.redirect(new URL('/activity', request.url));
      } catch (error) {
        console.log('Token is invalid:', error);
        return NextResponse.next();
      }

  }

}

export const config = {
  matcher: '/',
}