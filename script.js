// Storage Helper
const DB = {
    save: (k, v) => localStorage.setItem(`matri_pro_${k}`, JSON.stringify(v)),
    get: (k) => JSON.parse(localStorage.getItem(`matri_pro_${k}`)) || []
};

// Nav Logic
document.querySelectorAll('.nav-item').forEach(btn => {
    btn.onclick = () => {
        const target = btn.dataset.target;
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(target).classList.add('active');
        document.getElementById('page-title').innerText = target.charAt(0).toUpperCase() + target.slice(1);
    };
});

// Medications
function addMed() {
    const name = document.getElementById('med-name').value;
    const time = document.getElementById('med-time').value;
    if(!name || !time) return;
    const list = DB.get('meds');
    list.push({ name, time, id: Date.now() });
    DB.save('meds', list);
    renderMeds();
}

function renderMeds() {
    const list = DB.get('meds');
    document.getElementById('med-list').innerHTML = list.map(m => `
        <div class="item">
            <span><strong>${m.name}</strong> - ${m.time}</span>
            <i class="fas fa-trash" onclick="deleteItem('meds', ${m.id}, renderMeds)"></i>
        </div>
    `).join('');
}

// Blood Donor
function addDonor() {
    const name = document.getElementById('d-name').value;
    const grp = document.getElementById('d-group').value;
    const ph = document.getElementById('d-phone').value;
    if(!name || !ph) return;
    const list = DB.get('donors');
    list.push({ name, grp, ph, id: Date.now() });
    DB.save('donors', list);
    renderDonors();
}

function renderDonors() {
    const list = DB.get('donors');
    document.getElementById('donor-list').innerHTML = list.map(d => `
        <div class="item">
            <span>[${d.grp}] <strong>${d.name}</strong>: ${d.ph}</span>
            <a href="tel:${d.ph}"><i class="fas fa-phone"></i></a>
        </div>
    `).join('');
}

// Delete Logic
function deleteItem(key, id, callback) {
    let list = DB.get(key);
    list = list.filter(i => i.id !== id);
    DB.save(key, list);
    callback();
}

// Profile
function saveProfile() {
    const name = document.getElementById('p-name').value;
    DB.save('profile', { name });
    document.getElementById('user-header-name').innerText = name;
    alert("Profile Saved!");
}

window.onload = () => {
    renderMeds();
    renderDonors();
    const p = DB.get('profile');
    if(p.name) document.getElementById('user-header-name').innerText = p.name;
};
