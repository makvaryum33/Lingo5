/* ============================================================
   Lingo5 – Gölgeleme (Shadowing) Diyalogları
   Her diyalog: seviye, bağlam, en/tr satırlar
   ============================================================ */
"use strict";

const DIALOGS = [
  {
    id: "d_meeting", title: "Tanışma & Selamlaşma", level: "A0", phase: 1,
    lines: [
      { en: "Hello! My name is Mehmet. Nice to meet you.", tr: "Merhaba! Benim adım Mehmet. Tanıştığıma memnun oldum." },
      { en: "Hi Mehmet! I'm Anna. Where are you from?", tr: "Merhaba Mehmet! Ben Anna. Nerelisin?" },
      { en: "I'm from Turkey. I live in Istanbul.", tr: "Türkiye'den geliyorum. İstanbul'da yaşıyorum." },
      { en: "Oh, wonderful! How old are you?", tr: "Harika! Kaç yaşındasın?" },
      { en: "I'm twenty-five years old. What do you do?", tr: "Yirmi beş yaşındayım. Ne iş yapıyorsun?" },
      { en: "I'm a student. It was nice meeting you!", tr: "Öğrenciyim. Tanışmak çok güzeldi!" }
    ]
  },
  {
    id: "d_coffee", title: "Kafede Sipariş", level: "A1", phase: 1,
    lines: [
      { en: "Good morning! What would you like?", tr: "Günaydın! Ne alırsınız?" },
      { en: "I'd like a medium coffee with milk, please.", tr: "Orta boy sütlü bir kahve alabilir miyim?" },
      { en: "Would you like anything to eat?", tr: "Yemek için bir şey ister misiniz?" },
      { en: "Yes, a cheese sandwich, please. How much is it?", tr: "Evet, peynirli bir sandviç lütfen. Ne kadar?" },
      { en: "That's 120 liras altogether.", tr: "Toplam 120 lira." },
      { en: "Here you are. Thank you!", tr: "Buyurun. Teşekkürler!" }
    ]
  },
  {
    id: "d_shopping", title: "Alışveriş & Pazarlık", level: "A1", phase: 1,
    lines: [
      { en: "Excuse me, how much is this jacket?", tr: "Affedersiniz, bu ceket ne kadar?" },
      { en: "It's 500 liras. It's on sale this week.", tr: "500 lira. Bu hafta indirimde." },
      { en: "That's a bit expensive. Can you give a discount?", tr: "Biraz pahalı. İndirim yapabilir misiniz?" },
      { en: "I can make it 450 for you.", tr: "Sizin için 450 yapabilirim." },
      { en: "Great! I'll take it. Can I pay by card?", tr: "Harika! Alıyorum. Kartla ödeyebilir miyim?" },
      { en: "Of course. Here's your receipt.", tr: "Tabii ki. Buyurun fişiniz." }
    ]
  },
  {
    id: "d_directions", title: "Yol Tarifi", level: "A1", phase: 2,
    lines: [
      { en: "Excuse me, how can I get to the train station?", tr: "Affedersiniz, tren istasyonuna nasıl gidebilirim?" },
      { en: "Go straight ahead and turn left at the traffic lights.", tr: "Düz gidin ve trafik ışıklarından sola dönün." },
      { en: "Is it far from here?", tr: "Buradan uzak mı?" },
      { en: "No, it's about ten minutes on foot.", tr: "Hayır, yürüyerek yaklaşık on dakika." },
      { en: "Can I take a bus?", tr: "Otobüse binebilir miyim?" },
      { en: "Yes, take bus number 34. It stops in front of the station.", tr: "Evet, 34 numaralı otobüse binin. İstasyonun önünde durur." }
    ]
  },
  {
    id: "d_hotel", title: "Otele Giriş", level: "A2", phase: 2,
    lines: [
      { en: "Good evening. I have a reservation under the name Yılmaz.", tr: "İyi akşamlar. Yılmaz adına bir rezervasyonum var." },
      { en: "Let me check... Yes, a double room for three nights.", tr: "Kontrol edeyim... Evet, üç gecelik çift kişilik oda." },
      { en: "Does the room have a sea view?", tr: "Odanın deniz manzarası var mı?" },
      { en: "Yes, it does. Breakfast is included from 7 to 10 a.m.", tr: "Evet var. Kahvaltı sabah 7'den 10'a kadar dahildir." },
      { en: "Perfect. What time is check-out?", tr: "Mükemmel. Çıkış saati nedir?" },
      { en: "Check-out is at noon. Here is your key card.", tr: "Çıkış öğlen 12'de. Buyurun anahtar kartınız." }
    ]
  },
  {
    id: "d_doctor", title: "Doktor Randevusu", level: "A2", phase: 2,
    lines: [
      { en: "Good morning. What seems to be the problem?", tr: "Günaydın. Sorun nedir?" },
      { en: "I have a sore throat and a headache.", tr: "Boğaz ağrım ve baş ağrım var." },
      { en: "How long have you had these symptoms?", tr: "Bu belirtiler ne zamandır var?" },
      { en: "Since yesterday evening. I also feel very tired.", tr: "Dün akşamdan beri. Ayrıca çok yorgun hissediyorum." },
      { en: "It sounds like a cold. Rest and drink plenty of fluids.", tr: "Soğuk algınlığı gibi görünüyor. Dinlenin ve bol sıvı tüketin." },
      { en: "Should I take any medicine?", tr: "Herhangi bir ilaç almalı mıyım?" }
    ]
  },
  {
    id: "d_interview", title: "İş Görüşmesi", level: "B1", phase: 4,
    lines: [
      { en: "Please, have a seat. Tell me about yourself.", tr: "Lütfen oturun. Kendinizden bahsedin." },
      { en: "I graduated from university last year and I have internship experience.", tr: "Geçen yıl üniversiteden mezun oldum ve staj deneyimim var." },
      { en: "Why do you want to work here?", tr: "Neden burada çalışmak istiyorsunuz?" },
      { en: "Because your company is a leader in its field and I want to grow professionally.", tr: "Çünkü şirketiniz alanında lider ve profesyonel olarak gelişmek istiyorum." },
      { en: "What are your strengths?", tr: "Güçlü yönleriniz nelerdir?" },
      { en: "I am organized, motivated, and I work well in a team.", tr: "Düzenliyim, motiveyim ve takımda iyi çalışırım." }
    ]
  },
  {
    id: "d_opinion", title: "Fikir Tartışma", level: "B1", phase: 3,
    lines: [
      { en: "In my opinion, online education is the future.", tr: "Bence çevrimiçi eğitim gelecektir." },
      { en: "I'm not sure I agree. Students need face-to-face interaction.", tr: "Katıldığımdan emin değilim. Öğrencilerin yüz yüze etkileşime ihtiyacı var." },
      { en: "That's a good point, but online courses are more flexible.", tr: "Bu iyi bir nokta ama çevrimiçi kurslar daha esnek." },
      { en: "However, not everyone has access to the internet.", tr: "Ancak herkesin internete erişimi yok." },
      { en: "You're right. Perhaps a hybrid system would work best.", tr: "Haklısın. Belki de hibrit bir sistem en iyi sonucu verir." },
      { en: "I completely agree with you on that.", tr: "Bu konuda sana tamamen katılıyorum." }
    ]
  },
  {
    id: "d_phone", title: "Telefonda Görüşme", level: "B1", phase: 3,
    lines: [
      { en: "Hello, may I speak to Mr. Demir, please?", tr: "Merhaba, Bay Demir ile görüşebilir miyim?" },
      { en: "Speaking. Who is calling?", tr: "Buyurun, ben dinliyorum. Kim arıyor?" },
      { en: "This is Selin from ABC Company. Do you have a moment?", tr: "ABC Şirketinden Selin. Biraz vaktiniz var mı?" },
      { en: "Sure. What is it regarding?", tr: "Tabii. Ne hakkında?" },
      { en: "I'm calling about the meeting on Friday.", tr: "Cuma günkü toplantı hakkında arıyorum." },
      { en: "Of course. Let's reschedule it for Monday morning.", tr: "Tabii ki. Onu pazartesi sabahına erteleyelim." }
    ]
  },
  {
    id: "d_airport", title: "Havalimanı & Gümrük", level: "A2", phase: 2,
    lines: [
      { en: "Good afternoon. May I see your passport and ticket?", tr: "İyi günler. Pasaportunuzu ve biletinizi görebilir miyim?" },
      { en: "Here you are. I'm flying to London.", tr: "Buyurun. Londra'ya uçuyorum." },
      { en: "How much luggage are you checking in?", tr: "Ne kadar bagaj teslim ediyorsunuz?" },
      { en: "Just one suitcase. This is my carry-on.", tr: "Sadece bir valiz. Bu el bagajım." },
      { en: "Your gate is B12. Boarding starts at 4:30 p.m.", tr: "Kapınız B12. Biniş saat 16:30'da başlıyor." },
      { en: "Thank you. Have a nice day!", tr: "Teşekkürler. İyi günler!" }
    ]
  },
  {
    id: "d_writing_clinic", title: "Sınav Danışmanı Görüşmesi", level: "B2", phase: 5,
    lines: [
      { en: "I'd like to improve my IELTS writing score.", tr: "IELTS yazma puanımı yükseltmek istiyorum." },
      { en: "Sure. What score do you need, and what did you get last time?", tr: "Tabii. Hangi puana ihtiyacınız var ve son sefer ne almıştınız?" },
      { en: "I need a band 7, but I got 6 in writing.", tr: "7 bandına ihtiyacım var ama yazmadan 6 aldım." },
      { en: "Focus on task response and cohesion. Do you use linking words?", tr: "Göreve yanıt ve tutarlılığa odaklanın. Bağlaç kullanıyor musunuz?" },
      { en: "Sometimes, but my paragraphs are not well structured.", tr: "Bazen, ama paragraflarım iyi yapılandırılmış değil." },
      { en: "Practice planning for five minutes before you write.", tr: "Yazmadan önce beş dakika planlama yapmayı deneyin." }
    ]
  }
];