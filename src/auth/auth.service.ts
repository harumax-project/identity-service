import { Injectable } from '@nestjs/common'
import { FirebaseClient } from 'src/common/firebase-client'
import { FirebaseApp } from '@firebase/app'
import { FirebaseAdmin } from 'src/common/firebase-admin'
import * as jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'

import { auth } from 'google-auth-library'
import { Request } from 'express'
import { DecodedJWTToken } from './dto/auth.dto'

@Injectable()
export class AuthService {
  public decodeIdToken(req: Request) {
    const authHeader = req.headers.authorization
    if (!authHeader) throw new Error('no authHeader')
    return jwt_decode(authHeader.split(' ')[1])
  }

  public async createCsrfToken(req: Request) {
    const decodedToken = this.decodeIdToken(req) as DecodedJWTToken
    const uid = decodedToken.user_id

    const payload = { uid }
    const creds = await auth.getCredentials()
    const privateKey = creds.private_key
    const csrfToken = jwt.sign(payload, privateKey, { algorithm: 'RS256' })
    return csrfToken as string
  }
}
