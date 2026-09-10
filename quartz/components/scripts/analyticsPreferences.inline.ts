// @ts-nocheck -- shared browser-only preference control, exercised by runtime tests.
let locallyDisabled = false;
const CONSENT_KEY = "site_analytics_choice_v1";
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;

function analyticsAllowed() {
  if (locallyDisabled || typeof window === "undefined" || navigator.globalPrivacyControl === true || navigator.doNotTrack === "1") return false;
  try {
    const choice = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
    return choice?.value === "accepted" && typeof choice.at === "number" && choice.at <= Date.now() && Date.now() - choice.at < MAX_AGE;
  } catch { return false; }
}

function clearAnalyticsStorage() {
  locallyDisabled = true;
  for (const id of ["G-YE0DRC8G1R", "G-BR0GQ9BCJ1"]) window[`ga-disable-${id}`] = true;
  for (const key of ["chatir_marketing_session_v2", "chatir_last_pageview"]) {
    try { sessionStorage.removeItem(key); } catch { /* Storage may be unavailable. */ }
  }
  try { localStorage.removeItem("chatir_marketing_session"); } catch { /* No tracking fallback. */ }
  const domains = ["", location.hostname, ...location.hostname.split(".").map((_, i, parts) => parts.slice(i).join(".")).filter(d => d.includes("."))];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!/^(_ga($|_)|_gid$|_gat($|_)|_clck$|_clsk$)/.test(name)) continue;
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ""}`;
  }
}

function initializeAnalyticsPreferences() {
  if (!analyticsAllowed()) clearAnalyticsStorage();
  const existing = document.getElementById("analytics-preferences");
  if (existing) return () => {};
  const panel = document.createElement("details");
  panel.id = "analytics-preferences";
  panel.style.cssText = "max-width:760px;margin:24px auto;padding:16px 24px;font:inherit;color:inherit;position:relative;z-index:1";
  const summary = document.createElement("summary");
  summary.textContent = "Analytics preferences";
  summary.style.cssText = "cursor:pointer;text-decoration:underline;font-size:14px";
  const text = document.createElement("p");
  text.textContent = "Optional analytics is off unless you enable it. It measures public page visits and link use with Google Analytics and session cookies. Your choice applies to this site and is remembered for 180 days. You can turn it off here at any time.";
  text.style.cssText = "font-size:14px;line-height:1.6;margin:12px 0";
  const status = document.createElement("p");
  status.setAttribute("role", "status");
  status.textContent = analyticsAllowed() ? "Optional analytics is on." : "Optional analytics is off.";
  const save = (value) => {
    clearAnalyticsStorage();
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify({value, at: Date.now()})); }
    catch { status.textContent = "Your browser could not save this choice. Analytics remains off."; return; }
    location.reload();
  };
  const accept = document.createElement("button");
  accept.type = "button";
  accept.textContent = "Enable analytics";
  const reject = document.createElement("button");
  reject.type = "button";
  reject.textContent = "Keep analytics off";
  for (const button of [accept, reject]) button.style.cssText = "font:inherit;font-size:14px;padding:10px 14px;margin:4px 8px 4px 0;border:1px solid currentColor;border-radius:6px;background:transparent;color:inherit;cursor:pointer";
  if (navigator.globalPrivacyControl === true || navigator.doNotTrack === "1") {
    accept.disabled = true;
    status.textContent = "Your browser privacy preference keeps optional analytics off.";
  }
  accept.onclick = () => save("accepted");
  reject.onclick = () => save("denied");
  panel.append(summary, text, status, accept, reject);
  (document.querySelector("footer") || document.body).appendChild(panel);
  // Revocation in another tab takes effect here too, including already-loaded tags.
  const storage = (event) => { if (event.key === CONSENT_KEY || event.key === null) { clearAnalyticsStorage(); location.reload(); } };
  const initial = analyticsAllowed();
  const timer = setInterval(() => { if (initial && !analyticsAllowed()) { clearAnalyticsStorage(); location.reload(); } }, 30000);
  window.addEventListener("storage", storage);
  return () => { clearInterval(timer); panel.remove(); window.removeEventListener("storage", storage); };
}

window.siteAnalyticsAllowed = analyticsAllowed;
let disposePreferences = initializeAnalyticsPreferences();
document.addEventListener("nav", () => { disposePreferences(); disposePreferences = initializeAnalyticsPreferences(); });
