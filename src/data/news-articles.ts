export interface NewsArticle {
  title: string
  date: string
  category: string
  content: string
  locale?: string
}

export const newsArticles: Record<string, NewsArticle> = {
  // News April 7, 2026: Iran-ABŞ son tarix / Hörmüz boğazı (AZ, EN, TR, RU)
  'iran-abs-danisiqlar-son-tarix-7-aprel': {
    title: 'İran-ABŞ gərginliyi: Trampın 7 aprel son tarixi yaxınlaşır, bazarlar dalğalanır',
    date: '2026-04-07',
    category: 'Dünya',
    locale: 'az',
    content: `ABŞ prezidenti Donald Tramp İrana qarşı 7 aprel son tarixini təyin edib. Hörmüz boğazının açılması tələb olunur, əks halda İranın enerji infrastrukturuna kütləvi hücumlar hədələnir. Pakistan vasitəçiliyi ilə hazırlanan "İslamabad Razılaşması" ümid yaradır.

## Son tarix və hədələr

Tramp bəyan edib: "Əgər razılaşma olmazsa, oradakı hər şeyi partladacağam." O, İranın 48 saat ərzində sazişə gəlməsini tələb edib. Boğazın bağlanması qlobal neft tədarükünə ciddi zərbə vurub.

## Pakistan vasitəçiliyi

Pakistan tərəfindən hazırlanan "İslamabad Razılaşması" adlı 45 günlük atəşkəs planı hər iki tərəfə təqdim edilib. Bu plana görə Hörmüz boğazı dərhal açılacaq, 15-20 gün ərzində daha geniş razılaşma — İranın nüvə öhdəlikləri, sanksiyaların yüngülləşdirilməsi və dondurulmuş aktivlərin azad edilməsi müzakirə olunacaq.

## Bazarların reaksiyası

6 aprel tarixində qlobal bazarlar kəskin yüksəlib. Brent nefti 109 dollara, WTI 104 dollara düşüb. S&P 500 həftəlik 3,4% artıb. Aviasiya sektoru — Delta Air Lines və United Airlines səhmləri xüsusilə yüksəlib, çünki reaktiv yanacaq fyuçersləri geri çəkilib.

## Nəticə

Son tarix yaxınlaşdıqca bazarlar böyük dalğalanma gözləyir. Diplomatik həllin olub-olmayacağı bu gecə bəlli olacaq.`,
  },
  'en-iran-us-negotiations-april-7-deadline': {
    title: 'Iran-US Tensions Peak: Trump\'s April 7 Deadline Looms as Markets Swing on Ceasefire Hopes',
    date: '2026-04-07',
    category: 'World',
    locale: 'en',
    content: `US President Donald Trump has set April 7 as the deadline for Iran to reopen the Strait of Hormuz, threatening massive strikes on Iranian energy infrastructure if no deal is reached. A Pakistani-mediated ceasefire proposal offers a glimmer of hope.

## The Ultimatum

"If they don't make a deal, I'm blowing up everything over there," Trump declared, giving Iran 48 hours to reach an agreement. The closure of the Strait of Hormuz — the world's most vital oil shipping lane — has disrupted global energy supplies for weeks.

## The Islamabad Accord

Pakistan has proposed a 45-day ceasefire framework dubbed the "Islamabad Accord." Under this plan, the Strait of Hormuz would reopen immediately, with 15 to 20 days allocated to finalize a broader settlement including Iranian nuclear commitments, sanctions relief, and the release of frozen assets.

## Market Response

Global markets surged on April 6 as investors bet on a diplomatic resolution. Brent crude eased to approximately $109 per barrel, while WTI retreated toward $104. The S&P 500 posted a 3.4% weekly gain. Airlines like Delta and United saw sharp gains as jet fuel futures retreated from doubled levels.

## What's Next

Markets brace for significant volatility as the Tuesday evening deadline approaches. The outcome of negotiations will determine whether the crisis escalates or de-escalates.`,
  },
  'tr-iran-abd-muzakereleri-7-nisan-son-tarih': {
    title: 'İran-ABD Gerilimi Zirveye Ulaştı: Trump\'ın 7 Nisan Son Tarihi ve Ateşkes Umudu',
    date: '2026-04-07',
    category: 'Dünya',
    locale: 'tr',
    content: `ABD Başkanı Donald Trump, İran'a Hürmüz Boğazı'nı yeniden açması için 7 Nisan son tarihini belirledi. Anlaşma sağlanamazsa İran'ın enerji altyapısına büyük çaplı saldırılar düzenleyeceğini açıkladı. Pakistan arabuluculuğundaki "İslamabad Anlaşması" umut veriyor.

## Ültimatom

Trump "Anlaşma yapmazlarsa oradaki her şeyi havaya uçuracağım" dedi ve İran'a 48 saat süre tanıdı. Dünyanın en kritik petrol taşımacılık güzergahı olan Hürmüz Boğazı'nın kapatılması küresel enerji arzını ciddi şekilde aksattı.

## İslamabad Anlaşması

Pakistan tarafından hazırlanan 45 günlük ateşkes çerçevesi "İslamabad Anlaşması" olarak adlandırıldı. Bu plana göre Hürmüz Boğazı derhal açılacak, 15-20 gün içinde İran'ın nükleer taahhütleri, yaptırımların hafifletilmesi ve dondurulan varlıkların serbest bırakılması konularında kapsamlı bir anlaşma sonuçlandırılacak.

## Piyasaların Tepkisi

6 Nisan'da küresel piyasalar güçlü bir yükseliş yaşadı. Brent petrolü varil başına 109 dolara, WTI ise 104 dolara geriledi. S&P 500 haftalık bazda %3,4 arttı. Havayolu şirketleri Delta Air Lines ve United Airlines'ın hisseleri, jet yakıtı vadeli işlemlerinin geri çekilmesiyle sert yükseldi.

## Sonuç

Son tarih yaklaştıkça piyasalarda büyük dalgalanma bekleniyor. Müzakerelerin sonucu bu gece belli olacak.`,
  },
  'ru-iran-ssha-peregovory-7-aprelya-dedlajn': {
    title: 'Кризис Иран-США: Дедлайн Трампа 7 апреля приближается, рынки лихорадит',
    date: '2026-04-07',
    category: 'Мир',
    locale: 'ru',
    content: `Президент США Дональд Трамп установил 7 апреля крайний срок для Ирана по открытию Ормузского пролива, угрожая массированными ударами по энергетической инфраструктуре страны. Пакистанское посредничество в рамках «Исламабадского соглашения» даёт проблеск надежды.

## Ультиматум

«Если они не заключат сделку, я взорву там всё», — заявил Трамп, дав Ирану 48 часов на достижение соглашения. Закрытие Ормузского пролива — важнейшего нефтяного маршрута в мире — на протяжении недель нарушает глобальные поставки энергоносителей.

## Исламабадское соглашение

Пакистан предложил 45-дневный план прекращения огня под названием «Исламабадское соглашение». Согласно плану, Ормузский пролив откроется немедленно, а в течение 15–20 дней будет завершено более широкое урегулирование, включающее ядерные обязательства Ирана, смягчение санкций и разморозку активов.

## Реакция рынков

6 апреля мировые рынки резко выросли на ожиданиях дипломатического решения. Нефть Brent откатилась к $109 за баррель, WTI — к $104. S&P 500 прибавил 3,4% за неделю. Акции авиакомпаний Delta и United резко подорожали на фоне снижения фьючерсов на авиационное топливо.

## Перспективы

По мере приближения крайнего срока рынки готовятся к значительной волатильности. Исход переговоров определит, пойдёт ли кризис на спад или обострится.`,
  },
  // News April 7, 2026: OPEC+ hasilat artımı (AZ, EN, TR, RU)
  'opec-plus-may-hasilat-artimi-206-min-barel': {
    title: 'OPEC+ mayda neft hasilatını 206 min barel artıracaq: İran böhranı fonunda qərar',
    date: '2026-04-07',
    category: 'İqtisadiyyat',
    locale: 'az',
    content: `Səkkiz aparıcı OPEC+ ölkəsi — Səudiyyə Ərəbistanı, Rusiya, İraq, BƏƏ, Küveyt, Qazaxıstan, Əlcəzair və Oman — 5 apreldə keçirilən virtual görüşdə may ayında neft hasilatını gündəlik 206 min barel artırmaq qərarına gəlib.

## Qərarın konteksti

Artım 2023-cü ilin aprelində elan edilmiş gündəlik 1,65 milyon barel könüllü kəsintinin mərhələli ləğvinin bir hissəsidir. Qərar İran müharibəsi fonunda qlobal neft bazarlarının gərgin dövrünə düşür.

## Hörmüz boğazı faktoru

Hörmüz boğazının bağlanması qlobal neft daşımalarına ciddi zərbə vurub. Lakin 206 min barel/gün artım boğazın bağlanması nəticəsində itən tədarükün cəmi 2%-dən azını kompensasiya edə bilir. Bu, OPEC+-ın çatışmazlığı aradan qaldırmaq imkanının məhdud olduğunu göstərir.

## Neft qiymətləri

Brent nefti hazırda 109 dollar/barel ətrafında, WTI isə 104 dollar səviyyəsində qərar tutub. Atəşkəs ümidləri qiymətləri bir qədər aşağı çəksə də, İran gərginliyinin davam etməsi qiymətləri yüksək saxlayır.

## İraq mövqeyi

İraq may 2026 kvotalarında ilk üç OPEC+ istehsalçısı arasında yer alır. Ölkə hasilat artımından ən çox faydalanan tərəflərdən biridir.`,
  },
  'en-opec-plus-may-production-increase-206k-barrels': {
    title: 'OPEC+ to Boost Oil Output by 206,000 Barrels Per Day in May Amid Iran Crisis',
    date: '2026-04-07',
    category: 'Economy',
    locale: 'en',
    content: `Eight leading OPEC+ nations — Saudi Arabia, Russia, Iraq, UAE, Kuwait, Kazakhstan, Algeria, and Oman — agreed during a virtual meeting on April 5 to increase oil production by 206,000 barrels per day starting in May 2026.

## Context of the Decision

The increase is part of a gradual phase-out of the 1.65 million barrels per day voluntary cuts announced in April 2023. The decision comes during a challenging period for global oil markets amid the ongoing US-Israeli conflict with Iran.

## The Hormuz Factor

The Strait of Hormuz — the world's most vital oil shipping lane — has been effectively closed since the conflict began. However, the planned 206,000 bpd increase represents less than 2% of the supply disrupted by the closure, highlighting OPEC+'s limited ability to offset the shortfall.

## Oil Prices

Brent crude currently hovers around $109 per barrel, while WTI trades near $104. Ceasefire hopes have pulled prices back slightly, but ongoing Iran tensions keep them elevated.

## Iraq's Position

Iraq ranks among the top three OPEC+ producers under May 2026 quotas. The country stands to benefit significantly from the production increase. Analysts note that the modest increase signals OPEC+ caution in an uncertain geopolitical environment.`,
  },
  'tr-opec-plus-mayis-uretim-artisi-206-bin-varil': {
    title: 'OPEC+ Mayıs\'ta Petrol Üretimini Günlük 206 Bin Varil Artıracak',
    date: '2026-04-07',
    category: 'Ekonomi',
    locale: 'tr',
    content: `Sekiz önde gelen OPEC+ ülkesi — Suudi Arabistan, Rusya, Irak, BAE, Kuveyt, Kazakistan, Cezayir ve Umman — 5 Nisan'daki sanal toplantıda Mayıs ayında petrol üretimini günlük 206 bin varil artırma kararı aldı.

## Kararın Bağlamı

Artış, Nisan 2023'te açıklanan günlük 1,65 milyon varillik gönüllü kesintinin aşamalı olarak kaldırılmasının bir parçası. Karar, İran ile ABD-İsrail çatışmasının sürdüğü zorlu bir dönemde alındı.

## Hürmüz Faktörü

Dünyanın en kritik petrol taşımacılık güzergahı olan Hürmüz Boğazı çatışmanın başlamasından bu yana fiilen kapalı. Ancak planlanan günlük 206 bin varillik artış, boğazın kapatılmasıyla kesintiye uğrayan arzın %2'sinden daha azını karşılayabiliyor.

## Petrol Fiyatları

Brent petrolü şu anda varil başına 109 dolar civarında, WTI ise 104 dolar seviyesinde işlem görüyor. Ateşkes umutları fiyatları bir miktar aşağı çekse de İran gerginliği fiyatları yüksek tutmaya devam ediyor.

## Piyasa Etkisi

Analistler, mütevazı artışın OPEC+'nın belirsiz jeopolitik ortamda temkinli davrandığına işaret ettiğini belirtiyor. Üretim artışının petrol fiyatları üzerindeki etkisi sınırlı kalacak gibi görünüyor.`,
  },
  'ru-opec-plus-uvelichenie-dobychi-206-tysyach-barrelej': {
    title: 'OPEC+ увеличит добычу нефти на 206 тыс. баррелей в сутки в мае',
    date: '2026-04-07',
    category: 'Экономика',
    locale: 'ru',
    content: `Восемь ведущих стран OPEC+ — Саудовская Аравия, Россия, Ирак, ОАЭ, Кувейт, Казахстан, Алжир и Оман — на виртуальной встрече 5 апреля договорились увеличить добычу нефти на 206 тысяч баррелей в сутки с мая 2026 года.

## Контекст решения

Увеличение является частью постепенной отмены добровольного сокращения на 1,65 млн баррелей в сутки, объявленного в апреле 2023 года. Решение принято в сложный период для мировых нефтяных рынков на фоне продолжающегося конфликта США и Израиля с Ираном.

## Фактор Ормузского пролива

Ормузский пролив — важнейший нефтяной маршрут в мире — фактически закрыт с начала конфликта. Однако запланированное увеличение на 206 тыс. баррелей составляет менее 2% от объёма поставок, нарушенных закрытием пролива, что демонстрирует ограниченные возможности OPEC+ по компенсации дефицита.

## Цены на нефть

Brent торгуется около $109 за баррель, WTI — около $104. Надежды на прекращение огня немного снизили цены, но напряжённость вокруг Ирана удерживает их на высоком уровне.

## Позиция Ирака

Ирак входит в тройку крупнейших производителей OPEC+ по квотам на май 2026 года. Аналитики отмечают, что скромное увеличение добычи сигнализирует об осторожности OPEC+ в условиях геополитической неопределённости.`,
  },
  // News April 7, 2026: Microsoft $10 mlrd Yaponiya AI investisiyası (AZ, EN, TR, RU)
  'microsoft-10-milyard-yaponiya-ai-investisiyasi': {
    title: 'Microsoft Yaponiyaya $10 milyard AI investisiyası elan etdi: Texnologiya, Təhlükəsizlik, Kadr',
    date: '2026-04-07',
    category: 'Texnologiya',
    locale: 'az',
    content: `Microsoft 2026-2029-cu illər ərzində Yaponiyaya 10 milyard dollar (təqribən 1,6 trilyon yen) investisiya planını elan edib. İnvestisiya üç əsas istiqaməti əhatə edir: Texnologiya, Etimad və Kadr hazırlığı.

## İnvestisiyanın əhatə dairəsi

Plan ölkədaxili infrastrukturun genişləndirilməsini, yerli tərəfdaşlarla əməkdaşlıqla AI infrastruktur imkanlarının artırılmasını, Yaponiya milli qurumları ilə dərin kibertəhlükəsizlik tərəfdaşlığını və 2030-cu ilə qədər 1 milyondan çox mühəndis, developer və işçinin təlimini nəzərdə tutur.

## Tərəfdaşlar

Microsoft AI infrastrukturunu Sakura Internet və telekommunikasiya operatoru SoftBank ilə birgə inkişaf etdirəcək. Yapon şirkətləri GPU və digər hesablama resursları təmin edəcək. Sakura Internet səhmləri xəbərdən sonra 20% yüksəlib.

## Əvvəlki investisiyalar

Bu investisiya Microsoft-un 2024-cü ilin aprelində Yaponiyaya yatırdığı 2,9 milyard dollarlıq investisiyanın davamıdır. Elanlar Microsoft vitse-prezidenti Brad Smitin Tokio səfəri zamanı edilib.

## Qlobal AI yarışı

Qərar Microsoft-un qlobal AI dominantlığını möhkəmləndirmək strategiyasının bir hissəsidir. Yaponiya süni intellekt infrastrukturu üçün böyük tələbat olan bazarlardan biri olaraq qiymətləndirilir.`,
  },
  'en-microsoft-10-billion-japan-ai-investment': {
    title: 'Microsoft Announces $10 Billion AI Investment in Japan: Infrastructure, Cybersecurity, Talent',
    date: '2026-04-07',
    category: 'Technology',
    locale: 'en',
    content: `Microsoft has announced a $10 billion (approximately 1.6 trillion yen) investment in Japan from 2026 through 2029, built around three pillars: Technology, Trust, and Talent.

## Investment Scope

The commitments include expanding in-country AI infrastructure, collaborating with domestic partners to expand AI infrastructure options, deepening public-private cybersecurity partnerships with Japan's national institutions, and training more than one million engineers, developers, and workers across Japan's most strategically important industries by 2030.

## Key Partnerships

Microsoft will develop AI infrastructure alongside Sakura Internet and telecom operator SoftBank, with the two Japanese entities supplying graphics processing units and other computing resources. Sakura Internet shares jumped 20% following the announcement.

## Building on Prior Investment

The new commitment builds on the $2.9 billion investment Microsoft made in Japan in April 2024. The announcements were made during a visit to Tokyo by Microsoft Vice Chair and President Brad Smith.

## Strategic Significance

The deal positions Microsoft as the dominant AI infrastructure provider in one of the world's largest technology markets. Japan has been identified as a key market with growing demand for AI capabilities across manufacturing, healthcare, and financial services sectors.`,
  },
  'tr-microsoft-10-milyar-japonya-ai-yatirimi': {
    title: 'Microsoft Japonya\'ya 10 Milyar Dolarlık AI Yatırımı Yapacak',
    date: '2026-04-07',
    category: 'Teknoloji',
    locale: 'tr',
    content: `Microsoft, 2026-2029 yılları arasında Japonya'ya 10 milyar dolar (yaklaşık 1,6 trilyon yen) yatırım yapacağını açıkladı. Yatırım üç temel sütun üzerine inşa edildi: Teknoloji, Güven ve Yetenek.

## Yatırımın Kapsamı

Plan, ülke içi AI altyapısının genişletilmesini, yerli ortaklarla iş birliği yaparak AI altyapı seçeneklerinin artırılmasını, Japonya'nın ulusal kurumlarıyla derinleştirilmiş kamu-özel sektör siber güvenlik ortaklıklarını ve 2030 yılına kadar 1 milyondan fazla mühendisin, geliştiricinin ve çalışanın eğitilmesini kapsıyor.

## Ortaklıklar

Microsoft, AI altyapısını Sakura Internet ve telekomünikasyon operatörü SoftBank ile birlikte geliştirecek. Japon şirketleri GPU ve diğer bilgi işlem kaynakları sağlayacak. Sakura Internet hisseleri açıklamanın ardından %20 yükseldi.

## Önceki Yatırımlar

Bu yatırım, Microsoft'un Nisan 2024'te Japonya'ya yaptığı 2,9 milyar dolarlık yatırımın devamı niteliğinde. Açıklamalar, Microsoft Başkan Yardımcısı Brad Smith'in Tokyo ziyareti sırasında yapıldı.

## Stratejik Önemi

Anlaşma, Microsoft'u dünyanın en büyük teknoloji pazarlarından birinde baskın AI altyapı sağlayıcısı konumuna getiriyor. Japonya üretim, sağlık ve finans sektörlerinde artan AI talebiyle öne çıkıyor.`,
  },
  'ru-microsoft-10-mlrd-yaponiya-ai-investicii': {
    title: 'Microsoft вложит $10 млрд в AI-инфраструктуру Японии',
    date: '2026-04-07',
    category: 'Технологии',
    locale: 'ru',
    content: `Microsoft объявила об инвестициях в размере $10 млрд (примерно 1,6 трлн иен) в Японию на период 2026–2029 годов. Инвестиции базируются на трёх столпах: Технологии, Доверие и Кадры.

## Объём инвестиций

Планы включают расширение AI-инфраструктуры внутри страны, сотрудничество с японскими партнёрами для развития вычислительных мощностей, углубление государственно-частного партнёрства в сфере кибербезопасности с национальными институтами Японии и обучение более 1 млн инженеров, разработчиков и специалистов в стратегически важных отраслях к 2030 году.

## Партнёрства

Microsoft будет развивать AI-инфраструктуру совместно с Sakura Internet и телеком-оператором SoftBank. Японские компании обеспечат GPU и другие вычислительные ресурсы. Акции Sakura Internet выросли на 20% после объявления.

## Предыдущие инвестиции

Новые обязательства расширяют инвестиции Microsoft в Японию в размере $2,9 млрд, сделанные в апреле 2024 года. Объявления были сделаны во время визита вице-председателя Microsoft Брэда Смита в Токио.

## Стратегическое значение

Сделка укрепляет позиции Microsoft как доминирующего поставщика AI-инфраструктуры на одном из крупнейших технологических рынков мира. Япония выделяется растущим спросом на AI в производстве, здравоохранении и финансовых услугах.`,
  },
  // News April 7, 2026: DeepSeek V4 — 1 trilyon parametr AI modeli (AZ, EN, TR, RU)
  'deepseek-v4-1-trilyon-parametr-ai-modeli': {
    title: 'DeepSeek V4 gəlir: 1 trilyon parametrli açıq mənbə AI modeli Huawei çiplərində işləyəcək',
    date: '2026-04-07',
    category: 'Texnologiya',
    locale: 'az',
    content: `Çinli süni intellekt şirkəti DeepSeek aprelin sonlarında V4 modelini buraxmağa hazırlaşır. 1 trilyon parametrli bu Mixture-of-Experts modeli açıq mənbə kimi Apache 2.0 lisenziyası altında paylaşılacaq.

## Texniki xüsusiyyətlər

DeepSeek V4 təqribən 1 trilyon ümumi parametrə malikdir, lakin hər token üçün yalnız 37 milyard parametr aktivləşir. Bu, inferens xərclərini V3 səviyyəsində saxlayır. 1 milyon tokenlik kontekst pəncərəsi Engram şərti yaddaş arxitekturası ilə təmin edilir və Needle-in-a-Haystack testində 97% dəqiqlik göstərir.

## Multimodal imkanlar

V3-dən fərqli olaraq, V4 mətn, şəkil və video yaratmanı əvvəlcədən təlim mərhələsində inteqrasiya edir. Bu, daha əlaqəli cross-modal düşünmə imkanı verir.

## Huawei çipləri

Reuters 4 apreldə təsdiq edib ki, DeepSeek V4 Huawei Ascend 950PR çiplərində işləyəcək. Bu, Çin yarımkeçirici infrastrukturunda qurulmuş ilk sərhəd AI modelidir.

## Qlobal rəqabət

DeepSeek V4 OpenAI-nin GPT-5.4, Anthropic-in Claude Mythos 5 və Google-un Gemini modelləri ilə rəqabət edəcək. Açıq mənbə olması onu xüsusilə fərqləndirən amildir. SWE-bench-də 81% nəticə göstərdiyi bildirilir.`,
  },
  'en-deepseek-v4-trillion-parameter-open-source-ai': {
    title: 'DeepSeek V4 Incoming: Trillion-Parameter Open-Source AI Model to Run on Huawei Chips',
    date: '2026-04-07',
    category: 'Technology',
    locale: 'en',
    content: `Chinese AI company DeepSeek is preparing to release its V4 model later in April. The trillion-parameter Mixture-of-Experts model will be released as open source under the Apache 2.0 license, marking a major milestone in open AI development.

## Technical Specifications

DeepSeek V4 scales to approximately 1 trillion total parameters but activates only 37 billion per token, keeping inference costs comparable to V3. A 1-million-token context window is powered by the Engram conditional memory architecture, achieving 97% accuracy on the Needle-in-a-Haystack benchmark at million-token scale.

## Native Multimodality

Unlike models that bolt on vision capabilities, V4 integrates text, image, and video generation during pre-training, enabling more coherent cross-modal reasoning.

## Huawei Hardware

Reuters confirmed on April 4 that DeepSeek V4 will run on Huawei's Ascend 950PR chips. This represents the first frontier AI model built to run on Chinese semiconductor infrastructure, a significant development amid ongoing US-China tech competition.

## Competitive Landscape

DeepSeek V4 will compete with OpenAI's GPT-5.4, Anthropic's Claude Mythos 5, and Google's Gemini models. Its open-source nature is a key differentiator. The model reportedly scores 81% on SWE-bench, signaling strong performance in software engineering tasks.`,
  },
  'tr-deepseek-v4-trilyon-parametre-acik-kaynak-ai': {
    title: 'DeepSeek V4 Geliyor: Trilyon Parametreli Açık Kaynak AI Modeli Huawei Çiplerinde Çalışacak',
    date: '2026-04-07',
    category: 'Teknoloji',
    locale: 'tr',
    content: `Çinli yapay zeka şirketi DeepSeek, V4 modelini Nisan sonunda piyasaya sürmeye hazırlanıyor. Trilyon parametreli bu Mixture-of-Experts modeli Apache 2.0 lisansı altında açık kaynak olarak paylaşılacak.

## Teknik Özellikler

DeepSeek V4 yaklaşık 1 trilyon toplam parametreye sahip ancak her token başına yalnızca 37 milyar parametre aktifleştiriyor. Bu, çıkarım maliyetlerini V3 düzeyinde tutuyor. Engram koşullu bellek mimarisiyle desteklenen 1 milyon tokenlik bağlam penceresi, milyon token ölçeğinde Needle-in-a-Haystack testinde %97 doğruluk sağlıyor.

## Doğal Çok Modluluk

Görüntü yeteneklerini sonradan ekleyen modellerin aksine, V4 metin, görüntü ve video oluşturmayı ön eğitim aşamasında entegre ediyor. Bu, daha tutarlı çapraz modal akıl yürütme imkanı sağlıyor.

## Huawei Donanımı

Reuters, 4 Nisan'da DeepSeek V4'ün Huawei Ascend 950PR çiplerinde çalışacağını doğruladı. Bu, Çin yarı iletken altyapısında çalışmak üzere tasarlanan ilk sınır AI modeli oluyor.

## Rekabet Ortamı

DeepSeek V4, OpenAI'nin GPT-5.4'ü, Anthropic'in Claude Mythos 5'i ve Google'ın Gemini modelleriyle rekabet edecek. Açık kaynak olması onu özellikle farklı kılıyor. SWE-bench'te %81 puan aldığı bildiriliyor.`,
  },
  'ru-deepseek-v4-trillion-parametrov-otkrytaja-model': {
    title: 'DeepSeek V4: Триллион-параметровая open-source AI-модель будет работать на чипах Huawei',
    date: '2026-04-07',
    category: 'Технологии',
    locale: 'ru',
    content: `Китайская компания DeepSeek готовится выпустить модель V4 в конце апреля. Модель с триллионом параметров на архитектуре Mixture-of-Experts будет распространяться как открытый исходный код под лицензией Apache 2.0.

## Технические характеристики

DeepSeek V4 масштабируется примерно до 1 триллиона параметров, но активирует лишь 37 миллиардов на один токен, сохраняя стоимость инференса на уровне V3. Контекстное окно в 1 миллион токенов реализовано на архитектуре условной памяти Engram, достигая 97% точности в тесте Needle-in-a-Haystack на миллионном масштабе.

## Нативная мультимодальность

В отличие от моделей, к которым зрительные способности добавляются позже, V4 интегрирует генерацию текста, изображений и видео на этапе предобучения, обеспечивая более связное межмодальное рассуждение.

## Чипы Huawei

Reuters подтвердил 4 апреля, что DeepSeek V4 будет работать на чипах Huawei Ascend 950PR. Это первая фронтирная AI-модель, созданная для работы на китайской полупроводниковой инфраструктуре.

## Конкурентная среда

DeepSeek V4 будет конкурировать с GPT-5.4 от OpenAI, Claude Mythos 5 от Anthropic и моделями Gemini от Google. Открытый исходный код — ключевое отличие. Модель показывает 81% на SWE-bench, что демонстрирует высокую производительность в задачах разработки ПО.`,
  },
  // News April 7, 2026: Ümumdünya Sağlamlıq Günü (AZ, EN, TR, RU)
  'uzumlunya-saglamliq-gunu-2026-elm-ile-birge': {
    title: 'Ümumdünya Sağlamlıq Günü 2026: "Sağlamlıq üçün birlikdə. Elmlə birlikdə"',
    date: '2026-04-07',
    category: 'Səhiyyə',
    locale: 'az',
    content: `7 aprel — Ümumdünya Sağlamlıq Təşkilatının (ÜST) yaranma günü — bu il "Sağlamlıq üçün birlikdə. Elmlə birlikdə" şüarı altında qeyd edilir. Kampaniya elmi əməkdaşlığın insanların, heyvanların, bitkilərin və planetin sağlamlığını qorumaq gücünü vurğulayır.

## Əsas tədbirlər

7 apreldə Fransa hökumətinin G7 sədrliyi çərçivəsində Beynəlxalq Vahid Sağlamlıq Sammiti keçirilir. 7-9 aprel tarixlərində isə ÜST Əməkdaşlıq Mərkəzlərinin ilk Qlobal Forumu — 80-dən çox ölkədən təqribən 800 elmi qurumun iştirakı ilə baş tutur.

## Vahid Sağlamlıq yanaşması

Kampaniya "Vahid Sağlamlıq" yanaşmasına xüsusi diqqət yetirir — insan, heyvan və ətraf mühit sağlamlığının bir-birinə bağlı olduğunu vurğulayan bu konsepsiya pandemiyaların qarşısının alınmasında əhəmiyyətli rol oynayır.

## Nəyə çağırış edilir

ÜST bütün ölkələri elmi sübutlara əsaslanan sağlamlıq siyasətləri həyata keçirməyə, elmi araşdırmalara investisiya qoymağa və dezinformasiyaya qarşı mübarizəni gücləndirməyə çağırır.

## Elm nailiyyətləri

Bu ilin kampaniyasında gen terapiyasının karlara eşitmə imkanı verməsi, kvant batareyaları, proqramlaşdırıla bilən dərman sistemləri və beyin qocalmasına təsir edən FTL1 zülalının kəşfi kimi son nailiyyətlər vurğulanır.`,
  },
  'en-world-health-day-2026-stand-with-science': {
    title: 'World Health Day 2026: "Together for Health. Stand with Science"',
    date: '2026-04-07',
    category: 'Health',
    locale: 'en',
    content: `April 7 marks World Health Day 2026, observed under the theme "Together for health. Stand with science." The campaign celebrates the power of scientific collaboration to protect the health of people, animals, plants, and the planet.

## Key Events

The International One Health Summit is hosted on April 7 by the Government of France under its G7 Presidency. From April 7 to 9, the inaugural Global Forum of WHO Collaborating Centres gathers nearly 800 scientific institutions from over 80 countries.

## One Health Approach

The campaign spotlights the One Health approach — recognizing the interconnection between human, animal, and environmental health. This framework is considered essential for preventing future pandemics and addressing antimicrobial resistance.

## Call to Action

WHO calls on all countries to implement evidence-based health policies, invest in scientific research, and strengthen the fight against misinformation. The organization emphasizes that science-backed public health measures save millions of lives annually.

## Scientific Achievements Highlighted

The 2026 campaign celebrates recent breakthroughs including gene therapy giving deaf individuals the ability to hear within weeks, quantum batteries that store energy using quantum physics, programmable drug delivery systems targeting cancer cells with unprecedented accuracy, and the discovery of the FTL1 protein linked to brain aging.`,
  },
  'tr-dunya-saglik-gunu-2026-bilimle-birlikte': {
    title: 'Dünya Sağlık Günü 2026: "Sağlık İçin Birlikte. Bilimle Birlikte"',
    date: '2026-04-07',
    category: 'Sağlık',
    locale: 'tr',
    content: `7 Nisan, Dünya Sağlık Örgütü'nün (DSÖ) kuruluş yıl dönümü olarak "Sağlık için birlikte. Bilimle birlikte" temasıyla kutlanıyor. Kampanya, bilimsel iş birliğinin insanların, hayvanların, bitkilerin ve gezegenin sağlığını koruma gücünü öne çıkarıyor.

## Önemli Etkinlikler

7 Nisan'da Fransa hükümetinin G7 Başkanlığı çerçevesinde Uluslararası Tek Sağlık Zirvesi düzenleniyor. 7-9 Nisan tarihlerinde ise DSÖ İş Birliği Merkezlerinin ilk Küresel Forumu — 80'den fazla ülkeden yaklaşık 800 bilimsel kurumun katılımıyla gerçekleşiyor.

## Tek Sağlık Yaklaşımı

Kampanya, insan, hayvan ve çevre sağlığının birbirine bağlı olduğunu vurgulayan "Tek Sağlık" yaklaşımına odaklanıyor. Bu çerçeve, gelecekteki pandemilerin önlenmesi ve antimikrobiyal dirençle mücadelede kilit rol oynuyor.

## Çağrı

DSÖ, tüm ülkeleri kanıta dayalı sağlık politikaları uygulamaya, bilimsel araştırmalara yatırım yapmaya ve dezenformasyonla mücadeleyi güçlendirmeye çağırıyor.

## Vurgulanan Bilimsel Başarılar

Gen terapisiyle doğuştan sağır bireylerin birkaç hafta içinde işitebilmesi, kuantum bataryaları, programlanabilir kanser ilaç sistemleri ve beyin yaşlanmasını etkileyen FTL1 proteininin keşfi bu yılın öne çıkan başarıları arasında.`,
  },
  'ru-vsemirnyj-den-zdorovya-2026-vmeste-s-naukoj': {
    title: 'Всемирный день здоровья 2026: «Вместе за здоровье. Вместе с наукой»',
    date: '2026-04-07',
    category: 'Здоровье',
    locale: 'ru',
    content: `7 апреля отмечается Всемирный день здоровья 2026 года под девизом «Вместе за здоровье. Вместе с наукой». Кампания прославляет силу научного сотрудничества в защите здоровья людей, животных, растений и планеты.

## Ключевые мероприятия

7 апреля правительство Франции в рамках председательства в G7 проводит Международный саммит «Единое здоровье». С 7 по 9 апреля проходит первый Глобальный форум сотрудничающих центров ВОЗ, собирающий почти 800 научных институтов из более чем 80 стран.

## Подход «Единое здоровье»

Кампания подчёркивает подход «Единое здоровье» — концепцию взаимосвязи здоровья людей, животных и окружающей среды. Эта модель считается ключевой для предотвращения будущих пандемий и борьбы с антимикробной резистентностью.

## Призыв к действию

ВОЗ призывает все страны внедрять политику здравоохранения, основанную на научных данных, инвестировать в исследования и усилить борьбу с дезинформацией.

## Научные достижения

Кампания 2026 года отмечает прорывы: генная терапия возвращает слух глухим от рождения за считанные недели, квантовые батареи, программируемые системы доставки лекарств для борьбы с раком и открытие белка FTL1, связанного со старением мозга.`,
  },
  // News April 7, 2026: Pakistan sel fəlakəti (AZ, EN, TR, RU)
  'pakistan-sel-felaketi-50-olum-xayber-paxtunxva': {
    title: 'Pakistanın Xayber Paxtunxva əyalətində sel: 50 ölü, 111 yaralı',
    date: '2026-04-07',
    category: 'Dünya',
    locale: 'az',
    content: `Pakistanın şimal-qərbindəki Xayber Paxtunxva əyalətində 25 martdan bəri davam edən güclü yağışlar nəticəsində ən azı 50 nəfər həlak olub, 111 nəfər yaralanıb. Ölənlər arasında 26 uşaq, 17 kişi və 7 qadın var.

## Təsirlənən bölgələr

Fəlakət Abbottabad, Kohat, Peşəvər, Novşera, Mansehra, Bataqram, Kurram, Dera İsmail Xan, Bannu, Hanqu, Svat, Malakand, Dir, Çarsadda, Mardan, Şanqla, Buner, Yuxarı Kohistan, Aşağı Kohistan və Torqhar rayonlarını əhatə edib.

## Dağıntılar

Cəmi 470 ev zərər görüb. Bunlardan 409-u qismən, 61-i isə tamamilə dağılıb. Xilasetmə əməliyyatları davam edir. Peşəvərdə 120-dən çox insan xilas edilib.

## Karaçi rekordu

Karaçi şəhəri aprel ayının ən yüksək yağış rekordunu qeydə alıb. Ölkə üzrə yağışlarla əlaqədar ölüm sayı keçən aydan bəri 70-ə yaxınlaşır.

## Gələcək proqnoz

Meteoroloqlar 16-19 aprel tarixlərində yeni yağış dalğası gözlədiklərini açıqlayıb. Əyalətdə sel xəbərdarlığı elan edilib.`,
  },
  'en-pakistan-floods-50-dead-khyber-pakhtunkhwa': {
    title: 'Pakistan Floods Kill 50 in Khyber Pakhtunkhwa as Heavy Rains Continue',
    date: '2026-04-07',
    category: 'World',
    locale: 'en',
    content: `Heavy rains in Pakistan's northwestern Khyber Pakhtunkhwa province have killed at least 50 people and injured 111 others since March 25. The victims include 26 children, 17 men, and 7 women.

## Affected Regions

The disaster has struck across 20 districts including Abbottabad, Kohat, Peshawar, Nowshera, Mansehra, Battagram, Kurram, Dera Ismail Khan, Bannu, Hangu, Swat, Malakand, Dir, Charsadda, Mardan, Shangla, Buner, Upper Kohistan, Lower Kohistan, and Torghar.

## Property Damage

A total of 470 houses have been damaged, with 409 sustaining partial damage and 61 completely destroyed. Rescue operations continue across the province. Over 120 people have been rescued in Peshawar alone.

## Record Rainfall in Karachi

Karachi recorded its highest-ever April rainfall as the nationwide death toll from rain-related incidents nears 70 since last month. Additional fatalities have been reported in Punjab province.

## Weather Forecast

Meteorologists warn of another spell of heavy rainfall expected from April 16 to 19 across the province. Flood alerts have been issued for low-lying areas near rivers and streams. Afghanistan has also been heavily affected, with combined deaths across both countries exceeding 121 in two weeks.`,
  },
  'tr-pakistan-sel-felaketi-50-olu-hayber-pahtunhva': {
    title: 'Pakistan\'ın Hayber Pahtunhva Eyaletinde Sel Felaketi: 50 Ölü, 111 Yaralı',
    date: '2026-04-07',
    category: 'Dünya',
    locale: 'tr',
    content: `Pakistan'ın kuzeybatısındaki Hayber Pahtunhva eyaletinde 25 Mart'tan bu yana süren şiddetli yağışlar sonucunda en az 50 kişi hayatını kaybetti, 111 kişi yaralandı. Hayatını kaybedenler arasında 26 çocuk, 17 erkek ve 7 kadın bulunuyor.

## Etkilenen Bölgeler

Felaket, Abbottabad, Kohat, Peşaver, Novşera, Mansehra, Battagram, Kurram, Dera İsmail Han, Bannu, Hangu, Svat, Malakand, Dir, Çarsadda, Mardan, Shangla, Buner, Yukarı Kohistan, Aşağı Kohistan ve Torghar olmak üzere 20 ilçeyi etkisi altına aldı.

## Maddi Hasar

Toplam 470 ev hasar gördü. Bunlardan 409'u kısmen, 61'i ise tamamen yıkıldı. Kurtarma operasyonları devam ediyor. Yalnızca Peşaver'de 120'den fazla kişi kurtarıldı.

## Karaçi'de Rekor Yağış

Karaçi, Nisan ayının en yüksek yağış rekorunu kırdı. Ülke genelinde geçen aydan bu yana yağışla ilişkili ölüm sayısı 70'e yaklaşıyor.

## Hava Tahmini

Meteorolojistler, 16-19 Nisan tarihlerinde eyalette yeni bir yağış dalgası beklediklerini açıkladı. Alçak bölgelerde sel uyarısı yayınlandı. Afganistan da ciddi şekilde etkileniyor; iki ülkedeki toplam can kaybı iki haftada 121'i aştı.`,
  },
  'ru-pakistan-navodneniya-50-pogibshih-hajber-pahtunhva': {
    title: 'Наводнения в Пакистане: 50 погибших в провинции Хайбер-Пахтунхва',
    date: '2026-04-07',
    category: 'Мир',
    locale: 'ru',
    content: `Сильные дожди в северо-западной провинции Пакистана Хайбер-Пахтунхва унесли жизни не менее 50 человек и ранили 111 с 25 марта. Среди погибших — 26 детей, 17 мужчин и 7 женщин.

## Пострадавшие районы

Стихия затронула 20 районов, включая Абботтабад, Кохат, Пешавар, Новшеру, Мансехру, Баттаграм, Куррам, Дера-Исмаил-Хан, Банну, Хангу, Сват, Малаканд, Дир, Чарсадду, Мардан, Шангла, Бунер, Верхний и Нижний Кохистан и Торгхар.

## Ущерб

Всего повреждено 470 домов: 409 частично и 61 полностью разрушен. Спасательные операции продолжаются. Только в Пешаваре спасено более 120 человек.

## Рекорд осадков в Карачи

В Карачи зафиксирован рекордный уровень осадков за всю историю апрельских наблюдений. Общее число жертв ливней по стране с прошлого месяца приближается к 70.

## Прогноз погоды

Метеорологи предупреждают о новой волне ливней с 16 по 19 апреля. Объявлено предупреждение о наводнении в низменных районах. Афганистан также сильно пострадал — совокупное число жертв в двух странах за две недели превысило 121.`,
  },
  // News April 8, 2026: 6 topics × 4 languages (AZ, EN, TR, RU)
  'iran-abs-son-tarix-gunu-8-aprel': {
    title: 'İran-ABŞ böhranı son tarix günü: Trampın 8 aprel ultimatumu, Kharg adasına zərbə',
    date: '2026-04-08',
    category: 'Dünya',
    locale: 'az',
    content: `Donald Trampın İrana verdiyi 8 aprel son tarixi bu gün sona çatır. Son 24 saat ərzində ABŞ qüvvələri İranın strateji Kharg adasına zərbə endirib, bu ada ölkənin neft ixracatının demək olar ki hamısını həyata keçirir. Ancaq diplomatik həllər üçün ümid hələ də sönməyib.

## Kharg adasına zərbələr

ABŞ rəsmilərinin məlumatına görə, gecə keçirilən hərbi əməliyyat zamanı Kharg adasındakı hərbi hədəflər zərbələnib, lakin neft obyektlərinə toxunulmayıb. Bu, Trampın İrana qarşı yüksələn təzyiq siyasətinin bir hissəsidir. Prezident bəyan edib ki "bütün sivilizasiya bu gecə məhv ola bilər" əgər saziş olmasa.

## İranın 10 bəndlik cavabı

Tehran Pakistan vasitəsi ilə ABŞ-a rəsmi 10 bəndlik cavab göndərib. Sənəddə Hörmüz boğazından təhlükəsiz keçid protokolu, münaqişənin həlli, bərpa və sanksiyaların ləğvi ilə bağlı tələblər əks olunub. İran müvəqqəti atəşkəsdən imtina edir və müharibənin dayandırılmasını tələb edir.

## Müvəqqəti atəşkəs rədd edildi

Tramp ağ ev Pasxa yumurta yığma mərasimində jurnalistlərə bildirib: "45 günlük atəşkəs təklifi kifayət qədər yaxşı deyil." İran tərəfi də müvəqqəti razılaşmanı qəbul etmir. Hər iki tərəf eyni anda daha geniş sülh tələb edir.

## Qlobal təsir

EIA qlobal neft və benzin qiymət proqnozlarını kəskin yuxarıya revizya edib. ABŞ-da benzin qiymətlərinin bu ay qallon başına 4,30 dollara qalxması gözlənilir. Son tarixin gecə saatlarında başa çatması ilə qlobal bazarlar yüksək dalğalanmaya hazırlaşır.`,
  },
  'en-iran-us-deadline-day-april-8': {
    title: 'Iran-US Crisis Reaches Deadline Day: Trump\'s April 8 Ultimatum, Strikes on Kharg Island',
    date: '2026-04-08',
    category: 'World',
    locale: 'en',
    content: `President Donald Trump\'s April 8 deadline for Iran arrives today. In the past 24 hours, US forces struck Iran\'s strategic Kharg Island — the terminal through which nearly all of the country\'s oil is exported — while diplomatic hopes remain alive but fragile.

## Strikes on Kharg Island

According to US officials, overnight military operations hit targets on Kharg Island but deliberately avoided oil facilities. The measured strike reflects Trump\'s escalating pressure campaign against Tehran. The President warned that "a whole civilization will die tonight" if no deal materializes, while adding "maybe something revolutionarily wonderful can happen."

## Iran\'s 10-Point Response

Tehran has sent Washington a formal 10-point response through Pakistani mediators. The document outlines demands including a safe-passage protocol for the Strait of Hormuz, an end to regional conflict, reconstruction aid, and the lifting of sanctions. Iran has explicitly rejected any temporary ceasefire, calling instead for a permanent resolution.

## Temporary Ceasefire Rejected

Speaking to reporters at the White House Easter Egg Roll, Trump dismissed a proposed 45-day ceasefire as "not good enough." Iranian officials echoed the rejection from the opposite direction, saying temporary measures are insufficient and a comprehensive peace framework must be negotiated directly.

## Global Impact

The EIA has sharply revised its oil and gasoline price forecasts, with US gas prices expected to peak at $4.30 per gallon this month. As the 8 p.m. ET deadline approaches, global markets are bracing for significant volatility tonight. The outcome will determine whether this conflict escalates into direct confrontation or pivots toward diplomatic resolution.`,
  },
  'tr-iran-abd-son-tarih-gunu-8-nisan': {
    title: 'İran-ABD Krizi Son Tarihte: Trump\'ın 8 Nisan Ültimatomu, Kharg Adasına Saldırılar',
    date: '2026-04-08',
    category: 'Dünya',
    locale: 'tr',
    content: `Başkan Donald Trump\'ın İran\'a verdiği 8 Nisan son tarihi bugün doluyor. Son 24 saat içinde ABD güçleri, İran\'ın stratejik Kharg Adası\'na saldırı düzenledi. Bu ada ülkenin petrol ihracatının neredeyse tamamının yapıldığı kritik terminaldir. Diplomatik umut hâlâ canlı ancak kırılgan durumda.

## Kharg Adasına Saldırılar

ABD yetkililerine göre, geceki askeri operasyon Kharg Adası\'ndaki hedefleri vurdu ancak petrol tesislerine kasıtlı olarak dokunulmadı. Bu ölçülü saldırı, Trump\'ın Tahran üzerindeki artan baskı kampanyasını yansıtıyor. Başkan "Eğer bir anlaşma olmazsa bu gece bütün bir medeniyet yok olabilir" diyerek ekledi: "Belki devrim niteliğinde harika bir şey olabilir."

## İran\'ın 10 Maddelik Cevabı

Tahran, Pakistan arabulucuları vasıtasıyla Washington\'a resmi 10 maddelik bir cevap gönderdi. Belge Hürmüz Boğazı için güvenli geçiş protokolü, bölgesel çatışmanın sona erdirilmesi, yeniden yapılanma yardımı ve yaptırımların kaldırılması taleplerini içeriyor. İran herhangi bir geçici ateşkesi açıkça reddederek kalıcı bir çözüm istiyor.

## Geçici Ateşkes Reddedildi

Beyaz Saray\'ın Paskalya Yumurtası yuvarlama etkinliğinde gazetecilere konuşan Trump, önerilen 45 günlük ateşkesi "yeterince iyi değil" diyerek reddetti. İran yetkilileri de karşı yönden aynı reddi tekrarlayarak geçici tedbirlerin yetersiz olduğunu ve kapsamlı bir barış çerçevesinin doğrudan müzakere edilmesi gerektiğini belirtti.

## Küresel Etki

EIA petrol ve benzin fiyat tahminlerini keskin biçimde yukarı revize etti. ABD\'de benzin fiyatlarının bu ay galon başına 4,30 dolara çıkması bekleniyor. Saat 20:00 (ABD Doğu Yakası) son tarihi yaklaşırken küresel piyasalar bu gece büyük dalgalanmaya hazırlanıyor.`,
  },
  'ru-iran-ssha-dedlajn-den-8-aprelya': {
    title: 'Кризис Иран-США в день дедлайна: ультиматум Трампа 8 апреля, удары по острову Харг',
    date: '2026-04-08',
    category: 'Мир',
    locale: 'ru',
    content: `Срок ультиматума президента Дональда Трампа, выставленного Ирану на 8 апреля, истекает сегодня. За последние 24 часа силы США нанесли удары по стратегическому иранскому острову Харг — терминалу, через который проходит почти весь нефтяной экспорт страны. Дипломатическая надежда ещё жива, но остаётся хрупкой.

## Удары по острову Харг

По словам американских официальных лиц, в ходе ночной военной операции были поражены цели на острове Харг, при этом нефтяные объекты намеренно не затрагивались. Выверенный удар отражает растущее давление Трампа на Тегеран. Президент предупредил, что "сегодня ночью может погибнуть целая цивилизация", если сделки не будет, одновременно добавив, что "может произойти что-то революционно замечательное".

## 10-пунктный ответ Ирана

Тегеран направил Вашингтону через пакистанских посредников официальный 10-пунктный ответ. В документе изложены требования, включая протокол безопасного прохода через Ормузский пролив, прекращение регионального конфликта, помощь в восстановлении и снятие санкций. Иран прямо отверг любое временное перемирие, призывая вместо этого к окончательному урегулированию.

## Временное перемирие отвергнуто

Выступая перед журналистами на пасхальном катании яиц в Белом доме, Трамп отклонил предложенное 45-дневное перемирие как "недостаточно хорошее". Иранские официальные лица с противоположной стороны также отвергли это предложение, заявив, что временные меры недостаточны и необходимо напрямую обсуждать всеобъемлющую мирную рамку.

## Глобальные последствия

EIA резко пересмотрело прогнозы цен на нефть и бензин в сторону повышения. Ожидается, что цены на бензин в США в этом месяце достигнут пика в $4,30 за галлон. По мере приближения дедлайна в 20:00 по восточному времени США, мировые рынки готовятся к значительной волатильности этой ночью.`,
  },
  'chempionlar-liqasi-ceyrek-final-8-aprel': {
    title: 'Çempionlar Liqası 1/4 finalı bu axşam: Barselona-Atletiko və PSJ-Liverpul',
    date: '2026-04-08',
    category: 'Dünya',
    locale: 'az',
    content: `UEFA Çempionlar Liqasının 1/4 final mərhələsinin ilk oyun günü bu axşam davam edir. 8 aprel, çərşənbə günü iki böyük mübarizə futbolsevərləri gözləyir: Barselona Kamp Nouda Atletiko Madridi qəbul edir, PSJ isə Parc de Pransda Liverpulu qarşılayır. Hər iki qarşılaşma mövsümün ən böyük futbol hadisələrindən biri olacaq.

## Barselona - Atletiko Madrid

Kamp Nouda keçiriləcək bu klassik İspaniya dərbisi Barselonanın evdə mövsümdə göstərdiyi güclü forma ilə Atletikonun möhkəm müdafiəsi arasında mübarizəyə çevriləcək. Barselona Çempionlar Liqasında son illərdə üzləşdiyi böhranı arxada qoyub final mərhələsinə böyük ümidlərlə gəlir. Diyeqo Simeonenin Atletikosu isə mövsümün ən effektiv qol balansı ilə bu oyuna qonaq kimi gəlir.

## PSJ - Liverpul

Parc de Pransda keçiriləcək ikinci nəhəng matçda Paris Sent-Jermen Premyer Liqasının liderlərindən Liverpulu qəbul edir. PSJ bu mövsüm Çempionlar Liqasında güclü oyun nümayiş etdirib. Liverpul isə Arne Slotun komandası kimi titul yarışında qala bilər. Hər iki komandanın bombardir hücumçuları — PSJ-də Dembele və Liverpulda Salah — mövsümə möhtəşəm performans ilə daxil olublar.

## Cavab matçları

Hər iki cüt cavab matçı 14-15 aprel tarixlərində oynanılacaq. Yarımfinalda hansı cütün iştirak edəcəyi bu həftəlik oyun sonrası tam bəlli olmayacaq. Çempionlar Liqası final oyunu bu il Budapeştdə keçiriləcək.`,
  },
  'en-champions-league-quarter-final-april-8': {
    title: 'Champions League Quarter-Finals Tonight: Barcelona-Atletico and PSG-Liverpool',
    date: '2026-04-08',
    category: 'World',
    locale: 'en',
    content: `The UEFA Champions League quarter-final first leg continues tonight. On Wednesday, April 8, two heavyweight clashes await football fans: Barcelona hosts Atletico Madrid at Camp Nou, while Paris Saint-Germain welcomes Liverpool to Parc des Princes. Both ties are set to be among the most consequential matches of the season.

## Barcelona vs Atletico Madrid

The Camp Nou will host a classic Spanish derby where Barcelona\'s formidable home form this season meets Atletico\'s disciplined defensive structure. Barcelona arrives hoping to bury the Champions League doubts of recent years, with Lamine Yamal leading a confident attack. Diego Simeone\'s Atletico, boasting one of the most efficient goal differentials in Europe, travels to Catalonia as the underdog but with a proven knockout pedigree.

## PSG vs Liverpool

At Parc des Princes, Paris Saint-Germain takes on Premier League pace-setters Liverpool. PSG has displayed vintage Champions League form this campaign, while Arne Slot\'s Liverpool remains firmly in the title hunt in England. The attacking firepower on both sides — Dembele for PSG and Salah for Liverpool — promises fireworks. Both managers face tough tactical calls balancing attack and defensive solidity.

## The Second Legs

Return fixtures will be played on April 14 and 15, with the semi-final pairings not fully confirmed until after next week\'s games. The Champions League final is scheduled for Budapest in June. Every quarter-finalist believes they have a genuine chance of lifting the trophy this year.`,
  },
  'tr-sampiyonlar-ligi-ceyrek-final-8-nisan': {
    title: 'Şampiyonlar Ligi Çeyrek Final Bu Akşam: Barcelona-Atletico ve PSG-Liverpool',
    date: '2026-04-08',
    category: 'Dünya',
    locale: 'tr',
    content: `UEFA Şampiyonlar Ligi çeyrek final ilk maçları bu akşam devam ediyor. 8 Nisan Çarşamba günü iki büyük karşılaşma futbolseverleri bekliyor: Barcelona, Camp Nou\'da Atlético Madrid\'i ağırlıyor, Paris Saint-Germain ise Parc des Princes\'te Liverpool\'u kabul ediyor. Her iki eşleşme de sezonun en kritik maçları arasında yer alıyor.

## Barcelona - Atlético Madrid

Camp Nou\'da oynanacak bu klasik İspanyol derbisinde Barcelona\'nın bu sezonki güçlü iç saha formu ile Atlético\'nun disiplinli savunma anlayışı karşı karşıya gelecek. Barcelona son yılların Şampiyonlar Ligi hayal kırıklıklarını geride bırakmayı umuyor ve Lamine Yamal\'ın öncülüğündeki güvenli bir hücum hattıyla sahaya çıkıyor. Diego Simeone\'nin Atlético\'su ise Avrupa\'nın en verimli gol averajlarından birine sahip ve elemelerdeki tecrübesiyle Katalonya\'ya meydan okuyor.

## PSG - Liverpool

Parc des Princes\'te Paris Saint-Germain, Premier Lig\'in en iddialı takımlarından Liverpool\'u ağırlıyor. PSG bu sezon klasik Şampiyonlar Ligi formunu sergiliyor, Arne Slot yönetimindeki Liverpool ise İngiltere\'de hâlâ şampiyonluk yarışında. İki tarafın hücum gücü — PSG\'den Dembélé ve Liverpool\'dan Salah — sahada havai fişek gösterisi vaat ediyor. Her iki teknik direktör de saldırı ve savunma dengesi konusunda kritik kararlar verecek.

## Rövanş Maçları

Rövanş karşılaşmaları 14 ve 15 Nisan tarihlerinde oynanacak. Yarı final eşleşmeleri önümüzdeki haftaki oyunların ardından netleşecek. Şampiyonlar Ligi finali Haziran ayında Budapeşte\'de oynanacak.`,
  },
  'ru-liga-chempionov-chetvertfinal-8-aprelya': {
    title: 'Четвертьфинал Лиги чемпионов сегодня: Барселона-Атлетико и ПСЖ-Ливерпуль',
    date: '2026-04-08',
    category: 'Мир',
    locale: 'ru',
    content: `Сегодня вечером продолжаются первые матчи четвертьфинала Лиги чемпионов УЕФА. В среду, 8 апреля, любителей футбола ждут две масштабные битвы: Барселона принимает Атлетико Мадрид на Камп Ноу, а Пари Сен-Жермен встречает Ливерпуль на Парк де Пренс. Обе пары обещают стать одними из самых важных матчей сезона.

## Барселона - Атлетико Мадрид

На Камп Ноу состоится классическое испанское дерби, где внушительная домашняя форма Барселоны в этом сезоне столкнётся с дисциплинированной обороной Атлетико. Каталонцы надеются похоронить сомнения последних лет в Лиге чемпионов, имея в атаке уверенного Ламина Ямаля. Атлетико Диего Симеоне, обладающий одной из лучших разниц забитых и пропущенных мячей в Европе, приезжает в Каталонию в роли аутсайдера, но с проверенным опытом в плей-офф.

## ПСЖ - Ливерпуль

На Парк де Пренс Пари Сен-Жермен принимает лидеров Премьер-лиги Ливерпуль. ПСЖ демонстрирует в этом сезоне классическую форму Лиги чемпионов, а Ливерпуль Арне Слота по-прежнему борется за чемпионство в Англии. Атакующая мощь обеих команд — Дембеле у ПСЖ и Салах у Ливерпуля — обещает фейерверк. Обоим тренерам предстоит принимать сложные тактические решения.

## Ответные матчи

Ответные встречи состоятся 14 и 15 апреля. Пары полуфинала окончательно определятся только после игр следующей недели. Финал Лиги чемпионов в этом году пройдёт в Будапеште в июне. Каждый из участников четвертьфинала верит, что у него есть реальный шанс поднять трофей.`,
  },
  'bazarlar-son-tarix-gunu-neft-113-dollar': {
    title: 'Bazarlar son tarix günü: neft 113 dollarda, S&P 500 həyəcanlı, qlobal dalğalanma',
    date: '2026-04-08',
    category: 'İqtisadiyyat',
    locale: 'az',
    content: `İran-ABŞ böhranı son tarix gününə daxil olduqca qlobal maliyyə bazarları rekord səviyyəli dalğalanma yaşayır. WTI xam nefti 113 dollar həddində tərəddüd edir, S&P 500 həyəcanlı ticarət ilə səviyyəsini qoruyur və qızıl tarixi zirvələrə yüksəlir.

## Neft bazarları

ABŞ WTI xam nefti 7 aprel bağlanışında 113 dollara yaxın tərəddüd edib. Bir gün əvvəl may ayı kontraktı 0,78% artaraq barrel başına 112,41 dollara yüksəlib. Beynəlxalq Brent nefti isə 0,68% artaraq 109,77 dollarda bağlanıb. Hörmüz boğazının bağlanması qlobal neft tədarükündə yaranmış gərginliyi davam etdirir.

## S&P 500 və səhm bazarları

S&P 500 indeksi 6.582 səviyyəsində dolaşmaqdadır. 7 aprel ticarət günündə əvvəl 1,2% enmə qeydə alınsa da, diplomatik həllə ümidlər artdıqca itkinin böyük hissəsi bərpa olunub. Enerji sektoru səhmləri 4,2% yüksəlib, aviasiya şirkətləri isə yanacaq qiymət gözləntiləri azaldıqca 2,8% artıb. Texnologiya sektoru isə davamlı təzyiq altındadır.

## ABŞ benzin qiymətləri

ABŞ Enerji İnformasiya İdarəsi (EIA) neft və benzin qiymət proqnozlarını kəskin yuxarıya revizya edib. ABŞ orta benzin qiymətlərinin bu ay qallon başına 4,30 dollar zirvəsinə çatması gözlənilir. Bu, istehlak inflyasiyasına ciddi təzyiq yaradır.

## Trader reaksiyası

Treydlər bu gecə keçiriləcək presslər üçün yüksək volatilliyə hazırlıqlıdır. Saat 20:00 (ABŞ şərq vaxtı) son tarixi — AZ vaxtı ilə 04:00 — bazarları yeni istiqamətə yönələ bilər. Qlobal fondu idarəçiləri risk azaltma strategiyaları tətbiq edir.`,
  },
  'en-markets-deadline-day-oil-113-sp500-volatility': {
    title: 'Markets on Deadline Day: Oil Near $113, S&P 500 Volatile, Global Swings',
    date: '2026-04-08',
    category: 'Economy',
    locale: 'en',
    content: `As the Iran-US crisis enters its deadline day, global financial markets are experiencing record-level volatility. WTI crude hovers near $113 per barrel, the S&P 500 trades nervously, and gold is pushing toward record highs as investors seek shelter from geopolitical risk.

## Oil Markets

US WTI crude settled near $113 per barrel at Tuesday\'s close on April 7. A day earlier, the May contract ticked up 0.78% to close at $112.41 per barrel, while international benchmark Brent edged 0.68% higher to settle at $109.77. The ongoing closure of the Strait of Hormuz continues to strain global oil logistics, with every tanker rerouting adding days to delivery times.

## S&P 500 and Equity Markets

The S&P 500 index is hovering around the 6,582 level. On Tuesday\'s session the benchmark trimmed most of a 1.2% early drop as hopes grew for a diplomatic resolution. Energy sector shares advanced 4.2%, while airlines gained 2.8% on expectations that fuel-price spikes could moderate if the strait reopens. Technology remains under continued pressure as risk-off positioning prevails.

## US Gasoline Forecasts

The US Energy Information Administration has sharply raised its oil and gasoline price forecasts. Average US gasoline prices are now expected to peak at $4.30 per gallon this month — the highest level since 2022. This adds significant pressure to consumer inflation measures just weeks before the next Federal Reserve meeting.

## Trader Response

Traders are positioning for extreme volatility around tonight\'s 8 p.m. ET deadline. Options markets are pricing in the largest overnight implied moves of 2026 for oil, equities, and currencies. Global fund managers are implementing hedging strategies, with gold ETF inflows hitting a three-year record this week as capital flees to traditional safe havens.`,
  },
  'tr-piyasalar-son-tarih-gunu-petrol-113-sp500': {
    title: 'Piyasalar Son Tarih Gününde: Petrol 113 Dolara Yakın, S&P 500 Oynak, Küresel Dalgalanma',
    date: '2026-04-08',
    category: 'Ekonomi',
    locale: 'tr',
    content: `İran-ABD krizi son tarih gününe girdikçe küresel finans piyasaları rekor düzeyde dalgalanma yaşıyor. WTI ham petrolü varil başına 113 dolara yakın seyrediyor, S&P 500 gergin işlem görüyor ve altın jeopolitik riskten korunma arayan yatırımcıların etkisiyle rekor seviyelere yükseliyor.

## Petrol Piyasaları

ABD WTI ham petrolü 7 Nisan Salı kapanışında varil başına 113 dolara yakın seyretti. Bir gün önce mayıs kontratı yüzde 0,78 artışla 112,41 dolardan kapandı. Uluslararası referans Brent petrolü ise yüzde 0,68 yükselerek 109,77 dolardan işlem gördü. Hürmüz Boğazı\'nın kapalı kalması küresel petrol lojistiğindeki baskıyı sürdürüyor.

## S&P 500 ve Hisse Piyasaları

S&P 500 endeksi 6.582 seviyesinde dolaşıyor. Salı seansında endeks diplomatik çözüm umutlarının artmasıyla yüzde 1,2\'lik ilk düşüşünün büyük kısmını telafi etti. Enerji sektörü hisseleri yüzde 4,2 yükseldi, havayolu şirketleri ise yakıt fiyatı artışlarının boğazın yeniden açılmasıyla yumuşayabileceği beklentisiyle yüzde 2,8 kazandı. Teknoloji sektörü ise risk-off konumlanmasıyla baskı altında kalmaya devam ediyor.

## ABD Benzin Fiyat Tahminleri

ABD Enerji Bilgi İdaresi (EIA) petrol ve benzin fiyat tahminlerini keskin biçimde yukarı yönlü revize etti. ABD\'deki ortalama benzin fiyatlarının bu ay galon başına 4,30 dolara ulaşması bekleniyor — 2022\'den bu yana en yüksek seviye. Bu durum, yaklaşan Fed toplantısından birkaç hafta önce tüketici enflasyonu üzerinde büyük baskı oluşturuyor.

## Yatırımcı Tepkisi

Yatırımcılar bu gece 20:00 (ABD Doğu Yakası) saatinde gelecek son tarih öncesinde yüksek volatiliteye pozisyon alıyor. Opsiyon piyasaları petrol, hisseler ve döviz için 2026\'nın en büyük gecelik zımni hareketlerini fiyatlıyor. Küresel fon yöneticileri hedging stratejileri uygularken, altın ETF\'lerine bu hafta üç yılın rekor girişleri yaşanıyor.`,
  },
  'ru-rynki-den-dedlajna-neft-113-sp500-volatilnost': {
    title: 'Рынки в день дедлайна: нефть около $113, S&P 500 в зоне турбулентности, глобальные колебания',
    date: '2026-04-08',
    category: 'Экономика',
    locale: 'ru',
    content: `По мере того как кризис Иран-США входит в день дедлайна, мировые финансовые рынки переживают рекордную волатильность. Нефть WTI колеблется около $113 за баррель, S&P 500 торгуется нервно, а золото стремится к историческим максимумам, поскольку инвесторы ищут убежище от геополитических рисков.

## Нефтяные рынки

Американская WTI закрылась в районе $113 за баррель во вторник, 7 апреля. Днём ранее майский контракт вырос на 0,78% до $112,41 за баррель. Международный эталонный сорт Brent поднялся на 0,68%, закрывшись на отметке $109,77. Продолжающееся закрытие Ормузского пролива по-прежнему создаёт напряжённость в глобальной нефтяной логистике — каждый перенаправленный танкер увеличивает сроки поставки на несколько дней.

## S&P 500 и фондовые рынки

Индекс S&P 500 колеблется вокруг уровня 6 582. Во вторничную сессию индекс отыграл большую часть раннего падения на 1,2% на фоне растущих надежд на дипломатическое решение. Акции энергетического сектора прибавили 4,2%, авиакомпании выросли на 2,8% на ожиданиях того, что скачки цен на топливо могут смягчиться, если пролив откроется. Технологии остаются под давлением из-за преобладания режима "уход от риска".

## Прогноз по бензину в США

EIA резко пересмотрело прогнозы цен на нефть и бензин в сторону повышения. Ожидается, что средние цены на бензин в США в этом месяце достигнут пика в $4,30 за галлон — самого высокого уровня с 2022 года. Это создаёт значительное давление на потребительскую инфляцию всего за несколько недель до очередного заседания ФРС.

## Реакция трейдеров

Трейдеры занимают позиции под высокую волатильность около сегодняшнего дедлайна в 20:00 по восточному времени. Рынки опционов закладывают крупнейшие ночные ожидаемые движения 2026 года для нефти, акций и валют. Управляющие глобальными фондами применяют стратегии хеджирования, а приток средств в золотые ETF на этой неделе установил трёхлетний рекорд.`,
  },
  'google-gemini-3-1-flash-lite-lyria-3-pro-suni-zeka': {
    title: 'Google süni zəkada yenilik: Gemini 3.1 Flash-Lite və Lyria 3 Pro musiqi modeli',
    date: '2026-04-08',
    category: 'Texnologiya',
    locale: 'az',
    content: `Google aprel ayında süni zəka sahəsində iki böyük yenilik təqdim edib: Gemini 3.1 Flash-Lite adlı səmərəli dil modeli və Lyria 3 Pro adlı musiqi generasiya modeli. Bu addımlar şirkətin süni zəka bazarında rəqabət mövqeyini gücləndirir.

## Gemini 3.1 Flash-Lite

Yeni model 2,5 dəfə daha sürətli cavab müddəti və əvvəlki Gemini versiyaları ilə müqayisədə 45% daha sürətli çıxış generasiyası təklif edir. Bu, xüsusilə mobil cihazlar və real-vaxt çat tətbiqləri üçün böyük irəliləyişdir. Qiyməti milyon giriş tokeni başına cəmi 0,25 dollardır — bu, rəqabətli bazar qiymətinin əhəmiyyətli dərəcədə altındadır.

## Lyria 3 Pro — musiqi generasiyası

Lyria 3 Pro Google-un ən təkmil musiqi modeli olaraq daha çox məhsula daxil edilir. Model mətn təlimatlarından tam orkestral parçalar, vokalar və janrlar arası kompozisyalar yarada bilir. Developer API-si vasitəsilə inteqrasiya olunan sistem YouTube, Google Fotos və yeni musiqi yaradıcılığı alətlərində istifadə olunacaq.

## Rəqabət kontekstində

Bu elan edilişi NVIDIA GTC 2026 tədbirindən iki həftə sonra baş verir. O tədbirdə agentlər çərçivələri, xüsusilə NeMoCLAW və OpenCLAW orkestrasiya alətləri mərkəzi yer tutmuşdu. Google indi bu yarışda davranış və səs generasiyası sahəsində öz mövqeyini bərkidir. Microsoft-un Yaponiyaya 10 milyard dollarlıq AI investisiyası ilə yanaşı bu rəqabətin 2026-cı ildə daha da kəskinləşəcəyini göstərir.

## Tətbiq və gələcək

Developerlər yeni Gemini modelini Vertex AI və AI Studio vasitəsilə dərhal istifadə edə bilərlər. Lyria 3 Pro isə mərhələli şəkildə müxtəlif regionlarda istifadəçilərin xidmətinə qoyulacaq.`,
  },
  'en-google-gemini-3-1-flash-lite-lyria-3-pro-ai': {
    title: 'Google AI Double Launch: Gemini 3.1 Flash-Lite and Lyria 3 Pro Music Model',
    date: '2026-04-08',
    category: 'Technology',
    locale: 'en',
    content: `Google unveiled two major artificial intelligence announcements this April: Gemini 3.1 Flash-Lite, a new efficiency-focused language model, and Lyria 3 Pro, the company\'s most advanced music generation model. Together, the launches reinforce Google\'s competitive stance in a fast-moving AI market.

## Gemini 3.1 Flash-Lite

The new model delivers 2.5 times faster response times and 45% faster output generation compared to earlier Gemini versions. This represents a significant step forward for mobile devices, edge deployments, and real-time chat applications. Pricing is aggressive at just $0.25 per million input tokens — substantially below competitive market rates — making it attractive for high-volume agent workloads and cost-sensitive enterprise customers.

## Lyria 3 Pro — Music Generation

Lyria 3 Pro is being rolled out as Google\'s most advanced music model across more products. The system can generate full orchestral pieces, vocals, and cross-genre compositions from text prompts. Integrated via the Developer API, the model will power features in YouTube, Google Photos, and new music creation tools aimed at both professionals and hobbyists.

## Competitive Context

The announcements arrive two weeks after NVIDIA GTC 2026, which showcased agentic AI frameworks — particularly the NeMoCLAW and OpenCLAW orchestration tools. Alongside Microsoft\'s reported $10 billion Japan AI investment, the releases signal that the 2026 AI race is intensifying across every layer from silicon to models to end-user applications.

## Rollout and Availability

Developers can access the new Gemini model immediately via Vertex AI and Google AI Studio. Lyria 3 Pro will be rolled out to users in phases across different regions over the coming weeks. Google noted that responsible AI checks and watermarking are enabled by default on all Lyria-generated audio.`,
  },
  'tr-google-gemini-3-1-flash-lite-lyria-3-pro-yapay-zeka': {
    title: 'Google\'dan İkili Yapay Zeka Lansmanı: Gemini 3.1 Flash-Lite ve Lyria 3 Pro Müzik Modeli',
    date: '2026-04-08',
    category: 'Teknoloji',
    locale: 'tr',
    content: `Google, nisan ayında iki büyük yapay zeka duyurusunu kamuoyuyla paylaştı: verimliliğe odaklanan yeni dil modeli Gemini 3.1 Flash-Lite ve şirketin en gelişmiş müzik üretim modeli Lyria 3 Pro. Lansmanlar, hızla değişen yapay zeka pazarında Google\'ın rekabet gücünü pekiştiriyor.

## Gemini 3.1 Flash-Lite

Yeni model, önceki Gemini sürümleriyle karşılaştırıldığında 2,5 kat daha hızlı yanıt süresi ve yüzde 45 daha hızlı çıktı üretimi sağlıyor. Bu özellik, mobil cihazlar, edge dağıtımları ve gerçek zamanlı sohbet uygulamaları için önemli bir ilerleme. Fiyatlandırma oldukça agresif: milyon giriş tokeni başına sadece 0,25 dolar — bu rakam piyasa rekabet oranlarının çok altında ve yüksek hacimli ajan iş yükleri ile maliyete duyarlı kurumsal müşteriler için cazip.

## Lyria 3 Pro — Müzik Üretimi

Lyria 3 Pro, Google\'ın en gelişmiş müzik modeli olarak daha fazla ürüne entegre ediliyor. Sistem, metin komutlarından tam orkestra parçaları, vokaller ve türler arası kompozisyonlar üretebiliyor. Developer API üzerinden entegre edilen model, YouTube, Google Fotoğraflar ve hem profesyonelleri hem amatörleri hedefleyen yeni müzik yaratım araçlarına güç katacak.

## Rekabet Bağlamı

Duyurular, agentic yapay zeka çerçevelerinin — özellikle NeMoCLAW ve OpenCLAW orkestrasyon araçlarının — öne çıktığı NVIDIA GTC 2026 etkinliğinden iki hafta sonra geldi. Microsoft\'un Japonya\'ya yaptığı bildirilen 10 milyar dolarlık yapay zeka yatırımı ile birlikte bu lansmanlar, 2026 yapay zeka yarışının silikondan modellere ve son kullanıcı uygulamalarına kadar her katmanda yoğunlaştığını gösteriyor.

## Dağıtım ve Erişilebilirlik

Geliştiriciler yeni Gemini modeline Vertex AI ve Google AI Studio üzerinden hemen erişebilirler. Lyria 3 Pro ise önümüzdeki haftalarda farklı bölgelerde aşamalı olarak kullanıcılara sunulacak. Google, Lyria tarafından üretilen tüm ses dosyalarında sorumlu AI kontrollerinin ve watermark\'ın varsayılan olarak etkin olduğunu belirtti.`,
  },
  'ru-google-gemini-3-1-flash-lite-lyria-3-pro-ii': {
    title: 'Двойной запуск Google AI: Gemini 3.1 Flash-Lite и музыкальная модель Lyria 3 Pro',
    date: '2026-04-08',
    category: 'Технологии',
    locale: 'ru',
    content: `Google представила две крупные новости в области искусственного интеллекта в апреле: Gemini 3.1 Flash-Lite — новую языковую модель, оптимизированную для эффективности, и Lyria 3 Pro — самую передовую модель генерации музыки компании. Вместе эти запуски укрепляют конкурентные позиции Google на быстро меняющемся рынке ИИ.

## Gemini 3.1 Flash-Lite

Новая модель обеспечивает в 2,5 раза более быстрое время отклика и на 45% более быструю генерацию вывода по сравнению с предыдущими версиями Gemini. Это значительный шаг вперёд для мобильных устройств, периферийных развертываний и приложений чата в реальном времени. Цена агрессивна — всего $0,25 за миллион входных токенов, что существенно ниже рыночных конкурентных ставок и делает модель привлекательной для высоконагруженных агентских рабочих нагрузок и чувствительных к затратам корпоративных клиентов.

## Lyria 3 Pro — генерация музыки

Lyria 3 Pro развёртывается как самая передовая музыкальная модель Google и интегрируется в большее число продуктов. Система может создавать целые оркестровые произведения, вокальные партии и композиции в разных жанрах по текстовым подсказкам. Интегрированная через API для разработчиков, модель будет обеспечивать функции в YouTube, Google Фото и новых инструментах создания музыки для профессионалов и любителей.

## Конкурентный контекст

Объявления появились через две недели после NVIDIA GTC 2026, где были показаны фреймворки агентного ИИ — в частности, инструменты оркестрации NeMoCLAW и OpenCLAW. Вместе с сообщениями об инвестициях Microsoft в размере $10 миллиардов в AI в Японии эти релизы сигнализируют, что гонка ИИ в 2026 году усиливается на каждом уровне — от кремния до моделей и приложений для конечного пользователя.

## Развёртывание и доступность

Разработчики могут получить доступ к новой модели Gemini прямо сейчас через Vertex AI и Google AI Studio. Lyria 3 Pro будет развёрнута поэтапно для пользователей в разных регионах в ближайшие недели. Google отметила, что проверки ответственного ИИ и водяные знаки включены по умолчанию для всего аудио, созданного Lyria.`,
  },
  'google-maps-gemini-ask-maps-sohbet-asistani': {
    title: 'Google Maps Gemini ilə yenilənir: "Ask Maps" söhbət asistanı yola çıxanlara kömək edəcək',
    date: '2026-04-08',
    category: 'Texnologiya',
    locale: 'az',
    content: `Google, Maps tətbiqini Gemini süni zəka modeli ilə böyük yeniləmədən keçirdi. Yeni "Ask Maps" adlı söhbət interfeysi kompleks suallara cavab verə, hətta yol üzərində olarkən rezervasiya edə bilir. Bu, Google xəritələrinin son on ildəki ən böyük istifadəçi təcrübəsi dəyişikliyidir.

## "Ask Maps" necə işləyir

İstifadəçilər artıq Maps-də sadəcə ünvan axtarmaqla məhdudlaşmayacaq. "Mənə günəş batarkən dənizə baxa biləcəyim restoranlar tap", "Bu rayonda 2-3 yaşındakı uşaqlar üçün parklar hansılardır?" və ya "Son hava dəyişiklikləri nəzərə alınmaqla ən sürətli marşrut hansıdır?" kimi kompleks suallar verilə bilər. Gemini real-vaxt məlumatlarını, istifadəçi rəylərini və xəritə məlumatlarını birləşdirərək dəqiq cavablar hazırlayır.

## Rezervasiya funksiyası

Ən diqqətçəkən yenilik budur ki, istifadəçilər Maps-dan ayrılmadan restoran rezervasiyası, avtomobil icarəsi və ya hətta muzey biletləri sifariş edə bilərlər. Sistem OpenTable, Resy və ABŞ-ın digər tərəfdaşları ilə inteqrasiya olunub. Səs əmri ilə də əməliyyat aparmaq mümkündür, bu da sürücülər üçün təhlükəsizlik baxımından əhəmiyyətlidir.

## Virtual sınaq texnologiyası

Bundan başqa, 30 apreldən etibarən Google-un virtual sınaq texnologiyası məhsul axtarışlarında birbaşa istifadə oluna bilər. Bu, 2025-ci ildə ABŞ pərakəndə satışlarının 15,8%-nin qaytarıldığı və onlayn satış qaytarmalarının 19,3%-ə qalxdığı fonunda böyük problemi həll etməyə yönəlib.

## İstifadəyə verilmə

Yeni funksiyalar əvvəlcə ABŞ, Böyük Britaniya və Hindistanda mərhələli şəkildə çıxarılır. Bakı, İstanbul, Moskva və digər böyük şəhərlər isə növbəti ayda bu xidmətdən yararlana biləcək.`,
  },
  'en-google-maps-gemini-ask-maps-conversational-assistant': {
    title: 'Google Maps Gets Gemini Upgrade: "Ask Maps" Conversational Assistant for Travelers',
    date: '2026-04-08',
    category: 'Technology',
    locale: 'en',
    content: `Google has delivered a major upgrade to Maps powered by its Gemini AI model. The new "Ask Maps" conversational interface can answer complex questions and even book reservations while users are on the go. It\'s the biggest user experience shift for Google Maps in a decade.

## How "Ask Maps" Works

Users are no longer limited to simple address searches within Maps. Complex queries like "Find me restaurants where I can watch the sunset over the ocean," "What parks in this area are good for 2-3 year olds?", or "Given today\'s weather, what\'s the fastest route?" are now supported. Gemini combines real-time data, user reviews, and map information to deliver precise contextual answers.

## Booking Integration

The most notable addition is that users can now make restaurant reservations, rent cars, and even book museum tickets without ever leaving Maps. The system integrates with OpenTable, Resy, and other booking partners. Voice commands are supported, which is particularly important for drivers who can keep both hands on the wheel and eyes on the road while finalizing plans.

## Virtual Try-On Technology

Separately, starting April 30, Google\'s virtual try-on technology will be accessible directly within product search results across Google platforms. The rollout addresses a major retail pain point — the US National Retail Federation estimated that 15.8% of annual retail sales were returned in 2025, totaling $849.9 billion, with online sales returns jumping to 19.3%.

## Rollout Timeline

The new Maps features are being rolled out in phases, starting with the US, UK, and India. Continental Europe, Turkey, and other major markets will follow within weeks. Google says the conversational model preserves privacy by processing queries on-device where possible, with full encryption for requests sent to the cloud.`,
  },
  'tr-google-maps-gemini-ask-maps-sohbet-asistani': {
    title: 'Google Maps Gemini ile Yükseltildi: "Ask Maps" Sohbet Asistanı Yolcularla',
    date: '2026-04-08',
    category: 'Teknoloji',
    locale: 'tr',
    content: `Google, Maps uygulamasını Gemini yapay zeka modeliyle güçlendirerek büyük bir güncelleme yayınladı. Yeni "Ask Maps" sohbet arayüzü, karmaşık sorulara yanıt verebiliyor ve hatta kullanıcı yoldayken rezervasyon yapabiliyor. Bu, Google Haritalar için son on yılın en büyük kullanıcı deneyimi değişikliği.

## "Ask Maps" Nasıl Çalışır

Kullanıcılar artık Maps\'te basit adres aramalarıyla sınırlı kalmayacak. "Günbatımında okyanusu izleyebileceğim restoranlar bul", "Bu bölgede 2-3 yaş çocukları için iyi parklar hangileri?" veya "Bugünkü hava koşullarına göre en hızlı güzergah hangisi?" gibi karmaşık sorular artık destekleniyor. Gemini, gerçek zamanlı verileri, kullanıcı değerlendirmelerini ve harita bilgilerini birleştirerek hassas ve bağlamsal yanıtlar sunuyor.

## Rezervasyon Entegrasyonu

En dikkat çekici ek, kullanıcıların artık Maps\'ten hiç ayrılmadan restoran rezervasyonu yapabilmeleri, araç kiralayabilmeleri ve hatta müze biletleri satın alabilmeleri. Sistem OpenTable, Resy ve diğer rezervasyon ortaklarıyla entegre çalışıyor. Sesli komutlar destekleniyor — bu özellikle sürücüler için önemli: elleri direksiyonda ve gözleri yolda tutarak planları tamamlayabiliyorlar.

## Sanal Deneme Teknolojisi

Ayrı olarak, 30 Nisan\'dan itibaren Google\'ın sanal deneme teknolojisi Google platformlarındaki ürün arama sonuçlarında doğrudan erişilebilir olacak. Bu lansman önemli bir perakende sorununu çözmeyi hedefliyor: ABD Ulusal Perakende Federasyonu\'na göre 2025\'te yıllık perakende satışlarının yüzde 15,8\'i iade edildi, toplam 849,9 milyar dolar oldu ve çevrimiçi satış iadeleri yüzde 19,3\'e fırladı.

## Dağıtım Takvimi

Yeni Maps özellikleri ABD, Birleşik Krallık ve Hindistan\'dan başlayarak aşamalı olarak kullanıma sunuluyor. Kıta Avrupası, Türkiye ve diğer büyük pazarlar önümüzdeki haftalar içinde takip edecek. Google, sohbet modelinin sorguları mümkün olduğunda cihaz üzerinde işleyerek gizliliği koruduğunu ve buluta gönderilen isteklerin tam şifreleme ile korunduğunu belirtti.`,
  },
  'ru-google-maps-gemini-ask-maps-razgovornyj-assistent': {
    title: 'Google Maps получает обновление Gemini: разговорный ассистент "Ask Maps" для путешественников',
    date: '2026-04-08',
    category: 'Технологии',
    locale: 'ru',
    content: `Google выпустила крупное обновление Maps, работающее на базе модели Gemini AI. Новый разговорный интерфейс "Ask Maps" может отвечать на сложные вопросы и даже бронировать места, когда пользователи находятся в пути. Это самое значительное изменение пользовательского опыта Google Карт за последние десять лет.

## Как работает "Ask Maps"

Пользователи больше не ограничены простым поиском адресов в Maps. Теперь поддерживаются сложные запросы, например: "Найди мне рестораны, где я смогу наблюдать закат над океаном", "Какие парки в этом районе подходят для детей 2-3 лет?" или "С учётом сегодняшней погоды, какой самый быстрый маршрут?" Gemini объединяет данные в реальном времени, отзывы пользователей и информацию карт, чтобы давать точные контекстные ответы.

## Интеграция бронирования

Наиболее заметное дополнение — пользователи теперь могут бронировать рестораны, брать автомобили напрокат и даже покупать билеты в музеи, не покидая Maps. Система интегрирована с OpenTable, Resy и другими партнёрами по бронированию. Поддерживаются голосовые команды — это особенно важно для водителей, которые могут завершать планирование, не отрывая рук от руля и глаз от дороги.

## Технология виртуальной примерки

Отдельно с 30 апреля технология виртуальной примерки Google будет доступна непосредственно в результатах поиска товаров на платформах Google. Запуск решает серьёзную проблему розничной торговли — Национальная ассоциация розничной торговли США оценила, что в 2025 году было возвращено 15,8% годовых розничных продаж на общую сумму $849,9 миллиарда, причём доля возвратов онлайн-продаж подскочила до 19,3%.

## График развёртывания

Новые функции Maps развёртываются поэтапно, начиная с США, Великобритании и Индии. Континентальная Европа, Турция и другие крупные рынки последуют в течение ближайших недель. Google сообщает, что разговорная модель сохраняет конфиденциальность, обрабатывая запросы на устройстве, где это возможно, с полным шифрованием для запросов, отправляемых в облако.`,
  },
  'azerbaycan-turkiye-huquqi-emekdashliq-prokurorlar-gorusu': {
    title: 'Azərbaycan-Türkiyə hüquqi əməkdaşlığı güclənir: prezident Aliyev Türkiyə prokurorunu qəbul etdi',
    date: '2026-04-08',
    category: 'Dünya',
    locale: 'az',
    content: `Azərbaycan Respublikasının Prezidenti İlham Əliyev 7 aprel tarixində Türkiyə Respublikası Yüksək Apellyasiya Məhkəməsinin Baş Prokuroru Muhsin Şentürkü qəbul edib. Görüşdə iki qardaş ölkə arasında hüquqi əməkdaşlıq, cinayətkarlığa qarşı ortaq mübarizə və regional təhlükəsizlik müzakirə edilib.

## Görüşün mündəricatı

Görüş zamanı Prezident Əliyev Azərbaycan-Türkiyə əlaqələrinin bütün sahələrdə, o cümlədən hüquqi sistem və prokurorluq strukturları səviyyəsində dərinləşdiyini vurğulayıb. Muhsin Şentürk isə Türkiyənin Azərbaycana möhkəm dəstəyini təkrar ifadə edib və iki ölkə arasında ictimai təhlükəsizliyin qorunmasında ortaq yanaşma olduğunu bildirib.

## Ortaq mübarizə sahələri

Görüşdə cinayətkarlığa qarşı mübarizə, transmilli cinayətlərin araşdırılması, mütəşəkkil cinayət və qaçaqmalçılıq sahələrində əməkdaşlıq müzakirə olunub. İki ölkə arasında məhkum verilmə prosedurları və hüquqi yardım sazişləri də gündəliyin əsas mövzularından oldu.

## Regional təhlükəsizlik

Regional təhlükəsizlik kontekstində Cənubi Qafqaz və Orta Asiyada sabitliyin təmin edilməsi məsələləri müzakirə edilib. Azərbaycan və Türkiyə həmçinin İran-ABŞ böhranının bölgəyə təsirinə ortaq baxışlarını təqdim ediblər. Prokuror Şentürk Bakı ziyarətini başa vuraraq Anadoluya qayıtmışdır.

## Ermənistan sülh prosesi

Görüş həmçinin Bakı-Yerevan sülh prosesinə dair son vəziyyət fonunda keçib. Xatırladaq ki, Azərbaycan 2026-cı il üçün Ermənistan ilə tam sülh gündəliyini təqdim edib və prosesdə əhəmiyyətli irəliləyişlər qeyd olunur.`,
  },
  'en-azerbaijan-turkey-legal-cooperation-prosecutor-meeting': {
    title: 'Azerbaijan-Turkey Legal Cooperation Deepens: President Aliyev Receives Turkish Prosecutor',
    date: '2026-04-08',
    category: 'World',
    locale: 'en',
    content: `Azerbaijan\'s President Ilham Aliyev received Muhsin Şentürk, Prosecutor General of the Supreme Court of Appeal of the Republic of Türkiye, on April 7. Discussions between the two brotherly nations focused on legal cooperation, joint efforts against crime, and regional security in the South Caucasus.

## Meeting Agenda

During the meeting, President Aliyev emphasized that Azerbaijan-Turkey relations continue to deepen across all spheres, including the legal system and prosecutorial structures. Muhsin Şentürk reiterated Türkiye\'s firm support for Azerbaijan and confirmed a shared approach to preserving public safety and upholding the rule of law. Both sides noted the importance of continuous dialogue between their judicial institutions.

## Joint Priorities

The talks covered crime fighting, investigation of transnational offences, and cooperation against organized crime and smuggling networks. Procedures for extradition and mutual legal assistance agreements were also high on the agenda. Officials agreed to expand training exchanges between Azerbaijani and Turkish prosecutors.

## Regional Security

In the regional security context, the discussion addressed stability in the South Caucasus and Central Asia. Azerbaijan and Turkey also shared their joint perspective on the impact of the Iran-US crisis on the region — both countries have close diplomatic and economic ties with all sides and have advocated for a diplomatic resolution. Prosecutor Şentürk concluded his Baku visit and returned to Anatolia.

## Armenia Peace Process

The meeting also took place against the backdrop of the Baku-Yerevan peace process. Azerbaijan has presented a full peace agenda with Armenia for 2026, and notable progress continues to be reported on border delimitation, mutual recognition, and transport corridor negotiations between the two former adversaries.`,
  },
  'tr-azerbaycan-turkiye-hukuki-isbirligi-bassavci-gorusmesi': {
    title: 'Azerbaycan-Türkiye Hukuki İşbirliği Güçleniyor: Aliyev Türk Başsavcıyı Kabul Etti',
    date: '2026-04-08',
    category: 'Dünya',
    locale: 'tr',
    content: `Azerbaycan Cumhurbaşkanı İlham Aliyev, 7 Nisan\'da Türkiye Cumhuriyeti Yargıtay Başsavcısı Muhsin Şentürk\'ü kabul etti. İki kardeş ülke arasındaki görüşmede hukuki işbirliği, suçla ortak mücadele ve Güney Kafkasya\'da bölgesel güvenlik konuları ele alındı.

## Görüşme Gündemi

Görüşmede Cumhurbaşkanı Aliyev, Azerbaycan-Türkiye ilişkilerinin hukuk sistemi ve savcılık yapıları dahil tüm alanlarda derinleşmeye devam ettiğini vurguladı. Muhsin Şentürk ise Türkiye\'nin Azerbaycan\'a sarsılmaz desteğini yineledi ve kamu güvenliğinin korunması ile hukukun üstünlüğünün sağlanmasında ortak bir yaklaşım olduğunu teyit etti. Her iki taraf yargı kurumları arasındaki sürekli diyaloğun önemini vurguladı.

## Ortak Öncelikler

Görüşmeler suçla mücadele, uluslararası suçların soruşturulması ve organize suç ile kaçakçılık ağlarına karşı işbirliğini kapsadı. İade prosedürleri ve karşılıklı hukuki yardım anlaşmaları da gündemin önemli maddeleri arasında yer aldı. Yetkililer, Azerbaycanlı ve Türk savcılar arasındaki eğitim değişim programlarının genişletilmesi konusunda anlaştı.

## Bölgesel Güvenlik

Bölgesel güvenlik bağlamında Güney Kafkasya ve Orta Asya\'daki istikrar konuları ele alındı. Azerbaycan ve Türkiye, İran-ABD krizinin bölgeye etkisi konusunda ortak bakış açılarını paylaştı. Her iki ülke de tüm taraflarla yakın diplomatik ve ekonomik bağlara sahip olup, diplomatik bir çözüm için savunuculuk yapıyor. Başsavcı Şentürk Bakü ziyaretini tamamlayarak Anadolu\'ya döndü.

## Ermenistan Barış Süreci

Görüşme aynı zamanda Bakü-Erivan barış süreci zemininde gerçekleşti. Azerbaycan, Ermenistan\'la 2026 yılı için tam bir barış gündemi sundu ve iki eski düşman arasındaki sınır belirlenmesi, karşılıklı tanıma ve ulaşım koridoru müzakereleri konusunda kayda değer ilerlemeler raporlanmaya devam ediyor.`,
  },
  'ru-azerbaydzhan-turciya-pravovoe-sotrudnichestvo-prokurory': {
    title: 'Правовое сотрудничество Азербайджана и Турции углубляется: Алиев принял Генпрокурора Турции',
    date: '2026-04-08',
    category: 'Мир',
    locale: 'ru',
    content: `Президент Азербайджанской Республики Ильхам Алиев 7 апреля принял Генерального прокурора Высшего апелляционного суда Турецкой Республики Мухсина Шентюрка. Переговоры между двумя братскими странами были посвящены правовому сотрудничеству, совместной борьбе с преступностью и региональной безопасности на Южном Кавказе.

## Повестка встречи

Во время встречи президент Алиев подчеркнул, что отношения между Азербайджаном и Турцией продолжают углубляться во всех сферах, включая правовую систему и прокурорские структуры. Мухсин Шентюрк подтвердил твёрдую поддержку Азербайджана со стороны Турции и заявил об общем подходе к сохранению общественной безопасности и верховенства права. Обе стороны отметили важность постоянного диалога между судебными институтами двух стран.

## Совместные приоритеты

Переговоры охватили темы борьбы с преступностью, расследования транснациональных правонарушений и сотрудничества против организованной преступности и контрабандных сетей. Процедуры выдачи и соглашения о взаимной правовой помощи также были в числе главных пунктов повестки. Стороны договорились расширить программы обмена и подготовки между азербайджанскими и турецкими прокурорами.

## Региональная безопасность

В контексте региональной безопасности обсуждались вопросы стабильности на Южном Кавказе и в Центральной Азии. Азербайджан и Турция также поделились общим взглядом на влияние кризиса Иран-США на регион — обе страны имеют тесные дипломатические и экономические связи со всеми сторонами и выступают за дипломатическое урегулирование. Прокурор Шентюрк завершил свой визит в Баку и вернулся в Анатолию.

## Мирный процесс с Арменией

Встреча также прошла на фоне мирного процесса Баку-Ереван. Азербайджан представил полную мирную повестку с Арменией на 2026 год, и продолжают поступать сообщения о заметном прогрессе в делимитации границ, взаимном признании и переговорах по транспортному коридору между двумя бывшими противниками.`,
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
