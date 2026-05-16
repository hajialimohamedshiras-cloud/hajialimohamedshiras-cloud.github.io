/* ================================================================
   MOHAMED SHIRAS — PORTFOLIO SCRIPT
   Handles: Navigation, Gallery, Admin Dashboard, Forms
================================================================ */

/* ──────────────────────────────────────────────────────────────
   STATE
────────────────────────────────────────────────────────────── */
let state = {
  isAdminLoggedIn: false,
  designProjects: [
    { id: 1, title: "Sakura Products Packaging", client: "Sakura Products", category: "Packaging", desc: "Complete multilingual packaging for 4 SKUs.", emoji: "🏮", bg: "gallery-thumb-bg1" },
    { id: 2, title: "Corporate Banner — A1 Format", client: "Mobile Art & Print Shop", category: "Large Format", desc: "Large-format vinyl banner for corporate event.", emoji: "📢", bg: "gallery-thumb-bg2" },
    { id: 3, title: "Trade Exhibition Backdrop", client: "Nethra Printers", category: "Large Format", desc: "5m × 3m branded backdrop for a trade show.", emoji: "🖼", bg: "gallery-thumb-bg3" },
    { id: 4, title: "Business Card Suite", client: "Multiple Clients", category: "Stationery", desc: "Spot UV & letterpress business card designs.", emoji: "💼", bg: "gallery-thumb-bg4" },
    { id: 5, title: "Academic Textbook Layout", client: "Private Publisher", category: "Layout", desc: "320-page textbook with structured heading hierarchy.", emoji: "📖", bg: "gallery-thumb-bg5" },
    { id: 6, title: "Portfolio Web UI Concept", client: "Personal", category: "Web Design", desc: "Responsive UI concept for a creative portfolio.", emoji: "🌐", bg: "gallery-thumb-bg6" },
  ],
  netProjects: [
    { id: 1, title: "Linux Ground Zero Workshop", date: "2024-03", tags: ["Linux", "CLI", "File Systems"], desc: "Intensive workshop covering Linux system structure, terminal commands, file management, and permissions." },
    { id: 2, title: "Ethical Hacking Workshop", date: "2024-06", tags: ["Security", "Kali Linux", "Pen Testing"], desc: "Participated in a hands-on ethical hacking workshop covering vulnerability scanning and network analysis." },
    { id: 3, title: "HND Network Lab Sessions", date: "2024-01", tags: ["Cisco", "TCP/IP", "Subnetting", "Wireshark"], desc: "Practical lab sessions at ESOFT: configuring routers, switches, and analysing packet flows." },
  ],
  inbox: [],
  skills: [
    { name: "Basic Networking Principles", category: "Networking" },
    { name: "Linux System Structure", category: "Networking" },
    { name: "File Management", category: "Networking" },
    { name: "TCP/IP", category: "Networking" },
    { name: "HTML / CSS", category: "Web & Coding" },
    { name: "C#", category: "Web & Coding" },
    { name: "Python (Scripting)", category: "Web & Coding" },
    { name: "Git & Version Control", category: "Web & Coding" },
    { name: "Ethical Hacking Workshop", category: "Digital Security" },
    { name: "Adobe Photoshop", category: "Design Tools" },
    { name: "Adobe Illustrator", category: "Design Tools" },
    { name: "CorelDRAW", category: "Design Tools" },
  ],
  activeFilter: "all",
  resumeBlob: null,
};

/* ──────────────────────────────────────────────────────────────
   NAVIGATION
────────────────────────────────────────────────────────────── */
function navigateTo(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
  }
  // Update nav links
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === pageId);
  });
  // Close mobile nav
  document.getElementById('navLinks').classList.remove('open');
}

// Nav link clicks
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.dataset.page;
    navigateTo(page);
    if (page === 'admin' && !state.isAdminLoggedIn) {
      document.getElementById('adminLogin').style.display = 'flex';
      document.getElementById('adminDashboard').style.display = 'none';
    }
  });
});

