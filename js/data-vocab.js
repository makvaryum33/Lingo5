/* ============================================================
   Lingo5 – Kelime Bankası (37 set / ~370 kelime & öbek)
   Format: [İngilizce, Türkçe, Örnek cümle, Örnek anlamı]
   ============================================================ */
"use strict";

const VOCAB = {
  v_greetings: {
    title: "Selamlaşma & Tanışma", level: "A0",
    words: [
      ["hello", "merhaba", "Hello! How are you today?", "Merhaba! Bugün nasılsın?"],
      ["good morning", "günaydın", "Good morning, everyone!", "Günaydın herkese!"],
      ["good evening", "iyi akşamlar", "Good evening, welcome to our show.", "İyi akşamlar, programımıza hoş geldiniz."],
      ["goodbye", "hoşça kal", "Goodbye! See you tomorrow.", "Hoşça kal! Yarın görüşürüz."],
      ["please", "lütfen", "Can you help me, please?", "Bana yardım eder misin, lütfen?"],
      ["thank you", "teşekkür ederim", "Thank you for your help.", "Yardımın için teşekkür ederim."],
      ["sorry", "özür dilerim", "Sorry, I am late.", "Özür dilerim, geç kaldım."],
      ["welcome", "hoş geldin", "Welcome to our school!", "Okulumuza hoş geldin!"],
      ["nice to meet you", "tanıştığıma memnun oldum", "Nice to meet you, I am Ayşe.", "Tanıştığıma memnun oldum, ben Ayşe."],
      ["excuse me", "affedersiniz", "Excuse me, where is the bus stop?", "Affedersiniz, otobüs durağı nerede?"]
    ]
  },
  v_numbers: {
    title: "Sayılar & Zaman", level: "A0",
    words: [
      ["zero", "sıfır", "The score is zero to zero.", "Skor sıfır sıfır."],
      ["ten", "on", "I have ten books.", "On kitabım var."],
      ["twenty", "yirmi", "The class starts at twenty past eight.", "Ders yirmi geçe başlıyor."],
      ["hundred", "yüz", "There are a hundred students.", "Yüz öğrenci var."],
      ["thousand", "bin", "The city has a thousand years of history.", "Şehrin bin yıllık tarihi var."],
      ["first", "ilk, birinci", "This is my first lesson.", "Bu benim ilk dersim."],
      ["second", "ikinci", "Wait a second, please.", "Bir saniye bekle, lütfen."],
      ["half", "yarı, buçuk", "It is half past nine.", "Saat dokuz buçuk."],
      ["hour", "saat (süre)", "The lesson takes one hour.", "Ders bir saat sürüyor."],
      ["minute", "dakika", "Give me five minutes.", "Bana beş dakika ver."]
    ]
  },
  v_routine: {
    title: "Günlük Rutin", level: "A1",
    words: [
      ["wake up", "uyanmak", "I wake up at seven every day.", "Her gün yedide uyanırım."],
      ["get up", "yataktan kalkmak", "I get up and open the window.", "Kalkarım ve pencereyi açarım."],
      ["have breakfast", "kahvaltı yapmak", "We have breakfast together.", "Birlikte kahvaltı yaparız."],
      ["go to work", "işe gitmek", "She goes to work by bus.", "O, işe otobüsle gider."],
      ["take a shower", "duş almak", "I take a shower in the morning.", "Sabah duş alırım."],
      ["brush my teeth", "dişlerimi fırçalamak", "I brush my teeth twice a day.", "Günde iki kez dişlerimi fırçalarım."],
      ["get dressed", "giyinmek", "He gets dressed quickly.", "O hızlıca giyinir."],
      ["study", "ders çalışmak", "I study English every evening.", "Her akşam İngilizce çalışırım."],
      ["have dinner", "akşam yemeği yemek", "We have dinner at eight.", "Sekizde akşam yemeği yeriz."],
      ["go to bed", "yatağa girmek", "I go to bed at eleven.", "On bire doğru yatağa girerim."]
    ]
  },
  v_family: {
    title: "Aile", level: "A1",
    words: [
      ["mother", "anne", "My mother is a teacher.", "Annem öğretmen."],
      ["father", "baba", "My father works in a hospital.", "Babam bir hastanede çalışıyor."],
      ["sister", "kız kardeş", "I have one older sister.", "Bir ablam var."],
      ["brother", "erkek kardeş", "My little brother is five.", "Küçük kardeşim beş yaşında."],
      ["parents", "ebeveynler", "My parents live in Ankara.", "Ailem Ankara'da yaşıyor."],
      ["grandmother", "büyük anne", "My grandmother makes great cookies.", "Büyükannem harika kurabiyeler yapar."],
      ["grandfather", "büyük baba", "My grandfather tells wonderful stories.", "Dedem harika hikâyeler anlatır."],
      ["husband", "koca", "Her husband is an engineer.", "Kocası mühendis."],
      ["wife", "eş, hanım", "His wife is a doctor.", "Eşi doktor."],
      ["children", "çocuklar", "They have three children.", "Üç çocukları var."]
    ]
  },
  v_house: {
    title: "Ev & Eşyalar", level: "A1",
    words: [
      ["kitchen", "mutfak", "I cook dinner in the kitchen.", "Akşam yemeğini mutfakta pişiririm."],
      ["bedroom", "yatak odası", "My bedroom is small but cozy.", "Yatak odam küçük ama rahat."],
      ["bathroom", "banyo", "The bathroom is upstairs.", "Banyo üst katta."],
      ["living room", "oturma odası", "We watch TV in the living room.", "Oturma odasında televizyon izleriz."],
      ["garden", "bahçe", "There are roses in the garden.", "Bahçede güller var."],
      ["window", "pencere", "Please open the window.", "Lütfen pencereyi aç."],
      ["table", "masa", "The keys are on the table.", "Anahtarlar masanın üzerinde."],
      ["fridge", "buzdolabı", "The milk is in the fridge.", "Süt buzdolabında."],
      ["roof", "çatı", "The cat is on the roof.", "Kedi çatının üzerinde."],
      ["door", "kapı", "Someone is at the door.", "Kapıda biri var."]
    ]
  },
  v_food: {
    title: "Yemek & İçecek", level: "A1",
    words: [
      ["bread", "ekmek", "I buy fresh bread every morning.", "Her sabah taze ekmek alırım."],
      ["cheese", "peynir", "Would you like some cheese?", "Biraz peynir ister misin?"],
      ["water", "su", "Can I have a glass of water?", "Bir bardak su alabilir miyim?"],
      ["coffee", "kahve", "I drink coffee without sugar.", "Şekersiz kahve içerim."],
      ["rice", "pirinç", "She cooks rice with vegetables.", "Sebzeli pilav pişirir."],
      ["chicken", "tavuk", "We had chicken for dinner.", "Akşam yemeğinde tavuk yedik."],
      ["vegetable", "sebze", "Vegetables are healthy.", "Sebzeler sağlıklıdır."],
      ["fruit", "meyve", "I eat fruit after lunch.", "Öğle yemeğinden sonra meyve yerim."],
      ["delicious", "lezzetli", "This soup is delicious!", "Bu çorba çok lezzetli!"],
      ["hungry", "aç", "I am very hungry now.", "Şu an çok açım."]
    ]
  },
  v_shopping: {
    title: "Alışveriş", level: "A1",
    words: [
      ["price", "fiyat", "What is the price of this jacket?", "Bu ceketin fiyatı nedir?"],
      ["cheap", "ucuz", "This market is very cheap.", "Bu market çok ucuz."],
      ["expensive", "pahalı", "The shoes are too expensive.", "Ayakkabılar çok pahalı."],
      ["discount", "indirim", "There is a 20% discount today.", "Bugün %20 indirim var."],
      ["size", "beden, boyut", "Do you have this in medium size?", "Bunun orta bedeni var mı?"],
      ["receipt", "fiş", "Can I have the receipt, please?", "Fişi alabilir miyim, lütfen?"],
      ["cash", "nakit", "I want to pay in cash.", "Nakit ödemek istiyorum."],
      ["customer", "müşteri", "The customer is always right.", "Müşteri her zaman haklıdır."],
      ["change", "para üstü", "Here is your change.", "İşte para üstünüz."],
      ["wallet", "cüzdan", "I left my wallet at home.", "Cüzdanımı evde unuttum."]
    ]
  },
  v_city: {
    title: "Şehir & Yerler", level: "A2",
    words: [
      ["hospital", "hastane", "The hospital is next to the park.", "Hastane parkın yanında."],
      ["library", "kütüphane", "I study at the library on weekends.", "Hafta sonları kütüphanede çalışırım."],
      ["museum", "müze", "The museum is free on Mondays.", "Müze pazartesileri ücretsiz."],
      ["train station", "tren istasyonu", "The train station is very busy.", "Tren istasyonu çok kalabalık."],
      ["airport", "havalimanı", "The airport is far from the city center.", "Havalimanı şehir merkezinden uzak."],
      ["bridge", "köprü", "We walked across the bridge.", "Köprünün üzerinden yürüdük."],
      ["square", "meydan", "Let's meet in the town square.", "Şehir meydanında buluşalım."],
      ["crowd", "kalabalık", "A big crowd waited outside.", "Dışarıda büyük bir kalabalık bekledi."],
      ["traffic", "trafik", "The traffic is terrible in the morning.", "Sabahları trafik berbat."],
      ["subway", "metro", "I take the subway to work.", "İşe metroyla giderim."]
    ]
  },
  v_directions: {
    title: "Yön Tarifi", level: "A2",
    words: [
      ["turn left", "sola dön", "Turn left at the traffic lights.", "Trafik ışıklarından sola dön."],
      ["turn right", "sağa dön", "Turn right after the bank.", "Bankadan sonra sağa dön."],
      ["go straight", "düz git", "Go straight for two hundred meters.", "İki yüz metre düz git."],
      ["opposite", "karşısında", "The pharmacy is opposite the hospital.", "Eczane hastanenin karşısında."],
      ["next to", "yanında", "The cafe is next to the library.", "Kafe kütüphanenin yanında."],
      ["between", "arasında", "The bank is between the hotel and the shop.", "Banka otelle dükkanın arasında."],
      ["corner", "köşe", "The restaurant is on the corner.", "Restoran köşede."],
      ["distance", "mesafe", "It is within walking distance.", "Yürüme mesafesinde."],
      ["direction", "yön", "I have no sense of direction.", "Yön duygum yok."],
      ["lost", "kayıp, kaybolmuş", "I am lost. Can you help me?", "Kayboldum. Bana yardım eder misin?"]
    ]
  },
  v_travel: {
    title: "Seyahat", level: "A2",
    words: [
      ["passport", "pasaport", "Don't forget your passport!", "Pasaportunu unutma!"],
      ["ticket", "bilet", "I bought a round-trip ticket.", "Gidiş-dönüş bileti aldım."],
      ["luggage", "bagaj", "My luggage is too heavy.", "Bagajım çok ağır."],
      ["boarding pass", "uçuş kartı", "Please show your boarding pass.", "Lütfen uçuş kartınızı gösterin."],
      ["departure", "kalkış", "The departure time is 9 p.m.", "Kalkış saati akşam 9."],
      ["arrival", "varış", "Check the arrival board.", "Varış panosunu kontrol et."],
      ["delay", "gecikme", "The flight has a two-hour delay.", "Uçuşta iki saatlik gecikme var."],
      ["abroad", "yurt dışında", "I want to study abroad.", "Yurt dışında okumak istiyorum."],
      ["journey", "yolculuk", "The journey takes six hours.", "Yolculuk altı saat sürüyor."],
      ["tourist", "turist", "The city attracts many tourists.", "Şehir birçok turisti cezbediyor."]
    ]
  },
  v_hotel: {
    title: "Konaklama", level: "A2",
    words: [
      ["reservation", "rezervasyon", "I have a reservation under Kara.", "Kara adına bir rezervasyonum var."],
      ["reception", "resepsiyon", "Please ask at the reception.", "Lütfen resepsiyona sorun."],
      ["check in", "giriş yapmak", "We check in at 2 p.m.", "Saat 14:00'te giriş yapıyoruz."],
      ["check out", "çıkış yapmak", "Check out is before noon.", "Çıkış öğleden önce."],
      ["single room", "tek kişilik oda", "I booked a single room.", "Tek kişilik oda ayırttım."],
      ["guest", "misafir", "Our guests arrive tomorrow.", "Misafirlerimiz yarın geliyor."],
      ["key card", "anahtar kart", "Here is your key card.", "İşte anahtar kartınız."],
      ["service", "servis, hizmet", "The service is excellent.", "Hizmet mükemmel."],
      ["complaint", "şikayet", "I want to make a complaint.", "Şikayette bulunmak istiyorum."],
      ["refund", "geri ödeme", "Can I get a refund?", "Geri ödeme alabilir miyim?"]
    ]
  },
  v_health: {
    title: "Sağlık", level: "A2",
    words: [
      ["headache", "baş ağrısı", "I have a terrible headache.", "Korkunç bir baş ağrım var."],
      ["fever", "ateş", "The child has a high fever.", "Çocuğun ateşi çok yüksek."],
      ["cough", "öksürmek", "You should see a doctor about that cough.", "O öksürük için doktora gitmelisin."],
      ["pain", "ağrı", "I feel pain in my back.", "Sırtımda ağrı hissediyorum."],
      ["appointment", "randevu", "I have an appointment at 3 p.m.", "Saat 15:00'te randevum var."],
      ["medicine", "ilaç", "Take this medicine twice a day.", "Bu ilacı günde iki kez al."],
      ["healthy", "sağlıklı", "Eating vegetables keeps you healthy.", "Sebze yemek seni sağlıklı tutar."],
      ["tired", "yorgun", "I feel tired after work.", "İşten sonra yorgun hissediyorum."],
      ["rest", "dinlenmek", "You need to rest for a few days.", "Birkaç gün dinlenmen gerekiyor."],
      ["recover", "iyileşmek", "She recovered quickly after the surgery.", "Ameliyattan sonra çabuk iyileşti."]
    ]
  },
  v_body: {
    title: "Vücut", level: "A2",
    words: [
      ["shoulder", "omuz", "He put his hand on my shoulder.", "Elini omzuma koydu."],
      ["arm", "kol", "She broke her arm last week.", "Geçen hafta kolunu kırdı."],
      ["leg", "bacak", "My legs hurt after the run.", "Koşudan sonra bacaklarım ağrıyor."],
      ["finger", "parmak", "She wears a ring on her finger.", "Parmağında yüzük takıyor."],
      ["head", "kafa, baş", "My head is full of ideas.", "Kafam fikirlerle dolu."],
      ["heart", "kalp", "Running is good for your heart.", "Koşmak kalbin için iyidir."],
      ["stomach", "mide", "My stomach hurts after eating.", "Yedikten sonra midem ağrıyor."],
      ["throat", "boğaz", "I have a sore throat.", "Boğazım ağrıyor."],
      ["back", "sırt", "Sit with your back straight.", "Sırtın dik otur."],
      ["skin", "cilt, deri", "Protect your skin from the sun.", "Cildini güneşten koru."]
    ]
  },
  v_feelings: {
    title: "Duygular", level: "A2",
    words: [
      ["happy", "mutlu", "I am happy to see you.", "Seni gördüğüme mutluyum."],
      ["sad", "üzgün", "She looked sad yesterday.", "Dün üzgün görünüyordu."],
      ["angry", "kızgın", "Don't be angry with me.", "Bana kızma."],
      ["excited", "heyecanlı", "The kids are excited about the trip.", "Çocuklar gezi için heyecanlı."],
      ["nervous", "gergin", "I feel nervous before exams.", "Sınavlardan önce gergin hissederim."],
      ["proud", "gururlu", "I am proud of your success.", "Başarınla gurur duyuyorum."],
      ["afraid", "korkmuş", "I am afraid of darkness.", "Karanlıktan korkarım."],
      ["calm", "sakin", "Stay calm and breathe.", "Sakin kal ve nefes al."],
      ["jealous", "kıskanç", "Don't be jealous of others.", "Başkalarını kıskanma."],
      ["surprised", "şaşırmış", "I was surprised by the news.", "Habere şaşırdım."]
    ]
  },
  v_describing: {
    title: "İnsan & Eşya Tarifi", level: "A2",
    words: [
      ["tall", "uzun boylu", "My brother is very tall.", "Erkek kardeşim çok uzun boylu."],
      ["short", "kısa", "She has short black hair.", "Siyah kısa saçları var."],
      ["friendly", "samimi, dost canlısı", "The local people are very friendly.", "Yerel halk çok dost canlısı."],
      ["strict", "katı", "Our teacher is strict but fair.", "Öğretmenimiz katı ama adil."],
      ["generous", "cömert", "He is generous with his time.", "Zamanı konusunda cömerttir."],
      ["curious", "meraklı", "Cats are curious animals.", "Kediler meraklı hayvanlardır."],
      ["reliable", "güvenilir", "She is a reliable friend.", "O güvenilir bir arkadaş."],
      ["appearance", "görünüş", "Don't judge by appearance.", "Görünüşe göre yargılama."],
      ["personality", "kişilik", "She has a warm personality.", "Sıcak bir kişiliği var."],
      ["similar", "benzer", "Our tastes are very similar.", "Zevklerimiz çok benzer."]
    ]
  },
  v_past: {
    title: "Geçmiş Zaman Sözcükleri", level: "B1",
    words: [
      ["yesterday", "dün", "I met her yesterday afternoon.", "Dün öğleden sonra onunla buluştum."],
      ["ago", "önce", "We moved here two years ago.", "İki yıl önce buraya taşındık."],
      ["suddenly", "aniden", "Suddenly, the lights went out.", "Aniden ışıklar söndü."],
      ["meanwhile", "bu sırada", "Meanwhile, I prepared dinner.", "Bu sırada akşam yemeğini hazırladım."],
      ["eventually", "sonunda", "Eventually, we found the solution.", "Sonunda çözümü bulduk."],
      ["used to", "eskiden ... yapardım", "I used to play football every weekend.", "Her hafta sonu futbol oynardım."],
      ["while", "... iken", "While I was cooking, the phone rang.", "Yemek yaparken telefon çaldı."],
      ["as soon as", "...ır değmez", "As soon as I arrived, it started to rain.", "Varır varmaz yağmur başladı."],
      ["already", "çoktan", "The train had already left.", "Tren çoktan gitmişti."],
      ["yet", "henüz", "Have you finished yet?", "Henüz bitirdin mi?"]
    ]
  },
  v_holidays: {
    title: "Tatil & Anılar", level: "B1",
    words: [
      ["memory", "anı, hafıza", "I have wonderful memories of that trip.", "O geziden harika anılarım var."],
      ["experience", "deneyim", "Living abroad was a great experience.", "Yurt dışında yaşamak harika bir deneyimdi."],
      ["celebrate", "kutlamak", "We celebrated her birthday at a restaurant.", "Doğum gününü bir restoranda kutladık."],
      ["invite", "davet etmek", "They invited us to their wedding.", "Bizi düğünlerine davet ettiler."],
      ["tradition", "gelenek", "It is a family tradition.", "Bu bir aile geleneği."],
      ["unforgettable", "unutulmaz", "It was an unforgettable day.", "Unutulmaz bir gündü."],
      ["crowded", "kalabalık", "The beach was very crowded.", "Plaj çok kalabalıktı."],
      ["scenery", "manzara", "The mountain scenery was amazing.", "Dağ manzarası muhteşemdi."],
      ["relax", "rahatlamak", "I relax by listening to music.", "Müzik dinleyerek rahatlarım."],
      ["adventure", "macera", "The trip was a real adventure.", "Gezi gerçek bir maceraydı."]
    ]
  },
  v_story: {
    title: "Hikâye Anlatımı", level: "B1",
    words: [
      ["plot", "konu, olay örgüsü", "The plot of the film is very interesting.", "Filmin konusu çok ilginç."],
      ["character", "karakter", "The main character is very brave.", "Ana karakter çok cesur."],
      ["describe", "tanımlamak", "Can you describe your best friend?", "En iyi arkadaşını tarif edebilir misin?"],
      ["mention", "bahsetmek", "She mentioned your name.", "Senin adından bahsetti."],
      ["explain", "açıklamak", "Let me explain what happened.", "Ne olduğunu açıklayayım."],
      ["complain", "şikayet etmek", "He complained about the noise.", "Gürültüden şikayet etti."],
      ["suggest", "önermek", "I suggest taking a break.", "Mola vermeyi öneriyorum."],
      ["promise", "söz vermek", "I promise to call you tomorrow.", "Yarın seni arayacağıma söz veriyorum."],
      ["refuse", "reddetmek", "She refused the offer politely.", "Teklifi kibarca reddetti."],
      ["realize", "fark etmek", "I realized my mistake later.", "Hatamı sonra fark ettim."]
    ]
  },
  v_emotions: {
    title: "Gelişmiş Duygu İfadeleri", level: "B1",
    words: [
      ["anxious", "endişeli", "I feel anxious about the results.", "Sonuçlar konusunda endişeliyim."],
      ["disappointed", "hayal kırıklığına uğramış", "I was disappointed with the service.", "Hizmetten hayal kırıklığına uğradım."],
      ["grateful", "minnettar", "I am grateful for your support.", "Desteğin için minnettarım."],
      ["confident", "kendine güvenen", "She feels confident about the exam.", "Sınav konusunda kendine güveniyor."],
      ["overwhelmed", "bunalmış", "I felt overwhelmed by the work.", "İşin altında ezilmiş hissettim."],
      ["relieved", "rahatlamış", "I was relieved to hear the news.", "Haberi duyunca rahatladım."],
      ["embarrassed", "utanmış", "I felt embarrassed by my mistake.", "Hatamdan utandım."],
      ["frustrated", "hayal kırıklığı, bıkkın", "He gets frustrated with slow internet.", "Yavaş internetten bıkkınlık duyar."],
      ["motivated", "motive olmuş", "I feel motivated to study more.", "Daha çok çalışmak için motive hissediyorum."],
      ["proud", "gurur duyan", "We are proud of our team.", "Takımımızla gurur duyuyoruz."]
    ]
  },
  v_experience: {
    title: "Deneyim & Başarı", level: "B1",
    words: [
      ["achieve", "başarmak, elde etmek", "She achieved her goal in one year.", "Hedefine bir yılda ulaştı."],
      ["improve", "geliştirmek", "I want to improve my English.", "İngilizcemi geliştirmek istiyorum."],
      ["challenge", "meydan okuma, zorlık", "Learning a language is a rewarding challenge.", "Dil öğrenmek ödüllendirici bir zorluktur."],
      ["opportunity", "fırsat", "This job is a great opportunity.", "Bu iş harika bir fırsat."],
      ["effort", "çaba", "Success requires effort.", "Başarı çaba gerektirir."],
      ["goal", "hedef", "My goal is to pass the IELTS exam.", "Hedefim IELTS sınavını geçmek."],
      ["progress", "ilerleme", "You have made great progress.", "Büyük ilerleme kaydettin."],
      ["fail", "başarısız olmak", "He failed the first time, but he tried again.", "İlk seferde başarısız oldu ama tekrar denedi."],
      ["succeed", "başarmak", "Hard work helps you succeed.", "Sıkı çalışmak başarıya götürür."],
      ["determination", "kararlılık", "Her determination impressed everyone.", "Onun kararlılığı herkesi etkiledi."]
    ]
  },
  v_life: {
    title: "Hayat & Toplum", level: "B1",
    words: [
      ["childhood", "çocukluk", "I spent my childhood in a village.", "Çocukluğumu bir köyde geçirdim."],
      ["generation", "kuşak", "The younger generation uses technology easily.", "Genç kuşak teknolojiyi kolayca kullanır."],
      ["relationship", "ilişki", "Communication is important in a relationship.", "İlişkide iletişim önemlidir."],
      ["responsibility", "sorumluluk", "Taking care of pets teaches responsibility.", "Evcil hayvanlara bakmak sorumluluk öğretir."],
      ["independence", "bağımsızlık", "Living alone gives you independence.", "Tek başına yaşamak bağımsızlık verir."],
      ["society", "toplum", "Education shapes society.", "Eğitim toplumu şekillendirir."],
      ["citizen", "vatandaş", "Every citizen has rights and duties.", "Her vatandaşın hakları ve görevleri vardır."],
      ["community", "topluluk, mahalle", "The community organized a festival.", "Topluluk bir festival düzenledi."],
      ["volunteer", "gönüllü", "She volunteers at an animal shelter.", "Bir hayvan barınağında gönüllü çalışır."],
      ["donate", "bağışlamak", "They donated books to the library.", "Kütüphaneye kitap bağışladılar."]
    ]
  },
  v_opinions: {
    title: "Fikir İfadeleri", level: "B1",
    words: [
      ["in my opinion", "benim görüşüme göre", "In my opinion, remote work is more productive.", "Bence uzaktan çalışma daha verimli."],
      ["I believe that", "...duğuna inanıyorum", "I believe that education changes lives.", "Eğitimin hayatları değiştirdiğine inanıyorum."],
      ["from my perspective", "benim bakış açımdan", "From my perspective, the plan is realistic.", "Benim açımdan plan gerçekçi."],
      ["as far as I know", "bildiğim kadarıyla", "As far as I know, the meeting is at noon.", "Bildiğim kadarıyla toplantı öğlen."],
      ["I strongly agree", "güçlü şekilde katılıyorum", "I strongly agree with this idea.", "Bu fikre kesinlikle katılıyorum."],
      ["I disagree because", "...dığı için katılmıyorum", "I disagree because the costs are too high.", "Maliyetler çok yüksek olduğu için katılmıyorum."],
      ["on the other hand", "diğer yandan", "On the other hand, it saves time.", "Öte yandan zaman kazandırıyor."],
      ["it seems to me that", "bana öyle geliyor ki", "It seems to me that he is right.", "Bana öyle geliyor ki o haklı."],
      ["argue", "savunmak, tartışmak", "She argues that money is not everything.", "Paranın her şey olmadığını savunuyor."],
      ["consider", "değerlendirmek", "We should consider all options.", "Tüm seçenekleri değerlendirmeliyiz."]
    ]
  },
  v_society: {
    title: "Güncel Konular", level: "B1",
    words: [
      ["environment", "çevre", "We must protect the environment.", "Çevreyi korumalıyız."],
      ["pollution", "kirlilik", "Air pollution is a serious problem.", "Hava kirliliği ciddi bir sorundur."],
      ["climate change", "iklim değişikliği", "Climate change affects everyone.", "İklim değişikliği herkesi etkiler."],
      ["renewable energy", "yenilenebilir enerji", "Renewable energy reduces emissions.", "Yenilenebilir enerji emisyonları azaltır."],
      ["education", "eğitim", "Education should be accessible to all.", "Eğitim herkese açık olmalı."],
      ["healthcare", "sağlık hizmeti", "Healthcare costs are rising.", "Sağlık hizmeti maliyetleri artıyor."],
      ["unemployment", "işsizlik", "Unemployment affects young people.", "İşsizlik gençleri etkiliyor."],
      ["technology", "teknoloji", "Technology changes our daily lives.", "Teknoloji günlük hayatımızı değiştiriyor."],
      ["social media", "sosyal medya", "Social media has both advantages and disadvantages.", "Sosyal medyanın hem avantajları hem dezavantajları var."],
      ["research", "araştırma", "Research shows that exercise improves memory.", "Araştırmalar egzersizin hafızayı geliştirdiğini gösteriyor."]
    ]
  },
  v_chunks1: {
    title: "Günlük Öbekler I (do/make/take/have)", level: "B1",
    words: [
      ["make a decision", "karar vermek", "I need to make a decision today.", "Bugün bir karar vermem gerekiyor."],
      ["do homework", "ödev yapmak", "I do my homework after dinner.", "Ödevimi akşam yemeğinden sonra yaparım."],
      ["take a photo", "fotoğraf çekmek", "Can you take a photo of us?", "Bizim fotoğrafımızı çeker misin?"],
      ["have a rest", "dinlenmek", "Let's have a rest for ten minutes.", "On dakika dinlenelim."],
      ["make a mistake", "hata yapmak", "Everyone makes mistakes.", "Herkes hata yapar."],
      ["take part in", "katılmak", "She took part in the competition.", "Yarışmaya katıldı."],
      ["do your best", "elinden geleni yapmak", "Just do your best in the exam.", "Sınavda elinden geleni yap."],
      ["make friends", "arkadaş edinmek", "It is easy to make friends here.", "Burada arkadaş edinmek kolay."],
      ["take a break", "mola vermek", "We take a break at noon.", "Öğlen mola veririz."],
      ["have fun", "eğlenmek", "We had fun at the party.", "Partide eğlendik."]
    ]
  },
  v_chunks2: {
    title: "Günlük Öbekler II (phrasal verbs)", level: "B1",
    words: [
      ["give up", "vazgeçmek", "Never give up on your dreams.", "Hayallerinden asla vazgeçme."],
      ["look forward to", "dört gözle beklemek", "I look forward to hearing from you.", "Sizden haber almayı dört gözle bekliyorum."],
      ["put off", "ertelemek", "Don't put off the work until tomorrow.", "İşi yarına erteleme."],
      ["figure out", "çözmek, anlamak", "I can't figure out this problem.", "Bu problemi çözemiyorum."],
      ["run out of", "tükenmek", "We ran out of milk this morning.", "Bu sabah sütümüz tükendi."],
      ["look after", "bakmak", "She looks after her grandmother.", "Büyükannesine bakıyor."],
      ["turn down", "reddetmek", "He turned down the job offer.", "İş teklifini reddetti."],
      ["get along with", "iyi geçinmek", "I get along with my colleagues.", "Meslektaşlarımla iyi geçinirim."],
      ["come up with", "bulmak (fikir)", "She came up with a great idea.", "Harika bir fikir buldu."],
      ["carry on", "devam etmek", "Please carry on with your work.", "Lütfen çalışmanıza devam edin."]
    ]
  },
  v_work: {
    title: "İş & Kariyer", level: "B2",
    words: [
      ["salary", "maaş", "They offered a competitive salary.", "Rekabetçi bir maaş teklif ettiler."],
      ["deadline", "son teslim tarihi", "The deadline is next Friday.", "Son teslim tarihi gelecek cuma."],
      ["colleague", "meslektaş", "My colleagues are very supportive.", "Meslektaşlarım çok destekleyici."],
      ["achievement", "başarı", "This project is her greatest achievement.", "Bu proje onun en büyük başarısı."],
      ["promotion", "terfi", "He got a promotion last month.", "Geçen ay terfi aldı."],
      ["internship", "staj", "She did an internship at a bank.", "Bir bankada staj yaptı."],
      ["qualification", "yeterlilik, nitelik", "You need qualifications for this role.", "Bu rol için niteliklere ihtiyacın var."],
      ["schedule", "program, takvim", "My schedule is very busy this week.", "Bu hafta programım çok yoğun."],
      ["negotiate", "müzakere etmek", "We negotiated a better price.", "Daha iyi bir fiyat için müzakere ettik."],
      ["efficient", "verimli", "This method is more efficient.", "Bu yöntem daha verimli."]
    ]
  },
  v_technology: {
    title: "Teknoloji & İletişim", level: "B2",
    words: [
      ["device", "cihaz", "This device is very useful.", "Bu cihaz çok kullanışlı."],
      ["artificial intelligence", "yapay zekâ", "Artificial intelligence is transforming education.", "Yapay zekâ eğitimi dönüştürüyor."],
      ["privacy", "gizlilik", "Online privacy is a major concern.", "Çevrimiçi gizlilik büyük bir endişe."],
      ["update", "güncelleme", "The app needs an update.", "Uygulamanın bir güncellemeye ihtiyacı var."],
      ["convenient", "elverişli, kolay", "Online banking is very convenient.", "İnternet bankacılığı çok kolay."],
      ["accessible", "erişilebilir", "The website is accessible to everyone.", "Web sitesi herkese açıktır."],
      ["innovation", "yenilik", "Innovation drives economic growth.", "Yenilik ekonomik büyümeyi sağlar."],
      ["data", "veri", "The data shows a clear trend.", "Veriler net bir eğilim gösteriyor."],
      ["communication", "iletişim", "Communication skills are essential.", "İletişim becerileri çok önemlidir."],
      ["virtual", "sanal", "We attended a virtual conference.", "Sanal bir konferansa katıldık."]
    ]
  },
  v_awl1: {
    title: "Akademik Kelime I (AWL)", level: "B2",
    words: [
      ["analyze", "analiz etmek", "The report analyzes market trends.", "Rapor pazar eğilimlerini analiz ediyor."],
      ["significant", "önemli, kayda değer", "There was a significant increase in sales.", "Satışlarda önemli bir artış oldu."],
      ["indicate", "göstermek, belirtmek", "The results indicate a clear improvement.", "Sonuçlar net bir iyileşme gösteriyor."],
      ["establish", "kurmak, belirlemek", "The study establishes a link between sleep and memory.", "Çalışma uyku ile hafıza arasında bir bağ kuruyor."],
      ["factor", "faktör, etken", "Cost is an important factor.", "Maliyet önemli bir etkendir."],
      ["economy", "ekonomi", "The economy is growing slowly.", "Ekonomi yavaş yavaş büyüyor."],
      ["interpret", "yorumlamak", "Experts interpret the data differently.", "Uzmanlar verileri farklı yorumluyor."],
      ["occur", "meydana gelmek", "The accident occurred at midnight.", "Kaza gece yarısı meydana geldi."],
      ["policy", "politika", "The new policy affects all employees.", "Yeni politika tüm çalışanları etkiler."],
      ["structure", "yapı, yapılandırmak", "The essay has a clear structure.", "Makalenin net bir yapısı var."]
    ]
  },
  v_awl2: {
    title: "Akademik Kelime II (AWL)", level: "B2",
    words: [
      ["consequence", "sonuç", "Climate change has serious consequences.", "İklim değişikliğinin ciddi sonuçları var."],
      ["assume", "varsaymak", "We cannot assume that everyone agrees.", "Herkesin katıldığını varsayamayız."],
      ["concept", "kavram", "The concept is hard to understand.", "Kavramı anlamak zor."],
      ["evidence", "kanıt", "There is strong evidence for this theory.", "Bu teori için güçlü kanıtlar var."],
      ["research", "araştırma yapmak", "They researched the topic for two years.", "Konu üzerinde iki yıl araştırma yaptılar."],
      ["context", "bağlam", "Words change meaning in context.", "Kelimeler bağlamda anlam değiştirir."],
      ["method", "yöntem", "This method saves a lot of time.", "Bu yöntem çok zaman kazandırıyor."],
      ["percent", "yüzde", "Prices rose by ten percent.", "Fiyatlar yüzde on arttı."],
      ["require", "gerektirmek", "The job requires patience.", "İş sabır gerektirir."],
      ["similar", "benzer", "The two theories are similar.", "İki teori birbirine benzer."]
    ]
  },
  v_advanced: {
    title: "Sofistike İfadeler", level: "B2",
    words: [
      ["nevertheless", "yine de, bununla birlikte", "It was expensive; nevertheless, we bought it.", "Pahalıydı; yine de onu satın aldık."],
      ["significant impact", "önemli etki", "The policy had a significant impact on society.", "Politikanın toplum üzerinde önemli etkisi oldu."],
      ["take into account", "dikkate almak", "We must take all factors into account.", "Tüm faktörleri dikkate almalıyız."],
      ["play a crucial role", "hayati rol oynamak", "Teachers play a crucial role in education.", "Öğretmenler eğitimde hayati rol oynar."],
      ["there is no denying that", "...inkâr edilemez", "There is no denying that technology helps us.", "Teknolojinin bize yardım ettiği inkâr edilemez."],
      ["shed light on", "ışık tutmak, açıklığa kavuşturmak", "The research sheds light on this issue.", "Araştırma bu konuya ışık tutuyor."],
      ["a growing number of", "artan sayıda", "A growing number of people work remotely.", "Artan sayıda insan uzaktan çalışıyor."],
      ["in terms of", "...bakımından", "In terms of cost, this option is better.", "Maliyet bakımından bu seçenek daha iyi."],
      ["bear in mind", "aklında tutmak", "Bear in mind that the test is timed.", "Sınırın süreli olduğunu aklında tut."],
      ["pros and cons", "artıları ve eksileri", "Let's discuss the pros and cons.", "Artıları ve eksileri tartışalım."]
    ]
  },
  v_connectors: {
    title: "Bağlaçlar & Geçiş İfadeleri", level: "B2",
    words: [
      ["however", "ancak", "It is cheap; however, the quality is low.", "Ucuz; ancak kalitesi düşük."],
      ["therefore", "bu nedenle", "He was ill; therefore, he stayed home.", "Hastaydı; bu yüzden evde kaldı."],
      ["moreover", "dahası", "The plan is cheap and, moreover, effective.", "Plan ucuz ve dahası etkili."],
      ["in addition", "ek olarak", "In addition, we need more time.", "Ek olarak daha fazla zamana ihtiyacımız var."],
      ["on the contrary", "aksine", "It is not hard; on the contrary, it is fun.", "Zor değil; aksine eğlenceli."],
      ["as a result", "sonuç olarak", "It rained heavily; as a result, the match was cancelled.", "Yoğun yağmur yağdı; sonuç olarak maç iptal edildi."],
      ["for instance", "örneğin", "Some fruits, for instance oranges, are rich in vitamin C.", "Bazı meyveler, örneğin portakal, C vitamini bakımından zengindir."],
      ["in conclusion", "sonuç olarak", "In conclusion, I support this project.", "Sonuç olarak bu projeyi destekliyorum."],
      ["although", "rağmen, -mesine rağmen", "Although it was late, we continued.", "Geç olmasına rağmen devam ettik."],
      ["meanwhile", "bu sırada", "I cooked; meanwhile, he set the table.", "Ben yemek yaptım; bu sırada o masayı kurdu."]
    ]
  },
  v_exam1: {
    title: "Sınav Kelimeleri – Temel", level: "B2",
    words: [
      ["accurate", "doğru, kesin", "Your answer is accurate.", "Cevabın doğru."],
      ["brief", "kısa, öz", "Please keep your answer brief.", "Lütfen cevabını kısa tut."],
      ["clarify", "açıklığa kavuşturmak", "Could you clarify the question?", "Soruyu açıklayabilir misiniz?"],
      ["compare", "karşılaştırmak", "Compare the two approaches.", "İki yaklaşımı karşılaştırın."],
      ["contrast", "tezat oluşturmak", "The results contrast with earlier findings.", "Sonuçlar önceki bulgularla tezat oluşturuyor."],
      ["define", "tanımlamak", "Define the key term.", "Anahtar terimi tanımlayın."],
      ["demonstrate", "göstermek, kanıtlamak", "The graph demonstrates a steady rise.", "Grafik istikrarlı bir artış gösteriyor."],
      ["estimate", "tahmin etmek", "Estimate the total cost.", "Toplam maliyeti tahmin edin."],
      ["evident", "açık, belli", "It is evident that the plan worked.", "Planın işe yaradığı açık."],
      ["illustrate", "örneklemek, resmetmek", "The chart illustrates sales data.", "Grafik satış verilerini örnekliyor."]
    ]
  },
  v_exam2: {
    title: "Sınav Kelimeleri – Orta", level: "B2",
    words: [
      ["implication", "ima, sonuç", "What are the implications of this change?", "Bu değişikliğin sonuçları nelerdir?"],
      ["justify", "haklı çıkarmak", "Justify your answer with examples.", "Cevabını örneklerle haklı çıkar."],
      ["objective", "nesnel", "Try to be objective in your evaluation.", "Değerlendirmende nesnel olmaya çalış."],
      ["perspective", "bakış açısı", "Consider the issue from a global perspective.", "Konuyu küresel bir bakış açısıyla değerlendir."],
      ["phenomenon", "olgu", "This phenomenon has been widely studied.", "Bu olgu geniş çapta incelenmiştir."],
      ["predominantly", "ağırlıklı olarak", "The participants were predominantly female.", "Katılımcılar ağırlıklı olarak kadındı."],
      ["prevalent", "yaygın", "The practice is prevalent in many cultures.", "Bu uygulama birçok kültürde yaygındır."],
      ["subsequent", "sonraki", "Subsequent studies confirmed the result.", "Sonraki çalışmalar sonucu doğruladı."],
      ["undergo", "geçirmek", "The system underwent major changes.", "Sistem büyük değişikliklerden geçti."],
      ["whereas", "oysa, -e karşılık", "He likes tea, whereas she prefers coffee.", "O çayı sever, oysa o kahveyi tercih eder."]
    ]
  },
  v_exam3: {
    title: "Sınav Kelimeleri – İleri", level: "B2",
    words: [
      ["advocate", "savunmak, savunucu", "Many experts advocate early education.", "Birçok uzman erken eğitimi savunuyor."],
      ["alleviate", "hafifletmek", "The policy aims to alleviate poverty.", "Politika yoksulluğu hafifletmeyi amaçlıyor."],
      ["coherent", "tutarlı", "Write a coherent argument.", "Tutarlı bir argüman yaz."],
      ["comprehensive", "kapsamlı", "The report provides a comprehensive overview.", "Rapor kapsamlı bir genel bakış sunuyor."],
      ["controversial", "tartışmalı", "The topic is highly controversial.", "Konu son derece tartışmalı."],
      ["exacerbate", "kötüleştirmek", "Traffic congestion exacerbates pollution.", "Trafik sıkışıklığı kirliliği kötüleştiriyor."],
      ["feasible", "uygulanabilir", "The plan is technically feasible.", "Plan teknik olarak uygulanabilir."],
      ["inherent", "doğasında olan", "There are risks inherent in the process.", "Sürecin doğasında riskler vardır."],
      ["mitigate", "azaltmak, hafifletmek", "Trees help mitigate climate change.", "Ağaçlar iklim değişikliğini hafifletmeye yardımcı olur."],
      ["sustainable", "sürdürülebilir", "We need sustainable solutions.", "Sürdürülebilir çözümlere ihtiyacımız var."]
    ]
  },
  v_exam4: {
    title: "Sınav Kalıpları & Sınav Günü", level: "B2",
    words: [
      ["time management", "zaman yönetimi", "Time management is crucial in exams.", "Sınavlarda zaman yönetimi çok önemlidir."],
      ["skim", "hızlı göz atmak", "Skim the passage for the main idea.", "Ana fikir için pasaja hızlı göz at."],
      ["scan", "taramak", "Scan the text for specific details.", "Belirli ayrıntılar için metni tara."],
      ["eliminate", "elemek", "Eliminate the obviously wrong options.", "Açıkça yanlış seçenekleri ele."],
      ["allocate", "tahsis etmek", "Allocate 40 minutes to Task 2.", "Görev 2'ye 40 dakika ayır."],
      ["proofread", "son okumayı yapmak", "Always proofread your essay.", "Kompozisyonuna her zaman son okumayı yap."],
      ["cohesion", "tutarlılık, bağ", "Cohesion improves your writing score.", "Tutarlılık yazma puanını artırır."],
      ["paraphrase", "başka türlü ifade etmek", "Paraphrase the question in your introduction.", "Girişte soruyu başka türlü ifade et."],
      ["relevant", "ilgili", "Give relevant examples only.", "Yalnızca ilgili örnekler ver."],
      ["under timed conditions", "süreli koşullar altında", "Practice under timed conditions.", "Süreli koşullar altında pratik yap."]
    ]
  },
  v_review1: {
    title: "Genel Tekrar I – Yüksek Frekans", level: "B2",
    words: [
      ["accomplish", "başarmak", "We accomplished the task on time.", "Görevi zamanında başardık."],
      ["adapt", "uyum sağlamak", "Children adapt to new schools quickly.", "Çocuklar yeni okullara hızla uyum sağlar."],
      ["contribute", "katkıda bulunmak", "Sleep contributes to better memory.", "Uyku daha iyi hafızaya katkıda bulunur."],
      ["emphasize", "vurgulamak", "I want to emphasize one important point.", "Önemli bir noktayı vurgulamak istiyorum."],
      ["enhance", "geliştirmek, artırmak", "Reading enhances your vocabulary.", "Okumak kelime dağarcığını geliştirir."],
      ["inevitable", "kaçınılmaz", "Some mistakes are inevitable.", "Bazı hatalar kaçınılmazdır."],
      ["implement", "uygulamak", "The school implemented a new program.", "Okul yeni bir program uyguladı."],
      ["motivate", "motive etmek", "Good teachers motivate their students.", "İyi öğretmenler öğrencilerini motive eder."],
      ["sustain", "sürdürmek", "It is hard to sustain motivation.", "Motivasyonu sürdürmek zordur."],
      ["reluctant", "isteksiz", "He was reluctant to speak in public.", "Toplum önünde konuşmaya isteksizdi."]
    ]
  },
  v_review2: {
    title: "Genel Tekrar II – Sınav Sabahı", level: "B2",
    words: [
      ["be about to", "üzerine olmak", "The exam is about to start.", "Sınav başlamak üzere."],
      ["keep calm", "sakin kalmak", "Keep calm and read the instructions.", "Sakin kal ve talimatları oku."],
      ["double-check", "iki kez kontrol etmek", "Double-check your answers.", "Cevaplarını iki kez kontrol et."],
      ["run out of time", "zamanı dolmak", "Don't run out of time in Task 2.", "Görev 2'de zamanın bitmesin."],
      ["make sense", "anlamlı olmak", "Make sure every sentence makes sense.", "Her cümlenin anlamlı olduğundan emin ol."],
      ["stick to the point", "konuya bağlı kalmak", "Stick to the point in your essay.", "Kompozisyonda konuya bağlı kal."],
      ["well-structured", "iyi yapılandırılmış", "A well-structured essay scores higher.", "İyi yapılandırılmış kompozisyon daha yüksek puan alır."],
      ["first draft", "ilk taslak", "Write your first draft quickly.", "İlk taslağını hızlıca yaz."],
      ["revise", "gözden geçirmek", "Revise your grammar before submitting.", "Göndermeden önce dilbilgini gözden geçir."],
      ["confidence", "güven", "Confidence comes with preparation.", "Güven hazırlıkla gelir."]
    ]
  }
};