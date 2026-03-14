const SITE_URL = 'https://vaxtimyoxdu.com'

interface WelcomeContent {
  heading: string
  intro: string
  toolsCta: string
  toolsLink: string
  closing: string
  unsubscribe: string
}

function getContent(locale: string): WelcomeContent {
  switch (locale) {
    case 'az':
      return {
        heading: 'Vaxtim Yoxdu-ya xoş gəldiniz!',
        intro:
          'Bülletenimizə abunə olduğunuz üçün təşəkkür edirik! Biz sizə vaxt qənaət etməyə kömək edəcək qısa xəbər xülasələri və pulsuz onlayn alətlər təqdim edirik.',
        toolsCta: 'Populyar alətlərimizə baxın',
        toolsLink: `${SITE_URL}/tools`,
        closing: 'Yeni alətlər və xəbərlər haqqında sizi məlumatlandıracağıq.',
        unsubscribe: 'Abunəlikdən çıxmaq üçün buraya klikləyin',
      }
    case 'tr':
      return {
        heading: "Vaxtim Yoxdu'ya hoş geldiniz!",
        intro:
          'Bültenimize abone olduğunuz için teşekkür ederiz! Size zaman kazandıracak kısa haber özetleri ve ücretsiz çevrimiçi araçlar sunuyoruz.',
        toolsCta: 'Popüler araçlarımıza göz atın',
        toolsLink: `${SITE_URL}/tr/tools`,
        closing: 'Yeni araçlar ve haberler hakkında sizi bilgilendireceğiz.',
        unsubscribe: 'Abonelikten çıkmak için buraya tıklayın',
      }
    case 'ru':
      return {
        heading: 'Добро пожаловать в Vaxtim Yoxdu!',
        intro:
          'Спасибо за подписку на нашу рассылку! Мы предоставляем краткие обзоры новостей и бесплатные онлайн-инструменты, которые помогут вам сэкономить время.',
        toolsCta: 'Посмотрите наши популярные инструменты',
        toolsLink: `${SITE_URL}/ru/tools`,
        closing: 'Мы будем информировать вас о новых инструментах и новостях.',
        unsubscribe: 'Нажмите здесь, чтобы отписаться',
      }
    default:
      return {
        heading: 'Welcome to Vaxtim Yoxdu!',
        intro:
          'Thank you for subscribing to our newsletter! We provide short news summaries and free online tools to help you save time.',
        toolsCta: 'Check out our popular tools',
        toolsLink: `${SITE_URL}/en/tools`,
        closing: "We'll keep you updated with new tools and news.",
        unsubscribe: 'Click here to unsubscribe',
      }
  }
}

export function getWelcomeEmailHtml(locale: string): string {
  const c = getContent(locale)

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${c.heading}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:8px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:32px 24px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Vaxtim Yoxdu</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px 24px;">
              <h2 style="margin:0 0 16px;color:#18181b;font-size:20px;font-weight:600;">${c.heading}</h2>
              <p style="margin:0 0 24px;color:#3f3f46;font-size:16px;line-height:1.6;">${c.intro}</p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
                <tr>
                  <td style="background-color:#6366f1;border-radius:6px;">
                    <a href="${c.toolsLink}" style="display:inline-block;padding:12px 24px;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;">${c.toolsCta}</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0;color:#3f3f46;font-size:16px;line-height:1.6;">${c.closing}</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px;border-top:1px solid #e4e4e7;text-align:center;">
              <p style="margin:0;color:#a1a1aa;font-size:13px;">
                <a href="${SITE_URL}" style="color:#6366f1;text-decoration:none;">vaxtimyoxdu.com</a>
              </p>
              <p style="margin:8px 0 0;color:#a1a1aa;font-size:12px;">
                <a href="${SITE_URL}/api/newsletter/unsubscribe?email={{email}}" style="color:#a1a1aa;text-decoration:underline;">${c.unsubscribe}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
