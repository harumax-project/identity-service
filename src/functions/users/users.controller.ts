import { Controller, Get, Response, UseGuards } from '@nestjs/common'
import { GuardResponse } from 'src/common-functions/decorators/guard-response'
import { AuthGuard } from 'src/guards/auth.guard'
import { UserInfoDto } from './users-dto/userinfo.dto'
import { UsersService } from './users.service'

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Response() res, @GuardResponse() userInfo: UserInfoDto) {
    console.log(userInfo)
    res.send('success')
  }
}
