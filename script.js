// Switching Sections
function switchSection(id) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.add('hidden'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(id).classList.remove('hidden');
    event.currentTarget.classList.add('active');
    document.getElementById('section-title').innerText = id.charAt(0).toUpperCase() + id.slice(1);
}

// Fetal Kicks Counter
let kicks = 0;
function addKick() {
    kicks++;
    document.getElementById('kick-count').innerText = kicks;
}

// Data Handling (localStorage)
function saveData(type) {
    let data = JSON.parse(localStorage.getItem(type) || '[]');
    let record = { id: Date.now() };

    if (type === 'meds') {
        record.name = document.getElementById('med-name').value;
        record.time = document.getElementById('med-time').value;
        if (!record.name || !record.time) return;
    } else if (type === 'diet') {
        record.type = document.getElementById('meal-type').value;
        record.item = document.getElementById('food-item').value;
        if (!record.item) return;
    } else if (type === 'donors') {
        record.name = document.getElementById('donor-name').value;
        record.group = document.getElementById('donor-group').value;
        record.phone = document.getElementById('donor-phone').value;
        if (!record.name || !record.phone) return;
    }

    data.push(record);
    localStorage.setItem(type, JSON.stringify(data));
    renderLists();
    
    // Clear Inputs
    document.querySelectorAll('input').forEach(i => i.value = '');
}

function renderLists() {
    const types = ['meds', 'diet', 'donors'];
    types.forEach(type => {
        const container = document.getElementById(`${type}-list`);
        const data = JSON.parse(localStorage.getItem(type) || '[]');
        if (container) {
            container.innerHTML = data.map(item => `
                <div class="record-row">
                    <span>${item.name || item.item} ${item.time ? 'at '+item.time : ''} ${item.group ? '('+item.group+')' : ''}</span>
                    <button onclick="deleteRecord('${type}', ${item.id})" style="border:none; color:red; cursor:pointer;">✕</button>
                </div>
            `).join('');
        }
    });
}

function deleteRecord(type, id) {
    let data = JSON.parse(localStorage.getItem(type));
    data = data.filter(i => i.id !== id);
    localStorage.setItem(type, JSON.stringify(data));
    renderLists();
}

// Simple Dictionary Search Logic
const medicalDictionary = {
    "anemia": "A condition in which the blood doesn't have enough healthy red blood cells.",
    "placenta": "An organ that develops in the uterus during pregnancy to provide oxygen and nutrients to the baby.",
    "glucose": "A simple sugar that is an important energy source in living organisms.",
    "trimester": "One of the three periods of three months into which a pregnancy is divided."
};

function searchDictionary() {
    const query = document.getElementById('dict-search').value.toLowerCase();
    const output = document.getElementById('dict-output');
    const resultKey = Object.keys(medicalDictionary).find(k => k.includes(query));
    
    if (query && resultKey) {
        output.innerHTML = `<strong>${resultKey.toUpperCase()}:</strong> ${medicalDictionary[resultKey]}`;
    } else {
        output.innerText = "Type a term to see the explanation.";
    }
}

function triggerSOS() {
    alert("Emergency SOS Activated! Calling Hospital and Primary Contact...");
}

// Initial Load
window.onload = renderLists;
