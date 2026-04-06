/**
 * MatriCare - Core Logic
 */

// 1. Navigation
function showSection(sectionId, event) {
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));

    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');
    
    document.getElementById('section-title').innerText = sectionId.replace('-', ' ').toUpperCase();
    if (event && event.currentTarget) event.currentTarget.classList.add('active');
}

// 2. Pregnancy Tracker
function calculateEDD() {
    const lmpValue = document.getElementById('lmp-date').value;
    if (!lmpValue) return alert("Select a date.");
    const lmpDate = new Date(lmpValue);
    const today = new Date();
    const edd = new Date(lmpDate);
    edd.setDate(lmpDate.getDate() + 280);
    const diffWeeks = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24 * 7));
    document.getElementById('result').innerHTML = `<h4>EDD: ${edd.toDateString()}</h4><p>Week: ${diffWeeks}</p>`;
    document.getElementById('stat-week').innerText = "Week " + diffWeeks;
}

// 3. Journal Logic
function saveJournal() {
    const input = document.getElementById('journal-input');
    const history = document.getElementById('journal-history');
    if (!input.value) return;
    const entry = `<p style="background:#252525; padding:10px; border-radius:5px; margin-bottom:5px;">
        <small>${new Date().toLocaleDateString()}:</small><br>${input.value}</p>`;
    history.innerHTML = entry + history.innerHTML;
    input.value = "";
    alert("Journal entry saved!");
}

// 4. AI Translator Logic (Simulated)
function translateText() {
    const input = document.getElementById('trans-input').value;
    const output = document.getElementById('trans-output');
    if (!input) return;
    output.innerText = "Translating... [Example: আপনার রিপোর্ট অনুযায়ী সবকিছু স্বাভাবিক আছে]";
}

// 5. Kick Counter
let kicks = 0;
function countKick() {
    kicks++;
    document.getElementById('stat-kicks').innerText = kicks;
}

// 6. Logout Implementation
function handleLogout() {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
        alert("Logged out successfully.");
        window.location.reload(); // Restarts the app
    }
}

// Placeholder functions for existing logic
function addAppointment() { alert("Use the appointment form!"); }
function markDone(btn) { btn.innerText = "Completed"; }
