const anyWindow = window as any

export const trackEvent = (eventName: string) => {
  if (anyWindow.ga) {
    anyWindow.ga('send', 'event', 'General', eventName)
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setUserId = (userId: string) => {}
