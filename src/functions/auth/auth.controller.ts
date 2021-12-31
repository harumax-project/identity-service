import { Controller, Delete, Get, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'
import { FirebaseClientService } from '../../common-functions/firebase-client/firebase-client.service'
import { FirebaseAdminService } from '../../common-functions/firebase-admin/firebase-admin.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private firebaseClint: FirebaseClientService,
    private firebaseAdmin: FirebaseAdminService,
  ) {}
  @Get()
  getRoot(@Req() req: Request, @Res() res: Response) {
    res.json({ message: 'identity service is alive' })
  }

  @Get('login')
  signInWithFirebaseUi(@Req() req: Request, @Res() res: Response) {
    const redirectURL = this.authService.getRedirectUrl(req)
    const sessionToken = req.cookies.__session
    if (sessionToken) {
      return res.render('navigate')
    }
    return res.render(
      `${process.env.FIREBASE_PROJECT_ID}`,
      {
        title: 'Identity',
        firebaseConfig: this.firebaseClint.firebaseConfig,
        signInRedirectURL: redirectURL,
        sessionLogin: `${process.env.IDENTITY_SERVICE_URL}/auth/session_login`,
      },
      (err, html) => {
        res.send(html)
      },
    )
  }

  @Get('navigate')
  navigate(@Req() req: Request, @Res() res: Response) {
    return res.render(
      'navigate',
      {
        title: 'navigate',
      },
      (err, html) => {
        res.send(html)
      },
    )
  }

  @Get('session_login')
  async sessionLogin(@Req() req: Request, @Res() res: Response) {
    console.log('session login')
    const idToken = req.headers.authorization.split(' ')[1]
    const csrfToken = await this.authService.createCsrfToken(req)
    if (csrfToken === 'error') res.status(500).send('Internal server error')
    const expiresIn = 60000 * 5
    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      domain: process.env.BASE_DOMAIN,
    }
    this.firebaseAdmin.auth.createSessionCookie(idToken, { expiresIn }).then(
      (sessionCookie) => {
        res.cookie('__session', sessionCookie, options)
        res.cookie('__Secure_csrf', csrfToken, options)
        res.send(JSON.stringify({ status: 'success' }))
      },
      (error) => {
        res.status(401).send('UNAUTHORIZED REQUEST!')
        console.log(error)
      },
    )
  }

  @Get('status')
  async checkAuthStatus(@Req() req: Request, @Res() res: Response) {
    console.log('check auth status')
    const csrfToken = req.cookies.__Secure_csrf
    const sessionToken = req.cookies.__session
    if (!csrfToken || !sessionToken)
      return res.json({ status: 'false', customToken: null })
    const isSecure = await this.authService.checkCsrfToken(
      csrfToken,
      sessionToken,
    )
    if (!isSecure) return res.json({ status: 'false', customToken: null })
    try {
      const authStatus = await this.authService.checkAuthStatus(sessionToken)
      res.json(authStatus)
    } catch (e) {
      res.status(500).send('Internal server error')
    }
  }

  @Delete('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      const options = {
        httpOnly: true,
        secure: true,
        domain: process.env.BASE_DOMAIN,
        path: '/',
      }
      res.clearCookie('__session', options)
      res.clearCookie('__Secure_csrf', options)
      await this.authService.logout(req)
      res.json({ status: 'false', customToken: null })
    } catch (e) {
      res.status(500).send('Internal server error')
    }
  }
}
