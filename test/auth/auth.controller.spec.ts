import { Test, TestingModule } from '@nestjs/testing'
import { FirebaseAdminService } from '../../src/firebase-admin/firebase-admin.service'
import { FirebaseClientService } from '../../src/firebase-client/firebase-client.service'
import { AuthController } from '../../src/auth/auth.controller'
import { AuthService } from '../../src/auth/auth.service'

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
