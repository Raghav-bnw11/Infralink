// Base URL for API - adjust if your backend runs elsewhere
const API_BASE = 'http://127.0.0.1:5000/api';

function statusBadgeClass(status) {
  if (status === 'Active') return 'badge-status badge text-white badge-active';
  if (status === 'Completed') return 'badge-status badge text-white badge-completed';
  if (status === 'Delayed') return 'badge-status badge text-white badge-delayed';
  return 'badge bg-secondary';
}

// Load projects into dashboard table
async function loadProjects() {
  const tbody = document.getElementById('projectsTableBody');
  if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Loading projects...</td></tr>';
  try {
    const res = await fetch(`${API_BASE}/projects`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('Invalid response');
    if (data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No projects found.</td></tr>';
      return;
    }
    tbody.innerHTML = data.map(p => `
      <tr>
        <td>${p.name}</td>
        <td><span class="${statusBadgeClass(p.status)}">${p.status}</span></td>
        <td>${p.start_date}</td>
        <td>${p.end_date || '-'}</td>
        <td>
          <div class="progress" style="height: 8px;">
            <div class="progress-bar" role="progressbar" style="width: ${p.progress}%" aria-valuenow="${p.progress}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <small class="text-muted">${p.progress}%</small>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-danger text-center">Failed to load projects: ${err.message}</td></tr>`;
  }
}

// Load updates list
async function loadUpdates() {
  const container = document.getElementById('updatesList');
  if (!container) return;
  container.innerHTML = '<div class="text-muted text-center">Loading updates...</div>';
  try {
    const res = await fetch(`${API_BASE}/updates`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('Invalid response');
    if (data.length === 0) {
      container.innerHTML = '<div class="text-center text-muted">No updates available.</div>';
      return;
    }
    container.innerHTML = data.map(u => `
      <div class="col-12 col-md-6">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
              <h5 class="card-title mb-2">${u.project_name}</h5>
              <span class="badge bg-secondary">${new Date(u.timestamp).toLocaleString()}</span>
            </div>
            <p class="card-text">${u.update_text}</p>
          </div>
        </div>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = `<div class="text-danger text-center">Failed to load updates: ${err.message}</div>`;
  }
}

// Wire the feedback form submission
function wireFeedbackForm() {
  const form = document.getElementById('feedbackForm');
  const msg = document.getElementById('feedbackMsg');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';
    const payload = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      feedback: document.getElementById('feedback').value.trim()
    };
    if (!payload.name || !payload.email || !payload.feedback) {
      msg.className = 'text-danger';
      msg.textContent = 'Please fill in all fields.';
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Request failed');
      msg.className = 'text-success';
      msg.textContent = 'Thank you! Your feedback has been submitted.';
      form.reset();
    } catch (err) {
      msg.className = 'text-danger';
      msg.textContent = `Submission failed: ${err.message}`;
    }
  });
}

// Expose functions globally for inline scripts
window.loadProjects = loadProjects;
window.loadUpdates = loadUpdates;
window.wireFeedbackForm = wireFeedbackForm;


