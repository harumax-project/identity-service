import { Test, TestingModule } from '@nestjs/testing'
import { FirebaseAdminService } from '../../../src/common-functions/firebase-admin/firebase-admin.service'
import { FirebaseClientService } from '../../../src/common-functions/firebase-client/firebase-client.service'
import { AuthController } from '../../../src/functions/auth/auth.controller'
import { AuthService } from '../../../src/functions/auth/auth.service'

describe('AuthController', () => {
  let controller: AuthController

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, FirebaseAdminService, FirebaseClientService],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
