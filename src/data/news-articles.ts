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
    content: `Süni zəka texnologiyaları 2026-cı ildə yeni mərhələyə qədəm qoyub. Böyük dil modelləri artıq sadəcə mətn yaratmaqla kifayətlənmir — kod yazır, təhlil aparır, qərarlar qəbul edir.

## Əsas tendensiyalar

- **Multimodal modellər** — şəkil, video və səsi eyni anda emal edən sistemlər geniş yayılıb
- **Agent əsaslı AI** — süni zəka artıq müstəqil tapşırıqlar yerinə yetirir
- **Yerli modellər** — kiçik, sürətli modellər fərdi cihazlarda işləyir

## Azərbaycanda vəziyyət

Yerli şirkətlər süni zəkanı müştəri xidmətlərində, maliyyə təhlilində və təhsildə tətbiq etməyə başlayıb. Dövlət qurumları da rəqəmsallaşma prosesində AI-dan istifadəni artırır.

Mütəxəssislər proqnozlaşdırır ki, 2027-ci ilə qədər Azərbaycanda hər 3 şirkətdən biri süni zəka həllərindən istifadə edəcək.`,
  },
  'iqtisadiyyat-manat-mohkemlenmesi': {
    title: 'Manatın möhkəmlənməsi: iqtisadiyyata təsiri necədir?',
    date: '2026-02-27',
    category: 'İqtisadiyyat',
    content: `Son aylarda Azərbaycan manatının xarici valyutalara qarşı mövqeyi möhkəmlənib. Bu tendensiya həm müsbət, həm də mənfi nəticələr doğurur.

## Müsbət təsirlər

- **İdxal ucuzlaşır** — xaricdən gətirilən malların qiyməti aşağı düşür
- **İnflyasiya azalır** — ərzaq məhsullarının qiymətləri stabilləşir
- **İstehlakçı güvəni artır** — vətəndaşlar daha çox xərcləyir

## Mənfi təsirlər

- **İxrac çətinləşir** — yerli məhsullar xarici bazarda bahalı olur
- **Turizm gəlirləri azala bilər** — ölkə turistlər üçün nisbətən bahalı olur

Mərkəzi Bank açıqlamasında bildirib ki, monetar siyasət dəyişikliklər üçün hazırdır və bazar sabitliyi prioritet olaraq qalır.`,
  },
  'idman-premyer-liqa': {
    title: 'Premyer Liqa mövsümü: hansı komanda favoritdir?',
    date: '2026-02-26',
    category: 'İdman',
    content: `Azərbaycan Premyer Liqasında mövsümün ikinci yarısı başlayıb. Turnir cədvəlində maraqlı rəqabət davam edir.

## Cədvəlin başında

Liderlər arasında fərq minimaldır. İlk üç komanda arasında cəmi 4 xal fərq var.

## Diqqətə çarpan statistikalar

- **Ən çox qol vuran komanda** — mövsüm boyu 38 qol
- **Ən az qol buraxan müdafiə** — cəmi 12 qol buraxıb
- **Ən yaxşı bombardir** — 14 qolla lider

## Mövsümün sürprizləri

Bu mövsüm bir neçə gənc futçolçu özünü göstərib. Yerli akademiyalardan yetişən oyunçuların sayı artıb ki, bu da Azərbaycan futbolunun gələcəyi üçün ümidvericidir.

Mütəxəssislər hesab edir ki, mövsümün sonuna qədər çempionluq mübarizəsi davam edəcək.`,
  },
  'tehsil-yeni-islahatlar': {
    title: 'Yeni təhsil islahatları: nələr dəyişəcək?',
    date: '2026-02-25',
    category: 'Təhsil',
    content: `Təhsil Nazirliyi 2026-cı il üçün yeni islahat paketini açıqlayıb. Dəyişikliklər həm orta, həm də ali təhsil səviyyəsini əhatə edir.

## Əsas dəyişikliklər

- **Rəqəmsal təhsil platforması** — bütün məktəblər vahid onlayn sistemə qoşulacaq
- **STEM fənlərinə diqqət** — riyaziyyat və texnologiya fənləri üzrə yeni kurikulumlar
- **Müəllim hazırlığı** — pedaqoji kadrların ixtisasartırma proqramları genişlənir
- **Xarici dil tədrisi** — ikinci xarici dil məktəblərdə məcburi olacaq

## Ali təhsildə dəyişikliklər

Universitetlərdə beynəlxalq akkreditasiya prosesi sürətləndiriləcək. Bundan əlavə, tələbə mübadiləsi proqramları genişləndiriləcək.

Təhsil naziri bildirib ki, islahatların tam tətbiqi 2028-ci ilədək başa çatacaq. Ekspertlər hesab edir ki, bu dəyişikliklər Azərbaycanın təhsil sistemini regional liderlərlə eyni səviyyəyə gətirə bilər.`,
  },
}

export const newsSlugs = Object.keys(newsArticles)
