/* ============================================================
   Lingo5 – Program metadata
   5 ayda (22 hafta) sıfırdan uluslararası sınav seviyesine İngilizce
   ============================================================ */
"use strict";

const LINGO5 = {
  version: "1.0",
  dailyMinutes: 40,
  dailyGoal: { minutes: 40, words: 12, reviews: 20, xp: 200 },

  /* YÖNTEM – Dilbilim araştırmalarına dayalı 7 ilke */
  method: [
    {
      id: "input", icon: "🎧",
      title: "Anlaşılır Girdi (i+1)",
      who: "Stephen Krashen – Input Hypothesis (1982)",
      text: "Dil, biraz seviyenin üzerinde ama anlaması mümkün olan girdiyle (i+1) kazanılır. Her dersin %70-80'i senin seviyende, %20-30'u bir tık üstünde kurulur; hiçbir metin 'çok zor' hissettirmez."
    },
    {
      id: "srs", icon: "🔁",
      title: "Aralıklı Tekrar",
      who: "Hermann Ebbinghaus (1885) – Unutma Eğrisi",
      text: "Bilgi, unutmanın eşiğinde tekrar edildiğinde kalıcı olur. Kelimeler 1-3-7-14-30-60 günlük aralıklarla, tam unutulmaya yakın anda karşına çıkar. Böylece 5 ayda 1500+ kelime kalıcı öğrenilir."
    },
    {
      id: "recall", icon: "🧠",
      title: "Aktif Hatırlama (Test Etkisi)",
      who: "Roediger & Karpicke (2006)",
      text: "Yeniden okumak değil, cevabı hatırlamaya çalışmak öğrenmeyi %50-80 güçlendirir. Tüm alıştırmalar önce 'sen cevapla' mantığıyla tasarlandı; ipucu en son açılır."
    },
    {
      id: "interval", icon: "⏱️",
      title: "Kademeli Aralıklı Hatırlama",
      who: "Paul Pimsleur – A Memory Schedule (1967)",
      text: "Yeni ifade 5 sn, 25 sn, 2 dk, 10 dk sonra tekrar sorulur. Uygulama, yeni kelimeleri tek seansta 4 farklı zamanda karşına çıkararak kısa süreli hafızayı kalıcıya bağlar."
    },
    {
      id: "chunks", icon: "🧩",
      title: "Öbek Öğrenimi (Lexical Approach)",
      who: "Michael Lewis (1993) – The Lexical Approach",
      text: "Ana dil konuşmacılarının ifadelerinin %55-80'i hazır öbeklerdir. Ayrı kelime yerine 'take a photo', 'make a decision' gibi kalıplar öğretilir; bu, konuşmayı 3-4 kat hızlandırır."
    },
    {
      id: "shadow", icon: "🗣️",
      title: "Gölgeleme (Shadowing)",
      who: "Alexander Arguelles; Murphey (2004)",
      text: "Sesin hemen ardından tekrarlamak; telaffuz + dinleme + akıcılığı aynı anda geliştirir. Her dinleme dersinde gölgeleme turu zorunludur."
    },
    {
      id: "output", icon: "💬",
      title: "Anlamlı Üretim + Fark Etme",
      who: "Merrill Swain – Output Hypothesis (1985); Richard Schmidt – Noticing (1990)",
      text: "Konuşup yazmak eksikleri görünür kılar. Günlük konuşma ve yazma görevleri ses tanıma ile karşılaştırılır; farklar işaretlenerek 'fark etme' sağlanır."
    }
  ]
};

