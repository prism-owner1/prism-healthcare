/* =====================================================================
   CLINIOSPHERE PMS - CLINICAL EXERCISE AUTO-SUGGESTION ENGINE
   ---------------------------------------------------------------------
   Automatically maps patient clinical diagnosis (from diagnosis.js,
   free typing, or acronyms) to evidence-based rehabilitation protocols
   from EXERCISE_LIBRARY (exercises.js).
   
   Powers:
   1. Patient Enrollment (Step 04 Home Exercise Plan HEP)
   2. Clinical HEP Library Tab (tab-exercises)
   3. Patient Detail Exercise Plan Modal (exercise-plan-modal)
   4. Enrollment HEP Library Browser Modal (enroll-hep-modal)
   ===================================================================== */

(function () {
    "use strict";

    /* =================================================================
       1. CLINICAL REHABILITATION PROTOCOLS DATABASE
       ================================================================= */

    const CLINICAL_PROTOCOLS = [
        /* ------------------ CERVICAL & SPINE ------------------ */
        {
            id: "cervical_radiculopathy",
            title: "Cervical Radiculopathy / Nerve Root Protocol",
            region: "Cervical & Upper Back",
            category: "Nerve Glides & Headaches",
            keywords: [
                "cervical radiculopathy", "radiculopathy", "cervical nerve root", "radiating neck pain",
                "cervical disc herniation", "cervical disc prolapse", "cervical slip disc", "cervical pinched nerve",
                "brachial neuralgia", "brachial plexus", "neck pain radiating to arm"
            ],
            exercises: [
                { name: "Supine Chin Tuck (The Nod)", sets: "3 sets × 10 reps", freq: "Twice daily", rationale: "Unloads cervical nerve roots & activates deep flexors" },
                { name: "Median Nerve Slider", sets: "2 sets × 15 reps", freq: "Twice daily", rationale: "Restores pain-free median nerve longitudinal mobility" },
                { name: "Wall-Supported Chin Tuck", sets: "3 sets × 10 reps (5s hold)", freq: "Twice daily", rationale: "Corrects forward head posture to widen neural foramina" },
                { name: "Ulnar Nerve Slider", sets: "2 sets × 15 reps", freq: "Twice daily", rationale: "Mobilizes C8-T1 nerve roots and ulnar pathway" },
                { name: "Brugger’s Relief Position", sets: "3 breaths every hour", freq: "Hourly", rationale: "Postural decompression during prolonged sitting" },
                { name: "Serratus Wall Slides", sets: "2 sets × 12 reps", freq: "Daily", rationale: "Scapular upward rotation to support cervical spine" }
            ]
        },
        {
            id: "cervical_spondylosis",
            title: "Cervical Spondylosis & Neck Pain Protocol",
            region: "Cervical & Upper Back",
            category: "Deep Neck Flexor (DNF) & Stability",
            keywords: [
                "cervical spondylosis", "cervical pain", "neck pain", "cervical strain", "neck spasm",
                "cervical arthritis", "cervical degeneration", "stiff neck", "trapezitis", "c-spine pain",
                "cervical spine", "cervicalgia", "neck stiffness"
            ],
            exercises: [
                { name: "Supine Chin Tuck (The Nod)", sets: "3 sets × 10 reps", freq: "Twice daily", rationale: "Strengthens deep neck flexors (longus colli/capitis)" },
                { name: "Active Cervical Rotation", sets: "2 sets × 10 reps", freq: "3 times daily", rationale: "Restores gentle rotational range of motion" },
                { name: "Cervical Lateral Flexion", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Lengthens tight lateral cervical structures" },
                { name: "Isometric Extension (Backward)", sets: "2 sets × 10 reps (5s hold)", freq: "Twice daily", rationale: "Strengthens posterior cervical stabilizers without joint shear" },
                { name: "Wall Angels", sets: "3 sets × 10 reps", freq: "Daily", rationale: "Retrains scapulothoracic postural integration" },
                { name: "Upper Trap Stretch (Active)", sets: "3 reps × 30s hold", freq: "Twice daily", rationale: "Releases hypertonic upper trapezius muscle" }
            ]
        },
        {
            id: "cervicogenic_headache",
            title: "Cervicogenic Headache & Suboccipital Release",
            region: "Cervical & Upper Back",
            category: "Nerve Glides & Headaches",
            keywords: [
                "cervicogenic headache", "headache", "occipital neuralgia", "suboccipital", "tension headache",
                "neck headache", "c1-c2", "cervical headache"
            ],
            exercises: [
                { name: "Suboccipital Self-Release", sets: "2-3 minutes", freq: "Twice daily", rationale: "Relieves hypertonicity of rectus capitis & obliquus muscles" },
                { name: "Supine Chin Tuck (The Nod)", sets: "3 sets × 10 reps", freq: "Twice daily", rationale: "Elongates suboccipital region and activates DNF" },
                { name: "C1-C2 Self-SNAG", sets: "5-10 reps", freq: "Twice daily", rationale: "Mulligan technique to restore upper cervical facet glide" },
                { name: "Scalene Stretch", sets: "3 reps × 30s hold", freq: "Twice daily", rationale: "Reduces scalene compression on thoracic outlet" },
                { name: "Brugger’s Relief Position", sets: "3 deep breaths", freq: "Hourly", rationale: "Breaks upper crossed forward-head posturing" }
            ]
        },
        {
            id: "thoracic_posture",
            title: "Thoracic Kyphosis & Postural Realignment",
            region: "Thoracic Spine & Posture",
            category: "2. Posture & Shoulder Blade Strength (Anti-Hunch)",
            keywords: [
                "postural dysfunction", "poor posture", "posture", "thoracic pain", "thoracic back pain",
                "mid back pain", "kyphosis", "dowager's hump", "dowager", "hunchback", "slouching",
                "upper crossed syndrome", "rounded shoulders", "forward head"
            ],
            exercises: [
                { name: "Cat-Cow Stretch", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Restores thoracic segmental flexion-extension mobility" },
                { name: "The 'Open Book' Stretch", sets: "10 reps each side", freq: "Twice daily", rationale: "Promotes thoracic rotation and anterior chest opening" },
                { name: "Wall Angels", sets: "3 sets × 10 reps", freq: "Daily", rationale: "Re-educates lower trapezius and serratus anterior" },
                { name: "Scapular Squeezes", sets: "3 sets × 15 reps", freq: "3 times daily", rationale: "Strengthens rhomboids and mid-trapezius" },
                { name: "Doorway Chest Opener", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Stretches tight pectoralis major and minor" },
                { name: "Foam Roller Arching", sets: "2 minutes", freq: "Daily", rationale: "Passive extension mobilization of stiff thoracic segments" }
            ]
        },

        /* ------------------ LUMBAR SPINE & SCIATICA ------------------ */
        {
            id: "lumbar_disc_herniation",
            title: "Lumbar Disc Herniation / PIVD (McKenzie Protocol)",
            region: "Lumbar (Lower Back) & Sciatica",
            category: "1. First Aid: Acute Pain Relief (McKenzie Style)",
            keywords: [
                "lumbar disc herniation", "lumbar disc prolapse", "pivd", "slipped disc", "disc bulge",
                "disc protrusion", "disc extrusion", "herniated disc", "lumbar disc", "annular tear",
                "acute back pain with radiating"
            ],
            exercises: [
                { name: "Flat Stomach Rest", sets: "3-5 minutes", freq: "3 times daily", rationale: "Reduces acute hydrostatic intradiscal pressure" },
                { name: "Prop on Elbows", sets: "Hold 1-2 minutes", freq: "3 times daily", rationale: "McKenzie extension to promote anterior disc migration" },
                { name: "The Full Seal (Cobra)", sets: "10-15 reps (slow)", freq: "3 times daily", rationale: "Centralizes disc protrusion and relieves radiating symptoms" },
                { name: "Standing Lean Back", sets: "10 reps", freq: "Every 2 hours", rationale: "Extension in standing during work and prolonged sitting" },
                { name: "Full Bird-Dog", sets: "2 sets × 8 reps (5s hold)", freq: "Twice daily", rationale: "McGill stability training with zero spinal compressive load" }
            ]
        },
        {
            id: "sciatica_lumbar_radiculopathy",
            title: "Sciatica & Lumbar Nerve Flossing Protocol",
            region: "Lumbar (Lower Back) & Sciatica",
            category: "3. Sciatica: Nerve Flossing & Gliding",
            keywords: [
                "sciatica", "lumbar radiculopathy", "sciatic nerve", "sciatic pain", "radiating leg pain",
                "piriformis syndrome", "nerve root lumbar", "buttock pain radiating to leg"
            ],
            exercises: [
                { name: "Slump Floss (Level 1)", sets: "2 sets × 15 reps", freq: "Twice daily", rationale: "Low-tension neural mobilization of the sciatic tract" },
                { name: "Slump Floss (Level 2)", sets: "2 sets × 12 reps", freq: "Twice daily", rationale: "Dynamic neural excursion to free sciatic entrapments" },
                { name: "The Figure 4 Stretch", sets: "3 reps × 30s hold", freq: "Twice daily", rationale: "Releases piriformis muscle compressing sciatic nerve" },
                { name: "Sciatic Wall Slide", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Non-provocative neural tension modulation" },
                { name: "Prop on Elbows", sets: "Hold 60 seconds", freq: "3 times daily", rationale: "Extension-based centralization of lumbar nerve root" },
                { name: "Full Bird-Dog", sets: "3 sets × 10 reps", freq: "Daily", rationale: "Core endurance to protect irritated nerve roots" }
            ]
        },
        {
            id: "low_back_pain_mechanical",
            title: "Mechanical Low Back Pain & Lumbar Spondylosis",
            region: "Lumbar (Lower Back) & Sciatica",
            category: "4. Core Stability: The 'Big 3' & Beyond",
            keywords: [
                "low back pain", "lbp", "mechanical low back pain", "lumbar spondylosis", "lumbar degeneration",
                "lumbar pain", "lower back pain", "lumbago", "lumbar strain", "lumbar facet",
                "back ache", "back stiffness"
            ],
            exercises: [
                { name: "Angry Cat Stretch", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Gentle spinal flexion-extension joint lubrication" },
                { name: "Pelvic Tilt (Floor)", sets: "3 sets × 12 reps", freq: "Twice daily", rationale: "Activates transversus abdominis and resets pelvic neutral" },
                { name: "Full Bird-Dog", sets: "3 sets × 10 reps (5s hold)", freq: "Twice daily", rationale: "McGill Big 3 core endurance without spine flexion load" },
                { name: "Full Dead Bug", sets: "3 sets × 10 reps", freq: "Daily", rationale: "Anterior core stability and anti-extension control" },
                { name: "Bridge (Hold)", sets: "3 sets × 12 reps (5s hold)", freq: "Twice daily", rationale: "Gluteus maximus strengthening for lumbopelvic support" },
                { name: "Side Plank (on Knees)", sets: "3 sets × 20s hold", freq: "Daily", rationale: "Quadratus lumborum and lateral chain endurance" }
            ]
        },
        {
            id: "spinal_stenosis",
            title: "Lumbar Spinal Stenosis (Flexion-Biased)",
            region: "Lumbar (Lower Back) & Sciatica",
            category: "2. Flexibility: Stenosis & Arthritis Relief (Flexion)",
            keywords: [
                "spinal stenosis", "lumbar stenosis", "canal stenosis", "neurogenic claudication",
                "narrowing spinal canal", "lumbar canal stenosis", "stenosis"
            ],
            exercises: [
                { name: "One Knee to Chest", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Lumbar flexion to widen spinal canal and neural foramina" },
                { name: "Two Knees to Chest", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Decompresses posterior facet joints and foramen" },
                { name: "Child's Pose", sets: "Hold 30-45 seconds × 3", freq: "Twice daily", rationale: "Gentle lumbar flexion stretch in non-weight bearing" },
                { name: "Pelvic Tilt (Floor)", sets: "3 sets × 15 reps", freq: "Twice daily", rationale: "Posterior pelvic tilting to decrease lumbar lordosis" },
                { name: "Seated Toe Touch", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Safe seated lumbar flexion stretch" }
            ]
        },
        {
            id: "spondylolisthesis",
            title: "Spondylolisthesis & Lumbar Instability (Flexion/Core Bias)",
            region: "Lumbar (Lower Back) & Sciatica",
            category: "4. Core Stability: The 'Big 3' & Beyond",
            keywords: [
                "spondylolisthesis", "spondylolysis", "pars defect", "pars interarticularis",
                "lumbar instability", "anterolisthesis", "retrolisthesis", "spondy", "slipped vertebra"
            ],
            exercises: [
                { name: "Pelvic Tilt (Floor)", sets: "3 sets × 15 reps", freq: "Twice daily", rationale: "Posterior pelvic tilt to de-shear L5-S1 slipped vertebra" },
                { name: "Full Dead Bug", sets: "3 sets × 10 reps", freq: "Twice daily", rationale: "Anti-extension deep abdominal core bracing without spinal shear" },
                { name: "Full Bird-Dog", sets: "3 sets × 10 reps (5s hold)", freq: "Twice daily", rationale: "Multifidus and gluteal endurance with neutral spine" },
                { name: "Angry Cat Stretch", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Gentle spinal flexion to offload pars interarticularis" },
                { name: "Two Knees to Chest", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Opens lumbar spinal canal and stretches tight thoracolumbar fascia" },
                { name: "Bridge (Hold)", sets: "3 sets × 12 reps", freq: "Twice daily", rationale: "Gluteal stabilization to prevent excessive anterior pelvic tilt" }
            ]
        },
        {
            id: "ankylosing_spondylitis",
            title: "Ankylosing Spondylitis (AS) & Spinal Mobility Protocol",
            region: "Thoracic Spine & Posture",
            category: "1. Unlocking Mid-Back Stiffness (Mobility)",
            keywords: [
                "ankylosing spondylitis", "axial spondyloarthritis", "as spine", "bamboo spine",
                "sacroiliitis", "si joint pain", "sacroiliac joint", "inflammatory back pain"
            ],
            exercises: [
                { name: "Foam Roller Arching", sets: "2-3 minutes", freq: "Daily", rationale: "Counteracts thoracic kyphotic fusion and promotes spinal extension" },
                { name: "Cat-Cow Stretch", sets: "2 sets × 12 reps", freq: "Twice daily", rationale: "Multi-segmental axial mobility" },
                { name: "The 'Open Book' Stretch", sets: "10 reps each side", freq: "Twice daily", rationale: "Preserves ribcage and thoracic rotational excursion" },
                { name: "Doorway Chest Opener", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Prevents anterior chest collapse and maintains chest expansion" },
                { name: "Deep Belly Breathing", sets: "10 breaths", freq: "3 times daily", rationale: "Maintains vital lung capacity and costovertebral joint mobility" },
                { name: "Wall Angels", sets: "3 sets × 10 reps", freq: "Daily", rationale: "Scapulothoracic extension and posture preservation" }
            ]
        },
        {
            id: "thoracic_outlet_syndrome",
            title: "Thoracic Outlet Syndrome (TOS) & Neurovascular Release",
            region: "Cervical & Upper Back",
            category: "Nerve Glides & Headaches",
            keywords: [
                "thoracic outlet syndrome", "tos", "scalene syndrome", "cervicothoracic pain",
                "thoracic outlet", "brachial compression", "neurovascular compression", "cervical rib"
            ],
            exercises: [
                { name: "Scalene Stretch", sets: "3 reps × 30s hold", freq: "Twice daily", rationale: "Decompresses the interscalene triangle housing brachial plexus" },
                { name: "Doorway Chest Stretch", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Releases pectoralis minor space compression" },
                { name: "Scapular Squeezes (Downward)", sets: "3 sets × 12 reps", freq: "3 times daily", rationale: "Activates lower trapezius to elevate clavicle off first rib" },
                { name: "Brugger’s Relief Position", sets: "3 deep breaths", freq: "Hourly", rationale: "Restores postural upright alignment to widen thoracic outlet" },
                { name: "Serratus Wall Slides", sets: "2 sets × 12 reps", freq: "Daily", rationale: "Promotes upward rotation of scapula during arm elevation" },
                { name: "Median Nerve Slider", sets: "2 sets × 12 reps", freq: "Twice daily", rationale: "Gentle neural flossing through the thoracic and arm pathways" }
            ]
        },
        {
            id: "whiplash_disorder",
            title: "Whiplash Associated Disorder (WAD) & Neck Sprain",
            region: "Cervical & Upper Back",
            category: "Deep Neck Flexor (DNF) & Stability",
            keywords: [
                "whiplash", "wad", "whiplash injury", "cervical acceleration", "car accident neck",
                "acute neck strain", "cervical sprain", "neck sprain"
            ],
            exercises: [
                { name: "Supine Chin Tuck (The Nod)", sets: "3 sets × 10 reps (gentle)", freq: "Twice daily", rationale: "Re-recruits injured deep cervical flexors without superficial spasm" },
                { name: "DNF Endurance (Towel Roll)", sets: "Hold 15-30s", freq: "Twice daily", rationale: "Restores cervical lordotic curve support" },
                { name: "Passive Neck Rotation (Lying Down)", sets: "10 reps each side", freq: "3 times daily", rationale: "Gentle non-provocative movement to prevent muscle splinting" },
                { name: "Shoulder Rolls (Backward)", sets: "15 slow circles", freq: "3 times daily", rationale: "Relieves reflexive upper trapezius and levator muscle guarding" },
                { name: "Upper Trap Stretch (Active)", sets: "3 reps × 20s", freq: "Twice daily", rationale: "Lengthens spasm-prone neck-shoulder bridge" }
            ]
        },
        {
            id: "osteoporosis_spine",
            title: "Osteoporosis & Spine-Sparing Extensor Protocol",
            region: "Thoracic Spine & Posture",
            category: "2. Posture & Shoulder Blade Strength (Anti-Hunch)",
            keywords: [
                "osteoporosis", "osteopenia", "bone density", "low bone density", "compression fracture",
                "frail bone", "dowager's hump"
            ],
            exercises: [
                { name: "Prone Cobra (Cervical Focus)", sets: "2 sets × 8 reps (3s hold)", freq: "Daily", rationale: "Spine-sparing extensor strength without flexion risk" },
                { name: "Scapular Squeezes", sets: "3 sets × 12 reps", freq: "3 times daily", rationale: "Strengthens thoracic extensors to prevent wedge compression" },
                { name: "Wall Angels", sets: "2 sets × 10 reps", freq: "Daily", rationale: "Postural alignment against gravity" },
                { name: "Doorway Chest Opener", sets: "3 reps × 20s", freq: "Twice daily", rationale: "Anterior chest expansion preventing rounded posture" }
            ]
        },

        /* ------------------ SHOULDER REHABILITATION ------------------ */
        {
            id: "frozen_shoulder",
            title: "Frozen Shoulder / Adhesive Capsulitis Protocol",
            region: "Shoulder Rehabilitation",
            category: "1. Early Mobility (Stiff / Frozen Shoulder)",
            keywords: [
                "adhesive capsulitis", "frozen shoulder", "shoulder stiffness", "periarthritis shoulder",
                "pas", "capsulitis", "stiff shoulder", "limited shoulder rom"
            ],
            exercises: [
                { name: "Arm Pendulum (Circles)", sets: "2 mins clockwise & counter", freq: "3 times daily", rationale: "Codman's distraction to lubricate glenohumeral joint" },
                { name: "Stick Rotation (Outward)", sets: "2 sets × 10 reps (5s hold)", freq: "Twice daily", rationale: "Restores external rotation (primary capsular deficit)" },
                { name: "Forward Wall Crawl", sets: "10 climbs forward", freq: "Twice daily", rationale: "Active-assisted overhead flexion progression" },
                { name: "Table Slide (Forward)", sets: "2 sets × 12 reps", freq: "Twice daily", rationale: "Low-friction shoulder elevation without impingement" },
                { name: "Towel Pull (Up Back)", sets: "3 reps × 30s hold", freq: "Twice daily", rationale: "Restores internal rotation and behind-the-back reach" },
                { name: "Across the Chest Stretch", sets: "3 reps × 30s hold", freq: "Twice daily", rationale: "Stretches tight posterior capsule" }
            ]
        },
        {
            id: "rotator_cuff_impingement",
            title: "Rotator Cuff & Shoulder Impingement Protocol",
            region: "Shoulder Rehabilitation",
            category: "4. Rotator Cuff & Strength (Bands/Weights)",
            keywords: [
                "rotator cuff", "rotator cuff injury", "rotator cuff tendinopathy", "rotator cuff tear",
                "supraspinatus", "supraspinatus tendinitis", "shoulder impingement", "shoulder impingement syndrome",
                "subacromial bursitis", "subacromial impingement", "shoulder tendinitis", "infraspinatus"
            ],
            exercises: [
                { name: "Band Pull (Outward)", sets: "3 sets × 12 reps", freq: "Daily", rationale: "Strengthens infraspinatus & teres minor to depress humeral head" },
                { name: "Band Pull (Inward)", sets: "3 sets × 12 reps", freq: "Daily", rationale: "Subscapularis strengthening for anterior cuff balance" },
                { name: "Forearm Wall Slides", sets: "3 sets × 10 reps", freq: "Daily", rationale: "Serratus anterior activation for scapular upward rotation" },
                { name: "Prone 'Y' Lift", sets: "2 sets × 10 reps", freq: "Daily", rationale: "Lower trapezius recruitment to clear subacromial space" },
                { name: "Prone 'T' Lift", sets: "2 sets × 12 reps", freq: "Daily", rationale: "Mid-trapezius and rhomboid scapular stabilizer control" },
                { name: "Wall Push-Up", sets: "2 sets × 12 reps", freq: "Daily", rationale: "Closed-chain scapular protraction stability" }
            ]
        },
        {
            id: "shoulder_instability",
            title: "Shoulder Instability & Dislocation Rehab",
            region: "Shoulder Rehabilitation",
            category: "3. Isometric Strengthening (No Movement)",
            keywords: [
                "shoulder instability", "shoulder dislocation", "shoulder subluxation", "labral tear",
                "bankart", "slap lesion", "slap tear", "hypermobile shoulder"
            ],
            exercises: [
                { name: "Doorway Push (Outward)", sets: "3 sets × 10 reps (5s hold)", freq: "Twice daily", rationale: "Isometric posterior dynamic stabilization" },
                { name: "Doorway Push (Inward)", sets: "3 sets × 10 reps (5s hold)", freq: "Twice daily", rationale: "Isometric anterior dynamic restraint" },
                { name: "Corner Blade Squeeze", sets: "3 sets × 15 reps", freq: "Twice daily", rationale: "Scapulothoracic anchoring for glenohumeral stability" },
                { name: "Side-Lying External Rotation", sets: "3 sets × 10 reps", freq: "Daily", rationale: "Posterior cuff hypertrophy for dynamic containment" },
                { name: "Forearm Wall Slides", sets: "2 sets × 10 reps", freq: "Daily", rationale: "Controlled upward rotation without translation" }
            ]
        },
        {
            id: "shoulder_ac_joint_ligament",
            title: "Shoulder AC Joint Sprain & Ligament Injury Protocol",
            region: "Shoulder Rehabilitation",
            category: "1. Early Mobility (Stiff / Frozen Shoulder)",
            keywords: [
                "ac joint sprain", "ac joint", "acromioclavicular", "shoulder separation",
                "acromioclavicular sprain", "shoulder ligament", "coracoclavicular", "shoulder sprain",
                "shoulder ligament injury", "shoulder ligament tear"
            ],
            exercises: [
                { name: "Arm Pendulum (Circles)", sets: "20 circles each way", freq: "3 times daily", rationale: "Gentle gravity-assisted joint decompression" },
                { name: "Doorway Push (Outward)", sets: "2 sets × 10 reps (5s hold)", freq: "Twice daily", rationale: "Strengthens posterior stabilizers without AC cross-body compression" },
                { name: "Corner Blade Squeeze", sets: "3 sets × 12 reps", freq: "Twice daily", rationale: "Positions scapula in retraction to offload AC joint" },
                { name: "Stick Lift (Forward)", sets: "2 sets × 10 reps", freq: "Daily", rationale: "Assisted forward flexion to maintain pain-free mobility" },
                { name: "Forearm Wall Slides", sets: "2 sets × 10 reps", freq: "Daily", rationale: "Upward scapular rotation support" }
            ]
        },
        {
            id: "biceps_tendinopathy",
            title: "Biceps Tendinopathy & Anterior Shoulder Pain",
            region: "Shoulder Rehabilitation",
            category: "1. Early Mobility (Stiff / Frozen Shoulder)",
            keywords: [
                "biceps tendinopathy", "biceps tendonitis", "bicipital tendinitis", "long head of biceps",
                "anterior shoulder pain", "biceps groove", "biceps tendon"
            ],
            exercises: [
                { name: "Arm Pendulum (Circles)", sets: "20 circles each way", freq: "3 times daily", rationale: "Gentle glenohumeral clearance without biceps tendon traction" },
                { name: "Forward Wall Crawl", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Active-assisted flexion within pain-free threshold" },
                { name: "Stick Lift (Forward)", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Assisted elevation reducing active long head biceps strain" },
                { name: "Corner Blade Squeeze", sets: "3 sets × 12 reps", freq: "3 times daily", rationale: "Restores posterior scapular tilt to relieve bicipital groove pinching" },
                { name: "Doorway Lean", sets: "3 reps × 20s", freq: "Twice daily", rationale: "Gentle anterior shoulder stretch" }
            ]
        },

        /* ------------------ KNEE REHABILITATION ------------------ */
        {
            id: "knee_osteoarthritis",
            title: "Knee Osteoarthritis (OA Knee) & Joint Degeneration",
            region: "Knee Rehabilitation",
            category: "Early Mobility & Arthritis Relief",
            keywords: [
                "knee osteoarthritis", "knee oa", "osteoarthritis knee", "knee arthritis", "knee degeneration",
                "degenerative knee", "knee joint stiffness", "crepitus knee", "stiff knee", "knee pain"
            ],
            exercises: [
                { name: "Thigh Squeezes", sets: "3 sets × 10 reps (10s hold)", freq: "Twice daily", rationale: "Isometric quadriceps activation without patellofemoral friction" },
                { name: "Straight Leg Lifts", sets: "3 sets × 10 reps", freq: "Twice daily", rationale: "Non-weight-bearing rectus femoris strengthening" },
                { name: "Knee Straightener (Short Arc)", sets: "3 sets × 12 reps", freq: "Twice daily", rationale: "Vastomedialis obliquus (VMO) terminal extension" },
                { name: "Heel Slides", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Joint lubrication and gentle synovial circulation" },
                { name: "Chair Squats (Sit to Stand)", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Functional closed-chain quadriceps and glute strength" },
                { name: "Seated Leg Straightening", sets: "3 sets × 12 reps", freq: "Twice daily", rationale: "Active open-chain knee extension endurance" }
            ]
        },
        {
            id: "acl_rehabilitation",
            title: "ACL Injury & Reconstruction Rehabilitation",
            region: "Knee Rehabilitation",
            category: "Advanced Strength (ACL & Meniscus Recovery)",
            keywords: [
                "acl injury", "acl reconstruction", "acl tear", "anterior cruciate ligament",
                "acl rehab", "post acl surgery", "cruciate ligament"
            ],
            exercises: [
                { name: "Thigh Squeezes", sets: "3 sets × 15 reps", freq: "3 times daily", rationale: "Reversing arthrogenic quadriceps inhibition post-injury" },
                { name: "Heel Slides", sets: "3 sets × 10 reps", freq: "3 times daily", rationale: "Achieving full symmetrical knee flexion range" },
                { name: "Terminal Knee Extension (Band)", sets: "3 sets × 15 reps", freq: "Daily", rationale: "Restores active terminal extension without graft strain" },
                { name: "Single Leg Stance", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Proprioception and neuromuscular joint control" },
                { name: "Forward Step-Ups", sets: "2 sets × 10 reps", freq: "Daily", rationale: "Controlled eccentric and concentric quad loading" },
                { name: "Glute Bridges", sets: "3 sets × 12 reps", freq: "Twice daily", rationale: "Hamstring and gluteal synergy to assist ACL restraint" }
            ]
        },
        {
            id: "meniscus_injury",
            title: "Meniscus Tear & Post-Meniscectomy Protocol",
            region: "Knee Rehabilitation",
            category: "Advanced Strength (ACL & Meniscus Recovery)",
            keywords: [
                "meniscus injury", "meniscus tear", "meniscal tear", "meniscectomy", "medial meniscus",
                "lateral meniscus", "knee locking", "knee click"
            ],
            exercises: [
                { name: "Straight Leg Lifts", sets: "3 sets × 10 reps", freq: "Twice daily", rationale: "Low-shear quadriceps strengthening" },
                { name: "Heel Slides", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Maintains flexion within pain-free non-weight-bearing zone" },
                { name: "Wall Squats", sets: "2 sets × 8 reps (shallow)", freq: "Daily", rationale: "Closed-chain compression without meniscal pinching" },
                { name: "Hamstring Stretch (Towel)", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Decompresses posterior knee compartment" },
                { name: "Clamshells", sets: "3 sets × 12 reps", freq: "Daily", rationale: "Hip abductor control to reduce knee valgus stress" }
            ]
        },
        {
            id: "runners_knee_pfps",
            title: "Runner's Knee & Patellofemoral Pain Syndrome (PFPS)",
            region: "Knee Rehabilitation",
            category: "Flexibility & Kneecap Control",
            keywords: [
                "runners knee", "runner's knee", "runners nknee", "runner nknee", "runner knee",
                "patellofemoral pain syndrome", "pfps", "chondromalacia patellae", "chondromalacia",
                "anterior knee pain", "retropatellar pain", "kneecap pain", "knee tracking",
                "patellofemoral", "runners pain", "patellofemoral joint"
            ],
            exercises: [
                { name: "VMO Ball Squeeze", sets: "3 sets × 12 reps", freq: "Twice daily", rationale: "Targeted VMO recruitment for proper medial patellar tracking" },
                { name: "Straight Leg Lifts", sets: "3 sets × 12 reps", freq: "Twice daily", rationale: "Strengthens quads without patellofemoral joint compression" },
                { name: "Wall Squats", sets: "2 sets × 10 reps (shallow)", freq: "Daily", rationale: "Closed-chain eccentric quad loading within pain-free angles" },
                { name: "Clamshells", sets: "3 sets × 15 reps", freq: "Twice daily", rationale: "Gluteus medius strengthening to eliminate dynamic knee valgus" },
                { name: "Terminal Knee Extension (Band)", sets: "3 sets × 15 reps", freq: "Daily", rationale: "End-range quad control and active knee extension" },
                { name: "IT Band Stretch", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Relieves tight lateral retinacular structures that pull the kneecap" },
                { name: "Standing Quad Stretch", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Lengthens rectus femoris to decrease patellar compressive load" },
                { name: "Mini Squats", sets: "2 sets × 12 reps", freq: "Daily", rationale: "Functional lower extremity alignment training" },
                { name: "Single Leg Bridge", sets: "2 sets × 10 reps", freq: "Daily", rationale: "Posterior chain recruitment and pelvic stability" }
            ]
        },
        {
            id: "it_band_friction",
            title: "IT Band Syndrome (ITBFS) & Lateral Knee Pain",
            region: "Knee Rehabilitation",
            category: "Flexibility & Kneecap Control",
            keywords: [
                "it band syndrome", "it band", "itb syndrome", "iliotibial band syndrome", "it band friction",
                "itbfs", "lateral knee pain", "outer knee pain", "runner's lateral knee", "iliotibial band",
                "itb friction", "iliotibial tract"
            ],
            exercises: [
                { name: "IT Band Stretch", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Relieves fascial tightness along the lateral tensor-ITB tract" },
                { name: "Clamshells", sets: "3 sets × 15 reps", freq: "Twice daily", rationale: "Addresses underlying gluteus medius weakness causing ITB overload" },
                { name: "Side Leg Lifts", sets: "3 sets × 12 reps", freq: "Daily", rationale: "Isolates hip abductors to correct pelvis drop during running" },
                { name: "Lateral Band Walks", sets: "2 sets × 10 steps each side", freq: "Daily", rationale: "Dynamic abductor loading and pelvic horizontal stability" },
                { name: "Monster Walks (Band)", sets: "2 sets × 15 steps", freq: "Daily", rationale: "Gluteal endurance for multi-planar running mechanics" },
                { name: "Glute Bridges", sets: "3 sets × 12 reps", freq: "Twice daily", rationale: "Gluteus maximus activation to assist lateral hip stability" },
                { name: "Single Leg Stance", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Single leg proprioception to stabilize dynamic knee valgus" }
            ]
        },
        {
            id: "patellar_tendinopathy",
            title: "Patellar Tendinopathy (Jumper's Knee)",
            region: "Knee Rehabilitation",
            category: "Flexibility & Kneecap Control",
            keywords: [
                "patellar tendinopathy", "jumper's knee", "jumpers knee", "jumper knee",
                "patellar tendon", "patellar tendinitis", "patellar tendonitis", "infrapatellar pain",
                "quadriceps tendinopathy", "patellar apex pain"
            ],
            exercises: [
                { name: "Knee Isometrics (Seated)", sets: "4 sets × 30s hold", freq: "Twice daily", rationale: "Isometric quadriceps loading for immediate tendon analgesia" },
                { name: "Wall Squats", sets: "3 sets × 10 reps (isometric hold)", freq: "Twice daily", rationale: "Controlled closed kinetic chain tendon remodeling" },
                { name: "Step Downs (Slow)", sets: "3 sets × 10 reps (slow eccentric)", freq: "Daily", rationale: "Eccentric decline loading to stimulate collagen synthesis" },
                { name: "Straight Leg Lifts", sets: "3 sets × 12 reps", freq: "Daily", rationale: "Rectus femoris strengthening without excessive tendon shear" },
                { name: "Calf Raises", sets: "3 sets × 15 reps", freq: "Daily", rationale: "Triceps surae shock-absorption support during jumping/running" },
                { name: "Standing Quad Stretch", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Reduces baseline passive resting tension on patellar tendon" },
                { name: "Forward Step-Ups", sets: "2 sets × 12 reps", freq: "Daily", rationale: "Functional quad loading through concentric range" }
            ]
        },
        {
            id: "knee_ligament_injury",
            title: "Knee Ligament Injury & Joint Instability Protocol",
            region: "Knee Rehabilitation",
            category: "Advanced Strength (ACL & Meniscus Recovery)",
            keywords: [
                "ligament injury", "knee ligament injury", "knee ligament", "ligament tear",
                "knee ligament tear", "ligament sprain", "knee sprain", "knee instability",
                "twisted knee", "joint laxity knee", "collateral ligament", "cruciate ligament",
                "ligament damage", "ligament", "sprained knee", "knee laxity"
            ],
            exercises: [
                { name: "Thigh Squeezes", sets: "3 sets × 15 reps", freq: "3 times daily", rationale: "Overcomes arthrogenic quad inhibition to protect unstable knee" },
                { name: "Straight Leg Lifts", sets: "3 sets × 12 reps", freq: "Twice daily", rationale: "Non-rotational quadriceps strengthening" },
                { name: "Terminal Knee Extension (Band)", sets: "3 sets × 15 reps", freq: "Daily", rationale: "Trains active neuromuscular terminal extension locking" },
                { name: "Heel Slides", sets: "3 sets × 10 reps", freq: "3 times daily", rationale: "Restores controlled flexion within ligament-safe range" },
                { name: "Single Leg Stance", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Proprioceptive mechanoreceptor activation for dynamic joint stability" },
                { name: "Glute Bridges", sets: "3 sets × 12 reps", freq: "Twice daily", rationale: "Hamstring-glute co-contraction to stabilize knee joint translation" },
                { name: "Forward Step-Ups", sets: "2 sets × 10 reps", freq: "Daily", rationale: "Functional concentric and eccentric quadriceps loading" },
                { name: "Pillow Squeezes", sets: "3 sets × 12 reps", freq: "Twice daily", rationale: "Adductor co-activation for medial joint stability" }
            ]
        },
        {
            id: "mcl_injury",
            title: "MCL (Medial Collateral Ligament) Sprain & Inner Knee Rehab",
            region: "Knee Rehabilitation",
            category: "Early Mobility & Arthritis Relief",
            keywords: [
                "mcl injury", "mcl tear", "mcl sprain", "medial collateral ligament", "mcl",
                "inner knee ligament", "medial knee sprain", "valgus knee sprain", "inner knee pain"
            ],
            exercises: [
                { name: "Thigh Squeezes", sets: "3 sets × 15 reps (5s hold)", freq: "3 times daily", rationale: "Restores active vastus medialis obliquus (VMO) protection" },
                { name: "Straight Leg Lifts", sets: "3 sets × 12 reps", freq: "Twice daily", rationale: "Strengthens knee extensors without lateral/medial torque" },
                { name: "Pillow Squeezes", sets: "3 sets × 12 reps (gentle)", freq: "Twice daily", rationale: "Adductor-VMO stabilization supporting medial joint capsule" },
                { name: "Heel Slides", sets: "3 sets × 10 reps", freq: "Twice daily", rationale: "Sagittal plane range of motion without valgus stress" },
                { name: "Terminal Knee Extension (Band)", sets: "3 sets × 12 reps", freq: "Daily", rationale: "Strengthens terminal extension locking mechanism" },
                { name: "Mini Squats", sets: "2 sets × 10 reps", freq: "Daily", rationale: "Axial compression loading promoting MCL ligamentous remodeling" },
                { name: "Single Leg Stance", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Neuromuscular joint position sense to prevent valgus collapse" }
            ]
        },
        {
            id: "lcl_injury",
            title: "LCL (Lateral Collateral Ligament) Sprain & Outer Knee Rehab",
            region: "Knee Rehabilitation",
            category: "Early Mobility & Arthritis Relief",
            keywords: [
                "lcl injury", "lcl tear", "lcl sprain", "lateral collateral ligament", "lcl",
                "outer knee ligament", "lateral knee sprain", "varus knee sprain"
            ],
            exercises: [
                { name: "Thigh Squeezes", sets: "3 sets × 15 reps", freq: "3 times daily", rationale: "Quadriceps tone to resist varus hyperextension moments" },
                { name: "Straight Leg Lifts", sets: "3 sets × 12 reps", freq: "Twice daily", rationale: "Safe non-weight-bearing knee extension endurance" },
                { name: "Side Leg Lifts", sets: "3 sets × 10 reps", freq: "Daily", rationale: "Strengthens hip abductors for lateral pelvic stability" },
                { name: "Heel Slides", sets: "3 sets × 10 reps", freq: "Twice daily", rationale: "Restores pain-free flexion in neutral sagittal plane" },
                { name: "Terminal Knee Extension (Band)", sets: "3 sets × 12 reps", freq: "Daily", rationale: "Eliminates terminal extension lag" },
                { name: "Single Leg Stance", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Dynamic balance and coronal stability control" }
            ]
        },
        {
            id: "pcl_injury",
            title: "PCL (Posterior Cruciate Ligament) Sprain Protocol",
            region: "Knee Rehabilitation",
            category: "Early Mobility & Arthritis Relief",
            keywords: [
                "pcl injury", "pcl tear", "pcl sprain", "posterior cruciate ligament", "pcl",
                "posterior knee instability", "dashboard injury knee"
            ],
            exercises: [
                { name: "Thigh Squeezes", sets: "3 sets × 15 reps", freq: "3 times daily", rationale: "Quadriceps activation (the primary active restraint against posterior tibial sag)" },
                { name: "Straight Leg Lifts", sets: "3 sets × 12 reps", freq: "Twice daily", rationale: "Closed quad firing to reduce posterior translational stress" },
                { name: "Knee Straightener (Short Arc)", sets: "3 sets × 12 reps", freq: "Twice daily", rationale: "Quadriceps dominance from 30° to 0° to oppose posterior sag" },
                { name: "Terminal Knee Extension (Band)", sets: "3 sets × 15 reps", freq: "Daily", rationale: "Active anterior tibial translation via quadriceps vector" },
                { name: "Mini Squats", sets: "2 sets × 10 reps (0-45°)", freq: "Daily", rationale: "Safe functional quadriceps loading within shallow angles" },
                { name: "Calf Raises", sets: "3 sets × 15 reps", freq: "Daily", rationale: "Gastrocnemius and soleus stability" }
            ]
        },
        {
            id: "total_knee_replacement",
            title: "Total Knee Replacement (TKR / Arthroplasty) Protocol",
            region: "Knee Rehabilitation",
            category: "Early Mobility & Arthritis Relief",
            keywords: [
                "total knee replacement", "tkr", "knee replacement", "knee arthroplasty",
                "post tkr", "bilateral tkr", "knee prosthesis", "unicompartmental knee"
            ],
            exercises: [
                { name: "Heel Slides", sets: "3 sets × 10 reps", freq: "3 times daily", rationale: "Restores active-assisted knee flexion to 90°-110°" },
                { name: "Thigh Squeezes", sets: "3 sets × 15 reps (5s hold)", freq: "3 times daily", rationale: "Crucial for regaining voluntary quad control and eliminating extensor lag" },
                { name: "Passive Extension (Propped Heel)", sets: "3-5 minutes", freq: "3 times daily", rationale: "Gravity-assisted full knee extension (prevents flexion contracture)" },
                { name: "Knee Straightener (Short Arc)", sets: "3 sets × 12 reps", freq: "Twice daily", rationale: "Terminal VMO quadriceps strength over towel roll" },
                { name: "Seated Knee Bends", sets: "3 sets × 10 reps", freq: "3 times daily", rationale: "Chair-supported active knee flexion range" },
                { name: "Straight Leg Lifts", sets: "3 sets × 10 reps", freq: "Twice daily", rationale: "Tests and strengthens full active knee locking" },
                { name: "Chair Squats (Sit to Stand)", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Functional weight-bearing transfer and sit-to-stand power" },
                { name: "Ankle Pumps", sets: "30 reps", freq: "Hourly", rationale: "DVT prevention and lower limb circulatory pumping" }
            ]
        },

        /* ------------------ ANKLE & FOOT ------------------ */
        {
            id: "plantar_fasciitis",
            title: "Plantar Fasciitis & Calcaneal Spur Protocol",
            region: "Ankle & Foot",
            category: "Plantar Fasciitis & Heel Pain",
            keywords: [
                "plantar fasciitis", "heel pain", "calcaneal spur", "heel spur", "morning heel pain",
                "plantar fascia", "inferior heel pain", "arch pain"
            ],
            exercises: [
                { name: "Frozen Bottle Roll", sets: "5-10 minutes", freq: "Twice daily", rationale: "Plantar fascia cryo-massage for acute inflammation and pain" },
                { name: "Tennis Ball Arch Roll", sets: "3 minutes each foot", freq: "Twice daily", rationale: "Myofascial plantar arch mobilization" },
                { name: "Toe Towel Curls", sets: "3 sets × 15 curls", freq: "Twice daily", rationale: "Intrinsic foot flexor muscle strengthening" },
                { name: "Manual Toe Stretch", sets: "3 reps × 30s hold", freq: "Before rising from bed", rationale: "Windlass mechanism stretching to prevent first-step pain" },
                { name: "Wall Calf Stretch (Straight Leg)", sets: "3 reps × 30s hold", freq: "Twice daily", rationale: "Gastrocnemius lengthening to reduce Achilles-plantar tension" },
                { name: "Standing Calf Raises", sets: "3 sets × 10 reps", freq: "Daily", rationale: "High-load strength training for plantar fascia remodeling" }
            ]
        },
        {
            id: "ankle_sprain",
            title: "Ankle Sprain & Ligament Recovery Protocol",
            region: "Ankle & Foot",
            category: "Early Mobility & Sprain Recovery",
            keywords: [
                "ankle sprain", "sprained ankle", "ankle instability", "atfl", "cfl",
                "lateral ankle ligament", "twisted ankle", "ankle swelling", "chronic ankle instability",
                "ankle ligament injury", "ankle ligament", "ankle ligament sprain", "ankle ligament tear",
                "inversion ankle sprain", "atfl tear", "cfl tear", "high ankle sprain", "syndesmosis"
            ],
            exercises: [
                { name: "Ankle Alphabet", sets: "A through Z twice", freq: "3 times daily", rationale: "Multi-planar active range of motion without weight bearing" },
                { name: "Ankle Pumps", sets: "30 reps", freq: "Hourly", rationale: "Lymphatic pump to clear swelling and edema" },
                { name: "Band Pull-Outs (Eversion)", sets: "3 sets × 12 reps", freq: "Daily", rationale: "Peroneal muscle strengthening to prevent inversion re-injury" },
                { name: "Single Leg Stance", sets: "3 reps × 30s hold", freq: "Twice daily", rationale: "Proprioceptive mechanoreceptor retraining" },
                { name: "Tandem Stance (Heel-to-Toe)", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Static balance and postural perturbation control" },
                { name: "Standing Calf Raises", sets: "3 sets × 12 reps", freq: "Daily", rationale: "Triceps surae strengthening for propulsion" }
            ]
        },
        {
            id: "achilles_tendinopathy",
            title: "Achilles Tendinopathy Protocol (Alfredson)",
            region: "Ankle & Foot",
            category: "Ankle Strengthening (Bands & Weights)",
            keywords: [
                "achilles tendinopathy", "achilles tendinitis", "achilles tendon", "retrocalcaneal bursitis",
                "achilles pain", "achilles heel"
            ],
            exercises: [
                { name: "Standing Calf Raises", sets: "3 sets × 15 reps (slow eccentric)", freq: "Twice daily", rationale: "Evidence-based eccentric tendon remodeling" },
                { name: "Wall Calf Stretch (Straight Leg)", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Gastrocnemius flexibility" },
                { name: "Calf Stretch (Bent Knee)", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Soleus isolation stretch" },
                { name: "Band Push-Downs (Plantarflexion)", sets: "3 sets × 12 reps", freq: "Daily", rationale: "Controlled concentric-eccentric tendon loading" },
                { name: "Single Leg Stance", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Proprioceptive ankle stabilization" }
            ]
        },
        {
            id: "shin_splints",
            title: "Shin Splints (MTSS) & Lower Leg Stress Protocol",
            region: "Ankle & Foot",
            category: "Ankle Strengthening (Bands & Weights)",
            keywords: [
                "shin splints", "shin splint", "mtss", "medial tibial stress syndrome",
                "shin pain", "tibial stress", "anterior shin pain", "tibialis anterior",
                "tibialis posterior", "tibial periostitis"
            ],
            exercises: [
                { name: "Band Pull-Ups (Dorsiflexion)", sets: "3 sets × 15 reps", freq: "Daily", rationale: "Tibialis anterior endurance and eccentric foot-slap control" },
                { name: "Standing Calf Raises", sets: "3 sets × 15 reps", freq: "Daily", rationale: "Triceps surae strengthening to attenuate tibial impact shocks" },
                { name: "Bent Knee Calf Raises", sets: "3 sets × 15 reps", freq: "Daily", rationale: "Soleus isolation strengthening (primary shock absorber in running)" },
                { name: "Towel Foot Stretch", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Relieves posterior compartment tension on medial tibial border" },
                { name: "Toe Towel Curls", sets: "3 sets × 15 reps", freq: "Twice daily", rationale: "Strengthens flexor digitorum longus & tibialis posterior" },
                { name: "Single Leg Stance", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Pronation control and medial arch stabilization" }
            ]
        },

        /* ------------------ ELBOW, WRIST & HAND ------------------ */
        {
            id: "tennis_elbow",
            title: "Tennis Elbow (Lateral Epicondylitis) Protocol",
            region: "Elbow, Wrist & Hand",
            category: "1. Tennis Elbow (Outer Elbow Pain)",
            keywords: [
                "tennis elbow", "lateral epicondylitis", "outer elbow pain", "lateral epicondylalgia",
                "extensor carpi radialis brevis", "ecrb", "forearm strain"
            ],
            exercises: [
                { name: "The 'Slow Lowering' (Eccentric)", sets: "3 sets × 15 reps", freq: "Daily", rationale: "Eccentric wrist extensor loading (Tyler twist equivalent)" },
                { name: "Wrist Extensor Strengthening", sets: "3 sets × 12 reps", freq: "Daily", rationale: "Strengthens common extensor origin" },
                { name: "Wrist Stretch (Palm Down)", sets: "3 reps × 30s hold", freq: "Twice daily", rationale: "Lengthens hypertonic wrist and finger extensors" },
                { name: "Hammer Rotations", sets: "2 sets × 10 reps", freq: "Daily", rationale: "Supinator/pronator rotational endurance" },
                { name: "Fist Squeeze", sets: "2 sets × 15 reps", freq: "Daily", rationale: "Functional grip strength" }
            ]
        },
        {
            id: "golfers_elbow",
            title: "Golfer's Elbow (Medial Epicondylitis) Protocol",
            region: "Elbow, Wrist & Hand",
            category: "2. Golfer's Elbow (Inner Elbow Pain)",
            keywords: [
                "golfer's elbow", "medial epicondylitis", "inner elbow pain", "flexor tendon elbow",
                "pronator teres syndrome"
            ],
            exercises: [
                { name: "Wrist Flexion (Palm Up)", sets: "3 sets × 12 reps", freq: "Daily", rationale: "Concentric-eccentric common flexor loading" },
                { name: "Wrist Stretch (Palm Up)", sets: "3 reps × 30s hold", freq: "Twice daily", rationale: "Stretches tight forearm flexors and pronators" },
                { name: "Squeeze a Ball", sets: "2 sets × 15 reps", freq: "Daily", rationale: "Controlled grip rehabilitation" },
                { name: "Reverse Towel Wring", sets: "2 sets × 10 twists", freq: "Daily", rationale: "Functional wrist flexion and pronation control" }
            ]
        },
        {
            id: "carpal_tunnel_syndrome",
            title: "Carpal Tunnel Syndrome & Median Nerve Health",
            region: "Elbow, Wrist & Hand",
            category: "3. Carpal Tunnel & Nerve Health (Numbness)",
            keywords: [
                "carpal tunnel syndrome", "carpal tunnel", "cts", "median nerve", "hand numbness",
                "tingling fingers", "wrist pain", "repetitive strain injury", "rsi wrist"
            ],
            exercises: [
                { name: "Median Nerve Glides (5 Steps)", sets: "2 sets × 15 reps", freq: "Twice daily", rationale: "Glides median nerve through the transverse carpal ligament" },
                { name: "Tendon Glides (The Hook)", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Differential gliding of FDS and FDP flexor tendons" },
                { name: "Tendon Glides (The Tabletop)", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Lumbrical excursion to prevent tunnel adhesions" },
                { name: "Prayer Stretch", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Gentle carpal tunnel and flexor stretch" },
                { name: "Reverse Prayer Stretch", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Wrist extensor and dorsal retinaculum release" }
            ]
        },
        {
            id: "de_quervains",
            title: "De Quervain's Tenosynovitis & Thumb Pain",
            region: "Elbow, Wrist & Hand",
            category: "5. Thumb Pain (De Quervain’s / Texting Thumb)",
            keywords: [
                "de quervain", "de quervain's tenosynovitis", "tenosynovitis", "thumb pain",
                "radial styloid pain", "texting thumb", "gamer thumb", "abductor pollicis longus"
            ],
            exercises: [
                { name: "Thumb Opposition", sets: "2 sets × 15 reps", freq: "Twice daily", rationale: "Gentle non-shearing thumb mobility" },
                { name: "Rubber Band Thumb Lift", sets: "3 sets × 12 reps", freq: "Daily", rationale: "Strengthens thumb abductor & extensor endurance" },
                { name: "Thumb Tuck Stretch", sets: "3 reps × 20s", freq: "Twice daily", rationale: "Gentle first extensor compartment mobilization" },
                { name: "Wrist Side-to-Side (Wiper)", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Radial-ulnar deviation active range of motion" }
            ]
        },
        {
            id: "wrist_ligament_sprain",
            title: "Wrist Ligament Sprain & TFCC Stability Protocol",
            region: "Elbow, Wrist & Hand",
            category: "4. Wrist Pain & Sprains",
            keywords: [
                "wrist sprain", "wrist ligament", "tfcc", "triangular fibrocartilage", "wrist instability",
                "carpal ligament", "sprained wrist", "wrist ligament tear", "wrist ligament injury",
                "wrist pain after fall", "foosh"
            ],
            exercises: [
                { name: "Prayer Stretch", sets: "3 reps × 20s", freq: "Twice daily", rationale: "Gentle flexor-carpal stretch within comfortable limits" },
                { name: "Reverse Prayer Stretch", sets: "3 reps × 20s", freq: "Twice daily", rationale: "Dorsal ligamentous alignment stretch" },
                { name: "Wrist Side-to-Side (Wiper)", sets: "2 sets × 15 reps", freq: "Twice daily", rationale: "Active radial-ulnar deviation mobilization" },
                { name: "Isometric Wrist Hold", sets: "3 sets × 20s hold", freq: "Twice daily", rationale: "Static co-contraction of forearm musculature to stabilize carpus" },
                { name: "Tendon Glides (Full Fist)", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Maintains flexor tendon excursion and prevents wrist adhesions" },
                { name: "Weight Bearing (Table)", sets: "2 sets × 10s (gentle)", freq: "Daily", rationale: "Progressive axial load tolerance training" }
            ]
        },

        /* ------------------ HIP REHABILITATION ------------------ */
        {
            id: "hip_osteoarthritis_bursitis",
            title: "Hip Osteoarthritis & Trochanteric Bursitis Protocol",
            region: "Hip Rehabilitation",
            category: "3. Strengthening (Glutes & Stability)",
            keywords: [
                "hip pain", "hip osteoarthritis", "hip oa", "trochanteric bursitis", "greater trochanteric pain",
                "hip bursitis", "gluteal tendinopathy", "hip stiffness", "groin pain hip"
            ],
            exercises: [
                { name: "Clamshells", sets: "3 sets × 12 reps", freq: "Twice daily", rationale: "Gluteus medius strengthening to stabilize pelvis" },
                { name: "Glute Bridge", sets: "3 sets × 12 reps (5s hold)", freq: "Twice daily", rationale: "Gluteus maximus activation for pain-free hip extension" },
                { name: "Side-Lying Leg Lift", sets: "3 sets × 10 reps", freq: "Daily", rationale: "Hip abductor endurance to resolve Trendelenburg gait" },
                { name: "Figure 4 Stretch", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Piriformis and deep external rotator flexibility" },
                { name: "Sit-to-Stand", sets: "2 sets × 10 reps", freq: "Daily", rationale: "Functional lower limb power and weight transfer" }
            ]
        },
        {
            id: "total_hip_replacement",
            title: "Total Hip Replacement (THR / Arthroplasty) Protocol",
            region: "Hip Rehabilitation",
            category: "1. Early Mobility (Post-Op & Acute Pain)",
            keywords: [
                "total hip replacement", "thr", "hip replacement", "hip arthroplasty",
                "post thr", "hip prosthesis", "hemiarthroplasty"
            ],
            exercises: [
                { name: "Heel Slides", sets: "3 sets × 10 reps", freq: "Twice daily", rationale: "Gentle sagittal plane hip-knee mobility" },
                { name: "Bed Side-Slides (Abduction)", sets: "3 sets × 10 reps", freq: "Twice daily", rationale: "Hip abductor recruitment in supine within safe precautions" },
                { name: "Glute Bridge", sets: "3 sets × 10 reps", freq: "Twice daily", rationale: "Gluteus maximus activation for pelvic stability" },
                { name: "Standing Hip Flexion", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Marching motion for standing balance and hip flexor tone" },
                { name: "Standing Side Leg Lift", sets: "2 sets × 10 reps", freq: "Daily", rationale: "Abductor strengthening to prevent Trendelenburg lurch" },
                { name: "Mini-Squats", sets: "2 sets × 10 reps", freq: "Daily", rationale: "Bilateral symmetrical weight-bearing transfer" },
                { name: "Backward Walking", sets: "2 minutes", freq: "Daily", rationale: "Promotes hip extension in gait" }
            ]
        },
        {
            id: "hamstring_quad_strain",
            title: "Hamstring & Quadriceps Muscle Strain Rehabilitation",
            region: "Hip Rehabilitation",
            category: "2. Bursitis & Flexibility Stretches",
            keywords: [
                "hamstring strain", "hamstring pull", "pulled hamstring", "hamstring tear",
                "quad strain", "quadriceps strain", "thigh muscle strain", "pulled muscle thigh",
                "thigh strain", "biceps femoris strain", "rectus femoris strain"
            ],
            exercises: [
                { name: "Hamstring Stretch (Towel)", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Restores muscle length without re-rupture tension" },
                { name: "Glute Bridges", sets: "3 sets × 12 reps", freq: "Twice daily", rationale: "Synergistic posterior chain activation to support healing hamstring" },
                { name: "Straight Leg Lifts", sets: "3 sets × 12 reps", freq: "Twice daily", rationale: "Controlled quadriceps activation" },
                { name: "Heel Slides", sets: "2 sets × 12 reps", freq: "Twice daily", rationale: "Active knee flexion range of motion" },
                { name: "Lying Quad Stretch", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Restores rectus femoris flexibility" },
                { name: "Single Leg Bridge", sets: "2 sets × 8 reps", freq: "Daily", rationale: "Advanced eccentric-isometric hamstring loading" }
            ]
        },

        /* ------------------ NEUROLOGY, BALANCE & GERIATRICS ------------------ */
        {
            id: "stroke_hemiplegia",
            title: "Stroke & Hemiplegia Neuro-Rehabilitation",
            region: "Neuro & Balance",
            category: "4. Stroke & Coordination (Weak Side Focus)",
            keywords: [
                "stroke", "cva", "hemiplegia", "hemiparesis", "cerebrovascular accident",
                "stroke rehabilitation", "weak side", "flaccidity", "spasticity post stroke"
            ],
            exercises: [
                { name: "Weak Side Weight Shift", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Re-educates hemiparetic stance and proprioception" },
                { name: "Clasped Arm Raises", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Bilateral upper extremity motor synergy" },
                { name: "Table Slides (Affected Side)", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Supported reaching and forward arm excursion" },
                { name: "Heel Taps (Sitting)", sets: "2 sets × 15 reps", freq: "Twice daily", rationale: "Recruits lower limb dorsiflexion and motor control" },
                { name: "Tandem Walking (Line Walk)", sets: "3 passes of 10 feet", freq: "Daily", rationale: "Dynamic balance and narrow base coordination" }
            ]
        },
        {
            id: "parkinsons_disease",
            title: "Parkinson's Disease (BIG Movement Protocol)",
            region: "Neuro & Balance",
            category: "3. Parkinson’s & Large Movement (BIG Style)",
            keywords: [
                "parkinson", "parkinson's disease", "parkinsonism", "tremor", "bradykinesia",
                "gait freezing", "shuffling gait", "rigidity"
            ],
            exercises: [
                { name: "The BIG Step Forward", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "LSVT-style training to overcome micro-stepping & freezing" },
                { name: "The BIG Step Sideways", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Expands lateral base of support and balance recovery" },
                { name: "The BIG Reach (Up and Down)", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Large-amplitude reaching to combat hypometria" },
                { name: "High-Knee Marching", sets: "2 minutes", freq: "Twice daily", rationale: "Encourages step clearance and rhythmic gait" },
                { name: "Sitting Big Twists", sets: "10 reps each side", freq: "Twice daily", rationale: "Axial trunk rotation to reduce torso rigidity" }
            ]
        },
        {
            id: "vertigo_balance_fall_risk",
            title: "Vestibular / Vertigo & Fall Prevention Protocol",
            region: "Neuro & Balance",
            category: "2. Dizziness & Vertigo (Vestibular)",
            keywords: [
                "vertigo", "bppv", "dizziness", "vestibular", "balance disorder", "fall risk",
                "unsteady gait", "geriatric fall prevention", "elderly balance", "disequilibrium"
            ],
            exercises: [
                { name: "Brandt-Daroff Exercise", sets: "5 cycles", freq: "Twice daily", rationale: "Otolith habituation for positional vertigo" },
                { name: "Gaze Stabilization (Side-to-Side)", sets: "2 sets × 30s", freq: "Twice daily", rationale: "Vestibulo-ocular reflex (VOR × 1) training" },
                { name: "One-Leg Balance", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Unipedal stance stability to prevent falls" },
                { name: "Heel-to-Toe Stand", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Tandem stance balance challenge" },
                { name: "Feet Together Stand", sets: "Hold 60 seconds", freq: "Twice daily", rationale: "Somatosensory baseline balance mastery" }
            ]
        },

        /* ------------------ SPECIALTY & RESPIRATORY ------------------ */
        {
            id: "bells_palsy",
            title: "Bell's Palsy & Facial Nerve Rehabilitation",
            region: "Respiratory & Specialty",
            category: "3. Jaw (TMJ) & Facial Exercises",
            keywords: [
                "bell's palsy", "facial palsy", "facial paralysis", "facial nerve", "mouth droop",
                "eyelid weakness", "facial asymmetry"
            ],
            exercises: [
                { name: "The Big Smile", sets: "3 sets × 10 reps (5s hold)", freq: "3 times daily", rationale: "Zygomaticus major muscle neuromuscular re-education" },
                { name: "Pucker Up", sets: "3 sets × 10 reps", freq: "3 times daily", rationale: "Orbicularis oris strength and mouth symmetry" },
                { name: "Eyebrow Raises", sets: "3 sets × 10 reps", freq: "3 times daily", rationale: "Frontalis muscle activation without synkinesis" },
                { name: "Cheek Puffs", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Buccinator motor recruitment and oral competence" },
                { name: "Tongue to Roof (Jaw Rest)", sets: "Hold 10s × 10 reps", freq: "3 times daily", rationale: "Stabilizes oral-jaw rest posture" }
            ]
        },
        {
            id: "tmj_dysfunction",
            title: "TMJ (Temporomandibular Joint) Protocol",
            region: "Respiratory & Specialty",
            category: "3. Jaw (TMJ) & Facial Exercises",
            keywords: [
                "tmj", "temporomandibular", "jaw pain", "clicking jaw", "bruxism",
                "jaw deviation", "lock jaw", "trismus", "mastication pain"
            ],
            exercises: [
                { name: "Tongue to Roof (Jaw Rest)", sets: "Hold 10s × 10 reps", freq: "3 times daily", rationale: "Prevents masseter over-activity and relaxes jaw" },
                { name: "Resisted Jaw Opening", sets: "2 sets × 10 reps (5s hold)", freq: "Twice daily", rationale: "Isometric mandibular stabilizer activation" },
                { name: "Jaw Side-to-Side", sets: "2 sets × 10 reps", freq: "Twice daily", rationale: "Restores bilateral condylar translation and lateral glide" },
                { name: "Jaw Circles (Gentle)", sets: "5 circles each way", freq: "Twice daily", rationale: "Smooth controlled mandibular range of motion" }
            ]
        },
        {
            id: "pelvic_floor",
            title: "Pelvic Floor Strength & Incontinence Protocol",
            region: "Respiratory & Specialty",
            category: "2. Pelvic Floor Strength & Control",
            keywords: [
                "pelvic floor", "incontinence", "urinary incontinence", "kegel", "stress incontinence",
                "postnatal", "postpartum", "pelvic organ prolapse", "bladder control"
            ],
            exercises: [
                { name: "The Slow Squeeze (Kegel)", sets: "3 sets × 10 reps (10s hold)", freq: "3 times daily", rationale: "Type I slow-twitch endurance for postural support" },
                { name: "Fast Squeezes (Flicks)", sets: "2 sets × 10 quick contractions", freq: "3 times daily", rationale: "Type II fast-twitch recruitment to prevent cough leaks" },
                { name: "The Elevator Lift", sets: "3 sets × 5 cycles", freq: "Twice daily", rationale: "Multi-level pelvic diaphragm voluntary control" },
                { name: "Squeeze and Bridge", sets: "3 sets × 10 reps", freq: "Twice daily", rationale: "Integrates gluteal and pelvic floor synergy" },
                { name: "Child's Pose (Pelvic Release)", sets: "Hold 60 seconds", freq: "Twice daily", rationale: "Down-trains hypertonic pelvic muscles to prevent spasm" }
            ]
        },
        {
            id: "respiratory_copd",
            title: "Respiratory & Pulmonary Rehabilitation",
            region: "Respiratory & Specialty",
            category: "1. Breathing & Lung Health",
            keywords: [
                "copd", "asthma", "respiratory", "breathing difficulty", "breathlessness",
                "dyspnea", "post covid", "pulmonary rehab", "chest physiotherapy", "lung disease"
            ],
            exercises: [
                { name: "Deep Belly Breathing", sets: "5-10 minutes", freq: "3 times daily", rationale: "Maximizes diaphragmatic excursion and oxygen saturation" },
                { name: "Whistle Breathing (Pursed Lip)", sets: "10-15 breaths", freq: "Whenever breathless", rationale: "Creates positive end-expiratory pressure to prevent airway collapse" },
                { name: "Rib Expansion Breathing", sets: "2 sets × 10 breaths", freq: "Twice daily", rationale: "Improves lateral costal mobility and vital capacity" },
                { name: "The 'Huff' Cough", sets: "3-5 huffs", freq: "Twice daily", rationale: "Clears bronchial secretions without bronchospasm" }
            ]
        },
        {
            id: "diabetic_neuropathy",
            title: "Diabetic Neuropathy & Sensory Balance Protocol",
            region: "Neuro & Balance",
            category: "1. Basic Balance & Fall Prevention",
            keywords: [
                "diabetic neuropathy", "peripheral neuropathy", "numb feet", "neuropathy",
                "sensory loss feet", "diabetic foot", "neuropathy balance", "sensory ataxia", "loss of sensation"
            ],
            exercises: [
                { name: "Feet Together Stand", sets: "3 reps × 30s", freq: "Twice daily", rationale: "Somatosensory re-weighting and balance training" },
                { name: "Tandem Stance (Heel-to-Toe)", sets: "3 reps × 20s", freq: "Twice daily", rationale: "Narrow base of support postural challenge" },
                { name: "One-Leg Balance", sets: "3 reps × 20s", freq: "Twice daily", rationale: "Single leg balance for fall reduction" },
                { name: "Ankle Pumps", sets: "30 reps", freq: "3 times daily", rationale: "Promotes distal venous return and nerve vascular perfusion" },
                { name: "Tennis Ball Arch Roll", sets: "3 minutes each foot", freq: "Twice daily", rationale: "Plantar cutaneous mechanoreceptor sensory stimulation" },
                { name: "Tiptoe Walking", sets: "20 steps", freq: "Daily", rationale: "Strengthens plantarflexors for push-off power in sensory-depleted gait" }
            ]
        },
        {
            id: "fibromyalgia_myofascial",
            title: "Fibromyalgia & Gentle Myofascial Pain Protocol",
            region: "Respiratory & Specialty",
            category: "5. Energy & Relaxation",
            keywords: [
                "fibromyalgia", "myofascial pain", "mps", "chronic widespread pain",
                "central sensitization", "body ache", "tender points", "fibro", "allodynia"
            ],
            exercises: [
                { name: "Cat-Cow Stretch", sets: "2 sets × 10 reps (slow)", freq: "Twice daily", rationale: "Low-load rhythmic mobilization calming central nervous system" },
                { name: "Child's Pose", sets: "Hold 45 seconds", freq: "Twice daily", rationale: "Whole-body myofascial relaxation and parasympathetic breathing" },
                { name: "Deep Belly Breathing", sets: "10 slow breaths", freq: "3 times daily", rationale: "Down-regulates sympathetic nervous system overdrive" },
                { name: "Progressive Tense & Release", sets: "5-10 minutes", freq: "Daily", rationale: "Trains awareness of somatic tension and releases muscle knots" },
                { name: "Gentle Full-Body Reach", sets: "5 reps", freq: "Twice daily", rationale: "Full kinetic chain stretch without provoking post-exertional flare" }
            ]
        }
    ];

    /* =================================================================
       2. SMART STRING NORMALIZATION & LOOKUP HELPERS
       ================================================================= */

    function normalizeStr(str) {
        return (str || '')
            .toLowerCase()
            .replace(/[\u2018\u2019']/g, '') // remove curly/straight apostrophes
            .replace(/[^a-z0-9]/g, '');      // keep alphanumeric
    }

    function normalizeDiagnosisQuery(str) {
        if (!str) return '';
        let s = str.toLowerCase();
        s = s.replace(/\bnknee\b/g, 'knee')
             .replace(/\bknne\b/g, 'knee')
             .replace(/\bligment\b/g, 'ligament')
             .replace(/\bligaments\b/g, 'ligament')
             .replace(/\binjry\b/g, 'injury')
             .replace(/\bsholder\b/g, 'shoulder')
             .replace(/\bshoudler\b/g, 'shoulder')
             .replace(/\bankel\b/g, 'ankle')
             .replace(/\belbo\b/g, 'elbow')
             .replace(/\bwirst\b/g, 'wrist')
             .replace(/\bsciatca\b/g, 'sciatica')
             .replace(/\bspondylsis\b/g, 'spondylosis');
        return s;
    }

    function cleanDisplayString(str) {
        return (str || '').replace(/,\s*$/, '').trim();
    }

    // Resolves an exercise from EXERCISE_LIBRARY by normalized name
    function resolveLibraryExercise(exName, preferredRegion, preferredCategory) {
        const lib = (typeof EXERCISE_LIBRARY !== 'undefined' && EXERCISE_LIBRARY) 
            ? EXERCISE_LIBRARY 
            : (window.EXERCISE_LIBRARY || null);
            
        if (!lib) return null;

        const targetNorm = normalizeStr(exName);

        // 1. Check preferred region & category first
        if (preferredRegion && preferredCategory && lib[preferredRegion] && lib[preferredRegion][preferredCategory]) {
            const match = lib[preferredRegion][preferredCategory].find(e => normalizeStr(e.name) === targetNorm);
            if (match) return { ...match, region: preferredRegion, category: preferredCategory };
        }

        // 2. Check preferred region across all categories
        if (preferredRegion && lib[preferredRegion]) {
            for (const cat of Object.keys(lib[preferredRegion])) {
                const list = lib[preferredRegion][cat] || [];
                const match = list.find(e => normalizeStr(e.name) === targetNorm);
                if (match) return { ...match, region: preferredRegion, category: cat };
            }
        }

        // 3. Search across all regions in EXERCISE_LIBRARY
        for (const reg of Object.keys(lib)) {
            for (const cat of Object.keys(lib[reg])) {
                const list = lib[reg][cat] || [];
                const match = list.find(e => normalizeStr(e.name) === targetNorm);
                if (match) return { ...match, region: reg, category: cat };
            }
        }

        // 4. Substring fallback
        for (const reg of Object.keys(lib)) {
            for (const cat of Object.keys(lib[reg])) {
                const list = lib[reg][cat] || [];
                const match = list.find(e => normalizeStr(e.name).includes(targetNorm) || targetNorm.includes(normalizeStr(e.name)));
                if (match) return { ...match, region: reg, category: cat };
            }
        }

        return null;
    }

    /* =================================================================
       3. DIAGNOSIS MATCHING & RECOMMENDATION SCORER
       ================================================================= */

    const CLINICAL_STOP_WORDS = new Set([
        "pain", "ache", "aches", "sore", "soreness", "strain", "strains", "sprain", "sprains",
        "injury", "injuries", "syndrome", "disorder", "problem", "problems", "stiffness",
        "stiff", "weakness", "weak", "dysfunction", "chronic", "acute", "subacute",
        "mild", "moderate", "severe", "bilateral", "left", "right", "both", "side",
        "post", "op", "post-op", "rehab", "rehabilitation", "management", "and", "with",
        "in", "of", "to", "for", "the", "a", "an", "at", "due"
    ]);

    function getSuggestedExercisesForDiagnosis(diagnosisText) {
        const rawClean = cleanDisplayString(diagnosisText);
        if (!rawClean || rawClean.length < 2) return [];

        const clean = normalizeDiagnosisQuery(rawClean);

        // Split multiple diagnoses (e.g. "Cervical Spondylosis, Low Back Pain")
        const segments = clean.split(/[,;\/&]|\band\b/i)
            .map(s => s.trim())
            .filter(s => s.length > 1);

        const matchedProtocols = [];
        const seenProtocolIds = new Set();

        segments.forEach(seg => {
            const segNorm = normalizeStr(seg);
            const segLower = seg.toLowerCase();
            const segTokens = segLower.split(/[^a-z0-9]+/).filter(w => w.length > 1);
            const meaningfulTokens = segTokens.filter(w => !CLINICAL_STOP_WORDS.has(w) && w.length > 2);

            let bestSegmentProtocols = [];

            CLINICAL_PROTOCOLS.forEach(proto => {
                if (seenProtocolIds.has(proto.id)) return;

                let score = 0;
                const protoTitleNorm = normalizeStr(proto.title);
                const protoRegionNorm = normalizeStr(proto.region);

                // 1. Exact full keyword phrase match (e.g. "thoracic back pain")
                for (const kw of proto.keywords) {
                    const kwNorm = normalizeStr(kw);
                    if (segNorm === kwNorm) {
                        score += 250;
                        break;
                    } else if (segNorm.length >= 4 && (segNorm.includes(kwNorm) || kwNorm.includes(segNorm))) {
                        const lenRatio = Math.min(segNorm.length, kwNorm.length) / Math.max(segNorm.length, kwNorm.length);
                        score = Math.max(score, Math.round(110 + lenRatio * 50));
                    }
                }

                // 2. Protocol title match
                if (segNorm.includes(protoTitleNorm) || protoTitleNorm.includes(segNorm)) {
                    score = Math.max(score, 120);
                }

                // 3. Meaningful token match (only non-stop words like 'thoracic', 'kyphosis', 'cervical', 'knee')
                if (score < 100 && meaningfulTokens.length > 0) {
                    let matchedCount = 0;
                    for (const token of meaningfulTokens) {
                        const inKw = proto.keywords.some(kw => {
                            const kwWords = kw.toLowerCase().split(/[^a-z0-9]+/);
                            return kwWords.includes(token);
                        });
                        if (inKw || proto.title.toLowerCase().includes(token) || proto.region.toLowerCase().includes(token)) {
                            matchedCount++;
                        }
                    }
                    if (matchedCount > 0) {
                        const tokenScore = Math.round((matchedCount / meaningfulTokens.length) * 85);
                        score = Math.max(score, tokenScore);
                    }
                }

                // 4. Strict Anatomical Disambiguation
                // If query mentions 'thoracic', don't match lumbar, cervical, knee, etc.
                if (segTokens.includes("thoracic") && !protoRegionNorm.includes("thoracic")) score = 0;
                if ((segTokens.includes("cervical") || segTokens.includes("neck")) && !protoRegionNorm.includes("cervical")) score = 0;
                if ((segTokens.includes("lumbar") || segTokens.includes("lbp") || segTokens.includes("pivd") || segTokens.includes("sciatica") || segTokens.includes("lumbago")) && !protoRegionNorm.includes("lumbar")) score = 0;
                if ((segTokens.includes("knee") || segTokens.includes("patellofemoral") || segTokens.includes("meniscus") || segTokens.includes("acl") || segTokens.includes("mcl") || segTokens.includes("lcl") || segTokens.includes("pcl")) && !protoRegionNorm.includes("knee")) score = 0;
                if ((segTokens.includes("shoulder") || segTokens.includes("rotator") || segTokens.includes("glenohumeral") || segTokens.includes("acromioclavicular")) && !protoRegionNorm.includes("shoulder")) score = 0;
                if ((segTokens.includes("ankle") || segTokens.includes("foot") || segTokens.includes("plantar") || segTokens.includes("achilles") || segTokens.includes("atfl")) && !protoRegionNorm.includes("ankle")) score = 0;
                if ((segTokens.includes("elbow") || segTokens.includes("wrist") || segTokens.includes("hand") || segTokens.includes("carpal") || segTokens.includes("cts")) && !protoRegionNorm.includes("elbow")) score = 0;
                if ((segTokens.includes("hip") || segTokens.includes("groin")) && !protoRegionNorm.includes("hip")) score = 0;

                if (score >= 40) {
                    bestSegmentProtocols.push({ proto, score });
                }
            });

            if (bestSegmentProtocols.length > 0) {
                // Find top score in this segment
                const maxSegScore = Math.max(...bestSegmentProtocols.map(p => p.score));
                // Only take protocols with score >= 70% of max score (at most top 2)
                const qualifying = bestSegmentProtocols
                    .filter(p => p.score >= Math.max(50, maxSegScore * 0.70))
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 2);

                qualifying.forEach(q => {
                    if (!seenProtocolIds.has(q.proto.id)) {
                        matchedProtocols.push(q);
                        seenProtocolIds.add(q.proto.id);
                    }
                });
            }
        });

        // Fallback: If no exact protocol matched, search by body regions
        if (matchedProtocols.length === 0) {
            const rawLower = clean.toLowerCase();
            CLINICAL_PROTOCOLS.forEach(proto => {
                if (seenProtocolIds.has(proto.id)) return;
                const regLower = proto.region.toLowerCase();
                if (rawLower.includes("neck") && regLower.includes("cervical")) {
                    matchedProtocols.push({ proto, score: 30 });
                    seenProtocolIds.add(proto.id);
                } else if ((rawLower.includes("back") || rawLower.includes("spine")) && regLower.includes("lumbar")) {
                    matchedProtocols.push({ proto, score: 30 });
                    seenProtocolIds.add(proto.id);
                } else if (rawLower.includes("shoulder") && regLower.includes("shoulder")) {
                    matchedProtocols.push({ proto, score: 30 });
                    seenProtocolIds.add(proto.id);
                } else if (rawLower.includes("knee") && regLower.includes("knee")) {
                    matchedProtocols.push({ proto, score: 30 });
                    seenProtocolIds.add(proto.id);
                } else if ((rawLower.includes("ankle") || rawLower.includes("foot") || rawLower.includes("heel")) && regLower.includes("ankle")) {
                    matchedProtocols.push({ proto, score: 30 });
                    seenProtocolIds.add(proto.id);
                } else if ((rawLower.includes("elbow") || rawLower.includes("wrist") || rawLower.includes("hand")) && regLower.includes("elbow")) {
                    matchedProtocols.push({ proto, score: 30 });
                    seenProtocolIds.add(proto.id);
                } else if ((rawLower.includes("hip") || rawLower.includes("groin") || rawLower.includes("thigh")) && regLower.includes("hip")) {
                    matchedProtocols.push({ proto, score: 30 });
                    seenProtocolIds.add(proto.id);
                } else if ((rawLower.includes("balance") || rawLower.includes("fall") || rawLower.includes("neuro")) && regLower.includes("neuro")) {
                    matchedProtocols.push({ proto, score: 30 });
                    seenProtocolIds.add(proto.id);
                }
            });
        }

        // Sort protocols by match score descending
        matchedProtocols.sort((a, b) => b.score - a.score);

        // Compile exercise recommendations, deduplicating across protocols
        const results = [];
        const seenExNames = new Set();

        matchedProtocols.forEach(({ proto }) => {
            proto.exercises.forEach(item => {
                const normName = normalizeStr(item.name);
                if (seenExNames.has(normName)) return;
                seenExNames.add(normName);

                // Fetch full exercise metadata from EXERCISE_LIBRARY
                const libObj = resolveLibraryExercise(item.name, proto.region, proto.category);

                results.push({
                    name: libObj ? libObj.name : item.name,
                    region: libObj ? libObj.region : proto.region,
                    category: libObj ? libObj.category : proto.category,
                    steps: libObj ? libObj.steps : "",
                    video: libObj ? libObj.video : "",
                    setsReps: item.sets || "3 sets × 10 reps",
                    frequency: item.freq || "Twice daily",
                    rationale: item.rationale || "Evidence-based clinical stabilization",
                    protocolTitle: proto.title
                });
            });
        });

        return results;
    }

    /* =================================================================
       4. UI COMPONENT: ENROLLMENT FORM AUTO-SUGGESTIONS (STEP 04)
       ================================================================= */

    let currentEnrollPage = 1;
    const ENROLL_PAGE_SIZE = 10;
    let lastEnrollDiagnosis = '';

    function setEnrollPage(page) {
        currentEnrollPage = Math.max(1, page);
        renderEnrollHepSuggestions();
    }

    function renderEnrollHepSuggestions(optDiag) {
        const container = document.getElementById('enroll-hep-suggestions-container');
        if (!container) return;

        const diagInput = document.getElementById('en-condition');
        const diagnosis = cleanDisplayString(optDiag !== undefined ? optDiag : (diagInput ? diagInput.value : ''));

        if (diagnosis !== lastEnrollDiagnosis) {
            currentEnrollPage = 1;
            lastEnrollDiagnosis = diagnosis;
        }

        if (!diagnosis) {
            container.innerHTML = `
                <div class="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-teal-500/10 border border-amber-200/60 dark:border-amber-900/40 space-y-2.5">
                    <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                        </div>
                        <span class="text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
                            Clinical Exercise Auto-Suggest
                        </span>
                        <span class="text-[9px] px-2 py-0.5 rounded-full font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            AI Ready
                        </span>
                    </div>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                        Type or select a clinical diagnosis in <strong>Step 1</strong> (e.g. <em>Thoracic Back Pain, Cervical Radiculopathy, Runner's Knee, Ligament Injury</em>) to auto-generate personalized evidence-based home exercise routines.
                    </p>
                    <div class="flex items-center gap-1.5 flex-wrap pt-1">
                        <span class="text-[9px] font-bold text-slate-400 uppercase mr-1">Quick Select:</span>
                        <button type="button" onclick="ClinicalExerciseRecommender.setEnrollDiagnosis('Thoracic Back Pain')" class="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer">Thoracic Back Pain</button>
                        <button type="button" onclick="ClinicalExerciseRecommender.setEnrollDiagnosis('Runner\'s Knee')" class="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer">Runner's Knee</button>
                        <button type="button" onclick="ClinicalExerciseRecommender.setEnrollDiagnosis('Knee Ligament Injury')" class="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer">Ligament Injury</button>
                        <button type="button" onclick="ClinicalExerciseRecommender.setEnrollDiagnosis('Low Back Pain')" class="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer">Low Back Pain</button>
                        <button type="button" onclick="ClinicalExerciseRecommender.setEnrollDiagnosis('Cervical Radiculopathy')" class="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer">Cervical Radiculopathy</button>
                        <button type="button" onclick="ClinicalExerciseRecommender.setEnrollDiagnosis('Frozen Shoulder')" class="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer">Frozen Shoulder</button>
                    </div>
                </div>
            `;
            if (window.lucide) lucide.createIcons({ root: container });
            return;
        }

        const suggestions = getSuggestedExercisesForDiagnosis(diagnosis);

        if (!suggestions || suggestions.length === 0) {
            container.innerHTML = `
                <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                    <div class="flex items-center gap-2">
                        <i data-lucide="info" class="w-4 h-4 text-slate-400"></i>
                        <span class="text-xs text-slate-500 font-semibold">Diagnosis: <strong>${escapeHtml(diagnosis)}</strong></span>
                    </div>
                    <span class="text-[10px] text-slate-400">Use search box below or Browse Library to assign exercises</span>
                </div>
            `;
            if (window.lucide) lucide.createIcons({ root: container });
            return;
        }

        // Pagination calculations (10 exercises per page)
        const totalPages = Math.max(1, Math.ceil(suggestions.length / ENROLL_PAGE_SIZE));
        if (currentEnrollPage > totalPages) currentEnrollPage = totalPages;
        if (currentEnrollPage < 1) currentEnrollPage = 1;

        const startIndex = (currentEnrollPage - 1) * ENROLL_PAGE_SIZE;
        const pageExercises = suggestions.slice(startIndex, startIndex + ENROLL_PAGE_SIZE);

        // Check which exercises are already added to intake routine
        const currentAddedList = (typeof enrollHepList !== 'undefined' && Array.isArray(enrollHepList)) ? enrollHepList : [];
        const addedSet = new Set(currentAddedList.map(item => normalizeStr(item.name)));

        const unaddedTotalCount = suggestions.filter(s => !addedSet.has(normalizeStr(s.name))).length;
        const unaddedPageCount = pageExercises.filter(s => !addedSet.has(normalizeStr(s.name))).length;

        container.innerHTML = `
            <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-indigo-500/5 to-emerald-500/10 border-2 border-amber-300/80 dark:border-amber-700/60 shadow-sm space-y-3.5">
                <!-- Header with Title, Badge, Pagination Buttons & Batch Prescribe -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-amber-200/50 dark:border-amber-800/40">
                    <div class="flex items-center gap-2.5">
                        <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-sm flex-shrink-0">
                            <i data-lucide="sparkles" class="w-4 h-4"></i>
                        </div>
                        <div>
                            <div class="flex items-center gap-2 flex-wrap">
                                <h4 class="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-100">
                                    Auto-Suggested Protocol for: <span class="text-indigo-600 dark:text-indigo-400 underline decoration-amber-400">${escapeHtml(diagnosis)}</span>
                                </h4>
                                <span class="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-amber-500 text-white shadow-xs">
                                    ${suggestions.length} Relatable Home Exercises
                                </span>
                                ${totalPages > 1 ? `
                                    <span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                                        Page ${currentEnrollPage} of ${totalPages} (10 per page)
                                    </span>
                                ` : ''}
                            </div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase mt-0.5">
                                Showing 10 evidence-based home exercises per page • Scrollable list
                            </p>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 shrink-0 flex-wrap">
                        ${totalPages > 1 ? `
                            <div class="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
                                <button type="button" onclick="ClinicalExerciseRecommender.setEnrollPage(${currentEnrollPage - 1})" ${currentEnrollPage <= 1 ? 'disabled class="px-2 py-1 text-[10px] font-bold text-slate-300 dark:text-slate-600 cursor-not-allowed"' : 'class="px-2 py-1 text-[10px] font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg cursor-pointer flex items-center gap-0.5 active:scale-95"'}>
                                    <i data-lucide="chevron-left" class="w-3.5 h-3.5"></i> Prev
                                </button>
                                <span class="px-2 text-[10px] font-black text-amber-600 dark:text-amber-400">${currentEnrollPage}/${totalPages}</span>
                                <button type="button" onclick="ClinicalExerciseRecommender.setEnrollPage(${currentEnrollPage + 1})" ${currentEnrollPage >= totalPages ? 'disabled class="px-2 py-1 text-[10px] font-bold text-slate-300 dark:text-slate-600 cursor-not-allowed"' : 'class="px-2 py-1 text-[10px] font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg cursor-pointer flex items-center gap-0.5 active:scale-95"'}>
                                    Next <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                                </button>
                            </div>
                        ` : ''}

                        ${unaddedPageCount > 0 && totalPages > 1 ? `
                            <button type="button" onclick="ClinicalExerciseRecommender.addCurrentPageEnrollHepSuggestions()" class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 active:scale-95 transition-all cursor-pointer">
                                <span>Add Page (${unaddedPageCount})</span>
                            </button>
                        ` : ''}

                        ${unaddedTotalCount > 0 ? `
                            <button type="button" onclick="ClinicalExerciseRecommender.addAllEnrollHepSuggestions()" class="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer">
                                <i data-lucide="zap" class="w-3.5 h-3.5"></i>
                                <span>Add All (${unaddedTotalCount})</span>
                            </button>
                        ` : `
                            <span class="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 shadow-xs">
                                <i data-lucide="check-check" class="w-3.5 h-3.5 text-emerald-600"></i>
                                All Added
                            </span>
                        `}
                    </div>
                </div>

                <!-- Exercise Suggestion Cards Grid (Scrollable Container, 10 items) -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto pr-1.5 custom-scroll">
                    ${pageExercises.map((ex, idx) => {
                        const isAdded = addedSet.has(normalizeStr(ex.name));
                        const escapedName = ex.name.replace(/'/g, "\\'");
                        const escapedSteps = (ex.steps || '').replace(/'/g, "\\'").replace(/\n/g, "\\n");
                        const escapedVideo = (ex.video || '').replace(/'/g, "\\'");
                        const escapedRegion = ex.region.replace(/'/g, "\\'");
                        const escapedCat = ex.category.replace(/'/g, "\\'");
                        const escapedSets = ex.setsReps.replace(/'/g, "\\'");
                        const escapedFreq = ex.frequency.replace(/'/g, "\\'");

                        const cardBorder = isAdded 
                            ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30' 
                            : 'border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 hover:border-amber-400';

                        return `
                            <div class="p-3 rounded-2xl border ${cardBorder} shadow-xs flex flex-col justify-between transition-all gap-2">
                                <div class="space-y-1.5">
                                    <div class="flex items-center justify-between gap-1.5">
                                        <span class="text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 truncate max-w-[150px]">
                                            ${escapeHtml(ex.category)}
                                        </span>
                                        <span class="text-[8px] font-bold text-amber-600 dark:text-amber-400 uppercase">
                                            ${escapeHtml(ex.setsReps)}
                                        </span>
                                    </div>
                                    <h5 class="text-xs font-black text-slate-800 dark:text-slate-100 uppercase leading-snug">
                                        ${escapeHtml(ex.name)}
                                    </h5>
                                    <p class="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed italic">
                                        🎯 ${escapeHtml(ex.rationale)}
                                    </p>
                                </div>

                                <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                                    <span class="text-[8px] font-bold text-slate-400 uppercase">
                                        ${escapeHtml(ex.frequency)}
                                    </span>
                                    ${isAdded ? `
                                        <button type="button" onclick="toggleEnrollHepItem('${escapedName}', '${escapedSteps}', '${escapedVideo}', '${escapedRegion}', '${escapedCat}')" class="px-2.5 py-1 rounded-xl text-[9px] font-black uppercase bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all cursor-pointer">
                                            ✓ Added (Tap to Remove)
                                        </button>
                                    ` : `
                                        <button type="button" onclick="ClinicalExerciseRecommender.addSingleEnrollHepSuggestion('${escapedName}', '${escapedSteps}', '${escapedVideo}', '${escapedRegion}', '${escapedCat}', '${escapedSets}', '${escapedFreq}')" class="px-3 py-1 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white rounded-xl text-[9px] font-black uppercase tracking-wider shadow-xs transition-all cursor-pointer flex items-center gap-1">
                                            <i data-lucide="plus" class="w-3 h-3"></i> Add
                                        </button>
                                    `}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- Bottom Pagination Bar (when more than 10 exercises exist) -->
                ${totalPages > 1 ? `
                    <div class="flex items-center justify-between pt-2 border-t border-amber-200/50 dark:border-amber-800/40 text-[10px]">
                        <span class="text-slate-500 dark:text-slate-400 font-medium">
                            Showing exercises <strong>${startIndex + 1}–${Math.min(startIndex + ENROLL_PAGE_SIZE, suggestions.length)}</strong> of <strong>${suggestions.length}</strong> relatable home exercises
                        </span>
                        <div class="flex items-center gap-2">
                            <button type="button" onclick="ClinicalExerciseRecommender.setEnrollPage(${currentEnrollPage - 1})" ${currentEnrollPage <= 1 ? 'disabled class="text-slate-300 dark:text-slate-600 cursor-not-allowed"' : 'class="text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"'}>
                                ← Previous 10
                            </button>
                            <span class="text-slate-300 dark:text-slate-700">•</span>
                            <button type="button" onclick="ClinicalExerciseRecommender.setEnrollPage(${currentEnrollPage + 1})" ${currentEnrollPage >= totalPages ? 'disabled class="text-slate-300 dark:text-slate-600 cursor-not-allowed"' : 'class="text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"'}>
                                Next 10 →
                            </button>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        if (window.lucide) lucide.createIcons({ root: container });
    }

    function addCurrentPageEnrollHepSuggestions() {
        const diagInput = document.getElementById('en-condition');
        const diagnosis = cleanDisplayString(diagInput ? diagInput.value : '');
        if (!diagnosis) return;

        const suggestions = getSuggestedExercisesForDiagnosis(diagnosis);
        if (!suggestions || suggestions.length === 0) return;

        const startIndex = (currentEnrollPage - 1) * ENROLL_PAGE_SIZE;
        const pageExercises = suggestions.slice(startIndex, startIndex + ENROLL_PAGE_SIZE);

        if (typeof enrollHepList === 'undefined') window.enrollHepList = [];

        let addedCount = 0;
        pageExercises.forEach(ex => {
            const exists = enrollHepList.some(item => normalizeStr(item.name) === normalizeStr(ex.name));
            if (!exists) {
                enrollHepList.push({
                    name: ex.name,
                    setsReps: ex.setsReps || "3 sets × 10 reps",
                    frequency: ex.frequency || "Twice daily",
                    instructions: ex.steps || "",
                    videoLink: ex.video || "",
                    region: ex.region || "",
                    category: ex.category || ""
                });
                addedCount++;
            }
        });

        if (typeof renderEnrollHepList === 'function') renderEnrollHepList();
        renderEnrollHepSuggestions();

        if (typeof showToast === 'function') {
            showToast(`Added ${addedCount} page exercises to routine`, 'success');
        }
    }

    function addSingleEnrollHepSuggestion(name, steps, video, region, category, sets, freq) {
        if (typeof enrollHepList === 'undefined') window.enrollHepList = [];

        const existingIndex = enrollHepList.findIndex(item => item.name === name);
        if (existingIndex === -1) {
            enrollHepList.push({
                name: name,
                setsReps: sets || "3 sets × 10 reps",
                frequency: freq || "Twice daily",
                instructions: steps || "",
                videoLink: video || "",
                region: region || "",
                category: category || ""
            });
            if (typeof showToast === 'function') showToast(`Added "${name}" to routine`, 'success');
        }

        if (typeof renderEnrollHepList === 'function') renderEnrollHepList();
        renderEnrollHepSuggestions();
    }

    function addAllEnrollHepSuggestions() {
        const diagInput = document.getElementById('en-condition');
        const diagnosis = cleanDisplayString(diagInput ? diagInput.value : '');
        if (!diagnosis) return;

        const suggestions = getSuggestedExercisesForDiagnosis(diagnosis);
        if (!suggestions || suggestions.length === 0) return;

        if (typeof enrollHepList === 'undefined') window.enrollHepList = [];

        let addedCount = 0;
        suggestions.forEach(ex => {
            const exists = enrollHepList.some(item => normalizeStr(item.name) === normalizeStr(ex.name));
            if (!exists) {
                enrollHepList.push({
                    name: ex.name,
                    setsReps: ex.setsReps || "3 sets × 10 reps",
                    frequency: ex.frequency || "Twice daily",
                    instructions: ex.steps || "",
                    videoLink: ex.video || "",
                    region: ex.region || "",
                    category: ex.category || ""
                });
                addedCount++;
            }
        });

        if (typeof renderEnrollHepList === 'function') renderEnrollHepList();
        renderEnrollHepSuggestions();

        if (typeof showToast === 'function') {
            showToast(`Added ${addedCount} suggested exercises for ${diagnosis}`, 'success');
        }
    }

    function setEnrollDiagnosis(diagName) {
        const diagInput = document.getElementById('en-condition');
        if (diagInput) {
            diagInput.value = diagName;
            diagInput.dispatchEvent(new Event('input', { bubbles: true }));
            diagInput.dispatchEvent(new Event('change', { bubbles: true }));
        }
        renderEnrollHepSuggestions(diagName);
    }

    /* =================================================================
       5. UI COMPONENT: EXERCISES TAB RECOMMENDATIONS (tab-exercises)
       ================================================================= */

    let activeTabSuggestionsFilter = false;

    function renderTabExSuggestions(patientName) {
        const bar = document.getElementById('ex-tab-recommendations-bar');
        if (!bar) return;

        const p = (typeof patientLookup !== 'undefined' && patientLookup && patientName) 
            ? patientLookup[patientName] 
            : null;

        if (!p) {
            bar.innerHTML = '';
            bar.classList.add('hidden');
            activeTabSuggestionsFilter = false;
            return;
        }

        const diagnosis = cleanDisplayString(p.diag || p.condition || '');
        if (!diagnosis) {
            bar.innerHTML = `
                <div class="bg-amber-50/70 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 flex items-center justify-between gap-3 text-xs">
                    <span class="text-amber-800 dark:text-amber-300 font-bold">
                        ⚠️ No clinical diagnosis recorded for ${escapeHtml(p.name || patientName)}. Edit patient details to unlock tailored exercise suggestions.
                    </span>
                    <button type="button" onclick="openEditPatientModal('${(p.name || patientName).replace(/'/g, "\\'")}')" class="px-2.5 py-1 bg-amber-600 text-white rounded-lg text-[10px] font-black uppercase cursor-pointer">
                        Add Diagnosis
                    </button>
                </div>
            `;
            bar.classList.remove('hidden');
            if (window.lucide) lucide.createIcons({ root: bar });
            return;
        }

        const suggestions = getSuggestedExercisesForDiagnosis(diagnosis);
        if (!suggestions || suggestions.length === 0) {
            bar.innerHTML = '';
            bar.classList.add('hidden');
            return;
        }

        // Check which exercises are already assigned
        const pid = typeof normId === 'function' ? normId(p.id) : p.id;
        const assignedPlans = (window.exercisePlans && window.exercisePlans[pid]) 
            ? window.exercisePlans[pid] 
            : ((typeof exercisePlans !== 'undefined' && exercisePlans[pid]) ? exercisePlans[pid] : []);
        const assignedSet = new Set(assignedPlans.map(item => normalizeStr(item.name)));

        const unassigned = suggestions.filter(s => !assignedSet.has(normalizeStr(s.name)));

        bar.innerHTML = `
            <div class="bg-gradient-to-r from-indigo-50 via-amber-50/60 to-emerald-50 dark:from-indigo-950/60 dark:via-amber-950/40 dark:to-emerald-950/40 p-4 rounded-2xl border-2 border-indigo-200/80 dark:border-indigo-800/80 shadow-sm space-y-3">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-700 text-white flex items-center justify-center shadow-md flex-shrink-0">
                            <i data-lucide="sparkles" class="w-4 h-4"></i>
                        </div>
                        <div>
                            <div class="flex items-center gap-2 flex-wrap">
                                <h4 class="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-100">
                                    Clinical Recommendations: <span class="text-indigo-600 dark:text-indigo-400">${escapeHtml(diagnosis)}</span>
                                </h4>
                                <span class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-indigo-600 text-white shadow-xs">
                                    ${suggestions.length} Suggested
                                </span>
                            </div>
                            <p class="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase mt-0.5">
                                Protocol tailored for ${escapeHtml(p.name || patientName)}
                            </p>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 flex-wrap">
                        ${unassigned.length > 0 ? `
                            <button type="button" onclick="ClinicalExerciseRecommender.prescribeAllTabExSuggestions('${(p.name || patientName).replace(/'/g, "\\'")}')" class="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer">
                                <i data-lucide="zap" class="w-3.5 h-3.5"></i>
                                <span>Prescribe All Suggested (${unassigned.length})</span>
                            </button>
                        ` : `
                            <span class="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                                <i data-lucide="check-check" class="w-3.5 h-3.5 text-emerald-600"></i>
                                All Prescribed
                            </span>
                        `}

                        <button type="button" onclick="ClinicalExerciseRecommender.toggleTabSuggestionsGridFilter()" class="px-3 py-2 ${activeTabSuggestionsFilter ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400'} border border-indigo-200 dark:border-indigo-700 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs hover:bg-indigo-50 active:scale-95 transition-all cursor-pointer">
                            <i data-lucide="${activeTabSuggestionsFilter ? 'x' : 'filter'}" class="w-3.5 h-3.5"></i>
                            <span>${activeTabSuggestionsFilter ? 'Show All 560+ Ex' : 'Filter Grid to Suggested'}</span>
                        </button>
                    </div>
                </div>

                <!-- Chips Row -->
                <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
                    ${suggestions.map(ex => {
                        const isAssigned = assignedSet.has(normalizeStr(ex.name));
                        const chipClass = isAssigned
                            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-400';

                        return `
                            <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-bold shrink-0 shadow-2xs ${chipClass}">
                                <span>${escapeHtml(ex.name)}</span>
                                ${isAssigned ? `
                                    <span class="text-emerald-600 dark:text-emerald-400 font-black text-[9px]">✓</span>
                                ` : `
                                    <button type="button" onclick="assignLibExerciseToPatient('${ex.region.replace(/'/g, "\\'")}', '${ex.category.replace(/'/g, "\\'")}', '${ex.name.replace(/'/g, "\\'")}')" class="ml-1 px-1.5 py-0.5 rounded-md bg-indigo-600 text-white text-[8px] font-black uppercase hover:bg-indigo-700 cursor-pointer" title="Prescribe to patient">
                                        + Assign
                                    </button>
                                `}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        bar.classList.remove('hidden');
        if (window.lucide) lucide.createIcons({ root: bar });
    }

    async function prescribeAllTabExSuggestions(patientName) {
        const p = (typeof patientLookup !== 'undefined' && patientLookup && patientName) 
            ? patientLookup[patientName] 
            : null;
        if (!p) return;

        const diagnosis = cleanDisplayString(p.diag || p.condition || '');
        if (!diagnosis) return;

        const suggestions = getSuggestedExercisesForDiagnosis(diagnosis);
        if (!suggestions || suggestions.length === 0) return;

        const pid = typeof normId === 'function' ? normId(p.id) : p.id;
        const displayName = (typeof stripSalutation === 'function') ? stripSalutation(p.name || patientName) : patientName;

        let prescribedCount = 0;
        for (const ex of suggestions) {
            const currentPlans = (window.exercisePlans && window.exercisePlans[pid]) ? window.exercisePlans[pid] : [];
            const exists = currentPlans.some(item => normalizeStr(item.name) === normalizeStr(ex.name));
            if (!exists) {
                await window.assignLibExerciseToPatient(ex.region, ex.category, ex.name);
                prescribedCount++;
            }
        }

        renderTabExSuggestions(patientName);
        if (typeof showToast === 'function') {
            showToast(`Prescribed ${prescribedCount} recommended exercises for ${displayName}`, 'success');
        }
    }

    function toggleTabSuggestionsGridFilter() {
        activeTabSuggestionsFilter = !activeTabSuggestionsFilter;
        if (typeof renderExLibraryGrid === 'function') {
            renderExLibraryGrid();
        }
        const select = document.getElementById('ex-tab-patient-select');
        if (select && select.value) {
            renderTabExSuggestions(select.value);
        }
    }

    /* =================================================================
       6. UI COMPONENT: MODAL EXERCISE PLAN AUTO-SUGGESTIONS
       ================================================================= */

    function renderModalPlanSuggestions(patientName) {
        const container = document.getElementById('modal-plan-suggestions-container');
        if (!container) return;

        const p = (typeof patientLookup !== 'undefined' && patientLookup && patientName) 
            ? patientLookup[patientName] 
            : null;

        if (!p) {
            container.innerHTML = '';
            container.classList.add('hidden');
            return;
        }

        const diagnosis = cleanDisplayString(p.diag || p.condition || '');
        if (!diagnosis) {
            container.innerHTML = '';
            container.classList.add('hidden');
            return;
        }

        const suggestions = getSuggestedExercisesForDiagnosis(diagnosis);
        if (!suggestions || suggestions.length === 0) {
            container.innerHTML = '';
            container.classList.add('hidden');
            return;
        }

        const cart = (typeof exCart !== 'undefined' && Array.isArray(exCart)) ? exCart : [];
        const inCartSet = new Set(cart.map(item => normalizeStr(item.name)));

        container.innerHTML = `
            <div class="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-indigo-500/10 to-amber-500/10 border border-emerald-200 dark:border-emerald-800/60 space-y-3 mb-4">
                <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                        <div class="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                            <i data-lucide="sparkles" class="w-4 h-4"></i>
                        </div>
                        <div>
                            <h5 class="text-xs font-black uppercase text-slate-800 dark:text-slate-100">
                                Auto-Suggested for ${escapeHtml(diagnosis)}
                            </h5>
                            <p class="text-[9px] font-bold text-slate-400 uppercase">
                                1-Click add evidence-based routine to cart
                            </p>
                        </div>
                    </div>
                    <button type="button" onclick="ClinicalExerciseRecommender.addAllModalPlanSuggestions('${(p.name || patientName).replace(/'/g, "\\'")}')" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[9px] font-black uppercase tracking-wider flex items-center gap-1 active:scale-95 transition-all cursor-pointer">
                        <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i> Add All to Cart (${suggestions.length})
                    </button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto custom-scroll pr-1">
                    ${suggestions.map(ex => {
                        const inCart = inCartSet.has(normalizeStr(ex.name));
                        const escapedName = ex.name.replace(/'/g, "\\'");
                        const escapedSteps = (ex.steps || '').replace(/'/g, "\\'").replace(/\n/g, "\\n");
                        const escapedVideo = (ex.video || '').replace(/'/g, "\\'");
                        const escapedRegion = ex.region.replace(/'/g, "\\'");
                        const escapedCat = ex.category.replace(/'/g, "\\'");

                        return `
                            <div class="p-2.5 rounded-xl border ${inCart ? 'border-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/40' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'} flex items-center justify-between gap-2 shadow-2xs">
                                <div class="min-w-0 flex-1">
                                    <p class="text-[11px] font-black text-slate-800 dark:text-slate-100 uppercase truncate">${escapeHtml(ex.name)}</p>
                                    <p class="text-[8px] font-bold text-slate-400 uppercase truncate">${escapeHtml(ex.category)}</p>
                                </div>
                                <div class="shrink-0">
                                    ${inCart ? `
                                        <span class="text-[9px] font-black text-emerald-600 uppercase">✓ In Cart</span>
                                    ` : `
                                        <button type="button" onclick="ClinicalExerciseRecommender.addSingleModalPlanSuggestion('${escapedName}', '${escapedSteps}', '${escapedVideo}', '${escapedRegion}', '${escapedCat}')" class="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[9px] font-black uppercase cursor-pointer">
                                            + Add
                                        </button>
                                    `}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        container.classList.remove('hidden');
        if (window.lucide) lucide.createIcons({ root: container });
    }

    function addSingleModalPlanSuggestion(name, steps, video, region, category) {
        if (typeof exCart === 'undefined') window.exCart = [];

        const exists = exCart.some(item => normalizeStr(item.name) === normalizeStr(name));
        if (!exists) {
            exCart.push({
                name: name,
                steps: steps || "",
                video: video || "",
                part: region || "",
                cat: category || ""
            });
        }

        if (typeof renderExerciseCart === 'function') renderExerciseCart();
        const patientName = window.selectedPatientName || '';
        renderModalPlanSuggestions(patientName);
    }

    function addAllModalPlanSuggestions(patientName) {
        const p = (typeof patientLookup !== 'undefined' && patientLookup && patientName) 
            ? patientLookup[patientName] 
            : null;
        if (!p) return;

        const diagnosis = cleanDisplayString(p.diag || p.condition || '');
        if (!diagnosis) return;

        const suggestions = getSuggestedExercisesForDiagnosis(diagnosis);
        if (!suggestions || suggestions.length === 0) return;

        if (typeof exCart === 'undefined') window.exCart = [];

        let addedCount = 0;
        suggestions.forEach(ex => {
            const exists = exCart.some(item => normalizeStr(item.name) === normalizeStr(ex.name));
            if (!exists) {
                exCart.push({
                    name: ex.name,
                    steps: ex.steps || "",
                    video: ex.video || "",
                    part: ex.region || "",
                    cat: ex.category || ""
                });
                addedCount++;
            }
        });

        if (typeof renderExerciseCart === 'function') renderExerciseCart();
        renderModalPlanSuggestions(patientName);

        if (typeof showToast === 'function') {
            showToast(`Added ${addedCount} exercises to cart for ${diagnosis}`, 'success');
        }
    }

    /* =================================================================
       7. HTML ESCAPE HELPER
       ================================================================= */

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /* =================================================================
       8. AUTOMATIC EVENT HOOKS & SYSTEM INTEGRATION
       ================================================================= */

    function initHooks() {
        // 1. Hook into Patient Enrollment Diagnosis field
        const diagInput = document.getElementById('en-condition');
        if (diagInput) {
            diagInput.addEventListener('input', function () {
                renderEnrollHepSuggestions(this.value);
            });
            diagInput.addEventListener('change', function () {
                renderEnrollHepSuggestions(this.value);
            });
        }

        // 2. Intercept onExTabPatientChange to render suggestions in tab-exercises
        const origOnExTabChange = window.onExTabPatientChange;
        window.onExTabPatientChange = function (patientName) {
            if (typeof origOnExTabChange === 'function') {
                origOnExTabChange(patientName);
            }
            renderTabExSuggestions(patientName);
        };

        // 3. Intercept openExercisePlanModal to render suggestions in modal
        const origOpenExercisePlanModal = window.openExercisePlanModal;
        window.openExercisePlanModal = function (patientName) {
            if (typeof origOpenExercisePlanModal === 'function') {
                origOpenExercisePlanModal(patientName);
            }
            setTimeout(() => {
                renderModalPlanSuggestions(patientName);
            }, 50);
        };

        // 4. Intercept renderExLibraryGrid to filter if activeTabSuggestionsFilter is ON
        const origRenderExLibraryGrid = window.renderExLibraryGrid;
        window.renderExLibraryGrid = function () {
            if (activeTabSuggestionsFilter) {
                renderFilteredSuggestionsGrid();
            } else {
                if (typeof origRenderExLibraryGrid === 'function') {
                    origRenderExLibraryGrid();
                }
            }
        };

        // Initial render for current enrollment input if any
        if (diagInput && diagInput.value) {
            renderEnrollHepSuggestions(diagInput.value);
        } else {
            renderEnrollHepSuggestions('');
        }
    }

    function renderFilteredSuggestionsGrid() {
        const grid = document.getElementById('ex-lib-grid');
        const countLabel = document.getElementById('ex-lib-results-count');
        if (!grid) return;

        const select = document.getElementById('ex-tab-patient-select');
        const patientName = select ? select.value : '';
        const p = (typeof patientLookup !== 'undefined' && patientLookup && patientName) 
            ? patientLookup[patientName] 
            : null;

        if (!p) {
            activeTabSuggestionsFilter = false;
            if (typeof renderExLibraryGrid === 'function') renderExLibraryGrid();
            return;
        }

        const diagnosis = cleanDisplayString(p.diag || p.condition || '');
        const suggestions = getSuggestedExercisesForDiagnosis(diagnosis);

        const pid = typeof normId === 'function' ? normId(p.id) : p.id;
        const assignedPlans = (window.exercisePlans && window.exercisePlans[pid]) ? window.exercisePlans[pid] : [];
        const assignedNamesSet = new Set(assignedPlans.map(item => normalizeStr(item.name)));

        if (countLabel) {
            countLabel.innerHTML = `Showing ${suggestions.length} Auto-Suggested Exercises for <strong>${escapeHtml(diagnosis)}</strong>`;
        }

        if (!suggestions.length) {
            grid.innerHTML = `
                <div class="col-span-full p-8 glass-card rounded-3xl text-center">
                    <p class="text-xs text-slate-500">No specific exercises found for "${escapeHtml(diagnosis)}".</p>
                    <button onclick="ClinicalExerciseRecommender.toggleTabSuggestionsGridFilter()" class="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">
                        Show Full Library
                    </button>
                </div>
            `;
            return;
        }

        grid.innerHTML = suggestions.map(ex => {
            const isAssigned = assignedNamesSet.has(normalizeStr(ex.name));
            const cardBorderClass = isAssigned 
                ? 'border-emerald-300 bg-emerald-50/20 shadow-sm' 
                : 'border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-indigo-200';

            return `
                <div class="glass-card p-5 rounded-3xl border ${cardBorderClass} flex flex-col justify-between transition-all group">
                    <div class="space-y-3">
                        <div class="flex items-center justify-between gap-2 flex-wrap">
                            <span class="text-[8px] font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 truncate max-w-[170px]">
                                ✨ Suggested: ${escapeHtml(ex.category)}
                            </span>
                            <span class="text-[8px] font-bold uppercase px-2 py-0.5 rounded-md bg-amber-50 text-amber-700">
                                ${escapeHtml(ex.setsReps)}
                            </span>
                        </div>

                        <div>
                            <h5 class="font-black text-slate-800 text-sm md:text-base leading-tight group-hover:text-indigo-600 transition-colors">
                                ${escapeHtml(ex.name)}
                            </h5>
                            <p class="text-[10px] text-slate-500 mt-1 font-medium italic">
                                🎯 ${escapeHtml(ex.rationale)}
                            </p>
                        </div>

                        ${ex.steps ? `
                        <div class="p-3 bg-slate-50/80 rounded-2xl border border-slate-100/80 text-[11px] text-slate-600 leading-relaxed font-medium whitespace-pre-line max-h-36 overflow-y-auto custom-scroll">
                            ${escapeHtml(ex.steps)}
                        </div>` : ''}
                    </div>

                    <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <span class="text-[9px] font-bold text-slate-400 uppercase">${escapeHtml(ex.frequency)}</span>
                        <div>
                            ${isAssigned ? `
                                <span class="px-2.5 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl text-[10px] font-black uppercase flex items-center gap-1 shadow-sm">
                                    <i data-lucide="check" class="w-3 h-3 text-emerald-600"></i> Prescribed
                                </span>
                            ` : `
                                <button data-ex-region="${escapeHtml(ex.region)}" data-ex-cat="${escapeHtml(ex.category)}" data-ex-name="${escapeHtml(ex.name)}" onclick="handleAssignBtnClick(this)" class="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all cursor-pointer">
                                    <i data-lucide="plus" class="w-3.5 h-3.5"></i> Assign
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        if (window.lucide) lucide.createIcons({ root: grid });
    }

    /* =================================================================
       9. PUBLIC GLOBAL API
       ================================================================= */

    window.ClinicalExerciseRecommender = {
        protocols: CLINICAL_PROTOCOLS,
        getSuggestedExercises: getSuggestedExercisesForDiagnosis,
        resolveLibraryExercise: resolveLibraryExercise,
        renderEnrollHepSuggestions: renderEnrollHepSuggestions,
        setEnrollPage: setEnrollPage,
        addCurrentPageEnrollHepSuggestions: addCurrentPageEnrollHepSuggestions,
        addSingleEnrollHepSuggestion: addSingleEnrollHepSuggestion,
        addAllEnrollHepSuggestions: addAllEnrollHepSuggestions,
        setEnrollDiagnosis: setEnrollDiagnosis,
        renderTabExSuggestions: renderTabExSuggestions,
        prescribeAllTabExSuggestions: prescribeAllTabExSuggestions,
        toggleTabSuggestionsGridFilter: toggleTabSuggestionsGridFilter,
        renderModalPlanSuggestions: renderModalPlanSuggestions,
        addSingleModalPlanSuggestion: addSingleModalPlanSuggestion,
        addAllModalPlanSuggestions: addAllModalPlanSuggestions,
        init: initHooks
    };

    // Auto-start on load
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initHooks);
    } else {
        setTimeout(initHooks, 100);
    }

})();
