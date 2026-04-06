/**
 * MatriCare - Logic for All Features
 */

// 1. Navigation
function showSection(sectionId, event) {
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    document.getElementById('section-title').innerText = sectionId.replace('-', ' ').toUpperCase();
    if (event) event.currentTarget.classList.add('active');
}

// 2. Pregnancy Logic (Unchanged)
function calculateEDD() {
    const lmpValue = document.getElementById('lmp-date').value;
    if (!lmpValue) return alert("Select date");
    const lmpDate = new Date(lmpValue);
    const edd = new Date(lmpDate); edd.setDate(lmpDate.getDate() + 280);
    const diffWeeks = Math.floor((new Date() - lmpDate) / (1000 * 60 * 60 * 24 * 7));
    document.getElementById('result').innerHTML = `<p>EDD: ${edd.toDateString()}</p><h3>Week ${diffWeeks}</h3>`;
    document.getElementById('stat-week').innerText = "Week " + diffWeeks;
    const icon = document.getElementById('baby-size-icon');
    icon.innerText = diffWeeks > 20 ? "👶" : "🍋";
}

// 3. Kick Counter (Unchanged)
let kicks = 0;
function countKick() { kicks++; document.getElementById('stat-kicks').innerText = kicks; }

// 4. Journal Logic (New)
function saveJournal() {
    const text = document.getElementById('journal-input').value;
    const logs = document.getElementById('journal-logs');
    if (!text) return;
    const date = new Date().toLocaleDateString();
    logs.innerHTML = `<div style="background:#1a1a1a; padding:10px; border-radius:8px; margin-bottom:5px;"><strong>${date}:</strong> ${text}</div>` + logs.innerHTML;
    document.getElementById('journal-input').value = "";
}

// 5. AI Translator Logic (New)
function translateTerm() {
    const term = document.getElementById('trans-input').value.toLowerCase();
    const result = document.getElementById('trans-result');
    const dictionary = { "amniotic fluid": "গর্ভফুল/অ্যামনিওটিক তরল", "fetus": "ভ্রূণ", "trimester": "ত্রৈমাসিক" };
    result.innerText = dictionary[term] || "Translation not found. Contacting AI...";
}

// 6. Appointments (Unchanged)
function addAppointment() {
    const doc = document.getElementById('doc-name').value;
    const date = document.getElementById('app-date').value;
    if(!doc || !date) return;
    document.getElementById('app-list-container').innerHTML += `<div style="background:#333; padding:10px; border-radius:8px; margin-top:5px;">${doc} - ${date}</div>`;
    document.getElementById('stat-next-app').innerText = date;
}

// 7. Others
function markDone(btn) { btn.parentElement.innerHTML = '<span style="color:#4caf50">Done</span>'; }
function editProfile() { const n = prompt("Name:"); if(n) document.getElementById('profile-name').innerText = n; }
function toggleBloodForm(t) { document.getElementById('blood-search-ui').style.display = 'block'; }
function askAI() { 
    const i = document.getElementById('ai-input');
    document.getElementById('chat-box').innerHTML += `<p>You: ${i.value}</p>`;
    i.value = "";
}
function handleLogout() {
    if(confirm("Are you sure you want to logout?")) {
        alert("Logged out from MatriCare.");
        window.location.reload(); 
    }
}
