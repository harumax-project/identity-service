import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './functions/auth/auth.module'
import { FirebaseClientModule } from './common-functions/firebase-client/firebase-client.module'
import { FirebaseAdminModule } from './common-functions/firebase-admin/firebase-admin.module'
import { UsersModule } from './functions/users/users.module';
import configuration from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    AuthModule,
    FirebaseClientModule,
    FirebaseAdminModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
