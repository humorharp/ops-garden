# Deploy Guide — Ops Knowledge Garden

## What You Have

The `content/` folder contains all your markdown wiki pages. The `quartz.config.ts` is pre-configured with your site name and domain. You just need to wire up the Quartz framework around it and push to Vercel.

---

## Step 1 — Clone Quartz and Drop In Your Content

```bash
# Clone the Quartz repo into a new folder
git clone https://github.com/jackyzha0/quartz ops-garden
cd ops-garden

# Install dependencies
npm install

# Delete the sample content
rm -rf content/*

# Copy your content in (from wherever you saved this repo)
cp /path/to/ops-garden/content/* content/

# Copy in your config (replace the default)
cp /path/to/ops-garden/quartz.config.ts quartz.config.ts
```

---

## Step 2 — Test Locally

```bash
npx quartz build --serve
```

Opens at `http://localhost:8080`. Check that all pages render and links resolve.

---

## Step 3 — Push to GitHub

Create a new repo at github.com — name it `ops-garden` or `knowledge-garden`.

```bash
git remote set-url origin https://github.com/humorharp/ops-garden.git
git add .
git commit -m "initial garden"
git push -u origin main
```

---

## Step 4 — Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub → select `ops-garden`
2. Framework: **Other** (Quartz handles its own build)
3. Build command: `npx quartz build`
4. Output directory: `public`
5. Hit Deploy

---

## Step 5 — Custom Domain

In Vercel → your project → Settings → Domains → Add `garden.christopherjharper.com`

Then in your DNS provider (wherever christopherjharper.com is registered), add a CNAME record:
- Name: `garden`
- Value: `cname.vercel-dns.com`

Takes 10–30 minutes to propagate.

---

## Adding New Pages

1. Create a new `.md` file in `content/`
2. Add frontmatter at the top:
   ```
   ---
   title: Your Page Title
   tags: [tag1, tag2]
   ---
   ```
3. Use `[[page-name|Display Text]]` for internal links
4. `git push` — Vercel auto-deploys on every push

---

## Email Capture (Optional)

Add this to any page where you want to collect emails — swap in your actual Beehiiv/Substack/ConvertKit link:

```markdown
---
*Want more? I occasionally write about EMS operations and leadership. [Subscribe here →](YOUR_EMAIL_LINK)*
---
```

Suggested pages to add it: `index.md`, `first-90-days.md`
