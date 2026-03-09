export interface NewsArticle {
  title: string
  date: string
  category: string
  content: string
}

export const newsArticles: Record<string, NewsArticle> = {
  'texnologiya-suni-zekanin-yeni-dovru': {
    title: 'Süni zəkanın yeni dövrü: 2026-da nələr dəyişir?',
    date: '2026-02-28',
    category: 'Texnologiya',
    content: `Süni zəka texnologiyaları 2026-cı ildə yeni mərhələyə qədəm qoyub. Böyük dil modelləri artıq sadəcə mətn yaratmaqla kifayətlənmir — kod yazır, təhlil aparır, qərarlar qəbul edir. Bu il süni zəka sahəsində baş verən dəyişikliklər o qədər sürətlidir ki, cəmi altı ay əvvəlki proqnozlar belə artıq köhnəlmiş hesab olunur. Bəs 2026-cı il süni zəka dünyasında nələri dəyişdi və bu dəyişikliklər bizim gündəlik həyatımıza necə təsir edir?

## Əsas tendensiyalar

- **Multimodal modellər** — şəkil, video və səsi eyni anda emal edən sistemlər geniş yayılıb
- **Agent əsaslı AI** — süni zəka artıq müstəqil tapşırıqlar yerinə yetirir
- **Yerli modellər** — kiçik, sürətli modellər fərdi cihazlarda işləyir
- **AI kodlaşdırma köməkçiləri** — proqramçıların əksəriyyəti artıq süni zəka ilə birlikdə kod yazır
- **Real vaxt tərcümə** — dil maneələri demək olar ki, aradan qaldırılıb

Bu tendensiyaların hər biri ayrılıqda böyük əhəmiyyət daşıyır, lakin birlikdə onlar texnologiya dünyasında əsl inqilab yaradıb. Multimodal modellər artıq sadəcə mətn ilə işləmir — onlar şəkilləri tanıyır, videoları təhlil edir, səsli əmrləri başa düşür və bütün bu məlumatları eyni anda emal edə bilir. Məsələn, bir həkim rentgen şəklini yükləyib süni zəkadan təhlil istəyə bilər, bir mühəndis texniki çertyojun üzərində AI ilə müzakirə apara bilər.

## Agent əsaslı süni zəka — yeni era

2026-cı ilin ən böyük yeniliklərindən biri agent əsaslı süni zəka sistemlərinin geniş yayılmasıdır. Əvvəlki illərdə süni zəka yalnız verilən suallara cavab verirdi — indi isə o, mürəkkəb tapşırıqları müstəqil şəkildə yerinə yetirə bilir. Bu o deməkdir ki, siz süni zəkaya "bu layihənin marketinq planını hazırla" deyə bilərsiniz və o, bazar araşdırması aparar, rəqibləri təhlil edər, büdcə planı hazırlayar və nəticəni sizə təqdim edər.

Agentlər artıq bir çox sahələrdə istifadə olunur:

- **Müştəri xidmətləri** — AI agentləri müştəri şikayətlərini qəbul edir, problemi müəyyən edir və həll yolu təklif edir. Mürəkkəb hallarda isə müvafiq mütəxəssisə yönləndirir.
- **Maliyyə təhlili** — bank və sığorta şirkətləri risk qiymətləndirilməsi üçün AI agentlərindən istifadə edir. Bu agentlər minlərlə sənədi saniyələr ərzində təhlil edə bilir.
- **Proqram təminatı hazırlanması** — AI agentləri artıq sadəcə kod yazmır, həm də testlər yazır, xətaları tapır və performansı optimallaşdırır.
- **Tibb sahəsi** — diaqnostika prosesində həkimlərə kömək edən AI sistemləri xəstəliklərin erkən aşkarlanmasında böyük irəliləyiş təmin edib.

## Yerli modellər və məxfilik

Bulud əsaslı süni zəka xidmətləri güclü olsa da, məxfilik narahatlıqları həmişə mövcud olub. 2026-cı ildə bu problemin həlli kimi yerli modellər populyarlaşıb. Bu modellər birbaşa istifadəçinin cihazında — smartfon, noutbuk və ya planşetdə işləyir. Məlumatlar cihazdan kənara çıxmır, bu da məxfiliyi tam təmin edir.

Apple, Google və Samsung kimi şirkətlər öz cihazlarına güclü yerli AI modelləri inteqrasiya edib. Bu modellər fotoşəkilləri təşkil etmək, e-poçtları xülasə etmək, təqvim idarəetməsi və şəxsi köməkçi funksiyalarını internet bağlantısı olmadan belə yerinə yetirə bilir.

## Azərbaycanda vəziyyət

Yerli şirkətlər süni zəkanı müştəri xidmətlərində, maliyyə təhlilində və təhsildə tətbiq etməyə başlayıb. Dövlət qurumları da rəqəmsallaşma prosesində AI-dan istifadəni artırır. Xüsusilə ASAN xidmət mərkəzlərində süni zəka əsaslı sənəd emalı sistemi sınaq mərhələsindədir.

Azərbaycanda bir neçə vacib inkişaf diqqəti cəlb edir:

- **Azərbaycan dilində AI modelləri** — yerli startaplar Azərbaycan dilini daha yaxşı başa düşən dil modelləri üzərində işləyir. Bu modellər xüsusilə müştəri xidmətləri və tərcümə sahəsində böyük potensiala malikdir.
- **Dövlət sektorunda AI** — Rəqəmsal İnkişaf və Nəqliyyat Nazirliyi bir neçə AI layihəsini həyata keçirib. Elektron hökumət xidmətlərində süni zəka əsaslı avtomatlaşdırma prosesi davam edir.
- **Startap ekosistemi** — Bakıda süni zəka üzrə ixtisaslaşmış startapların sayı 2025-ci illə müqayisədə 40 faiz artıb. Bu startaplar əsasən kənd təsərrüfatı, neft-qaz sənayesi və maliyyə sahələrində həllər təklif edir.
- **Təhsil proqramları** — Bakı Ali Neft Məktəbi, ADA Universiteti və BANM süni zəka üzrə yeni magistratura proqramları açıb. Bu proqramlarda tələbə sayı hər il iki dəfə artır.

## Etik məsələlər və tənzimləmə

Süni zəkanın sürətli inkişafı etik sualları da gündəmə gətirib. Avropa İttifaqının AI Act qanunu 2026-cı ildə tam qüvvəyə minib və bu, dünya üzrə AI tənzimləməsi üçün nümunə olub. Azərbaycan da bu sahədə qanunvericilik bazasını hazırlamağa başlayıb.

Əsas etik narahatlıqlar arasında iş yerlərinin itirilməsi, süni zəka ilə yaradılmış saxta məzmunlar (deepfake), məlumat məxfiliyi və alqoritmik qərəzlər yer alır. Mütəxəssislər hesab edir ki, bu problemlərin həlli üçün texnoloji həllərlə yanaşı, güclü hüquqi çərçivə də lazımdır.

## Gələcəyə baxış

Mütəxəssislər proqnozlaşdırır ki, 2027-ci ilə qədər Azərbaycanda hər 3 şirkətdən biri süni zəka həllərindən istifadə edəcək. Qlobal səviyyədə isə süni zəka bazarının həcminin 2027-ci ildə 500 milyard dollara çatacağı gözlənilir.

## Süni zəka və əmək bazarı

2026-cı ildə ən çox müzakirə olunan mövzulardan biri süni zəkanın əmək bazarına təsiridir. Bir tərəfdən, bəzi peşələr avtomatlaşdırma səbəbindən dəyişir və ya aradan qalxır. Digər tərəfdən, tamamilə yeni peşələr və iş yerləri yaranır. Dünya İqtisadi Forumunun hesabatına görə, 2026-cı ildə süni zəka ilə bağlı yeni yaranmış iş yerlərinin sayı avtomatlaşdırma səbəbindən itirilən iş yerlərinin sayını üstələyib.

Azərbaycanda da bu tendensiya özünü göstərir. AI mühəndisi, məlumat analitiki, süni zəka etikası mütəxəssisi, prompt mühəndisi kimi yeni peşələrə tələbat sürətlə artır. Əmək və Əhalinin Sosial Müdafiəsi Nazirliyinin məlumatına görə, texnologiya sektorunda iş yerləri 2025-ci illə müqayisədə 30 faiz artıb.

## Gündəlik həyatda süni zəka

Süni zəkanın təsiri yalnız iş dünyası ilə məhdudlaşmır. Gündəlik həyatda da AI-ın izləri hər yerdədir. Smartfonlardakı şəxsi köməkçilər daha ağıllı olub, evdəki ağıllı cihazlar enerji istehlakını optimallaşdırır, avtomobillər yarı-avtomatik sürüş rejimində daha təhlükəsiz hərəkət edir. Tibb sahəsində isə AI həkimlərə diaqnoz qoymaqda kömək edir, dərman hazırlanması prosesini sürətləndirir və fərdi müalicə planları hazırlayır.

Süni zəkanın gələcəyi həm böyük imkanlar, həm də ciddi çağırışlar vəd edir. Bu texnologiyanı düzgün istifadə edən fərdlər, şirkətlər və dövlətlər rəqabət üstünlüyü əldə edəcək. Əsas odur ki, texnologiyanın inkişafı ilə yanaşı, onun etik və məsuliyyətli istifadəsi də təmin olunsun. Gələcək onlarındır ki, süni zəkanı qorxu mənbəyi kimi deyil, inkişaf aləti kimi qəbul edib ondan səmərəli istifadə edə bilirlər.`,
  },
  'iqtisadiyyat-manat-mohkemlenmesi': {
    title: 'Manatın möhkəmlənməsi: iqtisadiyyata təsiri necədir?',
    date: '2026-02-27',
    category: 'İqtisadiyyat',
    content: `Son aylarda Azərbaycan manatının xarici valyutalara qarşı mövqeyi möhkəmlənib. Bu tendensiya həm müsbət, həm də mənfi nəticələr doğurur. İqtisadçılar bu vəziyyəti müxtəlif rakurslardan təhlil edir və gələcək üçün fərqli ssenarilər irəli sürür. Manatın möhkəmlənməsinin əsas səbəbləri, nəticələri və iqtisadiyyatın müxtəlif sektorlarına təsiri barədə ətraflı təhlil təqdim edirik.

## Möhkəmlənmənin əsas səbəbləri

Manatın möhkəmlənməsinin arxasında bir neçə əsas amil dayanır:

- **Neft qiymətlərinin artması** — dünya bazarında neftin qiymətinin barel üçün 85-90 dollar arasında sabitləşməsi Azərbaycanın valyuta ehtiyatlarını gücləndirib. Neft Fonduna daxil olan gəlirlər 2025-ci illə müqayisədə 15 faiz artıb.
- **Qeyri-neft ixracının artması** — kənd təsərrüfatı, turizm və IT sektorlarından əldə edilən valyuta gəlirləri son iki ildə əhəmiyyətli dərəcədə yüksəlib. Xüsusilə kənd təsərrüfatı məhsullarının ixracında 22 faizlik artım qeydə alınıb.
- **Birbaşa xarici investisiyalar** — ölkəyə daxil olan xarici investisiyaların həcmi artıb. Yaşıl enerji layihələri, texnologiya parkları və logistika infrastrukturu sahəsində böyük investisiya layihələri həyata keçirilir.
- **Mərkəzi Bankın siyasəti** — Mərkəzi Bank faiz dərəcələrini və valyuta müdaxilələrini bacarıqlı şəkildə idarə edərək manatın sabitliyini təmin edib.

## Müsbət təsirlər

- **İdxal ucuzlaşır** — xaricdən gətirilən malların qiyməti aşağı düşür
- **İnflyasiya azalır** — ərzaq məhsullarının qiymətləri stabilləşir
- **İstehlakçı güvəni artır** — vətəndaşlar daha çox xərcləyir
- **Xarici borc yükü azalır** — dollar ilə olan borc öhdəlikləri manat ekvivalentində azalır
- **Alıcılıq qabiliyyəti artır** — vətəndaşların real gəlirləri yüksəlir

İdxalın ucuzlaşması xüsusilə istehlakçılar üçün əhəmiyyətli təsir göstərir. Elektronika, avtomobil, tibb avadanlıqları və ərzaq məhsullarının qiymətlərində azalma müşahidə olunur. Statistika Komitəsinin məlumatına görə, 2026-cı ilin yanvar-fevral aylarında istehlak qiymətləri indeksi 2025-ci ilin eyni dövrü ilə müqayisədə 2,3 faiz aşağı düşüb.

## Mənfi təsirlər

- **İxrac çətinləşir** — yerli məhsullar xarici bazarda bahalı olur
- **Turizm gəlirləri azala bilər** — ölkə turistlər üçün nisbətən bahalı olur
- **Yerli istehsalçılar sıxılır** — idxal malları ilə rəqabət güclənir
- **Xaricdən pul köçürmələri azalır** — diasporadan göndərilən pulların manat dəyəri düşür

İxracatçılar üçün vəziyyət xüsusilə çətindir. Azərbaycan pomidorunun, fındığının və digər kənd təsərrüfatı məhsullarının Rusiya və Avropa bazarlarında rəqabətqabiliyyəti azalıb. İxracatçılar Birliyi açıqlama yayaraq hökumətdən ixracın stimullaşdırılması üçün əlavə tədbirlər görməsini xahiş edib.

## Sektorlar üzrə təsir

**Kənd təsərrüfatı:** Gübrə və texnika idxalının ucuzlaşması istehsal xərclərini azaldıb, lakin hazır məhsulların ixracı çətinləşib. Fermerlər qarışıq vəziyyətlə üzləşir — xərclər azalıb, amma gəlirlər də azala bilər.

**Tikinti sektoru:** İdxal olunan tikinti materiallarının — sement, polad, şüşə — qiymətinin aşağı düşməsi tikinti layihələrinin dəyərini azaldıb. Bu, daşınmaz əmlak bazarında qiymətlərin stabilləşməsinə kömək edir.

**Turizm:** Güclü manat ölkəni xarici turistlər üçün nisbətən baha edir. Lakin digər tərəfdən, azərbaycanlı turistlərin xarici ölkələrə səyahəti ucuzlaşıb. Turizm Bürosu xarici turistləri cəlb etmək üçün əlavə marketinq kampaniyaları planlaşdırır.

**Texnologiya sektoru:** IT şirkətləri üçün güclü manat əsasən müsbət təsir göstərir. Xarici texnologiya və lisenziyaların alınması ucuzlaşıb, lakin xarici müştərilərə göstərilən xidmətlərin rəqabətqabiliyyəti azalıb.

## Mərkəzi Bankın mövqeyi

Mərkəzi Bank açıqlamasında bildirib ki, monetar siyasət dəyişikliklər üçün hazırdır və bazar sabitliyi prioritet olaraq qalır. Bank rəhbərliyi son mətbuat konfransında aşağıdakı məqamları vurğulayıb:

- Valyuta ehtiyatları kifayət qədər güclüdür və istənilən bazar dəyişikliyinə cavab vermək imkanı var
- Faiz dərəcəsi siyasəti iqtisadi göstəricilərə uyğun olaraq tənzimlənəcək
- İnflyasiya hədəfi 4 faiz səviyyəsində saxlanılır
- Maliyyə sabitliyi üçün makroprudensial tədbirlər davam etdiriləcək

## Ekspertlərin proqnozları

İqtisadçılar manatın qısa və orta müddətli perspektivləri barədə fərqli fikirlər irəli sürür. Bəzi ekspertlər hesab edir ki, neft qiymətlərinin yüksək qalması halında manat 2026-cı ilin sonuna qədər möhkəm mövqeyini qoruyacaq. Digərləri isə dünya iqtisadiyyatındakı qeyri-müəyyənliklərin manatın möhkəmlənməsini məhdudlaşdıra biləcəyini düşünür.

Beynəlxalq Valyuta Fondunun (BVF) son hesabatında Azərbaycan iqtisadiyyatının 2026-cı ildə 3,5 faiz böyüyəcəyi proqnozlaşdırılıb. Bu proqnoz əvvəlki qiymətləndirmədən 0,3 faiz bənd yüksəkdir ki, bu da iqtisadiyyata olan inamın artdığını göstərir.

## Vətəndaşlar üçün praktiki tövsiyələr

Manatın möhkəmlənməsi vətəndaşların maliyyə qərarlarına da təsir edir. Maliyyə məsləhətçiləri aşağıdakıları tövsiyə edir:

- Əmanətləri diversifikasiya edin — bütün yumurtaları bir səbətə qoymayın
- İdxal olunan böyük alışları (elektronika, avtomobil) indi etmək daha sərfəli ola bilər
- Xarici valyutada kredit götürməyi düşünənlər üçün əlverişli vaxtdır
- Uzunmüddətli investisiya planlarını yenidən nəzərdən keçirin

## Qonşu ölkələrlə müqayisə

Manatın möhkəmlənməsini regional kontekstdə qiymətləndirmək üçün qonşu ölkələrin valyutaları ilə müqayisə etmək faydalıdır. Gürcüstanın larisi və Türkiyənin lirəsi eyni dövrdə xarici valyutalara qarşı dəyər itirib. Bu, Azərbaycanın neft gəlirləri ilə dəstəklənən iqtisadi modelinin regional rəqiblərinə nisbətən daha dayanıqlı olduğunu göstərir.

Lakin bu müqayisə tam mənzərəni əks etdirmir. Türkiyə və Gürcüstan ixrac yönümlü iqtisadiyyata malik olduğundan, zəif valyuta onların ixracatçıları üçün müəyyən üstünlük yaradır. Azərbaycan isə güclü manatla ixrac rəqabətqabiliyyətini qorumaq üçün məhsulun keyfiyyətini və əlavə dəyərini artırmağa məcburdur.

## Rəqəmsal manat perspektivi

Manatın möhkəmlənməsi fonunda Mərkəzi Bankın rəqəmsal manat layihəsi də diqqəti cəlb edir. 2026-cı ildə sınaq mərhələsinə başlanması gözlənilən rəqəmsal manat, ödəniş sistemlərini daha sürətli və ucuz edəcək. Bu, xüsusilə beynəlxalq ödənişlərdə və kiçik biznes əməliyyatlarında böyük rahatlıq yaradacaq. Rəqəmsal manatın tam tətbiqi ölkənin maliyyə infrastrukturunu əsaslı şəkildə modernləşdirəcək.

## Nəticə

Ümumilikdə, manatın möhkəmlənməsi Azərbaycan iqtisadiyyatı üçün müsbət siqnaldır, lakin bu tendesiyanın davamlı olması üçün iqtisadiyyatın diversifikasiyası və struktur islahatların davam etdirilməsi vacibdir. Hökumətin qarşısında duran əsas vəzifə güclü manatın müsbət tərəflərindən maksimum faydalanmaq, eyni zamanda mənfi təsirlərini minimuma endirməkdir. Bunun üçün ixracın stimullaşdırılması, yerli istehsalın dəstəklənməsi və iqtisadi diversifikasiyanın sürətləndirilməsi prioritet olaraq qalmalıdır.`,
  },
  'idman-premyer-liqa': {
    title: 'Premyer Liqa mövsümü: hansı komanda favoritdir?',
    date: '2026-02-26',
    category: 'İdman',
    content: `Azərbaycan Premyer Liqasında mövsümün ikinci yarısı başlayıb. Turnir cədvəlində maraqlı rəqabət davam edir və azarkeşlər hər həftə yeni sürprizlərlə üzləşir. Bu mövsüm Azərbaycan futbolunda son illərin ən maraqlı çempionluq yarışına şahidlik edirik. Gəlin mövsümün əsas hadisələrini, statistikalarını və gözləntiləri ətraflı nəzərdən keçirək.

## Cədvəlin başında

Liderlər arasında fərq minimaldır. İlk üç komanda arasında cəmi 4 xal fərq var. Bu, mövsümün sonuna qədər çempionluq mübarizəsinin davam edəcəyini göstərir. Hər tur cədvəldə ciddi dəyişikliklərə səbəb olur və azarkeşlər son ana qədər intriqa yaşayır.

Cədvəlin üst hissəsində olan komandalar mövsümün əvvəlindən bəri ardıcıl nəticələr göstərir. Xüsusilə lider komandanın son 10 oyunda yalnız bir məğlubiyyəti var ki, bu da onun çempionluq iddiasını gücləndirir. Lakin ikinci və üçüncü yerdəki komandalar da arxadan güclü təzyiq göstərir.

## Diqqətə çarpan statistikalar

- **Ən çox qol vuran komanda** — mövsüm boyu 38 qol
- **Ən az qol buraxan müdafiə** — cəmi 12 qol buraxıb
- **Ən yaxşı bombardir** — 14 qolla lider
- **Ən çox penalti qazanan komanda** — 8 penalti
- **Ən yaxşı ev sahibi** — evdə 9 qələbə, 1 heç-heçə
- **Ən yaxşı səfər nəticəsi** — səfərdə 6 qələbə
- **Ən çox sarı vərəqə alan komanda** — 47 sarı vərəqə

Bu mövsümün statistik göstəriciləri onu əvvəlki mövsümlərdən fərqləndirən bir neçə maraqlı tendensiya ortaya qoyur. Birincisi, qol sayı əvvəlki mövsümlə müqayisədə 18 faiz artıb ki, bu da oyunların daha hücum xarakterli olduğunu göstərir. İkincisi, ev sahibi komandaların qələbə faizi azalıb — bu, liqanın rəqabət səviyyəsinin yüksəldiyinə işarədir.

## Transfer pəncərəsinin təsiri

Qış transfer pəncərəsi bir neçə diqqətəlayiq transferə şahid oldu. Bir neçə komanda heyətini gücləndirib və bu, cədvəl mübarizəsinə birbaşa təsir göstərir.

- Lider komanda Gürcüstandan təcrübəli hücumçu transfer edib ki, o, artıq iki oyunda üç qol vurub.
- İkinci yerdəki komanda Türkiyədən gənc yarımmüdafiəçi alıb. Bu futbolçu öz texnikası və sürəti ilə azarkeşlərin sevimlisinə çevrilib.
- Cədvəlin aşağı hissəsindəki komandalar da güclənmə üçün əhəmiyyətli addımlar atıb. Xüsusilə bir komanda üç yeni futbolçu transfer edərək qalmaq mübarizəsində şanslarını artırıb.

Transfer siyasəti baxımından bu mövsüm klublarin daha ağıllı və strateji yanaşma sərgilədiyi müşahidə olunur. Bahalı transferlər əvəzinə, perspektivli gənc futbolçuların və tecrübəli yerli oyunçuların transferinə üstünlük verilir.

## Mövsümün sürprizləri

Bu mövsüm bir neçə gənc futbolçu özünü göstərib. Yerli akademiyalardan yetişən oyunçuların sayı artıb ki, bu da Azərbaycan futbolunun gələcəyi üçün ümidvericidir.

- 19 yaşlı yarımmüdafiəçi mövsümün başlanğıcından etibarən əsas heyətdə yer alıb və artıq 5 qol, 7 məhsuldar ötürmə ilə liqanın ən yaxşı gənc oyunçusu mükafatına iddiaçıdır.
- 20 yaşlı qapıçı bir neçə kritik oyunda əla performans göstərərək komandasının xal itirməsinin qarşısını alıb. Milli komanda baş məşqçisi onu yaxından izlədiyini bildirib.
- Aşağı liqadan yüksələn komanda gözləntilərin əksinə mövsümün ilk yarısını cədvəlin yuxarı yarısında başa vurub. Bu, klubun gənclərə əsaslanan strategiyasının uğurlu olduğunu sübut edir.

## Hakim qərarları və VAR

Bu mövsüm VAR (Video Köməkçi Hakim) sisteminin tətbiqi ilə bağlı müzakirələr davam edir. Sistem mövsümün əvvəlindən bəri 23 qərarı dəyişib. Bəzi klublar VAR-ın qərarların ədalətliliyini artırdığını düşünür, digərləri isə oyunun axıcılığını pozduğunu iddia edir.

AFFA (Azərbaycan Futbol Federasiyaları Assosiasiyası) açıqlama yayaraq VAR sisteminin təkmilləşdirilməsi üzərində işlədiyini bildirib. Gələn mövsümdən etibarən yeni texnoloji yeniliklərin tətbiq ediləcəyi gözlənilir.

## Milli komandaya təsir

Premyer Liqadakı güclü rəqabət milli komandanın da xeyrinədir. Baş məşqçi son müsahibəsində yerli liqanın səviyyəsinin yüksəldiyini və bunun milli komanda üçün daha çox seçim imkanı yaratdığını vurğulayıb. UEFA Millətlər Liqasındakı növbəti oyunlar üçün namizədlər siyahısında Premyer Liqadan 18 futbolçunun yer alması gözlənilir.

## Mövsümün sonuna baxış

Mütəxəssislər hesab edir ki, mövsümün sonuna qədər çempionluq mübarizəsi davam edəcək. Son 10 turda hər xalın böyük əhəmiyyəti olacaq. Cədvəlin aşağı hissəsində isə qalmaq mübarizəsi heç də az dramatik deyil — son 4 komanda arasında cəmi 5 xal fərq var.

Futbol ekspertləri mövsümün sonuna yaxın əsəb gərginliyinin artacağını, bunun da oyunların keyfiyyətinə təsir edə biləcəyini düşünür. Lakin əsas gözlənti budur ki, bu mövsüm Azərbaycan futbolunun tarixində ən yaddaqalan mövsümlərdən biri olacaq. Azarkeşlər stadionlara axışır və orta seyirçi sayı əvvəlki mövsümlə müqayisədə 25 faiz artıb ki, bu da Azərbaycan futbolunun populyarlığının yüksəldiyini göstərir.

## Stadion infrastrukturu və azarkeş mədəniyyəti

Bu mövsüm stadion infrastrukturunun yaxşılaşdırılması istiqamətində də mühüm addımlar atılıb. Bir neçə şəhərdə stadionda yeniləmə işləri aparılıb, oturacaqlar dəyişdirilib, işıqlandırma sistemi müasirləşdirilib. Bu yatırımlar azarkeşlərin stadion təcrübəsini əhəmiyyətli dərəcədə yaxşılaşdırıb.

Azarkeş mədəniyyəti baxımından da müsbət dəyişikliklər müşahidə olunur. Ultras qruplarının təşkilatlanması, koreqrafiya nümayişləri və stadionlarda yaranan atmosfer Azərbaycan futbolunun cazibədarlığını artırır. Sosial mediada liqanın izləyici sayı 2025-ci illə müqayisədə iki dəfə artıb ki, bu da gənc nəslin futbola marağının yüksəldiyini göstərir.

## Məşqçilər və taktiki yeniliklər

Bu mövsüm məşqçilik baxımından da maraqlı tendensiyalar müşahidə olunur. Bir neçə komanda xarici məşqçilərlə əməkdaşlığa başlayıb və bu, taktiki yanaşmalarda yeniliklər gətirib. Yüksək pressinq, mülkiyyət əsaslı oyun və sürətli əks-hücumlar bu mövsümün əsas taktiki xüsusiyyətləridir.

Yerli məşqçilər də peşəkar inkişaf baxımından irəliləyib. AFFA-nın UEFA ilə birgə təşkil etdiyi məşqçilik kurslarında bu il rekord sayda iştirakçı qeydə alınıb. Bu, gələcəkdə Azərbaycan futbolunda məşqçi keyfiyyətinin daha da yüksələcəyinə işarədir.

## Avropa kubokları perspektivi

Premyer Liqanın güclü rəqabəti Azərbaycan klublarının Avropa kuboklarındakı çıxışına da müsbət təsir göstərməlidir. Gələn mövsüm UEFA Çempionlar Liqası və Konfrans Liqasında iştirak edəcək Azərbaycan klubları daha hazırlıqlı olacaq. AFFA prezidenti son açıqlamasında Azərbaycan klublarının Avropa səhnəsində daha uğurlu çıxış etməsi üçün dəstək proqramı hazırlandığını bildirib.`,
  },
  'tehsil-yeni-islahatlar': {
    title: 'Yeni təhsil islahatları: nələr dəyişəcək?',
    date: '2026-02-25',
    category: 'Təhsil',
    content: `Təhsil Nazirliyi 2026-cı il üçün yeni islahat paketini açıqlayıb. Dəyişikliklər həm orta, həm də ali təhsil səviyyəsini əhatə edir. Bu islahatlar son 10 ilin ən geniş miqyaslı təhsil dəyişiklikləri hesab olunur və ölkənin təhsil sistemini müasir standartlara uyğunlaşdırmağı hədəfləyir. Nazirliyə görə, islahatların əsas məqsədi Azərbaycanın insan kapitalını gücləndirib ölkəni bilik iqtisadiyyatına keçid üçün hazırlamaqdır.

## Əsas dəyişikliklər

- **Rəqəmsal təhsil platforması** — bütün məktəblər vahid onlayn sistemə qoşulacaq
- **STEM fənlərinə diqqət** — riyaziyyat və texnologiya fənləri üzrə yeni kurikulumlar
- **Müəllim hazırlığı** — pedaqoji kadrların ixtisasartırma proqramları genişlənir
- **Xarici dil tədrisi** — ikinci xarici dil məktəblərdə məcburi olacaq
- **Peşə təhsili** — yeni peşə-texniki məktəblər açılacaq
- **Dərslik islahatı** — bütün dərsliklər yenidən hazırlanacaq

## Rəqəmsal təhsil platforması

Yeni rəqəmsal təhsil platforması islahatların əsas sütunlarından biridir. Bu platforma bütün ölkə üzrə məktəbləri, müəllimləri, şagirdləri və valideynləri vahid rəqəmsal ekosistemə birləşdirəcək. Platformanın əsas xüsusiyyətləri:

- **Onlayn dərs materialları** — hər bir fənn üzrə video dərslər, interaktiv tapşırıqlar və əlavə mənbələr mövcud olacaq. Şagirdlər dərsləri istənilən vaxt, istənilən yerdən izləyə biləcək.
- **Qiymətləndirmə sistemi** — müəllimlər şagirdlərin performansını real vaxt rejimində izləyə biləcək. Valideynlər də övladlarının dərs nəticələrini platforma vasitəsilə görə biləcək.
- **Süni zəka əsaslı fərdi öyrənmə** — platforma hər şagirdin güclü və zəif tərəflərini təhlil edərək fərdi öyrənmə planı hazırlayacaq. Bu, hər şagirdin öz sürətinə uyğun irəliləməsinə imkan yaradacaq.
- **Əlçatanlıq** — platforma həm kompüter, həm planşet, həm də smartfon üzərindən əlçatan olacaq. İnternet infrastrukturu zəif olan bölgələr üçün oflayn rejim də nəzərdə tutulub.

Platformanın ilk mərhələsi 2026-cı ilin sentyabr ayından Bakı və Sumqayıt məktəblərində sınaqdan keçiriləcək. 2027-ci ilin sonuna qədər bütün ölkə üzrə tətbiq edilməsi planlaşdırılır.

## STEM təhsilinin gücləndirilməsi

STEM (Elm, Texnologiya, Mühəndislik, Riyaziyyat) fənləri üzrə yeni kurikulumlar hazırlanıb. Bu kurikulumlar beynəlxalq standartlara uyğundur və praktiki tətbiqə əsaslanır. Əsas yeniliklər:

- Riyaziyyat dərslərində real həyat problemlərinin həllinə daha çox yer ayrılacaq
- Fizika və kimya dərslərində laboratoriya işlərinin payı artırılacaq
- İnformatika fənni 3-cü sinifdən başlayacaq (əvvəl 5-ci sinifdən idi)
- Proqramlaşdırma əsasları 5-ci sinifdən tədris olunacaq
- Robotika dərnəkləri bütün məktəblərdə açılacaq

Nazirlik bu sahədə 200-dən çox yeni müəllim hazırlayıb və onlar 2026-2027-ci tədris ilindən etibarən məktəblərə yerləşdiriləcək. Əlavə olaraq, texnologiya şirkətləri ilə əməkdaşlıq çərçivəsində məktəblərə müasir avadanlıq təmin ediləcək.

## Müəllim hazırlığı və ixtisasartırma

İslahatların ən vacib komponentlərindən biri müəllimlərin peşəkar inkişafıdır. Nazirlik aşağıdakı proqramları elan edib:

- **Məcburi ixtisasartırma** — hər müəllim ildə minimum 72 saat ixtisasartırma kursu keçməlidir. Bu kurslar həm onlayn, həm də əyani formatda təklif olunacaq.
- **Beynəlxalq mübadiləprogramı** — hər il 500 müəllim Avropa, Cənubi Koreya və Sinqapur kimi qabaqcıl təhsil sistemlərinə malik ölkələrə təcrübə mübadiləsinə göndəriləcək.
- **Rəqəmsal bacarıqlar** — bütün müəllimlər rəqəmsal texnologiyalardan istifadə üzrə sertifikat proqramı keçəcək.
- **Maaş artımı** — müəllim maaşlarında 20 faiz artım nəzərdə tutulub. Bu artım ixtisasartırma proqramlarını uğurla tamamlayan müəllimlərə şamil ediləcək.
- **Mentorluq sistemi** — təcrübəli müəllimlər gənc həmkarlarına mentorluq edəcək. Bu, yeni müəllimlərin peşəkar inkişafını sürətləndirəcək.

## Xarici dil tədrisi

İkinci xarici dilin məcburi olması islahatların ən çox müzakirə olunan maddələrindən biridir. Hal-hazırda məktəblərdə yalnız bir xarici dil (əsasən ingilis dili) tədris olunur. Yeni islahatla şagirdlər 6-cı sinifdən ikinci xarici dil öyrənməyə başlayacaq. Təklif olunan dillər arasında rus, alman, fransız, ərəb, türk və çin dilləri var.

Bu addım şagirdlərin dünya görüşünü genişləndirəcək və onları qloballaşan dünyaya daha yaxşı hazırlayacaq. Lakin tənqidçilər müəllim çatışmazlığının bu islahatın tətbiqini çətinləşdirə biləcəyini vurğulayır.

## Ali təhsildə dəyişikliklər

Universitetlərdə beynəlxalq akkreditasiya prosesi sürətləndiriləcək. Bundan əlavə, tələbə mübadiləsi proqramları genişləndiriləcək. Ali təhsil sahəsindəki digər mühüm dəyişikliklər:

- **Bolonya sisteminə tam uyğunlaşma** — bütün universitetlər kredit sisteminə keçəcək. Bu, tələbələrin xarici universitetlərə transfer olmasını asanlaşdıracaq.
- **Tədqiqat fondları** — universitetlərdə elmi tədqiqat üçün ayrılan büdcə 2 dəfə artırılacaq. Xüsusilə süni zəka, yaşıl enerji və biotexnologiya sahələrində tədqiqatlar prioritet olacaq.
- **Sənaye-universitet əməkdaşlığı** — şirkətlərlə birlikdə dual təhsil proqramları yaradılacaq. Tələbələr həm nəzəri biliklər, həm də praktiki təcrübə əldə edəcək.
- **Onlayn təhsil** — universitetlər proqramlarının bir hissəsini onlayn formatda təklif edəcək. Bu, regionlardakı tələbələrin Bakıdakı universitetlərin proqramlarından yararlanmasına imkan yaradacaq.

## Təhsilin maliyyələşdirilməsi

İslahatların maliyyələşdirilməsi üçün dövlət büdcəsindən əlavə vəsait ayrılıb. Təhsilə ayrılan büdcə ÜDM-in 4,5 faizinə çatdırılacaq ki, bu da əvvəlki göstəricidən 0,8 faiz bənd yüksəkdir. Bundan əlavə, Dünya Bankı və Avropa İnvestisiya Bankı ilə danışıqlar aparılır və beynəlxalq maliyyə qurumlarından 300 milyon dollarlıq güzəştli kredit cəlb edilməsi gözlənilir.

## Gözləntilar və tənqidlər

Təhsil naziri bildirib ki, islahatların tam tətbiqi 2028-ci ilədək başa çatacaq. Ekspertlər hesab edir ki, bu dəyişikliklər Azərbaycanın təhsil sistemini regional liderlərlə eyni səviyyəyə gətirə bilər.

Lakin bəzi ekspertlər islahatların sürəti barədə narahatlıq ifadə edir. Onlar hesab edir ki, infrastruktur və kadr hazırlığı islahatların sürətinə uyğun gəlməyə bilər. Xüsusilə kənd bölgələrində internet infrastrukturunun zəifliyi rəqəmsal təhsil platformasının effektiv tətbiqini çətinləşdirə bilər.

Buna baxmayaraq, valideynlərin və ictimaiyyətin böyük əksəriyyəti islahatlara müsbət yanaşır. Müstəqil sorğulara görə, valideynlərin 78 faizi islahatları dəstəkləyir və övladlarının daha keyfiyyətli təhsil alacağına inanır.

## Peşə təhsilinin yenidən qurulması

İslahat paketinin vacib komponentlərindən biri peşə təhsilinin yenidən qurulmasıdır. Nazirlik 2026-2028-ci illər ərzində 15 yeni peşə-texniki məktəbin açılmasını planlaşdırır. Bu məktəblər əmək bazarının tələblərinə uyğun ixtisaslar üzrə kadr hazırlayacaq. Prioritet sahələr arasında informasiya texnologiyaları, yaşıl enerji, turizm-mehmanxana işi, tibbi texnologiyalar və kənd təsərrüfatı texnologiyaları yer alır.

Peşə təhsilinin gücləndirilməsi xüsusilə regionlardakı gənclər üçün böyük əhəmiyyət daşıyır. Universitetə daxil olmayan və ya ali təhsil almaq imkanı olmayan gənclər üçün peşə-texniki məktəblər keyfiyyətli iş tapmaq üçün real imkan yaradacaq. Alman dual təhsil modelindən ilhamlanaraq, tələbələr həftənin yarısını məktəbdə, yarısını isə müəssisələrdə praktiki təcrübə keçərək öyrənəcək.

## Inklüziv təhsil

İslahatlar inklüziv təhsilə də xüsusi diqqət ayırır. Əlilliyi olan uşaqların ümumi təhsil sisteminə inteqrasiyası üçün məktəblərdə fiziki infrastrukturun yaxşılaşdırılması, xüsusi pedaqoqların hazırlanması və fərdi tədris planlarının hazırlanması nəzərdə tutulub. 2028-ci ilə qədər bütün dövlət məktəblərinin əlilliyi olan şagirdlər üçün tam əlçatan olması hədəflənir.

## Beynəlxalq əməkdaşlıq

Təhsil islahatlarının mühüm hissəsi beynəlxalq əməkdaşlığın genişləndirilməsidir. Finlandiya, Estoniya, Sinqapur və Cənubi Koreya kimi təhsil sahəsində lider ölkələrlə müqavilələr imzalanıb. Bu əməkdaşlıq çərçivəsində kurikulum hazırlığı, müəllim mübadiləsi, texnoloji həllər və qiymətləndirmə metodologiyası sahələrində bilik mübadiləsi aparılacaq. Bu təcrübə Azərbaycanın təhsil sistemini qlobal ən yaxşı təcrübələrlə zənginləşdirəcək.`,
  },
}

export const newsSlugs = Object.keys(newsArticles)
