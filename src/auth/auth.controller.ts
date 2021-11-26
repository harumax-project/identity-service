import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'
import { FIREBASE_ADMIN, FIREBASE_CLIENT } from 'src/main'
import { FirebaseAdmin } from 'src/common/firebase-admin'
import { FirebaseClient } from 'src/common/firebase-client'
import { DecodedJWTToken } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  getRoot(@Req() req: Request, @Res() res: Response) {
    res.json({ message: 'identity service is alive' })
  }

  @Get('login')
  signInWithFirebaseUi(@Req() req: Request, @Res() res: Response) {
    const redirectURL = this.authService.getRedirectUrl(req)
    return res.render(
      `${process.env.HTML_NAME}`,
      {
        title: 'Identity',
        firebaseConfig: FIREBASE_CLIENT.firebaseConfig,
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
    const idToken = req.headers.authorization.split(' ')[1]
    const csrfToken = await this.authService.createCsrfToken(req)
    const expiresIn = 60000 * 5
    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      domain: process.env.BASE_DOMAIN,
    }
    FIREBASE_ADMIN.auth.createSessionCookie(idToken, { expiresIn }).then(
      (sessionCookie) => {
        res.cookie('__session', sessionCookie, options)
        res.cookie('csrfToken', csrfToken, options)
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
    try {
      const authStatus = await this.authService.checkAuthStatus(req)
      res.json(authStatus)
    } catch (e) {
      res.status(500).send('Internal server error')
    }
  }

  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('__session')
    res.redirect('')
  }
}
