import { getConfig } from '.'

const config = getConfig()

export const postLogin = async (email: string, password: string) => {
  const result = await fetch(`${config.authUrl}/local`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  if (result.status !== 200) {
    throw new Error('Authorization error.')
  }

  return result.json()
}

export const updatedToken = async (refreshToken: string) => {
  const result = await fetch(`${config.authUrl}/token/refresh`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ token: refreshToken }),
  })

  if (result.status !== 200) {
    throw new Error()
  }

  return result.json()
}
