const anyWindow = window as any

export const setTawkUserDetails = (email?: string, hash?: string, customAttributes?: any) => {
  const tawkApi = anyWindow.Tawk_API as any

  if (tawkApi) {
    if (!tawkApi.setAttributes) {
      setTimeout(() => {
        setTawkUserDetails(email, hash, customAttributes)
      }, 300)
    } else {
      tawkApi.setAttributes({
        email,
        hash,
        ...customAttributes,
      })
    }
  }
}