// Hamburger
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// Navbar scroll style
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.background = window.scrollY > 30
    ? 'rgba(13,17,23,0.98)'
    : 'rgba(13,17,23,0.92)';
});

/* ──────────────────────────────────────────────────────────────
   DESIGN GALLERY
────────────────────────────────────────────────────────────── */
const categoryMap = {
  "Packaging": "packaging",
  "Large Format": "large-format",
  "Stationery": "stationery",
  "Layout": "layout",
  "Web Design": "web",
  "Branding": "all",
};

function renderGallery() {
  const gallery = document.getElementById('designGallery');
  if (!gallery) return;
  const filter = state.activeFilter;
  const filtered = state.designProjects.filter(p => {
    if (filter === 'all') return true;
    return categoryMap[p.category] === filter;
  });
  gallery.innerHTML = filtered.length
    ? filtered.map(p => `
      <div class="gallery-card" data-id="${p.id}">
        <div class="gallery-thumb ${p.bg}">${p.emoji}</div>
        <div class="gallery-info">
          <div class="gallery-title">${p.title}</div>
          <div class="gallery-meta">Client: ${p.client}</div>
          <span class="gallery-cat">${p.category}</span>
          <p style="font-size:0.82rem;color:var(--text-muted);margin-top:0.5rem;">${p.desc}</p>
        </div>
      </div>
    `).join('')
    : `<div class="empty-state mono" style="grid-column:1/-1">// No projects in this category yet.</div>`;
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.activeFilter = btn.dataset.filter;
    renderGallery();
  });
});

/* ──────────────────────────────────────────────────────────────
   NETWORKING TIMELINE
────────────────────────────────────────────────────────────── */
function renderNetTimeline() {
  const el = document.getElementById('networkTimeline');
  if (!el) return;
  el.innerHTML = state.netProjects.map(p => `
    <div class="timeline-item">
      <div class="timeline-date mono">${formatDate(p.date)}</div>
      <div>
        <div class="timeline-title">${p.title}</div>
        <div class="timeline-desc">${p.desc}</div>
        <div class="timeline-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');
}

function formatDate(str) {
  if (!str) return '—';
  const [y, m] = str.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m)-1] || ''} ${y}`;
}

/* ──────────────────────────────────────────────────────────────
   CONTACT FORM
────────────────────────────────────────────────────────────── */
function submitContactForm() {
  const name    = document.getElementById('contactName').value.trim();
  const email   = document.getElementById('contactEmail').value.trim();
  const reason  = document.getElementById('contactReason').value;
  const message = document.getElementById('contactMessage').value.trim();

  if (!name || !email || !reason || !message) {
    alert('Please fill in all fields before submitting.');
    return;
  }
  if (!email.includes('@')) {
    alert('Please enter a valid email address.');
    return;
  }

  const entry = {
    id: Date.now(),
    name, email, reason, message,
    time: new Date().toLocaleString()
  };

  state.inbox.push(entry);
  updateInbox();
  updateStats();

  // Show success
  document.getElementById('formSuccess').style.display = 'block';
  document.getElementById('contactName').value = '';
  document.getElementById('contactEmail').value = '';
  document.getElementById('contactReason').value = '';
  document.getElementById('contactMessage').value = '';
  setTimeout(() => {
    document.getElementById('formSuccess').style.display = 'none';
  }, 4000);
}

/* ──────────────────────────────────────────────────────────────
   ADMIN — LOGIN / LOGOUT
────────────────────────────────────────────────────────────── */
function adminLogin() {
  const user = document.getElementById('adminUser').value.trim();
  const pass = document.getElementById('adminPass').value.trim();

  // Demo credentials (in a real app, server-side + encrypted)
  if (user === 'admin' && pass === 'admin123') {
    state.isAdminLoggedIn = true;
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'grid';
    updateStats();
    renderAdminDesignList();
    renderAdminNetList();
    renderSkillsPreview();
    updateInbox();
  } else {
    const err = document.getElementById('loginError');
    err.style.display = 'block';
    setTimeout(() => { err.style.display = 'none'; }, 3000);
  }
}

// Allow Enter key
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('adminLogin').style.display !== 'none') {
    adminLogin();
  }
});