/* 6 FAZ – Aylık yol haritası */
LINGO5.phases = [
  { id: 1, name: "Temel & Hayatta Kalma", weeks: "1-4",  level: "A0 → A1",  color: "#22c55e",
    goal: "Alfabe-ses sistemi, tanışma, kendini tanıtma, sayı-saat, günlük 300 temel kelime." },
  { id: 2, name: "Günlük Hayat", weeks: "5-8", level: "A1 → A2", color: "#06b6d4",
    goal: "Şimdiki/zamanlar, alışveriş, yön, tarif, sağlık, seyahat diyalogları; 300 yeni kelime." },
  { id: 3, name: "Akıcılık Atılımı", weeks: "9-12", level: "A2 → B1", color: "#3b82f6",
    goal: "Geçmiş-zaman-gelecek tam kontrol, hikâye anlatma, fikir savunma; günlük konuşma pratiği." },
  { id: 4, name: "Derinleşme", weeks: "13-16", level: "B1 → B1+", color: "#8b5cf6",
    goal: "Öbek/ifade bankası, deyimler, akademik kelime (AWL), resmî-gayriresmî dil farkı." },
  { id: 5, name: "Sınav Stratejileri", weeks: "17-20", level: "B1+ → B2", color: "#f59e0b",
    goal: "IELTS/TOEFL formatı, soru taktikleri, yazma şablonları, konuşma cue-card tekniği." },
  { id: 6, name: "Deneme & Cila", weeks: "21-22", level: "B2", color: "#ef4444",
    goal: "Tam deneme sınavları, zayıf nokta onarımı, sınav günü rutini, özgüven tazeleme." }
];

/* 22 HAFTALIK DETAYLI PLAN */
LINGO5.weeks = [
  { w: 1,  p: 1, title: "Sesler & Tanışma", focus: "Alfabe-ses eşleşmesi, selamlaşma, 'to be', tanışma cümleleri", grammar: ["g_to_be", "g_possessive"], vocab: ["v_greetings", "v_numbers"] },
  { w: 2,  p: 1, title: "Sayılar & Günlük Rutin", focus: "Sayılar-saat, gün-ay, Present Simple, günlük eylemler", grammar: ["g_present_simple", "g_adverbs_freq"], vocab: ["v_numbers", "v_routine"] },
  { w: 3,  p: 1, title: "Aile & Ev", focus: "İsimler-çoğul, 'there is/are', ev eşyaları, aile fertleri", grammar: ["g_there_is", "g_plurals"], vocab: ["v_family", "v_house"] },
  { w: 4,  p: 1, title: "Yemek & Alışveriş", focus: "Sayılabilir/sayılamaz, 'some/any', market diyalogu, fiyat sorma", grammar: ["g_countable", "g_some_any"], vocab: ["v_food", "v_shopping"] },
  { w: 5,  p: 2, title: "Şehir & Yön Tarifi", focus: "Yer edatları, emir kipleri, yol tarifi", grammar: ["g_prepositions", "g_imperatives"], vocab: ["v_city", "v_directions"] },
  { w: 6,  p: 2, title: "Seyahat & Ulaşım", focus: "Future (will/going to), havalimanı-otel diyalogları", grammar: ["g_future", "g_modals_can"], vocab: ["v_travel", "v_hotel"] },
  { w: 7,  p: 2, title: "Sağlık & Vücut", focus: "Tavsiye (should), şikayet anlatma, doktor diyalogu", grammar: ["g_should", "g_present_cont"], vocab: ["v_health", "v_body"] },
  { w: 8,  p: 2, title: "Duygular & Tarif", focus: "Sıfatlar, karşılaştırma, insan betimleme", grammar: ["g_comparatives", "g_adjectives"], vocab: ["v_feelings", "v_describing"] },
  { w: 9,  p: 3, title: "Geçmiş Zaman – Anılar", focus: "Past Simple (düzenli/düzensiz), tatil hikâyeleri", grammar: ["g_past_simple", "g_past_irregular"], vocab: ["v_past", "v_holidays"] },
  { w: 10, p: 3, title: "Hikâye Zamanları", focus: "Past Continuous vs Past Simple, olay anlatımı", grammar: ["g_past_cont", "g_past_vs_cont"], vocab: ["v_story", "v_emotions"] },
  { w: 11, p: 3, title: "Deneyim & Sonuç", focus: "Present Perfect, yaşam deneyimleri, ever/never/just", grammar: ["g_present_perfect", "g_for_since"], vocab: ["v_experience", "v_life"] },
  { w: 12, p: 3, title: "Fikir & Tartışma", focus: "Fikir ifadeleri, bağlaçlar, argüman kurma", grammar: ["g_connectors", "g_opinions"], vocab: ["v_opinions", "v_society"] },
  { w: 13, p: 4, title: "Öbek Bankası I", focus: "Fiil+isim öbekleri (make/do/take/have), günlük kalıplar", grammar: ["g_chunks_do_make", "g_phrasal_1"], vocab: ["v_chunks1", "v_work"] },
  { w: 14, p: 4, title: "Öbek Bankası II", focus: "Phrasal verbs, edatlı kalıplar", grammar: ["g_phrasal_2", "g_chunks_prep"], vocab: ["v_chunks2", "v_technology"] },
  { w: 15, p: 4, title: "Akademik Kelime", focus: "AWL alt listeleri, akademik fiil/nominalizasyon", grammar: ["g_formal_register", "g_relative"], vocab: ["v_awl1", "v_awl2"] },
  { w: 16, p: 4, title: "Nüans & Ton", focus: "Sofistike ifade, dolaylılık, nezaket kalıpları", grammar: ["g_passive", "g_conditionals_1"], vocab: ["v_advanced", "v_connectors"] },
  { w: 17, p: 5, title: "Sınav Tanışma", focus: "IELTS/TOEFL formatı, puanlama, yazma Task 1 şablonu", grammar: ["g_writing_tenses", "g_conditionals_2"], vocab: ["v_exam1"] },
  { w: 18, p: 5, title: "Reading Taktikleri", focus: "Skimming-scanning, True/False/Not Given, eşleştirme", grammar: ["g_relative_2", "g_passive_perfect"], vocab: ["v_exam2"] },
  { w: 19, p: 5, title: "Listening & Speaking", focus: "Not alma, ana fikir-ayrıntı, cue card stratejisi", grammar: ["g_reported", "g_wish"], vocab: ["v_exam3"] },
  { w: 20, p: 5, title: "Writing Task 2", focus: "Essay yapısı, tez cümlesi, paragraf planı", grammar: ["g_perfect_cont", "g_mixed_cond"], vocab: ["v_exam4"] },
  { w: 21, p: 6, title: "Tam Deneme I", focus: "Süreli tam deneme + hata analizi + zayıf nokta onarımı", grammar: ["g_review_1"], vocab: ["v_review1"] },
  { w: 22, p: 6, title: "Tam Deneme II & Sınav Günü", focus: "Son deneme, özgüven, sınav günü rutini, strateji kartları", grammar: ["g_review_2"], vocab: ["v_review2"] }
];

