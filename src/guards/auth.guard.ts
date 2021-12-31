import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { BaseGuard } from './base.guard'
import jwt_decode from 'jwt-decode'

@Injectable()
export class AuthGuard extends BaseGuard {
  constructor() {
    super()
  }

  async handleRequest(context: ExecutionContext) {
    const headers = context.switchToHttp().getRequest().headers
    const authentication = headers.authorization
    const apiUserInfo = headers['x-apigateway-api-userinfo']
    console.log(apiUserInfo)

    if (!authentication || !apiUserInfo) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
    const decodedToken = jwt_decode(apiUserInfo, { header: true })
    return decodedToken
  }
}
