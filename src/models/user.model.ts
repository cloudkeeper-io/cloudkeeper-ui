export interface Session {
  idToken: string,
  refreshToken: string,
}

export interface User {
  username: string
  loading: boolean
  isUserLoaded: boolean
  session: Session

  setUser: (user: Partial<User>) => void
  getUser: () => User
  login: (email: string, password: string) => any
  signOut: () => void
}
