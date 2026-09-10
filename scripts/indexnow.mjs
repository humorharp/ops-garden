import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export function validateUrls(urls, host) {
  if (!urls.length || urls.length > 10000) throw new Error("Supply 1–10,000 production URLs.");
  return [...new Set(urls.map(value => {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.host !== host || url.username || url.password || url.search || url.hash)
      throw new Error(`Not a canonical production URL: ${value}`);
    return url.href;
  }))];
}

export async function submit(urls, config, fetcher = fetch) {
  const urlList = validateUrls(urls, config.host);
  const keyLocation = `https://${config.host}/${config.key}.txt`;
  const proof = await fetcher(keyLocation, { redirect: "error", signal: AbortSignal.timeout(15000) });
  if (!proof.ok || (await proof.text()).trim() !== config.key)
    throw new Error("Production ownership file is missing or incorrect. Deploy it before submitting.");
  const response = await fetcher("https://api.indexnow.org/indexnow", {
    method: "POST", redirect: "error", signal: AbortSignal.timeout(15000),
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ host: config.host, key: config.key, keyLocation, urlList }),
  });
  if (![200, 202].includes(response.status)) throw new Error(`IndexNow returned ${response.status}; inspect before retrying.`);
  return { status: response.status, submitted: urlList.length,
    message: response.status === 202 ? "Received; ownership validation pending." : "Received. This does not confirm indexing." };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const config = JSON.parse(readFileSync(new URL("./indexnow.json", import.meta.url), "utf8"));
    console.log(JSON.stringify(await submit(process.argv.slice(2), config), null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