function adminLogout() {
  state.isAdminLoggedIn = false;
  document.getElementById('adminLogin').style.display = 'flex';
  document.getElementById('adminDashboard').style.display = 'none';
  document.getElementById('adminUser').value = '';
  document.getElementById('adminPass').value = '';
  navigateTo('home');
}

/* ──────────────────────────────────────────────────────────────
   ADMIN — TAB SWITCHING
────────────────────────────────────────────────────────────── */
document.querySelectorAll('.admin-nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    switchAdminTab(btn.dataset.tab);
  });
});

function switchAdminTab(tabId) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
  const tab = document.getElementById(`tab-${tabId}`);
  if (tab) tab.classList.add('active');
  document.querySelectorAll('.admin-nav-btn').forEach(b => {
    if (b.dataset.tab === tabId) b.classList.add('active');
  });
}

/* ──────────────────────────────────────────────────────────────
   ADMIN — STATS
────────────────────────────────────────────────────────────── */
function updateStats() {
  setEl('statDesign', state.designProjects.length);
  setEl('statNet', state.netProjects.length);
  setEl('statMessages', state.inbox.length);
  setEl('statSkills', state.skills.length);
}

function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

/* ──────────────────────────────────────────────────────────────
   ADMIN — DESIGN PROJECTS
────────────────────────────────────────────────────────────── */
const bgCycle = ['gallery-thumb-bg1','gallery-thumb-bg2','gallery-thumb-bg3','gallery-thumb-bg4','gallery-thumb-bg5','gallery-thumb-bg6'];
const emojiMap = { Packaging:'📦', Branding:'✦', Layout:'📖', 'Web Design':'🌐', 'Large Format':'📢', Stationery:'💼' };

function addDesignProject() {
  const title    = document.getElementById('dp-title').value.trim();
  const client   = document.getElementById('dp-client').value.trim();
  const category = document.getElementById('dp-category').value;
  const desc     = document.getElementById('dp-desc').value.trim();

  if (!title) { alert('Project title is required.'); return; }

  const newProj = {
    id: Date.now(),
    title, client: client || 'Personal',
    category, desc: desc || 'No description provided.',
    emoji: emojiMap[category] || '🎨',
    bg: bgCycle[state.designProjects.length % bgCycle.length]
  };

  state.designProjects.push(newProj);
  renderGallery();
  renderAdminDesignList();
  updateStats();

  // Clear form
  document.getElementById('dp-title').value = '';
  document.getElementById('dp-client').value = '';
  document.getElementById('dp-desc').value = '';
  document.getElementById('dpFilePreview').textContent = '';

  showAdminToast('Design project added!');
}

function renderAdminDesignList() {
  const el = document.getElementById('adminDesignList');
  if (!el) return;
  el.innerHTML = state.designProjects.map(p => `
    <div class="project-list-item">
      <div>
        <div class="project-list-title">${p.title}</div>
        <div class="project-list-meta">${p.category} · ${p.client}</div>
      </div>
      <button class="delete-btn" onclick="deleteDesignProject(${p.id})">🗑 Delete</button>
    </div>
  `).join('') || `<div class="empty-state mono">// No design projects yet.</div>`;
}

function deleteDesignProject(id) {
  if (!confirm('Delete this project?')) return;
  state.designProjects = state.designProjects.filter(p => p.id !== id);
  renderGallery();
  renderAdminDesignList();
  updateStats();
}

