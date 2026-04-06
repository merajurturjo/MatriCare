/**
 * MatriCare - Core Logic for Dashboard and Features
 * Author: Shah Merajur Rahman
 */

// 1. Sidebar Navigation Controller
// This handles switching between different sections like Dashboard, Vaccine Tracker, etc.
function showSection(sectionId) {
    // Hide all content sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all sidebar links
    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach(li => {
        li.classList.remove('active');
    });

    // Show the specific section that was clicked
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update the Header Title
    const titleElement = document.getElementById('section-title');
    if (titleElement) {
        titleElement.innerText = sectionId.replace('-', ' ').toUpperCase();
    }
    
    // Highlight the clicked menu item
    // Note: event.currentTarget refers to the <li> that was clicked
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// 2. Pregnancy Tracker & Baby Visualizer Logic
function calculateEDD() {
    const lmpInput = document.getElementById('lmp-date').value;
    const resultDiv = document.getElementById('result');
    const growthText = document.getElementById('growth-text');
    const babyIcon = document.getElementById('baby-size-icon');
    const statWeek = document.getElementById('stat-week');

    if (!lmpInput) {
        alert("Please select your Last Menstrual Period (LMP) date.");
        return;
    }

    const lmpDate = new Date(lmpInput);
    const today = new Date();
    
    // EDD Calculation (LMP + 280 Days)
    const eddDate = new Date(lmpDate);
    eddDate.setDate(lmpDate.getDate() + 280);

    // Calculate current week
    const diffTime = Math.abs(today - lmpDate);
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));

    // Update the UI Results
    resultDiv.innerHTML = `
        <div style="background: #121212; padding: 15px; border-radius: 10px; margin-top: 15px; border: 1px solid #333;">
            <h3 style="color:#ff4d6d">EDD: ${eddDate.toDateString()}</h3>
            <p>Current Progress: <strong>Week ${diffWeeks}</strong></p>
        </div>
    `;
    
    // Update the Week number on the Dashboard Stats
    if (statWeek) {
        statWeek.innerText = "Week " + diffWeeks;
    }

    // HCI-Based Visualizer Logic (Changes icon/text based on week)
    if (diffWeeks <= 4) { 
        growthText.innerText = "Size: Poppy Seed"; 
        babyIcon.innerText = "🌱"; 
    } else if (diffWeeks <= 12) { 
        growthText.innerText = "Size: Lime"; 
        babyIcon.innerText = "🍋"; 
    } else if (diffWeeks <= 20) { 
        growthText.innerText = "Size: Banana"; 
        babyIcon.innerText = "🍌"; 
    } else if (diffWeeks <= 30) { 
        growthText.innerText = "Size: Cabbage"; 
        babyIcon.innerText = "🥬"; 
    } else { 
        growthText.innerText = "Size: Fully Grown Baby!"; 
        babyIcon.innerText = "👶"; 
    }
}

// 3. Vaccine Tracker - Mark as Completed
function markDone(btn) {
    btn.parentElement.innerHTML = '<span style="color:#4caf50"><i class="fas fa-check-circle"></i> Completed</span>';
}

// 4. Kick Counter Logic (Updates Dashboard Stats)
let kickCount = 0;
function countKick() {
    kickCount++;
    const kickDisplay = document.getElementById('stat-kicks');
    if (kickDisplay) {
        kickDisplay.innerText = kickCount;
    }
}

// 5. Profile Management Logic
function editProfile() {
    const newName = prompt("Enter your Full Name:");
    
    if (newName) {
        // Update name in the Profile Section
        const profileName = document.getElementById('profile-name');
        if (profileName) profileName.innerText = newName;
        
        // Update name in the Navigation Bar
        const navName = document.getElementById('nav-user-name');
        if (navName) navName.innerText = "Welcome, " + newName;
        
        alert("Profile updated successfully!");
    }
}

// 6. AI Assistant (Simulated Chat Logic)
function askAI() {
    const inputField = document.querySelector('#ask-assistant input');
    const query = inputField.value;
    const chatBox = document.querySelector('.chat-box');
    
    if (!query) return;

    // Display User Message
    chatBox.innerHTML += `<p style="color: white; margin-top: 10px; text-align: right;"><strong>You:</strong> ${query}</p>`;
    
    // Clear input
    inputField.value = "";

    // Simulated Bot Response after 1 second
    setTimeout(() => {
        chatBox.innerHTML += `<p style="color: #ff4d6d; margin-top: 10px; text-align: left;"><strong>MatriCare AI:</strong> I have received your query regarding "${query}". Please ensure you follow your vaccination schedule and consult your doctor for medical emergencies.</p>`;
        
        // Auto-scroll to the bottom of the chat
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
}
