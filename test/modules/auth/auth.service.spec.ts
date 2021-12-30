import { Test, TestingModule } from '@nestjs/testing'
import { FirebaseAdminService } from '../../../src/common-modules/firebase-admin/firebase-admin.service'
import { AuthService } from '../../../src/modules/auth/auth.service'

describe('AuthService', () => {
  let service: AuthService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, FirebaseAdminService],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
