import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { FIREBASE_ADMIN } from './main'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    const ref = FIREBASE_ADMIN.db.collection('users')
    const data = await ref.get()
    data.forEach((e) => {
      console.log(e.data())
    })
    return this.appService.getHello()
  }
}
