/**
 * MatriCare - Logic for Navigation and Features
 */

// 1. Sidebar Navigation Logic
function showSection(sectionId, event) {
    // Hide all sections first
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Deactivate all sidebar links
    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach(li => {
        li.classList.remove('active');
    });

    // Show the targeted section
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
    }
    
    // Update Header Title
    const title = document.getElementById('section-title');
    if (title) {
        title.innerText = sectionId.replace('-', ' ').toUpperCase();
    }
    
    // Mark the clicked sidebar item as active
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// 2. Pregnancy Calculator & Visualizer
function calculateEDD() {
    const lmpInput = document.getElementById('lmp-date').value;
    const resultDiv = document.getElementById('result');
    const growthText = document.getElementById('growth-text');
    const babyIcon = document.getElementById('baby-size-icon');
    const statWeek = document.getElementById('stat-week');

    if (!lmpInput) {
        alert("Please select a date!");
        return;
    }

    const lmpDate = new Date(lmpInput);
    const today = new Date();
    
    // EDD (LMP + 280 Days)
    const eddDate = new Date(lmpDate);
    eddDate.setDate(lmpDate.getDate() + 280);

    const diffTime = Math.abs(today - lmpDate);
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));

    // Update Result UI
    resultDiv.innerHTML = `
        <div style="background: #1a1a1a; padding: 15px; border-radius: 10px; margin-top: 15px; border: 1px solid #444;">
            <h3 style="color:#ff4d6d">Estimated Delivery: ${eddDate.toDateString()}</h3>
            <p>You are in <strong>Week ${diffWeeks}</strong> of your journey.</p>
        </div>
    `;
    
    // Update Dashboard Stats
    if (statWeek) statWeek.innerText = "Week " + diffWeeks;

    // Visualizer Logic
    if(diffWeeks <= 12) { growthText.innerText = "Size: Lime"; babyIcon.innerText = "🍋"; }
    else if(diffWeeks <= 20) { growthText.innerText = "Size: Banana"; babyIcon.innerText = "🍌"; }
    else if(diffWeeks <= 30) { growthText.innerText = "Size: Cabbage"; babyIcon.innerText = "🥬"; }
    else { growthText.innerText = "Size: Fully Grown Baby!"; babyIcon.innerText = "👶"; }
}

// 3. Kick Counter (Interactive Dashboard Stat)
let count = 0;
function countKick() {
    count++;
    const kickDisplay = document.getElementById('stat-kicks');
    if (kickDisplay) {
        kickDisplay.innerText = count;
    }
}

// 4. Vaccine Tracker - Status Update
function markDone(btn) {
    btn.parentElement.innerHTML = '<span style="color:#4caf50"><i class="fas fa-check-circle"></i> Completed</span>';
}

// 5. AI Assistant Simulation
function askAI() {
    const input = document.getElementById('ai-input');
    const chatBox = document.getElementById('chat-box');
    const query = input.value;

    if (!query) return;

    // User Message
    chatBox.innerHTML += `<p style="color: white; margin-top: 10px; text-align: right;"><strong>You:</strong> ${query}</p>`;
    input.value = "";

    // Assistant Response
    setTimeout(() => {
        chatBox.innerHTML += `<p style="color: #ff4d6d; margin-top: 10px;"><strong>Assistant:</strong> Checking guidance for "${query}"... Please ensure you stay hydrated and consult your doctor for any sharp pain.</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
}

// 6. Profile Editing
function editProfile() {
    const name = prompt("Enter your name:");
    if (name) {
        document.getElementById('profile-name').innerText = name;
        document.getElementById('nav-user-name').innerText = "Welcome, " + name;
    }
}
