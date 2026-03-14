# Google Search Console MCP Server -- Research Findings

**Author:** API Research Engineer
**Date:** 2026-03-12
**Status:** Research Complete

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Google Search Console API v1 -- Endpoints](#2-google-search-console-api-v1----endpoints)
3. [Google Indexing API v3 -- Endpoints](#3-google-indexing-api-v3----endpoints)
4. [Authentication and Authorization](#4-authentication-and-authorization)
5. [Rate Limits and Quotas](#5-rate-limits-and-quotas)
6. [Existing MCP Implementations](#6-existing-mcp-implementations)
7. [Technical Feasibility Assessment](#7-technical-feasibility-assessment)
8. [Recommended Architecture](#8-recommended-architecture)
9. [Google Cloud Credentials Setup Guide](#9-google-cloud-credentials-setup-guide)
10. [Risk Assessment and Limitations](#10-risk-assessment-and-limitations)

---

## 1. Executive Summary

Building an MCP server for Google Search Console is **fully feasible** for 4 out of 5 requested capabilities. Multiple mature existing implementations already exist, with the best being `mcp-server-gsc` (TypeScript/npm) and `mcp-gsc` (Python). The one significant limitation is that the **Google Indexing API is restricted to JobPosting and BroadcastEvent content types only** -- it cannot be used to request indexing of arbitrary URLs like tool pages or blog posts.

**What we CAN do:**
- Check indexing status of any URL (URL Inspection API)
- Get search performance data -- clicks, impressions, CTR, position (Search Analytics API)
- List, submit, and delete sitemaps (Sitemaps API)
- List sites and properties (Sites API)

**What we CANNOT do:**
- Submit arbitrary URLs for indexing via the Indexing API (restricted to JobPosting/BroadcastEvent structured data only)

**Recommendation:** Use the existing `mcp-server-gsc` npm package (TypeScript, MIT licensed, actively maintained) rather than building from scratch. It already covers Search Analytics, URL Inspection, Sitemaps, and Sites management.

---

## 2. Google Search Console API v1 -- Endpoints

**Base URI:** `https://www.googleapis.com/webmasters/v3` (Search Analytics, Sitemaps, Sites)
**Base URI:** `https://searchconsole.googleapis.com/v1` (URL Inspection)

### 2.1 Search Analytics API

Retrieves search traffic performance data (clicks, impressions, CTR, position).

**Endpoint:**
```
POST https://www.googleapis.com/webmasters/v3/sites/{siteUrl}/searchAnalytics/query
```

**Request Body:**
```json
{
  "startDate": "2026-03-01",
  "endDate": "2026-03-12",
  "dimensions": ["query", "page", "country", "device", "date"],
  "type": "web",
  "dimensionFilterGroups": [
    {
      "groupType": "and",
      "filters": [
        {
          "dimension": "page",
          "operator": "contains",
          "expression": "vaxtimyoxdu.com/tools"
        }
      ]
    }
  ],
  "aggregationType": "auto",
  "rowLimit": 25000,
  "startRow": 0,
  "dataState": "all"
}
```

**Request Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `startDate` | string | Yes | YYYY-MM-DD format, PT timezone |
| `endDate` | string | Yes | YYYY-MM-DD format, must be >= startDate |
| `dimensions` | array | No | country, device, page, query, searchAppearance, date, hour |
| `type` | string | No | web (default), discover, googleNews, news, image, video |
| `dimensionFilterGroups` | array | No | Groups of filters with AND/OR logic |
| `aggregationType` | string | No | auto (default), byPage, byProperty, byNewsShowcasePanel |
| `rowLimit` | integer | No | 1-25,000 (default 1,000) |
| `startRow` | integer | No | Zero-based offset for pagination (default 0) |
| `dataState` | string | No | all, final (default), hourly_all |

**Filter Operators:**
- `equals` (default) -- exact match
- `contains` -- substring match (case-insensitive)
- `notContains` -- must not contain expression
- `notEquals` -- must not exactly match
- `includingRegex` -- RE2 syntax regex match
- `excludingRegex` -- RE2 syntax regex exclusion

**Response Body:**
```json
{
  "rows": [
    {
      "keys": ["vaxtim yoxdu aletler", "https://vaxtimyoxdu.com/tools/json-formatter", "AZE", "MOBILE"],
      "clicks": 45.0,
      "impressions": 890.0,
      "ctr": 0.0506,
      "position": 8.3
    }
  ],
  "responseAggregationType": "auto",
  "metadata": {
    "first_incomplete_date": "2026-03-10"
  }
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `rows[].keys` | array | Dimension values in request order |
| `rows[].clicks` | double | Click count |
| `rows[].impressions` | double | Impression count |
| `rows[].ctr` | double | Click-through rate (0.0 - 1.0) |
| `rows[].position` | double | Average position in search results |
| `responseAggregationType` | string | How results were aggregated |
| `metadata.first_incomplete_date` | string | First date with incomplete data |

**Important constraint:** The API does not guarantee returning ALL data rows; it returns the top rows sorted by clicks descending. Days without data are excluded.

---

### 2.2 URL Inspection API

Returns the indexing status and details for a single URL.

**Endpoint:**
```
POST https://searchconsole.googleapis.com/v1/urlInspection/index:inspect
```

**Request Body:**
```json
{
  "inspectionUrl": "https://vaxtimyoxdu.com/tools/json-formatter",
  "siteUrl": "https://vaxtimyoxdu.com/",
  "languageCode": "az"
}
```

**Request Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `inspectionUrl` | string | Yes | Fully-qualified URL to inspect |
| `siteUrl` | string | Yes | Property URL (trailing slash for URL-prefix; `sc-domain:` for domain) |
| `languageCode` | string | No | IETF BCP-47 code for translated messages (default "en-US") |

**Response Body (UrlInspectionResult):**
```json
{
  "inspectionResultLink": "https://search.google.com/search-console/inspect?...",
  "indexStatusResult": {
    "verdict": "PASS",
    "coverageState": "Submitted and indexed",
    "robotsTxtState": "ALLOWED",
    "indexingState": "INDEXING_ALLOWED",
    "lastCrawlTime": "2026-03-10T14:30:00Z",
    "pageFetchState": "SUCCESSFUL",
    "googleCanonical": "https://vaxtimyoxdu.com/tools/json-formatter",
    "userCanonical": "https://vaxtimyoxdu.com/tools/json-formatter",
    "crawledAs": "MOBILE",
    "sitemap": ["https://vaxtimyoxdu.com/sitemap.xml"],
    "referringUrls": ["https://vaxtimyoxdu.com/"]
  },
  "mobileUsabilityResult": {
    "verdict": "PASS",
    "issues": []
  },
  "richResultsResult": {
    "verdict": "PASS",
    "detectedItems": [
      {
        "richResultType": "FAQ",
        "items": []
      }
    ]
  }
}
```

**Key Enum Values:**

| Enum | Possible Values |
|------|----------------|
| `verdict` | UNSPECIFIED, PASS, PARTIAL, FAIL, NEUTRAL |
| `robotsTxtState` | UNSPECIFIED, ALLOWED, DISALLOWED |
| `indexingState` | UNSPECIFIED, INDEXING_ALLOWED, BLOCKED_BY_META_TAG, BLOCKED_BY_HTTP_HEADER |
| `pageFetchState` | UNSPECIFIED, SUCCESSFUL, SOFT_404, BLOCKED_ROBOTS_TXT, NOT_FOUND, ACCESS_DENIED, SERVER_ERROR, REDIRECT_ERROR, ACCESS_FORBIDDEN, BLOCKED_4XX, INTERNAL_CRAWL_ERROR, INVALID_URL |
| `crawledAs` | UNSPECIFIED, DESKTOP, MOBILE |

**Limitation:** This API only checks the version currently in Google's index. It cannot test the live indexability of a URL -- only what Google has already crawled and stored.

---

### 2.3 Sitemaps API

Manage sitemaps for a Search Console property.

**List Sitemaps:**
```
GET https://www.googleapis.com/webmasters/v3/sites/{siteUrl}/sitemaps
```

**Get Sitemap Details:**
```
GET https://www.googleapis.com/webmasters/v3/sites/{siteUrl}/sitemaps/{feedpath}
```

**Submit Sitemap:**
```
PUT https://www.googleapis.com/webmasters/v3/sites/{siteUrl}/sitemaps/{feedpath}
```

**Delete Sitemap:**
```
DELETE https://www.googleapis.com/webmasters/v3/sites/{siteUrl}/sitemaps/{feedpath}
```

Example -- list sitemaps:
```
GET https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fvaxtimyoxdu.com/sitemaps
```

Response:
```json
{
  "sitemap": [
    {
      "path": "https://vaxtimyoxdu.com/sitemap.xml",
      "lastSubmitted": "2026-03-01T10:00:00.000Z",
      "isPending": false,
      "isSitemapsIndex": true,
      "lastDownloaded": "2026-03-10T08:00:00.000Z",
      "warnings": "0",
      "errors": "0",
      "contents": [
        {
          "type": "web",
          "submitted": "368",
          "indexed": "320"
        }
      ]
    }
  ]
}
```

---

### 2.4 Sites API

Manage Search Console properties.

**List All Sites:**
```
GET https://www.googleapis.com/webmasters/v3/sites
```

**Get Site Details:**
```
GET https://www.googleapis.com/webmasters/v3/sites/{siteUrl}
```

**Add Site:**
```
PUT https://www.googleapis.com/webmasters/v3/sites/{siteUrl}
```

**Delete Site:**
```
DELETE https://www.googleapis.com/webmasters/v3/sites/{siteUrl}
```

Response for list:
```json
{
  "siteEntry": [
    {
      "siteUrl": "https://vaxtimyoxdu.com/",
      "permissionLevel": "siteOwner"
    }
  ]
}
```

---

## 3. Google Indexing API v3 -- Endpoints

**Base URI:** `https://indexing.googleapis.com/v3`

**CRITICAL LIMITATION:** The Indexing API is officially restricted to pages containing **JobPosting** or **BroadcastEvent** (in VideoObject) structured data only. Google engineers have explicitly warned against using it for other content types. John Mueller (Google) stated that misuse "sends exactly the wrong signal" and Gary Illyes added that it "may stop supporting unsupported content formats without notice." Using it for tool pages or blog posts is NOT recommended and could harm indexing.

### 3.1 Publish (Update/Remove URL)

```
POST https://indexing.googleapis.com/v3/urlNotifications:publish
Content-Type: application/json
```

**Update Request:**
```json
{
  "url": "https://example.com/job-posting",
  "type": "URL_UPDATED"
}
```

**Remove Request:**
```json
{
  "url": "https://example.com/job-posting",
  "type": "URL_DELETED"
}
```

### 3.2 Get Notification Status

```
GET https://indexing.googleapis.com/v3/urlNotifications/metadata?url=https%3A%2F%2Fexample.com%2Fjob-posting
```

**Response:**
```json
{
  "url": "https://example.com/job-posting",
  "latestUpdate": {
    "type": "URL_UPDATED",
    "notifyTime": "2026-03-10T14:00:00Z"
  },
  "latestRemove": {
    "type": "URL_DELETED",
    "notifyTime": "2026-03-05T10:00:00Z"
  }
}
```

### 3.3 Batch Requests

```
POST https://indexing.googleapis.com/batch
Content-Type: multipart/mixed; boundary=batch_boundary
```

Up to 100 individual requests per batch. Each part counts toward quota separately.

---

## 4. Authentication and Authorization

### 4.1 OAuth 2.0 Scopes

| Scope | Access Level | Use Case |
|-------|-------------|----------|
| `https://www.googleapis.com/auth/webmasters` | Read/Write | Full access to Search Console data, sitemaps, sites |
| `https://www.googleapis.com/auth/webmasters.readonly` | Read-Only | Search Analytics queries, URL inspection, list sitemaps |
| `https://www.googleapis.com/auth/indexing` | Write | Indexing API -- publish and check URL notifications |

**For the MCP server we need:**
- `https://www.googleapis.com/auth/webmasters` (read/write for sitemaps management)
- `https://www.googleapis.com/auth/indexing` (only if using Indexing API for JobPosting pages)

### 4.2 Google Cloud APIs to Enable

1. **Google Search Console API** (`searchconsole.googleapis.com`)
   - Required for: Search Analytics, URL Inspection, Sitemaps, Sites
2. **Web Search Indexing API** (`indexing.googleapis.com`)
   - Required for: Indexing API publish/remove (JobPosting/BroadcastEvent only)

Quick enable link:
```
https://console.cloud.google.com/start/api?id=searchconsole.googleapis.com&credential=client_key
```

### 4.3 Authentication Methods

**Option A: Service Account (Recommended for MCP Server)**

- Best for: Automated, headless operation (no browser required)
- How it works: JSON key file contains private key; server signs JWTs to obtain access tokens
- Requirement: Service account email must be added as **Owner** in Search Console property settings
- Token refresh: Handled automatically by Google client libraries; tokens expire after 1 hour and are refreshed via signed JWTs
- Environment variable: `GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json`

**Option B: OAuth 2.0 Desktop/Installed App**

- Best for: Multi-user scenarios where each user authorizes their own properties
- How it works: Browser-based consent flow; stores refresh token locally
- Requirement: User must grant consent via browser on first use
- Token refresh: Access tokens expire in 1 hour; refresh token is used to obtain new access tokens automatically
- Files: `client_secrets.json` (OAuth client config) + `credentials.json` (stored tokens after consent)

**Recommendation for our MCP:** Use **Service Account** authentication. It requires no browser interaction, works headlessly with Claude Desktop/Code, and the service account email simply needs to be added as an Owner to the vaxtimyoxdu.com Search Console property.

### 4.4 Token Refresh Mechanism

Service accounts use short-lived access tokens (1 hour TTL). The Google Auth libraries handle refresh automatically:

```typescript
// googleapis library handles this internally
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/webmasters'],
});

// Tokens are automatically refreshed before expiry
const client = await auth.getClient();
```

---

## 5. Rate Limits and Quotas

### 5.1 Search Console API Quotas

| Resource | Metric | Per-Site | Per-User | Per-Project |
|----------|--------|----------|----------|-------------|
| **Search Analytics** | QPM | 1,200 | 1,200 | 40,000 |
| **Search Analytics** | QPD | -- | -- | 30,000,000 |
| **URL Inspection** | QPM | 600 | -- | 15,000 |
| **URL Inspection** | QPD | 2,000 | -- | 10,000,000 |
| **All Other** (Sitemaps, Sites) | QPS | -- | 20 | -- |
| **All Other** (Sitemaps, Sites) | QPM | -- | 200 | -- |
| **All Other** (Sitemaps, Sites) | QPD | -- | -- | 100,000,000 |

**Load Quotas (Search Analytics only):**
- Short-term load quota: measured in 10-minute chunks
- Long-term load quota: measured in 1-day chunks
- Queries grouped by page and/or query dimensions are more resource-intensive
- Longer date ranges consume more load quota
- Exceeding load quota requires waiting 15 minutes or simplifying queries

### 5.2 Indexing API Quotas

| Metric | Limit |
|--------|-------|
| Publish requests (URL_UPDATED + URL_DELETED) | 200 per day per project |
| Metadata read requests | 180 per minute per project |
| All endpoints combined | 380 per minute per project |
| Batch size | 100 requests per batch |

Resets daily at midnight Pacific Time. Additional quota can be requested via Google form.

### 5.3 Practical Implications for vaxtimyoxdu.com

With a single site, the most relevant limits are:
- **Search Analytics:** 1,200 queries per minute per site -- more than enough
- **URL Inspection:** 2,000 per day per site -- with 384 pages across 4 locales, we can inspect every page approximately 5 times per day
- **Sitemaps:** 200 QPM per user -- no concern for our use case

---

## 6. Existing MCP Implementations

### 6.1 mcp-server-gsc (TypeScript/npm) -- RECOMMENDED

- **Repository:** https://github.com/ahonn/mcp-server-gsc
- **npm:** `mcp-server-gsc` (v0.3.0, actively maintained)
- **Language:** TypeScript (89%), requires Node.js 18+
- **License:** MIT
- **Authentication:** Service Account via `GOOGLE_APPLICATION_CREDENTIALS` env var

**Exposed MCP Tools:**

| Tool | Description |
|------|-------------|
| `gsc.list_sites` | List all GSC properties with permission levels |
| `gsc.search_analytics` | Query search performance data with filters, up to 25K rows |
| `gsc.inspect_url` | Check URL indexing status, crawl info, mobile usability |
| `gsc.list_sitemaps` | List all submitted sitemaps with status |
| `gsc.submit_sitemap` | Submit a new sitemap |
| `gsc.delete_sitemap` | Remove a sitemap |

**Features:**
- 25,000 row limit support
- Regex filter support
- Automatic quick wins detection
- Multi-dimensional analysis
- Flexible date ranges

**Claude Desktop config:**
```json
{
  "mcpServers": {
    "gsc": {
      "command": "npx",
      "args": ["-y", "mcp-server-gsc"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/service-account.json"
      }
    }
  }
}
```

### 6.2 mcp-gsc (Python) -- Feature-Rich Alternative

- **Repository:** https://github.com/AminForou/mcp-gsc
- **Language:** Python 3.11+
- **Authentication:** OAuth (recommended) or Service Account
- **Tools:** 19 MCP tools

**Exposed MCP Tools (19 total):**

| Category | Tools |
|----------|-------|
| Property Management | `list_properties`, `get_site_details`, `add_site`, `delete_site` |
| Search Analytics | `get_search_analytics`, `get_performance_overview`, `get_search_by_page_query`, `compare_search_periods`, `get_advanced_search_analytics` |
| URL Inspection | `check_indexing_issues`, `inspect_url_enhanced`, `batch_url_inspection` |
| Sitemap Management | `get_sitemaps`, `list_sitemaps_enhanced`, `submit_sitemap`, `get_sitemap_details` |
| Utility | `reauthenticate` |

**Advantages:** More tools, batch URL inspection, performance comparison across time periods, fresh data access.
**Disadvantages:** Python dependency, more complex setup than npm.

### 6.3 search-console-mcp (Python/Flask) -- Cloud-Hosted

- **Repository:** https://github.com/garethcull/search-console-mcp
- **Language:** Python with Flask
- **Authentication:** Bearer token + Service Account
- **Notable:** Uses Google Gemini for natural language query processing
- **Architecture:** JSON-RPC 2.0 via HTTP, deployable to Google Cloud Run

### 6.4 Other Implementations

| Repository | Language | Notes |
|------------|----------|-------|
| `surendranb/google-search-console-mcp` | -- | Multi-client support (Claude, Cursor, Windsurf) |
| `Shin-sibainu/google-search-console-mcp-server` | -- | Claude Code and Claude Desktop focused |
| `soumyadeep-ux/gsc-mcp-server` | -- | Includes hosted version (Ekamoira) |
| `saurabhsharma2u/search-console-mcp` | -- | Multi-service (GSC + Bing + GA4) |

---

## 7. Technical Feasibility Assessment

### 7.1 Capability Matrix

| Requested Capability | API | Feasible? | Notes |
|---------------------|-----|-----------|-------|
| Check indexing status of any URL | URL Inspection API | **YES** | Returns verdict, coverage, crawl info, canonical, mobile usability |
| Submit URLs for indexing (Request Indexing) | Indexing API | **NO** (for our content) | Restricted to JobPosting/BroadcastEvent structured data only |
| Get search performance data | Search Analytics API | **YES** | Clicks, impressions, CTR, position with rich filtering |
| List/submit sitemaps | Sitemaps API | **YES** | Full CRUD operations on sitemaps |
| Show crawl errors | URL Inspection API | **PARTIAL** | pageFetchState shows errors (SOFT_404, BLOCKED_ROBOTS_TXT, NOT_FOUND, SERVER_ERROR, etc.) but no bulk "crawl errors" list endpoint exists |

### 7.2 "Request Indexing" Limitation -- Deep Dive

The Google Indexing API (`indexing.googleapis.com`) is NOT a general-purpose indexing request mechanism. It is designed exclusively for:
1. Pages with `JobPosting` structured data
2. Pages with `BroadcastEvent` embedded in `VideoObject` structured data

vaxtimyoxdu.com has tool pages, news articles, and blog posts -- none of which qualify. There is no API equivalent to the "Request Indexing" button in the Search Console UI. This button is only available through the manual web interface.

**Workaround options:**
- Submit/resubmit sitemaps via the Sitemaps API to signal content updates
- Use the URL Inspection API to check if pages are already indexed
- Ensure sitemap `<lastmod>` dates are accurate to encourage recrawling
- There is no programmatic way to request indexing for non-JobPosting content

### 7.3 "Show Crawl Errors" Limitation

There is no dedicated "crawl errors" API endpoint. However, the URL Inspection API returns `pageFetchState` which indicates crawl problems for individual URLs. To get a crawl error report, you would need to:
1. Maintain a list of all site URLs (from sitemap)
2. Inspect each URL individually (limited to 2,000/day per site)
3. Filter for non-SUCCESSFUL pageFetchState values

This is viable for vaxtimyoxdu.com with 384 pages -- well within the 2,000/day quota.

---

## 8. Recommended Architecture

### 8.1 Decision: Use Existing Package vs Build Custom

**Recommendation: Use `mcp-server-gsc` (npm) as the primary server.**

Rationale:
- TypeScript/Node.js matches our stack (Next.js project)
- MIT licensed, actively maintained (v0.3.0, last published within the past month)
- Covers all feasible capabilities (Search Analytics, URL Inspection, Sitemaps, Sites)
- Service Account authentication -- no browser interaction needed
- Simple setup via `npx` -- no installation required
- Already tested with Claude Desktop and Claude Code

If we need more advanced features (batch inspection, period comparison), we could consider the Python `mcp-gsc` as a secondary option.

### 8.2 Architecture if Building Custom

If a custom implementation is ever needed, here is the recommended stack:

```
Runtime:        Node.js 20.x (matches Vercel deployment)
Language:       TypeScript
MCP SDK:        @modelcontextprotocol/sdk (official TypeScript SDK)
Google Client:  googleapis (official Google API Node.js client)
Auth:           google-auth-library (handles Service Account JWT + token refresh)
Transport:      stdio (for Claude Desktop/Code integration)
```

**Project Structure:**
```
gsc-mcp-server/
  src/
    index.ts              # MCP server entry point
    tools/
      search-analytics.ts # Search performance queries
      url-inspection.ts   # URL indexing status checks
      sitemaps.ts         # Sitemap management
      sites.ts            # Site/property management
    auth/
      google-auth.ts      # Service Account authentication
    types/
      gsc-types.ts        # TypeScript interfaces for API responses
  package.json
  tsconfig.json
```

**MCP Tool Registration Example:**
```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "gsc-server",
  version: "1.0.0",
});

server.tool(
  "inspect_url",
  "Check the Google indexing status of a URL",
  {
    url: z.string().url().describe("The URL to inspect"),
    siteUrl: z.string().describe("The Search Console property URL"),
  },
  async ({ url, siteUrl }) => {
    // Call URL Inspection API
    const result = await inspectUrl(url, siteUrl);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

### 8.3 Node.js vs Python Comparison

| Factor | Node.js (mcp-server-gsc) | Python (mcp-gsc) |
|--------|--------------------------|-------------------|
| Stack alignment | Matches our Next.js project | Different runtime |
| Setup complexity | `npx -y mcp-server-gsc` | Python 3.11+, pip install, venv |
| Tool count | 6 tools | 19 tools |
| Authentication | Service Account only | OAuth + Service Account |
| Batch inspection | No | Yes |
| Performance comparison | No | Yes (compare_search_periods) |
| Maintenance | Active (npm v0.3.0) | Active |
| Claude Code compat | Native stdio | Native stdio |

**Verdict:** Start with `mcp-server-gsc` (Node.js) for simplicity and stack alignment. If advanced features are needed later (batch inspection, period comparison), evaluate adding `mcp-gsc` (Python) as a secondary server.

---

## 9. Google Cloud Credentials Setup Guide

### Step 1: Create a Google Cloud Project

1. Go to https://console.cloud.google.com/
2. Click the project dropdown at the top and select "New Project"
3. Name it (e.g., "vaxtimyoxdu-gsc-mcp")
4. Note the Project ID for later reference

### Step 2: Enable Required APIs

1. In the Google Cloud Console, navigate to **APIs & Services > Library**
2. Search for and enable:
   - **Google Search Console API** (`searchconsole.googleapis.com`)
   - _(Optional)_ **Web Search Indexing API** (`indexing.googleapis.com`) -- only for JobPosting content

Or use the quick-enable link:
```
https://console.cloud.google.com/start/api?id=searchconsole.googleapis.com&credential=client_key
```

### Step 3: Create a Service Account

1. Navigate to **APIs & Services > Credentials**
2. Click **Create Credentials > Service Account**
3. Fill in:
   - **Name:** `gsc-mcp-service-account`
   - **Description:** "Service account for GSC MCP server"
4. Click **Create and Continue**
5. Skip the optional role assignment (not needed for Search Console API)
6. Click **Done**

### Step 4: Generate a JSON Key

1. In the Credentials page, find the service account you just created
2. Click on the service account email
3. Go to the **Keys** tab
4. Click **Add Key > Create new key**
5. Select **JSON** format
6. Click **Create** -- the JSON key file will download automatically
7. Store this file securely (e.g., `~/.config/gsc-mcp/service-account.json`)
8. **Never commit this file to version control**

The JSON key file looks like:
```json
{
  "type": "service_account",
  "project_id": "vaxtimyoxdu-gsc-mcp",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "gsc-mcp-service-account@vaxtimyoxdu-gsc-mcp.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

### Step 5: Add Service Account to Search Console

1. Go to https://search.google.com/search-console
2. Select the **vaxtimyoxdu.com** property
3. Navigate to **Settings > Users and permissions**
4. Click **Add user**
5. Enter the service account email from the JSON key (the `client_email` field, e.g., `gsc-mcp-service-account@vaxtimyoxdu-gsc-mcp.iam.gserviceaccount.com`)
6. Set permission to **Owner** (required for full API access including sitemaps)
7. Click **Add**

### Step 6: Configure the MCP Server

For Claude Desktop, edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "gsc": {
      "command": "npx",
      "args": ["-y", "mcp-server-gsc"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/Users/raufabdullayev/.config/gsc-mcp/service-account.json"
      }
    }
  }
}
```

For Claude Code, add to `.claude/settings.json` or project-level MCP config:
```json
{
  "mcpServers": {
    "gsc": {
      "command": "npx",
      "args": ["-y", "mcp-server-gsc"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/Users/raufabdullayev/.config/gsc-mcp/service-account.json"
      }
    }
  }
}
```

### Step 7: Verify the Setup

Once configured, you can verify by asking Claude:
- "List my Search Console properties" (should show vaxtimyoxdu.com)
- "Show search analytics for vaxtimyoxdu.com for the last 7 days" (should return performance data)
- "Inspect URL https://vaxtimyoxdu.com/" (should return indexing status)

---

## 10. Risk Assessment and Limitations

### 10.1 Key Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Indexing API cannot submit arbitrary URLs | High | Document limitation clearly; use sitemap submission instead |
| URL Inspection shows cached index data, not live | Medium | Note in tool descriptions that results may be delayed |
| 2,000 URL inspections/day per site | Low | With 384 pages, this is sufficient; implement caching if needed |
| Service Account key security | High | Store outside repo, use environment variables, restrict file permissions |
| API quotas exceeded during batch operations | Low | Implement rate limiting in MCP tools; respect QPM limits |
| Google API changes/deprecation | Low | Use official googleapis client library which tracks changes |

### 10.2 Data Freshness

- **Search Analytics data:** 2-3 day delay (Google's processing time)
- **URL Inspection data:** Shows last crawled version in Google's index, not live page
- **Sitemaps data:** Near real-time for submission status
- **Fresh data option:** Use `dataState: "all"` in Search Analytics to include preliminary data

### 10.3 Scope Limitations

The MCP server will NOT be able to:
1. Request indexing of tool/blog/news pages (Indexing API restriction)
2. View real-time crawl logs or Googlebot access logs
3. Access Core Web Vitals data (separate API: Chrome UX Report)
4. Access manual actions or security issues programmatically
5. Perform live URL testing (only cached index version available)

---

## Sources

- [Search Console API Reference](https://developers.google.com/webmaster-tools/v1/api_reference_index)
- [Search Console API Prerequisites](https://developers.google.com/webmaster-tools/v1/prereqs)
- [Authorize Requests](https://developers.google.com/webmaster-tools/v1/how-tos/authorizing)
- [Search Analytics Query](https://developers.google.com/webmaster-tools/v1/searchanalytics/query)
- [URL Inspection API](https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect)
- [UrlInspectionResult](https://developers.google.com/webmaster-tools/v1/urlInspection.index/UrlInspectionResult)
- [Usage Limits](https://developers.google.com/webmaster-tools/limits)
- [Indexing API Usage](https://developers.google.com/search/apis/indexing-api/v3/using-api)
- [Indexing API Quota](https://developers.google.com/search/apis/indexing-api/v3/quota-pricing)
- [Indexing API Prerequisites](https://developers.google.com/search/apis/indexing-api/v3/prereqs)
- [OAuth 2.0 Scopes](https://developers.google.com/identity/protocols/oauth2/scopes)
- [Service Account Auth](https://developers.google.com/identity/protocols/oauth2/service-account)
- [mcp-server-gsc (npm)](https://www.npmjs.com/package/mcp-server-gsc)
- [mcp-server-gsc (GitHub)](https://github.com/ahonn/mcp-server-gsc)
- [mcp-gsc (GitHub)](https://github.com/AminForou/mcp-gsc)
- [search-console-mcp (GitHub)](https://github.com/garethcull/search-console-mcp)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [@modelcontextprotocol/sdk (npm)](https://www.npmjs.com/package/@modelcontextprotocol/sdk)
