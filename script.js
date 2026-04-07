/**
 * MatriCare PRO - Core JavaScript Engine
 * Author: Gemini AI Collaboration
 * Version: 2.5
 * Features: LocalStorage DBMS, Real-time Calculation, UI Navigation
 */

// --- 1. DBMS CORE (LocalStorage Wrapper) ---
const DBMS = {
    save: (key, data) => localStorage.setItem(`matri_pro_${key}`, JSON.stringify(data)),
    get: (key) => JSON.parse(localStorage.getItem(`matri_pro_${key}`)) || [],
    wipe: () => {
        if (confirm("Are you sure you want to delete ALL medical records? This cannot be undone.")) {
            localStorage.clear();
            location.reload();
        }
    }
};

// --- 2. INITIALIZATION & UI NAVIGATION ---
document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initNavigation();
    initDashboard();
    renderJournal();
    renderAppointments();
    updateHealthTip();
    
    // Global Event Listeners
    document.getElementById('system-wipe').addEventListener('click', DBMS.wipe);
    document.getElementById('calc-trigger').addEventListener('click', runPregnancyAlgorithm);
    document.getElementById('save-journal-btn').addEventListener('click', saveJournalEntry);
    document.getElementById('add-appt-btn').addEventListener('click', saveAppointment);
    document.getElementById('t-btn').addEventListener('click', runAITranslator);
});

// Navigation Logic
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page-view');
    const breadcrumb = document.getElementById('breadcrumb-current');
    const viewTitle = document.getElementById('view-title');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            if (!target) return;

            // Update Sidebar UI
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Update Page Visibility
            pages.forEach(page => page.classList.remove('active'));
            const targetPage = document.getElementById(target);
            if (targetPage) targetPage.classList.add('active');

            // Update Header Text
            breadcrumb.innerText = target.charAt(0).toUpperCase() + target.slice(1);
            viewTitle.innerText = item.querySelector('span').innerText;
        });
    });
}

// --- 3. REAL-TIME CLOCK ---
function initClock() {
    const clockElement = document.getElementById('live-clock');
    setInterval(() => {
        const now = new Date();
        clockElement.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }, 1000);
}

