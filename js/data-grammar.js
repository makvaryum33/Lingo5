/* ============================================================
   Lingo5 – Dilbilgisi Modülleri (42 konu)
   Her konu: kural (TR), örnekler, otomatik mini test
   ============================================================ */
"use strict";

const GRAMMAR = {
  g_to_be: {
    title: "to be (am / is / are)", level: "A0",
    tr: "İngilizcede 'olmak' fiili cümlede zorunludur. Türkçede 'ben öğrenciyim' deriz; İngilizce 'I am a student' — ek yok, ayrı kelime var.",
    rules: ["I → am", "He / She / It → is", "You / We / They → are", "Olumsuzluk: am not / isn't / aren't", "Soru: Am I...? Is he...? Are they...?"],
    ex: [["I am a student.", "Ben öğrenciyim."], ["She is my sister.", "O benim kız kardeşim."], ["They are at home.", "Onlar evde."]],
    quiz: [
      { q: "She ___ a teacher.", a: ["is", "am", "are", "be"], c: 0 },
      { q: "We ___ happy today.", a: ["is", "am", "are", "be"], c: 2 },
      { q: "I ___ not tired.", a: ["is", "am", "are", "be"], c: 1 }
    ]
  },
  g_possessive: {
    title: "İyelik Ekleri (my / your / his...)", level: "A0",
    tr: "Türkçede '-ım, -ın, -ı' ekleri var; İngilizcede iyelik ayrı kelimelerle yapılır: my, your, his, her, its, our, their.",
    rules: ["my (benim), your (senin), his (onun-erkek), her (onun-kadın)", "its (onun-cansız/hayvan), our (bizim), their (onların)", "İsimden önce gelir: my book, her car"],
    ex: [["This is my car.", "Bu benim arabam."], ["Her name is Ayşe.", "Onun adı Ayşe."], ["Our house is big.", "Evimiz büyük."]],
    quiz: [
      { q: "This is ___ book. (benim)", a: ["my", "me", "I", "mine"], c: 0 },
      { q: "___ name is Ali. (onun - erkek)", a: ["Her", "His", "Its", "Their"], c: 1 },
      { q: "They love ___ school.", a: ["they", "them", "their", "theirs"], c: 2 }
    ]
  },
  g_present_simple: {
    title: "Present Simple (Geniş Zaman)", level: "A0",
    tr: "Alışkanlıkları, gerçekleri ve rutinleri anlatır. He/she/it öznelerinde fiile -s/-es eklenir — Türkçede olmayan bu kural en sık hatadır.",
    rules: ["I / You / We / They → work", "He / She / It → works (-s eklenir)", "Olumsuz: don't / doesn't + yalın fiil", "Soru: Do / Does + özne + yalın fiil?"],
    ex: [["I work every day.", "Her gün çalışırım."], ["She works at a bank.", "O bir bankada çalışır."], ["Do you like coffee?", "Kahve sever misin?"]],
    quiz: [
      { q: "He ___ to school by bus.", a: ["go", "goes", "going", "is go"], c: 1 },
      { q: "They ___ like tea.", a: ["doesn't", "don't", "aren't", "isn't"], c: 1 },
      { q: "___ she speak English?", a: ["Do", "Does", "Is", "Are"], c: 1 }
    ]
  },
  g_adverbs_freq: {
    title: "Sıklık Zarfları", level: "A0",
    tr: "always, usually, often, sometimes, never gibi kelimeler fiilden ÖNCE gelir (be fiilinden sonra).",
    rules: ["%100 always, %80 usually, %60 often, %50 sometimes, %0 never", "Yer: fiilden önce (I often play), be'den sonra (She is always late)"],
    ex: [["I always drink tea in the morning.", "Sabahları her zaman çay içerim."], ["He is never late.", "Asla geç kalmaz."], ["We sometimes eat out.", "Bazen dışarıda yeriz."]],
    quiz: [
      { q: "She ___ goes to bed early.", a: ["goes always", "always goes", "always going", "is always go"], c: 1 },
      { q: "I am ___ tired at night.", a: ["never", "not", "don't", "doesn't"], c: 0 }
    ]
  },
  g_there_is: {
    title: "There is / There are", level: "A1",
    tr: "'Var, bulunuyor' anlamı verir. Tekil sayılabilir ve sayılamaz isimlerle There is; çoğul isimlerle There are kullanılır.",
    rules: ["There is a book on the table. (tekil)", "There are two books. (çoğul)", "Soru: Is there...? / Are there...?"],
    ex: [["There is a park near my house.", "Evimin yakınında bir park var."], ["There are many students in the class.", "Sınıfta birçok öğrenci var."]],
    quiz: [
      { q: "___ some water in the bottle.", a: ["There is", "There are", "There have", "It is"], c: 0 },
      { q: "___ any questions?", a: ["Is there", "Are there", "Have there", "Do there"], c: 1 }
    ]
  },
  g_plurals: {
    title: "Çoğul Yapım", level: "A1",
    tr: "Çoğu isim +s alır. sibilant (s, sh, ch, x) sonlu isimler +es; sessiz harf +y sonlu isimler -y → -ies olur.",
    rules: ["book → books", "box → boxes, watch → watches", "city → cities (sessiz+y), boy → boys (sesli+y)", "Düzensiz: child→children, man→men, foot→feet"],
    ex: [["I have three brothers.", "Üç erkek kardeşim var."], ["The children are playing.", "Çocuklar oynuyor."]],
    quiz: [
      { q: "There are five ___ in the kitchen.", a: ["boxs", "boxes", "box", "boxies"], c: 1 },
      { q: "Two ___ are waiting outside.", a: ["mans", "mens", "men", "man"], c: 2 }
    ]
  },
  g_countable: {
    title: "Sayılabilir / Sayılamaz İsimler", level: "A1",
    tr: "Türkçede 'su, ekmek' sayılabilir gibi davranabilir; İngilizce'de water, bread, information, advice SAYILAMAZ — çoğul yapılmaz, 'a' almaz.",
    rules: ["Sayılabilir: a book, two books, many books", "Sayılamaz: some water, much water (not 'two waters')", "Ayrım: a piece of advice / a glass of water"],
    ex: [["I need some information.", "Biraz bilgiye ihtiyacım var."], ["She bought three apples.", "Üç elma aldı."]],
    quiz: [
      { q: "Can I have ___ water?", a: ["a", "some", "many", "two"], c: 1 },
      { q: "He gave me two good ___.", a: ["advices", "advice", "pieces of advice", "piece of advices"], c: 2 }
    ]
  },
  g_some_any: {
    title: "some / any / much / many / a lot of", level: "A1",
    tr: "some olumlu cümlelerde; any olumsuz ve soru cümlelerinde. much sayılamaz, many sayılabilir isimlerle kullanılır.",
    rules: ["I have some money. (olumlu)", "I don't have any money. (olumsuz)", "Do you have any questions? (soru)", "much water / many books / a lot of both"],
    ex: [["There are some apples in the fridge.", "Buzdolabında birkaç elma var."], ["We don't have any milk.", "Hiç sütümüz yok."]],
    quiz: [
      { q: "There aren't ___ students in the class.", a: ["some", "any", "much", "a"], c: 1 },
      { q: "How ___ books do you have?", a: ["much", "any", "many", "a lot"], c: 2 }
    ]
  },
  g_prepositions: {
    title: "Yer Edatları", level: "A2",
    tr: "in (içinde), on (üzerinde), at (belirli nokta), under (altında), between (arasında), next to (yanında), opposite (karşısında).",
    rules: ["in the room, on the table, at the door", "under the chair, between A and B", "next to the bank, opposite the school"],
    ex: [["The cat is under the table.", "Kedi masanın altında."], ["I live in Istanbul.", "İstanbul'da yaşıyorum."], ["Meet me at the station.", "İstasyonda buluşalım."]],
    quiz: [
      { q: "The keys are ___ the table.", a: ["in", "on", "at", "under"], c: 1 },
      { q: "She is standing ___ the two men.", a: ["among", "between", "next", "in"], c: 1 }
    ]
  },
  g_imperatives: {
    title: "Emir Kipleri", level: "A2",
    tr: "Talimat ve yönerge verirken fiilin yalın hali kullanılır. Olumsuzluk Don't + fiil.",
    rules: ["Open the door. / Sit down, please.", "Don't touch! / Don't be late!", "Kibarlık için 'please' ekle"],
    ex: [["Please turn off your phone.", "Lütfen telefonunuzu kapatın."], ["Don't run in the hallway.", "Koridorda koşmayın."]],
    quiz: [
      { q: "___ the window, please.", a: ["Opening", "Opens", "Open", "To open"], c: 2 },
      { q: "___ be nervous!", a: ["Not", "Don't", "Doesn't", "No"], c: 1 }
    ]
  },
  g_future: {
    title: "Gelecek Zaman: will / going to", level: "A2",
    tr: "will: anlık karar, tahmin, söz. going to: önceden planlanmış niyet, göstergelerle tahmin.",
    rules: ["I will help you. (anlık karar/söz)", "I am going to visit my aunt. (plan)", "Olumsuz: won't / aren't going to"],
    ex: [["It will rain tomorrow.", "Yarın yağmur yağacak."], ["I'm going to study medicine.", "Tıp okuyacağım (planlı)."]],
    quiz: [
      { q: "Look at those clouds! It ___ rain.", a: ["will", "is going to", "shall", "would"], c: 1 },
      { q: "The phone is ringing. I ___ answer it.", a: ["am going to", "will", "would", "am"], c: 1 }
    ]
  },
  g_modals_can: {
    title: "can / could / be able to", level: "A2",
    tr: "Yetenek ve izin için kullanılır. could, can'ın geçmiş hali ve kibar istek formudur.",
    rules: ["I can swim. (yetenek)", "Can I come in? (izin)", "Could you help me? (kibar istek)", "I was able to finish on time."],
    ex: [["She can speak three languages.", "Üç dil konuşabiliyor."], ["Could you open the window?", "Pencereyi açabilir misiniz?"]],
    quiz: [
      { q: "When I was young, I ___ run very fast.", a: ["can", "could", "may", "will"], c: 1 },
      { q: "___ I use your phone?", a: ["Can", "Will", "Do", "Am"], c: 0 }
    ]
  },
  g_should: {
    title: "should / shouldn't (Tavsiye)", level: "A2",
    tr: "Tavsiye ve öneriler için kullanılır. 'Gerekir, -meli' anlamı verir. Fiilin yalın haliyle gelir.",
    rules: ["You should see a doctor. (tavsiye)", "You shouldn't smoke. (olumsuz tavsiye)", "Soru: Should I take this medicine?"],
    ex: [["You should sleep early tonight.", "Bu gece erken yatmalısın."], ["We should practice every day.", "Her gün pratik yapmalıyız."]],
    quiz: [
      { q: "I have a headache. I ___ take a painkiller.", a: ["should", "am", "will", "do"], c: 0 },
      { q: "You ___ eat too much sugar.", a: ["should", "shouldn't", "don't", "aren't"], c: 1 }
    ]
  },
  g_present_cont: {
    title: "Present Continuous (Şimdiki Zaman)", level: "A2",
    tr: "Şu anda olan veya geçici eylemleri anlatır. to be + fiil-ing. Türkçedeki '-yor' ile benzer ama planlanmış gelecek de olabilir.",
    rules: ["am/is/are + V-ing", "Olumsuz: isn't / aren't + V-ing", "Soru: Is she working?", "Şu an + geçici durum + gelecek planı (I'm meeting him at 5)"],
    ex: [["I am studying English now.", "Şu anda İngilizce çalışıyorum."], ["Look! It is raining.", "Bak! Yağmur yağıyor."]],
    quiz: [
      { q: "They ___ watching TV right now.", a: ["is", "are", "am", "be"], c: 1 },
      { q: "She is ___ dinner at the moment.", a: ["cook", "cooks", "cooking", "cooked"], c: 2 }
    ]
  },
  g_comparatives: {
    title: "Karşılaştırma (Comparatives & Superlatives)", level: "A2",
    tr: "Kısa sıfatlar + -er/-est; uzun sıfatlar more/most. 'than' karşılaştırma, 'the' üstünlük için.",
    rules: ["big → bigger → the biggest", "expensive → more expensive → the most expensive", "good → better → the best (düzensiz)", "This car is faster than mine."],
    ex: [["Ankara is colder than İstanbul.", "Ankara İstanbul'dan daha soğuktur."], ["This is the best day of my life.", "Bu hayatımın en iyi günü."]],
    quiz: [
      { q: "She is ___ than her sister.", a: ["tall", "taller", "tallest", "more tall"], c: 1 },
      { q: "It was ___ day of the year.", a: ["the hottest", "hottest", "hotter", "the hotter"], c: 0 }
    ]
  },
  g_adjectives: {
    title: "Sıfatlar & Sıfat Dizilimi", level: "A2",
    tr: "Sıfatlar isimden ÖNCE gelir (a big house) veya be'den SONRA (the house is big). Sıralama: görüş-boyut-yaş-renk-menşe-malzeme.",
    rules: ["a beautiful old Turkish carpet (OPINION-SIZE-AGE)", "The soup smells delicious.", "İsimden sonra: something new, anyone tall"],
    ex: [["She has beautiful blue eyes.", "Güzel mavi gözleri var."], ["This problem is difficult.", "Bu sorun zor."]],
    quiz: [
      { q: "I bought a ___ leather bag.", a: ["leather black nice", "nice black leather", "black nice leather", "leather nice black"], c: 1 },
      { q: "The test was very ___.", a: ["difficulty", "difficult", "difficultly", "more difficulty"], c: 1 }
    ]
  },
  g_past_simple: {
    title: "Past Simple (Geçmiş Zaman)", level: "B1",
    tr: "Geçmişte bitmiş eylemler için. Düzenli fiillere -ed; düzensiz fiillerin 2. hâli kullanılır.",
    rules: ["work → worked, study → studied", "go → went, see → saw (düzensiz)", "Olumsuz: didn't + yalın fiil (I didn't go)", "Soru: Did you go? / Was he there?"],
    ex: [["We visited Rome last year.", "Geçen yıl Roma'yı ziyaret ettik."], ["She didn't come to the party.", "Partiye gelmedi."]],
    quiz: [
      { q: "I ___ a great film yesterday.", a: ["watch", "watched", "watching", "watches"], c: 1 },
      { q: "Did they ___ the answer?", a: ["knew", "know", "knows", "knowing"], c: 1 }
    ]
  },
  g_past_irregular: {
    title: "Düzensiz Fiiller", level: "B1",
    tr: "En sık 50 düzensiz fiil ezberlenmeli: be-was/were, go-went, have-had, do-did, see-saw, take-took, get-got, make-made, come-came, know-knew...",
    rules: ["be → was/were → been", "go → went → gone", "have → had → had", "Günlük 10 fiil + cümle içinde kullan"],
    ex: [["He went to school early.", "Erken okula gitti."], ["I have never been to Paris.", "Hiç Paris'e gitmedim."]],
    quiz: [
      { q: "She ___ (take) the book yesterday.", a: ["taked", "took", "taked", "taken"], c: 1 },
      { q: "We ___ (be) at home last night.", a: ["was", "were", "are", "been"], c: 1 }
    ]
  },
  g_past_cont: {
    title: "Past Continuous (Geçmişte Devam Eden)", level: "B1",
    tr: "Geçmişte belirli bir anda devam eden eylem: was/were + V-ing. Arka plan ve atmosfer anlatımında kullanılır.",
    rules: ["I was reading at 9 pm.", "They were playing football when it rained.", "Olumsuz: wasn't / weren't + V-ing"],
    ex: [["I was watching TV when you called.", "Sen aradığında televizyon izliyordum."], ["At 6 o'clock, we were having dinner.", "Saat 6'da yemek yiyorduk."]],
    quiz: [
      { q: "She ___ sleeping when I arrived.", a: ["is", "was", "were", "has been"], c: 1 },
      { q: "They ___ studying at midnight.", a: ["was", "were", "are", "did"], c: 1 }
    ]
  },
  g_past_vs_cont: {
    title: "Past Simple vs Past Continuous", level: "B1",
    tr: "Kesinti: uzun eylem (Past Cont) sürerken kısa eylem (Past Simple) olur. 'when' kısa eylem, 'while' uzun eylem öncesi.",
    rules: ["I was walking home when I found a wallet.", "While she was cooking, the phone rang.", "Sürekli arka plan + anlık kesme"],
    ex: [["While I was studying, my friend called.", "Ben çalışırken arkadaşım aradı."], ["The sun was shining when we left.", "Biz çıktığında güneş parlıyordu."]],
    quiz: [
      { q: "I ___ TV when the lights went out.", a: ["watched", "was watching", "watch", "am watching"], c: 1 },
      { q: "While she ___ , the baby woke up.", a: ["slept", "was sleeping", "sleeps", "has slept"], c: 1 }
    ]
  },
  g_present_perfect: {
    title: "Present Perfect (have/has + V3)", level: "B1",
    tr: "Geçmişteki eylemin bugünkü SONUCU önemlidir. 'Deneyim, sonuç, süreklilik' için. Belirli geçmiş zaman zarfı (yesterday, in 2010) ile KULLANILMAZ.",
    rules: ["I have finished my homework. (bitmiş, sonuç)", "She has lived here for 5 years.", "ever/never/just/already/yet ile sık kullanılır", "Geçmiş belirli zaman varsa → Past Simple"],
    ex: [["I have never eaten sushi.", "Hiç sushi yemedim."], ["He has just arrived.", "Az önce geldi."]],
    quiz: [
      { q: "I ___ my keys. I can't find them.", a: ["lost", "have lost", "lose", "was losing"], c: 1 },
      { q: "She ___ been to London twice.", a: ["has", "have", "had", "is"], c: 0 }
    ]
  },
  g_for_since: {
    title: "for / since / ago", level: "B1",
    tr: "for = süre (for 3 years), since = başlangıç noktası (since 2020), ago = geçmişteki nokta (3 years ago → Past Simple).",
    rules: ["for + zaman aralığı", "since + başlangıcı", "ago → daima Past Simple", "How long have you...? → Present Perfect"],
    ex: [["I have known her since 2015.", "Onu 2015'ten beri tanıyorum."], ["We waited for two hours.", "İki saat bekledik."]],
    quiz: [
      { q: "She has worked here ___ five years.", a: ["since", "for", "ago", "during"], c: 1 },
      { q: "I saw him three days ___.", a: ["since", "for", "ago", "before"], c: 2 }
    ]
  },
  g_connectors: {
    title: "Bağlaçlar (and / but / because / so / although)", level: "B1",
    tr: "İki cümleyi bağlar. 'because' sebep, 'so' sonuç, 'although' rağmen, 'but' zıtlık anlatır.",
    rules: ["and (ve), but (ama), so (bu yüzden)", "because / since (çünkü)", "although / even though (rağmen) — 'but' ile birlikte kullanılmaz"],
    ex: [["Although it was raining, we went out.", "Yağmur yağmasına rağmen dışarı çıktık."], ["I was tired, so I went to bed early.", "Yorgundum, bu yüzden erken yattım."]],
    quiz: [
      { q: "___ he studied hard, he failed the exam.", a: ["Although", "Because", "So", "But"], c: 0 },
      { q: "She stayed home ___ she was ill.", a: ["although", "but", "because", "so that"], c: 2 }
    ]
  },
  g_opinions: {
    title: "Fikir İfade Etme", level: "B1",
    tr: "In my opinion, I believe that..., I think that..., From my perspective... kalıpları akademik ve günlük konuşmada fikir bildirir.",
    rules: ["I think (that) + cümle", "In my opinion, ... / From my point of view, ...", "Karşı fikir: However, some people argue that..."],
    ex: [["In my opinion, education is the key to success.", "Bence eğitim başarının anahtarıdır."], ["I believe that everyone deserves a second chance.", "Herkesin ikinci bir şansı hak ettiğine inanıyorum."]],
    quiz: [
      { q: "___, remote work will increase.", a: ["On my opinion", "In my opinion", "At my opinion", "To my opinion"], c: 1 },
      { q: "Some people ___ that exams are unnecessary.", a: ["argue", "arguing", "argues", "argument"], c: 0 }
    ]
  },
  g_chunks_do_make: {
    title: "do / make Öbekleri", level: "B1",
    tr: "Türkçede tek fiil (etmek/yapmak) olan do/make ayrımı öbekle öğrenilir: do homework, make a decision.",
    rules: ["do: homework, exercise, shopping, research, damage", "make: a decision, a mistake, progress, money, an appointment", "Kural değil — öbek olarak ezberle (chunk)"],
    ex: [["She made a difficult decision.", "Zor bir karar verdi."], ["I have to do my homework.", "Ödevimi yapmalıyım."]],
    quiz: [
      { q: "Please ___ an appointment with the doctor.", a: ["do", "make", "take", "have"], c: 1 },
      { q: "We ___ a lot of research last year.", a: ["made", "did", "took", "gave"], c: 1 }
    ]
  },
  g_phrasal_1: {
    title: "Phrasal Verbs I (günlük)", level: "B1",
    tr: "Fiil + edat/zarf kombinasyonları: get up, wake up, turn on/off, look for, give up. Anlamı parçalardan tahmin edilemez, öbek olarak öğrenilir.",
    rules: ["get up (kalkmak), wake up (uyanmak)", "turn on / turn off (açmak/kapatmak)", "look for (aramak), give up (vazgeçmek)", "put on (giymek), take off (çıkarmak/ucus kaldırmak)"],
    ex: [["I wake up at seven every day.", "Her gün yedide uyanırım."], ["Don't give up easily.", "Kolayca vazgeçme."]],
    quiz: [
      { q: "I am ___ my keys. I lost them.", a: ["looking for", "looking up", "looking after", "looking out"], c: 0 },
      { q: "Please ___ the lights before you leave.", a: ["turn on", "turn off", "turn up", "turn into"], c: 1 }
    ]
  },
  g_phrasal_2: {
    title: "Phrasal Verbs II (ileri)", level: "B1",
    tr: "B1-B2 seviyesi sık phrasal verb'lar: figure out, come up with, run out of, get along with, put up with.",
    rules: ["figure out (çözmek/anlamak)", "come up with (bulmak-fikir)", "run out of (bitmek-tüketmek)", "get along with (iyi geçinmek)", "look forward to (dört gözle beklemek) — to burada edat, V-ing alır"],
    ex: [["I can't figure out this problem.", "Bu problemi çözemiyorum."], ["I look forward to hearing from you.", "Sizden haber almayı dört gözle bekliyorum."]],
    quiz: [
      { q: "We ___ of milk. Let's buy some.", a: ["ran out", "run out", "run out of", "ran out of"], c: 3 },
      { q: "She ___ a great idea for the project.", a: ["came up with", "came up", "came with", "came out"], c: 0 }
    ]
  },
  g_chunks_prep: {
    title: "Edatlı Kalıplar", level: "B1",
    tr: "Fiil/sıfat/isim + zorunlu edat: interested in, good at, depend on, afraid of, reason for. Edat yanlışları en yaygın hatalardandır.",
    rules: ["interested in / good at / afraid of", "depend on / rely on / listen to", "reason for / solution to / demand for", "Öbek olarak öğren + kendi cümlende kullan"],
    ex: [["I'm interested in history.", "Tarihle ilgileniyorum."], ["Success depends on hard work.", "Başarı sıkı çalışmaya bağlıdır."]],
    quiz: [
      { q: "She is very good ___ mathematics.", a: ["in", "at", "on", "for"], c: 1 },
      { q: "What is the reason ___ this delay?", a: ["of", "to", "for", "at"], c: 2 }
    ]
  },
  g_formal_register: {
    title: "Akademik / Resmî Dil", level: "B2",
    tr: "Konuşma dili ile akademik dil ayrılır: 'kids' → 'children', 'a lot of' → 'a considerable number of', 'get worse' → 'deteriorate'.",
    rules: ["Kısaltma yok (do not, cannot)", "Rasyonel, nesnel ton; kişisel argo yok", "Nominalizasyon: decide → decision, analyze → analysis", "Eşanlamlı zenginlik: important → significant, crucial, vital"],
    ex: [["The government should implement stricter regulations.", "Hükümet daha katı düzenlemeler uygulamalıdır."], ["Furthermore, the data suggest a correlation.", "Ayrıca veriler bir korelasyon önermektedir."]],
    quiz: [
      { q: "Which is the most formal?", a: ["kids", "children", "little ones", "guys"], c: 1 },
      { q: "Nominalization of 'decide':", a: ["deciding", "decision", "decided", "decisive"], c: 1 }
    ]
  },
  g_relative: {
    title: "İlgi Zamirleri I (who / which / that)", level: "B2",
    tr: "İsimleri niteleyen yan cümleler kurar. Kişi → who/that; nesne → which/that. 'Whose' sahiplik belirtir.",
    rules: ["The man who called you is my uncle.", "The book which I read was amazing.", "that hemşehrimiz değil — belirleyici cümlede who/which/that", "Kimlik bilgisi (non-defining) sadece who/which + virgül"],
    ex: [["The woman who lives next door is a doctor.", "Yan komşuda yaşayan kadın bir doktor."], ["My phone, which is very old, still works.", "Çok eski olan telefonum hâlâ çalışıyor."]],
    quiz: [
      { q: "The girl ___ won the prize is ten.", a: ["which", "who", "whose", "where"], c: 1 },
      { q: "This is the house ___ I grew up.", a: ["which", "who", "where", "whose"], c: 2 }
    ]
  },
  g_passive: {
    title: "Pasif Yapı (be + V3)", level: "B2",
    tr: "Eylemin öne, failin geri plana alındığı yapı. Akademik yazıda çok yaygındır: 'The results were analyzed...'",
    rules: ["Active: They built the bridge. → Passive: The bridge was built.", "be + fiilin 3. hâli (V3)", "by + fail (gerekirse)", "Her zaman için ayrı kalıp: is done, was done, will be done"],
    ex: [["English is spoken all over the world.", "İngilizce dünyanın her yerinde konuşulur."], ["The report was written by my team.", "Rapor benim ekibim tarafından yazıldı."]],
    quiz: [
      { q: "The letters ___ yesterday.", a: ["sent", "were sent", "was sent", "are sent"], c: 1 },
      { q: "This bridge ___ in 1990.", a: ["built", "was built", "is built", "has built"], c: 1 }
    ]
  },
  g_conditionals_1: {
    title: "Conditionals I (0. ve 1. Tip)", level: "B2",
    tr: "0. tip: gerçek-genel durum (If + Present Simple, Present Simple). 1. tip: olası gelecek (If + Present Simple, will + V).",
    rules: ["If you heat water, it boils. (0. tip)", "If it rains, I will stay home. (1. tip)", "'If' cümlesinde 'will' KULLANILMAZ"],
    ex: [["If you study, you will pass.", "Çalışırsan geçersin."], ["If you press this button, the machine stops.", "Bu düğmeye basarsan makine durur."]],
    quiz: [
      { q: "If it ___ tomorrow, we will cancel the picnic.", a: ["will rain", "rains", "rained", "raining"], c: 1 },
      { q: "If you ___ ice, it melts.", a: ["heat", "will heat", "heated", "heating"], c: 0 }
    ]
  },
  g_writing_tenses: {
    title: "Yazıda Zaman Kullanımı", level: "B2",
    tr: "Task 1 grafik anlatımı genelde Present Simple + Present Perfect; Task 2 argüman genelde Present Simple. Geçmiş veriler için Past Simple.",
    rules: ["Grafik şimdi durumu: The chart shows that...", "Değişim: has increased / rose", "Genel argüman: Present Simple", "Tutarlı zaman; karıştırma"],
    ex: [["The graph shows that sales increased sharply.", "Grafik satışların keskin şekilde arttığını gösteriyor."], ["Education plays a vital role in society.", "Eğitim toplumda hayati rol oynar."]],
    quiz: [
      { q: "The chart ___ that exports rose in 2020.", a: ["show", "shows", "showing", "shown"], c: 1 },
      { q: "Water ___ at 100 degrees.", a: ["boiled", "boils", "is boiling", "has boiled"], c: 1 }
    ]
  },
  g_conditionals_2: {
    title: "Conditionals II (2. Tip)", level: "B2",
    tr: "Gerçek olmayan/varsayımsal durumlar: If + Past Simple, would + V. 'If I were you...' öğüt vermek için kullanılır.",
    rules: ["If I were rich, I would travel the world.", "If I were you, I would apologize.", "were her özne için tercih edilir", "Olasılık düşük / hayali durum"],
    ex: [["If she studied harder, she would pass.", "Daha çok çalışsa geçerdi."], ["If I were you, I wouldn't worry.", "Senin yerinde olsam endişelenmezdim."]],
    quiz: [
      { q: "If I ___ you, I would take the job.", a: ["am", "was", "were", "will be"], c: 2 },
      { q: "If he had more time, he ___ learn Japanese.", a: ["will", "would", "did", "had"], c: 1 }
    ]
  },
  g_relative_2: {
    title: "İlgi Zamirleri II (whom / whose / where)", level: "B2",
    tr: "whom nesne konumunda (resmî), whose sahiplik, where yer, when zaman belirtir. 'Preposition + which' akademik yazıda sık.",
    rules: ["The author whose book I read...", "The city where I was born...", "The reason why he left...", "the house in which he lives (resmî)"],
    ex: [["The woman whose son won is here.", "Oğlu kazanan kadın burada."], ["This is the town where I grew up.", "Büyüdüğüm kasaba burası."]],
    quiz: [
      { q: "The man ___ car was stolen reported it.", a: ["who", "whose", "which", "whom"], c: 1 },
      { q: "The year ___ he graduated was 2010.", a: ["where", "who", "when", "whose"], c: 2 }
    ]
  },
  g_passive_perfect: {
    title: "Perfect Pasif", level: "B2",
    tr: "have/has been + V3. 'Yapılmış olmak' — akademik raporlarda sonuç bildirmek için ideal.",
    rules: ["has been done / have been done", "had been done (Past Perfect Passive)", "The data have been collected since May."],
    ex: [["The results have been published.", "Sonuçlar yayınlandı."], ["The room had been cleaned before we arrived.", "Biz varmadan önce oda temizlenmişti."]],
    quiz: [
      { q: "The report ___ already ___ .", a: ["has / been finished", "has / finished", "is / finished", "was / finish"], c: 0 },
      { q: "Mistakes ___ made in the calculation.", a: ["has been", "have been", "was been", "is been"], c: 1 }
    ]
  },
  g_reported: {
    title: "Reported Speech (Dolaylı Anlatım)", level: "B2",
    tr: "Birinin söylediğini aktarırken zaman bir adım geri gider: said (that) + tense backshift. 'will' → 'would', 'is' → 'was'.",
    rules: ["He said, \"I am tired.\" → He said (that) he was tired.", "She said she would come.", "Soru aktarımı: He asked if / whether...", "Emir aktarımı: told me to wait"],
    ex: [["He said that he was busy.", "Meşgul olduğunu söyledi."], ["She told me to sit down.", "Oturmamı söyledi."]],
    quiz: [
      { q: "\"I will help you,\" she said. → She said she ___ help me.", a: ["will", "would", "can", "was"], c: 1 },
      { q: "He asked me where I ___.", a: ["live", "lived", "will live", "am living"], c: 1 }
    ]
  },
  g_wish: {
    title: "wish / if only", level: "B2",
    tr: "Keşke... demek için. Şu an için wish + Past Simple; geçmiş için wish + Past Perfect; gelecek için wish + would.",
    rules: ["I wish I had more time. (şimdi)", "I wish I had studied harder. (geçmiş)", "I wish it would stop raining. (gelecek/durum)", "'if only' daha güçlü duygu"],
    ex: [["I wish I spoke English fluently.", "Keşke akıcı İngilizce konuşsaydım."], ["If only we had left earlier.", "Keşke daha erken çıksaydık."]],
    quiz: [
      { q: "I wish I ___ a car.", a: ["have", "had", "will have", "having"], c: 1 },
      { q: "She wishes she ___ harder last year.", a: ["studied", "had studied", "studies", "would study"], c: 1 }
    ]
  },
  g_perfect_cont: {
    title: "Perfect Continuous Tenses", level: "B2",
    tr: "have/has been + V-ing: geçmişte başlayıp süren eylem. Had been + V-ing: geçmişteki bir noktadan önce süren eylem.",
    rules: ["I have been waiting for an hour.", "They had been living there for years before they moved.", "Süre vurgusu + devam"],
    ex: [["She has been working here since 2018.", "2018'den beri burada çalışıyor."], ["We had been driving for six hours when we stopped.", "Durduğumuzda altı saattir sürüyorduk."]],
    quiz: [
      { q: "I ___ English for three years.", a: ["study", "have been studying", "am studying", "had study"], c: 1 },
      { q: "They ___ waiting for two hours before the bus came.", a: ["have been", "had been", "are", "were being"], c: 1 }
    ]
  },
  g_mixed_cond: {
    title: "Mixed Conditionals", level: "B2",
    tr: "Geçmişteki durumun şimdiki sonucu: If + Past Perfect, would + V. Şimdiki durumun geçmişi: If + Past Simple, would have + V3.",
    rules: ["If I had studied medicine, I would be a doctor now.", "If I were braver, I would have spoken up.", "Zaman dilimlerini karıştırma pratiği"],
    ex: [["If she had taken the job, she would be in London now.", "İşi alsaydı şimdi Londra'da olurdu."]],
    quiz: [
      { q: "If I ___ more sleep, I wouldn't be so tired now.", a: ["got", "had gotten", "get", "will get"], c: 1 },
      { q: "If he weren't so shy, he ___ at the party.", a: ["would have enjoyed", "would enjoy", "will enjoy", "enjoyed"], c: 0 }
    ]
  },
  g_review_1: {
    title: "Genel Tekrar I (Hafta 21)", level: "B2",
    tr: "Zamanlar, kalıplar ve bağlaçların sentezi. Deneme sonrası hatalarını buradaki kurallarla sınıflandır: zaman hatası, yapı hatası, kelime hatası.",
    rules: ["Tutarlı zaman zinciri kur", "Passive/relative ile cümleyi zenginleştir", "Bağlaçlarla argümanı sırala", "Her paragrafta tek ana fikir"],
    ex: [["Although the policy was introduced last year, it has not yet produced the expected results.", "Politika geçen yıl tanıtılmış olmasına rağmen henüz beklenen sonuçları üretmedi."]],
    quiz: [
      { q: "Correct the sentence: 'He has gone to Paris last year.'", a: ["He went to Paris last year.", "He has gone to Paris last year.", "He goes to Paris last year.", "He is gone to Paris last year."], c: 0 },
      { q: "Which is a complex (relative) sentence?", a: ["I like tea.", "The man who called is my uncle.", "Sit down.", "She is tall."], c: 1 }
    ]
  },
  g_review_2: {
    title: "Sınav Sabahı Stratejileri (Hafta 22)", level: "B2",
    tr: "Son hafta: yeni konu değil, otomatikleştirme. Zaman yönetimi, soru tipi stratejileri ve psikolojik hazırlık.",
    rules: ["Süre blokları: Reading 60 dk / Writing 60 dk", "Bilinmeyen kelimede bağlamdan tahmin", "Cümle uzunluğu çeşitliliği (simple + complex)", "Son 5 dk: hata taraması"],
    ex: [["Keep calm and manage your time wisely.", "Sakin kal ve zamanını akıllıca yönet."]],
    quiz: [
      { q: "Bilinmediğiniz bir kelimede ilk yapılacak:", a: ["Soruyu bırakmak", "Bağlamdan tahmin etmek", "Sözlük istemek", "Geçmek"], c: 1 },
      { q: "Writing Task 2 için önerilen süre:", a: ["20 dk", "40 dk", "60 dk", "90 dk"], c: 1 }
    ]
  }
};