/** Explicit public labels only; arbitrary URL values must not reach analytics. */
export function publicCampaign(search: string): Record<string, string> {
  const query = new URLSearchParams(search)
  const result: Record<string, string> = {}
  const source = query.get("utm_source") ?? ""
  const medium = query.get("utm_medium") ?? ""
  const campaign = query.get("utm_campaign") ?? ""
  const content = query.get("utm_content") ?? ""
  if (["linkedin", "google", "bing", "newsletter"].includes(source)) result.campaign_source = source
  if (["social", "organic_social", "email", "referral"].includes(medium)) result.campaign_medium = medium
  if (/^business_readiness_\d{4}$/.test(campaign)) result.campaign_name = campaign
  if (/^(personal|company|repost)_[a-z0-9_-]{1,60}_\d{8}$/.test(content)) result.campaign_content = content
  return result
}
