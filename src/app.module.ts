import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { FirebaseClientModule } from './firebase-client/firebase-client.module';
import { FirebaseAdminModule } from './firebase-admin/firebase-admin.module';
import configuration from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    AuthModule,
    UsersModule,
    FirebaseClientModule,
    FirebaseAdminModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
