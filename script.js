// --- SECTION SWITCHER ---
function switchSection(id) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.add('hidden'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(id).classList.remove('hidden');
    event.currentTarget.classList.add('active');
    document.getElementById('section-title').innerText = id.charAt(0).toUpperCase() + id.slice(1);
}

// --- PREGNANCY CALCULATOR & SIZE VISUALIZER ---
const babySizes = [
    { week: 4, size: "Poppy Seed", emoji: "🌱" },
    { week: 8, size: "Raspberry", emoji: "🍇" },
    { week: 12, size: "Lime", emoji: "🍋" },
    { week: 16, size: "Avocado", emoji: "🥑" },
    { week: 20, size: "Banana", emoji: "🍌" },
    { week: 24, size: "Corn", emoji: "🌽" },
    { week: 28, size: "Eggplant", emoji: "🍆" },
    { week: 32, size: "Squash", emoji: "🎃" },
    { week: 36, size: "Papaya", emoji: "🍈" },
    { week: 40, size: "Watermelon", emoji: "🍉" }
];

function calculatePregnancy() {
    const lmpInput = document.getElementById('lmp-date').value;
    if (!lmpInput) return alert("Please select LMP date.");

    const lmpDate = new Date(lmpInput);
    const today = new Date();
    const diffTime = today - lmpDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);

    // Update EDD
    const edd = new Date(lmpDate);
    edd.setDate(edd.getDate() + 280);
    
    document.getElementById('calc-results').classList.remove('hidden');
    document.getElementById('edd-result').innerText = edd.toDateString();
    document.getElementById('week-display').innerText = `Week ${weeks}, Day ${diffDays % 7}`;

    // Update Baby Size
    const sizeObj = babySizes.reverse().find(s => weeks >= s.week) || babySizes[0];
    document.getElementById('baby-size-text').innerText = sizeObj.size;
    document.getElementById('baby-emoji').innerText = sizeObj.emoji;

    localStorage.setItem('mc_lmp', lmpInput);
}

// --- WATER TRACKER ---
let water = 0;
function addWater() {
    if(water < 10) water++;
    document.getElementById('water-count').innerText = `${water}/10`;
    localStorage.setItem('mc_water', water);
}

// --- MOOD TRACKER ---
function setMood(emoji) {
    document.getElementById('current-mood').innerText = `Feeling: ${emoji}`;
    localStorage.setItem('mc_mood', emoji);
}

// --- WEIGHT LOG ---
function saveWeight() {
    const w = document.getElementById('weight-input').value;
    if(w) {
        document.getElementById('last-weight').innerText = `Last: ${w} kg`;
        localStorage.setItem('mc_weight', w);
    }
}

// --- APPOINTMENTS ---
function addAppointment() {
    const title = document.getElementById('app-title').value;
    const date = document.getElementById('app-date').value;
    if(!title || !date) return;
    
    let apps = JSON.parse(localStorage.getItem('mc_apps') || '[]');
    apps.push({ title, date, id: Date.now() });
    localStorage.setItem('mc_apps', JSON.stringify(apps));
    renderApps();
}

function renderApps() {
    const container = document.getElementById('app-list');
    const apps = JSON.parse(localStorage.getItem('mc_apps') || '[]');
    container.innerHTML = apps.map(a => `
        <div class="record-row">
            <span>${a.title} (${a.date})</span>
            <button onclick="deleteItem('mc_apps', ${a.id}, renderApps)" style="color:red;border:none;background:none;">✕</button>
        </div>
    `).join('');
}

// --- HOSPITAL BAG CHECKLIST ---
const bagItems = ["Baby Clothes", "Diapers", "Blanket", "Maternity Pads", "ID Papers", "Toiletries"];
function loadChecklist() {
    const container = document.getElementById('checklist-container');
    container.innerHTML = bagItems.map(item => `
        <div class="checklist-item">
            <input type="checkbox"> <label>${item}</label>
        </div>
    `).join('');
}

// --- HELPER FUNCTIONS ---
function deleteItem(key, id, callback) {
    let data = JSON.parse(localStorage.getItem(key));
    data = data.filter(i => i.id !== id);
    localStorage.setItem(key, JSON.stringify(data));
    callback();
}

let kicks = 0;
function addKick() { kicks++; document.getElementById('kick-count').innerText = kicks; }

function triggerSOS() { alert("EMERGENCY: Notifying Hospital & Family..."); }

// --- INITIALIZE ---
window.onload = () => {
    document.getElementById('today-date').innerText = new Date().toDateString();
    loadChecklist();
    renderApps();
    
    // Auto-load saved data
    if(localStorage.getItem('mc_lmp')) {
        document.getElementById('lmp-date').value = localStorage.getItem('mc_lmp');
        calculatePregnancy();
    }
    if(localStorage.getItem('mc_weight')) {
        document.getElementById('last-weight').innerText = `Last: ${localStorage.getItem('mc_weight')} kg`;
    }
    if(localStorage.getItem('mc_water')) {
        water = localStorage.getItem('mc_water');
        document.getElementById('water-count').innerText = `${water}/10`;
    }
};
