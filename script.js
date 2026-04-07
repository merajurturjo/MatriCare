// --- DBMS SIMULATION (LOCAL STORAGE) ---
const db = {
    save: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
    get: (key) => JSON.parse(localStorage.getItem(key)) || [],
    clear: () => { localStorage.clear(); location.reload(); }
};

// --- NAVIGATION LOGIC ---
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        if(!target) return;

        document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        
        document.getElementById(target).classList.add('active');
        this.classList.add('active');
        document.getElementById('page-title').innerText = target.toUpperCase();
    });
});

// --- KICK COUNTER LOGIC ---
let kicks = db.get('kicks_count')[0] || 0;
document.getElementById('stat-kicks').innerText = kicks;

function addKick() {
    kicks++;
    document.getElementById('stat-kicks').innerText = kicks;
    db.save('kicks_count', [kicks]);
}

// --- PREGNANCY TRACKER LOGIC ---
document.getElementById('calc-btn').addEventListener('click', () => {
    const lmp = document.getElementById('lmp-date').value;
    if(!lmp) return alert("Select LMP Date");

    const lmpDate = new Date(lmp);
    const today = new Date();
    const diffWeeks = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24 * 7));
    
    const output = document.getElementById('tracker-output');
    output.innerHTML = `Current Status: Week ${diffWeeks}`;
    document.getElementById('stat-week').innerText = "Week " + diffWeeks;
    
    db.save('user_week', [diffWeeks]);
});

// --- JOURNAL DBMS LOGIC ---
function loadJournal() {
    const history = db.get('journal_entries');
    const container = document.getElementById('journal-history');
    container.innerHTML = "";
    history.reverse().forEach(entry => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `<strong>${entry.date}:</strong> ${entry.text}`;
        container.appendChild(div);
    });
}

document.getElementById('save-journal').addEventListener('click', () => {
    const text = document.getElementById('journal-input').value;
    if(!text) return;

    const entries = db.get('journal_entries');
    entries.push({ text, date: new Date().toLocaleDateString() });
    db.save('journal_entries', entries);
    
    document.getElementById('journal-input').value = "";
    loadJournal();
});

// --- TRANSLATOR LOGIC ---
document.getElementById('trans-btn').addEventListener('click', () => {
    const word = document.getElementById('trans-input').value.toLowerCase().trim();
    const dictionary = {
        "fetus": "ভ্রূণ (Fetus)",
        "labor": "প্রসব বেদনা",
        "trimester": "ত্রৈমাসিক"
    };
    document.getElementById('trans-output').innerText = dictionary[word] || "Searching AI database...";
});

// --- RESET DATABASE ---
document.getElementById('reset-db').addEventListener('click', () => {
    if(confirm("Clear all saved data?")) db.clear();
});

// Initialize app data
loadJournal();
if(db.get('user_week')[0]) document.getElementById('stat-week').innerText = "Week " + db.get('user_week')[0];
