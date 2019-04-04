export const trackEvent = (eventName: string) => {
  // @ts-ignore
  if (window.amplitude) {
    // @ts-ignore
    window.amplitude.getInstance().logEvent(eventName)
  }
}