/* ──────────────────────────────────────────────────────────────
   ADMIN — NET PROJECTS
────────────────────────────────────────────────────────────── */
function addNetProject() {
  const title = document.getElementById('np-title').value.trim();
  const date  = document.getElementById('np-date').value;
  const tags  = document.getElementById('np-tags').value
    .split(',').map(t => t.trim()).filter(Boolean);
  const desc  = document.getElementById('np-desc').value.trim();

  if (!title) { alert('Project title is required.'); return; }

  const newProj = { id: Date.now(), title, date, tags, desc: desc || 'No description provided.' };
  state.netProjects.push(newProj);
  renderNetTimeline();
  renderAdminNetList();
  updateStats();

  document.getElementById('np-title').value = '';
  document.getElementById('np-date').value = '';
  document.getElementById('np-tags').value = '';
  document.getElementById('np-desc').value = '';
  document.getElementById('npFilePreview').textContent = '';

  showAdminToast('IT project added!');
}

function renderAdminNetList() {
  const el = document.getElementById('adminNetList');
  if (!el) return;
  el.innerHTML = state.netProjects.map(p => `
    <div class="project-list-item">
      <div>
        <div class="project-list-title">${p.title}</div>
        <div class="project-list-meta">${formatDate(p.date)} · ${p.tags.join(', ')}</div>
      </div>
      <button class="delete-btn" onclick="deleteNetProject(${p.id})">🗑 Delete</button>
    </div>
  `).join('') || `<div class="empty-state mono">// No IT projects yet.</div>`;
}

function deleteNetProject(id) {
  if (!confirm('Delete this project?')) return;
  state.netProjects = state.netProjects.filter(p => p.id !== id);
  renderNetTimeline();
  renderAdminNetList();
  updateStats();
}

/* ──────────────────────────────────────────────────────────────
   ADMIN — SKILLS
────────────────────────────────────────────────────────────── */
function addSkill() {
  const name     = document.getElementById('newSkillInput').value.trim();
  const category = document.getElementById('newSkillCategory').value;
  if (!name) return;
  state.skills.push({ name, category });
  document.getElementById('newSkillInput').value = '';
  renderSkillsPreview();
  updateStats();
  showAdminToast('Skill added!');
}

function renderSkillsPreview() {
  const el = document.getElementById('skillsPreview');
  if (!el) return;
  el.innerHTML = state.skills.map((s, i) => `
    <span class="skill-badge" style="cursor:pointer" onclick="removeSkill(${i})" title="Click to remove">
      ${s.name} <span style="color:var(--accent3);margin-left:4px">×</span>
    </span>
  `).join('');
}

function removeSkill(i) {
  state.skills.splice(i, 1);
  renderSkillsPreview();
  updateStats();
}

/* ──────────────────────────────────────────────────────────────
   ADMIN — INBOX
────────────────────────────────────────────────────────────── */
function updateInbox() {
  const reasonLabels = {
    design: 'Graphic Design',
    web: 'Web / UI Design',
    it: 'IT / Networking',
    job: 'Full-Time Opportunity'
  };

  const list = document.getElementById('inboxList');
  const recent = document.getElementById('recentMessages');

  const items = state.inbox.length
    ? state.inbox.slice().reverse().map(m => `
        <div class="inbox-item">
          <div class="inbox-header">
            <span class="inbox-name">${m.name}</span>
            <span class="inbox-time">${m.time}</span>
          </div>
          <div class="inbox-email">✉ ${m.email}</div>
          <span class="inbox-reason">${reasonLabels[m.reason] || m.reason}</span>
          <div class="inbox-msg">${m.message}</div>
        </div>
      `).join('')
    : `<div class="empty-state mono">// Inbox is empty. Messages will appear here.</div>`;

  if (list) list.innerHTML = items;

  if (recent) {
    recent.innerHTML = state.inbox.length
      ? state.inbox.slice(-3).reverse().map(m => `
          <div style="padding:0.75rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
            <div>
              <span style="font-weight:600;font-size:0.85rem;color:var(--white)">${m.name}</span>
              <span style="font-size:0.78rem;color:var(--text-muted);margin-left:0.75rem">${reasonLabels[m.reason] || ''}</span>
            </div>
            <span style="font-family:var(--font-mono);font-size:0.68rem;color:var(--text-muted)">${m.time}</span>
          </div>
        `).join('')
      : `<div class="empty-state mono">// No messages yet. Inbox is clear.</div>`;
  }
}

