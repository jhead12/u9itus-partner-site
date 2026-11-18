import { NextResponse } from 'next/server';
import { targetFor } from './target.mjs';

// Every request goes to U9itus. The X-U9itus-Site header tells U9itus which
// domain the visitor typed, so it serves the page connected to that domain
// (you enter it under "Your own domain" in the portal builder).
export function middleware(request) {
  const target = targetFor(request.nextUrl.pathname, request.nextUrl.search);
  if (!target) {
    return new NextResponse(
      'U9ITUS_PAGE_URL is missing or not a U9itus page address (https://…/portal/your-company). Set it in Vercel → Settings → Environment Variables, then redeploy.',
      { status: 500, headers: { 'content-type': 'text/plain; charset=utf-8' } },
    );
  }

  const headers = new Headers(request.headers);
  // The Host header is the domain the visitor typed (nextUrl.hostname can be the server's own name).
  const host = (request.headers.get('host') || request.nextUrl.hostname).replace(/:\d+$/, '');
  headers.set('x-u9itus-site', host);

  return NextResponse.rewrite(target, { request: { headers } });
}

export const config = {
  matcher: '/:path*',
};
