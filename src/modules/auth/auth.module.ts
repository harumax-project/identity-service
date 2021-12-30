import { Module } from '@nestjs/common'
import { FirebaseAdminModule } from 'src/common-modules/firebase-admin/firebase-admin.module'
import { FirebaseClientModule } from 'src/common-modules/firebase-client/firebase-client.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [FirebaseAdminModule, FirebaseClientModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
