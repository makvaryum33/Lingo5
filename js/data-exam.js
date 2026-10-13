/* ============================================================
   Lingo5 – Sınav Pratiği İçerikleri (IELTS / TOEFL tarzı)
   ============================================================ */
"use strict";

const EXAM = {
  reading: [
    {
      id: "ex_read1", title: "The Importance of Sleep", level: "B1",
      passage: [
        "Sleep is one of the most important factors in human health. Researchers have found that people who sleep fewer than six hours a night are more likely to catch colds and to have difficulty concentrating at work.",
        "During sleep, the brain organizes the information it has collected during the day. This process is essential for memory. In one experiment, students who slept well after studying scored significantly higher on a test than students who stayed awake all night.",
        "Experts recommend going to bed at the same time every night and avoiding screens for at least thirty minutes before sleep."
      ],
      questions: [
        { q: "According to the passage, what happens to people who sleep less than six hours?", a: ["They catch more colds", "They become stronger", "They eat more", "They wake up earlier"], c: 0 },
        { q: "What does the brain do during sleep?", a: ["Forgets everything", "Organizes information", "Creates dreams only", "Stops working"], c: 1 },
        { q: "Students who slept well after studying scored ___ on the test.", a: ["lower", "the same", "higher", "zero"], c: 2 },
        { q: "What do experts recommend before sleep?", a: ["Drinking coffee", "Using screens", "Avoiding screens", "Exercising hard"], c: 2 }
      ]
    },
    {
      id: "ex_read2", title: "Remote Work Revolution", level: "B2",
      passage: [
        "In recent years, remote work has transformed the way companies operate. A growing number of organizations allow employees to work from home at least part of the week. Proponents argue that remote work increases productivity and reduces commuting time.",
        "However, critics point out that working from home can lead to isolation and that the boundary between work and personal life often becomes unclear. Furthermore, not all jobs can be performed remotely; nurses, drivers, and shop assistants, for instance, must be physically present.",
        "There is no denying that flexible working arrangements are here to stay. The challenge for governments and companies is to ensure that the benefits are shared fairly."
      ],
      questions: [
        { q: "Proponents of remote work believe it increases ___", a: ["commuting time", "productivity", "isolation", "costs"], c: 1 },
        { q: "Which job CANNOT be done remotely, according to the passage?", a: ["Programmer", "Writer", "Nurse", "Accountant"], c: 2 },
        { q: "A 'proponent' is someone who ___ something.", a: ["opposes", "supports", "ignores", "fears"], c: 1 },
        { q: "What is the main challenge mentioned in the last paragraph?", a: ["Buying computers", "Sharing benefits fairly", "Ending remote work", "Building offices"], c: 1 }
      ]
    }
  ],
  listening: [
    {
      id: "ex_listen1", title: "University Library Announcement", level: "B1",
      transcript: [
        { en: "Attention students. The university library will be closed next Monday for maintenance.", tr: "Dikkat öğrenciler. Üniversite kütüphanesi bakım nedeniyle gelecek pazartesi kapalı olacak." },
        { en: "It will reopen on Tuesday morning at eight thirty.", tr: "Salı sabahı saat sekiz buçukta yeniden açılacak." },
        { en: "During the closure, you can return books using the drop box at the main entrance.", tr: "Kapalı olduğu süre boyunca kitapları ana girişteki iade kutusuna bırakabilirsiniz." },
        { en: "Also, the group study rooms are now available for online booking.", tr: "Ayrıca grup çalışma odaları artık çevrimiçi rezervasyona açıktır." }
      ],
      questions: [
        { q: "When will the library be closed?", a: ["Tuesday", "Next Monday", "Next month", "This weekend"], c: 1 },
        { q: "What time does it reopen?", a: ["8:30 a.m.", "9:00 a.m.", "8:00 p.m.", "10:30 a.m."], c: 0 },
        { q: "Where can students return books during the closure?", a: ["At the desk", "By post", "In the drop box", "At the café"], c: 2 }
      ]
    },
    {
      id: "ex_listen2", title: "Podcast: Learning Languages", level: "B2",
      transcript: [
        { en: "Today we're talking about how to learn a language quickly.", tr: "Bugün bir dili hızlıca nasıl öğreneceğimizden bahsediyoruz." },
        { en: "Our guest, Dr. Lee, says that listening every day is more important than studying grammar rules.", tr: "Konuğumuz Dr. Lee, her gün dinlemenin dilbilgisi kurallarını çalışmaktan daha önemli olduğunu söylüyor." },
        { en: "She recommends twenty minutes of listening in the morning and ten minutes of speaking practice in the evening.", tr: "Sabahları yirmi dakika dinleme ve akşamları on dakika konuşma pratiği öneriyor." },
        { en: "Most learners give up too early, she adds. Consistency is the key to success.", tr: "Çoğu öğrenen çok erken vazgeçiyor, diye ekliyor. Tutarlılık başarının anahtarıdır." }
      ],
      questions: [
        { q: "According to Dr. Lee, what is more important than grammar?", a: ["Reading", "Listening every day", "Writing essays", "Taking tests"], c: 1 },
        { q: "How much speaking practice does she recommend in the evening?", a: ["20 minutes", "10 minutes", "30 minutes", "60 minutes"], c: 1 },
        { q: "Why do most learners fail, according to the guest?", a: ["They study too much", "They give up too early", "They listen too much", "They speak too much"], c: 1 }
      ]
    }
  ],
  writing: [
    {
      id: "ex_write1", type: "Task 1", title: "Grafik Açıklama", level: "B2",
      prompt: "The chart below shows the percentage of people using public transport in a city between 2010 and 2020. Summarise the information by selecting and reporting the main features.",
      tips: ["Girişte soru cümlesini kendi kelimelerinle söyle (paraphrase).", "Genel eğilimi (overview) ilk paragrafta belirt.", "Rakamlarla en az 2-3 ana özelliği destekle.", "Present Simple / Past Simple tutarlılığı koru."],
      sample: "The chart illustrates changes in public transport usage in a city over a ten-year period. Overall, the proportion of residents using buses and metro increased steadily, while car usage declined. In 2010, only 30% of people travelled by bus, but this figure rose to 45% by 2020. By contrast, private car use fell from 50% to 35% over the same period."
    },
    {
      id: "ex_write2", type: "Task 2", title: "Argüman Kompozisyonu", level: "B2",
      prompt: "Some people believe that universities should focus on preparing students for employment, while others think their main role is to advance knowledge. Discuss both views and give your own opinion.",
      tips: ["En az 250 kelime; 40 dakika ayır (5 dk planlama).", "Her paragrafta tek ana fikir + örnek.", "Bağlaç kullan: however, moreover, consequently.", "Son paragrafta açıkça kendi görüşünü belirt."],
      sample: "There is an ongoing debate about the purpose of universities. While some argue that they should prepare students for the job market, others believe that their primary role is to advance knowledge. In my opinion, universities can and should do both. Firstly, practical skills such as teamwork and communication are essential for graduates. Secondly, without scientific research, society would stagnate. A balanced approach, in which academic research informs practical training, is therefore the most effective solution."
    }
  ],
  speaking: [
    {
      id: "ex_speak1", part: "Part 2 (Cue Card)", title: "Bir Kişi Tanıt", level: "B1",
      prompt: "Describe a person who has influenced you. You should say: who this person is, how you know them, what they did, and explain why they influenced you.",
      followups: ["Do you think role models are important for young people?", "How do parents influence their children?"],
      tips: ["1-2 dakika kesintisiz konuş; duraksamayı 'well...' ile geç.", "Geçmiş zamanları doğru kullan.", "Duygu ve neden ekle (because, so that)."]
    },
    {
      id: "ex_speak2", part: "Part 3 (Tartışma)", title: "Eğitim & Teknoloji", level: "B2",
      prompt: "How has technology changed the way people learn?",
      followups: ["Will teachers be replaced by technology one day?", "Is online learning as effective as classroom learning?", "Should schools teach children how to use AI tools?"],
      tips: ["Fikir + sebep + örnek kalıbı kullan.", "In my opinion / From my perspective gibi ifadelerle başla.", "Karşı görüşü de kabul et (While some people think...)."]
    }
  ]
};