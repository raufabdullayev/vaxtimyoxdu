# Google Search Console MCP Server -- Existing Implementations Research

**Date:** 2026-03-12
**Researched by:** DevOps Engineer
**Verdict:** FOUND -- Multiple mature, production-ready options exist. No need to build from scratch.

---

## Summary

The GSC MCP ecosystem is mature with 10+ implementations across npm, PyPI, and GitHub. Three stand out as strong candidates for vaxtimyoxdu.com integration with Claude Code. None are in the official MCP servers repo (modelcontextprotocol/servers), but several are listed on community directories (Glama, mcp.so, mcpservers.org).

---

## Top 3 Recommendations (Ranked)

### 1. search-console-mcp (saurabhsharma2u) -- RECOMMENDED

| Field | Value |
|---|---|
| **GitHub** | https://github.com/saurabhsharma2u/search-console-mcp |
| **npm** | https://www.npmjs.com/package/search-console-mcp |
| **Stars** | 44 |
| **Version** | 1.13.2 |
| **Last published** | ~4 days ago (March 2026) |
| **Last commit** | February 2026 |
| **License** | MIT |
| **Language** | TypeScript / Node.js |
| **Install** | `npx search-console-mcp setup` |

**Why this is #1:**
- Most actively developed (rapid iterations since Feb 2026, already at v1.13.2)
- Covers GSC + Bing Webmaster Tools + Google Analytics 4 (all-in-one)
- 50+ tools included
- Advanced SEO intelligence: keyword cannibalization, anomaly detection, striking distance keywords, trend analysis, time series forecasting
- Cross-platform opportunity matrix (GSC + GA4 + Bing combined insights)
- Best security: system keychain storage, AES-256-GCM hardware-bound encryption for credentials
- Multi-account support (useful if managing multiple properties)
- Interactive setup via `npx search-console-mcp setup`
- Claude Code compatible (`.mcp.json` configuration)

**Authentication:** OAuth desktop flow (recommended) or Service Account JSON. Credentials stored in OS keychain.

**Claude Code setup:**
```json
{
  "mcpServers": {
    "search-console-mcp": {
      "command": "npx",
      "args": ["-y", "search-console-mcp"]
    }
  }
}
```

**Key tools available:**
- GSC: search analytics, URL inspection, sitemap management, indexing requests
- SEO: anomaly detection, trend analysis, cannibalization detection, low-hanging fruit finder
- GA4: page performance, traffic sources, conversions, real-time users
- Bing: performance analytics, IndexNow URL submission, crawl issues
- Cross-platform: opportunity matrix, brand analysis, traffic health check

---

### 2. mcp-gsc (AminForou) -- Strong Alternative

| Field | Value |
|---|---|
| **GitHub** | https://github.com/AminForou/mcp-gsc |
| **PyPI** | https://pypi.org/project/mcp-gsc/ |
| **Stars** | 524 (highest in the ecosystem) |
| **Version** | 0.2.1 |
| **Last commit** | March 2026 |
| **License** | MIT |
| **Language** | Python |
| **Install** | `pip install mcp-gsc` or clone + venv |

**Strengths:**
- Most popular (524 stars, large community)
- 19+ tools
- Data visualization (charts/graphs)
- Multi-dimensional filtering
- Period comparison
- Well-documented setup for Claude Desktop

**Weaknesses:**
- Python-based (requires Python 3.11+ runtime, adds dependency for a Node.js project)
- No Bing or GA4 integration
- OAuth setup requires more manual steps

**Authentication:** OAuth (recommended) or Service Account. Uses `GSC_SKIP_OAUTH` env var for service account mode.

**Key tools:** `list_properties`, `get_search_analytics`, `check_indexing_issues`, `inspect_url_enhanced`, `submit_sitemap`, `compare_search_periods`

---

### 3. mcp-server-gsc (ahonn) -- Lightweight Option

| Field | Value |
|---|---|
| **GitHub** | https://github.com/ahonn/mcp-server-gsc |
| **npm** | https://www.npmjs.com/package/mcp-server-gsc |
| **Stars** | 183 |
| **Version** | 0.3.0 |
| **Last published** | ~22 days ago |
| **License** | MIT |
| **Language** | TypeScript / Node.js |
| **Install** | `npm install mcp-server-gsc` |

**Strengths:**
- Node.js native (matches our stack)
- Simple and focused
- 25K row data retrieval
- Regex filter support
- Quick wins auto-detection

**Weaknesses:**
- Fewer tools (primarily search_analytics)
- Service account only (no OAuth)
- No GA4 or Bing integration
- Less actively developed than #1

**Authentication:** Service Account JSON only. Requires Google Cloud Console setup.

---

## Other Notable Implementations

### 4. google-search-console-mcp-server (Shin-sibainu)

| Field | Value |
|---|---|
| **GitHub** | https://github.com/Shin-sibainu/google-search-console-mcp-server |
| **Stars** | 28 |
| **Last commit** | January 2025 |
| **License** | MIT |
| **Language** | TypeScript |

- 6 tools: list sites, search analytics, sitemaps, URL inspection, submit for indexing, compare periods
- OAuth 2.0 authentication
- Specifically designed for Claude Code (`.mcp.json` setup documented)
- Has interactive setup command: `npx -y -p google-search-console-mcp-server google-search-console-mcp-setup`
- Rate limit handling (2000 req/day)
- **Concern:** Last commit January 2025 -- over a year old

### 5. google-search-console-mcp (surendranb)

