import { Test, TestingModule } from '@nestjs/testing'
import { FirebaseAdminService } from '../../src/firebase-admin/firebase-admin.service'
import { UsersService } from '../../src/users/users.service'

describe('UsersService', () => {
  let service: UsersService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, FirebaseAdminService],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
