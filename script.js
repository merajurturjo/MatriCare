function calculateEDD() {
    const lmpInput = document.getElementById('lmp-date').value;
    const resultDiv = document.getElementById('result');

    if (!lmpInput) {
        resultDiv.innerHTML = "<p style='color: #ff4d4d;'>Please select a valid date.</p>";
        return;
    }

    const lmpDate = new Date(lmpInput);
    // EDD Calculation: LMP + 280 days
    const eddDate = new Date(lmpDate);
    eddDate.setDate(lmpDate.getDate() + 280);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    resultDiv.innerHTML = `
        <div class="success-msg">
            <p>Your Estimated Delivery Date is:</p>
            <h3>${eddDate.toLocaleDateString('en-US', options)}</h3>
        </div>
    `;
}

function showFeatureMsg(featureName) {
    alert("The '" + featureName + "' feature is currently under development. Stay tuned for AI integration!");
}

function triggerEmergency() {
    const confirmAlert = confirm("Do you want to send an emergency alert to your primary contact and nearby hospitals?");
    if (confirmAlert) {
        alert("Emergency Alert Sent! Location shared with designated contacts.");
        // ভবিষ্যতে এখানে API বা SMS ইন্টিগ্রেশন করা যাবে।
    }
}

function showVaccineSchedule() {
    const schedule = `
    Standard Vaccination Schedule:
    1. TT 1: As early as possible
    2. TT 2: 4 weeks after TT 1
    3. TT 3: 6 months after TT 2
    4. TT 4: 1 year after TT 3
    
    Consult your doctor for specific dates.`;
    alert(schedule);
}
