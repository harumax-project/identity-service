import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { Firebase } from './common/firebase'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly firebase: Firebase,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const ref = this.firebase.db.collection('users')
    const data = await ref.get()
    data.forEach((e) => {
      console.log(e.data())
    })
    return this.appService.getHello()
  }
}
