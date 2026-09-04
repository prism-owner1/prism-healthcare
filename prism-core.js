// ---------- AUTO-SCALING FOR MOBILE BILL VIEW ----------
        function adjustBillScale() {
            const container = document.getElementById('bill-content-pages');
            if (!container) return;
            const pages = container.querySelectorAll('.bill-page');
            const screenWidth = window.innerWidth;
            
            pages.forEach(page => {
                if (screenWidth < 1024) {
                    // Standard A4 print width is 210mm (~794px at 96 DPI)
                    const originalWidth = 794; 
                    const padding = 16; // Safe margins for mobile viewports
                    const scale = (screenWidth - padding) / originalWidth;
                    
                    // Maintain layout dimensions so table text and footer do not warp
                    page.style.width = '210mm';
                    page.style.minHeight = '297mm';
                    page.style.padding = '20mm';
                    page.style.position = 'relative';
                    
                    // Scaledown with zoom if supported (Blink/WebKit standard)
                    if ('zoom' in document.body.style) {
                        page.style.zoom = scale;
                        page.style.transform = 'none';
                        page.style.marginBottom = '20px';
                    } else {
                        // Fallback scale transform
                        page.style.transform = `scale(${scale})`;
                        page.style.transformOrigin = 'top center';
                        const originalHeight = 1123; // ~297mm in pixels
                        const gap = originalHeight - (originalHeight * scale);
                        page.style.marginBottom = `${-gap + 20}px`;
                    }
                } else {
                    // Restore desktop default standard styles
                    page.style.transform = '';
                    page.style.zoom = '';
                    page.style.transformOrigin = '';
                    page.style.marginBottom = '20px';
                    page.style.width = '';
                    page.style.minHeight = '';
                    page.style.padding = '';
                }
            });
        }

        // Automatically re-scale if the phone changes orientation
        window.addEventListener('resize', adjustBillScale);

        // ---------- LOCK SCREEN LOGIC ----------

        const getLocalISOString = () => new Date().toLocaleDateString('sv-SE');
function updateLiveClock() {
    const dateEl = document.getElementById('live-date-text');
    const timeEl = document.getElementById('live-time-text');
    if (!dateEl || !timeEl) return;
    
    const now = new Date();
    
    // Format Date (e.g., Wed, 29 Jul 2026)
    const dateStr = now.toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    
    // Format Time (e.g., 05:00:48 PM)
    const timeStr = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    
    dateEl.innerText = dateStr;
    timeEl.innerText = timeStr;
}
updateLiveClock();
setInterval(updateLiveClock, 1000);

        function unlockApp() {
    document.getElementById('lock-screen').style.display = 'none';
    const root = document.getElementById('app-root');
    root.style.display = 'flex';
    root.classList.remove('hidden');
    try {
        sessionStorage.setItem('prism_unlocked', '1');
    } catch (e) {}
    const todayStr = getLocalISOString();
    const regDateEl = document.getElementById('en-reg-date');
    if (regDateEl) regDateEl.value = todayStr;
    const registryDateEl = document.getElementById('registry-date-input');
    if (registryDateEl) registryDateEl.value = todayStr;
    lucide.createIcons();
    loadAdminData(false);
    // Initialize the inactivity tracking timer immediately upon unlock
    if (window.resetInactivityTimer) resetInactivityTimer();
}

   // Reusable helper to format phone inputs to: "+91 [10 digits]"
function setupPhoneInputFormatting(inputElement) {
    if (!inputElement) return;

    inputElement.type = 'tel';

    inputElement.addEventListener('input', function(e) {
        let value = e.target.value;

        // Isolate the actual user number from the +91 prefix
        let cleanValue = value;
        if (value.startsWith('+91')) {
            cleanValue = value.substring(3); // Skip "+91" prefix
        } else if (value.startsWith('91') && value.length > 10) {
            cleanValue = value.substring(2); // Handle full numbers with country code pasted in
        }

        // Extract only numeric digits from the remaining user portion
        let digits = cleanValue.replace(/\D/g, '');

        // Limit the user's typed phone number to exactly 10 digits
        let truncated = digits.substring(0, 10);

        // Reapply formatting
        if (truncated.length > 0) {
            e.target.value = '+91 ' + truncated;
        } else {
            e.target.value = '';
        }
    });

    // Prevent cursor from getting stuck on "+91 " when backspacing
    inputElement.addEventListener('keydown', function(e) {
        if (this.value.length <= 5 && (e.key === 'Backspace' || e.key === 'Delete')) {
            this.value = '';
            e.preventDefault();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.lucide) lucide.createIcons();
    
    // Setup formatting for the main patient registration inputs
    setupPhoneInputFormatting(document.getElementById('en-phone'));
    setupPhoneInputFormatting(document.getElementById('ep-phone'));

    // Auto-unlock if a valid session already exists (survives refresh)
    try {
        if (sessionStorage.getItem('prism_unlocked') === '1') {
            unlockApp();
        }
    } catch (e) {}
});

    function toggleLockPasswordVisibility() {
    const input = document.getElementById('lock-password');
    const icon = document.getElementById('lock-eye-icon');
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    icon.setAttribute('data-lucide', isHidden ? 'eye-off' : 'eye');
    lucide.createIcons();
}

async function checkLockPassword() {
    const user = document.getElementById('lock-username').value.trim();
    const val = document.getElementById('lock-password').value;
    const errEl = document.getElementById('lock-error');
    const btn = document.getElementById('lock-submit');
    const label = document.getElementById('lock-submit-label');
    const spinner = document.getElementById('lock-spinner');
    const card = document.getElementById('lock-card');

    if (!user || !val) {
        errEl.innerText = 'Please enter both username and password.';
        return;
    }

    btn.disabled = true;
    label.style.opacity = '0.7';
    spinner.style.display = 'inline-block';
    errEl.innerText = '';

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({
                action: "verifyPassword",
                username: user,
                password: val
            })
        });
        const result = await response.json();

        if (result && result.status === 'success') {
            errEl.innerText = '';
            try { sessionStorage.setItem('prism_user', user); } catch (e) {}
            unlockApp();
        } else {
            throw new Error(result.message || 'Incorrect username or password.');
        }
    } catch (e) {
        errEl.innerText = e.message || 'Verification failed. Try again.';
        document.getElementById('lock-password').value = '';
        document.getElementById('lock-password').focus();
        card.classList.remove('shake');
        void card.offsetWidth;
        card.classList.add('shake');
    } finally {
        btn.disabled = false;
        label.style.opacity = '1';
        spinner.style.display = 'none';
    }
}
        // ---------- MOBILE SIDEBAR DRAWER ----------
        function openSidebar() {
            document.getElementById('sidebar').classList.add('sidebar-open');
            document.getElementById('sidebar-overlay').classList.add('active');
        }

        function closeSidebar() {
            document.getElementById('sidebar').classList.remove('sidebar-open');
            document.getElementById('sidebar-overlay').classList.remove('active');
        }

        // ---------- PWA: SERVICE WORKER REGISTRATION ----------
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('service-worker.js').catch(() => {});
            });
        }

        // ---------- PWA: INSTALL PROMPT ----------
        let deferredInstallPrompt = null;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredInstallPrompt = e;
        });

        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyknqWUwUFsjAmFapjZBmziezQ-eedS8IpXv1A5qLu2_OXUQ1euHMWuqaZ-lyGe8F0lxQ/exec';
        const VERIFY_BASE_URL = 'https://prismhealthcare.in/verify.html';
        const PRISM_LOGO_SRC = "https://prismhealthcare.in/prism1.png";

        const ROWS_PER_LEDGER_PAGE = 14;

        function chunkArray(arr, size) {
            const out = [];
            for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
            return out;
        }

// ---- zone map (approximate, in source-image pixel coordinates, 1023 x 723) ----
const IMG_W = 1023, IMG_H = 723;
const ZONES = [
  // FRONT
  {pose:'Front', label:'Head / Face', x1:140,y1:20,x2:220,y2:90},
  {pose:'Front', label:'Neck (Sternocleidomastoid)', x1:150,y1:85,x2:230,y2:140},
  {pose:'Front', label:'Left Shoulder (Deltoid)', x1:90,y1:130,x2:150,y2:205},
  {pose:'Front', label:'Right Shoulder (Deltoid)', x1:230,y1:130,x2:290,y2:205},
  {pose:'Front', label:'Chest (Pectoralis)', x1:145,y1:140,x2:235,y2:222},
  {pose:'Front', label:'Left Biceps', x1:70,y1:185,x2:118,y2:262},
  {pose:'Front', label:'Right Biceps', x1:258,y1:185,x2:306,y2:262},
  {pose:'Front', label:'Abdominals (Rectus Abdominis)', x1:160,y1:215,x2:218,y2:322},
  {pose:'Front', label:'Left Oblique', x1:125,y1:215,x2:162,y2:322},
  {pose:'Front', label:'Right Oblique', x1:216,y1:215,x2:253,y2:322},
  {pose:'Front', label:'Left Forearm', x1:50,y1:255,x2:98,y2:347},
  {pose:'Front', label:'Right Forearm', x1:268,y1:255,x2:316,y2:347},
  {pose:'Front', label:'Left Hand / Wrist', x1:8,y1:345,x2:62,y2:402},
  {pose:'Front', label:'Right Hand / Wrist', x1:308,y1:345,x2:362,y2:402},
  {pose:'Front', label:'Groin / Hip Flexor', x1:175,y1:320,x2:205,y2:360},
  {pose:'Front', label:'Left Quadriceps', x1:110,y1:325,x2:190,y2:468},
  {pose:'Front', label:'Right Quadriceps', x1:190,y1:325,x2:270,y2:468},
  {pose:'Front', label:'Left Calf (Tibialis/Gastrocnemius)', x1:122,y1:478,x2:168,y2:612},
  {pose:'Front', label:'Right Calf (Tibialis/Gastrocnemius)', x1:202,y1:478,x2:248,y2:612},
  {pose:'Front', label:'Left Foot / Ankle', x1:108,y1:610,x2:172,y2:662},
  {pose:'Front', label:'Right Foot / Ankle', x1:198,y1:610,x2:262,y2:662},

  // SIDE (lateral)
  {pose:'Lateral', label:'Head / Face', x1:478,y1:28,x2:558,y2:98},
  {pose:'Lateral', label:'Neck', x1:503,y1:90,x2:548,y2:138},
  {pose:'Lateral', label:'Shoulder / Trapezius', x1:493,y1:128,x2:562,y2:212},
  {pose:'Lateral', label:'Chest (Pectoralis, partial)', x1:493,y1:150,x2:522,y2:198},
  {pose:'Lateral', label:'Triceps / Posterior Arm', x1:543,y1:158,x2:595,y2:262},
  {pose:'Lateral', label:'Abdomen / Oblique', x1:472,y1:208,x2:522,y2:322},
  {pose:'Lateral', label:'Forearm', x1:458,y1:253,x2:502,y2:347},
  {pose:'Lateral', label:'Hand / Wrist', x1:452,y1:345,x2:498,y2:402},
  {pose:'Lateral', label:'Glute', x1:538,y1:322,x2:582,y2:372},
  {pose:'Lateral', label:'Quadriceps', x1:478,y1:320,x2:548,y2:462},
  {pose:'Lateral', label:'Hamstring', x1:518,y1:398,x2:568,y2:492},
  {pose:'Lateral', label:'Calf', x1:503,y1:488,x2:558,y2:618},
  {pose:'Lateral', label:'Foot / Ankle', x1:458,y1:615,x2:562,y2:668},

  // BACK
  {pose:'Back', label:'Head', x1:788,y1:28,x2:868,y2:98},
  {pose:'Back', label:'Neck / Upper Trapezius', x1:788,y1:85,x2:872,y2:192},
  {pose:'Back', label:'Left Shoulder (Deltoid)', x1:733,y1:138,x2:792,y2:202},
  {pose:'Back', label:'Right Shoulder (Deltoid)', x1:868,y1:138,x2:927,y2:202},
  {pose:'Back', label:'Left Rotator Cuff / Rear Delt', x1:743,y1:150,x2:802,y2:202},
  {pose:'Back', label:'Right Rotator Cuff / Rear Delt', x1:858,y1:150,x2:917,y2:202},
  {pose:'Back', label:'Left Triceps', x1:713,y1:190,x2:752,y2:282},
  {pose:'Back', label:'Right Triceps', x1:908,y1:190,x2:947,y2:282},
  {pose:'Back', label:'Upper Back (Trapezius / Rhomboids)', x1:758,y1:195,x2:897,y2:282},
  {pose:'Back', label:'Lower Back (Erector Spinae)', x1:773,y1:280,x2:882,y2:322},
  {pose:'Back', label:'Left Forearm', x1:683,y1:238,x2:727,y2:332},
  {pose:'Back', label:'Right Forearm', x1:933,y1:238,x2:977,y2:332},
  {pose:'Back', label:'Left Hand / Wrist', x1:668,y1:345,x2:717,y2:402},
  {pose:'Back', label:'Right Hand / Wrist', x1:943,y1:345,x2:992,y2:402},
  {pose:'Back', label:'Left Glute', x1:763,y1:303,x2:828,y2:372},
  {pose:'Back', label:'Right Glute', x1:828,y1:303,x2:893,y2:372},
  {pose:'Back', label:'Left Hamstring', x1:753,y1:372,x2:823,y2:467},
  {pose:'Back', label:'Right Hamstring', x1:823,y1:372,x2:893,y2:467},
  {pose:'Back', label:'Left Calf', x1:753,y1:478,x2:823,y2:613},
  {pose:'Back', label:'Right Calf', x1:823,y1:478,x2:893,y2:613},
  {pose:'Back', label:'Left Foot / Ankle', x1:743,y1:610,x2:808,y2:662},
  {pose:'Back', label:'Right Foot / Ankle', x1:808,y1:610,x2:873,y2:662},
];

function findZone(px, py){
  let hit = ZONES.find(z => px>=z.x1 && px<=z.x2 && py>=z.y1 && py<=z.y2);
  if(hit) return hit;
  // fallback: nearest zone center
  let best=null, bestD=Infinity;
  for(const z of ZONES){
    const cx=(z.x1+z.x2)/2, cy=(z.y1+z.y2)/2;
    const d=(cx-px)**2+(cy-py)**2;
    if(d<bestD){bestD=d;best=z;}
  }
  return best;
}

// ---- state ----
let entries = [];
let nextId = 1;
let pendingClick = null; // {xPct, yPct, zone}
let editingId = null;
let selectedPain = null;

// ---- CORRECTED IDs: match actual HTML elements ----
const imageWrap = document.getElementById('enroll-image-wrap');
const anatomyImg = document.getElementById('enroll-anatomy-img');
const overlay = document.getElementById('overlay');
const emptyState = document.getElementById('enroll-empty-findings');
const entriesEl = document.getElementById('enroll-findings-list');

function severityClass(p){
  if(p===null||p===undefined) return 'mild';
  if(p<=3) return 'mild';
  if(p<=6) return 'moderate';
  return 'severe';
}
function severityColor(p){
  const c = severityClass(p);
  return c==='mild' ? '#5b9a68' : c==='moderate' ? '#d9a441' : '#c1473b';
}
function renderMarkersOnImage(){
  if (!imageWrap) return;
  imageWrap.querySelectorAll('.pain-marker').forEach(m => m.remove());
  entries.forEach(e => {
    const dot = document.createElement('div');
    dot.className = 'pain-marker';
    dot.style.cssText = `
      position:absolute;
      left:${e.xPct*100}%;
      top:${e.yPct*100}%;
      width:14px;height:14px;
      background:${severityColor(e.pain)};
      border:2px solid white;
      border-radius:50%;
      transform:translate(-50%,-50%);
      box-shadow:0 1px 4px rgba(0,0,0,.4);
      cursor:pointer;
      z-index:5;
    `;
    dot.title = e.region;
    dot.onclick = (ev) => { ev.stopPropagation(); openModal(null, e); };
    imageWrap.appendChild(dot);
  });
}

if (imageWrap) {
  imageWrap.addEventListener('click', (e)=>{
    const rect = anatomyImg.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;
    const px = xPct * IMG_W, py = yPct * IMG_H;
    const zone = findZone(px, py);
    openModal({xPct, yPct, zone});
  });
}

function openModal(click, existing){
  pendingClick = click;
  editingId = existing ? existing.id : null;
  selectedPain = existing ? existing.pain : null;
  document.getElementById('modalRegion').textContent = existing ? existing.region : click.zone.label;
  document.getElementById('modalPose').textContent = (existing ? existing.pose : click.zone.pose) + ' view';
  document.getElementById('fRegion').value = existing ? existing.region : click.zone.label;
  document.getElementById('fOnset').value = existing ? existing.onset : '';
  document.getElementById('fNotes').value = existing ? existing.notes : '';
  buildPainScale();
  wireQualifiers();
  document.querySelectorAll('#qualifiers label').forEach(l=>{
    const on = existing && existing.qualifiers && existing.qualifiers.includes(l.dataset.v);
    l.classList.toggle('on', !!on);
    l.querySelector('input').checked = !!on;
  });
  overlay.classList.add('show');
}

function closeModal(){
  overlay.classList.remove('show');
  pendingClick = null;
  editingId = null;
}

function buildPainScale(){
  const wrap = document.getElementById('painScale');
  wrap.innerHTML='';
  for(let i=0;i<=10;i++){
    const b=document.createElement('button');
    b.type='button'; b.textContent=i;
    if(selectedPain===i) b.classList.add('sel');
    b.addEventListener('click',()=>{
      selectedPain=i;
      wrap.querySelectorAll('button').forEach(x=>x.classList.remove('sel'));
      b.classList.add('sel');
    });
    wrap.appendChild(b);
  }
}
function wireQualifiers(){
  document.querySelectorAll('#qualifiers label').forEach(label => {
    label.onclick = (e) => {
      e.preventDefault();
      const input = label.querySelector('input');
      input.checked = !input.checked;
      label.classList.toggle('on', input.checked);
    };
  });
}

// ---- Save / Cancel button wiring ----
const cancelBtnEl = document.getElementById('cancelBtn');
if (cancelBtnEl) cancelBtnEl.addEventListener('click', closeModal);

const saveBtnEl = document.getElementById('saveBtn');
if (saveBtnEl) saveBtnEl.addEventListener('click', () => {
  const region = document.getElementById('fRegion').value.trim();
  const onset = document.getElementById('fOnset').value.trim();
  const notes = document.getElementById('fNotes').value.trim();
  const qualifiers = Array.from(document.querySelectorAll('#qualifiers label.on'))
    .map(l => l.dataset.v);

  if (!region) {
    showToast('Enter a location label', 'warning');
    return;
  }

  if (editingId) {
    const idx = entries.findIndex(e => e.id === editingId);
    if (idx > -1) {
      entries[idx] = { ...entries[idx], region, pain: selectedPain, qualifiers, onset, notes };
    }
  } else {
    entries.push({
      id: nextId++,
      xPct: pendingClick.xPct,
      yPct: pendingClick.yPct,
      pose: pendingClick.zone.pose,
      region,
      pain: selectedPain,
      qualifiers,
      onset,
      notes
    });
  }

  renderFindings();
  closeModal();
});

// ---- Render findings list into the Enroll tab ----
function renderFindings(){
  if (!entriesEl) return;
  if (!entries.length) {
    if (emptyState) emptyState.style.display = '';
    entriesEl.innerHTML = '';
    renderMarkersOnImage();
    return;
  }
  if (emptyState) emptyState.style.display = 'none';

  entriesEl.innerHTML = entries.map(e => `
    <div class="log-card">
      <div class="flex justify-between items-center mb-1">
        <span class="text-[10px] font-black uppercase" style="color:${severityColor(e.pain)}">${e.region}</span>
        <span class="text-[9px] font-bold text-slate-600">${e.pose} · Pain ${e.pain ?? '-'}/10</span>
      </div>
      <div class="text-[10px] text-slate-600">${(e.qualifiers||[]).join(', ') || '—'}</div>
      ${e.onset ? `<div class="text-[10px] italic text-slate-400 mt-1">Onset: ${e.onset}</div>` : ''}
      ${e.notes ? `<div class="text-[10px] text-slate-50 mt-1">${e.notes}</div>` : ''}
      <button type="button" onclick="removeFinding(${e.id})" class="mt-2 text-[9px] font-black text-rose-500 uppercase">Remove</button>
    </div>
  `).join('');
   renderMarkersOnImage();
}

function removeFinding(id){
  entries = entries.filter(e => e.id !== id);
  renderFindings();
}

// ---- Called from saveEnrollment(): push all findings as one SOAP entry ----
function saveEnrollmentBodyChartAsSoap(patientName){
  if (!entries.length) return;

  const subjective = entries.map(e =>
    `${e.region} (${e.pose}): pain ${e.pain ?? '-'}/10${e.onset ? ', onset ' + e.onset : ''}`
  ).join(' | ');

  const objective = entries.map(e =>
    `${e.region}: ${(e.qualifiers||[]).join(', ') || 'no qualifiers noted'}`
  ).join(' | ');

  const assessment = `Initial body-chart assessment at enrollment. ${entries.length} finding(s) marked.`;

  const plan = entries.map(e => e.notes).filter(Boolean).join(' | ') || 'Proceed with initial treatment plan per findings.';

  if (!progressNotes[patientName]) progressNotes[patientName] = [];
  progressNotes[patientName].push({
    date: getLocalISOString(),
    subjective,
    objective,
    assessment,
    plan
  });

  syncToBackend({
    action: "saveProgressNote",
    name: patientName,
    date: getLocalISOString(),
    subjective, objective, assessment, plan
  }).catch(() => {});
}

