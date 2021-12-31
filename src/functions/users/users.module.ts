import { Module } from '@nestjs/common'
import { FirebaseAdminModule } from 'src/common-functions/firebase-admin/firebase-admin.module'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [FirebaseAdminModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
