import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from '../../src/users/users.service'
import { FirebaseAdminService } from '../../src/firebase-admin/firebase-admin.service'
import { FirebaseClientService } from '../../src/firebase-client/firebase-client.service'
import { UsersController } from '../../src/users/users.controller'

describe('UsersController', () => {
  let controller: UsersController

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, FirebaseAdminService, FirebaseClientService],
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