// ---- Reset the body chart after enrollment saves ----
function resetEnrollBodyChart(){
  entries = [];
  nextId = 1;
  pendingClick = null;
  editingId = null;
  selectedPain = null;
  renderFindings();
}

        let globalData = [];
        let globalIntelligence = null;
        let patientLookup = {};
        let selectedDates = [];
            selectedPatientName = "",
            selectedPatientId = null,
            currentViewDate = new Date(),
            currentBranchFilter = 'ALL';
        let myChart = null,
            dailyChartInstance = null,
            searchDebounce = null,
            billCounter = {};
        let currentBillContext = null,
            recordSortLatest = true;

        const statEl = {
            total: document.getElementById('stat-total'),
            registered: document.getElementById('stat-registered'),
            revenue: document.getElementById('stat-revenue'),
            pocRev: document.getElementById('stat-poc-revenue'),
            phcRev: document.getElementById('stat-phc-revenue'),
            prcRev: document.getElementById('stat-prc-revenue'),
            activeCount: document.getElementById('stat-active-count'),
            daily: document.getElementById('stat-daily'),
            monthly: document.getElementById('stat-monthly'),
            yearly: document.getElementById('stat-yearly')
        };

        function showToast(message, type = 'info') {
            const container = document.getElementById('toast-container');
            const colors = {
                success: 'bg-emerald-600',
                error: 'bg-rose-600',
                warning: 'bg-amber-500',
                info: 'bg-slate-900'
            };
            const icons = {
                success: 'check-circle',
                error: 'alert-circle',
                warning: 'alert-triangle',
                info: 'info'
            };
            const toast = document.createElement('div');
            toast.className = `pointer-events-auto flex items-center gap-2 ${colors[type]} text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold animate-slide max-w-xs`;
            toast.innerHTML = `<i data-lucide="${icons[type]}" class="w-4 h-4 flex-shrink-0"></i><span>${message}</span>`;
            container.appendChild(toast);
            lucide.createIcons();
            setTimeout(() => {
                toast.style.transition = 'opacity 0.3s, transform 0.3s';
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(20px)';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        function armConfirm(btnEl, confirmText, callback) {
            if (btnEl.dataset.armed === 'true') {
                btnEl.dataset.armed = 'false';
                callback();
                return;
            }
            btnEl.dataset.armed = 'true';
            btnEl.dataset.original = btnEl.innerHTML;
            btnEl.innerHTML = confirmText;
            btnEl.classList.add('ring-2', 'ring-rose-400');
            clearTimeout(btnEl._armTimeout);
            btnEl._armTimeout = setTimeout(() => {
                btnEl.dataset.armed = 'false';
                btnEl.innerHTML = btnEl.dataset.original;
                btnEl.classList.remove('ring-2', 'ring-rose-400');
            }, 2500);
        }

        async function fetchWithRetry(url, options, retries = 1) {
            let lastErr;
            for (let i = 0; i <= retries; i++) {
                try {
                    const res = await fetch(url, options);
                    if (!res.ok) throw new Error('Bad response: ' + res.status);
                    return res;
                } catch (err) {
                    lastErr = err;
                    if (i < retries) await new Promise(r => setTimeout(r, 100));
                }
            }
            throw lastErr;
        }

        async function syncToBackend(payload) {
            try {
                const res = await fetchWithRetry(SCRIPT_URL, {
                    method: 'POST',
                    body: JSON.stringify(payload)
                }, 1);
                const json = await res.json();
                if (json.status === 'error') throw new Error(json.message);
                return json;
            } catch (err) {
                showToast('Cloud sync failed — tap refresh to verify', 'error');
                throw err;
            }
        }

        // Helper to map and assign raw Sheet data into frontend arrays
        function applyFetchedData(result) {
            if (!result) return;
            
            // 1. Store pre-calculated math
            if (result.intelligence) globalIntelligence = result.intelligence;

            // 2. Assign Main Records
            if (result.adminData) globalData = result.adminData;

            // 3. Assign SOAP Notes
            progressNotes = {};
            if (result.soapNotes) {
                result.soapNotes.forEach(row => {
                    const name = row[0];
                    if (!progressNotes[name]) progressNotes[name] = [];
                    progressNotes[name].push({
                        date: row[1],
                        subjective: row[2],
                        objective: row[3],
                        assessment: row[4],
                        plan: row[5]
                    });
                });
            }

            // 4. Assign Exercises
            exercisePlans = {};
            if (result.exercisePlans) {
                result.exercisePlans.forEach(row => {
                    const pid = String(row[0] || '').trim().toUpperCase();
                    if (!exercisePlans[pid]) exercisePlans[pid] = [];
                    exercisePlans[pid].push({
                        name: row[2],
                        setsReps: row[3],
                        instructions: row[4],
                        videoLink: row[5],
                        frequency: row[6],
                        prescribedDate: row[7],
                        reviewDate: row[8]
                    });
                });
            }

            // 5. Assign Inquiries
            if (result.inquiries) {
                window.iqRegistry = result.inquiries.map(row => ({
                    date: row[0],
                    name: row[1],
                    age: row[2],
                    gender: row[3],
                    phone: String(row[4] || '').replace(/^'/, ''),
                    diagnosis: row[5],
                    note: row[6],
                    confirmed: String(row[7] || '').toLowerCase() === 'yes',
                    rowIndex: row[8],
                    id: row[1] + '_' + row[0]
                }));
                if (window.saveInquiriesToStorage) {
                    window.saveInquiriesToStorage(window.iqRegistry);
                }
            }
        }

        async function loadAdminData(isManual) {
    const syncBtn = document.getElementById('sync-indicator');
    if (syncBtn) syncBtn.classList.add('animate-spin');

    // SECURITY: If browser is offline, wipe variables immediately
    if (!navigator.onLine) {
        wipeSensitiveData();
        if (syncBtn) syncBtn.classList.remove('animate-spin');
        return;
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        const res = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({
                action: "fetchAdminData",
                bypassCache: true // Force fresh data from Sheets
            }),
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        const result = await res.json();

        if (result && result.adminData) {
            applyFetchedData(result);
            processData();
            if (isManual) showToast('Live data loaded', 'success');
        } else {
            throw new Error("No data");
        }
    } catch (e) {
        console.error("Online sync failed:", e);
        wipeSensitiveData(); // Wipe RAM variables on error
        if (isManual) showToast('Online Access Required', 'error');
    } finally {
        if (syncBtn) syncBtn.classList.remove('animate-spin');
    }
}

// Function to ensure all arrays are emptied and UI is cleared
function wipeSensitiveData() {
    globalData = [];
    patientLookup = {};
    window.iqRegistry = [];
    progressNotes = {};
    exercisePlans = {};
    
    // Clear display tables
    const tableIds = ['registry-table-body', 'patient-table-body', 'billing-table-body', 'iq-table-body', 'recent-logs-cards'];
    tableIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '';
    });

    if (typeof _originalProcessData === 'function') _originalProcessData();
    else if (typeof processData === 'function') processData();
    
    showToast('Offline: Data Access Restricted', 'warning');
}

// Listen for connection drop while app is open
window.addEventListener('offline', wipeSensitiveData);

        function toNum(v) {
    if (v === null || v === undefined || v === "") return 0;
    const n = parseFloat(String(v).replace(/[^0-9.-]/g, ''));
    return isNaN(n) ? 0 : n;
}

// --- ADDED THIS FUNCTION HERE ---
function getPackageBreakdown(p) {
    const packageDefinitions = [];
    p.logs.forEach(l => {
        const type = String(l[7] || '').trim().toLowerCase();
        const capacity = toNum(l[10]);
        if ((type === 'enrollment' || type === 'package added') && capacity > 0) {
            packageDefinitions.push({
                timestamp: l[0],
                capacity: capacity,
                sessions: []
            });
        }
    });
    packageDefinitions.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    if (packageDefinitions.length === 0) return { packages: [], totalCapacity: p.purchased || 0, totalUsed: 0 };

    const consumingLogs = p.logs.filter(l => {
        const type = String(l[7] || '').trim().toLowerCase();
        const mode = String(l[15] || '').trim();
        const fee = toNum(l[9]);
        
        // Count enrollment as Session #1 if any fee was set
        if (type === 'enrollment') {
            return fee > 0;
        }

        return type !== 'package added' &&
               type !== 'case closed' && 
               type !== 'case restarted' && 
               type !== 'bill issued' &&
               (mode === 'Advance' || fee > 0);
    }).slice();

    consumingLogs.sort((a, b) => new Date(a[0]) - new Date(b[0]));

    consumingLogs.forEach(l => {
        const openPkg = packageDefinitions.find(pkg => pkg.sessions.length < pkg.capacity);
        if (openPkg) openPkg.sessions.push(l);
        else if (packageDefinitions.length > 0) packageDefinitions[packageDefinitions.length - 1].sessions.push(l);
    });

    const totalCapacity = packageDefinitions.reduce((s, pkg) => s + pkg.capacity, 0);
    const totalUsed = packageDefinitions.reduce((s, pkg) => s + pkg.sessions.length, 0);
    return { packages: packageDefinitions, totalCapacity, totalUsed };
}

function getRemainingSessions(p) {
    if (!p || !p.purchased) return 0;
    const { totalCapacity, totalUsed } = getPackageBreakdown(p);
    return Math.max(0, totalCapacity - totalUsed);
}

        function formatDateDMY(dateStr) {
            if (!dateStr) return '';
            const datePart = String(dateStr).split('T')[0];
            const parts = datePart.split('-');
            if (parts.length === 3 && parts[0].length === 4) {
                return `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return dateStr;
            const dd = String(d.getDate()).padStart(2, '0');
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            return `${dd}-${mm}-${d.getFullYear()}`;
        }

        function getSessionTypeLabel(id) {
            const prefix = String(id || '').substring(0, 3).toUpperCase();
            if (prefix === 'PHC') return 'Physiotherapy Home Rehabilitation Session';
            if (prefix === 'PRC') return 'Physiotherapy Rehab Session';
            if (prefix === 'POC') return 'Physiotherapy Orthocare Session';
            return 'Physiotherapy Session';
        }

function getAdvanceSessionLabel(r, p) {
            const { packages } = getPackageBreakdown(p);
            if (!packages.length) {
                const nonEnrollLogs = p.logs.filter(l => {
                    const t = String(l[7] || '').trim().toLowerCase();
                    return t !== 'case closed' && t !== 'case restarted' && t !== 'bill issued';
                });
                const sorted = nonEnrollLogs.slice().sort((a, b) => {
                    if (a[8] !== b[8]) return a[8] < b[8] ? -1 : 1;
                    return new Date(a[0]) - new Date(b[0]);
                });
                const idx = sorted.findIndex(l => l[0] === r[0]);
                const sessionNum = idx >= 0 ? idx + 1 : sorted.length;
                return `${sessionNum}/${p.purchased || 1}`;
            }
            for (const pkg of packages) {
                const idx = pkg.sessions.findIndex(l => l[0] === r[0]);
                if (idx >= 0) return `${idx + 1}/${pkg.capacity}`;
            }
            return `Advance`;
        }

        function processData() {
            if (!globalIntelligence) return;

            const { stats, patientLookup: serverLookup, dailyMap, revenueTrend } = globalIntelligence;
            
            // Link backend data to frontend variable
            patientLookup = serverLookup;

            // Fix stats display
            statEl.total.innerText = stats.totalSessions;
            statEl.registered.innerText = stats.registeredPatients;
            statEl.revenue.innerText = "₹" + stats.revenue.total.toLocaleString();
            statEl.pocRev.innerText = "₹" + stats.revenue.poc.toLocaleString();
            statEl.phcRev.innerText = "₹" + stats.revenue.phc.toLocaleString();
            statEl.prcRev.innerText = "₹" + stats.revenue.prc.toLocaleString();
            statEl.activeCount.innerText = stats.activeCases;
            statEl.daily.innerText = "₹" + stats.revenue.daily.toLocaleString();
            statEl.monthly.innerText = "₹" + stats.revenue.monthly.toLocaleString();
            statEl.yearly.innerText = "₹" + stats.revenue.yearly.toLocaleString();
            
            const outEl = document.getElementById('stat-outstanding');
            if (outEl) outEl.innerText = "₹" + stats.outstandingDues.toLocaleString();

            // Render UI Components
            renderCharts(revenueTrend);
            renderDailyChart(dailyMap);
            renderTables();
            renderDailyRegistry();
            renderActiveCasesForLog();
            renderDuesWidget();
            
            // IMPORTANT: checkAutoCloseInactiveCases is likely causing the "Auto-Close" bug.
            // Let's run it only if the data exists.
            if (typeof checkAutoCloseInactiveCases === 'function') {
                checkAutoCloseInactiveCases();
            }

            generateClinicalID();
        }

        function renderDailyRegistry() {
            const dateVal = document.getElementById('registry-date-input').value;
            const tbody = document.getElementById('registry-table-body');
            const totalVisitsEl = document.getElementById('reg-total-visits');
            const totalFeeEl = document.getElementById('reg-total-fee');
            const footerTotalEl = document.getElementById('registry-footer-total');

            if (!dateVal) return;

            let html = "";
            let visitCount = 0;
            let collectionSum = 0;

            const dayRecords = globalData.filter(r => {
                const type = String(r[7] || '').toLowerCase();
                const rDate = r[8];
                const fee = toNum(r[9]);
                return rDate === dateVal &&
                    fee > 0 &&
                    type !== "case closed" &&
                    type !== "case restarted" &&
                    type !== "bill issued";
            });

            if (dayRecords.length === 0) {
                html = `<tr><td colspan="7" class="p-10 text-center text-slate-600 italic">No clinical visits recorded for this date.</td></tr>`;
            } else {
                dayRecords.forEach((r, idx) => {
                    const cid = r[1],
                        name = r[2],
                        diag = r[6],
                        fee = toNum(r[9]);
                    const paymentMode = r[15] || 'Cash';
                    const p = patientLookup[name];
                    const paymentDisplay = (paymentMode === 'Advance' && p) ? getAdvanceSessionLabel(r, p) : paymentMode;
                    const branch = cid.startsWith('POC') ? 'Orthocare' : (cid.startsWith('PHC') ? 'Homecare' : (cid.startsWith('PRC') ? 'Rehab Clinic' : '-'));
                    const modeBadgeColor = paymentMode === 'Pending' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600';

                    visitCount++;
                    collectionSum += fee;

                    html += `<tr class="hover:bg-slate-50 transition-colors" data-search-tag="${name.toUpperCase()} ${cid.toUpperCase()}">
                <td class="p-5 font-bold text-slate-400">${idx + 1}</td>
                <td class="p-5 font-black uppercase text-indigo-700">${name}</td>
                <td class="p-5 font-bold text-slate-600 hidden lg:table-cell">${cid}</td>
                <td class="p-5 text-center hidden lg:table-cell"><span class="bg-slate-100 text-[10px] font-black uppercase px-3 py-1 rounded-lg">${branch}</span></td>
                <td class="p-5 text-slate-600 italic truncate max-w-[200px] hidden lg:table-cell">${diag || '-'}</td>
                <td class="p-5 text-center"><span class="${modeBadgeColor} text-[10px] font-black uppercase px-3 py-1 rounded-lg">${paymentDisplay}</span></td>
                <td class="p-5 text-right font-black text-slate-800">₹${fee.toLocaleString()}</td>
            </tr>`;
                });
            }

            tbody.innerHTML = html;
            totalVisitsEl.innerText = visitCount;
            totalFeeEl.innerText = "₹" + collectionSum.toLocaleString();
            if (footerTotalEl) footerTotalEl.innerText = "₹" + collectionSum.toLocaleString();
            
            // Also update the mobile footer total element
            const footerTotalMobileEl = document.getElementById('registry-footer-total-mobile');
            if (footerTotalMobileEl) footerTotalMobileEl.innerText = "₹" + collectionSum.toLocaleString();
        }

        function filterRegistryTable() {
            const val = document.getElementById('registry-search-input').value.toUpperCase();
            const rows = document.querySelectorAll('#registry-table-body tr[data-search-tag]');
            rows.forEach(row => {
                const tag = row.getAttribute('data-search-tag');
                row.style.display = tag.includes(val) ? "" : "none";
            });
        }

        function openBranchDetailModal(branch) {
            const branchLabels = { POC: 'Prism Orthocare (POC)', PHC: 'Homecare (PHC)', PRC: 'Prism Rehab Clinic (PRC)' };
            const monthly = {};
            let total = 0;

            globalData.forEach(r => {
                const id = String(r[1] || '');
                const type = String(r[7] || '').trim().toLowerCase();
                const dateStr = r[8];
                const fee = toNum(r[9]);
                if (!id.startsWith(branch)) return;
                if (type === 'case closed' || type === 'case restarted' || type === 'bill issued' || fee <= 0 || !dateStr) return;

                const mKey = String(dateStr).substring(0, 7);
                if (!monthly[mKey]) monthly[mKey] = { fee: 0, count: 0 };
                monthly[mKey].fee += fee;
                monthly[mKey].count++;
                total += fee;
            });

            const months = Object.keys(monthly).sort().reverse();
            const tbody = document.getElementById('bd-table-body');
            if (!months.length) {
                tbody.innerHTML = `<tr><td colspan="3" class="p-10 text-center text-slate-600 italic">No revenue recorded for this branch yet.</td></tr>`;
            } else {
                tbody.innerHTML = months.map(mKey => {
                    const d = new Date(mKey + '-01T00:00:00');
                    const label = d.toLocaleString('default', { month: 'long', year: 'numeric' });
                    const m = monthly[mKey];
                    return `<tr class="hover:bg-slate-50">
                        <td class="p-4 font-black text-slate-700">${label}</td>
                        <td class="p-4 text-center font-bold text-slate-600">${m.count}</td>
                        <td class="p-4 text-right font-black text-indigo-600">₹${m.fee.toLocaleString()}</td>
                    </tr>`;
                }).join('');
            }

            document.getElementById('bd-title').innerText = branchLabels[branch] || branch;
            document.getElementById('bd-total').innerText = `Total: ₹${total.toLocaleString()}`;
            document.getElementById('branch-detail-modal').classList.remove('hidden');
            lucide.createIcons();
        }

        function closeBranchDetailModal() {
            document.getElementById('branch-detail-modal').classList.add('hidden');
        }

        function openAdvanceModal() {
            const tbody = document.getElementById('advance-list-body');
            tbody.innerHTML = "";
            Object.keys(patientLookup).forEach(name => {
                const p = patientLookup[name],
                    rem = p.purchased - p.logs.length;
                if (p.advance > 0 && rem > 0 && !p.closed) {
                    tbody.innerHTML += `<tr class="hover:bg-slate-50">
                        <td class="p-4 font-bold uppercase">${name}</td>
                        <td class="p-4 text-center"><span class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg font-black text-xs">${rem} Sessions</span></td>
                        <td class="p-4 text-right font-bold text-slate-600">₹${p.advance}</td>
                    </tr>`;
                }
            });
            document.getElementById('advance-modal').classList.remove('hidden');
        }

        function closeAdvanceModal() {
            document.getElementById('advance-modal').classList.add('hidden');
        }

        function openCaseModal() {
            const tbody = document.getElementById('case-list-body');
            tbody.innerHTML = "";
            Object.keys(patientLookup).sort().forEach(name => {
                const p = patientLookup[name];
                if (!p.closed) {
                    const rem = p.purchased - p.logs.length;
                    tbody.innerHTML += `<tr class="hover:bg-slate-50">
                        <td class="p-4 font-bold uppercase">${name}</td>
                        <td class="p-4 font-black text-indigo-500 text-xs">${p.id}</td>
                        <td class="p-4 text-xs italic text-slate-600">${p.diag}</td>
                        <td class="p-4 text-center"><span class="bg-blue-100 text-blue-700 px-3 py-1 rounded text-[10px] font-black">${rem}/${p.purchased}</span></td>
                        <td class="p-4 text-center"><button onclick="closePatientCase('${name}', event)" class="bg-rose-500 text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase hover:bg-rose-600 transition-all">Close Case</button></td>
                    </tr>`;
                }
            });
            document.getElementById('case-modal').classList.remove('hidden');
            lucide.createIcons();
        }

        function closeCaseModal() {
            document.getElementById('case-modal').classList.add('hidden');
        }

        async function closePatientCase(name, event) {
            const btn = event.target.closest('button');
            armConfirm(btn, 'Confirm Close?', async () => {
                const p = patientLookup[name];
                const dateStr = getLocalISOString();
                const row = [new Date().toISOString(), p.id, name, p.phone, "", "", p.diag, "Case Closed", dateStr, 0, 0, 0, 0, ""];
                globalData.push(row);
                processData();
                showToast(`${name}'s case closed`, 'success');
                if (!document.getElementById('case-modal').classList.contains('hidden')) openCaseModal();
                syncToBackend({
                    action: "logAppointment",
                    id: p.id,
                    name: name,
                    phone: p.phone,
                    condition: p.diag,
                    fee: 0,
                    purchased: 0,
                    advance: 0,
                    type: "Case Closed",
                    date: dateStr
                }).catch(() => {});
            });
        }

        
        function toggleRecordSort() {
            recordSortLatest = !recordSortLatest;
            const btnSpan = document.querySelector('#record-sort-btn span');
            btnSpan.innerText = recordSortLatest ? 'Sort: Newest First' : 'Sort: Oldest First';
            renderTables();
        }

        function filterRecordTable() {
            const val = document.getElementById('record-search-input').value.toUpperCase();
            const rows = document.querySelectorAll('#patient-table-body tr');
            rows.forEach(row => {
                const tag = row.getAttribute('data-search-tag') || "";
                row.style.display = tag.includes(val) ? "" : "none";
            });
        }

        function filterByBranch(branch) {
            currentBranchFilter = branch;
            switchTab('patients', document.querySelector('[onclick*="patients"]'));
            renderTables();
        }

        async function submitSessionsFast() {
    if (!selectedPatientName || selectedDates.length === 0) {
        showToast('Select at least one date', 'warning');
        return;
    }

    const p   = patientLookup[selectedPatientName];
    const btn = document.getElementById('submit-btn');
    const totalFee        = p.baseRate + (Number(document.getElementById('session-add-fee').value) || 0);
    const note            = document.getElementById('session-note').value || p.diag;
    const paymentMode     = document.getElementById('session-payment-mode').value;
    const amountPaidInput = document.getElementById('session-amount-paid').value;

    const datesToSubmit = [...selectedDates];

    // FIX BUG B: Use remainingSessions as the Advance credit counter,
    // NOT walletBalance. walletBalance is a monetary figure that equals
    // the original advance forever and never decrements.
    let remainingCredits = p.remainingSessions || 0;  // session slots left

    // Validation: amount required for non-advance, non-pending modes
    if (paymentMode !== 'Advance' && paymentMode !== 'Pending' &&
        (amountPaidInput === '' || amountPaidInput === null)) {
        showToast('Please enter the Amount Paid (₹)', 'warning');
        document.getElementById('session-amount-paid').focus();
        return;
    }

    const newRows = datesToSubmit.map(dateString => {
        let paidForRow = 0;
        let finalMode  = paymentMode;

        if (paymentMode === 'Advance') {
            // Gate on session credits, not money
            if (remainingCredits <= 0) {
                showToast('Package exhausted — session marked as Pending.', 'warning');
                paidForRow = 0;
                finalMode  = 'Pending';
            } else {
                // Consume one session credit; the fee is considered "covered"
                paidForRow = totalFee;
                remainingCredits--;          // decrement for subsequent dates in same submit
                if (paidForRow < totalFee) finalMode = 'Pending';
            }

        } else if (paymentMode === 'Pending') {
            paidForRow = 0;
            finalMode  = 'Pending';

        } else {
            // Cash / UPI / Card
            const wallet   = p.walletBalance || 0;
            let userPaid   = Number(amountPaidInput) || 0;

            if (userPaid < totalFee && wallet > 0) {
                const creditToApply = Math.min(wallet, totalFee - userPaid);
                paidForRow = userPaid + creditToApply;
                showToast(`Applied ₹${creditToApply} from wallet credit`, 'info');
            } else {
                paidForRow = userPaid;
            }

            if (paidForRow < totalFee) finalMode = 'Pending';
        }

        return [
            new Date().toISOString(),
            p.id,
            selectedPatientName,
            p.phone,
            '', '',
            note,
            'Rehab',
            dateString,
            totalFee,
            0, 0, 0, '', '',
            finalMode,
            paidForRow
        ];
    });

    globalData.push(...newRows);
    processData();

    // Send WhatsApp receipt for a single paid session
    if (newRows.length === 1 && newRows[0][15] !== 'Pending' && toNum(newRows[0][16]) > 0) {
        sendQuickSessionReceipt(p, newRows[0]);
    }

    // Reset UI
    selectedDates         = [];
    selectedPatientName   = '';
    document.getElementById('session-note').value         = '';
    document.getElementById('session-amount-paid').value  = '';
    document.getElementById('patient-search-input').value = '';

    document.getElementById('patient-workspace').classList.add('hidden');
    document.getElementById('active-cases-container').style.display = 'block';

    toggleSessionDrawer(false);

    showToast(`${datesToSubmit.length} session(s) logged`, 'success');
    btn.innerText = 'Saved ✓';
    setTimeout(() => { btn.innerText = 'Submit Session(s)'; }, 1200);

    // FIX BUG C: refresh the hint after submit so count updates immediately
    updateAdvanceHint();

    // Sync to backend
    newRows.forEach(row => {
        syncToBackend({
            action:      'logAppointment',
            id:          p.id,
            name:        row[2],
            phone:       p.phone,
            condition:   row[6],
            fee:         row[9],
            purchased:   0,
            advance:     0,
            discount:    0,
            type:        row[7],
            date:        row[8],
            paymentMode: row[15],
            amountPaid:  row[16]
        }).catch(() => {});
    });
}

              function sendQuickSessionReceipt(p, row) {
            // Popup handled by WA popup system below
        }

       function updateAdvanceHint() {
    const hint = document.getElementById('advance-remaining-hint');
    if (!selectedPatientName || !hint) return;

    const p = patientLookup[selectedPatientName];
    if (!p) return;

    const rem  = p.remainingSessions || 0;     // session slots still left in package
    const due  = p.outstandingDue   || 0;     // money owed to clinic
    const rate = p.baseRate         || 0;     // rate per session

    // Monetary value of remaining sessions — this is what the user wants to see
    const remainingValue = Math.round(rem * rate);

    hint.classList.remove('hidden');

    // ── Patient has a pre-paid session package ────────────────────────────────
    if (p.purchased > 0) {

        if (rem > 0) {
            // Sessions still available — show count AND monetary value
            hint.className =
                'mt-2.5 p-3 bg-indigo-50 border border-indigo-100 ' +
                'text-indigo-700 rounded-2xl text-center text-[10px] font-bold uppercase';

            const dueLine = due > 0
                ? `<span class="block text-rose-500 text-[9px] mt-1 font-black">
                       ALSO DUE: ₹${due.toLocaleString()}
                   </span>`
                : '';

            hint.innerHTML = `
                <span class="block text-slate-500 text-[8px]">PRE-PAID PACKAGE</span>
                <span class="block text-sm font-black">
                    REM SESSIONS: ${rem} / ${p.purchased}
                </span>
                <span class="block font-black text-indigo-600 mt-1 text-[11px]">
                    BALANCE: ₹${remainingValue.toLocaleString()}
                </span>
                ${dueLine}`;

        } else {
            // Package fully consumed
            if (due > 0) {
                hint.className =
                    'mt-2.5 p-3 bg-rose-50 border border-rose-200 ' +
                    'text-rose-700 rounded-2xl text-center text-[10px] font-bold uppercase';
                hint.innerHTML = `
                    <span class="block text-[8px]">PACKAGE EXHAUSTED</span>
                    <span class="block text-sm font-black">TOTAL DUE: ₹${due.toLocaleString()}</span>`;
            } else {
                hint.className =
                    'mt-2.5 p-3 bg-slate-100 border border-slate-200 ' +
                    'text-slate-500 rounded-2xl text-center text-[10px] font-bold uppercase';
                hint.innerHTML = `
                    <span class="block text-[8px]">PACKAGE EXHAUSTED</span>
                    <span class="block text-sm font-black">ALL SETTLED</span>`;
            }
        }

    // ── Regular patient (pay-per-session, no package) ─────────────────────────
    } else {
        const wallet = p.walletBalance || 0;

        if (wallet > 0) {
            hint.className =
                'mt-2.5 p-3 bg-emerald-50 border border-emerald-100 ' +
                'text-emerald-700 rounded-2xl text-center text-[10px] font-bold uppercase';
            hint.innerHTML = `
                <span class="block text-slate-500 text-[8px]">REGULAR (CREDIT)</span>
                <span class="block font-black text-emerald-700 mt-1 text-xs">
                    WALLET: ₹${wallet.toLocaleString()}
                </span>`;

        } else if (due > 0) {
            hint.className =
                'mt-2.5 p-3 bg-rose-50 border border-rose-200 ' +
                'text-rose-700 rounded-2xl text-center text-[10px] font-bold uppercase';
            hint.innerHTML = `
                <span class="block text-slate-500 text-[8px]">REGULAR (PENDING)</span>
                <span class="block font-black text-rose-700 mt-1 text-xs">
                    DUE: ₹${due.toLocaleString()}
                </span>`;

        } else {
            hint.className =
                'mt-2.5 p-3 bg-slate-100 border border-slate-200 ' +
                'text-slate-500 rounded-2xl text-center text-[10px] font-bold uppercase';
            hint.innerHTML = `
                <span class="block text-slate-400 text-[8px]">REGULAR PATIENT</span>
                <span class="block text-slate-500 font-black mt-1">NO PENDING DUES</span>`;
        }
    }
}

        document.getElementById('session-payment-mode').addEventListener('change', updateAdvanceHint);

