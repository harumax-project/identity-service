export class UserInfoDto {
  readonly name!: string | null
  readonly iss!: string | null
  readonly aud!: string | null
  readonly auth_time!: number | null
  readonly user_id!: string | null
  readonly sub!: string | null
  readonly iat!: number | null
  readonly exp!: number | null
  readonly email!: string | null
  readonly email_verified!: boolean | null
  readonly firebase!: {
    identities: { email: string[] } | null
    sign_in_provider: string | null
  } | null
}
