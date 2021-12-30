import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { FirebaseClientModule } from './common-modules/firebase-client/firebase-client.module'
import { FirebaseAdminModule } from './common-modules/firebase-admin/firebase-admin.module'
import configuration from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    AuthModule,
    FirebaseClientModule,
    FirebaseAdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