async function saveEnrollment() {
    const name = document.getElementById('en-name').value.trim();
    const phone = document.getElementById('en-phone').value.trim();
    const age = document.getElementById('en-age').value.trim();
    const diagnosis = document.getElementById('en-condition').value.trim();
    const rate = Number(document.getElementById('en-rate').value) || 0;
    const sessions = Number(document.getElementById('en-sessions').value) || 0;

    // MANDATORY FIELD CHECKS
    if (!name) { showToast("Patient Name is required", 'warning'); return; }
    if (phone.length < 13) { showToast("Valid 10-digit Phone Number is required", 'warning'); return; }
    if (!age) { showToast("Age is required", 'warning'); return; }
    if (!diagnosis) { showToast("Clinical Diagnosis is required", 'warning'); return; }
    if (rate <= 0) { showToast("Cost per session is required", 'warning'); return; }
    if (sessions <= 0) { showToast("Number of sessions is required", 'warning'); return; }

    // DUPLICATE & RE-ENTRY LOGIC
    const normalizedNewPhone = phone.replace(/\D/g, '');
    
    // Look specifically for an existing record with the same phone or name that is currently ACTIVE
    const activeCase = Object.keys(patientLookup).find(existingName => {
        const p = patientLookup[existingName];
        const existingPhone = (p.phone || "").replace(/\D/g, '');
        // Condition: Same person AND the case is currently NOT closed
        return (existingName.toLowerCase() === name.toLowerCase() || existingPhone === normalizedNewPhone) && !p.closed;
    });

    if (activeCase) {
        const p = patientLookup[activeCase];
        showToast(`Patient already has an ACTIVE case (ID: ${p.id}). Please close it before re-enrolling.`, "error");
        return;
    }

    // CHECK FOR NAME CLASHES ON RE-ENTRY
    // Since the system uses 'Name' as a key, if this is a 2nd time entry, 
    // we suggest adding a differentiator (like 'V2' or '- New')
    if (patientLookup[name]) {
        showToast(`Welcome Back! Use a slightly unique name for the new case (e.g. ${name} - V2)`, "info");
        return; // Prevents overwriting the existing closed case data in the dashboard
    }
    const dateStr = document.getElementById('en-reg-date').value || getLocalISOString();
    const address = document.getElementById('en-address').value.trim();
    
    const paymentMode = document.getElementById('en-payment-mode').value;
    const advanceAmount = Number(document.getElementById('en-advance').value) || 0;
    const enrolledPhone = document.getElementById('en-phone').value.trim();
    const enrolledDiag = document.getElementById('en-condition').value.trim();
    const enrolledId = document.getElementById('en-id').value;
    const enrolledSessions = Number(document.getElementById('en-sessions').value) || 0;
    const enrolledDiscount = Number(document.getElementById('en-discount').value) || 0;
    const totalPackageValue = ((rate * enrolledSessions) - (rate * enrolledSessions * (enrolledDiscount / 100)));

    const row = [
        new Date().toISOString(),
        enrolledId,
        name,
        enrolledPhone,
        document.getElementById('en-age').value,
        document.getElementById('en-gender').value,
        enrolledDiag,
        "Enrollment",
        dateStr,
        rate,
        enrolledSessions,
        advanceAmount,
        enrolledDiscount,
        getLocalISOString(), // Record payment date at enrollment
        address,
        paymentMode,
        advanceAmount
    ];

    globalData.push(row);
    processData();
    saveEnrollmentBodyChartAsSoap(name);
    resetEnrollForm();
    showToast(`${name} enrolled successfully`, 'success');

    // Show enrollment success popup
    showEnrollmentSuccessPopup({
        name: name,
        id: enrolledId,
        phone: enrolledPhone,
        diag: enrolledDiag,
        amount: advanceAmount > 0 ? advanceAmount : (rate * enrolledSessions)
    });

    syncToBackend({
        action: "logAppointment",
        id: row[1],
        name: row[2],
        age: row[4],
        gender: row[5],
        phone: row[3],
        condition: row[6],
        fee: row[9],
        purchased: row[10],
        advance: row[11],
        discount: row[12],
        address: row[14],
        type: "Enrollment",
        date: row[8],
        paymentMode: paymentMode,
        amountPaid: advanceAmount
    }).catch(() => {});
}

function showEnrollmentSuccessPopup(patient) {
    // Remove any existing popup first
    const existing = document.getElementById('enroll-success-popup-overlay');
    if (existing) existing.remove();

    const last4Digits = String(patient.id).slice(-4);
    const waNumber = getWhatsAppNumber(patient.phone);

    const welcomeMsg = encodeURIComponent(
        `🌟 *Welcome to Prism Physiotherapy & Rehabilitation Center!* 🌟\n\n` +
        `Hello ${patient.name},\n\n` +
        `Your personal care account is now active.\n\n` +
        `We're delighted to support your recovery journey. At Prism Physiotherapy, your dedicated patient account keeps your treatment details, appointments, and rehabilitation progress organized and accessible, all in one place.\n\n` +
        `📲 *In your portal, you can:*\n` +
        `✅ Track all your session logs\n` +
        `✅ Access your Home Exercise Plan (HEP)\n` +
        `✅ Download your receipts and bills anytime\n\n` +
        `🔗 *Access Portal Here:* https://prismhealthcare.in/Patient%20Login.html\n\n` +
        `🔐 *Your Login Details:*\n` +
        `👤 *User ID:* ${patient.name}\n` +
        `🔑 *Verification ID:* ${last4Digits}\n\n` +
        `Please keep your verification ID confidential and do not share it with others.\n\n` +
        `Warm regards,\n` +
        `*Team Prism Physiotherapy*`
    );

    const overlay = document.createElement('div');
    overlay.id = 'enroll-success-popup-overlay';
    overlay.style.cssText = `
        position: fixed; inset: 0; background: rgba(15,23,42,0.6);
        z-index: 9998; display: flex; align-items: center;
        justify-content: center; padding: 1.5rem;
        backdrop-filter: blur(4px);
    `;

    overlay.innerHTML = `
        <div style="
            background: #ffffff; border-radius: 1.75rem; padding: 2.25rem 2rem 2rem;
            max-width: 400px; width: 100%;
            box-shadow: 0 30px 70px -10px rgba(79,70,229,0.22), 0 0 0 1px rgba(255,255,255,0.6) inset;
            font-family: 'Plus Jakarta Sans', sans-serif;
            animation: enrollPopIn 0.35s cubic-bezier(0.16,1,0.3,1) both;
        ">
            <style>
                @keyframes enrollPopIn {
                    from { opacity:0; transform: scale(0.92) translateY(16px); }
                    to   { opacity:1; transform: scale(1) translateY(0); }
                }
            </style>

            <!-- Success Icon -->
            <div style="display:flex; justify-content:center; margin-bottom:1.25rem;">
                <div style="
                    width: 60px; height: 60px; border-radius: 50%;
                    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 8px 24px -6px rgba(16,185,129,0.35);
                ">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
            </div>

            <!-- Title -->
            <h3 style="
                text-align:center; font-size: 1.15rem; font-weight: 900;
                color: #0f172a; margin: 0 0 0.25rem; letter-spacing: -0.02em;
            ">Patient Enrolled Successfully!</h3>
            <p style="
                text-align:center; font-size: 0.7rem; font-weight: 800;
                color: #10b981; text-transform: uppercase; letter-spacing: 1px;
                margin: 0 0 1.5rem;
            ">Registration Complete</p>

            <!-- Patient Details -->
            <div style="
                background: #f8fafc; border-radius: 1rem; padding: 1rem 1.1rem;
                margin-bottom: 1.5rem; border: 1px solid #e2e8f0;
            ">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.55rem;">
                    <span style="font-size:0.62rem; font-weight:800; text-transform:uppercase; color:#94a3b8; letter-spacing:0.6px;">Patient Name</span>
                    <span style="font-size:0.8rem; font-weight:900; color:#0f172a;">${patient.name}</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.55rem;">
                    <span style="font-size:0.62rem; font-weight:800; text-transform:uppercase; color:#94a3b8; letter-spacing:0.6px;">Patient ID</span>
                    <span style="font-size:0.8rem; font-weight:900; color:#4f46e5;">${patient.id}</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.55rem;">
                    <span style="font-size:0.62rem; font-weight:800; text-transform:uppercase; color:#94a3b8; letter-spacing:0.6px;">Diagnosis</span>
                    <span style="font-size:0.75rem; font-weight:700; color:#475569; max-width:200px; text-align:right;">${patient.diag || '—'}</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; padding-top:0.55rem; border-top:1px solid #e2e8f0; margin-top:0.1rem;">
                    <span style="font-size:0.62rem; font-weight:800; text-transform:uppercase; color:#94a3b8; letter-spacing:0.6px;">Amount</span>
                    <span style="font-size:1rem; font-weight:900; color:#059669;">₹${Number(patient.amount || 0).toLocaleString()}</span>
                </div>
            </div>

            <!-- Buttons -->
                        <button
                id="enroll-wa-send-btn"
                style="
                    width: 100%; padding: 0.95rem; border-radius: 0.95rem; border: none;
                    background: #25D366; color: white; font-family: 'Plus Jakarta Sans', sans-serif;
                    font-weight: 900; font-size: 0.72rem; text-transform: uppercase;
                    letter-spacing: 1px; cursor: pointer; margin-bottom: 0.65rem;
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    box-shadow: 0 8px 22px -6px rgba(37,211,102,0.45);
                    transition: transform 0.15s, opacity 0.15s;
                "
                onmouseover="this.style.opacity='0.9'; this.style.transform='translateY(-1px)';"
                onmouseout="this.style.opacity='1'; this.style.transform='translateY(0)';"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Send Welcome Message on WhatsApp
            </button>

            <button
                onclick="document.getElementById('enroll-success-popup-overlay').remove();"
                style="
                    width: 100%; padding: 0.75rem; border-radius: 0.85rem;
                    border: 1.5px solid #e2e8f0; background: #f8fafc;
                    font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800;
                    font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.8px;
                    color: #64748b; cursor: pointer; transition: background 0.15s;
                "
                onmouseover="this.style.background='#f1f5f9';"
                onmouseout="this.style.background='#f8fafc';"
            >
                Close
            </button>
        </div>
    `;

    // Close on backdrop click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) overlay.remove();
    });

    document.body.appendChild(overlay);

    document.getElementById('enroll-wa-send-btn').addEventListener('click', function() {
        const resolvedNumber = getWhatsAppNumber(patient.phone);
        if (!resolvedNumber) {
            showToast('Invalid phone number', 'warning');
            return;
        }
        const last4 = String(patient.id).slice(-4);
        const message =
            `🌟 *Welcome to Prism Physiotherapy & Rehabilitation Center!* 🌟\n\n` +
            `Hello ${patient.name},\n\n` +
            `Your personal care account is now active.\n\n` +
            `We're delighted to support your recovery journey. At Prism Physiotherapy, your dedicated patient account keeps your treatment details, appointments, and rehabilitation progress organized and accessible, all in one place.\n\n` +
            `📲 *In your portal, you can:*\n` +
            `✅ Track all your session logs\n` +
            `✅ Access your Home Exercise Plan (HEP)\n` +
            `✅ Download your receipts and bills anytime\n\n` +
            `🔗 *Access Portal Here:* https://prismhealthcare.in/Patient%20Login.html\n\n` +
            `🔐 *Your Login Details:*\n` +
            `👤 *User ID:* ${patient.name}\n` +
            `🔑 *Verification ID:* ${last4}\n\n` +
            `Please keep your verification ID confidential and do not share it with others.\n\n` +
            `Warm regards,\n` +
            `*Team Prism Physiotherapy*`;
        window.open('https://wa.me/' + resolvedNumber + '?text=' + encodeURIComponent(message), '_blank');
    });
}
        function resetEnrollForm() {
            document.getElementById('en-name').value = "";
            document.getElementById('en-age').value = "";
            document.getElementById('en-condition').value = "";
            document.getElementById('en-phone').value = "+91";
            document.getElementById('en-address').value = "";
            document.getElementById('en-rate').value = "";
            document.getElementById('en-sessions').value = "0";
            document.getElementById('en-advance').value = "0";
            document.getElementById('en-discount').value = "0";
            document.getElementById('en-gender').value = "Male";
            document.getElementById('en-branch').value = "POC";
            document.getElementById('en-instructions').value = ""; // Clears instructions
            document.getElementById('en-reg-date').value = getLocalISOString();
            document.getElementById('enroll-summary').innerText = "₹0";
            document.getElementById('en-payment-mode').value = "Cash";
            
            // Explicitly clear body chart data
            entries = []; 
            nextId = 1;
            renderFindings(); 
            
            generateClinicalID();
        }

        async function openTopupBalance() {
    if (!selectedPatientName) return;
    const p = patientLookup[selectedPatientName];
    const amount = prompt(`Enter Topup Amount for ${selectedPatientName}:`, "1000");
    if (!amount) return;
    const topup = Number(amount);
    if (isNaN(topup) || topup <= 0) {
        showToast("Please enter a valid amount", "warning");
        return;
    }
    const dateStr = getLocalISOString();
    const row = [new Date().toISOString(), p.id, selectedPatientName, p.phone, "", "", p.diag, "Package Added", dateStr, 0, 0, topup, 0, ""];
    globalData.push(row);
    processData();
    selectPatient(selectedPatientName);
    showToast(`Topup of ₹${topup} added to wallet`, "success");
    syncToBackend({
        action: "logAppointment",
        id: p.id,
        name: selectedPatientName,
        phone: p.phone,
        condition: "Wallet Topup",
        fee: 0,
        purchased: 0,
        advance: topup,
        discount: 0,
        type: "Package Added",
        date: dateStr
    }).catch(() => {});
}

