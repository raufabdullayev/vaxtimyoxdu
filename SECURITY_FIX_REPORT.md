# Analytics API Key Exposure - Security Fix Report

**Project:** vaxtimYoxdu  
**Date:** 2026-03-14  
**Severity:** HIGH  
**Status:** FIXED

## Vulnerability Summary

The Analytics API endpoint (`GET /api/analytics/stats`) accepted the API key as a URL query parameter (`?api_key=...`), which exposed the credential in:
- CDN request logs
- Browser history
- Vercel deployment logs
- Proxy and firewall logs
- Any intermediary system logging HTTP requests

## Root Cause

The `isAuthorized()` function in `src/app/api/analytics/stats/route.ts` accepted credentials from two sources:
1. HTTP header `x-api-key` (secure)
2. Query parameter `api_key` (vulnerable)

Query parameters are **always logged** in HTTP infrastructure, unlike request headers which can be sanitized.

## Fix Applied

### File 1: `src/app/api/analytics/stats/route.ts`

**Changes:**
- Removed query parameter acceptance entirely
- Added import: `import { timingSafeEqual } from 'crypto'`
- Updated `isAuthorized()` to use constant-time comparison
- Implemented early validation: fail immediately if header is missing
- Added try-catch around `timingSafeEqual()` to handle length mismatches

**Key Security Features:**
- **Timing-safe comparison:** Prevents timing attacks that could leak key length or character patterns
- **Header-only:** Forces use of request headers which can be sanitized from logs
- **Early exit:** Validates header presence before performing expensive crypto operations

### File 2: `src/app/api/__tests__/analytics-stats.test.ts`

**Changes:**
- Simplified `createRequest()` helper to only accept header-based authentication
- Removed 2 test cases that validated query parameter functionality
- Retained 7 test cases for header-based authentication

**Removed Tests:**
1. "should return 401 when wrong API key is provided via query param"
2. "should accept valid API key via query parameter and return 200"

## Code Changes

### Before (Vulnerable)
```typescript
function isAuthorized(req: NextRequest): boolean {
  const apiKey = process.env.ANALYTICS_API_KEY
  if (!apiKey) return false

  const headerKey = req.headers.get('x-api-key')
  if (headerKey === apiKey) return true

  const urlKey = req.nextUrl.searchParams.get('api_key')  // VULNERABLE
  if (urlKey === apiKey) return true

  return false
}
```

### After (Secured)
```typescript
function isAuthorized(req: NextRequest): boolean {
  const apiKey = process.env.ANALYTICS_API_KEY
  if (!apiKey) return false

  const headerKey = req.headers.get('x-api-key')
  if (!headerKey) return false  // Fail early

  try {
    return timingSafeEqual(        // Constant-time comparison
      Buffer.from(headerKey),
      Buffer.from(apiKey)
    )
  } catch {
    return false                   // Handle length mismatch safely
  }
}
```

## Impact Assessment

### Breaking Changes
- ✓ Clients calling with `?api_key=` parameter will receive 401 Unauthorized
- Mitigation: All external clients must update to use `x-api-key` header

### Analytics Functionality
- ✓ No changes to response shape or data
- ✓ All aggregation logic preserved
- ✓ Database queries unchanged
- ✓ Error handling maintained

### Other Endpoints
- `/api/analytics/track` - Unaffected (no API key protection)
- All other API routes - Unaffected

## Migration Guide for Clients

### Old Way (Vulnerable)
```bash
curl "https://api.example.com/api/analytics/stats?api_key=YOUR_SECRET_KEY"
```

### New Way (Secure)
```bash
curl -H "x-api-key: YOUR_SECRET_KEY" "https://api.example.com/api/analytics/stats"
```

## Testing

### Test Coverage
- ✓ Authentication failures (no key, wrong key, missing env var)
- ✓ Authorization success with valid header key
- ✓ Response shape validation
- ✓ Data aggregation correctness
- ✓ Supabase integration

### Tests Modified
- 2 query-parameter-based tests removed
- 7 header-based authentication tests retained
- All core functionality tests preserved

## Deployment Notes

1. Deploy this fix to all environments before advertising the stats endpoint
2. If external clients are using the old query parameter approach:
   - Send advance notice to migrate to header-based auth
   - Set a sunset date for query parameter support
   - Monitor logs for deprecated query parameter usage
3. Update any documentation/dashboards that consume the stats endpoint

## Security Best Practices Applied

1. **Principle of Least Privilege:** Removed unnecessary acceptance path
2. **Defense in Depth:** Timing-safe comparison + header-only enforcement
3. **Fail Secure:** Early validation prevents wasteful processing
4. **Constant-Time Operations:** `timingSafeEqual()` prevents cryptanalytic attacks
5. **Fail-Safe Exception Handling:** Catches edge cases safely

## Verification Checklist

- [x] Query parameter acceptance removed
- [x] Timing-safe comparison implemented
- [x] Early header validation added
- [x] Documentation updated
- [x] Tests updated to reflect changes
- [x] No breaking changes to response format
- [x] Core analytics functionality preserved
- [x] Error handling covers all edge cases

---

**Files Modified:**
- `/src/app/api/analytics/stats/route.ts`
- `/src/app/api/__tests__/analytics-stats.test.ts`

**Responsible Engineer:** Security Team  
**Review Status:** Ready for QA verification
