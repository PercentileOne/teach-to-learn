export function track(event: string, params?: Record<string, string>) {
  try {
    (window as any).gtag?.('event', event, params)
  } catch {}
}