function openMidPackage() {
    if (!selectedPatientName) return;
    document.getElementById('pkg-modal-name').innerText = selectedPatientName;
    document.getElementById('mi-rate').value = patientLookup[selectedPatientName].baseRate;
    document.getElementById('pkg-modal').classList.remove('hidden');
}
        function closeMidPackage() {
            document.getElementById('pkg-modal').classList.add('hidden');
        }

        async function saveMidPackage() {
    const p = patientLookup[selectedPatientName];
    const sessions = Number(document.getElementById('mi-sessions').value) || 0;
    const rate = Number(document.getElementById('mi-rate').value) || 0;
    const advance = Number(document.getElementById('mi-advance').value) || 0;
    if (!sessions || !rate) {
        showToast('Enter sessions and rate', 'warning');
        return;
    }
    const dateStr = getLocalISOString();
    const row = [new Date().toISOString(), p.id, selectedPatientName, p.phone, "", "", p.diag, "Package Added", dateStr, rate, sessions, advance, 0, ""];
    globalData.push(row);
    processData();
    closeMidPackage();
    selectPatient(selectedPatientName);
    showToast('Package added', 'success');
    syncToBackend({
        action: "logAppointment",
        id: p.id,
        name: selectedPatientName,
        phone: p.phone,
        condition: p.diag,
        fee: rate,
        purchased: sessions,
        advance: advance,
        discount: 0,
        type: "Package Added",
        date: dateStr
    }).catch(() => {});
}

        function renderCharts(data) {
            const ctx = document.getElementById('revenueChart').getContext('2d');
            const labels = Object.keys(data).sort();
            const values = labels.map(l => data[l]);
            if (myChart) myChart.destroy();
            myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Income',
                        data: values,
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }

        function renderDailyChart(dailyMap) {
            const ctx = document.getElementById('dailyChart').getContext('2d');
            const days = [];
            const todayD = new Date();
            const localToday = getLocalISOString();

            for (let i = 13; i >= 0; i--) {
                const d = new Date(todayD);
                d.setDate(d.getDate() - i);
                days.push(d.toLocaleDateString('sv-SE'));
            }
            const labels = days.map(ds => {
                const d = new Date(ds + 'T00:00:00');
                return d.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short'
                });
            });
            const values = days.map(ds => dailyMap[ds] || 0);
            const todayStr = getLocalISOString();
            if (dailyChartInstance) dailyChartInstance.destroy();
            dailyChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Collection',
                        data: values,
                        backgroundColor: days.map(ds => ds === todayStr ? '#4f46e5' : 'rgba(99,102,241,0.35)'),
                        borderRadius: 8,
                        maxBarThickness: 26
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: '#f1f5f9'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        function switchTab(id, btn) {
            // Hide all sections, show active one
            document.querySelectorAll('section').forEach(s => s.classList.add('section-hidden'));
            const targetSection = document.getElementById(`tab-${id}`);
            if (targetSection) targetSection.classList.remove('section-hidden');

            // Reset Desktop Nav Button Classes
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('sidebar-active'));
            
            // Reset Mobile Bottom Nav Button Classes
            document.querySelectorAll('.mobile-nav-btn').forEach(b => b.classList.remove('mobile-nav-active'));

            // Match and apply visual active state safely across both navigational structures
            const desktopBtn = Array.from(document.querySelectorAll('.nav-btn')).find(b => b.getAttribute('onclick')?.includes(`'${id}'`));
            if (desktopBtn) desktopBtn.classList.add('sidebar-active');

            const mobileBtn = Array.from(document.querySelectorAll('.mobile-nav-btn')).find(b => b.getAttribute('onclick')?.includes(`'${id}'`));
            if (mobileBtn) mobileBtn.classList.add('mobile-nav-active');

            const titles = {
                'overview': 'DASHBOARD',
                'enroll': 'ENROLL PATIENT',
                'log-session': 'LOG SESSIONS',
                'visit-registry': 'DAILY VISIT REGISTRY',
                'patients': 'PATIENT RECORDS',
                'billing': 'BILLING',
                'inquiry': 'INQUIRIES'
            };
            document.getElementById('tab-title').innerText = titles[id] || 'PRISM';

            if (id === 'log-session') renderActiveCasesForLog();
            if (id === 'visit-registry') renderDailyRegistry();
            
            // Auto scroll main window back to top on switch for mobile readability
            document.querySelector('main').scrollTo({ top: 0, behavior: 'smooth' });
            closeSidebar();
        }

        function searchPatient() {
            clearTimeout(searchDebounce);
            searchDebounce = setTimeout(() => {
                const val = document.getElementById('patient-search-input').value.toUpperCase().trim();
                const res = document.getElementById('search-results');
                const activeContainer = document.getElementById('active-cases-container');
                
                if (!val) {
                    res.classList.add('hidden');
                    if (activeContainer) activeContainer.style.display = 'block';
                    return;
                }

                if (activeContainer) activeContainer.style.display = 'none';

                // Normalize search values for robust matching
                const searchValClean = val.replace(/[^A-Z0-9]/g, ''); // Alphanumeric only
                const searchValDigits = val.replace(/\D/g, '');      // Digits only

                const matches = Object.keys(patientLookup)
                    .filter(name => {
                        const p = patientLookup[name];
                        if (!p) return false;

                        const pName = name.toUpperCase();
                        const pId = String(p.id || '').toUpperCase();
                        const pIdClean = pId.replace(/[^A-Z0-9]/g, '');
                        const pPhoneClean = String(p.phone || '').replace(/\D/g, '');

                        // Match Name, strict ID, normalized ID (PT-1025 match 1025), or Phone digits
                        return pName.includes(val) || 
                               pId.includes(val) || 
                               (searchValClean !== '' && pIdClean.includes(searchValClean)) ||
                               (searchValDigits !== '' && pPhoneClean.includes(searchValDigits));
                    })
                    .slice(0, 15);

                if (matches.length > 0) {
                    res.innerHTML = matches.map(name => {
                        const p = patientLookup[name];
                        const isClosed = p.closed;
                        
                        return `
                        <div onclick="selectPatient('${name.replace(/'/g, "\\'")}')" class="group flex items-center justify-between p-4 hover:bg-indigo-50 rounded-2xl cursor-pointer border-b border-slate-50 last:border-none transition-all">
                            <div class="flex flex-col">
                                <span class="font-black text-slate-800 uppercase text-sm">${name}</span>
                                <div class="flex items-center gap-2">
                                    <span class="text-indigo-500 text-[10px] font-bold">${p.id}</span>
                                    <span class="text-slate-400 text-[10px] truncate max-w-[150px]">• ${p.diag || 'Consultation'}</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                ${isClosed ? 
                                    '<div class="flex flex-col items-end gap-1"><span class="bg-rose-100 text-rose-600 text-[8px] font-black px-2 py-0.5 rounded uppercase">Case Closed</span><span class="text-[7px] font-bold text-slate-400">TAP TO RESTART</span></div>' : 
                                    '<span class="bg-emerald-100 text-emerald-600 text-[8px] font-black px-2 py-1 rounded uppercase">Active Case</span>'
                                }
                                <i data-lucide="chevron-right" class="w-4 h-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all"></i>
                            </div>
                        </div>`;
                    }).join('');
                } else {
                    res.innerHTML = `
                        <div class="p-10 text-center">
                            <p class="text-slate-400 text-xs font-bold italic">No patient records found matching "${val}"</p>
                            <p class="text-[9px] text-slate-300 uppercase mt-2">Check spelling or try searching by Phone Number</p>
                        </div>`;
                }
                
                res.classList.remove('hidden');
                if (window.lucide) lucide.createIcons();
            }, 150);
        }

        function selectPatient(n) {
            selectedPatientName = n;
            const p = patientLookup[n];
            document.getElementById('patient-search-input').value = n;
            document.getElementById('search-results').classList.add('hidden');
            document.getElementById('active-patient-name').innerText = n;
            document.getElementById('base-rate-display').value = p.baseRate;
            document.getElementById('patient-workspace').classList.remove('hidden');
            
            const mobNameEl = document.getElementById('mobile-drawer-patient-name');
            if (mobNameEl) mobNameEl.innerText = n;

            // USE SERVER PRE-CALCULATED VALUES
            const rem = p.remainingSessions;

            const badge = document.getElementById('workspace-remaining');
            if (p.closed) {
                badge.innerText = "CASE CLOSED";
                badge.className = "bg-rose-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase";
            } else if (p.purchased > 0) {
                badge.innerText = `Rem: ${rem} Sessions`;
                badge.className = "bg-indigo-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase";
            } else {
                badge.innerText = "REGULAR";
                badge.className = "bg-slate-200 text-slate-600 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase";
            }
            
            document.getElementById('recent-logs-cards').innerHTML = p.logs.slice().reverse().slice(0, 10).map(l => {
                const isEnroll = String(l[7] || '').trim().toLowerCase() === 'enrollment';
                return `<div class="log-card">
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-[9px] font-black text-indigo-600">${formatDateDMY(l[8])}</span>
                        <div class="flex items-center gap-2">
                            ${isEnroll ? `<span class="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded text-[8px] font-black uppercase">Enrollment</span>` : ''}
                            <span class="text-[9px] font-bold">₹${l[9]}</span>
                        </div>
                    </div>
                    <div class="text-[10px] italic text-slate-400">"${l[6]}"</div>
                </div>`;
            }).join('');
            
            renderCalendar();
            renderActiveCasesForLog();
            updateAdvanceHint();
            toggleSessionDrawer(true);
        }

        function renderCalendar() {
            const grid = document.getElementById('calendar-grid');
            grid.innerHTML = '';
            if (!selectedPatientName) return;
            const p = patientLookup[selectedPatientName];
            
            // Identify Enrollment Date
            const enrollmentDate = p.logs.find(l => String(l[7]).toLowerCase() === 'enrollment')?.[8];
            
            // Other session dates
            // Build a count map for multi-session days
            const logDateCounts = {};
            p.logs.filter(l => String(l[7]).toLowerCase() !== 'enrollment').forEach(l => {
                logDateCounts[l[8]] = (logDateCounts[l[8]] || 0) + 1;
            });
            const logDates = new Set(Object.keys(logDateCounts));

            const dueDates = new Set(
                p.logs.filter(l => {
                    const mode = l[15] || 'Cash';
                    const fee = toNum(l[9]);
                    const paid = (l[16] !== undefined && l[16] !== "") ? toNum(l[16]) : (mode === 'Pending' ? 0 : fee);
                    return mode === 'Pending' && (fee - paid) > 0;
                }).map(l => l[8])
            );

            const yr = currentViewDate.getFullYear(),
                mt = currentViewDate.getMonth();
            document.getElementById('calendar-month-year').innerText = currentViewDate.toLocaleString('default', {
                month: 'long',
                year: 'numeric'
            });
            const first = new Date(yr, mt, 1).getDay(),
                total = new Date(yr, mt + 1, 0).getDate(),
                today = new Date();
            today.setHours(0, 0, 0, 0);
            for (let i = 0; i < first; i++) grid.innerHTML += `<div></div>`;
            for (let d = 1; d <= total; d++) {
                const ds = `${yr}-${String(mt + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
                    dateObj = new Date(yr, mt, d),
                    isFuture = dateObj > today,
                    sel = selectedDates.includes(ds),
                    isEnrollDay = (ds === enrollmentDate),
                    isLogged = logDates.has(ds),
                    isDue = dueDates.has(ds);
                const btn = document.createElement('div');
                let dayClass = `h-10 max-lg:h-7 flex items-center justify-center rounded-xl max-lg:rounded-lg border font-bold text-[10px] ${isFuture ? 'calendar-day-disabled' : 'cursor-pointer'} `;
                if (sel) dayClass += 'calendar-day-selected ';
                else if (isEnrollDay) dayClass += 'calendar-day-enrolled ';
                else if (isDue) dayClass += 'calendar-day-due ';
                else if (isLogged) dayClass += (logDateCounts[ds] > 1 ? 'calendar-day-multi ' : 'calendar-day-logged bg-emerald-50/50 ');
                else if (!isFuture) dayClass += 'bg-white border-slate-100 hover:border-indigo-300 ';
                btn.className = dayClass;
                btn.innerText = d;
                if (!isFuture) btn.onclick = () => {
                    if (selectedDates.includes(ds)) {
                        selectedDates = selectedDates.filter(x => x !== ds);
                        renderCalendar();
                    } else if (isLogged) {
                        showSessionConfirmPopup(ds, () => {
                            selectedDates.push(ds);
                            renderCalendar();
                        });
                    } else {
                        selectedDates.push(ds);
                        // Auto-reactivate closed case when a date is selected
                        if (p.closed) {
                            const dateStr2 = getLocalISOString();
                            const row = [new Date().toISOString(), p.id, selectedPatientName, p.phone, "", "", p.diag, "Case Restarted", dateStr2, 0, 0, 0, 0, ""];
                            globalData.push(row);
                            p.closed = false;
                            p.closedDate = null;
                            reactivationGraceMap[selectedPatientName] = Date.now();
                            showToast(`${selectedPatientName}'s case auto-reactivated`, 'success');
                            syncToBackend({
                                action: "logAppointment",
                                id: p.id,
                                name: selectedPatientName,
                                phone: p.phone,
                                condition: p.diag,
                                fee: 0,
                                purchased: 0,
                                advance: 0,
                                type: "Case Restarted",
                                date: dateStr2
                            }).catch(() => {});
                        }
                        renderCalendar();
                    }
                };
                grid.appendChild(btn);
            }
        }

        function renderActiveCasesForLog() {
    const grid = document.getElementById('active-cases-grid');
    if (!grid) return;
    const names = Object.keys(patientLookup).filter(n => !patientLookup[n].closed).sort();
    if (!names.length) {
        grid.innerHTML = `<p class="text-xs text-slate-600 italic col-span-full">No active cases yet — enroll a patient to get started.</p>`;
        return;
    }
    grid.innerHTML = names.map(n => {
        const p = patientLookup[n];
        
        // UPDATED: Calculate using wallet helper
        const rem = getRemainingSessions(p);
        
        const active = selectedPatientName === n;
        const safeName = n.replace(/"/g, '&quot;');
        return `<div data-name="${safeName}" class="active-case-card p-4 rounded-2xl border transition-all ${active ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-slate-50 border-slate-100'}">
            <div class="flex justify-between items-center mb-1 gap-2">
                <span class="font-black text-xs uppercase truncate">${n}</span>
                <span class="text-[9px] font-black flex-shrink-0 ${active ? 'text-white/80' : 'text-indigo-500'}">${p.id}</span>
            </div>
            <div class="text-[10px] ${active ? 'text-white/70' : 'text-slate-400'} italic truncate mb-2">${p.diag || '-'}</div>
            <div class="flex items-center justify-between gap-2">
                <span class="text-[9px] font-black ${active ? 'text-white' : 'text-emerald-600'}">${rem > 0 ? rem + ' session(s) left' : 'Regular'}</span>
                <button type="button" data-name="${safeName}" class="log-case-btn ${active ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white'} px-3 py-1.5 rounded-lg text-[9px] font-black uppercase hover:opacity-90 transition-all">Log Session</button>
            </div>
        </div>`;
    }).join('');
    grid.querySelectorAll('.log-case-btn').forEach(btn => {
        btn.addEventListener('click', () => selectPatient(btn.dataset.name));
    });
}

        function renderTables() {
    const pBody = document.getElementById('patient-table-body'),
        bBody = document.getElementById('billing-table-body');
    let pHtml = "",
        bHtml = "";

    let names = Object.keys(patientLookup);

    names.sort((a, b) => {
        return recordSortLatest ?
            (patientLookup[b].enrollTime - patientLookup[a].enrollTime) :
            (patientLookup[a].enrollTime - patientLookup[b].enrollTime);
    });

    names.forEach(name => {
        const p = patientLookup[name];
        const rem = getRemainingSessions(p);
        const totalAmount = p.logs.reduce((sum, l) => sum + toNum(l[9]), 0);
        
        // Internal calculations for the badge text
        const remainingValue = Math.round(rem * (p.baseRate || 0));
        const walletValue = Math.round(p.walletBalance || 0);

        if (currentBranchFilter === 'ALL' || p.id.startsWith(currentBranchFilter)) {
            let statusBadge;

            // 1. DARK - CASE CLOSED
            if (p.closed) {
                statusBadge = `<span class="bg-slate-800 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">Closed</span>`;
            } 
            
            // 2. RED - OUTSTANDING DUE (PRIORITY)
            else if (p.outstandingDue > 0) {
                statusBadge = `<button onclick="openMarkPaidPrompt('${name.replace(/'/g, "\\'")}')" class="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-[10px] font-black hover:bg-rose-700 hover:text-white transition-all cursor-pointer uppercase shadow-sm">₹${p.outstandingDue.toLocaleString()} Due</button>`;
            } 

            // 3. BLUE - SESSIONS LEFT OR WALLET BALANCE
            else if (rem > 0 || walletValue > 0) {
                const displayAmt = rem > 0 ? remainingValue : walletValue;
                const displayText = rem > 0 ? `${rem} Left` : `Balance`;
                statusBadge = `<span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">${displayText} (₹${displayAmt.toLocaleString()})</span>`;
            } 
            
            // 4. GREEN - REGULAR (0 BALANCE / 0 DUE)
            else {
                statusBadge = `<span class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">Regular</span>`;
            }

            pHtml += `<tr class="hover:bg-slate-50/50 ${p.closed ? 'bg-slate-50/40' : ''}" data-search-tag="${name.toUpperCase()} ${p.id.toUpperCase()}">
                        <td class="p-5 font-black text-indigo-500 text-xs hidden lg:table-cell">${p.id}</td>
                        <td class="p-5 font-bold uppercase text-xs cursor-pointer hover:text-indigo-600 hover:underline" onclick="viewPatientDetail('${name.replace(/'/g, "\\'")}')">${name}</td>
                        <td class="p-5 text-xs font-bold text-slate-600 italic hidden lg:table-cell">${p.age || '—'}Y / ${p.gender || '—'}</td>
                        <td class="p-5 text-xs font-black text-slate-700 hidden lg:table-cell">${p.phone || '—'}</td>
                        <td class="p-5 italic text-slate-600 text-xs truncate max-w-[150px] hidden lg:table-cell">${p.diag}</td>
                        <td class="p-5">${statusBadge}</td>
                <td class="p-5 text-center flex gap-2 justify-center">
                    <button onclick="sendWhatsApp('${p.phone}', '${name.replace(/'/g, "\\'")}')" class="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg shadow-md transition-all"><i data-lucide="message-square" class="w-4 h-4"></i></button>
                    <button onclick="openEditPatientModal('${name.replace(/'/g, "\\'")}')" class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-md transition-all"><i data-lucide="edit-3" class="w-4 h-4"></i></button>
                    ${p.closed 
                        ? `<button onclick="restartPatientCase('${name.replace(/'/g, "\\'")}', event)" class="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-lg shadow-md transition-all"><i data-lucide="play" class="w-4 h-4"></i></button>`
                        : `<button onclick="openCaseModal();" class="bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-lg shadow-md transition-all"><i data-lucide="check-circle" class="w-4 h-4"></i></button>`
                    }
                </td>
            </tr>`;

            bHtml += `<tr class="hover:bg-slate-50/50" data-patient="${name}">
                        <td class="p-5 font-bold uppercase text-xs">${name}</td>
                        <td class="p-5 font-black text-xs text-slate-600 hidden lg:table-cell">${p.id}</td>
                        <td class="p-5 text-xs font-bold text-indigo-600">₹${totalAmount.toLocaleString()}</td>
                        <td class="p-5 text-center">
                            <button onclick="generateBill('${name}')" class="bg-indigo-500 hover:bg-indigo-600 text-white px-3 lg:px-6 py-2 rounded-lg text-[9px] font-black uppercase transition-all shadow-md">
                                <span class="hidden lg:inline">Generate Bill</span>
                                <span class="lg:hidden">View Bill</span>
                            </button>
                        </td>
                    </tr>`;
        }
    });
    pBody.innerHTML = pHtml;
    bBody.innerHTML = bHtml;
    lucide.createIcons();
}

        function viewPatientDetail(name) {
    const p = patientLookup[name];
    if (!p) return;
    // Calculate total fees
    const totalFees = p.logs.reduce((sum, l) => sum + toNum(l[9]), 0);
    
    // Find the most recent actual payment (where Amount Paid > 0)
    // We use row[0] because it is the immutable system timestamp of the transaction
    const paymentLogs = p.logs.filter(l => toNum(l[16]) > 0);
    paymentLogs.sort((a, b) => new Date(b[0]) - new Date(a[0]));
    const lastPayEntry = paymentLogs[0];
    
    let lastPayDisplay = "No payments yet";
    if (lastPayEntry) {
        const lastAmount = toNum(lastPayEntry[16]);
        const lastDate = formatDateDMY(lastPayEntry[0]); // Using system timestamp date
        lastPayDisplay = `Last: ₹${lastAmount.toLocaleString()} | ${lastDate}`;
    }

    const remaining = getRemainingSessions(p);
    const consumed = p.logs.filter(l => {
        const t = String(l[7] || '').trim().toLowerCase();
        const fee = toNum(l[9]);
        if (t === 'enrollment') return fee > 0;
        return t !== 'package added' && t !== 'case closed' && t !== 'case restarted' && t !== 'bill issued';
    }).length;

    document.getElementById('pd-name').innerText = name;
    document.getElementById('pd-id-badge').innerText = p.id;
    document.getElementById('pd-sessions').innerText = consumed;
    
    // Update the Total Paid card to show both Total and the Last Payment Date
    document.getElementById('pd-payment').innerHTML = `
        <span class="block">₹${totalFees.toLocaleString()}</span>
        <span class="block text-[10px] text-emerald-500 mt-1 font-black">${lastPayDisplay}</span>
    `;

    const dueCard = document.getElementById('pd-due-card');
    if (p.outstandingDue > 0) {
        dueCard.classList.remove('hidden');
        document.getElementById('pd-due').innerText = '₹' + p.outstandingDue.toLocaleString();
    } else {
        dueCard.classList.add('hidden');
    }

    document.getElementById('pd-demo').innerText = `${p.age || '—'} yrs / ${p.gender || '—'}`;
    document.getElementById('pd-phone').innerText = p.phone || '—';
    document.getElementById('pd-address').innerText = p.address || '—';
    document.getElementById('pd-diag').innerText = p.diag || '—';
    const wallet = p.walletBalance || 0;
    document.getElementById('pd-package').innerText = p.purchased > 0
        ? `${remaining} of ${p.purchased} sessions left @ ₹${p.baseRate}/session | Wallet: ₹${wallet.toLocaleString()}`
        : `Regular @ ₹${p.baseRate || 0}/session | Wallet: ₹${wallet.toLocaleString()}`;

    const statusEl = document.getElementById('pd-status');
    statusEl.innerText = p.closed
        ? `Closed${p.closedDate ? ' on ' + formatDateDMY(p.closedDate) : ''}`
        : 'Active';

    const datesList = document.getElementById('pd-dates-list');
    const sortedLogs = p.logs.slice().sort((a, b) => new Date(b[8]) - new Date(a[8]));
    datesList.innerHTML = sortedLogs.length
        ? sortedLogs.map(l => {
            const mode = l[15] || 'Cash';
            const badgeColor = mode === 'Pending' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600';
            const note = l[6] ? `<span class="text-slate-400 italic ml-2">"${l[6]}"</span>` : '';
            return `<div class="p-3 bg-slate-50 rounded-xl text-[10px] font-bold text-slate-600 flex justify-between items-center gap-2">
                <span class="truncate">${formatDateDMY(l[8])}${note}</span>
                <span class="flex items-center gap-2 flex-shrink-0">
                    <span class="${badgeColor} px-2 py-0.5 rounded text-[9px] font-black uppercase">${mode}</span>
                    <span class="text-indigo-500">₹${toNum(l[9])}</span>
                </span>
            </div>`;
        }).join('')
        : `<p class="text-xs text-slate-600 italic">No sessions logged yet.</p>`;

    const modal = document.getElementById('patient-detail-modal');
    let actionButtons = modal.querySelector('.detail-action-buttons');
    if (actionButtons) actionButtons.remove();

    actionButtons = document.createElement('div');
    actionButtons.className = 'detail-action-buttons flex gap-2 pt-4 mt-4 border-t flex-wrap flex-shrink-0';
    actionButtons.innerHTML = `
        <button onclick="openExercisePlanModal('${name.replace(/'/g, "\\'")}')" class="flex-1 min-w-[120px] bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-3 rounded-xl text-[9px] font-black uppercase transition-all">🏃 Exercise Plan</button>
        <button onclick="closePatientDetailModal(); openEditPatientModal('${name.replace(/'/g, "\\'")}')" class="flex-1 min-w-[120px] bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-xl text-[9px] font-black uppercase transition-all">✏️ Edit Details</button>
        <button onclick="closePatientDetailModal(); generateBill('${name.replace(/'/g, "\\'")}')" class="flex-1 min-w-[120px] bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 rounded-xl text-[9px] font-black uppercase transition-all">📄 View Bill</button>
    `;
    const portalBtn = document.createElement('button');
    portalBtn.className = 'flex-1 min-w-[120px] bg-[#25D366] hover:bg-[#20BA5F] text-white py-2 px-3 rounded-xl text-[9px] font-black uppercase transition-all';
    portalBtn.innerHTML = '💬 Send Portal Login';
    portalBtn.onclick = () => sendPatientPortalLink(name);
    actionButtons.appendChild(portalBtn);

    modal.querySelector('.bg-white').appendChild(actionButtons);

    document.getElementById('patient-detail-modal').classList.remove('hidden');
    lucide.createIcons();
}

        function closePatientDetailModal() {
            document.getElementById('patient-detail-modal').classList.add('hidden');
        }

        function sendPatientPortalLink(name) {
            const p = patientLookup[name];
            if (!p) {
                showToast('Patient not found', 'error');
                return;
            }
            const waNumber = getWhatsAppNumber(p.phone);
            if (!waNumber) {
                showToast('Invalid phone number', 'warning');
                return;
            }
            const message = encodeURIComponent(
                `Hello ${name},\n\n` +
                `You can now view your sessions, receipts, and prescribed home exercises anytime through our Patient Portal.\n\n` +
                `Portal Link: https://prismhealthcare.in/Patient%20Login.html\n\n` +
                `Login Details\n` +
                `User Id: ${name}\n` +
                `Verification ID: ${String(p.id).slice(-4)}\n\n` +
                `There you can check your sessions logs, prescribed home exercise plan, and download bills.\n\n` +
                `Warm regards,\n` +
                `Prism Physiotherapy & Rehabilitation Center`
            );
            window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
        }

        // ---------- EDIT PATIENT ----------
        function openEditPatientModal(name) {
            const p = patientLookup[name];
            if (!p) {
                showToast('Patient not found', 'error');
                return;
            }
            document.getElementById('ep-original-name').value = name;
            document.getElementById('ep-id').value = p.id;
            document.getElementById('ep-name').value = name;
            document.getElementById('ep-phone').value = p.phone || '';
            document.getElementById('ep-age').value = p.age || '';
            document.getElementById('ep-gender').value = p.gender || 'Male';
            document.getElementById('ep-condition').value = p.diag || '';
            document.getElementById('ep-address').value = p.address || '';
            document.getElementById('edit-patient-modal').classList.remove('hidden');
        }

        function closeEditPatientModal() {
            document.getElementById('edit-patient-modal').classList.add('hidden');
        }

        async function saveEditPatient() {
            const oldName = document.getElementById('ep-original-name').value;
            const p = patientLookup[oldName];
            if (!p) {
                showToast('Patient not found', 'error');
                return;
            }

            const newName = document.getElementById('ep-name').value.trim();
            const newPhone = document.getElementById('ep-phone').value.trim();
            const newAge = document.getElementById('ep-age').value.trim();
            const newGender = document.getElementById('ep-gender').value;
            const newCondition = document.getElementById('ep-condition').value.trim();
            const newAddress = document.getElementById('ep-address').value.trim();

            if (!newName) {
                showToast('Patient name cannot be empty', 'warning');
                return;
            }

            globalData.forEach(r => {
                if (String(r[1]) === p.id) {
                    r[2] = newName;
                    r[3] = newPhone;
                    r[4] = newAge;
                    r[5] = newGender;
                    r[6] = newCondition;
                    r[14] = newAddress;
                }
            });

            processData();
            closeEditPatientModal();
            showToast('Patient details updated', 'success');

            syncToBackend({
                action: "updatePatient",
                id: p.id,
                oldName: oldName,
                name: newName,
                phone: newPhone,
                age: newAge,
                gender: newGender,
                condition: newCondition,
                address: newAddress
            }).catch(() => {});
        }

        function generateClinicalID() {
            const b = document.getElementById('en-branch').value,
                y = new Date().getFullYear().toString().slice(-2);
            document.getElementById('en-id').value = `${b}${y}/${1001 + Object.keys(patientLookup).length}`;
        }

        function changeMonth(o) {
            currentViewDate.setMonth(currentViewDate.getMonth() + o);
            renderCalendar();
        }

        function getWhatsAppNumber(phone) {
            let digits = (phone || '').replace(/\D/g, '');
            digits = digits.replace(/^0+/, '');
            if (digits.length === 12 && digits.startsWith('91')) return digits;
            if (digits.length === 10) return '91' + digits;
            if (digits.length > 10) return digits;
            return digits ? '91' + digits : '';
        }

        function sendWhatsApp(phone, name) {
            const waNumber = getWhatsAppNumber(phone);
            if (!waNumber) {
                showToast('Invalid phone number', 'warning');
                return;
            }
            const msg = encodeURIComponent(`Hello ${name},\n\nWe hope you are following your prescribed exercises and feeling stronger each day. Regular practice is vital for your complete recovery.\n\nIf you have a moment, we would very much appreciate your feedback on our services here: https://g.page/r/CbjaRxUysOqhEBM/review\n\nWarm regards,\nPrism Physiotherapy`);
            window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank');
        }

        function sendTomorrowReminder() {
            if (!selectedPatientName) return;
            const p = patientLookup[selectedPatientName];
            const waNumber = getWhatsAppNumber(p.phone);
            if (!waNumber) {
                showToast('Invalid phone number', 'warning');
                return;
            }
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowLabel = tomorrow.toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'short' });

            const msg = encodeURIComponent(
                `Hello ${selectedPatientName},\n\n` +
                `This is a friendly reminder about your physiotherapy session scheduled for *tomorrow, ${tomorrowLabel}* at Prism Physiotherapy & Rehabilitation Center.\n\n` +
                `Please arrive a few minutes early. See you then!\n\n` +
                `Warm regards,\nPrism Physiotherapy`
            );

            showToast('Opening WhatsApp reminder...', 'success');
            window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank');
        }

        function sendDueReminder(name) {
            const p = patientLookup[name];
            if (!p) return;
            const waNumber = getWhatsAppNumber(p.phone);
            if (!waNumber) {
                showToast('Invalid phone number', 'warning');
                return;
            }
            const due = p.outstandingDue;
            const sessionCount = p.dueSessionCount || 0;
            const UPI_ID = "dr.raviphysio01@oksbi";

            const msg = encodeURIComponent(
                `Hello ${name},\n\n` +
                `This is a gentle reminder from *Prism Physiotherapy & Rehabilitation Center* regarding a pending balance on your account.\n\n` +
                `*Outstanding Amount:* ₹${due.toLocaleString()}\n` +
                `*Pending for:* ${sessionCount} session(s)\n\n` +
                `You can clear this via UPI:\n` +
                `*UPI ID:* ${UPI_ID}\n\n` +
                `Kindly share the payment screenshot once done, or let us know if you'd like to pay by cash/card at the clinic.\n\n` +
                `Thank you for your continued trust in us.\n\n` +
                `Warm regards,\nPrism Physiotherapy & Rehabilitation Center`
            );

            showToast("Opening WhatsApp...", "success");
            window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank');
        }

        function buildDocHeader(stmtNo, udyam) {
            return `<div class="doc-header2">
                <div>
                    <img src="${PRISM_LOGO_SRC}" style="height: 50px; width: auto; display: block; object-fit: contain;" alt="Prism Physiotherapy">
                </div>
                <div class="doc-meta2">
                    <p class="meta-label">Statement No.</p>
                    <p class="meta-value editable">${stmtNo}</p>
                </div>
            </div>`;
        }

        function buildPageFooter(qrId, docName, verifyUrl) {
            return `<div class="doc-footer3">
                <div class="doc-qr-box">
                    <img id="${qrId}" src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(verifyUrl)}" class="qr-slot" style="width:80px;height:80px;display:block;" alt="Verification QR">
                    <small>Scan this to verify this bill</small>
                </div>
                <div class="doc-cert-text">
                    <p class="cert-title">Certification &amp; Authorization</p>
                    <p class="cert-body editable">System-generated medical statement issued by Prism Physiotherapy &amp; Rehabilitation Center. Digitally authenticated and valid without physical signature. Verification link embedded in the QR code.</p>
                </div>
                <div class="doc-sign2">
                    <strong class="editable">${docName}</strong>
                    <span class="sign-sub">DIGITAL SIGNATURE</span>
                    <span class="sign-auth">AUTHORIZED SIGNATORY</span>
                </div>
            </div>`;
        }

        let billEditMode = false;

        function toggleBillEditMode() {
            billEditMode = !billEditMode;
            document.querySelectorAll('#bill-content-pages .editable').forEach(el => {
                el.contentEditable = billEditMode;
            });
            document.getElementById('bill-content-pages').classList.toggle('edit-mode', billEditMode);
            document.getElementById('edit-hint').classList.toggle('hidden', billEditMode);
            const btn = document.getElementById('edit-bill-btn');
            btn.innerHTML = billEditMode ?
                `<i data-lucide="check" class="w-4 h-4"></i> Done Editing` :
                `<i data-lucide="pencil" class="w-4 h-4"></i> Edit Bill`;
            lucide.createIcons();
        }

        let selectedBillPatientName = "";

        function generateBill(name) {
            const p = patientLookup[name];
            if (!p) return;
            selectedBillPatientName = name;
            
            document.getElementById('bsm-patient-name').innerText = name;
            document.getElementById('bsm-opt-ledger').checked = true;
            document.getElementById('bsm-opt-cert').checked = true;
            
            document.getElementById('bill-selection-modal').classList.remove('hidden');
            if (window.lucide) lucide.createIcons();
        }

        function closeBillSelectionModal() {
            document.getElementById('bill-selection-modal').classList.add('hidden');
        }

        function confirmBillGeneration() {
            const name = selectedBillPatientName;
            const p = patientLookup[name];
            if (!p) return;

            const includeLedger = document.getElementById('bsm-opt-ledger').checked;
            const includeCert = document.getElementById('bsm-opt-cert').checked;

            closeBillSelectionModal();

            const prefix = (p.gender === 'Male') ? 'Mr. ' : 'Ms. ';
            const docName = document.getElementById('bill-cfg-doc').value;
            const docReg = document.getElementById('bill-cfg-reg').value;
            const docPhone = document.getElementById('bill-cfg-phone').value;
            const docWeb = document.getElementById('bill-cfg-web').value;
            const nextBillNo = (billCounter[name] || 0) + 1;
            const stmtNo = `${p.id}/${String(nextBillNo).padStart(4, '0')}`;
            billCounter[name] = nextBillNo;
            const now = new Date();
            const dateStr = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
            const fromDate = document.getElementById('bill-range-from').value;
            const toDate = document.getElementById('bill-range-to').value;
            
            let logs = p.logs.filter(l => String(l[7] || '').trim().toLowerCase() !== 'case closed');
            if (fromDate) logs = logs.filter(l => l[8] >= fromDate);
            if (toDate) logs = logs.filter(l => l[8] <= toDate);
            if (fromDate || toDate) {
                if (!logs.length) {
                    showToast('No sessions found in selected date range', 'warning');
                    return;
                }
            }
            
            let total = 0;
            const groups = {};
            logs.forEach(l => {
                const fee = toNum(l[9]);
                total += fee;
                if (!groups[fee]) groups[fee] = {
                    qty: 0,
                    dates: []
                };
                groups[fee].qty++;
                groups[fee].dates.push(l[8]);
            });
            const discountPercent = Number(p.discount) || 0;
            const discountAmount = Math.round(total * discountPercent / 100);
            const grandTotal = total - discountAmount;
            
            let billAmountDue = 0;
            logs.forEach(l => {
                const fee = toNum(l[9]);
                const type = String(l[7] || '').trim().toLowerCase();
                if (type === 'enrollment' || type === 'package added' || type === 'case closed' || type === 'case restarted' || type === 'bill issued') {
                    return;
                }
                
                const paymentMode = l[15] || 'Cash';
                const paid = (l[16] !== undefined && l[16] !== "") ? toNum(l[16]) : toNum(l[9]);
                if (paymentMode === "Pending" || (paymentMode === "Advance" && fee > paid)) {
                    billAmountDue += (fee - paid);
                }
            });

            const billAmountPaid = Math.max(0, grandTotal - billAmountDue);

            let procedureRowsHtml = '';
            Object.keys(groups).forEach(feeKey => {
                const g = groups[feeKey],
                    fee = Number(feeKey);
                const sortedDates = g.dates.slice().sort();
                const periodStart = formatDateDMY(sortedDates[0]);
                const periodEnd = formatDateDMY(sortedDates[sortedDates.length - 1]);
                const subtotal = fee * g.qty;
                const periodLabel = periodStart === periodEnd ? `Date: ${periodStart}` : `Period: ${periodStart} - ${periodEnd}`;
                procedureRowsHtml += `<tr class="procedure-row" style="border-bottom:1px solid #edf2f7">
                    <td style="padding:14px" class="editable">
                        <strong style="font-size:13px; color:#0f172a">${getSessionTypeLabel(p.id)}</strong><br>
                        <span style="font-size:10px; color:#4f46e5; font-weight:700">${periodLabel}</span>
                    </td>
                    <td style="padding:14px; text-align:center; font-weight:800" class="editable">${g.qty}</td>
                    <td style="padding:14px; text-align:center; color:#64748b" class="editable">₹${fee}</td>
                    <td style="padding:14px; text-align:right; font-weight:900" class="editable">₹${subtotal.toLocaleString()}</td>
                </tr>`;
            });
            const verifyUrl = `https://prismhealthcare.in/verify.html?billNo=${encodeURIComponent(stmtNo)}`;
            const rangeNoteHtml = (fromDate || toDate) ?
                `<p style="margin:4px 0 0; font-size:10px; color:#4f46e5; font-weight:800;">Billed Period: ${fromDate ? formatDateDMY(fromDate) : 'Start'} to ${toDate ? formatDateDMY(toDate) : 'Latest'}</p>` : '';

            // Construct Narrative Ledger only if checked
            const ledgerChunks = chunkArray(logs, ROWS_PER_LEDGER_PAGE);
            let ledgerPagesHtml = '';
            if (includeLedger) {
                ledgerChunks.forEach((chunk, pageIdx) => {
                    let rowsHtml = '';
                    chunk.forEach((l, idxInChunk) => {
                        const globalIdx = pageIdx * ROWS_PER_LEDGER_PAGE + idxInChunk;
                        const fee = toNum(l[9]);
                        rowsHtml += `<div class="ledger-row" style="display:flex; align-items:center; padding:16px 4px; border-bottom:1px solid #f1f5f9;">
                            <div style="width:34px; color:#6366f1; font-weight:800; font-size:13px;">${globalIdx + 1}.</div>
                            <div class="editable" style="width:120px; color:#4f46e5; font-weight:800; font-size:13px;">${formatDateDMY(l[8])}</div>
                            <div class="editable" style="flex:1; color:#64748b; font-size:13px;">${getSessionTypeLabel(p.id)}</div>
                            <div class="editable" style="font-weight:800; font-size:14px; color:#0f172a; text-align:right; min-width:80px;">₹${fee}</div>
                        </div>`;
                    });
                    const pageLabel = ledgerChunks.length > 1 ? ` (Page ${pageIdx + 1} of ${ledgerChunks.length})` : '';
                    ledgerPagesHtml += `<div class="bill-page page-break">
                        ${buildDocHeader(stmtNo)}
                        <h2 style="font-size:19px; font-weight:900; letter-spacing:0.5px; color:#0f172a; margin:0 0 6px;">SESSION NARRATIVE LEDGER${pageLabel}</h2>
                        <div style="height:4px; width:100%; background:#4f46e5; border-radius:4px; margin-bottom:10px;"></div>
                        <div style="margin-bottom:30px; margin-top:14px">${rowsHtml}</div>
                        ${buildPageFooter('qr-receipt-' + pageIdx, docName, verifyUrl)}
                    </div>`;
                });
            }

            const firstDate = logs.length ? formatDateDMY(logs[0][8]) : '';
            const lastDate = logs.length ? formatDateDMY(logs[logs.length - 1][8]) : '';
            const ageGenderLine = `Gender: ${p.gender || '-'} | Age: ${p.age || '-'} Y`;
            const patientAddrHtml = p.address ?
                `<p style="margin:2px 0; font-size:12px; color:#475569">Addr: <span class="editable">${p.address}</span></p>` :
                `<p class="editable addr-line" style="margin:2px 0; font-size:12px; color:#475569"></p>`;
            const certAddrClause = p.address ? `, residing at ${p.address},` : '';

            // Handle page separation cleanly
            const hasMorePages = includeLedger || includeCert;

            const invoicePageHtml = `
                <div class="bill-page ${hasMorePages ? 'page-break' : ''}">
                    ${buildDocHeader(stmtNo)}
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px; margin-bottom:26px">
                        <div>
                            <p class="section-label2">Patient Information</p>
                            <strong class="editable" style="font-size:20px; color:#0f172a; display:block; margin-bottom:4px">${prefix}${name}</strong>
                            <p style="margin:2px 0; font-size:12px; color:#475569">ID: <span class="editable" style="font-weight:800; color:#0f172a">${p.id}</span></p>
                            <p class="editable" style="margin:2px 0; font-size:12px; color:#475569">${ageGenderLine}</p>
                            ${patientAddrHtml}
                            <p class="section-label2" style="margin-top:14px">Clinical Diagnosis</p>
                            <strong class="editable" style="font-size:14px; color:#0f172a">${p.diag}</strong>
                        </div>
                        <div style="text-align:right">
                            <p class="section-label2" style="text-align:right">Provider Details</p>
                            <strong class="editable" style="font-size:15px; color:#0f172a; display:block">${docName}</strong>
                            <p style="margin:2px 0; font-size:11px; color:#64748b">Reg No: <span class="editable">${docReg}</span></p>
                            <p style="margin:2px 0; font-size:11px; color:#64748b">Ph: <span class="editable">${docPhone}</span></p>
                            <p class="editable" style="margin:2px 0; font-size:11px; color:#64748b">${docWeb}</p>
                            <p class="section-label2" style="text-align:right; margin-top:14px">Bill Date</p>
                            <strong class="editable" style="font-size:13px">${dateStr}</strong>
                            ${rangeNoteHtml}
                        </div>
                    </div>
                    <table style="width:100%; border-collapse:collapse; margin-bottom:20px">
                        <thead><tr style="background:#f8fafc; text-align:left; border-bottom:2px solid #e2e8f0">
                            <th style="padding:12px; font-size:11px; text-transform:uppercase; color:#64748b">Procedure Description</th>
                            <th style="padding:12px; text-align:center; font-size:11px; text-transform:uppercase; color:#64748b">Qty</th>
                            <th style="padding:12px; text-align:center; font-size:11px; text-transform:uppercase; color:#64748b">Rate</th>
                            <th style="padding:12px; text-align:right; font-size:11px; text-transform:uppercase; color:#64748b">Subtotal</th>
                        </tr></thead>
                        <tbody>${procedureRowsHtml}</tbody>
                        <tfoot>
                            ${discountPercent > 0 ? `
                            <tr>
                                <td colspan="3" style="padding:8px 18px; text-align:right; font-weight:800; font-size:11px; color:#64748b; text-transform:uppercase">Subtotal</td>
                                <td style="padding:8px 18px; text-align:right; font-weight:800; color:#0f172a; font-size:13px" class="editable">₹${total.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td colspan="3" style="padding:8px 18px; text-align:right; font-weight:800; font-size:11px; color:#f97316; text-transform:uppercase">Discount (${discountPercent}%)</td>
                                <td style="padding:8px 18px; text-align:right; font-weight:800; color:#f97316; font-size:13px" class="editable">-₹${discountAmount.toLocaleString()}</td>
                            </tr>` : ''}
                            <tr style="border-top:1.5px solid #e2e8f0">
                                <td colspan="3" style="padding:10px 18px; text-align:right; font-weight:800; font-size:11px; color:#64748b; text-transform:uppercase">Total Payable Amount</td>
                                <td style="padding:10px 18px; text-align:right; font-weight:800; color:#0f172a; font-size:13px" class="editable">₹${grandTotal.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td colspan="3" style="padding:10px 18px; text-align:right; font-weight:800; font-size:11px; color:#10b981; text-transform:uppercase">Amount Paid</td>
                                <td style="padding:10px 18px; text-align:right; font-weight:800; color:#059669; font-size:13px" class="editable">₹${billAmountPaid.toLocaleString()}</td>
                            </tr>
                            <tr style="background:#fef2f2; border-top:1px solid #fee2e2">
                                <td colspan="3" style="padding:14px 18px; text-align:right; font-weight:900; font-size:12px; color:#dc2626; text-transform:uppercase">Outstanding Amount Due</td>
                                <td style="padding:14px 18px; text-align:right; font-weight:900; color:#991b1b; font-size:16px" class="editable">₹${billAmountDue.toLocaleString()}</td>
                            </tr>
                        </tfoot>
                    </table>
                    ${buildPageFooter('qr-inv', docName, verifyUrl)}
                </div>
            `;

            let pagesHtml = invoicePageHtml;

            if (includeLedger) {
                pagesHtml += ledgerPagesHtml;
            }

            if (includeCert) {
                pagesHtml += `
                    <div class="bill-page">
                        ${buildDocHeader(stmtNo)}
                        <h2 style="font-size:22px; font-weight:900; letter-spacing:0.5px; color:#0f172a; text-align:center; margin:0 0 30px;">CERTIFICATE OF TREATMENT</h2>
                        <p class="editable" style="font-size:16px; line-height:2.1; color:#334155; text-align:justify; margin-bottom:40px">
                            This is to certify that <strong>${prefix}${name}</strong> (Age: ${p.age || '-'} Y, Gender: ${p.gender || '-'})${certAddrClause} under the professional care of <strong>Prism Physiotherapy & Rehabilitation Center</strong> for the clinical diagnosis of <strong>${p.diag}</strong>.
                            <br><br>
                            The patient has successfully completed <strong>${logs.length}</strong> session(s) of ${getSessionTypeLabel(p.id)} under the professional supervision of <strong>${docName}.</strong> The treatment program was planned and delivered following a comprehensive clinical assessment, incorporating evidence-based physiotherapy practice and an individualized rehabilitation plan. 
                            <br><br>
                            The prescribed physiotherapy rehabilitation program was provided from <strong>${firstDate}</strong> to <strong>${lastDate}</strong> .
                            <br><br>
                            This certificate is issued upon the patient's request as an official record of the physiotherapy treatment received at our center and may be presented wherever appropriate for verification and official documentation purposes.
                        </p>
                        <div style="display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:20px;">
                            <div style="text-align:center"></div>
                            <div style="text-align:right">
                                <strong class="editable" style="display:block; font-size:14px; color:#0f172a">${docName}</strong>
                                <span style="display:block; font-size:11px; color:#64748b">Consulting Physiotherapist</span>
                                <span class="editable" style="display:block; font-size:10px; color:#64748b">Reg No: ${docReg}</span>
                            </div>
                        </div>
                        ${buildPageFooter('qr-cert', docName, verifyUrl)}
                    </div>
                `;
            }

            document.getElementById('bill-content-pages').innerHTML = pagesHtml;
            document.getElementById('bill-modal').classList.remove('hidden');
            billEditMode = false;
            document.getElementById('bill-content-pages').classList.remove('edit-mode');
            document.getElementById('edit-hint').classList.add('hidden');
            document.getElementById('edit-bill-btn').innerHTML = `<i data-lucide="pencil" class="w-4 h-4"></i> Edit Bill`;
            currentBillContext = {
                name,
                phone: p.phone,
                stmtNo,
                total: grandTotal,
                verifyUrl
            };
            setTimeout(() => {
                lucide.createIcons();
                adjustBillScale();
            }, 300);
            
            syncToBackend({
                action: "logAppointment",
                id: p.id,
                name: name,
                phone: p.phone,
                condition: `Bill Issued: ${stmtNo}`,
                fee: grandTotal,
                billNo: stmtNo,
                type: "Bill Issued",
                date: getLocalISOString()
            }).catch(() => {});
        }

        async function downloadBillPDF() {
    if (!currentBillContext) {
        showToast('Open a bill first', 'warning');
        return;
    }
    const { name, stmtNo } = currentBillContext;
    const container = document.getElementById('bill-content-pages');
    const pageEls = container ? Array.from(container.querySelectorAll('.bill-page')) : [];
    
    if (!pageEls.length || typeof html2canvas === 'undefined' || !window.jspdf) {
        showToast('PDF library not available', 'error');
        return;
    }

    showToast('Generating PDF...', 'info');
    
    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
            compress: true // Enable internal PDF compression
        });

        // 1. Pre-render preparation: Temporarily normalize pages for the engine
        pageEls.forEach(page => {
            page.style.transform = 'none';
            page.style.zoom = '1';
            page.style.margin = '0';
        });

        for (let i = 0; i < pageEls.length; i++) {
            // 2. Optimized html2canvas settings
            const canvas = await html2canvas(pageEls[i], {
                scale: 1.5, // Reduced from 2.0. 1.5 is the "sweet spot" for speed vs clarity.
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
                removeContainer: true,
                imageTimeout: 0, // No delay for images
                fontReadyTimeout: 0
            });

            // 3. Faster Image Conversion
            // Using JPEG with 0.8 quality significantly reduces processing time vs 0.98
            const imgData = canvas.toDataURL('image/jpeg', 0.8);
            
            if (i > 0) pdf.addPage();
            
            // Add image to PDF
            pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
            
            // Cleanup canvas memory immediately
            canvas.width = 0;
            canvas.height = 0;
        }

        // 4. Restore Mobile Preview Scale
        adjustBillScale();

        pdf.save(`${name.replace(/\s+/g, '_')}_Bill_${stmtNo.replace(/\//g, '-')}.pdf`);
        showToast('PDF downloaded!', 'success');
    } catch (err) {
        console.error(err);
        showToast('Generation failed. Try "Print" instead.', 'error');
        adjustBillScale();
    }
}

        function sendBillToPatient() {
            if (!currentBillContext) {
                showToast('Open a bill first', 'warning');
                return;
            }
            const {
                name,
                phone,
                stmtNo,
                total,
                verifyUrl
            } = currentBillContext;
            const waNumber = getWhatsAppNumber(phone);
            if (!waNumber) {
                showToast('Invalid phone number', 'warning');
                return;
            }
            const msg = encodeURIComponent(`Hello ${name},\n\nWe hope you are staying consistent with your prescribed exercises. Please find your official receipt (Statement No: ${stmtNo}) for the amount of ₹${total.toLocaleString()}.\n\nYou can verify the authenticity of this document here: ${verifyUrl}\n\nPlease find the attached PDF copy of your bill. Kindly review it and let us know if you have any questions.\n\nYour feedback is important to us and helps us continue providing the highest quality of care. We would greatly appreciate it if you could share your experience by leaving us a review here: https://g.page/r/CbjaRxUysOqhEBM/review\n\nThank you for choosing Prism Physiotherapy & Rehabilitation Center. We wish you a smooth and speedy recovery!
`);
            window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank');
        }

        function clearBillDateRange() {
            document.getElementById('bill-range-from').value = '';
            document.getElementById('bill-range-to').value = '';
            showToast('Bill range cleared — full history will be used', 'info');
        }

        function filterBillingTable() {
            const searchVal = document.getElementById('bill-search-input').value.toUpperCase();
            const rows = document.querySelectorAll('#billing-table-body tr');
            rows.forEach(row => {
                const patient = row.getAttribute('data-patient').toUpperCase();
                row.style.display = patient.includes(searchVal) ? '' : 'none';
            });
        }

        function closeBillModal() {
            document.getElementById('bill-modal').classList.add('hidden');
        }

        document.getElementById('bill-modal').addEventListener('click', (e) => {
            if (e.target.id === 'bill-modal') closeBillModal();
        });

        ['en-rate', 'en-sessions', 'en-discount'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('input', () => {
                const r = Number(document.getElementById('en-rate').value) || 0,
                    s = Number(document.getElementById('en-sessions').value) || 0,
                    d = Number(document.getElementById('en-discount').value) || 0;
                document.getElementById('enroll-summary').innerText = `₹${((r * s) - (r * s * (d / 100))).toLocaleString()}`;
            });
        });

        // ---------- DARK MODE ----------
        function applyDarkModePreference() {
            let saved = null;
            try {
                saved = localStorage.getItem('prism_dark_mode');
            } catch (e) {}
            if (saved === '1') document.body.classList.add('dark-mode');
        }

        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            try {
                localStorage.setItem('prism_dark_mode', document.body.classList.contains('dark-mode') ? '1' : '0');
            } catch (e) {}
            if (myChart || dailyChartInstance || branchChartInstance) {
                processData();
            }
        }
        applyDarkModePreference();

        // ---------- OUTSTANDING DUES WIDGET ----------
        function renderDuesWidget() {
            const el = document.getElementById('dues-list');
            const statOutstandingEl = document.getElementById('stat-outstanding');
            if (!el) return;

            let total = 0;
            const rows = [];
            Object.keys(patientLookup).forEach(name => {
                const p = patientLookup[name];
                if (p.outstandingDue > 0) {
                    total += p.outstandingDue;
                    rows.push({
                        name,
                        id: p.id,
                        phone: p.phone,
                        due: p.outstandingDue
                    });
                }
            });
            rows.sort((a, b) => b.due - a.due);

            if (statOutstandingEl) statOutstandingEl.innerText = "₹" + total.toLocaleString();

            if (!rows.length) {
                el.innerHTML = `<p class="text-xs text-slate-600 italic">No outstanding dues right now.</p>`;
                return;
            }

            el.innerHTML = rows.map(r => `
                <div class="due-soon-row">
                    <div>
                        <span class="font-black text-xs uppercase text-slate-700">${r.name}</span>
                        <span class="text-[9px] font-bold text-indigo-500 ml-2">${r.id}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-[9px] font-black uppercase px-2 py-1 rounded-lg bg-rose-100 text-rose-600">₹${r.due.toLocaleString()} due</span>
                        <button onclick="sendDueReminder('${r.name.replace(/'/g, "\\'")}')" class="bg-[#25D366] hover:bg-[#20BA5F] text-white p-1.5 rounded-lg" title="Send WhatsApp Reminder"><i data-lucide="message-circle" class="w-3.5 h-3.5"></i></button>
                        <button onclick="openMarkPaidPrompt('${r.name.replace(/'/g, "\\'")}')" class="bg-emerald-500 hover:bg-emerald-600 text-white p-1.5 rounded-lg" title="Mark as Paid"><i data-lucide="check" class="w-3.5 h-3.5"></i></button>
                    </div>
                </div>`).join('');
            lucide.createIcons();
        }

       let markPaidContext = null;

       function openMarkPaidPrompt(name) {
    const p = patientLookup[name];
    if (!p) return;

    // Get ALL sessions with pending balance (both Pending and Advance shortfall rows)
const unpaidLogs = p.logs.filter(l => {
    const mode = l[15] || 'Cash';
    const fee = toNum(l[9]);
    const paid = (l[16] !== undefined && l[16] !== "") ? toNum(l[16]) : (mode === 'Pending' ? 0 : fee);
    return (mode === 'Pending' || (mode === 'Advance' && fee > paid)) && (fee - paid) > 0;
}).sort((a, b) => new Date(a[8]) - new Date(b[8])); // oldest first

    if (!unpaidLogs.length) {
        showToast('No unpaid sessions found', 'info');
        return;
    }

    const totalDue = unpaidLogs.reduce((sum, l) => {
        const fee = toNum(l[9]);
        const paid = (l[16] !== undefined && l[16] !== "") ? toNum(l[16]) : 0;
        return sum + (fee - paid);
    }, 0);

    markPaidContext = { name, p, unpaidLogs, totalDue };

    document.getElementById('mp-patient-name').innerText = name;
    document.getElementById('mp-total-due').innerText = '₹' + totalDue.toLocaleString();
    document.getElementById('mp-session-count').innerText = unpaidLogs.length;
    document.getElementById('mp-amount').value = totalDue;
    document.getElementById('mp-mode').value = 'Cash';

    document.getElementById('markpaid-modal').classList.remove('hidden');
    lucide.createIcons();
}

