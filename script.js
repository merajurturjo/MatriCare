/**
 * MatriCare Dashboard Logic
 */

// 1. Navigation Controller
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Deactivate all sidebar links
    document.querySelectorAll('.nav-links li').forEach(li => {
        li.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update Title in Top Bar
    document.getElementById('section-title').innerText = sectionId.replace('-', ' ').toUpperCase();
}

// 2. Pregnancy Tracker Logic
function calculateEDD() {
    const lmpInput = document.getElementById('lmp-date').value;
    const resultDiv = document.getElementById('result');
    const growthText = document.getElementById('growth-text');
    const babyIcon = document.getElementById('baby-size-icon');

    if (!lmpInput) {
        resultDiv.innerHTML = "<p style='color: #ff4d6d;'>Select a valid date.</p>";
        return;
    }

    const lmpDate = new Date(lmpInput);
    const today = new Date();
    
    // EDD (LMP + 280 Days)
    const eddDate = new Date(lmpDate);
    eddDate.setDate(lmpDate.getDate() + 280);

    const diffTime = Math.abs(today - lmpDate);
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));

    resultDiv.innerHTML = `<h3 style="color:#ff4d6d">EDD: ${eddDate.toDateString()}</h3><p>Week: ${diffWeeks}</p>`;
    document.getElementById('stat-week').innerText = "Week " + diffWeeks;

    // Visualizer Logic
    if(diffWeeks <= 12) { growthText.innerText = "Size: Lime"; babyIcon.innerText = "🍋"; }
    else if(diffWeeks <= 20) { growthText.innerText = "Size: Banana"; babyIcon.innerText = "🍌"; }
    else { growthText.innerText = "Size: Growing Baby!"; babyIcon.innerText = "👶"; }
}

// 3. Kick Counter (Dashboard Link)
let kicks = 0;
// Note: In dashboard section you can add a button if needed or just display stat
function markDone(btn) {
    btn.parentElement.innerHTML = '<i class="fas fa-check-circle text-success"></i>';
}

// 4. Profile Management
function editProfile() {
    const newName = prompt("Enter Name:");
    if(newName) {
        document.getElementById('profile-name').innerText = newName;
        document.getElementById('nav-user-name').innerText = "Welcome, " + newName;
    }
}
