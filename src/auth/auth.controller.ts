import { Body, Controller, Get, Post, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Response } from 'express'
import { FIREBASE_CLIENT } from 'src/main'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  root(@Res() res: Response) {
    return res.render(
      `${process.env.HTML_NAME}`,
      {
        title: 'Identity',
        firebaseConfig: FIREBASE_CLIENT.firebaseConfig,
        signInRedirectURL: 'http://localhost:3000/auth',
      },
      (err, html) => {
        res.send(html)
      },
    )
  }
}