/* ──────────────────────────────────────────────────────────────
   FILE UPLOADS
────────────────────────────────────────────────────────────── */
function handleDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add('drag-over');
}

function handleDrop(e, prefix) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file) showFilePreview(file, prefix);
}

function handleFileSelect(e, prefix) {
  const file = e.target.files[0];
  if (file) showFilePreview(file, prefix);
}

function showFilePreview(file, prefix) {
  const el = document.getElementById(`${prefix}FilePreview`);
  if (!el) return;
  const size = (file.size / 1024).toFixed(1);
  el.textContent = `✓ ${file.name} (${size} KB)`;
}

function handleResumeUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  state.resumeBlob = URL.createObjectURL(file);
  document.getElementById('resumeStatus').style.display = 'block';
  showAdminToast('Resume uploaded! Download button is now active.');
}

/* ──────────────────────────────────────────────────────────────
   RESUME DOWNLOAD
────────────────────────────────────────────────────────────── */
function downloadResume() {
  if (state.resumeBlob) {
    const a = document.createElement('a');
    a.href = state.resumeBlob;
    a.download = 'Mohamed_Shiras_Resume.pdf';
    a.click();
  } else {
    // Demo: create a text-based placeholder
    const content = `Mohamed Shiras — Resume\n\n` +
      `Email: hajialimohamedshiras@gmail.com\n` +
      `Phone: +94 77 934 2223 / +94 78 682 4458\n` +
      `Location: Kandy, Sri Lanka\n\n` +
      `EDUCATION\n` +
      `— HND in Network Engineering, ESOFT Metro Campus (2023–Present)\n` +
      `— NVQ Level 4 in Graphic Designing, Polgolla (2022)\n` +
      `— Diploma in IT (2021)\n\n` +
      `SKILLS\n` +
      `Design: Adobe Photoshop, Illustrator, CorelDRAW, CMYK Pre-press\n` +
      `Networking: TCP/IP, Linux, Basic Networking Principles\n` +
      `Coding: HTML/CSS, C#, Python, Git\n\n` +
      `EXPERIENCE\n` +
      `— Graphic Designer @ Mobile Art & Print Shop\n` +
      `— Graphic Designer @ Nethra Printers`;
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Mohamed_Shiras_Resume.txt';
    a.click();
  }
}

/* ──────────────────────────────────────────────────────────────
   TOAST NOTIFICATION
────────────────────────────────────────────────────────────── */
function showAdminToast(msg) {
  const toast = document.createElement('div');
  toast.textContent = '✓ ' + msg;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    background: 'var(--accent)',
    color: 'var(--bg)',
    padding: '0.75rem 1.5rem',
    borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    fontWeight: '700',
    zIndex: '9999',
    boxShadow: '0 8px 30px rgba(0,212,200,0.3)',
    transition: 'opacity 0.4s ease',
  });
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; }, 2500);
  setTimeout(() => toast.remove(), 3000);
}

/* ──────────────────────────────────────────────────────────────
   INIT
────────────────────────────────────────────────────────────── */
function init() {
  renderGallery();
  renderNetTimeline();
  updateStats();

  // Admin: handle Enter on password
  const adminPassEl = document.getElementById('adminPass');
  if (adminPassEl) {
    adminPassEl.addEventListener('keydown', e => {
      if (e.key === 'Enter') adminLogin();
    });
  }

  // Skills: Enter key
  const skillInput = document.getElementById('newSkillInput');
  if (skillInput) {
    skillInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') addSkill();
    });
  }
}

document.addEventListener('DOMContentLoaded', init);
