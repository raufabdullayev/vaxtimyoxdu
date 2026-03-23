/**
 * Bing Webmaster Tools site verification file.
 *
 * Replace PLACEHOLDER_VERIFICATION_CODE below with the actual code
 * provided by Bing Webmaster Tools during site verification.
 *
 * Steps:
 * 1. Go to https://www.bing.com/webmasters
 * 2. Add vaxtimyoxdu.com
 * 3. Choose "XML file" verification method
 * 4. Copy the verification code from the downloaded BingSiteAuth.xml
 * 5. Replace PLACEHOLDER_VERIFICATION_CODE with that code
 * 6. Deploy and verify in Bing Webmaster Tools
 */

const BING_VERIFICATION_CODE = process.env.BING_SITE_AUTH || 'PLACEHOLDER_VERIFICATION_CODE'

export async function GET() {
  const xml = `<?xml version="1.0"?>
<users>
  <user>${BING_VERIFICATION_CODE}</user>
</users>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
