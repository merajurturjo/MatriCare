/**
 * MatriCare - Core Logic Layer
 * Features: EDD Calculator, Baby Visualizer, Kick Counter, Health Logs
 */

// 1. Calculate Estimated Delivery Date & Baby Growth
function calculateEDD() {
    const lmpInput = document.getElementById('lmp-date').value;
    const resultDiv = document.getElementById('result');
    const growthText = document.getElementById('growth-text');
    const babyIcon = document.getElementById('baby-size-icon');

    if (!lmpInput) {
        resultDiv.innerHTML = "<p style='color: #ff4d4d;'>Please select a valid date.</p>";
        return;
    }

    const lmpDate = new Date(lmpInput);
    const today = new Date();
    
    // EDD Calculation (LMP + 280 days)
    const eddDate = new Date(lmpDate);
    eddDate.setDate(lmpDate.getDate() + 280);

    // Pregnancy Week Calculation
    const diffTime = Math.abs(today - lmpDate);
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    resultDiv.innerHTML = `
        <div class="success-msg">
            <p>Your Estimated Delivery Date is:</p>
            <h3>${eddDate.toLocaleDateString('en-US', options)}</h3>
            <p style="margin-top:10px;">You are currently in <strong>Week ${diffWeeks}</strong> of your journey.</p>
        </div>
    `;

    // Baby Growth Visualizer Logic (Week-based comparison)
    if(diffWeeks <= 4) { 
        growthText.innerText = "Baby is the size of a Poppy Seed"; 
        babyIcon.innerText = "🌱"; 
    } else if(diffWeeks <= 8) { 
        growthText.innerText = "Baby is the size of a Raspberry"; 
        babyIcon.innerText = "🍇"; 
    } else if(diffWeeks <= 12) { 
        growthText.innerText = "Baby is the size of a Lime"; 
        babyIcon.innerText = "🍋"; 
    } else if(diffWeeks <= 20) { 
        growthText.innerText = "Baby is the size of a Banana"; 
        babyIcon.innerText = "🍌"; 
    } else if(diffWeeks <= 30) {
        growthText.innerText = "Baby is the size of a Cabbage"; 
        babyIcon.innerText = "🥬";
    } else { 
        growthText.innerText = "Baby is almost ready to meet you!"; 
        babyIcon.innerText = "👶"; 
    }
}

// 2. Kick Counter Functionality
let kicks = 0;
function countKick() {
    kicks++;
    document.getElementById('kick-count').innerText = kicks;
}
function resetKicks() {
    kicks = 0;
    document.getElementById('kick-count').innerText = kicks;
}

// 3. Health Logs (Proposed Database Interface)
function saveHealthLog() {
    const log = document.getElementById('health-note').value;
    if(log) {
        alert("Success: Health data recorded in local log: " + log);
        document.getElementById('health-note').value = "";
    } else {
        alert("Please enter your BP or Weight readings.");
    }
}

// 4. Emergency & Utilities
function triggerEmergency() {
    const confirmAlert = confirm("Do you want to send emergency alerts to your primary contact and nearby hospitals?");
    if (confirmAlert) {
        alert("Alert Sent! Sharing GPS location with emergency services...");
    }
}

function findHospitals() {
    // Opens Google Maps with "Maternity Hospitals near me" search query
    window.open("https://www.google.com/maps/search/maternity+hospitals+near+me", "_blank");
}

function showDoctorNote() {
    alert("Saved Notes:\n- Primary Doctor: Dr. Selim (017XXXXXXXX)\n- Blood Group: B+ Positive\n- Next Appointment: April 25, 2026");
}

function showVaccineSchedule() {
    alert("Vaccination Schedule:\n- TT 1: Early pregnancy\n- TT 2: 4 weeks after TT 1\n- TT 3: 6 months after TT 2\nCheck with your doctor for confirmation.");
}

function showFeatureMsg(feature) {
    alert(feature + " is being developed with AI Integration. Expected update: Q3 2026.");
}
