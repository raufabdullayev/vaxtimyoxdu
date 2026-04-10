export interface NewsArticle {
  title: string
  date: string
  category: string
  content: string
  locale?: string
}

export const newsArticles: Record<string, NewsArticle> = {
  // ========== 2026-04-10 ==========

  // --- Artemis II Crew Splashes Down After Historic Moon Flyby ---
  'artemis-2-ekipaj-sakit-okeana-enis': {
    title: 'Artemis II Ekipajı Tarixi Ay Uçuşundan Sonra Sakit Okeana Eniş Etdi',
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
    title: 'Artemis II Ekibi Tarihi Ay Uçuşunun Ardından Pasifik Okyanusuna İniş Yaptı',
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
    title: 'Экипаж Artemis II приводнился после исторического облёта Луны',
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

  // --- VP Vance Heads to Islamabad for US-Iran Ceasefire Negotiations ---
  'vans-islamabada-yollanir-iran-danisiqlar': {
    title: 'Vitse-prezident Vans ABŞ-İran Atəşkəs Danışıqları Üçün İslamabada Yollanır',
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
    title: 'VP Vance Heads to Islamabad for US-Iran Ceasefire Negotiations',
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
    title: 'Başkan Yardımcısı Vance ABD-İran Ateşkes Görüşmeleri İçin İslamabad\'a Gidiyor',
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
    title: 'Вице-президент Вэнс направляется в Исламабад на переговоры о прекращении огня с Ираном',
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
    title: 'ABŞ İstehlak Qiymətləri İllik 3,3%-ə Yüksəldi — Neft Qiymətləri Sıçrayır',
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
    title: 'Индекс потребительских цен в США подскочил до 3,3% на фоне роста цен на нефть',
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
    title: 'Anthropic gəlirdə OpenAI-ni keçdi: $30 milyard illik gəlir, hər iki şirkət IPO planlaşdırır',
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
    title: 'Anthropic Surpasses OpenAI With $30B ARR as Both Companies Prepare for Historic IPOs',
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
    title: 'Anthropic gelirde OpenAI\'yi geçti: 30 milyar dolar yıllık gelir, her iki şirket IPO planlıyor',
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
    title: 'Anthropic обогнала OpenAI по доходам с показателем $30 млрд ARR: обе компании готовятся к IPO',
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
    title: 'ABŞ Ədliyyə Nazirliyi NFL-ə qarşı antitrest araşdırması başlatdı: striming müqavilələri hədəfdə',
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
    title: 'DOJ Launches Antitrust Investigation Into NFL Over Streaming TV Deals and Subscription Costs',
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
    title: 'ABD Adalet Bakanlığı NFL\'e karşı antitröst soruşturma başlattı: yayın anlaşmaları hedefte',
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
    title: 'Минюст США начал антимонопольное расследование против NFL из-за стриминговых контрактов',
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
    title: 'Çinin milli superkompüterinə nəhəng kiberhücum: 10 petabayt məlumat oğurlandı',
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
    title: 'Massive Cyberattack on China National Supercomputer Center: 10 Petabytes of Military Data Stolen',
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
    title: 'Çin ulusal süper bilgisayarına büyük siber saldırı: 10 petabayt askeri veri çalındı',
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
    title: 'Масштабная кибератака на суперкомпьютерный центр Китая: похищено 10 петабайт военных данных',
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
    title: 'Masters 2026: Augusta National-da ikinci tur başladı - McIlroy və Burns liderliyə şərik',
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
    title: 'Masters 2026: Round 2 Underway at Augusta as McIlroy and Burns Share the Lead',
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
    title: 'Masters 2026: Augusta National\'da ikinci tur devam ediyor - McIlroy ve Burns zirvede',
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
    title: 'Мастерс 2026: второй раунд стартовал в Огасте - Макилрой и Бёрнс делят лидерство',
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
    title: 'CDC COVID peyvəndinin effektivliyini göstərən hesabatın dərcini gecikdirir',
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
    title: 'CDC Delays Report Showing COVID Vaccine Cut ER Visits by 50%',
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
    title: 'CDC, COVID aşısının etkinliğini gösteren raporun yayınlanmasını geciktirdi',
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
    title: 'CDC задерживает публикацию отчёта об эффективности вакцины против COVID-19',
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
    title: 'Tramp polad, aluminium və mis idxalına tarifləri gücləndirir - 50% vergi tətbiq edildi',
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
    title: 'Trump Strengthens Tariffs on Steel, Aluminum, and Copper -- 50% Duty on Metal Products',
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
    title: 'Trump, çelik, alüminyum ve bakır ithalatına gümrük tarifelerini güçlendirdi',
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
    title: 'Трамп усиливает тарифы на импорт стали, алюминия и меди -- пошлина 50%',
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

  // ========== 2026-04-09 ==========

  // --- Champions League Quarter-Final Results ---
  'chempionlar-liqasi-ceyrek-final-neticeler-9-aprel': {
    title: 'Çempionlar Liqası 1/4 final nəticələri: Atletiko şok, PSJ dominantlıq, Arsenal son dəqiqə, Bavariya qələbə',
    date: '2026-04-09',
    category: 'İdman',
    locale: 'az',
    content: `UEFA Çempionlar Liqasının 1/4 final mərhələsinin ilk oyunları başa çatdı. 7-8 aprel tarixlərində oynanan dörd matçda böyük sürprizlər və unudulmaz anlar yaşandı. Budur bütün nəticələr və təfərrüatlar.

## Barselona 0-2 Atletiko Madrid (8 aprel)

Kamp Nouda Atletiko Madrid gözlənilməz qələbə qazandı və Barselonanın evdə Atletikoya qarşı 25 matçlıq məğlubiyyətsizlik serisini (20 il!) sona çatdırdı. 44-cü dəqiqədə VAR araşdırmasından sonra Cubarsi qırmızı kart aldı (DOGSO) -- bu qərar böyük mübahisə yaratdı. Thierry Henry "bu qırmızı deyildi" dedi. Bir dəqiqə sonra, 45-ci dəqiqədə Alvarez sərbəst zərbədən hesabı açdı. 70-ci dəqiqədə Sorloth baş ilə hesabı 2-0 etdi. Bundan əlavə, Pubillin əl oyunu məqamı da penalti verilməməsi ilə mübahisə doğurdu.

Flik: "Bizdə geri dönmək üçün keyfiyyət var."

## PSJ 2-0 Liverpul (8 aprel)

Paris Sent-Jermen Parc de Pransda Liverpulun üzərində tam dominantlıq qurdu. Doue 11-ci dəqiqədə defleksiya ilə hesabı açdı, Kvaratsxeliya isə 65-ci dəqiqədə möhtəşəm fərdi qol vurdu -- ardıcıl 4-cü CL qolu. Liverpul qapıya heç bir zərbəsi yox idi! PSJ topu 74% saxladı, 17-yə qarşı 3 zərbəsi oldu. PSJ cari Çempionlar Liqası çempionudur.

## Sportinq 0-1 Arsenal (7 aprel)

Arsenal komandasında əvəz oyunçusu Havertz 90+1-ci dəqiqədə Martinellinin asistindən sonra qol vurdu və kritik səfər qələbəsi qazandı.

## Real Madrid 1-2 Bavariya Münhen (7 aprel)

Diaz 41-ci dəqiqədə hesabı açdı, lakin Kane 46-cı dəqiqədə -- ikinci hissənin cəmi 21-ci saniyəsində! -- bərabərlik qolu vurdu. Mbappe 74-cü dəqiqədə Real üçün cavab versə də, Kane-in qolu və asisti Bavariyanın 2-1 qələbəsi ilə nəticələndi. Kane zədədən uğurlu şəkildə qayıtdı.

## Cavab matçları

İkinci oyunlar 14-15 aprel tarixlərində keçiriləcək. Bütün cütlərdə mübarizə açıq qalır.`,
  },
  'en-champions-league-quarter-final-results-april-9': {
    title: 'Champions League QF Results: Atletico Shock Barca, PSG Dominate Liverpool, Arsenal Late Winner, Bayern Stun Madrid',
    date: '2026-04-09',
    category: 'Sports',
    locale: 'en',
    content: `The UEFA Champions League quarter-final first legs are complete. Four matches played on April 7-8 delivered surprises, controversy, and unforgettable moments across Europe.

## Barcelona 0-2 Atletico Madrid (April 8)

Atletico Madrid stunned Barcelona at Camp Nou, ending Barca\'s remarkable 25-match unbeaten home record against Atletico stretching back 20 years. The game turned in the 44th minute when Cubarsi received a red card following a VAR review for denial of a goal-scoring opportunity (DOGSO) -- a decision that sparked fierce debate. Pundit Thierry Henry declared it "not a red card." Just a minute later, Alvarez curled in a free kick to open the scoring at 45\'. Sorloth added a header in the 70th minute to seal a 2-0 away win. A Pubill handball that went unpunished added further controversy.

Flick post-match: "We have the quality to come back."

## PSG 2-0 Liverpool (April 8)

Paris Saint-Germain delivered a masterclass at Parc des Princes, completely dominating Liverpool. Doue opened the scoring in the 11th minute with a deflected effort, while Kvaratskhelia produced a stunning solo goal in the 65th minute -- his 4th consecutive Champions League goal. The stat line was damning for Liverpool: zero shots on target. PSG controlled 74% of possession and outshot Liverpool 17 to 3. The defending CL champions looked every bit the part.

## Sporting 0-1 Arsenal (April 7)

Substitute Kai Havertz scored a dramatic stoppage-time winner in the 90+1st minute, converting a Martinelli assist to give Arsenal a crucial away victory in Lisbon.

## Real Madrid 1-2 Bayern Munich (April 7)

A thriller at the Bernabeu saw Diaz give Real Madrid the lead in the 41st minute. But Harry Kane equalized just 21 seconds into the second half at 46\' -- one of the fastest goals in Champions League knockout history. Kane, returning from injury, also provided the assist for Bayern\'s winner. Mbappe pulled one back for Madrid in the 74th minute, but Bayern held on for a 2-1 away win.

## Second Legs

Return fixtures are scheduled for April 14-15. All four ties remain alive heading into the second legs.`,
  },
  'tr-sampiyonlar-ligi-ceyrek-final-sonuclari-9-nisan': {
    title: 'Şampiyonlar Ligi Çeyrek Final Sonuçları: Atletico Şok, PSG Hâkimiyet, Arsenal Son Dakika, Bayern Galibiyeti',
    date: '2026-04-09',
    category: 'Spor',
    locale: 'tr',
    content: `UEFA Şampiyonlar Ligi çeyrek final ilk maçları tamamlandı. 7-8 Nisan tarihlerinde oynanan dört maçta büyük sürprizler, tartışmalı kararlar ve unutulmaz anlar yaşandı.

## Barcelona 0-2 Atletico Madrid (8 Nisan)

Atletico Madrid, Camp Nou\'da Barcelona\'yı yenerek 20 yıllık ve 25 maçlık yenilmezlik serisine son verdi. 44. dakikada VAR incelemesinin ardından Cubarsi kırmızı kart gördü (DOGSO) -- bu karar büyük tartışma yarattı. Thierry Henry "kırmızı değil" dedi. 45. dakikada Alvarez serbest vuruştan golünü attı. 70. dakikada Sorloth kafa vuruşuyla skoru 2-0 yaptı. Pubill\'in el oyunu da penaltı verilmemesiyle tartışma doğurdu.

Flick: "Geri dönecek kalitemiz var."

## PSG 2-0 Liverpool (8 Nisan)

Paris Saint-Germain, Parc des Princes\'te Liverpool\'a tam hâkimiyet kurdu. Doue 11. dakikada defleksiyonla golünü attı, Kvaratskhelia ise 65. dakikada müthişem bireysel golünü kaydetti -- art arda 4. ŞL golü. Liverpool\'un kaleye tek şutu bile yoktu! PSG topu %74 oranında kontrol etti, 17\'ye karşı 3 isabetli şut kaydetti. PSG mevcut Şampiyonlar Ligi şampiyonu.

## Sporting 0-1 Arsenal (7 Nisan)

Yedek oyuncu Havertz, 90+1. dakikada Martinelli\'nin asistinden gol atarak Arsenal\'e kritik deplasman galibiyeti kazandırdı.

## Real Madrid 1-2 Bayern Münih (7 Nisan)

Diaz 41. dakikada Real Madrid\'i öne geçirdi, ancak Kane ikinci yarının 21. saniyesinde (46\') beraberlik golünü attı -- sakatlıktan dönen Kane asist de yaptı. Mbappe 74. dakikada Real için golünü attı, ancak Bayern 2-1 deplasman galibiyetiyle ayrıldı.

## Rövanş Maçları

İkinci maçlar 14-15 Nisan\'da oynanacak. Tüm eşleşmelerde mücadele açık.`,
  },
  'ru-liga-chempionov-chetvertfinal-rezultaty-9-aprelya': {
    title: 'Результаты 1/4 финала Лиги чемпионов: шок Атлетико, доминирование ПСЖ, Арсенал в концовке, Бавария побеждает',
    date: '2026-04-09',
    category: 'Спорт',
    locale: 'ru',
    content: `Первые матчи четвертьфинала Лиги чемпионов УЕФА завершены. Четыре матча 7-8 апреля принесли сюрпризы, спорные решения и незабываемые моменты.

## Барселона 0-2 Атлетико Мадрид (8 апреля)

Атлетико Мадрид ошеломил Барселону на Камп Ноу, прекратив её 25-матчевую домашнюю беспроигрышную серию против Атлетико, длившуюся 20 лет! На 44-й минуте после проверки VAR Кубарси получил красную карточку (DOGSO) -- это решение вызвало ожесточённые дебаты. Эксперт Тьерри Анри заявил: "Это не красная карточка." На 45-й минуте Альварес забил со штрафного, а на 70-й Сорлот добавил головой -- 2:0. Также вызвал споры момент с игрой рукой Пубиля, за которую не был назначен пенальти.

Флик после матча: "У нас есть качество, чтобы вернуться."

## ПСЖ 2-0 Ливерпуль (8 апреля)

Пари Сен-Жермен полностью доминировал над Ливерпулем на Парк де Пренс. Дуэ открыл счёт на 11-й минуте (отскочивший удар), а Кварацхелия на 65-й минуте забил великолепный сольный гол -- его 4-й подряд гол в ЛЧ. Ливерпуль не нанёс ни одного удара в створ ворот! ПСЖ владел мячом 74%, нанося 17 ударов против 3. ПСЖ -- действующий чемпион Лиги чемпионов.

## Спортинг 0-1 Арсенал (7 апреля)

Вышедший на замену Хаверц забил драматический гол на 90+1-й минуте с передачи Мартинелли, принеся Арсеналу важнейшую гостевую победу.

## Реал Мадрид 1-2 Бавария Мюнхен (7 апреля)

Диас вывел Реал вперёд на 41-й минуте, но Кейн сравнял счёт на 46-й -- всего через 21 секунду после начала второго тайма! Кейн, вернувшийся после травмы, также отдал голевую передачу. Мбаппе сократил разрыв на 74-й минуте, но Бавария удержала победу 2:1.

## Ответные матчи

Вторые матчи состоятся 14-15 апреля. Во всех парах борьба остаётся открытой.`,
  },

  // --- US-Iran Ceasefire ---
  'absh-iran-ateshkes-2-heftelik-pakistan-vasitechiliyi': {
    title: 'ABŞ-İran atəşkəs: 2 həftəlik atəşkəs elan edildi, lakin İran pozulma iddiaları ilə təhdit edir',
    date: '2026-04-09',
    category: 'Dünya',
    locale: 'az',
    content: `Prezident Donald Tramp ABŞ ilə İran arasında 2 həftəlik atəşkəs elan edib. Razılaşma Pakistan baş nazirinin vasitəçiliyi ilə əldə edilib və massiv hərbi zərbələrə 2 saatdan az qalmış imzalanıb.

## Atəşkəsin şərtləri

İran Hörmüz boğazını yenidən açmağa razı olub -- bu, qlobal neft təchizatını təmin edən strateji su yoludur. Lakin atəşkəsin imzalanmasından bir neçə saat sonra İran ABŞ-ni razılaşmanın şərtlərini pozmaqda ittiham edib və atəşkəsdən çəkilməyə hazır olduğunu bildirib.

## Danışıqlar davam edir

Vitse-prezident JD Vens şənbə günü İslamabadda danışıqlara rəhbərlik edəcək. Pakistan vasitəçilik rolunu davam etdirir. Hərtərəfli geopolitik gərginlik regionda yüksək səviyyədə qalır və ekspertlər atəşkəsin dayanıqlılığına sual işarəsi qoyurlar.

## Beynəlxalq reaksiyalar

Avropa Birliyi və BMT atəşkəsi alqışlayıb, lakin hamı bunun uzunmüddətli sabitliyə aparıb-aparmayacağını görmək üçün gözləyir. Neft bazarları ilkin sevincdən sonra yenidən dalğalanma ilə üzləşdi.`,
  },
  'en-us-iran-ceasefire-2-week-pakistan-brokered': {
    title: 'US-Iran Ceasefire: 2-Week Deal Announced but Iran Threatens Pullout Over Violations',
    date: '2026-04-09',
    category: 'World',
    locale: 'en',
    content: `President Donald Trump announced a 2-week ceasefire with Iran, brokered by Pakistan\'s Prime Minister, less than 2 hours before massive military strikes were planned to commence.

## Terms of the Agreement

Iran agreed to reopen the Strait of Hormuz -- the strategic waterway critical to global oil supply. The deal represents a dramatic de-escalation from weeks of mounting tensions, military buildups, and retaliatory strikes across the Middle East.

## Iran\'s Accusations

However, within hours of the announcement, Iran accused the United States of violating the terms of the ceasefire agreement and threatened to withdraw entirely. Tehran has not specified the exact nature of the alleged violations, but the accusation has already rattled global markets.

## Upcoming Negotiations

Vice President JD Vance will lead negotiations in Islamabad on Saturday, with Pakistan continuing its mediation role. The fragile truce underscores how quickly any progress can unravel in the volatile geopolitical landscape of the Middle East. The international community watches closely.`,
  },
  'tr-abd-iran-ateskes-2-haftalik-pakistan-aracilik': {
    title: 'ABD-İran Ateşkes: 2 Haftalık Anlaşma, İran İhlal İddialarıyla Çekilme Tehdidi',
    date: '2026-04-09',
    category: 'Dünya',
    locale: 'tr',
    content: `Başkan Donald Trump, ABD ile İran arasında 2 haftalık ateşkes ilan etti. Anlaşma Pakistan Başbakanı\'nın aracılığıyla sağlandı ve büyük askeri saldırılara 2 saatten az kala imzalandı.

## Anlaşmanın Şartları

İran, küresel petrol arzı için kritik öneme sahip stratejik su yolu olan Hürmüz Boğazı\'nı yeniden açmayı kabul etti. Anlaşma, Orta Doğu\'daki haftalarca süren artan gerilim, askeri yığınaklar ve misilleme saldırıları sonrası dramatik bir gerileme oldu.

## İran\'ın İddiaları

Ancak duyurudan yalnızca saatler sonra İran, ABD\'yi ateşkes şartlarını ihlal etmekle suçladı ve tamamen çekilmekle tehdit etti. Tahran ihlallerin tam içeriğini belirtmedi, ancak suçlamalar küresel piyasaları zaten sarstı.

## Yaklaşan Müzakereler

Başkan Yardımcısı JD Vance cumartesi günü İslamabad\'da müzakerelere liderlik edecek. Pakistan aracılık rolünü sürdürüyor. Kırılgan barış, Orta Doğu\'daki oynak jeopolitik ortamda herhangi bir ilerlemenin ne kadar çabuk çürütülebileceğinin altını çiziyor.`,
  },
  'ru-ssha-iran-peremiriye-2-nedeli-posrednichestvo-pakistana': {
    title: 'Перемирие США-Иран: 2-недельное соглашение, Иран угрожает выходом из-за нарушений',
    date: '2026-04-09',
    category: 'Мир',
    locale: 'ru',
    content: `Президент Дональд Трамп объявил о 2-недельном перемирии с Ираном, достигнутом при посредничестве премьер-министра Пакистана. Соглашение было подписано менее чем за 2 часа до начала массивных военных ударов.

## Условия соглашения

Иран согласился вновь открыть Ормузский пролив -- стратегический водный путь, критически важный для мировых поставок нефти. Сделка представляет собой драматическую деэскалацию после недель растущей напряжённости, военных наращиваний и ответных ударов на Ближнем Востоке.

## Обвинения Ирана

Однако через несколько часов после объявления Иран обвинил США в нарушении условий перемирия и пригрозил полным выходом. Тегеран не уточнил точную суть предполагаемых нарушений, но обвинения уже встряхнули мировые рынки.

## Предстоящие переговоры

Вице-президент Джей Ди Вэнс возглавит переговоры в Исламабаде в субботу. Пакистан продолжает посредническую роль. Хрупкий мир подчёркивает, насколько быстро любой прогресс может сорваться в нестабильном геополитическом ландшафте.`,
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
