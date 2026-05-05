import { NextResponse, type NextRequest } from 'next/server';

function unauthorizedResponse() {
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Top Show Pro Studio"',
    },
  });
}

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith('/studio')) {
    return NextResponse.next();
  }

  const user = process.env.STUDIO_BASIC_AUTH_USER;
  const pass = process.env.STUDIO_BASIC_AUTH_PASSWORD;
  if (!user || !pass) {
    return NextResponse.next();
  }

  const header = req.headers.get('authorization');
  if (!header?.startsWith('Basic ')) {
    return unauthorizedResponse();
  }

  const decoded = atob(header.slice(6));
  const [givenUser, ...rest] = decoded.split(':');
  const givenPass = rest.join(':');
  if (givenUser !== user || givenPass !== pass) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/studio/:path*'],
};
