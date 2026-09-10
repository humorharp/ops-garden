import test from "node:test";
import assert from "node:assert/strict";
import { validateUrls, submit } from "./indexnow.mjs";
const config = { host: "example.com", key: "12345678abcdef" };
test("only canonical production URLs and deduplication", () => {
  assert.deepEqual(validateUrls(["https://example.com/a", "https://example.com/a"], config.host), ["https://example.com/a"]);
  for (const url of ["http://example.com/a", "https://preview.example.com/a", "https://example.com/a?x=1", "https://example.com/a#x", "https://user@example.com/a"]) assert.throws(() => validateUrls([url], config.host));
  assert.throws(() => validateUrls([], config.host));
});
test("missing deployed proof prevents submission", async () => {
  let calls = 0;
  await assert.rejects(submit(["https://example.com/a"], config, async () => { calls++; return {ok: false}; }));
  assert.equal(calls, 1);
});
test("verified proof sends expected payload and distinguishes pending validation", async () => {
  for (const status of [200, 202]) {
    let calls = 0;
    const result = await submit(["https://example.com/a"], config, async (url, options) => {
      calls++;
      if (calls === 1) return {ok: true, text: async () => config.key};
      assert.equal(url, "https://api.indexnow.org/indexnow");
      assert.equal(options.redirect, "error");
      assert.deepEqual(JSON.parse(options.body).urlList, ["https://example.com/a"]);
      return {status};
    });
    assert.equal(result.status, status);
    assert.equal(calls, 2);
  }
});
test("submission failure is surfaced without retry", async () => {
  let calls = 0;
  await assert.rejects(submit(["https://example.com/a"], config, async () => ++calls === 1 ? {ok: true, text: async () => config.key} : {status: 429}), /429/);
  assert.equal(calls, 2);
});
