import { IsString, MinLength, MaxLength } from 'class-validator'

export class UserQueryDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  readonly q!: string
}
