import assert from "node:assert/strict"
import test from "node:test"
import { publicCampaign } from "./publicCampaign"

test("preserves this campaign's attribution without arbitrary URL values", () => {
  assert.deepEqual(publicCampaign("?utm_source=linkedin&utm_medium=social&utm_campaign=business_readiness_2026&utm_content=personal_c_teaser_20260918&email=private@example.com&token=secret"), {
    campaign_source: "linkedin", campaign_medium: "social",
    campaign_name: "business_readiness_2026", campaign_content: "personal_c_teaser_20260918",
  })
  assert.deepEqual(publicCampaign("?utm_source=private@example.com&utm_campaign=private@example.com&utm_content=secret&utm_medium=token"), {})
})
