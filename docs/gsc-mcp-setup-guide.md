# Google Search Console MCP Server -- Setup Guide

**Package:** search-console-mcp v1.13.4
**Date:** 2026-03-12
**Status:** MCP server entry added to Claude Code settings. Google authentication pending (CEO action required).

---

## What Was Done (Automated)

The MCP server entry has been added to `/Users/raufabdullayev/.claude/settings.json`:

```json
"search-console": {
  "command": "npx",
  "args": ["-y", "search-console-mcp"]
}
```

This sits alongside the existing MCP servers (gitlab, github, vercel) -- none were modified.

---

## What the CEO Needs to Do (Manual Steps)

### Step 1: Run the Google OAuth Setup

Open a terminal and run:

```bash
npx search-console-mcp setup
```

This will:
1. Download the package (if not cached)
2. Start a secure local server on your machine
3. Open your default browser to the Google authorization page
4. Ask you to sign in with the Google account that owns vaxtimyoxdu.com in Search Console
5. Request permission to access your Search Console data
6. After you grant access, automatically fetch your email and store credentials securely

**Important:** Use the Google account that has access to vaxtimyoxdu.com in Google Search Console. This is likely the same account used to verify the site.

### Step 2: Verify the Connection

After completing the OAuth flow, verify it worked:

```bash
npx search-console-mcp accounts list
```

This should show your connected Google account and the sites it can access. You should see `https://vaxtimyoxdu.com/` (and possibly `https://vaxtimyoxdur.com/`) in the list.

### Step 3: Restart Claude Code

After authentication is complete, restart Claude Code so it picks up the MCP server. The search-console MCP tools will then be available in all Claude Code sessions.

---

## Optional: Google Analytics 4 Setup

Since vaxtimyoxdu.com already has GA4 (G-BJHT1YYBCS), you can also connect GA4 for combined insights.

### Option A: OAuth Flow (Simplest)

```bash
npx search-console-mcp setup --engine=ga4
```

Follow the browser prompts. This grants read access to your GA4 property.

### Option B: Service Account (For Server-Side Access)

1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Select your project (or create one)
3. Navigate to **IAM & Admin > Service Accounts**
4. Click **Create Service Account**
   - Name: `seo-agent` (or any name)
   - Click **Create and Continue**
   - Skip the role assignment (not needed for GSC/GA4)
   - Click **Done**
5. Click on the newly created service account
6. Go to the **Keys** tab
7. Click **Add Key > Create new key > JSON**
8. Download the JSON file and save it securely (e.g., `~/.config/gsc-service-account.json`)
9. Set the environment variable:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/gsc-service-account.json"
   ```
10. In GA4: Go to **Admin > Property Settings > Property Access Management**
11. Add the service account email (from the JSON file) with **Viewer** role

If using the service account method, update the MCP server config in settings.json:

```json
"search-console": {
  "command": "npx",
  "args": ["-y", "search-console-mcp"],
  "env": {
    "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/your/service-account.json"
  }
}
```

---

## Optional: Bing Webmaster Tools Setup

1. Go to https://www.bing.com/webmasters/
2. Sign in and navigate to your site
3. Go to **Settings** (gear icon)
4. Find the **API Access** section
5. Generate or copy your API key
6. Either set it via environment:
   ```bash
   export BING_API_KEY="your-api-key-here"
   ```
   Or add it to the MCP server config:
   ```json
   "search-console": {
     "command": "npx",
     "args": ["-y", "search-console-mcp"],
     "env": {
       "BING_API_KEY": "your-api-key-here"
     }
   }
   ```

---

## Credential Storage and Security

- **macOS:** Credentials are stored in the macOS Keychain (secure, OS-level encryption)
- **Fallback:** If Keychain is unavailable, AES-256-GCM encryption with a hardware-bound key derived from your machine's unique ID
- **Config file:** `~/.search-console-mcp-config.enc` (encrypted, permissions 600)
- **Tokens:** Only refresh tokens and expiry dates are stored locally; no passwords or client secrets are saved in plaintext

---

## Account Management Commands

```bash
# List all connected accounts and their sites
npx search-console-mcp accounts list

# Remove a specific account
npx search-console-mcp accounts remove --account=user@gmail.com

# Restrict an account to specific sites only
npx search-console-mcp accounts add-site --account=user@gmail.com --site=vaxtimyoxdu.com

# Logout default account
npx search-console-mcp logout

# Logout specific account
npx search-console-mcp logout user@gmail.com
```

---

## Available Tools (After Setup)

Once authenticated, the following MCP tools become available in Claude Code:

### Google Search Console
- Search analytics (queries, pages, countries, devices) with up to 25,000 rows
- URL inspection (check indexing status of specific URLs)
- Sitemap management (list, submit, delete sitemaps)
- Submit URLs for indexing
- Period comparison (compare two date ranges)

### SEO Intelligence
- Anomaly detection (detect traffic drops/spikes)
- Trend analysis (identify trending queries)
- Keyword cannibalization detection
- Striking distance keywords (positions 5-20, quick win opportunities)
- Low-hanging fruit finder

### Google Analytics 4 (if configured)
- Page performance metrics
- Traffic sources breakdown
- Real-time active users
- Conversion data

### Bing Webmaster Tools (if configured)
- Performance analytics
- IndexNow URL submission
- Crawl issue detection

### Cross-Platform
- Opportunity matrix (GSC + GA4 + Bing combined insights)
- Brand vs non-brand analysis
- Traffic health check

---

## Troubleshooting

### MCP server not appearing in Claude Code
- Verify the settings.json entry is valid JSON (no trailing commas, correct brackets)
- Restart Claude Code completely (quit and reopen)
- Check that Node.js 18+ is installed: `node --version`

### OAuth flow fails or times out
- Make sure no firewall or VPN is blocking localhost connections
- Try running the setup command again: `npx search-console-mcp setup`
- Clear the npm cache if the package seems corrupted: `npx clear-npx-cache`

### "Not connected" status
- Run `npx search-console-mcp accounts list` to check connection status
- If disconnected, re-run `npx search-console-mcp setup`

### Permission denied for a site
- Verify the Google account used has owner or full access to the Search Console property
- Check at https://search.google.com/search-console/ that vaxtimyoxdu.com is listed

---

## File Locations Reference

| Item | Path |
|---|---|
| Claude Code global settings | `~/.claude/settings.json` |
| Encrypted credentials | `~/.search-console-mcp-config.enc` |
| macOS Keychain | Managed by OS (Keychain Access app) |
| Service account key (if used) | User-defined path |
| This guide | `docs/gsc-mcp-setup-guide.md` |