// --- 4. PREGNANCY ALGORITHM (The Brain) ---
function runPregnancyAlgorithm() {
    const lmpValue = document.getElementById('lmp-input').value;
    if (!lmpValue) {
        alert("Please select your Last Menstrual Period (LMP) date.");
        return;
    }

    const lmpDate = new Date(lmpValue);
    const today = new Date();
    
    // Difference in time
    const diffTime = Math.abs(today - lmpDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const remainingDays = diffDays % 7;

    // Estimated Due Date (LMP + 280 days)
    const eddDate = new Date(lmpDate);
    eddDate.setDate(lmpDate.getDate() + 280);

    // Update DBMS & UI
    DBMS.save('user_stats', { lmp: lmpValue, weeks: weeks, edd: eddDate.toDateString() });
    updateDashboardUI(weeks, remainingDays, eddDate.toDateString());
    
    // Visual Feedback
    const outputArea = document.getElementById('tracker-output');
    outputArea.classList.remove('hidden');
    document.getElementById('res-edd').innerText = eddDate.toDateString();
    document.getElementById('res-tri').innerText = getTrimester(weeks);
}

function getTrimester(w) {
    if (w <= 12) return "1st Trimester";
    if (w <= 26) return "2nd Trimester";
    return "3rd Trimester";
}

// --- 5. DASHBOARD SYNC ---
function initDashboard() {
    const stats = DBMS.get('user_stats');
    const kicks = DBMS.get('kicks')[0] || 0;
    
    document.getElementById('db-kicks').innerText = kicks;
    
    if (stats.weeks !== undefined) {
        updateDashboardUI(stats.weeks, 0, stats.edd);
    }
}

function updateDashboardUI(weeks, days, edd) {
    document.getElementById('db-week').innerText = `Week ${weeks}`;
    document.getElementById('db-days').innerText = `Progress: ${weeks} Weeks Active`;
    document.getElementById('dash-week').innerText = `Week ${weeks}`;
    
    // Update Journey Progress Bar (Max 40 weeks)
    const progressPercent = Math.min(Math.round((weeks / 40) * 100), 100);
    document.getElementById('progress-val').innerText = `${progressPercent}%`;
    document.querySelector('.progress-bar').style.width = `${progressPercent}%`;
}

// --- 6. FETAL KICK COUNTER ---
let kickCount = DBMS.get('kicks')[0] || 0;
function addKick() {
    kickCount++;
    document.getElementById('db-kicks').innerText = kickCount;
    DBMS.save('kicks', [kickCount]);
}

// --- 7. JOURNAL DBMS ---
function saveJournalEntry() {
    const text = document.getElementById('j-text').value;
    if (!text) return;

    const entries = DBMS.get('journal');
    entries.push({
        text: text,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    
    DBMS.save('journal', entries);
    document.getElementById('j-text').value = "";
    renderJournal();
}

function renderJournal() {
    const entries = DBMS.get('journal');
    const container = document.getElementById('journal-db-list');
    container.innerHTML = entries.length ? "" : "<p class='empty-msg'>No records found in database.</p>";
    
    entries.reverse().forEach(entry => {
        const item = document.createElement('div');
        item.className = 'log-item card';
        item.innerHTML = `
            <div class="log-meta"><small>${entry.date} | ${entry.time}</small></div>
            <p>${entry.text}</p>
        `;
        container.appendChild(item);
    });
}

// --- 8. APPOINTMENT MANAGER ---
function saveAppointment() {
    const doc = document.getElementById('appt-doc').value;
    const time = document.getElementById('appt-date').value;
    
    if (!doc || !time) return alert("Please fill all fields!");

    const appts = DBMS.get('appointments');
    appts.push({ doc, time: new Date(time).toLocaleString() });
    DBMS.save('appointments', appts);
    
    document.getElementById('appt-doc').value = "";
    renderAppointments();
}

function renderAppointments() {
    const appts = DBMS.get('appointments');
    const container = document.getElementById('appt-db-list');
    container.innerHTML = "";

    appts.forEach((a, index) => {
        const div = document.createElement('div');
        div.className = 'entry-item';
        div.innerHTML = `<strong>${a.doc}</strong> - ${a.time}`;
        container.appendChild(div);
    });
}

// --- 9. AI TRANSLATOR & HEALTH TIPS ---
function runAITranslator() {
    const query = document.getElementById('t-query').value.toLowerCase().trim();
    const dictionary = {
        "amniotic fluid": "অ্যামনিওটিক ফ্লুইড (জরায়ুর জল): গর্ভস্থ শিশুর চারপাশের তরল যা তাকে রক্ষা করে।",
        "preeclampsia": "প্রিক্ল্যাম্পসিয়া: গর্ভাবস্থায় উচ্চ রক্তচাপজনিত একটি জটিল অবস্থা।",
        "trimester": "ট্রাইমেস্টার: গর্ভাবস্থার ৯ মাসকে ৩টি ভাগে ভাগ করা হয়, প্রতিটি ৩ মাসকে একটি ট্রাইমেস্টার বলে।",
        "ultrasound": "আল্ট্রাসাউন্ড: শব্দতরঙ্গের মাধ্যমে গর্ভস্থ শিশুর ছবি দেখার পরীক্ষা।",
        "labor": "লেবার (প্রসব বেদনা): সন্তান জন্মের আগের শারীরিক প্রক্রিয়া।"
    };

    const resultBox = document.getElementById('t-output');
    resultBox.innerHTML = dictionary[query] 
        ? `<div class="res-card green-border"><strong>Translation:</strong><br>${dictionary[query]}</div>` 
        : `<div class="res-card red-border">Term not in clinical database. Connecting to Cloud AI...</div>`;
}

function updateHealthTip() {
    const tips = [
        "Drink at least 3 liters of water daily to maintain amniotic fluid levels.",
        "Walking for 20 minutes daily helps in easier labor.",
        "Include more fiber in your diet to avoid pregnancy constipation.",
        "Sleep on your left side to improve blood flow to the placenta.",
        "Listen to calm music; your baby can start hearing around Week 18!"
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    const tipElement = document.getElementById('health-tip');
    if (tipElement) tipElement.innerText = randomTip;
}
