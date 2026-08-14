import assert from "node:assert/strict"
import test from "node:test"
import { sanitizeAnalyticsDestination } from "./gardenAnalyticsUtils"

test("removes query strings, fragments, and credentials from web destinations", () => {
  const destination = new URL("https://user:secret@example.com/note?token=sensitive#private")

  assert.deepEqual(sanitizeAnalyticsDestination(destination, true), {
    linkUrl: "https://example.com/note",
    destinationPath: "/note",
  })
})

test("does not send contact destinations to analytics", () => {
  const destination = new URL("mailto:private@example.com?subject=Sensitive")

  assert.deepEqual(sanitizeAnalyticsDestination(destination, false), {
    linkUrl: "",
    destinationPath: "",
  })
})

test("limits destination parameters to GA4 custom-parameter length", () => {
  const destination = new URL(`https://example.com/${"a".repeat(200)}`)
  const sanitized = sanitizeAnalyticsDestination(destination, true)

  assert.equal(sanitized.linkUrl.length, 100)
  assert.equal(sanitized.destinationPath.length, 100)
})
