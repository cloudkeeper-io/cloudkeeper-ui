const anyWindow = window as any

export const trackEvent = (eventName: string) => {
  if (anyWindow.amplitude) {
    anyWindow.amplitude.getInstance().logEvent(eventName)
  }

  if (anyWindow.ga) {
    anyWindow.ga('send', 'event', 'General', eventName)
  }
}

export const setUserId = (userId: string) => {
  if (anyWindow.amplitude) {
    anyWindow.amplitude.getInstance().setUserId(userId)
  }
}
