window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
gtag('set', 'url_passthrough', true);
gtag('set', 'ads_data_redaction', true);
gtag('js', new Date());

// Auto-detect GA Measurement ID from the gtag.js script URL on the page.
// This avoids needing an inline <Script> with dynamic env-var content,
// which would require 'unsafe-inline' in CSP.
(function() {
  var scripts = document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]');
  for (var i = 0; i < scripts.length; i++) {
    var match = scripts[i].src.match(/[?&]id=([^&]+)/);
    if (match && match[1]) {
      gtag('config', match[1]);
      break;
    }
  }
})();