/* Sınav bilgileri – genel bakış ekranı */
LINGO5.exams = {
  ielts: {
    name: "IELTS",
    full: "International English Language Testing System",
    sections: [
      { part: "Listening", detail: "4 bölüm / 40 soru / ~30 dk. Kayıt bir kez dinlenir.", tip: "Soruları dinlemeden önce tara; anahtar kelimeleri altını çizerek bekle." },
      { part: "Reading", detail: "3 pasaj / 40 soru / 60 dk (Akademik).", tip: "Metni baştan sona okuma; sorudaki anahtar kelimeyle metinde yer bul (scanning)." },
      { part: "Writing", detail: "Task 1 (150+ kelime, 20 dk) + Task 2 (250+ kelime, 40 dk).", tip: "Task 2, toplam puanın 2/3'ü değerindedir; ilk 5 dakikada taslak plan yap." },
      { part: "Speaking", detail: "3 bölüm / 11-14 dk. Yüz yüze mülakat.", tip: "Part 2'de 1 dk hazırlık süresini not almak için kullan; tek cümleyle cevap verme." }
    ],
    bands: "0-9 bant. Üniversiteler genelde 6.0-6.5, yüksek lisans 6.5-7.0 ister."
  },
  toefl: {
    name: "TOEFL iBT",
    full: "Test of English as a Foreign Language",
    sections: [
      { part: "Reading", detail: "2 pasaj / 20 soru / 35 dk.", tip: "Önce soruları oku, sonra pasajı tara; kelime sorularında bağlamı (context) kullan." },
      { part: "Listening", detail: "3 ders + 2 konuşma / 28 soru / 36 dk.", tip: "Not alırken 'kim-ne-neden-sonuç' şemasını kullan; sayı ve tarihleri mutlaka yaz." },
      { part: "Speaking", detail: "4 görev / 17 dk. Mikrofona kayıt.", tip: "15 saniyelik hazırlıkta 2 argüman seç; 'opinion + reason + example' şablonunu kullan." },
      { part: "Writing", detail: "Academic Discussion (10 dk) + Integrated (20 dk).", tip: "Görüşünü ilk cümlede açıkça belirt; 2 örnek + 1 sonuç cümlesi ile bitir." }
    ],
    bands: "0-120 puan. Birçok üniversite 80-90+, prestijli programlar 100+ ister."
  }
};