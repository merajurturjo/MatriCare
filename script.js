// ১. পেজ নেভিগেশন
function showPage(pageId) {
    document.querySelectorAll('.page-content').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(pageId).classList.remove('hidden');
    event.currentTarget.classList.add('active');
}

// ২. কিক কাউন্টার
let kicks = 0;
function addKick() {
    kicks++;
    document.getElementById('kick-count').innerText = kicks;
}

// ৩. ডেটা সেভ (localStorage)
function saveData(type) {
    let records = JSON.parse(localStorage.getItem(type) || '[]');
    
    if (type === 'meds') {
        const name = document.getElementById('m-name').value;
        const time = document.getElementById('m-time').value;
        if (!name || !time) return alert("Please fill both fields");
        records.push({ name, time, id: Date.now() });
        document.getElementById('m-name').value = '';
    } else if (type === 'donors') {
        const dName = document.getElementById('d-name').value;
        const dGroup = document.getElementById('d-group').value;
        if (!dName || !dGroup) return alert("Please fill both fields");
        records.push({ name: dName, group: dGroup, id: Date.now() });
        document.getElementById('d-name').value = '';
        document.getElementById('d-group').value = '';
    }

    localStorage.setItem(type, JSON.stringify(records));
    renderAll();
}

// ৪. ডিলিট লজিক
function deleteItem(type, id) {
    let records = JSON.parse(localStorage.getItem(type));
    records = records.filter(r => r.id !== id);
    localStorage.setItem(type, JSON.stringify(records));
    renderAll();
}

// ৫. ডেটা রেন্ডার করা
function renderAll() {
    // Meds Render
    const meds = JSON.parse(localStorage.getItem('meds') || '[]');
    const medList = document.getElementById('med-list');
    if(medList) {
        medList.innerHTML = meds.map(m => `
            <div class="item">
                <span><strong>${m.name}</strong> - ${m.time}</span>
                <button onclick="deleteItem('meds', ${m.id})" style="color:red; border:none; background:none; cursor:pointer;">Delete</button>
            </div>
        `).join('');
    }

    // Donors Render
    const donors = JSON.parse(localStorage.getItem('donors') || '[]');
    const donorList = document.getElementById('donor-list');
    if(donorList) {
        donorList.innerHTML = donors.map(d => `
            <div class="item">
                <span><strong>${d.name}</strong> (${d.group})</span>
                <button onclick="deleteItem('donors', ${d.id})" style="color:red; border:none; background:none; cursor:pointer;">Remove</button>
            </div>
        `).join('');
    }
}

function triggerSOS() {
    alert("Emergency SOS Activated! Notifying healthcare contacts...");
}

// অ্যাপ ওপেন হওয়ার সময় ডেটা লোড করা
window.onload = renderAll;
