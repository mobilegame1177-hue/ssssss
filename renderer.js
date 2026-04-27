// Mods data (all descriptions in English)
const mods = [
  {
    id: 1,
    title: "Roblox Executor X",
    description: "Full Lua executor, script hub, ESP, Fly, Speed",
    imageEmoji: "🚀",
    detail: "Powerful executor with full script support. Byfron bypass. Stable performance."
  },
  {
    id: 2,
    title: "Script Hub Ultimate",
    description: "200+ scripts for different games (Blox Fruits, Brookhaven, etc.)",
    imageEmoji: "📜",
    detail: "Auto-updating scripts, GUI menu, macro support."
  },
  {
    id: 3,
    title: "Macro Recorder Pro",
    description: "Record and replay actions, automate clicks",
    imageEmoji: "🎥",
    detail: "Fully customizable macros, hotkey support."
  },
  {
    id: 4,
    title: "ESP & Aim Assist",
    description: "Wallhack, aim assist for shooters (Arsenal, Phantom Forces)",
    imageEmoji: "🎯",
    detail: "See players through walls, auto-aim."
  },
  {
    id: 5,
    title: "Admin Commands Injector",
    description: "Access admin commands in Roblox",
    imageEmoji: "👑",
    detail: "All standard admin commands, kick, teleport."
  },
  {
    id: 6,
    title: "Fly / Speed / Noclip",
    description: "Movement mods: fly, super speed, noclip",
    imageEmoji: "🌀",
    detail: "Customizable speed, flight mode."
  }
];

// DOM elements
const splash = document.getElementById('splash');
const app = document.getElementById('app');
const progressBar = document.getElementById('progressBar');
const splashText = document.getElementById('splashText');
const modsGrid = document.getElementById('modsGrid');
const successModal = document.getElementById('successModal');
const modalContinue = document.getElementById('modalContinue');
const navItems = document.querySelectorAll('.nav-item');
const modsTab = document.getElementById('modsTab');
const settingsTab = document.getElementById('settingsTab');
const profileTab = document.getElementById('profileTab');
const pageTitle = document.getElementById('pageTitle');

let currentInjectId = null;

// Simulate loading
let progress = 0;
const loadMessages = [
  "Bypassing security protocols...",
  "Roblox discovery...",
  "Injecting hooks...",
  "Loading script database...",
  "Verifying signature...",
  "Finalizing..."
];

const interval = setInterval(() => {
  progress += Math.random() * 12 + 3;
  if (progress >= 100) {
    progress = 100;
    clearInterval(interval);
    setTimeout(() => {
      splash.style.opacity = '0';
      setTimeout(() => {
        splash.classList.add('hidden');
        app.classList.remove('hidden');
      }, 500);
    }, 500);
  }
  progressBar.style.width = progress + '%';
  const idx = Math.floor(Math.random() * loadMessages.length);
  splashText.innerText = loadMessages[idx];
}, 600);

// Render mod tiles
function renderMods() {
  modsGrid.innerHTML = '';
  mods.forEach(mod => {
    const card = document.createElement('div');
    card.className = 'mod-card';
    card.setAttribute('data-id', mod.id);
    card.innerHTML = `
      <div class="mod-card-image">${mod.imageEmoji}</div>
      <div class="mod-card-content">
        <div class="mod-card-title">${mod.title}</div>
        <div class="mod-card-desc">${mod.description}</div>
        <div class="mod-card-footer">
          <button class="inject-btn quick-inject" data-id="${mod.id}">Inject →</button>
          <button class="detail-btn" data-id="${mod.id}">Details</button>
        </div>
      </div>
    `;
    modsGrid.appendChild(card);
  });
  document.querySelectorAll('.quick-inject').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      simulateInject(id);
    });
  });
  document.querySelectorAll('.detail-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      showDetailModal(id);
    });
  });
}

// Show detail modal
function showDetailModal(modId) {
  const mod = mods.find(m => m.id === modId);
  if (!mod) return;
  const modalHtml = `
    <div class="modal" id="detailModal">
      <div class="modal-content" style="max-width: 450px;">
        <div class="modal-header">${mod.title}</div>
        <div class="modal-body">
          <p>${mod.detail}</p>
          <button id="detailInjectBtn" class="inject-btn" style="width:100%; margin-top:20px;">Inject →</button>
        </div>
        <div class="modal-footer">
          <button id="closeDetailModal">Close</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const detailModal = document.getElementById('detailModal');
  const closeBtn = document.getElementById('closeDetailModal');
  const injectBtn = document.getElementById('detailInjectBtn');
  closeBtn.addEventListener('click', () => detailModal.remove());
  injectBtn.addEventListener('click', () => {
    detailModal.remove();
    simulateInject(modId);
  });
}

// Simulate injection + success popup
function simulateInject(modId) {
  const mod = mods.find(m => m.id === modId);
  if (!mod) return;
  const loadingMsg = document.createElement('div');
  loadingMsg.textContent = 'Injecting...';
  loadingMsg.style.position = 'fixed';
  loadingMsg.style.bottom = '20px';
  loadingMsg.style.right = '20px';
  loadingMsg.style.background = '#2a2f55';
  loadingMsg.style.padding = '8px 16px';
  loadingMsg.style.borderRadius = '40px';
  loadingMsg.style.zIndex = '3000';
  loadingMsg.style.fontSize = '0.8rem';
  document.body.appendChild(loadingMsg);
  setTimeout(() => {
    loadingMsg.remove();
    const injectionTime = (Math.random() * 5 + 1).toFixed(1);
    document.getElementById('injTime').innerText = `${injectionTime}s`;
    successModal.classList.remove('hidden');
    currentInjectId = modId;
  }, 1800);
}

modalContinue.addEventListener('click', () => {
  successModal.classList.add('hidden');
});

// Tab switching
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const tab = item.dataset.tab;
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    if (tab === 'mods') {
      modsTab.classList.remove('hidden');
      settingsTab.classList.add('hidden');
      profileTab.classList.add('hidden');
      pageTitle.innerText = 'Best Mod Collection';
    } else if (tab === 'settings') {
      modsTab.classList.add('hidden');
      settingsTab.classList.remove('hidden');
      profileTab.classList.add('hidden');
      pageTitle.innerText = 'Settings';
    } else if (tab === 'profile') {
      modsTab.classList.add('hidden');
      settingsTab.classList.add('hidden');
      profileTab.classList.remove('hidden');
      pageTitle.innerText = 'Profile';
    }
  });
});

renderMods();