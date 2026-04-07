// Storage Helper
const DB = {
    save: (key, data) => localStorage.setItem(`matri_${key}`, JSON.stringify(data)),
    get: (key) => JSON.parse(localStorage.getItem(`matri_${key}`)) || []
};

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.onclick = () => {
        const target = item.dataset.target;
        if(!target) return;
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(target).classList.add('active');
        document.getElementById('view-title').innerText = target.toUpperCase();
    }
});

// --- MEDICATIONS ---
function addMed() {
    const name = document.getElementById('med-name').value;
    const time = document.getElementById('med-time').value;
    if(!name || !time) return alert("Fill all fields");

    const meds = DB.get('meds');
    meds.push({ name, time, id: Date.now() });
    DB.save('meds', meds);
    renderMeds();
}

function renderMeds() {
    const meds = DB.get('meds');
    document.getElementById('med-list').innerHTML = meds.map(m => `
        <div class="item-card">
            <span><strong>${m.name}</strong> at ${m.time}</span>
            <i class="fas fa-trash" onclick="deleteItem('meds', ${m.id}, renderMeds)"></i>
        </div>
    `).join('');
}

// --- DIET ---
function addDiet() {
    const type = document.getElementById('meal-type').value;
    const food = document.getElementById('food-item').value;
    if(!food) return;

    const diets = DB.get('diets');
    diets.push({ type, food, id: Date.now() });
    DB.save('diets', diets);
    renderDiet();
}

function renderDiet() {
    const diets = DB.get('diets');
    document.getElementById('diet-list').innerHTML = diets.map(d => `
        <div class="item-card">
            <span><strong>${d.type}:</strong> ${d.food}</span>
            <i class="fas fa-trash" onclick="deleteItem('diets', ${d.id}, renderDiet)"></i>
        </div>
    `).join('');
}

// --- BLOOD DONOR ---
function addDonor() {
    const name = document.getElementById('donor-name').value;
    const grp = document.getElementById('blood-group').value;
    const phone = document.getElementById('donor-phone').value;
    if(!name || !phone) return;

    const donors = DB.get('donors');
    donors.push({ name, grp, phone, id: Date.now() });
    DB.save('donors', donors);
    renderDonors();
}

function renderDonors() {
    const donors = DB.get('donors');
    document.getElementById('donor-list').innerHTML = donors.map(d => `
        <div class="item-card">
            <span>${d.grp} | <strong>${d.name}</strong> - ${d.phone}</span>
            <a href="tel:${d.phone}"><i class="fas fa-phone"></i></a>
        </div>
    `).join('');
}

// --- PROFILE ---
function saveProfile() {
    const name = document.getElementById('p-name').value;
    const blood = document.getElementById('p-blood').value;
    const emergency = document.getElementById('p-emergency').value;
    
    const profile = { name, blood, emergency };
    DB.save('profile', profile);
    document.getElementById('user-display-name').innerText = name;
    alert("Profile Updated Successfully!");
}

function loadProfile() {
    const p = JSON.parse(localStorage.getItem('matri_profile'));
    if(p) {
        document.getElementById('p-name').value = p.name;
        document.getElementById('p-blood').value = p.blood;
        document.getElementById('p-emergency').value = p.emergency;
        document.getElementById('user-display-name').innerText = p.name;
    }
}

// --- GLOBAL DELETE ---
function deleteItem(key, id, callback) {
    let items = DB.get(key);
    items = items.filter(i => i.id !== id);
    DB.save(key, items);
    callback();
}

// INITIAL LOAD
window.onload = () => {
    renderMeds();
    renderDiet();
    renderDonors();
    loadProfile();
};
