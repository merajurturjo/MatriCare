/**
 * MatriCare - Logic for Navigation and Interactive Features
 */

// 1. Navigation Logic
function showSection(sectionId, event) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    
    // Remove active class from sidebar
    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));

    // Show target section
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');
    
    // Update Header
    document.getElementById('section-title').innerText = sectionId.replace('-', ' ').toUpperCase();
    
    // Highlight clicked menu
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// 2. Pregnancy Tracker Logic
function calculateEDD() {
    const lmpValue = document.getElementById('lmp-date').value;
    if (!lmpValue) return alert("Please select a date.");

    const lmpDate = new Date(lmpValue);
    const today = new Date();
    
    // EDD: LMP + 280 Days
    const edd = new Date(lmpDate);
    edd.setDate(lmpDate.getDate() + 280);

    const diffWeeks = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24 * 7));

    document.getElementById('result').innerHTML = `
        <div class="result-highlight">
            <h4>Expected Delivery: ${edd.toDateString()}</h4>
            <p>You are in <strong>Week ${diffWeeks}</strong></p>
        </div>
    `;
    
    document.getElementById('stat-week').innerText = "Week " + diffWeeks;

    // Growth Visualizer
    const icon = document.getElementById('baby-size-icon');
    const text = document.getElementById('growth-text');
    if (diffWeeks <= 12) { icon.innerText = "🍋"; text.innerText = "Size: Lime"; }
    else if (diffWeeks <= 20) { icon.innerText = "🍌"; text.innerText = "Size: Banana"; }
    else if (diffWeeks <= 30) { icon.innerText = "🥬"; text.innerText = "Size: Cabbage"; }
    else { icon.innerText = "👶"; text.innerText = "Size: Fully Grown Baby"; }
}

// 3. Kick Counter (Dashboard Interactive)
let kicks = 0;
function countKick() {
    kicks++;
    document.getElementById('stat-kicks').innerText = kicks;
}

// 4. Vaccine Tracker
function markDone(btn) {
    btn.parentElement.innerHTML = '<span style="color:#4caf50"><i class="fas fa-check"></i> Done</span>';
}

// 5. Blood Support Logic
const donors = [
    { name: "Sayem Ahmed", group: "B+", phone: "017XXXXXXXX" },
    { name: "Selim Reza", group: "O+", phone: "018XXXXXXXX" }
];

function toggleBloodForm(type) {
    const ui = document.getElementById('blood-search-ui');
    ui.style.display = type === 'search' ? 'block' : 'none';
    if (type === 'register') alert("Registration form coming soon!");
}

function searchDonor() {
    const grp = document.getElementById('search-group').value;
    const res = document.getElementById('donor-results');
    const filtered = donors.filter(d => d.group === grp);
    
    if (filtered.length > 0) {
        res.innerHTML = filtered.map(d => `<div class="donor-item"><strong>${d.name}</strong> - ${d.phone}</div>`).join('');
    } else {
        res.innerHTML = "<p>No donors found.</p>";
    }
}

// 6. AI Assistant Simulation
function askAI() {
    const input = document.getElementById('ai-input');
    const chat = document.getElementById('chat-box');
    if (!input.value) return;

    chat.innerHTML += `<p style="text-align:right; color:white;">You: ${input.value}</p>`;
    const query = input.value;
    input.value = "";

    setTimeout(() => {
        chat.innerHTML += `<p><strong>AI:</strong> For "${query}", stay hydrated and rest. Check your Vaccine Tracker for TT-2 status.</p>`;
        chat.scrollTop = chat.scrollHeight;
    }, 1000);
}

// 7. Profile Logic
function editProfile() {
    const name = prompt("Enter your Name:");
    if (name) {
        document.getElementById('profile-name').innerText = name;
        document.getElementById('nav-user-name').innerText = "Welcome, " + name;
    }
}