function closeMarkPaidModal() {
    document.getElementById('markpaid-modal').classList.add('hidden');
    markPaidContext = null;
}

function confirmMarkPaid() {
    if (!markPaidContext) return;
    const { name, p, unpaidLogs } = markPaidContext;

    const amount = Number(document.getElementById('mp-amount').value);
    const mode = document.getElementById('mp-mode').value;

    if (isNaN(amount) || amount <= 0) {
        showToast('Enter a valid amount', 'warning');
        return;
    }

    let remainingAmount = amount;
    const updatedSessions = [];

    for (const log of unpaidLogs) {
        if (remainingAmount <= 0) break;

        while (log.length < 17) log.push("");

        const fee = toNum(log[9]);
        const alreadyPaid = (log[16] !== undefined && log[16] !== "") ? toNum(log[16]) : 0;
        const dueOnThis = fee - alreadyPaid;

        if (dueOnThis <= 0) continue;

        const payThis = Math.min(remainingAmount, dueOnThis);
        const newPaidTotal = alreadyPaid + payThis;

        log[16] = newPaidTotal;
        log[15] = (newPaidTotal >= fee) ? mode : 'Pending';
        log[13] = getLocalISOString(); // Store the actual date the due was cleared

        remainingAmount -= payThis;

        updatedSessions.push({
            date: log[8],
            paymentMode: log[15],
            amountPaid: newPaidTotal,
            originalFee: fee
        });
    }

    processData();
    closeMarkPaidModal();

    if (remainingAmount > 0) {
        showToast(`₹${amount} recorded. ₹${remainingAmount} extra had no due session left — check entry.`, 'warning');
    } else {
        showToast(`₹${amount} recorded for ${name} — dues updated`, 'success');
    }

    // Sync every touched session
    updatedSessions.forEach(s => {
        syncToBackend({
            action: "markAsPaid",
            id: p.id,
            name: name,
            date: s.date,
            paymentMode: s.paymentMode,
            amountPaid: s.amountPaid,
            originalFee: s.originalFee
        }).catch(() => {});
    });
}

        // ---------- CSV EXPORT: PATIENT RECORDS ----------
        function downloadCSV(filename, rows) {
            const csv = rows.map(r => r.map(cell => {
                const s = String(cell ?? '');
                return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
            }).join(',')).join('\n');
            const blob = new Blob([csv], {
                type: 'text/csv;charset=utf-8;'
            });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showToast('CSV exported', 'success');
        }

        function exportPatientsCSV() {
            const rows = [
                ['Clinical ID', 'Patient Name', 'Age', 'Gender', 'Phone', 'Condition', 'Status', 'Sessions Purchased', 'Sessions Consumed', 'Outstanding Due (₹)']
            ];
            Object.keys(patientLookup).forEach(name => {
                const p = patientLookup[name];
                const consumed = p.logs.filter(l => {
                    const t = String(l[7] || '').trim().toLowerCase();
                    const fee = toNum(l[9]);
                    if (t === 'enrollment') return fee > 0;
                    return t !== 'package added' && t !== 'case closed' && t !== 'case restarted' && t !== 'bill issued';
                }).length;

                rows.push([p.id, name, p.age, p.gender, p.phone, p.diag, p.closed ? 'Closed' : 'Active', p.purchased, consumed, p.outstandingDue]);
            });
            downloadCSV(`Prism_Patient_Records_${getLocalISOString()}.csv`, rows);
        }

        function exportBillingCSV() {
            const rows = [
                ['Patient Name', 'Clinical ID', 'Sessions Consumed', 'Sessions Purchased', 'Total Amount (₹)', 'Outstanding Due (₹)']
            ];
            Object.keys(patientLookup).forEach(name => {
                const p = patientLookup[name];
                const consumed = p.logs.filter(l => {
                    const t = String(l[7] || '').trim().toLowerCase();
                    const fee = toNum(l[9]);
                    if (t === 'enrollment') return fee > 0;
                    return t !== 'package added' && t !== 'case closed' && t !== 'case restarted' && t !== 'bill issued';
                }).length;

                const total = p.logs.reduce((sum, l) => sum + toNum(l[9]), 0);
                rows.push([name, p.id, consumed, p.purchased, total, p.outstandingDue]);
            });
            downloadCSV(`Prism_Billing_Summary_${getLocalISOString()}.csv`, rows);
        }

        // ---------- PRINT DAILY REGISTRY ----------
        function printDailyRegistry() {
            const dateVal = document.getElementById('registry-date-input').value;
            const rows = Array.from(document.querySelectorAll('#registry-table-body tr')).filter(r => r.style.display !== 'none');
            const totalFee = document.getElementById('registry-footer-total').innerText;
            const win = window.open('', '_blank', 'width=900,height=1000');
            win.document.write(`
                <html><head><title>Daily Visit Registry — ${dateVal}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 30px; color: #0f172a; }
                    h1 { font-size: 18px; margin-bottom: 2px; }
                    p.sub { color: #64748b; font-size: 11px; margin-top: 0; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; }
                    table { width: 100%; border-collapse: collapse; font-size: 12px; }
                    th, td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; text-align: left; }
                    th { background: #f8fafc; text-transform: uppercase; font-size: 10px; color: #64748b; }
                    tfoot td { font-weight: 900; text-align: right; padding-top: 12px; }
                </style></head><body>
                <h1>Prism Physiotherapy &amp; Rehabilitation Center</h1>
                <p class="sub">Daily Visit Registry — ${dateVal}</p>
                <table><thead><tr><th>#</th><th>Patient</th><th>Clinical ID</th><th>Branch</th><th>Note</th><th>Payment</th><th>Fee</th></tr></thead>
                <tbody>${rows.map(r => `<tr>${r.innerHTML}</tr>`).join('')}</tbody>
                <tfoot><tr><td colspan="6">Total Collection:</td><td>${totalFee}</td></tr></tfoot>
                </table>
                </body></html>
            `);
            win.document.close();
            setTimeout(() => win.print(), 300);
        }

        function openRegistryDownloadModal() {
            const from = document.getElementById('registry-range-from').value;
            const to = document.getElementById('registry-range-to').value;
            if (!from || !to) {
                showToast('Select both From and To dates', 'warning');
                return;
            }
            if (from > to) {
                showToast('From date must be before To date', 'warning');
                return;
            }
            document.getElementById('registry-download-modal').classList.remove('hidden');
        }

        function closeRegistryDownloadModal() {
            document.getElementById('registry-download-modal').classList.add('hidden');
        }

        function downloadRegistryRangeCSV(branch) {
            const from = document.getElementById('registry-range-from').value;
            const to = document.getElementById('registry-range-to').value;
            if (!from || !to) {
                showToast('Select both From and To dates', 'warning');
                return;
            }
            if (from > to) {
                showToast('From date must be before To date', 'warning');
                return;
            }
            const rows = [
                ['Date', 'Patient Name', 'Clinical ID', 'Branch', 'Diagnosis/Note', 'Payment Mode', 'Fee']
            ];
            let total = 0;
            globalData.filter(r => {
                const type = String(r[7] || '').toLowerCase();
                const rDate = r[8];
                const fee = toNum(r[9]);
                const cid = String(r[1] || '');
                const branchMatch = !branch || branch === 'ALL' || cid.startsWith(branch);
                return rDate >= from && rDate <= to && fee > 0 && branchMatch && type !== "case closed" && type !== "case restarted" && type !== "bill issued" && type !== "package added"
            }).sort((a, b) => String(a[8]).localeCompare(String(b[8]))).forEach(r => {
                const cid = r[1],
                    name = r[2],
                    diag = r[6],
                    fee = toNum(r[9]);
                const paymentMode = r[15] || 'Cash';
                const branchLabel = cid.startsWith('POC') ? 'Orthocare' : (cid.startsWith('PHC') ? 'Homecare' : (cid.startsWith('PRC') ? 'Rehab Clinic' : '-'));
                rows.push([formatDateDMY(r[8]), name, cid, branchLabel, diag || '-', paymentMode, fee]);
                total += fee;
            });
            if (rows.length === 1) {
                showToast('No visits found in this range', 'warning');
                return;
            }
            rows.push(['', '', '', '', '', 'Total Collection', total]);
            const branchTag = (!branch || branch === 'ALL') ? 'AllBranches' : branch;
            downloadCSV(`Prism_Visit_Registry_${branchTag}_${from}_to_${to}.csv`, rows);
            closeRegistryDownloadModal();
        }

        function logoutApp() {
    try {
        sessionStorage.removeItem('prism_unlocked');
        sessionStorage.removeItem('prism_user');
    } catch (e) {}
    location.reload();
}

        function updateConnectionStatus() {
    const dot = document.getElementById('connection-dot');
    const text = document.getElementById('connection-text');
    
    // Target the new mobile bulb IDs
    const bulbPing = document.getElementById('status-bulb-ping');
    const bulbInner = document.getElementById('status-bulb-inner');

    if (navigator.onLine) {
        // Desktop indicator (Green)
        if (dot) dot.className = 'w-2 h-2 rounded-full bg-emerald-500';
        if (text) {
            text.className = 'text-emerald-600';
            text.innerText = 'Online';
        }

        // Mobile Bulb indicator (Green)
        if (bulbPing) bulbPing.className = 'animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75';
        if (bulbInner) bulbInner.className = 'relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600';
        
    } else {
        // Desktop indicator (Red)
        if (dot) dot.className = 'w-2 h-2 rounded-full bg-rose-500';
        if (text) {
            text.className = 'text-rose-600';
            text.innerText = 'Offline';
        }

        // Mobile Bulb indicator (Red)
        if (bulbPing) bulbPing.className = 'animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75';
        if (bulbInner) bulbInner.className = 'relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-600';
    }
}
        window.addEventListener('online', updateConnectionStatus);
        window.addEventListener('offline', updateConnectionStatus);
        document.addEventListener('DOMContentLoaded', updateConnectionStatus);

        // AUTO-REFRESH DATA EVERY 120 SECONDS
        setInterval(() => {
            if (navigator.onLine) {
                loadAdminData(false);
                if (window.renderIqTable) renderIqTable();
            }
        }, 120 * 1000); // 120 seconds

        // ---------- KEYBOARD SHORTCUT ----------
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                const visibleSection = document.querySelector('section:not(.section-hidden)');
                if (!visibleSection) return;
                const searchInput = visibleSection.querySelector('input[type="text"]');
                if (searchInput) searchInput.focus();
            }
        });

        // ---------- AUTO-CLOSE INACTIVE CASES (7+ DAYS NO SESSION) ----------
