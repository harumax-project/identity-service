export type DecodedJWTToken = {
  provider_id: string
  iss: string
  aud: string
  auth_time: number
  user_id: string
  sub: string
  iat: number
  exp: number
  firebase: { identities: object; sign_in_provider: string }
}

export type AuthStatus = {
  status: 'true' | 'false'
  customToken: string | null
}

export type AuthQuery = {
  originUrl: string
}
