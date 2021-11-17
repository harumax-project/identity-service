import { Body, Controller, Get, Post } from '@nestjs/common'
import { FIREBASE_ADMIN } from 'src/main'
import { AuthService } from './auth.service'
import { EmailAndPassword } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('sign_in_with_email')
  async getAuthHello() {
    const ref = FIREBASE_ADMIN.db.collection('users')
    const data = await ref.get()
    data.forEach((e) => {
      console.log(e.data())
    })
  }

  @Post('sign_in_with_email')
  async signInWithEmail(@Body() emailAndPassword: EmailAndPassword) {
    // return this.authService.signInWithEmail(emailAndPassword)
  }
}
