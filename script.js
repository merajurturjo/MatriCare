/** * MatriCare DBMS Engine 
 * This script handles all page switches and data saving 
 */

// --- 1. CORE DATABASE HELPERS ---
const DB = {
    save: (key, val) => localStorage.setItem(`mc_${key}`, JSON.stringify(val)),
    get: (key) => JSON.parse(localStorage.getItem(`mc_${key}`)) || [],
    reset: () => { localStorage.clear(); location.reload(); }
};

// --- 2. PAGE NAVIGATION ---
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const pageID = item.getAttribute('data-page');
        if (!pageID) return;

        // Toggle Buttons
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        // Toggle Content
        pages.forEach(p => p.classList.remove('active'));
        document.getElementById(pageID).classList.add('active');
    });
});

// --- 3. CLOCK ENGINE ---
setInterval(() => {
    document.getElementById('clock-display').innerText = new Date().toLocaleTimeString();
}, 1000);

// --- 4. KICK COUNTER ---
let kickCount = DB.get('kicks')[0] || 0;
document.getElementById('db-kick-count').innerText = kickCount;

function recordKick() {
    kickCount++;
    document.getElementById('db-kick-count').innerText = kickCount;
    DB.save('kicks', [kickCount]);
}

// --- 5. PREGNANCY TRACKER ---
const saveLmpBtn = document.getElementById('save-lmp');
if (saveLmpBtn) {
    saveLmpBtn.onclick = () => {
        const lmpValue = document.getElementById('lmp-date').value;
        if (!lmpValue) return alert("Select a date!");

        const lmpDate = new Date(lmpValue);
        const today = new Date();
        const diffWeeks = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24 * 7));
        
        // Save to DB
        DB.save('stats', { weeks: diffWeeks, lmp: lmpValue });
        
        // Update UI
        updateUI(diffWeeks);
        
        const edd = new Date(lmpDate);
        edd.setDate(edd.getDate() + 280);
        document.getElementById('out-edd').innerText = edd.toDateString();
        document.getElementById('out-tri').innerText = diffWeeks < 13 ? "1st" : diffWeeks < 27 ? "2nd" : "3rd";
        document.getElementById('tracker-res').classList.remove('hidden');
    };
}

function updateUI(weeks) {
    document.getElementById('db-week-count').innerText = `Week ${weeks}`;
    document.getElementById('db-day-count').innerText = `${weeks * 7} Days in Journey`;
    const progress = Math.min((weeks / 40) * 100, 100);
    document.getElementById('master-progress').style.width = progress + "%";
    document.getElementById('progress-text').innerText = Math.round(progress) + "%";
}

// --- 6. JOURNAL SYSTEM ---
const saveJournalBtn = document.getElementById('save-journal');
if (saveJournalBtn) {
    saveJournalBtn.onclick = () => {
        const text = document.getElementById('journal-input').value;
        if (!text) return;

        const entries = DB.get('journal');
        entries.push({ text, time: new Date().toLocaleString() });
        DB.save('journal', entries);
        
        document.getElementById('journal-input').value = "";
        renderJournal();
    };
}

function renderJournal() {
    const list = DB.get('journal');
    const container = document.getElementById('journal-list');
    container.innerHTML = list.reverse().map(e => `
        <div class="log-card">
            <small style="color:#ff4d6d">${e.time}</small>
            <p style="margin-top:5px">${e.text}</p>
        </div>
    `).join('');
}

// --- 7. TRANSLATOR ---
document.getElementById('do-trans').onclick = () => {
    const q = document.getElementById('trans-input').value.toLowerCase();
    const dict = { "fetus": "ভ্রূণ", "labor": "প্রসব বেদনা", "nausea": "বমি ভাব" };
    document.getElementById('trans-output').innerText = dict[q] || "Result found in AI database...";
};

// --- INIT APP ---
window.onload = () => {
    const stats = DB.get('stats');
    if (stats.weeks) updateUI(stats.weeks);
    renderJournal();
    document.getElementById('reset-db').onclick = () => DB.reset();
};
