# IndexNow

This site uses a public ownership file for `garden.christopherjharper.com`. It is not an account credential. No browser scripts or tracking are added.

After the ownership file and changed pages are deployed to production, submit their canonical URLs using Node 20 or later:

```sh
node scripts/indexnow.mjs https://garden.christopherjharper.com/
```

Pass additional URLs as separate arguments. Submit only published URLs that were added, changed, or deleted. For the initial submission, use the canonical page URLs from the production sitemap. Do not repeatedly submit unchanged pages. The command rejects other hosts, query strings, fragments, and redirects during verification. It verifies the live ownership file before sending anything to IndexNow. It does not deploy pages.

A 200 response confirms receipt, not indexing or ranking. A 202 means ownership validation is pending. Failures are surfaced without automatic retries. Bing Webmaster Tools can report subsequent processing; Google Search Console and sitemaps remain separate.

Run offline checks with `node --test scripts/indexnow.test.mjs`.

Protocol: https://www.indexnow.org/documentation