| Field | Value |
|---|---|
| **GitHub** | https://github.com/surendranb/google-search-console-mcp |
| **PyPI** | https://pypi.org/project/google-search-console-mcp/ |
| **Stars** | 25 |
| **Last commit** | January 2025 |
| **License** | MIT |
| **Language** | Python |

- 7 tools (list properties, dimensions, metrics, search analytics, sitemaps CRUD)
- Service account auth
- `pip install google-search-console-mcp`
- **Concern:** Last commit January 2025

### 6. mcp-server-google-search-console (guchey)

| Field | Value |
|---|---|
| **GitHub** | https://github.com/guchey/mcp-server-google-search-console |
| **PyPI** | https://pypi.org/project/mcp-server-google-search-console/ |
| **Stars** | 3 |
| **License** | MIT |
| **Language** | Python |

- Basic: search_analytics tool only
- Service account auth
- Python 3.10+
- **Concern:** Very few stars, limited features

### 7. search-console-mcp (garethcull)

| Field | Value |
|---|---|
| **GitHub** | https://github.com/garethcull/search-console-mcp |
| **Stars** | 0 |
| **Last commit** | November 2025 |
| **Language** | Python (Flask) |

- Flask-based HTTP server (not stdio MCP)
- Uses Gemini 2.5 Flash for natural language query conversion
- Bearer token auth
- **Not suitable:** Different architecture, requires Gemini API key, HTTP transport

### 8. @weppa-cloud/mcp-search-console

| Field | Value |
|---|---|
| **npm** | https://www.npmjs.com/package/@weppa-cloud/mcp-search-console |
| **Language** | TypeScript |

- Growth-hacker oriented
- 404 error detector with impact analysis
- Core Web Vitals analyzer
- Quick wins, snippets, cannibalization detection
- Service account auth

---

## Official Directory Listings

| Directory | Listed? | Notes |
|---|---|---|
| modelcontextprotocol/servers (official) | NO | Only Google Drive and Google Maps (both archived) |
| Glama.ai | YES | 5+ GSC servers listed |
| mcp.so | YES | mcp-server-gsc listed |
| mcpservers.org | YES | Multiple GSC servers listed |
| MCP Registry (registry.modelcontextprotocol.io) | Not checked | Preview since Sep 2025 |
| LobeHub | YES | Multiple GSC servers listed |

---

## Feature Comparison Matrix

| Feature | search-console-mcp | mcp-gsc | mcp-server-gsc |
|---|---|---|---|
| Search Analytics | Yes (25K rows) | Yes | Yes (25K rows) |
| URL Inspection | Yes | Yes | No |
| Sitemap Management | Yes | Yes | No |
| Submit for Indexing | Yes | No | No |
| Period Comparison | Yes | Yes | No |
| Anomaly Detection | Yes | No | No |
| Trend Analysis | Yes | No | No |
| Cannibalization | Yes | No | No |
| Quick Wins / Low-Hanging Fruit | Yes | No | Yes |
| GA4 Integration | Yes | No | No |
| Bing Integration | Yes | No | No |
| Multi-Account | Yes | No | No |
| Data Visualization | No | Yes (charts) | No |
| OAuth Support | Yes | Yes | No (service account only) |
| Service Account Support | Yes | Yes | Yes |
| Keychain Storage | Yes | No | No |
| Claude Code Compatible | Yes | Yes | Yes |
| npm Package | Yes | No (Python) | Yes |
| Active Development (2026) | Yes | Yes | Moderate |
| Stars | 44 | 524 | 183 |

---

## Authentication Requirements (Common to All)

Regardless of which server is chosen, the following Google Cloud setup is needed:

1. Create a Google Cloud Project (or use existing)
2. Enable the Google Search Console API
3. Choose auth method:
   - **OAuth 2.0:** Create OAuth client ID (Desktop app type), get client_id + client_secret, complete authorization flow to get refresh_token
   - **Service Account:** Create service account, download JSON key file, add service account email as property user/owner in GSC

For vaxtimyoxdu.com, the property `https://vaxtimyoxdu.com/` must be accessible to whichever credentials are configured.

---

## Final Recommendation

**Use `search-console-mcp` (saurabhsharma2u) v1.13.2**

Reasons:
1. Most actively maintained (last update days ago, v1.13.2)
2. All-in-one: GSC + GA4 + Bing in a single MCP server
3. Node.js/TypeScript (matches vaxtimyoxdu tech stack)
4. 50+ tools with advanced SEO intelligence
5. Best security practices (keychain, AES-256-GCM)
6. Simple setup: `npx search-console-mcp setup`
7. Claude Code compatible out of the box
8. MIT license

The GA4 integration is a bonus since we already have GA4 (G-BJHT1YYBCS) set up for vaxtimyoxdu.com.

---

## Sources

- https://github.com/saurabhsharma2u/search-console-mcp
- https://github.com/AminForou/mcp-gsc
- https://github.com/ahonn/mcp-server-gsc
- https://github.com/Shin-sibainu/google-search-console-mcp-server
- https://github.com/surendranb/google-search-console-mcp
- https://github.com/guchey/mcp-server-google-search-console
- https://github.com/garethcull/search-console-mcp
- https://github.com/modelcontextprotocol/servers
- https://www.npmjs.com/package/search-console-mcp
- https://www.npmjs.com/package/mcp-server-gsc
- https://www.npmjs.com/package/@weppa-cloud/mcp-search-console
- https://pypi.org/project/mcp-gsc/
- https://pypi.org/project/google-search-console-mcp/
- https://glama.ai/mcp/servers?query=Google+search+console
- https://mcp.so/server/mcp-server-gsc
- https://mcpservers.org/servers/ahonn/mcp-server-gsc
