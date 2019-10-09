const anyWindow = window as any

export const trackEvent = (eventName: string) => {
  if (anyWindow.amplitude) {
    anyWindow.amplitude.getInstance().logEvent(eventName)
  }

  if (anyWindow.gtag) {
    anyWindow.gtag('event', eventName)
  }
}

export const setUserId = (userId: string) => {
  if (anyWindow.amplitude) {
    anyWindow.amplitude.getInstance().setUserId(userId)
  }
}
