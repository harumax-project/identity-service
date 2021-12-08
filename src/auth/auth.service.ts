import { Injectable, Res } from '@nestjs/common'
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
    try {
      const decodedToken = this.decodeIdTokenFromHeaders(req)
      const uid = decodedToken.user_id
      const payload = { uid }
      const privateKey = (await auth.getCredentials()).private_key
      console.log(privateKey)
      // const privateKey = creds.private_key
      const csrfToken = jwt.sign(payload, privateKey, { algorithm: 'RS256' })
      return csrfToken as string
    } catch (e) {
      console.log(e)
      return 'error'
    }
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

  public getRedirectUrl(req: Request): string {
    const referer = req.headers.referer
    return !referer
      ? `${process.env.IDENTITY_SERVICE_URL}/auth/navigate`
      : referer
  }

  public async logout(req: Request) {
    const sessionToken = req.cookies.__session
    if (!sessionToken) return { status: 'false', customToken: null }

    const uid = this.decodeIdToken(sessionToken).user_id
    const adminAuth = FIREBASE_ADMIN.auth
    try {
      // await adminAuth
      //   .revokeRefreshTokens(uid)
      //   .then(() => {
      //     console.log(uid)
      //     return adminAuth.getUser(uid)
      //   })
      //   .then((userRecord) => {
      //     return new Date(userRecord.tokensValidAfterTime).getTime() / 1000
      //   })
      //   .then((timestamp) => {
      //     console.log(`Tokens revoked at: ${timestamp}`)
      //   })
    } catch (e) {
      console.log(e)
      return 'error'
    }
  }
}
