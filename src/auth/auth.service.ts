import { Injectable } from '@nestjs/common'
import { EmailAndPassword } from './dto/auth.dto'
import { FirebaseClient } from 'src/common/firebase-client'
import { FirebaseApp } from '@firebase/app'
import { FirebaseAdmin } from 'src/common/firebase-admin'

@Injectable()
export class AuthService {
  // private app: FirebaseApp
}
