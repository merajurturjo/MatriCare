/**
 * Function to calculate Estimated Date of Delivery (EDD)
 * Uses the standard pregnancy duration of 280 days (40 weeks)
 */
function calculateEDD() {
    const lmpInput = document.getElementById('lmp-date').value;
    const resultDiv = document.getElementById('result');

    if (!lmpInput) {
        resultDiv.innerHTML = "⚠️ Please select a valid date.";
        resultDiv.style.color = "red";
        return;
    }

    const lmpDate = new Date(lmpInput);
    
    // Adding 280 days (standard pregnancy period)
    const eddDate = new Date(lmpDate);
    eddDate.setDate(eddDate.getDate() + 280);

    // Formatting options for a professional look
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = eddDate.toLocaleDateString('en-US', options);

    resultDiv.innerHTML = `🌟 Your Estimated Delivery Date: <strong>${formattedDate}</strong>`;
    resultDiv.style.color = "#c9184a";
}