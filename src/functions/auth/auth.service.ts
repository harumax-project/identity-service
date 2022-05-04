import { Injectable, Res } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'

import { Request } from 'express'
import { AuthStatus, DecodedJWTToken } from './dto/auth.dto'
import axios from 'axios'
import { FirebaseAdminService } from '../../common-functions/firebase-admin/firebase-admin.service'

@Injectable()
export class AuthService {
  constructor(private firebaseAdmin: FirebaseAdminService) {}

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
      const privateKey = process.env.SA_KEY.replace(/\\n/g, '\n')
      const csrfToken = jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
      })
      return csrfToken as string
    } catch (e) {
      console.log(e)
      return 'error'
    }
  }

  public createCustomToken(uid: string) {
    try {
      return this.firebaseAdmin.auth.createCustomToken(uid)
    } catch (e) {
      console.log(e)
      return 'error'
    }
  }

  public async checkCsrfToken(csrfToken: string, sessionToken: string) {
    const uid = this.decodeIdToken(sessionToken).user_id
    const keyId = process.env.SA_KEY_ID
    const serviceAccount = process.env.SA_NAME
    console.log(serviceAccount)
    const pubCerts = await axios.get(
      `https://www.googleapis.com/robot/v1/metadata/x509/${serviceAccount}`,
    )
    const publicCert = pubCerts.data[keyId]
    const decoded = jwt.verify(csrfToken, publicCert)
    return decoded.uid === uid ? true : false
  }

  public async checkAuthStatus(sessionToken: string): Promise<AuthStatus> {
    if (!sessionToken) return { status: 'false', customToken: null }

    const uid = this.decodeIdToken(sessionToken).user_id
    const customToken = await this.createCustomToken(uid)

    if (customToken) return { status: 'true', customToken }

    throw new Error('no custom token')
  }


  /**
   *
   * @param req request
   * @returns url of redirect after login. 22/05/04 use finance url
   */
  public getRedirectUrl(req: Request): string {
    return 'https://www.finance.harumax.com/'
    // const referer = req.headers.referer
    // return !referer
    //   ? `${process.env.IDENTITY_SERVICE_URL}/auth/navigate`
    //   : referer
  }

  public async logout(req: Request) {
    const sessionToken = req.cookies.__session
    if (!sessionToken) return { status: 'false', customToken: null }

    const uid = this.decodeIdToken(sessionToken).user_id
    const adminAuth = this.firebaseAdmin.auth
    try {
      await adminAuth
        .revokeRefreshTokens(uid)
        .then(() => {
          console.log(uid)
          return adminAuth.getUser(uid)
        })
        .then((userRecord) => {
          return new Date(userRecord.tokensValidAfterTime).getTime() / 1000
        })
        .then((timestamp) => {
          console.log(`Tokens revoked at: ${timestamp}`)
        })
    } catch (e) {
      console.log(e)
      return 'error'
    }
  }
}