// Stores reactivation timestamps in memory: { patientName: epochMs }
const reactivationGraceMap = {};
const REACTIVATION_GRACE_MS = 60 * 60 * 1000; // exactly 1 hour

async function restartPatientCase(name, event) {
    const btn = event.currentTarget;
    armConfirm(btn, 'Confirm Restart?', async () => {
        const p = patientLookup[name];
        const dateStr = getLocalISOString();
        const row = [new Date().toISOString(), p.id, name, p.phone, "", "", p.diag, "Case Restarted", dateStr, 0, 0, 0, 0, ""];
        globalData.push(row);
        p.closed = false;
        p.closedDate = null;

        // Save exact reactivation timestamp — this is the grace period anchor
        const reactivatedAt = Date.now();
        reactivationGraceMap[name] = reactivatedAt;

        processData();
        showToast(`${name}'s case restarted — 1-hour grace period active`, 'success');

        // Schedule auto-close exactly 1 hour later if no session is logged
        setTimeout(() => {
            // Only close if: (a) still in the grace map for THIS reactivation, (b) still open
            if (reactivationGraceMap[name] !== reactivatedAt) return; // a session was logged — grace cancelled
            const pCurrent = patientLookup[name];
            if (!pCurrent || pCurrent.closed) return;

            // Check whether any real session was logged AFTER reactivation
            const sessionAfterReactivation = pCurrent.logs.some(l => {
                const t = String(l[7] || '').trim().toLowerCase();
                if (['enrollment', 'package added', 'case closed', 'case restarted', 'bill issued'].includes(t)) return false;
                return new Date(l[0]).getTime() >= reactivatedAt;
            });

            if (sessionAfterReactivation) {
                // Session was logged — keep active, clear grace
                delete reactivationGraceMap[name];
                return;
            }

            // No session logged within 1 hour — auto-close
            delete reactivationGraceMap[name];
            const closeDateStr = getLocalISOString();
            const closeRow = [new Date().toISOString(), pCurrent.id, name, pCurrent.phone, "", "", pCurrent.diag, "Case Closed", closeDateStr, 0, 0, 0, 0, "", "", "AutoClosed-Grace", 0];
            globalData.push(closeRow);
            processData();
            showToast(`${name}'s case closed — no session logged within 1 hour of reactivation`, 'warning');
            syncToBackend({
                action: "logAppointment",
                id: pCurrent.id,
                name: name,
                phone: pCurrent.phone,
                condition: pCurrent.diag,
                fee: 0,
                purchased: 0,
                advance: 0,
                type: "Case Closed",
                date: closeDateStr
            }).catch(() => {});
        }, REACTIVATION_GRACE_MS);

        syncToBackend({
            action: "logAppointment",
            id: p.id,
            name: name,
            phone: p.phone,
            condition: p.diag,
            fee: 0,
            purchased: 0,
            advance: 0,
            type: "Case Restarted",
            date: dateStr
        }).catch(() => {});
    });
}

function checkAutoCloseInactiveCases() {
    const todayStr = getLocalISOString();

    function daysBetween(dateStr) {
        if (!dateStr) return Infinity;
        const [y, m, d] = String(dateStr).split('-').map(Number);
        const dUTC = Date.UTC(y, m - 1, d);
        const [ty, tm, td] = todayStr.split('-').map(Number);
        const tUTC = Date.UTC(ty, tm - 1, td);
        return Math.floor((tUTC - dUTC) / 86400000);
    }

    let autoClosedAny = false;

    Object.keys(patientLookup).forEach(name => {
        const p = patientLookup[name];
        if (p.closed) return;

        // GRACE PERIOD GUARD: if this patient was just reactivated, skip the 7-day check entirely
        if (reactivationGraceMap[name] !== undefined) {
            const elapsed = Date.now() - reactivationGraceMap[name];
            if (elapsed < REACTIVATION_GRACE_MS) return; // still within 1-hour grace — do not close
        }

        // Only count actual sessions (ignore enrollment/admin rows)
        const sessionLogs = p.logs.filter(l => {
            const t = String(l[7] || '').trim().toLowerCase();
            return !['enrollment', 'package added', 'case closed', 'case restarted', 'bill issued'].includes(t);
        });

        let lastDate;
        if (sessionLogs.length) {
            lastDate = sessionLogs.reduce((max, l) => (!max || l[8] > max) ? l[8] : max, null);
        } else {
            // No sessions logged yet — count from enrollment date
            lastDate = new Date(p.enrollTime).toLocaleDateString('sv-SE');
        }

        if (daysBetween(lastDate) > 7) {
            autoClosedAny = true;
            const row = [new Date().toISOString(), p.id, name, p.phone, "", "", p.diag, "Case Closed", todayStr, 0, 0, 0, 0, "", "", "AutoClosed", 0];
            globalData.push(row);
            showToast(`${name}'s case auto-closed — 7+ days inactive`, 'warning');
            syncToBackend({
                action: "logAppointment",
                id: p.id,
                name: name,
                phone: p.phone,
                condition: p.diag,
                fee: 0,
                purchased: 0,
                advance: 0,
                type: "Case Closed",
                date: todayStr
            }).catch(() => {});
        }
    });

    if (autoClosedAny) {
        _originalProcessData();
    }
}
        // ---------- WRAP PROCESS DATA ----------
        const _originalProcessData = processData;
        processData = function() {
            _originalProcessData();
            checkAutoCloseInactiveCases();
            renderDuesWidget();
            // Automatically update inquiry registry table with live synced data
            if (window.renderIqTable) {
                renderIqTable();
            }
        };

        // ===== PROGRESS NOTES / SOAP (FIXED) =====
        let progressNotes = {};

        function clearProgressNoteForm() {
    document.getElementById('pn-subjective').value = '';
    document.getElementById('pn-objective').value = '';
    document.getElementById('pn-assessment').value = '';
    document.getElementById('pn-plan').value = '';
}

function saveProgressNote() {
    const subjective = document.getElementById('pn-subjective').value.trim();
    const objective = document.getElementById('pn-objective').value.trim();
    const assessment = document.getElementById('pn-assessment').value.trim();
    const plan = document.getElementById('pn-plan').value.trim();

    if (!subjective || !objective || !assessment || !plan) {
        showToast('Please fill all SOAP fields', 'warning');
        return;
    }

    if (!progressNotes[selectedPatientName]) progressNotes[selectedPatientName] = [];
    progressNotes[selectedPatientName].push({
        date: getLocalISOString(),
        subjective,
        objective,
        assessment,
        plan
    });

    renderProgressNotesTimeline();
    clearProgressNoteForm();
    showToast('SOAP entry saved', 'success');

    syncToBackend({
        action: "saveProgressNote",
        date: getLocalISOString(),
        name: selectedPatientName,
        subjective, objective, assessment, plan
    }).catch(() => {});
}

function closeProgressNotesModal() {
    document.getElementById('progress-notes-modal').classList.add('hidden');
}

        function renderProgressNotesTimeline() {
            const notes = progressNotes[selectedPatientName] || [];
            const container = document.getElementById('progress-notes-timeline');
            if (!notes.length) {
                container.innerHTML = `<p class="text-xs text-slate-600 italic">No SOAP entries yet.</p>`;
                return;
            }
            container.innerHTML = notes.slice().reverse().map((note, idx) => `
        <div class="border-l-4 border-indigo-400 pl-4 py-3 bg-indigo-50/50 rounded-lg">
            <div class="flex justify-between items-start mb-2">
                <span class="text-[10px] font-black uppercase text-indigo-600">${formatDateDMY(note.date)}</span>
                <button onclick="deleteProgressNote('${selectedPatientName}', ${notes.length - 1 - idx})" class="text-rose-500 hover:text-rose-700 text-xs font-bold">Delete</button>
            </div>
            <div class="text-[11px] space-y-1 font-semibold text-slate-700">
                <p><strong>S:</strong> ${note.subjective || '—'}</p>
                <p><strong>O:</strong> ${note.objective || '—'}</p>
                <p><strong>A:</strong> ${note.assessment || '—'}</p>
                <p><strong>P:</strong> ${note.plan || '—'}</p>
            </div>
        </div>
    `).join('');
        }

        // ===== HOME EXERCISE PLANS (FIXED IDs & STICKY DATA) =====
        let exercisePlans = {};

function normId(id) {
    return String(id || '').trim().toUpperCase();
}

const COMMON_INSTRUCTIONS = {
  "Modalities / Pain Relief": [
    "Apply hot pack for 15-20 minutes before exercise",
    "Apply cold pack / ice for 10-15 minutes after activity",
    "Use contrast bath (alternating hot-cold) as advised",
  ],
  "Movement Precautions": [
    "Avoid heavy weight lifting",
    "Avoid running / jogging for now",
    "Avoid prolonged sitting (more than 30 mins at a stretch)",
    "Avoid prolonged standing",
    "Avoid squatting and floor-sitting",
    "Avoid sudden twisting movements",
    "Avoid climbing stairs repeatedly",
    "Avoid overhead activities",
    "Avoid sleeping on the affected side",
    "Avoid bending forward from the waist"
  ],
  "Positioning / Support": [
    "Use cervical collar / belt as advised",
    "Use lumbar belt / support while sitting or standing for long",
    "Use lumbar support / pillow while sitting",
    "Use cervical pillow while sleeping",
    "Use knee cap / brace during activity",
    "Use wrist / thumb splint as advised",
    "Use ankle brace / support during activity",
    "Use shoulder sling / support as advised",
    "Elevate the limb when resting",
    "Maintain correct posture while sitting / standing",
    "Use walking aid (stick / walker) as advised"
  ],
  "General Advice": [
    "Perform exercises slowly and within pain-free range",
    "Stop exercise immediately if sharp pain occurs",
    "Maintain adequate hydration",
    "Continue home exercises daily as prescribed",
    "Follow up after completion of sessions"
  ]
};
function toggleInstructionPicker() {
    const panel = document.getElementById('instruction-picker');
    if (!panel) return;
    if (!panel.classList.contains('show')) {
        renderInstructionPicker();
    }
    panel.classList.toggle('show');
}

