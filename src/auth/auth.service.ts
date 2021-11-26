import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'

import { auth } from 'google-auth-library'
import { Request } from 'express'
import { AuthStatus, DecodedJWTToken } from './dto/auth.dto'
import { FIREBASE_ADMIN } from 'src/main'

@Injectable()
export class AuthService {
  public decodeIdTokenFromHeaders(req: Request) {
    const authHeader = req.headers.authorization
    if (!authHeader) throw new Error('no authHeader')
    return jwt_decode(authHeader.split(' ')[1]) as DecodedJWTToken
  }

  public decodeIdToken(idToken: string) {
    return jwt_decode(idToken) as DecodedJWTToken
  }

  public async createCsrfToken(req: Request) {
    const decodedToken = this.decodeIdTokenFromHeaders(req)
    const uid = decodedToken.user_id

    const payload = { uid }
    const creds = await auth.getCredentials()
    const privateKey = creds.private_key
    const csrfToken = jwt.sign(payload, privateKey, { algorithm: 'RS256' })
    return csrfToken as string
  }

  public createCustomToken(uid: string) {
    try {
      return FIREBASE_ADMIN.auth.createCustomToken(uid)
    } catch (e) {
      console.log(e)
      return 'error'
    }
  }

  public async checkAuthStatus(req: Request): Promise<AuthStatus> {
    const idToken = req.cookies.__session
    if (!idToken) return { status: 'false', customToken: null }

    const uid = this.decodeIdToken(idToken).user_id
    const customToken = await this.createCustomToken(uid)

    if (customToken) return { status: 'true', customToken }

    throw new Error('no custom token')
  }
}
