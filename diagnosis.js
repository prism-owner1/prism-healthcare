/* =========================================================
   CLINIOSPHERE - PHYSIOTHERAPY DIAGNOSIS AUTOCOMPLETE
   ---------------------------------------------------------
   Features:
   • Large physiotherapy diagnosis database
   • Synonym / keyword matching
   • Typo tolerance: "paun" → pain, "bak" → back
   • Smart ranking
   • Keyboard navigation
   • Mouse / touch selection
   • Works with existing diagnosis inputs
   • No backend changes required
   ========================================================= */

(function () {
    "use strict";

    /* =====================================================
       1. DIAGNOSIS DATABASE
       ===================================================== */

    const PHYSIO_DIAGNOSES = [

        /* ================= ORTHOPAEDIC ================= */

        {
            name: "Low Back Pain",
            category: "Spine",
            keywords: ["back pain", "lumbar pain", "lower back pain", "lbp"]
        },
        {
            name: "Mechanical Low Back Pain",
            category: "Spine",
            keywords: ["mechanical back pain", "lumbar mechanical pain"]
        },
        {
            name: "Lumbar Radiculopathy",
            category: "Spine",
            keywords: ["lumbar nerve pain", "nerve root", "radiating leg pain"]
        },
        {
            name: "Sciatica",
            category: "Spine",
            keywords: ["sciatic pain", "sciatic nerve", "leg pain"]
        },
        {
            name: "Lumbar Spondylosis",
            category: "Spine",
            keywords: ["lumbar degeneration", "lumbar arthritis"]
        },
        {
            name: "Lumbar Disc Prolapse",
            category: "Spine",
            keywords: ["slipped disc", "disc bulge", "disc herniation", "lumbar disc"]
        },
        {
            name: "Lumbar Disc Herniation",
            category: "Spine",
            keywords: ["herniated disc", "slipped disc", "lumbar disc"]
        },
        {
            name: "Spinal Stenosis",
            category: "Spine",
            keywords: ["lumbar stenosis", "spinal canal narrowing"]
        },
        {
            name: "Thoracic Back Pain",
            category: "Spine",
            keywords: ["mid back pain", "middle back pain", "thoracic pain"]
        },
        {
            name: "Cervical Pain",
            category: "Spine",
            keywords: ["neck pain", "cervical pain"]
        },
        {
            name: "Cervical Spondylosis",
            category: "Spine",
            keywords: ["cervical degeneration", "neck arthritis"]
        },
        {
            name: "Cervical Radiculopathy",
            category: "Spine",
            keywords: ["cervical nerve pain", "neck nerve pain", "arm radiating pain"]
        },
        {
            name: "Cervical Disc Prolapse",
            category: "Spine",
            keywords: ["cervical disc", "slipped neck disc", "disc herniation"]
        },
        {
            name: "Postural Dysfunction",
            category: "Spine",
            keywords: ["poor posture", "posture problem", "postural pain"]
        },

        /* ================= SHOULDER ================= */

        {
            name: "Shoulder Pain",
            category: "Shoulder",
            keywords: ["shoulder problem", "shoulder ache"]
        },
        {
            name: "Adhesive Capsulitis",
            category: "Shoulder",
            keywords: ["frozen shoulder", "frozen", "capsulitis"]
        },
        {
            name: "Rotator Cuff Injury",
            category: "Shoulder",
            keywords: ["rotator cuff", "shoulder tendon injury"]
        },
        {
            name: "Rotator Cuff Tendinopathy",
            category: "Shoulder",
            keywords: ["rotator cuff pain", "rotator cuff tendon"]
        },
        {
            name: "Shoulder Impingement Syndrome",
            category: "Shoulder",
            keywords: ["shoulder impingement", "impingement"]
        },
        {
            name: "Shoulder Instability",
            category: "Shoulder",
            keywords: ["unstable shoulder", "shoulder instability"]
        },
        {
            name: "Shoulder Dislocation Rehabilitation",
            category: "Shoulder",
            keywords: ["shoulder dislocation", "dislocated shoulder"]
        },

        /* ================= KNEE ================= */

        {
            name: "Knee Pain",
            category: "Knee",
            keywords: ["knee problem", "knee ache"]
        },
        {
            name: "Knee Osteoarthritis",
            category: "Knee",
            keywords: ["knee oa", "knee arthritis", "osteoarthritis knee"]
        },
        {
            name: "Patellofemoral Pain Syndrome",
            category: "Knee",
            keywords: ["pfps", "patellofemoral pain", "runner's knee"]
        },
        {
            name: "Meniscus Injury",
            category: "Knee",
            keywords: ["meniscal injury", "meniscus tear", "knee meniscus"]
        },
        {
            name: "ACL Injury",
            category: "Knee",
            keywords: ["acl", "anterior cruciate ligament", "acl tear"]
        },
        {
            name: "ACL Reconstruction Rehabilitation",
            category: "Knee",
            keywords: ["acl rehab", "acl reconstruction", "post acl surgery"]
        },
        {
            name: "PCL Injury",
            category: "Knee",
            keywords: ["pcl", "posterior cruciate ligament", "pcl tear"]
        },
        {
            name: "MCL Injury",
            category: "Knee",
            keywords: ["mcl", "medial collateral ligament"]
        },
        {
            name: "LCL Injury",
            category: "Knee",
            keywords: ["lcl", "lateral collateral ligament"]
        },
        {
            name: "Patellar Tendinopathy",
            category: "Knee",
            keywords: ["jumper's knee", "patellar tendon", "patellar tendinitis"]
        },
        {
            name: "Knee Joint Stiffness",
            category: "Knee",
            keywords: ["stiff knee", "knee stiffness"]
        },

        /* ================= HIP ================= */

        {
            name: "Hip Pain",
            category: "Hip",
            keywords: ["hip problem", "hip ache"]
        },
        {
            name: "Hip Osteoarthritis",
            category: "Hip",
            keywords: ["hip oa", "hip arthritis"]
        },
        {
            name: "Hip Joint Stiffness",
            category: "Hip",
            keywords: ["stiff hip", "hip stiffness"]
        },
        {
            name: "Greater Trochanteric Pain Syndrome",
            category: "Hip",
            keywords: ["gtps", "trochanteric pain", "lateral hip pain"]
        },

        /* ================= FOOT / ANKLE ================= */

        {
            name: "Ankle Pain",
            category: "Ankle",
            keywords: ["ankle problem", "ankle ache"]
        },
        {
            name: "Ankle Sprain",
            category: "Ankle",
            keywords: ["ankle ligament injury", "twisted ankle"]
        },
        {
            name: "Ankle Fracture Rehabilitation",
            category: "Ankle",
            keywords: ["ankle fracture", "broken ankle"]
        },
        {
            name: "Achilles Tendinopathy",
            category: "Foot & Ankle",
            keywords: ["achilles pain", "achilles tendon", "achilles tendinitis"]
        },
        {
            name: "Plantar Fasciitis",
            category: "Foot & Ankle",
            keywords: ["heel pain", "plantar fascia", "heel problem"]
        },
        {
            name: "Foot Pain",
            category: "Foot & Ankle",
            keywords: ["foot problem", "foot ache"]
        },

        /* ================= ELBOW / WRIST / HAND ================= */

        {
            name: "Tennis Elbow",
            category: "Elbow",
            keywords: ["lateral epicondylitis", "lateral elbow pain"]
        },
        {
            name: "Golfer's Elbow",
            category: "Elbow",
            keywords: ["medial epicondylitis", "medial elbow pain"]
        },
        {
            name: "Elbow Pain",
            category: "Elbow",
            keywords: ["elbow problem", "elbow ache"]
        },
        {
            name: "Wrist Pain",
            category: "Wrist",
            keywords: ["wrist problem", "wrist ache"]
        },
        {
            name: "Carpal Tunnel Syndrome",
            category: "Wrist",
            keywords: ["cts", "median nerve", "wrist nerve"]
        },
        {
            name: "Hand Pain",
            category: "Hand",
            keywords: ["hand problem", "hand ache"]
        },
        {
            name: "De Quervain's Tenosynovitis",
            category: "Wrist",
            keywords: ["de quervain", "thumb pain", "wrist tendon"]
        },

        /* ================= GENERAL PAIN ================= */

        {
            name: "Neck Pain",
            category: "Pain",
            keywords: ["neck ache", "cervical pain"]
        },
        {
            name: "Back Pain",
            category: "Pain",
            keywords: ["back ache", "spine pain"]
        },
        {
            name: "Joint Pain",
            category: "Pain",
            keywords: ["joint ache", "joint problem", "arthralgia"]
        },
        {
            name: "Musculoskeletal Pain",
            category: "Pain",
            keywords: ["msk pain", "musculoskeletal problem"]
        },
        {
            name: "Chronic Pain",
            category: "Pain",
            keywords: ["long term pain", "persistent pain"]
        },
        {
            name: "Acute Pain",
            category: "Pain",
            keywords: ["recent pain", "acute injury pain"]
        },
        {
            name: "Myofascial Pain Syndrome",
            category: "Pain",
            keywords: ["myofascial pain", "muscle pain"]
        },
        {
            name: "Trigger Point Pain",
            category: "Pain",
            keywords: ["trigger point", "muscle knot"]
        },

        /* ================= MUSCLE / SOFT TISSUE ================= */

        {
            name: "Muscle Strain",
            category: "Soft Tissue",
            keywords: ["muscle injury", "muscle tear", "muscle strain"]
        },
        {
            name: "Hamstring Strain",
            category: "Sports",
            keywords: ["hamstring injury", "hamstring tear"]
        },
        {
            name: "Quadriceps Strain",
            category: "Sports",
            keywords: ["quad strain", "quadriceps injury"]
        },
        {
            name: "Groin Strain",
            category: "Sports",
            keywords: ["groin injury", "adductor strain"]
        },
        {
            name: "Tendon Injury",
            category: "Soft Tissue",
            keywords: ["tendon injury", "tendon pain"]
        },
        {
            name: "Ligament Injury",
            category: "Soft Tissue",
            keywords: ["ligament tear", "ligament sprain"]
        },

        /* ================= SPORTS ================= */

        {
            name: "Sports Injury Rehabilitation",
            category: "Sports",
            keywords: ["sports injury", "athletic injury", "sports rehab"]
        },
        {
            name: "Sports Rehabilitation",
            category: "Sports",
            keywords: ["sports rehab", "athlete rehabilitation"]
        },
        {
            name: "Running Injury",
            category: "Sports",
            keywords: ["running injury", "runner injury"]
        },
        {
            name: "Overuse Injury",
            category: "Sports",
            keywords: ["overuse", "repetitive injury"]
        },

        /* ================= NEUROLOGICAL ================= */

        {
            name: "Stroke Rehabilitation",
            category: "Neurology",
            keywords: ["stroke", "cva", "post stroke", "stroke rehab"]
        },
        {
            name: "Hemiplegia",
            category: "Neurology",
            keywords: ["hemiplegia", "one sided paralysis"]
        },
        {
            name: "Hemiparesis",
            category: "Neurology",
            keywords: ["hemiparesis", "one sided weakness"]
        },
        {
            name: "Paraplegia",
            category: "Neurology",
            keywords: ["paraplegia", "lower limb paralysis"]
        },
        {
            name: "Spinal Cord Injury Rehabilitation",
            category: "Neurology",
            keywords: ["sci", "spinal cord injury", "spinal cord rehab"]
        },
        {
            name: "Parkinson's Disease Rehabilitation",
            category: "Neurology",
            keywords: ["parkinson", "parkinson disease", "parkinson rehab"]
        },
        {
            name: "Multiple Sclerosis Rehabilitation",
            category: "Neurology",
            keywords: ["multiple sclerosis", "ms rehabilitation", "ms rehab"]
        },
        {
            name: "Peripheral Neuropathy",
            category: "Neurology",
            keywords: ["neuropathy", "nerve damage", "peripheral nerve"]
        },
        {
            name: "Facial Palsy",
            category: "Neurology",
            keywords: ["facial weakness", "facial paralysis"]
        },
        {
            name: "Bell's Palsy",
            category: "Neurology",
            keywords: ["bells palsy", "bell palsy", "facial palsy"]
        },
        {
            name: "Balance Dysfunction",
            category: "Neurology",
            keywords: ["balance problem", "poor balance", "imbalance"]
        },
        {
            name: "Gait Dysfunction",
            category: "Neurology",
            keywords: ["walking problem", "gait problem", "abnormal gait"]
        },
        {
            name: "Muscle Weakness",
            category: "Neurology",
            keywords: ["weakness", "general weakness", "muscle power"]
        },

        /* ================= POST OPERATIVE ================= */

        {
            name: "Post Operative Rehabilitation",
            category: "Post Operative",
            keywords: ["post op", "postoperative", "post surgery", "surgery rehab"]
        },
        {
            name: "Total Knee Replacement Rehabilitation",
            category: "Post Operative",
            keywords: ["tkr", "tk replacement", "knee replacement"]
        },
        {
            name: "Total Hip Replacement Rehabilitation",
            category: "Post Operative",
            keywords: ["thr", "hip replacement"]
        },
        {
            name: "Post ACL Surgery Rehabilitation",
            category: "Post Operative",
            keywords: ["acl surgery", "acl post op", "acl rehab"]
        },
        {
            name: "Post Fracture Rehabilitation",
            category: "Post Operative",
            keywords: ["fracture rehab", "after fracture"]
        },
        {
            name: "Post Joint Replacement Rehabilitation",
            category: "Post Operative",
            keywords: ["joint replacement", "joint replacement rehab"]
        },

        /* ================= FRACTURES ================= */

        {
            name: "Fracture Rehabilitation",
            category: "Fracture",
            keywords: ["fracture", "broken bone", "fracture rehab"]
        },
        {
            name: "Shoulder Fracture Rehabilitation",
            category: "Fracture",
            keywords: ["shoulder fracture", "proximal humerus fracture"]
        },
        {
            name: "Wrist Fracture Rehabilitation",
            category: "Fracture",
            keywords: ["wrist fracture", "distal radius fracture"]
        },
        {
            name: "Hip Fracture Rehabilitation",
            category: "Fracture",
            keywords: ["hip fracture", "femur fracture"]
        },
        {
            name: "Ankle Fracture Rehabilitation",
            category: "Fracture",
            keywords: ["ankle fracture"]
        },

        /* ================= PEDIATRIC ================= */

        {
            name: "Developmental Delay",
            category: "Pediatrics",
            keywords: ["developmental delay", "delayed development"]
        },
        {
            name: "Cerebral Palsy",
            category: "Pediatrics",
            keywords: ["cp", "cerebral palsy"]
        },
        {
            name: "Pediatric Neurological Rehabilitation",
            category: "Pediatrics",
            keywords: ["pediatric neuro", "child neuro rehab"]
        },
        {
            name: "Pediatric Musculoskeletal Condition",
            category: "Pediatrics",
            keywords: ["pediatric ortho", "child musculoskeletal"]
        },
        {
            name: "Pediatric Gait Dysfunction",
            category: "Pediatrics",
            keywords: ["child walking problem", "pediatric gait"]
        },

        /* ================= GERIATRIC ================= */

        {
            name: "Geriatric Rehabilitation",
            category: "Geriatrics",
            keywords: ["geriatric", "elderly rehabilitation", "older adult rehab"]
        },
        {
            name: "Fall Risk / Mobility Dysfunction",
            category: "Geriatrics",
            keywords: ["fall risk", "falls", "mobility problem"]
        },
        {
            name: "Deconditioning",
            category: "General Rehabilitation",
            keywords: ["general weakness", "deconditioned", "physical deconditioning"]
        },

        /* ================= FUNCTIONAL ================= */

        {
            name: "Reduced Range of Motion",
            category: "Functional",
            keywords: ["rom restriction", "limited rom", "reduced movement"]
        },
        {
            name: "Joint Stiffness",
            category: "Functional",
            keywords: ["stiff joint", "joint restriction"]
        },
        {
            name: "Mobility Dysfunction",
            category: "Functional",
            keywords: ["mobility problem", "difficulty walking", "movement problem"]
        },
        {
            name: "Functional Weakness",
            category: "Functional",
            keywords: ["functional weakness", "weakness"]
        }

    ];


    /* =====================================================
       2. NORMALIZATION
       ===================================================== */

    function normalize(value) {
        return String(value || "")
            .toLowerCase()
            .trim()
            .replace(/[’']/g, "")
            .replace(/[^a-z0-9\s]/g, " ")
            .replace(/\s+/g, " ");
    }


    /* =====================================================
       3. COMMON TYPING CORRECTIONS
       ===================================================== */

    const TYPO_MAP = {
        "paun": "pain",
        "pian": "pain",
        "pian": "pain",
        "paim": "pain",
        "bak": "back",
        "bck": "back",
        "bac": "back",
        "nek": "neck",
        "neak": "neck",
        "sholder": "shoulder",
        "shulder": "shoulder",
        "knee": "knee",
        "knne": "knee",
        "shoudler": "shoulder",
        "ankel": "ankle",
        "ankl": "ankle",
        "elbo": "elbow",
        "wirst": "wrist",
        "wrst": "wrist",
        "hipp": "hip",
        "stroek": "stroke",
        "strke": "stroke",
        "acl": "acl",
        "frozen": "frozen",
        "sciatca": "sciatica",
        "sciatic": "sciatica",
        "radiculopthy": "radiculopathy",
        "radiculopathy": "radiculopathy",
        "spondylsis": "spondylosis",
        "fractur": "fracture",
        "frcture": "fracture",
        "parkinsons": "parkinson",
        "parkinson": "parkinson"
    };


    function correctToken(token) {
        const clean = normalize(token);

        if (TYPO_MAP[clean]) {
            return TYPO_MAP[clean];
        }

        return clean;
    }


    function correctedQuery(query) {
        return normalize(query)
            .split(" ")
            .map(correctToken)
            .join(" ");
    }


    /* =====================================================
       4. SIMPLE FUZZY MATCH
       ===================================================== */

    function levenshtein(a, b) {

        if (a === b) return 0;

        if (!a.length) return b.length;
        if (!b.length) return a.length;

        const matrix = [];

        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {

            for (let j = 1; j <= a.length; j++) {

                if (b.charAt(i - 1) === a.charAt(j - 1)) {

                    matrix[i][j] = matrix[i - 1][j - 1];

                } else {

                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );

                }
            }
        }

        return matrix[b.length][a.length];
    }


    function fuzzyWordMatch(queryWord, targetWord) {

        if (!queryWord || !targetWord) return false;

        if (targetWord.includes(queryWord)) return true;

        if (queryWord.length < 4) return false;

        const distance = levenshtein(queryWord, targetWord);

        if (queryWord.length <= 5) {
            return distance <= 1;
        }

        return distance <= 2;
    }


    /* =====================================================
       5. SMART SEARCH
       ===================================================== */

    function searchDiagnoses(query) {

        const original = normalize(query);

        if (!original) return [];

        const corrected = correctedQuery(original);

        const queryWords = corrected.split(" ").filter(Boolean);

        const results = [];

        PHYSIO_DIAGNOSES.forEach((item, index) => {

            const name = normalize(item.name);
            const category = normalize(item.category);
            const keywords = (item.keywords || []).map(normalize);

            let score = 0;

            /* Exact diagnosis */
            if (name === corrected) {
                score += 1000;
            }

            /* Diagnosis starts with query */
            if (name.startsWith(corrected)) {
                score += 500;
            }

            /* Diagnosis contains query */
            if (name.includes(corrected)) {
                score += 350;
            }

            /* Category match */
            if (category.includes(corrected)) {
                score += 180;
            }

            /* Keyword matching */
            keywords.forEach(keyword => {

                if (keyword === corrected) {
                    score += 450;
                }

                if (keyword.startsWith(corrected)) {
                    score += 300;
                }

                if (keyword.includes(corrected)) {
                    score += 220;
                }

                queryWords.forEach(word => {

                    keyword.split(" ").forEach(targetWord => {

                        if (fuzzyWordMatch(word, targetWord)) {
                            score += 100;
                        }

                    });

                });

            });


            /* Individual diagnosis words */
            const nameWords = name.split(" ");

            queryWords.forEach(word => {

                nameWords.forEach(nameWord => {

                    if (nameWord === word) {
                        score += 160;
                    }

                    if (nameWord.startsWith(word)) {
                        score += 110;
                    }

                    if (fuzzyWordMatch(word, nameWord)) {
                        score += 80;
                    }

                });

            });


            /* Small bonus for shorter, more precise matches */
            if (score > 0) {
                score += Math.max(0, 40 - name.length);
            }


            if (score > 0) {

                results.push({
                    ...item,
                    score,
                    originalIndex: index
                });

            }

        });


        return results
            .sort((a, b) => {

                if (b.score !== a.score) {
                    return b.score - a.score;
                }

                return a.originalIndex - b.originalIndex;

            })
            .slice(0, 10);

    }


    /* =====================================================
       6. CSS
       ===================================================== */

    function injectStyles() {

        if (document.getElementById("clinio-diagnosis-style")) {
            return;
        }

        const style = document.createElement("style");

        style.id = "clinio-diagnosis-style";

        style.textContent = `

            .clinio-diagnosis-wrapper {
                position: relative;
                width: 100%;
            }

            .clinio-diagnosis-dropdown {
                position: absolute;
                left: 0;
                right: 0;
                top: calc(100% + 6px);
                z-index: 99999;

                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 16px;

                box-shadow:
                    0 20px 45px rgba(15, 23, 42, 0.14),
                    0 4px 12px rgba(15, 23, 42, 0.08);

                overflow: hidden;

                max-height: 320px;
                overflow-y: auto;

                padding: 6px;
            }

            .dark .clinio-diagnosis-dropdown {
                background: #0f172a;
                border-color: #1e293b;
                box-shadow:
                    0 20px 45px rgba(0, 0, 0, 0.40);
            }

            .clinio-diagnosis-item {
                display: flex;
                align-items: center;
                gap: 12px;

                width: 100%;
                padding: 11px 12px;

                border-radius: 12px;

                cursor: pointer;

                transition:
                    background 0.15s ease,
                    transform 0.10s ease;
            }

            .clinio-diagnosis-item:hover,
            .clinio-diagnosis-item.active {
                background: #f1f5f9;
            }

            .dark .clinio-diagnosis-item:hover,
            .dark .clinio-diagnosis-item.active {
                background: #1e293b;
            }

            .clinio-diagnosis-icon {
                width: 34px;
                height: 34px;

                flex: 0 0 34px;

                display: flex;
                align-items: center;
                justify-content: center;

                border-radius: 10px;

                background: #eef2ff;
                color: #4f46e5;

                font-size: 14px;
                font-weight: 900;
            }

            .dark .clinio-diagnosis-icon {
                background: #312e81;
                color: #c7d2fe;
            }

            .clinio-diagnosis-main {
                min-width: 0;
                flex: 1;
            }

            .clinio-diagnosis-name {
                font-size: 13px;
                font-weight: 800;
                color: #0f172a;
                line-height: 1.35;
            }

            .dark .clinio-diagnosis-name {
                color: #f8fafc;
            }

            .clinio-diagnosis-category {
                margin-top: 2px;

                font-size: 9px;
                font-weight: 800;

                text-transform: uppercase;
                letter-spacing: 0.08em;

                color: #94a3b8;
            }

            .clinio-diagnosis-arrow {
                color: #94a3b8;
                font-size: 16px;
                font-weight: 900;
            }

            .clinio-diagnosis-empty {
                padding: 18px 14px;
                text-align: center;

                font-size: 12px;
                font-weight: 700;

                color: #64748b;
            }

        `;

        document.head.appendChild(style);
    }


    /* =====================================================
       7. HTML ESCAPE
       ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       8. ICON BY CATEGORY
       ===================================================== */

    function categoryIcon(category) {

        const c = normalize(category);

        if (c.includes("spine")) return "🦴";
        if (c.includes("shoulder")) return "💪";
        if (c.includes("knee")) return "🦵";
        if (c.includes("hip")) return "🦴";
        if (c.includes("ankle")) return "🦶";
        if (c.includes("foot")) return "🦶";
        if (c.includes("neurology")) return "🧠";
        if (c.includes("sports")) return "🏃";
        if (c.includes("pediatric")) return "👶";
        if (c.includes("geriatric")) return "👴";
        if (c.includes("fracture")) return "🦴";
        if (c.includes("pain")) return "⚡";
        if (c.includes("post operative")) return "🏥";

        return "➕";
    }


    /* =====================================================
       9. AUTOCOMPLETE CREATION
       ===================================================== */

    function createAutocomplete(input) {

        if (!input || input.dataset.clinioDiagnosisReady === "true") {
            return;
        }

        input.dataset.clinioDiagnosisReady = "true";

        /* Wrapper */
        const wrapper = document.createElement("div");

        wrapper.className = "clinio-diagnosis-wrapper";

        input.parentNode.insertBefore(wrapper, input);

        wrapper.appendChild(input);


        /* Dropdown */
        const dropdown = document.createElement("div");

        dropdown.className = "clinio-diagnosis-dropdown";

        dropdown.style.display = "none";

        wrapper.appendChild(dropdown);


        let activeIndex = -1;
        let currentResults = [];


        /* =================================================
           SHOW RESULTS
           ================================================= */

        function showResults(results) {

            currentResults = results;
            activeIndex = -1;

            dropdown.innerHTML = "";

            if (!results.length) {

                dropdown.innerHTML = `
                    <div class="clinio-diagnosis-empty">
                        No matching diagnosis found
                    </div>
                `;

                dropdown.style.display = "block";

                return;
            }


            results.forEach((item, index) => {

                const row = document.createElement("div");

                row.className = "clinio-diagnosis-item";

                row.dataset.index = index;

                row.innerHTML = `
                    <div class="clinio-diagnosis-icon">
                        ${categoryIcon(item.category)}
                    </div>

                    <div class="clinio-diagnosis-main">

                        <div class="clinio-diagnosis-name">
                            ${escapeHTML(item.name)}
                        </div>

                        <div class="clinio-diagnosis-category">
                            ${escapeHTML(item.category)}
                        </div>

                    </div>

                    <div class="clinio-diagnosis-arrow">
                        ›
                    </div>
                `;


                row.addEventListener("mousedown", function (event) {

                    event.preventDefault();

                    selectDiagnosis(index);

                });


                row.addEventListener("touchstart", function (event) {

                    event.preventDefault();

                    selectDiagnosis(index);

                }, { passive: false });


                dropdown.appendChild(row);

            });


            dropdown.style.display = "block";

        }


        /* =================================================
           SELECT DIAGNOSIS
           ================================================= */

        function selectDiagnosis(index) {

            const selected = currentResults[index];

            if (!selected) return;

            input.value = selected.name;

            input.dispatchEvent(new Event("input", {
                bubbles: true
            }));

            input.dispatchEvent(new Event("change", {
                bubbles: true
            }));

            hideDropdown();

            input.focus();

        }


        /* =================================================
           HIGHLIGHT
           ================================================= */

        function highlight(index) {

            const rows = dropdown.querySelectorAll(
                ".clinio-diagnosis-item"
            );

            rows.forEach(row => {
                row.classList.remove("active");
            });

            if (index < 0 || index >= rows.length) {
                return;
            }

            rows[index].classList.add("active");

            rows[index].scrollIntoView({
                block: "nearest"
            });

        }


        /* =================================================
           HIDE
           ================================================= */

        function hideDropdown() {

            dropdown.style.display = "none";

            activeIndex = -1;

        }


        /* =================================================
           INPUT EVENT
           ================================================= */

        input.addEventListener("input", function () {

            const value = input.value.trim();

            if (!value) {

                hideDropdown();

                return;

            }

            const results = searchDiagnoses(value);

            showResults(results);

        });


        /* =================================================
           FOCUS
           ================================================= */

        input.addEventListener("focus", function () {

            const value = input.value.trim();

            if (!value) {
                hideDropdown();
                return;
            }

            const results = searchDiagnoses(value);

            showResults(results);

        });


        /* =================================================
           KEYBOARD
           ================================================= */

        input.addEventListener("keydown", function (event) {

            if (
                dropdown.style.display === "none" ||
                !currentResults.length
            ) {
                return;
            }


            /* DOWN */
            if (event.key === "ArrowDown") {

                event.preventDefault();

                activeIndex++;

                if (activeIndex >= currentResults.length) {
                    activeIndex = 0;
                }

                highlight(activeIndex);

            }


            /* UP */
            else if (event.key === "ArrowUp") {

                event.preventDefault();

                activeIndex--;

                if (activeIndex < 0) {
                    activeIndex = currentResults.length - 1;
                }

                highlight(activeIndex);

            }


            /* ENTER */
            else if (event.key === "Enter") {

                if (activeIndex >= 0) {

                    event.preventDefault();

                    selectDiagnosis(activeIndex);

                }

            }


            /* ESC */
            else if (event.key === "Escape") {

                event.preventDefault();

                hideDropdown();

            }

        });


        /* =================================================
           OUTSIDE CLICK
           ================================================= */

        document.addEventListener("mousedown", function (event) {

            if (!wrapper.contains(event.target)) {

                hideDropdown();

            }

        });

    }


    /* =====================================================
       10. INITIALIZE ALL DIAGNOSIS FIELDS
       ===================================================== */

    function initDiagnosisAutocomplete() {

        injectStyles();

        const inputIds = [
            "en-condition",
            "iq-diagnosis",
            "ep-condition"
        ];

        inputIds.forEach(id => {

            const input = document.getElementById(id);

            if (input) {
                createAutocomplete(input);
            }

        });

    }


    /* =====================================================
       11. OBSERVE DYNAMIC MODALS
       ===================================================== */

    function observeDynamicInputs() {

        const observer = new MutationObserver(function () {

            initDiagnosisAutocomplete();

        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

    }


    /* =====================================================
       12. PUBLIC API
       ===================================================== */

    window.ClinioSphereDiagnosis = {

        list: PHYSIO_DIAGNOSES,

        search: searchDiagnoses,

        init: initDiagnosisAutocomplete

    };


    /* =====================================================
       13. START
       ===================================================== */

    function start() {

        initDiagnosisAutocomplete();

        observeDynamicInputs();

    }


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            start
        );

    } else {

        start();

    }

})();
