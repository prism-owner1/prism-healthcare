/**
 * ============================================================================
 * PRISM CLINICAL AI - ADVANCED PATIENT HEALTHCARE CHATBOT & REHAB COMPANION
 * ============================================================================
 * Comprehensive Clinical Knowledge Base | Structured Concise Answers (With Limits)
 * Detailed "Know Your Doctor" Directory | Multilingual English, Hindi & Hinglish
 * Patient Context Awareness | Voice I/O | Optional Google Gemini Integration
 * ============================================================================
 */

(function () {
    "use strict";

    // Clean initialization guard
    if (window.PrismAIInitialized) {
        const existing = document.getElementById('prism-ai-widget');
        if (existing) existing.remove();
        const existingStyles = document.getElementById('prism-ai-styles');
        if (existingStyles) existingStyles.remove();
    }
    window.PrismAIInitialized = true;

    /* ========================================================================
     * 1. DETAILED DOCTOR PROFILES ("KNOW YOUR DOCTOR")
     * ======================================================================== */

    const DOCTORS_DIRECTORY = [
        {
            id: "dr_ravi",
            name: "Dr. Ravi Kumar, PT",
            designation: "Founder Director & Lead Consultant Physiotherapist",
            designationHi: "संस्थापक निदेशक एवं मुख्य फिजियोथेरेपिस्ट",
            degrees: "BPT, CDNT, CMTP, MIAP, MPT (Neurology)",
            registrationNo: "1045",
            experience: "10+ Years of Advanced Clinical Experience",
            image: "drRavi.jpeg",
            fallbackImage: "doctor.png",
            specialties: [
                "Advanced Neurological Rehabilitation (Stroke, SCI, Parkinson's)",
                "Severe Spine Disorders (Slip Disc, Sciatica, Cervical Spondylosis)",
                "Certified Dry Needling (CDNT) & Cupping Therapy (CMTP)",
                "Neuro-Developmental Treatment (NDT) & PNF Movement Science",
                "High-Velocity Manual Manipulation & Spinal Care"
            ],
            specialtiesHi: [
                "एडवांस न्यूरोलॉजिकल रिहैबिलिटेशन (स्ट्रोक, लकवा, स्पाइनल इंजरी)",
                "गंभीर रीढ़ की हड्डी के विकार (स्लिप डिस्क, सायटिका, सर्वाइकल)",
                "सर्टिफाइड ड्राई नीडलिंग (CDNT) एवं कपिंग थेरेपी (CMTP)",
                "एनडीटी (NDT) एवं पीएनएफ (PNF) तकनीक",
                "मैनुअल थेरेपी एवं स्पाइनल मोबिलाइजेशन"
            ],
            bio: "Dr. Ravi Kumar is an acclaimed lead physiotherapist in Bihar renowned for evidence-based clinical reasoning and transformative functional recovery. Formerly associated with premier multi-specialty hospitals in Delhi-NCR and Patna, he specializes in stroke paralysis, motor recovery, and non-surgical management of complex spinal conditions.",
            bioHi: "डॉ. रवि कुमार बिहार के प्रतिष्ठित फिजियोथेरेपिस्ट हैं, जो साक्ष्य-आधारित उपचार और सटीक रिकवरी के लिए जाने जाते हैं। दिल्ली-एनसीआर और पटना के प्रमुख अस्पतालों में कार्य कर चुके डॉ. रवि स्ट्रोक (लकवा) और गंभीर स्लिप डिस्क के गैर-शल्य चिकित्सा उपचार के विशेषज्ञ हैं।",
            clinicLocations: "Begusarai (HQ) & Patna Units (Gola Road & Kanti Factory Road)",
            timings: "Mon–Sat: 9:00 AM – 8:00 PM | Sun: 10:00 AM – 2:00 PM",
            whatsappMsg: "Hello Dr. Ravi Kumar, I would like to schedule a clinical consultation at Prism Healthcare.",
            phone: "+919708059081"
        },
        {
            id: "dr_supriya",
            name: "Dr. Supriya, PT",
            designation: "Consultant Physiotherapist — Women's Health & Orthopedics",
            designationHi: "कंसलटेंट फिजियोथेरेपिस्ट — महिला स्वास्थ्य एवं ऑर्थोपेडिक्स",
            degrees: "BPT (Women's Health & Ortho Rehab Specialist)",
            registrationNo: "1048",
            experience: "6+ Years of Dedicated Clinical Practice",
            image: "DrSupriya.jpeg",
            fallbackImage: "women.png",
            specialties: [
                "Women's Health & Pelvic Floor Muscle Rehabilitation",
                "Post-Natal Core & Diastasis Recti Functional Restoration",
                "Pre & Post-Operative Joint Replacement (TKR / THR Rehab)",
                "Chronic Knee Osteoarthritis, Frozen Shoulder & Spine Care",
                "Ergonomic Pain Management & Postural Correction"
            ],
            specialtiesHi: [
                "महिला स्वास्थ्य एवं पेल्विक फ्लोर मांसपेशी पुनर्वास",
                "प्रसव के बाद पेट की मांसपेशियों का सुधार (Diastasis Recti)",
                "घुटना व कूल्हा प्रत्यारोपण के बाद रिकवरी (TKR / THR)",
                "घुटनों का ऑस्टियोआर्थराइटिस, फ्रोजन शोल्डर एवं कमर दर्द",
                "पोस्चर सुधार एवं एर्गोनोमिक पेन मैनेजमेंट"
            ],
            bio: "Dr. Supriya is an expert physiotherapist with extensive clinical background at Paras Hospital, Patna. She champions women's functional physical health across all life stages, specialized pelvic floor therapy, and comprehensive orthopedic post-surgical recovery.",
            bioHi: "डॉ. सुप्रिया पारस हॉस्पिटल पटना की पूर्व फिजियोथेरेपिस्ट हैं। वे महिला स्वास्थ्य, प्रसव उपरांत रिहैबिलिटेशन, जोड़ों के ऑपरेशन के बाद तेजी से चलने-फिरने की थेरेपी तथा ऑर्थोपेडिक पेन केयर में विशेष रूप से दक्ष हैं।",
            clinicLocations: "Patna Unit (Orthocare Hospital, Gola Road & Kanti Factory Road)",
            timings: "Mon–Sat: 10:00 AM – 6:30 PM",
            whatsappMsg: "Hello Dr. Supriya, I would like to consult regarding physiotherapy & rehabilitation.",
            phone: "+919708059081"
        },
        {
            id: "dr_puja",
            name: "Dr. Puja, PT",
            designation: "Senior Consultant — Pediatric & Neuro-Developmental Rehab",
            designationHi: "सीनियर कंसलटेंट — बाल रोग एवं न्यूरो पुनर्वास",
            degrees: "BPT (Pediatric & Neurological Rehabilitation Specialist)",
            registrationNo: "1052",
            experience: "7+ Years of Focused Pediatric & Neuro Rehabilitation",
            image: "Dr.puja best physiotherapist.jpeg",
            fallbackImage: "pedia.png",
            specialties: [
                "Cerebral Palsy (CP) — Spastic, Diplegic & Quadriplegic Management",
                "Autism Spectrum Disorder (ASD) & Sensory Integration Therapy",
                "Delayed Motor Milestones (Head Control, Rolling, Sitting, Walking)",
                "ADHD, Down Syndrome, Muscular Dystrophy & Clubfoot Rehab",
                "Pediatric Gait Training, Postural Control & Balance Therapy"
            ],
            specialtiesHi: [
                "सेरेब्रल पाल्सी (CP - मस्तिष्क पक्षाघात) पुनर्वास",
                "ऑटिज्म (ASD) एवं संवेदी एकीकरण (Sensory Integration) थेरेपी",
                "बच्चों में देरी से विकास (गर्दन संभालना, बैठना, चलना)",
                "डाउन सिंड्रोम, मस्कुलर डिस्ट्रॉफी एवं क्लबफुट सुधार",
                "बच्चों के चलने-फिरने का संतुलन एवं मुद्रा सुधार"
            ],
            bio: "Dr. Puja possesses specialized expertise in pediatric neurological and motor rehabilitation from prestigious multi-specialty centers. She applies compassionate sensory-integration techniques and multidisciplinary family-guided protocols to help children reach developmental independence.",
            bioHi: "डॉ. पूजा बच्चों के न्यूरोलॉजिकल और शारीरिक विकास की वरिष्ठ विशेषज्ञ हैं। वे सेरेब्रल पाल्सी, ऑटिज्म और विकास में देरी वाले बच्चों को चलने-फिरने और स्वतंत्र बनाने के लिए आधुनिक सेंसरी और मोटर थेरेपी प्रदान करती हैं।",
            clinicLocations: "Patna Unit & Begusarai Center",
            timings: "Mon–Sat: 9:30 AM – 6:00 PM",
            whatsappMsg: "Hello Dr. Puja, I would like to schedule a pediatric physiotherapy assessment.",
            phone: "+919708059081"
        }
    ];

    /* ========================================================================
     * 2. EXPANDED CLINICAL DATA ENGINE (HUNDREDS OF MEDICAL CONCEPTS)
     * ======================================================================== */

    const CLINICAL_KB = {
        // Red flag emergencies
        redFlags: [
            {
                pattern: /(cauda|bladder|bowel|incontinence|saddle|numb.*groin|numb.*private|loss of stool|can't hold urine|urine leak|peshab.*ruk|peshab.*chhoot)/i,
                urgency: "CRITICAL_EMERGENCY",
                title: "⚠️ Immediate Emergency Alert (Cauda Equina Compression)",
                titleHi: "⚠️ तत्काल आपातकालीन चेतावनी (रीढ़ की गंभीर तंत्रिका पर दबाव)",
                en: "**URGENT MEDICAL WARNING:** Loss of bowel/bladder control, inability to urinate, or numbness in the saddle/groin region are hallmarks of acute spinal cord or Cauda Equina compression. **This is a medical emergency requiring hospital neurosurgical evaluation within hours to prevent permanent paralysis.** Stop all home exercises and go immediately to the nearest hospital emergency department or call Dr. Ravi Kumar.",
                hi: "**गंभीर आपातकालीन चेतावनी:** पेशाब या शौच पर नियंत्रण न रहना, या कमर व जांघों के बीच सुन्नता गंभीर तंत्रिका दबाव (Cauda Equina Syndrome) का लक्षण है। **इसे तुरंत नजदीकी बड़े अस्पताल के इमरजेंसी विभाग में दिखाना अनिवार्य है ताकि स्थायी तंत्रिका क्षति से बचा जा सके।** घर पर कोई कसरत न करें।"
            },
            {
                pattern: /(chest pain|angina|left arm pain|shortness of breath|breathless.*pain|crushing pain in chest|cold sweat.*pain|chhati me dard)/i,
                urgency: "CRITICAL_EMERGENCY",
                title: "🚨 Urgent Cardiac Alert (Chest Pain / Angina)",
                titleHi: "🚨 तत्काल आपातकालीन चेतावनी (हृदय संबंधी संकेत)",
                en: "Chest tightness, crushing chest pressure, pain radiating to the left arm or jaw, or unexplained shortness of breath can indicate a cardiac event. **Do not delay. Call ambulance emergency services (112 / 108) or visit the emergency room immediately.**",
                hi: "सीने में दबाव, बाईं बांह या जबड़े तक जाने वाला दर्द और सांस फूलना दिल से जुड़ी समस्या हो सकती है। **तुरंत आपातकालीन नंबर (112 या 108) पर संपर्क करें या नजदीकी अस्पताल के इमरजेंसी में जाएं।**"
            },
            {
                pattern: /(calf.*swelling|calf.*red.*hot|dvt|blood clot|one leg swollen after surgery|pindli me sujan)/i,
                urgency: "HIGH_ALERT",
                title: "⚠️ Deep Vein Thrombosis (DVT) Warning",
                titleHi: "⚠️ डीप वेन थ्रोम्बोसिस (DVT) चेतावनी",
                en: "Sudden pain, severe tenderness, heat, and swelling in one calf (especially following surgery, trauma, or prolonged bed rest) may signal Deep Vein Thrombosis (DVT). **Do NOT massage or rub the calf.** Seek immediate Doppler ultrasound evaluation at a hospital or contact our clinic.",
                hi: "पैर की पिंडली में अचानक तेज दर्द, लालिमा, गर्मी और सूजन DVT (खून का थक्का जमना) हो सकता है। **पिंडली की मालिश बिल्कुल न करें।** तुरंत डॉक्टर से जांच कराएं।"
            }
        ],

        // Thermal Guidelines
        thermal: {
            ice: {
                en: "**❄️ Cryotherapy (Cold / Ice Pack Rules):**\n" +
                    "• **When to use:** First 24–72 hours of any new injury, acute sprain/strain, red swollen joints, sharp flare-ups, or immediately after therapy if heated.\n" +
                    "• **How to use:** Wrap ice pack in a clean damp cotton towel (never apply bare ice directly to skin).\n" +
                    "• **Duration:** Apply for **12–15 minutes** every 3–4 hours.\n" +
                    "• **Precaution:** Remove if numbness occurs. Never use on numb areas or poor circulation.",
                hi: "**❄️ बर्फ की सिकाई (Ice Pack) के नियम:**\n" +
                    "• **कब करें:** चोट या दर्द के शुरुआती 24 से 72 घंटों में, ताज़ी सूजन, मोच या कसरत के बाद दर्द बढ़ने पर।\n" +
                    "• **कैसे करें:** बर्फ या जेल पैक को सूती कपड़े में लपेटकर लगाएं (सीधे त्वचा पर बर्फ न रखें)।\n" +
                    "• **समय:** **12 से 15 मिनट** तक दिन में 2–3 बार।\n" +
                    "• **सावधानी:** सुन्न होने पर तुरंत हटा लें। घाव पर न लगाएं।"
            },
            heat: {
                en: "**🔥 Thermotherapy (Warm Compress / Hot Water Bag Rules):**\n" +
                    "• **When to use:** Chronic muscle aching, morning spinal stiffness, old spasms, osteoarthritis stiffness, or 10 minutes *before* stretching.\n" +
                    "• **How to use:** Use a warm water bag or electric heating pad covered in cloth at a safe, soothing temperature.\n" +
                    "• **Duration:** Apply for **15–20 minutes**.\n" +
                    "• **Precaution:** NEVER apply heat to fresh swelling, acute trauma, bleeding, or active joint infections.",
                hi: "**🔥 गर्म पानी की सिकाई (Hot Fermentation) के नियम:**\n" +
                    "• **कब करें:** पुराना मांसपेशियों का दर्द, सुबह उठने पर कमर/गर्दन की जकड़न, आर्थराइटिस या कसरत शुरू करने से पहले।\n" +
                    "• **कैसे करें:** गर्म पानी की थैली या हीटिंग पैड पर कपड़ा लपेटकर सिकाई करें।\n" +
                    "• **समय:** **15 से 20 मिनट** तक।\n" +
                    "• **सावधानी:** ताज़ी सूजन, लाल जोड़ों या नई चोट पर गर्म सिकाई कभी न करें।"
            }
        },

        // Detailed Conditions Database (Formatted with strict limits)
        conditions: [
            // 1. Lumbar Spine & Sciatica
            {
                match: /(low back|lower back|back pain|lumbar|sciatica|slip disc|slipped disc|disc bulge|herniation|spondylosis|kamar dard|kamar me dard)/i,
                title: "Low Back Pain, Lumbar Disc & Sciatica",
                titleHi: "कमर दर्द, स्लिप डिस्क एवं सायटिका केयर",
                en: `**Clinical Summary:** Lumbar pain and sciatica stem from disc bulges, facet joint strain, or nerve root compression.\n\n` +
                    `**Essential Do's & Don'ts:**\n` +
                    `• **Do:** Sleep side-lying with a pillow between knees, or supine with a pillow under knees to unload spine.\n` +
                    `• **Don't:** Avoid forward bending at the waist and lifting heavy objects. Always bend from knees.\n` +
                    `• **Sitting:** Sit on an ergonomic chair with lumbar roll support; stand every 40 mins.\n\n` +
                    `**Key Safe Exercises:**\n` +
                    `1. *Supine Pelvic Tilts:* Flatten lower back against floor, hold 5s (10 reps).\n` +
                    `2. *Gentle Knee-to-Chest:* Hug one knee to chest gently without strain (10 reps each leg).\n` +
                    `3. *Prone Extension:* Lie on stomach on elbows (McKenzie press-up) ONLY if pain does not shoot down legs.\n` +
                    `4. *Bridging:* Lift hips upward, engage glutes, hold 5s (10 reps).\n\n` +
                    `**Doctor Advice:** Stop immediately if pain shoots below the knee. Supervised by **Dr. Ravi Kumar, PT**.`,
                hi: `**चिकित्सकीय सारांश:** कमर दर्द और सायटिका रीढ़ की डिस्क खिसकने या नसों पर दबाव के कारण होता है।\n\n` +
                    `**प्रमुख सावधानियां:**\n` +
                    `• **सोने की मुद्रा:** करवट लेकर घुटनों के बीच तकिया रखें, या पीठ के बल घुटनों के नीचे तकिया लगाएं।\n` +
                    `• **झुकने से बचें:** कमर से आगे झुककर सामान न उठाएं; सामान उठाते समय घुटने मोड़ें।\n` +
                    `• **बैठना:** कुर्सी पर कमर के पीछे तकिया रखें; 40 मिनट से अधिक लगातार न बैठें।\n\n` +
                    `**सुरक्षित व्यायाम:**\n` +
                    `1. *पेल्विक टिल्ट:* पीठ को जमीन पर सटाकर पेट की मांसपेशियां 5 सेकंड सिकोड़ें (10 बार)।\n` +
                    `2. *नी-टू-चेस्ट:* एक-एक पैर छाती की ओर मोड़ें (10 बार)।\n` +
                    `3. *भुजंगासन मुद्रा:* पेट के बल लेटकर कोहनी पर शरीर उठाएं (दर्द न होने पर)।\n` +
                    `4. *सेतुबंध (Bridging):* पीठ के बल लेटकर कूल्हे ऊपर उठाएं (10 बार)।\n\n` +
                    `**डॉक्टर सलाह:** यदि दर्द पैर में नीचे की ओर भागे तो तुरंत रुकें। **डॉ. रवि कुमार** से परामर्श लें।`
            },

            // 2. Cervical Spine & Neck
            {
                match: /(cervical|neck pain|neck stiffness|gardan dard|gardan me dard|radiculopathy|arm radiating|tech neck|trapezitis)/i,
                title: "Cervical Spondylosis, Tech Neck & Arm Pain",
                titleHi: "गर्दन दर्द, सर्वाइकल एवं पोस्चरल खिंचाव",
                en: `**Clinical Summary:** Cervical spondylosis and tech neck arise from prolonged downward head tilt and disc wear.\n\n` +
                    `**Essential Do's & Don'ts:**\n` +
                    `• **Screen Ergonomics:** Raise mobile and laptop screens exactly to eye level.\n` +
                    `• **Pillow:** Use a contoured cervical pillow supporting the hollow of your neck. Avoid thick double pillows.\n` +
                    `• **Avoid:** Never crack your neck forcefully or roll your head in 360° circles.\n\n` +
                    `**Key Safe Exercises:**\n` +
                    `1. *Chin Tucks:* Draw chin straight back (making a double chin), hold 5s (10 reps).\n` +
                    `2. *Isometric Neck Holds:* Gently press hand against forehead, temples, and back of head without head moving (hold 5s each, 10 reps).\n` +
                    `3. *Scapular Squeezes:* Squeeze shoulder blades together and down, hold 5s (15 reps).\n\n` +
                    `**Doctor Advice:** If experiencing hand tingling or numbness, seek clinical nerve assessment under **Dr. Ravi Kumar, PT**.`,
                hi: `**चिकित्सकीय सारांश:** सर्वाइकल दर्द और टेक-नेक मोबाइल पर नीचे झुककर काम करने या डिस्क घिसने से होता है।\n\n` +
                    `**प्रमुख सावधानियां:**\n` +
                    `• **स्क्रीन की ऊंचाई:** फोन या लैपटॉप को हमेशा आंखों के समानांतर (Eye Level) रखें।\n` +
                    `• **तकिया:** बहुत ऊंचा तकिया न लें। गर्दन के प्राकृतिक घुमाव को सहारा देने वाला तकिया प्रयोग करें।\n` +
                    `• **सावधानी:** गर्दन को झटके से न मरोड़ें और गोल-गोल न घुमाएं।\n\n` +
                    `**सुरक्षित व्यायाम:**\n` +
                    `1. *चिन टक्स (Chin Tucks):* ठुड्डी को सीधे पीछे की ओर खींचें, 5 सेकंड रोकें (10 बार)।\n` +
                    `2. *आइसोमेट्रिक कसरत:* सिर को बिना हिलाए माथे, सिर के पीछे व अगल-बगल हाथ से 5 सेकंड दबाव दें (10 बार)।\n` +
                    `3. *कंधों का खिंचाव:* कंधों के ब्लेड्स को पीछे की ओर सिकोड़ें (15 बार)।\n\n` +
                    `**डॉक्टर सलाह:** यदि हाथ में झनझनाहट या सुन्नपन हो तो **डॉ. रवि कुमार** से क्लिनिकल जांच कराएं।`
            },

            // 3. Knee Osteoarthritis & Knee Pain
            {
                match: /(knee|ghutna|osteoarthritis|oa knee|knee pain|meniscus|patella|acl|ghutne me dard)/i,
                title: "Knee Osteoarthritis & Ligament Care",
                titleHi: "घुटनों का दर्द एवं ऑस्टियोआर्थराइटिस केयर",
                en: `**Clinical Summary:** Knee OA involves cartilage thinning and joint friction, requiring quadriceps strengthening to unload the joint.\n\n` +
                    `**Essential Do's & Don'ts:**\n` +
                    `• **Protection:** Avoid deep squatting, sitting cross-legged (palathi) on the floor, and Indian toilets.\n` +
                    `• **Footwear:** Wear well-cushioned shoes. Do not walk barefoot on hard marble floors.\n` +
                    `• **Thermal:** Ice if swollen after walking; warm compress before morning stretches.\n\n` +
                    `**Key Safe Exercises:**\n` +
                    `1. *Isometric Quads:* Place rolled towel under knee, press down firmly into bed for 5s (15 reps).\n` +
                    `2. *Straight Leg Raise (SLR):* Lock knee straight, lift 30 degrees, hold 5s (10 reps each leg).\n` +
                    `3. *Short Arc Quads:* Towel roll under knee, straighten lower leg upwards slowly (15 reps).\n` +
                    `4. *Hamstring Stretch:* Gentle seated stretch with back straight.\n\n` +
                    `**Doctor Advice:** Consult **Dr. Supriya, PT** or **Dr. Ravi Kumar, PT** for advanced knee therapy.`,
                hi: `**चिकित्सकीय सारांश:** घुटने का घिसना (OA Knee) कार्टिलेज कम होने से होता है; जांघ की मांसपेशियों को मजबूत कर इसे ठीक किया जाता है।\n\n` +
                    `**प्रमुख सावधानियां:**\n` +
                    `• **बचाव:** जमीन पर पालथी मारकर (चौकड़ी) न बैठें और उकड़ू न बैठें। वेस्टर्न टॉयलेट का उपयोग करें।\n` +
                    `• **जूते:** सख्त फर्श पर नंगे पैर न चलें; कुशन वाले आरामदायक जूते या चप्पल पहनें।\n` +
                    `• **सिकाई:** यदि सूजन हो तो बर्फ लगाएं; जकड़न हो तो गर्म पानी की सिकाई करें।\n\n` +
                    `**सुरक्षित व्यायाम:**\n` +
                    `1. *आइसोमेट्रिक क्वैड्स:* घुटने के नीचे तौलिया मोड़कर दबाएं, 5 सेकंड रोकें (15 बार)।\n` +
                    `2. *पैर सीधा उठाना (SLR):* घुटना सीधा रखकर पैर 30 डिग्री उठाएं, 5 सेकंड रोकें (10 बार)।\n` +
                    `3. *पंजे चलाना:* पंजे आगे-पीछे चलाएं ताकि रक्त संचार बना रहे।\n\n` +
                    `**डॉक्टर सलाह:** विशेष परामर्श के लिए **डॉ. सुप्रिया** या **डॉ. रवि कुमार** से संपर्क करें।`
            },

            // 4. Frozen Shoulder & Shoulder Pain
            {
                match: /(frozen shoulder|adhesive capsulitis|shoulder pain|kandha|kandha jam|rotator cuff|shoulder stiffness)/i,
                title: "Frozen Shoulder (Adhesive Capsulitis) & Rotator Cuff",
                titleHi: "कंधे की जकड़न (Frozen Shoulder) एवं रोटेटर कफ केयर",
                en: `**Clinical Summary:** Frozen shoulder causes joint capsule contracture and restricted reach in all directions.\n\n` +
                    `**Essential Do's & Don'ts:**\n` +
                    `• **Pre-Heat:** Always apply warm compress for 15 minutes BEFORE stretches to relax periarticular tissues.\n` +
                    `• **Gentle Progression:** Never force or jerk the arm aggressively; progress gradually within tolerability.\n` +
                    `• **Sleeping:** Sleep on the unaffected side or back with a pillow supporting the affected elbow.\n\n` +
                    `**Key Safe Exercises:**\n` +
                    `1. *Codman's Pendulum:* Lean forward, let affected arm dangle loose, gently swing in circles.\n` +
                    `2. *Wall Walking:* Walk fingers up the wall forwards and sideways slowly (10 reps).\n` +
                    `3. *Towel / Wand Stretch:* Use a stick or towel to gently assist arm upwards.\n\n` +
                    `**Doctor Advice:** Book mobilization therapy with **Dr. Ravi Kumar, PT** or **Dr. Supriya, PT**.`,
                hi: `**चिकित्सकीय सारांश:** कंधे का जोड़ जाम होने से हाथ ऊपर या पीठ के पीछे ले जाना बेहद कष्टदायी हो जाता है।\n\n` +
                    `**प्रमुख सावधानियां:**\n` +
                    `• **कसरत से पहले गर्म सिकाई:** 15 मिनट गर्म पानी की सिकाई करें ताकि जोड़ लचीला हो सके।\n` +
                    `• **झटके से बचें:** हाथ को कभी भी झटके से ऊपर न खींचें; धीरे-धीरे खिंचाव दें।\n` +
                    `• **सोते समय:** स्वस्थ करवट सोएं और प्रभावित हाथ के नीचे तकिया रखकर सहारा दें।\n\n` +
                    `**सुरक्षित व्यायाम:**\n` +
                    `1. *पेंडुलम कसरत:* झुककर हाथ को ढीला छोड़ें और गोल-गोल झुलाएं।\n` +
                    `2. *दीवार पर उंगलियां चढ़ाना (Wall Walk):* उंगलियों के सहारे हाथ को धीरे-धीरे दीवार पर ऊपर ले जाएं।\n` +
                    `3. *तौलिए या छड़ी से सहारा:* दूसरे हाथ से सहारा देकर हाथ को धीरे-धीरे उठाएं।\n\n` +
                    `**डॉक्टर सलाह:** क्लिनिक में एडवांस्ड शोल्डर मोबिलाइजेशन के लिए **डॉ. रवि कुमार** या **डॉ. सुप्रिया** से मिलें।`
            },

            // 5. Stroke & Neurological Rehabilitation
            {
                match: /(stroke|paralysis|hemiplegia|lakwa|falij|parkinson|bell's palsy|facial palsy|neuro|nerve)/i,
                title: "Neurological Rehabilitation (Stroke, Paralysis & Bell's Palsy)",
                titleHi: "न्यूरो पुनर्वास (स्ट्रोक, लकवा, बेल्स पाल्सी)",
                en: `**Clinical Summary:** Neurological recovery relies on neuroplasticity, repetitive task training, and preventing secondary complications.\n\n` +
                    `**Essential Guidelines:**\n` +
                    `• **Shoulder Protection:** NEVER pull the paralyzed arm while transferring. Always support the arm on a lap pillow.\n` +
                    `• **Early Weight-Bearing:** Practice symmetric weight-bearing on both feet with therapist assistance.\n` +
                    `• **Bell's Palsy:** Mirror facial movements (gentle smile, eyebrow raise, eye squinting); use daytime eye lubricant and night eye patch.\n\n` +
                    `**Clinical Modalities:** NDT, PNF, Task-Oriented Training, Balance Retraining.\n` +
                    `**Supervised Lead:** Director **Dr. Ravi Kumar, PT (MPT Neurology)**.`,
                hi: `**चिकित्सकीय सारांश:** न्यूरोलॉजिकल रिकवरी में मस्तिष्क के नए संपर्कों (Neuroplasticity) का विकास और नियमित रिहैब अत्यंत आवश्यक है।\n\n` +
                    `**प्रमुख निर्देश:**\n` +
                    `• **कमजोर हाथ की सुरक्षा:** मरीज को उठाते समय कमजोर हाथ को कभी न खींचें। हाथ के नीचे हमेशा तकिया रखें।\n` +
                    `• **खड़े होने का अभ्यास:** दोनों पैरों पर बराबर वजन रखकर खड़े होने और बैठने का नियमित अभ्यास कराएं।\n` +
                    `• **बेल्स पाल्सी (चेहरे का लकवा):** शीशे के सामने हल्के फेशियल व्यायाम करें; आंख को सूखने से बचाने के लिए आई-ड्रॉप डालें।\n\n` +
                    `**क्लिनिकल नेतृत्व:** हमारे निदेशक **डॉ. रवि कुमार (MPT Neuro)** के प्रत्यक्ष मार्गदर्शन में क्लिनिक में संपूर्ण न्यूरो रिहैब उपलब्ध है।`
            },

            // 6. Pediatric Physiotherapy (CP, Autism, Milestones)
            {
                match: /(pediatric|child|baby|cerebral palsy|cp|autism|milestones|delayed milestone|bacche ka vikas|bachha)/i,
                title: "Pediatric Rehabilitation (Cerebral Palsy, Autism & Milestones)",
                titleHi: "बाल रोग फिजियोथेरेपी (सेरेब्रल पाल्सी, ऑटिज्म एवं विकास)",
                en: `**Clinical Summary:** Pediatric physiotherapy facilitates motor milestones, sensory integration, and functional movement in children.\n\n` +
                    `**Conditions Treated:** Cerebral Palsy (CP), Autism Spectrum Disorder, Delayed Walking, Down Syndrome, Clubfoot.\n\n` +
                    `**Core Therapeutic Focus:**\n` +
                    `• Head and neck control facilitation via prone tummy time on wedge.\n` +
                    `• Trunk balance and sitting stability on peanut/physio balls.\n` +
                    `• Sensory diet and motor planning for coordination and focus.\n\n` +
                    `**Specialist Consultant:** **Dr. Puja, PT** (Pediatric & Neurological Rehab Specialist).`,
                hi: `**चिकित्सकीय सारांश:** बाल रोग फिजियोथेरेपी बच्चों में गर्दन संभालना, बैठना, चलना और संतुलन सिखाने में मदद करती है।\n\n` +
                    `**प्रमुख उपचार:** सेरेब्रल पाल्सी (CP), ऑटिज्म (ASD), चलने में देरी, डाउन सिंड्रोम, क्लबफुट।\n\n` +
                    `**थेरेपी के मुख्य बिंदु:**\n` +
                    `• टमी टाइम (Tummy Time) और वेज पर गर्दन संभालने का अभ्यास।\n` +
                    `• फिजियो बॉल पर संतुलन और बैठने का प्रशिक्षण।\n` +
                    `• संवेदी एकीकरण (Sensory Integration) द्वारा मोटर कोऑर्डिनेशन।\n\n` +
                    `**विशेषज्ञ चिकित्सक:** **डॉ. पूजा (सीनियर पीडियाट्रिक कंसलटेंट)**।`
            },

            // 7. Women's Health, Pelvic Floor & Post-Natal Care
            {
                match: /(women|female|pelvic|postnatal|post natal|pregnancy|diastasis|kegel|delivery|garbh|mahila)/i,
                title: "Women's Health, Pelvic Floor & Post-Natal Recovery",
                titleHi: "महिला स्वास्थ्य, पेल्विक फ्लोर एवं प्रसव उपरांत देखभाल",
                en: `**Clinical Summary:** Specialized rehabilitation for pelvic floor integrity, core strengthening, and postpartum musculoskeletal recovery.\n\n` +
                    `**Core Guidelines:**\n` +
                    `• **Diastasis Recti:** Avoid standard crunches or sit-ups which worsen abdominal separation. Use transverse abdominis drawing-in.\n` +
                    `• **Kegel Exercises:** Contract pelvic floor muscles (as if stopping urine flow), hold 5s, relax completely for 5s (10 reps, 3x daily).\n` +
                    `• **Posture:** Maintain pelvic neutral during breastfeeding and baby-lifting.\n\n` +
                    `**Specialist Consultant:** **Dr. Supriya, PT** (Women's Health & Pelvic Floor Specialist).`,
                hi: `**चिकित्सकीय सारांश:** प्रसव के बाद पेट की मांसपेशियों का ठीक होना (Diastasis Recti) और पेल्विक फ्लोर को मजबूत करना आवश्यक है।\n\n` +
                    `**प्रमुख निर्देश:**\n` +
                    `• **क्रंचेस से बचें:** सामान्य सिट-अप्स या आगे झुकने वाली कसरत न करें, इससे पेट की मांसपेशियों में दरार बढ़ सकती है।\n` +
                    `• **कीगल व्यायाम (Kegel):** पेल्विक मांसपेशियों को 5 सेकंड ऊपर की ओर सिकोड़ें और 5 सेकंड ढीला छोड़ें (दिन में 3 बार 10 रेप्स)।\n` +
                    `• **शिशु को उठाते समय:** पीठ सीधी रखें और वजन घुटनों से उठाएं।\n\n` +
                    `**विशेषज्ञ चिकित्सक:** **डॉ. सुप्रिया (महिला स्वास्थ्य विशेषज्ञ)**।`
            },

            // 8. Plantar Fasciitis, Ankle & Heel Pain
            {
                match: /(plantar|heel pain|ankle|foot pain|edi me dard|pair me dard|calcaneal spur|sprain)/i,
                title: "Plantar Fasciitis, Heel Pain & Ankle Sprain",
                titleHi: "एड़ी का दर्द (Plantar Fasciitis) एवं टखने की मोच",
                en: `**Clinical Summary:** Plantar fasciitis causes sharp first-step morning heel pain due to micro-tears in the plantar fascia.\n\n` +
                    `**Essential Guidelines:**\n` +
                    `• **Frozen Bottle Roll:** Roll arch of foot over a frozen water bottle for 8–10 minutes.\n` +
                    `• **Calf & Toe Stretch:** Before getting out of bed, pull toes backward toward your shin for 30s.\n` +
                    `• **Footwear:** Never walk barefoot on hard floors. Use silicone heel cups or arch supports.\n` +
                    `• **Ankle Sprain:** Apply RICE protocol (Rest, Ice, Compression, Elevation) immediately.`,
                hi: `**चिकित्सकीय सारांश:** सुबह बिस्तर से उठते ही एड़ी में तेज चुभन होना प्लांटर फैसीआइटिस (Plantar Fasciitis) का मुख्य लक्षण है।\n\n` +
                    `**प्रमुख उपाय:**\n` +
                    `• **बर्फ की बोतल से मसाज:** जमी हुई पानी की बोतल पर पैर का तलवा रखकर 8-10 मिनट आगे-पीछे घुमाएं।\n` +
                    `• **पंजों का खिंचाव:** सुबह उठने से पहले पंजों को अपनी ओर तौलिए से खींचें (30 सेकंड रोकें)।\n` +
                    `• **जूते:** नंगे पैर न चलें; सिलिकॉन हील कुशन या आर्च सपोर्ट वाली चप्पल पहनें।\n` +
                    `• **टखने की मोच:** मोच आने पर तुरंत बर्फ लगाएं और पैर को ऊंचाई पर रखें।`
            },

            // 9. Post-Operative Joint Replacement (TKR & THR)
            {
                match: /(tkr|thr|replacement|surgery|post op|post-operative|fracture stiffness|operation ke baad)/i,
                title: "Post-Operative Rehabilitation (TKR, THR & Fracture Rehab)",
                titleHi: "ऑपरेशन उपरांत पुनर्वास (घुटना/कूल्हा रिप्लेसमेंट)",
                en: `**Clinical Summary:** Post-operative rehabilitation restores range of motion, muscle strength, and independent gait while protecting surgical implants.\n\n` +
                    `**Crucial Surgical Precautions:**\n` +
                    `• **Total Hip Replacement (THR):** Do NOT cross legs, do NOT bend hip past 90 degrees, do NOT twist inward.\n` +
                    `• **Total Knee Replacement (TKR):** Target full knee extension (flat on bed) and gradual flexion to 90–110°.\n` +
                    `• **Ankle Pumps:** Perform 20 ankle pumps every hour while awake to prevent DVT blood clots.\n\n` +
                    `**Specialists:** Supervised by **Dr. Ravi Kumar, PT** and **Dr. Supriya, PT**.`,
                hi: `**चिकित्सकीय सारांश:** घुटने या कूल्हे के ऑपरेशन के बाद सही समय पर थेरेपी से जोड़ कभी जाम नहीं होता और चलना आसान होता है।\n\n` +
                    `**महत्वपूर्ण सावधानियां:**\n` +
                    `• **कूल्हा रिप्लेसमेंट (THR):** पैर पर पैर चढ़ाकर न बैठें, आगे 90 डिग्री से अधिक न झुकें, कूल्हे को अंदर की ओर न मरोड़ें।\n` +
                    `• **घुटना रिप्लेसमेंट (TKR):** घुटने को पूरी तरह सीधा करने का अभ्यास करें और धीरे-धीरे 90 से 110 डिग्री तक मोड़ें।\n` +
                    `• **पंजों की कसरत:** खून का थक्का जमने (DVT) से बचने के लिए हर घंटे 20 बार पंजे आगे-पीछे चलाएं।\n\n` +
                    `**विशेषज्ञ:** **डॉ. रवि कुमार** एवं **डॉ. सुप्रिया**।`
            },

            // 10. Clinical Modalities Explained (Dry Needling, Cupping, IFT)
            {
                match: /(dry needling|cupping|ift|tens|ultrasound therapy|traction|kinesio|modality|machine)/i,
                title: "Advanced Clinical Modalities (Cupping, Dry Needling & IFT)",
                titleHi: "एडवांस क्लिनिकल थेरेपी (ड्राई नीडलिंग, कपिंग एवं आईएफटी)",
                en: `**Clinical Modalities at Prism Healthcare:**\n` +
                    `• **Dry Needling (CDNT):** Ultra-fine filament needles release deep muscular trigger points, relieve nerve irritation, and reset chronic muscle spasm.\n` +
                    `• **Cupping Therapy (CMTP):** Decompressive negative pressure boosts micro-circulation and releases rigid myofascial adhesions.\n` +
                    `• **IFT & Electrotherapy:** Interferential currents block pain signals and stimulate natural cellular healing.\n\n` +
                    `**Safety:** Performed by certified therapists under **Dr. Ravi Kumar, PT**.`,
                hi: `**प्रिज्म हेल्थकेयर में उपलब्ध आधुनिक थेरेपी:**\n` +
                    `• **ड्राई नीडलिंग (CDNT):** बारीक सुइयों द्वारा मांसपेशियों की गहरी गांठों (Trigger Points) को खोलकर तुरंत दर्द से मुक्ति दी जाती है।\n` +
                    `• **कपिंग थेरेपी (CMTP):** रक्त संचार बढ़ाकर मांसपेशियों की पुरानी जकड़न को ढीला करती है।\n` +
                    `• **आईएफटी एवं इलेक्ट्रोथेरेपी:** नसों में दर्द के संदेश को रोककर सूजन व दर्द को कम करती है।\n\n` +
                    `**सुरक्षा:** यह सभी उपचार **डॉ. रवि कुमार** के कुशल मार्गदर्शन में किए जाते हैं।`
            },

            // 11. Ankylosing Spondylitis (AS) & Axial SpA
            {
                match: /(ankylosing|spondylitis|bamboo spine|hla.*b27|bechterew|morning stiffness.*spine)/i,
                title: "Ankylosing Spondylitis & Axial Spondyloarthritis",
                titleHi: "एंकाइलोजिंग स्पॉन्डिलाइटिस एवं रीढ़ की जकड़न",
                en: `**Clinical Summary:** Ankylosing Spondylitis causes progressive inflammatory fusion of spinal and sacroiliac joints with severe morning stiffness.\n\n` +
                    `**Essential Do's & Don'ts:**\n` +
                    `• **Posture:** Sleep on a firm mattress with a thin pillow or no pillow; lie prone (on stomach) 20 mins daily.\n` +
                    `• **Movement:** Do NOT remain immobile. Morning hot shower followed immediately by mobility exercises.\n` +
                    `• **Avoid:** Contact sports and high-impact spine jarring activities.\n\n` +
                    `**Key Safe Exercises:**\n` +
                    `1. *Chest Expansion Breathing:* Deep diaphragmatic inhalation with arm abduction (10 reps, 3x daily).\n` +
                    `2. *Thoracic Spine Extensions:* Foam roller / chair back extension to prevent kyphotic stoop (10 reps).\n` +
                    `3. *Prone Cobra Extension:* Lie on stomach, lift upper chest off bed, hold 5s (10 reps).\n\n` +
                    `**Doctor Advice:** Supervised spinal mobility protocol under **Dr. Ravi Kumar, PT (MPT Neuro)**.`,
                hi: `**चिकित्सकीय सारांश:** एंकाइलोजिंग स्पॉन्डिलाइटिस (AS) रीढ़ और कूल्हों के जोड़ों में सूजन व जकड़न पैदा करता है।\n\n` +
                    `**प्रमुख सावधानियां:**\n` +
                    `• **सोने की मुद्रा:** सख्त गद्दे पर सोएं, बहुत मोटा तकिया न लें। दिन में 20 मिनट पेट के बल (Prone) जरूर लेटें।\n` +
                    `• **सवेरे की दिनचर्या:** सुबह उठकर गर्म पानी से स्नान करें और तुरंत रीढ़ का व्यायाम करें।\n` +
                    `• **बचाव:** भारी वजन उठाने और रीढ़ को आगे झुकाने वाले काम न करें।\n\n` +
                    `**सुरक्षित व्यायाम:**\n` +
                    `1. *सीने का विस्तार (Deep Breathing):* हाथ फैलाकर गहरी सांस लें ताकि फेफड़ों की क्षमता बनी रहे (10 बार)।\n` +
                    `2. *भुजंगासन (Cobra Stretch):* पेट के बल लेटकर सीना ऊपर उठाएं, 5 सेकंड रोकें (10 बार)।\n` +
                    `3. *रीढ़ का खिंचाव:* दीवार से सटकर खड़े होकर सिर, कंधे व एड़ी दीवार पर सटाने का अभ्यास करें।\n\n` +
                    `**डॉक्टर सलाह:** रीढ़ को मुड़ने से बचाने के लिए **डॉ. रवि कुमार** से नियमित मोबिलाइजेशन थेरेपी लें।`
            },

            // 12. Carpal Tunnel Syndrome & Wrist RSI
            {
                match: /(carpal tunnel|cts|wrist pain|median nerve|de quervain|kalaai|finger numbness|haath me jhanjhanahat)/i,
                title: "Carpal Tunnel Syndrome & Wrist Tendonitis",
                titleHi: "कार्पल टनल सिंड्रोम एवं कलाई का दर्द",
                en: `**Clinical Summary:** Median nerve compression at the wrist causes numbness, tingling, and night pain in the thumb, index, and middle fingers.\n\n` +
                    `**Essential Do's & Don'ts:**\n` +
                    `• **Splinting:** Wear a neutral wrist cock-up splint, particularly during nighttime sleep.\n` +
                    `• **Ergonomics:** Keep wrists straight while typing; avoid resting wrists against sharp desk edges.\n` +
                    `• **Thermal:** Apply cold pack for 10 mins if swollen after computer work.\n\n` +
                    `**Key Safe Exercises:**\n` +
                    `1. *Median Nerve Glides:* Sequence of finger extension, wrist extension, thumb stretch (5 reps, gently).\n` +
                    `2. *Tendon Gliding Drills:* Straight hand -> hook fist -> full fist -> tabletop fist (10 reps).\n` +
                    `3. *Gentle Wrist Flexor Stretch:* Extend elbow, pull fingers backward with other hand for 15s (5 reps).\n\n` +
                    `**Doctor Advice:** If experiencing thumb muscle weakness or dropping objects, consult **Dr. Ravi Kumar, PT**.`,
                hi: `**चिकित्सकीय सारांश:** कलाई में नस (Median Nerve) दबने से अंगूठे और पहली दो उंगलियों में झनझनाहट, सुन्नपन और दर्द होता है।\n\n` +
                    `**प्रमुख सावधानियां:**\n` +
                    `• **कलाई का स्प्लिंट:** रात को सोते समय कलाई सीधा रखने वाला रिस्ट ब्रेस (Splint) पहनें।\n` +
                    `• **कीबोर्ड पर काम:** टाइपिंग करते समय कलाई को ज्यादा न मोड़ें; एर्गोनोमिक माउस पैड इस्तेमाल करें।\n` +
                    `• **सिकाई:** काम के बाद सूजन होने पर 10 मिनट बर्फ लगाएं।\n\n` +
                    `**सुरक्षित व्यायाम:**\n` +
                    `1. *नर्व ग्लाइडिंग (Nerve Glides):* उंगलियों और कलाई को धीरे-धीरे पीछे खींचने का नर्व स्ट्रेच (5 बार)।\n` +
                    `2. *उंगलियों की कसरत:* हाथ सीधा रखकर उंगलियों को मुट्ठी बांधने और खोलने का अभ्यास (10 बार)।\n` +
                    `3. *कलाई का खिंचाव:* हाथ सामने सीधा कर दूसरे हाथ से उंगलियों को धीरे-धीरे पीछे की ओर मोड़ें।\n\n` +
                    `**डॉक्टर सलाह:** हाथ से चीजें छूटने या कमजोरी आने पर तुरंत **डॉ. रवि कुमार** से क्लिनिकल जांच कराएं।`
            },

            // 13. Tennis Elbow & Golfer's Elbow
            {
                match: /(tennis elbow|golfer.*elbow|epicondylitis|elbow pain|kohni dard|kohni me dard)/i,
                title: "Tennis Elbow (Lateral Epicondylitis) & Golfer's Elbow",
                titleHi: "टेनिस एल्बो एवं कोहनी का खिंचाव",
                en: `**Clinical Summary:** Overuse tendinopathy of the forearm muscles at the elbow origin, aggravated by gripping, lifting, or typing.\n\n` +
                    `**Essential Do's & Don'ts:**\n` +
                    `• **Bracing:** Wear an epicondylitis counterforce strap 2 inches below the elbow crease during tasks.\n` +
                    `• **Lifting Technique:** Lift objects with palms facing up (supinated) rather than palms down.\n` +
                    `• **Rest & Ice:** Ice for 12 minutes after heavy gripping.\n\n` +
                    `**Key Safe Exercises:**\n` +
                    `1. *Wrist Extensor Stretch:* Elbow straight, gently flex wrist downwards with opposite hand, hold 20s (4 reps).\n` +
                    `2. *Eccentric Wrist Extension:* Support forearm, lift small weight up with both hands, lower down slowly with affected wrist only (3 sets of 10).\n` +
                    `3. *Soft Ball Squeezes:* Squeeze sponge ball gently (10 reps).\n\n` +
                    `**Doctor Advice:** Book Dry Needling & Manual Release with **Dr. Ravi Kumar, PT** or **Dr. Supriya, PT**.`,
                hi: `**चिकित्सकीय सारांश:** कोहनी के बाहरी हिस्से की नसों में खिंचाव या सूजन आने से सामान उठाने या मुट्ठी बांधने में तेज दर्द होता है।\n\n` +
                    `**प्रमुख सावधानियां:**\n` +
                    `• **एल्बो ब्रेस (Strap):** काम करते समय कोहनी से 2 इंच नीचे टेनिस एल्बो बेल्ट पहनें।\n` +
                    `• **सामान उठाने का तरीका:** सामान उठाते समय हथेली ऊपर की ओर रखें, हथेली नीचे रखकर न उठाएं।\n` +
                    `• **बर्फ की सिकाई:** भारी काम के बाद कोहनी के बाहरी हिस्से पर 12 मिनट बर्फ लगाएं।\n\n` +
                    `**सुरक्षित व्यायाम:**\n` +
                    `1. *कलाई का नीचे की ओर खिंचाव:* कोहनी सीधी कर दूसरे हाथ से पंजे को नीचे की ओर दबाएं (20 सेकंड रोकें)।\n` +
                    `2. *धीरे-धीरे वजन छोड़ना (Eccentric):* आधा किलो की बोतल हाथ में लेकर ऊपर उठाएं और धीरे-धीरे नीचे लाएं (10 बार)।\n` +
                    `3. *स्पंज बॉल दबाना:* नर्म रबर की गेंद को हल्के से दबाने का अभ्यास।\n\n` +
                    `**डॉक्टर सलाह:** पुराने दर्द में ड्राई नीडलिंग (CDNT) तकनीक द्वारा त्वरित लाभ हेतु **डॉ. रवि कुमार** से मिलें।`
            },

            // 14. Vertigo, BPPV & Vestibular Balance
            {
                match: /(vertigo|bppv|dizziness|chakkar|spinning head|vestibular|epley)/i,
                title: "Vertigo, BPPV & Vestibular Balance Rehabilitation",
                titleHi: "वर्टिगो, चक्कर आना एवं संतुलन पुनर्वास",
                en: `**Clinical Summary:** BPPV occurs when calcium carbonate otoconia crystals dislodge into semicircular canals, triggering room-spinning vertigo upon head movement.\n\n` +
                    `**Essential Do's & Don'ts:**\n` +
                    `• **Safety:** Do NOT drive or climb stairs during active dizzy episodes. Sit immediately if head spins.\n` +
                    `• **Bed Positioning:** Sleep elevated on two pillows; avoid rapid head turning or looking straight up to ceilings.\n` +
                    `• **Hydration:** Drink adequate fluids.\n\n` +
                    `**Clinical Maneuvers & Exercises:**\n` +
                    `1. *Canalith Repositioning (Epley Maneuver):* Performed in-clinic by our vestibular specialist to clear crystals.\n` +
                    `2. *Brandt-Daroff Exercises:* Sit upright -> drop rapidly to side -> hold 30s -> sit up -> drop to other side (5 reps, 2x daily).\n` +
                    `3. *Gaze Stabilization (VOR):* Focus on a thumb letter while rotating head slowly left and right (1 min).\n\n` +
                    `**Doctor Advice:** Book diagnostic vestibular assessment with Director **Dr. Ravi Kumar, PT (MPT Neuro)**.`,
                hi: `**चिकित्सकीय सारांश:** सिर घुमाने, करवट लेने या बिस्तर से उठने पर कमरा गोल घूमता हुआ महसूस होना वर्टिगो (BPPV) का संकेत है।\n\n` +
                    `**प्रमुख सावधानियां:**\n` +
                    `• **सुरक्षा:** चक्कर आने पर तुरंत बैठ जाएं, वाहन न चलाएं और सीढ़ियां अकेले न चढ़ें।\n` +
                    `• **सोने की स्थिति:** थोड़ा ऊंचा तकिया लगाकर सोएं और झटके से सिर ऊपर या अगल-बगल न घुमाएं।\n` +
                    `• **पर्याप्त पानी:** दिनभर में पर्याप्त पानी और तरल पदार्थ लें।\n\n` +
                    `**पुनर्वास तकनीक एवं कसरत:**\n` +
                    `1. *एपले प्रक्रिया (Epley Maneuver):* क्लिनिक में डॉक्टर द्वारा सिर को विशेष कोणों में घुमाकर कान के क्रिस्टल सही किए जाते हैं।\n` +
                    `2. *ब्रांट-डारॉफ व्यायाम:* बिस्तर पर बैठकर एक तरफ करवट लेटें (30 सेकंड रुकें), फिर उठकर दूसरी तरफ लेटें (5 बार)।\n` +
                    `3. *आंखों की स्थिरता अभ्यास:* अंगूठे को देखते हुए सिर को धीरे-धीरे बाएं-दाएं हिलाएं।\n\n` +
                    `**डॉक्टर सलाह:** सही डायग्नोसिस और एपले मैनूवर के लिए हमारे न्यूरो विशेषज्ञ **डॉ. रवि कुमार** से परामर्श लें।`
            },

            // 15. Spinal Canal Stenosis & Neurogenic Claudication
            {
                match: /(spinal stenosis|canal stenosis|canal narrow|claudication|shopping cart|chalne par pair me dard)/i,
                title: "Lumbar Spinal Stenosis & Neurogenic Claudication",
                titleHi: "स्पाइनल स्टेनोसिस एवं चलने पर पैरों में भारीपन",
                en: `**Clinical Summary:** Narrowing of the spinal canal compresses cauda equina nerves, causing bilateral leg heaviness/cramping relieved only by bending forward (Shopping Cart Sign).\n\n` +
                    `**Essential Do's & Don'ts:**\n` +
                    `• **Flexion Bias:** Bending slightly forward opens spinal canals and relieves leg pain. Use a walker or shopping cart.\n` +
                    `• **Avoid:** Prolonged backward spine bending (extensions) which narrows the canal further.\n` +
                    `• **Aerobics:** Stationary cycling is much better tolerated than treadmill walking.\n\n` +
                    `**Key Safe Exercises:**\n` +
                    `1. *Double Knee to Chest:* Lie supine, hug both knees into chest for 20s (6 reps) to open lumbar foramen.\n` +
                    `2. *Seated Forward Flexion:* Sit on chair, gently slump forward bringing hands towards feet, hold 15s (8 reps).\n` +
                    `3. *Stationary Recumbent Bike:* 10-15 minutes at low resistance in forward-leaning posture.\n\n` +
                    `**Doctor Advice:** Evaluated by spine neuro-rehab specialist **Dr. Ravi Kumar, PT**.`,
                hi: `**चिकित्सकीय सारांश:** रीढ़ की नली (Canal) संकरी होने से थोड़ी दूर चलने पर दोनों पैरों में भारीपन, दर्द और जकड़न होती है जो आगे झुककर बैठने पर ठीक होती है।\n\n` +
                    `**प्रमुख सावधानियां:**\n` +
                    `• **आगे झुकने से राहत:** आगे झुकने पर नस की नली खुलती है। चलते समय ट्रॉली या वॉकर का सहारा लेना आरामदायक रहता है।\n` +
                    `• **पीछे झुकने से बचें:** कमर को पीछे की ओर मोड़ने से नस पर दबाव बढ़ता है, इससे बचें।\n` +
                    `• **साइकिल चलाना:** जमीन पर चलने की तुलना में स्टेशनरी साइकिल चलाना अधिक सुरक्षित और दर्दमुक्त रहता है।\n\n` +
                    `**सुरक्षित व्यायाम:**\n` +
                    `1. *दोनों घुटने छाती से लगाना:* पीठ के बल लेटकर दोनों घुटने छाती की ओर मोड़ें, 20 सेकंड रोकें (6 बार)।\n` +
                    `2. *कुर्सी पर झुकना:* कुर्सी पर बैठकर कमर को ढीला छोड़ते हुए आगे पैरों की ओर झुकें (15 सेकंड रोकें)।\n` +
                    `3. *पेल्विक टिल्ट:* कमर की मांसपेशियों को मजबूत करने के लिए पीठ जमीन पर दबाएं।\n\n` +
                    `**डॉक्टर सलाह:** बिना ऑपरेशन के राहत पाने हेतु **डॉ. रवि कुमार** के विशेष स्टेनोसिस प्रोटोकॉल से जुड़ें।`
            },

            // 16. ACL / Knee Ligament Rehab & Sports Return
            {
                match: /(acl|mcl|pcl|ligament tear|meniscus tear|sports injury|knee twist|running pain)/i,
                title: "ACL, Meniscus & Knee Ligament Rehabilitation",
                titleHi: "एसीएल (ACL) एवं लिगामेंट इंजरी केयर",
                en: `**Clinical Summary:** Knee ligament and meniscus injuries require phased neuromuscular stability, progressive quadriceps/hamstring loading, and proprioceptive control.\n\n` +
                    `**Essential Phase Guidelines:**\n` +
                    `• **Phase 1 (0–4 Wks):** Full knee extension (0°) is priority #1. Ice 15 mins every 3 hrs. Avoid open-chain resisted knee kicking.\n` +
                    `• **Phase 2 (4–12 Wks):** Closed kinetic chain strengthening (mini squats, leg press, bridges).\n` +
                    `• **Return to Sport:** Only after passing Single-Leg Hop Test and 90%+ quadriceps limb symmetry index (LSI).\n\n` +
                    `**Key Safe Exercises:**\n` +
                    `1. *Prone Hangs / Towel Extensions:* Regain full straight extension.\n` +
                    `2. *Wall Sits & Mini Squats:* 30-45 degree knee bends holding 20s (5 reps).\n` +
                    `3. *Single-Leg Balance Drills:* Balance on affected leg with soft knee (30s hold, 5 reps).\n\n` +
                    `**Doctor Advice:** Monitored by sports therapists **Dr. Ravi Kumar, PT** and **Dr. Supriya, PT**.`,
                hi: `**चिकित्सकीय सारांश:** घुटने का मुड़ना या लिगामेंट (ACL/Meniscus) का खिंचाव सही फिजियोथेरेपी से बिना सर्जरी या सर्जरी के बाद पूरी तरह ठीक होता है।\n\n` +
                    `**प्रमुख चरणबद्ध सावधानियां:**\n` +
                    `• **पहला चरण:** घुटने को पूरी तरह सीधा (0 डिग्री) रखना सबसे जरूरी है। सूजन पर नियमित बर्फ लगाएं।\n` +
                    `• **दूसरा चरण:** दीवार के सहारे हल्के उठक-बैठक (Mini Squats) और जांघ की मांसपेशियों को मजबूत करना।\n` +
                    `• **खेल में वापसी:** डॉक्टर द्वारा संतुलन और ताकत की जांच (Hop Test) पास करने के बाद ही दौड़ना शुरू करें।\n\n` +
                    `**सुरक्षित व्यायाम:**\n` +
                    `1. *घुटना सीधा दबाना (Quad Sets):* घुटने के नीचे तौलिया रखकर 5 सेकंड दबाएं (20 बार)।\n` +
                    `2. *दीवार के सहारे आधा बैठना (Wall Sit):* पीठ दीवार पर टिकाकर घुटने हल्के मोड़ें, 20 सेकंड रुकें।\n` +
                    `3. *एक पैर पर संतुलन:* प्रभावित पैर पर 30 सेकंड खड़े रहने का अभ्यास करें।\n\n` +
                    `**डॉक्टर सलाह:** खेल चोटों की रिकवरी के लिए **डॉ. रवि कुमार** या **डॉ. सुप्रिया** से विशेष स्पोर्ट्स रिहैब लें।`
            },

            // 17. Geriatric Fall Prevention & Elderly Balance
            {
                match: /(elderly|geriatric|fall|balance problem|purane log|buzurg|ladkhadana|walker)/i,
                title: "Geriatric Balance, Mobility & Fall Prevention",
                titleHi: "बुजुर्गों के लिए संतुलन एवं गिरने से बचाव",
                en: `**Clinical Summary:** Age-related sarcopenia, sensory changes, and vestibular decline increase fall risks. Structured balance exercises cut fall rates by over 40%.\n\n` +
                    `**Essential Safety Precautions:**\n` +
                    `• **Home Safety:** Remove loose scatter rugs, install bathroom grab bars, and ensure bright night lighting.\n` +
                    `• **Footwear:** Firm, non-skid rubber soled shoes; never walk in slippery socks.\n` +
                    `• **Walking Aids:** Correctly sized walker/stick (handle level with wrist crease when standing).\n\n` +
                    `**Key Safe Balance Exercises:**\n` +
                    `1. *Sit-to-Stand Drill:* Stand up from a sturdy dining chair without using arm rests if safe (10 reps, 2 sets).\n` +
                    `2. *Tandem & Semi-Tandem Stance:* Stand with one foot directly in front of other holding kitchen counter (hold 20s).\n` +
                    `3. *Heel-to-Toe Steps:* Walk a straight line holding a hallway rail (10 steps).\n\n` +
                    `**Doctor Advice:** Schedule a comprehensive Geriatric Assessment with **Dr. Ravi Kumar, PT**.`,
                hi: `**चिकित्सकीय सारांश:** उम्र बढ़ने के साथ संतुलन कमजोर होना और लड़खड़ाना सामान्य है, लेकिन सही कसरत से गिरने (Falls) का खतरा 40% तक कम हो जाता है।\n\n` +
                    `**घर में सुरक्षा के उपाय:**\n` +
                    `• **फर्श से कालीन हटाएं:** मुड़े हुए पायदान हटाएं, बाथरूम में पकड़ने वाले हैंडल (Grab bars) लगवाएं और रात में जीरो वाट का बल्ब जलाकर रखें।\n` +
                    `• **जूते-चप्पल:** रबर ग्रिप वाली चप्पल पहनें, चिकने मोजे पहनकर संगमरमर के फर्श पर न चलें।\n` +
                    `• **लाठी/वॉकर की ऊंचाई:** छड़ी की ऊंचाई कलाई के स्तर तक होनी चाहिए।\n\n` +
                    `**संतुलन के सुरक्षित व्यायाम:**\n` +
                    `1. *कुर्सी से उठना-बैठना (Sit to Stand):* बिना हाथ का सहारा लिए मजबूत कुर्सी से 10 बार खड़े हों और बैठें।\n` +
                    `2. *एक सीध में खड़े होना:* एक पैर के आगे दूसरा पैर रखकर रेलिंग पकड़कर 20 सेकंड खड़े रहें।\n` +
                    `3. *पंजों और एड़ी पर उठना:* दीवार पकड़कर पंजों पर शरीर ऊपर उठाएं (15 बार)।\n\n` +
                    `**डॉक्टर सलाह:** बुजुर्गों के लिए क्लिनिक या होम विजिट थेरेपी हेतु **डॉ. रवि कुमार** से संपर्क करें।`
            },

            // 18. Post-Fracture Joint Stiffness (Colles / Elbow / Ankle)
            {
                match: /(fracture stiffness|plaster ke baad|haddi tootne|post fracture|haddi jam|colles)/i,
                title: "Post-Fracture Joint Stiffness Rehabilitation",
                titleHi: "प्लास्टर कटने के बाद जोड़ की जकड़न",
                en: `**Clinical Summary:** Prolonged cast immobilization causes periarticular contracture, muscle atrophy, and joint hypomobility. Careful progressive mobilization is critical.\n\n` +
                    `**Essential Precautions:**\n` +
                    `• **No Forceful Manipulation:** NEVER allow forceful sudden cracking or twisting of post-fracture joints (risks refracture or myositis ossificans).\n` +
                    `• **Warm Contrast Bath:** Soak joint in warm water for 10 mins before starting active stretches.\n` +
                    `• **Edema Control:** Elevate limb if swelling persists at end of day.\n\n` +
                    `**Key Safe Exercises:**\n` +
                    `1. *Active-Assisted Range of Motion (AAROM):* Gently guide joint through its available range with opposite hand.\n` +
                    `2. *Sustained Low-Load End-Range Holds:* Reach end-range and hold gently for 30s (do not bounce).\n` +
                    `3. *Isometric Muscle Sets:* Contract muscles around the fracture site without joint movement (hold 5s, 10 reps).\n\n` +
                    `**Doctor Advice:** Book manual joint mobilization with **Dr. Ravi Kumar, PT** and **Dr. Supriya, PT**.`,
                hi: `**चिकित्सकीय सारांश:** हड्डी जुड़ने के बाद प्लास्टर कटने पर जोड़ का जाम होना सामान्य है। इसे सही वैज्ञानिक तरीके से खोलना अनिवार्य है।\n\n` +
                    `**अति-महत्वपूर्ण सावधानियां:**\n` +
                    `• **झटके से न मरोड़ें:** किसी से भी जोड़ को झटके से न खिंचवाएं, इससे हड्डी में दोबारा चोट या मांसपेशी में पथरी (Myositis) बन सकती है।\n` +
                    `• **सिकाई:** कसरत से पहले 10-15 मिनट गुनगुने पानी में सेंक करें।\n` +
                    `• **सूजन:** शाम को सूजन आने पर हाथ या पैर को तकिए पर ऊंचा रखें।\n\n` +
                    `**सुरक्षित व्यायाम:**\n` +
                    `1. *सहारे से जोड़ मोड़ना:* दूसरे स्वस्थ हाथ से सहारा देकर जोड़ को धीरे-धीरे मोड़ें और सीधा करें।\n` +
                    `2. *खिंचाव को रोकना (Sustained Stretch):* जहां तक जोड़ मुड़े, वहां 30 सेकंड धीरे से रोककर रखें (झटका न दें)।\n` +
                    `3. *हल्की मालिश व पंजे चलाना:* रक्त संचार बढ़ाने के लिए उंगलियां और पंजे लगातार चलाते रहें।\n\n` +
                    `**डॉक्टर सलाह:** सुरक्षित जोड़ मोबिलाइजेशन के लिए क्लिनिक में **डॉ. रवि कुमार** या **डॉ. सुप्रिया** से उपचार कराएं।`
            },

            // 19. Ergonomic Posture, Upper Crossed Syndrome & WFH Spine
            {
                match: /(posture|upper crossed|slouching|hunchback|desk work|work from home|ergonomics|jhuk kar baithna)/i,
                title: "Ergonomic Posture & Upper Crossed Syndrome",
                titleHi: "पोस्चर सुधार एवं डेस्क वर्क एर्गोनॉमिक्स",
                en: `**Clinical Summary:** Forward head posture, rounded shoulders, and anterior pelvic tilt develop from hours of hunching over desks and phones.\n\n` +
                    `**Essential Ergonomic Checklist:**\n` +
                    `• **20-20-20 Rule:** Every 20 minutes, stand up or look 20 feet away for 20 seconds.\n` +
                    `• **Monitor Height:** Eye level must hit top third of monitor; elbows at 90 degrees supported by armrests.\n` +
                    `• **Lumbar Support:** Place a lumbar roll in the small of your lower back.\n\n` +
                    `**Key Safe Exercises:**\n` +
                    `1. *Doorway Pectoral Stretch:* Place arms on door frame, step forward gently to stretch chest (hold 20s, 4 reps).\n` +
                    `2. *Scapular Retraction & Depress:* Pull shoulder blades back and down as if putting them in back pockets (15 reps).\n` +
                    `3. *Prone Y-T-W Drills:* Lie on stomach, lift arms into Y, T, and W shapes engaging mid-back (10 reps each).\n\n` +
                    `**Doctor Advice:** Book an Ergonomic Postural Assessment with **Dr. Supriya, PT**.`,
                hi: `**चिकित्सकीय सारांश:** घंटों कंप्यूटर या मोबाइल पर झुककर काम करने से गर्दन आगे निकल जाती है, कंधे झुक जाते हैं और पीठ में जकड़न होती है।\n\n` +
                    `**एर्गोनॉमिक्स के नियम:**\n` +
                    `• **20-20-20 का नियम:** हर 20 मिनट में 20 सेकंड के लिए खड़े हों या दूर देखें।\n` +
                    `• **स्क्रीन की सही ऊंचाई:** कंप्यूटर स्क्रीन बिल्कुल आंखों के सामने हो, कोहनी 90 डिग्री पर कुर्सी के हत्थे पर टिकी हो।\n` +
                    `• **कमर के पीछे तकिया:** कुर्सी पर पीठ के निचले हिस्से में छोटा तकिया (Lumbar Roll) लगाएं।\n\n` +
                    `**सुरक्षित व्यायाम:**\n` +
                    `1. *दरवाजे में सीने का खिंचाव:* दरवाजे के दोनों किनारों पर हाथ रखकर सीना आगे की ओर निकालें (20 सेकंड रोकें)।\n` +
                    `2. *कंधों को पीछे खींचना:* कंधों के दोनों ब्लेड्स को पीछे की ओर सिकोड़ें और 5 सेकंड रोकें (15 बार)।\n` +
                    `3. *चिन टक्स:* ठुड्डी को सीधे पीछे ले जाकर गर्दन की गहरी मांसपेशियों को मजबूत करें।\n\n` +
                    `**डॉक्टर सलाह:** व्यक्तिगत पोस्चरल जांच के लिए हमारी विशेषज्ञ **डॉ. सुप्रिया** से परामर्श लें।`
            },

            // 20. Fibromyalgia & Chronic Myofascial Pain Syndrome
            {
                match: /(fibromyalgia|myofascial|trigger point|pure sharir me dard|body ache|chronic fatigue)/i,
                title: "Fibromyalgia & Chronic Myofascial Pain",
                titleHi: "फाइब्रोमायल्जिया एवं मांसपेशियों का पुराना दर्द",
                en: `**Clinical Summary:** Characterized by widespread musculoskeletal aches, hyperalgesia at tender trigger points, fatigue, and altered pain processing.\n\n` +
                    `**Essential Guidelines:**\n` +
                    `• **Pacing:** Avoid boom-and-bust cycles. Divide daily physical chores into manageable, paced intervals.\n` +
                    `• **Thermal:** Soothing full-body warm baths or moist heat packs over aching back and neck muscles.\n` +
                    `• **Sleep Hygiene:** Maintain consistent sleep hours in a dark, quiet room.\n\n` +
                    `**Key Safe Exercises:**\n` +
                    `1. *Low-Impact Walking:* 15-20 minutes of relaxed walking daily without pushing into exhaustion.\n` +
                    `2. *Gentle Cat-Camel Spinal Stretches:* On hands and knees, slowly arch and round spine (10 reps).\n` +
                    `3. *Diaphragmatic Box Breathing:* 4s inhale, 4s hold, 4s exhale, 4s hold (5 mins to calm sympathetic nervous system).\n\n` +
                    `**Doctor Advice:** Clinical Dry Needling (CDNT) & gentle myofascial release under **Dr. Ravi Kumar, PT**.`,
                hi: `**चिकित्सकीय सारांश:** पूरे शरीर की मांसपेशियों में पुराना दर्द, थकान, अनिद्रा और शरीर के अलग-अलग बिंदुओं पर छूने से दर्द होना फाइब्रोमायल्जिया के लक्षण हैं।\n\n` +
                    `**प्रमुख सावधानियां:**\n` +
                    `• **पेसिंग (Pacing):** एक ही दिन में सारा काम न करें; बीच-बीच में आराम लेकर काम बांटें।\n` +
                    `• **गर्म पानी से सिकाई:** हल्के गर्म पानी से स्नान करें या हीटिंग पैड से मांसपेशियों को राहत दें।\n` +
                    `• **नींद का नियम:** समय पर सोएं और मोबाइल को बिस्तर से दूर रखें।\n\n` +
                    `**सुरक्षित व्यायाम:**\n` +
                    `1. *हल्का टहलना:* बिना थके रोज 15-20 मिनट सामान्य गति से टहलें।\n` +
                    `2. *कैट-कैमल स्ट्रेच:* घुटनों और हाथों के बल आकर पीठ को धीरे-धीरे ऊपर और नीचे करें (10 बार)।\n` +
                    `3. *गहरी सांस लेने का अभ्यास:* पेट से गहरी सांस लें और धीरे-धीरे छोड़ें ताकि नर्वस सिस्टम शांत हो।\n\n` +
                    `**डॉक्टर सलाह:** मांसपेशियों की गहरी गांठों (Trigger Points) को खोलने हेतु **डॉ. रवि कुमार** से ड्राई नीडलिंग व मायोफेशियल थेरेपी लें।`
            }
        ],

        // General Clinic FAQs
        faqs: [
            {
                match: /(login|log in|patient id|pid|password|unlock|forgot|portal kaise|id kahan|login nahi|access denied)/i,
                en: "**🔑 How to Log In & Find Your Patient ID:**\n• **Step 1:** In the first field, enter your registered 10-digit Mobile Number (or registered full name).\n• **Step 2:** In the second field, enter your 4-digit Patient ID (e.g. `1062` or full ID `PHC26/1062`).\n• **Where is your ID?** Your Patient ID is printed at the top of your physical prescription slip, on your billing receipts, or sent to your WhatsApp at registration.\n• **Need Help?** If you cannot find your ID, contact reception or Dr. Ravi directly via WhatsApp at **+91 97080 59081**.",
                hi: "**🔑 पोर्टल लॉगिन एवं पेशेंट आईडी (Patient ID) प्राप्त करने का तरीका:**\n• **पहला चरण:** पहले बॉक्स में अपना 10 अंकों का रजिस्टर्ड मोबाइल नंबर (या पूरा नाम) लिखें।\n• **दूसरा चरण:** दूसरे बॉक्स में अपनी 4 अंकों की पेशेंट आईडी (जैसे `1062` या `PHC26/1062`) दर्ज करें।\n• **आईडी कहाँ मिलेगी?** पेशेंट आईडी आपके पर्चे (Prescription) के ऊपर, रसीद पर या क्लिनिक से आए व्हाट्सएप मैसेज में लिखी होती है।\n• **सहायता:** यदि आईडी न मिले, तो **+91 97080 59081** पर व्हाट्सएप या कॉल करके तुरंत प्राप्त करें।"
            },
            {
                match: /(timing|hours|open|schedule|samay|kab khulta)/i,
                en: "**⏰ Clinic Working Hours:**\n• **Monday to Saturday:** 9:00 AM – 8:00 PM\n• **Sunday:** 10:00 AM – 2:00 PM\n• **Patna Units:** Gola Road & Kanti Factory Road\n• **Begusarai Unit:** Main Road, Begusarai HQ\n• **Helpline:** +91 97080 59081",
                hi: "**⏰ क्लिनिक का समय:**\n• **सोमवार से शनिवार:** सुबह 9:00 बजे से रात 8:00 बजे तक\n• **रविवार:** सुबह 10:00 बजे से दोपहर 2:00 बजे तक\n• **पटना:** गोला रोड एवं कांटी फैक्ट्री रोड\n• **बेगूसराय:** मेन रोड, बेगूसराय\n• **हेल्पलाइन:** +91 97080 59081"
            },
            {
                match: /(fee|cost|charge|price|kitna paisa|consultation fee|charges)/i,
                en: "**💳 Consultation & Treatment Charges:**\n• **Clinical Assessment:** ₹500 (Detailed physical evaluation)\n• **Therapy Sessions:** Customized based on modalities (Manual Therapy, Neuro Rehab, Dry Needling, Cupping)\n• **Packages:** 10 & 20 session discounted cards available with live digital passbook tracking\n• **Payment:** Cash, UPI, Cards",
                hi: "**💳 परामर्श एवं उपचार शुल्क:**\n• **क्लिनिकल जांच (Consultation):** ₹500\n• **सेशन थेरेपी:** बीमारी और थेरेपी के अनुसार निर्धारित\n• **रियायती पैकेज:** 10 एवं 20 सेशन के पैकेज उपलब्ध हैं जिसमें लाइव पासबुक मिलती है।\n• **भुगतान:** नकद, यूपीआई (GPay/PhonePe), कार्ड"
            },
            {
                match: /(home visit|ghar par|home therapy|home service)/i,
                en: "**🏠 Home Visit Physiotherapy:**\n• Dedicated home rehabilitation is provided for stroke, post-operative, geriatric, and bedridden patients across Patna and Begusarai.\n• **Bookings:** Call **+91 97080 59081** to schedule a therapist visit.",
                hi: "**🏠 घर पर फिजियोथेरेपी (Home Visit):**\n• जो मरीज क्लिनिक आने में असमर्थ हैं (स्ट्रोक, ऑपरेशन के बाद या बुजुर्ग), उनके लिए पटना और बेगूसराय में होम सर्विस उपलब्ध है।\n• **बुकिंग:** **+91 97080 59081** पर कॉल करें।"
            },
            {
                match: /(soreness|pain after exercise|exercise ke baad dard|dard badh gaya|normal hai kya)/i,
                en: "**🩺 Post-Therapy Soreness (DOMS):**\n• **Normal:** Mild muscle aching for 24–48 hours after starting new rehabilitation exercises is completely normal and indicates muscle adaptation.\n• **Action:** Apply warm compress for 15 minutes, do gentle stretching, and drink water.\n• **Abnormal:** Sharp, shooting, or swollen joint pain is not normal. Contact our clinic immediately.",
                hi: "**🩺 कसरत के बाद दर्द होना (DOMS):**\n• **सामान्य:** नई कसरत शुरू करने पर 24 से 48 घंटे तक हल्की मांसपेशियों में खिंचाव पूरी तरह सामान्य है।\n• **उपाय:** 15 मिनट गर्म सिकाई करें और पानी पिएं।\n• **असामान्य:** यदि तेज चुभन या सूजन हो तो कसरत बंद करके डॉक्टर को बताएं।"
            },
            {
                match: /(medicine|dawa|tablet|painkiller|goli|kaun si dawa)/i,
                en: "**💊 Medication Guidance & Advisory:**\n• Physiotherapists at Prism specialize in physical rehabilitation, exercise prescription, and biomechanical correction.\n• We do not alter or prescribe systemic oral pharmaceutical medications without your primary medical physician's consent.\n• Please continue prescribed pain or nerve medications as directed by your physician.",
                hi: "**💊 दवाओं के संबंध में सलाह:**\n• प्रिज्म फिजियोथेरेपी में हम शारीरिक कसरत और बायोमैकेनिकल उपचार द्वारा दर्द ठीक करते हैं।\n• हम बिना डॉक्टर की अनुमति के दवाओं में बदलाव नहीं करते। कृपया अपने मुख्य चिकित्सक द्वारा दी गई दवाएं समय पर लें।"
            },
            {
                match: /(what to wear|clothes|dress|kapde|pehankar|outfit)/i,
                en: "**👕 What to Wear for Your Therapy Session:**\n• Wear loose, comfortable athletic or stretchable clothing (track pants, t-shirt).\n• Ensure easy physical access to the affected joint (e.g. knee, shoulder, neck).\n• Avoid rigid jeans or tight belts during spinal assessment.",
                hi: "**👕 थेरेपी के लिए कपड़े (What to wear):**\n• ढीले, आरामदायक और लचीले कपड़े पहनें (जैसे लोअर/ट्रैक पैंट और टी-शर्ट)।\n• प्रभावित जोड़ (घुटना, कंधा, गर्दन) की आसानी से जांच हो सके ऐसे कपड़े उपयुक्त रहते हैं।\n• कमर या घुटने की जांच के समय टाइट जींस न पहनें।"
            },
            {
                match: /(how many sessions|kitne din|kitna session|recovery time|theek hone me kitna)/i,
                en: "**🗓️ Expected Sessions & Recovery Timeline:**\n• **Acute Strains/Sprains:** 5–8 focused sessions.\n• **Disc Bulges & Sciatica:** 10–15 sessions for spine stabilization and centralization.\n• **Stroke & Neurological Rehab:** 1–3 months of intensive neuro-rehabilitation.\n• **TKR/THR Joint Replacement:** 3–6 weeks for functional gait independence.",
                hi: "**🗓️ ठीक होने में कितना समय व कितने सेशन लगेंगे:**\n• **ताज़ी मोच या खिंचाव:** 5 से 8 सेशन।\n• **स्लिप डिस्क व सायटिका:** 10 से 15 सेशन (नस का दबाव हटाने व कमर मजबूत करने हेतु)।\n• **स्ट्रोक व लकवा:** 1 से 3 महीने का नियमित न्यूरो रिहैब।\n• **घुटना/कूल्हा ऑपरेशन (TKR/THR):** 3 से 6 सप्ताह में स्वतंत्र चलना।"
            }
        ]
    };

    /* ========================================================================
     * 3. PATIENT CONTEXT DETECTION
     * ======================================================================== */

    function getActivePatientContext() {
        let p = null;
        let exercises = [];
        let instructions = [];
        let remainingSessions = null;
        let walletBalance = null;
        let doctor = "Dr. Ravi Kumar, PT";

        if (window.loggedInPatient && typeof window.loggedInPatient === 'object') {
            p = window.loggedInPatient;
        }

        if (Array.isArray(window.currentPatientExercises)) {
            exercises = window.currentPatientExercises;
        }

        if (Array.isArray(window.currentPatientInstructions)) {
            instructions = window.currentPatientInstructions;
        }

        if (window.currentTreatingDoctor) {
            doctor = window.currentTreatingDoctor;
        }

        const remEl = document.getElementById('p-rem-sessions');
        if (remEl && remEl.innerText && remEl.innerText !== '—') {
            remainingSessions = remEl.innerText.trim();
        }

        const balEl = document.getElementById('p-advance');
        if (balEl && balEl.innerText) {
            walletBalance = balEl.innerText.trim();
        }

        if (!p) {
            try {
                const cachedStr = localStorage.getItem('prism_patient_cache');
                if (cachedStr) {
                    const cached = JSON.parse(cachedStr);
                    if (cached && cached.patient) {
                        p = cached.patient;
                        if (cached.exerciseData && Array.isArray(cached.exerciseData)) {
                            const pName = (p.name || '').toLowerCase();
                            const pId = (p.id || '').toLowerCase();
                            exercises = cached.exerciseData.filter(ex => {
                                const rowId = String(ex[0] || '').toLowerCase();
                                const rowName = String(ex[1] || '').toLowerCase();
                                return (pId && (rowId === pId || rowId.endsWith(pId.slice(-4)))) ||
                                       (pName && (rowName === pName || rowId === pName));
                            });
                        }
                    }
                }
            } catch (e) {
                console.warn("PrismAI Context extraction notice:", e);
            }
        }

        return {
            isLoggedIn: Boolean(p && p.name),
            patient: p,
            name: p ? p.name : null,
            id: p ? p.id : null,
            diagnosis: p ? (p.diag || "Rehabilitation Protocol") : null,
            age: p ? p.age : null,
            gender: p ? p.gender : null,
            phone: p ? p.phone : null,
            doctor: doctor,
            exercises: exercises,
            instructions: instructions,
            remainingSessions: remainingSessions,
            walletBalance: walletBalance
        };
    }

    /* ========================================================================
     * 4. NATURAL LANGUAGE PROCESSOR (WITH RESPONSE LENGTH & FORMAT LIMITS)
     * ======================================================================== */

    function isQueryInHindi(query) {
        if (!query) return false;
        const devanagariCount = (query.match(/[\u0900-\u097F]/g) || []).length;
        if (devanagariCount > 3) return true;

        const hinglishPattern = /\b(dard|kamar|gardan|ghutna|kandha|sikai|garam|thanda|barf|kaise|kya|batao|bataiye|kitna|bacha|hai|kare|karte|doctor|lakwa|chot|sujan|theek|thik|ilaaj|paani|kon|koun)\b/i;
        return hinglishPattern.test(query);
    }

    function generatePersonalizedAnswer(query, context, preferredLang = null) {
        const q = String(query || '').trim();
        const isHi = preferredLang === 'hi' || (preferredLang === null && isQueryInHindi(q));
        const ctx = context || getActivePatientContext();

        // 1. Critical Red Flag Triage (Highest Priority)
        for (const rf of CLINICAL_KB.redFlags) {
            if (rf.pattern.test(q)) {
                return {
                    isAlert: true,
                    urgency: rf.urgency,
                    title: isHi ? rf.titleHi : rf.title,
                    text: isHi ? rf.hi : rf.en,
                    actions: [
                        { label: isHi ? "🚨 आपातकालीन कॉल (+91 97080 59081)" : "🚨 Emergency Call (+91 97080 59081)", href: "tel:+919708059081" },
                        { label: isHi ? "💬 व्हाट्सएप डॉक्टर" : "💬 WhatsApp Doctor", href: "https://wa.me/919708059081" }
                    ]
                };
            }
        }

        // 2. "Know Your Doctor" Intent (Shows Assigned Doctor ONLY when logged in)
        if (/(doctor|doctor profile|know your doctor|doctors|ravi|supriya|puja|specialist|physiotherapist|qualification|lead clinician|who is my doctor|mera doctor|assigned doctor)/i.test(q)) {
            if (ctx.isLoggedIn && ctx.doctor) {
                const docName = ctx.doctor.toLowerCase();
                let doc = DOCTORS_DIRECTORY[0];
                if (docName.includes('supriya')) doc = DOCTORS_DIRECTORY[1];
                else if (docName.includes('puja')) doc = DOCTORS_DIRECTORY[2];

                return {
                    title: isHi ? `👨‍⚕️ आपके नियुक्त फिजियोथेरेपिस्ट: ${doc.name}` : `👨‍⚕️ Your Assigned Doctor: ${doc.name}`,
                    text: isHi
                        ? `**आपके नियुक्त मुख्य फिजियोथेरेपिस्ट (Assigned Treating Consultant):**\n\n` +
                          `• **नाम:** **${doc.name}**\n` +
                          `• **पद:** ${doc.designationHi || doc.designation}\n` +
                          `• **रजिस्ट्रेशन:** MIAP Reg No: **${doc.registrationNo}**\n` +
                          `• **योग्यता:** ${doc.degrees}\n` +
                          `• **अनुभव:** ${doc.experience}\n` +
                          `• **क्लिनिक परामर्श समय:** ${doc.timings}\n` +
                          `• **ओपीडी केंद्र:** ${doc.clinicLocations}\n\n` +
                          `**मुख्य चिकित्सकीय विशेषज्ञताएं:**\n` +
                          doc.specialtiesHi.slice(0, 3).map(s => `  ✓ ${s}`).join('\n') + `\n\n` +
                          `*आप सीधे अपने डॉक्टर से व्हाट्सएप पर परामर्श कर सकते हैं या उनकी पूरी प्रोफाइल देख सकते हैं।*`
                        : `**Your Assigned Treating Consultant:**\n\n` +
                          `• **Name:** **${doc.name}**\n` +
                          `• **Designation:** ${doc.designation}\n` +
                          `• **Registration:** MIAP Reg No: **${doc.registrationNo}**\n` +
                          `• **Qualifications:** ${doc.degrees}\n` +
                          `• **Clinical Experience:** ${doc.experience}\n` +
                          `• **Consultation Timings:** ${doc.timings}\n` +
                          `• **OPD Center:** ${doc.clinicLocations}\n\n` +
                          `**Key Clinical Mastery:**\n` +
                          doc.specialties.slice(0, 3).map(s => `  ✓ ${s}`).join('\n') + `\n\n` +
                          `*You can message your doctor directly on WhatsApp or open their full clinical profile below.*`,
                    actions: [
                        { label: isHi ? "💬 डॉक्टर को व्हाट्सएप करें" : "💬 WhatsApp Doctor", href: `https://wa.me/919708059081?text=${encodeURIComponent(doc.whatsappMsg)}` },
                        { label: isHi ? "👨‍⚕️ डॉक्टर का विवरण देखें" : "👨‍⚕️ View Doctor Profile", onclick: `PrismAI.openDoctorModal('${doc.id}')` }
                    ]
                };
            }

            return {
                title: isHi ? "👨‍⚕️ हमारे विशेषज्ञ डॉक्टर्स" : "👨‍⚕️ Know Your Doctor — Clinical Leadership",
                text: isHi
                    ? `**प्रिज्म हेल्थकेयर की विशेषज्ञ क्लिनिकल टीम:**\n\n` +
                      `1. **डॉ. रवि कुमार, PT** (संस्थापक निदेशक, MPT Neuro)\n` +
                      `   ↳ विशेषज्ञ: स्ट्रोक व लकवा पुनर्वास, जटिल रीढ़ व स्लिप डिस्क, ड्राई नीडलिंग।\n\n` +
                      `2. **डॉ. सुप्रिया, PT** (कंसलटेंट फिजियोथेरेपिस्ट)\n` +
                      `   ↳ विशेषज्ञ: महिला स्वास्थ्य (पेल्विक फ्लोर), घुटना व कूल्हा रिप्लेसमेंट रिकवरी।\n\n` +
                      `3. **डॉ. पूजा, PT** (सीनियर कंसलटेंट)\n` +
                      `   ↳ विशेषज्ञ: सेरेब्रल पाल्सी, ऑटिज्म, बच्चों में चलने-फिरने का विकास।\n\n` +
                      `*प्रत्येक डॉक्टर का संपूर्ण बायोडाटा देखने के लिए नीचे दिए गए बटन पर क्लिक करें।*`
                    : `**Prism Healthcare Clinical Leadership Team:**\n\n` +
                      `1. **Dr. Ravi Kumar, PT** (Founder Director, MPT Neurology)\n` +
                      `   ↳ Focus: Stroke Paralysis, Severe Spine & Disc, Dry Needling & Manual Therapy.\n\n` +
                      `2. **Dr. Supriya, PT** (Consultant Physiotherapist)\n` +
                      `   ↳ Focus: Women's Health (Pelvic Floor, Diastasis), Post-Surgical TKR/THR Rehab.\n\n` +
                      `3. **Dr. Puja, PT** (Senior Consultant)\n` +
                      `   ↳ Focus: Pediatric Neuro Rehab, Cerebral Palsy (CP), Autism & Milestones.\n\n` +
                      `*Click the button below to view detailed credentials, registration numbers, and schedules.*`,
                actions: [
                    { label: isHi ? "👨‍⚕️ डॉक्टरों का संपूर्ण विवरण देखें" : "👨‍⚕️ Open 'Know Your Doctor' Profile", onclick: "PrismAI.openDoctorModal()" },
                    { label: isHi ? "📅 अपॉइंटमेंट बुक करें" : "📅 Book Consultation", href: "appointment.html" }
                ]
            };
        }

        // 3. Patient-Specific Contextual Queries (When Logged In)
        if (ctx.isLoggedIn) {
            // A) Query about their specific diagnosis
            if (/my (diagnosis|problem|condition|disease|case)|mera (bimari|problem|takleef|kya hua|kya bimari)/i.test(q)) {
                const diagText = ctx.diagnosis || "Clinical Rehabilitation Protocol";
                const matchedCond = CLINICAL_KB.conditions.find(c => c.match.test(diagText));

                let text = isHi
                    ? `👤 **नमस्ते ${ctx.name} जी!**\n\nआपके रिकॉर्ड के अनुसार आपका निदान: **${diagText}** है।\nउपचारक विशेषज्ञ: **${ctx.doctor}**\n\n`
                    : `👤 **Hello ${ctx.name}!**\n\nAccording to your clinical record, your registered diagnosis is: **${diagText}**.\nConsultant: **${ctx.doctor}**\n\n`;

                if (matchedCond) {
                    text += isHi ? matchedCond.hi : matchedCond.en;
                } else {
                    text += isHi
                        ? "डॉक्टर द्वारा निर्देशित व्यायाम और सावधानियों का नियमित पालन करें।"
                        : "Please continue with the active rehabilitation protocol directed by your physiotherapist.";
                }

                return {
                    title: isHi ? "आपके निदान की जानकारी" : "Your Clinical Diagnosis",
                    text,
                    actions: [
                        { label: isHi ? "👨‍⚕️ डॉक्टर के बारे में जानें" : "👨‍⚕️ Know Your Doctor", onclick: "PrismAI.openDoctorModal()" }
                    ]
                };
            }

            // B) Query about their prescribed exercises
            if (/my exercise|my exercises|prescribed exercise|kya exercise|mera exercise|meri kasrat|exercises for me|what exercise should i do/i.test(q)) {
                if (ctx.exercises && ctx.exercises.length > 0) {
                    let exList = ctx.exercises.slice(0, 4).map((ex, i) => {
                        const name = ex[2] || `Exercise #${i+1}`;
                        const type = ex[3] ? ` *(${ex[3]})*` : '';
                        const steps = ex[4] ? `\n   ↳ *विधि:* ${ex[4].substring(0, 140)}...` : '';
                        const freq = ex[6] ? `\n   ↳ *आवृत्ति:* ${ex[6]}` : '';
                        return `**${i+1}. ${name}**${type}${steps}${freq}`;
                    }).join('\n\n');

                    let intro = isHi
                        ? `🏋️ **${ctx.name} जी, आपके सक्रिय व्यायाम चार्ट से:**\n\n`
                        : `🏋️ **${ctx.name}, here are your currently prescribed exercises:**\n\n`;

                    let outro = isHi
                        ? `\n\n💡 *सावधानी:* झटके से बचें। दर्द बढ़ने पर तुरंत रुक जाएं।`
                        : `\n\n💡 *Tip:* Move with controlled breathing; never force into sharp pain.`;

                    return {
                        title: isHi ? "आपके व्यक्तिगत व्यायाम" : "Your Prescribed Exercises",
                        text: intro + exList + outro,
                        actions: [
                            { label: isHi ? "📋 पूरा चार्ट देखें" : "📋 View Full Exercise Tab", onclick: "PrismAI.triggerTab('exercises')" },
                            { label: isHi ? "👨‍⚕️ डॉक्टर सलाह" : "👨‍⚕️ Know Your Doctor", onclick: "PrismAI.openDoctorModal()" }
                        ]
                    };
                } else {
                    return {
                        title: isHi ? "व्यायाम जानकारी" : "Exercise Details",
                        text: isHi
                            ? `नमस्ते ${ctx.name} जी, आपके रिकॉर्ड में इन-क्लिनिक थेरेपी प्लान सक्रिय है। क्लिनिक में **${ctx.doctor}** द्वारा निर्देशित प्रोटोकॉल जारी रखें।`
                            : `Hello ${ctx.name}, your active plan is set for supervised in-clinic rehabilitation under **${ctx.doctor}**.`
                    };
                }
            }

            // C) Query about remaining sessions, balance, or billing
            if (/remaining session|how many session|kitna session|balance|wallet|due|advance|mera kitna bacha|bill/i.test(q)) {
                const rem = ctx.remainingSessions || "Active";
                const bal = ctx.walletBalance || "₹0";

                let text = isHi
                    ? `💳 **${ctx.name} जी, आपके खाते की वर्तमान स्थिति:**\n\n` +
                      `• **शेष सेशन (Sessions Remaining):** **${rem}**\n` +
                      `• **वॉलेट बैलेंस (Wallet Balance):** **${bal}**\n` +
                      `• **उपचारक डॉक्टर:** **${ctx.doctor}**\n\n` +
                      `आप क्लिनिक में अगला सेशन ले सकते हैं या पोर्टल से स्टेटमेंट देख सकते हैं।`
                    : `💳 **${ctx.name}, here is your live clinical account status:**\n\n` +
                      `• **Sessions Remaining:** **${rem}**\n` +
                      `• **Active Wallet Balance:** **${bal}**\n` +
                      `• **Consultant:** **${ctx.doctor}**\n\n` +
                      `You can attend your next scheduled session or request an updated statement from the portal.`;

                return {
                    title: isHi ? "सेशन एवं वॉलेट स्थिति" : "Session & Wallet Status",
                    text,
                    actions: [
                        { label: isHi ? "📖 पासबुक देखें" : "📖 View Clinical Passbook", onclick: "PrismAI.triggerTab('records')" },
                        { label: isHi ? "📅 नया सेशन बुक करें" : "📅 Book Session", href: "appointment.html" }
                    ]
                };
            }
        }

        // 4. Thermal Therapy Rules (Ice vs Heat / Sikai)
        if (/(ice|cold|heat|hot|garam|thanda|sikai|fermentation|warm compress|baraf|barf)/i.test(q)) {
            const mentionsIce = /(ice|cold|thanda|baraf|barf|swelling|fresh|sprain)/i.test(q);
            const mentionsHeat = /(heat|hot|garam|stiffness|tightness|warm)/i.test(q);

            let resultText = "";
            if (mentionsIce && !mentionsHeat) {
                resultText = isHi ? CLINICAL_KB.thermal.ice.hi : CLINICAL_KB.thermal.ice.en;
            } else if (mentionsHeat && !mentionsIce) {
                resultText = isHi ? CLINICAL_KB.thermal.heat.hi : CLINICAL_KB.thermal.heat.en;
            } else {
                resultText = isHi
                    ? `${CLINICAL_KB.thermal.ice.hi}\n\n---\n\n${CLINICAL_KB.thermal.heat.hi}`
                    : `${CLINICAL_KB.thermal.ice.en}\n\n---\n\n${CLINICAL_KB.thermal.heat.en}`;
            }

            return {
                title: isHi ? "सिकाई के नियम (Ice vs Heat Guide)" : "Thermal Therapy Rules (Ice vs Heat)",
                text: resultText,
                actions: [
                    { label: isHi ? "👨‍⚕️ डॉक्टर प्रोफाइल" : "👨‍⚕️ Know Your Doctor", onclick: "PrismAI.openDoctorModal()" }
                ]
            };
        }

        // 5. Clinical Condition Matches (Spine, Knee, Shoulder, Neuro, Peds, Women, etc.)
        for (const cond of CLINICAL_KB.conditions) {
            if (cond.match.test(q)) {
                return {
                    title: isHi ? cond.titleHi : cond.title,
                    text: isHi ? cond.hi : cond.en,
                    actions: [
                        { label: isHi ? "👨‍⚕️ डॉक्टर के बारे में जानें" : "👨‍⚕️ Know Your Doctor", onclick: "PrismAI.openDoctorModal()" },
                        { label: isHi ? "📅 अपॉइंटमेंट बुक करें" : "📅 Book Appointment", href: "appointment.html" },
                        { label: isHi ? "📞 क्लिनिक कॉल" : "📞 Call Clinic", href: "tel:+919708059081" }
                    ]
                };
            }
        }

        // 6. Clinic FAQs (Timings, Fees, Doctors, Home Visits, Soreness, Medicines)
        for (const faq of CLINICAL_KB.faqs) {
            if (faq.match.test(q)) {
                return {
                    title: isHi ? "क्लिनिकल जानकारी" : "Prism Healthcare Information",
                    text: isHi ? faq.hi : faq.en,
                    actions: [
                        { label: isHi ? "👨‍⚕️ डॉक्टर प्रोफाइल" : "👨‍⚕️ Know Your Doctor", onclick: "PrismAI.openDoctorModal()" }
                    ]
                };
            }
        }

        // 7. General Compassionate Fallback (Structured & Limited)
        if (isHi) {
            return {
                title: "प्रिज्म क्लिनिकल रिहैब गाइड",
                text: `नमस्ते! मैं प्रिज्म फिजियोथेरेपी का एआई असिस्टेंट हूँ।\n\n` +
                      `**मुख्य फिजियोथेरेपी सिद्धांत:**\n` +
                      `• **आराम व सुरक्षा:** दर्द बढ़ाने वाली गतिविधियों और भारी वजन उठाने से बचें।\n` +
                      `• **सिकाई:** ताज़ी चोट या सूजन पर 15 मिनट **बर्फ** लगाएं; पुरानी जकड़न पर **गर्म पानी की सिकाई** करें।\n` +
                      `• **रीढ़ की सुरक्षा:** झुकते समय घुटने मोड़ें और सही मुद्रा में बैठें।\n\n` +
                      `आप मुझसे अपनी बीमारी (कमर, गर्दन, घुटना, कंधा, लकवा), व्यायाम, सिकाई, क्लिनिक समय या **डॉक्टर्स के प्रोफाइल** के बारे में पूछ सकते हैं।`,
                actions: [
                    { label: "👨‍⚕️ डॉक्टर के बारे में जानें", onclick: "PrismAI.openDoctorModal()" },
                    { label: "📅 अपॉइंटमेंट बुक करें", href: "appointment.html" },
                    { label: "📞 कॉल करें (+91 97080 59081)", href: "tel:+919708059081" }
                ]
            };
        } else {
            return {
                title: "Prism Clinical Health Guidance",
                text: `Hello! I am your Prism Clinical Health AI Assistant.\n\n` +
                      `**Key Evidence-Based Principles:**\n` +
                      `• **Pacing & Rest:** Avoid aggravating activities, sudden spinal twisting, or lifting with bent back.\n` +
                      `• **Thermal Care:** Use **Ice** (12-15 mins) for acute pain or swelling; use **Warm Compress** (15-20 mins) for morning stiffness.\n` +
                      `• **Posture:** Keep screens at eye level and use ergonomic lumbar support.\n\n` +
                      `You can ask me about conditions (Back, Neck, Knee, Shoulder, Stroke, CP), prescribed exercises, heat/ice rules, or our **specialist doctors**!`,
                actions: [
                    { label: "👨‍⚕️ Know Your Doctor", onclick: "PrismAI.openDoctorModal()" },
                    { label: "📅 Book Consultation", href: "appointment.html" },
                    { label: "📞 Call Helpline (+91 97080 59081)", href: "tel:+919708059081" }
                ]
            };
        }
    }

    /* ========================================================================
     * 5. OPTIONAL GOOGLE GEMINI API CONNECTOR (STRICT TOKEN & OUTPUT LIMITS)
     * ======================================================================== */

    async function queryGeminiAI(userPrompt, context, lang = 'en') {
        const apiKey = localStorage.getItem('prism_gemini_api_key') || window.PRISM_GEMINI_KEY || null;
        if (!apiKey) return null;

        const pContextStr = context.isLoggedIn
            ? `PATIENT FILE: Name: ${context.name}, ID: ${context.id}, Diagnosis: ${context.diagnosis}, Age: ${context.age}, Doctor: ${context.doctor}, Sessions Remaining: ${context.remainingSessions || 'N/A'}, Prescribed Exercises: ${context.exercises.map(e => e[2]).join(', ') || 'Supervised in-clinic'}.`
            : `VISITOR CONTEXT: Exploring clinical services at Prism Healthcare.`;

        const systemPrompt = `You are "Prism AI Health Assistant", an expert, empathetic clinical physiotherapy assistant for Prism Healthcare in Bihar, India led by Dr. Ravi Kumar, PT (MPT Neurology).
${pContextStr}
STRICT GUIDELINES:
1. Provide concise, structured, evidence-based physiotherapy guidance (MAX 250 words).
2. Format response in 3-4 clean sections: (1) Summary, (2) Do's & Don'ts, (3) Safe Exercises (if applicable), (4) Clinical Next Steps.
3. If queried in Hindi/Hinglish, respond warmly in natural Hindi/Hinglish.
4. Flag red flag emergencies (cauda equina, chest pain, DVT) immediately.
5. End with a reminder to consult treating specialist Dr. Ravi Kumar, PT (+91 97080 59081).`;

        try {
            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        { role: 'user', parts: [{ text: `${systemPrompt}\n\nPatient Query: ${userPrompt}` }] }
                    ],
                    generationConfig: {
                        temperature: 0.25,
                        maxOutputTokens: 500
                    }
                })
            });

            if (!response.ok) return null;

            const data = await response.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
                return {
                    title: lang === 'hi' ? "प्रिज्म एआई क्लिनिकल परामर्श" : "Prism AI Clinical Insights",
                    text: text,
                    actions: [
                        { label: lang === 'hi' ? "👨‍⚕️ डॉक्टर प्रोफाइल" : "👨‍⚕️ Know Your Doctor", onclick: "PrismAI.openDoctorModal()" }
                    ]
                };
            }
            return null;
        } catch (err) {
            console.warn("Gemini bridge fallback to local clinical database:", err);
            return null;
        }
    }

    /* ========================================================================
     * 6. SELF-CONTAINED STYLES & DOM CREATION
     * ======================================================================== */

    const CSS_STYLES = `
    #prism-ai-widget {
        font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    }
    .prism-fab {
        position: fixed;
        bottom: 24px;
        left: 24px;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        background: linear-gradient(135deg, #4f46e5 0%, #312e81 100%);
        color: white;
        padding: 12px 18px;
        border-radius: 9999px;
        box-shadow: 0 10px 25px -3px rgba(79, 70, 229, 0.4), 0 4px 6px -4px rgba(79, 70, 229, 0.2);
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        user-select: none;
    }
    .prism-fab:hover {
        transform: translateY(-3px) scale(1.03);
        box-shadow: 0 15px 30px -3px rgba(79, 70, 229, 0.5);
    }
    .prism-fab:active {
        transform: scale(0.96);
    }
    .prism-pulse-ring {
        position: absolute;
        inset: -4px;
        border-radius: 9999px;
        border: 2px solid #818cf8;
        opacity: 0.75;
        animation: prismPulse 2.5s infinite;
        pointer-events: none;
    }
    @keyframes prismPulse {
        0% { transform: scale(0.98); opacity: 0.8; }
        50% { transform: scale(1.08); opacity: 0; }
        100% { transform: scale(0.98); opacity: 0; }
    }
    .prism-chat-window {
        position: fixed;
        bottom: 90px;
        left: 24px;
        width: 410px;
        max-width: calc(100vw - 32px);
        height: 640px;
        max-height: calc(100vh - 120px);
        background: #ffffff;
        border-radius: 28px;
        box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(15, 23, 42, 0.06);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        transform-origin: bottom left;
        opacity: 0;
        transform: scale(0.85) translateY(20px);
        pointer-events: none;
    }
    .prism-chat-window.open {
        opacity: 1;
        transform: scale(1) translateY(0);
        pointer-events: auto;
    }
    .prism-chat-bubble {
        max-width: 88%;
        padding: 12px 16px;
        border-radius: 20px;
        font-size: 13px;
        line-height: 1.55;
        margin-bottom: 12px;
        word-break: break-word;
    }
    .prism-bubble-bot {
        background: #f8fafc;
        color: #1e293b;
        border: 1px solid #e2e8f0;
        border-bottom-left-radius: 4px;
        align-self: flex-start;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
    }
    .prism-bubble-user {
        background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
        color: #ffffff;
        border-bottom-right-radius: 4px;
        align-self: flex-end;
        box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
    }
    .prism-chip {
        font-size: 11px;
        font-weight: 700;
        padding: 6px 12px;
        border-radius: 9999px;
        background: #f1f5f9;
        color: #334155;
        border: 1px solid #e2e8f0;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        gap: 5px;
    }
    .prism-chip:hover {
        background: #e0e7ff;
        color: #4338ca;
        border-color: #c7d2fe;
        transform: translateY(-1px);
    }
    .prism-chip-doctor {
        background: #eef2ff !important;
        color: #4338ca !important;
        border-color: #c7d2fe !important;
        font-weight: 800 !important;
    }
    .prism-typing-dot {
        width: 6px;
        height: 6px;
        background: #94a3b8;
        border-radius: 50%;
        display: inline-block;
        animation: prismTyping 1.4s infinite ease-in-out both;
    }
    .prism-typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .prism-typing-dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes prismTyping {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
    }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    @media (max-width: 480px) {
        .prism-chat-window {
            left: 12px;
            right: auto;
            bottom: 84px;
            width: calc(100vw - 24px);
            height: calc(100vh - 100px);
            border-radius: 24px;
        }
        .prism-fab {
            bottom: 16px;
            left: 16px;
            right: auto;
            padding: 10px 16px;
        }
    }
    `;

    function injectStyles() {
        if (document.getElementById('prism-ai-styles')) return;
        const style = document.createElement('style');
        style.id = 'prism-ai-styles';
        style.textContent = CSS_STYLES;
        document.head.appendChild(style);
    }

    function createWidgetDOM() {
        if (document.getElementById('prism-ai-widget')) return;

        const container = document.createElement('div');
        container.id = 'prism-ai-widget';

        container.innerHTML = `
        <!-- Floating Action Button -->
        <button id="prism-ai-fab" class="prism-fab" title="Ask Prism AI Patient Assistant">
            <span class="prism-pulse-ring"></span>
            <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-white">
                <i data-lucide="bot" class="w-5 h-5"></i>
            </div>
            <div class="text-left leading-none pr-1">
                <div class="text-[9px] font-black uppercase tracking-widest text-indigo-200">Patient AI</div>
                <div class="text-xs font-black tracking-wide text-white mt-0.5">Ask Assistant</div>
            </div>
        </button>

        <!-- Main Chat Window -->
        <div id="prism-ai-window" class="prism-chat-window">
            <!-- Header -->
            <div class="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 text-white p-3.5 sm:p-4 flex items-center justify-between flex-shrink-0 border-b border-indigo-500/30">
                <div class="flex items-center gap-2.5">
                    <div class="relative">
                        <div class="w-9 h-9 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                            <i data-lucide="sparkles" class="w-4 h-4 text-amber-300"></i>
                        </div>
                        <span class="w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-indigo-700 absolute -bottom-0.5 -right-0.5 animate-pulse"></span>
                    </div>
                    <div>
                        <div class="flex items-center gap-1.5">
                            <h3 class="font-black text-sm text-white tracking-wide">Prism Clinical AI</h3>
                            <span class="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 uppercase">Assistant</span>
                        </div>
                        <p id="prism-ai-status-sub" class="text-[10px] text-indigo-200 font-medium">Online 24/7</p>
                    </div>
                </div>
                <div class="flex items-center gap-1">
                    <!-- Know Your Doctor Direct Header Button -->
                    <button id="prism-ai-doc-header-btn" class="px-2.5 py-1 bg-white/15 hover:bg-white/25 rounded-xl text-[10px] font-black uppercase text-white transition-all border border-white/20 flex items-center gap-1 shadow-xs" title="Know Your Doctor">
                        <i data-lucide="stethoscope" class="w-3 h-3 text-amber-300"></i>
                        <span class="hidden sm:inline">Doctors</span>
                    </button>
                    <!-- Language Toggle -->
                    <button id="prism-ai-lang-btn" class="px-2 py-1 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase text-white transition-all border border-white/10" title="Switch Language">
                        🇮🇳 HI
                    </button>
                    <!-- Settings -->
                    <button id="prism-ai-settings-btn" class="p-1.5 hover:bg-white/10 rounded-xl text-white transition-all" title="Settings">
                        <i data-lucide="settings" class="w-4 h-4"></i>
                    </button>
                    <!-- Close -->
                    <button id="prism-ai-close-btn" class="p-1.5 hover:bg-white/10 rounded-xl text-white transition-all" title="Close">
                        <i data-lucide="x" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>

            <!-- Patient Context Banner (When logged in) -->
            <div id="prism-ai-patient-banner" class="hidden bg-indigo-50 border-b border-indigo-100/80 px-3.5 py-2 flex items-center justify-between text-[11px] font-bold text-indigo-950">
                <div class="flex items-center gap-1.5 truncate">
                    <i data-lucide="user-check" class="w-3.5 h-3.5 text-indigo-600 flex-shrink-0"></i>
                    <span id="prism-banner-name" class="font-black truncate">—</span>
                    <span class="text-indigo-400">•</span>
                    <span id="prism-banner-diag" class="text-indigo-600 truncate">—</span>
                </div>
                <span id="prism-banner-sessions" class="bg-white text-indigo-700 px-2 py-0.5 rounded-lg text-[10px] font-black border border-indigo-200/60 shadow-xs flex-shrink-0">
                    —
                </span>
            </div>

            <!-- Suggestion Chips Carousel -->
            <div class="bg-slate-50/90 border-b border-slate-100 p-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 flex-shrink-0" id="prism-chips-container">
                <!-- Populated dynamically with "Know Your Doctor" as first item -->
            </div>

            <!-- Message Scroll Area -->
            <div id="prism-ai-messages" class="flex-1 p-3.5 sm:p-4 overflow-y-auto flex flex-col space-y-2 bg-gradient-to-b from-slate-50/40 to-white">
                <!-- Messages populated here -->
            </div>

            <!-- Input Area -->
            <div class="p-3 bg-white border-t border-slate-100 flex items-center gap-2 flex-shrink-0">
                <button id="prism-ai-mic-btn" type="button" class="p-2.5 rounded-2xl bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-colors flex-shrink-0" title="Voice Input (Speak question)">
                    <i data-lucide="mic" class="w-4 h-4"></i>
                </button>
                <div class="relative flex-1">
                    <input id="prism-ai-input" type="text" placeholder="Ask about pain, exercises, doctor..." class="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-800 font-medium">
                    <button id="prism-ai-clear-btn" class="hidden absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold">×</button>
                </div>
                <button id="prism-ai-send-btn" type="button" class="p-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white transition-transform active:scale-95 shadow-md flex-shrink-0" title="Send Question">
                    <i data-lucide="send" class="w-4 h-4"></i>
                </button>
            </div>
        </div>

        <!-- ============================================================
         * DETAILED "KNOW YOUR DOCTOR" MODAL & TEAM DIRECTORY
         * ============================================================ -->
        <div id="prism-doctor-modal" class="hidden fixed inset-0 z-[10002] bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in overflow-y-auto">
            <div class="bg-white rounded-[2rem] max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
                <!-- Modal Header -->
                <div class="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-5 flex items-center justify-between flex-shrink-0 border-b border-indigo-700/50">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 border border-white/20">
                            <i data-lucide="stethoscope" class="w-5 h-5"></i>
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <h3 id="prism-doc-modal-title" class="font-black text-base text-white tracking-wide">Meet Your Doctors & Specialists</h3>
                                <span class="text-[9px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full uppercase">Verified MIAP</span>
                            </div>
                            <p id="prism-doc-modal-sub" class="text-xs text-indigo-200">Prism Healthcare Clinical Leadership Team</p>
                        </div>
                    </div>
                    <button id="prism-close-doc-modal" class="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>

                <!-- Doctor Tab Switcher -->
                <div class="bg-slate-100 p-2 flex items-center gap-1.5 border-b border-slate-200/80 overflow-x-auto no-scrollbar flex-shrink-0" id="prism-doc-tabs">
                    <button onclick="PrismAI.selectDoctor('dr_ravi')" id="doc-tab-dr_ravi" class="flex-1 py-2 px-3 rounded-xl font-black text-xs transition-all bg-white text-indigo-600 shadow-xs whitespace-nowrap flex items-center justify-center gap-1.5">
                        <span>👨‍⚕️ Dr. Ravi Kumar</span>
                    </button>
                    <button onclick="PrismAI.selectDoctor('dr_supriya')" id="doc-tab-dr_supriya" class="flex-1 py-2 px-3 rounded-xl font-black text-xs transition-all text-slate-600 hover:text-slate-900 whitespace-nowrap flex items-center justify-center gap-1.5">
                        <span>👩‍⚕️ Dr. Supriya</span>
                    </button>
                    <button onclick="PrismAI.selectDoctor('dr_puja')" id="doc-tab-dr_puja" class="flex-1 py-2 px-3 rounded-xl font-black text-xs transition-all text-slate-600 hover:text-slate-900 whitespace-nowrap flex items-center justify-center gap-1.5">
                        <span>👩‍⚕️ Dr. Puja</span>
                    </button>
                </div>

                <!-- Doctor Detail Content View Area -->
                <div id="prism-doc-detail-view" class="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-slate-50/50">
                    <!-- Populated dynamically via PrismAI.selectDoctor -->
                </div>
            </div>
        </div>

        <!-- Optional Settings Modal (Gemini Key) -->
        <div id="prism-ai-settings-modal" class="hidden fixed inset-0 z-[10003] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div class="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4">
                <div class="flex items-center justify-between">
                    <h4 class="font-black text-sm text-slate-900 flex items-center gap-2">
                        <i data-lucide="sparkles" class="w-4 h-4 text-indigo-600"></i> AI Settings & Token Limits
                    </h4>
                    <button id="prism-close-settings" class="text-slate-400 hover:text-slate-700">
                        <i data-lucide="x" class="w-4 h-4"></i>
                    </button>
                </div>
                <p class="text-xs text-slate-500 leading-relaxed font-medium">
                    Prism AI runs instantly with structured response limits to keep guidance concise and actionable. You can connect a <strong>Google Gemini API Key</strong> for dynamic responses.
                </p>
                <div class="space-y-1.5">
                    <label class="text-[10px] font-black uppercase tracking-wider text-slate-400">Gemini API Key (Optional)</label>
                    <input id="prism-api-key-input" type="password" placeholder="AIzaSy..." class="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 font-mono">
                </div>
                <div class="flex items-center gap-2 pt-2">
                    <button id="prism-save-settings" class="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-black text-xs uppercase shadow-md hover:bg-indigo-700 transition-all">
                        Save Settings
                    </button>
                    <button id="prism-clear-key" class="px-3 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-200 transition-all">
                        Reset
                    </button>
                </div>
            </div>
        </div>
        `;

        document.body.appendChild(container);
        if (window.lucide) lucide.createIcons();
    }

    /* ========================================================================
     * 7. CHAT CONTROLLER, RENDERING & DOCTOR DETAILS
     * ======================================================================== */

    let currentLanguage = 'en';
    let isSpeechRecording = false;
    let speechRecognitionInstance = null;
    let activeDoctorId = "dr_ravi";

    function formatMarkdown(text) {
        if (!text) return '';
        return String(text)
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code class="bg-slate-200 px-1 py-0.5 rounded text-[11px] font-mono">$1</code>')
            .replace(/\n\n/g, '<div class="my-2"></div>')
            .replace(/\n/g, '<br>')
            .replace(/• /g, '&bull; ');
    }

    function appendMessage(sender, title, text, actions = []) {
        const messagesContainer = document.getElementById('prism-ai-messages');
        if (!messagesContainer) return;

        const bubble = document.createElement('div');
        bubble.className = `prism-chat-bubble ${sender === 'user' ? 'prism-bubble-user' : 'prism-bubble-bot'}`;

        let innerContent = '';
        if (title && sender === 'bot') {
            innerContent += `<div class="text-[11px] font-black uppercase tracking-wider text-indigo-600 mb-1 flex items-center gap-1.5"><i data-lucide="shield-plus" class="w-3.5 h-3.5"></i> ${title}</div>`;
        }
        innerContent += `<div class="content-text">${formatMarkdown(text)}</div>`;

        if (actions && actions.length > 0) {
            innerContent += `<div class="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/60">`;
            actions.forEach(act => {
                if (act.href) {
                    innerContent += `<a href="${act.href}" ${act.href.startsWith('http') ? 'target="_blank"' : ''} class="text-[10px] font-black uppercase px-3 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-xs inline-flex items-center gap-1">${act.label}</a>`;
                } else if (act.onclick) {
                    innerContent += `<button onclick="${act.onclick}" class="text-[10px] font-black uppercase px-3 py-1.5 rounded-xl bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition shadow-xs inline-flex items-center gap-1">${act.label}</button>`;
                }
            });
            innerContent += `</div>`;
        }

        if (sender === 'bot') {
            innerContent += `
            <div class="mt-2 pt-1 flex items-center justify-between text-[10px] text-slate-400 font-semibold border-t border-slate-100">
                <span>Prism AI Health Assistant</span>
                <div class="flex items-center gap-2">
                    <button class="speak-btn hover:text-indigo-600 flex items-center gap-1" title="Read Aloud">
                        <i data-lucide="volume-2" class="w-3 h-3"></i> Listen
                    </button>
                    <button class="copy-btn hover:text-indigo-600 flex items-center gap-1" title="Copy text">
                        <i data-lucide="copy" class="w-3 h-3"></i>
                    </button>
                </div>
            </div>`;
        }

        bubble.innerHTML = innerContent;
        messagesContainer.appendChild(bubble);

        if (sender === 'bot') {
            const speakBtn = bubble.querySelector('.speak-btn');
            if (speakBtn) speakBtn.onclick = () => readAloud(text);
            const copyBtn = bubble.querySelector('.copy-btn');
            if (copyBtn) {
                copyBtn.onclick = () => {
                    navigator.clipboard.writeText(text);
                    copyBtn.innerHTML = `<i data-lucide="check" class="w-3 h-3 text-emerald-600"></i> Copied`;
                    if (window.lucide) lucide.createIcons();
                    setTimeout(() => {
                        copyBtn.innerHTML = `<i data-lucide="copy" class="w-3 h-3"></i>`;
                        if (window.lucide) lucide.createIcons();
                    }, 2000);
                };
            }
        }

        if (window.lucide) lucide.createIcons();
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function showTypingIndicator() {
        const messagesContainer = document.getElementById('prism-ai-messages');
        if (!messagesContainer) return null;

        const typingBubble = document.createElement('div');
        typingBubble.id = 'prism-typing-indicator';
        typingBubble.className = 'prism-chat-bubble prism-bubble-bot flex items-center gap-1 py-3 px-4';
        typingBubble.innerHTML = `
            <span class="text-xs text-slate-400 font-bold mr-1">Consulting clinical database</span>
            <span class="prism-typing-dot"></span>
            <span class="prism-typing-dot"></span>
            <span class="prism-typing-dot"></span>
        `;
        messagesContainer.appendChild(typingBubble);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return typingBubble;
    }

    function removeTypingIndicator() {
        const ind = document.getElementById('prism-typing-indicator');
        if (ind) ind.remove();
    }

    function readAloud(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();

        const cleanText = text.replace(/[*_#`]/g, '').substring(0, 400);
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 0.95;
        utterance.lang = isQueryInHindi(cleanText) ? 'hi-IN' : 'en-US';
        window.speechSynthesis.speak(utterance);
    }

    function renderDoctorModalDetail(docId) {
        const doc = DOCTORS_DIRECTORY.find(d => d.id === docId) || DOCTORS_DIRECTORY[0];
        const container = document.getElementById('prism-doc-detail-view');
        if (!container) return;

        const ctx = getActivePatientContext();
        const isAssigned = ctx.isLoggedIn && ctx.doctor && ctx.doctor.toLowerCase().includes(doc.name.toLowerCase().split(' ')[1] || 'ravi');
        const isHi = currentLanguage === 'hi';

        container.innerHTML = `
            <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-5 items-center md:items-start">
                <div class="w-32 h-32 sm:w-44 sm:h-44 rounded-3xl overflow-hidden bg-slate-100 flex-shrink-0 border-4 border-indigo-50 shadow-md relative">
                    <img src="${doc.image}" onerror="this.src='${doc.fallbackImage}'" alt="${doc.name}" class="w-full h-full object-cover">
                    ${isAssigned ? `<span class="absolute bottom-2 left-2 right-2 bg-emerald-600 text-white text-[9px] font-black uppercase text-center py-1 rounded-lg shadow">Your Doctor</span>` : ''}
                </div>
                <div class="flex-1 text-center md:text-left space-y-2">
                    <div class="flex items-center gap-2 justify-center md:justify-start flex-wrap">
                        <span class="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-wider border border-indigo-100 flex items-center gap-1">
                            <i data-lucide="badge-check" class="w-3 h-3 text-indigo-600"></i> Council Reg: ${doc.registrationNo}
                        </span>
                        <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider border border-emerald-100">
                            ${doc.experience}
                        </span>
                        <span class="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-black uppercase tracking-wider border border-amber-200">
                            Assessment: ₹500
                        </span>
                    </div>
                    <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">${doc.name}</h3>
                    <p class="text-xs font-bold text-indigo-600 uppercase tracking-wide">${isHi ? doc.designationHi : doc.designation}</p>
                    <p class="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg inline-block">${doc.degrees}</p>
                    <p class="text-xs text-slate-600 leading-relaxed font-medium pt-1">${isHi ? doc.bioHi : doc.bio}</p>
                </div>
            </div>

            <!-- Specialties Grid -->
            <div class="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3">
                <h4 class="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <i data-lucide="award" class="w-4 h-4 text-indigo-600"></i>
                    <span>${isHi ? "चिकित्सकीय विशेषज्ञताएं (Clinical Specializations):" : "Areas of Clinical Mastery:"}</span>
                </h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    ${(isHi ? doc.specialtiesHi : doc.specialties).map(s => `
                        <div class="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs font-semibold text-slate-700">
                            <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5"></i>
                            <span>${s}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Locations, Timings & Quick Contact Action -->
            <div class="bg-indigo-50/70 rounded-3xl p-5 border border-indigo-100 space-y-3">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                        <span class="text-[10px] font-black uppercase text-indigo-500 tracking-wider flex items-center gap-1">
                            <i data-lucide="map-pin" class="w-3 h-3"></i> OPD Centers:
                        </span>
                        <p class="font-bold text-slate-800 mt-0.5">${doc.clinicLocations}</p>
                    </div>
                    <div>
                        <span class="text-[10px] font-black uppercase text-indigo-500 tracking-wider flex items-center gap-1">
                            <i data-lucide="clock" class="w-3 h-3"></i> Consultation Hours:
                        </span>
                        <p class="font-bold text-slate-800 mt-0.5">${doc.timings}</p>
                    </div>
                </div>
                <div class="pt-2 flex flex-col sm:flex-row gap-2">
                    <a href="https://wa.me/919708059081?text=${encodeURIComponent(doc.whatsappMsg)}" target="_blank" class="flex-1 bg-emerald-600 text-white py-3 rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-2 shadow-md hover:bg-emerald-700 active:scale-95 transition">
                        <i data-lucide="message-circle" class="w-4 h-4"></i> WhatsApp Doctor
                    </a>
                    <a href="appointment.html" class="flex-1 bg-indigo-600 text-white py-3 rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-2 shadow-md hover:bg-indigo-700 active:scale-95 transition">
                        <i data-lucide="calendar" class="w-4 h-4"></i> Book In-Clinic Slot
                    </a>
                    <a href="tel:${doc.phone}" class="sm:w-auto px-4 py-3 bg-white border border-indigo-200 text-indigo-700 rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-1 shadow-xs hover:bg-indigo-50 active:scale-95 transition">
                        <i data-lucide="phone-call" class="w-4 h-4"></i> Direct Call
                    </a>
                </div>
            </div>
        `;

        if (window.lucide) lucide.createIcons();
    }

    function populateChips() {
        const container = document.getElementById('prism-chips-container');
        if (!container) return;

        const ctx = getActivePatientContext();
        let chips = [];

        // If logged in: Priority chip is assigned doctor
        if (ctx.isLoggedIn && ctx.doctor) {
            chips.push({
                label: `👨‍⚕️ ${ctx.doctor}`,
                onclick: "PrismAI.ask('Who is my doctor?')",
                isDoctor: true
            });
        } else {
            chips.push({
                label: "👨‍⚕️ Know Your Doctor",
                onclick: "PrismAI.openDoctorModal()",
                isDoctor: true
            });
        }

        if (ctx.isLoggedIn) {
            chips.push(
                { label: "🧘 My Exercises", prompt: "Explain my prescribed exercises" },
                { label: "❄️ Ice or Heat?", prompt: "When to use ice vs warm water bag?" },
                { label: "🗓️ Remaining Sessions", prompt: "How many sessions do I have left?" },
                { label: "⚠️ Red Flag Symptoms", prompt: "What are red flag warning symptoms for my condition?" },
                { label: "🛌 Sleeping Posture", prompt: "What is the best sleeping posture for my pain?" },
                { label: "👕 What to Wear", prompt: "What should I wear for therapy?" }
            );
        } else {
            chips.push(
                { label: "🔑 How to Log In", prompt: "How do I log in to the patient portal or find my Patient ID?" },
                { label: "📅 Book Consultation", prompt: "How do I book a consultation?" },
                { label: "🦴 Low Back & Sciatica", prompt: "What causes sciatica and how to relieve it?" },
                { label: "⚡ Neck & Cervical", prompt: "How to relieve cervical neck pain and stiffness?" },
                { label: "🦵 Knee & ACL Care", prompt: "Exercises and precautions for knee osteoarthritis" },
                { label: "🌀 Vertigo & Dizziness", prompt: "What is BPPV vertigo and what exercises help?" },
                { label: "❄️ Ice vs Heat Guide", prompt: "Should I use an ice pack or hot fermentation?" },
                { label: "👶 Child Development", prompt: "Pediatric physiotherapy for delayed milestones and cerebral palsy" },
                { label: "👩 Women's Pelvic Care", prompt: "Women's health and pelvic floor rehabilitation" },
                { label: "⏰ Clinic Timings", prompt: "What are your clinic timings and locations?" },
                { label: "💳 Treatment Fees", prompt: "What is your consultation fee?" },
                { label: "🏠 Home Visit Rehab", prompt: "Do you offer home visit physiotherapy?" }
            );
        }

        container.innerHTML = chips.map(c => {
            if (c.onclick) {
                return `<button class="prism-chip ${c.isDoctor ? 'prism-chip-doctor' : ''}" onclick="${c.onclick}">${c.label}</button>`;
            }
            return `<button class="prism-chip" onclick="PrismAI.ask('${c.prompt}')">${c.label}</button>`;
        }).join('');
    }

    function updatePatientHeader() {
        const banner = document.getElementById('prism-ai-patient-banner');
        const nameEl = document.getElementById('prism-banner-name');
        const diagEl = document.getElementById('prism-banner-diag');
        const sessEl = document.getElementById('prism-banner-sessions');
        const subStatusEl = document.getElementById('prism-ai-status-sub');

        const ctx = getActivePatientContext();
        if (ctx.isLoggedIn && banner) {
            banner.classList.remove('hidden');
            if (nameEl) nameEl.innerText = ctx.name;
            if (diagEl) diagEl.innerText = ctx.diagnosis;
            if (sessEl) sessEl.innerText = `${ctx.remainingSessions || 0} Sessions`;
            if (subStatusEl) subStatusEl.innerText = `Rehab Profile: ${ctx.name} (${ctx.doctor})`;
        } else if (banner) {
            banner.classList.add('hidden');
            if (subStatusEl) subStatusEl.innerText = "Clinical Physiotherapy AI";
        }
    }

    async function handleUserQuestion(queryText) {
        const query = String(queryText || '').trim();
        if (!query) return;

        appendMessage('user', null, query);

        const inputEl = document.getElementById('prism-ai-input');
        if (inputEl) inputEl.value = '';

        const ctx = getActivePatientContext();
        showTypingIndicator();

        let responseObj = await queryGeminiAI(query, ctx, currentLanguage);

        if (!responseObj) {
            await new Promise(r => setTimeout(r, 350));
            responseObj = generatePersonalizedAnswer(query, ctx, currentLanguage);
        }

        removeTypingIndicator();

        if (responseObj) {
            appendMessage('bot', responseObj.title, responseObj.text, responseObj.actions || []);
        }
    }

    /* ========================================================================
     * 8. SPEECH RECOGNITION (VOICE INPUT)
     * ======================================================================== */

    function setupSpeechRecognition() {
        const micBtn = document.getElementById('prism-ai-mic-btn');
        if (!micBtn) return;

        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRec) {
            micBtn.style.opacity = '0.5';
            micBtn.title = "Voice input not supported in this browser";
            return;
        }

        speechRecognitionInstance = new SpeechRec();
        speechRecognitionInstance.continuous = false;
        speechRecognitionInstance.interimResults = false;
        speechRecognitionInstance.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';

        speechRecognitionInstance.onstart = () => {
            isSpeechRecording = true;
            micBtn.classList.add('bg-rose-500', 'text-white', 'animate-pulse');
            micBtn.classList.remove('bg-slate-100', 'text-slate-600');
        };

        speechRecognitionInstance.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const inputEl = document.getElementById('prism-ai-input');
            if (inputEl) {
                inputEl.value = transcript;
                handleUserQuestion(transcript);
            }
        };

        speechRecognitionInstance.onerror = () => {
            isSpeechRecording = false;
            micBtn.classList.remove('bg-rose-500', 'text-white', 'animate-pulse');
            micBtn.classList.add('bg-slate-100', 'text-slate-600');
        };

        speechRecognitionInstance.onend = () => {
            isSpeechRecording = false;
            micBtn.classList.remove('bg-rose-500', 'text-white', 'animate-pulse');
            micBtn.classList.add('bg-slate-100', 'text-slate-600');
        };

        micBtn.onclick = () => {
            if (isSpeechRecording) {
                speechRecognitionInstance.stop();
            } else {
                speechRecognitionInstance.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
                speechRecognitionInstance.start();
            }
        };
    }

    /* ========================================================================
     * 9. INITIALIZATION & GLOBAL API EXPOSURE
     * ======================================================================== */

    function initializePrismAI() {
        // Enforce: AI Assistant integrates ONLY on Patient Login / Patient Portal page
        const isPatientLoginPage = 
            /patient[\s%20_-]*login/i.test(window.location.pathname) || 
            document.getElementById('login-section') || 
            document.getElementById('app-content') ||
            (document.title && document.title.toLowerCase().includes('patient portal')) ||
            (document.title && document.title.toLowerCase().includes('patient login'));

        if (!isPatientLoginPage) {
            return;
        }

        injectStyles();
        createWidgetDOM();

        const fab = document.getElementById('prism-ai-fab');
        const windowEl = document.getElementById('prism-ai-window');
        const closeBtn = document.getElementById('prism-ai-close-btn');
        const sendBtn = document.getElementById('prism-ai-send-btn');
        const inputEl = document.getElementById('prism-ai-input');
        const langBtn = document.getElementById('prism-ai-lang-btn');
        const docHeaderBtn = document.getElementById('prism-ai-doc-header-btn');
        const settingsBtn = document.getElementById('prism-ai-settings-btn');
        const settingsModal = document.getElementById('prism-ai-settings-modal');
        const closeSettingsBtn = document.getElementById('prism-close-settings');
        const saveSettingsBtn = document.getElementById('prism-save-settings');
        const clearKeyBtn = document.getElementById('prism-clear-key');
        const keyInput = document.getElementById('prism-api-key-input');
        const closeDocModalBtn = document.getElementById('prism-close-doc-modal');

        const toggleChat = () => {
            const isOpen = windowEl.classList.contains('open');
            if (isOpen) {
                windowEl.classList.remove('open');
            } else {
                windowEl.classList.add('open');
                updatePatientHeader();
                populateChips();

                const messages = document.getElementById('prism-ai-messages');
                if (messages && messages.children.length === 0) {
                    const ctx = getActivePatientContext();
                    if (ctx.isLoggedIn) {
                        appendMessage('bot', `Namaste ${ctx.name}!`,
                            `Welcome to your **Prism Clinical Portal**. I have loaded your active rehabilitation profile for **${ctx.diagnosis}** under **${ctx.doctor}**.\n\nYou can ask me any question about your exercises, symptoms, precautions, ice/heat advice, or click below to **Know Your Doctor**!`,
                            [
                                { label: `👨‍⚕️ ${ctx.doctor || 'Your Assigned Doctor'}`, onclick: "PrismAI.ask('Who is my doctor?')" },
                                { label: "🧘 My Exercises", onclick: "PrismAI.ask('Explain my prescribed exercises')" }
                            ]
                        );
                    } else {
                        appendMessage('bot', 'Prism Clinical AI Assistant',
                            `Hello! 👋 I am your **Prism AI Health Assistant**.\n\nHow can I assist you with your rehabilitation, symptoms, doctor consultation, or clinic timings today?`,
                            [
                                { label: "👨‍⚕️ Know Your Doctor", onclick: "PrismAI.openDoctorModal()" },
                                { label: "📅 Book Appointment", href: "appointment.html" }
                            ]
                        );
                    }
                }
                if (inputEl) inputEl.focus();
            }
        };

        if (fab) fab.onclick = toggleChat;
        if (closeBtn) closeBtn.onclick = () => windowEl.classList.remove('open');
        if (docHeaderBtn) docHeaderBtn.onclick = () => window.PrismAI.openDoctorModal();

        if (sendBtn && inputEl) {
            sendBtn.onclick = () => handleUserQuestion(inputEl.value);
            inputEl.onkeydown = (e) => {
                if (e.key === 'Enter') handleUserQuestion(inputEl.value);
            };
        }

        if (langBtn) {
            langBtn.onclick = () => {
                currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
                langBtn.innerText = currentLanguage === 'hi' ? '🇬🇧 EN' : '🇮🇳 HI';
                appendMessage('bot', null, currentLanguage === 'hi'
                    ? "भाषा बदलकर **हिन्दी** कर दी गई है। आप अपनी समस्या, कसरत या **डॉक्टर्स के प्रोफाइल** के बारे में कुछ भी पूछ सकते हैं।"
                    : "Language switched to **English**. Feel free to ask any clinical questions!");
            };
        }

        if (settingsBtn && settingsModal) {
            settingsBtn.onclick = () => {
                if (keyInput) keyInput.value = localStorage.getItem('prism_gemini_api_key') || '';
                settingsModal.classList.remove('hidden');
            };
            if (closeSettingsBtn) closeSettingsBtn.onclick = () => settingsModal.classList.add('hidden');
            if (saveSettingsBtn) {
                saveSettingsBtn.onclick = () => {
                    const k = keyInput ? keyInput.value.trim() : '';
                    if (k) {
                        localStorage.setItem('prism_gemini_api_key', k);
                        alert("Gemini API Key successfully linked to Prism AI Assistant!");
                    }
                    settingsModal.classList.add('hidden');
                };
            }
            if (clearKeyBtn) {
                clearKeyBtn.onclick = () => {
                    localStorage.removeItem('prism_gemini_api_key');
                    if (keyInput) keyInput.value = '';
                    alert("API Key cleared. Assistant will run on the built-in clinical database.");
                };
            }
        }

        if (closeDocModalBtn) {
            closeDocModalBtn.onclick = () => {
                const modal = document.getElementById('prism-doctor-modal');
                if (modal) modal.classList.add('hidden');
            };
        }

        const docModalEl = document.getElementById('prism-doctor-modal');
        if (docModalEl) {
            docModalEl.addEventListener('click', (e) => {
                if (e.target === docModalEl) docModalEl.classList.add('hidden');
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.getElementById('prism-doctor-modal');
                if (modal && !modal.classList.contains('hidden')) {
                    modal.classList.add('hidden');
                }
            }
        });

        setupSpeechRecognition();
        updatePatientHeader();
        populateChips();
    }

    // Public API
    window.PrismAI = {
        open: function () {
            const w = document.getElementById('prism-ai-window');
            if (w) {
                w.classList.add('open');
                updatePatientHeader();
                populateChips();
                const inp = document.getElementById('prism-ai-input');
                if (inp) inp.focus();
            }
        },
        close: function () {
            const w = document.getElementById('prism-ai-window');
            if (w) w.classList.remove('open');
        },
        ask: function (question) {
            this.open();
            handleUserQuestion(question);
        },
        triggerTab: function (tabName) {
            if (typeof window.switchDashboardTab === 'function') {
                window.switchDashboardTab(tabName);
                this.close();
            }
        },
        refreshContext: function () {
            updatePatientHeader();
            populateChips();
        },
        openDoctorModal: function (docId = "dr_ravi") {
            const modal = document.getElementById('prism-doctor-modal');
            if (!modal) return;

            const ctx = getActivePatientContext();
            const tabsEl = document.getElementById('prism-doc-tabs');
            const titleEl = document.getElementById('prism-doc-modal-title');
            const subEl = document.getElementById('prism-doc-modal-sub');

            // Auto-select logged in doctor if present
            if (ctx.isLoggedIn && ctx.doctor) {
                const docName = ctx.doctor.toLowerCase();
                if (docName.includes('supriya')) docId = 'dr_supriya';
                else if (docName.includes('puja')) docId = 'dr_puja';
                else docId = 'dr_ravi';

                // Enforce: Show assigned doctor only!
                if (tabsEl) tabsEl.classList.add('hidden');
                if (titleEl) titleEl.innerText = "Your Assigned Treating Consultant";
                if (subEl) subEl.innerText = `Consultant Physiotherapist: ${ctx.doctor}`;
            } else {
                if (tabsEl) tabsEl.classList.remove('hidden');
                if (titleEl) titleEl.innerText = "Meet Your Doctors & Specialists";
                if (subEl) subEl.innerText = "Prism Healthcare Clinical Leadership Team";
            }

            modal.classList.remove('hidden');
            this.selectDoctor(docId);
        },
        selectDoctor: function (docId) {
            activeDoctorId = docId;

            // Update Tab styles
            ['dr_ravi', 'dr_supriya', 'dr_puja'].forEach(id => {
                const btn = document.getElementById(`doc-tab-${id}`);
                if (btn) {
                    if (id === docId) {
                        btn.className = "flex-1 py-2 px-3 rounded-xl font-black text-xs transition-all bg-white text-indigo-600 shadow-xs whitespace-nowrap flex items-center justify-center gap-1.5";
                    } else {
                        btn.className = "flex-1 py-2 px-3 rounded-xl font-black text-xs transition-all text-slate-600 hover:text-slate-900 whitespace-nowrap flex items-center justify-center gap-1.5";
                    }
                }
            });

            renderDoctorModalDetail(docId);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializePrismAI);
    } else {
        initializePrismAI();
    }

})();
