/** * MatriCare - Core Logic Engine
 * All technical terms like DBMS replaced with "Record" or "Storage"
 */

// 1. Storage Helpers
const Storage = {
    save: (key, val) => localStorage.setItem(`matri_${key}`, JSON.stringify(val)),
    get: (key) => JSON.parse(localStorage.getItem(`matri_${key}`)) || [],
    clear: () => { if(confirm("Are you sure? This will delete all records.")) { localStorage.clear(); location.reload(); } }
};

// 2. Navigation
const menuItems = document.querySelectorAll('.menu-item');
const pages = document.querySelectorAll('.page');

menuItems.forEach(item => {
    item.onclick = () => {
        const target = item.getAttribute('data-target');
        if(!target) return;

        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        pages.forEach(p => p.classList.remove('active'));
        document.getElementById(target).classList.add('active');
        document.getElementById('current-view').innerText = target.charAt(0).toUpperCase() + target.slice(1);
    }
});

// 3. Kick Counter
let kicks = Storage.get('kicks')[0] || 0;
document.getElementById('kick-val').innerText = kicks;

function addKick() {
    kicks++;
    document.getElementById('kick-val').innerText = kicks;
    Storage.save('kicks', [kicks]);
}

// 4. Pregnancy Tracker Logic
document.getElementById('calc-btn').onclick = () => {
    const lmp = document.getElementById('lmp-date').value;
    if(!lmp) return alert("Please select a date!");

    const lmpDate = new Date(lmp);
    const today = new Date();
    const weeks = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24 * 7));
    
    // Calculate Due Date
    const edd = new Date(lmpDate);
    edd.setDate(edd.getDate() + 280);

    Storage.save('progress', { weeks, edd: edd.toDateString() });
    updateHomeUI(weeks, edd);
    
    document.getElementById('due-date-val').innerText = edd.toDateString();
    document.getElementById('tri-val').innerText = weeks < 13 ? "1st Trimester" : weeks < 27 ? "2nd Trimester" : "3rd Trimester";
    document.getElementById('result-box').classList.remove('hidden');
}

function updateHomeUI(weeks, edd) {
    const daysLeft = Math.ceil((new Date(edd) - new Date()) / (1000 * 60 * 60 * 24));
    document.getElementById('days-val').innerText = daysLeft > 0 ? daysLeft : "0";
    
    const percent = Math.min((weeks / 40) * 100, 100);
    document.getElementById('main-progress').style.width = percent + "%";
    document.getElementById('percent-val').innerText = Math.round(percent);
}

// 5. Health Records System
document.getElementById('save-note').onclick = () => {
    const text = document.getElementById('note-input').value;
    if(!text) return;

    const notes = Storage.get('notes');
    notes.push({ text, date: new Date().toLocaleString() });
    Storage.save('notes', notes);
    
    document.getElementById('note-input').value = "";
    renderNotes();
}

function renderNotes() {
    const notes = Storage.get('notes');
    const container = document.getElementById('history-feed');
    container.innerHTML = notes.reverse().map(n => `
        <div class="history-card">
            <small style="color:#ff4d6d; font-weight:700">${n.date}</small>
            <p style="margin-top:5px">${n.text}</p>
        </div>
    `).join('');
}

// 6. Dictionary
document.getElementById('dic-btn').onclick = () => {
    const q = document.getElementById('dic-input').value.toLowerCase();
    const terms = { 
        "fetus": "ভ্রূণ (Baby before birth)", 
        "labor": "প্রসব বেদনা", 
        "amniotic": "গর্ভস্থ জল যা শিশুকে রক্ষা করে" 
    };
    document.getElementById('dic-output').innerHTML = `<strong>Result:</strong> ${terms[q] || "Term not found. Searching cloud..."}`;
}

// Init App
window.onload = () => {
    const data = Storage.get('progress');
    if(data.weeks) updateHomeUI(data.weeks, data.edd);
    renderNotes();
    document.getElementById('clear-all').onclick = () => Storage.clear();
};
