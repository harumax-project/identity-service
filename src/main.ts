import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { FirebaseClient } from './common/firebase-client'
import { FirebaseAdmin } from './common/firebase-admin'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const configService = app.get(ConfigService)
  app.use(cookieParser())
  app.useStaticAssets(join(__dirname, '..', 'assets'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('hbs')
  app.enableCors({
    origin: 'http://localhost:4200',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    credentials: true,
  })

  await app.listen(configService.get('port'))
}
bootstrap()
export const FIREBASE_CLIENT = new FirebaseClient()
export const FIREBASE_ADMIN = new FirebaseAdmin()
