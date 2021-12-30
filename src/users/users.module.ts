import { Module } from '@nestjs/common';
import { FirebaseAdminModule } from 'src/firebase-admin/firebase-admin.module';
import { FirebaseClientModule } from 'src/firebase-client/firebase-client.module';
import { UsersService } from './users.service';

@Module({
  imports: [FirebaseAdminModule, FirebaseClientModule],
  providers: [UsersService],
})
export class UsersModule {}
