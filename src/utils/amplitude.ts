export const trackEvent = (eventName: string) => {
  const anyWindow = window as any
  if (anyWindow.amplitude) {
    anyWindow.amplitude.getInstance().logEvent(eventName)
  }
}
