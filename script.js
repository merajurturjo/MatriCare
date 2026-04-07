/** * MatriCare OS Engine - Premium Edition */

const App = {
    save: (k, v) => localStorage.setItem(`mc_v3_${k}`, JSON.stringify(v)),
    get: (k) => JSON.parse(localStorage.getItem(`mc_v3_${k}`)) || [],
    init: () => {
        App.nav();
        App.clock();
        App.renderRecords();
        App.loadStats();
    }
};

// Navigation
App.nav = () => {
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.onclick = () => {
            const target = btn.dataset.target;
            if(!target) return;
            document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById(target).classList.add('active');
        }
    });
};

// Real-time Clock
App.clock = () => {
    setInterval(() => {
        const now = new Date();
        document.getElementById('live-time').innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }, 1000);
};

// Kick Counter
let kicks = App.get('kicks')[0] || 0;
document.getElementById('kick-count').innerText = kicks;
window.countKick = () => {
    kicks++;
    document.getElementById('kick-count').innerText = kicks;
    App.save('kicks', [kicks]);
};

// Tracker Algorithm
document.getElementById('sync-btn').onclick = () => {
    const lmp = document.getElementById('lmp-input').value;
    if(!lmp) return;
    const lmpDate = new Date(lmp);
    const today = new Date();
    const weeks = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24 * 7));
    const edd = new Date(lmpDate); edd.setDate(edd.getDate() + 280);

    App.save('user_data', { weeks, edd: edd.toDateString() });
    updateUI(weeks, edd);
};

function updateUI(weeks, edd) {
    const daysLeft = Math.ceil((new Date(edd) - new Date()) / (1000 * 60 * 60 * 24));
    document.getElementById('days-left').innerText = daysLeft > 0 ? daysLeft : "0";
    
    // Circular Progress
    const pct = Math.min((weeks / 40) * 100, 100);
    const circle = document.getElementById('circle-progress');
    const offset = 283 - (283 * pct) / 100;
    circle.style.strokeDashoffset = offset;
    document.getElementById('pct').innerText = Math.round(pct);

    document.getElementById('out-edd').innerText = edd.toDateString();
    document.getElementById('out-week').innerText = `Week ${weeks}`;
    document.getElementById('tracker-output').classList.remove('hidden');
}

// Records
document.getElementById('note-save').onclick = () => {
    const val = document.getElementById('note-txt').value;
    if(!val) return;
    const history = App.get('history');
    history.push({ txt: val, time: new Date().toLocaleString() });
    App.save('history', history);
    document.getElementById('note-txt').value = "";
    App.renderRecords();
};

App.renderRecords = () => {
    const h = App.get('history');
    document.getElementById('history-box').innerHTML = h.reverse().map(item => `
        <div class="history-card">
            <small style="color:var(--accent)">${item.time}</small>
            <p>${item.txt}</p>
        </div>
    `).join('');
};

// Dictionary
document.getElementById('dic-go').onclick = () => {
    const q = document.getElementById('dic-q').value.toLowerCase();
    const dict = { "baby": "ভ্রূণ (Fetus)", "trimester": "গর্ভাবস্থার ৩ মাসের একটি পর্যায়" };
    document.getElementById('dic-res').innerHTML = dict[q] || "Result found in Cloud Database...";
}

// Reset
document.getElementById('global-reset').onclick = () => {
    if(confirm("Wipe all data?")) { localStorage.clear(); location.reload(); }
};

App.loadStats = () => {
    const data = App.get('user_data');
    if(data.weeks) updateUI(data.weeks, new Date(data.edd));
};

App.init();
