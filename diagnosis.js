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
                position: fixed;
                z-index: 999999;

                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 16px;

                box-shadow:
                    0 20px 45px rgba(15, 23, 42, 0.20),
                    0 4px 16px rgba(15, 23, 42, 0.12);

                overflow: hidden;
                overflow-y: auto;

                max-height: 280px;
                padding: 6px;
                box-sizing: border-box;
            }

            .dark .clinio-diagnosis-dropdown {
                background: #0f172a;
                border-color: #1e293b;
                box-shadow:
                    0 20px 45px rgba(0, 0, 0, 0.60),
                    0 4px 16px rgba(0, 0, 0, 0.40);
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
                color: #6366f1;
                font-size: 13px;
                font-weight: 800;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                border-radius: 8px;
                background: #f1f5f9;
                transition: all 0.15s ease;
            }

            .dark .clinio-diagnosis-arrow {
                color: #a5b4fc;
                background: #1e293b;
            }

            .clinio-diagnosis-item:hover .clinio-diagnosis-arrow,
            .clinio-diagnosis-item.active .clinio-diagnosis-arrow {
                background: #6366f1;
                color: #ffffff;
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
       9. AUTOCOMPLETE CREATION (Multi-Select & Fixed Dropdown)
       ===================================================== */

    function getExistingDiagnoses(text) {
        if (!text) return [];
        return text
            .split(",")
            .map(s => normalize(s))
            .filter(Boolean);
    }

    function getFilteredSuggestions(query, fullText) {
        const existing = getExistingDiagnoses(fullText);
        let results = [];

        if (!query || !query.trim()) {
            results = PHYSIO_DIAGNOSES.filter(item => !existing.includes(normalize(item.name))).slice(0, 8);
        } else {
            const raw = searchDiagnoses(query);
            results = raw.filter(item => !existing.includes(normalize(item.name)));
            if (!results.length && raw.length) {
                results = raw;
            }
        }
        return results;
    }

    function createAutocomplete(input) {

        if (!input || input.dataset.clinioDiagnosisReady === "true") {
            return;
        }

        input.dataset.clinioDiagnosisReady = "true";

        /* Clean up any old dropdown attached to body for this input */
        if (input._clinioDropdown && input._clinioDropdown.parentNode) {
            input._clinioDropdown.parentNode.removeChild(input._clinioDropdown);
        }

        /* Wrapper */
        const wrapper = document.createElement("div");
        wrapper.className = "clinio-diagnosis-wrapper";
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);

        /* Dropdown attached to document.body to avoid modal/container clipping */
        const dropdown = document.createElement("div");
        dropdown.className = "clinio-diagnosis-dropdown";
        dropdown.style.display = "none";
        document.body.appendChild(dropdown);
        input._clinioDropdown = dropdown;

        let activeIndex = -1;
        let currentResults = [];
        let isProgrammatic = false;
        let searchDebounceTimer = null;

        /* =================================================
           SMART FIXED POSITIONING (Dropup / Dropdown)
           ================================================= */

        function positionDropdown() {
            if (dropdown.style.display === "none") return;

            if (!input.isConnected || input.offsetParent === null) {
                hideDropdown();
                return;
            }

            const rect = input.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0 || rect.bottom < 0 || rect.top > window.innerHeight) {
                hideDropdown();
                return;
            }

            dropdown.style.position = "fixed";
            const leftPos = Math.max(10, Math.min(rect.left, window.innerWidth - rect.width - 10));
            dropdown.style.left = leftPos + "px";
            dropdown.style.width = Math.min(rect.width, window.innerWidth - 20) + "px";
            dropdown.style.zIndex = "999999";

            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;

            // Flip upwards if below space is cramped (< 220px) and above has more room
            if (spaceBelow < 220 && spaceAbove > spaceBelow) {
                dropdown.style.top = "auto";
                dropdown.style.bottom = (window.innerHeight - rect.top + 6) + "px";
                dropdown.style.maxHeight = Math.min(260, Math.max(140, spaceAbove - 20)) + "px";
            } else {
                dropdown.style.top = (rect.bottom + 6) + "px";
                dropdown.style.bottom = "auto";
                dropdown.style.maxHeight = Math.min(260, Math.max(140, spaceBelow - 20)) + "px";
            }
        }

        window.addEventListener("scroll", positionDropdown, { capture: true, passive: true });
        window.addEventListener("resize", positionDropdown, { passive: true });

        /* =================================================
           TOKEN PARSING FOR MULTI-SELECT
           ================================================= */

        function getTokenAtCursor() {
            const text = input.value || "";
            const cursorPos = (input.selectionStart !== null && input.selectionStart !== undefined) ? input.selectionStart : text.length;

            const lastComma = text.lastIndexOf(",", cursorPos - 1);
            const nextComma = text.indexOf(",", cursorPos);

            const start = lastComma === -1 ? 0 : lastComma + 1;
            const end = nextComma === -1 ? text.length : nextComma;

            const raw = text.substring(start, end);
            const query = raw.trim();

            return {
                start: start,
                end: end,
                raw: raw,
                query: query,
                cursorPos: cursorPos
            };
        }

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
                positionDropdown();
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
                        +
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
            positionDropdown();
        }

        /* =================================================
           SELECT DIAGNOSIS (MULTI-SELECT SUPPORT)
           ================================================= */

        function selectDiagnosis(index) {
            const selected = currentResults[index];
            if (!selected) return;

            const text = input.value || "";
            const token = getTokenAtCursor();

            const before = text.substring(0, token.start);
            const after = text.substring(token.end);

            const combined = before + selected.name + after;
            const parts = combined.split(",").map(s => s.trim()).filter(Boolean);

            const unique = [];
            parts.forEach(p => {
                if (!unique.includes(p)) unique.push(p);
            });

            const isAtEnd = token.end >= text.trimEnd().length;
            if (isAtEnd) {
                input.value = unique.join(", ") + ", ";
            } else {
                input.value = unique.join(", ");
            }

            isProgrammatic = true;
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));
            setTimeout(() => { isProgrammatic = false; }, 150);

            hideDropdown();
            input.focus();

            const newPos = input.value.length;
            input.setSelectionRange(newPos, newPos);
        }

        /* =================================================
           HIGHLIGHT
           ================================================= */

        function highlight(index) {
            const rows = dropdown.querySelectorAll(".clinio-diagnosis-item");
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
           INPUT EVENT (Debounced with multi-select support)
           ================================================= */

        input.addEventListener("input", function () {
            if (isProgrammatic) return;

            clearTimeout(searchDebounceTimer);
            searchDebounceTimer = setTimeout(function () {
                if (!input.value.trim()) {
                    hideDropdown();
                    return;
                }
                const token = getTokenAtCursor();
                const results = getFilteredSuggestions(token.query, input.value);
                showResults(results);
            }, 70);
        });

        /* =================================================
           FOCUS
           ================================================= */

        input.addEventListener("focus", function () {
            if (isProgrammatic) return;

            if (input.value.trim()) {
                const token = getTokenAtCursor();
                const results = getFilteredSuggestions(token.query, input.value);
                if (results.length) {
                    showResults(results);
                }
            }
        });

        /* =================================================
           BLUR (Clean trailing commas on field exit)
           ================================================= */

        input.addEventListener("blur", function () {
            setTimeout(function () {
                hideDropdown();
                if (input.value) {
                    const cleaned = input.value
                        .split(",")
                        .map(s => s.trim())
                        .filter(Boolean)
                        .join(", ");
                    if (input.value !== cleaned) {
                        input.value = cleaned;
                        input.dispatchEvent(new Event("change", { bubbles: true }));
                    }
                }
            }, 220);
        });

        /* =================================================
           KEYBOARD NAVIGATION
           ================================================= */

        input.addEventListener("keydown", function (event) {
            if (dropdown.style.display === "none" || !currentResults.length) {
                if (event.key === "ArrowDown") {
                    const token = getTokenAtCursor();
                    const results = getFilteredSuggestions(token.query, input.value);
                    if (results.length) {
                        event.preventDefault();
                        showResults(results);
                    }
                }
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
                if (activeIndex >= 0 && activeIndex < currentResults.length) {
                    event.preventDefault();
                    selectDiagnosis(activeIndex);
                }
            }

            /* TAB */
            else if (event.key === "Tab") {
                if (activeIndex >= 0 && activeIndex < currentResults.length) {
                    selectDiagnosis(activeIndex);
                } else {
                    hideDropdown();
                }
            }

            /* ESC */
            else if (event.key === "Escape") {
                event.preventDefault();
                hideDropdown();
            }
        });

        /* =================================================
           OUTSIDE INTERACTION CLICK
           ================================================= */

        function handleOutsideInteraction(event) {
            if (!wrapper.contains(event.target) && !dropdown.contains(event.target)) {
                hideDropdown();
            }
        }

        document.addEventListener("mousedown", handleOutsideInteraction);
        document.addEventListener("touchstart", handleOutsideInteraction, { passive: true });

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
       11. OBSERVE DYNAMIC MODALS (Throttled & Non-Blocking)
       ===================================================== */

    function observeDynamicInputs() {

        let observerDebounce = null;
        const observer = new MutationObserver(function () {

            if (observerDebounce) return;
            observerDebounce = setTimeout(function () {
                observerDebounce = null;
                initDiagnosisAutocomplete();
            }, 300);

        });

        // Only observe if document.body exists
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

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
