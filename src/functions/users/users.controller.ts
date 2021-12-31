import { Controller, Get, Response, UseGuards } from '@nestjs/common'
import { GuardResponse } from 'src/common-functions/decorators/guard-response'
import { AuthGuard } from 'src/guards/auth.guard'
import { UserInfoDto } from './users-dto/user-info.dto'
import { UsersService } from './users.service'

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@GuardResponse() userInfo: UserInfoDto, @Response() res) {
    res.send({ status: 'success' })
  }
}