function renderInstructionPicker() {
    const list = document.getElementById('instruction-picker-list');
    list.innerHTML = Object.entries(COMMON_INSTRUCTIONS).map(([category, items]) => `
        <div>
            <p class="text-[9px] font-black text-indigo-500 uppercase mb-1.5">${category}</p>
            <div class="space-y-1.5">
                ${items.map(txt => `
                    <label class="flex items-start gap-2 text-[11px] font-semibold text-slate-700 cursor-pointer">
                        <input type="checkbox" class="instruction-checkbox mt-0.5" value="${txt.replace(/"/g, '&quot;')}">
                        <span>${txt}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function insertSelectedInstructions() {
    const checked = Array.from(document.querySelectorAll('.instruction-checkbox:checked')).map(c => c.value);
    if (!checked.length) {
        toggleInstructionPicker();
        return;
    }
    const textarea = document.getElementById('en-instructions');
    const existing = textarea.value.trim();
    const newText = checked.join('. ') + '.';
    textarea.value = existing ? existing + ' ' + newText : newText;
    toggleInstructionPicker();
}


function toggleInstructionPicker2() {
    const panel = document.getElementById('instruction-picker-2');
    if (!panel) return;
    if (!panel.classList.contains('show')) {
        renderInstructionPicker2();
    }
    panel.classList.toggle('show');
}

function renderInstructionPicker2() {
    const list = document.getElementById('instruction-picker-list-2');
    list.innerHTML = Object.entries(COMMON_INSTRUCTIONS).map(([category, items]) => `
        <div>
            <p class="text-[9px] font-black text-indigo-500 uppercase mb-1.5">${category}</p>
            <div class="space-y-1.5">
                ${items.map(txt => `
                    <label class="flex items-start gap-2 text-[11px] font-semibold text-slate-700 cursor-pointer">
                        <input type="checkbox" class="instruction-checkbox-2 mt-0.5" value="${txt.replace(/"/g, '&quot;')}">
                        <span>${txt}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function insertSelectedInstructions2() {
    const checked = Array.from(document.querySelectorAll('.instruction-checkbox-2:checked')).map(c => c.value);
    if (!checked.length) {
        toggleInstructionPicker2();
        return;
    }
    const textarea = document.getElementById('ex-input-instructions');
    const existing = textarea.value.trim();
    const newText = checked.join('. ') + '.';
    textarea.value = existing ? existing + ' ' + newText : newText;
    toggleInstructionPicker2();
}

document.getElementById('instruction-picker').addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('show');
});
document.getElementById('instruction-picker-2').addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('show');
});
        function openExercisePlanModal(patientName) {
    if (!patientName) return;
    document.getElementById('exercise-plan-list').innerHTML = '';

    selectedPatientName = patientName;
    const p = patientLookup[patientName];
    selectedPatientId = p ? normId(p.id) : null;
    document.getElementById('ex-patient-display-name').innerText = selectedPatientId ? `${patientName} (${selectedPatientId})` : patientName;

    if (!selectedPatientId) {
        showToast('Could not resolve patient ID', 'error');
        return;
    }
    if (!exercisePlans[selectedPatientId]) exercisePlans[selectedPatientId] = [];
    renderExercisePlanList();
    document.getElementById('exercise-plan-modal').classList.remove('hidden');
    clearExerciseForm();
}

        function clearExerciseForm() {
    exCart = []; // Add this line
    renderExerciseCart(); // Add this line
    document.getElementById('ex-input-name').value = '';
    document.getElementById('ex-input-sets').value = '3 Sets x 10 Reps';  
    document.getElementById('ex-input-instructions').value = '';
    if(document.getElementById('ex-input-video')) document.getElementById('ex-input-video').value = '';
    if(document.getElementById('ex-input-freq')) document.getElementById('ex-input-freq').value = '2x Daily';
    document.getElementById('ex-input-prescribed-date').value = getLocalISOString();
    document.getElementById('ex-input-review-date').value = '';
}

        function renderExercisePlanList() {
    const exercises = exercisePlans[selectedPatientId] || [];
    const container = document.getElementById('exercise-plan-list');
    
    if (!exercises.length) {
        container.innerHTML = `<div class="border border-dashed border-slate-200 rounded-2xl p-6 text-center text-slate-600 text-xs italic">No exercises prescribed yet.</div>`;
        return;
    }

    container.innerHTML = exercises.map((ex, idx) => `
        <div class="border-2 border-slate-100 rounded-2xl bg-white overflow-hidden mb-2">
            <div onclick="toggleAccordion(${idx})" class="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-all">
                <div>
                    <h5 class="font-black text-slate-800 text-xs uppercase">${ex.name}</h5>
                    <p class="text-[9px] font-bold text-indigo-500 uppercase">${ex.setsReps || '3x10'} • ${ex.frequency || 'Daily'}</p>
                </div>
                <div class="flex items-center gap-3">
                    <button onclick="event.stopPropagation(); deleteExercise('${selectedPatientId}', ${idx})" class="p-2 text-rose-400 hover:text-rose-600"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                    <i data-lucide="chevron-down" id="acc-icon-${idx}" class="w-4 h-4 text-slate-400 transition-transform"></i>
                </div>
            </div>
            <div id="acc-content-${idx}" class="hidden p-4 pt-0 border-t border-slate-50 bg-slate-50/30">
                <div class="py-3">
                    <!-- Section 1: Built-in Steps -->
                    <p class="text-[9px] font-black text-indigo-400 uppercase mb-2 tracking-widest">Exercise Steps</p>
                    <p class="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line mb-4">${ex.exerciseSteps || 'Open exercise to view steps.'}</p>
                    
                    <!-- Section 2: Your Manual Instructions -->
                    ${ex.instructions ? `
                        <p class="text-[9px] font-black text-emerald-500 uppercase mb-2 tracking-widest">Therapist Instructions</p>
                        <div class="p-2 bg-emerald-50/50 rounded-lg border border-emerald-100">
                            <p class="text-[11px] text-emerald-700 font-semibold">${ex.instructions}</p>
                        </div>
                    ` : ''}
                </div>
                <div class="flex justify-between items-center pt-3 border-t border-slate-100">
                    ${ex.videoLink ? `<a href="${ex.videoLink}" target="_blank" class="text-[9px] font-black text-blue-600 uppercase flex items-center gap-1"><i data-lucide="play-circle" class="w-3 h-3"></i> Watch Video</a>` : '<span></span>'}
                    <span class="text-[8px] font-bold text-slate-400 uppercase">Added: ${formatDateDMY(ex.prescribedDate)}</span>
                </div>
            </div>
        </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
}

function toggleAccordion(idx) {
    const content = document.getElementById(`acc-content-${idx}`);
    const icon = document.getElementById(`acc-icon-${idx}`);
    const isHidden = content.classList.contains('hidden');
    document.querySelectorAll('[id^="acc-content-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[id^="acc-icon-"]').forEach(el => el.style.transform = 'rotate(0deg)');
    if (isHidden) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
    }
}

        async function saveExercise() {
    const name = document.getElementById('ex-input-name').value.trim();
    const sets = document.getElementById('ex-input-sets').value.trim();
    const instr = document.getElementById('ex-input-instructions').value.trim();
    const video = ""; // Removed from UI
    const freq = document.getElementById('ex-input-freq').value.trim(); // Reads your "2x Daily" box
    const prescribedDate = document.getElementById('ex-input-prescribed-date').value || getLocalISOString();
    const reviewDate = document.getElementById('ex-input-review-date').value;

    if (!name || !sets || !instr) {
        showToast('Please select exercises from the library first', 'warning');
        return;
    }

    if (!exercisePlans[selectedPatientId]) exercisePlans[selectedPatientId] = [];
    
    const payload = {
        name: name,
        setsReps: sets,
        instructions: instr, // This is your manual note from the box
        exerciseSteps: window.tempSelectedSteps || "", // This is the built-in "how-to"
        videoLink: video,
        frequency: freq,
        prescribedDate: prescribedDate,
        reviewDate: reviewDate
    };
    window.tempSelectedSteps = ""; // Clear for next use


    exercisePlans[selectedPatientId].push(payload);

    renderExercisePlanList();
    clearExerciseForm();
    showToast('Saving to cloud...', 'info');

    await syncToBackend({
        action: "saveExercise",
        id: selectedPatientId,
        name: selectedPatientName,
        exName: name,
        sets: sets,
        instr: instr,
        video: video,
        freq: freq,
        prescribedDate: prescribedDate,
        reviewDate: reviewDate
    });
    
    // Updated Logic: Wipe Cart and Refresh UI
    exCart = []; 
    renderExerciseCart();
    showToast('Exercise plan updated', 'success');
}

        function deleteProgressNote(patientName, index) {
            if (!progressNotes[patientName] || !progressNotes[patientName][index]) return;
            if (!confirm('Delete this entry?')) return;
            progressNotes[patientName].splice(index, 1);
            renderProgressNotesTimeline();
            showToast('Deleted', 'info');
        }

        function closeExercisePlanModal() {
            document.getElementById('exercise-plan-modal').classList.add('hidden');
        }

        function deleteExercise(patientId, index) {
    patientId = normId(patientId);
    if (!exercisePlans[patientId] || !exercisePlans[patientId][index]) return;
    if (!confirm('Delete exercise?')) return;
    exercisePlans[patientId].splice(index, 1);
            renderExercisePlanList();
            showToast('Deleted', 'info');
        }
    (function() {
        function daysSinceSession(dateStr) {
            if (!dateStr) return Infinity;
            const [y, m, d] = String(dateStr).split('-').map(Number);
            const sessionUTC = Date.UTC(y, m - 1, d);
            const [ty, tm, td] = getLocalISOString().split('-').map(Number);
            const todayUTC = Date.UTC(ty, tm - 1, td);
            return Math.floor((todayUTC - sessionUTC) / 86400000);
        }

        const originalSelectPatient = window.selectPatient;
        window.selectPatient = function(name) {
            originalSelectPatient(name);
            const p = patientLookup[name];
            if (!p) return;
            const container = document.getElementById('recent-logs-cards');
            const cards = container.querySelectorAll('.log-card');
            const displayedLogs = p.logs.slice().reverse().slice(0, 10);
            cards.forEach((card, idx) => {
                const logData = displayedLogs[idx];
                const type = String(logData[7] || '').toLowerCase();
                if (type === 'rehab' || type === 'physiotherapy session') {

                    if (daysSinceSession(logData[8]) > 15) {
                        const lockNote = document.createElement('div');
                        lockNote.className = "mt-3 pt-2 border-t border-slate-100 text-[9px] font-black text-slate-400 uppercase";
                        lockNote.innerText = "Locked";
                        card.appendChild(lockNote);
                        return;
                    }

                    const actionArea = document.createElement('div');
                    actionArea.className = "flex gap-4 mt-3 pt-2 border-t border-slate-100";

                    const deleteBtn = document.createElement('button');
                    deleteBtn.innerHTML = '<i data-lucide="trash-2" class="w-3 h-3"></i> Delete';
                    deleteBtn.className = "flex items-center gap-1 text-[9px] font-black text-rose-500 uppercase transition-all px-2 py-1 rounded-lg";
                    deleteBtn.onclick = (e) => {
                        // REPLACED system confirm with armConfirm (Internal UI notification)
                        armConfirm(e.currentTarget, "Confirm Delete?", () => {
                            const timestamp = logData[0];
                            globalData = globalData.filter(row => row[0] !== timestamp);
                            processData();
                            selectPatient(name);
                            
                            // Internal App Toast
                            showToast("Session record removed", "error");

                            syncToBackend({
                                action: "deleteSession",
                                id: p.id,
                                timestamp: timestamp
                            }).catch(() => {
                                showToast("Cloud sync failed", "warning");
                            });
                        });
                    };

                    const editBtn = document.createElement('button');
                    editBtn.innerHTML = '<i data-lucide="edit-2" class="w-3 h-3"></i> Edit Fee';
                    editBtn.className = "flex items-center gap-1 text-[9px] font-black text-indigo-500 uppercase px-2 py-1 rounded-lg";
                    editBtn.onclick = () => {
                        const newFee = prompt(`Update fee for ${formatDateDMY(logData[8])}:`, logData[9]);
                        if (newFee !== null && newFee !== "") {
                            const timestamp = logData[0];
                            const rowIndex = globalData.findIndex(row => row[0] === timestamp);
                            if (rowIndex !== -1) {
                                globalData[rowIndex][9] = Number(newFee);
                                processData();
                                selectPatient(name);
                                
                                // Internal App Toast
                                showToast(`Fee updated to ₹${newFee}`, "success");

                                syncToBackend({
                                    action: "updateFee",
                                    id: p.id,
                                    timestamp: timestamp,
                                    newFee: Number(newFee)
                                }).catch(() => {
                                    showToast("Update failed to sync", "error");
                                });
                            }
                        }
                    };

                    actionArea.appendChild(editBtn);
                    actionArea.appendChild(deleteBtn);
                    card.appendChild(actionArea);
                }
            });
            if (window.lucide) lucide.createIcons();
        };
    })();
(function() {
    // 1. Sidebar Button Injection
    const nav = document.querySelector('#sidebar nav');
    if (nav) {
        const btn = document.createElement('button');
        btn.setAttribute('onclick', "switchTab('inquiry', this)");
        btn.className = 'nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all';
        btn.innerHTML = '<i data-lucide="clipboard-list" class="w-5 h-5"></i> Inquiries';
        nav.appendChild(btn);
    }

    // 2. Main Section UI
    const main = document.querySelector('main');
    if (main) {
        const sec = document.createElement('section');
        sec.id = 'tab-inquiry';
        sec.className = 'section-hidden animate-slide';
        sec.innerHTML = `
            <div class="max-w-6xl mx-auto space-y-6">
                <div class="glass-card p-8 rounded-[2.5rem] shadow-2xl border-indigo-50">
                    <h4 class="text-[10px] font-black uppercase text-indigo-500 tracking-widest border-b pb-4 mb-6">Patient Inquiry & Clinical Registry</h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="space-y-4">
                            <label class="text-[9px] font-black text-slate-600 uppercase ml-1">Identity</label>
                            <input type="text" id="iq-name" placeholder="Patient Full Name" class="w-full p-4 bg-slate-50 rounded-2xl font-bold outline-none border border-transparent focus:border-indigo-300">
                            <div class="grid grid-cols-2 gap-4">
                                <input type="number" id="iq-age" placeholder="Age" class="w-full p-4 bg-slate-50 rounded-2xl font-bold outline-none">
                                <select id="iq-gender" class="w-full p-4 bg-slate-50 rounded-2xl font-bold outline-none">
                                    <option>Male</option><option>Female</option>
                                </select>
                            </div>
                            <input type="tel" id="iq-phone" value="+91" class="w-full p-4 bg-slate-50 rounded-2xl font-bold outline-none">
                        </div>
                        <div class="space-y-4">
                            <label class="text-[9px] font-black text-slate-600 uppercase ml-1">Clinical Assessment</label>
                            <input type="text" id="iq-diagnosis" placeholder="Clinical Diagnosis" class="w-full p-4 bg-indigo-50/50 rounded-2xl font-bold outline-none border border-transparent focus:border-indigo-300 text-indigo-700">
                            <textarea id="iq-note" placeholder="History / Complaints / Notes" rows="3" class="w-full p-4 bg-slate-50 rounded-2xl font-bold outline-none border border-transparent focus:border-indigo-300"></textarea>
                        </div>
                        <div class="flex flex-col justify-end">
                            <button id="iq-save-btn" onclick="saveInquiryToCloud()" class="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                                <i data-lucide="cloud-upload" class="w-5 h-5"></i> Log Inquiry
                            </button>
                        </div>
                    </div>
                </div>

                <div class="glass-card rounded-[2.5rem] shadow-xl overflow-hidden">
                    <div class="p-6 bg-slate-50/50 border-b flex justify-between items-center">
                        <h4 class="text-[10px] font-black uppercase text-slate-600 tracking-widest">Inquiry Follow-up Registry</h4>
                        <span class="text-[9px] font-bold text-slate-600 uppercase">All Entries</span>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-sm">
                            <thead class="bg-slate-50 text-[10px] uppercase font-black text-slate-600">
                            <tr>
                                <th class="p-5 hidden lg:table-cell">Entry Date</th>
                                <th class="p-5">Patient Name</th>
                                    <th class="p-5">Clinical Diagnosis</th>
                                    <th class="p-5">Mobile No</th>
                                    <th class="p-5 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody id="iq-table-body" class="divide-y divide-slate-100"></tbody>
                        </table>
                    </div>
                </div>
            </div>`;
       main.appendChild(sec);
            setupPhoneInputFormatting(document.getElementById('iq-phone'));
        }

    // 3. LocalStorage helpers for inquiry data
    window.loadInquiriesFromStorage = function() {
        try {
            const stored = localStorage.getItem('prism_inquiries');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    };

    window.saveInquiriesToStorage = function(data) {
        try {
            localStorage.setItem('prism_inquiries', JSON.stringify(data));
        } catch (e) {
            console.error('Storage save failed:', e);
        }
    };

    // Initialize inquiry registry from storage on page load
    if (!window.iqRegistry) {
        window.iqRegistry = window.loadInquiriesFromStorage();
    }

    // 4. Logic to Save and Sync
    window.saveInquiryToCloud = async function() {
        const name = document.getElementById('iq-name').value.trim();
        const phone = document.getElementById('iq-phone').value.trim();
        const diagnosis = document.getElementById('iq-diagnosis').value.trim();
        const note = document.getElementById('iq-note').value.trim();
        const age = document.getElementById('iq-age').value;
        const gender = document.getElementById('iq-gender').value;
        const btn = document.getElementById('iq-save-btn');

        if(!name || !diagnosis || phone.length < 10) { 
            showToast("Required: Name, Diagnosis, and Mobile", "warning"); 
            return; 
        }

        btn.disabled = true;
        btn.innerHTML = '<i class="animate-spin w-4 h-4" data-lucide="refresh-cw"></i> SAVING...';
        if(window.lucide) lucide.createIcons();

        try {
            // Create new inquiry object with timestamp
            const newInquiry = {
                date: getLocalISOString(),
                name,
                phone,
                diagnosis,
                note,
                age,
                gender,
                confirmed: false,
                id: Date.now()
            };

            // Add to local registry FIRST
            if (!window.iqRegistry) window.iqRegistry = [];
            window.iqRegistry.unshift(newInquiry);
            
            // Save to localStorage immediately
            window.saveInquiriesToStorage(window.iqRegistry);
            
            renderIqTable();
            
            // Reset form
            document.getElementById('iq-name').value = '';
            document.getElementById('iq-diagnosis').value = '';
            document.getElementById('iq-note').value = '';
            document.getElementById('iq-age').value = '';
            document.getElementById('iq-phone').value = '+91';
            
            showToast("Inquiry saved locally", "success");

            // Sync to cloud AND reload fresh data from sheet
            await syncToBackend({
                action: "saveInquiry",
                name, phone, diagnosis, note, age, gender
            });
            
            // After cloud save, reload inquiry data from sheet
            const result = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify({ action: "fetchAdminData" })
            }).then(r => r.json());
            
            if (result.inquiries) {
                window.iqRegistry = result.inquiries.map(row => ({
                    date: row[0],
                    name: row[1],
                    age: row[2],
                    gender: row[3],
                    phone: String(row[4] || '').replace(/^'/, ''),
                    diagnosis: row[5],
                    note: row[6],
                    confirmed: String(row[7] || '').toLowerCase() === 'yes',
                    rowIndex: row[8],
                    id: row[1] + '_' + row[0]
                }));
                window.saveInquiriesToStorage(window.iqRegistry);
                renderIqTable();
            }
            
            showToast("Synced with sheet", "info");

        } catch (e) {
            showToast("Error saving inquiry", "error");
            console.error(e);
        } finally {
            btn.disabled = false;
            btn.innerHTML = '<i data-lucide="cloud-upload" class="w-5 h-5"></i> LOG INQUIRY';
            if(window.lucide) lucide.createIcons();
        }
    };

    // 5. Render Table (Collapsible Actions on Mobile)
    window.renderIqTable = function() {
        const body = document.getElementById('iq-table-body');
        if (!body) return;
        
        const list = (window.iqRegistry || []);
        const pendingList = list.filter(i => !i.confirmed);
        
        if (pendingList.length === 0) {
            body.innerHTML = '<tr><td colspan="5" class="p-10 text-center text-slate-600 italic text-xs">No pending inquiries.</td></tr>';
            return;
        }

        let html = "";
        pendingList.forEach((i, idx) => {
            const idVal = i.id || idx;
            const safeName = i.name.replace(/'/g, "\\'");
            const safePhone = i.phone.replace(/'/g, "\\'");
            const safeDiag = i.diagnosis.replace(/'/g, "\\'");
            
            html += `
            <tr class="hover:bg-slate-50/50 cursor-pointer lg:cursor-default" onclick="toggleIqActionsMobile('${idVal}')" data-inquiry-id="${idVal}">
                <td class="p-5 font-black text-slate-500 text-xs hidden lg:table-cell">${i.date || formatDateDMY(new Date())}</td>
                <td class="p-5 font-bold text-slate-900 text-xs">${i.name}</td>
                <td class="p-5 font-bold text-slate-600 text-xs">${i.diagnosis}</td>
                <td class="p-5 font-bold text-slate-600 text-xs">${i.phone}</td>
                <td class="p-5 hidden lg:table-cell">
                    <div class="flex items-center justify-center gap-2">
                        <button onclick="event.stopPropagation(); convertInquiryToPatient(${idx})" class="bg-indigo-600 text-white px-3 py-2 rounded-lg text-[9px] font-black uppercase flex items-center gap-1 shadow-sm hover:scale-105 transition-all">
                            <i data-lucide="user-plus" class="w-3 h-3"></i> Enroll
                        </button>
                        <button onclick="event.stopPropagation(); sendIqFollowUp('${safeName}', '${safePhone}', '${safeDiag}')" class="bg-[#25D366] text-white px-3 py-2 rounded-lg text-[9px] font-black uppercase flex items-center gap-1 shadow-sm hover:scale-105 transition-all">
                            <i data-lucide="message-circle" class="w-3 h-3"></i> Reminder
                        </button>
                        <button onclick="event.stopPropagation(); markInquiryConfirmed('${i.id}')" class="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-2 rounded-lg text-[9px] font-black uppercase flex items-center gap-1 shadow-sm hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:scale-105 transition-all">
                            <i data-lucide="check-circle" class="w-3 h-3"></i> Confirm
                        </button>
                    </div>
                </td>
            </tr>
            <!-- Collapsible Mobile Actions Sub-Row -->
            <tr id="iq-mob-actions-${idVal}" class="iq-mobile-action-row hidden bg-slate-50/50 border-t border-b border-indigo-50/40 lg:!hidden">
                <td colspan="100" class="p-3">
                    <div class="flex items-center justify-end gap-3 px-2 py-1">
                        <span class="text-[9px] font-black text-indigo-500 uppercase tracking-widest mr-auto">Action:</span>
                        <button onclick="event.stopPropagation(); convertInquiryToPatient(${idx})" class="bg-indigo-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-1.5 shadow-sm active:scale-95 transition-all">
                            <i data-lucide="user-plus" class="w-3.5 h-3.5"></i> Enroll
                        </button>
                        <button onclick="event.stopPropagation(); sendIqFollowUp('${safeName}', '${safePhone}', '${safeDiag}')" class="bg-[#25D366] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-1.5 shadow-sm active:scale-95 transition-all">
                            <i data-lucide="message-circle" class="w-3.5 h-3.5"></i> Reminder
                        </button>
                        <button onclick="event.stopPropagation(); markInquiryConfirmed('${i.id}')" class="bg-emerald-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-1.5 shadow-sm active:scale-95 transition-all">
                            <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Confirm
                        </button>
                    </div>
                </td>
            </tr>
            `;
        });
        
        body.innerHTML = html;
        if (window.lucide) lucide.createIcons();
    };

    // 6. Mark as Confirmed (Local + Cloud)
    window.markInquiryConfirmed = async function(inquiryId) {
        if (!window.iqRegistry) return;
        
        // Find entry by ID or index
        let entry = window.iqRegistry.find(i => {
            return i.id === inquiryId || 
                   i.id == inquiryId ||  // loose equality for string/number
                   window.iqRegistry.indexOf(i) === inquiryId;
        });

        if (!entry) {
            console.log('Entry not found. ID:', inquiryId, 'Registry:', window.iqRegistry);
            showToast('Entry not found', 'error');
            return;
        }

        // Mark as confirmed
        entry.confirmed = true;
        
        // Save to localStorage immediately
        window.saveInquiriesToStorage(window.iqRegistry);
        
        // Update UI instantly
        renderIqTable();
        showToast('Marked as confirmed', 'success');

        // Sync to cloud in background
        try {
            await syncToBackend({
                action: "markInquiryConfirmed",
                rowIndex: entry.rowIndex || window.iqRegistry.indexOf(entry)
            });
            showToast('Synced to sheet', 'info');
        } catch (e) {
            showToast('Cloud sync pending', 'warning');
        }
    };

// NEW: Convert Inquiry to Enrolled Patient
    window.convertInquiryToPatient = function(idx) {
        const list = (window.iqRegistry || []).filter(i => !i.confirmed);
        const inq = list[idx];
        if (!inq) {
            showToast('Inquiry not found', 'error');
            return;
        }
        // Uses a more robust selector and triggers 'input' events to bypass formatting blocks
switchTab('enroll', document.querySelector('button[onclick*="enroll"]'));
setTimeout(() => {
    document.getElementById('en-name').value = inq.name || '';
    document.getElementById('en-age').value = inq.age || '';
    document.getElementById('en-gender').value = inq.gender || 'Male';
    document.getElementById('en-condition').value = inq.diagnosis || '';
    
    // Fill phone and trigger event so the +91 formatter accepts the value
    const ph = document.getElementById('en-phone');
    ph.value = inq.phone || '+91';
    ph.dispatchEvent(new Event('input')); 
    
    document.getElementById('en-instructions').value = inq.note || '';
    
    // Refresh Clinical ID based on the newly loaded branch/patient
    if(typeof generateClinicalID === 'function') generateClinicalID();
    
    showToast(`Loaded ${inq.name}'s inquiry into Enroll form`, 'success');
}, 300);
    };

    // 7. WhatsApp Action
    window.sendIqFollowUp = function(name, phone, diag) {
        const msg = encodeURIComponent(
            `*Hello ${name},*\n\n` +
            `This is a reminder from *Prism Physiotherapy & Rehabilitation Center* regarding your inquiry for _${diag}_.\n\n` +
            `We recommend a clinical assessment to start your recovery. Are you available for a consultation this week?\n\n` +
            `📞 *Contact:* +91 97080 59081`
        );
        window.open(`https://wa.me/${getWhatsAppNumber(phone)}?text=${msg}`, '_blank');
    };

    // 8. Tab Switch Handler
    const oldSwitchTab = window.switchTab;
    window.switchTab = function(id, btn) {
        oldSwitchTab(id, btn);
        
        // Clear ALL active states from sidebar & mobile nav
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('sidebar-active'));
        document.querySelectorAll('.mobile-nav-btn').forEach(b => b.classList.remove('mobile-nav-active'));
        
        // Apply active state to the clicked button
        if (btn) btn.classList.add(btn.classList.contains('mobile-nav-btn') ? 'mobile-nav-active' : 'sidebar-active');
        
        if(id === 'inquiry') {
            document.getElementById('tab-title').innerText = 'INQUIRIES';
            // Load from storage and refresh display
            window.iqRegistry = window.loadInquiriesFromStorage();
            renderIqTable();
        }
    };

    // 9. Load inquiries on page init
    window.addEventListener('load', function() {
        window.iqRegistry = window.loadInquiriesFromStorage();
        renderIqTable(); // ADD THIS LINE
    });
    
    // Also load immediately on script parse (before window.load fires)
    window.iqRegistry = window.loadInquiriesFromStorage();
    if (document.getElementById('iq-table-body')) {
        renderIqTable();
    }
})();

