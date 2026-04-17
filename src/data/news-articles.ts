export interface NewsArticle {
  title: string
  date: string
  category: string
  content: string
  locale?: string
}

export const newsArticles: Record<string, NewsArticle> = {
  // ========== 2026-04-17 ==========

  // --- Antalya Diplomacy Forum opens (04-17) ---
  'antalya-diplomatiya-forumu-acildi-150-olke': {
    title: 'Antalya Diplomatiya Forumu 150-dən çox ölkə ilə açıldı',
    date: '2026-04-17',
    category: 'Dünya',
    locale: 'az',
    content: `5-ci Antalya Diplomatiya Forumu (ADF2026) bu gün, 17 aprel tarixində Türkiyə Prezidenti Rəcəb Tayyib Ərdoğan və Xarici İşlər Naziri Hakan Fidanın açılış nitqləri ilə rəsmən başladı. Forumun bu ilki şüarı "Sabahı Tərtib Etmək, Qeyri-Müəyyənlikləri İdarə Etmək"dir.

## Yüksək səviyyəli iştirak

Toplantıya 150-dən çox ölkədən 20-dən artıq dövlət başçısı, 15 vitse-prezident və 50-dən çox xarici işlər naziri qatılır. Tədbirin ən diqqətçəkən qonaqları arasında Azərbaycan Prezidenti İlham Əliyev, Pakistan Baş Naziri Şahbaz Şərif və Suriya Prezidenti Əhməd əş-Şəra var.

## Diplomatik təmaslar

Forum çərçivəsində bir sıra mühüm ikitərəfli görüşlər planlaşdırılıb. Ərdoğan əş-Şəra ilə görüşündə Suriyaya qarşı beynəlxalq sanksiyaların ləğvi məsələsini müzakirə edəcək. Türkiyə bu istiqamətdə səylərini davam etdirəcəyini bəyan etdi. Əliyev də əş-Şəra ilə ikitərəfli görüş keçirəcək. Ermənistan toplantıda Xarici İşlər Nazirinin müavini Vahan Kostanyan tərəfindən təmsil olunur.

## Regional gündəlik

Forumun gündəliyində İran müharibəsinin nəticələri, İsrail-Livan atəşkəsi və ABŞ-İran danışıqları xüsusi yer tutur. Antalya bu il dünya diplomatiyasının nəbzini tutan əsas mərkəzlərdən birinə çevrildi.`,
  },
  'en-antalya-diplomacy-forum-2026-opens': {
    title: 'Antalya Diplomacy Forum Opens With 150+ Countries',
    date: '2026-04-17',
    category: 'World',
    locale: 'en',
    content: `The 5th Antalya Diplomacy Forum opened on April 17 in southern Türkiye, drawing leaders from more than 150 countries under the theme "Mapping Tomorrow, Managing Uncertainties." President Recep Tayyip Erdoğan and Foreign Minister Hakan Fidan delivered the opening addresses.

## Heads of State and Senior Officials

The forum brought together more than 20 heads of state, 15 vice presidents and 50 ministers. Among the high-profile attendees were Azerbaijani President Ilham Aliyev, Pakistani Prime Minister Shehbaz Sharif and Syrian leader Ahmed al-Sharaa. Armenia was represented by Deputy Foreign Minister Vahan Kostanyan.

## Sidelines and Bilateral Meetings

Erdoğan held a working meeting with al-Sharaa centered on lifting international sanctions on Syria, with Türkiye pledging continued diplomatic effort. Aliyev also met al-Sharaa in a separate bilateral. The flurry of side meetings underscored Antalya's growing weight as a regional diplomatic venue.

## Theme and Agenda

With wars in Ukraine and the Middle East as backdrop, organizers framed the forum as a venue for "managing uncertainties" rather than projecting easy answers, signaling a more sober tone than past editions.`,
  },
  'tr-antalya-diplomasi-forumu-2026-acildi': {
    title: '5. Antalya Diplomasi Forumu 150 Ülke Lideriyle Açıldı',
    date: '2026-04-17',
    category: 'Dünya',
    locale: 'tr',
    content: `5. Antalya Diplomasi Forumu (ADF2026), 17 Nisan 2026 tarihinde Cumhurbaşkanı Recep Tayyip Erdoğan ve Dışişleri Bakanı Hakan Fidan'ın açılış konuşmalarıyla resmen başladı. Bu yılki forumun teması "Yarını Haritalamak, Belirsizlikleri Yönetmek" olarak belirlendi.

## Geniş Katılım

Foruma 150'den fazla ülkeden 20'yi aşkın devlet başkanı, 15 yardımcı, 50'den fazla bakan ve çok sayıda diplomat katıldı. Azerbaycan Cumhurbaşkanı İlham Aliyev, Pakistan Başbakanı Şehbaz Şerif ve Suriye Devlet Başkanı Ahmed el-Şara öne çıkan konuklar arasında yer aldı. Ermenistan ise Dışişleri Bakan Yardımcısı Vahan Kostanyan tarafından temsil edildi.

## Önemli İkili Görüşmeler

Forumun kulislerinde kritik ikili görüşmeler gerçekleşti. Erdoğan ve el-Şara, Suriye'ye yönelik uluslararası yaptırımların kaldırılması konusunda zemin oluşturmaya çalıştı. Cumhurbaşkanı Erdoğan, Türkiye'nin Suriye üzerindeki yaptırımların kaldırılması için çabalarını sürdüreceğini açıkladı. Aliyev ile el-Şara arasında da ikili görüşme yapıldı.

## Bölgesel ve Küresel Bağlam

Forum, devam eden İran savaşı, İsrail-Lübnan ateşkesi ve ABD-İran müzakerelerinin sürdüğü hassas bir dönemde toplandı. Antalya, böylece bu kritik diplomatik trafiğin merkezi haline geldi. Etkinlik 19 Nisan'a kadar devam edecek.`,
  },
  'ru-antaliyskiy-diplomaticheskiy-forum-2026-otkrylsya': {
    title: 'В Анталье открылся 5-й Дипломатический форум',
    date: '2026-04-17',
    category: 'Мир',
    locale: 'ru',
    content: `5-й Антальский дипломатический форум (ADF2026) официально открылся 17 апреля под девизом «Картируя завтрашний день, управляя неопределённостями». Президент Турции Эрдоган и министр иностранных дел Хакан Фидан выступили со вступительными речами.

## Беспрецедентный масштаб

В трёхдневном форуме принимают участие представители более чем 150 стран, включая свыше 20 глав государств, 15 вице-президентов и более 50 министров иностранных дел. Среди заметных гостей — президент Азербайджана Ильхам Алиев, премьер-министр Пакистана Шахбаз Шариф и президент Сирии Ахмед аш-Шараа.

## Сирийские санкции в фокусе

На полях форума состоялись важные двусторонние встречи. Эрдоган и аш-Шараа обсудили перспективы снятия международных санкций с Сирии. Турецкий лидер подчеркнул, что Анкара продолжит усилия по дипломатической поддержке Дамаска. Также прошли переговоры между Алиевым и аш-Шараа.

## Армения на форуме

Армению на встрече представляет заместитель министра иностранных дел Ваан Костанян. Это указывает на сохраняющуюся осторожность Еревана в отношении высокоуровневой региональной дипломатии. Форум продлится до 19 апреля.`,
  },

  // --- Trump: Iran deal "very close" (04-17) ---
  'tramp-iran-sazishi-cox-yaxindir-islamabad': {
    title: 'Tramp: İran sazişi çox yaxındır, İslamabadda davam edə bilər',
    date: '2026-04-17',
    category: 'Dünya',
    locale: 'az',
    content: `ABŞ Prezidenti Donald Tramp 17 aprel tarixində Las-Veqasda keçirilən "Bəhşişlərə Vergi Yox" (No Tax on Tips) tədbirində bəyan etdi ki, İran ilə saziş "çox yaxındır" və danışıqlar bu həftəsonu kimi tezliklə İslamabadda davam edə bilər.

## Pakistanın vasitəçilik rolu

Pakistan Ordu Komandanı General Asim Munirin başçılıq etdiyi yüksək səviyyəli Pakistan nümayəndə heyəti ABŞ-ın mesajını Tehrana çatdırdı. Pakistanın bu rolu son həftələrdə xüsusi əhəmiyyət kəsb etdi. Vitse-prezident JD Vance daha əvvəl İslamabadda təxminən 21 saat sürən danışıqlara rəhbərlik etmişdi, lakin o zaman saziş əldə edilməmişdi.

## Müharibənin fonunda

İran müharibəsi 28 fevralda başlamışdı və o vaxtdan bəri regional vəziyyət gərgin qalmaqda davam edir. Cümə günü qüvvəyə minən İsrail-Livan atəşkəsi danışıqlar üçün əlverişli mühit yaradır. Tramp administrasiyası diplomatik həllin mümkün olduğunu bildirir.

## Bazar reaksiyası

Bu xəbər energetika bazarlarında müsbət təsir göstərdi. Brent neft qiymətləri stabilləşdi, qızıl isə investorların ehtiyatlı optimizmini əks etdirərək rekord ətrafında qaldı. Diplomatik proqresin reallaşması yaxın günlərin əsas sınağı olacaq.`,
  },
  'en-trump-iran-deal-very-close-islamabad': {
    title: 'Trump Says Iran Deal "Very Close" as Talks Eye Islamabad',
    date: '2026-04-17',
    category: 'World',
    locale: 'en',
    content: `President Donald Trump said on April 17 that an agreement with Iran is "very close" and that talks could resume in Islamabad as early as the weekend. Trump made the remarks at a "No Tax on Tips" event in Las Vegas, signaling a possible breakthrough after weeks of intermittent negotiations.

## Pakistan as Mediator

A Pakistani delegation led by Army Chief Asim Munir delivered a US message to Tehran in recent days, according to officials briefed on the matter. Islamabad has emerged as the preferred venue for indirect contacts between Washington and Tehran since the war began on Feb. 28.

## Vance's Earlier Round

Vice President JD Vance led an earlier round of US-Iran talks in Islamabad that ran roughly 21 hours but ended without an agreement. US officials said the latest opening was driven by intensified diplomatic engagement on both sides.

## Stakes for Markets and the Region

A breakthrough would ease oil prices, which have hovered near $95 per barrel through April, and could unlock a broader regional de-escalation already visible in this week's Israel-Lebanon ceasefire. Trump did not commit to a date for any final agreement.`,
  },
  'tr-trump-iran-anlasmasi-cok-yakin': {
    title: 'Trump: İran Anlaşması "Çok Yakın", Görüşmeler İslamabad\'da',
    date: '2026-04-17',
    category: 'Dünya',
    locale: 'tr',
    content: `ABD Başkanı Donald Trump, 17 Nisan'da Las Vegas'taki "Bahşişlerden Vergi Yok" etkinliğinde yaptığı açıklamada İran ile bir anlaşmanın "çok yakın" olduğunu ve müzakerelerin hafta sonu kadar erken bir tarihte İslamabad'da yeniden başlayabileceğini belirtti.

## Pakistan'ın Arabuluculuk Rolü

Daha önceki ABD-İran görüşmelerine ABD Başkan Yardımcısı JD Vance liderlik etmişti. İslamabad'da yaklaşık 21 saat süren müzakereler bir anlaşmayla sonuçlanmamış olsa da diyalog kanalları açık kalmıştı. Pakistan Genelkurmay Başkanı Asım Münir liderliğindeki üst düzey heyet, ABD'nin mesajını Tahran'a iletmek üzere temaslarda bulundu.

## Diplomatik Süreç

Pakistan'ın arabuluculuk rolü, hem Washington hem de Tahran tarafından kritik olarak değerlendiriliyor. Olası bir anlaşma, ABD ve İran arasında haftalardır süren askeri gerginliği sona erdirebilir ve bölgesel istikrara önemli katkı sağlayabilir.

## Piyasa Tepkisi

Anlaşma beklentileri, küresel petrol piyasalarında dalgalanmaya neden oldu. Brent petrol fiyatlarının 100 dolara yaklaştığı bir dönemde, olası bir uzlaşı arz endişelerini hafifletebilir. Yatırımcılar İslamabad'dan gelecek sinyalleri yakından izliyor.`,
  },
  'ru-tramp-sdelka-s-iranom-ochen-blizka-islamabad': {
    title: 'Трамп: сделка с Ираном «очень близка»',
    date: '2026-04-17',
    category: 'Мир',
    locale: 'ru',
    content: `Президент США Дональд Трамп заявил 17 апреля на мероприятии «Без налога на чаевые» в Лас-Вегасе, что соглашение с Ираном «очень близко». По его словам, переговоры могут возобновиться в Исламабаде уже в эти выходные.

## Роль Пакистана

Высокопоставленная пакистанская делегация во главе с начальником Генерального штаба Асимом Муниром передала Тегерану послание Вашингтона. Исламабад выступает ключевым посредником между США и Ираном с самого начала войны 28 февраля.

## Предыдущий раунд

Вице-президент США Джей Ди Вэнс ранее провёл в Исламабаде около 21 часа переговоров с иранской стороной. Соглашение тогда не было достигнуто, однако стороны зафиксировали общие точки соприкосновения, на основе которых сейчас и возобновляются контакты.

## Сигнал для рынков

Заявление Трампа уже отразилось на рынках: золото и нефть отреагировали снижением напряжённости. Инвесторы ожидают, что прогресс по ирано-американскому треку поможет стабилизировать поставки нефти и снизить геополитические риски в регионе.`,
  },

  // --- US Senate war powers vote 47-52 (04-17) ---
  'abs-senati-tramp-iran-muharibe-seladiyetleri-47-52': {
    title: 'Senat Trampın İran səlahiyyətlərini məhdudlaşdıra bilmədi',
    date: '2026-04-17',
    category: 'Dünya',
    locale: 'az',
    content: `ABŞ Senatı 16-17 aprel tarixində Prezident Trampın İrana qarşı hərbi əməliyyatlar üzrə səlahiyyətlərini məhdudlaşdırmaq məqsədi daşıyan müharibə səlahiyyətləri qətnaməsini qəbul edə bilmədi. Səsvermə nəticəsində 47 səs lehinə, 52 səs əleyhinə oldu.

## Səsvermənin təfərrüatları

Bu, müharibənin 28 fevralda başlamasından sonra Senatda keçirilən dördüncü oxşar səsvermədir. Komitədən geri çıxarılma təklifi ilə bağlı səsvermədə Respublikaçı Senator Rand Paul (Kentukki) və Demokrat Senator Con Fetterman (Pensilvaniya) öz partiyalarının xəttini pozdular. Hər ikisi prezidentin Konqresin razılığı olmadan hərbi əməliyyatlar həyata keçirməsinə qarşı çıxır.

## Hüquqi çərçivə

Müharibə Səlahiyyətləri Aktına əsasən, prezident Konqresin formal müharibə elanı olmadan hərbi qüvvələrdən istifadə edərkən 60 gün ərzində Konqresin razılığını almalıdır. Demokratlar Trampın bu çərçivədən kənara çıxdığını iddia edir. Respublikaçılar isə prezidentin baş komandan səlahiyyətlərinin geniş şəkildə şərh edilməsinin tərəfdarıdır.

## Növbəti addımlar

47-52 nəticəsi qətnamənin keçməsinə imkan vermədi. Demokratlar yeni təşəbbüslər haqqında düşündüklərini bildirsə də, bu mərhələdə respublikaçı çoxluğun mövqeyi dəyişməyəcəyə bənzəyir.`,
  },
  'en-senate-rejects-iran-war-powers-resolution': {
    title: 'Senate Rejects 4th Iran War Powers Resolution, 47-52',
    date: '2026-04-17',
    category: 'World',
    locale: 'en',
    content: `The US Senate on April 16-17 rejected a fourth attempt to constrain President Donald Trump's military authority over Iran, voting 47-52 against a motion to discharge a war powers resolution from committee. The measure would have required congressional approval for further offensive action.

## Crossover Votes

Senator Rand Paul, Republican of Kentucky, and Senator John Fetterman, Democrat of Pennsylvania, broke with their parties on the vote. Paul has long criticized executive war-making authority, while Fetterman has consistently supported Israel and the Trump administration's Iran posture.

## A Familiar Pattern

It was the fourth such effort since the Iran war began on Feb. 28. Earlier votes failed by similar margins as Republican leaders argued the resolution would tie the president's hands during active hostilities. Democrats countered that the 60-day clock under the War Powers Act has long since lapsed.

## What Comes Next

With talks reportedly resuming in Islamabad, Senate Democrats may pause additional procedural challenges to give negotiations space. Aides on both sides of the aisle said another vote is unlikely until US-Iran diplomacy yields a clearer path, whether toward a deal or a renewed confrontation.`,
  },
  'tr-abd-senatosu-iran-savas-yetkileri-47-52': {
    title: 'ABD Senatosu, Trump\'ın İran Savaş Yetkilerini 47-52 Reddetti',
    date: '2026-04-17',
    category: 'Dünya',
    locale: 'tr',
    content: `ABD Senatosu, 16-17 Nisan'da Başkan Donald Trump'ın İran'a yönelik askeri eylemlerini Kongre onayı olmadan kısıtlayacak olan savaş yetkileri kararını yine reddetti. Oylama sonucu 47'ye karşı 52 oldu.

## Oylama Detayları

Söz konusu önerge, komiteden çıkarılma talebi olarak Senato'nun gündemine geldi. Cumhuriyetçi Senatör Rand Paul (R-KY) ve Demokrat Senatör John Fetterman (D-PA) parti çizgisini aşarak farklı tutum sergiledi. Bu, 28 Şubat'ta savaşın başlamasından bu yana yapılan dördüncü benzer oylama oldu.

## Hukuki Çerçeve

ABD Savaş Yetkileri Yasası, başkanın Kongre onayı olmaksızın askeri operasyon yürütebilmesi için 60 günlük bir sınır öngörüyor. Demokratlar ve bazı Cumhuriyetçiler, mevcut İran savaşının bu çerçeveye uygun olup olmadığı konusunda endişelerini dile getiriyor.

## Siyasi Tablo

Senato'nun bu kararı, yürütme organının askeri yetkilerini kısıtlama girişimlerinin Kongre'de yeterli desteği bulamadığını gösterdi. Trump yönetimi, İran politikasında geniş hareket alanını korumayı sürdürüyor. Tartışma, başkanın savaş ilan etme yetkisinin sınırları üzerine süregelen anayasal müzakerelere yeni bir boyut ekledi.`,
  },
  'ru-senat-ssha-otklonil-rezolyutsiyu-o-voennyh-polnomochiyah-iran': {
    title: 'Сенат США 4-й раз отклонил резолюцию по Ирану',
    date: '2026-04-17',
    category: 'Мир',
    locale: 'ru',
    content: `Сенат США 16-17 апреля в четвёртый раз с начала войны отклонил резолюцию о военных полномочиях, которая ограничила бы право Трампа на военные действия против Ирана без согласия Конгресса. Голосование завершилось со счётом 47-52.

## Кто проголосовал «за»

Резолюция требовала простого большинства, но не получила достаточной поддержки. Сенаторы Рэнд Пол (республиканец, Кентукки) и Джон Феттерман (демократ, Пенсильвания) перешли на сторону оппонентов своих партий. Это был четвёртый подобный голос с момента начала войны 28 февраля.

## Закон о военных полномочиях

Закон о военных полномочиях 1973 года устанавливает 60-дневный лимит на использование американских войск в боевых действиях без одобрения Конгресса. Демократы пытаются добиться формального голосования о продолжении или прекращении операции против Ирана.

## Что дальше

Несмотря на четыре провальных попытки, демократы заявили, что продолжат вносить аналогичные резолюции. По мере приближения 60-дневного порога давление на Белый дом и сенатских республиканцев будет нарастать. Параллельно администрация Трампа активизировала дипломатические усилия.`,
  },

  // --- Anthropic Claude Opus 4.7 release (04-17) ---
  'anthropic-claude-opus-4-7-release-bedrock': {
    title: 'Anthropic Claude Opus 4.7-ni təqdim etdi: 13% kodlama artımı',
    date: '2026-04-17',
    category: 'Texnologiya',
    locale: 'az',
    content: `Anthropic 16 aprel 2026 tarixində Claude Opus 4.7-ni elan etdi — bu, şirkətin Opus seriyasında ən intellektual modelidir. Yeni model 17 apreldən etibarən Amazon Bedrock platformasında istifadəyə açılır.

## Performans yenilikləri

Yeni modelin əsas üstünlükləri arasında SWE-Bench Pro kodlama benchmark-ında 13% performans artımı, vizual təhlil qabiliyyətində üçqat təkmilləşmə və uzunmüddətli iş axınlarında daha yaxşı agentik fəaliyyət göstəriciləri qeyd olunur. Bu, modelin mürəkkəb mühəndislik tapşırıqlarını və çoxmərhələli proseslər icra etməsini xeyli yaxşılaşdırır.

## Qiymət və əlçatanlıq

Claude Opus 4.7-nin qiymətləndirilməsi 4.6 versiyası ilə eyni səviyyədə qalır: hər milyon giriş tokeni üçün 5 dollar, çıxış tokeni üçün 25 dollar. Bu, performans artımını qiymət dəyişikliyi olmadan istifadəçilərə ötürür. Sonnet 4.6 üçün 1 milyon tokenlik kontekst pəncərəsi isə beta rejimində mövcuddur.

## Bazar mövqeyi

Anthropic-in AWS Bedrock blogunda dərc edilən rəsmi bəyanatına əsasən, model artıq müəssisə müştərilərinin sərəncamındadır. Şirkət son aylarda Sonnet və Opus xətlərini ardıcıl şəkildə yeniləyərək OpenAI və Google ilə rəqabəti güclü saxlayır. Yeni model xüsusilə proqram mühəndisliyi və agentik avtomatlaşdırma sahələrində istifadəçilərə geniş imkanlar açır.`,
  },
  'en-anthropic-claude-opus-4-7-release': {
    title: 'Anthropic Releases Claude Opus 4.7 With Coding Gains',
    date: '2026-04-17',
    category: 'Technology',
    locale: 'en',
    content: `Anthropic released Claude Opus 4.7 on April 16, calling it the most intelligent model in its Opus tier. The new release became available on Amazon Bedrock starting April 17 and shipped with measurable gains on coding, vision and long-horizon agentic tasks.

## Coding and Vision Benchmarks

Opus 4.7 posted a 13% uplift over its predecessor on the SWE-Bench Pro coding benchmark, according to Anthropic and AWS. Visual acuity improved by roughly 3x, a meaningful jump for screen-reading agents and document workflows. Anthropic said agentic performance on long, multi-step tasks also improved.

## Pricing Holds Steady

Pricing stayed at $5 per million input tokens and $25 per million output tokens, unchanged from Opus 4.6. The continuity is significant for enterprise customers running production workloads, as it keeps unit economics stable while delivering the upgrade.

## Bedrock and Context Window

The model is available in Amazon Bedrock from April 17. Separately, the Sonnet 4.6 1 million-token context window remains in beta, giving developers two distinct paths for handling very long inputs depending on whether they prioritize raw intelligence or context length.`,
  },
  'tr-anthropic-claude-opus-4-7-yayinlandi': {
    title: 'Anthropic Claude Opus 4.7\'yi Yayınladı: %13 Kodlama Artışı',
    date: '2026-04-17',
    category: 'Teknoloji',
    locale: 'tr',
    content: `Anthropic, en zeki Opus modeli olarak tanımladığı Claude Opus 4.7'yi 16 Nisan 2026'da yayınladı. Yeni model, kodlama performansı, görsel anlama ve uzun vadeli iş akışlarındaki ajan davranışında belirgin iyileştirmeler sunuyor.

## Performans Kazanımları

Yeni model, sektörün önde gelen kodlama kıyaslama testi olan SWE-Bench Pro'da %13 oranında performans artışı kaydetti. Görsel keskinlikte ise 3 kat iyileşme sağlandı. Bunun yanı sıra, ajan tabanlı uzun vadeli iş akışlarında üstün performans gösterdiği belirtiliyor.

## Fiyatlandırma ve Erişim

Claude Opus 4.7, fiyatlandırma açısından Opus 4.6 ile aynı çizgide kalıyor: 1 milyon token için 5 dolar girdi ve 25 dolar çıktı. Model, Amazon Bedrock üzerinden 17 Nisan'dan itibaren kullanıma sunuldu. Sonnet 4.6'nın 1 milyon tokenlik bağlam penceresi de beta sürümünde test ediliyor.

## Yapay Zeka Yarışında Konum

Anthropic'in bu yeni sürümü, yapay zeka geliştirme yarışında şirketin pozisyonunu güçlendirmesi açısından kritik öneme sahip. Geliştiricilerin uzun süredir beklediği iyileştirmeler, özellikle yazılım mühendisliği ve karmaşık problem çözme alanlarında belirgin etki yaratacak gibi görünüyor.`,
  },
  'ru-anthropic-claude-opus-4-7-vypusk-aws-bedrock': {
    title: 'Anthropic выпустила Claude Opus 4.7 в AWS Bedrock',
    date: '2026-04-17',
    category: 'Технологии',
    locale: 'ru',
    content: `Компания Anthropic 16 апреля 2026 года представила Claude Opus 4.7 — самую интеллектуальную модель в линейке Opus. С 17 апреля модель доступна в Amazon Bedrock, что упрощает её интеграцию для корпоративных клиентов AWS.

## Основные улучшения

Opus 4.7 показывает прирост на 13% в бенчмарке кодирования SWE-Bench Pro по сравнению с предыдущей версией. Визуальная острота восприятия улучшена в три раза, что повышает точность работы с диаграммами, скриншотами и сложными изображениями. Модель также превосходит предшественников в долгосрочных агентных рабочих процессах.

## Ценовая политика

Стоимость использования осталась без изменений: 5 долларов за миллион входных токенов и 25 долларов за миллион выходных токенов — те же цены, что и у Opus 4.6. Это редкость для индустрии, где улучшение возможностей обычно сопровождается удорожанием.

## Доступность

В Amazon Bedrock также представлено бета-окно контекста на 1 миллион токенов для модели Sonnet 4.6. Anthropic позиционирует Opus 4.7 как оптимальный выбор для агентных задач, технического анализа и сложного программирования. Полная документация опубликована на платформе Claude.`,
  },

  // --- Coachella Weekend 2 opens (04-17) ---
  'coachella-w2-aprel-17-sabrina-carpenter-bieber': {
    title: 'Coachella W2 açılır: Sabrina Carpenter cümə günü səhnədə',
    date: '2026-04-17',
    category: 'Mədəniyyət',
    locale: 'az',
    content: `Coachella 2026 İkinci Həftəsonu (Weekend 2) bu gün, 17 aprel tarixində Kaliforniyanın İndio şəhərində yerləşən Empire Polo Club-da açıldı. Festival 19 aprel bazar gününə qədər davam edəcək və dünyanın ən böyük musiqi tədbirlərindən biri kimi öz yerini qoruyur.

## Əsas ifaçılar

Sabrina Carpenter cümə axşamı Coachella Stage-də saat 21:00-22:40 (Sakit Okean vaxtı) arasında çıxış edəcək. Şənbə günü isə Justin Bieber baş ulduz olaraq saat 23:25-də səhnəyə qalxacaq. KAROL G bazar günü gecə festivalı yekunlaşdıracaq, ifası 22:10-23:55 arasında planlaşdırılır.

## Dəyişikliklər və sürpriz çıxışlar

İkinci Həftəsonu birinci ilə nisbətən bir sıra dəyişikliklər var. Kacey Musgraves Jack White-ı əvəz edərək şənbə günü sürpriz çıxış edəcək. Foster the People cümədən bazar gününə, Nine Inch Nails cümədən şənbəyə köçürüldü. Bu dəyişikliklər təşkilatçıların çevikliyini göstərir.

## Pulsuz onlayn yayım

Festival yeddi səhnədən ibarət olmaqla cümə günü Sakit Okean vaxtı ilə saat 16:00-dan (ABŞ Şərq vaxtı 19:00) etibarən YouTube-da pulsuz canlı yayımlanacaq. İlk dəfə Coachella, Outdoor və Sahara səhnələri 4K formatında yayımlanır. Bu, ev tamaşaçılarına festivalın ən yüksək keyfiyyətli izlənməsini təmin edir. Coachella həm musiqi, həm də vizual sənət baxımından mühüm hadisədir.`,
  },
  'en-coachella-weekend-2-2026-opens': {
    title: 'Coachella Weekend 2 Opens With Sabrina Carpenter Friday',
    date: '2026-04-17',
    category: 'Culture',
    locale: 'en',
    content: `Coachella 2026 Weekend 2 opened on Friday, April 17 at the Empire Polo Club in Indio, California, running through Sunday, April 19. The festival's second weekend brings the same headline lineup as Weekend 1, with several notable schedule shuffles and a surprise addition.

## Headliner Lineup

Sabrina Carpenter headlines Friday from 9:00 to 10:40 PM PT on the Coachella Stage. Justin Bieber takes the Saturday top slot at 11:25 PM, and KAROL G closes the festival on Sunday from 10:10 to 11:55 PM. The three sets cap a lineup heavy on chart-topping pop and Latin acts.

## Surprise Addition

Kacey Musgraves was added to Saturday's bill as a surprise set, replacing Jack White. Foster the People moved from Friday to Sunday, and Nine Inch Nails shifted from Friday to Saturday. The reshuffles give Weekend 2 attendees a meaningfully different program than the opening weekend.

## Free Livestream and 4K Debut

The full festival livestreams free on YouTube starting at 4 PM PT on Friday across seven stages. For the first time, the Coachella, Outdoor and Sahara stages will broadcast in 4K, a long-requested upgrade for fans watching from home.`,
  },
  'tr-coachella-2-hafta-2026-acildi': {
    title: 'Coachella 2. Hafta Başladı: Sabrina Carpenter Cuma Sahnede',
    date: '2026-04-17',
    category: 'Kültür',
    locale: 'tr',
    content: `Dünyanın en büyük müzik festivallerinden Coachella 2026'nın ikinci haftası, 17 Nisan Cuma günü Kaliforniya'nın Indio şehrindeki Empire Polo Club'da açıldı. Festival 19 Nisan Pazar gününe kadar devam edecek.

## Manşet Sanatçılar

Cuma akşamı Sabrina Carpenter ana sahneye çıkarak Pasifik saatiyle 21:00-22:40 arasında Coachella Stage'de performans sergileyecek. Cumartesi akşamının manşeti Justin Bieber, sahneye 23:25'te çıkacak. Pazar gecesini ise KAROL G 22:10-23:55 saatleri arasında performansıyla kapatacak.

## Sürpriz İsim ve Değişiklikler

Jack White'ın yerine Cumartesi setine Kacey Musgraves sürpriz olarak eklendi. İlk haftaya kıyasla program değişiklikleri de yapıldı: Foster the People Cuma'dan Pazar'a, Nine Inch Nails ise Cuma'dan Cumartesi'ye taşındı.

## Canlı Yayın ve Teknik Yenilikler

Festival, Cuma günü Pasifik saatiyle 16:00 / Doğu saatiyle 19:00 itibarıyla yedi sahneden YouTube üzerinden ücretsiz olarak canlı yayınlanacak. Bu yıl Coachella, Outdoor ve Sahara sahneleri ilk kez 4K kalitede yayınlanacak. Bu, festivalin teknik altyapısında önemli bir adım olarak değerlendiriliyor.`,
  },
  'ru-coachella-2026-vtoroy-uikend-otkryvaetsya': {
    title: 'Coachella 2026: открывается второй уикенд',
    date: '2026-04-17',
    category: 'Культура',
    locale: 'ru',
    content: `Второй уикенд Coachella 2026 стартует в пятницу, 17 апреля, в Empire Polo Club в калифорнийском городе Индио. Фестиваль продлится до воскресенья, 19 апреля, и соберёт сотни тысяч зрителей на площадке и миллионы — у экранов.

## Хедлайнеры трёх дней

В пятницу хэдлайнером главной сцены Coachella выступит Сабрина Карпентер с 21:00 до 22:40 по тихоокеанскому времени. Субботний вечер закроет Джастин Бибер в 23:25, а воскресенье завершит KAROL G с сетом с 22:10 до 23:55.

## Сюрприз вместо отмены

В качестве замены отказавшегося Джека Уайта в субботу выступит Кейси Масгрейвс — её сет анонсирован как сюрприз второго уикенда. По сравнению с первым уикендом также изменилось расписание: Foster the People перенесли с пятницы на воскресенье, а Nine Inch Nails — с пятницы на субботу.

## Бесплатная трансляция в 4K

YouTube бесплатно транслирует фестиваль с семи сцен начиная с 16:00 по тихоокеанскому времени в пятницу. Впервые сцены Coachella, Outdoor и Sahara будут доступны зрителям в качестве 4K. Это значительно расширяет аудиторию мероприятия за пределы Калифорнии.`,
  },

  // --- NBA Play-In final day (04-17) ---
  'nba-play-in-final-gunu-hornets-magic-warriors-suns': {
    title: 'NBA Play-In son günü: 4 komanda son sahə uğrunda döyüşür',
    date: '2026-04-17',
    category: 'İdman',
    locale: 'az',
    content: `2026 NBA SoFi Play-In Turniri bu gün, 17 aprel cümə günü oynanacaq iki "qalib və ya geri" oyunu ilə yekunlaşır. Bu gecə dörd komanda pley-offa son iki sahə uğrunda amansız mübarizə aparacaq.

## Şərq konfransının döyüşü

Şarlot Hornets, ABŞ Şərq vaxtı ilə saat 19:30-da Kia Center-də Orlando Magic-ə qarşı 8-ci sahə uğrunda oynayacaq. Hornets bu mərhələyə Mayami Hit-i 14 aprel tarixində uzadılmış vaxtda 127-126 hesabı ilə məğlub edərək gəldi. Qalib komanda pley-offun ilk dövrəsində konfransın lideri Detroyt Pistons ilə qarşılaşacaq.

## Qərb konfransının dueli

Qərbdə Qolden Steyt Uorriors Feniks Sansa qonaq gedir. Bu da 8-ci sahə uğrunda son qərarverici matçdır. Feniks 14 aprel tarixində Portlanda 110-114 hesabı ilə məğlub olmuşdu — Avdijanın 41 sayı Treyl Bleyzersi 7-ci sahəyə yerləşdirdi. Qalib Oklahoma Siti Tander ilə qarşılaşacaq.

## Pley-off mənzərəsi

İlk dövrənin tam mənzərəsi belədir: Şərq — Pistons (1) — Play-In qalibi (8); Selticslər (2) — Sixers (7). Qərb — Tander (1) — Play-In qalibi (8); Spörs (2) — Treyl Bleyzers (7). Pley-off rəsmən 18 aprel tarixində başlayır. Bu axşam həll olunacaq matçlar nəticədə hansı komandaların yola çıxacağını müəyyənləşdirəcək. Heyrətamiz oyunlar gözlənilir.`,
  },
  'en-nba-play-in-2026-final-day': {
    title: 'NBA Play-In Final Day: Hornets-Magic, Warriors-Suns',
    date: '2026-04-17',
    category: 'Sports',
    locale: 'en',
    content: `The 2026 NBA SoFi Play-In Tournament concludes on Friday, April 17 with two win-or-go-home games for the final playoff seeds in each conference. Both matchups will determine first-round opponents for the No. 1 seeds.

## Eastern Conference: Hornets at Magic

The Charlotte Hornets visit the Orlando Magic at the Kia Center at 7:30 PM ET for the East's No. 8 seed. Charlotte advanced to this stage after a 127-126 overtime win over Miami on April 14. Tonight's winner will face top-seeded Detroit Pistons in the first round.

## Western Conference: Warriors at Suns

The Golden State Warriors travel to Phoenix to play the Suns for the West's No. 8 seed. Phoenix landed in the Play-In after a 114-110 loss to Portland on April 14, in which Deni Avdija scored 41 points to lift the Trail Blazers to the No. 7 seed. Tonight's winner will face top-seeded Oklahoma City Thunder.

## Bracket Picture

The remaining first-round picture is set: in the East, the Celtics, seeded second, meet the Sixers, seeded seventh; in the West, the Spurs, seeded second, meet the Trail Blazers, seeded seventh. Round 1 tips off Saturday, April 18.`,
  },
  'tr-nba-play-in-son-gunu-17-nisan': {
    title: 'NBA Play-In Son Gün: Hornets-Magic ve Warriors-Suns',
    date: '2026-04-17',
    category: 'Spor',
    locale: 'tr',
    content: `2026 NBA SoFi Play-In Turnuvası, 17 Nisan Cuma günü oynanacak iki kazan-veya-eve-git maçıyla son buluyor. İki karşılaşmanın galipleri Doğu ve Batı Konferansı'nın 8. tohumlanma sıralarına yerleşecek.

## Doğu: Hornets-Magic

Charlotte Hornets, Doğu'nun 8. sırası için Orlando Magic'i Kia Center'da Doğu saatiyle 19:30'da konuk edecek. Hornets, 14 Nisan'da Miami'yi uzatmada 127-126 yenerek bu eşleşmeye hak kazandı. Galip, ilk turda Doğu'nun lider takımı Detroit Pistons ile karşılaşacak.

## Batı: Warriors-Suns

Batı Konferansı tarafında Golden State Warriors, Phoenix Suns'a konuk olacak. Phoenix, 14 Nisan'da Portland'a 114-110 mağlup olmuştu; Avdija'nın 41 sayısı Trail Blazers'ı 7. sıraya taşıdı. Cuma akşamı belirlenecek galip, ilk turda Batı'nın lider takımı Oklahoma City Thunder ile eşleşecek.

## İlk Tur Eşleşmeleri

Önceden onaylanan ilk tur tablosu şöyle: Doğu'da Pistons (1) - Play-In galibi (8) ve Celtics (2) - Sixers (7). Batı'da ise Thunder (1) - Play-In galibi (8) ve Spurs (2) - Trail Blazers (7) eşleşmeleri yer alıyor. İlk tur 18 Nisan'da başlayacak. Cuma akşamı oynanacak iki maçın kazananları bu akşam belirleniyor.`,
  },
  'ru-nba-play-in-2026-finalnyy-den-hornets-magic-warriors-suns': {
    title: 'NBA Play-In: сегодня решатся последние места',
    date: '2026-04-17',
    category: 'Спорт',
    locale: 'ru',
    content: `Турнир NBA SoFi Play-In 2026 завершается в пятницу, 17 апреля, двумя матчами на вылет за последние посевы плей-офф. Сегодня вечером решится, кто получит последние путёвки в первый раунд на Востоке и Западе.

## Восток: Хорнетс — Мэджик

Шарлотт Хорнетс отправляются в Орландо, где встретятся с Мэджик в Kia Center в 19:30 по восточному времени. Победитель получит 8-й посев и сразится с Детройт Пистонс — лидером Восточной конференции. Шарлотт прошёл сюда благодаря победе над Майами 127:126 в овертайме 14 апреля.

## Запад: Уорриорз — Санс

Голден Стэйт Уорриорз летят в Финикс на матч с Санс за 8-й посев Запада. Победитель встретится с Оклахома-Сити Тандер. Финикс пробил себе путь сюда после поражения от Портленда 110:114 14 апреля — 41 очко Авдии вывели Трэйл Блейзерс на 7-й посев.

## Что уже известно

Расклад первого раунда уже частично определён. Восток: Пистонс (1) — победитель Play-In (8); Селтикс (2) — Сиксерс (7). Запад: Тандер (1) — победитель Play-In (8); Сперс (2) — Трэйл Блейзерс (7). Первый раунд начнётся 18 апреля.`,
  },

  // --- Champions League semifinal preview (04-17) ---
  'cempionlar-liqasi-yarimfinal-psg-bayern-arsenal-atletiko': {
    title: 'ÇL Yarımfinal: PSG-Bayern və Arsenal-Atletiko qarşılaşacaq',
    date: '2026-04-17',
    category: 'İdman',
    locale: 'az',
    content: `Çempionlar Liqasının dörddəbir final mərhələsi 14-15 aprel tarixlərində oynanan cavab oyunları ilə başa çatdı və yarımfinal cütlüklərini müəyyənləşdirdi. Avropa futbolunun zirvəsində dörd nəhəng komanda bir-biri ilə qarşılaşacaq.

## Yarımfinalçılar

PSG ümumi hesabla 4-0 nəticəsi ilə Liverpool-u məğlub edərək növbəti mərhələyə keçdi. Bavariya isə Real Madridə qarşı 15 aprel tarixində 4-3 dramatik qələbə qazanaraq ümumi hesabı 6-4 etdi və klassik qarşılaşmada finala çıxış hüququnu əldə etdi. Arsenal Sportinq Lissabonu ümumi hesabla 1-0 yendi. Atletiko Madrid Barselonanı 3-2 üstələdi.

## Yarımfinal təqvimi

Yarımfinal qarşılaşmaları 28-29 aprel tarixlərində oynanacaq. İlk oyunlar: 28 aprel — Bavariya-PSG (Parisdə), 29 aprel — Arsenal-Atletiko Madrid (Madriddə). Cavab oyunları 5-6 may tarixlərində baş tutacaq. Final isə 30 may 2026-cı il tarixində Budapeştdəki Puşkaş Arena-da keçiriləcək.

## Cütlüklərin təhlili

PSG-Bayern qarşıdurmasında iki güclü hücum mexanizması bir-birinə qarşı dayanır. Arsenal-Atletiko cütlüyündə isə klub futbolunun ən yaxşı müdafiə sistemlərindən biri olan Atletikonun Mikel Artetanın sürətli komandasına qarşı necə dayanacağı diqqət çəkir. Hər dörd komanda da titul iddiasındadır.`,
  },
  'en-champions-league-semifinal-preview-2026': {
    title: 'Champions League Semis: PSG-Bayern, Arsenal-Atletico',
    date: '2026-04-17',
    category: 'Sports',
    locale: 'en',
    content: `The Champions League semifinal pairings are confirmed after a dramatic round of quarterfinal second legs concluded April 14-15. PSG, Bayern Munich, Arsenal and Atlético Madrid are through, setting up two heavyweight ties.

## PSG vs Bayern Munich

Paris Saint-Germain advanced 4-0 on aggregate against Liverpool, sealing one of the most lopsided ties of the round. Bayern Munich edged Real Madrid 6-4 on aggregate after a 4-3 thriller on April 15. The German champions visit Paris for the first leg.

## Arsenal vs Atlético Madrid

Arsenal squeezed past Sporting CP 1-0 on aggregate, advancing on a single goal across two cagey legs. Atlético Madrid eliminated Barcelona 3-2 on aggregate, continuing Diego Simeone's reputation for tactical control in knockout football. The first leg will be played in Madrid.

## Schedule and Final

Semifinal first legs are scheduled for April 28 in Paris and April 29 in Madrid. Return legs follow on May 5-6. The 2026 final is set for May 30 at the Puskás Aréna in Budapest, marking the first Champions League final hosted in the Hungarian capital.`,
  },
  'tr-sampiyonlar-ligi-yari-final-eslesmeleri': {
    title: 'ŞL Yarı Final: PSG-Bayern ve Arsenal-Atletico',
    date: '2026-04-17',
    category: 'Spor',
    locale: 'tr',
    content: `Şampiyonlar Ligi çeyrek final rövanş maçlarının 14-15 Nisan'da tamamlanmasının ardından yarı finalist dört takım belli oldu. Avrupa kupalarının en prestijli organizasyonunda heyecan dorukta.

## Yarı Finale Yükselen Takımlar

PSG, Liverpool'u 4-0 toplam skorla geçti. Bayern Münih, Real Madrid ile 6-4'lük toplam skorda — 15 Nisan'daki nefes kesici 4-3'lük rövanş maçı dahil — yarı finale çıktı. Arsenal, Sporting CP'yi 1-0 toplam skorla eledi. Atletico Madrid ise Barcelona'yı 3-2 toplam skorla yendi.

## Yarı Final Programı

Yarı final ilk maçları 28-29 Nisan'da oynanacak. 28 Nisan'da Paris'te Bayern Münih ile PSG karşı karşıya gelecek. 29 Nisan'da ise Madrid'de Arsenal, Atletico Madrid'i konuk edecek. Rövanş maçları 5-6 Mayıs'ta gerçekleştirilecek.

## Final Detayları

Şampiyonlar Ligi 2026 finali, 30 Mayıs 2026 tarihinde Budapeşte'deki Puskás Aréna'da oynanacak. Macar başkenti, Avrupa futbolunun en önemli kulüp şampiyonasının final ev sahibi olarak hazırlıklarını sürdürüyor. Yarı finallerdeki dört takım da kupayı kaldırma şansını yakından kovalıyor.`,
  },
  'ru-liga-chempionov-2026-polufinaly-psg-bavariya-arsenal-atletiko': {
    title: 'Полуфиналы ЛЧ: ПСЖ — Бавария, Арсенал — Атлетико',
    date: '2026-04-17',
    category: 'Спорт',
    locale: 'ru',
    content: `После завершения четвертьфинальных ответных матчей 14-15 апреля определились все четыре полуфиналиста Лиги чемпионов УЕФА сезона 2025/26. Жеребьёвка свела ПСЖ с Баварией, а Арсенал — с Атлетико Мадрид.

## Полуфиналисты определены

ПСЖ уверенно прошёл Ливерпуль с общим счётом 4:0. Бавария Мюнхен в драматичном матче 15 апреля обыграла Реал Мадрид 4:3 и вышла дальше с общим счётом 6:4. Арсенал минимально победил Спортинг 1:0 по сумме двух встреч. Атлетико Мадрид одолел Барселону с общим счётом 3:2.

## Календарь полуфиналов

Первые матчи полуфиналов состоятся 28-29 апреля. 28 апреля в Париже Бавария встретится с ПСЖ — это будет повтор недавних принципиальных встреч этих клубов. 29 апреля в Мадриде сыграют Арсенал и Атлетико. Ответные игры запланированы на 5-6 мая.

## Финал в Будапеште

Финал турнира пройдёт 30 мая 2026 года на Пушкаш Арене в столице Венгрии Будапеште. ПСЖ сохраняет статус действующего полуфиналиста сезона.`,
  },

  // --- Pope Leo XIV vs Trump feud (04-17) ---
  'papa-leo-xiv-tramp-tiranlar-iran': {
    title: 'Papa Leo XIV: dünya bir ovuc tirana məruz qalıb',
    date: '2026-04-17',
    category: 'Dünya',
    locale: 'az',
    content: `Roma Papası Leo XIV 15-18 aprel tarixlərində Kameruna apostol səfəri çərçivəsində ABŞ Prezidenti Trampı kəskin tənqid etdi. Papa "müharibəyə milyardlar xərcləyən bir ovuc tiranı" pisləyərək, Trampın İran müharibəsinə açıq mesaj göndərdi.

## Mübahisənin alovlanması

Mübahisə Trampın sosial mediada Papa haqqında "Cinayətlər qarşısında ZƏİF və xarici siyasətdə dəhşətli" yazısından sonra alovlandı. ABŞ prezidenti həmçinin iddia etdi ki, Leo İranın nüvə silahına sahib olmasını dəstəkləyir. Bu çıxışlar Vatikan-Vaşinqton münasibətlərində ciddi gərginlik yaratdı.

## Papanın cavabı

Leo XIV NBC News-a verdiyi müsahibədə bildirdi ki, "Tramp administrasiyasından heç bir qorxusu yoxdur". O, sülh və dialoqun zərurətini vurğulayaraq, hərbi addımların yalnız faciəyə apardığını ifadə etdi. Papa Kamerun səfəri zamanı dəfələrlə qlobal sülh çağırışları etdi.

## Siyasi təsiri

Tarixdə ilk dəfə amerikan əsilli olan Papa ilə amerikan prezidenti arasındakı belə açıq mübahisə qeyri-adi vəziyyət yaratdı. Vatikanın bəzi yüksək rəsmiləri bu gərginliyin diplomatik kanallar vasitəsilə həll olunmasının vacibliyini bildirir. Beynəlxalq ictimaiyyət hadisəyə diqqətlə nəzarət edir.`,
  },
  'en-pope-leo-xiv-trump-feud-tyrants': {
    title: 'Pope Leo XIV Decries World Ruled by "Tyrants"',
    date: '2026-04-17',
    category: 'World',
    locale: 'en',
    content: `Pope Leo XIV used a stop on his April 15-18 apostolic journey to Cameroon to denounce "a handful of tyrants" spending billions on war, in remarks widely read as a rebuke of President Donald Trump and the ongoing Iran conflict.

## The Pope's Message

Speaking to local Catholics, Leo argued that resources poured into weapons should be redirected to the world's poorest. The pontiff has used his early months in office to articulate a sharper public theology around peace, sanctions and the moral status of preventive war.

## Trump's Response

Trump responded on social media that Leo was "WEAK on Crime, and terrible for Foreign Policy," claiming the pope had supported Iran possessing nuclear weapons.

## "No Fear" Statement

Asked by NBC News about the exchange, Leo said he had "no fear of the Trump administration." The brief comment, delivered in transit between Cameroon stops, marked one of the most direct papal responses to a sitting US president in recent memory and signaled that Leo intends to keep speaking.`,
  },
  'tr-papa-leo-xiv-trump-tartismasi': {
    title: 'Papa Leo XIV: Dünyayı Yöneten "Bir Avuç Tiranı" Eleştirdi',
    date: '2026-04-17',
    category: 'Dünya',
    locale: 'tr',
    content: `Papa Leo XIV, 15-18 Nisan tarihleri arasındaki Kamerun ziyareti sırasında savaşa milyarlarca dolar harcayan "bir avuç tiranı" hedef aldı. Bu sözler, Trump yönetiminin İran savaşına yönelik açık bir eleştiri olarak yorumlandı.

## Tartışmanın Tırmanması

Papa ile Trump arasındaki gerginlik, Trump'ın sosyal medya paylaşımıyla yeni bir boyut kazandı. Trump, Leo'nun "Suç konusunda ZAYIF ve Dış Politika açısından berbat" olduğunu öne sürdü. Aynı zamanda Papa'nın İran'ın nükleer silah sahibi olmasını desteklediğini iddia etti.

## Papa'nın Tepkisi

Leo XIV, NBC News'a verdiği demeçte "Trump yönetiminden korkum yok" dedi. Bu açıklama, Papa'nın siyasi baskılara boyun eğmeyeceğinin net bir mesajı olarak kabul edildi. Vatikan kaynakları, Papa'nın barış mesajına bağlı kalmaya devam edeceğini vurguladı.

## Küresel Yankı

Papa Leo XIV ile Trump arasındaki kamuoyu önündeki bu sürtüşme, dini liderlik ile siyasi güç arasındaki klasik gerilimin günümüzdeki en belirgin örneklerinden birine dönüştü. Katolik dünyası ve uluslararası gözlemciler, gelişmeleri yakından takip ediyor. Tartışma, ABD'nin İran politikasına yönelik küresel eleştirilerin de bir göstergesi olarak değerlendiriliyor.`,
  },
  'ru-papa-leon-xiv-tramp-tirany-iran-kamerun': {
    title: 'Папа Римский Леон XIV критикует Трампа за войну с Ираном',
    date: '2026-04-17',
    category: 'Мир',
    locale: 'ru',
    content: `Папа Римский Леон XIV в ходе апостольской поездки в Камерун 15-18 апреля резко осудил «горстку тиранов», которые тратят миллиарды на войну. Это явный укор президенту США Дональду Трампу за военную операцию против Ирана.

## Эскалация конфликта

Конфронтация между понтификом и Белым домом обострилась после того, как Трамп опубликовал пост, назвав Леона «СЛАБЫМ в борьбе с преступностью и ужасным во внешней политике». Президент также заявил, что Папа якобы поддерживает право Ирана на ядерное оружие — обвинение, которое Ватикан отрицает.

## «Никакого страха»

Леон XIV в интервью NBC News прямо ответил на критику: у него нет «никакого страха перед администрацией Трампа». Понтифик подчеркнул, что Католическая церковь будет и дальше выступать против любых форм агрессии и за дипломатические решения.

## Ватикан и геополитика

Эта публичная ссора между двумя глобальными лидерами происходит на фоне подготовки нового раунда переговоров США и Ирана в Исламабаде. Ватикан традиционно играет роль морального арбитра в международных конфликтах, и позиция Леона XIV усиливает давление на Вашингтон.`,
  },

  // --- Azerbaijan-Armenia $960 Dutch roses (04-17) ---
  'azerbaycan-ermenistan-960-dollar-hollandiya-gulleri': {
    title: 'Azərbaycan-Ermənistan 960 dollar: Hollandiya gülləri çıxdı',
    date: '2026-04-17',
    category: 'İqtisadiyyat',
    locale: 'az',
    content: `16 aprel tarixində dərc olunan gömrük statistikasına əsasən, Azərbaycan 2026-cı ilin mart ayında Ermənistandan 960 dollar dəyərində mal idxal etmişdi — bu, iki ölkə arasında ilk birbaşa idxal kimi təqdim olundu. Lakin qısa müddətdə bu xəbərə aydınlıq gətirildi.

## Hollandiya mənşəli güllər

APA.AZ və ermənistanlı mətbuat orqanlarının bir-birindən asılı olmayaraq verdiyi məlumata görə, idxal olunan mal əslində Hollandiya mənşəli güllər idi. Gömrük rəsmiləri qeyd etdi ki, mallar yalnız tərəfdaş ölkənin mənşə qaydalarına əsasən "Ermənistan" başlığı altında qeydiyyata alınmışdı, lakin onların həqiqi mənşəyi Hollandiyadır.

## Statistikanın oxunması

Bu epizod beynəlxalq ticarət statistikasının necə oxunmalı olduğu məsələsində mühüm dərs verir. Tranzit ölkələrdən keçən mallar zaman-zaman həmin ölkənin idxal göstəricilərində görünə bilər. Ermənistan tərəfi də öz növbəsində Azərbaycana ixrac iddialarını rədd etdi.

## Real ticarət göstəriciləri

2026-cı ilin birinci rübündə Azərbaycan Ermənistana 5,76 milyon dollar dəyərində mal ixrac etdi. Bu rəqəmlər iki ölkə arasında ticarət əlaqələrinin tədricən normallaşdığını göstərir. Sülh prosesinin davam etdiyi şəraitdə iqtisadi əməkdaşlığın real istiqamətləri də formalaşmaqdadır.`,
  },
  'en-azerbaijan-armenia-960-trade-dutch-roses': {
    title: 'Azerbaijan-Armenia $960 Trade Was Actually Dutch Roses',
    date: '2026-04-17',
    category: 'Economy',
    locale: 'en',
    content: `Azerbaijani customs data published April 16 initially reported that the country imported $960 of goods from Armenia in March 2026, headlined as the first such direct import. Both APA.AZ and Armenian outlets clarified the figure within hours.

## Roses From the Netherlands

The goods were actually roses originating in the Netherlands. They appeared under "Armenia" in the customs report only because of how partner-country origin rules are applied at certain trade nodes. Armenia's foreign ministry separately said no direct flower exports to Azerbaijan had occurred.

## Wider Trade Picture

Azerbaijan exported $5.76 million worth of goods to Armenia in the first quarter of 2026, a small but symbolically meaningful flow given the absence of formal diplomatic ties. Direct economic exchange between the two countries has remained minimal even as a peace treaty edges closer.

## Why It Matters

Both governments are sensitive to symbolic firsts in their bilateral relationship. The brief misreporting demonstrated how quickly statistical artifacts can be mistaken for political milestones, and how rapidly both sides are willing to clarify when the underlying reality is misread.`,
  },
  'tr-azerbaycan-ermenistan-ilk-ticaret-hollanda-gulleri': {
    title: 'Azerbaycan\'ın Ermenistan\'dan 960$ İthalatı Hollanda Gülleri',
    date: '2026-04-17',
    category: 'Ekonomi',
    locale: 'tr',
    content: `16 Nisan'da yayımlanan gümrük verileri, Azerbaycan'ın Mart 2026'da Ermenistan'dan 960 dolar değerinde mal ithal ettiğini ortaya koydu. İlk başta ülkeler arası ilk doğrudan ithalat olarak değerlendirilen bu işlem, kısa süre içinde gerçek niteliğiyle aydınlatıldı.

## Gerçek Köken: Hollanda

Hem APA.AZ hem de Ermenistan medyası, söz konusu malların aslında Hollanda menşeli güller olduğunu açıkladı. Mallar, gümrüğün partner ülke menşei kuralları gereği "Ermenistan" olarak kayda geçti. Yani fiziksel olarak Hollanda'dan gelen güller, Ermenistan üzerinden Azerbaycan'a ulaştı ve bu sebeple istatistiklere o şekilde yansıdı.

## Ermenistan'ın Açıklaması

Ermenistan tarafı, Azerbaycan'a yönelik herhangi bir doğrudan ihracatın söz konusu olmadığını duyurdu. Yetkililer, gümrük kayıt yöntemlerinin neden olduğu yanlış anlaşılmanın hızla düzeltilmesi gerektiğini vurguladı. Bu açıklama, iki ülke arasındaki hassas ilişkilerin ışığında özel önem taşıyor.

## Tek Yönlü Ticaret

Buna karşılık, Azerbaycan'ın Ermenistan'a 2026'nın ilk çeyreğinde 5,76 milyon dolarlık gerçek ihracat gerçekleştirdiği bildirildi. İki ülke arasındaki ekonomik ilişkilerin yavaş yavaş şekillenmeye başladığı görülse de doğrudan ithalat henüz gerçekleşmiş değil. Sürecin önümüzdeki dönemde nasıl evrileceği bölgesel ticaret açısından merakla bekleniyor.`,
  },
  'ru-azerbaydzhan-armeniya-960-dollarov-gollandskie-rozy': {
    title: 'Импорт из Армении $960: оказались голландские розы',
    date: '2026-04-17',
    category: 'Экономика',
    locale: 'ru',
    content: `Таможенные данные, опубликованные 16 апреля, изначально показали, что Азербайджан в марте 2026 года впервые импортировал товары из Армении на сумму 960 долларов. Однако вскоре выяснилось, что на самом деле речь шла о розах из Нидерландов.

## Что произошло

Информагентство APA.AZ и армянские СМИ оперативно уточнили, что товары были розами голландского происхождения. Они оказались записанными как «импорт из Армении» лишь из-за таможенных правил учёта по стране партнёра, а не по стране производства цветов.

## Реальная картина торговли

Армянская сторона официально опровергла наличие прямого экспорта в Азербайджан. При этом торговля в обратном направлении уже идёт: Азербайджан в первом квартале 2026 года экспортировал в Армению товары на 5,76 миллиона долларов. Эти поставки осуществляются преимущественно через третьи страны.

## Дипломатический контекст

Эпизод с голландскими розами стал поводом обсудить перспективы прямой торговли между двумя соседями. Несмотря на разморозку отношений после мирного договора, прямой коммерческий канал между Баку и Ереваном пока не открыт. Эксперты ожидают изменений в ближайшие месяцы.`,
  },

  // --- Gold ~$4,800/oz record (04-17) ---
  'qizil-rekord-yaxinliginda-4800-dollar': {
    title: 'Qızıl 4800 dollara yaxın: dördüncü ardıcıl həftəlik artım',
    date: '2026-04-17',
    category: 'İqtisadiyyat',
    locale: 'az',
    content: `Qızıl 17 aprel tarixində unsiya başına 4798,44 dollara yüksələrək gün ərzində 0,21% artım qeydə aldı. Bu, qiymətli metalın dördüncü ardıcıl həftəlik artımına gedən yoldakı dayanıqlı yüksəliş tendensiyasını təsdiqləyir.

## ABŞ-İran atəşkəs ümidləri

Qiymətlərdəki yüksəliş əsasən ABŞ-İran arasında atəşkəs ümidlərinin artması ilə bağlıdır. Diplomatik proqres inflyasiya və faiz dərəcəsi qorxularını azaltdı, investorların qızıla maraqını artırdı. Bu, qızılın həm təhlükəsiz sığınacaq, həm də inflyasiya çəpəri kimi rolunu güclü şəkildə nümayiş etdirir.

## İllik göstəricilər

Qızıl indi keçən illə müqayisədə 39,72% daha bahalıdır. Bu artım qlobal qeyri-müəyyənlik, mərkəzi bankların alışları və inflyasiya təzyiqlərinin birgə nəticəsidir. Bütün zamanların ən yüksək göstəricisi 28 yanvar 2026-cı il tarixində qeydə alınan unsiya başına 5589 dollar olub.

## Digər varlıqlar

Bitkoin də həmin gün təxminən 75 000 dollar səviyyəsində ticarət olundu. İnstitusional alışlar və qlobal bazar əhval-ruhiyyəsindəki dəyişikliklər kriptovalyutalara dəstək vermişdir. Geosiyasi qeyri-müəyyənlik şəraitində investorlar həm qızıla, həm də digər alternativ varlıqlara üz tutur. Önümüzdəki həftələrdə diplomatiya və enerji bazarı dinamikası qiymətlərə əsas təsir edəcək.`,
  },
  'en-gold-near-4800-record-april-17': {
    title: 'Gold Holds Near $4,800/oz, Eyes 4th Weekly Gain',
    date: '2026-04-17',
    category: 'Economy',
    locale: 'en',
    content: `Gold rose to $4,798.44 per ounce on April 17, up 0.21% on the day and on track for a fourth consecutive weekly advance. The metal continues to draw safe-haven demand even as US-Iran ceasefire hopes ease near-term inflation and rate fears.

## A Year of Records

Gold is up 39.72% over the past 12 months, an extraordinary stretch that reflects both geopolitical risk and central bank accumulation. The all-time high of $5,589 per ounce was set on Jan. 28, 2026, before a partial pullback as risk assets stabilized.

## Drivers of the Rally

The four-week winning streak has been powered by Iran war risk premiums, expectations of US rate cuts and persistent dollar weakness. Talks between Washington and Tehran have eased some volatility, but gold has held its bid as funds rotate toward longer-dated inflation hedges.

## Bitcoin in Parallel

Bitcoin traded near $75,000 on the same day, drawing comparisons to gold as a macro hedge. While Bitcoin's 2026 trajectory has been more volatile, both assets have benefited from the same underlying narrative of monetary uncertainty and eroding faith in long-duration sovereign debt.`,
  },
  'tr-altin-4800-dolar-rekor-yakini': {
    title: 'Altın 4,798 Dolarda: Üst Üste 4. Haftalık Yükselişe Doğru',
    date: '2026-04-17',
    category: 'Ekonomi',
    locale: 'tr',
    content: `Altın fiyatları 17 Nisan'da ons başına 4.798,44 dolara yükseldi. Günlük bazda %0,21'lik bir artışla işaretlenen bu yükseliş, sarı metalin üst üste dördüncü haftalık kazancı yolunu açtı.

## Yükselişin Arkasındaki Nedenler

Yükselişin temelinde ABD-İran ateşkes umutlarının enflasyon ve faiz endişelerini hafifletmesi yatıyor. Yatırımcılar, jeopolitik riskler ve makroekonomik belirsizlik karşısında güvenli liman olarak altına yönelmeye devam ediyor. Bir yıl öncesine kıyasla altın fiyatları %39,72 daha yüksek seviyede bulunuyor.

## Tüm Zamanların Rekoru

Altının tüm zamanların en yüksek seviyesi 28 Ocak 2026'da görülen 5.589 dolar/ons olarak tarihe geçti. Mevcut fiyatlar zirvenin biraz altında olsa da güçlü yükseliş trendi devam ediyor. Analistler, jeopolitik gelişmelere ve merkez bankalarının altın alımlarına bağlı olarak daha yukarı seviyelerin de görülebileceğini düşünüyor.

## Kripto Piyasası

Aynı gün Bitcoin yaklaşık 75.000 dolar civarında işlem gördü. Geleneksel güvenli liman olan altın ile dijital varlık piyasasının birbirine paralel hareket etmesi, küresel risk algısının yatırımcı davranışlarındaki önemini ortaya koydu. Önümüzdeki haftalarda her iki varlık sınıfının da gündemde kalmaya devam etmesi bekleniyor.`,
  },
  'ru-zoloto-4800-dollarov-untsiya-rekord-2026': {
    title: 'Золото у $4,800 за унцию — 4-я неделя роста подряд',
    date: '2026-04-17',
    category: 'Экономика',
    locale: 'ru',
    content: `Цена золота 17 апреля выросла до 4 798,44 долларов за унцию, прибавив 0,21% за день. Драгоценный металл может зафиксировать четвёртую подряд неделю роста на фоне ослабления опасений по поводу инфляции и процентных ставок.

## Драйверы роста

Главным катализатором ралли стали надежды на скорое прекращение огня между США и Ираном. Заявление Трампа о том, что сделка «очень близка», ослабило геополитическую премию в ценах на нефть и одновременно поддержало интерес инвесторов к золоту как защитному активу. За год металл подорожал на 39,72%.

## Исторический максимум

Абсолютный рекорд цены был установлен 28 января 2026 года на отметке 5 589 долларов за унцию. С тех пор металл скорректировался, однако сохраняет долгосрочный восходящий тренд. Аналитики связывают это с переоценкой рисков долларовых активов и активными покупками центробанков.

## Биткоин и альтернативы

В этот же день биткоин торговался около 75 000 долларов. Криптовалюта движется в схожем направлении с золотом, хотя её волатильность остаётся значительно выше. Институциональные инвесторы продолжают наращивать позиции в обоих активах как в защитных инструментах от обесценивания валют.`,
  },

  // ========== 2026-04-16 ==========

  // --- Israel-Lebanon 10-day ceasefire (04-16) ---
  'israil-livan-10-gunluk-atesh-kes-tramp': {
    title: 'İsrail-Livan 10 günlük atəşkəsi qüvvəyə mindi',
    date: '2026-04-16',
    category: 'Dünya',
    locale: 'az',
    content: `İsrail və Livan arasında 10 günlük atəşkəs 16 aprel cümə axşamı ABŞ Şərq vaxtı ilə saat 17:00-da (GMT 21:00) qüvvəyə mindi. Razılaşma ABŞ Prezidenti Donald Trampın İsrailin Baş naziri Binyamin Netanyahu və Livanın Prezidenti Cozef Aoun ilə birbaşa təmaslarından sonra əldə edildi.

## Razılaşmanın detalları

Atəşkəs sülh danışıqlarına imkan yaratmaq məqsədi daşıyır. Vasitəçilik prosesində ABŞ Vitse-prezidenti JD Vance, Dövlət Katibi Marko Rubio və Birləşmiş Komandanlığın Sədri general Den Keyn mərkəzi rol oynadılar. Tramp şəxsən hər iki tərəfin liderlərinə zəng edərək gərginliyin azaldılmasında diplomatik təzyiq tətbiq etdi.

## Münaqişənin nəticələri

Cümə axşamı vaxtına qədər İsrailin Livana qarşı hücumlarında ölənlərin sayı 2196 nəfərə çatdı. Bu rəqəm region üçün dağıdıcı insani böhran yaradıb. Livan infrastrukturu ciddi zərər görüb. Beynəlxalq humanitar təşkilatlar acil yardım göndərmək təşəbbüsünü artırırlar.

## Növbəti addımlar

10 günlük müddət ərzində iki tərəf arasında uzunmüddətli sazişin əsas elementlərinin müzakirəsi planlaşdırılır. Diplomatik mənbələr qeyd edir ki, atəşkəsin müvəffəqiyyəti İran müharibəsi ilə bağlı geniş regional dialoqa yol açacaq. Bu, son aylarda Yaxın Şərqdə diplomatiyanın ən mühüm anlarından biridir.`,
  },
  'en-israel-lebanon-10-day-ceasefire-takes-effect': {
    title: 'Israel-Lebanon 10-Day Ceasefire Takes Effect',
    date: '2026-04-16',
    category: 'World',
    locale: 'en',
    content: `A 10-day cessation of hostilities between Israel and Lebanon took effect at 5 PM ET (21:00 GMT) on Thursday, April 16, after personal outreach from President Donald Trump to Israeli Prime Minister Benjamin Netanyahu and Lebanese President Joseph Aoun.

## How the Deal Came Together

Vice President JD Vance played a central brokering role, working alongside Secretary of State Marco Rubio and Joint Chiefs Chairman Dan Caine. Trump's direct calls to both leaders were credited with closing the final gaps after weeks of indirect contacts.

## Death Toll and Damage

Lebanese health authorities said the death toll from Israeli strikes had reached 2,196 by Thursday afternoon. Damage to civilian infrastructure across southern Lebanon is extensive, and humanitarian convoys are expected to begin moving as soon as the ceasefire holds.

## What the 10 Days Buy

US officials framed the truce as a window for deeper negotiations on a sustained framework. A senior State Department spokesperson called the cessation a chance to "enable peace negotiations." Both governments said they would respond to violations.`,
  },
  'tr-israil-lubnan-10-gunluk-ateskes': {
    title: 'İsrail-Lübnan Arasında 10 Günlük Ateşkes Yürürlüğe Girdi',
    date: '2026-04-16',
    category: 'Dünya',
    locale: 'tr',
    content: `İsrail ile Lübnan arasında 10 günlük çatışmaların durdurulması anlaşması, 16 Nisan Perşembe günü Doğu saatiyle 17:00 (GMT 21:00) itibarıyla yürürlüğe girdi. Ateşkes, ABD Başkanı Donald Trump'ın İsrail Başbakanı Binyamin Netanyahu ve Lübnan Cumhurbaşkanı Joseph Aoun ile yaptığı kişisel temasların ardından sağlandı.

## Arabuluculuk Süreci

Anlaşmada ABD Başkan Yardımcısı JD Vance kilit bir arabuluculuk rolü üstlendi. Dışişleri Bakanı Marco Rubio ve Genelkurmay Başkanlar Komitesi Başkanı Dan Caine de süreçte aktif görev aldı. Üçlü ekip, hem İsrail hem de Lübnan tarafıyla yoğun temaslar gerçekleştirdi.

## İnsani Bilanço

Ateşkesin yürürlüğe girdiği güne kadar İsrail saldırılarında hayatını kaybeden Lübnanlıların sayısı 2.196'ya ulaştı. Bu rakam, son aylarda yaşanan çatışmaların ne denli ağır bir bedele yol açtığını gözler önüne serdi. Uluslararası yardım kuruluşları, ateşkes süresince insani koridorların açık tutulması çağrısında bulundu.

## Barış Müzakereleri

10 günlük ateşkesin temel amacı, kalıcı bir barış müzakeresi için zemin hazırlamak. ABD Dışişleri Bakanlığı, sürecin başarıyla tamamlanması halinde bölgede uzun vadeli istikrar sağlanabileceğini açıkladı. Hem İsrail hem de Lübnan, ateşkesi temkinli bir iyimserlikle karşıladı.`,
  },
  'ru-izrail-livan-10-dnevnoe-peremirie-tramp': {
    title: 'Израиль и Ливан: вступило 10-дневное перемирие',
    date: '2026-04-16',
    category: 'Мир',
    locale: 'ru',
    content: `10-дневное прекращение боевых действий между Израилем и Ливаном вступило в силу в 17:00 по восточному времени США (21:00 GMT) в четверг, 16 апреля. Соглашение стало результатом личного вмешательства Дональда Трампа в переговоры с Биньямином Нетаньяху и президентом Ливана Жозефом Ауном.

## Роль Вашингтона

Ключевую посредническую роль сыграл вице-президент США Джей Ди Вэнс. В переговорах также участвовали государственный секретарь Марко Рубио и председатель Объединённого комитета начальников штабов Дэн Кейн. Пауза призвана создать условия для последующих мирных переговоров.

## Цена войны

К моменту начала перемирия число погибших в Ливане в результате израильских ударов достигло 2 196 человек. Конфликт привёл к массовому разрушению инфраструктуры и волне беженцев. 10-дневный период станет первой длительной паузой за всё время кампании.

## Что дальше

Стороны должны использовать перемирие для согласования параметров постоянного урегулирования. Трамп поставил перед Нетаньяху и Ауном цель достижения долгосрочного мирного договора. Параллельно США ведут переговоры с Ираном в Исламабаде о деэскалации в более широком региональном масштабе.`,
  },

  // --- Russia attacks Ukraine 700+ drones (04-16) ---
  'rusiya-ukraynaya-massiv-hucum-700-dron-16-olu': {
    title: 'Rusiyanın Ukraynaya kütləvi hücumu: 700-dən çox dron, 16 ölü',
    date: '2026-04-16',
    category: 'Dünya',
    locale: 'az',
    content: `Rusiya 16 aprel tarixində Ukraynaya gündüzdən gecəyə qədər saatlarla davam edən amansız hücum keçirdi. Hücumda 659 dron (əsasən Şahed tipli) və 44 raket istifadə olundu. Hadisədə ən azı 16 nəfər həyatını itirdi.

## Hücumun coğrafiyası

Kiyevdə 4 nəfər öldü, 50-dən çox şəxs yaralandı — qurbanlar arasında 12 yaşlı uşaq da var idi. Odessada 9 nəfər həyatını itirdi və 11 nəfərdən çox yaralı qeydə alındı. Dnepropetrovsk vilayətində üç qadın öldü, təxminən 36 nəfər yaralandı. Zaporojyedə isə 1 nəfər həyatını itirdi.

## Ukrayna hava müdafiəsi

Ukrayna hava müdafiəsi sistemləri 636 dron və 31 raket vurdu — bu, müdafiə qabiliyyətinin yüksək səviyyəsini göstərir. Lakin hücumun miqyası ilə bağlı bəzi raketlər şəhər mərkəzlərinə qədər çatdı və mülki obyektlərə ciddi zərər vurdu. Yanğınsöndürən və xilasedici qrupları gecə boyu işlədilər.

## Rusiyanın açıqlaması

Rusiya hücumu Ukraynanın Rusiya neft emalı zavodlarına qarşı son zərbələrinə cavab kimi təqdim etdi. Lakin Ukrayna prezidenti Volodimir Zelenski və qərb liderləri mülki obyektlərə hücumu sərt şəkildə pisləyiblər. Bu, 2026-cı ilin ən ölümcül hücumlarından biri kimi qeydə alındı və münaqişənin yenidən eskalasiyası riskini artırdı.`,
  },
  'en-russia-700-drones-ukraine-16-dead': {
    title: 'Russia Hits Ukraine With 700+ Drones; 16 Dead',
    date: '2026-04-16',
    category: 'World',
    locale: 'en',
    content: `Russia launched one of its largest aerial barrages of 2026 against Ukraine on April 16, firing 659 drones and 44 missiles in an hours-long assault that killed at least 16 people, including a 12-year-old in Kyiv. The attack hit Kyiv, Odesa, Dnipro and Zaporizhzhia.

## Casualties Across Cities

Kyiv reported 4 dead and more than 50 injured. Odesa was hit hardest with 9 dead and at least 11 injured. Three women died in the Dnipro region, where roughly 36 people were wounded, and 1 person died in Zaporizhzhia. Civilian housing was repeatedly struck.

## Air Defense Performance

Ukrainian air defenses shot down 636 drones and 31 missiles, an interception rate consistent with recent large barrages. The most successful intercepts were against the Shahed-type drones that made up the bulk of the swarm. Several missiles, however, evaded defenses and caused most of the deaths.

## Russian Justification

Russian officials called the strikes retaliation for Ukrainian drone attacks on Russian oil refineries earlier in the week. Ukraine's allies condemned the assault as an attack on civilians, and Kyiv renewed appeals for additional air defense systems.`,
  },
  'tr-rusya-ukrayna-700-iha-fuze-saldirisi': {
    title: 'Rusya\'dan Ukrayna\'ya 700+ İHA/Füze Saldırısı: 16 Ölü',
    date: '2026-04-16',
    category: 'Dünya',
    locale: 'tr',
    content: `Rusya, 16 Nisan'da Ukrayna'ya yönelik 2026 yılının en ölümcül saldırılarından birini gerçekleştirdi. Saatler süren bombardımanda 659 insansız hava aracı (ağırlıklı olarak Şahed tipi) ve 44 füze kullanıldı. Saldırılarda en az 16 kişi hayatını kaybetti.

## Şehir Bazında Bilanço

Saldırılarda Kiev'de 4 kişi öldü ve 50'nin üzerinde kişi yaralandı; hayatını kaybedenler arasında 12 yaşında bir çocuk yer aldı. Odessa'da 9 kişi öldü, 11'den fazla kişi yaralandı. Dnipro bölgesinde 3 kadın hayatını kaybetti, yaklaşık 36 kişi yaralandı. Zaporijya'da ise 1 kişi öldü.

## Hava Savunmasının Performansı

Ukrayna hava savunma sistemleri, gelen tehditlerin büyük bölümünü etkisiz hale getirdi. 659 İHA'nın 636'sı ve 44 füzenin 31'i düşürüldü. Ancak savunma duvarını aşan az sayıdaki füze ve drone, sivil yerleşim alanlarında ağır hasara yol açtı.

## Rusya'nın Açıklaması

Rusya, saldırıyı petrol rafinerilerine yönelik Ukrayna saldırılarının misilleme cevabı olarak nitelendirdi. Uluslararası toplum, sivil hedefleri vuran bu saldırıları sert şekilde kınadı. Ukrayna lideri Volodymyr Zelenskiy, Batılı müttefiklerden ek hava savunma sistemleri ve uzun menzilli silah desteği talebini yineledi.`,
  },
  'ru-rossiya-atakovala-ukrainu-700-dronov-raket-16-pogibshih': {
    title: 'Россия ударила по Украине 700+ дронами: 16 погибших',
    date: '2026-04-16',
    category: 'Мир',
    locale: 'ru',
    content: `Россия 16 апреля нанесла один из самых смертоносных ударов по Украине в 2026 году, выпустив 659 дронов (преимущественно типа «Шахед») и 44 ракеты. Атака продолжалась с дневных часов до позднего вечера и унесла жизни не менее 16 человек.

## География ударов

Удары пришлись по нескольким крупным городам. В Киеве погибли 4 человека, включая 12-летнего ребёнка, более 50 ранены. В Одессе число жертв достигло 9, ещё 11 человек получили ранения. В Днепропетровской области погибли 3 женщины, около 36 пострадали. Ещё одна жертва зафиксирована в Запорожье.

## Работа ПВО

Украинские силы противовоздушной обороны отчитались о сбитии 636 дронов и 31 ракеты. Несмотря на высокую эффективность системы, прорыв даже небольшого числа боеприпасов в условиях массированной атаки приводит к серьёзным жертвам среди мирного населения.

## Заявления Москвы

Российская сторона назвала удары «возмездием» за украинские атаки на нефтеперерабатывающие заводы. Киев в ответ заявил, что массированные обстрелы по жилым кварталам не имеют военного оправдания и являются военным преступлением. Запад готовит новый пакет военной помощи Украине.`,
  },

  // --- Aliyev arrives in Türkiye (04-16) ---
  'eliyev-turkiyeye-geldi-antalya-forumu': {
    title: 'Əliyev Antalya Forumu üçün Türkiyəyə gəldi',
    date: '2026-04-16',
    category: 'Dünya',
    locale: 'az',
    content: `Azərbaycan Prezidenti İlham Əliyev və Birinci Xanım Mehriban Əliyeva 16 aprel tarixində Türkiyə Prezidenti Rəcəb Tayyib Ərdoğanın dəvəti ilə Türkiyəyə işgüzar səfərə gəldilər. Səfərin əsas məqsədi 5-ci Antalya Diplomatiya Forumunda iştirak etməkdir.

## Forumun şüarı və miqyası

Antalya Diplomatiya Forumu 17-19 aprel tarixlərində keçirilir və "Sabahı Tərtib Etmək, Qeyri-Müəyyənlikləri İdarə Etmək" şüarı altında baş tutur. Toplantıda 150-dən çox ölkənin nümayəndələri iştirak edir. Bu, forumun beynəlxalq səviyyədə əhəmiyyətini bir daha təsdiqləyir.

## Başsağlığı məktubu

Əliyev səfərdən əvvəl Ərdoğana Kahramanmaraşda məktəbə qarşı törədilən silahlı hücumla bağlı başsağlığı məktubu göndərdi. İki ölkə arasındakı qardaşlıq münasibətləri çətin günlərdə də öz dəyərini qoruyur. Türkiyə xalqına dəstək Azərbaycan diplomatiyasının davamlı xəttidir.

## İkitərəfli gündəlik

Əliyevin Türkiyə səfəri çərçivəsində bir sıra mühüm görüşlər planlaşdırılıb. Suriya prezidenti Əhməd əş-Şəra ilə də ikitərəfli görüş gözlənilir. Forum Azərbaycanın regional diplomatiyada aktiv rolunu davam etdirməsi üçün əhəmiyyətli bir platforma rolunu oynayır. Türkiyə-Azərbaycan əlaqələri strateji tərəfdaşlıq səviyyəsində inkişaf edir və hər iki ölkə üçün geosiyasi prioritet təşkil edir.`,
  },
  'en-aliyev-arrives-turkiye-antalya-forum': {
    title: 'Aliyev Arrives in Antalya for 5th Diplomacy Forum',
    date: '2026-04-16',
    category: 'World',
    locale: 'en',
    content: `Azerbaijani President Ilham Aliyev and First Lady Mehriban Aliyeva arrived in Türkiye on April 16 at the invitation of President Recep Tayyip Erdoğan to participate in the 5th Antalya Diplomacy Forum, which runs April 17-19.

## Working Visit Agenda

The forum's theme this year is "Mapping Tomorrow, Managing Uncertainties." Aliyev is expected to take part in plenary sessions and hold bilateral meetings on the sidelines, including with Syrian leader Ahmed al-Sharaa, as both countries explore broader regional cooperation.

## Letter of Condolence

On arrival, Aliyev sent a letter of condolence to Erdoğan over an armed attack on a school in Kahramanmaraş. The gesture underscored the depth of Azerbaijani-Turkish ties, which Aliyev has described as a "one nation, two states" relationship.

## Wider Forum Context

The forum brings together leaders from more than 150 countries, including over 20 heads of state and 50 ministers. For Azerbaijan, the gathering offers a platform to push its energy connectivity agenda and to discuss the still-pending peace treaty with Armenia in informal venues.`,
  },
  'tr-aliyev-turkiye-antalya-forum-ziyareti': {
    title: 'Aliyev, Antalya Diplomasi Forumu İçin Türkiye\'ye Geldi',
    date: '2026-04-16',
    category: 'Dünya',
    locale: 'tr',
    content: `Azerbaycan Cumhurbaşkanı İlham Aliyev ve Birinci Hanım Mehriban Aliyeva, 16 Nisan'da Cumhurbaşkanı Recep Tayyip Erdoğan'ın daveti üzerine Türkiye'ye geldi. Ziyaretin temel amacı 5. Antalya Diplomasi Forumu'na (17-19 Nisan) katılmak.

## Forum Detayları

Antalya Diplomasi Forumu, bu yıl "Yarını Haritalamak, Belirsizlikleri Yönetmek" temasıyla 150'den fazla ülkenin liderlerini ve diplomatlarını ağırlayacak. Aliyev'in foruma katılımı, Türkiye-Azerbaycan stratejik ortaklığının önemli bir göstergesi olarak değerlendiriliyor. İki ülke arasındaki ilişkiler "iki devlet, tek millet" çerçevesinde sürdürülüyor.

## Kahramanmaraş Olayına Taziye

Aliyev, ayrıca Kahramanmaraş'taki bir okula yönelik silahlı saldırı nedeniyle Erdoğan'a taziye mektubu gönderdi. Bu jest, iki ülke arasındaki insani dayanışmanın güçlü bir yansıması olarak yorumlandı. Türkiye'de yaşanan üzücü olay sonrası uluslararası destek mesajları arttı.

## Bölgesel Diplomasi

Aliyev'in Türkiye ziyareti, Kafkasya ve Orta Doğu'da süren hassas diplomatik süreçler içinde özel önem taşıyor. Azerbaycan-Ermenistan normalleşme görüşmeleri, Suriye'nin yeniden yapılanması ve Türk Devletleri Teşkilatı çerçevesindeki iş birlikleri foruma damga vurması beklenen başlıklar arasında.`,
  },
  'ru-aliev-pribyl-v-turtsiyu-antaliyskiy-forum-erdogan': {
    title: 'Алиев прибыл в Турцию на Антальский форум',
    date: '2026-04-16',
    category: 'Мир',
    locale: 'ru',
    content: `Президент Азербайджана Ильхам Алиев и первая леди Мехрибан Алиева прибыли в Турцию 16 апреля по приглашению Эрдогана. Визит приурочен к участию в 5-м Антальском дипломатическом форуме, который пройдёт 17-19 апреля.

## Тема форума

Девизом форума ADF2026 заявлено «Картируя завтрашний день, управляя неопределённостями». Мероприятие соберёт лидеров и министров иностранных дел из более чем 150 стран. Это одна из крупнейших дипломатических площадок, организуемых Турцией ежегодно.

## Соболезнования по Кахраманмарашу

Алиев также направил Эрдогану письмо с соболезнованиями в связи с вооружённым нападением на школу в Кахраманмараше. Этот трагический инцидент вызвал волну сочувствия в регионе. Лидеры Кавказа и тюркского мира выразили солидарность с турецким народом.

## Региональная повестка

В ходе визита стороны обсудят двустороннее сотрудничество. Анкара и Баку остаются ключевыми союзниками, и их встречи традиционно сопровождаются конкретными экономическими договорённостями.`,
  },

  // --- UN Security Council UN-GCC statement (04-16) ---
  'bmt-tehlukesizlik-shurasi-bmt-gcc-bayanat': {
    title: 'BMT Şurası BMT-GCC əməkdaşlığı üzrə tarixi bəyanat verdi',
    date: '2026-04-16',
    category: 'Dünya',
    locale: 'az',
    content: `BMT Təhlükəsizlik Şurası 16 aprel tarixində BMT və Körfəz Əməkdaşlıq Şurası (GCC) arasında əməkdaşlıq mövzusunda ilk dəfə prezident bəyanatı (S/PRST/2026/1) qəbul etdi. Bu, regional diplomatiya tarixində mühüm bir hadisə hesab olunur.

## Bəyanatın məzmunu

Aprel ayında Şuranın sədrliyini həyata keçirən Bəhreyn tərəfindən təqdim olunan sənəddə GCC-nin "regional dayanıqlı sülh və təhlükəsizliyi anlamaq və təşviq etmək sahəsindəki mövqeyi və təcrübəsi" tanınır. Bəyanat GCC-nin "vasitəçilik, qabaqlayıcı diplomatiya, texniki və maliyyə dəstəyi və humanitar fəaliyyətlər" vasitəsilə verdiyi töhfələri təqdir edir.

## Tarixi əhəmiyyəti

Bu, Təhlükəsizlik Şurasının xüsusi olaraq BMT-GCC əməkdaşlığına həsr olunmuş ilk iclasıdır. Beynəlxalq aləmin formal səviyyədə Körfəz dövlətlərinin diplomatik təcrübəsini tanıması GCC-nin regional çəkisinin artmasına işarədir. Bu hərəkət xüsusilə hazırkı geosiyasi vəziyyətdə xüsusi məna kəsb edir.

## Geosiyasi konteksts

Bu addım davam edən İran müharibəsi, İsrail-Livan atəşkəsi və ABŞ-İran danışıqlarının İslamabadda davam etməsi fonunda atılır. Bütün bu məsələlərdə GCC səssiz, lakin mərkəzi vasitəçilik kanalı rolu oynayıb. Bəhreynin sədrliyi regiona dair təşəbbüslərin formalaşmasında əhəmiyyətli rol oynamağa davam edir.`,
  },
  'en-unsc-first-un-gcc-presidential-statement': {
    title: 'UN Security Council Backs UN-GCC Cooperation in First',
    date: '2026-04-16',
    category: 'World',
    locale: 'en',
    content: `The UN Security Council adopted on April 16 its first-ever presidential statement on cooperation between the United Nations and the Gulf Cooperation Council, formally recognizing the GCC as a regional partner in peace and security.

## What the Statement Says

The statement, designated S/PRST/2026/1, was submitted by Bahrain in its capacity as Council president for April. It recognizes the GCC's "position and expertise in understanding and promoting regional sustainable peace and security" and acknowledges contributions through mediation, preventive diplomacy and humanitarian engagement.

## A First-of-Its-Kind Session

The accompanying Council session was the first to focus specifically on UN-GCC cooperation. Speakers across the chamber praised the GCC's discreet but consistent role in regional crisis management, including back-channel work on hostage releases and humanitarian access.

## Why Now

The move lands against a charged regional backdrop: an ongoing Iran war, a fresh Israel-Lebanon ceasefire and US-Iran talks reportedly resuming in Islamabad. In each of those tracks, individual GCC states have served as mediation channels, and the formal recognition consolidates that role at the multilateral level.`,
  },
  'tr-bm-guvenlik-konseyi-ilk-bm-gcc-bildirisi': {
    title: 'BM Güvenlik Konseyi\'nden İlk BM-GCC İşbirliği Bildirisi',
    date: '2026-04-16',
    category: 'Dünya',
    locale: 'tr',
    content: `BM Güvenlik Konseyi, 16 Nisan'da Birleşmiş Milletler ile Körfez İşbirliği Konseyi (KİK) arasındaki iş birliğine ilişkin ilk başkanlık bildirisini (S/PRST/2026/1) kabul etti. Bu, kuruluşların ortak çalışmalarına dair tarihi bir belge niteliği taşıyor.

## Bahreyn'in Liderliği

Nisan ayında Konsey Başkanlığını yürüten Bahreyn tarafından sunulan bildiri, KİK'in "bölgesel sürdürülebilir barış ve güvenliği anlamada ve teşvik etmede sahip olduğu konum ve uzmanlığı" tanıyor. Belge ayrıca KİK'in "arabuluculuk, önleyici diplomasi, teknik ve mali destek ile insani angajman" yoluyla yaptığı katkıları kabul ediyor.

## Tarihi Oturum

Bu oturum, BM Güvenlik Konseyi'nin BM-KİK iş birliğine odaklanan ilk toplantısı oldu. Toplantı, küresel diplomasi mimarisinde Körfez bölgesinin artan ağırlığını yansıtması açısından dikkat çekti. KİK üye devletleri, son yıllarda bölgesel arabuluculuk konusunda giderek daha aktif rol oynuyor.

## Bölgesel Bağlam

Karar, devam eden İran savaşı, İsrail-Lübnan ateşkesi ve İslamabad'da yeniden başlaması beklenen ABD-İran müzakereleri gibi kritik dönüm noktalarının arka planında geldi. Tüm bu süreçlerde KİK ülkeleri sessiz fakat merkezi bir arabuluculuk kanalı işlevi görmüştü. Bildiri, bu rolün uluslararası tanınırlığını pekiştirdi.`,
  },
  'ru-sovbez-oon-pervoe-zayavlenie-ssagpz-bahreyn': {
    title: 'СБ ООН: первое заявление по сотрудничеству с ССАГПЗ',
    date: '2026-04-16',
    category: 'Мир',
    locale: 'ru',
    content: `Совет Безопасности ООН 16 апреля принял первое в истории заявление председателя по сотрудничеству между Организацией Объединённых Наций и Советом сотрудничества арабских государств Персидского залива (ССАГПЗ). Документ зарегистрирован как S/PRST/2026/1.

## Признание роли ССАГПЗ

Заявление было внесено Бахрейном, который в апреле выполняет функции председателя Совета. В документе признаются «позиция и опыт» ССАГПЗ в понимании и продвижении устойчивого регионального мира и безопасности. Также отмечён вклад блока через посредничество, превентивную дипломатию и гуманитарное участие.

## Историческая встреча

Заседание стало первой в истории Совета Безопасности встречей, посвящённой именно теме сотрудничества ООН-ССАГПЗ. Это институционализирует роль аравийских монархий в международной дипломатии и подчёркивает их значение в поддержании мира на Ближнем Востоке.

## Геополитический контекст

Заявление принято на фоне продолжающейся войны с Ираном, недавнего прекращения огня между Израилем и Ливаном и возобновления американо-иранских переговоров в Исламабаде. ССАГПЗ во всех этих процессах играет тихую, но центральную роль медиатора. Документ закрепляет признание этой функции на уровне высшего органа ООН.`,
  },

  // --- Live Nation/Ticketmaster monopoly verdict (04-16) ---
  'live-nation-ticketmaster-monopol-22-statu-cinayet': {
    title: 'Live Nation və Ticketmaster qanunsuz monopol tapıldı',
    date: '2026-04-16',
    category: 'Biznes',
    locale: 'az',
    content: `Manhetten federal məhkəməsində iclas keçirən andlılar heyəti 15-16 aprel tarixində Live Nation və onun törəmə şirkəti Ticketmaster-i konsert biletləri sektorunda qanunsuz monopol kimi fəaliyyət göstərmədə günahkar tapdı. Qərar 16 aprel tarixində dərc olundu.

## Qərarın detalları

Andlılar müəyyən etdi ki, Ticketmaster ABŞ-ın 22 ştatında müştərilərə hər biletə görə orta hesabla 1,72 dollar artıq qiymət hesablayıb. Cəmi məbləğ yüz milyonlarla dollar həcmində geri qaytarılma yaratmaq potensialına malikdir. Bu, müştəri hüquqlarının ciddi şəkildə pozulmasının açıq isbatıdır.

## Hüquqi prosesin tarixi

İddianı 2024-cü ildə ABŞ Ədliyyə Departamenti və 39 ştatın baş prokurorları birlikdə qaldırmışdı. Beş həftə davam edən mühakimə zamanı şirkətin antikompetitiv praktikalarına dair geniş sübut bazası təqdim edildi.

## Sənaye üçün təsirləri

Bu qərar konsert sənayesində kökündən dəyişiklik yarada bilər. Ticketmaster-in bazardakı dominant mövqeyinin qırılması digər oyunçulara fəaliyyət imkanı açacaq. Hökumət indi şirkətin parçalanması və ya struktur dəyişiklikləri tələb edə bilər. İstifadəçilər üçün bilet qiymətlərinin azalması və xidmət keyfiyyətinin yaxşılaşması gözlənilir. Şirkət qərardan apellyasiya verəcəyini bildirib.`,
  },
  'en-live-nation-ticketmaster-monopoly-verdict': {
    title: 'Jury Finds Live Nation, Ticketmaster Ran Illegal Monopoly',
    date: '2026-04-16',
    category: 'Business',
    locale: 'en',
    content: `A federal jury in Manhattan found on April 15-16 that Live Nation and its subsidiary Ticketmaster operated as an illegal monopoly in the concert ticketing market, a landmark verdict published April 16 that could reshape how live music is sold in the United States.

## The Verdict in Detail

The jury concluded that Ticketmaster overcharged customers in 22 states by an average of $1.72 per ticket, a per-ticket figure that scales into hundreds of millions of dollars in potential refunds across years of transactions. The verdict followed a five-week trial.

## Plaintiffs and Path to Court

The Department of Justice and 39 state attorneys general sued Live Nation in 2024. The case proceeded through Manhattan federal court before reaching the jury.

## What Comes Next

Remedies will be argued in subsequent proceedings and could include structural relief such as a divestiture of Ticketmaster or behavioral remedies on contracting practices. The verdict marks the most significant antitrust loss in US live entertainment in a generation.`,
  },
  'tr-live-nation-ticketmaster-tekel-suclu': {
    title: 'Live Nation ve Ticketmaster Yasadışı Tekel Olarak Bulundu',
    date: '2026-04-16',
    category: 'İş Dünyası',
    locale: 'tr',
    content: `Manhattan'daki bir federal jüri, 15-16 Nisan'da (karar 16 Nisan'da yayımlandı) Live Nation ve iştiraki Ticketmaster'ın konser bileti pazarında yasadışı bir tekel olarak faaliyet gösterdiğine ve tüketicilere zarar verdiğine hükmetti.

## Karar Detayları

Jüri, Ticketmaster'ın 22 eyalette müşterilerden bilet başına ortalama 1,72 dolar fazla ücret aldığını saptadı. Bu, tüketicilere potansiyel olarak yüz milyonlarca dolarlık iade anlamına gelebilir. Karar, eğlence sektöründe rekabet ortamının yeniden şekillenmesine yol açabilecek niteliği nedeniyle dikkatleri üzerine çekti.

## Davanın Geçmişi

Davayı 2024 yılında ABD Adalet Bakanlığı (DOJ) ile birlikte 39 eyalet başsavcısı açmıştı. Beş hafta süren duruşmaların ardından açıklanan karar, biletleme sektöründeki hakim oyuncu konumundaki şirketlere yönelik en sert hukuki darbelerden biri olarak değerlendiriliyor.

## Sektörel Etki

Live Nation, dünya genelinde konser organizasyonu ve mekan işletmeciliği yapan dev bir şirket; Ticketmaster ise ABD'nin en büyük bilet platformu konumunda. Jürinin kararı, sanatçılar, konser organizatörleri ve milyonlarca müzik tutkununa potansiyel olarak doğrudan fayda sağlayabilir. Şirketin kararı temyiz etmesi bekleniyor; sürecin tüketici fiyatlarına nasıl yansıyacağı ise zamanla belli olacak.`,
  },
  'ru-live-nation-ticketmaster-monopoliya-prisyazhnye-22-shtata': {
    title: 'Live Nation и Ticketmaster признаны монополистами',
    date: '2026-04-16',
    category: 'Бизнес',
    locale: 'ru',
    content: `Федеральные присяжные Манхэттена 15-16 апреля признали, что Live Nation и её дочерняя компания Ticketmaster действовали как незаконная монополия на рынке концертных билетов, нанеся ущерб потребителям. Вердикт был опубликован 16 апреля и завершил пятинедельный процесс.

## Размер ущерба

По данным присяжных, Ticketmaster переплачивала клиентов в 22 штатах в среднем на 1,72 доллара за каждый проданный билет. С учётом масштаба продаж это означает потенциальный размер компенсаций в сотни миллионов долларов. Точная сумма выплат будет определена на отдельном заседании.

## Кто был истцом

Иск был подан в 2024 году Министерством юстиции США совместно с генеральными прокурорами 39 штатов. Истцы утверждали, что Live Nation использовала своё доминирующее положение в концертном бизнесе для подавления конкурентов и навязывания невыгодных условий артистам и площадкам.

## Последствия для индустрии

Решение присяжных открывает дорогу для последующих структурных мер, включая возможное разделение Live Nation и Ticketmaster. Слияние этих компаний в 2010 году одобряли с условиями, нарушение которых регуляторы фиксировали неоднократно. Сейчас обсуждается принудительный раздел бизнеса.`,
  },

  // --- TSMC record Q1 +58% (04-16) ---
  'tsmc-rekord-q1-menfeet-58-ai-cipler': {
    title: 'TSMC rekord Q1 mənfəəti elan etdi: AI çiplərində 58% artım',
    date: '2026-04-16',
    category: 'Texnologiya',
    locale: 'az',
    content: `Apple-ın əsas çip tədarükçüsü TSMC 2026-cı ilin birinci rübü üzrə rekord mənfəət elan etdi. Şirkətin xalis mənfəəti 572,48 milyard Tayvan dolları (təxminən 18,11 milyard dollar) təşkil edib və bu, ötən illə müqayisədə 58,3% artımı göstərir.

## Rekordun davamı

Bu nəticə TSMC üçün dördüncü ardıcıl rekord rüb deməkdir. Şirkətin gəliri 1,134 trilyon Tayvan dollarına (təxminən 35,7 milyard dollar) çatdı və 35% artım qeydə aldı. Bu rəqəmlər süni intellekt tətbiqlərinin yaratdığı çip tələbatının dayanıqlı şəkildə davam etdiyini sübut edir.

## Qabaqcıl texnologiyalar

3 nanometrlik çiplər TSMC-nin vafel gəlirinin 25%-ni təşkil etdi. Qabaqcıl proseslər (3, 5 və 7 nanometr) cəmi vafel gəlirinin 75%-ni qoşmaqla şirkətin texnoloji üstünlüyünü göstərir. NVIDIA, Apple və AMD kimi əsas müştərilər ən qabaqcıl çipləri sifariş edirlər və bu, TSMC-nin bazardakı mütləq lider mövqeyini gücləndirir.

## Gələcək proqnozları

Şirkət 2026-cı ilin tam ili üçün ABŞ dollarında gəlir artım proqnozunu 30% və daha yüksəyə qaldırdı. Bu yüksəliş süni intellekt infrastrukturuna dünya miqyaslı investisiyaların davam edəcəyinə dair güclü inamı əks etdirir. TSMC həm Tayvan iqtisadiyyatı, həm də qlobal texnologiya sektoru üçün indikator rolunu oynayır. İran müharibəsinin geosiyasi gərginliklərinə baxmayaraq, AI tələbatı şirkətin böyüməsini dəstəkləməyə davam edir.`,
  },
  'en-tsmc-record-q1-2026-58-percent': {
    title: 'TSMC Posts Record Q1 Profit, Up 58% on AI Demand',
    date: '2026-04-16',
    category: 'Technology',
    locale: 'en',
    content: `Taiwan Semiconductor Manufacturing Company reported Q1 2026 profit of NT$572.48 billion (about $18.11 billion), up 58.3% from a year earlier and a record for the world's largest contract chipmaker. It was the company's fourth consecutive record quarter.

## Revenue and Growth Mix

Revenue reached NT$1.134 trillion (about $35.7 billion), up 35% year over year. Three-nanometer chips accounted for 25% of wafer revenue, while advanced nodes (3, 5 and 7 nanometer combined) represented 75%, underscoring how rapidly leading-edge demand is concentrating at the top of the stack.

## Guidance Raised

TSMC raised its full-year 2026 revenue growth forecast to more than 30% in US dollar terms, citing strong AI chip demand. Apple remains a major customer, but the AI segment now drives most of the upside the company is willing to publicly project.

## Geopolitical Backdrop

The results landed even as the Iran war and global trade volatility weighed on adjacent industries. Executives credited the company's diversified customer base for keeping demand from softening.`,
  },
  'tr-tsmc-rekor-q1-2026-yapay-zeka': {
    title: 'TSMC\'den Rekor Q1 Karı: Yapay Zeka Talebiyle %58 Artış',
    date: '2026-04-16',
    category: 'Teknoloji',
    locale: 'tr',
    content: `Apple'ın çip tedarikçisi TSMC, 2026'nın ilk çeyreğinde 572,48 milyar Tayvan doları (yaklaşık 18,11 milyar dolar) kar açıkladı. Geçen yılın aynı dönemine göre %58,3 artış kaydeden bu sonuç, hem yeni bir rekor hem de üst üste dördüncü rekor çeyrek anlamına geliyor.

## Gelir Performansı

Şirketin geliri ise 1,134 trilyon Tayvan doları (yaklaşık 35,7 milyar dolar) oldu; yıllık bazda %35'lik bir büyümeye işaret ediyor. 3 nanometre çipler, wafer gelirinin %25'ini oluşturdu. Gelişmiş üretim düğümleri (3, 5 ve 7 nm) toplamda gelirin %75'ini sağladı.

## Yıllık Beklenti Yukarı Revize Edildi

TSMC, 2026 yılı gelir büyüme beklentisini ABD doları bazında %30+'ya yükseltti. Bu güncelleme, yapay zeka odaklı çip talebinin yılın geri kalanında da güçlü kalacağına dair şirketin güvenini yansıtıyor. Analistler, ileri teknoloji çiplere olan talebin sürmesini bekliyor.

## Sektörel Konum

TSMC, küresel yarı iletken endüstrisinde tartışmasız liderliğini koruyor. Şirket; Apple, Nvidia ve AMD gibi devlerin en gelişmiş çiplerini üreten temel ortak konumunda. Yapay zeka uygulamalarının yaygınlaşmasıyla birlikte ileri düzey çip talebi katlanarak artıyor; bu da TSMC'nin pazardaki üstünlüğünü daha da pekiştiriyor.`,
  },
  'ru-tsmc-rekordnaya-pribyl-q1-2026-58-procentov-ai-chipy': {
    title: 'TSMC: рекордная прибыль Q1, рост на 58% благодаря AI',
    date: '2026-04-16',
    category: 'Технологии',
    locale: 'ru',
    content: `Тайваньский производитель чипов TSMC, основной поставщик полупроводников для Apple, отчитался о рекордной прибыли в первом квартале 2026 года. Чистая прибыль достигла 572,48 миллиарда тайваньских долларов (около 18,11 миллиарда долларов США), увеличившись на 58,3% год к году.

## Четвёртый рекорд подряд

Это четвёртый подряд квартал с рекордными финансовыми показателями. Выручка составила 1,134 триллиона тайваньских долларов (около 35,7 миллиарда долларов), что на 35% больше, чем годом ранее. Главный драйвер роста — спрос на чипы для систем искусственного интеллекта.

## 3-нанометровая революция

Чипы по 3-нанометровому техпроцессу принесли 25% от выручки производства пластин. Передовые техпроцессы (3, 5 и 7 нанометров) в совокупности составили 75% выручки. Это подтверждает, что TSMC удерживает технологическое лидерство и захватывает наиболее маржинальный сегмент рынка.

## Прогноз на год

Компания повысила прогноз роста выручки на весь 2026 год до уровня более 30% в долларовом выражении. Это указывает на уверенность руководства в том, что инвестиционный цикл AI продолжится. Apple, NVIDIA и другие ключевые клиенты планируют наращивать заказы на чипы следующего поколения.`,
  },

  // --- Reed Hastings exits Netflix board (04-16) ---
  'reed-hastings-netflix-shurasini-29-il-sonra-terk-edir': {
    title: 'Reed Hastings 29 ildən sonra Netflix-i tərk edir',
    date: '2026-04-16',
    category: 'Biznes',
    locale: 'az',
    content: `Netflix-in həmtəsisçisi və Sədri Reed Hastings şirkətin İdarə Heyətindən çıxacağını elan etdi. Bu məlumat Netflix-in 16 aprel tarixində dərc olunan 2026-cı ilin Q1 maliyyə hesabatında açıqlandı. Hastings 29 il davam edən Netflix yolunun sonuna gəldi.

## Çıxış vaxtı

Hastings 2026-cı ilin iyununda keçiriləcək illik səhmdarlar yığıncağında rəsmən vəzifəsindən gedəcək. O, gələcəkdə xeyriyyəçilik və şəxsi maraqlarına diqqət yetirəcəyini bildirdi. Bu, Silikon Vadisinin ən tanınmış sahibkarlarından birinin bir dövrünün sonu deməkdir.

## 29 illik miras

Hastings Netflix-i 1997-ci ildə Mark Randolph ilə birlikdə qurdu. Şirkət başlanğıcda DVD poçt xidməti idi, lakin daha sonra dünya streaming inqilabının lideri oldu. 2023-cü ildə CEO vəzifələrini Greg Peters və Ted Sarandos-a verən Hastings, o vaxtdan bəri Sədrlik vəzifəsini icra edirdi.

## Şirkətə təsiri

Hastings-in çıxışı strategiya dəyişikliyi demək deyil — Greg Peters və Ted Sarandos liderliyi hələ də Netflix-in böyümə strategiyasını idarə edir. Lakin onun şəxsiyyəti və baxışı şirkətin DNA-sının ayrılmaz hissəsidir. Hastings istənilən halda öz fikrinə görə "möhkəm və hazır" idarə heyəti qoyub gedəcəyini söylədi. Netflix indi reklam gəlirləri və qlobal genişlənmə kimi yeni mərhələlərdə fəaliyyət göstərir.`,
  },
  'en-reed-hastings-exits-netflix-board': {
    title: 'Reed Hastings to Leave Netflix Board After 29 Years',
    date: '2026-04-16',
    category: 'Business',
    locale: 'en',
    content: `Netflix co-founder and Chairman Reed Hastings will step down from the board at the company's June annual meeting after 29 years, the streaming giant disclosed in its first-quarter 2026 earnings report on April 16.

## A Long Goodbye

Hastings said he plans to focus on philanthropy and personal interests after a transition that has been gradual. He handed co-CEO duties to Greg Peters and Ted Sarandos in 2023 and has served as chairman since, allowing the new operating leadership to consolidate decision-making.

## What He Built

Hastings co-founded Netflix in 1997 as a DVD-by-mail service and steered it through a controversial pivot to streaming, an even more contested expansion into original content and a recent revival driven by ad-supported tiers and password-sharing crackdowns. The company is now valued well above its DVD-era peak.

## Board Continuity

Netflix did not name a successor for the chairman role at the time of the disclosure. Investors will scrutinize the pick for clues on whether the company favors a deeper push into live programming and gaming or a more disciplined return to its original-content roots after a year of mixed strategy signals.`,
  },
  'tr-reed-hastings-netflix-board-ayriliyor': {
    title: 'Netflix Kurucusu Reed Hastings 29 Yıl Sonra Ayrılıyor',
    date: '2026-04-16',
    category: 'İş Dünyası',
    locale: 'tr',
    content: `Netflix'in 16 Nisan'da yayımladığı 2026 ilk çeyrek finansal raporunda açıklanan bilgilere göre, kurucu ortak ve Yönetim Kurulu Başkanı Reed Hastings, şirketin Haziran ayında düzenlenecek yıllık genel kurul toplantısında yönetim kurulundan ayrılacak. Bu, 29 yıllık bir dönemin sonu anlamına geliyor.

## Kişisel Tercihler

Hastings, kararının arkasındaki gerekçenin filantropi ve kişisel ilgi alanlarına daha fazla zaman ayırma isteği olduğunu belirtti. 1997'de Netflix'i kuran Hastings, yıllar içinde şirketi DVD kiralama servisinden global yayın devine dönüştürdü.

## Yönetim Devri Geçmişi

Hastings, 2023'ten beri Yönetim Kurulu Başkanlığı görevini yürütüyordu. CEO'luk görevini ise daha önce Greg Peters ve Ted Sarandos'a bırakmıştı. Bu kademeli devir süreci, şirketin yönetim devrinin sorunsuz şekilde tamamlanmasını sağladı. Yeni nesil liderler altında Netflix global yayıncılık pazarındaki konumunu güçlendirdi.

## Mirası ve Etkisi

Hastings, 21. yüzyılın en etkili teknoloji girişimcileri arasında yer alıyor. Onun liderliğinde Netflix, geleneksel televizyon endüstrisini kökten dönüştürdü ve yayın savaşlarını başlattı. Yönetim kurulundan ayrılması, şirket için yeni bir dönemin başlangıcı olarak değerlendiriliyor. Yatırımcılar ve sektör profesyonelleri gelişmeleri yakından izliyor.`,
  },
  'ru-rid-hastings-uhodit-iz-soveta-netflix-29-let': {
    title: 'Сооснователь Netflix Хастингс уходит из совета',
    date: '2026-04-16',
    category: 'Бизнес',
    locale: 'ru',
    content: `Netflix в отчёте о финансовых результатах за первый квартал 2026 года, опубликованном 16 апреля, объявила о решении сооснователя и председателя совета директоров Рида Хастингса покинуть совет. Уход состоится в июне на ежегодном собрании акционеров.

## 29 лет в компании

Хастингс провёл в Netflix 29 лет — он сооснователь компании в 1997 году и долгое время совмещал роли CEO и председателя. В 2023 году он передал обязанности со-CEO Грегу Питерсу и Теду Сарандосу, оставшись на позиции председателя совета директоров.

## Причины ухода

В сообщении компании говорится, что Хастингс намерен сосредоточиться на филантропии и личных интересах. Он давно поддерживает образовательные инициативы и инвестиции в благотворительные фонды. Уход председателя совета не связан с финансовыми результатами или стратегическими разногласиями.

## Что дальше для Netflix

Совету директоров предстоит назначить нового председателя на июньском собрании. Питерс и Сарандос продолжат руководить операционной деятельностью. Netflix остаётся самым ценным игроком в стриминговой индустрии, однако сталкивается с растущей конкуренцией со стороны Disney+, Amazon Prime Video и YouTube.`,
  },

  // --- Netflix Q1 earnings + soft Q2 guidance (04-16) ---
  'netflix-q1-2026-rekordu-q2-zeif-progoz-9-cox': {
    title: 'Netflix Q1 gəliri rekord, Q2 proqnozu zəif: səhmlər 9% düşdü',
    date: '2026-04-16',
    category: 'İqtisadiyyat',
    locale: 'az',
    content: `Netflix 2026-cı ilin birinci rübü üzrə 12,25 milyard dollar gəlir elan etdi və Wall Street-in 12,18 milyard dollar gözləntilərini üstələdi. Bu, ötən illə müqayisədə 16% artımı təşkil edir. Lakin zəif gələcək proqnozları səhmlərə güclü təzyiq yaratdı.

## Maliyyə göstəriciləri

Şirkətin xalis mənfəəti illik müqayisədə 82,8% yüksəldi və güclü gəlirlilik təqdim etdi. Netflix 2026-cı ilin tam ili üçün 50,7-51,7 milyard dollar gəlir proqnozunu qoruyub saxladı, bu isə 12-14% artım deməkdir. Reklam gəlirləri üçün 3 milyard dollar hədəfi də təsdiqləndi — bu, ötən illə müqayisədə iki dəfə artımdır.

## Q2 proqnozunda məyusluq

Şirkət 2026-cı ilin ikinci rübü üçün hissə başına 0,78 dollar mənfəət proqnozladı, lakin Wall Street 0,84 dollar gözləyirdi. Bu fərq investorlar üçün narahatlıq yaratdı. Genişlənmə xərcləri, kontent investisiyaları və idman lisenziyaları kimi amillər mənfəət marjını sıxışdırır.

## Səhmlərin reaksiyası

Hesabatın dərcindən sonra Netflix səhmləri uzadılmış ticarət sessiyasında 9% azaldı. Bu, son aylarda şirkətin səhmlərində ən böyük birgünlük düşüşlərdən biridir. Lakin uzunmüddətli investorlar gəlir artımı, reklam gəliri yüksəlişi və kontent kataloqunun gücünə diqqət yetirirlər. Reed Hastings-in eyni gündə İdarə Heyətindən gedəcəyini elan etməsi həmçinin diqqət çəkdi və yeni dövrün başlanğıcına işarə edir.`,
  },
  'en-netflix-q1-2026-earnings-soft-guidance': {
    title: 'Netflix Beats Q1 Revenue but Q2 Outlook Disappoints',
    date: '2026-04-16',
    category: 'Economy',
    locale: 'en',
    content: `Netflix reported Q1 2026 revenue of $12.25 billion, beating the $12.18 billion analyst estimate and growing 16% from a year earlier. Net income jumped 82.8% year over year, but a soft Q2 earnings forecast sent shares down 9% in extended trading.

## Headline Numbers

Full-year revenue guidance held at $50.7 billion to $51.7 billion, implying 12% to 14% growth. Netflix reiterated its $3 billion advertising revenue target for 2026, double the prior year, signaling that the ad-supported tier continues to scale even as overall subscriber growth slows.

## Why the Stock Fell

The Q2 earnings-per-share forecast of $0.78 missed Wall Street's $0.84 expectation. Investors interpreted the gap as a sign that content amortization and live-event spending will compress near-term margins, even though the long-term ad story remains intact. The 9% after-hours drop wiped out recent gains.

## Strategic Backdrop

The earnings report also disclosed that co-founder Reed Hastings will leave the board in June. Together, the management transition and softer near-term guidance gave investors plenty to debate.`,
  },
  'tr-netflix-q1-2026-sonuclari-zayif-q2-ongorusu': {
    title: 'Netflix Q1 Geliri Beklentiyi Aştı, Q2 Öngörüsü Zayıf',
    date: '2026-04-16',
    category: 'Ekonomi',
    locale: 'tr',
    content: `Netflix, 2026 ilk çeyreğinde 12,25 milyar dolar gelir bildirdi; bu, Wall Street'in 12,18 milyar dolarlık beklentisini aştı ve yıllık bazda %16'lık büyümeye işaret etti. Net gelir ise yıllık %82,8 oranında arttı.

## Yıllık Görünüm

Şirket, tam yıl gelir öngörüsünü 50,7-51,7 milyar dolar (12-14% büyüme) aralığında korudu. Reklam gelirlerinde ise 2026 için 3 milyar dolarlık hedefini yineledi; bu rakam yıllık bazda iki kat büyümeyi temsil ediyor. Reklam destekli abonelik modeli, şirketin yeni büyüme motoru olarak öne çıkıyor.

## Q2 Öngörüsü Hayal Kırıklığı

İkinci çeyrek için açıklanan hisse başına kazanç (EPS) öngörüsü 0,78 dolar oldu. Wall Street'in 0,84 dolarlık beklentisinin altında kalan bu rakam, yatırımcıları hayal kırıklığına uğrattı. Bunun sonucunda hisseler uzatılmış işlem seansında %9 değer kaybetti.

## Yatırımcı Tepkisi

Güçlü ilk çeyrek sonuçlarına rağmen geleceğe yönelik temkinli öngörüler, yayın sektöründeki rekabetin sertleştiğine işaret ediyor. Disney+, Amazon Prime Video ve diğer platformlardan gelen baskı, Netflix'in fiyat artırma ve yeni gelir kaynakları arama çabalarını şekillendiriyor. Reklam gelirlerinin hedeflenen seviyeye ulaşıp ulaşmayacağı önümüzdeki çeyreklerde belirleyici olacak.`,
  },
  'ru-netflix-q1-2026-otchet-slabyy-prognoz-aktsii-9-procentov': {
    title: 'Netflix Q1: выручка превысила прогноз, акции -9%',
    date: '2026-04-16',
    category: 'Экономика',
    locale: 'ru',
    content: `Netflix опубликовала отчёт за первый квартал 2026 года 16 апреля. Выручка составила 12,25 миллиарда долларов, что превысило прогноз аналитиков (12,18 миллиарда) и оказалось на 16% выше прошлогоднего показателя. Чистая прибыль выросла на 82,8% год к году.

## Сильные результаты, слабый прогноз

Несмотря на сильный квартал, прогноз на второй квартал разочаровал инвесторов. Netflix ожидает прибыль на акцию (EPS) в размере 0,78 доллара, в то время как Уолл-стрит закладывала 0,84 доллара. Реакция была резкой: акции NFLX упали на 9% на расширенных торгах.

## Цели на год сохраняются

Компания подтвердила годовой прогноз выручки на уровне 50,7-51,7 миллиарда долларов (рост 12-14%). Также сохранена цель по доходам от рекламы — 3 миллиарда долларов за 2026 год, что в два раза больше, чем годом ранее. Рекламная модель продолжает развиваться как ключевой драйвер роста.

## Стратегический контекст

Соответствие выручки прогнозам показывает, что подписочная база Netflix остаётся стабильной. Однако давление на маржу — связанное с расходами на контент и развитием рекламной платформы — заставляет менеджмент быть осторожнее в краткосрочных прогнозах. Слабый Q2 прогноз стал поводом для фиксации прибыли инвесторами.`,
  },

  // --- El Al $1.5B Boeing 787 deal (04-16) ---
  'el-al-1-5-milyard-boeing-787-dreamliner-sazishi': {
    title: 'El Al 1,5 milyard dollarlıq Boeing 787 sazişi imzaladı',
    date: '2026-04-16',
    category: 'Biznes',
    locale: 'az',
    content: `İsrailin bayraq daşıyıcı aviaşirkəti El Al 16 aprel tarixində Boeing 787 Dreamliner filosunu təxminən 1,5 milyard dollarlıq saziş çərçivəsində genişləndirəcəyini elan etdi. Bu, şirkətin tarixində ən böyük aviasiya investisiyalarından biridir.

## Sazişin tərkibi

El Al 787-9 modelindən altı təyyarə alma opsionunu icra edir və bunlardan dördünü daha böyük və daha effektiv 787-10 modelinə çevirir. Çatdırılma 2030 və 2032-ci illər arasında həyata keçiriləcək. Şirkətə həmçinin 2033-2035-ci illərdə təslim olmaq üçün altı əlavə 787 təyyarəsi üçün opsion da verildi.

## Filosun böyüməsi

El Al hazırda 17 Dreamliner istismar edir və onilliyin sonuna qədər bu rəqəmi 28-ə qaldırmağı, gələcəkdə isə 34-ə çatdırmağı planlaşdırır. Bu genişlənmə Yaxın Şərqdə uzunmüddətli inkişaf strategiyasının bir hissəsidir.

## Bazar mövqeyi

Genişlənmə qərarı El Al-ın İsrail bazarında dominant mövqe qazandığı dövrdə qəbul edildi. Qəzza və İran münaqişələri zamanı bir çox xarici aviaşirkət İsrail marşrutlarını dayandırdığı üçün El Al əsas alternativə çevrildi. Bu, şirkətin gəlirlərində ciddi artıma yol açdı və yeni təyyarələrə investisiya qabiliyyətini yaratdı. Boeing isə bu sazişdən tarixi inanc gücləndirməsi kimi faydalanır. Yaxın Şərqdə aviasiya marşrutlarının yenidən aktivləşməsi gözlənilir.`,
  },
  'en-el-al-15b-boeing-787-deal': {
    title: 'El Al Expands Boeing 787 Fleet in $1.5B Deal',
    date: '2026-04-16',
    category: 'Business',
    locale: 'en',
    content: `Israeli flag carrier El Al announced on April 16 that it is expanding its Boeing 787 Dreamliner order in a deal worth roughly $1.5 billion, exercising options for six additional aircraft and converting four of them to the larger 787-10 variant.

## Terms of the Deal

El Al is exercising its option to buy six 787-9s and converting four into the larger 787-10, which offers more seats and better fuel economics. Deliveries are scheduled between 2030 and 2032. The carrier was also granted additional options for up to six more 787s for delivery between 2033 and 2035.

## Fleet Trajectory

The airline currently operates 17 Dreamliners and aims to grow that fleet to 28 by the end of the decade, with as many as 34 in the long term. The expansion reflects El Al's bet that long-haul demand from Israel will continue to outstrip the country's smaller carriers and incoming foreign capacity.

## Wartime Market Position

El Al has dominated the Israeli market during the Gaza and Iran conflicts as most foreign carriers suspended Israel routes for safety and insurance reasons. The order signals confidence that the carrier can lock in long-term advantage even after foreign airlines return, by securing Dreamliner slots well into the next decade.`,
  },
  'tr-el-al-1-5-milyar-boeing-787-anlasmasi': {
    title: 'El Al\'dan 1,5 Milyar Dolarlık Boeing 787 Anlaşması',
    date: '2026-04-16',
    category: 'İş Dünyası',
    locale: 'tr',
    content: `İsrail bayrak taşıyıcı havayolu El Al, 16 Nisan'da Boeing 787 Dreamliner siparişini yaklaşık 1,5 milyar dolar değerindeki anlaşmayla genişlettiğini duyurdu. Bu, şirketin küresel uzun menzilli filosuna stratejik bir yatırım niteliği taşıyor.

## Anlaşma Detayları

El Al, altı 787-9 modelinin satın alma opsiyonunu kullanıyor ve bunlardan dördünü daha büyük ve verimli 787-10 modeline dönüştürüyor. Teslimatlar 2030 ile 2032 yılları arasında yapılacak. Şirkete ayrıca 2033-2035 arasında teslim edilmek üzere altı ek 787 için opsiyon hakkı tanındı.

## Filo Büyümesi

El Al şu anda 17 Dreamliner işletiyor. Şirket, on yılın sonuna kadar bu filoyu 28 uçağa ve nihai olarak 34 uçağa çıkarmayı hedefliyor. Bu büyüme stratejisi, havayolunun küresel uzun menzilli pazarda iddiasını artırma planının önemli bir parçası.

## Pazar Avantajı

Genişleme planı, El Al'ın Gazze ve İran çatışmaları boyunca İsrail pazarına hakim olduğu bir dönemde geldi. Pek çok yabancı havayolu güvenlik kaygıları nedeniyle İsrail uçuşlarını askıya alırken, El Al zorlu ortamda kesintisiz hizmet sunmaya devam etti. Boeing siparişi, hem ticari hem de stratejik açıdan İsrail havacılığının güçlü pozisyonunu pekiştirdi.`,
  },
  'ru-el-al-boeing-787-1-5-milliarda-12-dreamliner': {
    title: 'El Al заказала Boeing 787 на $1,5 млрд',
    date: '2026-04-16',
    category: 'Бизнес',
    locale: 'ru',
    content: `Израильская национальная авиакомпания El Al 16 апреля объявила о расширении заказа на самолёты Boeing 787 Dreamliner. Сумма сделки составляет около 1,5 миллиарда долларов и является одной из крупнейших в истории компании.

## Структура заказа

El Al реализует опцион на приобретение шести Boeing 787-9 и конвертирует четыре из них в более крупную и эффективную модель 787-10. Поставки запланированы на период 2030-2032 годов. Дополнительно компания получила опционы ещё на шесть 787 с поставкой в 2033-2035 годах.

## Цели по флоту

Сейчас El Al эксплуатирует 17 самолётов Dreamliner. К концу десятилетия флот планируется увеличить до 28 машин, а в перспективе — до 34. Это позволит расширить географию маршрутов и нарастить частоту рейсов.

## Доминирование на израильском рынке

Расширение происходит на фоне доминирования El Al на израильском рынке во время войн в Газе и с Ираном. Большинство иностранных авиакомпаний приостановили полёты в Израиль из-за ракетной угрозы, что позволило национальному перевозчику захватить ключевую долю пассажиропотока. Boeing, в свою очередь, получает важный контракт.`,
  },

  // --- Europa League QFs concluded (04-16) ---
  'avropa-liqasi-aston-villa-nottingham-forest-yarimfinal': {
    title: 'Avropa Liqası: Aston Villa-Nottingham Forest yarımfinalda',
    date: '2026-04-16',
    category: 'İdman',
    locale: 'az',
    content: `Avropa Liqasının dörddəbir final cavab oyunları 16 aprel tarixində oynanıldı və tarixdə qalan tam ingilis yarımfinalı yarandı. Aston Villa və Nottingham Forest çətin rəqibləri keçərək növbəti mərhələyə çıxdı.

## Aston Villa Bolonyanı dağıtdı

Aston Villa, Villa Park stadionunda Bolonyanı 4-0 hesabı ilə qətiyyətlə üstələdi. Ümumi hesab 7-1 oldu. İlk yarıda üç qol vurulması ev sahibinin tam dominasiyasını göstərdi. Olli Watkins yenidən qol vurdu və komandasını qələbəyə apardı. Una Emerinin rəhbərliyi altında klub son üç mövsümdə ikinci dəfə Avropa yarımfinalına çıxır.

## Nottingham Forest Portunu yendi

Nottingham Forest Siti Qraund-da 10 nəfərlə qalmış Portunu 1-0 məğlub etdi. Qol Morqan Cibbs-Vaytdan gəldi. Ümumi hesab 2-1 oldu. Forest 1984-cü ildən sonra ilk dəfə Avropa yarımfinalına yüksəldi — bu, klub üçün tarixi nailiyyətdir. Stadion azarkeşləri möhtəşəm atmosfer yaratdı.

## Digər yarımfinalçılar

Eyni gün Frayburq Selta Viqonu 3-1 hesabı ilə üstələyərək yarımfinala vəsiqə qazandı. Braqa isə Real Betisi 4-2 hesabı ilə eliminasiya etdi. Beləliklə, ikinci yarımfinal cütlüyü Frayburq-Braqa olacaq. Yarımfinal qarşılaşmaları 30 aprel və 7 may tarixlərində oynanacaq. Final 20 may tarixində İstanbulda oynanılacaq.`,
  },
  'en-europa-league-qf-aston-villa-forest-semi': {
    title: 'Europa League Sets Up All-English Villa-Forest Semi',
    date: '2026-04-16',
    category: 'Sports',
    locale: 'en',
    content: `Europa League quarterfinal second legs concluded on April 16 and produced a historic all-English semifinal: Aston Villa will face Nottingham Forest. The other semi pairs Freiburg against Braga.

## Villa Cruise Past Bologna

Aston Villa thrashed Bologna 4-0 at Villa Park (7-1 on aggregate), with three first-half goals putting the tie out of reach. Ollie Watkins scored again to extend his European campaign tally. Villa head coach Unai Emery reaches his second European semifinal in three seasons.

## Forest Edge Past Porto

Nottingham Forest beat 10-man Porto 1-0 at the City Ground (2-1 on aggregate) thanks to a Morgan Gibbs-White goal that decided a tense, low-event contest. The win sends Forest to their first European semifinal since 1984, a generational moment for a club still rebuilding its top-flight identity.

## Other Semi and Final

Freiburg beat Celta Vigo 3-1 to advance, and Braga eliminated Real Betis 4-2 to set up Freiburg-Braga in the other semifinal. The semifinals are scheduled for April 30 and May 7, with the final on May 20 in Istanbul.`,
  },
  'tr-avrupa-ligi-yari-final-tum-ingiliz-eslesmesi': {
    title: 'Avrupa Ligi\'nde Tarihi Tüm İngiliz Yarı Finali: Villa-Forest',
    date: '2026-04-16',
    category: 'Spor',
    locale: 'tr',
    content: `Avrupa Ligi çeyrek final rövanş maçları 16 Nisan'da tamamlandı ve tarihi bir tüm-İngiliz yarı finali ortaya çıktı. Aston Villa ile Nottingham Forest yarı finalde karşı karşıya gelecek.

## Aston Villa 4-0 Bologna

Aston Villa, kendi sahası Villa Park'ta Bologna'yı 4-0 yendi (toplamda 7-1). Maçta ilk yarıda atılan üç gol, ev sahibinin rahat zaferini hazırladı; Ollie Watkins yine fileleri havalandırdı. Unai Emery, böylece üç sezonda ikinci kez Avrupa yarı finaline çıkmış oldu.

## Nottingham Forest 1-0 Porto

Nottingham Forest, City Ground'da 10 kişi kalan Porto'yu 1-0 yendi (toplamda 2-1). Galibiyet golünü Morgan Gibbs-White attı. Forest, 1984'ten bu yana ilk kez Avrupa kupalarında yarı finale yükseldi — bu, kulübün modern futbol tarihindeki en büyük başarılarından biri.

## Diğer Yarı Finalistler

Aynı gün belirlenen diğer iki yarı finalist Freiburg ve Braga oldu. Freiburg, Celta Vigo'yu 3-1 yenerek tur atladı. Braga ise Real Betis'i 4-2 elerek Freiburg ile yarı finalde eşleşti. Yarı finaller 30 Nisan ve 7 Mayıs'ta oynanacak; final ise 20 Mayıs'ta İstanbul'da gerçekleştirilecek.`,
  },
  'ru-liga-evropy-2026-anglyiskiy-polufinal-aston-villa-nottingem-forest': {
    title: 'Лига Европы: английский полуфинал Вилла — Форест',
    date: '2026-04-16',
    category: 'Спорт',
    locale: 'ru',
    content: `Ответные четвертьфинальные матчи Лиги Европы УЕФА 16 апреля принесли историческую развязку: впервые состоится полностью английский полуфинал. Астон Вилла встретится с Ноттингем Форест в борьбе за выход в финал.

## Вилла громит Болонью

Астон Вилла на Вилла Парк разгромила Болонью со счётом 4:0 (общий счёт 7:1). Три из четырёх голов были забиты в первом тайме, среди отличившихся снова Олли Уоткинс. Это уже второй европейский полуфинал Унаи Эмери за последние три сезона.

## Форест возвращается

Ноттингем Форест на Сити Граунд переиграл Порту 1:0 (общий счёт 2:1) благодаря голу Моргана Гиббс-Уайта. Гости играли вдесятером после удаления. Для Фореста это первый европолуфинал с 1984 года — символическое возвращение легендарного клуба на топ-уровень.

## Другая полуфинальная пара

В тот же день определились и оставшиеся два полуфиналиста. Фрайбург обыграл Сельту 3:1 и прошёл дальше, а Брага сенсационно обыграла Реал Бетис 4:2. В другом полуфинале сыграют Фрайбург и Брага. Полуфиналы запланированы на 30 апреля и 7 мая, финал — 20 мая в Стамбуле.`,
  },

  // --- Brent crude + EU jet fuel crisis (04-16) ---
  'brent-neft-100-dollar-yaxin-evropa-jet-yanacaqi': {
    title: 'Brent neft 100 dollara yaxın: Avropa jet yanacaqı böhranı',
    date: '2026-04-16',
    category: 'İqtisadiyyat',
    locale: 'az',
    content: `Brent xam neftinin qiyməti 16 aprel tarixində bareli üçün 94,89-97,06 dollar arasında ticarət olundu. Hörmüz Boğazı blokadasının davam etməsi qiymətlər üzərində təzyiqi qoruyur. Avropa isə jet yanacağı böhranı ilə üzləşir.

## IEA-nın xəbərdarlığı

Beynəlxalq Enerji Agentliyinin (IEA) rəhbəri Avropanın "təxminən 6 həftəlik jet yanacağı qaldığını" bildirdi. Bu, kontinent üçün ciddi həyəcan siqnalıdır. Avropanın jet yanacağı idxalının 75%-i Yaxın Şərq regionundan gəlir və müharibə şəraitində bu zəncir pozulmaq üzrədir. Aviasiya sektoru qabaqcadan tədbir görməli olur.

## Aviaşirkətlərin reaksiyası

KLM may ayı üçün 160 reys ləğv etdi. SAS 1000-dən çox aprel reysini iptal etdi. Ryanair də əlavə kəsintilər haqqında siqnallar göndərir. Bu, aviasiya sənayesi üçün ciddi maliyyə zərbəsi və sərnişinlər üçün böyük narahatlıq deməkdir. Yay turist mövsümünə bir neçə həftə qaldığı şəraitdə vəziyyət xüsusilə narahatlıq doğurur.

## Qiymət dinamikası

Neft qiymətləri Trampın "İran sazişi yaxındır" bəyanatı sonrası bir qədər stabilləşdi, lakin Hörmüz blokadası birbaşa təklif zərbəsi olaraq qalır. Analitiklər diplomatik proqresin tezliklə baş tutmaması halında qiymətlərin barel başına 100 dollardan yuxarı çıxa biləcəyini xəbərdar edirlər. Avropa enerji təhlükəsizliyi üzrə xüsusi tədbirlər görür və alternativ yanacaq mənbələrini araşdırır.`,
  },
  'en-brent-95-eu-jet-fuel-six-weeks': {
    title: 'Oil Near $97 as IEA Warns of Europe Jet Fuel Crisis',
    date: '2026-04-16',
    category: 'Economy',
    locale: 'en',
    content: `Brent crude traded between $94.89 and $97.06 per barrel on April 16 as the Strait of Hormuz blockade continued to disrupt seaborne flows. The International Energy Agency chief warned that Europe has "maybe 6 weeks of jet fuel left" at current consumption.

## Why Europe Is Exposed

About 75% of European jet fuel imports come from the Middle East region. The Hormuz disruption has cut into refined-product flows even more sharply than crude, as European refineries are not configured to fully replace Middle Eastern jet kerosene from regional or US sources alone.

## Airlines Cutting Schedules

KLM has cut 160 flights for May. SAS cancelled 1,000 April flights. Ryanair has signaled additional cuts. Carriers are prioritizing long-haul and high-yield routes while quietly trimming peripheral services, an approach that protects margins but limits capacity for the summer travel peak.

## What Could Change It

A US-Iran de-escalation, hinted at by Trump's "very close" comments on April 17, would reopen Hormuz and ease both crude and jet fuel flows almost immediately. Until then, European governments are exploring strategic stock releases, but officials concede that even those buffers buy only a few weeks.`,
  },
  'tr-brent-petrol-100-dolar-jet-yakiti-krizi': {
    title: 'Petrol 100 Dolara Yakın: AB\'de 6 Haftalık Jet Yakıtı Kaldı',
    date: '2026-04-16',
    category: 'Ekonomi',
    locale: 'tr',
    content: `Brent ham petrol, Hürmüz Boğazı'nın kapalı kalmaya devam etmesiyle 16 Nisan'da varil başına 94,89-97,06 dolar bandında işlem gördü. Uluslararası Enerji Ajansı (IEA) başkanı, Avrupa'nın "belki 6 haftalık jet yakıtı kaldığı" uyarısında bulundu.

## Avrupa'nın Yakıt Bağımlılığı

Avrupa'nın jet yakıtı ithalatının %75'i Orta Doğu bölgesinden geliyor. Bu yapısal bağımlılık, mevcut krizde Avrupa havacılık sektörünü doğrudan etkiliyor. Yakıt sıkıntısı, hem operasyonel hem de fiyat baskıları yaratıyor.

## Havayolu Şirketlerinin Kararları

KLM, Mayıs ayı için 160 uçuşunu iptal etti. SAS ise Nisan ayında 1.000 uçuşunu iptal ederek krize sert tepki verdi. Ryanair de ek iptallere işaret eden açıklamalar yaptı. Bu kararlar, milyonlarca yolcuyu doğrudan etkiliyor; özellikle bahar tatil sezonunda planlarını yapan turistler büyük zorluk yaşıyor.

## Ekonomik Yansımalar

Petrol fiyatlarının 100 dolar eşiğine yaklaşması, küresel enflasyon, taşımacılık maliyetleri ve enerji güvenliği konusundaki endişeleri derinleştiriyor. ABD-İran arasındaki olası uzlaşı, fiyatların bir miktar gevşemesine yol açabilir; ancak Hürmüz Boğazı'nın yeniden açılması olmadan kalıcı bir rahatlama beklenmiyor. Avrupa Komisyonu, alternatif tedarik kaynakları arayışını hızlandırdı.`,
  },
  'ru-brent-neft-100-dollarov-evropa-aviatoplivo-krizis': {
    title: 'Нефть у $100, в Европе — дефицит авиатоплива',
    date: '2026-04-16',
    category: 'Экономика',
    locale: 'ru',
    content: `Цена нефти Brent 16 апреля торговалась вблизи 94,89-97,06 доллара за баррель на фоне продолжающейся блокады Ормузского пролива. Глава Международного энергетического агентства предупредил, что у Европы осталось «возможно, 6 недель запасов авиатоплива».

## Зависимость от Ближнего Востока

75% импорта авиационного керосина в страны ЕС поступает из ближневосточного региона. Война с Ираном и проблемы с навигацией через Ормузский пролив резко обострили ситуацию с поставками. Европейские нефтеперерабатывающие заводы пока не способны компенсировать этот дефицит собственным производством.

## Реакция авиакомпаний

Голландская KLM объявила о сокращении 160 рейсов в мае. Скандинавская SAS отменила 1 000 рейсов в апреле. Бюджетная Ryanair сигнализирует о подготовке дополнительных сокращений. Пассажиры столкнутся с массовыми задержками и ростом цен на билеты.

## Экономические последствия

Рост цен на нефть и проблемы с авиатопливом грозят ускорить инфляцию в Европе и подорвать восстановление туристического сектора. Европейский ЦБ может пересмотреть планы по снижению ставок. Многое зависит от того, удастся ли в ближайшие недели договориться о деэскалации ирано-американского конфликта.`,
  },

  // --- US jobless claims 207K (04-16) ---
  'abs-isizlik-iddialari-207-min-en-boyuk-azalma': {
    title: 'ABŞ işsizlik iddiaları 207 minə endi: ən böyük azalma',
    date: '2026-04-16',
    category: 'İqtisadiyyat',
    locale: 'az',
    content: `ABŞ Əmək Departamenti 16 aprel tarixində elan etdi ki, 11 aprel tarixində başa çatan həftədə ilkin işsizlik iddialarının sayı 11 000 azalaraq 207 000-ə düşüb. Bu, fevral ayından bəri ən böyük birhəftəlik azalmadır.

## Statistik göstəricilər

Dörd həftəlik hərəkət edən orta göstərici 209 750 təşkil edir — bu, son aylarda ümumi sabitliyi göstərir. 4 aprel tarixində başa çatan həftə üçün davamlı iddialar 1,818 milyona çatdı və 31 000 artdı. Bu, ümumi sabitlik fonunda yeni iş tapmağın çətinliyini əks etdirə bilər.

## İqtisadi mənzərə

Aşağı işsizlik iddiaları əmək bazarının işdən çıxarmalar baxımından sabit qaldığını göstərir. Bu, Federal Ehtiyat Sisteminin son aylar pul siyasətinə dair qərarlarında nəzərə aldığı əsas faktorlardan biridir. İran müharibəsi və neft qiymətlərinin yüksəlməsinə baxmayaraq, ABŞ əmək bazarı dayanıqlılığını qoruyur. Bu, iqtisadi rəsmilərinin müsbət qiymətləndirdiyi indikatordur.

## Federal Ehtiyatın baxışı

Federal Ehtiyat Sistemi inflyasiya və əmək bazarı arasında balansı qorumağa çalışır. İşsizlik iddialarının aşağı qalması faiz dərəcəsi qərarlarında daha balanslaşdırılmış yanaşmaya imkan verir. Lakin işəgötürmənin də ehtiyatlı qaldığı qeyd olunur — şirkətlər hələlik işdən çıxarmadan çəkinsələr də, yeni vəzifələr açmaqda da konservativ davranırlar. Bu vəziyyət iqtisadi proqnozlarda qarışıq mesajlar yaradır.`,
  },
  'en-us-jobless-claims-207k-april-16': {
    title: 'US Jobless Claims Drop to 207,000, Biggest Since February',
    date: '2026-04-16',
    category: 'Economy',
    locale: 'en',
    content: `US initial jobless claims fell to 207,000 in the week ending April 11, the Labor Department reported on April 16. The drop of 11,000 from the prior week was the biggest one-week decline since February and signals continued labor market resilience.

## The Numbers in Context

The four-week moving average, which smooths volatility, came in at 209,750. Continuing claims for the week ending April 4 rose 31,000 to 1.818 million, suggesting that while layoffs remain low, workers who do lose jobs are taking longer to find new ones.

## Reading the Signal

Economists read the data as consistent with a labor market that is cooling at the hiring margin without breaking. Layoff activity, the most reliable real-time gauge of labor stress, remains historically low. That is the most important takeaway for Federal Reserve officials watching for cracks ahead of summer.

## Implications for the Fed

The print supports the Federal Reserve's "wait and see" stance on rate cuts. With the Iran war keeping energy prices elevated and inflation expectations sticky, a still-firm labor market gives policymakers cover to delay easing without risking a recessionary surprise from the demand side of the economy.`,
  },
  'tr-abd-issizlik-talepleri-207-bin-dustu': {
    title: 'ABD Haftalık İşsizlik Talepleri 207 Bine Düştü',
    date: '2026-04-16',
    category: 'Ekonomi',
    locale: 'tr',
    content: `ABD Çalışma Bakanlığı, 16 Nisan'da yayımladığı verilerde 11 Nisan'da sona eren hafta için ilk işsizlik taleplerinin 11.000 azalarak 207.000'e indiğini açıkladı. Bu, Şubat ayından bu yana en büyük tek haftalık düşüş oldu.

## Veri Detayları

Dört haftalık hareketli ortalama 209.750 olarak gerçekleşti. Bu gösterge, kısa vadeli dalgalanmalardan arındırılmış olarak işgücü piyasasının genel seyrini yansıtıyor. 4 Nisan'da sona eren hafta için sürmekte olan işsizlik talepleri ise 31.000 artarak 1,818 milyona yükseldi.

## İşgücü Piyasasının Sağlığı

Düşük işten çıkarma rakamları, ABD işgücü piyasasının dirençli yapısını koruduğuna işaret ediyor. İlk başvuruların 207 binde kalması, şirketlerin agresif personel azaltma adımları atmadığını gösteriyor. Ancak sürmekte olan talepler kategorisindeki artış, işsiz kalanların yeni iş bulma süresinin uzayabildiğine dair bir uyarı niteliği taşıyor.

## Federal Reserve İçin Önem

Bu veriler, Federal Rezerv'in faiz politikası kararları için kritik girdiler arasında yer alıyor. İşgücü piyasasının istikrarlı kalması, enflasyonla mücadelede merkez bankasına manevra alanı sağlıyor. Ekonomistler, önümüzdeki haftalarda gelecek istihdam verilerinin ekonomi politikalarının yönünü belirleyeceğini düşünüyor. Yatırımcılar gelişmeleri yakından takip ediyor.`,
  },
  'ru-ssha-bezrabotitsa-zayavki-207000-aprel-2026': {
    title: 'США: заявки на пособие упали до 207 000',
    date: '2026-04-16',
    category: 'Экономика',
    locale: 'ru',
    content: `Министерство труда США 16 апреля сообщило, что число первичных заявок на пособие по безработице за неделю, завершившуюся 11 апреля, упало на 11 000 — до 207 000. Это самое значительное недельное снижение с февраля 2026 года.

## Стабильный рынок труда

Скользящая средняя за четыре недели составила 209 750 заявок. Это указывает на устойчиво низкий уровень увольнений, несмотря на геополитическую неопределённость и волатильность на сырьевых рынках. Работодатели в основном держатся за уже нанятый персонал.

## Продолжающиеся заявки

Число продолжающих заявок за неделю, завершившуюся 4 апреля, составило 1,818 миллиона — это на 31 000 больше, чем неделей ранее. Рост этой категории показывает, что уволенным работникам становится несколько труднее найти новую работу, хотя темпы найма остаются положительными.

## Что это значит для ФРС

Сильные данные по рынку труда осложняют решение Федеральной резервной системы по ставкам. Низкий уровень увольнений и устойчивая занятость уменьшают необходимость стимулирующих мер. Однако высокие цены на нефть и риск рецессии в Европе продолжают оказывать давление на экономические перспективы США.`,
  },

  // ========== 2026-04-14 ==========

  // --- Champions League Quarter-Finals ---
  'cempionlar-liqasi-atletiko-barsa-liverpool-psg': {
    title: 'ÇL: Atletiko və PSG Cavab Oyunlarına Üstünlüklə Gəlir',
    date: '2026-04-14',
    category: 'İdman',
    locale: 'az',
    content: `Çempionlar Liqasının dörddəbir final mərhələsində bu axşam iki həlledici cavab oyunu keçiriləcək. Hər iki matç 14 aprel saat 21:00 CET-də başlayacaq.

## Atletiko Madrid — Barselona

Atletiko Madrid ilk oyunu evdə 2-0 hesabı ilə qazanıb. Qolları Julian Alvarez və Alexander Sorloth vurub. Barselona Camp Nou-da tarixi geri dönüş etməyə çalışacaq, lakin iki qol fərqi ciddi maneədir.

## Liverpool — PSG

Paris Saint-Germain Parc des Princes-də Liverpoolu 2-0 məğlub edib. Desire Doue və Xviça Kvaratskheliya hərəsi bir qol vurub. Liverpool Anfield-də eynilə möhtəşəm geri dönüşlər etmişdi, lakin PSG-nin güclü hücum xətti ciddi təhlükə yaradır.

## Yarımfinal Perspektivi

Bu axşamkı qaliblər yarımfinalda Bayern Münhen və ya Real Madrid ilə qarşılaşacaq. Turnirin bu mərhələsində Avropa futbolunun ən güclü komandaları arasında amansız mübarizə gözlənilir.

## Canlı Yayım

- [Liverpool — PSG (Canlı izlə)](https://www.youtube.com/watch?v=JpTvYoLCAwE)
- [Barselona — Atletiko Madrid (Canlı izlə)](https://www.youtube.com/watch?v=p2e16DaPYzM)`,
  },
  'en-champions-league-qf-atletico-barca-liverpool-psg': {
    title: 'Champions League QF: Atletico, PSG Defend 2-0 Leads',
    date: '2026-04-14',
    category: 'Sports',
    locale: 'en',
    content: `The Champions League quarterfinals reach a decisive point on April 14, with Atletico Madrid hosting Barcelona and Liverpool welcoming PSG — both trailing sides needing historic comebacks to advance.

## Atletico Madrid vs Barcelona (21:00 CET)

Atletico hold a commanding 2-0 advantage. Goals from Julian Alvarez and Alexander Sorloth in the first leg gave Simeone's side a significant cushion.

## Liverpool vs PSG (21:00 CET)

At Anfield, Liverpool must overturn a 2-0 deficit. Desire Doue and Khvicha Kvaratskhelia struck in Paris.

## The Comeback Challenge

In Champions League history, teams trailing 2-0 after the first leg advance less than 15% of the time. Yet both clubs have the pedigree to make it happen.

## Watch Live

- [Liverpool vs PSG (Watch Live)](https://www.youtube.com/watch?v=JpTvYoLCAwE)
- [Barcelona vs Atletico Madrid (Watch Live)](https://www.youtube.com/watch?v=p2e16DaPYzM)`,
  },
  'tr-sampiyonlar-ligi-ceyrek-final': {
    title: 'Devler Ligi\'nde Atletico-Barça ve Liverpool-PSG',
    date: '2026-04-14',
    category: 'Spor',
    locale: 'tr',
    content: `Şampiyonlar Ligi çeyrek final rövanş maçlarında iki büyük karşılaşma oynanacak. İlk maçlarda Atletico Madrid Barcelona'yı 2-0, PSG ise Liverpool'u 2-0 yenerek avantajı ele geçirmişti.

## Atletico Madrid — Barcelona

Atletico Madrid ilk maçta Alvarez ve Sorloth'un golleriyle Barcelona'yı 2-0 yendi. Rövanşta Metropolitano'da bu avantajını korumaya çalışacak. Barcelona'nın iki gollük farkı kapatması gerekiyor.

## PSG — Liverpool

PSG, Parc des Princes'te Doue ve Kvaratskhelia'nın golleriyle Liverpool'u 2-0 mağlup etti. Rövanş Anfield'da oynanacak. Liverpool'un tarihi geri dönüş geleneği olsa da iki gollük açığı kapatması kolay olmayacak.

## Yarı Final Yolu

Galip takımlar yarı finalde Bayern Münih veya Real Madrid ile eşleşecek. Her iki maç 14 Nisan saat 21:00 CET'te başlayacak.

## Canlı İzle

- [Liverpool — PSG (Canlı İzle)](https://www.youtube.com/watch?v=JpTvYoLCAwE)
- [Barcelona — Atletico Madrid (Canlı İzle)](https://www.youtube.com/watch?v=p2e16DaPYzM)`,
  },
  'ru-liga-chempionov-atletiko-barsa-liverpul-pszh': {
    title: 'Лига чемпионов: Атлетико и ПСЖ ведут 2:0 после первых матчей',
    date: '2026-04-14',
    category: 'Спорт',
    locale: 'ru',
    content: `В четвертьфиналах Лиги чемпионов УЕФА Атлетико Мадрид и ПСЖ одержали победы в первых матчах со счётом 2:0 и имеют преимущество перед ответными встречами.

## Атлетико — Барселона 2:0

Атлетико Мадрид на своём поле обыграл Барселону благодаря голам Альвареса и Сорлота. Команда Диего Симеоне продемонстрировала оборонительную стойкость. В ответном матче Барселоне предстоит отыграть два мяча.

## ПСЖ — Ливерпуль 2:0

В Париже ПСЖ уверенно обыграл Ливерпуль. Голы Дуэ и Кварацхелия обеспечили французскому клубу комфортное преимущество. Ответный матч состоится на «Энфилде», где Ливерпуль попытается совершить камбэк.

## Ответные матчи

Оба ответных матча запланированы на 14 апреля в 21:00 по центральноевропейскому времени. Победители выйдут на Баварию или Реал Мадрид в полуфинале.

## Прямая трансляция

- [Ливерпуль — ПСЖ (Смотреть онлайн)](https://www.youtube.com/watch?v=JpTvYoLCAwE)
- [Барселона — Атлетико Мадрид (Смотреть онлайн)](https://www.youtube.com/watch?v=p2e16DaPYzM)`,
  },

  // --- Israel-Lebanon Direct Talks ---
  'israil-livan-birbasa-danisiqlar': {
    title: 'İsrail-Livan: 30 İldən Sonra İlk Birbaşa Danışıqlar',
    date: '2026-04-14',
    category: 'Dünya',
    locale: 'az',
    content: `ABŞ Dövlət Katibi Marco Rubio İsrail və Livan səfirlərini 14 apreldə Vaşinqtonda bir araya gətirib. Bu, 30 ildən artıq müddətdən sonra iki ölkə arasında ilk birbaşa diplomatik danışıqlardır.

## Danışıqların Gündəmi

Görüşdə atəşkəs, Hizbullahın tərksilahlanması və potensial sülh müqaviləsi məsələləri müzakirə olunub. Lakin İsrail nümayəndə heyəti danışıqlara "atəşkəsə razılaşmamaq" təlimatı ilə gəlib — İsrail tərəfi əvvəlcə Hizbullahın tam dağıdılmasını tələb edir.

## Hizbullahın Reaksiyası

Hizbullah danışıqlara kəskin etiraz edib və Livan hökumətini müzakirələrdən çıxmağa çağırıb. Təşkilat bu görüşü Livanın suverenliyinə müdaxilə kimi qiymətləndirib. Buna baxmayaraq, ABŞ-ın vasitəçiliyi ilə danışıqların davam etdirilməsi planlaşdırılır.

## Regionda Gərginlik

Ekspertlər bu danışıqları bölgədəki gərginliyin azaldılması istiqamətində mühüm addım hesab edirlər. Lakin İsrailin sərt mövqeyi və Hizbullahın etirazı sülh prosesinin çətin olacağına işarə edir. Diplomatik həll yollarının tapılması üçün bütün tərəflərin güzəştlərə hazır olması vacibdir.`,
  },
  'en-israel-lebanon-direct-talks-first-in-30-years': {
    title: 'Israel and Lebanon Hold First Direct Talks in 30 Years',
    date: '2026-04-14',
    category: 'World',
    locale: 'en',
    content: `Secretary of State Marco Rubio hosted Israeli and Lebanese ambassadors at the State Department on April 14 for what marks the first direct diplomatic engagement between the two nations in over three decades.

## Historic Meeting at the State Department

The talks represent a significant diplomatic milestone, bringing Israeli and Lebanese officials to the same table for the first time since the 1990s. The agenda centers on three critical issues: a comprehensive ceasefire agreement, the disarmament of Hezbollah, and the framework for a potential peace deal between the neighboring countries.

## Israel's Hard Line on Hezbollah

Israeli officials arrived in Washington with firm instructions — not to agree to any ceasefire that leaves Hezbollah's military infrastructure intact. Israel's position is clear: the Iran-backed militia must be fully dismantled before any lasting agreement can be reached.

## Hezbollah Pushes Back

Hezbollah urged the Lebanese government to withdraw from the talks entirely, calling the diplomatic effort "futile." The Lebanese delegation, however, chose to attend despite the pressure, signaling Beirut's willingness to explore diplomatic solutions.`,
  },
  'tr-israil-lubnan-dogrudan-gorusmeler': {
    title: 'İsrail ve Lübnan 30 Yıldan Sonra İlk Kez Görüştü',
    date: '2026-04-14',
    category: 'Dünya',
    locale: 'tr',
    content: `ABD Dışişleri Bakanı Marco Rubio'nun arabuluculuğunda İsrail ve Lübnan yetkilileri 30 yılı aşkın bir sürenin ardından ilk kez doğrudan görüşmelere başladı. Diplomatik kaynaklar, müzakerelerin odak noktasının Hizbullah'ın silahsızlandırılması ve Lübnan'ın güneyindeki güvenlik düzenlemeleri olduğunu bildirdi.

## Hizbullah Silahsızlanması Masada

Görüşmelerde İsrail tarafı, kalıcı barış için Hizbullah'ın askeri kapasitesinin ortadan kaldırılmasını ön koşul olarak öne sürdü. Lübnan heyeti ise egemenlik haklarının korunması ve İsrail'in hava sahası ihlallerinin sona erdirilmesi konularını gündeme getirdi.

## Washington'dan Temkinli İyimserlik

Rubio, görüşmelerin ardından yaptığı açıklamada tarafların "yapıcı bir diyalog ortamı" oluşturduğunu belirtti. Uzmanlar, 30 yılı aşkın süredir gerçekleşmeyen doğrudan temasın başlamasının bile önemli bir diplomatik gelişme olduğuna dikkat çekiyor.`,
  },
  'ru-izrail-livan-pryamye-peregovory': {
    title: 'Израиль и Ливан начали прямые переговоры впервые за 30 лет',
    date: '2026-04-14',
    category: 'Мир',
    locale: 'ru',
    content: `Израиль и Ливан начали первые прямые переговоры более чем за 30 лет при посредничестве госсекретаря США Марко Рубио. Встреча состоялась на фоне продолжающегося давления на Хезболлу с требованием разоружения.

## Историческая встреча

Переговоры стали первым прямым дипломатическим контактом такого уровня за более чем три десятилетия. Госсекретарь США Марко Рубио выступил в роли посредника.

## Вопрос разоружения Хезболлы

Ключевым пунктом повестки стал вопрос разоружения Хезболлы. Израильская сторона настаивает на полном выполнении резолюций Совета Безопасности ООН.

## Перспективы урегулирования

Эксперты отмечают, что сам факт начала прямых переговоров является значительным прорывом.`,
  },

  // --- Haiti Stampede Tragedy ---
  'haiti-izdiham-faciesi': {
    title: 'Haitidə İzdiham Faciəsi: Ən Azı 25 Nəfər Həlak Olub',
    date: '2026-04-14',
    category: 'Dünya',
    locale: 'az',
    content: `12 apreldə Haitinin UNESCO Dünya İrsi siyahısında olan Citadelle Laferriere qalasında dəhşətli izdiham baş verib. Hadisə nəticəsində ən azı 25-30 nəfər həlak olub, onlarla insan yaralanıb.

## Faciənin Təfərrüatları

İllik bayram zamanı tələbələrlə dolu izdiham giriş qapısında basırıq nəticəsində baş verib. Yağış vəziyyəti daha da pisləşdirib — insanlar sürüşkən səthlərdə tarazlıqlarını itiriblər. Ölüm səbəbləri arasında asfiksiya və tapdalanma göstərilir.

## Karib Tarixinin Ən Ağır Hadisələrindən Biri

Mütəxəssislər bu faciəni Karib regionu tarixinin ən ölümcül izdiham hadisələrindən biri kimi qiymətləndiriblər. Qala dar keçidlərə və məhdud çıxış nöqtələrinə malikdir, bu da kütləvi tədbirlər zamanı ciddi risk yaradır.

## Araşdırma və Reaksiyalar

Haiti hökuməti hadisə ilə bağlı təhqiqat başladıb. Beynəlxalq təşkilatlar humanitar yardım təklif edib. UNESCO-dan abidədə kütləvi tədbirlərin təhlükəsizlik standartlarının yenidən nəzərdən keçirilməsi tələb edilib.`,
  },
  'en-haiti-stampede-citadelle-kills-dozens': {
    title: 'Deadly Stampede at Haiti Citadelle Kills at Least 25',
    date: '2026-04-14',
    category: 'World',
    locale: 'en',
    content: `A devastating stampede at the Citadelle Laferriere on April 12 killed at least 25 to 30 people and left dozens hospitalized, making it one of the deadliest crowd disasters in Caribbean history.

## Crush at a UNESCO World Heritage Site

The tragedy unfolded at the entrance to the Citadelle Laferriere, the iconic mountaintop fortress in northern Haiti and a UNESCO World Heritage site. Large crowds had gathered for an annual celebration, with students among the attendees.

## Rain Worsened the Catastrophe

Conditions deteriorated rapidly when rain began to fall. The wet surfaces made it impossible for people caught in the crush to maintain footing. Most victims died from asphyxiation.

## A National Tragedy

The Citadelle, built in the early 19th century after Haiti's independence, is the nation's most celebrated monument. The disaster has prompted calls for a thorough review of crowd management protocols.`,
  },
  'tr-haiti-izdiham-faciasi': {
    title: 'Haiti\'de İzdiham Faciası: 30\'dan Fazla Kişi Öldü',
    date: '2026-04-14',
    category: 'Dünya',
    locale: 'tr',
    content: `Haiti'nin UNESCO Dünya Mirası listesindeki tarihi Citadelle kalesinde meydana gelen izdihamda 30'dan fazla kişi hayatını kaybetti. Kurbanların büyük çoğunluğunun okul gezisine katılan öğrenciler olduğu bildirildi.

## Ani Yağmur Paniğe Yol Açtı

Kalabalık ziyaretçi grubunun kalenin dar geçitlerinde bulunduğu sırada aniden bastıran şiddetli yağmur paniğe neden oldu.

## Kurtarma Çalışmaları Devam Ediyor

Haiti yetkilileri olay yerine acil ekipler sevk etti. Ölü sayısının artabileceği belirtiliyor.`,
  },
  'ru-gaiti-davka-30-pogibshikh': {
    title: 'Давка на Гаити унесла жизни более 30 человек',
    date: '2026-04-14',
    category: 'Мир',
    locale: 'ru',
    content: `На Гаити произошла трагедия — в результате давки погибли более 30 человек. Инцидент произошёл вблизи Цитадели, объекта Всемирного наследия ЮНЕСКО, во время массового мероприятия с участием студентов.

## Обстоятельства трагедии

Давка началась, когда внезапный ливень обрушился на территорию крепости. Паника охватила толпу, люди пытались укрыться от дождя в узких проходах. Мокрая поверхность не позволяла удержаться на ногах, большинство погибших скончались от асфиксии в результате сдавливания.

## Реакция властей

Власти Гаити объявили национальный траур по погибшим и начали расследование обстоятельств трагедии. Международные организации выразили соболезнования и предложили гуманитарную помощь. ЮНЕСКО призвала пересмотреть стандарты безопасности при проведении массовых мероприятий на территории объектов культурного наследия.`,
  },

  // --- Stanford AI Index 2026 ---
  'stanford-ai-indeks-2026-hesabat': {
    title: 'Stanford AI İndeksi: Anthropic Reytinqdə Liderdir',
    date: '2026-04-14',
    category: 'Texnologiya',
    locale: 'az',
    content: `Stanford Universitetinin 400+ səhifəlik illik AI İndeks hesabatı dərc olunub. Hesabat süni intellekt sahəsində əsas tendensiyaları və liderləri müəyyən edir.

## Reytinq və Liderlər

Anthropic AI reytinqində Elo 1503 balı ilə birinci yerdədir. Onu xAI (1495), Google (1494) və OpenAI (1481) izləyir. Bu, süni intellekt yarışında rəqabətin nə qədər kəskin olduğunu göstərir.

## Çin ABŞ-a Yaxınlaşır

Hesabata görə, Çin ABŞ ilə texnoloji fərqi 2,7%-ə endirib. Bu, Çinin süni intellekt sahəsinə böyük investisiyalarının nəticəsidir və qlobal texnoloji güc balansına təsir göstərir.

## Kütləvi Mənimsəmə Rekordları

Generativ AI cəmi 3 il ərzində dünya əhalisinin 53%-i tərəfindən mənimsənilib — bu, fərdi kompüter və internetdən daha sürətli yayılma tempidir. SWE-bench kodlaşdırma performansı isə 1 il ərzində 60%-dən demək olar ki, 100%-ə yaxın artıb, bu da proqramlaşdırma sahəsində inqilabi dəyişiklikdir.`,
  },
  'en-stanford-ai-index-2026-anthropic-leads': {
    title: 'Stanford AI Index: Anthropic Tops Global Rankings',
    date: '2026-04-14',
    category: 'Technology',
    locale: 'en',
    content: `The Stanford Institute for Human-Centered AI has released its 2026 AI Index report, revealing that Anthropic now leads global AI rankings with an Elo score of 1,503, followed by xAI at 1,495 and Google at 1,494.

## US-China Gap Is Shrinking

The difference has shrunk to just 2.7%, suggesting China's massive investments are paying off.

## Fastest Technology Adoption in History

Generative AI has reached 53% adoption in just three years, outpacing the PC and internet.

## Coding Capabilities Surge

On the SWE-bench benchmark, AI systems jumped from 60% to near-perfect scores within a single year.`,
  },
  'tr-stanford-yz-indeksi-2026': {
    title: 'Stanford YZ İndeksi: Anthropic Lider, Çin Farkı Azaldı',
    date: '2026-04-14',
    category: 'Teknoloji',
    locale: 'tr',
    content: `Stanford Üniversitesi'nin Yapay Zeka İndeksi'nin 2026 raporu açıklandı. Anthropic, 1.503 Elo puanıyla yapay zeka performans testlerinde lider konumda. Onu xAI (1.495) ve Google (1.494) takip ediyor.

## Çin ile ABD Arasındaki Fark Yüzde 2,7'ye Düştü

Çin'in yoğun yatırımları ABD'nin liderlik pozisyonunu tehdit eder hale geldi. Aradaki fark yüzde 2,7'ye kadar daraldı; bu da küresel yapay zeka yarışının her zamankinden daha kızgın olduğunu gösteriyor.

## Küresel Benimseme Yüzde 53'e Ulaştı

Dünya nüfusunun yüzde 53'ü üretken yapay zekayı benimsedi. Bu oran, üretken yapay zekanın tarihte en hızlı benimsenen teknoloji olduğunu ortaya koyuyor. SWE-bench kodlama testlerinde yapay zeka sistemleri bir yıl içinde yüzde 60'tan neredeyse mükemmel seviyelere ulaştı.`,
  },
  'ru-stenfordskiy-ai-indeks-2026': {
    title: 'Стэнфордский AI Индекс 2026: Anthropic стал лидером',
    date: '2026-04-14',
    category: 'Технологии',
    locale: 'ru',
    content: `Стэнфордский университет опубликовал ежегодный отчёт AI Index 2026 объёмом более 400 страниц. Компания Anthropic вышла в лидеры с рейтингом Elo 1503 балла. За ней следуют xAI (1495) и Google (1494).

## Anthropic — новый лидер

Anthropic заняла лидирующую позицию среди разработчиков систем искусственного интеллекта, опередив таких гигантов как Google и OpenAI в ключевых тестах производительности.

## Разрыв с Китаем минимален

Разрыв между США и Китаем сократился до 2,7%. Китай значительно увеличил инвестиции в исследования и разработки в области ИИ, что создаёт серьёзную конкуренцию американским компаниям.

## Глобальное внедрение ИИ

Уровень внедрения генеративного ИИ достиг 53% за три года — это быстрее, чем распространение персональных компьютеров и интернета. На тесте SWE-bench результаты выросли с 60% до почти идеальных за один год.`,
  },

  // --- iPhone Fold Delay ---
  'iphone-fold-gecikme-istehsal': {
    title: 'iPhone Fold İstehsalı Avqusta Təxirə Salınıb',
    date: '2026-04-14',
    category: 'Texnologiya',
    locale: 'az',
    content: `Apple-ın ilk qatlanan telefonu olan iPhone Fold-un kütləvi istehsalı iyundan avqusta keçirilib. EVT (mühəndislik verifikasiya testi) mərhələsində üzə çıxan texniki problemlər gecikməyə səbəb olub.

## Yeni Tarixlər

Kütləvi istehsal avqusta təxirə salınsa da, payız 2026 — sentyabr ayında iPhone 18 Pro ilə birlikdə təqdim etmə hədəfi dəyişməyib. Lakin başlanğıcda məhdud inventar gözlənilir, bu da ilk günlərdə cihazı almağı çətinləşdirə bilər.

## Rəqabət Mühiti

Apple qatlanan telefon bazarına Samsung, Huawei və digər Çin istehsalçılarından xeyli gec daxil olur. Samsung Galaxy Z Fold seriyası artıq beşinci nəsildədir. Buna baxmayaraq, Apple-ın ekosistem üstünlüyü və brend loyallığı ciddi rəqabət avantajı yaradır.

## Gözləntilər

Analitiklər iPhone Fold-un qatlanan telefon bazarını kökündən dəyişdirə biləcəyini proqnozlaşdırır. Lakin məhdud istehsal həcmi ilkin satışlarda darboğaz yarada bilər və istehlakçılar gözləmə siyahıları ilə üzləşə bilər.`,
  },
  'en-iphone-fold-delayed-to-august-2026': {
    title: 'Apple iPhone Fold Delayed, Mass Output Pushed to Aug',
    date: '2026-04-14',
    category: 'Technology',
    locale: 'en',
    content: `Apple's first foldable iPhone has hit a production snag, with mass manufacturing pushed from June to August 2026 due to engineering validation test challenges.

## EVT Challenges Cause the Delay

The delay stems from issues encountered during the Engineering Validation Test phase. Foldable devices present unique manufacturing challenges.

## Fall 2026 Launch Still on Track

Despite the production delay, Apple's planned fall 2026 launch remains intact alongside the iPhone 18 Pro lineup.

## Supply Constraints Expected

The compressed timeline could result in limited initial inventory. Early demand is expected to far outstrip supply.`,
  },
  'tr-iphone-fold-gecikti': {
    title: 'iPhone Fold Gecikti: Üretim Ağustosa Ertelendi',
    date: '2026-04-14',
    category: 'Teknoloji',
    locale: 'tr',
    content: `Apple'ın katlanabilir telefonu iPhone Fold'un üretim takviminde değişikliğe gidildi. Mühendislik doğrulama testi (EVT) aşamasında karşılaşılan teknik sorunlar nedeniyle seri üretim hazirandan ağustos ayına ertelendi.

## Sonbahar 2026 Hedefi Korunuyor

Gecikmeye rağmen sonbahar 2026 lansman hedefi korunuyor. iPhone Fold, iPhone 18 Pro serisiyle birlikte tanıtılacak. Ancak sıkışan takvim nedeniyle başlangıçta sınırlı stok bekleniyor ve talebin arzı aşması muhtemel.

## Katlanabilir Telefon Pazarında Rekabet Kızışıyor

Apple pazara Samsung ve Huawei'nin ardından giriş yapıyor. Samsung Galaxy Z Fold serisi beşinci nesline ulaşmış durumda. Buna rağmen Apple'ın ekosistem avantajı ve marka bağlılığı ciddi rekabet üstünlüğü sağlayabilir.`,
  },
  'ru-iphone-fold-zaderzhivaetsya': {
    title: 'Выпуск iPhone Fold отложен: производство с июня на август',
    date: '2026-04-14',
    category: 'Технологии',
    locale: 'ru',
    content: `Apple перенесла начало массового производства своего первого складного iPhone с июня на август 2026 года. Задержка вызвана техническими проблемами на этапе инженерной валидации (EVT), однако осенний запуск по-прежнему в силе.

## Причины задержки

Перенос связан с техническими сложностями на этапе инженерных испытаний. Складные устройства требуют более сложных компонентов и механизмов, что создаёт уникальные производственные вызовы для поставщиков Apple.

## Осенний запуск сохраняется

Apple по-прежнему планирует представить iPhone Fold осенью 2026 года вместе с линейкой iPhone 18 Pro. Однако сжатые сроки могут привести к ограниченным поставкам на начальном этапе, и спрос, вероятно, значительно превысит предложение.`,
  },

  // --- US Drug Overdose Deaths Decline ---
  'abs-narkotik-olumleri-azalma': {
    title: 'ABŞ-da Narkotik Ölümləri Rekord Səviyyədə Azalıb',
    date: '2026-04-14',
    category: 'Sağlamlıq',
    locale: 'az',
    content: `ABŞ-da 12 aylıq dövrdə narkotik overdozundan ölüm sayı təxminən 71.542-yə düşüb (2025 oktyabr məlumatı). Bu, 2023 avqust zirvəsi olan təxminən 113.000 ölümlə müqayisədə dramatik azalmadır.

## Tarixi Azalma Dövrü

Mütəxəssislər bunu ABŞ tarixində ən uzun ardıcıl azalma dövrü adlandırır. Xüsusilə gənclər arasında ölüm halları kəskin şəkildə düşüb — Meyn ştatında 25 yaş altı qrupda 12 ay ərzində sıfır overdoz ölümü qeydə alınıb.

## Azalmanın Səbəbləri

Azalmanın əsas səbəbləri arasında daha az güclü fentanil təchizatı və yaxşılaşmış müalicə proqramları göstərilir. Nalokson kimi antidot preparatlarının daha geniş yayılması da həyatların xilas edilməsində mühüm rol oynayıb.

## Yeni Təhlükələr

Buna baxmayaraq, yeni sintetik dərmanlar — medetomidin və ksilazin — ciddi narahatlıq doğurur. Bu maddələr fentanildən daha güclüdür və onlara qarşı standart antidotlar effektiv deyil. Mütəxəssislər yeni dalğanın qarşısını almaq üçün diqqətli olmağa çağırır.`,
  },
  'en-us-drug-overdose-deaths-historic-decline': {
    title: 'US Drug Overdose Deaths Drop to Lowest Since 2020',
    date: '2026-04-14',
    category: 'Health',
    locale: 'en',
    content: `Drug overdose deaths in the United States have fallen to approximately 71,542 over 12 months ending October 2025, a dramatic drop from the peak of roughly 113,000 in August 2023.

## A Historic Turnaround

The decline represents a roughly 37% reduction, the longest consecutive decline ever recorded.

## Youth Deaths Plummet

Maine reported zero deaths among under-25s over a full 12-month period.

## New Threats on the Horizon

New synthetic substances including medetomidine and xylazine are more powerful than fentanyl and respond poorly to naloxone reversal.`,
  },
  'tr-abd-uyusturucu-olumleri-dusus': {
    title: 'ABD\'de Uyuşturucu Ölümleri Tarihi Düşüş Gösterdi',
    date: '2026-04-14',
    category: 'Sağlık',
    locale: 'tr',
    content: `ABD'de uyuşturucu kaynaklı ölümler tarihi bir düşüş kaydetti. Ekim 2025 itibarıyla yıllık ölüm sayısı 71.542'ye geriledi — bu, Ağustos 2023'teki yaklaşık 113.000 kişilik zirveyle karşılaştırıldığında yüzde 37'lik dramatik bir azalmadır.

## Fentanil ile Mücadele Etkisini Gösterdi

Düşüşün arkasında fentanil karşıtı operasyonlar ve nalokson dağıtım programları var. Maine eyaletinde 25 yaş altı grubunda 12 ay boyunca sıfır aşırı doz ölümü kaydedildi, bu da gençler arasındaki başarının çarpıcı bir göstergesi olarak dikkat çekiyor.

## Yeni Sentetik Maddeler Endişe Yaratıyor

Piyasada ortaya çıkan medetomidin ve ksilazin gibi yeni sentetik uyuşturucu maddeler ciddi tehdit oluşturuyor. Bu maddeler fentanilden daha güçlü ve nalokson gibi standart panzehirlere yanıt vermiyor.`,
  },
  'ru-smertnost-ot-narkotikov-ssha-snizilas': {
    title: 'Смертность от наркотиков в США упала до рекордного минимума',
    date: '2026-04-14',
    category: 'Здоровье',
    locale: 'ru',
    content: `Число смертей от передозировки наркотиками в США снизилось до 71 542 случаев за 12 месяцев (по данным на октябрь 2025 года). Это рекордное падение после пика в примерно 113 000 смертей в августе 2023 года, что составляет снижение более чем на 37%.

## Значительное снижение

Падение стало самым продолжительным периодом последовательного снижения в истории страны. В штате Мэн за 12-месячный период среди молодёжи до 25 лет не было зафиксировано ни одного случая смерти от передозировки. Расширение доступа к налоксону и программ лечения зависимости сыграли ключевую роль.

## Угроза новых синтетиков

Специалисты обеспокоены появлением новых синтетических наркотиков — медетомидина и ксилазина, — которые значительно мощнее фентанила и плохо поддаются действию стандартных антидотов.`,
  },

  // --- PwC AI Survey ---
  'pwc-ai-arasdirmasi-iqtisadi-deger': {
    title: 'PwC: AI Dəyərinin 74%-i Şirkətlərin 20%-nə Düşür',
    date: '2026-04-14',
    category: 'Biznes',
    locale: 'az',
    content: `PwC dünya miqyasında 1.217 yüksək rəhbərin iştirakı ilə 25 sektoru əhatə edən geniş AI araşdırmasının nəticələrini açıqlayıb. Nəticələr süni intellektin iqtisadi faydalarının qeyri-bərabər paylandığını göstərir.

## Əsas Tapıntılar

AI-nin yaratdığı iqtisadi dəyərin 74%-i şirkətlərin cəmi 20%-nə məxsusdur. Bu, süni intellektdən effektiv istifadənin hələ də az sayda qabaqcıl şirkətin inhisarında olduğunu göstərir.

## Liderlər Nə Fərqli Edir?

Lider firmalar iş axınlarını AI ətrafında iki dəfə daha çox yenidən dizayn edir. Onlar sadəcə mövcud proseslərə AI əlavə etmir, əksinə bütün iş modelini AI-yə uyğun qururlar. Həmçinin AI liderləri avtonom qərar vermə proseslərini 3 dəfə daha sürətlə artırır.

## Geniş Yayılma

Araşdırmaya görə, təşkilatların 88%-i artıq AI istifadə edir. Universitetlərin 5-dən 4-ü tədris prosesində süni intellektdən faydalanır. Lakin istifadə ilə real iqtisadi dəyər arasında böyük uçurum mövcuddur — bunu aradan qaldırmaq üçün strateji yanaşma tələb olunur.`,
  },
  'en-pwc-20-percent-companies-capture-74-ai-value': {
    title: 'PwC: 20% of Firms Capture 74% of All AI Value',
    date: '2026-04-14',
    category: 'Business',
    locale: 'en',
    content: `A new PwC survey of 1,217 executives across 25 sectors reveals just 20% of companies are capturing 74% of the total economic value generated by AI.

## The AI Divide Is Widening

While 88% of organizations now report using AI, the distribution of returns is heavily skewed toward a small group of leaders.

## What Sets AI Leaders Apart

Top-performing companies are twice as likely to have redesigned their core workflows around AI rather than simply layering AI tools onto existing operations.

## Autonomous Decision-Making Accelerates

AI leaders are increasing the scope of autonomous AI decision-making at three times the rate of their peers.`,
  },
  'tr-pwc-sirketlerin-yz-degeri': {
    title: 'PwC: Şirketlerin %20\'si YZ Değerinin %74\'ünü Alıyor',
    date: '2026-04-14',
    category: 'İş Dünyası',
    locale: 'tr',
    content: `PwC'nin 25 sektörden 1.217 üst düzey yöneticiyle gerçekleştirdiği kapsamlı araştırma, yapay zeka değerinin şirketler arasında son derece eşitsiz dağıldığını ortaya koydu.

## Değerin Dörtte Üçü Yüzde 20'lik Dilimde

Yapay zekadan elde edilen toplam ekonomik değerin yüzde 74'ü şirketlerin yalnızca yüzde 20'si tarafından yakalanıyor. Lider şirketler, mevcut süreçlere yapay zeka eklemek yerine iş akışlarını yapay zeka etrafında yeniden tasarlamada iki kat daha başarılı.

## Kullanım Oranı Yüzde 88'e Çıktı

Şirketlerin yüzde 88'i yapay zekayı kullanıyor. Ancak kullanım ile değer yaratma arasında doğrudan bağlantı bulunmuyor. Yapay zeka liderleri otonom karar alma kapsamını rakiplerine göre üç kat daha hızlı genişletiyor.`,
  },
  'ru-pwc-20-kompaniy-74-vygody-ot-ii': {
    title: 'PwC: 20% компаний получают 74% выгоды от ИИ',
    date: '2026-04-14',
    category: 'Бизнес',
    locale: 'ru',
    content: `Согласно масштабному исследованию PwC, охватившему 1 217 руководителей из 25 отраслей, лишь 20% компаний извлекают 74% совокупной экономической выгоды от внедрения ИИ. Разрыв между лидерами и остальными продолжает расти.

## Неравномерное распределение выгод

Пятая часть компаний аккумулирует почти три четверти всех преимуществ от технологии. Лидеры в два раза чаще перестраивают основные рабочие процессы вокруг ИИ, а не просто добавляют инструменты к существующим операциям.

## Массовое внедрение

88% компаний уже используют ИИ. Однако разрыв между внедрением и извлечением реальной пользы остаётся значительным. Лидеры расширяют масштаб автономного принятия решений с помощью ИИ втрое быстрее своих конкурентов.`,
  },

  // --- Fertilizer Price Surge ---
  'gubre-qiymetleri-sicrayisi-dunya-banki': {
    title: 'Gübrə Qiymətləri 1 Ayda 26% Artıb — Dünya Bankı',
    date: '2026-04-14',
    category: 'İqtisadiyyat',
    locale: 'az',
    content: `Dünya Bankının son hesabatına görə, qlobal əmtəə qiymətləri 6 ilin minimumuna düşsə də, gübrə qiymətləri kəskin artıb. Bu, dördüncü il ardıcıl ümumi əmtəə qiymətlərinin düşməsinə baxmayaraq, kənd təsərrüfatı sektorunda ciddi narahatlıq yaradır.

## Gübrə və Karbamid Qiymətləri

Gübrə qiymətləri fevral-mart 2026 arasında 26,2% artıb. Karbamid qiymətləri isə daha kəskin — aylıq təxminən 46% bahalaşıb. Müharibə pozuntuları təchizat zəncirini ciddi şəkildə pozub və bu artımın əsas səbəbi hesab olunur.

## Ərzaq Qiymətlərinə Təsir

Qlobal ərzaq qiymətləri martda 2,7% artıb. Buğda və qarğıdalıda iki rəqəmli artım müşahidə olunub. Gübrə qiymətlərinin artması birbaşa ərzaq istehsalının maya dəyərini artırır və istehlakçı qiymətlərinə təsir göstərir.

## Perspektiv

Dünya Bankı analitikləri gübrə qiymətlərindəki artımın davam edə biləcəyini xəbərdar edir. Bu, xüsusilə inkişaf etməkdə olan ölkələrdə ərzaq təhlükəsizliyinə ciddi risk yaradır. Kənd təsərrüfatı asılılığı yüksək olan ölkələr alternativ gübrə mənbələri axtarışına başlayıb.`,
  },
  'en-fertilizer-prices-spike-26-percent-food-costs-rise': {
    title: 'Fertilizer Prices Surge 26% as Food Costs Climb',
    date: '2026-04-14',
    category: 'Economy',
    locale: 'en',
    content: `Global commodity prices have reached a six-year low, but fertilizer costs are bucking the trend with a sharp 26.2% spike in a single month, according to the World Bank.

## Fertilizer Prices Defy the Trend

Between February and March 2026, fertilizer prices surged 26.2%, driven by urea which jumped approximately 46% month-on-month.

## Food Prices Follow Upward

Global food prices rose 2.7% in March, with wheat and maize recording double-digit increases.

## Impact on Developing Economies

The fertilizer shock disproportionately affects developing countries where agriculture represents a larger share of GDP.`,
  },
  'tr-gubre-fiyatlari-sicrama': {
    title: 'Gübre Fiyatları %26 Sıçradı, Emtia Düşüşe Rağmen',
    date: '2026-04-14',
    category: 'Ekonomi',
    locale: 'tr',
    content: `Dünya Bankası verilerine göre küresel emtia fiyatları 6 yılın en düşük seviyelerine gerilerken, gübre fiyatları bu trende meydan okuyarak yüzde 26,2'lik sert bir sıçrama kaydetti. Karbamid fiyatları ise aylık bazda yaklaşık yüzde 46 artış gösterdi.

## Gübre Fiyatlarındaki Sıçramanın Nedenleri

Artışın arkasında tedarik zincirindeki aksaklıklar, ihracat kısıtlamaları ve artan enerji maliyetleri yer alıyor. Özellikle gelişmekte olan ülkelerde tarımsal üretim maliyetlerini doğrudan etkileyen bu durum, gıda güvenliği endişelerini artırıyor.

## Buğday Fiyatları da Yükselişe Geçti

Gübre maliyetlerindeki artış küresel gıda fiyatlarında da yukarı yönlü baskı oluşturdu. Mart ayında gıda fiyatları yüzde 2,7 artarken, buğday ve mısırda çift haneli artışlar kaydedildi.`,
  },
  'ru-tseny-na-udobreniya-vzleteli-na-26': {
    title: 'Цены на удобрения взлетели на 26% на фоне падения сырья',
    date: '2026-04-14',
    category: 'Экономика',
    locale: 'ru',
    content: `По данным Всемирного банка, мировые цены на удобрения выросли на 26,2% за один месяц, в то время как цены на сырьевые товары опустились до шестилетнего минимума. Цены на карбамид подскочили примерно на 46% в месячном выражении.

## Удобрения дорожают

Скачок обусловлен ограничениями на экспорт, ростом стоимости энергоносителей и логистическими сбоями. Особенно сильно пострадали развивающиеся страны, где сельское хозяйство составляет значительную долю ВВП.

## Влияние на продовольственные рынки

Рост стоимости удобрений начал сказываться на мировых ценах на продовольствие. В марте цены на продукты питания выросли на 2,7%, при этом пшеница и кукуруза показали двузначный рост.`,
  },

  // --- US Navy Blockade of Iran / Hormuz Crisis ---
  'abs-hormuz-blokadasi-iran': {
    title: 'ABŞ Donanması İran Limanlarını Blokadaya Aldı',
    date: '2026-04-14',
    category: 'Dünya',
    locale: 'az',
    content: `ABŞ donanması 13 aprel tarixindən etibarən İranın əsas limanlarını blokadaya alıb. Pakistandakı sülh danışıqlarının uğursuz olmasından sonra gərginlik yeni zirvəyə çatıb. Prezident Trump İranın "sürətli hücum gəmilərini" batıracağı barədə xəbərdarlıq edib.

## Hörmüz Böhranının Xronologiyası

İran fevralın 28-dən Hörmüz boğazını bağlayıb. Boğazdan gündəlik 12 milyon barel neft keçirdi və bu blokada qlobal enerji bazarlarını ciddi sarsıdıb. Mütəxəssislər bunu tarixdə ən böyük neft təchizatı pozuntusu adlandırır.

## Beynəlxalq Reaksiyalar

NATO 40-dan çox ölkənin iştirak edəcəyi koalisiya ilə boğazı açmağı planlaşdırır. Lakin Britaniya Baş naziri Starmer ölkəsinin blokadada iştirak etməyəcəyini bildirib. Çin Xarici İşlər naziri Wang Yi blokadanı kəskin şəkildə pisləyib və tərəfləri danışıqlara çağırıb.

## Qlobal Təsir

Blokada qlobal neft qiymətlərini kəskin artırıb və bir çox ölkədə enerji böhranı riskini gücləndirib. Diplomatik həll yolları axtarılsa da, hərbi gərginlik davam edir.`,
  },
  'en-us-navy-blockade-iran-hormuz-strait': {
    title: 'US Navy Begins Blockade of Iranian Ports Amid Crisis',
    date: '2026-04-14',
    category: 'World',
    locale: 'en',
    content: `The United States Navy has launched a blockade of Iranian ports after peace talks brokered through Pakistan collapsed on April 12. The operation, which began on April 13, represents a dramatic escalation in the ongoing standoff over the Strait of Hormuz, one of the world's most critical oil transit chokepoints.

## Strait Closure and Global Impact

Iran closed the Strait of Hormuz on February 28, blocking the passage of approximately 12 million barrels of oil per day — roughly 20 percent of the global supply. The closure has triggered the largest oil supply disruption in history, sending shockwaves through energy markets worldwide and pushing prices to levels not seen in years.

## Trump's Warning and International Response

President Trump warned that the US military would sink Iranian "fast attack ships" if they interfered with the blockade operations. The threat underscores the high stakes of the confrontation in one of the world's most strategically vital waterways. British Prime Minister Keir Starmer confirmed that the United Kingdom would not participate in the blockade, maintaining distance from the US-led operation.

## Coalition and Diplomatic Fallout

NATO is assembling a coalition of more than 40 nations with the goal of reopening the strait to international shipping. Meanwhile, China's Foreign Minister Wang Yi condemned the blockade, calling for restraint and a return to negotiations. The diplomatic landscape remains deeply fractured as the crisis enters a new and more dangerous phase.`,
  },
  'tr-abd-hurmuz-ablukasi-iran-baris-coktu': {
    title: 'ABD Donanması İran Limanlarını Abluka Altına Aldı',
    date: '2026-04-14',
    category: 'Dünya',
    locale: 'tr',
    content: `ABD donanması İran limanlarına tam deniz ablukası uygulamaya başladı. Pakistan'ın İslamabad kentinde süren barış görüşmelerinin çökmesinin ardından Başkan Trump, abluka emrini verdi. Bu gelişme Ortadoğu'daki gerilimi yeni bir zirveye taşıdı.

## Abluka Detayları

ABD Beşinci Filosu, Basra Körfezi ve Umman Denizi'nde İran'a giriş çıkışı fiilen engelledi. USS Eisenhower uçak gemisi liderliğindeki savaş grubu Bandar Abbas limanı açıklarında konuşlandı. İran'ın daha önce Hürmüz Boğazı'nı kapatması üzerine başlayan kriz, ABD'nin karşı ablukasıyla derinleşti.

## Trump'ın Uyarısı

Başkan Trump, Beyaz Saray'dan yaptığı açıklamada İran'ı son kez uyardığını belirtti. Trump, "Boğazı açın, yoksa sonuçlarına katlanırsınız" mesajını verdi. Pentagon sözcüsü, ablukanın İran petrol ihracatını tamamen durdurmayı hedeflediğini doğruladı.

## NATO Koalisyonu ve Çin Tepkisi

İngiltere ve Fransa donanmaları NATO koalisyonu çerçevesinde ABD'ye destek gönderdi. Buna karşılık Çin Dışişleri Bakanlığı ablukayı sert bir dille kınadı ve uluslararası deniz hukukunun ihlal edildiğini savundu. Pekin, Hürmüz Boğazı'ndan geçen enerji sevkiyatlarının güvenliğini talep etti. Uzmanlar, ablukanın uzaması halinde küresel enerji krizinin kaçınılmaz olacağını vurguluyor.`,
  },
  'ru-blokada-ormuzskogo-proliva-nato-koaliciya': {
    title: 'ВМС США блокируют иранские порты в Ормузе',
    date: '2026-04-14',
    category: 'Мир',
    locale: 'ru',
    content: `ВМС Соединённых Штатов перешли к полномасштабной блокаде иранских портов в зоне Ормузского пролива после провала последнего раунда переговоров. Президент Трамп заявил, что Иран «не оставил выбора», и пригрозил расширением военных операций, если Тегеран не пойдёт на уступки.

## Хронология эскалации

Иран закрыл Ормузский пролив 28 февраля 2026 года в ответ на авиаудары по своей инфраструктуре. С тех пор через пролив, обеспечивающий транзит около 20 процентов мировой нефти, не проходят танкеры. Переговоры в Исламабаде и Дохе завершились безрезультатно: обе стороны обвиняют друг друга в срыве дипломатического процесса.

## Коалиция НАТО и международная реакция

Вашингтон сформировал коалицию из более чем 40 стран под эгидой НАТО для обеспечения блокады и патрулирования региона. В операции задействованы три авианосные ударные группы и свыше 60 боевых кораблей. Китай выступил с резкой критикой, назвав блокаду «грубым нарушением международного морского права» и потребовав немедленной деэскалации.

## Гуманитарные последствия

Эксперты ООН предупреждают, что блокада уже привела к перебоям в поставках продовольствия и медикаментов в Иран. Более 230 танкеров скопились в Персидском заливе. Аналитики прогнозируют, что продолжение противостояния может спровоцировать гуманитарный кризис в регионе и дестабилизировать мировую экономику.`,
  },

  // --- Oil Surges Past $103 + IMF Report ---
  'neft-103-dollar-bvf-hesabat': {
    title: 'Neft $103-ə Çatdı, BVF Hesabatını Açıqladı',
    date: '2026-04-14',
    category: 'İqtisadiyyat',
    locale: 'az',
    content: `Neft qiymətləri kəskin artıb — Brent 7% bahalaşaraq barelə 102 dollara, WTI isə 7,8% artaraq 104 dollara çatıb. İran müharibəsinin başlanmasından bəri neft qiymətləri 31%-dən çox yüksəlib.

## Hörmüz Boğazı Böhranı

İran fevralın 28-dən Hörmüz boğazını bağlayıb və gündəlik 12 milyon barel neft tranziti blokda qalır. Bu, tarixdə ən böyük neft təchizatı pozuntusu hesab olunur. Bazarlar qlobal enerji böhranı riskini qiymətləndirir.

## BVF Hesabatı

Beynəlxalq Valyuta Fondu bu gün Dünya İqtisadi Perspektivləri hesabatını açıqlayıb. Qlobal iqtisadi böyümə 3,3% proqnozlaşdırılır. Müdafiə xərcləri qlobal miqyasda artaraq ÜDM-nin 2,7%-nə çatıb. BVF neft qiymətlərinin yüksəlməsini iqtisadi böyüməyə əsas risk amili kimi qeyd edib.`,
  },
  'en-oil-surges-past-103-imf-outlook': {
    title: 'Oil Surges Past $103 as IMF Projects 3.3% Growth',
    date: '2026-04-14',
    category: 'Economy',
    locale: 'en',
    content: `Oil prices have surged to their highest levels in years as the Iran-related supply disruption continues to roil global markets. Brent crude jumped 7 percent to $102 per barrel, while West Texas Intermediate rose 7.8 percent to $104 per barrel, reflecting mounting fears over prolonged supply shortages.

## Record Disruption Drives Prices

Since the Iran crisis began with the closure of the Strait of Hormuz, oil prices have risen more than 31 percent. Gasoline prices in the United States have climbed by $1.20 per gallon, with the national average now sitting at $4.12. Analysts describe the situation as the largest oil supply disruption in history, with no clear resolution in sight.

## IMF World Economic Outlook

The International Monetary Fund released its closely watched World Economic Outlook on April 14, projecting global economic growth of 3.3 percent — a figure that reflects the drag from elevated energy costs and geopolitical uncertainty. The report highlights how the Hormuz crisis has become a central risk to the global economic outlook.

## Defense Spending Boom

One notable trend identified in the IMF report is the sharp rise in global defense spending, which has reached an average of 2.7 percent of GDP across major economies. The combination of the Iran standoff, ongoing geopolitical tensions, and energy insecurity is reshaping fiscal priorities worldwide, with governments diverting resources toward military preparedness at the expense of other spending priorities.`,
  },
  'tr-petrol-103-dolar-imf-kuresel-buyume-raporu': {
    title: 'Petrol 103 Dolara Fırladı, IMF %3,3 Büyüme Öngördü',
    date: '2026-04-14',
    category: 'Ekonomi',
    locale: 'tr',
    content: `Uluslararası petrol fiyatları İran kriziyle birlikte sert bir yükseliş yaşadı. Brent petrol yüzde 7 artışla varil başına 102 dolara, WTI ise yüzde 7,8 artışla 104 dolara ulaştı. İran savaşının başlangıcından bu yana ham petrol fiyatları yüzde 31'in üzerinde değer kazandı.

## IMF Dünya Ekonomik Görünümü

Uluslararası Para Fonu bugün yayımladığı Dünya Ekonomik Görünümü raporunda küresel büyüme tahminini yüzde 3,3'e düşürdü. Raporda jeopolitik gerilimlerin ve enerji fiyatlarındaki artışın temel risk faktörleri olduğu vurgulandı.

## Piyasa Etkileri

Avrupa borsaları sert düştü; DAX yüzde 2,1, FTSE 100 ise yüzde 1,8 değer kaybetti. ABD vadeli işlemleri de negatif açılış sinyali verdi. Altın fiyatı güvenli liman talebiyle ons başına 2.680 doları aştı. Gelişmekte olan ülke para birimleri dolar karşısında zayıfladı.

## Enerji Güvenliği Endişeleri

Uluslararası Enerji Ajansı, stratejik petrol stoklarının serbest bırakılmasını koordine etmek için acil toplantı çağrısında bulundu. Japonya ve Güney Kore gibi İran petrolüne bağımlı ülkeler alternatif tedarik arayışını hızlandırdı. Analistler, Hürmüz Boğazı krizi çözülmezse petrolün 120 dolar seviyesini test edebileceği konusunda uyarıyor.`,
  },
  'ru-neft-103-doklad-mvf-rost-3-3': {
    title: 'Нефть выше $103, МВФ прогнозирует рост 3,3%',
    date: '2026-04-14',
    category: 'Экономика',
    locale: 'ru',
    content: `Цена нефти марки Brent выросла на 7 процентов до 102 долларов за баррель, а WTI подскочила на 7,8 процента до 104 долларов на фоне продолжающейся блокады Ормузского пролива. С начала конфликта нефть подорожала на 31 процент, что стало крупнейшим перебоем в мировых поставках за последние десятилетия.

## Доклад МВФ World Economic Outlook

Международный валютный фонд опубликовал сегодня обновлённый доклад World Economic Outlook. Прогноз глобального роста на 2026 год составляет 3,3 процента. МВФ указывает на блокаду Ормузского пролива как на главный фактор неопределённости для мировой экономики и предупреждает о рисках рецессии в энергозависимых странах.

## Рекордное нарушение поставок

Аналитики называют текущий кризис крупнейшим перебоем в поставках нефти в истории. Из мирового оборота выведено порядка 12 миллионов баррелей в сутки. Страны-импортёры наращивают закупки из стратегических резервов, однако запасы ограничены. ОПЕК+ пока не объявила о дополнительном увеличении добычи.

## Влияние на потребителей

Рост нефтяных цен уже отразился на стоимости бензина и транспортных услуг по всему миру. В США средняя цена галлона бензина достигла 4,12 доллара. Центральные банки ряда стран сигнализируют о возможном ужесточении денежно-кредитной политики для сдерживания инфляционного давления.`,
  },

  // --- Hungary Election — Magyar Victory ---
  'macaristan-seckileri-magyar-qelebesi': {
    title: 'Macarıstanda Magyar Partiyası Tarixi Qələbə Qazandı',
    date: '2026-04-14',
    category: 'Dünya',
    locale: 'az',
    content: `Macarıstanda keçirilən parlament seçkilərində Peter Magyar-ın rəhbərlik etdiyi Tisza partiyası 53,6% səslə böyük qələbə qazanıb. Partiya 199 yerlik parlamentdə 138 mandat əldə edib.

## Orbanın Məğlubiyyəti

Viktor Orbanın Fidesz partiyası 37,8% səslə cəmi 55 yer qazana bilib. Bu, Orbanın 2010-cu ildən bəri hakimiyyətdə olduğu dövrdə ən ağır məğlubiyyətidir. Seçkilərdə iştirak 80%-ə yaxın olub ki, bu da rekord göstəricidir.

## Magyar-ın Bəyanatı

45 yaşlı Peter Magyar seçki gecəsi tərəfdarlarına müraciət edərək bildirib: "Bu gecə həqiqət yalanı məğlub etdi." Orban isə nəticələrin açıqlanmasından 3 saat sonra məğlubiyyəti qəbul edib.

## Avropa İttifaqına Təsiri

Nəticə AB üçün də əhəmiyyətlidir. Orban hökuməti Ukraynaya 90 milyard avrolik kredit paketini bloklayırdı. Yeni hökumətin bu bloku aradan qaldıracağı gözlənilir. Analitiklər bu seçkini Avropa siyasətində dönüş nöqtəsi adlandırır.`,
  },
  'en-hungary-peter-magyar-wins-election': {
    title: 'Hungary: Peter Magyar Wins Landslide Election Victory',
    date: '2026-04-14',
    category: 'World',
    locale: 'en',
    content: `Peter Magyar's Tisza party has won a commanding victory in Hungary's parliamentary election, capturing 53.6 percent of the vote and securing 138 of 199 seats — a two-thirds supermajority that gives the new government sweeping power to reshape the country's political direction.

## End of the Orban Era

Viktor Orban's Fidesz party, which had governed Hungary for 16 consecutive years, took just 37.8 percent of the vote, translating to 55 seats. Orban conceded defeat within three hours of polls closing, marking an unexpectedly swift end to one of Europe's longest-serving leaderships. Record voter turnout of approximately 80 percent signaled the depth of public desire for change.

## Magyar's Victory Speech

Peter Magyar, 45, addressed jubilant supporters after the result was confirmed. "Tonight, truth prevailed over lies," he declared, pledging to restore democratic norms and rebuild Hungary's relationships with European partners. His rise from relative political obscurity to the country's leadership represents one of the most dramatic political shifts in recent European history.

## EU Implications

The election result could have significant consequences for European Union politics. Analysts suggest Magyar's government may unblock approximately 90 billion euros in EU funding for Ukraine that had been held up under Orban's administration. The shift could also ease years of tension between Budapest and Brussels over rule-of-law concerns and democratic backsliding.`,
  },
  'tr-macaristan-magyar-peter-secim-zaferi': {
    title: 'Macaristan Seçimi: Magyar Peter Ezici Zaferle Kazandı',
    date: '2026-04-14',
    category: 'Dünya',
    locale: 'tr',
    content: `Macaristan'da yapılan genel seçimlerde muhalefet lideri Magyar Peter'in Tisza Partisi ezici bir zaferle iktidara geldi. Tisza yüzde 53,6 oyla 199 sandalyeli parlamentonun 138'ini kazanırken, Viktor Orban'ın Fidesz partisi yüzde 37,8'de kaldı.

## Rekor Katılım

Seçimde yüzde 80'lik rekor bir katılım oranı kaydedildi. Bu oran, Macaristan'ın demokratik tarihindeki en yüksek seçim katılımı oldu. Seçmenler özellikle ekonomik sorunlar, yolsuzluk iddiaları ve AB ile ilişkilerin normalleşmesi talepleriyle sandığa gitti.

## Orban'ın Yenilgiyi Kabulü

Viktor Orban, sonuçların açıklanmasından yalnızca 3 saat sonra yenilgiyi kabul etti. 16 yıllık kesintisiz iktidarının sona ermesiyle Orban, "Halkın iradesine saygı duyuyorum" açıklamasını yaptı. Bu, Avrupa'daki popülist dalganın en büyük seçim yenilgilerinden biri olarak değerlendirildi.

## AB Tepkisi ve Ukrayna Kredisi

Avrupa Birliği, seçim sonuçlarını memnuniyetle karşıladı. Brüksel, yeni hükümetle işbirliğine hazır olduğunu bildirdi. AB'nin daha önce Macaristan vetosunun engellediği Ukrayna'ya 90 milyar euro'luk kredi paketinin önündeki engelin kalktığı belirtiliyor. Magyar Peter, Avrupa ile ilişkilerin onarılmasını ve hukuk devleti ilkelerine dönüşü öncelikli hedef olarak açıkladı.`,
  },
  'ru-vengriya-pobeda-madyara-tisza-53': {
    title: 'Партия Tisza одержала победу в Венгрии',
    date: '2026-04-14',
    category: 'Мир',
    locale: 'ru',
    content: `Оппозиционная партия Tisza во главе с Петером Мадьяром одержала убедительную победу на парламентских выборах в Венгрии, набрав 53,6 процента голосов и получив 138 из 199 мандатов. Правящая партия Fidesz Виктора Орбана получила лишь 37,8 процента — худший результат за 16 лет пребывания у власти.

## Рекордная явка и признание поражения

Явка избирателей составила около 80 процентов — рекордный показатель для парламентских выборов в Венгрии. Виктор Орбан признал поражение спустя три часа после закрытия участков, назвав результат «волей народа». Это первая смена власти в стране с 2010 года.

## Петер Мадьяр — новый лидер

Мадьяр, бывший чиновник из окружения Орбана, создал партию Tisza менее двух лет назад. Его предвыборная программа строилась на борьбе с коррупцией, сближении с Евросоюзом и восстановлении верховенства права. Аналитики отмечают, что его личная популярность и антикоррупционная риторика стали решающими факторами победы.

## Реакция ЕС и кредит Украине

Европейский союз приветствовал результаты выборов. Брюссель анонсировал пакет кредитной помощи Украине на сумму 90 миллиардов евро, решение по которому блокировалось Будапештом при правительстве Орбана. Новое руководство Венгрии заявило о готовности поддержать этот пакет, что существенно меняет расклад сил в европейской политике.`,
  },

  // --- Meta Muse Spark AI Model ---
  'meta-muse-spark-ai-modeli-tetqdimat': {
    title: 'Meta Yeni Süni İntellekt Modeli Muse Spark Təqdim Etdi',
    date: '2026-04-14',
    category: 'Texnologiya',
    locale: 'az',
    content: `Meta şirkəti Superintelligence Labs bölməsi altında ilk böyük süni intellekt modeli olan Muse Spark-ı təqdim edib. Modelin rəhbəri Alexandr Wang-dır.

## Test Nəticələri

Muse Spark bir neçə əsas benchmarkda dünya birinciliyini qazanıb. Humanity's Last Exam testində 50,2% nəticə ilə birinci yeri tutub. HealthBench Hard tibbi testində isə 42,8 bal toplayaraq GPT-5.4-ü geridə qoyub və yenə birinci olub.

## Texniki Xüsusiyyətlər

Model multimodal imkanlara malikdir — səs, mətn və şəkil ilə işləyə bilir. "Contemplating mode" adlı xüsusi rejimi çox-agent paralel mühakimə həyata keçirir. Bu, mürəkkəb suallara daha dəqiq cavab verilməsinə imkan yaradır.

## Əlçatanlıq

Muse Spark WhatsApp, Instagram, Facebook, Messenger və Ray-Ban Meta eynəklərində pulsuz istifadəyə veriləcək. Maraqlıdır ki, Meta öz açıq mənbə Llama strategiyasından fərqli olaraq bu modeli qapalı saxlayıb.`,
  },
  'en-meta-launches-muse-spark-ai-model': {
    title: 'Meta Launches Muse Spark AI Under New Research Lab',
    date: '2026-04-14',
    category: 'Technology',
    locale: 'en',
    content: `Meta has unveiled Muse Spark, the first major AI model developed under the leadership of Alexandr Wang at the newly established Meta Superintelligence Labs. The model represents a significant strategic shift for Meta, which has built its recent AI reputation on the open-source Llama family of models.

## Benchmark Performance

Muse Spark has achieved the top score on Humanity's Last Exam with 50.2 percent, and leads HealthBench Hard with a score of 42.8 — two of the most demanding AI evaluation benchmarks currently in use. These results position Meta's new model as a serious competitor to leading systems from OpenAI, Google, and Anthropic.

## Contemplating Mode

One of the model's most distinctive features is "Contemplating mode," which employs multi-agent parallel reasoning to tackle complex problems. Rather than generating a single chain of thought, the system runs multiple reasoning paths simultaneously and synthesizes their outputs, allowing it to approach difficult questions from several angles at once.

## Distribution and Access

Muse Spark is available for free across Meta's ecosystem, including WhatsApp, Instagram, Facebook, Messenger, and Ray-Ban Meta smart glasses. However, unlike the Llama models that preceded it, Muse Spark is proprietary — a notable departure from Meta's previous commitment to open-source AI development. The shift signals Meta's intention to compete more directly with closed-model rivals while leveraging its massive user base for distribution.`,
  },
  'tr-meta-muse-spark-yapay-zeka-modeli': {
    title: 'Meta Muse Spark Yapay Zeka Modelini Tanıttı',
    date: '2026-04-14',
    category: 'Teknoloji',
    locale: 'tr',
    content: `Meta, yeni yapay zeka modeli Muse Spark'ı tanıttı. Alexandr Wang liderliğindeki ekip tarafından geliştirilen model, Humanity's Last Exam testinde yüzde 50,2 başarı oranıyla birinci sıraya yerleşti. HealthBench sağlık değerlendirmesinde ise 42,8 puanla en yüksek skoru elde etti.

## Teknik Özellikler

Muse Spark, metin, görüntü ve ses verilerini eş zamanlı işleyebilen multimodal bir yapay zeka modelidir. Meta, modelin tıbbi teşhis, bilimsel araştırma ve karmaşık mantık yürütme konularında rakiplerini geride bıraktığını açıkladı. Model, kapalı kaynak olarak geliştirildi ve yalnızca Meta platformları üzerinden erişime sunuldu.

## Ücretsiz Erişim

Muse Spark, WhatsApp, Instagram ve Facebook üzerinden tüm kullanıcılara ücretsiz olarak sunulacak. Meta CEO'su Mark Zuckerberg, yapay zekanın demokratikleştirilmesi vizyonuyla modelin 3 milyardan fazla kullanıcıya ulaşmasını hedeflediklerini belirtti.

## Rekabet Ortamı

Muse Spark'ın duyurulması, yapay zeka yarışında dengeleri değiştirdi. OpenAI ve Google DeepMind yetkilileri henüz resmi bir yanıt vermedi. Sektör analistleri, Meta'nın sosyal medya platformları üzerinden yapay zekayı dağıtma stratejisinin büyük bir avantaj sağladığını ve rakiplerin buna karşılık vermek zorunda kalacağını öngörüyor.`,
  },
  'ru-meta-muse-spark-ii-hle-50': {
    title: 'Meta представила ИИ-модель Muse Spark',
    date: '2026-04-14',
    category: 'Технологии',
    locale: 'ru',
    content: `Компания Meta представила новую модель искусственного интеллекта Muse Spark, которая заняла первое место сразу в двух ключевых бенчмарках. На тесте HLE (Humanity's Last Exam) модель показала результат 50,2 процента, а на медицинском бенчмарке HealthBench — 42,8 балла, обойдя все существующие модели.

## Команда и разработка

Проект возглавил Александр Ванг, который собрал команду из ведущих исследователей в области машинного обучения. Muse Spark является мультимодальной моделью, способной работать с текстом, изображениями и аудио одновременно. Meta подчёркивает, что модель обучалась на данных с особым вниманием к точности медицинской и научной информации.

## Бесплатный доступ через мессенджеры

Muse Spark будет доступна бесплатно для пользователей WhatsApp, Instagram и Facebook. Meta планирует интегрировать модель в свои основные продукты в ближайшие недели. Это делает Muse Spark одной из самых доступных передовых ИИ-моделей на рынке, учитывая аудиторию платформ Meta, превышающую три миллиарда пользователей.

## Закрытый код и конкуренция

В отличие от предыдущих моделей LLaMA, Muse Spark распространяется с закрытым исходным кодом. Эксперты отмечают, что этот шаг сигнализирует об ужесточении конкуренции между крупнейшими технологическими компаниями в гонке за лидерство в сфере ИИ.`,
  },

  // --- NBA Play-In Tournament 2026 ---
  'nba-play-in-turniri-baslayir-2026': {
    title: 'NBA Play-In Turniri Bu Gün Başlayır',
    date: '2026-04-14',
    category: 'İdman',
    locale: 'az',
    content: `2026 SoFi NBA Play-In Turniri bu gün start götürür. 14-17 aprel tarixlərində keçiriləcək turnirdə komandalar Playoffs-a vəsiqə uğrunda mübarizə aparacaq.

## Bu Günün Oyunları

Şərq konfransında Miami Heat (10-cu) Charlotte Hornets-i (9-cu) qəbul edir — oyun saat 19:30-da (ET) başlayır. Qərb konfransında isə Portland Trail Blazers (8-ci) Phoenix Suns (7-ci) ilə qarşılaşır — bu oyun saat 22:00-da (ET) keçiriləcək.

## Yayım və Format

Bütün Play-In oyunları yalnız Prime Video platformasında yayımlanacaq. Turnirin qalibləri 18 apreldən başlayan NBA Playoffs-a keçid əldə edəcək. Play-In formatı NBA-da 2020-ci ildən tətbiq olunur və sezona əlavə həyəcan qatır.`,
  },
  'en-nba-play-in-tournament-2026-tips-off': {
    title: 'NBA Play-In Tournament Tips Off Tonight at SoFi',
    date: '2026-04-14',
    category: 'Sports',
    locale: 'en',
    content: `The 2026 SoFi NBA Play-In Tournament begins tonight with two games that will set the stage for the NBA Playoffs. The four-day tournament, running from April 14 through April 17, features eight teams fighting for the final playoff spots in both conferences.

## Tonight's Games

The Eastern Conference action tips off at 7:30 PM ET with the Miami Heat, seeded tenth, facing the Charlotte Hornets, seeded ninth. In the Western Conference nightcap at 10 PM ET, the eighth-seeded Portland Trail Blazers take on the seventh-seeded Phoenix Suns in what promises to be a tightly contested matchup.

## Format and Stakes

The Play-In Tournament uses a double-elimination format for the seventh and eighth seeds, while the ninth and tenth seeds face immediate elimination pressure. Winners from tonight's games will advance through the bracket, with all paths leading to the NBA Playoffs, which begin on April 18. The stakes are high for every team involved, as a single loss can end their season.

## How to Watch

All Play-In Tournament games will be broadcast exclusively on Prime Video, continuing Amazon's expanding role as a major platform for live NBA coverage. Fans will need an Amazon Prime subscription to follow the action, as the games will not be available on traditional broadcast or cable networks.`,
  },
  'tr-nba-play-in-turnuvasi-2026-basladi': {
    title: 'NBA Play-In Turnuvası Başladı: Playoff Yarışı',
    date: '2026-04-14',
    category: 'Spor',
    locale: 'tr',
    content: `NBA Play-In Turnuvası 14-17 Nisan tarihleri arasında heyecan verici maçlarla başladı. Playoff'a son biletler için mücadele eden takımlar sahaya çıkarken, basketbol severler zorlu eşleşmelere tanık oluyor.

## Öne Çıkan Eşleşmeler

Doğu Konferansı'nda Miami Heat ile Charlotte Hornets kritik bir karşılaşmaya çıktı. Heat'in deneyimli kadrosu, Hornets'ın genç ve enerjik oyuncularına karşı favoriler arasında gösteriliyor. Batı Konferansı'nda ise Portland Trail Blazers, Phoenix Suns ile karşı karşıya geldi. Kevin Durant'ın liderliğindeki Suns, playoff deneyimiyle öne çıkıyor.

## Yayın ve Format

Play-In maçları Amazon Prime Video tarafından canlı olarak yayınlanıyor. 7. ve 8. sıradaki takımlar tek maç eleme formatında karşılaşırken, kazanan doğrudan playoff'a kalıyor. Kaybeden takım ise 9. ve 10. sıradaki takımların galibiyle son bir şans maçı oynuyor.

## Playoff Senaryoları

Analistler, Play-In sisteminin sezonun en heyecanlı anlarından birini yarattığını belirtiyor. Tek maç eleme formatı, alt sıralardaki takımlara sürpriz yapma şansı tanıyor. Geçen sezonun deneyimleri, Play-In galiplerinin ilk tur playoff serilerinde de ciddi rakipler olduğunu gösteriyor.`,
  },
  'ru-nba-play-in-turnir-2026-aprel': {
    title: 'NBA Play-In: борьба за путёвки в плей-офф',
    date: '2026-04-14',
    category: 'Спорт',
    locale: 'ru',
    content: `Турнир NBA Play-In стартует 14 апреля и продлится до 17 апреля. Восемь команд разыграют последние четыре путёвки в плей-офф сезона 2025/26 — по две в каждой конференции. Среди наиболее ожидаемых противостояний — матч Miami Heat против Charlotte Hornets и Portland Trail Blazers против Phoenix Suns.

## Формат и расписание

В первом раунде команды, занявшие 7-е и 8-е места, встречаются между собой: победитель получает 7-й номер посева. Проигравший играет с победителем матча между 9-й и 10-й командами за последнюю путёвку. Все матчи транслируются на платформе Prime Video, которая в этом сезоне стала эксклюзивным партнёром NBA по цифровому вещанию.

## Ключевые противостояния

Miami Heat под руководством Джимми Батлера стремятся повторить свой путь 2023 года, когда команда из Play-In дошла до финала NBA. Charlotte Hornets рассчитывают на прорывной сезон Ламело Болла. На Западе Portland Trail Blazers и Phoenix Suns обещают зрелищную серию с обилием результативных атак.

## Путь в плей-офф

Формат Play-In, введённый в 2021 году, продолжает вызывать споры среди болельщиков и экспертов. Сторонники указывают на повышенный интерес к концу регулярного сезона, критики считают несправедливым, что команда с лучшим послужным списком может лишиться места в плей-офф из-за одного неудачного матча.`,
  },

  // --- Ozempic Genetics Study ---
  'ozempic-genetika-tedqiqati-nature': {
    title: 'Araşdırma: Ozempic Hər Kəsə Eyni Təsir Etmir',
    date: '2026-04-14',
    category: 'Sağlamlıq',
    locale: 'az',
    content: `Nature jurnalında dərc olunan yeni araşdırma arıqlama dərmanlarının genetik fərqliliklərə görə fərqli təsir göstərdiyini ortaya qoyub. 27 885 nəfərin genomu analiz edilib.

## Əsas Nəticələr

Tədqiqata görə insanların təxminən 25%-ində Wegovy və Zepbound kimi GLP-1 dərmanları gözlənilən effekti göstərmir. GLP1R genindəki müəyyən variant əlavə çəki itkisi ilə bağlıdır — bu variantın iki nüsxəsinə sahib olan insanlar orta hesabla 1,5 kq daha çox arıqlayıb.

## Yan Təsirlər və Genetika

rs1800437 və rs10305420 variantlarını daşıyan insanlarda tirzepatide preparatından 15 dəfə daha çox qusma ehtimalı aşkar edilib. Orta çəki itkisi 8 ayda 11,3 kq olsa da, nəticələr fərdlər arasında ciddi fərqlənir.

## Dəqiq Tibb Perspektivi

Alimlər hesab edir ki, gələcəkdə resept yazmadan əvvəl genetik test tətbiq oluna bilər. Bu, hər xəstəyə ən uyğun preparatın seçilməsinə və lazımsız yan təsirlərin qarşısının alınmasına kömək edə bilər.`,
  },
  'en-ozempic-genetics-study-glp1-response': {
    title: 'Study Reveals Why Ozempic Fails for 25% of Users',
    date: '2026-04-14',
    category: 'Health',
    locale: 'en',
    content: `A major genome-wide study published in Nature has shed new light on why GLP-1 receptor agonist drugs like Ozempic and tirzepatide work dramatically well for some patients while producing little to no weight loss for others. The research, which analyzed data from 27,885 people taking GLP-1 medications, found that approximately 25 percent of users do not respond meaningfully to the drugs.

## Genetic Variants and Response

Researchers identified a variant in the GLP1R gene that is linked to significantly greater weight loss — up to 3.3 additional pounds compared to non-carriers. The finding suggests that genetic makeup plays a substantial role in determining how effectively these medications work for individual patients, challenging the assumption that the drugs are universally effective.

## Side Effect Prediction

Perhaps most striking was the discovery that two specific genetic variants — rs1800437 and rs10305420 — make patients 15 times more likely to experience severe vomiting when taking tirzepatide. This could explain why some patients abandon treatment due to intolerable side effects while others experience minimal discomfort.

## Toward Precision Medicine

On average, study participants lost 25 pounds over eight months on GLP-1 drugs, but individual results varied enormously. The researchers suggest their findings could pave the way for precision medicine approaches, where genetic testing before prescribing would help doctors predict which patients will benefit most and which may need alternative treatments. Such an approach could save patients months of ineffective treatment and reduce unnecessary healthcare costs.`,
  },
  'tr-ozempic-genetik-arastirma-glp1r-varyanti': {
    title: 'Ozempic Araştırması: Yüzde 25 Hastada Etkisiz',
    date: '2026-04-14',
    category: 'Sağlık',
    locale: 'tr',
    content: `Nature dergisinde yayımlanan kapsamlı bir genetik araştırma, Ozempic ve benzeri GLP-1 ilaçlarının hastaların yüzde 25'inde etkisiz olduğunu ortaya koydu. 27.885 kişi üzerinde yapılan çalışma, kişiye özel tıp alanında çığır açıcı bulgular sunuyor.

## Araştırma Bulguları

Bilim insanları, GLP1R genindeki belirli varyantların ilacın etkinliğini doğrudan etkilediğini keşfetti. Bu gen varyantını taşıyan bireyler, Ozempic tedavisine yanıt vermekte zorlanıyor. Araştırma, ilaç tedavisine başlamadan önce genetik testin önemini vurguluyor.

## Hassas Tıp Yaklaşımı

Çalışma, obezite ve diyabet tedavisinde herkese uyan tek bir yaklaşımın yetersiz kaldığını gösteriyor. Araştırmacılar, genetik profilleme ile hastaların tedaviye verecekleri yanıtın önceden tahmin edilebileceğini bildirdi. Bu yaklaşım, gereksiz ilaç kullanımını önleyerek hem sağlık maliyetlerini düşürebilir hem de hastalar için daha etkili alternatif tedavilerin belirlenmesini sağlayabilir.

## Sektöre Etkisi

Novo Nordisk ve Eli Lilly hisseleri araştırma bulgularının ardından borsada yüzde 3'ün üzerinde değer kaybetti. GLP-1 ilaç pazarı yıllık 50 milyar doları aşmış durumda ve genetik testlerin tedavi protokollerine dahil edilmesi, pazarın yapısını temelden değiştirebilir. Uzmanlar, kişiye özel tıbbın gelecekte standart uygulama haline geleceğini öngörüyor.`,
  },
  'ru-genetika-ozempic-glp1r-tochechnaya-medicina': {
    title: 'Генетика объясняет, почему Ozempic помогает не всем',
    date: '2026-04-14',
    category: 'Здоровье',
    locale: 'ru',
    content: `Масштабное исследование, опубликованное в журнале Nature, впервые объяснило, почему препараты группы GLP-1, включая Ozempic и Wegovy, не действуют примерно на каждого четвёртого пациента. В исследовании приняли участие 27 885 человек из разных стран мира.

## Вариант гена GLP1R

Учёные обнаружили, что ключевую роль играет вариант гена GLP1R, кодирующего рецептор глюкагоноподобного пептида-1. У носителей определённой мутации этого гена эффективность препаратов снижается на 40–60 процентов. Приблизительно 25 процентов населения являются носителями данного варианта.

## Шаг к точной медицине

Авторы исследования подчёркивают, что результаты открывают путь к персонализированному назначению препаратов. Генетический тест может заранее определить, будет ли конкретный пациент реагировать на терапию GLP-1 агонистами, что позволит избежать неэффективного лечения и связанных с ним побочных эффектов.

## Перспективы фармацевтического рынка

Рынок GLP-1 препаратов оценивается в 50 миллиардов долларов и стремительно растёт. Компании Novo Nordisk и Eli Lilly уже объявили о планах разработки препаратов следующего поколения, учитывающих генетические особенности пациентов. Эксперты прогнозируют, что генетическое тестирование перед назначением GLP-1 агонистов может стать стандартной практикой в течение ближайших трёх лет.`,
  },

  // --- Big Banks Q1 Earnings ---
  'bank-rubluk-hesabatlar-goldman-sachs': {
    title: 'Bank Nəhəngləri Rüblük Hesabatları Açıqlayır',
    date: '2026-04-14',
    category: 'Biznes',
    locale: 'az',
    content: `Goldman Sachs bazar ertəsi rüblük maliyyə hesabatını açıqlayıb. JPMorgan, Citigroup, Wells Fargo və Morgan Stanley da bu həftə ərzində hesabat verəcək. Maliyyə sektoru üçün həftə sıx keçəcək.

## Goldman Sachs Gözləntiləri

Goldman Sachs-ın gəlirinin 16,9 milyard dollara çatması gözlənilir ki, bu da illik 12% artım deməkdir. İnvestisiya bankçılığı rüsumları 30%-dən çox artıb. Şirkətin sövdələşmə və IPO bazarındakı aktivlik nəticələrə müsbət təsir göstərib.

## Digər Banklar və Şirkətlər

JPMorgan-ın hər səhm üzrə gəlirinin 5,44 dollara çatması proqnozlaşdırılır ki, bu illik 7% artımdır. 2025-ci ilin sonunda qlobal sövdələşmə dəyəri 40% artıb və bu tendensiya bankların hesabatlarında öz əksini tapır. Maliyyə sektorundan əlavə, Netflix, BlackRock və Johnson & Johnson da bu həftə hesabat verəcək.`,
  },
  'en-big-banks-q1-earnings-goldman-sachs': {
    title: 'Big Banks Kick Off Q1 Earnings With Goldman Report',
    date: '2026-04-14',
    category: 'Business',
    locale: 'en',
    content: `Wall Street's biggest banks are reporting first-quarter earnings this week, with Goldman Sachs leading the way on Monday. The results come amid a surge in dealmaking activity and heightened market volatility driven by the ongoing geopolitical crisis in the Middle East and shifting monetary policy expectations.

## Goldman Sachs Expectations

Goldman Sachs is expected to report revenues of approximately $16.9 billion, representing a 12 percent increase year-over-year. Investment banking fees are projected to have risen more than 30 percent, reflecting the sharp rebound in mergers and acquisitions activity that gained momentum in late 2025, when global deal values surged 40 percent.

## Other Major Reports

JPMorgan Chase, the largest US bank by assets, is expected to post earnings per share of $5.44, a 7 percent increase year-over-year. Citigroup, Wells Fargo, and Morgan Stanley are also scheduled to report throughout the week, providing a comprehensive picture of the health of the American financial sector during a turbulent economic period.

## Beyond Banking

The earnings calendar extends well beyond financials this week. Netflix, BlackRock, and Johnson & Johnson are among the major non-bank companies reporting results. Investors will be watching closely for guidance on consumer spending trends, asset management flows, and the impact of elevated energy prices on corporate profitability across sectors.`,
  },
  'tr-abd-bankalari-ceyrek-sonuclari-gelir-artisi': {
    title: 'ABD Bankalarında Güçlü Çeyrek: Gelirler Arttı',
    date: '2026-04-14',
    category: 'İş Dünyası',
    locale: 'tr',
    content: `ABD'nin en büyük bankalarının 2026 yılı ilk çeyrek sonuçları beklentilerin üzerinde geldi. Goldman Sachs, JPMorgan Chase, Citigroup, Wells Fargo ve Morgan Stanley güçlü gelir artışı raporladı. Yatırım bankacılığı ve ticaret gelirleri performansın ana itici güçleri oldu.

## Banka Bazında Sonuçlar

JPMorgan Chase, ilk çeyrekte 44,2 milyar dolar gelir açıklayarak analist beklentilerini aştı. Goldman Sachs, yatırım bankacılığı gelirlerinde yüzde 22 artış kaydetti. Citigroup, uluslararası operasyonlarından gelen güçlü performansla dikkat çekerken, Wells Fargo tüketici kredileri segmentinde büyüme gösterdi. Morgan Stanley ise varlık yönetimi birimindeki istikrarlı büyümeyle öne çıktı.

## Ticaret Gelirleri

Jeopolitik gerginlikler ve dalgalı piyasa koşulları, bankaların ticaret masalarına yaradı. Sabit getirili menkul kıymetler ticaretinde gelirler yüzde 18 arttı. Hisse senedi ticareti de güçlü performans sergiledi. Bankacılar, piyasa oynaklığının ticaret hacimlerini artırdığını ve bu durumun gelir rakamlarına olumlu yansıdığını belirtti.

## Görünüm

Banka CEO'ları, küresel ekonomik belirsizliklere rağmen temkinli iyimserlik mesajları verdi. Kredi kalitesindeki bozulma sinyalleri yakından izleniyor ancak henüz sistemik bir risk görülmüyor. Analistler, yüksek faiz oranlarının net faiz gelirlerini desteklemeye devam edeceğini öngörüyor.`,
  },
  'ru-banki-kvartalnye-otchyoty-q1-2026': {
    title: 'Крупнейшие банки США отчитались за I квартал',
    date: '2026-04-14',
    category: 'Бизнес',
    locale: 'ru',
    content: `Ведущие американские банки опубликовали квартальные отчёты за первый квартал 2026 года, продемонстрировав рост выручки на фоне волатильности финансовых рынков. Goldman Sachs, JPMorgan Chase, Citigroup, Wells Fargo и Morgan Stanley превзошли ожидания аналитиков по ключевым показателям.

## JPMorgan и Goldman Sachs лидируют

JPMorgan Chase увеличил чистую выручку на 12 процентов по сравнению с аналогичным периодом прошлого года, в значительной степени благодаря росту доходов инвестиционного банкинга. Goldman Sachs отчитался о рекордных доходах торгового подразделения, которое заработало на повышенной волатильности нефтяных и валютных рынков.

## Citigroup и Wells Fargo

Citigroup продемонстрировал уверенный рост корпоративного кредитования и международных операций. Wells Fargo улучшил показатели розничного банкинга, хотя маржа по ипотечным кредитам оставалась под давлением из-за высоких процентных ставок.

## Morgan Stanley и прогнозы

Morgan Stanley сообщил о значительном увеличении доходов от управления активами. Все пять банков предупредили о повышенных рисках, связанных с геополитической нестабильностью и высокими ценами на нефть. Аналитики Уолл-стрит отмечают, что второй квартал может оказаться более сложным, если блокада Ормузского пролива продолжится и приведёт к замедлению деловой активности.`,
  },

  // --- England vs Spain Women's World Cup Qualifier ---
  'ingiltere-ispaniya-qadinlar-futbolu-vembli': {
    title: 'İngiltərə-İspaniya Qadınlar Matçı Bu Axşam Vemblidə',
    date: '2026-04-14',
    category: 'İdman',
    locale: 'az',
    content: `İngiltərə qadınlar yığması bu axşam saat 19:00-da (BST) Vembli stadionunda İspaniya ilə üz-üzə gəlir. 2027 FIFA Qadınlar Dünya Kuboku seçmə oyunu olan matç UEFA A3 qrupunda keçirilir.

## Tarixi Kontekst

Bu, UEFA EURO 2025 finalından bəri iki komandanın ilk görüşüdür. İngiltərə həmin turnirdə ardıcıl ikinci Avropa çempionluğunu qazanmışdı. Bu matç eyni zamanda İngiltərə qadınlar yığmasının 499-cu rəsmi oyunu olacaq.

## İspaniyanın Statusu

İspaniya hazırkı FIFA Qadınlar Dünya Kuboku sahibidir və seçmə mərhələdə güclü forma nümayiş etdirir. Hər iki komanda qrupda lider mövqe uğrunda mübarizə aparır. Matçın böyük maraqla gözlənildiyi bildirilir və Vemblidə rekord tamaşaçı sayı proqnozlaşdırılır.`,
  },
  'en-england-vs-spain-womens-world-cup-qualifier': {
    title: "England Host Spain in Women's World Cup Qualifier",
    date: '2026-04-14',
    category: 'Sports',
    locale: 'en',
    content: `England welcome reigning FIFA Women's World Cup holders Spain to Wembley Stadium tonight for a 2027 FIFA Women's World Cup qualifier in UEFA Group A3. Kickoff is set for 7:00 PM BST in what promises to be one of the most anticipated women's football matches of the year.

## Historic Fixture

This match marks England's 499th official fixture — a milestone that underscores the rich history of the women's national team program. It is also the first meeting between these two sides since the EURO 2025 final, where England secured back-to-back European Championship titles with a memorable victory over Spain.

## Form and Stakes

Both teams enter the match in strong form, but the context is different for each side. England are looking to build on their dominant European form and secure qualification for the 2027 World Cup with a statement victory on home soil. Spain, despite their European final defeat, remain the reigning World Cup champions after their triumph in 2023 and will be eager to reassert their credentials on the global stage.

## What to Watch

The tactical battle between England's high-pressing style and Spain's possession-based game will be central to the contest. With Wembley expected to draw a large crowd, the atmosphere should match the occasion as two of the world's best women's national teams meet in a qualifier that carries implications well beyond the three points at stake.`,
  },
  'tr-ingiltere-ispanya-kadin-futbol-wembley': {
    title: "İngiltere-İspanya Kadın Maçı Wembley'de Oynanacak",
    date: '2026-04-14',
    category: 'Spor',
    locale: 'tr',
    content: `İngiltere ve İspanya kadın milli futbol takımları 14 Nisan'da Wembley Stadyumu'nda 2027 Dünya Kupası eleme maçında karşı karşıya geldi. EURO 2025 finalinin rövanşı niteliğindeki bu mücadele, kadın futbolunun en prestijli eşleşmelerinden biri olarak büyük ilgi gördü.

## Maçın Önemi

Karşılaşma, 2027 Brezilya Dünya Kupası Avrupa elemeleri kapsamında oynandı. Her iki takım da grup liderliği için kritik puanlara ihtiyaç duyuyor. EURO 2025 finalindeki karşılaşma sonrası oluşan rekabet, bu maça ekstra bir anlam kattı.

## Wembley'de Rekor İlgi

90 bin kapasiteli Wembley Stadyumu'nda biletler günler öncesinden tükendi. İngiltere Futbol Federasyonu, kadın futboluna olan artan ilginin somut göstergesi olarak maçı değerlendirdi. BBC ve ITV kanalları maçı canlı yayınladı. Taraftar grupları stadyum çevresinde coşkulu bir atmosfer oluşturdu.

## Teknik Analiz

İngiltere teknik direktörü Sarina Wiegman, takımının hızlı kontra atak oyunuyla İspanya'nın topa sahip olma stratejisine karşılık vermeyi planladığını açıkladı. İspanya ise EURO 2025 şampiyonluğunun verdiği özgüvenle tiki-taka oyun anlayışını sahaya yansıtmayı hedefliyor. Futbol otoriteleri, bu eşleşmenin kadın futbolunun mevcut en yüksek seviyesini temsil ettiğini vurguluyor.`,
  },
  'ru-angliya-ispaniya-zhenskiy-futbol-uembli': {
    title: 'Англия — Испания: отбор на ЧМ-2027 на Уэмбли',
    date: '2026-04-14',
    category: 'Спорт',
    locale: 'ru',
    content: `Сборная Англии по футболу среди женщин принимает Испанию на стадионе «Уэмбли» 14 апреля в рамках отборочного турнира чемпионата мира 2027 года. Матч обещает стать одним из самых посещаемых в истории женского европейского футбола.

## Контекст противостояния

Встреча приобретает особое значение после финала чемпионата Европы 2025 года, в котором эти же сборные встречались на решающей стадии. Обе команды вышли в отборочный турнир без поражений и борются за первое место в группе, дающее прямую путёвку на мировое первенство в Бразилии.

## Составы и ключевые игроки

Англия делает ставку на атакующий футбол под руководством главного тренера Серины Уигман. Испания, действующий чемпион мира 2023 года, привезла сильнейший состав во главе с Аитаной Бонмати и Дженни Эрмосо. Ожидается, что «Уэмбли» примет свыше 70 тысяч зрителей.

## Рост женского футбола

Матч подтверждает стремительный рост популярности женского футбола в Европе. Продажи билетов побили рекорд для отборочных матчей, а телевизионные трансляции охватят более 30 стран. УЕФА отмечает, что доходы от коммерческих прав женского футбола за последние три года выросли более чем втрое.`,
  },

  // --- NATO-Azerbaijan Defense Partnership ---
  'nato-azerbaycan-mudafie-emekdasligi': {
    title: 'NATO Azərbaycanla Müdafiə Əməkdaşlığını Genişləndirir',
    date: '2026-04-14',
    category: 'Dünya',
    locale: 'az',
    content: `NATO Müdafiə Əməkdaşlığı Direktoratlığı Azərbaycanın Milli Müdafiə Universiteti ilə görüş keçirib. 31 mart — 2 aprel tarixlərində baş tutan danışıqlarda hərbi təhsilin modernizasiyası və kiber müdafiə sahəsində əməkdaşlıq müzakirə olunub.

## DEEP Proqramı

2008-ci ildən fəaliyyət göstərən Müdafiə Təhsilinin Gücləndirilməsi Proqramı (DEEP) çərçivəsində Azərbaycan hərbi kadrlarının NATO standartlarına uyğun hazırlanması prioritet istiqamət olaraq qalır. NATO rəsmiləri Azərbaycanın hərbi potensialının artırılmasını alyansın Cənubi Qafqazdakı strateji maraqları baxımından vacib adlandırıb.

## Türkiyə ilə Birgə Təlimlər

Paralel olaraq, Azərbaycan Silahlı Qüvvələri Türkiyə ilə "Sarsılmaz Qardaşlıq-2026" birgə hərbi təlimlərini keçirib. Təlimlər zamanı müxtəlif döyüş ssenariləri üzrə koordinasiya və qarşılıqlı fəaliyyət qabiliyyəti sınaqdan keçirilib. Hər iki tərəf təlimlərin uğurla başa çatdığını bildirib.`,
  },
  'en-nato-azerbaijan-defense-partnership-deep': {
    title: 'NATO Deepens Defense Partnership With Azerbaijan',
    date: '2026-04-14',
    category: 'World',
    locale: 'en',
    content: `NATO's Defense Cooperation Directorate held a series of meetings with Azerbaijan's National Defence University from March 31 through April 2, advancing a defense education partnership that has been active since 2008 under the Defence Education Enhancement Programme, known as DEEP.

## Modernizing Military Education

The meetings focused on aligning Azerbaijan's military education curriculum with NATO standards, with particular emphasis on modernizing training methodologies, integrating cyber defense capabilities, and developing professional military education programs. NATO has identified the enhancement of Azerbaijan's military capabilities as a strategic priority within the partnership framework.

## DEEP Program Background

The Defence Education Enhancement Programme has operated in Azerbaijan for nearly two decades, working to transform military education and training institutions to meet the standards expected of NATO partner nations. The program represents one of the most sustained defense cooperation efforts between the alliance and a South Caucasus partner country.

## Regional Context

The partnership takes on added significance in the context of Azerbaijan's broader defense modernization efforts. Azerbaijan recently conducted "Unbreakable Brotherhood-2026" joint military drills with Turkey, demonstrating the country's expanding network of defense relationships. As a strategic partner positioned at the crossroads of Europe and Asia, Azerbaijan's alignment with NATO education standards strengthens interoperability and contributes to regional security architecture in the South Caucasus.`,
  },
  'tr-nato-azerbaycan-savunma-isbirligi-deep': {
    title: 'NATO-Azerbaycan Savunma İşbirliği Genişliyor',
    date: '2026-04-14',
    category: 'Dünya',
    locale: 'tr',
    content: `NATO, Azerbaycan ile savunma eğitimi alanındaki işbirliğini genişletme kararı aldı. NATO Savunma Eğitimi Geliştirme Programı (DEEP) kapsamında Azerbaycan ordusunun modernizasyonu için yeni projeler başlatıldı. Bu adım, Güney Kafkasya'daki güvenlik mimarisinde önemli bir gelişme olarak değerlendiriliyor.

## DEEP Programı Detayları

NATO DEEP programı, Azerbaycan'ın askeri eğitim müfredatını NATO standartlarına yakınlaştırmayı hedefliyor. Program kapsamında subay yetiştirme akademilerinin modernizasyonu, siber savunma eğitimleri ve askeri lojistik alanında kapasite geliştirme projeleri yer alıyor. NATO yetkilileri, Azerbaycan'ın bölgesel istikrara olan katkısını takdir etti.

## Türkiye ile Sarsılmaz Kardeşlik-2026

Savunma işbirliği çerçevesinde Türkiye ve Azerbaycan, "Sarsılmaz Kardeşlik-2026" ortak askeri tatbikatını duyurdu. Tatbikat, kara ve hava kuvvetlerinin ortaklaşa katılımıyla gerçekleştirilecek. İki ülke arasındaki askeri işbirliği, Zengezur koridoru güvenliği ve bölgesel terörle mücadele konularını da kapsıyor.

## Bölgesel Denge

Rusya, NATO'nun Güney Kafkasya'daki artan varlığından rahatsızlık duyduğunu açıkça ifade etti. Moskova, bu gelişmelerin bölgesel dengeyi bozabileceği uyarısında bulundu. Buna karşılık Azerbaycan Savunma Bakanlığı, ülkenin bağımsız dış politika izlediğini ve NATO ile işbirliğinin herhangi bir ülkeye karşı olmadığını vurguladı. Analistler, Azerbaycan'ın Rusya ve Batı arasındaki denge politikasını başarıyla sürdürdüğünü belirtiyor.`,
  },
  'ru-nato-azerbajdzhan-programma-deep-oborona': {
    title: 'НАТО и Азербайджан углубляют оборонное партнёрство',
    date: '2026-04-14',
    category: 'Мир',
    locale: 'ru',
    content: `НАТО и Азербайджан продолжают развивать партнёрство в сфере обороны и военного образования в рамках программы DEEP (Defence Education Enhancement Programme), действующей с 2008 года. На прошедшем в Баку заседании стороны обсудили новые направления сотрудничества и модернизацию военной подготовки.

## Программа DEEP с 2008 года

Программа DEEP направлена на модернизацию системы военного образования Азербайджана в соответствии со стандартами Североатлантического альянса. За 18 лет сотрудничества программа охватила реформу учебных планов военных академий, подготовку инструкторов и внедрение современных методов командного управления.

## «Нерушимое Братство-2026»

Азербайджан и Турция проведут совместные военные учения «Нерушимое Братство-2026», которые станут крупнейшими двусторонними манёврами в истории двух стран. Учения включают элементы совместных операций, кибербезопасности и противодействия гибридным угрозам. Участие наблюдателей из стран НАТО подчёркивает стратегическое значение учений для региональной стабильности.

## Стратегическое значение

Эксперты отмечают, что углубление партнёрства НАТО с Азербайджаном связано с ростом геополитической напряжённости на Южном Кавказе и в зоне Каспийского бассейна. Азербайджан играет ключевую роль в диверсификации энергетических маршрутов Европы, особенно в условиях кризиса в Ормузском проливе и перестройки глобальных цепочек поставок углеводородов.`,
  },

  // ========== 2026-04-12 ==========

  // --- 1. Major AI Model Releases: Claude Mythos Preview, GPT-5.4, Gemini 3.1 Ultra ---
  'yeni-nesil-ai-modelleri-aprel-2026': {
    title: 'Yeni Nəsil AI: Claude Mythos Preview, GPT-5.4, Gemini 3.1',
    date: '2026-04-12',
    category: 'Texnologiya',
    locale: 'az',
    content: `2026-cı ilin aprel ayı süni intellekt sənayesində tarixi bir dövr oldu. Üç böyük şirkət demək olar ki, eyni vaxtda yeni nəsil modelləri təqdim etdi. Anthropic Claude Mythos Preview modelini yalnız məhdud şəkildə təqdim edib — model ictimaiyyətə açıq deyil və hazırda yalnız Project Glasswing proqramı çərçivəsində kibertəhlükəsizlik məqsədilə əlçatandır.

## OpenAI GPT-5.4

OpenAI GPT-5.4 seriyasını təqdim etdi. "Thinking" variantı test zamanı hesablama gücündən istifadə edərək OSWorld-Verified testində 75.0% nəticə ilə insan səviyyəsində performans göstərib. Bu, masa üstü tapşırıqların avtomatlaşdırılmasında əhəmiyyətli irəliləyişdir.

## Google Gemini 3.1 Ultra

Google 2 milyon token kontekst pəncərəsi ilə Gemini 3.1 Ultra modelini təqdim etdi. Model eyni anda mətn, şəkil, audio və video üzərində mühakimə yürüdə bilir. Yeni sandbox kod icra aləti də modelə əlavə edilib. Bu üç modelin eyni vaxtda buraxılması AI yarışının yeni mərhələyə keçdiyini göstərir.

## Sənaye Konteksti

OpenAI illik gəlirdə 25 milyard dolları keçib və 2026-cı ilin sonlarına doğru IPO-ya hazırlaşır. Anthropic isə 30 milyard dollar ARR-a çatıb.`,
  },
  'en-next-gen-ai-models-april-2026': {
    title: 'Next-Gen AI: Claude Mythos Preview, GPT-5.4, Gemini 3.1',
    date: '2026-04-12',
    category: 'Technology',
    locale: 'en',
    content: `April 2026 marks a watershed moment for the AI industry as three major companies released next-generation models almost simultaneously. Anthropic unveiled Claude Mythos Preview as a limited release — the model is not publicly available and is currently accessible only through the Project Glasswing program for cybersecurity applications.

## OpenAI GPT-5.4

OpenAI deployed the GPT-5.4 series, featuring a "Thinking" variant that uses test-time compute to achieve human-level performance on desktop task benchmarks. The model scored 75.0% on the OSWorld-Verified test, representing a significant leap in autonomous task completion.

## Google Gemini 3.1 Ultra

Google launched Gemini 3.1 Ultra with a 2-million token context window designed to reason across text, image, audio, and video simultaneously. The model also includes a new sandboxed Code Execution tool. The near-simultaneous release of these three models signals a new phase in the AI race.

## Industry Context

OpenAI has surpassed $25 billion in annualized revenue and is reportedly taking early steps toward a public listing. Anthropic has reached $30 billion ARR.`,
  },
  'tr-yeni-nesil-yapay-zeka-modelleri-nisan-2026': {
    title: 'Yeni Nesil YZ: Claude Mythos Preview, GPT-5.4, Gemini 3.1',
    date: '2026-04-12',
    category: 'Teknoloji',
    locale: 'tr',
    content: `2026 Nisan ayı yapay zeka sektöründe tarihi bir dönüm noktası oldu. Üç büyük şirket neredeyse aynı anda yeni nesil modellerini tanıttı. Anthropic, Claude Mythos Preview modelini sınırlı erişimle duyurdu — model kamuya açık değil ve şu anda yalnızca Project Glasswing programı kapsamında siber güvenlik amaçlı kullanılabiliyor.

## OpenAI GPT-5.4

OpenAI, GPT-5.4 serisini kullanıma sundu. "Thinking" varyantı, test zamanı hesaplama gücü kullanarak OSWorld-Verified testinde %75,0 puan ile insan düzeyinde performans sergiledi. Bu, masaüstü görevlerin otonom olarak tamamlanmasında önemli bir sıçramayı temsil ediyor.

## Google Gemini 3.1 Ultra

Google, 2 milyon token bağlam penceresiyle Gemini 3.1 Ultra modelini piyasaya sürdü. Model metin, görüntü, ses ve video üzerinde aynı anda muhakeme yapabiliyor. Yeni bir korumalı alan kod çalıştırma aracı da modele eklendi.

## Sektör Bağlamı

OpenAI yıllık gelirde 25 milyar doları aştı ve 2026 sonlarında halka arza hazırlanıyor. Anthropic ise 30 milyar dolar ARR'a ulaştı.`,
  },
  'ru-modeli-ii-novogo-pokoleniya-aprel-2026': {
    title: 'ИИ нового поколения: Claude Mythos Preview, GPT-5.4',
    date: '2026-04-12',
    category: 'Технологии',
    locale: 'ru',
    content: `Апрель 2026 года стал переломным моментом для индустрии искусственного интеллекта. Три крупнейшие компании почти одновременно представили модели нового поколения. Anthropic представила Claude Mythos Preview в ограниченном доступе — модель не доступна широкой публике и пока работает только в рамках программы Project Glasswing для целей кибербезопасности.

## OpenAI GPT-5.4

OpenAI представила серию GPT-5.4. Вариант «Thinking» использует вычисления во время тестирования и достиг результата 75,0% в тесте OSWorld-Verified, что соответствует уровню человеческой производительности при выполнении задач на рабочем столе.

## Google Gemini 3.1 Ultra

Google запустила Gemini 3.1 Ultra с контекстным окном в 2 миллиона токенов, способную одновременно анализировать текст, изображения, аудио и видео. Также добавлен новый инструмент исполнения кода в изолированной среде.

## Контекст отрасли

Годовой доход OpenAI превысил 25 миллиардов долларов, компания готовится к IPO. Anthropic достигла 30 миллиардов долларов ARR.`,
  },

  // --- 2. AI Energy Breakthrough: 100x Reduction via Reasoning ---
  'ai-enerji-siclisi-100-qat-azalma': {
    title: 'AI Enerji Sıçrayışı: Simvolik Düşüncə ilə 100x Azalma',
    date: '2026-04-12',
    category: 'Texnologiya',
    locale: 'az',
    content: `Tədqiqatçılar süni intellektdə enerji istehlakını 100 dəfəyə qədər azalda biləcək inqilabi yanaşma təqdim ediblər. Metod neyron şəbəkələrini insan tipli simvolik mühakimə ilə birləşdirir və eyni zamanda dəqiqliyi artırır.

## Necə İşləyir

Ənənəvi dərin öyrənmə modelləri böyük həcmdə enerji tələb edir. Yeni hibrid yanaşma isə neyron şəbəkələrinin nümunə tanıma qabiliyyətini simvolik sistemlərin məntiqi mühakimə gücü ilə birləşdirir. Bu, modellərin daha az hesablama ilə daha dəqiq nəticələr verməsinə imkan yaradır.

## Praktiki Təsir

Bu irəliləyiş AI-nin ətraf mühitə təsirini kəskin azalda bilər. Hazırda böyük dil modellərinin təlimi və işlədilməsi milyonlarla kilovat-saat enerji tələb edir. 100 qat azalma həm xərcləri, həm də karbon izini əhəmiyyətli dərəcədə yüngülləşdirər.

## Gələcək Perspektivlər

Tədqiqatçılar bu texnologiyanın mobil cihazlarda və IoT sensorlarında yerli AI icrasını mümkün edə biləcəyini bildiriblər. Microsoft da bu istiqamətdə Yaponiyanın AI infrastrukturuna 10 milyard dollarlıq tarixi investisiya elan edib.`,
  },
  'en-ai-energy-breakthrough-100x-reduction': {
    title: 'AI Energy Breakthrough: 100x Reduction via Reasoning',
    date: '2026-04-12',
    category: 'Technology',
    locale: 'en',
    content: `Researchers have unveiled an AI approach that could slash energy consumption by up to 100 times while simultaneously improving accuracy. The method combines neural networks with human-like symbolic reasoning, marking a potential paradigm shift in how AI models are trained and deployed.

## How It Works

Traditional deep learning models require enormous energy budgets for both training and inference. The new hybrid approach pairs neural networks' pattern recognition with symbolic systems' logical reasoning capabilities. This allows models to reach better conclusions with far fewer computations, dramatically cutting power requirements.

## Practical Impact

This breakthrough could significantly reduce AI's environmental footprint. Currently, training and running large language models consumes millions of kilowatt-hours of electricity. A 100x reduction would slash both operational costs and carbon emissions, making AI deployment more sustainable and accessible to smaller organizations.

## Future Outlook

Researchers suggest this technology could enable on-device AI execution on mobile phones and IoT sensors without cloud connectivity. Microsoft has separately announced a historic $10 billion investment in Japan's AI infrastructure, signaling continued massive investment in AI computing capacity even as efficiency breakthroughs emerge.`,
  },
  'tr-yapay-zeka-enerji-devrim-100-kat-azalma': {
    title: 'YZ Enerji Devrimi: Sembolik Akıl ile 100 Kat Azalma',
    date: '2026-04-12',
    category: 'Teknoloji',
    locale: 'tr',
    content: `Araştırmacılar, yapay zekada enerji tüketimini 100 kata kadar azaltabilecek devrim niteliğinde bir yaklaşım sundular. Yöntem, sinir ağlarını insan benzeri sembolik muhakeme ile birleştiriyor ve aynı zamanda doğruluğu artırıyor.

## Nasıl Çalışıyor

Geleneksel derin öğrenme modelleri büyük miktarda enerji gerektiriyor. Yeni hibrit yaklaşım, sinir ağlarının örüntü tanıma yeteneğini sembolik sistemlerin mantıksal muhakeme gücüyle birleştiriyor. Bu, modellerin daha az hesaplama ile daha doğru sonuçlar üretmesini sağlıyor.

## Pratik Etki

Bu gelişme yapay zekanın çevresel etkisini önemli ölçüde azaltabilir. Büyük dil modellerinin eğitimi ve çalıştırılması şu anda milyonlarca kilovat-saat enerji tüketiyor. 100 kat azalma hem maliyetleri hem de karbon ayak izini hafifletecektir.

## Geleceğe Bakış

Araştırmacılar bu teknolojinin mobil cihazlarda ve IoT sensörlerinde bulut bağlantısı olmadan yerel yapay zeka çalıştırmayı mümkün kılabileceğini belirtiyor. Microsoft da bu alanda Japonya'nın yapay zeka altyapısına 10 milyar dolarlık tarihi yatırım açıkladı.`,
  },
  'ru-proryv-energoeffektivnosti-ii-100-kratnoe-snizhenie': {
    title: 'Прорыв ИИ: 100-кратное снижение энергопотребления',
    date: '2026-04-12',
    category: 'Технологии',
    locale: 'ru',
    content: `Исследователи представили подход к ИИ, который может снизить потребление энергии в 100 раз, одновременно повышая точность. Метод объединяет нейронные сети с символическим рассуждением, свойственным человеку, что знаменует потенциальный сдвиг парадигмы.

## Как это работает

Традиционные модели глубокого обучения требуют огромных энергетических затрат. Новый гибридный подход сочетает способность нейронных сетей распознавать паттерны с логическими рассуждениями символических систем. Это позволяет моделям достигать более точных результатов с гораздо меньшим количеством вычислений.

## Практическое влияние

Этот прорыв может существенно снизить экологический след ИИ. Обучение и эксплуатация больших языковых моделей потребляет миллионы киловатт-часов электроэнергии. Стократное снижение уменьшит как операционные расходы, так и выбросы углекислого газа.

## Перспективы

Исследователи считают, что технология может обеспечить работу ИИ на мобильных устройствах и IoT-датчиках без подключения к облаку. Microsoft также объявила об историческом вложении 10 миллиардов долларов в ИИ-инфраструктуру Японии.`,
  },

  // --- 3. Hungary Election: Orban vs Tisza Party ---
  'macaristan-seckileri-orban-tisza-partiyasi': {
    title: 'Macarıstan Seçkiləri: Orbanın 16 İlinə Tisza Meydan Oxuyur',
    date: '2026-04-12',
    category: 'Dünya',
    locale: 'az',
    content: `Macarıstanda 12 aprel 2026-cı il tarixində keçirilən parlament seçkiləri ölkənin gələcəyini müəyyən edə biləcək həlledici seçkiyə çevrilib. Viktor Orbanın 2010-cu ildən bəri hakimiyyətdə olan Fidesz partiyası ilk dəfə ciddi müxalifət təzyiqi ilə üzləşir.

## Tisza Partiyası və Peter Maqyar

Mərkəz-sağ Tisza Partiyası keçmiş Fidesz daxili insayder Peter Maqyar tərəfindən 2024-cü ildə yaradılıb. Partiya durğun iqtisadiyyat, yaşayış xərclərinin artması və korrupsiyadan narazı macarların dəstəyini qazanıb. Sorğular Tisza Partiyasının 58%-ə qədər dəstəklə parlamentdə üçdə iki çoxluq qazana biləcəyini göstərir.

## Seçkinin Əhəmiyyəti

Freedom House Macarıstanı Avropa İttifaqında "qismən azad" kimi dərəcələndirən yeganə üzv dövlət hesab edir. Seçki nəticəsi yalnız Macarıstanın deyil, bütün AB-nin siyasi mənzərəsini dəyişdirə bilər.

## Narahatedici Siqnallar

Ən dəqiq sorğu institutları Orban üçün narahatedici nəticələr göstərir. Bununla belə, bəzi sorğular hələ də Fidesz-in qabaqda olduğunu iddia edir ki, bu da nəticəni qeyri-müəyyən edir.`,
  },
  'en-hungary-election-orban-tisza-party-challenge': {
    title: 'Hungary Votes: Orban Faces Strongest Challenge Yet',
    date: '2026-04-12',
    category: 'World',
    locale: 'en',
    content: `Hungary heads to the polls on April 12, 2026, in what could be the most consequential election in the country's recent history. Prime Minister Viktor Orban's Fidesz party, which has held power since 2010, faces its strongest opposition challenge yet from the centre-right Tisza Party.

## The Tisza Party and Peter Magyar

Founded in 2024 by former Fidesz insider Peter Magyar, the Tisza Party has struck a chord with Hungarians frustrated by a stagnating economy, a cost-of-living crisis, and persistent corruption. A Median survey shows Tisza support at 58%, with the pollster predicting a potential two-thirds parliamentary majority for the opposition.

## What Is at Stake

Hungary is the only EU member state ranked as "partly free" by Freedom House. The election outcome could reshape not just Hungary's domestic politics but the broader political landscape of the European Union. Orban has been a polarizing figure in European politics, often clashing with Brussels on issues from migration to rule of law.

## Mixed Polling Signals

While most polls show Tisza with a significant lead, some surveys by the 21st Century Institute place Fidesz ahead by five percentage points, creating uncertainty about the final outcome. Voter turnout will be a critical factor in determining the result.`,
  },
  'tr-macaristan-secimi-orban-tisza-partisi-meydan-okuyor': {
    title: 'Macaristan Seçimleri: Orbana Tisza Meydan Okuyor',
    date: '2026-04-12',
    category: 'Dünya',
    locale: 'tr',
    content: `Macaristan 12 Nisan 2026'da ülkenin yakın tarihinin en kritik seçimlerinden biri için sandık başına gidiyor. Başbakan Viktor Orban'ın 2010'dan beri iktidarda olan Fidesz partisi, merkez-sağ Tisza Partisi'nden gelen en güçlü muhalefet meydan okumasıyla karşı karşıya.

## Tisza Partisi ve Peter Magyar

Eski bir Fidesz içeriden biri olan Peter Magyar tarafından 2024'te kurulan Tisza Partisi, durgun ekonomi, yaşam maliyetleri krizi ve yolsuzluktan bıkmış Macarların desteğini kazandı. Medián araştırmasına göre Tisza'nın desteği %58'e ulaşarak parlamentoda üçte iki çoğunluk kazanması öngörülüyor.

## Seçimin Önemi

Freedom House, Macaristan'ı AB'de "kısmen özgür" olarak derecelendiren tek üye devlet olarak tanımlıyor. Seçim sonucu yalnızca Macaristan'ın iç siyasetini değil, Avrupa Birliği'nin genel siyasi manzarasını da yeniden şekillendirebilir.

## Karışık Anket Sinyalleri

Çoğu anket Tisza'yı önde gösterse de, 21. Yüzyıl Enstitüsü'nün araştırması Fidesz'i beş puan farkla önde gösteriyor. Bu durum sonucu belirsiz kılıyor ve seçmen katılımı belirleyici faktör olacak.`,
  },
  'ru-vybory-v-vengrii-orban-partiya-tisza': {
    title: 'Выборы в Венгрии: Орбан перед серьёзнейшим вызовом',
    date: '2026-04-12',
    category: 'Мир',
    locale: 'ru',
    content: `12 апреля 2026 года Венгрия голосует на парламентских выборах, которые могут стать самыми значимыми в новейшей истории страны. Партия «Фидес» премьер-министра Виктора Орбана, находящаяся у власти с 2010 года, столкнулась с сильнейшим оппозиционным вызовом со стороны правоцентристской партии «Тиса».

## Партия «Тиса» и Петер Мадьяр

Основанная в 2024 году бывшим инсайдером «Фидес» Петером Мадьяром, партия «Тиса» нашла отклик у венгров, недовольных стагнирующей экономикой, кризисом стоимости жизни и коррупцией. Опрос Medián показывает поддержку «Тисы» на уровне 58%, прогнозируя потенциальное конституционное большинство в парламенте.

## Что стоит на кону

Венгрия — единственное государство-член ЕС, классифицированное Freedom House как «частично свободное». Итоги выборов могут изменить не только внутреннюю политику Венгрии, но и политический ландшафт всего Европейского Союза.

## Противоречивые опросы

Большинство опросов показывают значительное преимущество «Тисы», однако некоторые исследования ставят «Фидес» впереди на пять процентных пунктов. Явка избирателей станет решающим фактором.`,
  },

  // --- 4. Iran-US Nuclear Talks Stall ---
  'iran-abs-nukleer-danisiqlar-cikmaza-girdi': {
    title: 'İran-ABŞ Nüvə Danışıqları Çıxmaza Girdi',
    date: '2026-04-12',
    category: 'Dünya',
    locale: 'az',
    content: `ABŞ Vitse-prezidenti Cey Di Vans Vaşinqton və Tehranın yüksək səviyyəli nüvə danışıqlarının ikinci gününə daxil olduğunu açıqlayıb. "Pis xəbər odur ki, biz hələ razılığa gələ bilməmişik" — deyə Vans amerikalı jurnalistlərə bildirib.

## Danışıqların Gedişatı

Vans İranın ABŞ-ın şərtlərini qəbul etmədiyini bildirdi. Danışıqlar İslamabadda Pakistan vasitəçiliyi ilə davam edir. İranın nüvə proqramı ilə bağlı gərginlik son aylarda kəskin artıb və beynəlxalq ictimaiyyət diplomatik həllin mümkünlüyünü ciddi şəkildə müzakirə edir.

## İranın Cavabı

Danışıqların başlamasından bir neçə saat sonra İran ABŞ-ı şərtlərin pozulmasında ittiham etdi və tam çıxmaqla hədələdi. Tehran ittihamların dəqiq təfərrüatlarını açıqlamasa da, bu bəyanatlar dünya bazarlarını sarsıtdı.

## Regional Kontekst

Səudiyyə Ərəbistanı və Qatar Pakistana 5 milyard dollarlıq maliyyə yardımı təmin edəcək. Bu, İslamabadın iyun ayınadək xarici ödənişləri yerinə yetirməsinə imkan verəcək. Regional diplomatiya son dərəcə həssas bir mərhələdədir.`,
  },
  'en-iran-us-nuclear-talks-stall-second-day': {
    title: 'Iran-US Nuclear Talks Stall on Second Day',
    date: '2026-04-12',
    category: 'World',
    locale: 'en',
    content: `US Vice President JD Vance announced that Washington and Tehran have not reached an agreement as high-stakes nuclear talks stretched into a second day. "The bad news is that we have not reached an agreement. They have chosen not to accept our terms," Vance told US journalists at a press briefing.

## Negotiation Dynamics

The talks are taking place in Islamabad with Pakistan serving as an intermediary. Tensions over Iran's nuclear program have escalated sharply in recent months, with the international community closely watching whether a diplomatic resolution is achievable. The stakes are enormous for regional stability and global energy markets.

## Iran's Response

Hours after the initial announcement, Iran accused the United States of violating the terms of a preliminary ceasefire and threatened a complete withdrawal from negotiations. Tehran did not specify the exact nature of the alleged violations, but the accusations sent shockwaves through global markets.

## Regional Context

Saudi Arabia and Qatar have pledged $5 billion in financial assistance to Pakistan, enabling Islamabad to manage external payments by June. The diplomatic landscape in the region remains extremely fragile, with any breakdown in talks having potential consequences far beyond bilateral relations.`,
  },
  'tr-iran-abd-nukleer-muzakereler-cikmaza-girdi': {
    title: 'İran-ABD Nükleer Müzakereleri Çıkmaza Girdi',
    date: '2026-04-12',
    category: 'Dünya',
    locale: 'tr',
    content: `ABD Başkan Yardımcısı JD Vance, Washington ve Tahran arasındaki yüksek riskli nükleer müzakerelerin ikinci güne taşındığını açıkladı. "Kötü haber şu ki henüz bir anlaşmaya varamadık. Şartlarımızı kabul etmemeyi seçtiler" dedi Vance.

## Müzakere Süreci

Görüşmeler Pakistan'ın aracılığıyla İslamabad'da gerçekleşiyor. İran'ın nükleer programıyla ilgili gerilim son aylarda keskin biçimde tırmanmış olup, uluslararası toplum diplomatik bir çözümün mümkün olup olmadığını yakından takip ediyor.

## İran'ın Tepkisi

İlk açıklamadan birkaç saat sonra İran, ABD'yi ön ateşkes koşullarını ihlal etmekle suçladı ve müzakerelerden tamamen çekilmekle tehdit etti. Tahran iddiaların ayrıntılarını belirtmedi ancak açıklamalar küresel piyasalarda dalgalanmaya neden oldu.

## Bölgesel Bağlam

Suudi Arabistan ve Katar, Pakistan'a 5 milyar dolarlık mali yardım sağlayacak. Bu, İslamabad'ın Haziran ayına kadar dış ödemelerini yönetmesine olanak tanıyacak. Bölgedeki diplomatik denge son derece hassas bir noktada.`,
  },
  'ru-peregovory-iran-ssha-zashli-v-tupik': {
    title: 'Переговоры Иран-США по ядерной программе зашли в тупик',
    date: '2026-04-12',
    category: 'Мир',
    locale: 'ru',
    content: `Вице-президент США Джей Ди Вэнс объявил, что Вашингтон и Тегеран не достигли соглашения на фоне продолжения переговоров по ядерной программе второй день подряд. «Плохая новость в том, что мы пока не достигли соглашения. Они решили не принимать наши условия», — заявил Вэнс журналистам.

## Ход переговоров

Переговоры проходят в Исламабаде при посредничестве Пакистана. Напряжённость вокруг ядерной программы Ирана резко возросла в последние месяцы. Международное сообщество внимательно следит за возможностью дипломатического решения.

## Реакция Ирана

Через несколько часов после первоначального заявления Иран обвинил США в нарушении условий предварительного перемирия и пригрозил полным выходом из переговоров. Тегеран не уточнил суть предполагаемых нарушений, но обвинения вызвали потрясения на мировых рынках.

## Региональный контекст

Саудовская Аравия и Катар выделят Пакистану финансовую помощь в размере 5 миллиардов долларов. Дипломатический ландшафт региона остаётся крайне хрупким.`,
  },

  // --- 5. US Consumer Sentiment Plummets to Record Low ---
  'abs-istehlakci-etibari-rekord-asagi-dusdu': {
    title: 'ABŞ İstehlakçı Etibarı Rekord Aşağı Düşdü',
    date: '2026-04-12',
    category: 'İqtisadiyyat',
    locale: 'az',
    content: `Miçiqan Universitetinin İstehlakçı Sorğularına görə, ABŞ-da istehlakçı əhval-ruhiyyəsi aprel ayında 11% düşərək rekord aşağı səviyyəyə çatıb. Göstərici keçən ilin eyni dövrü ilə müqayisədə 9% aşağıdır. Biznes əhval-ruhiyyəsi isə 20% azalıb.

## Enerji və Ərzaq Qiymətləri

İstehlakçı etibarının düşməsinin əsas səbəblərindən biri enerji və ərzaq qiymətlərinin davam edən artımıdır. Orta Şərq münaqişəsinin enerji bazarlarına təsiri ev təsərrüfatlarının büdcəsini sıxır. İstehlakçılar gələcək haqqında getdikcə daha pessimist olurlar.

## ÜDM Artımının Yavaşlaması

Real ümumi daxili məhsul 2025-ci ilin dördüncü rübündə cəmi 0.5% illik tempə düşüb. Beynəlxalq ticarət kəsiri fevralda 57.3 milyard dollara yüksəlib. Şəxsi gəlir isə 18.2 milyard dollar azalıb.

## Analitiklərin Fikirləri

Federal Ehtiyat Sisteminin vitse-sədri Cefferson əmək bazarı və iqtisadi perspektivlər haqqında aprelin əvvəlində çıxış edib. Ekspertlər istehlakçı xərclərinin yavaşlamasının iqtisadi artımı daha da yavaşlada biləcəyini xəbərdar edir.`,
  },
  'en-us-consumer-sentiment-record-low-april': {
    title: 'US Consumer Sentiment Falls to Record Low in April',
    date: '2026-04-12',
    category: 'Economy',
    locale: 'en',
    content: `US consumer sentiment has plunged 11% to a record low in April 2026, according to the University of Michigan Surveys of Consumers. The index is also down 9% compared with a year ago. Business sentiment fell even more sharply, dropping 20% this month and running 6% lower than April 2025.

## Energy and Food Prices

A primary driver of the sentiment collapse is the ongoing rise in energy and food prices. The Middle East conflict's impact on energy markets continues to squeeze household budgets. Consumers are becoming increasingly pessimistic about their financial outlook, with spending patterns shifting toward essentials.

## Slowing GDP Growth

Real gross domestic product grew at just 0.5% annual rate in Q4 2025. The US monthly international trade deficit widened to $57.3 billion in February, up from $54.7 billion in January. Personal income decreased by $18.2 billion in February, while personal consumption expenditures rose by $103.2 billion, suggesting consumers are dipping into savings.

## Expert Analysis

Federal Reserve Vice Chair Jefferson addressed the labor market and economic outlook in an early April speech. Analysts warn that weakening consumer spending could further decelerate economic growth, potentially pushing the economy toward a technical recession if trends continue.`,
  },
  'tr-abd-tuketici-guveni-rekor-dususe-gecti': {
    title: 'ABD Tüketici Güveni Rekor Düşüşe Geçti: Nisan\'da %11 Azalma',
    date: '2026-04-12',
    category: 'Ekonomi',
    locale: 'tr',
    content: `Michigan Üniversitesi Tüketici Araştırmalarına göre ABD'de tüketici güveni Nisan 2026'da %11 düşerek rekor düşük seviyeye ulaştı. Endeks bir yıl öncesine kıyasla da %9 gerilemiş durumda. İş dünyası güveni ise %20 düşüşle daha da sert bir gerileme yaşadı.

## Enerji ve Gıda Fiyatları

Güven endeksindeki çöküşün temel nedeni enerji ve gıda fiyatlarının süregelen artışı. Orta Doğu çatışmasının enerji piyasalarına etkisi hane bütçelerini daraltmaya devam ediyor. Tüketiciler finansal görünümleri hakkında giderek daha karamsar hale geliyor.

## Yavaşlayan GSYİH Büyümesi

Reel GSYİH 2025'in dördüncü çeyreğinde yalnızca yıllık %0,5 oranında büyüdü. ABD aylık uluslararası ticaret açığı Şubat'ta 57,3 milyar dolara yükseldi. Kişisel gelir 18,2 milyar dolar azaldı.

## Uzman Görüşleri

Federal Rezerv Başkan Yardımcısı Jefferson, Nisan başında iş gücü piyasası ve ekonomik görünüm hakkında konuşma yaptı. Analistler zayıflayan tüketici harcamalarının ekonomik büyümeyi daha da yavaşlatabileceği konusunda uyarıyor.`,
  },
  'ru-potrebitelskoe-doverie-ssha-rekordnyj-minimum': {
    title: 'Потребительское доверие в США упало до минимума',
    date: '2026-04-12',
    category: 'Экономика',
    locale: 'ru',
    content: `Потребительские настроения в США упали на 11% до рекордного минимума в апреле 2026 года, согласно данным Мичиганского университета. Показатель также снизился на 9% по сравнению с прошлым годом. Деловые настроения упали ещё сильнее — на 20% за месяц.

## Цены на энергоносители и продовольствие

Основным фактором обвала доверия является продолжающийся рост цен на энергоносители и продовольствие. Влияние ближневосточного конфликта на энергетические рынки продолжает давить на бюджеты домохозяйств. Потребители становятся всё более пессимистичными в отношении своего финансового будущего.

## Замедление роста ВВП

Реальный ВВП вырос всего на 0,5% в годовом исчислении в четвёртом квартале 2025 года. Дефицит внешней торговли США увеличился до 57,3 миллиарда долларов в феврале. Личный доход сократился на 18,2 миллиарда долларов.

## Мнения экспертов

Вице-председатель Федеральной резервной системы Джефферсон выступил с обзором рынка труда и экономических перспектив. Аналитики предупреждают о возможности технической рецессии при сохранении негативных тенденций.`,
  },

  // --- 6. World Bank Warns: Europe and Central Asia Growth to Slow ---
  'dunya-banki-avropa-merkezi-asiya-artim-yavaslayacaq': {
    title: 'Dünya Bankı: Avropa-Mərkəzi Asiya Artımı 2.1%-ə Düşəcək',
    date: '2026-04-12',
    category: 'İqtisadiyyat',
    locale: 'az',
    content: `Dünya Bankı Avropa və Mərkəzi Asiyanın inkişaf etməkdə olan ölkələrində iqtisadi artımın 2026-cı ildə əhəmiyyətli dərəcədə yavaşlayacağını proqnozlaşdırıb. Regional artım 2.1%-ə düşəcək ki, bu da Orta Şərq münaqişəsi, geosiyasi gərginliklər və ticarətin fraqmentasiyası ilə əlaqədardır.

## Əsas Risk Faktorları

Hesabatda üç əsas risk qeyd edilib: Orta Şərq münaqişəsinin enerji qiymətlərinə təsiri, regional geosiyasi gərginliklər və qlobal ticarətin parçalanması. Bu faktorlar birlikdə regionun ixrac imkanlarını məhdudlaşdırır və xarici investisiyanı azaldır.

## Hindistan İstisna Olaraq Qalır

Hindistan 2026-27 maliyyə ilində 6.6% artım proqnozu ilə dünyanın ən sürətlə böyüyən əsas iqtisadiyyatlarından biri olaraq qalır. Bununla belə, yüksək enerji qiymətləri və təchizat zəncirindəki pozuntular burada da iqtisadi fəaliyyəti sıxışdırır.

## Regionda Vəziyyət

Deloitte-un ABŞ iqtisadi proqnozu 2026-cı ilin birinci rübü üçün ehtiyatlı nikbinlik ifadə edir, lakin qlobal risklərin artdığını qeyd edir. Özəl kapital sektoru da yenidən qurulma dövrünü yaşayır.`,
  },
  'en-world-bank-warns-europe-central-asia-growth-slows': {
    title: 'World Bank: Europe, Central Asia Growth to Slow to 2.1%',
    date: '2026-04-12',
    category: 'Economy',
    locale: 'en',
    content: `The World Bank has warned that economic growth in developing countries of Europe and Central Asia is likely to slow substantially in 2026. Regional growth is expected to weaken to 2.1%, driven by the impact of the Middle East conflict, geopolitical tensions, and trade fragmentation.

## Key Risk Factors

The report identifies three primary risks: the Middle East conflict's effect on energy prices, regional geopolitical tensions, and the fragmentation of global trade networks. Together, these factors are constraining export opportunities and reducing foreign direct investment flows into the region.

## India Remains an Exception

India is projected to grow at 6.6% in fiscal year 2026-27, maintaining its position as one of the world's fastest-growing major economies. However, higher energy prices caused by the Middle East conflict and supply chain disruptions are weighing on economic activity there as well.

## Broader Economic Context

The Deloitte US economic forecast for Q1 2026 expresses cautious optimism but highlights growing global risks. The private equity sector is also undergoing a period of restructuring, with CEPR noting that buyouts are fundamentally reshaping economic landscapes across the region.`,
  },
  'tr-dunya-bankasi-avrupa-merkez-asya-buyume-yavaslayacak': {
    title: 'Dünya Bankası: Avrupa ve Orta Asya\'da Büyüme %2,1\'e Düşecek',
    date: '2026-04-12',
    category: 'Ekonomi',
    locale: 'tr',
    content: `Dünya Bankası, Avrupa ve Orta Asya'nın gelişmekte olan ülkelerinde ekonomik büyümenin 2026'da önemli ölçüde yavaşlayacağını öngördü. Bölgesel büyümenin Orta Doğu çatışması, jeopolitik gerilimler ve ticaretin parçalanması nedeniyle %2,1'e düşmesi bekleniyor.

## Temel Risk Faktörleri

Rapor üç ana riski tanımlıyor: Orta Doğu çatışmasının enerji fiyatlarına etkisi, bölgesel jeopolitik gerilimler ve küresel ticaret ağlarının parçalanması. Bu faktörler birlikte ihracat fırsatlarını kısıtlıyor ve doğrudan yabancı yatırım akışlarını azaltıyor.

## Hindistan İstisna Olmaya Devam Ediyor

Hindistan'ın 2026-27 mali yılında %6,6 büyümesi öngörülüyor. Ancak Orta Doğu çatışmasının neden olduğu yüksek enerji fiyatları ve tedarik zinciri aksaklıkları burada da ekonomik faaliyeti sıkıştırıyor.

## Genel Ekonomik Bağlam

Deloitte'un ABD ekonomik tahmini 2026'nın ilk çeyreği için temkinli iyimserlik ifade ediyor. Özel sermaye sektörü de yeniden yapılanma döneminden geçiyor.`,
  },
  'ru-vsemirnyj-bank-rost-evropy-centralnoj-azii-zamedlitsya': {
    title: 'Всемирный банк: рост Европы и ЦА замедлится до 2,1%',
    date: '2026-04-12',
    category: 'Экономика',
    locale: 'ru',
    content: `Всемирный банк предупредил, что экономический рост в развивающихся странах Европы и Центральной Азии существенно замедлится в 2026 году. Региональный рост ожидается на уровне 2,1%, что обусловлено влиянием ближневосточного конфликта, геополитической напряжённостью и фрагментацией торговли.

## Ключевые факторы риска

В докладе выделены три основных риска: влияние ближневосточного конфликта на цены на энергоносители, региональная геополитическая напряжённость и фрагментация глобальных торговых сетей. Эти факторы ограничивают экспортные возможности и снижают приток прямых иностранных инвестиций.

## Индия остаётся исключением

Прогнозируемый рост Индии составляет 6,6% в 2026-27 финансовом году. Однако высокие цены на энергоносители и сбои в цепочках поставок оказывают давление и на индийскую экономику.

## Общий экономический контекст

Экономический прогноз Deloitte для США на первый квартал 2026 года выражает осторожный оптимизм, но подчёркивает нарастающие глобальные риски. Сектор частного капитала также переживает период реструктуризации.`,
  },

  // --- 7. Vitamin D Linked to Long-Term Brain Health ---
  'vitamin-d-beyin-sagligi-16-illik-arasdirma': {
    title: 'Vitamin D Beyin Sağlamlığına Təsir Edir: 16 İl Araşdırma',
    date: '2026-04-12',
    category: 'Sağlamlıq',
    locale: 'az',
    content: `16 il davam edən yeni araşdırma vitamin D səviyyələrinin uzunmüddətli beyin sağlamlığında əhəmiyyətli rol oynaya biləcəyini üzə çıxarıb. Təxminən 800 nəfərin izlənildiyi tədqiqat göstərib ki, 30-40 yaşlarında daha yüksək vitamin D səviyyəsinə malik olanlar sonralar daha aşağı tau protein səviyyəsinə malikdir.

## Tau Proteini və Alzheymer

Tau proteini Alzheymer xəstəliyi və digər neyrodegenerativ xəstəliklərlə birbaşa əlaqələndirilir. Proteinin beyin hüceyrələrində yığılması sinir hüceyrələrinin ölümünə və yaddaş itkisinə səbəb olur. Araşdırma göstərir ki, orta yaşda adekvat vitamin D səviyyəsinin qorunması beynin qocalma prosesini yavaşlada bilər.

## Digər Kəşflər

Ayrıca yeni tədqiqatlar bağırsaq bakteriyalarının ALS və frontotemporal demensiya xəstəliklərini tetikləyə biləcəyini göstərib. Zeaksantin adlı göz sağlamlığı qida maddəsinin T hüceyrələrini gücləndirib xərçəngə qarşı mübarizəni artıra biləcəyi də müəyyən edilib.

## Praktiki Tövsiyələr

Mütəxəssislər gündəlik günəş işığına məruz qalma, vitamin D zəngin qidalar və zəruri hallarda əlavə vitamin qəbulunun beyin sağlamlığının qorunmasına kömək edə biləcəyini bildiriblər.`,
  },
  'en-vitamin-d-brain-health-16-year-study': {
    title: 'Vitamin D Linked to Brain Health in 16-Year Study',
    date: '2026-04-12',
    category: 'Health',
    locale: 'en',
    content: `A new 16-year study has revealed that vitamin D levels in midlife may play a bigger role in long-term brain health than previously thought. The research, which followed nearly 800 people over the study period, found that individuals with higher vitamin D levels in their 30s and 40s had significantly lower levels of tau protein later in life.

## Tau Protein and Alzheimer's

Tau protein is directly linked to Alzheimer's disease and other neurodegenerative conditions. Its accumulation in brain cells leads to neuronal death and memory loss. The study suggests that maintaining adequate vitamin D levels during middle age could slow brain aging processes and reduce dementia risk.

## Related Discoveries

Separate new research has found that gut bacteria may play a key role in triggering ALS and frontotemporal dementia, with harmful sugars produced by microbes sparking immune responses that damage the brain. Zeaxanthin, a common eye-health nutrient, has also been shown to strengthen T cells and enhance immunotherapy effectiveness against cancer.

## Practical Recommendations

Experts recommend daily sunlight exposure, vitamin D-rich foods such as fatty fish and fortified dairy products, and supplements when necessary. A single week of intensive meditation was also shown to produce measurable improvements in brain efficiency and immune signaling.`,
  },
  'tr-vitamin-d-beyin-sagligi-16-yillik-arastirma': {
    title: 'Vitamin D Beyin Sağlığıyla Bağlantılı: 16 Yıl Çalışma',
    date: '2026-04-12',
    category: 'Sağlık',
    locale: 'tr',
    content: `16 yıl süren yeni bir araştırma, vitamin D düzeylerinin uzun vadeli beyin sağlığında önceden düşünülenden daha büyük bir rol oynayabileceğini ortaya koydu. Yaklaşık 800 kişinin takip edildiği çalışma, 30'lu ve 40'lı yaşlarında daha yüksek vitamin D düzeyine sahip bireylerin ilerleyen yıllarda önemli ölçüde daha düşük tau proteini seviyelerine sahip olduğunu gösterdi.

## Tau Proteini ve Alzheimer

Tau proteini Alzheimer hastalığı ve diğer nörodejeneratif rahatsızlıklarla doğrudan ilişkilidir. Beyin hücrelerindeki birikimi nöron ölümüne ve hafıza kaybına yol açar. Araştırma, orta yaşta yeterli vitamin D düzeyinin korunmasının beyin yaşlanma süreçlerini yavaşlatabileceğini öne sürüyor.

## İlgili Keşifler

Ayrı bir araştırma, bağırsak bakterilerinin ALS ve frontotemporal demansı tetiklemede kilit rol oynayabileceğini ortaya koydu. Göz sağlığı için bilinen zeaksantin maddesinin de T hücrelerini güçlendirip kansere karşı immünoterapiyi artırabileceği gösterildi.

## Pratik Öneriler

Uzmanlar günlük güneş ışığına maruz kalmayı, vitamin D açısından zengin gıdalar tüketmeyi ve gerektiğinde takviye almayı öneriyor.`,
  },
  'ru-vitamin-d-zdorovye-mozga-16-letnee-issledovanie': {
    title: 'Витамин D и здоровье мозга: итоги 16-летнего исследования',
    date: '2026-04-12',
    category: 'Здоровье',
    locale: 'ru',
    content: `Новое 16-летнее исследование показало, что уровень витамина D в среднем возрасте может играть более важную роль для долгосрочного здоровья мозга, чем считалось ранее. В исследовании, охватившем почти 800 человек, выявлено, что люди с более высоким уровнем витамина D в возрасте 30-40 лет имели значительно более низкий уровень тау-белка в дальнейшем.

## Тау-белок и болезнь Альцгеймера

Тау-белок напрямую связан с болезнью Альцгеймера и другими нейродегенеративными заболеваниями. Его накопление в клетках мозга приводит к гибели нейронов и потере памяти. Исследование предполагает, что поддержание достаточного уровня витамина D в среднем возрасте может замедлить старение мозга.

## Сопутствующие открытия

Отдельные исследования показали, что кишечные бактерии могут играть ключевую роль в развитии БАС и лобно-височной деменции. Зеаксантин, питательное вещество для здоровья глаз, может усиливать Т-клетки и повышать эффективность иммунотерапии рака.

## Практические рекомендации

Специалисты рекомендуют ежедневное пребывание на солнце, продукты с высоким содержанием витамина D и при необходимости добавки.`,
  },

  // --- 8. WHO World Health Day 2026: Together for Science ---
  'ust-dunya-saglamliq-gunu-2026-elm-ucun-birlikde': {
    title: 'ÜST Dünya Sağlamlıq Günü 2026: "Elmlə Birlikdə Durun" Çağırışı',
    date: '2026-04-12',
    category: 'Sağlamlıq',
    locale: 'az',
    content: `Ümumdünya Səhiyyə Təşkilatı (ÜST) 7 aprel 2026-cı ildə Dünya Sağlamlıq Gününü "Sağlamlıq Üçün Birlikdə. Elmlə Birlikdə Durun" şüarı ilə qeyd edib. Təşkilat daha yaxşı sağlamlıq nəticələri üçün elmə yenilənmiş öhdəlik çağırışı edib.

## Lyon One Health Sammiti

ÜST və Fransanın G7 sədrliyi 5-7 aprel tarixlərində Lyonda One Health Sammiti keçirib. Sammitdə insan, heyvan və ətraf mühit sağlamlığının qarşılıqlı əlaqəsi müzakirə edilib. Bu, pandemiyaların qarşısının alınması strategiyaları üçün vacib addım hesab olunur.

## Qlobal Forum

ÜST 7-9 aprel tarixlərində 80-dən çox ölkədən 800-dən çox akademik və tədqiqat institutunun nümayəndələrinin iştirakı ilə Qlobal Forum keçirib. Forum elmi əməkdaşlığın gücləndirilməsi və bilik paylaşımının artırılması üzərində fokuslanıb.

## Pan-Amerika Perspektivi

Pan-Amerika Sağlamlıq Təşkilatı (PAHO) da bu mövzuya qoşularaq regionda elmi araşdırmaların gücləndirilməsi üçün çağırış edib. Təşkilat xüsusilə tropik xəstəliklər və iqtisadi bərabərsizliyin sağlamlıq nəticələrinə təsiri sahəsində əməkdaşlığın vacibliyini vurğulayıb.`,
  },
  'en-who-world-health-day-2026-stand-with-science': {
    title: 'WHO World Health Day 2026: Stand with Science',
    date: '2026-04-12',
    category: 'Health',
    locale: 'en',
    content: `The World Health Organization marked World Health Day on April 7, 2026 under the theme "Together for Health. Stand with Science." The organization called for renewed commitment to science-driven approaches to achieve better health outcomes worldwide.

## Lyon One Health Summit

WHO and the G7 Presidency of France convened a One Health Summit in Lyon from April 5-7, bringing together experts to discuss the interconnection between human, animal, and environmental health. The summit is considered a critical step in developing pandemic prevention strategies and building resilient health systems.

## Global Forum

From April 7-9, WHO hosted the Global Forum of its Collaborating Centres, gathering representatives from over 800 academic and research institutions from more than 80 countries. The forum focused on strengthening scientific collaboration, accelerating knowledge sharing, and aligning research priorities with global health challenges.

## PAHO Regional Perspective

The Pan American Health Organization joined the initiative, calling for strengthened scientific research across the Americas. PAHO emphasized the importance of collaboration on tropical diseases and the impact of economic inequality on health outcomes, particularly in Latin American and Caribbean nations.`,
  },
  'tr-dso-dunya-saglik-gunu-2026-bilimle-birlikte': {
    title: 'DSÖ Dünya Sağlık Günü 2026: "Bilimle Birlikte Durun" Çağrısı',
    date: '2026-04-12',
    category: 'Sağlık',
    locale: 'tr',
    content: `Dünya Sağlık Örgütü (DSÖ) 7 Nisan 2026'da Dünya Sağlık Günü'nü "Sağlık İçin Birlikte. Bilimle Birlikte Durun" temasıyla kutladı. Örgüt, daha iyi sağlık sonuçları için bilime yenilenmiş bağlılık çağrısı yaptı.

## Lyon One Health Zirvesi

DSÖ ve Fransa'nın G7 Dönem Başkanlığı, 5-7 Nisan tarihlerinde Lyon'da One Health Zirvesi düzenledi. Zirvede insan, hayvan ve çevre sağlığının karşılıklı bağlantısı tartışıldı ve pandemi önleme stratejileri üzerinde duruldu.

## Küresel Forum

DSÖ, 7-9 Nisan tarihlerinde 80'den fazla ülkeden 800'ü aşkın akademik ve araştırma kurumunun temsilcilerinin katılımıyla Küresel Forum düzenledi. Forum bilimsel iş birliğini güçlendirmeye ve bilgi paylaşımını hızlandırmaya odaklandı.

## PAHO Bölgesel Perspektifi

Pan Amerikan Sağlık Örgütü de bu girişime katılarak Amerika kıtasında bilimsel araştırmaların güçlendirilmesi çağrısında bulundu. Tropikal hastalıklar ve ekonomik eşitsizliğin sağlık sonuçlarına etkisi üzerinde özellikle duruldu.`,
  },
  'ru-voz-vsemirnyj-den-zdorovya-2026-vmeste-s-naukoj': {
    title: 'ВОЗ: Всемирный день здоровья 2026 — «Вместе с наукой»',
    date: '2026-04-12',
    category: 'Здоровье',
    locale: 'ru',
    content: `Всемирная организация здравоохранения отметила Всемирный день здоровья 7 апреля 2026 года под девизом «Вместе за здоровье. Встаньте с наукой». Организация призвала к обновлённой приверженности научным подходам для достижения лучших результатов в сфере здравоохранения.

## Саммит One Health в Лионе

ВОЗ и председательство Франции в G7 провели саммит One Health в Лионе 5-7 апреля. На саммите обсуждалась взаимосвязь здоровья человека, животных и окружающей среды. Это считается важным шагом в разработке стратегий предотвращения пандемий.

## Глобальный форум

С 7 по 9 апреля ВОЗ провела Глобальный форум своих центров сотрудничества с участием представителей более 800 академических и исследовательских учреждений из более чем 80 стран. Форум был посвящён укреплению научного сотрудничества и ускорению обмена знаниями.

## Региональная перспектива ПАОЗ

Панамериканская организация здравоохранения присоединилась к инициативе, призвав к укреплению научных исследований в Северной и Южной Америке.`,
  },

  // --- 9. FIFA World Cup 2026: Referees Appointed, 2 Months to Kickoff ---
  'fifa-dunya-kuboku-2026-hakimler-teyin-edildi': {
    title: 'FIFA Dünya Kuboku 2026: Hakimlər Təyin Edildi',
    date: '2026-04-12',
    category: 'İdman',
    locale: 'az',
    content: `FIFA 2026 Dünya Kuboku üçün 52 hakim, 88 köməkçi hakim və 30 video köməkçi hakim təyin edib. Turnir 11 iyun - 19 iyul 2026-cı il tarixlərində ABŞ, Meksika və Kanadada keçiriləcək. Bu, tarixdə üç ölkənin birgə ev sahibliyi etdiyi ilk Dünya Kuboku olacaq.

## Turnir Formatı

2026 Dünya Kuboku tarixdə ilk dəfə 48 komanda ilə keçiriləcək — bu, əvvəlki 32 komanda formatından böyük genişlənmədir. 16 şəhər ev sahibliyi edəcək: 11 ABŞ-da, 3 Meksikada və 2 Kanadada. Qruplar 5 dekabr 2025-ci ildə Yekun Püşkə ilə müəyyən edilib.

## Bilet Satışları

FIFA-nın rəsmi yenidən satış platforması 2 apreldə açılıb. Boston-dan Foxboro-ya ekpress qatar biletləri 8 apreldə satışa çıxıb və tükənmə ehtimalı yüksəkdir.

## Komandaların Hazırlığı

İngiltərə yığması 10 iyun tarixində Kosta-Rika ilə yoldaşlıq oyunu keçirəcəyini elan edib. Komandalar Dünya Kubokuna son hazırlıqlarını intensivləşdirir.`,
  },
  'en-fifa-world-cup-2026-referees-appointed-two-months': {
    title: 'FIFA World Cup 2026: Referees Appointed, 2 Months Out',
    date: '2026-04-12',
    category: 'Sports',
    locale: 'en',
    content: `FIFA has appointed 52 referees, 88 assistant referees, and 30 video assistant referees for the 2026 World Cup. The tournament runs from June 11 to July 19, 2026, hosted across the United States, Mexico, and Canada. This will be the first World Cup co-hosted by three nations and the first to feature 48 teams.

## Tournament Format

The expanded 48-team format represents a significant increase from the previous 32-team structure. Sixteen host cities will stage matches: eleven in the United States, three in Mexico, and two in Canada. The group draw took place on December 5, 2025, with the final qualifying matches concluded on March 31, 2026.

## Ticket Sales

FIFA's official resale marketplace opened on April 2 and remains active through match days. Express train tickets from South Station to Foxborough for Boston-area matches went on sale April 8, with high demand expected to exhaust available inventory quickly.

## Team Preparations

England announced a pre-tournament friendly against Costa Rica on June 10 at Inter&Co Stadium in Orlando. Teams across the world are intensifying their final preparations with two months remaining before the opening ceremony.`,
  },
  'tr-fifa-dunya-kupasi-2026-hakemler-atandi-baslama-2-ay-sonra': {
    title: 'FIFA Dünya Kupası 2026: Hakemler Atandı, Başlama 2 Ay Sonra',
    date: '2026-04-12',
    category: 'Spor',
    locale: 'tr',
    content: `FIFA, 2026 Dünya Kupası için 52 hakem, 88 yardımcı hakem ve 30 video yardımcı hakem atadı. Turnuva 11 Haziran - 19 Temmuz 2026 tarihleri arasında ABD, Meksika ve Kanada'da düzenlenecek. Bu, üç ülkenin birlikte ev sahipliği yaptığı ve 48 takımın katıldığı ilk Dünya Kupası olacak.

## Turnuva Formatı

Genişletilmiş 48 takımlı format, önceki 32 takımlı yapıdan önemli bir artışı temsil ediyor. 16 ev sahibi şehir maçlara ev sahipliği yapacak: 11'i ABD'de, 3'ü Meksika'da ve 2'si Kanada'da. Grup kuraları 5 Aralık 2025'te çekildi.

## Bilet Satışları

FIFA'nın resmi yeniden satış platformu 2 Nisan'da açıldı. Boston bölgesindeki maçlar için South Station'dan Foxborough'ya ekspres tren biletleri 8 Nisan'da satışa çıktı.

## Takım Hazırlıkları

İngiltere, 10 Haziran'da Orlando'da Kosta Rika ile hazırlık maçı oynayacağını duyurdu. Dünya genelindeki takımlar açılış törenine iki ay kala son hazırlıklarını yoğunlaştırıyor.`,
  },
  'ru-chempionat-mira-fifa-2026-sudyi-naznacheny': {
    title: 'ЧМ по футболу 2026: судьи назначены, до старта 2 месяца',
    date: '2026-04-12',
    category: 'Спорт',
    locale: 'ru',
    content: `ФИФА назначила 52 арбитра, 88 помощников арбитров и 30 видеоарбитров для чемпионата мира 2026 года. Турнир пройдёт с 11 июня по 19 июля 2026 года в США, Мексике и Канаде. Это будет первый чемпионат мира, проводимый тремя странами, и первый с участием 48 команд.

## Формат турнира

Расширенный формат с 48 командами — значительное увеличение по сравнению с предыдущим форматом на 32 команды. Матчи пройдут в 16 городах: 11 в США, 3 в Мексике и 2 в Канаде. Жеребьёвка групп состоялась 5 декабря 2025 года.

## Продажа билетов

Официальная платформа перепродажи ФИФА открылась 2 апреля. Билеты на экспресс-поезда из Бостона до Фоксборо поступили в продажу 8 апреля и пользуются высоким спросом.

## Подготовка команд

Англия объявила о товарищеском матче с Коста-Рикой 10 июня в Орландо. Команды по всему миру интенсифицируют предтурнирную подготовку — до церемонии открытия остаётся два месяца.`,
  },

  // --- 10. Super Mario Galaxy Movie Dominates Box Office ---
  'super-mario-galaxy-filmi-kassa-rekordlari': {
    title: 'Super Mario Galaxy Filmi Dünya Kassalarında Rekordlar Qırır',
    date: '2026-04-12',
    category: 'Mədəniyyət',
    locale: 'az',
    content: `1 apreldə premyerası olan "Super Mario Galaxy" filmi dünya kassalarında inanılmaz uğur qazanıb və 2026-cı ilin ən böyük kassa hitlərindən biri olmağa namizəd hesab olunur. Film ilk həftə sonunda bütün gözləntiləri aşıb.

## Filmin Uğurunun Səbəbləri

Nintendo və Illumination studiyasının əməkdaşlığının ikinci meyvəsi olan film, ilk "Super Mario Bros. Movie"nin (2023) böyük uğurundan sonra gəlir. Kosmik mövzu, nostalgik oyun elementləri və ailə dostu məzmun filmi geniş tamaşaçı kütləsinə cazibədar edir.

## Rəqəmsal Əyləncə Tendensiyaları

Hollywood artıq əvvəlki kimi mərkəzləşmiş iyerarxiyadan məlumat əsaslı, mədəni cəhətdən çoxşaxəli bir ekosistemə keçir. Oyun əsaslı filmlər bu dəyişikliyin ən uğurlu nümunələrindən biridir. Video oyun franchise-ları kino dünyasında dominant qüvvəyə çevrilir.

## Coachella və Digər Xəbərlər

Əyləncə dünyasının digər xəbərlərindən, Coachella festivalı həyəcan yaradır. Sabrina Carpenter, Coachella headliner-i kimi ənənəvi ərəb bayramlarını kiçimsəməsinə görə üzr istəyib. Usher və Chris Brown birgə tur elan edib.`,
  },
  'en-super-mario-galaxy-movie-box-office-records': {
    title: 'Super Mario Galaxy Movie Dominates Box Office',
    date: '2026-04-12',
    category: 'Culture',
    locale: 'en',
    content: `"The Super Mario Galaxy Movie," which premiered on April 1, has become one of the biggest box office hits of 2026, surpassing all expectations in its opening weeks. The film continues the successful collaboration between Nintendo and Illumination that began with the original "Super Mario Bros. Movie" in 2023.

## Why the Film Succeeded

The cosmic setting, nostalgic game elements, and family-friendly storytelling have made the film appealing to an extraordinarily wide audience. Parents who grew up playing Nintendo games are bringing their children, creating a multigenerational viewing experience that few franchises can replicate.

## Digital Entertainment Trends

The film's success reflects broader shifts in the entertainment industry. Video game-based movies have become a dominant force in cinema, with Hollywood moving from a centralized hierarchy toward a data-driven, culturally plural ecosystem. Game adaptations are no longer seen as risky ventures but as reliable franchise builders.

## Other Entertainment News

In other entertainment developments, the Coachella festival is generating significant buzz this April. Headliner Sabrina Carpenter apologized for dismissing traditional Arabic celebrations. Usher and Chris Brown announced a joint tour, while the Michael Jackson biopic starring Jaafar Jackson is set for April 24.`,
  },
  'tr-super-mario-galaxy-filmi-gise-rekorlari-kiriyor': {
    title: 'Super Mario Galaxy Filmi Dünya Gişelerinde Rekorlar Kırıyor',
    date: '2026-04-12',
    category: 'Kültür',
    locale: 'tr',
    content: `1 Nisan'da gösterime giren "Super Mario Galaxy" filmi dünya gişelerinde inanılmaz bir başarı yakaladı ve 2026'nın en büyük gişe hitlerinden biri olmaya aday. Film, tüm beklentileri aşarak ilk haftasından itibaren rekorlar kırdı.

## Filmin Başarı Sırları

Nintendo ve Illumination'ın 2023'teki orijinal "Super Mario Bros. Movie"den sonraki ikinci iş birliği olan film, kozmik teması, nostaljik oyun öğeleri ve aile dostu içeriğiyle geniş bir izleyici kitlesine hitap ediyor.

## Dijital Eğlence Trendleri

Filmin başarısı eğlence sektöründeki daha geniş değişimleri yansıtıyor. Video oyun uyarlamaları sinemada baskın bir güç haline geldi. Hollywood, merkezileşmiş bir hiyerarşiden veri odaklı ve kültürel çoğulculuğa dayanan bir ekosisteme doğru evriliyor.

## Diğer Eğlence Haberleri

Coachella festivali bu Nisan ayında büyük heyecan yaratıyor. Headliner Sabrina Carpenter, geleneksel Arap kutlamalarını küçümsemesi nedeniyle özür diledi. Usher ve Chris Brown ortak tur duyurdu. Jaafar Jackson'ın başrolünde olduğu Michael Jackson biyografisi 24 Nisan'da vizyona girecek.`,
  },
  'ru-film-super-mario-galaxy-rekordy-kassovyh-sborov': {
    title: 'Super Mario Galaxy бьёт рекорды мировых кассовых сборов',
    date: '2026-04-12',
    category: 'Культура',
    locale: 'ru',
    content: `Фильм «Super Mario Galaxy», вышедший в прокат 1 апреля, стал одним из крупнейших кассовых хитов 2026 года, превзойдя все ожидания в первые недели проката. Картина продолжает успешное сотрудничество Nintendo и Illumination, начавшееся с оригинального «Super Mario Bros. Movie» в 2023 году.

## Причины успеха

Космическая тематика, ностальгические игровые элементы и семейная направленность сделали фильм привлекательным для необычайно широкой аудитории. Родители, выросшие на играх Nintendo, приводят своих детей, создавая межпоколенческий зрительский опыт.

## Тренды цифровых развлечений

Успех фильма отражает масштабные изменения в индустрии развлечений. Экранизации видеоигр стали доминирующей силой в кинематографе. Голливуд переходит от централизованной иерархии к управляемой данными, культурно плюралистической экосистеме.

## Другие новости развлечений

Фестиваль Coachella привлекает внимание в этом апреле. Хедлайнер Сабрина Карпентер извинилась за пренебрежение традиционными арабскими праздниками. Ашер и Крис Браун объявили совместный тур. Биографический фильм о Майкле Джексоне с Джаафаром Джексоном в главной роли выходит 24 апреля.`,
  },

  // ========== 2026-04-12 (Session 26 refresh) ==========

  // --- Trump Orders Hormuz Strait Blockade ---
  'tramp-hormuz-bogazi-blokadasi': {
    title: 'Tramp Hörmüz boğazını blokada etmək əmri verdi',
    date: '2026-04-12',
    category: 'Dünya',
    locale: 'az',
    content: `ABŞ Prezidenti Donald Tramp İrana qarşı sərt addım ataraq ABŞ donanmasına Hörmüz boğazını dərhal blokada etmək əmri verib. Qərar vitse-prezident JD Vansın İslamabadda İran nümayəndələri ilə 21 saatlıq danışıqlarının nəticəsiz başa çatmasından sonra verilib.

## Danışıqlar nəticəsiz qaldı

Tramp İranı nüvə silahından imtina etməkdən boyun qaçırmaqda ittiham edib. Prezidentin əmrinə əsasən, ABŞ donanması İrana ödəniş edən gəmiləri beynəlxalq sularda saxlayacaq. Boğaz artıq fevralın 28-dən ABŞ və İsrailin birgə hava zərbələrindən sonra böyük ölçüdə bağlı vəziyyətdədir.

## Neft bazarında gərginlik

Hazırda Körfəzdə 230-dan çox yüklənmiş neft tankeri gözləyir. Neft qiymətləri artıq barrel üçün 100 dollara yaxınlaşıb, analitiklər Brent markalı neftin 125 dollara çata biləcəyini proqnozlaşdırır. Blokada nəticəsində gündəlik 11 milyon barrel istehsal offlayn vəziyyətdədir ki, bu da qlobal enerji bazarında ciddi böhrana yol aça bilər.`,
  },
  'en-trump-hormuz-strait-blockade': {
    title: 'Trump Orders US Navy Blockade of Strait of Hormuz',
    date: '2026-04-12',
    category: 'World',
    locale: 'en',
    content: `The United States has dramatically escalated its confrontation with Iran after President Donald Trump ordered the US Navy to immediately blockade the Strait of Hormuz. The decision came after Vice President JD Vance led 21 hours of negotiations with Iranian officials in Islamabad that ended without agreement.

## Talks Collapse, Tensions Surge

Trump accused Iran of refusing to abandon its nuclear ambitions and said the failed talks left him no choice but to act decisively. The Strait of Hormuz, one of the world's most critical oil transit chokepoints, has been largely blocked since February 28 following joint US-Israeli air strikes on Iranian targets. The new blockade order directs the Navy to intercept vessels that have paid Iranian tolls in international waters, further tightening the stranglehold on maritime traffic.

## Oil Markets in Turmoil

The consequences for global energy markets are severe. Approximately 230 loaded oil tankers are now waiting inside the Persian Gulf, unable to transit the strait. An estimated 11 million barrels per day of oil supply has been taken offline, sending crude prices surging toward $100 per barrel. Analysts expect Brent crude to climb to approximately $125 as the standoff continues.

## Global Implications

The blockade threatens to disrupt energy supplies to major economies across Asia and Europe that depend on Gulf oil exports. Shipping insurers have begun reassessing risk premiums for the region, and several nations have called for emergency diplomatic consultations. The situation marks one of the most significant military confrontations in the Persian Gulf since the 1980s tanker wars.`,
  },
  'tr-trump-hurmuz-bogazi-ablukasi': {
    title: 'Trump Hürmüz Boğazı\'nı Ablukaya Alma Emri Verdi',
    date: '2026-04-12',
    category: 'Dünya',
    locale: 'tr',
    content: `ABD Başkanı Donald Trump, İran ile sürdürülen nükleer müzakerelerin çıkmaza girmesinin ardından ABD Donanması'na Hürmüz Boğazı'nı derhal abluka altına alma emri verdi. Başkan Yardımcısı JD Vance'ın İslamabad'da 21 saat boyunca süren diplomatik temasları sonuçsuz kaldı.

## Müzakereler Neden Başarısız Oldu

Trump, İran'ın nükleer programındaki hırslarından vazgeçmediğini belirterek müzakerelerin başarısızlıkla sonuçlandığını açıkladı. Vance'ın İslamabad'daki yoğun diplomatik maratonu herhangi bir anlaşmayla sonuçlanmadı ve Washington bu gelişmenin ardından askeri seçeneklere yöneldi.

## Boğaz'da Kritik Tablo

Hürmüz Boğazı, 28 Şubat'tan bu yana ABD-İsrail ortak hava operasyonlarının ardından büyük ölçüde kapalı durumda. Şu anda 230'dan fazla yüklü petrol tankeri Körfez sularında bekleme pozisyonunda. ABD Donanması, İran'a geçiş ücreti ödeyen gemileri uluslararası sularda yakalama yetkisi aldı.

## Enerji Piyasalarına Etkisi

Abluka kararıyla birlikte küresel enerji piyasalarında ciddi dalgalanmalar yaşanıyor. Petrol fiyatları varil başına 100 dolar seviyesine ulaşırken, analistler Brent petrolün 125 dolara çıkabileceğini öngörüyor. Günlük yaklaşık 11 milyon varillik üretimin devre dışı kalması, küresel enerji arzında büyük bir daralmaya işaret ediyor.`,
  },
  'ru-tramp-blokada-ormuzskogo-proliva': {
    title: 'Трамп объявил блокаду Ормузского пролива',
    date: '2026-04-12',
    category: 'Мир',
    locale: 'ru',
    content: `Президент США Дональд Трамп приказал Военно-морским силам США немедленно начать блокаду Ормузского пролива после провала переговоров с Ираном. Решение было принято после того, как вице-президент Джей Ди Вэнс провёл 21 час переговоров с иранской стороной в Исламабаде, которые завершились безрезультатно.

## Причины блокады

Трамп обвинил Иран в отказе от ядерных амбиций и отдал приказ перехватывать суда, платившие Ирану за проход через пролив. Фактически пролив в значительной степени заблокирован с 28 февраля, когда были нанесены авиаудары по инфраструктуре в регионе. Теперь блокада получила официальный статус.

## Влияние на нефтяной рынок

Последствия для мировой энергетики колоссальны. В Персидском заливе скопились около 230 загруженных нефтяных танкеров, ожидающих возможности пройти через пролив. Из мирового оборота выведено порядка 11 миллионов баррелей нефти в сутки. Цена нефти приблизилась к отметке 100 долларов за баррель, а аналитики прогнозируют рост стоимости Brent до 125 долларов.

## Международная реакция

Блокада Ормузского пролива затрагивает интересы крупнейших нефтедобывающих стран Персидского залива и их торговых партнёров по всему миру. Эскалация напряжённости создаёт серьёзные риски для глобальной экономики и ставит под угрозу энергетическую безопасность многих государств.`,
  },

  // --- Russia-Ukraine Easter Ceasefire Collapses ---
  'rusiya-ukrayna-pasxa-ateskesi-dagildi': {
    title: 'Rusiya-Ukrayna Pasxa atəşkəsi dağıldı',
    date: '2026-04-12',
    category: 'Dünya',
    locale: 'az',
    content: `Rusiya Prezidenti Vladimir Putinin elan etdiyi 32 saatlıq Pasxa atəşkəsi qüvvəyə minməsindən cəmi bir neçə saat sonra pozulub. Atəşkəs aprelin 11-i saat 16:00-dan bazar günü sonuna qədər davam etməli idi.

## Hər iki tərəf qarşılıqlı ittihamlar irəli sürür

Ukrayna Prezidenti Volodimir Zelenski əvvəlcə ölkəsinin atəşkəsə əməl edəcəyini təsdiqləmişdi. Lakin aprelin 12-si saat 7-yə qədər Ukrayna tərəfi 2299 pozuntu qeydə alıb: 28 hücum, 479 atəş açma halı, 747 dron və 1045 FPV dron hücumu. Rusiya tərəfi isə öz növbəsində 1971 pozuntu baş verdiyini iddia edib.

## Tarix təkrarlanır

Bu, ilk dəfə deyil ki, Pasxa münasibətilə elan edilən atəşkəs uğursuzluqla nəticələnir. Keçən il də oxşar atəşkəs elan edilmiş, lakin eyni aqibətlə üzləşmişdi. Hər iki tərəfin pozuntuları sənədləşdirməsi müharibənin diplomatik yollarla həllinin nə qədər çətin olduğunu bir daha göstərir.`,
  },
  'en-russia-ukraine-easter-ceasefire-collapses': {
    title: 'Russia-Ukraine Easter Ceasefire Collapses Overnight',
    date: '2026-04-12',
    category: 'World',
    locale: 'en',
    content: `A ceasefire declared by Russian President Vladimir Putin for the Orthodox Easter weekend has collapsed within hours, with both sides accusing each other of thousands of violations. The pattern mirrors last year's failed Easter truce, raising questions about whether such unilateral declarations serve any purpose beyond propaganda.

## The Short-Lived Truce

Putin announced a 32-hour ceasefire to begin at 4 p.m. on Saturday, April 11, extending through the end of Easter Sunday. Ukrainian President Volodymyr Zelensky confirmed that Ukraine would honor the cessation of hostilities. However, the calm was shattered almost immediately.

## Thousands of Violations Reported

By 7 a.m. on April 12, Ukraine's military reported a staggering 2,299 violations of the ceasefire by Russian forces. The breakdown includes 28 ground assaults, 479 shellings, 747 attack drones, and 1,045 first-person view drones deployed against Ukrainian positions. Russia's defense ministry countered with claims of 1,971 violations by Ukrainian forces during the same period.

## A Familiar Pattern

The collapse follows the same trajectory as last year's Easter ceasefire, which also disintegrated within hours of its declaration. Military analysts note that these brief truces have consistently failed to hold, as neither side appears willing to halt operations that could yield tactical advantages. International observers have called the repeated failures deeply discouraging for any prospects of broader peace negotiations.`,
  },
  'tr-rusya-ukrayna-paskalya-ateskesi-coktu': {
    title: 'Rusya-Ukrayna Paskalya Ateşkesi Saatler İçinde Çöktü',
    date: '2026-04-12',
    category: 'Dünya',
    locale: 'tr',
    content: `Rusya Devlet Başkanı Vladimir Putin'in Ortodoks Paskalya'sı dolayısıyla ilan ettiği 32 saatlik ateşkes, başlamasının ardından saatler içinde fiilen çöktü. Her iki taraf da karşılıklı olarak binlerce ihlal bildirdi.

## Ateşkes Süreci

Putin, 11 Nisan saat 16:00'dan Pazar günü sonuna kadar geçerli olacak 32 saatlik tek taraflı ateşkes ilan etmişti. Ukrayna Devlet Başkanı Volodimir Zelenski de Ukrayna'nın ateşkese uyacağını teyit etmişti. Ancak silahlar kısa sürede yeniden konuşmaya başladı.

## Binlerce İhlal Kaydedildi

Ukrayna tarafı 12 Nisan sabah 07:00'ye kadar toplam 2.299 ihlal bildirdi. Bu ihlallerin dağılımı son derece çarpıcı: 28 saldırı, 479 bombardıman, 747 insansız hava aracı saldırısı ve 1.045 FPV dron kullanımı. Rusya tarafı ise aynı dönemde 1.971 ihlal iddia etti.

## Tarih Tekerrür Ediyor

Bu gelişme, geçen yıl ilan edilen Paskalya ateşkesinin de benzer şekilde çökmesini akıllara getiriyor. Uluslararası gözlemciler, kısa süreli ateşkes girişimlerinin çatışmanın dinamiklerini değiştirmekte yetersiz kaldığını ve taraflar arasındaki güven bunalımının derinleştiğini vurguluyorlar.`,
  },
  'ru-paskhalnoe-peremirie-rossiya-ukraina': {
    title: 'Пасхальное перемирие Россия-Украина рухнуло',
    date: '2026-04-12',
    category: 'Мир',
    locale: 'ru',
    content: `Объявленное Владимиром Путиным 32-часовое пасхальное перемирие между Россией и Украиной фактически рухнуло спустя считанные часы после его начала. Перемирие должно было действовать с 16:00 субботы 11 апреля до конца воскресенья, однако обе стороны обвиняют друг друга в массовых нарушениях.

## Масштаб нарушений

К 7:00 утра 12 апреля Украина зафиксировала 2299 нарушений перемирия со стороны России. Среди них — 28 штурмовых действий, 479 артиллерийских обстрелов, 747 ударов боевыми дронами и 1045 атак FPV-дронами. Россия, в свою очередь, заявила о 1971 нарушении со стороны Украины.

## Контекст и предыстория

Президент Зеленский подтвердил готовность Украины соблюдать перемирие, однако события развернулись по сценарию, повторяющему прошлогоднее пасхальное перемирие, которое также было нарушено практически сразу после объявления. Данная ситуация ставит под сомнение возможность достижения даже кратковременного прекращения огня.

## Перспективы мирного процесса

Провал очередной попытки перемирия подрывает доверие между сторонами и затрудняет работу международных посредников. Наблюдатели отмечают, что подобные жесты доброй воли всё чаще воспринимаются как инструменты информационной войны, а не реальные шаги к деэскалации конфликта.`,
  },

  // --- EBRD €5 Billion Investment Package ---
  'ebrd-5-milyard-azerbaycan-daxil': {
    title: 'EBRD-nin €5 milyardlıq paketinə Azərbaycan daxil',
    date: '2026-04-12',
    category: 'İqtisadiyyat',
    locale: 'az',
    content: `Avropa Yenidənqurma və İnkişaf Bankı (EBRD) 2026-cı il üçün 5 milyard avro həcmində investisiya paketi elan edib. Paket Yaxın Şərq münaqişəsindən birbaşa və dolayısı ilə təsirlənən ölkələrə yönəlib və Azərbaycan da faydalanan ölkələr sırasındadır.

## Hansı ölkələr daxildir?

Birbaşa təsirlənən ölkələr sırasında İraq, İordaniya, Livan, Qərbi Sahil və Qəzza yer alır. Qonşu təsirlənən ölkələr qrupuna isə Misir, Türkiyə, Ermənistan və Azərbaycan daxil edilib. İnvestisiya həcmi hər ölkənin tələblərinə əsasən müəyyənləşdiriləcək.

## EBRD-nin ən böyük münaqişə cavab öhdəliyi

Bu paket EBRD-nin tarixində tək il ərzində münaqişə cavab mexanizmi çərçəvəsində götürdüyü ən böyük maliyyə öhdəliyidir. Azərbaycanın bu paketə daxil edilməsi regionda baş verən münaqişənin ölkə iqtisadiyyatına dolayı təsirinin beynəlxalq maliyyə qurumları tərəfindən tanınması deməkdir.`,
  },
  'en-ebrd-5-billion-war-affected-economies': {
    title: 'EBRD Pledges Record €5B for War-Hit Economies',
    date: '2026-04-12',
    category: 'Economy',
    locale: 'en',
    content: `The European Bank for Reconstruction and Development has announced a €5 billion investment package for 2026, targeting economies destabilized by the ongoing conflict in the Middle East. The commitment represents one of the EBRD's largest single-year conflict response allocations in its history.

## Where the Money Will Go

The package is directed at countries bearing the greatest economic burden from the regional crisis. Direct recipients include Iraq, Jordan, Lebanon, and the West Bank and Gaza, all of which face severe disruptions to trade, infrastructure, and public services. Neighboring economies that have absorbed significant spillover effects — including Egypt, Turkiye, Armenia, and Azerbaijan — are also eligible for funding.

## Demand-Driven Approach

The EBRD has emphasized that the investment volume will be demand-driven, meaning funds will be allocated based on the actual needs and absorption capacity of recipient countries rather than predetermined quotas. This approach allows for flexibility as conditions on the ground evolve and new priorities emerge throughout the year.

## Broader Significance

The €5 billion commitment signals the EBRD's recognition that the economic fallout from the Middle East conflict extends far beyond the immediate war zones. Rising energy costs, disrupted supply chains, and refugee pressures have strained budgets across the wider region. The bank's investment is expected to focus on critical infrastructure, private sector resilience, and energy security — areas where conflict-affected economies are most vulnerable to long-term damage.`,
  },
  'tr-ebrd-5-milyar-turkiye-dahil': {
    title: 'EBRD Türkiye Dahil Bölge İçin €5 Milyar Ayırdı',
    date: '2026-04-12',
    category: 'Ekonomi',
    locale: 'tr',
    content: `Avropa İmar ve Kalkınma Bankası (EBRD), 2026 yılı için Ortadoğu çatışmalarından etkilenen ekonomilere yönelik 5 milyar Euro tutarında kapsamlı bir yatırım paketi açıkladı. Paket, bankanın tarihindeki en büyük tek yıllık çatışma müdahale taahhüdü olarak dikkat çekiyor.

## Türkiye de Faydalanacak Ülkeler Arasında

Yatırım paketinden doğrudan faydalanacak ülkeler arasında Irak, Ürdün, Lübnan, Batı Şeria ve Gazze yer alıyor. Bunun yanı sıra bölgedeki çatışmalardan dolaylı olarak etkilenen Mısır, Türkiye, Ermenistan ve Azerbaycan da paketin kapsamına dahil edildi.

## Talep Odaklı Yatırım Stratejisi

EBRD'nin açıklamasına göre yatırım hacmi talep odaklı belirlenecek. Bu yaklaşım, fonların en çok ihtiyaç duyulan alanlara ve projelere yönlendirilmesini amaçlıyor. Bankanın bu kararı, bölgedeki ekonomik istikrarsızlığın derinleşmesi ve insani krizin büyümesi karşısında uluslararası finansal kuruluşların artan sorumluluğunu yansıtıyor.

## Türkiye Ekonomisi Açısından Önem

Türkiye'nin pakete dahil edilmesi, ülkenin bölgesel çatışmalardan kaynaklanan göç baskısı, ticaret aksaklıkları ve enerji maliyetlerindeki artışla mücadelesinde önemli bir finansal destek kaynağı olabilir.`,
  },
  'ru-ebrr-5-mlrd-azerbajdzhan': {
    title: 'ЕБРР выделяет €5 млрд, включая Азербайджан',
    date: '2026-04-12',
    category: 'Экономика',
    locale: 'ru',
    content: `Европейский банк реконструкции и развития объявил о выделении пакета помощи объёмом 5 миллиардов евро на 2026 год для поддержки экономик, пострадавших от ближневосточного конфликта. Это одно из крупнейших однолетних обязательств в истории ЕБРР.

## Страны-получатели

Средства напрямую направлены странам, наиболее затронутым конфликтом: Ираку, Иордании, Ливану, а также Западному берегу реки Иордан и сектору Газа. Кроме того, поддержку получат соседние государства, испытывающие косвенное экономическое давление, — Египет, Турция, Армения и Азербайджан.

## Значение для Азербайджана

Включение Азербайджана в число стран-получателей отражает признание международным сообществом экономических вызовов, с которыми страна сталкивается на фоне региональной нестабильности. Конкретный объём инвестиций для каждой страны будет определяться по мере оценки спроса и потребностей.

## Стратегия ЕБРР

Банк подчёркивает, что выделенные средства направлены на укрепление экономической устойчивости и поддержку частного сектора в регионе. ЕБРР планирует сосредоточиться на инфраструктурных проектах, энергетической безопасности и развитии малого и среднего бизнеса в странах, испытывающих давление из-за геополитической нестабильности.`,
  },

  // --- Masters 2026: McIlroy vs Young Final Round ---
  'masters-2026-final-mcilroy-drami': {
    title: 'Masters 2026: Makilroy karyera Grand Slam yaxınında',
    date: '2026-04-12',
    category: 'İdman',
    locale: 'az',
    content: `Augusta National-da keçirilən Masters 2026 turnirinin son raundu həyəcanverici mübarizəyə səhnə qurub. Rori Makilroy və Kameron Yanq -11 ilə bərabər lider mövqedə son günə çıxırlar.

## Üçüncü raundda dramatik dəyişiklik

Üçüncü raunda 6 vuruş fərqlə lider girən Makilroy gözlənilməz şəkildə +1 vurub. Kameron Yanq isə parlaq oyun nümayiş etdirərək 7-under 65 ilə raundu başa çatdırıb və fərqi sıfıra endirib. Bu raund Masters tarixinin ən aşağı skorlu raundu kimi qeydə alınıb.

## Yarışa digər iddiaçılar da qoşulur

Sam Börns -10 ilə liderlərin ardınca gəlir. Şeyn Lauri -9, Ceyson Dey və Castin Rouz isə -8 ilə izləyirlər. Dünya birincisi Skotti Şefler 65-lik raund ilə yarışa yaxınlaşıb. Makilroy üçün bu turnir xüsusi əhəmiyyət daşıyır — karyera Grand Slam tamamlamaq üçün ona yalnız Masters titulu çatmır.`,
  },
  'en-masters-2026-final-round-mcilroy-young': {
    title: 'Masters Final Round: McIlroy, Young Tied at -11',
    date: '2026-04-12',
    category: 'Sports',
    locale: 'en',
    content: `Augusta National is set for a dramatic final round at the 2026 Masters on April 12, with Rory McIlroy and Cameron Young sharing the lead at 11 under par. What appeared to be McIlroy's tournament to lose after the second round has turned into a wide-open contest following a stunning Saturday collapse.

## McIlroy's Lead Evaporates

McIlroy entered the third round holding a commanding six-shot lead, seemingly cruising toward the one major championship that has eluded him throughout his career. Instead, he posted a 1-over-par round that left the Augusta galleries stunned. His struggles opened the door for the rest of the field, transforming what looked like a coronation into a genuine competition.

## Young's Sensational Surge

Cameron Young seized the opportunity with a blistering 7-under-par 65 in the third round, vaulting into a tie for the lead. Young's Saturday performance contributed to what officials confirmed was the lowest-scoring third round in Masters history, as multiple players took advantage of favorable conditions to post low numbers.

## Packed Leaderboard

The final round promises intense competition with a stacked leaderboard. Sam Burns sits just one shot back at 10 under, while Shane Lowry lurks at 9 under. Jason Day and Justin Rose are tied at 8 under, and defending champion Scottie Scheffler has been climbing steadily up the standings. For McIlroy, the stakes could not be higher — the Masters remains the only major he needs to complete the career Grand Slam, a feat that would cement his place among golf's all-time greats.`,
  },
  'tr-masters-2026-final-mcilroy-dramasi': {
    title: 'Masters 2026: McIlroy Kariyer Grand Slam Peşinde',
    date: '2026-04-12',
    category: 'Spor',
    locale: 'tr',
    content: `Augusta National'da oynanan Masters 2026 turnuvasında son tur öncesinde heyecan doruk noktasına ulaştı. Kuzey İrlandalı Rory McIlroy ve Amerikalı Cameron Young, -11 skorla zirvede eş lider olarak son tura çıkacaklar.

## McIlroy'un İnanılmaz Geri Dönüşü

Turnuvanın en dikkat çekici hikayesi kuşkusuz McIlroy'a ait. İkinci tur sonunda 6 vuruşluk farkla geride olan McIlroy, üçüncü turda +1 vurmasına rağmen rakiplerinin sendelemesiyle liderliğe ortak oldu. Bu durum, turnuvanın ne kadar öngörülemez olduğunu bir kez daha gözler önüne serdi.

## Young'ın Olağanüstü Üçüncü Turu

Cameron Young ise üçüncü turda 7 birdie ile 65 vuruşluk (7-under) muhteşem bir performans sergileyerek zirveye tırmandı. Üçüncü tur, Masters tarihinin en düşük skorlu turlarından biri olarak kayıtlara geçti.

## Takipçiler Yakın Mesafede

Lider ikilinin hemen ardında Sam Burns (-10), Shane Lowry (-9), Jason Day (-8) ve Justin Rose (-8) yer alıyor. McIlroy için bu turnuva çok özel bir anlam taşıyor: Kariyer Grand Slam'i tamamlamak için yalnızca Masters zaferine ihtiyaç duyuyor. Son tur, golf tarihine geçebilecek bir finali vaat ediyor.`,
  },
  'ru-masters-2026-final-makilroj': {
    title: 'Masters 2026: Макилрой теряет 6 ударов лидерства',
    date: '2026-04-12',
    category: 'Спорт',
    locale: 'ru',
    content: `Финальный раунд турнира Masters 2026 в Огасте обещает стать одним из самых драматичных в истории. Рори Макилрой, который вёл турнир с преимуществом в шесть ударов, растерял всё лидерство в третьем раунде, сыграв его на один удар выше пара.

## Лидерборд перед финалом

Перед заключительным воскресным раундом Макилрой делит первую строчку с Кэмероном Янгом — оба имеют результат -11. Янг совершил впечатляющий рывок, сыграв третий раунд на уровне 65 (7 ударов ниже пара), что стало одним из самых низких результатов в истории турнира. Третий раунд в целом стал рекордно низким по средним показателям в истории Masters.

## Преследователи

За лидерами плотно идут несколько сильных игроков: Бёрнс на позиции -10, Лоури на -9, а Джейсон Дэй и Джастин Роуз делят пятую строчку с результатом -8. Такая плотность результатов гарантирует напряжённую борьбу в финальном раунде.

## Историческая ставка Макилроя

Для Рори Макилроя этот турнир имеет особое значение. Masters — единственный мэйджор, который ему не покорился. Победа в Огасте принесла бы ему карьерный Большой шлем, сделав одним из немногих гольфистов, выигравших все четыре главных турнира. После драматичной потери преимущества давление на североирландца в финальном раунде будет колоссальным.`,
  },

  // --- AI Sector: Layoffs, IPOs, and Intel Buyback ---
  'texnologiya-ai-ixtisarlari-intel-geri-alimi': {
    title: 'AI sektoru: ixtisarlar, IPO-lar və Intel geri alımı',
    date: '2026-04-12',
    category: 'Texnologiya',
    locale: 'az',
    content: `Texnologiya sektorunda süni intellektlə bağlı hadisələr sürətlə inkişaf edir. Bir tərəfdən şirkətlər milyardlarla dollar investisiya cəlb edərkən, digər tərəfdən on minlərlə işçi ixtisara düşür.

## Böyük sövdələşmələr və IPO planları

Anthropic şirkəti 350 milyard dollar qiymətləndirmə ilə tender təklifini uğurla tamamlayıb. Amazon süni intellektin artıq çoxmilyardlıq gəlir mənbəyinə çevrildiyini təsdiqləyib. OpenAI isə pərakəndə investorlara yönəlik IPO planını açıqlayıb.

## İşçi ixtisarları davam edir

2026-cı ildə texnologiya sektorunda 78 557 işçi ixtisara düşüb. Diqqətçəkən məqam odur ki, bu ixtisarların 48 faizi birbaşa AI avtomatlaşdırması ilə əlaqədardır.

## Intel strateji geri alım edir

Intel İrlandiyadakı Fab 34 fabrikindəki 49 faiz payını Apollo şirkətindən 14,2 milyard dollara geri alıb. Xəbərdən sonra Intel səhmləri 9 faiz bahalaşıb. Bu arada TSMC rekord böyümə göstəriciləri açıqlayıb. Apple isə CarPlay-ə ChatGPT səsli dəstək funksiyasını inteqrasiya edib.`,
  },
  'en-tech-ai-valuations-mass-layoffs': {
    title: 'AI Valuations Soar as Tech Layoffs Pass 78,000',
    date: '2026-04-12',
    category: 'Technology',
    locale: 'en',
    content: `The technology sector is experiencing a striking paradox in 2026: artificial intelligence companies are reaching record valuations even as the broader industry sheds tens of thousands of jobs, with nearly half of all layoffs directly linked to AI-driven restructuring.

## Valuations Hit New Heights

Anthropic has completed a tender offer valuing the AI safety company at $350 billion, reflecting extraordinary investor confidence in the sector. Amazon has confirmed that AI has become a multi-billion-dollar revenue engine for the company, driving growth across its cloud and consumer businesses. Meanwhile, OpenAI has hinted at plans for a retail-friendly initial public offering that would allow everyday investors to own a stake in the AI pioneer.

## The Human Cost

The boom in AI investment stands in sharp contrast to the wave of layoffs sweeping the technology industry. A total of 78,557 tech workers have been laid off in 2026 year-to-date, with a striking 48 percent of those cuts directly linked to AI-related restructuring. Companies are increasingly replacing traditional roles with automated systems, leaving experienced workers searching for new positions in a rapidly shifting job market.

## Chip Wars and Strategic Moves

The semiconductor landscape is also shifting dramatically. Intel is buying back a 49 percent stake in its Fab 34 facility from Apollo Global Management for $14.2 billion, a move that sent its shares up 9 percent. TSMC continues to report blockbuster growth driven by insatiable demand for AI chips. In the consumer space, Apple has introduced ChatGPT-powered voice interaction through its CarPlay platform, bringing conversational AI directly into vehicles.`,
  },
  'tr-teknoloji-ai-isten-cikarmalar-intel': {
    title: 'Yapay Zeka İşten Çıkarmaları Hız Kesmiyor',
    date: '2026-04-12',
    category: 'Teknoloji',
    locale: 'tr',
    content: `2026 yılında teknoloji sektöründeki işten çıkarmalar endişe verici boyutlara ulaştı. Yılın ilk aylarında 78.557 teknoloji çalışanı işini kaybetti ve bu çıkarmaların yüzde 48'inin yapay zeka otomasyonundan kaynaklandığı belirlendi.

## Yapay Zeka Devlerinin Değerleme Yarışı

Yapay zeka alanındaki yatırım çılgınlığı devam ediyor. Anthropic, 350 milyar dolar değerlemeyle son halka açık arz öncesi satışını tamamladı. Amazon, yapay zekanın şirket için çok milyar dolarlık bir gelir kaynağına dönüştüğünü doğruladı. OpenAI ise perakende yatırımcılara yönelik halka arz planlarını duyurarak sektördeki rekabeti yeni bir boyuta taşıdı.

## Intel Stratejik Geri Alım Hamlesi

Çip devi Intel, İrlanda'daki Fab 34 tesisindeki yüzde 49'luk hissesini yatırım şirketi Apollo'dan 14,2 milyar dolara geri alma kararı aldı. Haber sonrası Intel hisseleri yüzde 9 değer kazandı. Bu hamle, Intel'in üretim kapasitesini yeniden tam kontrol altına alma stratejisinin önemli bir parçası olarak değerlendiriliyor.

## Sektörün Genel Tablosu

TSMC rekor büyüme rakamlarını açıklarken, Apple da CarPlay platformuna ChatGPT sesli asistan desteği entegre etti. Yapay zeka teknolojileri bir yandan yeni iş modelleri yaratırken, diğer yandan geleneksel pozisyonlardaki istihdamı hızla dönüştürmeye devam ediyor.`,
  },
  'ru-tekhnologii-uvolneniya-intel': {
    title: 'Увольнения в IT и покупка Intel за $14,2 млрд',
    date: '2026-04-12',
    category: 'Технологии',
    locale: 'ru',
    content: `Технологическая отрасль переживает масштабные перемены: волна увольнений, связанных с искусственным интеллектом, продолжает нарастать, а крупнейшие компании перестраивают стратегии в условиях AI-революции. С начала 2026 года уже уволены 78 557 работников технологического сектора, причём 48 процентов сокращений напрямую связаны с внедрением ИИ.

## Сделка Intel

Ключевым событием недели стала сделка Intel по выкупу 49-процентной доли фабрики Fab 34 в Ирландии у инвестиционной компании Apollo за 14,2 миллиарда долларов. Акции Intel на этой новости выросли на 9 процентов. Сделка укрепляет позиции Intel в полупроводниковом производстве на фоне рекордного роста выручки конкурента TSMC.

## Гонка AI-компаний

Anthropic завершила тендер на привлечение инвестиций при оценке компании в 350 миллиардов долларов. Amazon подтвердила, что искусственный интеллект стал многомиллиардным источником дохода для корпорации. OpenAI объявила о планах провести IPO с доступом для розничных инвесторов, что может стать одним из крупнейших публичных размещений в технологическом секторе.

## Тренды и потребительские продукты

Apple интегрировала голосовой ChatGPT в систему CarPlay, что знаменует новый этап сотрудничества между технологическими гигантами в области потребительского ИИ. Эксперты отмечают, что рынок труда в технологиях продолжит трансформироваться, и компании будут всё активнее заменять рутинные позиции решениями на базе искусственного интеллекта.`,
  },

  // ========== 2026-04-10 ==========

  // --- Artemis II Crew Splashes Down After Moon Flyby ---
  'artemis-2-ekipaj-sakit-okeana-enis': {
    title: 'Artemis II Ekipajı Ay Uçuşundan Okeana Eniş Etdi',
    date: '2026-04-10',
    category: 'Elm',
    locale: 'az',
    content: `NASA-nın Artemis II missiyası 10 günlük tarixi Ay uçuşunu uğurla başa vurub. Orion kapsulu 10 aprel 2026-cı il tarixində saat 20:07-də (EDT) San Dieqo yaxınlığında Sakit Okeana eniş edib. Bu, 1972-ci ildəki Apollo 17 missiyasından bəri — yəni 54 il sonra — insanların aşağı Yer orbitindən kənara ilk uçuşu olub.

## Ekipaj Haqqında

Missiyada dörd astronavt iştirak edib: komandir Reid Wiseman, pilot Victor Glover, missiya mütəxəssisi Christina Koch və kanadalı astronavt Jeremy Hansen. Victor Glover Ayın ətrafında uçan ilk afroamerikalı astronavt, Christina Koch isə bu məsafəyə çatan ilk qadın olub. Jeremy Hansen Kanadanın dərin kosmosa göndərdiyi ilk astronavtdır.

## Eniş Anı və Bərpa Əməliyyatı

Orion kapsulu atmosferə daxil olarkən 6 dəqiqəlik rabitə kəsilməsi yaşanıb. Ekipaj üzvləri yenidən girişdə 3,9 G-yə qədər yüklənmə hiss ediblər. USS John P. Murtha gəmisi bərpa əməliyyatını həyata keçirib. Netflix eniş anını canlı yayımlayıb və milyonlarla tamaşaçı bu tarixi anı izləyib.

## "Yer Batması" Fotoşəkli

Ekipaj Ayın arxasından keçərkən tarixi "Yer batması" (Earthset) fotoşəklini çəkib. Bu kadr Yerin Ay üfüqünün arxasında itməsini əks etdirir və kosmik tədqiqat tarixinin ən əlamətdar görüntülərindən biri hesab olunur. NASA rəhbərliyi missiyanı Artemis proqramının böyük uğuru kimi qiymətləndirib və gələcək Ay enişi missiyaları üçün vacib addım adlandırıb.`,
  },
  'en-artemis-2-crew-pacific-splashdown': {
    title: 'Artemis II Crew Splashes Down After Historic Moon Flyby',
    date: '2026-04-10',
    category: 'Science',
    locale: 'en',
    content: `NASA's Artemis II mission has completed its historic 10-day lunar flyby, with the Orion capsule splashing down in the Pacific Ocean off San Diego at 8:07 p.m. EDT on April 10, 2026. This marks the first crewed flight beyond low Earth orbit since Apollo 17 in 1972 — a gap of 54 years that has finally been bridged.

## The Crew

The four-member crew includes Commander Reid Wiseman, Pilot Victor Glover, Mission Specialist Christina Koch, and Canadian astronaut Jeremy Hansen. Glover becomes the first African American astronaut to fly around the Moon, Koch the first woman to travel this far from Earth, and Hansen the first Canadian to venture into deep space.

## Reentry and Recovery

During reentry, the Orion capsule experienced a tense 6-minute communications blackout as it plunged through the atmosphere at extreme speeds. The crew endured forces of up to 3.9 Gs before the capsule's parachutes deployed successfully over the Pacific. The USS John P. Murtha conducted the recovery operation, retrieving the capsule and crew from the ocean. Netflix streamed the entire splashdown live, drawing millions of viewers worldwide.

## The Historic "Earthset" Photo

One of the mission's most memorable moments came when the crew captured a stunning "Earthset" photograph — showing Earth disappearing behind the lunar horizon as Orion passed behind the far side of the Moon. The image is already being compared to the iconic "Earthrise" photo from Apollo 8. NASA leadership has hailed the mission as a critical milestone for the Artemis program and a vital stepping stone toward future crewed lunar landings.`,
  },
  'tr-artemis-2-ekibi-pasifik-inis': {
    title: 'Artemis II Ekibi Ay Uçuşu Sonrası Pasifiğe İniş Yaptı',
    date: '2026-04-10',
    category: 'Bilim',
    locale: 'tr',
    content: `NASA'nın Artemis II görevi, 10 günlük tarihi Ay uçuşunu başarıyla tamamladı. Orion kapsülü 10 Nisan 2026 tarihinde saat 20:07'de (EDT) San Diego açıklarında Pasifik Okyanusuna iniş yaptı. Bu, 1972'deki Apollo 17 görevinden bu yana — yani 54 yıl sonra — insanoğlunun alçak Dünya yörüngesinin ötesine ilk uçuşu oldu.

## Mürettebat

Görevde dört astronot yer aldı: Komutan Reid Wiseman, Pilot Victor Glover, Görev Uzmanı Christina Koch ve Kanadalı astronot Jeremy Hansen. Victor Glover, Ay çevresinde uçan ilk Afro-Amerikalı astronot olurken, Christina Koch bu mesafeye ulaşan ilk kadın oldu. Jeremy Hansen ise Kanada'nın derin uzaya gönderdiği ilk astronot olarak tarihe geçti.

## İniş ve Kurtarma Operasyonu

Orion kapsülü atmosfere girerken 6 dakikalık bir iletişim kesintisi yaşandı. Mürettebat üyeleri yeniden giriş sırasında 3,9 G'ye kadar kuvvet hissettiler. USS John P. Murtha gemisi kurtarma operasyonunu gerçekleştirdi. Netflix iniş anını canlı olarak yayınladı ve milyonlarca izleyici bu tarihi anı takip etti.

## Tarihi "Dünya Batışı" Fotoğrafı

Mürettebat, Ay'ın arka tarafından geçerken tarihi bir "Dünya batışı" (Earthset) fotoğrafı çekti. Bu kare, Dünya'nın Ay ufkunun arkasında kaybolmasını göstermektedir ve uzay araştırma tarihinin en çarpıcı görüntülerinden biri olarak değerlendiriliyor. NASA yönetimi görevi, Artemis programının büyük bir başarısı ve gelecekteki Ay iniş görevleri için kritik bir adım olarak nitelendirdi.`,
  },
  'ru-artemis-2-ekipazh-posadka-tixiy-okean': {
    title: 'Экипаж Artemis II приводнился после облёта Луны',
    date: '2026-04-10',
    category: 'Наука',
    locale: 'ru',
    content: `Миссия Artemis II завершила свой исторический 10-дневный облёт Луны. Капсула Orion приводнилась в Тихом океане у побережья Сан-Диего в 20:07 по восточному времени 10 апреля 2026 года. Это первый пилотируемый полёт за пределы низкой околоземной орбиты со времён миссии Apollo 17 в 1972 году — спустя 54 года.

## Экипаж

В миссии участвовали четыре астронавта: командир Рид Уайзман, пилот Виктор Гловер, специалист миссии Кристина Кох и канадский астронавт Джереми Хансен. Виктор Гловер стал первым афроамериканцем, совершившим облёт Луны. Кристина Кох — первая женщина, достигшая такого расстояния от Земли. Джереми Хансен вошёл в историю как первый канадец в дальнем космосе.

## Посадка и спасательная операция

При входе в атмосферу капсула Orion пережила 6-минутное отключение связи. Члены экипажа испытали перегрузки до 3,9 G во время спуска. Корабль USS John P. Murtha провёл спасательную операцию, подняв капсулу и экипаж из океана. Netflix вёл прямую трансляцию приводнения, которую смотрели миллионы зрителей по всему миру.

## Историческое фото «Заход Земли»

Одним из самых запоминающихся моментов миссии стал снимок «Захода Земли» (Earthset) — фотография, на которой Земля скрывается за лунным горизонтом. Этот кадр уже сравнивают со знаменитым снимком «Восход Земли» миссии Apollo 8. Руководство NASA назвало миссию важнейшей вехой программы Artemis и ключевым шагом к будущим пилотируемым посадкам на Луну.`,
  },

  // --- Vance Heads to Islamabad for Iran Ceasefire Talks ---
  'vans-islamabada-yollanir-iran-danisiqlar': {
    title: 'Vans İran Danışıqları Üçün İslamabada Yollanır',
    date: '2026-04-10',
    category: 'Dünya',
    locale: 'az',
    content: `ABŞ vitse-prezidenti C.D. Vans yüksək səviyyəli ABŞ-İran danışıqları üçün Pakistanın paytaxtı İslamabada səfər edib. Yaxın Şərq münaqişəsinin 41-ci günündə keçirilən bu görüşlər regional sabitlik üçün həlledici əhəmiyyət daşıyır.

## Danışıqların Təfərrüatları

İranın xarici işlər nazirinin müavini Məcid Təxt-Rəvançi Tehranın 10 maddəlik planının danışıqların əsasını təşkil edəcəyini bildirib. Prezident Tramp İranın Hörmüz boğazını yenidən açması şərti ilə İrana qarşı bombardman hücumlarını 2 həftə müddətinə dayandırmağa razılaşıb. Bu, hər iki tərəf üçün vacib güzəşt hesab olunur.

## İslamabadda Təhlükəsizlik Tədbirləri

Pakistan hökuməti danışıqlar öncəsi İslamabadı ciddi şəkildə bağlayıb. Şəhərin müxtəlif nöqtələrində yoxlama məntəqələri qurulub, hərbi və polis qüvvələri gücləndirilmiş rejimə keçib. Diplomatik ərazilər ətrafında geniş təhlükəsizlik perimetri yaradılıb.

## İsrail-Hizbullah Münaqişəsi

Bu danışıqlar fonunda İsrail Livanda Hizbullaha qarşı yeni zərbələr endirib. Münaqişənin başlanğıcından bu yana 1400-dən çox Hizbullah döyüşçüsü məhv edilib. Regional gərginliyin artması danışıqların vacibliyini daha da artırır. Ekspertlər bildirir ki, Hörmüz boğazının bağlı qalması qlobal neft bazarlarında ciddi böhrana səbəb ola bilər və bu, danışıqların uğurla nəticələnməsini daha da zəruri edir.`,
  },
  'en-vance-islamabad-iran-ceasefire-talks': {
    title: 'Vance Heads to Islamabad for Iran Ceasefire Talks',
    date: '2026-04-10',
    category: 'World',
    locale: 'en',
    content: `Vice President JD Vance has traveled to Islamabad, Pakistan for high-stakes negotiations between the United States and Iran. The talks come on Day 41 of the Middle East conflict and represent a critical juncture for regional stability and global energy markets.

## Negotiation Framework

Iran's Deputy Foreign Minister Majid Takht-Ravanchi has indicated that Tehran's 10-point plan will serve as the basis for negotiations. President Trump has agreed to suspend bombing attacks against Iran for two weeks, contingent on Iran reopening the Strait of Hormuz. This mutual concession is seen as a fragile but potentially significant step toward de-escalation.

## Islamabad on Lockdown

The Pakistani government has implemented sweeping security measures ahead of the talks. Islamabad has been locked down with checkpoints established at key intersections across the city. Military and police forces are operating on heightened alert, and a wide security perimeter has been established around diplomatic zones.

## Israel-Hezbollah Escalation

Against the backdrop of these negotiations, Israel has launched fresh strikes against Hezbollah positions in Lebanon. More than 1,400 Hezbollah operatives have been killed since the start of the conflict. The parallel escalation adds urgency to the diplomatic efforts in Islamabad. Analysts warn that the continued closure of the Strait of Hormuz could trigger a severe global energy crisis, with oil prices already nearing record levels and threatening to push the world economy into recession.`,
  },
  'tr-vance-islamabad-iran-ateskes-gorusmeleri': {
    title: 'Vance İran Ateşkes Görüşmeleri İçin İslamabada Gitti',
    date: '2026-04-10',
    category: 'Dünya',
    locale: 'tr',
    content: `ABD Başkan Yardımcısı JD Vance, yüksek riskli ABD-İran müzakereleri için Pakistan'ın başkenti İslamabad'a gitti. Ortadoğu çatışmasının 41. gününde gerçekleşen bu görüşmeler, bölgesel istikrar ve küresel enerji piyasaları açısından kritik bir dönüm noktasını temsil ediyor.

## Müzakere Çerçevesi

İran Dışişleri Bakan Yardımcısı Mecid Taht-Revanşi, Tahran'ın 10 maddelik planının müzakerelerin temelini oluşturacağını belirtti. Başkan Trump, İran'ın Hürmüz Boğazı'nı yeniden açması koşuluyla İran'a yönelik bombardıman saldırılarını 2 hafta süreyle askıya almayı kabul etti. Bu karşılıklı taviz, kırılgan ancak önemli bir gerilim azaltma adımı olarak değerlendiriliyor.

## İslamabad'da Güvenlik Önlemleri

Pakistan hükümeti görüşmeler öncesinde İslamabad'ı sıkı bir şekilde kapattı. Şehrin çeşitli noktalarında kontrol noktaları kuruldu, askeri ve polis kuvvetleri yüksek alarm durumuna geçti. Diplomatik bölgelerin çevresinde geniş bir güvenlik çemberi oluşturuldu.

## İsrail-Hizbullah Çatışması

Bu müzakerelerin arka planında İsrail, Lübnan'daki Hizbullah mevzilerine yeni saldırılar düzenledi. Çatışmanın başlangıcından bu yana 1.400'den fazla Hizbullah militanı öldürüldü. Paralel tırmanma, İslamabad'daki diplomatik çabalara aciliyet katıyor. Analistler, Hürmüz Boğazı'nın kapalı kalmasının küresel bir enerji krizini tetikleyebileceği ve dünya ekonomisini resesyona sürükleyebileceği konusunda uyarıyor.`,
  },
  'ru-vans-islamabad-peregovory-iran': {
    title: 'Вэнс в Исламабаде на переговорах по Ирану',
    date: '2026-04-10',
    category: 'Мир',
    locale: 'ru',
    content: `Вице-президент США Джей Ди Вэнс прибыл в Исламабад для проведения напряжённых переговоров между Соединёнными Штатами и Ираном. Переговоры проходят на 41-й день ближневосточного конфликта и представляют собой критически важный момент для региональной стабильности и мировых энергетических рынков.

## Рамки переговоров

Заместитель министра иностранных дел Ирана Маджид Тахт-Раванчи заявил, что 10-пунктный план Тегерана станет основой для переговоров. Президент Трамп согласился приостановить бомбардировки Ирана на две недели при условии, что Иран откроет Ормузский пролив. Эта взаимная уступка рассматривается как хрупкий, но потенциально значимый шаг к деэскалации.

## Исламабад на замке

Правительство Пакистана ввело масштабные меры безопасности накануне переговоров. Город был заблокирован контрольно-пропускными пунктами на ключевых перекрёстках. Военные и полицейские силы переведены в режим повышенной готовности, а вокруг дипломатических зон создан широкий периметр безопасности.

## Эскалация конфликта между Израилем и Хезболлой

На фоне переговоров Израиль нанёс новые удары по позициям Хезболлы в Ливане. С начала конфликта было уничтожено более 1400 боевиков Хезболлы. Параллельная эскалация усиливает срочность дипломатических усилий в Исламабаде. Аналитики предупреждают, что продолжающееся закрытие Ормузского пролива может спровоцировать тяжёлый глобальный энергетический кризис, при том что цены на нефть уже приближаются к рекордным уровням.`,
  },

  // --- US CPI Jumps to 3.3% Year-over-Year as Oil Prices Surge ---
  'abs-istehlak-qiymetleri-3-3-faiz-neft': {
    title: 'ABŞ İstehlak Qiymətləri 3,3%-ə Yüksəldi, Neft Sıçrayır',
    date: '2026-04-10',
    category: 'İqtisadiyyat',
    locale: 'az',
    content: `ABŞ İstehlak Qiymətləri İndeksi (CPI) aylıq 0,9% və illik 3,3% artım göstərib. Benzin qiymətlərinin 21,2% bahalaşması aylıq CPI artımının təqribən dörddə üçünü təşkil edib. Hörmüz boğazı ilə bağlı risklər fonunda xam neft qiyməti barrelə 98 dollara yaxınlaşıb.

## Enerji Sektoru və İnflyasiya

Neft qiymətlərindəki kəskin artım birbaşa olaraq istehlakçı xərclərinə təsir göstərir. Hörmüz boğazının bağlı qalma ehtimalı qlobal neft tədarükündə ciddi narahatlıq yaradır. Bu vəziyyət mərkəzi bankların inflyasiya ilə mübarizə strategiyasını çətinləşdirir. Enerji xərclərinin artması digər sektorlara da yayılaraq ərzaq və nəqliyyat qiymətlərini yüksəldir.

## Texnologiya Sektoru

Proqram təminatı səhmləri süni intellekt pozulması narahatlıqları fonunda təxminən 5% düşüb. Lakin yarımkeçirici və süni intellekt infrastruktur səhmləri artım liderləri olub. Bu, bazarın texnologiya sektoru daxilində kəskin differensiasiya etdiyini göstərir. İnvestorlar ənənəvi proqram təminatı şirkətlərindən çıxaraq aparıcı süni intellekt infrastruktur şirkətlərinə yönəliblər.

## Birja Göstəriciləri

S&P 500 indeksi cümə axşamı günü 0,6% artımla bağlanıb. Bazarlar inflyasiya məlumatlarına nisbətən sakit reaksiya verib, lakin analitiklər Hörmüz boğazı böhranının davam etməsi halında daha ciddi dalğalanmaların qaçılmaz olacağını xəbərdar edir. Federal Ehtiyat Sisteminin faiz dərəcəsi qərarları da diqqət mərkəzindədir.`,
  },
  'en-us-cpi-3-3-percent-oil-surge': {
    title: 'US CPI Jumps to 3.3% Year-over-Year as Oil Prices Surge',
    date: '2026-04-10',
    category: 'Economy',
    locale: 'en',
    content: `The US Consumer Price Index rose 0.9% month-over-month and 3.3% year-over-year, driven overwhelmingly by soaring energy costs. Gasoline prices surged 21.2%, accounting for nearly three-quarters of the monthly CPI increase. Crude oil is trading near $98 per barrel as risks to the Strait of Hormuz continue to rattle global energy markets.

## Energy Sector and Inflation Pressure

The sharp rise in oil prices is feeding directly into consumer costs across the economy. The potential closure of the Strait of Hormuz — through which roughly 20% of the world's oil passes daily — has created severe anxiety in global supply chains. This situation complicates the Federal Reserve's strategy for combating inflation. Rising energy costs are spilling over into food and transportation prices, putting additional strain on household budgets.

## Technology Sector Divergence

Software stocks fell approximately 5% amid growing concerns about AI disruption to traditional business models. However, semiconductor and AI infrastructure stocks led the market's upside, reflecting investors' conviction that the AI buildout will continue regardless of broader economic headwinds. The divergence signals a significant rotation within the technology sector itself.

## Market Performance

The S&P 500 ended Thursday up 0.6%, showing relative resilience despite the hot inflation print. Markets appear to be pricing in the expectation that energy-driven inflation may prove transitory if diplomatic efforts in Islamabad succeed. However, analysts warn that a prolonged Strait of Hormuz crisis could push oil well above $100 per barrel, potentially triggering a broader economic downturn.`,
  },
  'tr-abd-tufe-3-3-petrol-fiyatlari-yukselis': {
    title: 'ABD TÜFE Yıllık %3,3\'e Yükseldi — Petrol Fiyatları Fırlıyor',
    date: '2026-04-10',
    category: 'Ekonomi',
    locale: 'tr',
    content: `ABD Tüketici Fiyat Endeksi (TÜFE) aylık %0,9 ve yıllık %3,3 artış gösterdi. Benzin fiyatlarındaki %21,2'lik sıçrama, aylık TÜFE artışının yaklaşık dörtte üçünü oluşturdu. Hürmüz Boğazı riskleri nedeniyle ham petrol fiyatı varil başına 98 dolara yaklaştı.

## Enerji Sektörü ve Enflasyon Baskısı

Petrol fiyatlarındaki keskin yükseliş doğrudan tüketici harcamalarına yansıyor. Dünya petrolünün yaklaşık %20'sinin günlük geçtiği Hürmüz Boğazı'nın kapanma ihtimali, küresel tedarik zincirlerinde ciddi endişe yaratıyor. Bu durum merkez bankalarının enflasyonla mücadele stratejisini zorlaştırıyor. Enerji maliyetlerindeki artış gıda ve ulaşım fiyatlarına da sıçrayarak hane halkı bütçeleri üzerinde ek baskı oluşturuyor.

## Teknoloji Sektöründe Ayrışma

Yazılım hisseleri, yapay zeka kaynaklı yıkım endişeleri arasında yaklaşık %5 düştü. Ancak yarı iletken ve yapay zeka altyapı hisseleri piyasanın yükseliş liderleriydi. Bu ayrışma, yatırımcıların geleneksel yazılım şirketlerinden çıkarak yapay zeka altyapı şirketlerine yöneldiğini gösteriyor.

## Piyasa Performansı

S&P 500 endeksi perşembe gününü %0,6 artışla kapattı. Piyasalar sıcak enflasyon verisine rağmen görece dirençli bir görünüm sergiledi. Analistler, İslamabad'daki diplomatik çabaların başarılı olması halinde enerji kaynaklı enflasyonun geçici kalabileceğini belirtirken, Hürmüz Boğazı krizinin uzaması durumunda petrolün varil başına 100 doları aşabileceği ve daha geniş bir ekonomik gerilemeyi tetikleyebileceği konusunda uyarıyor.`,
  },
  'ru-inflyaciya-ssha-3-3-neft-rost': {
    title: 'Инфляция в США достигла 3,3% на фоне роста цен на нефть',
    date: '2026-04-10',
    category: 'Экономика',
    locale: 'ru',
    content: `Индекс потребительских цен (ИПЦ) в США вырос на 0,9% за месяц и на 3,3% в годовом исчислении. Цены на бензин подскочили на 21,2%, составив почти три четверти месячного роста ИПЦ. Стоимость сырой нефти приближается к 98 долларам за баррель из-за рисков, связанных с Ормузским проливом.

## Энергетический сектор и инфляционное давление

Резкий рост цен на нефть напрямую влияет на потребительские расходы по всей экономике. Потенциальное закрытие Ормузского пролива, через который ежедневно проходит около 20% мировой нефти, создаёт серьёзную тревогу в глобальных цепочках поставок. Эта ситуация осложняет стратегию Федеральной резервной системы по борьбе с инфляцией. Рост стоимости энергоносителей перекидывается на цены продуктов питания и транспорта, создавая дополнительное давление на семейные бюджеты.

## Расхождение в технологическом секторе

Акции софтверных компаний упали примерно на 5% на фоне опасений по поводу разрушительного влияния искусственного интеллекта на традиционные бизнес-модели. Однако акции полупроводниковых компаний и компаний инфраструктуры ИИ возглавили рост рынка. Это расхождение свидетельствует о значительной ротации внутри самого технологического сектора.

## Показатели рынка

Индекс S&P 500 завершил четверг ростом на 0,6%, продемонстрировав относительную устойчивость несмотря на высокие данные по инфляции. Аналитики предупреждают, что затяжной кризис в Ормузском проливе может поднять стоимость нефти выше 100 долларов за баррель, что потенциально спровоцирует более широкий экономический спад.`,
  },

  // --- Anthropic Surpasses OpenAI in Revenue at $30B ARR; Both Eye IPOs ---
  'anthropic-openai-gelirleri-ipo-planlar': {
    title: 'Anthropic OpenAI-ni Keçdi: $30B Gəlir, IPO Yolda',
    date: '2026-04-10',
    category: 'Texnologiya',
    locale: 'az',
    content: `Süni intellekt sənayesində gözlənilməz dönüş baş verdi: Anthropic şirkəti illik gəlirdə OpenAI-ni geridə qoyaraq $30 milyard illik gəlir həddinə çatıb. OpenAI-nin cari illik gəliri isə $25 milyard səviyyəsindədir. Bu rəqəmlər sənayedə güc balansının ciddi şəkildə dəyişdiyini göstərir.

## Anthropic-in uğur formulu

Anthropic-in ən diqqətçəkən göstəricisi onun xərc effektivliyidir. Şirkət təlim xərclərinə OpenAI-dən təxminən 4 dəfə az vəsait xərcləyir, lakin daha yüksək gəlir əldə edir. Bu, Claude modelləri arxasındakı mühəndislik səmərəliliyinin birbaşa nəticəsidir. Gəlirin 80%-i korporativ müştərilərdən gəlir -- ildə $1 milyondan çox xərcləyən 1000-dən artıq müştəri Anthropic-in əsas gəlir bazasını təşkil edir.

## IPO yarışı başlayır

Hər iki şirkət bazar tarixinin ən böyük texnologiya IPO-larına hazırlaşır. Anthropic ən tez 2026-cı ilin oktyabrında IPO keçirməyi qiymətləndirir və $380 milyard qiymətləndirmə hədəfləyir. OpenAI isə 2026-cı ilin 4-cü rübündə IPO planlaşdırır və təxminən $1 trilyon qiymətləndirməyə nail olmağı hədəfləyir.

## Digər böyük IPO-lar

SpaceX də iyun ayında investor roadshow planlaşdırır ki, bu da 2026-cı ili texnologiya IPO-larının ən aktiv ili edə bilər. Süni intellekt sənayesinin iki nəhənginin eyni vaxtda birjaya çıxması investorlar üçün həm böyük fürsət, həm də ciddi seçim yaradacaq.`,
  },
  'en-anthropic-surpasses-openai-revenue-ipo': {
    title: 'Anthropic Tops OpenAI at $30B ARR; Both Eye IPO',
    date: '2026-04-10',
    category: 'Technology',
    locale: 'en',
    content: `A major shift in the artificial intelligence industry has emerged: Anthropic has overtaken OpenAI in annualized revenue, reaching $30 billion ARR compared to OpenAI's $25 billion. The milestone marks a dramatic reshuffling of the AI power hierarchy that few predicted even a year ago.

## Anthropic's efficiency advantage

Perhaps the most striking aspect of Anthropic's rise is its cost discipline. The company spends roughly four times less on model training than OpenAI, yet generates significantly higher revenue. This efficiency stems from the engineering philosophy behind its Claude model family. Enterprise customers form the backbone of the business -- over 1,000 clients spending more than $1 million per year account for 80% of total revenue, underscoring the strength of Anthropic's B2B strategy.

## The IPO race heats up

Both AI giants are now preparing for what could be the largest technology IPOs in history. Anthropic is evaluating a public offering as early as October 2026, targeting a valuation of approximately $380 billion. OpenAI, meanwhile, plans its IPO for Q4 2026 with an even more ambitious target of roughly $1 trillion. If successful, OpenAI's offering would rank among the largest ever across any sector.

## A banner year for tech IPOs

SpaceX is also planning an investor roadshow in June, potentially making 2026 the most active year for major technology IPOs in over two decades. For investors, the simultaneous public debuts of the two leading AI companies present both extraordinary opportunity and a complex decision about which vision of artificial intelligence will ultimately prevail.`,
  },
  'tr-anthropic-openai-gelir-ipo-planlar': {
    title: 'Anthropic OpenAI\'yi Geçti: $30B Gelir, IPO Yolda',
    date: '2026-04-10',
    category: 'Teknoloji',
    locale: 'tr',
    content: `Yapay zeka sektöründe beklenmedik bir gelişme yaşandı: Anthropic, yıllık gelirde OpenAI'yi geride bırakarak 30 milyar dolarlık yıllık gelir eşiğine ulaştı. OpenAI'nin mevcut yıllık geliri ise 25 milyar dolar seviyesinde bulunuyor. Bu rakamlar sektördeki güç dengesinin ciddi şekilde değiştiğini ortaya koyuyor.

## Anthropic'in başarı formülü

Anthropic'in en dikkat çekici göstergesi maliyet verimliliğidir. Şirket, eğitim harcamalarına OpenAI'den yaklaşık 4 kat daha az kaynak ayırıyor, ancak daha yüksek gelir elde ediyor. Bu durum Claude modelleri arkasındaki mühendislik verimliliğinin doğrudan bir sonucudur. Gelirin yüzde 80'i kurumsal müşterilerden geliyor -- yılda 1 milyon dolardan fazla harcayan 1.000'den fazla müşteri Anthropic'in temel gelir tabanını oluşturuyor.

## IPO yarışı başlıyor

Her iki şirket de borsa tarihinin en büyük teknoloji halka arzlarına hazırlanıyor. Anthropic, en erken Ekim 2026'da halka arz gerçekleştirmeyi değerlendiriyor ve 380 milyar dolarlık bir değerleme hedefliyor. OpenAI ise 2026'nın 4. çeyreğinde halka arz planlıyor ve yaklaşık 1 trilyon dolarlık bir değerlemeye ulaşmayı hedefliyor.

## Diğer büyük halka arzlar

SpaceX de Haziran ayında yatırımcı roadshow planlamaktadır, bu da 2026'yı teknoloji halka arzlarının en aktif yılı yapabilir. Yapay zeka sektörünün iki devinin aynı anda borsaya çıkması yatırımcılar için hem büyük fırsat hem de ciddi bir tercih kararı yaratacaktır.`,
  },
  'ru-anthropic-openai-dokhody-ipo': {
    title: 'Anthropic опередила OpenAI: $30 млрд ARR, обе к IPO',
    date: '2026-04-10',
    category: 'Технологии',
    locale: 'ru',
    content: `В индустрии искусственного интеллекта произошёл неожиданный поворот: компания Anthropic обогнала OpenAI по годовой выручке, достигнув отметки в $30 миллиардов годового дохода. Текущая годовая выручка OpenAI составляет $25 миллиардов. Эти цифры свидетельствуют о серьёзном изменении расстановки сил в отрасли.

## Формула успеха Anthropic

Наиболее примечательным показателем Anthropic является эффективность расходов. Компания тратит на обучение моделей примерно в 4 раза меньше, чем OpenAI, при этом генерируя более высокую выручку. Это прямой результат инженерной эффективности, заложенной в семейство моделей Claude. 80% доходов приходится на корпоративных клиентов -- более 1000 клиентов, тратящих свыше $1 миллиона в год, составляют основную базу доходов Anthropic.

## Гонка IPO начинается

Оба гиганта ИИ готовятся к тому, что может стать крупнейшими технологическими IPO в истории. Anthropic рассматривает возможность выхода на биржу уже в октябре 2026 года с целевой оценкой около $380 миллиардов. OpenAI планирует IPO на четвёртый квартал 2026 года с ещё более амбициозной целью -- приблизительно $1 триллион.

## Другие крупные IPO

SpaceX также планирует инвесторский роудшоу в июне, что может сделать 2026 год самым активным годом для технологических IPO. Одновременный выход на биржу двух лидеров ИИ-индустрии создаст для инвесторов как огромные возможности, так и непростой выбор между двумя видениями будущего искусственного интеллекта.`,
  },

  // --- DOJ Launches Antitrust Investigation Into NFL Over Streaming TV Deals ---
  'abd-edalat-nazirliyi-nfl-antitrest-arasdirma': {
    title: 'ABŞ Ədliyyə NFL-ə Antitrest Araşdırması Başlatdı',
    date: '2026-04-10',
    category: 'Biznes',
    locale: 'az',
    content: `ABŞ Ədliyyə Nazirliyi (DOJ) Milli Futbol Liqasına (NFL) qarşı antitrest araşdırması başladıb. Araşdırma NFL-in striming televiziya müqavilələri vasitəsilə istehlakçılara həddən artıq abunə haqları tətbiq edib-etmədiyini yoxlayacaq. Bu, peşəkar idmanın yayımlanma modelini kökündən dəyişdirə biləcək tarixi bir addımdır.

## Problem: 10 platforma yayılmış oyunlar

NFL oyunları hazırda Prime Video, Netflix, Peacock, Paramount+ və digər platformalar daxil olmaqla 10 müxtəlif striming xidmətinə yayılıb. Bu o deməkdir ki, bütün NFL oyunlarını izləmək istəyən azarkeşlər çoxsaylı abunəliklər üçün ayda yüzlərlə dollar ödəməli olurlar.

## Qanuni əsas: 1961-ci il istisnası streaminqə şamil olunmur

NFL 1961-ci il İdman Yayım Aktı çərçivəsində antitrest istisnasından yararlanır, lakin bu istisna yalnız ənənəvi televiziya yayımını əhatə edir, striming xidmətlərini yox. Senator Mayk Li araşdırmaya dəstəyini ifadə edib. NFL isə cavab olaraq oyunların 87%-nin hələ də pulsuz televiziyada yayımlandığını bildirib.

## Geniş təsir

Araşdırmanın nəticəsi yalnız NFL-i deyil, bütün peşəkar idman liqalarının striming strategiyalarını təsir edə bilər. İstehlakçılar üçün bu, daha əlçatan qiymətlər və daha sadə yayım modelləri demək ola bilər.`,
  },
  'en-doj-antitrust-investigation-nfl-streaming': {
    title: 'DOJ Launches Antitrust Probe Into NFL Streaming',
    date: '2026-04-10',
    category: 'Business',
    locale: 'en',
    content: `The United States Department of Justice has opened a formal antitrust investigation into the National Football League, examining whether the league is forcing excessive subscription fees on consumers through its streaming television deals. The probe could fundamentally reshape how professional sports are distributed and priced in the streaming era.

## The problem: games spread across 10 platforms

NFL games are currently distributed across approximately 10 different streaming platforms, including Prime Video, Netflix, Peacock, Paramount+, and several others. For fans who want to watch all NFL games, the cumulative cost of multiple subscriptions runs into hundreds of dollars per month -- a dramatic increase from the era when most games aired on free broadcast television.

## Legal basis: 1961 exemption does not cover streaming

The NFL has long benefited from an antitrust exemption under the Sports Broadcast Act of 1961, which allows the league to negotiate television contracts collectively rather than team by team. However, that exemption was written specifically for broadcast television and does not extend to streaming platforms. Senator Mike Lee has expressed support for the investigation, arguing that the league is exploiting a legal grey area.

## NFL's response

The NFL has pushed back, stating that 87% of its games remain available on free broadcast television. The league maintains that its streaming deals expand access rather than restrict it.

## Broader implications

The outcome of this investigation could set precedent well beyond football. Every major professional sports league has aggressively pursued streaming deals in recent years, and a ruling against the NFL would likely force all of them to reconsider their distribution strategies, potentially leading to more affordable and simplified viewing options for consumers.`,
  },
  'tr-abd-adalet-bakanligi-nfl-antitrost-sorusturma': {
    title: 'ABD Adalet Bakanlığı NFL\'e Antitröst Soruşturma Açtı',
    date: '2026-04-10',
    category: 'İş Dünyası',
    locale: 'tr',
    content: `ABD Adalet Bakanlığı (DOJ), Ulusal Futbol Ligi'ne (NFL) karşı antitröst soruşturması başlattı. Soruşturma, NFL'in yayın anlaşmaları yoluyla tüketicilere aşırı abonelik ücretleri dayatıp dayatmadığını inceleyecek. Bu karar, profesyonel sporun yayın modelini kökten değiştirebilecek tarihi bir adım olarak değerlendiriliyor.

## Sorun: 10 platforma dağılmış maçlar

NFL maçları şu anda Prime Video, Netflix, Peacock, Paramount+ ve diğer platformalar dahil olmak üzere 10 farklı yayın hizmetine dağılmış durumda. Bu durum, tüm NFL maçlarını izlemek isteyen taraftarların çok sayıda abonelik için ayda yüzlerce dolar ödemesini gerektiriyor. Bu, maçların çoğunun ücretsiz televizyonda yayınlandığı döneme kıyasla dramatik bir artış.

## Hukuki zemin: 1961 muafiyeti yayıncılığı kapsamıyor

NFL, 1961 tarihli Spor Yayın Yasası kapsamındaki antitröst muafiyetinden yararlanmaktadır. Ancak bu muafiyet yalnız geleneksel televizyon yayıncılığını kapsar, dijital yayın hizmetlerini kapsamaz. Senatör Mike Lee soruşturmaya desteğini açıklamıştır. NFL ise maçların yüzde 87'sinin hâlâ ücretsiz televizyonda yayınlandığını belirterek yanıt vermiştir.

## Geniş etkiler

Soruşturmanın sonucu yalnız NFL'i değil, tüm profesyonel spor liglerinin yayın stratejilerini etkileyebilir. Tüketiciler açısından bu, daha erişilebilir fiyatlar ve daha basit yayın modelleri anlamına gelebilir. Son yıllarda tüm büyük spor ligleri agresif yayın anlaşmaları peşinde koşmuş olup NFL aleyhine bir karar verilmesi halinde diğer liglerin de stratejilerini gözden geçirmesi kaçınılmaz olacaktır.`,
  },
  'ru-minyust-ssha-antimonopolnoe-rassledovanie-nfl': {
    title: 'Минюст США начал антимонопольное дело против NFL',
    date: '2026-04-10',
    category: 'Бизнес',
    locale: 'ru',
    content: `Министерство юстиции США открыло официальное антимонопольное расследование в отношении Национальной футбольной лиги (NFL). Расследование направлено на проверку того, навязывает ли лига потребителям чрезмерные абонентские платежи через свои стриминговые телевизионные контракты. Это историческое решение способно кардинально изменить модель распространения профессионального спорта.

## Проблема: матчи разбросаны по 10 платформам

Матчи NFL в настоящее время транслируются на примерно 10 различных стриминговых платформах, включая Prime Video, Netflix, Peacock, Paramount+ и другие сервисы. Для болельщиков, желающих смотреть все игры NFL, совокупная стоимость подписок составляет сотни долларов в месяц -- это резкое увеличение по сравнению с эпохой, когда большинство матчей транслировались на бесплатном телевидении.

## Правовая основа: исключение 1961 года не распространяется на стриминг

NFL долгое время пользовалась антимонопольным исключением в рамках Закона о спортивном вещании 1961 года. Однако это исключение было написано специально для эфирного телевидения и не распространяется на стриминговые платформы. Сенатор Майк Ли выразил поддержку расследованию. NFL в ответ заявила, что 87% матчей по-прежнему доступны на бесплатном эфирном телевидении.

## Широкие последствия

Результат расследования может создать прецедент далеко за пределами футбола. Все крупные профессиональные спортивные лиги в последние годы активно заключали стриминговые контракты, и решение против NFL вероятно заставит все лиги пересмотреть свои стратегии дистрибуции, что потенциально приведёт к более доступным ценам для потребителей.`,
  },

  // --- Massive Cyberattack on China's National Supercomputer -- 10 Petabytes Stolen ---
  'cin-superkomputer-kiberhucum-10-petabayt': {
    title: 'Çin Superkompüterinə Kiberhücum: 10PB Data Oğurlandı',
    date: '2026-04-10',
    category: 'Texnologiya',
    locale: 'az',
    content: `Kibertəhlükəsizlik tarixinin ən böyük məlumat oğurluqlarından biri baş verib: "FlamingChina" adlı haker qrupu Çinin Milli Superkompüter Mərkəzini (NSCC) Tyanjin şəhərində sıradan çıxararaq 10 petabaytdan çox məlumat oğurlayıb. Əgər təsdiqlənərsə, bu, Çindən indiyədək məlum olan ən böyük məlumat oğurluğu olacaq.

## Hücumun təfərrüatları

Hakerlər altı ay ərzində kompromis edilmiş VPN vasitəsilə sistemə daxil olub və məlumatları tədricən çıxarıblar. Oğurlanan məlumatlar arasında təyyarə simulyasiyaları, raket sxemləri və hərbi tədqiqat sənədləri var. NSCC Çinin müdafiə və elm agentlikləri daxil olmaqla 6000-dən çox müştəriyə xidmət göstərir, bu da hücumun potensial təsirini daha da böyüdür.

## Məlumatların yayılması

Oğurlanan məlumatların nümunələri fevral ayının əvvəlində Telegram-da dərc edilib. Bu, hücumun həm kəşfiyyat əməliyyatı, həm də ictimai nümayiş xarakteri daşıdığını göstərir. Kibertəhlükəsizlik mütəxəssisləri nümunələrin orijinallığını araşdırırlar.

## Strateji nəticələr

10 petabayt məlumat həcmi inanılmaz dərəcədə böyükdür -- bu, təxminən 10 milyon saatlıq HD video və ya milyardlarla sənədə bərabərdir. Hərbi tədqiqat məlumatlarının sızması Çinin müdafiə proqramlarına ciddi zərər verə bilər və beynəlxalq kibertəhlükəsizlik müzakirələrini yenidən qızışdıracaq. Bu hadisə dövlət infrastrukturlarının kiberhücumlara nə qədər həssas olduğunu bir daha sübut edir.`,
  },
  'en-china-supercomputer-cyberattack-10-petabytes': {
    title: 'Cyberattack on China Supercomputer: 10PB Data Stolen',
    date: '2026-04-10',
    category: 'Technology',
    locale: 'en',
    content: `One of the largest data thefts in cybersecurity history has reportedly occurred: a hacker group calling itself "FlamingChina" allegedly breached China's National Supercomputing Centre (NSCC) in Tianjin, exfiltrating over 10 petabytes of data. If confirmed, this would be the largest known data theft from China to date.

## How the breach unfolded

The attackers maintained access for approximately six months, infiltrating the system through a compromised VPN connection. Over this extended period, they systematically extracted vast quantities of sensitive data. The stolen information reportedly includes aircraft simulations, missile schematics, and military research documents. The NSCC serves over 6,000 clients across Chinese defense and science agencies, amplifying the potential damage of the breach dramatically.

## Public disclosure on Telegram

Samples of the stolen data were posted on Telegram in early February, suggesting the operation had both intelligence-gathering and public demonstration objectives. Cybersecurity researchers are currently analyzing the samples to verify their authenticity and assess the full scope of compromised information.

## Strategic implications

The scale of 10 petabytes is staggering -- equivalent to roughly 10 million hours of HD video or billions of documents. The theft of military research data could deal a significant blow to China's defense programs and reignite international debates about cybersecurity, state-sponsored hacking, and the vulnerability of critical national infrastructure. The incident underscores that even the most secure government systems remain susceptible to sophisticated, persistent attacks when threat actors are given enough time and a single point of entry.`,
  },
  'tr-cin-superbilgisayar-siber-saldiri-10-petabayt': {
    title: 'Çin Süper Bilgisayarına Siber Saldırı: 10PB Çalındı',
    date: '2026-04-10',
    category: 'Teknoloji',
    locale: 'tr',
    content: `Siber güvenlik tarihinin en büyük veri hırsızlıklarından biri gerçekleşti: "FlamingChina" adlı hacker grubu Çin'in Tianjin'deki Ulusal Süper Bilgisayar Merkezi'ni (NSCC) ihlal ederek 10 petabayttan fazla veri çaldı. Doğrulanması halinde bu, Çin'den bilinen en büyük veri hırsızlığı olacak.

## Saldırının detayları

Hackerlar, ele geçirilmiş bir VPN bağlantısı üzerinden sisteme altı ay boyunca erişim sağladı ve verileri kademeli olarak dışarı aktardı. Çalınan veriler arasında uçak simülasyonları, füze şemaları ve askeri araştırma belgeleri yer almaktadır. NSCC, Çin savunma ve bilim kurumları dahil olmak üzere 6.000'den fazla müşteriye hizmet vermektedir, bu da saldırının potansiyel etkisini büyük ölçüde artırmaktadır.

## Verilerin kamuya sızması

Çalınan verilerin örnekleri Şubat ayının başlarında Telegram'da yayınlandı. Bu durum, operasyonun hem istihbarat toplama hem de kamuya açık gösteri amacı taşıdığını ortaya koymaktadır. Siber güvenlik araştırmacıları örneklerin özgünlüğünü ve ihlal edilen bilgilerin tam kapsamını değerlendirmek için çalışmalarını sürdürmektedir.

## Stratejik sonuçlar

10 petabayt veri hacmi inanılmaz derecede büyüktür -- yaklaşık 10 milyon saatlik HD video veya milyarlarca belgeye eşdeğerdir. Askeri araştırma verilerinin sızması Çin'in savunma programlarına ciddi zarar verebilir ve uluslararası siber güvenlik tartışmalarını yeniden alevlendirebilir. Bu olay, en güvenli devlet sistemlerinin bile sofistike ve ısrarcı saldırılara karşı savunmasız kalabileceğini bir kez daha kanıtlamaktadır.`,
  },
  'ru-kiberataka-superkompyuter-kitay-10-petabayt': {
    title: 'Кибератака на суперкомпьютер КНР: похищено 10 ПБ',
    date: '2026-04-10',
    category: 'Технологии',
    locale: 'ru',
    content: `Произошла одна из крупнейших краж данных в истории кибербезопасности: хакерская группа под названием "FlamingChina" предположительно взломала Национальный суперкомпьютерный центр Китая (NSCC) в Тяньцзине и похитила более 10 петабайт данных. В случае подтверждения это станет крупнейшей известной кражей данных из Китая.

## Подробности атаки

Злоумышленники сохраняли доступ к системе на протяжении примерно шести месяцев, проникнув через скомпрометированное VPN-соединение. За этот период они систематически извлекали огромные объёмы секретных данных. Среди похищенной информации -- симуляции самолётов, схемы ракет и документы военных исследований. NSCC обслуживает более 6000 клиентов из оборонных и научных ведомств Китая, что многократно усиливает потенциальный ущерб от взлома.

## Публикация данных в Telegram

Образцы похищенных данных были опубликованы в Telegram в начале февраля. Это указывает на то, что операция преследовала как разведывательные, так и демонстрационные цели. Специалисты по кибербезопасности в настоящее время анализируют образцы для подтверждения их подлинности и оценки полного масштаба утечки.

## Стратегические последствия

Объём в 10 петабайт поражает воображение -- это эквивалент примерно 10 миллионов часов HD-видео или миллиардов документов. Утечка военных исследовательских данных может нанести серьёзный удар по оборонным программам Китая и заново разжечь международные дискуссии о кибербезопасности и уязвимости критической государственной инфраструктуры. Этот инцидент в очередной раз доказывает, что даже самые защищённые государственные системы остаются уязвимыми перед изощрёнными и настойчивыми атаками.`,
  },

  // --- Topic 7: The Masters 2026 -- Round 2 Underway at Augusta National ---
  'masters-2026-ikinci-tur-augusta': {
    title: 'Masters 2026: McIlroy və Burns Liderliyə Şərik',
    date: '2026-04-10',
    category: 'İdman',
    locale: 'az',
    content: `Qolfun ən nüfuzlu turniri olan Masters 2026-nın ikinci turu bu gün Augusta National Golf Klubunda davam edir. Birinci turun nəticələrinə görə Sam Burns, müdafiəçi çempion Rory McIlroy, Kurt Kitayama və Jason Day 5 vuruş aşağı ilə birgə liderlik edirlər.

## İkinci Turun Əsas Hadisələri

2023-cü il ABŞ Açıq çempionu Wyndham Clark ikinci turda möhtəşəm oyun nümayiş etdirərək 4 vuruş aşağı (68) nəticə göstərib. Clark 2-ci, 3-cü və 4-cü deliklərə ardıcıl birdie ilə başlayıb, 15-ci və 16-cı deliklərdə də uğurlu vuruşlar edib. Brooks Koepka da yaxşı oyun göstərərək 2-ci və 3-cü deliklərdə birdie edib.

## LIV Golf Oyunçuları Çətinlik Çəkir

LIV Golf-dan gələn oyunçular Augusta-da ciddi problemlərlə üzləşiblər. Jon Rahm turnirinə par üstü 6 vuruşla davam edir, Bryson DeChambeau isə arxa doqquzluqda üçqat bogeydən sonra 4 vuruş üstə çıxıb. Justin Rose 1 vuruş aşağı ilə LIV qrupunun ən yaxşı nəticəsini göstərir. Hər iki ulduz oyunçunun həftəsonu mərhələsinə keçməsi təhlükə altındadır.

## McIlroy-un Tarixi Missiyası

Keçən il Augusta-da pleyyof qələbəsi ilə karyera Grand Slam-ını tamamlayan McIlroy bu il müdafiəçi çempion kimi yarışır. Birinci turda ortalardan etibarən svinqini taparaq liderboarda yüksəlib. Grand Slam-ı tamamladıqdan sonrakı rahatlıq onun oyununa müsbət təsir göstərir.

## Kəsmə Xətti və Meydança Şərtləri

Proqnozlaşdırılan kəsmə xətti par üstü 3 vuruşdadır ki, bu da keçən ilki 2 vuruşdan yüksəkdir. Augusta-nın quru şərtləri oyunçuların işini çətinləşdirir - ikinci turda cəmi 14 oyunçu par altında oynayır, 28 oyunçu isə par üstündədir. Qolf topunun vuruş məsafəsi mövzusu da müzakirə predmeti olaraq qalmaqdadır - Augusta National sədri bu məsələdə "uğursuzluğun seçim olmadığını" bildirib.`,
  },
  'en-masters-2026-round-2-augusta': {
    title: 'Masters 2026: McIlroy and Burns Share the Lead',
    date: '2026-04-10',
    category: 'Sports',
    locale: 'en',
    content: `The second round of the 2026 Masters Tournament is underway at Augusta National Golf Club, with defending champion Rory McIlroy and Sam Burns entering Friday tied atop the leaderboard at 5-under par alongside Kurt Kitayama and Jason Day.

## Key Round 2 Developments

Wyndham Clark, the 2023 U.S. Open champion, has delivered an impressive Round 2 performance, posting a 4-under 68 to move into contention. Clark opened with three consecutive birdies from holes 2 through 4, then added two more at the 15th and 16th to offset a single mid-round bogey. Brooks Koepka has also made a charge, birdieing the 2nd and 3rd holes to move into red numbers during his round, eventually reaching 1-under for the tournament.

## LIV Golf Stars Struggling

It has been a difficult week for LIV Golf's biggest names at Augusta. Jon Rahm sits at a dreadful 6-over par, while Bryson DeChambeau is at 4-over after a devastating triple-bogey on the back nine during his second round. Justin Rose stands as the best-placed LIV player at 1-under, but the rest of the contingent faces an uphill battle just to make the weekend. Both Rahm and DeChambeau, who entered as pre-tournament favorites, are in serious danger of missing the cut.

## McIlroy's Title Defense

Rory McIlroy returns to Augusta as a man unburdened. After completing the career Grand Slam with his dramatic playoff victory last year -- becoming just the sixth player in history and the first since Tiger Woods to achieve the feat -- McIlroy is playing with a freedom that should terrify the rest of the field. He found his rhythm in the middle of Thursday's round and surged to the top of the leaderboard.

## Cut Line and Course Conditions

The projected cut line sits at 3-over par, already higher than last year's 2-over mark and expected to rise as the dry conditions at Augusta continue to firm up the course. Only 14 players are currently under par on their second rounds, while 28 are over. The golf ball distance rollback debate continues to hover over proceedings, with the Augusta National chairman stating that "failure is not an option" on the issue.`,
  },
  'tr-masters-2026-ikinci-tur-augusta': {
    title: 'Masters 2026: McIlroy ve Burns Zirvede Eşit',
    date: '2026-04-10',
    category: 'Spor',
    locale: 'tr',
    content: `Golfun en prestijli turnuvası olan Masters 2026'nın ikinci turu bugün Augusta National Golf Kulübü'nde devam ediyor. Birinci turun ardından Sam Burns, şampiyon Rory McIlroy, Kurt Kitayama ve Jason Day 5 vuruş altında skorla birlikte liderliği paylaşıyor.

## İkinci Turun Öne Çıkan Gelişmeleri

2023 ABD Açık şampiyonu Wyndham Clark, ikinci turda muhteşem bir performans sergileyerek 4 vuruş altında (68) skor kartı imzaladı. Clark 2, 3 ve 4 numaralı çukurlarda art arda birdie yaparak tura başladı, 15 ve 16 numaralı çukurlarda da başarılı vuruşlar ekledi. Brooks Koepka da 2 ve 3 numaralı çukurlarda birdie yaparak turnuvada eksi bölgeye geçti ve sonunda 1 vuruş altına ulaştı.

## LIV Golf Oyuncuları Zorlanıyor

LIV Golf'ün yıldız isimleri Augusta'da ciddi sorunlar yaşıyor. Jon Rahm par üstü 6 vuruşla turnuvaya devam ederken, Bryson DeChambeau arka dokuzda aldığı üçlü bogeyden sonra 4 vuruş üstüne çıktı. Justin Rose, 1 vuruş altıyla LIV grubunun en iyi performansını gösteriyor. Turnuva öncesi favoriler arasında gösterilen hem Rahm hem de DeChambeau'nun hafta sonuna kalması tehlike altında.

## McIlroy'un Şampiyonluk Savunması

Geçen yıl Augusta'daki playoff zaferiyle kariyerindeki Grand Slam'ı tamamlayan McIlroy -- bunu başaran tarihte altıncı ve Tiger Woods'tan bu yana ilk golfçü olarak -- bu yıl şampiyon olarak geri dönüyor. Perşembe günkü turunda ortalardan itibaren svingini bulan McIlroy, puan tablosunun tepesine yükseldi. Grand Slam baskısından kurtulan McIlroy özgürce oynuyor.

## Kesim Çizgisi ve Saha Koşulları

Tahmini kesim çizgisi par üstü 3 vuruşta yer alıyor; bu geçen yılki 2 vuruştan daha yüksek. Augusta'nın kuru koşulları sahayı sertleştiriyor ve oyuncuların işini zorlaştırıyor -- ikinci turda sadece 14 oyuncu par altında oynarken, 28 oyuncu par üstünde. Golf topu mesafe tartışması da gündemden düşmüyor; Augusta National başkanı bu konuda "başarısızlığın bir seçenek olmadığını" vurguladı.`,
  },
  'ru-masters-2026-vtoroy-tur-augusta': {
    title: 'Мастерс 2026: Макилрой и Бёрнс делят лидерство',
    date: '2026-04-10',
    category: 'Спорт',
    locale: 'ru',
    content: `Второй раунд самого престижного турнира в мире гольфа Мастерс 2026 продолжается на поле Огаста Нэшнл Гольф Клаб. По итогам первого раунда Сэм Бёрнс, действующий чемпион Рори Макилрой, Курт Китаяма и Джейсон Дэй разделили лидерство с результатом 5 ударов ниже пар.

## Основные события второго раунда

Чемпион Открытого чемпионата США 2023 года Уиндем Кларк продемонстрировал великолепную игру во втором раунде, показав результат 4 удара ниже пар (68). Кларк начал раунд с трёх последовательных бёрди на лунках со 2-й по 4-ю, а затем добавил ещё два успешных удара на 15-й и 16-й лунках. Брукс Коепка также совершил рывок, сделав бёрди на 2-й и 3-й лунках и выйдя на результат 1 удар ниже пар.

## Игроки из ЛИВ Гольф испытывают трудности

Крупнейшие звёзды ЛИВ Гольф переживают тяжёлую неделю в Огасте. Хон Рам находится на катастрофическом уровне 6 ударов выше пар, а Брайсон Дешамбо после разрушительного тройного боги на задней девятке оказался на отметке 4 удара выше пар. Джастин Роуз с результатом 1 удар ниже пар показывает лучший результат среди игроков ЛИВ. И Рам, и Дешамбо, которые считались фаворитами турнира, рискуют не пройти в уикенд.

## Защита титула Макилроя

Рори Макилрой вернулся в Огасту свободным человеком. Завершив карьерный Большой шлем драматичной победой в плейофф в прошлом году -- став лишь шестым игроком в истории и первым после Тайгера Вудса -- Макилрой играет с раскованностью, которая пугает соперников. Он нашёл свой ритм в середине первого раунда и взлетел на вершину таблицы лидеров.

## Линия среза и состояние поля

Прогнозируемая линия среза составляет 3 удара выше пар, что уже выше прошлогоднего показателя в 2 удара. Сухие условия в Огасте продолжают уплотнять поле -- лишь 14 игроков находятся ниже пар во втором раунде, тогда как 28 играют выше пар. Дебаты о регулировании дальности полёта мяча остаются актуальной темой: председатель Огаста Нэшнл заявил, что «провал не является вариантом» в этом вопросе.`,
  },

  // --- Topic 8: CDC Delays Report Showing COVID Vaccine Effectiveness ---
  'cdc-covid-peyvend-hesabatini-gecikdirir': {
    title: 'CDC COVID Peyvənd Effektivlik Hesabatını Gecikdirir',
    date: '2026-04-10',
    category: 'Sağlamlıq',
    locale: 'az',
    content: `Xəstəliklərə Nəzarət və Qarşısının Alınması Mərkəzlərinin (CDC) səlahiyyətli direktoru Cey Bhattaçarya COVID-19 peyvəndinin 2025-2026 qış mövsümündə təcili yardım vizitlərini 50%, xəstəxanaya yerləşdirmələri isə 55% azaltdığını göstərən hesabatın dərcini gecikdirib.

## Gecikdirilən Hesabatın Təfərrüatları

Hesabat CDC-nin əsas elmi jurnalı olan MMWR-də (Xəstəlik və Ölüm Həftəlik Hesabatı) 19 mart tarixində dərc edilməli idi. Tədqiqat göstərib ki, sentyabr-dekabr ayları arasında peyvənd olunan sağlam yaşlıların təcili yardım və təcili tibbi yardım şöbələrinə müraciət ehtimalı 50%, COVID ilə əlaqəli xəstəxanaya yerləşdirmə ehtimalı isə peyvənd olunmayanlara nisbətən 55% az olub.

## Metodologiya İddiaları

Bhattaçarya gecikməni tədqiqatda istifadə olunan "test-neqativ dizayn" metodologiyasına dair narahatlıqlarla əsaslandırıb. Lakin bu eyni metodologiya onilliklər ərzində CDC tərəfindən respirator viruslara qarşı peyvənd effektivliyini qiymətləndirmək üçün istifadə olunub. Daha maraqlısı odur ki, eyni metodologiya ilə hazırlanmış qrip peyvəndinin effektivliyi haqqında hesabat sadəcə bir həftə əvvəl MMWR-də dərc edilmişdi.

## Siyasi Müdaxilə Narahatlıqları

Hazırkı və keçmiş məmurlar hesabatın gecikdirilməsinin peyvəndləri açıq şəkildə tənqid edən Səhiyyə Naziri Robert F. Kennedy Jr.-ın baxışları ilə uyğunlaşdığını bildiriblər. Tənqidçilər hesab edirlər ki, peyvəndin faydaları haqqında məlumatlar Kennedy-nin anti-peyvənd mövqeyi ilə ziddiyyət təşkil etdiyi üçün gizlədilir. Bu hadisə ictimai sağlamlıq elminə siyasi müdaxilə ilə bağlı ciddi narahatlıqlar doğurur.

## Niyə Bu Vacibdir

CDC-nin elmi nəşrlərinin siyasi motivlərlə gecikdirilməsi ictimai sağlamlıq qərarlarına inamı sarsıda bilər. Peyvənd effektivliyi haqqında vaxtında və şəffaf məlumat paylaşımı vətəndaşların sağlamlıq qərarları vermələri üçün kritik əhəmiyyət daşıyır.`,
  },
  'en-cdc-delays-covid-vaccine-effectiveness-report': {
    title: 'CDC Delays COVID Vaccine Effectiveness Report',
    date: '2026-04-10',
    category: 'Health',
    locale: 'en',
    content: `Acting CDC Director Jay Bhattacharya has delayed publication of a report showing the 2025-2026 COVID-19 vaccine reduced emergency department visits by 50% and hospitalizations by 55% among healthy adults during the past winter season. The suppression of the findings has sparked accusations of political interference in public health science.

## What the Report Found

The study, which had cleared the CDC's scientific review process and was scheduled for publication on March 19 in the Morbidity and Mortality Weekly Report (MMWR), found significant vaccine effectiveness. Between September and December, healthy adults who received the updated COVID vaccine were half as likely to visit emergency departments and urgent care facilities, and 55% less likely to be hospitalized for COVID-related illness, compared with unvaccinated individuals.

## The Methodology Dispute

Bhattacharya cited concerns about the observational method used to calculate vaccine effectiveness -- specifically the "test-negative design" approach. This methodology examines people who are already sick enough to seek care, tests them, and then compares vaccination rates between those who test positive and those who do not. However, the same methodology has been a cornerstone of CDC vaccine evaluation for decades. A flu vaccine effectiveness report using the identical methodology was published in the MMWR just one week before the COVID report was pulled.

## Political Interference Concerns

Current and former CDC officials have raised alarms that the delay aligns with the views of Health Secretary Robert F. Kennedy Jr., a longtime vocal critic of vaccines. Critics argue that information about the vaccine's benefits is being suppressed precisely because it contradicts the administration's skeptical stance on COVID-19 vaccination. The move represents what many health experts consider an unprecedented level of political intervention in the agency's scientific publishing process.

## Why It Matters

The delayed publication raises fundamental questions about the independence of public health agencies from political influence. Timely and transparent sharing of vaccine effectiveness data is critical for healthcare providers making recommendations and for individuals making informed decisions about their health during ongoing respiratory virus seasons.`,
  },
  'tr-cdc-covid-asi-etkinlik-raporunu-geciktiriyor': {
    title: 'CDC COVID Aşı Etkinlik Raporunu Geciktirdi',
    date: '2026-04-10',
    category: 'Sağlık',
    locale: 'tr',
    content: `CDC Vekil Direktörü Jay Bhattacharya, 2025-2026 COVID-19 aşısının acil servis ziyaretlerini yüzde 50 ve hastaneye yatışları yüzde 55 azalttığını gösteren bir raporun yayınlanmasını geciktirdi. Bulguların bastırılması, halk sağlığı bilimine siyasi müdahale suçlamalarına yol açtı.

## Raporun Bulguları

CDC'nin bilimsel inceleme sürecini geçen ve 19 Mart'ta Hastalık ve Ölüm Haftalık Raporu'nda (MMWR) yayınlanması planlanan çalışma, önemli düzeyde aşı etkinliği tespit etti. Eylül-Aralık ayları arasında güncellenen COVID aşısını yaptıran sağlıklı yetişkinlerin acil servise başvurma olasılığı yüzde 50, COVID kaynaklı hastaneye yatış olasılığı ise aşı olmayanlara kıyasla yüzde 55 daha düşük çıktı.

## Metodoloji Tartışması

Bhattacharya, gecikmeyi çalışmada kullanılan "test-negatif tasarım" metodolojisine ilişkin endişelere dayandırdı. Bu yaklaşım, bakım almaya yetecek kadar hasta olan kişileri inceler, test eder ve ardından pozitif çıkanlarla çıkmayanlar arasındaki aşılanma oranlarını karşılaştırır. Ancak aynı metodoloji, CDC tarafından on yıllardır solunum yolu virüslerine karşı aşı etkinliğini değerlendirmek için kullanılmaktadır. Aynı metodolojiyle hazırlanan grip aşısı etkinlik raporu, COVID raporunun geri çekilmesinden sadece bir hafta önce MMWR'de yayınlanmıştı.

## Siyasi Müdahale Endişeleri

Mevcut ve eski CDC yetkilileri, gecikmenin aşıları uzun süredir açıkça eleştiren Sağlık Bakanı Robert F. Kennedy Jr.'ın görüşleriyle örtüştüğü konusunda alarm veriyor. Eleştirmenler, aşının faydaları hakkındaki bilgilerin yönetimin COVID-19 aşılamasına şüpheci yaklaşımıyla çeliştiği için bastırıldığını savunuyor. Bu adım, pek çok sağlık uzmanının ajansın bilimsel yayın sürecine benzeri görülmemiş düzeyde siyasi müdahale olarak değerlendirdiği bir gelişme.

## Neden Önemli

Geciktirilen yayın, halk sağlığı kurumlarının siyasi etkiden bağımsızlığı konusunda temel sorular gündeme getiriyor. Aşı etkinliği verilerinin zamanında ve şeffaf paylaşımı, sağlık hizmeti sağlayıcıları ve bireyler için kritik öneme sahiptir.`,
  },
  'ru-cdc-zaderzhivayet-otchyot-ob-effektivnosti-vakciny-covid': {
    title: 'CDC задерживает отчёт об эффективности COVID-вакцины',
    date: '2026-04-10',
    category: 'Здоровье',
    locale: 'ru',
    content: `Исполняющий обязанности директора Центров по контролю и профилактике заболеваний (CDC) Джей Бхаттачарья задержал публикацию отчёта, показывающего, что вакцина против COVID-19 сезона 2025-2026 сократила посещения отделений неотложной помощи на 50%, а госпитализации -- на 55% среди здоровых взрослых. Замалчивание результатов исследования вызвало обвинения в политическом вмешательстве в науку общественного здравоохранения.

## Что показало исследование

Исследование, прошедшее научную экспертизу CDC и запланированное к публикации 19 марта в Еженедельном отчёте о заболеваемости и смертности (MMWR), выявило значительную эффективность вакцины. В период с сентября по декабрь здоровые взрослые, получившие обновлённую вакцину против COVID, вдвое реже обращались в отделения неотложной помощи и на 55% реже госпитализировались по сравнению с невакцинированными.

## Спор о методологии

Бхаттачарья объяснил задержку опасениями относительно методологии «тест-негативного дизайна», использованной в исследовании. Этот подход изучает людей, достаточно больных для обращения за медицинской помощью, тестирует их и сравнивает уровни вакцинации между теми, кто дал положительный результат, и теми, кто нет. Однако эта же методология десятилетиями используется CDC для оценки эффективности вакцин против респираторных вирусов. Отчёт об эффективности вакцины против гриппа, подготовленный по идентичной методологии, был опубликован в MMWR всего за неделю до отзыва отчёта о COVID.

## Опасения политического вмешательства

Действующие и бывшие сотрудники CDC забили тревогу, указывая, что задержка согласуется с позицией министра здравоохранения Роберта Ф. Кеннеди-младшего, давнего критика вакцин. Критики утверждают, что информация о пользе вакцины замалчивается именно потому, что она противоречит скептической позиции администрации в отношении вакцинации против COVID-19.

## Почему это важно

Задержка публикации ставит фундаментальные вопросы о независимости учреждений общественного здравоохранения от политического влияния. Своевременный и прозрачный обмен данными об эффективности вакцин имеет критическое значение для врачей и граждан, принимающих обоснованные решения о своём здоровье.`,
  },

  // --- Topic 9: Trump Strengthens Tariffs on Steel, Aluminum, and Copper Imports ---
  'tramp-polad-aluminium-mis-tarifleri-guclendirir': {
    title: 'Tramp Polad, Aluminium və Misə 50% Tarif Tətbiq Etdi',
    date: '2026-04-10',
    category: 'İqtisadiyyat',
    locale: 'az',
    content: `Prezident Donald Tramp 2 aprel tarixli fərmanla polad, aluminium və mis idxalına tarifləri əhəmiyyətli dərəcədə artırıb. Yeni qaydalar tamamilə və ya demək olar ki, tamamilə bu metallardan hazırlanan məhsullara 50%, törəmə məhsullara isə 25% tarif tətbiq edir.

## Yeni Tarif Strukturu

Fərmana əsasən, 6 apreldən etibarən yeni tarif dərəcələri qüvvəyə minib. Tamamilə polad, aluminium və ya misdən hazırlanan məhsullar tam gömrük dəyərinin 50%-i həcmində vergiyə cəlb olunur. Əsasən bu metallardan istehsal olunan törəmə məhsullar 25% tarif ödəyir. Metal-tutumlu sənaye avadanlıqları və elektrik şəbəkəsi avadanlıqları 2027-ci ilə qədər 15% endirmli tarif ilə idxal edilə bilər. ABŞ polad, aluminium və misindən xaricdə istehsal olunan məhsullara isə 10% aşağı tarif tətbiq olunur.

## Ali Məhkəmə Qərarı və Hüquqi Dəyişikliklər

2026-cı ilin fevralında ABŞ Ali Məhkəməsi 6-3 səs nisbəti ilə prezidentin Beynəlxalq Fövqəladə İqtisadi Səlahiyyətlər Aktına (IEEPA) əsaslanaraq tarif tətbiq edə bilməyəcəyinə qərar verdi. Cavab olaraq, administrasiya 1974-cü il Ticarət Aktının 122-ci bölməsinə keçid edib -- bu bölmə 150 günə qədər maksimum 15% müvəqqəti tarif icazəsi verir. Hazırda bütün ölkələrə 15% müvəqqəti idxal əlavəsi tətbiq olunur.

## Geri Ödəniş Portalı

Gömrük və Sərhəd Mühafizəsi (CBP) IEEPA tarifləri üzrə geri ödəniş sistemini işə salır. CAPE adlanan portal 20 apreldə fəaliyyətə başlayacaq. 53 milyondan çox ödənilməmiş idxal qeydindən 63%-ni əhatə edəcək. Hal-hazırda 26.664 idxalçı qeydiyyatdan keçib və təxminən 120 milyard dollarlıq geri ödəniş gözlənilir. "Azadlıq Günü" tariflərindən bir il sonra istehsalat sektorunda 89 min iş yeri itirildiyi müəyyən edilib.`,
  },
  'en-trump-strengthens-tariffs-steel-aluminum-copper': {
    title: 'Trump Imposes 50% Tariffs on Steel and Aluminum',
    date: '2026-04-10',
    category: 'Economy',
    locale: 'en',
    content: `President Donald Trump issued a proclamation on April 2 significantly strengthening tariffs on steel, aluminum, and copper imports. Articles made entirely or almost entirely of these metals now face a flat 50% tariff on their full customs value, while derivative products face 25%. The move comes amid a sweeping overhaul of U.S. trade policy one year after "Liberation Day."

## New Tariff Structure

The revised Section 232 tariff regime, effective April 6, represents a major restructuring. Products made entirely or predominantly of aluminum, steel, or copper pay 50% on their full value. Derivative articles substantially containing these metals face 25%. Metal-intensive industrial equipment and electrical grid equipment qualify for a reduced 15% rate through 2027. Products manufactured abroad using exclusively American-sourced steel, aluminum, and copper are subject to a lower 10% tariff. Notably, products containing 15% or less of these metals are no longer subject to Section 232 metals tariffs at all.

## Legal Landscape After the Supreme Court Ruling

The February 2026 Supreme Court decision in a 6-3 ruling struck down the use of the International Emergency Economic Powers Act (IEEPA) for imposing tariffs, forcing the administration to pivot. The White House shifted to Section 122 of the Trade Act of 1974, which permits a temporary import surcharge of up to 150 days with a maximum rate of 15%. A blanket 15% surcharge now applies to imports from all countries under this authority.

## CBP Refund Portal and Economic Impact

Customs and Border Protection is building the Consolidated Administration and Processing of Entries (CAPE) system, set to launch April 20. Phase 1 will cover 63% of the 53,173,939 unliquidated entries that included IEEPA duties. Over 26,600 importers have registered, with approximately $120 billion in refunds expected. One year after Liberation Day, the economic toll is evident: manufacturing has lost a net 89,000 jobs over ten months, while eight trade deals have been struck with partners including the UK, Japan, South Korea, and the EU.`,
  },
  'tr-trump-celik-aluminyum-bakir-gumruk-tarifelerini-guclendiriyor': {
    title: 'Trump Çelik ve Alüminyuma %50 Gümrük Tarifesi Koydu',
    date: '2026-04-10',
    category: 'Ekonomi',
    locale: 'tr',
    content: `Başkan Donald Trump, 2 Nisan tarihli kararname ile çelik, alüminyum ve bakır ithalatına uygulanan tarifeleri önemli ölçüde artırdı. Tamamen veya neredeyse tamamen bu metallerden üretilen ürünlere yüzde 50, türev ürünlere ise yüzde 25 gümrük vergisi uygulanıyor. Hamle, "Kurtuluş Günü"nün birinci yıl dönümünde kapsamlı bir ticaret politikası revizyonunun parçası.

## Yeni Tarife Yapısı

6 Nisan'dan itibaren yürürlüğe giren revize edilmiş Bölüm 232 tarife rejimi önemli değişiklikler getiriyor. Tamamen veya ağırlıklı olarak alüminyum, çelik ya da bakırdan üretilen ürünler tam gümrük değerinin yüzde 50'si oranında vergilendirilecek. Bu metalleri önemli ölçüde içeren türev ürünler yüzde 25 tarife ödeyecek. Metal yoğun sanayi ekipmanları ve elektrik şebekesi donanımları 2027 yılına kadar indirimli yüzde 15 oranından yararlanabilecek. Yurt dışında ancak tamamen Amerikan menşeli metallerle üretilen ürünlere yüzde 10 oranında daha düşük tarife uygulanacak.

## Yüksek Mahkeme Kararı Sonrası Hukuki Süreç

Şubat 2026'da ABD Yüksek Mahkemesi 6-3 oyla, Uluslararası Acil Ekonomik Yetkiler Yasası'nın (IEEPA) tarife uygulamak için kullanılamayacağına hükmetti. Yönetim bunun üzerine 1974 Ticaret Yasası'nın 122. Bölümüne yöneldi; bu bölüm 150 güne kadar en fazla yüzde 15 oranında geçici ithalat ek vergisi uygulanmasına izin veriyor. Şu anda tüm ülkelerden yapılan ithalata yüzde 15 geçici vergi uygulanıyor.

## Geri Ödeme Portalı ve Ekonomik Etki

Gümrük ve Sınır Koruma (CBP), CAPE adlı yeni iade sistemi üzerinde çalışıyor ve 20 Nisan'da faaliyete geçmesi planlanıyor. Birinci aşamada IEEPA vergileri içeren 53 milyondan fazla tasfiye edilmemiş giriş kaydının yüzde 63'ü işleme alınacak. 26.600'den fazla ithalatçı kayıt yaptırmış olup yaklaşık 120 milyar dolarlık geri ödeme bekleniyor. Kurtuluş Günü'nün üzerinden bir yıl geçerken, imalat sektöründe on ayda net 89.000 iş kaybı yaşandı; öte yandan İngiltere, Japonya, Güney Kore ve AB dahil sekiz ticaret anlaşması imzalandı.`,
  },
  'ru-tramp-uzhestochayet-tarify-na-stal-alyuminiy-med': {
    title: 'Трамп ввёл 50% пошлины на сталь и алюминий',
    date: '2026-04-10',
    category: 'Экономика',
    locale: 'ru',
    content: `Президент Дональд Трамп подписал 2 апреля прокламацию, значительно усиливающую тарифы на импорт стали, алюминия и меди. Изделия, полностью или почти полностью изготовленные из этих металлов, теперь облагаются единой пошлиной в 50% от полной таможенной стоимости, а производные продукты -- в 25%. Решение принято в рамках масштабного пересмотра торговой политики США спустя год после «Дня освобождения».

## Новая структура тарифов

Обновлённый тарифный режим по Разделу 232, вступивший в силу 6 апреля, представляет собой существенную реструктуризацию. Продукция, полностью или преимущественно изготовленная из алюминия, стали или меди, облагается пошлиной в 50% от полной стоимости. Производные изделия с существенным содержанием этих металлов платят 25%. Металлоёмкое промышленное оборудование и оборудование для электросетей могут импортироваться по сниженной ставке 15% до 2027 года. Продукция, произведённая за рубежом исключительно из американского сырья, облагается пониженной ставкой в 10%.

## Правовая ситуация после решения Верховного суда

В феврале 2026 года Верховный суд США решением 6 голосами против 3 постановил, что Закон о международных чрезвычайных экономических полномочиях (IEEPA) не может использоваться для введения тарифов. Администрация перешла к применению Раздела 122 Закона о торговле 1974 года, который допускает временную импортную надбавку на срок до 150 дней с максимальной ставкой 15%. В настоящее время на импорт из всех стран действует надбавка в 15%.

## Портал возврата средств и экономические последствия

Таможенно-пограничная служба (CBP) создаёт систему возврата средств под названием CAPE, запуск которой запланирован на 20 апреля. Первый этап охватит 63% из более чем 53 миллионов нерассмотренных импортных записей, по которым были уплачены пошлины IEEPA. Более 26 600 импортёров зарегистрировались для получения возврата, общий объём которого оценивается примерно в 120 миллиардов долларов. Спустя год после «Дня освобождения» экономические последствия очевидны: за десять месяцев производственный сектор потерял 89 000 рабочих мест, хотя были заключены торговые сделки с восемью партнёрами, включая Великобританию, Японию, Южную Корею и ЕС.`,
  },
}


export const newsSlugs = Object.keys(newsArticles)

/**
 * Get articles filtered by locale.
 * If no locale is provided, returns all articles.
 */
export function getArticlesByLocale(locale?: string): Record<string, NewsArticle> {
  if (!locale) return newsArticles
  return Object.fromEntries(
    Object.entries(newsArticles).filter(([, article]) => (article.locale || 'az') === locale)
  )
}

/**
 * Get slugs filtered by locale.
 */
export function getSlugsByLocale(locale?: string): string[] {
  if (!locale) return newsSlugs
  return Object.entries(newsArticles)
    .filter(([, article]) => (article.locale || 'az') === locale)
    .map(([slug]) => slug)
}

