import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'


const whitelist = [
  'https://harumax.com',
  'https://katten.harumax.com',
  'https://www.harumax.com',
  'https://api.harumax.com',
  'https://id.harumax.com',
]

const devWhiteList = [
  'http://localhost:4200',
  'http://localhost:3000',
  'http://localhost:8080',
]

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const configService = app.get(ConfigService)

  //cookie
  app.use(cookieParser())

  //static settings
  app.useStaticAssets(join(__dirname, '..', 'assets'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('hbs')

  //cors
  app.enableCors({
    origin: function (origin, callback) {
      const isLocalDev =
        process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'localDev'
      const isInDevWhiteList = devWhiteList.indexOf(origin) !== -1
      const isInWhiteList = whitelist.indexOf(origin) !== -1
      if ((isLocalDev && isInDevWhiteList) || !origin) {
        console.log('allowed origin from local development', origin)
        callback(null, true)
      } else if (isInWhiteList || !origin) {
        console.log('allowed origin from ', origin)
        callback(null, true)
      } else {
        console.log('blocked cors', origin)
        callback(new Error('not allowed cors'))
      }
    },
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    methods: 'GET,POST,DELETE,OPTIONS',
    credentials: true,
  })

  await app.listen(configService.get('port'))
}
bootstrap()
