/**
 * MatriCare Core Logic
 * Handles Navigation, Health Tracking, and UI Updates
 */

// 1. Navigation System
function navigate(sectionId, event) {
    // Switch Active Sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    // Update Sidebar Styling
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');

    // Update Header Title
    document.getElementById('page-title').innerText = sectionId.replace('-', ' ').toUpperCase();
}

// 2. Pregnancy Tracker Core
function handleCalculator() {
    const lmpValue = document.getElementById('input-lmp').value;
    if (!lmpValue) return alert("Please select your Last Menstrual Period date.");

    const lmpDate = new Date(lmpValue);
    const today = new Date();
    
    // Calculate EDD (LMP + 280 Days)
    const edd = new Date(lmpDate);
    edd.setDate(lmpDate.getDate() + 280);

    // Calculate Week
    const diffWeeks = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24 * 7));

    // Update UI
    const output = document.getElementById('calculator-output');
    output.innerHTML = `
        <div style="margin-top:20px; padding:20px; background:#0d1117; border-radius:12px; border-left: 5px solid var(--primary-red);">
            <h3>Due Date: ${edd.toDateString()}</h3>
            <p>Status: You are currently in <strong>Week ${diffWeeks}</strong></p>
        </div>
    `;

    // Visual Feedback
    const icon = document.getElementById('baby-emoji');
    const label = document.getElementById('baby-size-label');
    
    document.getElementById('stat-week-display').innerText = "Week " + diffWeeks;

    if (diffWeeks <= 12) { icon.innerText = "🍋"; label.innerText = "Size: Small Lime"; }
    else if (diffWeeks <= 20) { icon.innerText = "🍌"; label.innerText = "Size: Banana"; }
    else if (diffWeeks <= 30) { icon.innerText = "🥬"; label.innerText = "Size: Cabbage"; }
    else { icon.innerText = "👶"; label.innerText = "Size: Fully Grown Baby"; }
}

// 3. Fetal Kick Counter
let kickCount = 0;
function addKickCount() {
    kickCount++;
    document.getElementById('stat-kick-display').innerText = kickCount;
}

// 4. Journal Persistence
function saveJournalEntry() {
    const entry = document.getElementById('journal-text').value;
    if (!entry) return;

    const history = document.getElementById('journal-history');
    const time = new Date().toLocaleString();
    
    const note = document.createElement('div');
    note.className = 'card';
    note.style.textAlign = 'left';
    note.style.padding = '15px';
    note.innerHTML = `<small style="color:var(--text-dim)">${time}</small><p style="margin-top:10px">${entry}</p>`;
    
    history.prepend(note);
    document.getElementById('journal-text').value = "";
}

// 5. AI Dictionary (Simple Simulation)
function performTranslation() {
    const term = document.getElementById('term-input').value.toLowerCase();
    const output = document.getElementById('translation-output');
    
    const dictionary = {
        "ultrasound": "আল্ট্রাসাউন্ড (শব্দতরঙ্গ ব্যবহার করে গর্ভস্থ শিশুর ছবি দেখা)",
        "trimester": "ত্রৈমাসিক (গর্ভাবস্থার ৩ মাসের একটি পর্যায়)",
        "amniotic fluid": "অ্যামনিওটিক তরল (জরায়ুতে শিশুকে ঘিরে থাকা জলীয় অংশ)",
        "labor": "প্রসব বেদনা"
    };

    output.innerText = dictionary[term] || "Term not found in clinical database. Connecting to AI...";
    output.style.display = "block";
}

// 6. Logout Logic
function logout() {
    if (confirm("Are you sure you want to exit MatriCare?")) {
        window.location.reload();
    }
}

// Initialize Date
document.getElementById('current-date').innerText = new Date().toDateString();