// Mobile slide-up drawer controller for patient log calendar
function toggleSessionDrawer(show) {
    const container = document.getElementById('session-form-container');
    const backdrop = document.getElementById('session-drawer-backdrop');
    const bottomNav = document.getElementById('mobile-bottom-nav');
    if (!container || !backdrop) return;

    // Direct reset if user is on desktop mode (width >= 1024px)
    if (window.innerWidth >= 1024) {
        container.style.transform = '';
        backdrop.classList.add('hidden');
        backdrop.style.opacity = '0';
        if (bottomNav) bottomNav.classList.remove('hidden');
        return;
    }

    if (show) {
        backdrop.classList.remove('hidden');
        if (bottomNav) bottomNav.classList.add('hidden'); // Hide bottom nav on mobile to prevent overlay clipping
        // Small delay to let browser register the display change before animating transition
        setTimeout(() => {
            backdrop.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 20);
    } else {
        backdrop.style.opacity = '0';
        container.style.transform = 'translateY(100%)';
        // Hide overlay element fully after slide transition completes
        setTimeout(() => {
            backdrop.classList.add('hidden');
            if (bottomNav) bottomNav.classList.remove('hidden'); // Restore bottom nav visibility
        }, 300);
    }
}

// Clean up transforms if user changes screen orientation (Portrait/Landscape)
window.addEventListener('resize', () => {
    const container = document.getElementById('session-form-container');
    if (container) {
        if (window.innerWidth >= 1024) {
            container.style.transform = '';
        } else if (document.getElementById('session-drawer-backdrop').classList.contains('hidden')) {
            container.style.transform = 'translateY(100%)';
        }
    }
});

// Tracks the active auto-hide timer for mobile inquiry action rows
let iqActionsTimeout;

// Controls mobile-only collapsible action sub-rows in Inquiry Registry (Autohides after 5 seconds)
function toggleIqActionsMobile(idVal) {
    if (window.innerWidth >= 1024) return; // Ignore on desktop

    const targetRow = document.getElementById(`iq-mob-actions-${idVal}`);
    if (!targetRow) return;

    const isCurrentlyHidden = targetRow.classList.contains('hidden');

    // Clear any existing active auto-hide timer
    clearTimeout(iqActionsTimeout);

    // Automatically hide all open mobile inquiry actions
    document.querySelectorAll('.iq-mobile-action-row').forEach(row => {
        row.classList.add('hidden');
    });

    // Expand the selected row if it was closed
    if (isCurrentlyHidden) {
        targetRow.classList.remove('hidden');

        // Automatically hide this row after 5 seconds of inactivity
        iqActionsTimeout = setTimeout(() => {
            targetRow.classList.add('hidden');
        }, 5000);
    }
}

// ---------- 5-MINUTE AUTO-LOGOUT SYSTEM ----------
let inactivityTimeout;
const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes
let lastActivityTime = Date.now();

function resetInactivityTimer() {
    // FIX: Check sessionStorage because that is where unlockApp() saves the status
    const isUnlocked = sessionStorage.getItem('prism_unlocked') === '1';
    
    if (!isUnlocked) return;

    // Update the timestamp of the last touch/click
    lastActivityTime = Date.now();

    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
        performAutoLogout("Logged out due to 5 minutes of inactivity");
    }, INACTIVITY_LIMIT);
}

// Special check for Mobile: When user returns to the tab or turns screen on
function checkActivityOnResume() {
    const isUnlocked = sessionStorage.getItem('prism_unlocked') === '1';
    if (!isUnlocked) return;

    const currentTime = Date.now();
    const timeElapsed = currentTime - lastActivityTime;

    // If the phone was asleep for more than 5 minutes, logout immediately
    if (timeElapsed > INACTIVITY_LIMIT) {
        performAutoLogout("Session expired while inactive");
    }
}

function performAutoLogout(reason) {
    sessionStorage.removeItem('prism_unlocked');
    alert(reason); // Force a notification on mobile
    location.reload(); 
}

// Listen for standard actions + Mobile specific events
const activityEvents = [
    'mousedown', 'mousemove', 'keypress', 
    'scroll', 'touchstart', 'touchmove', 'click'
];

activityEvents.forEach(eventName => {
    document.addEventListener(eventName, resetInactivityTimer, true);
});

// IMPORTANT FOR MOBILE: Detects when user switches back to the browser 
// or wakes up the phone screen
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        checkActivityOnResume();
    }
});

// Start the timer
resetInactivityTimer();

// ===== WHATSAPP MESSAGE POPUP =====
(function() {
    const overlay = document.createElement('div');
    overlay.id = 'wa-popup-overlay';
    overlay.innerHTML = `
        <div class="wa-popup-card" id="wa-popup-card">
            <div class="wa-status-badge" id="wa-badge"></div>
            <p class="wa-popup-title" id="wa-popup-title"></p>
            <div class="wa-popup-meta" id="wa-popup-meta"></div>
            <p class="wa-popup-status" id="wa-popup-status"></p>
            <button class="wa-edit-toggle" id="wa-edit-toggle" onclick="toggleWaEdit()">✏️ Edit Message</button>
            <textarea class="wa-popup-textarea" id="wa-popup-textarea" rows="7"></textarea>
            <div class="wa-popup-actions">
                <button class="wa-btn-dismiss" onclick="closeWaPopup()">Dismiss</button>
                <button class="wa-btn-send" onclick="sendWaPopupMessage()">
                    <i data-lucide="send" style="width:14px;height:14px;"></i>
                    <span id="wa-send-label">Send Bill</span>
                </button>
            </div>
        </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeWaPopup(); });

    let _waPhone = '', _editOpen = false;

    window.toggleWaEdit = function() {
        _editOpen = !_editOpen;
        const ta = document.getElementById('wa-popup-textarea');
        const tog = document.getElementById('wa-edit-toggle');
        ta.classList.toggle('visible', _editOpen);
        tog.textContent = _editOpen ? '✅ Done Editing' : '✏️ Edit Message';
        if (_editOpen) ta.focus();
    };

    window.openWaPopup = function(phone, badgeText, badgeColor, title, metaLines, statusText, statusColor, message, sendLabel) {
        _waPhone = phone;
        _editOpen = false;

        const badge = document.getElementById('wa-badge');
        badge.style.color = badgeColor;
        badge.innerHTML = `<i data-lucide="check-circle-2" style="width:15px;height:15px;"></i> ${badgeText}`;

        document.getElementById('wa-popup-title').innerText = title;

        const meta = document.getElementById('wa-popup-meta');
        meta.innerHTML = metaLines.map(l => `${l.label}: <span>${l.value}</span>`).join('<br>');

        const status = document.getElementById('wa-popup-status');
        status.innerHTML = `Status: <span style="color:${statusColor};font-weight:900;">${statusText}</span>`;

        document.getElementById('wa-popup-textarea').value = message;
        document.getElementById('wa-popup-textarea').classList.remove('visible');
        document.getElementById('wa-edit-toggle').textContent = '✏️ Edit Message';
        document.getElementById('wa-send-label').innerText = sendLabel || 'Send';

        overlay.classList.add('show');
        lucide.createIcons();
    };

    window.closeWaPopup = function() { overlay.classList.remove('show'); };

    window.sendWaPopupMessage = function() {
        const msg = document.getElementById('wa-popup-textarea').value.trim();
        if (!msg) { showToast('Message is empty', 'warning'); return; }
        const waNumber = getWhatsAppNumber(_waPhone);
        if (!waNumber) { showToast('Invalid phone number', 'warning'); return; }
        window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
        closeWaPopup();
    };

    // Override sendQuickSessionReceipt
    window.sendQuickSessionReceipt = function(p, row) {
        if (!getWhatsAppNumber(p.phone)) return;
        const paid = toNum(row[16]);
        const dateStr = formatDateDMY(row[8]);
        const mode = row[15] || 'Cash';
        const remaining = getRemainingSessions(p);
        const isPending = mode === 'Pending';

        let msg = `Hello ${selectedPatientName},\n\nReceipt for your session on *${dateStr}*:\n\nAmount Paid: ₹${paid.toLocaleString()}\nPayment Mode: ${mode}\n`;
        if (p.purchased > 0) msg += `Remaining Sessions: *${remaining}*\n`;
        msg += `\nThank you! Wishing you a smooth recovery.\n\nPrism Physiotherapy & Rehabilitation Center`;

        openWaPopup(
            p.phone,
            'Session Logged',
            '#f97316',
            selectedPatientName,
            [
                { label: 'Date', value: dateStr },
                { label: 'Amount Paid', value: `₹${paid.toLocaleString()}` },
                ...(p.purchased > 0 ? [{ label: 'Sessions Remaining', value: `${remaining} / ${p.purchased}` }] : [])
            ],
            isPending ? `Pending (₹${toNum(row[9]).toLocaleString()})` : `Paid ₹${paid.toLocaleString()} via ${mode}`,
            isPending ? '#e11d48' : '#059669',
            msg,
            'Send Bill'
        );
    };

    // Override sendDueReminder
    window.sendDueReminder = function(name) {
        const p = patientLookup[name];
        if (!p || !getWhatsAppNumber(p.phone)) { showToast('Invalid phone number', 'warning'); return; }
        const due = p.outstandingDue;
        const sessions = p.dueSessionCount || 0;

        const msg = `Hello ${name},\n\nGentle reminder from *Prism Physiotherapy & Rehabilitation Center*.\n\n*Outstanding Amount:* ₹${due.toLocaleString()}\n*Pending for:* ${sessions} session(s)\n\nPay via UPI: *dr.raviphysio01@oksbi*\n\nShare screenshot once paid, or pay at the clinic.\n\nWarm regards,\nPrism Physiotherapy & Rehabilitation Center`;

        openWaPopup(
            p.phone,
            'Due Reminder',
            '#e11d48',
            name,
            [
                { label: 'Outstanding', value: `₹${due.toLocaleString()}` },
                { label: 'Sessions Pending', value: `${sessions}` }
            ],
            `₹${due.toLocaleString()} Due`,
            '#e11d48',
            msg,
            'Send Reminder'
        );
    };

    // Override confirmMarkPaid to show popup after payment
    const _origConfirmMarkPaid = window.confirmMarkPaid;
    window.confirmMarkPaid = function() {
        if (!markPaidContext) return;
        const { name, p } = markPaidContext;
        const amount = Number(document.getElementById('mp-amount').value);
        const mode = document.getElementById('mp-mode').value;
        if (isNaN(amount) || amount <= 0) { showToast('Enter a valid amount', 'warning'); return; }

        _origConfirmMarkPaid();

        const msg = `Hello ${name},\n\nWe have received your payment. Here are the details:\n\n*Amount Received:* ₹${amount.toLocaleString()}\n*Payment Mode:* ${mode}\n*Date:* ${formatDateDMY(getLocalISOString())}\n\nYour outstanding balance has been updated.\n\nThank you for your payment!\n\nWarm regards,\nPrism Physiotherapy & Rehabilitation Center`;

        openWaPopup(
            p.phone,
            'Payment Received',
            '#059669',
            name,
            [
                { label: 'Amount Received', value: `₹${amount.toLocaleString()}` },
                { label: 'Mode', value: mode },
                { label: 'Date', value: formatDateDMY(getLocalISOString()) }
            ],
            `Paid ₹${amount.toLocaleString()} via ${mode}`,
            '#059669',
            msg,
            'Send Confirmation'
        );
    };
})();

// ---------- UPDATED MULTI-SELECT EXERCISE LIBRARY LOGIC ----------
let currentLibLevel = 0; 
let libPart = "";
let libCat = "";
let exCart = []; // Current selection

function toggleExLibraryPicker() {
    const el = document.getElementById('ex-lib-overlay');
    if (!el.classList.contains('show')) {
        // We no longer reset exCart here, allowing you to build the list
        renderLibLevel0();
    }
    el.classList.toggle('show');
}

function renderLibLevel0() {
    currentLibLevel = 0;
    const backBtn = document.getElementById('ex-lib-back-btn');
    backBtn.style.display = 'none';
    backBtn.onclick = null;
    document.getElementById('ex-lib-breadcrumb').innerText = "Step 1: Select Body Part";
    const cont = document.getElementById('ex-lib-content');
    let h = '<div class="grid grid-cols-2 gap-3 pb-4">';
    Object.keys(EXERCISE_LIBRARY).forEach(p => {
        h += `<button onclick="renderLibLevel1('${p}')" class="p-5 bg-slate-50 border-2 border-transparent hover:border-indigo-400 rounded-2xl text-left transition-all">
            <span class="block text-xs font-black uppercase text-slate-700">${p}</span>
        </button>`;
    });
    cont.innerHTML = h + '</div>';
}

function renderLibLevel1(part) {
    libPart = part;
    currentLibLevel = 1;
    const backBtn = document.getElementById('ex-lib-back-btn');
    backBtn.style.display = 'block';
    backBtn.onclick = () => renderLibLevel0(); // Points back to Step 1
    document.getElementById('ex-lib-breadcrumb').innerText = `${part} > Select Category`;
    const cont = document.getElementById('ex-lib-content');
    let h = '<div class="space-y-2 pb-4">';
    Object.keys(EXERCISE_LIBRARY[part]).forEach(cat => {
        h += `<button onclick="renderLibLevel2('${cat}')" class="w-full p-4 bg-indigo-50/50 hover:bg-indigo-100 rounded-2xl text-left flex justify-between items-center transition-all">
            <span class="text-xs font-black uppercase text-indigo-700">${cat}</span>
            <i data-lucide="chevron-right" class="w-4 h-4 text-indigo-400"></i>
        </button>`;
    });
    cont.innerHTML = h + '</div>';
    if (window.lucide) lucide.createIcons();
}

function renderLibLevel2(cat) {
    libCat = cat;
    const backBtn = document.getElementById('ex-lib-back-btn');
    backBtn.style.display = 'block';
    backBtn.onclick = () => renderLibLevel1(libPart); // Points back to Step 2
    document.getElementById('ex-lib-breadcrumb').innerText = `${libPart} > ${cat}`;
    const cont = document.getElementById('ex-lib-content');
    const items = EXERCISE_LIBRARY[libPart][cat];
    
    let h = '<div class="space-y-3 mb-24">'; 
    items.forEach((ex, idx) => {
        const isInCart = exCart.some(item => item.name === ex.name);
        
        h += `<div class="p-4 border-2 ${isInCart ? 'border-indigo-500 bg-indigo-50' : 'border-slate-100 bg-white'} rounded-2xl transition-all shadow-sm">
            <div class="flex justify-between items-start mb-2">
                <div>
                    <p class="text-xs font-black text-slate-800 uppercase">${ex.name}</p>
                    <p class="text-[9px] text-slate-400 uppercase font-bold">${libPart} • ${cat}</p>
                </div>
                ${isInCart ? 
                    '<span class="bg-indigo-600 text-white text-[7px] font-black px-2 py-1 rounded-lg uppercase">Added</span>' : 
                    `<button onclick="addToCart('${libPart}', '${cat}', ${idx})" class="bg-slate-900 text-white text-[8px] font-black px-3 py-1.5 rounded-lg uppercase hover:bg-indigo-600 transition-all">Add to Cart</button>`
                }
            </div>
            <p class="text-[10px] text-slate-500 line-clamp-1 italic">${ex.steps.substring(0, 60)}...</p>
        </div>`;
    });
    
h += `</div>`;
    cont.innerHTML = h;
    if (window.lucide) lucide.createIcons();
}

function toggleCartItem(idx) {
    const ex = EXERCISE_LIBRARY[libPart][libCat][idx];
    // Check if exercise is already in our list
    const foundIdx = exCart.findIndex(item => item.name === ex.name);
    
    if (foundIdx > -1) {
        // If it exists, remove it (This is your "Remove option")
        exCart.splice(foundIdx, 1);
    } else {
        // If it doesn't exist, add it to the list
        exCart.push(ex);
    }
    
    // Update the Name box immediately so the user sees the list growing
    document.getElementById('ex-input-name').value = exCart.map(item => item.name).join(', ');
    
    renderLibLevel2(libCat); // Re-renders the library to show indigo highlights/checkmarks
}

function confirmLibraryBatch() {
    if (exCart.length === 0) { 
        // If nothing is selected, clear the form fields
        document.getElementById('ex-input-name').value = "";
        window.tempSelectedSteps = "";
        toggleExLibraryPicker(); 
        return; 
    }

    // 1. Build the comma-separated list of names (e.g. "Chin Tucks, Ankle Pumps")
    const namesList = exCart.map(item => item.name).join(', ');
    
    // 2. Build the numbered/bulleted list of steps for the patient view
    const combinedSteps = exCart.map(item => `[${item.name}]\n${item.steps}`).join('\n\n');

    // 3. Update the UI
    document.getElementById('ex-input-name').value = namesList;
    window.tempSelectedSteps = combinedSteps;

    showToast(`${exCart.length} exercises added to current list`, 'success');
    toggleExLibraryPicker();
}
document.getElementById('ex-lib-overlay').addEventListener('click', function(e) {
    if (e.target === this) toggleExLibraryPicker();
});

function addToCart(part, cat, idx) {
    const ex = EXERCISE_LIBRARY[part][cat][idx];
    // Prevent duplicates
    if (!exCart.some(item => item.name === ex.name)) {
        exCart.push({
            ...ex,
            part: part,
            cat: cat
        });
        showToast(`Added ${ex.name} to cart`, 'success');
        renderExerciseCart();
        renderLibLevel2(cat); // Refresh library view to show "Added" status
updateLibFooterCount();
    }
}

function removeFromCart(name) {
    exCart = exCart.filter(item => item.name !== name);
    renderExerciseCart();
    updateLibFooterCount();
    if (currentLibLevel === 2) renderLibLevel2(libCat); // Sync library if open
}

function renderExerciseCart() {
    const container = document.getElementById('exercise-cart-container');
    const badge = document.getElementById('cart-count-badge');
    
    badge.innerText = `${exCart.length} ITEMS`;

    if (exCart.length === 0) {
        container.innerHTML = `<p class="text-[10px] text-slate-400 font-bold italic text-center my-auto">Your cart is empty. Browse the library to add exercises.</p>`;
        document.getElementById('ex-input-name').value = "";
        return;
    }

    container.innerHTML = exCart.map(item => `
        <div class="bg-white border border-slate-200 p-3 rounded-2xl shadow-sm flex justify-between items-center animate-slide">
            <div>
                <p class="text-[11px] font-black text-slate-800 uppercase">${item.name}</p>
                <p class="text-[8px] font-bold text-slate-400 uppercase">${item.part} • ${item.cat}</p>
            </div>
            <button onclick="removeFromCart('${item.name.replace(/'/g, "\\'")}')" class="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all" title="Remove">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
        </div>
    `).join('');

    // Update the hidden field and internal steps for the save button
    document.getElementById('ex-input-name').value = exCart.map(i => i.name).join(', ');
    window.tempSelectedSteps = exCart.map(i => `[${i.name}]\n${i.steps}`).join('\n\n');
    
    if (window.lucide) lucide.createIcons();
}
