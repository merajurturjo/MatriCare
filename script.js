/**
 * MatriCare - Logic for Navigation and Interactive Tools
 */

// 1. Navigation Controller
function showSection(sectionId, event) {
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));

    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');
    
    document.getElementById('section-title').innerText = sectionId.replace('-', ' ').toUpperCase();
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// 2. Pregnancy Tracker
function calculateEDD() {
    const lmpValue = document.getElementById('lmp-date').value;
    if (!lmpValue) return alert("Please select a date.");

    const lmpDate = new Date(lmpValue);
    const today = new Date();
    const edd = new Date(lmpDate);
    edd.setDate(lmpDate.getDate() + 280);

    const diffWeeks = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24 * 7));

    document.getElementById('result').innerHTML = `
        <div style="background: #1a1a1a; padding: 15px; border-radius: 10px; margin-top: 15px; border: 1px solid #ff4d6d;">
            <h3 style="color:#ff4d6d">EDD: ${edd.toDateString()}</h3>
            <p>You are in <strong>Week ${diffWeeks}</strong></p>
        </div>
    `;
    
    document.getElementById('stat-week').innerText = "Week " + diffWeeks;

    const icon = document.getElementById('baby-size-icon');
    const text = document.getElementById('growth-text');
    if (diffWeeks <= 12) { icon.innerText = "🍋"; text.innerText = "Size: Lime"; }
    else if (diffWeeks <= 20) { icon.innerText = "🍌"; text.innerText = "Size: Banana"; }
    else if (diffWeeks <= 30) { icon.innerText = "🥬"; text.innerText = "Size: Cabbage"; }
    else { icon.innerText = "👶"; text.innerText = "Size: Fully Grown Baby"; }
}

// 3. Kick Counter
let kicks = 0;
function countKick() {
    kicks++;
    document.getElementById('stat-kicks').innerText = kicks;
}

// 4. Smart Appointment Logic
function addAppointment() {
    const docName = document.getElementById('doc-name').value;
    const appDate = document.getElementById('app-date').value;
    const listContainer = document.getElementById('app-list-container');
    const statApp = document.getElementById('stat-next-app');

    if (!docName || !appDate) return alert("Fill all fields!");

    // Remove placeholder if it's the first appointment
    if (listContainer.innerHTML.includes("No appointments")) listContainer.innerHTML = "";

    const appointmentHTML = `
        <div class="app-item" style="display: flex; justify-content: space-between; background: #252525; padding: 15px; border-radius: 8px; border-left: 5px solid #ff4d6d; margin-top: 10px;">
            <div style="text-align: left;">
                <strong>${docName}</strong><br>
                <small><i class="fas fa-clock"></i> ${new Date(appDate).toDateString()}</small>
            </div>
            <span style="background: #ff4d6d22; color: #ff4d6d; padding: 5px 10px; border-radius: 5px; font-size: 0.8rem; align-self: center;">Upcoming</span>
        </div>
    `;

    listContainer.innerHTML = appointmentHTML + listContainer.innerHTML;
    statApp.innerText = new Date(appDate).toLocaleDateString();
    
    document.getElementById('doc-name').value = "";
    document.getElementById('app-date').value = "";
    alert("Appointment Scheduled!");
}

// 5. Blood Support Simulation
const donors = [{ name: "Sayem Ahmed", group: "B+", phone: "017XXXXXXXX" }];
function toggleBloodForm(type) {
    document.getElementById('blood-search-ui').style.display = type === 'search' ? 'block' : 'none';
}
function searchDonor() {
    const grp = document.getElementById('search-group').value;
    const res = document.getElementById('donor-results');
    const filtered = donors.filter(d => d.group === grp);
    res.innerHTML = filtered.length > 0 ? 
        filtered.map(d => `<div style="background:#333; padding:10px; margin-top:5px; border-radius:5px;">${d.name} - ${d.phone}</div>`).join('') : 
        "<p>No donors found.</p>";
}

// 6. AI Assistant
function askAI() {
    const input = document.getElementById('ai-input');
    const chat = document.getElementById('chat-box');
    if (!input.value) return;

    chat.innerHTML += `<p style="text-align:right; color:white; margin-top:10px;">You: ${input.value}</p>`;
    const query = input.value;
    input.value = "";

    setTimeout(() => {
        chat.innerHTML += `<p style="color: #ff4d6d; margin-top:10px;"><strong>AI:</strong> Regarding "${query}", ensure you track your kicks and check the Vaccine tab.</p>`;
        chat.scrollTop = chat.scrollHeight;
    }, 8000);
}

// 7. Vaccine & Profile
function markDone(btn) { btn.parentElement.innerHTML = '<span style="color:#4caf50">Completed</span>'; }
function editProfile() {
    const name = prompt("Enter Name:");
    if (name) {
        document.getElementById('profile-name').innerText = name;
        document.getElementById('nav-user-name').innerText = "Welcome, " + name;
    }
}
