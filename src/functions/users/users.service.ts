import { Injectable } from '@nestjs/common'
import { FirebaseAdminService } from 'src/common-functions/firebase-admin/firebase-admin.service'

@Injectable()
export class UsersService {
  constructor(private readonly firebaseAdmin: FirebaseAdminService) {}
}
