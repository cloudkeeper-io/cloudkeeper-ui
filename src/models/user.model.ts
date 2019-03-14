export interface Session {
  accessToken: string,
  refreshToken: string,
}

export interface User {
  username: string
  loading: boolean
  isUserLoaded: boolean
  session?: Session | null | undefined

  setUser: (user: Partial<User>) => void
  getUser: () => User
  login: (email: string, password: string) => any
  signUp: (email: string, password: string) => any
  signOut: () => void
}
