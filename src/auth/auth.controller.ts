import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'
import { FIREBASE_ADMIN, FIREBASE_CLIENT } from 'src/main'
import { FirebaseAdmin } from 'src/common/firebase-admin'
import { FirebaseClient } from 'src/common/firebase-client'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  signInWithFirebaseUi(@Res() res: Response) {
    return res.render(
      `${process.env.HTML_NAME}`,
      {
        title: 'Identity',
        firebaseConfig: FIREBASE_CLIENT.firebaseConfig,
        signInRedirectURL: `${process.env.SIGN_IN_REDIRECT_URL}`,
        sessionLogin: `${process.env.IDENTITY_SERVICE_URL}/sessionLogin`,
      },
      (err, html) => {
        res.send(html)
      },
    )
  }

  @Get('sessionLogin')
  async sessionLogin(@Req() req: Request, @Res() res: Response) {
    const idToken = req.headers.authorization.split(' ')[1]
    const csrfToken = await this.authService.createCsrfToken(req)
    const expiresIn = 60 * 60 * 24 * 5 * 1000
    const options = { maxAge: expiresIn, httpOnly: true, secure: true }
    // console.log(csrfToken)
    // res.cookie('csrfToken', csrfToken, options)
    FIREBASE_ADMIN.auth.createSessionCookie(idToken, { expiresIn }).then(
      (sessionCookie) => {
        res.cookie('__session', sessionCookie, options)
        res.cookie('csrfToken', csrfToken, options)
        res.end(JSON.stringify({ status: 'success' }))
      },
      (error) => {
        res.status(401).send('UNAUTHORIZED REQUEST!')
        console.log(error)
      },
    )
  }
}
