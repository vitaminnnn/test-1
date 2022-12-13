import { NextResponse } from 'next/server';
import { TOKEN_KEY } from '@/common/constants/cookies';

export function middleware(req, res) {
  const url = req.nextUrl;
  let changed = false;
  const token = url.searchParams.get(TOKEN_KEY);
  const redirect_url = url.searchParams.get('redirect_url');

  if (token) {
    url.searchParams.delete('token');
    return NextResponse.redirect(url).cookie(TOKEN_KEY, token);
    // return NextResponse.redirect(`http://localhost:3000/ru/${redirect_url}`)
    // changed = true
  }
  if (changed) {
    return NextResponse.redirect(`http://localhost:3000/ru/${redirect_url}`);
  }
}

// export const config = {
//   matcher: [''],
// }
