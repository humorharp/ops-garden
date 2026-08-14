import { sanitizeAnalyticsDestination } from "./gardenAnalyticsUtils"

type GardenAnalyticsWindow = Window & {
  dataLayer?: IArguments[]
  gtag?: (...args: unknown[]) => void
}

const analyticsWindow = window as GardenAnalyticsWindow

function trackGardenEvent(name: string, parameters: Record<string, string | number | boolean>) {
  analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? []
  analyticsWindow.gtag =
    analyticsWindow.gtag ??
    function () {
      analyticsWindow.dataLayer?.push(arguments)
    }

  analyticsWindow.gtag("event", name, parameters)
}

function normalizedLinkText(anchor: HTMLAnchorElement): string {
  return (anchor.textContent ?? anchor.getAttribute("aria-label") ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100)
}

function handleGardenClick(event: MouseEvent) {
  const target = event.target
  if (!(target instanceof Element)) return

  const anchor = target.closest<HTMLAnchorElement>("a[href]")
  if (!anchor || anchor.dataset.analyticsIgnore === "true") return

  const href = anchor.getAttribute("href")
  if (!href || href.startsWith("javascript:")) return

  const destination = new URL(anchor.href, location.href)
  const isWebLink = destination.protocol === "http:" || destination.protocol === "https:"
  const isContactLink = destination.protocol === "mailto:" || destination.protocol === "tel:"
  if (!isWebLink && !isContactLink) return

  const linkType = isContactLink
    ? "contact"
    : destination.origin === location.origin
      ? destination.pathname === location.pathname
        ? "same_page"
        : "internal"
      : "outbound"

  const sanitizedDestination = sanitizeAnalyticsDestination(destination, isWebLink)

  trackGardenEvent("garden_link_click", {
    link_type: linkType,
    link_url: sanitizedDestination.linkUrl,
    link_domain: destination.hostname || destination.protocol.replace(":", ""),
    link_text: isContactLink ? "" : normalizedLinkText(anchor),
    source_path: location.pathname,
    destination_path: sanitizedDestination.destinationPath,
  })
}

const scrollMilestones = [25, 50, 75, 90]
let recordedScrollMilestones = new Set<number>()

function resetScrollTracking() {
  recordedScrollMilestones = new Set<number>()
  recordScrollDepth()
}

function recordScrollDepth() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  if (scrollableHeight <= 0) return

  const percentage = Math.min(100, Math.round((window.scrollY / scrollableHeight) * 100))
  for (const milestone of scrollMilestones) {
    if (percentage < milestone || recordedScrollMilestones.has(milestone)) continue

    recordedScrollMilestones.add(milestone)
    trackGardenEvent("garden_scroll_depth", {
      percent_scrolled: milestone,
      page_path: location.pathname,
      page_title: document.title,
    })
  }
}

document.addEventListener("click", handleGardenClick)
window.addEventListener("scroll", recordScrollDepth, { passive: true })
document.addEventListener("nav", resetScrollTracking)
resetScrollTracking()
