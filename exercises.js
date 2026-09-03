
// exercises.js - Comprehensive Clinical Rehabilitation Database 
const EXERCISE_LIBRARY = {

    // ============================================================
    // 1. CERVICAL SPINE, HEAD & JAW (Expanded - 60+ Exercises)
    // ============================================================
    "Cervical & Upper Back": {
        "Acute Mobility & Range of Motion": [
            { name: "Active Cervical Rotation", steps: "1. Sit tall.\n2. Slowly turn head to the right as far as pain allows.\n3. Return to center, then left.\n4. Repeat 10 times.", video: "" },
            { name: "Cervical Lateral Flexion", steps: "1. Tilt ear toward shoulder without lifting the shoulder.\n2. Hold 2 seconds.\n3. Repeat 10 times each side.", video: "" },
            { name: "Cervical Flexion (Chin to Chest)", steps: "1. Gently lower chin to chest.\n2. Feel a pull at the back of the neck.\n3. Hold 5 seconds.\n4. Repeat 10 times.", video: "" },
            { name: "Cervical Extension (Looking Up)", steps: "1. Slowly look up toward the ceiling.\n2. Do not pinch the back of the neck.\n3. Repeat 10 times.", video: "" },
            { name: "Rotation with Overpressure", steps: "1. Turn head to the right.\n2. Use your hand to gently push the jaw 1 inch further.\n3. Hold 2 seconds.\n4. Repeat 5 times each side.", video: "" },
            { name: "Side Bend with Overpressure", steps: "1. Tilt ear to shoulder.\n2. Use hand on opposite temple to gently increase the stretch.\n3. Hold 5 seconds.\n4. Repeat 5 times.", video: "" },
            { name: "Cervical Protraction (Chicken Neck)", steps: "1. Push your chin forward as far as possible.\n2. Hold 2 seconds.\n3. This prepares the neck for retraction exercises.", video: "" },
            { name: "Diagonal Neck Flexion", steps: "1. Look down and toward your right hip.\n2. Repeat 10 times.\n3. Repeat toward the left hip.", video: "" },
            { name: "Passive Neck Rotation (Lying Down)", steps: "1. Lie on your back.\n2. Use your hands to gently turn your head side to side, keeping muscles relaxed.", video: "" },
            { name: "Neck 'No-No' (Small Range)", steps: "1. Rapidly but gently shake head 'no' in a 10-degree range.\n2. Helps with joint lubrication.", video: "" }
        ],
        "Deep Neck Flexor (DNF) & Stability": [
            { name: "Supine Chin Tuck (The Nod)", steps: "1. Lie on back, no pillow.\n2. Perform a small 'nod' as if saying yes.\n3. Keep the large front neck muscles relaxed.\n4. Hold 10 seconds. Repeat 10 times.", video: "" },
            { name: "DNF Lift-Off", steps: "1. Perform a chin tuck.\n2. Lift the back of the head 1 inch off the floor.\n3. Do not let the chin poke up.\n4. Hold 5 seconds. Repeat 10 times.", video: "" },
            { name: "Seated Chin Tuck with Finger Cue", steps: "1. Place finger on chin.\n2. Pull chin away from finger.\n3. Hold 5 seconds. Repeat 15 times.", video: "" },
            { name: "Wall-Supported Chin Tuck", steps: "1. Stand with back against wall.\n2. Tuck chin to touch the back of your neck to the wall.\n3. Hold 10 seconds.", video: "" },
            { name: "DNF Endurance (Towel Roll)", steps: "1. Lie on back with a small towel roll under the neck curve.\n2. Gently flatten the towel using only deep muscles.\n3. Hold for 30 seconds.", video: "" },
            { name: "Quadruped Chin Tucks", steps: "1. On hands and knees.\n2. Let head hang, then pull chin back to bring head in line with spine.\n3. Hold 5 seconds.", video: "" },
            { name: "Prone Cobra (Cervical Focus)", steps: "1. Lie face down.\n2. Tuck chin and lift chest slightly.\n3. Focus on keeping the neck long.\n4. Repeat 10 times.", video: "" },
            { name: "Supine Head Rotations (Tucked)", steps: "1. Lie on back, perform chin tuck.\n2. Maintaining the tuck, rotate head 20 degrees side to side.\n3. Repeat 20 times.", video: "" },
            { name: "Bent Over 'I' Raises", steps: "1. Hinge at hips, head in neutral.\n2. Raise arms straight forward while keeping chin tucked.\n3. Hold 3 seconds.", video: "" },
            { name: "Standing Chin Tuck with Band Resistance", steps: "1. Loop band behind head, hold ends in front.\n2. Tuck chin back against the band's resistance.\n3. Repeat 15 times.", video: "" }
        ],
        "Cervical Strength & Isometrics": [
            { name: "Isometric Flexion (Forward)", steps: "1. Place palm on forehead.\n2. Push head forward into hand; resist all movement.\n3. Hold 5 seconds. Repeat 10 times.", video: "" },
            { name: "Isometric Extension (Backward)", steps: "1. Place hands behind head.\n2. Push head back into hands; resist all movement.\n3. Hold 5 seconds. Repeat 10 times.", video: "" },
            { name: "Isometric Side Bend (Right)", steps: "1. Place right hand on right temple.\n2. Push head right; resist with hand.\n3. Hold 5 seconds.", video: "" },
            { name: "Isometric Side Bend (Left)", steps: "1. Place left hand on left temple.\n2. Push head left; resist with hand.\n3. Hold 5 seconds.", video: "" },
            { name: "Isometric Rotation (Right)", steps: "1. Place hand on right side of jaw.\n2. Try to turn head right; resist with hand.\n3. Hold 5 seconds.", video: "" },
            { name: "Isometric Rotation (Left)", steps: "1. Place hand on left side of jaw.\n2. Try to turn head left; resist with hand.\n3. Hold 5 seconds.", video: "" },
            { name: "Multi-Angle Isometrics", steps: "1. Turn head 45 degrees.\n2. Apply resistance in that position.\n3. Repeat in various angles.", video: "" },
            { name: "Band Resisted Neck Rotation", steps: "1. Wrap band around head, anchor to a door.\n2. Slowly rotate head away from the anchor.\n3. Return slowly. Repeat 12 times.", video: "" },
            { name: "Prone Neck Extension (Gravity)", steps: "1. Lie face down at the edge of the bed.\n2. Slowly lift head to neutral.\n3. Hold 5 seconds. Repeat 15 times.", video: "" },
            { name: "Side-Lying Neck Flexion", steps: "1. Lie on your side.\n2. Lift head toward the shoulder.\n3. Repeat 12 times each side.", video: "" }
        ],
        "Postural & Scapular Integration": [
            { name: "Brugger’s Relief Position", steps: "1. Sit at edge of chair, feet wide.\n2. Turn palms out, squeeze shoulder blades, tuck chin.\n3. Take 3 deep breaths. Repeat hourly.", video: "" },
            { name: "Wall Angels", steps: "1. Back against wall.\n2. Slide arms up and down in 'W' and 'Y' shapes.\n3. Keep neck flat against wall.", video: "" },
            { name: "Scapular Squeezes (Downward)", steps: "1. Squeeze blades together and down toward back pockets.\n2. Hold 5 seconds. Repeat 15 times.", video: "" },
            { name: "Serratus Wall Slides", steps: "1. Forearms on wall.\n2. Slide arms up while pushing away from the wall.\n3. Repeat 12 times.", video: "" },
            { name: "Prone 'T' Raises", steps: "1. Lie face down, arms at sides.\n2. Lift arms and squeeze shoulder blades.\n3. Keep chin tucked.", video: "" },
            { name: "Prone 'Y' Raises", steps: "1. Arms overhead in Y shape.\n2. Lift arms, focus on lower traps.\n3. Keep chin tucked.", video: "" },
            { name: "Reverse Fly with Band", steps: "1. Hold band in front.\n2. Pull arms out to sides, squeezing blades.\n3. Maintain chin tuck.", video: "" },
            { name: "Chin Tuck with Row", steps: "1. Perform a row with a resistance band.\n2. Simultaneously perform a chin tuck as you pull.", video: "" },
            { name: "Doorway Chest Stretch", steps: "1. Arms on door frame.\n2. Step forward to stretch chest.\n3. Keep head neutral.", video: "" },
            { name: "Upper Trap Stretch (Active)", steps: "1. Hold the bottom of your chair with right hand.\n2. Tilt head to the left.\n3. Repeat 3 times.", video: "" }
        ],
        "Nerve Glides & Headaches": [
            { name: "Median Nerve Slider", steps: "1. Arm out to side, palm up.\n2. Tilt head toward hand while bending wrist back.\n3. Tilt head away while straightening wrist.\n4. Repeat 15 times.", video: "" },
            { name: "Ulnar Nerve Slider", steps: "1. Hand in 'okay' sign, bring to eye like a mask.\n2. Tilt head toward arm, then away.\n3. Repeat 15 times.", video: "" },
            { name: "Radial Nerve Slider", steps: "1. Arm at side, palm back.\n2. Flex wrist and tilt head away.\n3. Relax and repeat 15 times.", video: "" },
            { name: "Suboccipital Self-Release", steps: "1. Two tennis balls in a sock.\n2. Lie on them at the base of the skull.\n3. Perform tiny 'nodding' movements for 2 minutes.", video: "" },
            { name: "C1-C2 Self-SNAG", steps: "1. Edge of towel on C1 vertebra.\n2. Pull towel forward while rotating head.\n3. Repeat 5 times.", video: "" },
            { name: "Temporal Pressure Release", steps: "1. Use knuckles to gently massage temples for 60 seconds.", video: "" },
            { name: "Scalene Stretch", steps: "1. Anchor collarbone with hand.\n2. Tilt head back and away.\n3. Hold 30 seconds.", video: "" },
            { name: "Sternocleidomastoid (SCM) Stretch", steps: "1. Rotate head right, tilt head back.\n2. Hold 20 seconds. Repeat left.", video: "" },
            { name: "Jaw Opening (Resisted)", steps: "1. Thumb under chin.\n2. Open mouth against light pressure.\n3. Relieves tension in upper neck.", video: "" },
            { name: "Tongue Roof Clicks", steps: "1. Click tongue on roof of mouth.\n2. Promotes proper jaw/neck resting position.", video: "" }
        ],
        "Advanced & Dynamic Stability": [
            { name: "Laser Pointer Drills (Imaginary)", steps: "1. Imagine a laser on your nose.\n2. Trace the alphabet on the wall with your head movements.\n3. Move slowly and precisely.", video: "" },
            { name: "Cervical Clock Drills", steps: "1. Move head to 12, 6, 3, and 9 o'clock positions.\n2. Return to center each time.\n3. Repeat 5 cycles.", video: "" },
            { name: "Eyes Closed Stabilization", steps: "1. Perform a chin tuck.\n2. Close eyes and maintain position for 30 seconds.", video: "" },
            { name: "Walking Chin Tucks", steps: "1. Maintain a chin tuck while walking 50 feet.\n2. Focus on not letting the head bounce.", video: "" },
            { name: "Reactive Stabilization", steps: "1. Have a partner gently tap your head in different directions.\n2. Resist the taps to keep your head still.", video: "" },
            { name: "Towel Resistance Rotation", steps: "1. Wrap towel around head.\n2. Pull right end while trying to turn head left.\n3. Repeat 10 times.", video: "" },
            { name: "Single Leg Balance with Head Turns", steps: "1. Stand on one leg.\n2. Slowly turn head side to side.\n3. Challenges neck proprioception.", video: "" },
            { name: "Prone Head Lifts (3-Way)", steps: "1. Lie face down.\n2. Lift head in neutral, then rotated right, then rotated left.\n3. Repeat 10 times each.", video: "" },
            { name: "Cervical Perturbation (Self)", steps: "1. Hold a light weight at arm's length.\n2. Shake the weight gently while keeping neck perfectly still.", video: "" },
            { name: "Floor Slides (Cervical Focus)", steps: "1. Lie on back, arms in 'goal post'.\n2. Slide arms up while keeping the entire neck and spine flat on the floor.", video: "" }
        ]
    },
    "Shoulder Rehabilitation": {
        "1. Early Mobility (Stiff / Frozen Shoulder)": [
            { name: "Arm Pendulum (Circles)", steps: "1. Lean on a table with your good arm.\n2. Let your painful arm hang straight down like a rag.\n3. Gently swing your arm in small circles.\n4. Do 20 circles each way.", video: "" },
            { name: "Arm Pendulum (Side-to-Side)", steps: "1. Lean on a table for support.\n2. Let your arm hang freely.\n3. Swing it gently like a clock pendulum from side to side.\n4. Repeat 20 times.", video: "" },
            { name: "Forward Wall Crawl", steps: "1. Stand facing a wall.\n2. Use your fingers to 'walk' slowly up the wall as high as you can.\n3. Hold for 5 seconds.\n4. Walk them back down.", video: "" },
            { name: "Side Wall Crawl", steps: "1. Stand sideways to a wall.\n2. Walk your fingers up the side of the wall.\n3. Reach until you feel a gentle pull.\n4. Repeat 10 times.", video: "" },
            { name: "Table Slide (Forward)", steps: "1. Sit at a table with a cloth under your hand.\n2. Slide your hand forward as far as possible.\n3. Lean your chest down slightly for a deeper stretch.\n4. Repeat 15 times.", video: "" },
            { name: "Table Slide (Side)", steps: "1. Sit sideways at a table.\n2. Slide your arm out to the side away from your body.\n3. Hold for 5 seconds.\n4. Repeat 15 times.", video: "" },
            { name: "Shoulder Shrugs", steps: "1. Stand with arms at your sides.\n2. Lift both shoulders up toward your ears.\n3. Squeeze for 2 seconds.\n4. Relax. Repeat 15 times.", video: "" },
            { name: "Shoulder Rolls (Backward)", steps: "1. Sit or stand tall.\n2. Roll your shoulders in a large backward circle.\n3. Focus on opening up your chest.\n4. Repeat 15 times.", video: "" },
            { name: "Shoulder Rolls (Forward)", steps: "1. Roll your shoulders in a large forward circle.\n2. Focus on moving your shoulder blades.\n3. Repeat 15 times.", video: "" },
            { name: "Doorway Lean", steps: "1. Stand in a doorway with both hands on the frame.\n2. Gently lean your body forward until you feel a stretch in the front of your shoulders.\n3. Hold for 20 seconds.", video: "" }
        ],

        "2. Stick & Towel Assisted Exercises": [
            { name: "Stick Lift (Forward)", steps: "1. Hold a stick or broom handle with both hands.\n2. Use your good arm to help lift the painful arm overhead.\n3. Keep your elbows straight.\n4. Repeat 15 times.", video: "" },
            { name: "Stick Push (Side)", steps: "1. Hold the stick in front of you.\n2. Use your good arm to push the painful arm out to the side.\n3. Keep your painful arm relaxed.\n4. Repeat 15 times.", video: "" },
            { name: "Stick Rotation (Outward)", steps: "1. Hold a stick with elbows bent at 90 degrees and tucked at your sides.\n2. Use the good arm to push the painful hand outward.\n3. Keep the elbow pinned to your ribcage.\n4. Repeat 15 times.", video: "" },
            { name: "Stick Rotation (Inward)", steps: "1. Hold a stick behind your back.\n2. Use the good arm to pull the painful arm across your lower back.\n3. Repeat 15 times.", video: "" },
            { name: "Stick Lift (Backward)", steps: "1. Hold a stick behind your back with both hands.\n2. Gently lift the stick away from your body backward.\n3. Hold for 2 seconds and repeat 12 times.", video: "" },
            { name: "Towel Pull (Up Back)", steps: "1. Hold a towel over your good shoulder.\n2. Grasp the bottom of the towel behind your back with the painful arm.\n3. Pull upward with the top hand.\n4. Hold for 10 seconds.", video: "" },
            { name: "Towel Pull (Across Shoulder)", steps: "1. Hold a towel across your back like you are drying yourself.\n2. Pull the towel back and forth to move the shoulder joint.\n3. Repeat for 1 minute.", video: "" },
            { name: "Sleeping Stick Push", steps: "1. Lie on your back with arm out at shoulder height, elbow bent.\n2. Use a stick to gently push the hand toward the floor (downward).\n3. Repeat 10 times.", video: "" },
            { name: "Stick Arch (Overhead)", steps: "1. Lie on your back holding a stick.\n2. Lift the stick in a large arching motion from your hips to over your head.\n3. Repeat 15 times.", video: "" },
            { name: "Stick Side-Bend", steps: "1. Hold a stick overhead with both hands.\n2. Gently bend your body to the right, then to the left.\n3. Feel the stretch down your sides and shoulders.\n4. Repeat 10 times.", video: "" }
        ],

        "3. Isometric Strengthening (No Movement)": [
            { name: "Doorway Push (Outward)", steps: "1. Stand in a doorway, elbow bent at 90 degrees.\n2. Push the back of your wrist into the door frame.\n3. Push firmly but don't move your body.\n4. Hold 5 seconds. Repeat 10 times.", video: "" },
            { name: "Doorway Push (Inward)", steps: "1. Stand in a doorway, elbow bent.\n2. Push your palm into the door frame (toward your belly).\n3. Hold 5 seconds.\n4. Repeat 10 times.", video: "" },
            { name: "Wall Push (Forward)", steps: "1. Face a wall with your fist pressed against it.\n2. Push your arm forward into the wall.\n3. Hold 5 seconds.\n4. Repeat 10 times.", video: "" },
            { name: "Wall Push (Backward)", steps: "1. Stand with your back to a wall, elbow bent.\n2. Push your elbow backward into the wall.\n3. Hold 5 seconds.\n4. Repeat 10 times.", video: "" },
            { name: "Wall Push (Side)", steps: "1. Stand sideways to a wall.\n2. Push the outside of your arm into the wall as if lifting it sideways.\n3. Hold 5 seconds.\n4. Repeat 10 times.", video: "" },
            { name: "Palm Press (Front)", steps: "1. Place your hands together in front of your chest (prayer position).\n2. Press your palms together firmly.\n3. Hold for 5 seconds.\n4. Repeat 10 times.", video: "" },
            { name: "Fist Press (Under Arm)", steps: "1. Place your fist under the armpit of the opposite arm.\n2. Press your arm down into your fist.\n3. Hold 5 seconds.\n4. Repeat 10 times.", video: "" },
            { name: "Corner Blade Squeeze", steps: "1. Stand in a corner with your back to it.\n2. Press your shoulder blades into the corner walls.\n3. Hold 5 seconds.\n4. Repeat 10 times.", video: "" },
            { name: "Elbow Press (Downwards)", steps: "1. Sit in a chair with armrests.\n2. Press your elbows down into the armrests as if trying to lift yourself up.\n3. Hold 5 seconds. Repeat 10 times.", video: "" },
            { name: "Shoulder Blade Hold", steps: "1. Pinch your shoulder blades together.\n2. Hold as tight as you can for 10 seconds.\n3. Relax.\n4. Repeat 10 times.", video: "" }
        ],

        "4. Rotator Cuff & Strength (Bands/Weights)": [
            { name: "Band Pull (Outward)", steps: "1. Hold a resistance band with elbows bent at 90 degrees.\n2. Rotate your hands outward while keeping elbows at your sides.\n3. Repeat 15 times.", video: "" },
            { name: "Band Pull (Inward)", steps: "1. Anchor a band to a door.\n2. Pull the band across your belly toward your opposite hip.\n3. Repeat 15 times.", video: "" },
            { name: "Band Row (Elbows Back)", steps: "1. Anchor a band in front of you.\n2. Pull the band toward your ribs, squeezing your shoulder blades.\n3. Repeat 15 times.", video: "" },
            { name: "Band Pull-Apart (T)", steps: "1. Hold a band in front of you with straight arms.\n2. Pull your hands out to your sides to form a 'T'.\n3. Repeat 12 times.", video: "" },
            { name: "The 'Sword' Draw", steps: "1. Step on one end of a band.\n2. Reach across your body and pull the band up and out (like drawing a sword).\n3. Repeat 12 times.", video: "" },
            { name: "Thumb-Up Front Lift", steps: "1. Hold a light weight or water bottle at your side.\n2. With your thumb pointing up, lift your arm straight in front to shoulder height.\n3. Repeat 15 times.", video: "" },
            { name: "Thumb-Up Side Lift", steps: "1. Lift your arm straight out to the side to shoulder height.\n2. Keep your thumb pointing up.\n3. Repeat 15 times.", video: "" },
            { name: "Scaption (45-Degree Lift)", steps: "1. Lift your arm halfway between the front and the side.\n2. Keep your thumb up.\n3. Repeat 15 times.", video: "" },
            { name: "Side-Lying External Rotation", steps: "1. Lie on your side with the painful arm on top.\n2. Rotate your hand toward the ceiling while keeping your elbow on your side.\n3. Repeat 15 times.", video: "" },
            { name: "Punches (Toward Ceiling)", steps: "1. Lie on your back holding a light weight.\n2. Punch your arm straight up toward the ceiling.\n3. Reach extra high to lift the shoulder blade.\n4. Repeat 20 times.", video: "" },
            { name: "Face Pulls", steps: "1. Anchor a band at eye level.\n2. Pull the band toward your forehead, pulling your elbows out wide.\n3. Repeat 15 times.", video: "" },
            { name: "Internal Rotation (Lying Down)", steps: "1. Lie on your painful side.\n2. Bend your elbow and pull a light weight up toward your belly.\n3. Repeat 15 times.", video: "" },
            { name: "Band Pull Down", steps: "1. Anchor a band high up.\n2. Pull your arm down to your side with a straight elbow.\n3. Repeat 15 times.", video: "" },
            { name: "Bicep Curl (Shoulder Supported)", steps: "1. Sit and rest your elbow on your knee.\n2. Curl a weight toward your shoulder.\n3. Repeat 15 times.", video: "" },
            { name: "Reverse Fly (Bent Over)", steps: "1. Lean forward at the waist.\n2. Lift your arms out to the sides like wings.\n3. Repeat 12 times.", video: "" }
        ],

        "5. Scapular & Posture Stability": [
            { name: "Wall Angels", steps: "1. Stand with back, elbows, and wrists against a wall.\n2. Slowly slide your arms up and down like a snow angel.\n3. Repeat 10 times.", video: "" },
            { name: "Floor Angels", steps: "1. Lie on your back on the floor.\n2. Slide your arms along the floor over your head and back down.\n3. Repeat 10 times.", video: "" },
            { name: "Forearm Wall Slides", steps: "1. Place your forearms on the wall.\n2. Slide them up the wall while keeping your shoulder blades down.\n3. Repeat 12 times.", video: "" },
            { name: "Prone 'Y' Lift", steps: "1. Lie face down on a bed with arms overhead in a 'Y' shape.\n2. Lift your arms toward the ceiling.\n3. Repeat 12 times.", video: "" },
            { name: "Prone 'T' Lift", steps: "1. Lie face down with arms out to the sides.\n2. Lift your arms and squeeze your shoulder blades together.\n3. Repeat 12 times.", video: "" },
            { name: "Prone 'I' Lift", steps: "1. Lie face down with arms at your sides.\n2. Lift your arms toward the ceiling.\n3. Repeat 12 times.", video: "" },
            { name: "W-Squeeze", steps: "1. Stand with arms bent so they look like a 'W'.\n2. Squeeze your shoulder blades back and down.\n3. Repeat 15 times.", video: "" },
            { name: "Wall Push-Up", steps: "1. Place your hands on a wall.\n2. Do a push-up against the wall.\n3. Focus on keeping your shoulders stable.\n4. Repeat 15 times.", video: "" },
            { name: "Scapular Push-Up", steps: "1. Get on your hands and knees.\n2. Without bending your elbows, let your chest sink, then push your back up.\n3. Repeat 15 times.", video: "" },
            { name: "Plank with Shoulder Taps", steps: "1. Hold a push-up position.\n2. Lift one hand and tap the opposite shoulder.\n3. Try not to let your hips wiggle. Repeat 10 times each side.", video: "" }
        ],

        "6. Stretches & Flexibility": [
            { name: "Across the Chest Stretch", steps: "1. Pull your arm across your chest.\n2. Hold it with the other hand.\n3. Hold for 30 seconds.", video: "" },
            { name: "Doorway Chest Stretch", steps: "1. Place your forearm on a door frame.\n2. Turn your body away from the arm.\n3. Hold for 30 seconds.", video: "" },
            { name: "Tricep Stretch", steps: "1. Reach your hand behind your neck.\n2. Use the other hand to push the elbow down.\n3. Hold for 30 seconds.", video: "" },
            { name: "Sleeper Stretch", steps: "1. Lie on your painful side.\n2. Bend your elbow to 90 degrees.\n3. Gently push your hand down toward the floor.\n4. Hold 20 seconds.", video: "" },
            { name: "Wall Hand Rotation", steps: "1. Place your palm flat on a wall behind you.\n2. Slowly rotate your chest away from the wall.\n3. Hold 30 seconds.", video: "" }
        ]
    },
    "Elbow, Wrist & Hand": {

        "1. Tennis Elbow (Outer Elbow Pain)": [
            { name: "Wrist Stretch (Palm Down)", steps: "1. Straighten your arm with your palm facing the floor.\n2. Use your other hand to gently pull your fingers down.\n3. Hold for 30 seconds.\n4. Repeat 3 times.", video: "" },
            { name: "Wrist Extensor Strengthening", steps: "1. Rest your forearm on a table, hand hanging off the edge.\n2. Palm faces down. Hold a light water bottle.\n3. Lift the hand up, then lower it slowly.\n4. Repeat 15 times.", video: "" },
            { name: "The 'Slow Lowering' (Eccentric)", steps: "1. Use your good hand to lift your painful hand up.\n2. Let go and use the painful hand to lower the weight very slowly (3 seconds).\n3. Repeat 15 times.", video: "" },
            { name: "Towel Wring", steps: "1. Hold a rolled-up towel with both hands.\n2. Twist the towel as if wringing out water.\n3. Repeat 10 times in each direction.", video: "" },
            { name: "Hammer Rotations", steps: "1. Hold a hammer or a heavy tool by the handle.\n2. Slowly rotate your forearm so the palm faces up, then down.\n3. Repeat 15 times.", video: "" },
            { name: "Fist Squeeze", steps: "1. Make a tight fist and squeeze.\n2. Hold for 5 seconds.\n3. Relax and spread fingers wide. Repeat 15 times.", video: "" },
            { name: "Table Press (Palm Down)", steps: "1. Place your palm flat on a table.\n2. Press down firmly without moving your arm.\n3. Hold 5 seconds. Repeat 10 times.", video: "" },
            { name: "Finger Extensions (Band)", steps: "1. Put a rubber band around your fingers and thumb.\n2. Spread your fingers wide against the band.\n3. Repeat 20 times.", video: "" },
            { name: "Elbow Bend & Straighten", steps: "1. Sit tall.\n2. Touch your shoulder with your hand, then straighten your arm fully.\n3. Repeat 20 times.", video: "" },
            { name: "Wrist Circles (Weighted)", steps: "1. Hold a small weight.\n2. Slowly draw circles with your wrist.\n3. 10 circles clockwise, 10 counter-clockwise.", video: "" }
        ],

        "2. Golfer's Elbow (Inner Elbow Pain)": [
            { name: "Wrist Stretch (Palm Up)", steps: "1. Straighten your arm with your palm facing the ceiling.\n2. Pull your fingers down toward the floor.\n3. Hold for 30 seconds.", video: "" },
            { name: "Wrist Flexion (Palm Up)", steps: "1. Rest your arm on a table, palm facing up.\n2. Hold a weight and curl your wrist toward you.\n3. Lower slowly. Repeat 15 times.", video: "" },
            { name: "Squeeze a Ball", steps: "1. Hold a tennis ball or soft stress ball.\n2. Squeeze as hard as you can without pain.\n3. Hold 5 seconds. Repeat 20 times.", video: "" },
            { name: "Reverse Towel Wring", steps: "1. Hold a towel.\n2. Twist it using only your wrists in a backward motion.\n3. Repeat 15 times.", video: "" },
            { name: "Finger Curls", steps: "1. Rest your hand on a table, palm up.\n2. Use your fingers to 'curl' a small weight into your palm.\n3. Repeat 15 times.", video: "" },
            { name: "Forearm Side-to-Side", steps: "1. Hold a weight vertically (like a microphone).\n2. Tilt the weight toward your thumb, then toward your pinky.\n3. Repeat 15 times.", video: "" },
            { name: "Isometric Wrist Hold", steps: "1. Hold a weight with your wrist straight.\n2. Hold it still for 30 seconds without letting it drop.\n3. Repeat 3 times.", video: "" },
            { name: "Palm Press (Prayer)", steps: "1. Place palms together.\n2. Press hands against each other firmly.\n3. Hold 10 seconds. Repeat 5 times.", video: "" }
        ],

        "3. Carpal Tunnel & Nerve Health (Numbness)": [
            { name: "Wrist Flicks", steps: "1. Act as if you are flicking water off your hands.\n2. Do this quickly for 30 seconds.", video: "" },
            { name: "The 'Okay' Nerve Slide", steps: "1. Make an 'Okay' sign with your thumb and index finger.\n2. Flip your hand and bring it toward your eye like a mask.\n3. Straighten your arm out. Repeat 15 times.", video: "" },
            { name: "Median Nerve Glides (5 Steps)", steps: "1. Make a fist. 2. Straighten fingers. 3. Bend wrist back. 4. Turn palm up. 5. Pull thumb away.\n6. Hold each position 3 seconds. Repeat 10 times.", video: "" },
            { name: "Tendon Glides (The Hook)", steps: "1. Bend only the top two joints of your fingers to make a 'hook'.\n2. Straighten. Repeat 15 times.", video: "" },
            { name: "Tendon Glides (The Tabletop)", steps: "1. Bend your fingers at the knuckles so they are flat like a table.\n2. Straighten. Repeat 15 times.", video: "" },
            { name: "Tendon Glides (Full Fist)", steps: "1. Make a tight fist with the thumb on the outside.\n2. Open wide. Repeat 15 times.", video: "" },
            { name: "Finger Spreads", steps: "1. Place hand flat on a table.\n2. Spread fingers as wide as possible, then touch them together.\n3. Repeat 20 times.", video: "" },
            { name: "Wall Nerve Stretch", steps: "1. Place your palm flat on a wall with fingers pointing back.\n2. Gently turn your head away from the wall.\n3. Hold 15 seconds.", video: "" }
        ],

        "4. Wrist Pain & Sprains": [
            { name: "Prayer Stretch", steps: "1. Palms together at chest level.\n2. Slowly lower your hands toward your belly.\n3. Hold 30 seconds.", video: "" },
            { name: "Reverse Prayer Stretch", steps: "1. Place the backs of your hands together.\n2. Point fingers down toward the floor.\n3. Hold 30 seconds.", video: "" },
            { name: "Wrist Side-to-Side (Wiper)", steps: "1. Hand flat on a table.\n2. Move only your hand left and right like a windshield wiper.\n3. Repeat 20 times.", video: "" },
            { name: "Weight Bearing (Table)", steps: "1. Lean forward and place your hands flat on a table.\n2. Gently shift your weight onto your wrists.\n3. Hold 10 seconds. Repeat 10 times.", video: "" },
            { name: "Rice Bucket Squeeze", steps: "1. Put your hand in a bowl of dry rice.\n2. Squeeze and rotate your hand against the resistance.\n3. Do this for 2 minutes.", video: "" },
            { name: "Knuckle Push-ups (on Wall)", steps: "1. Place your fists against a wall.\n2. Lean your weight into your knuckles and push back.\n3. Repeat 15 times.", video: "" }
        ],

        "5. Thumb Pain (De Quervain’s / Texting Thumb)": [
            { name: "Thumb Tuck Stretch", steps: "1. Tuck your thumb into your palm and wrap your fingers over it.\n2. Gently tilt your wrist toward the floor (pinky side).\n3. Hold 20 seconds.", video: "" },
            { name: "Thumb Opposition", steps: "1. Touch your thumb to each fingertip, one by one.\n2. Repeat 10 times.", video: "" },
            { name: "Rubber Band Thumb Lift", steps: "1. Wrap a band around your thumb and fingers.\n2. Push your thumb away from your palm.\n3. Repeat 20 times.", video: "" },
            { name: "Thumb Circles", steps: "1. Make large circles with your thumb in both directions.\n2. Repeat 15 times.", video: "" },
            { name: "C-Grip Squeeze", steps: "1. Make a 'C' shape with your hand (like holding a soda can).\n2. Squeeze a soft ball in this position.\n3. Repeat 15 times.", video: "" }
        ],

        "6. Finger Strength & Arthritis": [
            { name: "Table Taps", steps: "1. Place hand flat.\n2. Lift each finger one by one off the table.\n3. Repeat 10 times for each finger.", video: "" },
            { name: "Pinch Strengthening", steps: "1. Pinch a piece of putty or a soft cloth between your thumb and each finger.\n2. Repeat 10 times per finger.", video: "" },
            { name: "Finger Walks", steps: "1. Place your hand on a wall.\n2. Use your fingers to 'walk' up the wall like a spider.\n3. Repeat 5 times.", video: "" },
            { name: "Claw Stretch", steps: "1. Bend your fingertips down to touch the base of each finger.\n2. Hold 5 seconds. Repeat 15 times.", video: "" },
            { name: "Marble Pick-ups", steps: "1. Use your fingers to pick up marbles or small objects and move them to a cup.\n2. Do this for 3 minutes.", video: "" },
            { name: "Paper Crumple", steps: "1. Use one hand to crumble a piece of paper into a tiny ball.\n2. Then use the same hand to flatten it out again.\n3. Repeat 3 times.", video: "" }
        ]
    },
    "Lumbar (Lower Back) & Sciatica": {

        "1. First Aid: Acute Pain Relief (McKenzie Style)": [
            { name: "Flat Stomach Rest", steps: "1. Lie flat on your stomach.\n2. Relax your back and legs completely.\n3. Stay here for 2 to 5 minutes.", video: "" },
            { name: "Prop on Elbows", steps: "1. Lie on your stomach.\n2. Prop yourself up on your elbows.\n3. Hold for 1 minute while breathing deeply.", video: "" },
            { name: "The Small Cobra", steps: "1. Lie on your stomach.\n2. Push your chest up slightly with your hands.\n3. Keep your hips on the floor.\n4. Repeat 10 times.", video: "" },
            { name: "The Full Seal (Cobra)", steps: "1. Push your chest up until your arms are straight.\n2. Let your lower back sag toward the floor.\n3. Repeat 10 times.", video: "" },
            { name: "Standing Lean Back", steps: "1. Stand with hands on your hips.\n2. Gently arch backward.\n3. Repeat 10 times.", video: "" },
            { name: "Prone Breathing", steps: "1. Lie on your stomach.\n2. Take deep breaths into your lower back.\n3. Feel the pressure release.", video: "" },
            { name: "Stomach Prop with Pillow", steps: "1. Lie on your stomach with a pillow under your hips.\n2. This helps if lying flat is too painful.", video: "" },
            { name: "Wall Lean Side-Glide", steps: "1. Stand sideways to a wall.\n2. Use your hand to push your hips toward the wall.\n3. Repeat 10 times.", video: "" },
            { name: "Chair Lean Back", steps: "1. Sit in a chair with a low back.\n2. Lean your upper back over the top of the chair.\n3. Repeat 5 times.", video: "" },
            { name: "Lying Side-Bend", steps: "1. Lie on your back.\n2. Move your upper body to the right while keeping hips still (Banana shape).\n3. Repeat 5 times.", video: "" }
        ],

        "2. Flexibility: Stenosis & Arthritis Relief (Flexion)": [
            { name: "One Knee to Chest", steps: "1. Lie on back.\n2. Pull right knee to chest.\n3. Hold 30 seconds. Switch legs.", video: "" },
            { name: "Two Knees to Chest", steps: "1. Lie on back.\n2. Hug both knees tightly to your chest.\n3. Hold 30 seconds.", video: "" },
            { name: "Child's Pose", steps: "1. Kneel and sit on your heels.\n2. Reach arms forward on the floor.\n3. Hold 30 seconds.", video: "" },
            { name: "Angry Cat Stretch", steps: "1. On hands and knees.\n2. Arch your back up toward the ceiling.\n3. Hold 5 seconds.", video: "" },
            { name: "Sad Cow Stretch", steps: "1. On hands and knees.\n2. Let your stomach sink toward the floor.\n3. Hold 5 seconds.", video: "" },
            { name: "Pelvic Tilt (Floor)", steps: "1. Lie on back, knees bent.\n2. Flatten your back into the floor.\n3. Repeat 15 times.", video: "" },
            { name: "Seated Toe Touch", steps: "1. Sit in a chair.\n2. Slowly reach down to touch your toes.\n3. Repeat 10 times.", video: "" },
            { name: "Knee Rolls (Side to Side)", steps: "1. Lie on back, knees bent.\n2. Roll knees slowly left and right.\n3. Repeat 20 times.", video: "" },
            { name: "Tail Wags", steps: "1. On hands and knees.\n2. Move your hips side to side as if wagging a tail.\n3. Repeat 20 times.", video: "" },
            { name: "Lying Twist", steps: "1. Lie on back.\n2. Cross one leg over the other and pull toward the floor.\n3. Hold 30 seconds.", video: "" },
            { name: "Happy Baby Stretch", steps: "1. Lie on back.\n2. Grab your feet with your hands and pull knees toward armpits.", video: "" },
            { name: "Lower Back Rocks", steps: "1. Hug knees to chest.\n2. Gently rock forward and backward like a rocking chair.", video: "" },
            { name: "Seated Pelvic Tilt", steps: "1. Sit tall.\n2. Slouch your back, then sit up extra straight.\n3. Repeat 15 times.", video: "" },
            { name: "Standing Pelvic Tilt", steps: "1. Lean your back against a wall.\n2. Flatten your lower back into the wall.\n3. Repeat 15 times.", video: "" },
            { name: "Prayer Reach", steps: "1. In Child's Pose, walk your hands to the far right side.\n2. Hold 20 seconds. Repeat left.", video: "" }
        ],

        "3. Sciatica: Nerve Flossing & Gliding": [
            { name: "Slump Floss (Level 1)", steps: "1. Sit in a chair.\n2. Straighten your leg while looking at the ceiling.\n3. Repeat 10 times.", video: "" },
            { name: "Slump Floss (Level 2)", steps: "1. Sit and slouch forward.\n2. Straighten leg and point toes toward your face.\n3. Repeat 10 times.", video: "" },
            { name: "Lying Nerve Glide", steps: "1. Lie on back, hold the back of your thigh.\n2. Straighten knee, then flex and point your foot.\n3. Repeat 15 times.", video: "" },
            { name: "The Figure 4 Stretch", steps: "1. Cross your ankle over the opposite knee.\n2. Pull the leg toward you.\n3. Hold 30 seconds.", video: "" },
            { name: "Seated Figure 4", steps: "1. Sit in a chair.\n2. Cross your ankle over your knee and lean forward.\n3. Hold 30 seconds.", video: "" },
            { name: "Wall Hamstring Stretch", steps: "1. Lie on the floor near a doorway.\n2. Put your leg up on the wall.\n3. Keep knee straight. Hold 1 minute.", video: "" },
            { name: "Towel Foot Pull", steps: "1. Sit with leg straight.\n2. Use a towel to pull your toes toward you.\n3. Hold 30 seconds.", video: "" },
            { name: "Standing Hamstring Stretch", steps: "1. Put your heel on a small stool.\n2. Keep back straight and lean forward.\n3. Hold 30 seconds.", video: "" },
            { name: "Ankle Pumps", steps: "1. Move your feet up and down rapidly.\n2. Do 30 times. Helps with nerve circulation.", video: "" },
            { name: "Glute Smash (Tennis Ball)", steps: "1. Sit on a tennis ball under your buttock.\n2. Move around to find the sore spot.\n3. Hold for 1 minute.", video: "" },
            { name: "Psoas Stretch", steps: "1. Lunge forward with one knee on the floor.\n2. Push hips forward.\n3. Hold 30 seconds.", video: "" },
            { name: "Lying Hip Twist", steps: "1. Lie on back.\n2. Cross one leg over and push the knee toward the floor.\n3. Hold 30 seconds.", video: "" },
            { name: "The 'Wiggler'", steps: "1. Lie on back.\n2. Gently shake your legs and hips to loosen the nerves.", video: "" },
            { name: "Sciatic Wall Slide", steps: "1. Sit against a wall with legs straight.\n2. Reach for your toes gently. Repeat 10 times.", video: "" },
            { name: "Nerve Tension Release", steps: "1. Lie on back.\n2. Lift leg until it tingles, then lower it slightly.\n3. Point foot 20 times.", video: "" }
        ],

        "4. Core Stability: The 'Big 3' & Beyond": [
            { name: "Tummy Bracing", steps: "1. Tighten your stomach like you are about to be poked.\n2. Keep breathing. Hold 10 seconds.", video: "" },
            { name: "Bird-Dog (Arm Only)", steps: "1. On hands and knees.\n2. Reach one arm forward. Hold 5 seconds.", video: "" },
            { name: "Bird-Dog (Leg Only)", steps: "1. On hands and knees.\n2. Reach one leg backward. Hold 5 seconds.", video: "" },
            { name: "Full Bird-Dog", steps: "1. Reach opposite arm and leg at the same time.\n2. Keep your back flat. Repeat 10 times.", video: "" },
            { name: "Dead Bug (Foot Taps)", steps: "1. Lie on back, knees in the air.\n2. Tap one foot to the floor. Repeat 15 times.", video: "" },
            { name: "Dead Bug (Arm Reach)", steps: "1. Lie on back, knees in air.\n2. Reach arms overhead one at a time.", video: "" },
            { name: "Full Dead Bug", steps: "1. Lower opposite arm and leg together.\n2. Keep your back flat on the floor.", video: "" },
            { name: "Side Plank (on Knees)", steps: "1. Prop yourself on your elbow and knees.\n2. Lift hips. Hold 20 seconds.", video: "" },
            { name: "Side Plank (on Feet)", steps: "1. Prop on elbow and feet.\n2. Hold 20 seconds.", video: "" },
            { name: "Front Plank (on Knees)", steps: "1. Hold body straight on elbows and knees.\n2. Hold 20 seconds.", video: "" },
            { name: "Front Plank (on Feet)", steps: "1. Hold body straight on elbows and toes.\n2. Hold 20 seconds.", video: "" },
            { name: "Heel Drops", steps: "1. Lie on back, knees in air.\n2. Lower both heels slowly toward floor. Repeat 10 times.", video: "" },
            { name: "Tummy Vacuums", steps: "1. Pull your belly button in as hard as you can.\n2. Hold for 5 seconds.", video: "" },
            { name: "Bridge (Hold)", steps: "1. Lift hips up and hold for 30 seconds.", video: "" },
            { name: "Marching Bridge", steps: "1. In the bridge position, lift one foot, then the other.", video: "" },
            { name: "Superman (Arms Only)", steps: "1. Lie on stomach.\n2. Lift arms and chest off the floor.", video: "" },
            { name: "Superman (Full)", steps: "1. Lift arms and legs together.\n2. Hold 3 seconds.", video: "" },
            { name: "Mountain Climbers (Slow)", steps: "1. Push-up position.\n2. Slowly pull knee to chest. Repeat 20 times.", video: "" },
            { name: "The 'Hollow Body'", steps: "1. Lie on back.\n2. Lift head and feet 2 inches off floor. Hold 10 seconds.", video: "" },
            { name: "Wall Sit", steps: "1. Lean against wall in a squat.\n2. Hold for 30 seconds.", video: "" }
        ],

        "5. Hip & Glute Support Strength": [
            { name: "Clamshells", steps: "1. Lie on side, knees bent.\n2. Lift top knee up while keeping feet together.", video: "" },
            { name: "Side Leg Lift", steps: "1. Lie on side.\n2. Lift top leg straight up. Repeat 15 times.", video: "" },
            { name: "Fire Hydrants", steps: "1. On hands and knees.\n2. Lift leg out to the side. Repeat 15 times.", video: "" },
            { name: "Hip Circles (Hands & Knees)", steps: "1. On hands and knees.\n2. Draw big circles with your knee in the air.", video: "" },
            { name: "Single Leg Bridge", steps: "1. Lie on back.\n2. Lift hips with only one foot on the floor.", video: "" },
            { name: "Standing Hip Kickback", steps: "1. Stand and kick your leg straight back.\n2. Squeeze your bottom.", video: "" },
            { name: "Standing Side Kick", steps: "1. Stand and lift leg out to the side.", video: "" },
            { name: "Monster Walk (Forward)", steps: "1. Take big wide steps forward like a monster.", video: "" },
            { name: "Monster Walk (Sideways)", steps: "1. Step sideways with feet wide apart.", video: "" },
            { name: "Sitting Leg Extension", steps: "1. Sit in chair.\n2. Straighten your leg. Repeat 15 times.", video: "" },
            { name: "Prone Leg Curl", steps: "1. Lie on stomach.\n2. Bend your knee and bring heel to bottom.", video: "" },
            { name: "The 'Glute Squeeze'", steps: "1. Stand or sit.\n2. Squeeze your bottom muscles as hard as you can. Hold 5 seconds.", video: "" },
            { name: "Donkey Kicks", steps: "1. On hands and knees.\n2. Kick your heel up toward the ceiling.", video: "" },
            { name: "Sumo Squat (Wide)", steps: "1. Stand with feet very wide.\n2. Squat down and stand up. Repeat 15 times.", video: "" },
            { name: "Box Squat", steps: "1. Sit down onto a chair, then stand back up immediately.", video: "" },
            { name: "Step Ups", steps: "1. Step up onto a small step, then back down.", video: "" },
            { name: "Lunges (Support)", steps: "1. Hold onto a table.\n2. Step forward and lower your back knee.", video: "" },
            { name: "Sideways Lunges", steps: "1. Step wide to the side and bend one knee.", video: "" },
            { name: "Wall Hip Abduction", steps: "1. Stand sideways to a wall.\n2. Push your outside leg into the wall.", video: "" },
            { name: "The 'Curtsy' Lunge", steps: "1. Step one foot behind the other like a curtsy.", video: "" }
        ],

        "6. Functional & Advanced Training": [
            { name: "Good Mornings", steps: "1. Stand with hands on head.\n2. Bend forward at the hips with a flat back.", video: "" },
            { name: "Waiter's Bow", steps: "1. Slide your hands down your thighs while pushing hips back.", video: "" },
            { name: "Windmills", steps: "1. Stand with feet wide, arms out.\n2. Touch your right hand to your left foot.", video: "" },
            { name: "Torso Twists (Standing)", steps: "1. Stand and gently twist your body side to side.", video: "" },
            { name: "Woodchoppers (No Weight)", steps: "1. Reach high to one side, then swing down to the opposite knee.", video: "" },
            { name: "Suitcase Carry", steps: "1. Walk while holding a heavy bag in only one hand.", video: "" },
            { name: "Bear Crawl", steps: "1. Crawl forward on hands and toes, knees off floor.", video: "" },
            { name: "Backward Walking", steps: "1. Carefully walk backward for 20 steps. Good for balance.", video: "" },
            { name: "Farmer's Walk", steps: "1. Walk holding a bag in each hand.", video: "" },
            { name: "Stair Climbing", steps: "1. Walk up and down stairs for 2 minutes.", video: "" },
            { name: "Balance: One Leg", steps: "1. Stand on one leg for 30 seconds.", video: "" },
            { name: "Y-Balance Reach", steps: "1. Stand on one leg and reach the other foot as far as you can.", video: "" },
            { name: "Slow Motion Squat", steps: "1. Take 5 seconds to go down, 5 seconds to come up.", video: "" },
            { name: "Pelvic Clock", steps: "1. Lie on back.\n2. Imagine your pelvis is a clock; move it to 12, 6, 3, and 9.", video: "" },
            { name: "Prone Swimmer", steps: "1. Lie on stomach.\n2. Move arms and legs in a swimming motion.", video: "" },
            { name: "Side Bend (No Weight)", steps: "1. Stand and slide your hand down the side of your leg.", video: "" },
            { name: "Cat-Cow (Standing)", steps: "1. Hands on knees, arch and round your back while standing.", video: "" },
            { name: "Wall Slides (Arms)", steps: "1. Lean against wall, slide arms up like a 'Y'.", video: "" },
            { name: "Floor Sculling", steps: "1. Lie on back, hands at sides.\n2. Move hands in small circles like rowing.", video: "" },
            { name: "Deep Squat Hold", steps: "1. Sit in a deep squat and hold for 30 seconds.", video: "" }
        ]
    },
    "Hip Rehabilitation": {

        "1. Early Mobility (Post-Op & Acute Pain)": [
            { name: "Ankle Pumps", steps: "1. Lie on your back or sit up.\n2. Move your feet up and down like you are pressing a gas pedal.\n3. Repeat 30 times. Helps with circulation.", video: "" },
            { name: "Thigh Squeezes (Quad Sets)", steps: "1. Lie with your legs straight.\n2. Tighten the muscle on top of your thigh by pushing the back of your knee into the bed.\n3. Hold 5 seconds. Repeat 20 times.", video: "" },
            { name: "Buttock Squeezes (Glute Sets)", steps: "1. Lie on your back.\n2. Squeeze your bottom muscles together as hard as you can.\n3. Hold 5 seconds. Repeat 20 times.", video: "" },
            { name: "Heel Slides", steps: "1. Lie on your back.\n2. Slowly slide your heel toward your bottom, bending your knee.\n3. Slide back out straight. Repeat 15 times.", video: "" },
            { name: "Bed Side-Slides (Abduction)", steps: "1. Lie on your back with legs straight.\n2. Slide your leg out to the side as far as comfortable, then back to center.\n3. Keep your toes pointing at the ceiling. Repeat 15 times.", video: "" },
            { name: "Short Arc Quads", steps: "1. Lie on your back with a rolled-up towel under your knee.\n2. Lift your heel to straighten your leg.\n3. Hold 5 seconds. Repeat 15 times.", video: "" },
            { name: "Lying Hip Rotation (Wipers)", steps: "1. Lie on your back with knees bent and feet flat.\n2. Gently let your knees fall side to side like windshield wipers.\n3. Repeat 15 times.", video: "" },
            { name: "Seated Knee Lifts", steps: "1. Sit tall in a chair.\n2. Lift one knee toward the ceiling, then lower it slowly.\n3. Repeat 15 times on each leg.", video: "" },
            { name: "Seated Leg Extensions", steps: "1. Sit in a chair.\n2. Straighten your knee out in front of you.\n3. Squeeze your thigh at the top. Repeat 15 times.", video: "" },
            { name: "Towel Hamstring Pull", steps: "1. Lie on your back.\n2. Loop a towel around your foot and pull your straight leg up toward the ceiling.\n3. Hold 30 seconds.", video: "" }
        ],

        "2. Bursitis & Flexibility Stretches": [
            { name: "Figure 4 Stretch", steps: "1. Lie on your back with knees bent.\n2. Cross your painful ankle over the opposite knee.\n3. Gently pull your bottom thigh toward your chest.\n4. Hold 30 seconds.", video: "" },
            { name: "Knee to Chest", steps: "1. Lie on your back.\n2. Pull one knee up to your chest as far as you can.\n3. Hold 20 seconds. Repeat 3 times.", video: "" },
            { name: "Butterfly Stretch", steps: "1. Sit on the floor with the soles of your feet together.\n2. Let your knees drop out to the sides.\n3. Hold 30 seconds.", video: "" },
            { name: "Hip Flexor Lunge", steps: "1. Kneel on one knee.\n2. Step the other foot forward and gently lean your hips forward.\n3. Hold 30 seconds.", video: "" },
            { name: "Standing IT Band Stretch", steps: "1. Stand and cross your painful leg behind your good leg.\n2. Lean your body toward the good side until you feel a stretch in your outer hip.\n3. Hold 30 seconds.", video: "" },
            { name: "Crossed-Leg Side Bend", steps: "1. Stand and cross your legs.\n2. Reach the arm on your painful side over your head and bend sideways.\n3. Hold 20 seconds.", video: "" },
            { name: "Seated Piriformis Stretch", steps: "1. Sit in a chair and cross your ankle over your knee.\n2. Lean forward with a straight back until you feel a stretch in your bottom.\n3. Hold 30 seconds.", video: "" },
            { name: "90/90 Hip Sit", steps: "1. Sit on the floor with one leg bent 90 degrees in front and the other 90 degrees to the side.\n2. Stay upright. Hold for 30 seconds.", video: "" },
            { name: "Lying Quad Stretch", steps: "1. Lie on your side.\n2. Reach back and grab your ankle, pulling your heel toward your bottom.\n3. Hold 30 seconds.", video: "" },
            { name: "Groin Stretch (Side Lunges)", steps: "1. Stand with feet wide apart.\n2. Shift your weight to one side, bending that knee while keeping the other leg straight.\n3. Hold 20 seconds.", video: "" }
        ],

        "3. Strengthening (Glutes & Stability)": [
            { name: "Clamshells", steps: "1. Lie on your side with knees bent and feet together.\n2. Lift your top knee while keeping your feet touching.\n3. Repeat 20 times.", video: "" },
            { name: "Reverse Clamshells", steps: "1. Lie on your side with knees together.\n2. Lift your top foot toward the ceiling while keeping your knees touching.\n3. Repeat 15 times.", video: "" },
            { name: "Glute Bridge", steps: "1. Lie on your back with knees bent and feet flat.\n2. Lift your hips off the floor until your body is straight.\n3. Repeat 15 times.", video: "" },
            { name: "Single-Leg Bridge", steps: "1. Lift your hips using only one leg while the other leg is straight in the air.\n2. Repeat 10 times.", video: "" },
            { name: "Side-Lying Leg Lift", steps: "1. Lie on your side with legs straight.\n2. Lift your top leg toward the ceiling.\n3. Lower slowly. Repeat 15 times.", video: "" },
            { name: "Fire Hydrants", steps: "1. Get on your hands and knees.\n2. Lift your leg out to the side while keeping the knee bent.\n3. Repeat 15 times.", video: "" },
            { name: "Donkey Kicks", steps: "1. Get on your hands and knees.\n2. Kick your heel up toward the ceiling.\n3. Squeeze your bottom. Repeat 15 times.", video: "" },
            { name: "Bird-Dog", steps: "1. On hands and knees.\n2. Reach your right arm forward and your left leg backward.\n3. Keep your back flat. Repeat 10 times.", video: "" },
            { name: "Mini-Squats", steps: "1. Stand and hold onto a table.\n2. Bend your knees slightly (about halfway down).\n3. Keep your back straight and stand up. Repeat 15 times.", video: "" },
            { name: "Sit-to-Stand", steps: "1. Sit on a sturdy chair.\n2. Stand up without using your hands.\n3. Sit back down slowly. Repeat 12 times.", video: "" }
        ],

        "4. Standing Balance & Gait": [
            { name: "Standing Hip Flexion", steps: "1. Stand and hold onto a counter.\n2. Lift your knee toward your chest like you are marching.\n3. Repeat 15 times on each leg.", video: "" },
            { name: "Standing Side Leg Lift", steps: "1. Stand and lift your leg out to the side.\n2. Do not lean your body. Repeat 15 times.", video: "" },
            { name: "Standing Back Leg Lift", steps: "1. Stand and kick your leg straight back.\n2. Squeeze your bottom. Repeat 15 times.", video: "" },
            { name: "Weight Shifting (Side to Side)", steps: "1. Stand with feet wide.\n2. Shift your weight fully onto your right leg, then your left.\n3. Repeat 20 times.", video: "" },
            { name: "Weight Shifting (Forward/Back)", steps: "1. Stand with one foot in front of the other.\n2. Rock your weight forward onto your toes, then back onto your heels.\n3. Repeat 20 times.", video: "" },
            { name: "Tandem Stance (Heel-to-Toe)", steps: "1. Stand with one foot directly in front of the other (heel touching toe).\n2. Try to balance for 30 seconds.", video: "" },
            { name: "One-Leg Balance", steps: "1. Stand on one leg while holding a counter.\n2. Try to let go and balance for 30 seconds.", video: "" },
            { name: "Step-Ups", steps: "1. Step up onto a small step with your painful leg.\n2. Step back down slowly. Repeat 15 times.", video: "" },
            { name: "Side Step-Ups", steps: "1. Stand sideways to a step.\n2. Step up onto it and back down.\n3. Repeat 12 times.", video: "" },
            { name: "Backward Walking", steps: "1. In a safe hallway, walk backward carefully for 20 steps.\n2. Focus on pushing off your toes.", video: "" }
        ],

        "5. Advanced Functional Exercises": [
            { name: "Lateral Band Walk", steps: "1. Place a resistance band around your ankles.\n2. Take 10 steps to the right, then 10 steps to the left in a 'crouch'.", video: "" },
            { name: "Monster Walk", steps: "1. With a band around your ankles, take large diagonal steps forward.\n2. Repeat 20 steps.", video: "" },
            { name: "Bulgarian Split Squat (Assisted)", steps: "1. Put your back foot on a small stool.\n2. Squat down on your front leg while holding a wall for balance.\n3. Repeat 10 times.", video: "" },
            { name: "Side Lunges", steps: "1. Step out wide to the side and bend your knee.\n2. Push back to center. Repeat 10 times.", video: "" },
            { name: "Curtsy Lunges", steps: "1. Step one foot behind and across the other leg (like a curtsy).\n2. Lower your hips and stand back up.", video: "" },
            { name: "Box Step-Downs", steps: "1. Stand on a step.\n2. Slowly lower your good foot to touch the floor, then pull it back up.\n3. Repeat 10 times.", video: "" },
            { name: "Single-Leg Deadlift (Reach)", steps: "1. Stand on one leg.\n2. Lean forward and reach toward the floor while your other leg goes back.\n3. Repeat 10 times.", video: "" },
            { name: "Hip Hinge (Wall Touch)", steps: "1. Stand with your back to a wall.\n2. Bend at the hips and try to touch the wall with your bottom.\n3. Keep your back flat.", video: "" },
            { name: "Step-Overs", steps: "1. Place a small object (like a shoe) on the floor.\n2. Practice stepping over it forward and sideways.", video: "" },
            { name: "The 'Figure 8' Walk", steps: "1. Walk in a 'Figure 8' pattern around two chairs.\n2. Helps with hip turning and coordination.", video: "" }
        ]
    },

    // ============================================================
    // 6. KNEE REHABILITATION (50 Exercises)
    // ============================================================
    "Knee Rehabilitation": {
        "Early Mobility & Arthritis Relief": [
            { name: "Thigh Squeezes", steps: "1. Lie with your leg straight.\n2. Tighten the muscle on top of your thigh by pushing the back of your knee into the bed.\n3. Hold for 5 seconds.\n4. Repeat 20 times.", video: "" },
            { name: "Heel Slides", steps: "1. Lie on your back.\n2. Slowly slide your heel toward your bottom, bending your knee as much as comfortable.\n3. Slide it back out straight.\n4. Repeat 15 times.", video: "" },
            { name: "Buttock Squeezes", steps: "1. Lie on your back.\n2. Squeeze your bottom muscles together as hard as you can.\n3. Hold for 5 seconds.\n4. Repeat 20 times.", video: "" },
            { name: "Knee Straightener (Short Arc)", steps: "1. Lie on your back with a rolled-up towel under your knee.\n2. Lift your heel to straighten your leg completely.\n3. Hold for 5 seconds and lower slowly.\n4. Repeat 15 times.", video: "" },
            { name: "Straight Leg Lifts", steps: "1. Lie on your back with one knee bent and the painful leg straight.\n2. Lift the straight leg up about 12 inches.\n3. Hold for 3 seconds and lower slowly.\n4. Repeat 15 times.", video: "" },
            { name: "Seated Leg Straightening", steps: "1. Sit in a chair.\n2. Slowly straighten your leg out in front of you.\n3. Squeeze your thigh muscle at the top for 3 seconds.\n4. Repeat 15 times.", video: "" },
            { name: "Seated Knee Bends", steps: "1. Sit in a chair.\n2. Slide your foot back as far as you can under the chair.\n3. Hold for 5 seconds to feel a stretch.\n4. Repeat 15 times.", video: "" },
            { name: "Pillow Squeezes", steps: "1. Sit or lie with a pillow between your knees.\n2. Squeeze the pillow firmly using your inner thighs.\n3. Hold 5 seconds.\n4. Repeat 15 times.", video: "" },
            { name: "Passive Extension (Propped Heel)", steps: "1. Sit with your heel propped up on a stool and nothing under your knee.\n2. Let gravity gently straighten your knee toward the floor.\n3. Stay for 2 minutes.", video: "" },
            { name: "Ankle Pumps", steps: "1. Move your feet up and down rapidly like a gas pedal.\n2. Repeat 30 times to help with circulation.", video: "" }
        ],

        "Intermediate Strength & Stability": [
            { name: "Wall Squats", steps: "1. Stand with your back against a wall.\n2. Slide down until your knees are slightly bent.\n3. Hold 10 seconds and slide back up.\n4. Repeat 10 times.", video: "" },
            { name: "Chair Squats (Sit to Stand)", steps: "1. Sit on a sturdy chair.\n2. Stand up without using your hands.\n3. Sit back down slowly with control.\n4. Repeat 15 times.", video: "" },
            { name: "Mini Squats", steps: "1. Stand with feet shoulder-width apart.\n2. Bend your knees slightly as if sitting on a high stool.\n3. Keep your back straight.\n4. Repeat 15 times.", video: "" },
            { name: "Forward Step-Ups", steps: "1. Stand in front of a small step.\n2. Step up with your painful leg, then bring the other leg up.\n3. Step back down slowly.\n4. Repeat 15 times.", video: "" },
            { name: "Side Step-Ups", steps: "1. Stand sideways next to a step.\n2. Step up onto it with the leg closest to the step.\n3. Step back down slowly.\n4. Repeat 12 times.", video: "" },
            { name: "Terminal Knee Extension (Band)", steps: "1. Loop a band behind your knee and anchor it in front of you.\n2. Start with a slightly bent knee.\n3. Straighten your knee by pushing back against the band.\n4. Repeat 20 times.", video: "" },
            { name: "Calf Raises", steps: "1. Stand and hold onto a table for balance.\n2. Rise up on your tiptoes as high as you can.\n3. Lower slowly.\n4. Repeat 20 times.", video: "" },
            { name: "Glute Bridges", steps: "1. Lie on your back with knees bent and feet flat.\n2. Lift your hips toward the ceiling.\n3. Squeeze your bottom and lower slowly.\n4. Repeat 15 times.", video: "" },
            { name: "Side Leg Lifts", steps: "1. Lie on your side.\n2. Lift your top leg toward the ceiling while keeping it straight.\n3. Repeat 15 times.", video: "" },
            { name: "Clamshells", steps: "1. Lie on your side with knees bent.\n2. Lift your top knee while keeping your feet together.\n3. Repeat 20 times.", video: "" },
            { name: "Standing Hip Kickbacks", steps: "1. Stand and hold a counter.\n2. Kick your leg straight back behind you.\n3. Squeeze your bottom. Repeat 15 times.", video: "" },
            { name: "Standing Hip Side-Lifts", steps: "1. Stand and lift your leg out to the side.\n2. Do not lean your body. Repeat 15 times.", video: "" },
            { name: "Marching in Place", steps: "1. Stand and lift your knees high toward your chest.\n2. Use a wall for balance if needed.\n3. Repeat 20 times.", video: "" },
            { name: "Backward Walking", steps: "1. Walk backward slowly in a safe area.\n2. Focus on reaching back with your toes first.\n3. Do this for 2 minutes.", video: "" },
            { name: "Weight Shifting", steps: "1. Stand with feet wide.\n2. Shift your weight fully onto your right leg, then your left.\n3. Repeat 20 times.", video: "" }
        ],

        "Advanced Strength (ACL & Meniscus Recovery)": [
            { name: "Forward Lunges", steps: "1. Take a step forward.\n2. Slowly lower your back knee toward the floor.\n3. Push back to the starting position.\n4. Repeat 10 times on each leg.", video: "" },
            { name: "Reverse Lunges", steps: "1. Take a step backward.\n2. Lower your hips down, then step back to the front.\n3. Repeat 10 times.", video: "" },
            { name: "Side Lunges", steps: "1. Step out wide to the side and bend that knee.\n2. Keep the other leg straight.\n3. Push back to center. Repeat 10 times.", video: "" },
            { name: "Single Leg Stance", steps: "1. Stand on your painful leg.\n2. Try to balance for 30 seconds without holding onto anything.\n3. Repeat 3 times.", video: "" },
            { name: "Small Single Leg Squat", steps: "1. Stand on one leg.\n2. Bend your knee just a few inches and stand back up.\n3. Repeat 10 times.", video: "" },
            { name: "Step Downs (Slow)", steps: "1. Stand on a step.\n2. Slowly lower your good foot to touch the floor, then pull it back up.\n3. Go as slowly as possible.\n4. Repeat 12 times.", video: "" },
            { name: "Single Leg Bridge", steps: "1. Lie on your back with one foot flat and the other leg in the air.\n2. Lift your hips using only one leg.\n3. Repeat 10 times.", video: "" },
            { name: "Bulgarian Split Squat", steps: "1. Put your back foot on a small stool.\n2. Squat on your front leg while holding a wall for balance.\n3. Repeat 10 times.", video: "" },
            { name: "Monster Walks (Band)", steps: "1. Place a band around your ankles.\n2. Walk forward with wide steps like a monster.\n3. Repeat 20 steps.", video: "" },
            { name: "Lateral Band Walks", steps: "1. Place a band around your ankles.\n2. Take 10 steps to the right, then 10 to the left in a 'crouch'.", video: "" },
            { name: "Hip Hinge (Good Mornings)", steps: "1. Stand tall, knees slightly bent.\n2. Bend forward at the hips while keeping your back perfectly flat.\n3. Stand back up and squeeze your glutes.\n4. Repeat 12 times.", video: "" },
            { name: "Box Step-Overs", steps: "1. Place a shoe or small box on the floor.\n2. Practice stepping over it forward and sideways.\n3. Repeat 20 times.", video: "" },
            { name: "High Knee Marching (Fast)", steps: "1. March in place quickly for 30 seconds.\n2. Keep your core tight and back straight.", video: "" },
            { name: "Tiptoe Walking", steps: "1. Walk on your tiptoes for 20 steps.\n2. Keep your heels off the floor. Repeat 3 times.", video: "" },
            { name: "Heel Walking", steps: "1. Walk only on your heels for 20 steps.\n2. Keep your toes off the floor. Repeat 3 times.", video: "" }
        ],

        "Flexibility & Kneecap Control": [
            { name: "Hamstring Stretch (Towel)", steps: "1. Lie on your back.\n2. Loop a towel around your foot.\n3. Pull your straight leg up toward the ceiling.\n4. Hold 30 seconds.", video: "" },
            { name: "Standing Quad Stretch", steps: "1. Stand and hold a chair for balance.\n2. Reach back and grab your ankle.\n3. Pull your heel toward your bottom.\n4. Hold 30 seconds.", video: "" },
            { name: "Wall Calf Stretch", steps: "1. Place your hands on a wall with one foot back.\n2. Keep your back heel flat and leg straight.\n3. Lean forward until you feel a stretch. Hold 30 seconds.", video: "" },
            { name: "IT Band Stretch", steps: "1. Stand and cross your legs.\n2. Reach your arm over your head and bend away from the back leg.\n3. Hold 30 seconds.", video: "" },
            { name: "Butterfly Stretch", steps: "1. Sit with the soles of your feet together.\n2. Let your knees drop open toward the floor.\n3. Hold 30 seconds.", video: "" },
            { name: "VMO Ball Squeeze", steps: "1. Sit with your leg straight and a small ball under your knee.\n2. Squeeze the ball and tighten your thigh.\n3. Hold 10 seconds. Repeat 10 times.", video: "" },
            { name: "Heel Taps (Front)", steps: "1. Stand on a small step.\n2. Tap your heel on the floor in front of you and bring it back.\n3. Repeat 15 times.", video: "" },
            { name: "Wall Ball Squeeze", steps: "1. Stand with your side to a wall.\n2. Hold a ball between the wall and your outside knee.\n3. Press into the ball. Hold 10 seconds.", video: "" },
            { name: "Lying Quad Stretch", steps: "1. Lie on your side.\n2. Pull your top heel toward your bottom.\n3. Hold 30 seconds.", video: "" },
            { name: "Knee Isometrics (Seated)", steps: "1. Sit in a chair.\n2. Press your heels back against the legs of the chair.\n3. Hold for 5 seconds. Repeat 15 times.", video: "" }
        ]
    },

    // ============================================================
    // 8. ANKLE & FOOT REHABILITATION (50 Exercises)
    // ============================================================
    "Ankle & Foot": {
        "Early Mobility & Sprain Recovery": [
            { name: "Ankle Pumps", steps: "1. Sit or lie down with your legs straight.\n2. Point your toes away from you like a ballerina.\n3. Pull your toes back toward your shins.\n4. Repeat 30 times quickly to help with swelling.", video: "" },
            { name: "Ankle Circles", steps: "1. Lift your foot off the floor.\n2. Draw a large circle with your big toe.\n3. Do 15 circles clockwise and 15 circles counter-clockwise.", video: "" },
            { name: "Ankle Alphabet", steps: "1. Imagine your big toe is a pen.\n2. 'Write' the capital letters A through Z in the air.\n3. Move only your ankle, not your whole leg.", video: "" },
            { name: "Towel Foot Stretch", steps: "1. Sit with your leg straight in front of you.\n2. Loop a towel around the ball of your foot.\n3. Gently pull the towel toward you until you feel a stretch in your calf.\n4. Hold 30 seconds.", video: "" },
            { name: "Ankle Windshield Wipers", steps: "1. Keep your heel on the floor.\n2. Point your toes to the right, then to the left without moving your knee.\n3. Repeat 20 times.", video: "" },
            { name: "Big Toe Lifts", steps: "1. Keep your foot flat on the floor.\n2. Try to lift only your big toe while keeping the other four toes down.\n3. Repeat 15 times. (Great for balance!)", video: "" },
            { name: "Four-Toe Lifts", steps: "1. Keep your foot flat on the floor.\n2. Lift your outer four toes while keeping your big toe pressed down.\n3. Repeat 15 times.", video: "" },
            { name: "Sitting Heel Raises", steps: "1. Sit in a chair with feet flat.\n2. Lift your heels as high as you can while keeping your toes on the floor.\n3. Repeat 20 times.", video: "" },
            { name: "Sitting Toe Raises", steps: "1. Sit in a chair with feet flat.\n2. Lift your toes and the front of your foot while keeping your heels on the floor.\n3. Repeat 20 times.", video: "" },
            { name: "Ankle Side-Press (Isometric)", steps: "1. Sit and place your foot against a table leg or wall.\n2. Push the outside of your foot into the wall without actually moving it.\n3. Hold 5 seconds. Repeat 10 times.", video: "" }
        ],

        "Plantar Fasciitis & Heel Pain": [
            { name: "Frozen Bottle Roll", steps: "1. Sit in a chair.\n2. Place a frozen water bottle under the arch of your foot.\n3. Roll your foot back and forth with firm pressure for 5 minutes.", video: "" },
            { name: "Tennis Ball Arch Roll", steps: "1. Place a tennis ball (or golf ball) under your foot.\n2. Roll it around the sore spots in your arch for 2 minutes.", video: "" },
            { name: "Toe Towel Curls", steps: "1. Sit with your foot flat on a towel on a smooth floor.\n2. Use your toes to scrunch the towel toward you.\n3. Repeat 10 times.", video: "" },
            { name: "Manual Toe Stretch", steps: "1. Sit and cross your foot over your knee.\n2. Use your hand to pull your toes back toward your shin until you feel a stretch in your arch.\n3. Hold 30 seconds.", video: "" },
            { name: "Seated Calf Stretch", steps: "1. Sit on the edge of a chair.\n2. Extend one leg and pull your toes back toward you with your hand or a strap.\n3. Hold 30 seconds.", video: "" },
            { name: "Step Arch Stretch", steps: "1. Stand with the balls of your feet on the edge of a step.\n2. Let your heels hang off and slowly lower them toward the floor.\n3. Hold 30 seconds.", video: "" },
            { name: "Toe Spreads", steps: "1. Try to spread all your toes apart as wide as possible.\n2. Hold for 3 seconds. Repeat 15 times.", video: "" },
            { name: "Marble Pick-ups", steps: "1. Place marbles on the floor.\n2. Use your toes to pick them up and put them in a cup.\n3. Repeat for 3 minutes.", video: "" },
            { name: "The Penny Press", steps: "1. Place a coin under the ball of your big toe.\n2. Press down on the coin as hard as you can without curling your toes.\n3. Hold 5 seconds. Repeat 15 times.", video: "" },
            { name: "Wall Calf Stretch (Straight Leg)", steps: "1. Stand facing a wall with hands on it.\n2. Step one foot back with the heel flat and knee straight.\n3. Lean forward until you feel a stretch. Hold 30 seconds.", video: "" }
        ],

        "Ankle Strengthening (Bands & Weights)": [
            { name: "Band Pull-Ups (Dorsiflexion)", steps: "1. Anchor a band to a table leg and loop it over your toes.\n2. Pull your toes up toward your shin against the band.\n3. Repeat 15 times.", video: "" },
            { name: "Band Push-Downs (Plantarflexion)", steps: "1. Hold the ends of a band and loop the middle under your foot.\n2. Push your foot down like you are pressing a gas pedal.\n3. Repeat 20 times.", video: "" },
            { name: "Band Pull-Outs (Eversion)", steps: "1. Loop a band around both feet.\n2. Keep your heels together and turn your toes outward against the band.\n3. Repeat 15 times.", video: "" },
            { name: "Band Pull-Inwards (Inversion)", steps: "1. Cross your legs and loop a band around the bottom foot.\n2. Pull the foot inward toward your other leg against the band.\n3. Repeat 15 times.", video: "" },
            { name: "Standing Calf Raises", steps: "1. Stand and hold a counter for balance.\n2. Rise up on your tiptoes.\n3. Lower down slowly. Repeat 20 times.", video: "" },
            { name: "Single Leg Calf Raise", steps: "1. Stand on one leg.\n2. Rise up on your tiptoes.\n3. Repeat 12 times. (Focus on control).", video: "" },
            { name: "Heel Walks", steps: "1. Lift your toes off the floor and walk only on your heels.\n2. Take 20 small steps. Repeat 3 times.", video: "" },
            { name: "Toe Walks", steps: "1. Rise up on your tiptoes and walk.\n2. Take 20 small steps. Repeat 3 times.", video: "" },
            { name: "Bent Knee Calf Raises", steps: "1. Stand and slightly bend your knees.\n2. Perform a calf raise while keeping the knees bent.\n3. This targets the lower calf muscle. Repeat 15 times.", video: "" },
            { name: "Bridge with Heel Raise", steps: "1. Lie on your back with knees bent.\n2. Lift your hips into a bridge.\n3. While holding the bridge, lift your heels off the floor.\n4. Repeat 15 times.", video: "" }
        ],

        "Balance & Proprioception": [
            { name: "Single Leg Stance", steps: "1. Stand on your painful leg.\n2. Hold onto a chair if needed, then try to let go.\n3. Try to balance for 30 seconds.", video: "" },
            { name: "Single Leg Stance (Eyes Closed)", steps: "1. Balance on one leg.\n2. Slowly close your eyes.\n3. Try to maintain balance for 15-20 seconds. (Stand near a wall for safety!)", video: "" },
            { name: "Tandem Stance (Heel-to-Toe)", steps: "1. Stand with one foot directly in front of the other (heel touching toe).\n2. Hold for 30 seconds.", video: "" },
            { name: "Tandem Walking", steps: "1. Walk in a straight line, placing your heel directly in front of your toes for each step.\n2. Take 15 steps.", video: "" },
            { name: "Pillow Balance", steps: "1. Stand on a couch cushion or pillow with one foot.\n2. Try to balance for 30 seconds.\n3. The wobbly surface makes your ankle muscles work harder.", video: "" },
            { name: "Single Leg Clock Reaches", steps: "1. Stand on one leg.\n2. Tap your other foot at 12, 3, 6, and 9 o'clock positions.\n3. Repeat 5 times.", video: "" },
            { name: "Wall Taps (One Leg)", steps: "1. Stand on one leg facing a wall.\n2. Reach out and gently tap the wall at different heights while staying balanced.\n3. Repeat 15 times.", video: "" },
            { name: "Forward Hops (Stick the Landing)", steps: "1. Hop forward on your painful leg.\n2. Land softly with a slightly bent knee and hold your balance for 3 seconds.\n3. Repeat 10 times.", video: "" },
            { name: "Side-to-Side Hops", steps: "1. Hop sideways over an imaginary line.\n2. Land softly and hold your balance.\n3. Repeat 10 times.", video: "" },
            { name: "Star Reach", steps: "1. Stand on one leg.\n2. Reach your hands as far forward, then as far side-to-side as you can without falling.", video: "" }
        ],

        "Functional & Advanced Training": [
            { name: "Step Downs (Slow & Controlled)", steps: "1. Stand on a step.\n2. Slowly lower your good foot to touch the floor, then bring it back up.\n3. The ankle on the step should do all the work. Repeat 12 times.", video: "" },
            { name: "Lateral Lunges", steps: "1. Step out wide to the side.\n2. Bend that knee while keeping the other leg straight.\n3. Push back to center. Repeat 10 times.", video: "" },
            { name: "Monster Walks (Band)", steps: "1. Place a band around your ankles.\n2. Walk forward with wide, diagonal steps.\n3. Take 20 steps.", video: "" },
            { name: "Squat with Heel Lift", steps: "1. Perform a squat.\n2. At the bottom of the squat, lift your heels off the floor, then stand back up.\n3. Repeat 12 times.", video: "" },
            { name: "Single Leg Deadlift (Reach)", steps: "1. Stand on one leg.\n2. Tilt forward at your hips while reaching your hands toward the floor.\n3. Keep your back flat. Repeat 10 times.", video: "" },
            { name: "Calf Stretch (Bent Knee)", steps: "1. Face a wall in a calf stretch position.\n2. Slightly bend your back knee while keeping the heel flat.\n3. Hold 30 seconds. (This stretches the deep Achilles area).", video: "" },
            { name: "Box Step-Overs", steps: "1. Place a shoe or small box on the floor.\n2. Practice stepping over it forward, then backward, then sideways.\n3. Repeat 20 times.", video: "" },
            { name: "Heel-to-Toe Rocking", steps: "1. Stand with feet hip-width apart.\n2. Rock forward onto your toes, then back onto your heels.\n3. Repeat 20 times.", video: "" },
            { name: "Single Leg Knee Bends", steps: "1. Stand on one leg.\n2. Bend your knee just a few inches (mini-squat) and stand back up.\n3. Repeat 15 times.", video: "" },
            { name: "The 'Figure 8' Walk", steps: "1. Walk in a tight 'Figure 8' pattern around two objects on the floor.\n2. This helps your ankle adjust to turning. Repeat for 1 minute.", video: "" }
        ]
    },

    // ============================================================
    // 5. THORACIC SPINE & POSTURE (50 Exercises)
    // ============================================================
    "Thoracic Spine & Posture": {
        "1. Unlocking Mid-Back Stiffness (Mobility)": [
            { name: "Cat-Cow Stretch", steps: "1. Get on your hands and knees.\n2. Arch your back up toward the ceiling like an angry cat.\n3. Then let your stomach sink toward the floor and look up slightly.\n4. Move slowly between both for 15 times.", video: "" },
            { name: "The 'Open Book' Stretch", steps: "1. Lie on your side with your knees bent and arms together in front of you.\n2. Slowly lift your top arm and reach it behind you toward the floor.\n3. Follow your hand with your eyes. Hold 5 seconds.\n4. Repeat 10 times each side.", video: "" },
            { name: "Thread the Needle", steps: "1. Start on hands and knees.\n2. Reach one arm underneath your body and across to the other side.\n3. Let your shoulder drop toward the floor. Hold for 15 seconds.\n4. Repeat 5 times each side.", video: "" },
            { name: "Wall Rotations", steps: "1. Stand sideways against a wall with your closest leg forward.\n2. Reach both arms forward.\n3. Trace a large circle with your outside arm along the wall behind you.\n4. Repeat 10 times on each side.", video: "" },
            { name: "Seated Chair Twist", steps: "1. Sit tall in a chair.\n2. Twist your body to the right and use the back of the chair to pull yourself further.\n3. Hold 10 seconds. Repeat 5 times each side.", video: "" },
            { name: "The 'Bow and Arrow'", steps: "1. Sit or stand with arms reaching forward.\n2. Pull one elbow back as if pulling a bow string, twisting your upper back.\n3. Repeat 15 times each side.", video: "" },
            { name: "Foam Roller Arching", steps: "1. Place a foam roller horizontally across your mid-back while lying down.\n2. Support your head with your hands.\n3. Gently arch backward over the roller.\n4. Move the roller up or down and repeat 5 times.", video: "" },
            { name: "Bench Thoracic Stretch", steps: "1. Kneel in front of a chair or bench.\n2. Place your elbows on the bench and drop your head between your arms.\n3. Sit back toward your heels. Hold 30 seconds.", video: "" },
            { name: "Side-Bending Reach", steps: "1. Stand with feet wide.\n2. Reach one arm overhead and bend to the side.\n3. Push your ribs out to the side for a deep stretch. Hold 15 seconds.", video: "" },
            { name: "Prone Hands-Behind-Head Arch", steps: "1. Lie on your stomach with hands behind your head.\n2. Lift your chest and elbows off the floor.\n3. Hold 3 seconds. Repeat 10 times.", video: "" }
        ],

        "2. Posture & Shoulder Blade Strength (Anti-Hunch)": [
            { name: "Wall Angels", steps: "1. Stand with your back, head, and elbows against a wall.\n2. Slowly slide your arms up and down like a snow angel.\n3. Keep your back flat against the wall. Repeat 10 times.", video: "" },
            { name: "Brugger’s Posture Break", steps: "1. Sit at the edge of your chair with feet wide.\n2. Turn your palms out, tuck your chin, and pinch your shoulder blades together.\n3. Take 3 deep breaths. Repeat every hour at work.", video: "" },
            { name: "Scapular Squeezes", steps: "1. Sit tall and let your arms hang.\n2. Pinch your shoulder blades together as if holding a pencil between them.\n3. Hold 5 seconds. Repeat 15 times.", video: "" },
            { name: "The 'W' Pull", steps: "1. Hold your arms up so they form the letter 'W'.\n2. Pull your elbows down and back, squeezing your blades.\n3. Repeat 15 times.", video: "" },
            { name: "The 'Y' Lift", steps: "1. Stand and raise your arms up in a 'Y' shape.\n2. Squeeze your shoulder blades down toward your back pockets.\n3. Repeat 15 times.", video: "" },
            { name: "Prone 'T' Raise", steps: "1. Lie on your stomach with arms out to the side (T-shape).\n2. Lift your arms toward the ceiling, thumbs up.\n3. Repeat 15 times.", video: "" },
            { name: "Floor Cobras", steps: "1. Lie on your stomach with arms at your sides, palms down.\n2. Lift your chest and rotate your thumbs toward the ceiling.\n3. Repeat 12 times.", video: "" },
            { name: "Doorway Chest Opener", steps: "1. Place both forearms on a door frame.\n2. Step one foot forward until you feel a stretch in your chest.\n3. Hold 30 seconds. (Great for slumped shoulders).", video: "" },
            { name: "Serratus Wall Slides", steps: "1. Place your forearms on a wall.\n2. Slide them up while pushing your body away from the wall.\n3. Repeat 12 times.", video: "" },
            { name: "Chin Tucks (Seated)", steps: "1. Look straight ahead.\n2. Pull your chin straight back to make a double chin.\n3. Repeat 15 times. (Fixes 'Forward Head' posture).", video: "" }
        ],

        "3. Rib Expansion & Breathing": [
            { name: "Deep Belly Breathing", steps: "1. Place one hand on your chest and one on your belly.\n2. Breathe in so only the belly hand moves.\n3. Repeat 10 times to relax the upper back.", video: "" },
            { name: "Rib Cage Expansion", steps: "1. Wrap a towel or hands around your lower ribs.\n2. Breathe in and try to push your hands outward with your ribs.\n3. Repeat 10 times.", video: "" },
            { name: "Pursed Lip Breathing", steps: "1. Breathe in through your nose.\n2. Breathe out slowly through puckered lips.\n3. Repeat 5 times.", video: "" },
            { name: "Seated Side-Reach Breath", steps: "1. Reach one arm overhead and bend to the side.\n2. Take a deep breath into the side being stretched.\n3. Repeat 5 times each side.", video: "" },
            { name: "Stomach Vacuum", steps: "1. Exhale all your air.\n2. Pull your belly button in as tight as possible and hold.\n3. Hold 5 seconds. Repeat 5 times.", video: "" }
        ],

        "4. Desk & Office Relief (Quick Breaks)": [
            { name: "Over-the-Chair Arch", steps: "1. Sit in a chair with a low back.\n2. Clasp hands behind your head.\n3. Lean back over the top of the chair. Repeat 10 times.", video: "" },
            { name: "Desk Press-Away", steps: "1. Sit at your desk and place hands on the edge.\n2. Push the desk away and drop your head between your arms.\n3. Hold 20 seconds.", video: "" },
            { name: "Shoulder Blade Circles", steps: "1. Roll your shoulders in large circles, focus on moving the blades.\n2. Do 15 circles backward.", video: "" },
            { name: "Seated Figure-4 (Posture)", steps: "1. Cross one ankle over your knee while sitting tall.\n2. Keep your back straight and lean forward slightly.\n3. Repeat 30 seconds each side.", video: "" },
            { name: "Standing 'I' Wall Stretch", steps: "1. Stand with your back to a wall.\n2. Reach both arms straight up and touch the wall with your thumbs.\n3. Repeat 15 times.", video: "" },
            { name: "Neck Side Stretch", steps: "1. Sit on one hand.\n2. Tilt your head to the opposite side.\n3. Hold 20 seconds each side.", video: "" },
            { name: "The 'High-V' Stretch", steps: "1. Clasp your hands behind your back.\n2. Pull your hands down and away from your bottom.\n3. Hold 20 seconds.", video: "" }
        ],

        "5. Functional & Advanced Stability": [
            { name: "Bird-Dog (Mid-Back Focus)", steps: "1. On hands and knees.\n2. Reach opposite arm and leg out.\n3. Keep your back as flat as a table. Repeat 10 times each side.", video: "" },
            { name: "Plank with Shoulder Taps", steps: "1. Hold a push-up position.\n2. Tap your opposite shoulder with one hand.\n3. Do not let your hips or back wiggle. Repeat 20 times.", video: "" },
            { name: "Quadruped Rotation", steps: "1. On hands and knees, place one hand behind your head.\n2. Touch your elbow to the opposite wrist, then rotate it toward the ceiling.\n3. Repeat 10 times each side.", video: "" },
            { name: "Squat with Overhead Reach", steps: "1. Squat down and touch the floor.\n2. Stand up and reach both arms toward the ceiling.\n3. Repeat 15 times.", video: "" },
            { name: "Standing Windmills", steps: "1. Feet wide, arms out like a 'T'.\n2. Bend and touch your right hand to your left foot.\n3. Repeat 10 times each side.", video: "" },
            { name: "Lunge with Twist", steps: "1. Step forward into a lunge.\n2. Twist your upper body toward the front leg.\n3. Repeat 10 times each side.", video: "" },
            { name: "Bear Crawl", steps: "1. Crawl forward on hands and toes with knees hovering off the floor.\n2. Keep your back flat. Move for 30 seconds.", video: "" },
            { name: "Superman (Mid-Back Squeeze)", steps: "1. Lie on your stomach.\n2. Lift arms and chest, and pinch your blades together.\n3. Repeat 12 times.", video: "" },
            { name: "Farmer's Walk (Posture Check)", steps: "1. Hold a heavy bag in each hand.\n2. Walk for 1 minute while keeping your chest up and head tall.", video: "" },
            { name: "Wall Slide Squat", steps: "1. Lean against a wall.\n2. Slide down into a squat while keeping your arms in the 'Wall Angel' position.\n3. Repeat 10 times.", video: "" },
            { name: "Single Leg Stance (with Reach)", steps: "1. Stand on one leg.\n2. Reach both arms forward and twist side to side.\n3. Repeat 10 times.", video: "" },
            { name: "The 'Good Morning' Hinge", steps: "1. Hands behind head, feet shoulder-width.\n2. Bend forward at the hips with a perfectly straight back.\n3. Repeat 15 times.", video: "" },
            { name: "Prone Flutter Kicks", steps: "1. Lie on your stomach.\n2. Lift arms and legs slightly and flutter them up and down.\n3. Repeat for 30 seconds.", video: "" },
            { name: "Standing 'Y-T-W' Sequence", steps: "1. Raise arms to Y, then T, then W position.\n2. Squeeze your shoulder blades in each position.\n3. Repeat 10 times.", video: "" },
            { name: "Wall Push-Offs", steps: "1. Stand facing a wall, arms out.\n2. Fall toward the wall and push back quickly using your shoulder blades.\n3. Repeat 15 times.", video: "" },
            { name: "Bent-Over Row (No Weight)", steps: "1. Lean forward with a flat back.\n2. Pull your elbows to the ceiling and squeeze your blades hard.\n3. Repeat 20 times.", video: "" },
            { name: "Back-to-Wall Chin Tucks", steps: "1. Stand against a wall.\n2. Try to touch the back of your neck to the wall by tucking your chin.\n3. Repeat 15 times.", video: "" },
            { name: "Torso Rotations (Band)", steps: "1. Hold a band attached to a door.\n2. Pull the band across your body using your core and mid-back.\n3. Repeat 15 times each side.", video: "" },
            { name: "The 'Star' Reach", steps: "1. Stand on one leg.\n2. Reach your arms out in all directions while keeping your back tall.\n3. Repeat 5 times each leg.", video: "" }
        ]
    },
    "Neuro & Balance": {
        "1. Basic Balance & Fall Prevention": [
            { name: "Feet Together Stand", steps: "1. Stand in a corner or near a counter for safety.\n2. Bring your feet together so they touch.\n3. Try to stand still without holding on.\n4. Hold for 30 seconds.", video: "" },
            { name: "One-Leg Balance", steps: "1. Stand near a counter.\n2. Lift one foot off the floor.\n3. Try to balance on the other leg for 20 seconds.\n4. Switch legs.", video: "" },
            { name: "Heel-to-Toe Stand", steps: "1. Place one foot directly in front of the other (heel touching toe).\n2. Look straight ahead.\n3. Try to hold this position for 20 seconds. Switch feet.", video: "" },
            { name: "Eyes-Closed Balance", steps: "1. Stand with feet together near a wall.\n2. Once steady, slowly close your eyes.\n3. Try to stay balanced for 15 seconds. Open eyes immediately if wobbly.", video: "" },
            { name: "Weight Shifting (Side-to-Side)", steps: "1. Stand with feet wide.\n2. Slowly shift all your weight to the right leg, then all to the left.\n3. Repeat 20 times.", video: "" },
            { name: "Weight Shifting (Circle)", steps: "1. Stand tall.\n2. Shift your weight in a slow circle: front, right, back, left.\n3. Repeat 10 circles.", video: "" },
            { name: "Rocking Horse", steps: "1. Stand with one foot in front of the other.\n2. Rock forward onto your front toes, then back onto your back heel.\n3. Repeat 15 times.", video: "" },
            { name: "Head Turns while Standing", steps: "1. Stand with feet together.\n2. Slowly turn your head to look right, then left while staying balanced.\n3. Repeat 10 times.", video: "" },
            { name: "Looking Up and Down (Balance)", steps: "1. Stand tall.\n2. Slowly look up at the ceiling, then down at your toes.\n3. Repeat 10 times.", video: "" },
            { name: "Standing Tummy Bracing", steps: "1. Stand tall and tighten your stomach muscles.\n2. Hold the tension for 10 seconds while breathing normally.\n3. Repeat 10 times.", video: "" }
        ],

        "2. Dizziness & Vertigo (Vestibular)": [
            { name: "Gaze Stabilization (Side-to-Side)", steps: "1. Hold your thumb at arm's length.\n2. Keep your eyes fixed on your thumb.\n3. Slowly move your head side-to-side while keeping the thumb in focus.\n4. Do this for 1 minute.", video: "" },
            { name: "Gaze Stabilization (Up and Down)", steps: "1. Keep your eyes on your thumb.\n2. Slowly move your head up and down while keeping the thumb in focus.\n3. Do this for 1 minute.", video: "" },
            { name: "Smooth Tracking", steps: "1. Hold your thumb out.\n2. Move your thumb slowly side-to-side.\n3. Follow the thumb with your eyes only (don't move your head).\n4. Repeat 20 times.", video: "" },
            { name: "Brandt-Daroff Exercise", steps: "1. Sit on the edge of your bed.\n2. Quickly lie down on your right side with your head turned up.\n3. Stay for 30 seconds until dizziness stops.\n4. Sit up and repeat on the left side.", video: "" },
            { name: "Walking with Head Turns", steps: "1. Walk slowly in a straight line.\n2. Turn your head to the right for two steps, then the left for two steps.\n3. Repeat for 10 steps.", video: "" },
            { name: "Walking with Head Nods", steps: "1. Walk slowly.\n2. Look up for two steps, then down for two steps.\n3. Repeat for 10 steps.", video: "" },
            { name: "The 'Target' Jump", steps: "1. Place two sticky notes on a wall 2 feet apart.\n2. Quickly move your eyes from one note to the other without moving your head.\n3. Repeat 20 times.", video: "" },
            { name: "Sit-to-Stand with Eyes Closed", steps: "1. Sit in a sturdy chair.\n2. Close your eyes and slowly stand up.\n3. Open your eyes once you feel steady. Repeat 5 times.", video: "" },
            { name: "Ball Toss (Balance)", steps: "1. Stand tall and toss a tennis ball from one hand to the other.\n2. Follow the ball with your eyes.\n3. Repeat for 1 minute.", video: "" },
            { name: "Ear-to-Shoulder (Vestibular)", steps: "1. Tilt your head toward your shoulder, then the other.\n2. Keep eyes open and fixed on a spot on the wall.\n3. Repeat 10 times.", video: "" }
        ],

        "3. Parkinson’s & Large Movement (BIG Style)": [
            { name: "The BIG Step Forward", steps: "1. Take an extra-large step forward with your right foot.\n2. Swing both arms wide and high.\n3. Stomp your foot down firmly and return. Repeat 10 times.", video: "" },
            { name: "The BIG Step Sideways", steps: "1. Take a huge step to the right.\n2. Reach your arms out as wide as possible.\n3. Step back to center. Repeat 10 times.", video: "" },
            { name: "The BIG Reach (Up and Down)", steps: "1. Reach both arms as high as you can toward the ceiling.\n2. Then reach down and touch your toes with a big movement.\n3. Repeat 10 times.", video: "" },
            { name: "Sitting Big Twists", steps: "1. Sit at the edge of a chair.\n2. Reach your right arm all the way behind you and look at it.\n3. Switch to the left arm. Repeat 10 times.", video: "" },
            { name: "High-Knee Marching", steps: "1. March in place, lifting your knees as high as possible.\n2. Swing your arms in an exaggerated way.\n3. Do this for 1 minute.", video: "" },
            { name: "Fingertip Tapping (Fast)", steps: "1. Tap your thumb to each finger as fast and as wide as you can.\n2. Make sure you open your hand fully between each tap.\n3. Repeat 20 times.", video: "" },
            { name: "Power Rocking", steps: "1. Sit and reach both arms forward.\n2. Rock your body forward and backward with a big, powerful motion.\n3. Repeat 15 times.", video: "" },
            { name: "Standing Star Reach", steps: "1. Stand with feet wide.\n2. Reach your arms out like a star.\n3. Lean and reach toward different 'points' of the star with large movements.", video: "" },
            { name: "Rhythmic Clapping", steps: "1. Clap your hands together firmly, then tap your knees.\n2. Do this in a steady, loud rhythm for 1 minute.", video: "" },
            { name: "Big Arm Circles", steps: "1. Swing your arms in the largest circles possible.\n2. Move slowly and feel the full range. Repeat 10 times.", video: "" }
        ],

        "4. Stroke & Coordination (Weak Side Focus)": [
            { name: "Weak Side Weight Shift", steps: "1. Stand near a counter.\n2. Gently lean your body until most of your weight is on your weaker leg.\n3. Hold for 5 seconds. Repeat 10 times.", video: "" },
            { name: "Clasped Arm Raises", steps: "1. Clasp your hands together in front of you.\n2. Use your strong arm to help lift your weak arm overhead.\n3. Lower slowly. Repeat 10 times.", video: "" },
            { name: "Table Slides (Affected Side)", steps: "1. Sit at a table with your weak arm on a cloth.\n2. Slide the arm forward as far as it can go, then pull it back.\n3. Repeat 15 times.", video: "" },
            { name: "Heel Taps (Sitting)", steps: "1. Sit in a chair.\n2. Lift the heel of your weak leg and tap it on the floor.\n3. Repeat 20 times.", video: "" },
            { name: "Toe Taps (Sitting)", steps: "1. Keep your heel on the floor.\n2. Lift the front of your weak foot and tap your toes.\n3. Repeat 20 times.", video: "" },
            { name: "Assisted Knee Extension", steps: "1. Sit in a chair.\n2. Use your strong leg to help lift and straighten your weak leg.\n3. Hold for 3 seconds. Repeat 10 times.", video: "" },
            { name: "Hand-to-Mouth Practice", steps: "1. Practice moving your weak hand from your lap to your mouth (like eating).\n2. Repeat the motion 15 times slowly.", video: "" },
            { name: "Grip and Release", steps: "1. Use your weak hand to squeeze a soft sponge.\n2. Try to fully open your fingers to release it.\n3. Repeat 15 times.", video: "" },
            { name: "Sitting Side-Leans", steps: "1. Sit on a bed or chair without arms.\n2. Lean toward your weak side, supporting yourself with your elbow.\n3. Push back to center. Repeat 10 times.", video: "" },
            { name: "Bilateral Reach", steps: "1. Reach both arms forward to touch a wall.\n2. Focus on making sure both hands touch at the same time.\n3. Repeat 15 times.", video: "" }
        ],

        "5. Gait & Cognitive Walking (Dual Task)": [
            { name: "Tandem Walking (Line Walk)", steps: "1. Walk in a straight line, putting your heel directly in front of your toes.\n2. Take 15 steps. Use a wall for balance if needed.", video: "" },
            { name: "Side Stepping", steps: "1. Face a wall or counter.\n2. Take 10 steps to the right, then 10 steps to the left.\n3. Keep your steps even.", video: "" },
            { name: "Backward Walking", steps: "1. In a clear hallway, walk backward carefully for 20 steps.\n2. Reach back with your toes first.", video: "" },
            { name: "Walking while Counting", steps: "1. Walk at a normal pace.\n2. While walking, count backward from 100 by 3s (100, 97, 94...).\n3. This helps the brain and body work together.", video: "" },
            { name: "Walking while Naming Things", steps: "1. Walk through the house.\n2. Name every object you see out loud as you pass it.\n3. Continue for 2 minutes.", video: "" },
            { name: "Braiding Steps (Grapevine)", steps: "1. Step to the side with your right foot.\n2. Cross your left foot in front of the right.\n3. Step to the side again, then cross the left foot behind.\n4. Repeat 10 steps.", video: "" },
            { name: "Obstacle Step-Overs", steps: "1. Place small items (like shoes) on the floor.\n2. Carefully step over each one with high knees.\n3. Repeat for 5 items.", video: "" },
            { name: "The 'Stop and Turn'", steps: "1. Walk forward quickly.\n2. When you hear a timer or cue, stop immediately and turn 180 degrees.\n3. Repeat 5 times.", video: "" },
            { name: "Walking with a Tray", steps: "1. Walk while holding a tray or a plastic cup of water.\n2. Try not to spill. Walk for 1 minute.", video: "" },
            { name: "Corner Turns", steps: "1. Practice walking around corners or furniture in a tight circle.\n2. Go both clockwise and counter-clockwise.", video: "" }
        ]
    },
    "Respiratory & Specialty": {
        "1. Breathing & Lung Health": [
            { name: "Deep Belly Breathing", steps: "1. Place one hand on your chest and the other on your belly.\n2. Breathe in through your nose so only the hand on your belly rises.\n3. Breathe out slowly through your mouth. Repeat 10 times.", video: "" },
            { name: "Whistle Breathing (Pursed Lip)", steps: "1. Breathe in through your nose.\n2. Pucker your lips like you are going to whistle.\n3. Breathe out through your puckered lips as slowly as possible.\n4. Repeat 10 times.", video: "" },
            { name: "Rib Expansion Breathing", steps: "1. Wrap your hands around your lower rib cage.\n2. Breathe in deeply and try to push your hands outward with your ribs.\n3. Exhale fully. Repeat 10 times.", video: "" },
            { name: "Box Breathing (4-4-4-4)", steps: "1. Breathe in for 4 seconds.\n2. Hold your breath for 4 seconds.\n3. Breathe out for 4 seconds.\n4. Hold your breath for 4 seconds. Repeat 5 times.", video: "" },
            { name: "The 'Huff' Cough", steps: "1. Take a medium breath in.\n2. Open your mouth wide and squeeze the air out fast (like fogging a mirror).\n3. Do this 3 times to help clear your lungs.", video: "" },
            { name: "Shoulder-Back Breathing", steps: "1. Sit tall and pull your shoulders back.\n2. Take a deep breath into the top of your chest.\n3. Exhale and relax. Repeat 10 times.", video: "" },
            { name: "Segmental Breathing (Side)", steps: "1. Place one hand on the side of your ribs.\n2. Breathe in and try to direct the air only into that hand.\n3. Repeat 10 times each side.", video: "" },
            { name: "Straw Breathing", steps: "1. Imagine you are breathing through a straw.\n2. Take a normal breath in, then blow out through a tiny hole in your lips.\n3. Repeat 10 times.", video: "" },
            { name: "Deep Breath & Reach", steps: "1. Breathe in and reach both arms overhead.\n2. Breathe out and lower your arms.\n3. Repeat 10 times.", video: "" },
            { name: "Sniffing Breath", steps: "1. Take 3 short sniffs in through your nose without exhaling.\n2. Then let out one long breath. Repeat 5 times.", video: "" },
            { name: "Bubble Blowing (Imaginary)", steps: "1. Take a deep breath.\n2. Blow out long and steady as if trying to blow a huge bubble.\n3. Repeat 10 times.", video: "" },
            { name: "Sighing Release", steps: "1. Take a deep breath in.\n2. Let out a loud, heavy sigh. Repeat 5 times to relax the chest.", video: "" },
            { name: "Chest Wall Stretch", steps: "1. Clasp your hands behind your head.\n2. Pull your elbows back and take a deep breath.\n3. Repeat 5 times.", video: "" },
            { name: "Incentive Spirometer (Deep Fill)", steps: "1. Put the mouthpiece in and breathe in as deep and slow as you can.\n2. Try to keep the ball or piston up for 3 seconds.\n3. Repeat 10 times every hour after surgery.", video: "" },
            { name: "Forward Lean Breathing", steps: "1. Sit and lean forward with your elbows on your knees.\n2. Take slow, calm breaths. This helps when you feel short of breath.", video: "" }
        ],

        "2. Pelvic Floor Strength & Control": [
            { name: "The Slow Squeeze (Kegel)", steps: "1. Imagine you are trying to stop the flow of urine.\n2. Squeeze and lift those internal muscles.\n3. Hold for 5 seconds, then fully relax. Repeat 10 times.", video: "" },
            { name: "Fast Squeezes (Flicks)", steps: "1. Quickly squeeze and release your pelvic muscles.\n2. Do 10 quick 'flicks' in a row.\n3. Rest and repeat 3 times.", video: "" },
            { name: "The Elevator Lift", steps: "1. Squeeze your pelvic muscles gently (Floor 1).\n2. Squeeze tighter (Floor 2).\n3. Squeeze as tight as you can (Floor 3).\n4. Slowly release Floor by Floor.", video: "" },
            { name: "Squeeze and Bridge", steps: "1. Lie on your back with knees bent.\n2. Squeeze your pelvic muscles.\n3. Keep holding the squeeze while you lift your hips into a bridge.\n4. Repeat 10 times.", video: "" },
            { name: "Seated Pelvic Lift", steps: "1. Sit tall in a chair.\n2. Try to lift your pelvic muscles off the seat without moving your legs.\n3. Hold 5 seconds. Repeat 10 times.", video: "" },
            { name: "Tummy Drawing (Lower Abs)", steps: "1. Lie on your back.\n2. Gently pull your lower tummy in toward your spine.\n3. Keep breathing. Hold 10 seconds. Repeat 10 times.", video: "" },
            { name: "Butterfly Opening (Relaxation)", steps: "1. Lie on your back with feet together and knees out.\n2. Breathe deeply and let your pelvic area relax completely.\n3. Hold for 1 minute.", video: "" },
            { name: "Knee-Fall Outs", steps: "1. Lie on your back, knees bent.\n2. Slowly let one knee fall to the side while keeping your tummy still.\n3. Pull it back. Repeat 10 times each side.", video: "" },
            { name: "Squat Breathing", steps: "1. Hold onto a counter and go into a small squat.\n2. Take a deep breath and feel your pelvic floor relax.\n3. Stand back up. Repeat 10 times.", video: "" },
            { name: "Child's Pose (Pelvic Release)", steps: "1. Kneel and sit on your heels.\n2. Reach forward. Breathe deeply into your lower back and pelvic area.\n3. Hold 30 seconds.", video: "" }
        ],

        "3. Jaw (TMJ) & Facial Exercises": [
            { name: "The Big Smile", steps: "1. Smile as wide as you can.\n2. Hold for 5 seconds.\n3. Relax. Repeat 10 times.", video: "" },
            { name: "Pucker Up", steps: "1. Pucker your lips like you are going to kiss.\n2. Hold for 5 seconds. Repeat 10 times.", video: "" },
            { name: "Eyebrow Raises", steps: "1. Lift your eyebrows as high as possible (look surprised).\n2. Hold 3 seconds. Repeat 10 times.", video: "" },
            { name: "Tongue to Roof (Jaw Rest)", steps: "1. Place the tip of your tongue on the roof of your mouth just behind your teeth.\n2. This is the 'resting' position for your jaw. Keep it here for 1 minute.", video: "" },
            { name: "Jaw Side-to-Side", steps: "1. Open your mouth slightly.\n2. Gently move your jaw to the right, then to the left.\n3. Repeat 10 times.", video: "" },
            { name: "Resisted Jaw Opening", steps: "1. Place two fingers under your chin.\n2. Try to open your mouth while your fingers push up slightly.\n3. Repeat 10 times.", video: "" },
            { name: "Jaw Circles (Gentle)", steps: "1. Move your jaw in a slow, circular motion.\n2. Do 5 circles each way.", video: "" },
            { name: "Tongue Clicks", steps: "1. Make a loud 'clicking' sound with your tongue against the roof of your mouth.\n2. Repeat 20 times. (Helps with jaw positioning).", video: "" },
            { name: "Goldfish Exercises", steps: "1. Place a finger on your jaw joint (near your ear).\n2. Open your mouth halfway and close it.\n3. Repeat 15 times.", video: "" },
            { name: "Cheek Puffs", steps: "1. Puff your cheeks out with air.\n2. Hold for 5 seconds. Repeat 10 times.", video: "" }
        ],

        "4. Swelling & Drainage (Lymphedema)": [
            { name: "Arm Drainage Stroke", steps: "1. Use your opposite hand to gently stroke the skin from your wrist toward your shoulder.\n2. Use very light pressure (like petting a cat).\n3. Repeat for 2 minutes.", video: "" },
            { name: "Leg Drainage Stroke", steps: "1. Stroke the skin from your ankle up toward your hip.\n2. Always move toward your heart.\n3. Repeat for 2 minutes.", video: "" },
            { name: "Fist Squeeze & Release", steps: "1. Make a tight fist, then spread your fingers wide.\n2. Repeat 20 times quickly to help pump fluid out of the hand.", video: "" },
            { name: "Elbow Pumps", steps: "1. Bend and straighten your elbow 20 times.\n2. This helps clear fluid from the lower arm.", video: "" },
            { name: "Ankle Pumps (Drainage)", steps: "1. Move your feet up and down 30 times to pump fluid out of the legs.", video: "" },
            { name: "Deep Neck Drainage", steps: "1. Use your fingertips to gently stroke from behind your ears down toward your collarbone.\n2. Repeat 10 times.", video: "" },
            { name: "Shoulder Shrugs (Fluid)", steps: "1. Shrug your shoulders up and down 15 times to help clear the upper chest area.", video: "" }
        ],

        "5. Energy & Relaxation": [
            { name: "Energy Pacing (10-Minute Rule)", steps: "1. Do a physical task for 10 minutes.\n2. Sit and rest for 5 minutes before you feel tired.\n3. This prevents the 'crash' from over-working.", video: "" },
            { name: "Progressive Tense & Release", steps: "1. Squeeze your feet tight, then let go.\n2. Squeeze your legs, then let go.\n3. Continue up your whole body to release deep stress.", video: "" },
            { name: "Hand-to-Nose Focus", steps: "1. Close your eyes.\n2. Slowly touch your nose with your index finger.\n3. Repeat 10 times. (Helps with brain-body connection).", video: "" },
            { name: "Visual Relaxation", steps: "1. Close your eyes and imagine a peaceful place.\n2. Breathe slowly for 2 minutes.", video: "" },
            { name: "Gentle Full-Body Reach", steps: "1. While seated, reach your arms and legs out as far as they can go.\n2. Hold for 5 seconds and relax. Repeat 5 times.", video: "" },
            { name: "Head-to-Toe Body Scan", steps: "1. Lie flat and close your eyes.\n2. Focus on the feeling of your toes, then feet, then legs, all the way to your head.\n3. Take 5 minutes.", video: "" },
            { name: "Calm Hands Hold", steps: "1. Place one hand over the other on your chest.\n2. Feel your heartbeat and take 5 slow breaths.", video: "" },
            { name: "Ear Massage (Stress)", steps: "1. Gently rub your earlobes between your thumb and finger.\n2. This helps calm the nervous system. Do for 1 minute.", video: "" }
        ]
    }
};