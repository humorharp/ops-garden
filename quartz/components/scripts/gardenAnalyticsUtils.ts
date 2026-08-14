export function sanitizeAnalyticsDestination(destination: URL, isWebLink: boolean) {
  if (!isWebLink) {
    return { linkUrl: "", destinationPath: "" }
  }

  return {
    linkUrl: `${destination.origin}${destination.pathname}`.slice(0, 100),
    destinationPath: destination.pathname.slice(0, 100),
  }
}
