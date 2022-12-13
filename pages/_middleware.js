import { NextResponse } from 'next/server'
import { setCookie } from 'cookies-next'
// import { parseCookies, setCookie } from 'next-cookies'
import { TOKEN_KEY } from '@/common/constants/cookies'

export function middleware(req, res) {
  // const cookies = parseCookies(req)
  // const { token } = req.query
  // if (token && !cookies.token) {
  //   setCookie(res, 'token', token)
  // }
  const url = req.nextUrl
  let changed = false
  const token = url.searchParams.get(TOKEN_KEY)
  const redirect_url = url.searchParams.get('redirect_url')
  console.log(token)

  if (token) {
    setCookie(res, TOKEN_KEY, token)
    // res.cookie(TOKEN_KEY, token)
    url.searchParams.delete('token')
    // return NextResponse.redirect(`http://localhost:3000/ru/${redirect_url}`)
    // changed = true
  }
  if (changed) {
    return NextResponse.redirect(`http://localhost:3000/ru/${redirect_url}`)
  }
  // else {
  //   return NextResponse.redirect('/') // send user somewhere else
  // }
}

// export const config = {
//   matcher: [''],
// }
