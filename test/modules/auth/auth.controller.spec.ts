import { Test, TestingModule } from '@nestjs/testing'
import { FirebaseAdminService } from '../../../src/common-modules/firebase-admin/firebase-admin.service'
import { FirebaseClientService } from '../../../src/common-modules/firebase-client/firebase-client.service'
import { AuthController } from '../../../src/modules/auth/auth.controller'
import { AuthService } from '../../../src/modules/auth/auth.service'

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
