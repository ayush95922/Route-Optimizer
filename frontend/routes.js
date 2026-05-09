// SmartRoute — Routes Page Logic

if (typeof API === 'undefined') {
  var API = 'http://localhost:8080/api';
}

// Indore locations with real coordinates
const LOCATIONS = [
  { name: 'Airport',          lat: 22.7217, lon: 75.8013, busStop: 'Airport Stop' },
  { name: 'Bengali Square',   lat: 22.7557, lon: 75.8769, busStop: 'Bengali Square Stop' },
  { name: 'Rajwada',          lat: 22.7196, lon: 75.8577, busStop: 'Rajwada Bus Stand' },
  { name: 'Vijay Nagar',      lat: 22.7512, lon: 75.8951, busStop: 'Vijay Nagar Stop' },
  { name: 'Palasia',          lat: 22.7277, lon: 75.8677, busStop: 'Palasia Stop' },
  { name: 'MG Road',          lat: 22.7246, lon: 75.8747, busStop: 'MG Road Stop' },
  { name: 'Bhawarkuan',       lat: 22.7095, lon: 75.8576, busStop: 'Bhawarkuan Stop' },
  { name: 'Pardesipura',      lat: 22.7421, lon: 75.8654, busStop: 'Pardesipura Stop' },
  { name: 'Super Corridor',   lat: 22.7826, lon: 75.9015, busStop: 'Super Corridor Stop' },
  { name: 'Rau',              lat: 22.6776, lon: 75.8150, busStop: 'Rau Stop' },
  { name: 'Geeta Bhawan',     lat: 22.7334, lon: 75.8847, busStop: 'Geeta Bhawan Stop' },
  { name: 'Khajrana',         lat: 22.7389, lon: 75.9102, busStop: 'Khajrana Stop' },
];

let map = null;
let currentPolyline = null;
let activeCriteria = 'fastest';

// ── Populate dropdowns ───────────────────────────────────────────────────────
function populateDropdowns() {
  const originSel = document.getElementById('origin');
  const destSel   = document.getElementById('destination');
  LOCATIONS.forEach(loc => {
    originSel.innerHTML += `<option value="${loc.name}">${loc.name}</option>`;
    destSel.innerHTML   += `<option value="${loc.name}">${loc.name}</option>`;
  });
  originSel.value = 'Airport';
  destSel.value   = 'Bengali Square';
}

// ── Swap locations ───────────────────────────────────────────────────────────
function swapLocations() {
  const o = document.getElementById('origin');
  const d = document.getElementById('destination');
  [o.value, d.value] = [d.value, o.value];
}

// ── Criteria pill selector ───────────────────────────────────────────────────
function setCriteria(c) {
  activeCriteria = c;
  document.querySelectorAll('.criteria-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.c === c);
    btn.classList.toggle('bg-[#0f2027]', btn.dataset.c === c);
    btn.classList.toggle('text-white', btn.dataset.c === c);
    btn.classList.toggle('border-transparent', btn.dataset.c === c);
    btn.classList.toggle('border-gray-200', btn.dataset.c !== c);
    btn.classList.toggle('text-gray-600', btn.dataset.c !== c);
  });
  document.getElementById('optimizeBy').value = c;
}

// ── Haversine distance (km) ──────────────────────────────────────────────────
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// ── Compute all 4 mode results ───────────────────────────────────────────────
function computeModes(origin, dest) {
  const dist = haversine(origin.lat, origin.lon, dest.lat, dest.lon);
  const d = Math.round(dist * 100) / 100;

  return [
    {
      mode: 'Bus',
      icon: '🚌',
      color: '#64748b',
      iconColor: '#475569',
      label: 'Local Bus',
      sub: origin.busStop,
      drop: dest.busStop,
      steps: [`Board: ${origin.busStop}`, `Drop: ${dest.busStop}`],
      time: Math.round(d * 2.5 + 8),    // ~25 km/h + stops
      cost: Math.max(10, Math.round(d * 1.8)),
      dist: d,
      co2: Math.round(d * 0.059 * 100) / 100,   // 59 g/km bus
      tags: [],
    },
    {
      mode: 'Walking',
      icon: '🚶',
      color: '#0891b2',
      iconColor: '#0891b2',
      label: '',
      steps: [`Start at ${origin.name}`, `Walk towards ${dest.name}`, `Reach ${dest.name}`],
      time: Math.round(d * 12),   // ~5 km/h
      cost: 0,
      dist: d,
      co2: 0,
      tags: ['ECO-FRIENDLY'],
    },
    {
      mode: 'Cycling',
      icon: '🚴',
      color: '#d97706',
      iconColor: '#d97706',
      label: '',
      steps: [`Start at ${origin.name}`, 'Take main road', `Reach ${dest.name}`],
      time: Math.round(d * 4),    // ~15 km/h
      cost: 0,
      dist: d,
      co2: 0,
      tags: ['SHORTEST'],
    },
    {
      mode: 'Car',
      icon: '🚗',
      color: '#0f2027',
      iconColor: '#0f2027',
      label: '',
      steps: [`Drive from ${origin.name}`, 'Take main arterial road', `Reach ${dest.name}`],
      time: Math.round(d * 1.5 + 5),  // ~40 km/h city
      cost: Math.round(d * 6.1),      // ~₹6/km fuel
      dist: Math.round(d * 1.15 * 100)/100, // road vs straight line
      co2: Math.round(d * 1.15 * 167 / 1000 * 100) / 100,  // 167 g/km car
      tags: ['FASTEST'],
    },
  ];
}

// ── Recommended mode based on criteria ──────────────────────────────────────
function getRecommended(modes, criteria) {
  if (criteria === 'fastest')  return modes.reduce((a,b) => a.time < b.time ? a : b);
  if (criteria === 'cheapest') return modes.reduce((a,b) => a.cost < b.cost ? a : b);
  if (criteria === 'eco')      return modes.reduce((a,b) => a.co2  < b.co2  ? a : b);
  if (criteria === 'shortest') return modes.reduce((a,b) => a.dist < b.dist ? a : b);
  return modes[0];
}

// ── Render map ───────────────────────────────────────────────────────────────
function renderMap(origin, dest) {
  if (!map) {
    map = L.map('map', { zoomControl: true }).setView(
      [(origin.lat + dest.lat)/2, (origin.lon + dest.lon)/2], 12
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org">OpenStreetMap</a>'
    }).addTo(map);
  } else {
    map.setView([(origin.lat + dest.lat)/2, (origin.lon + dest.lon)/2], 12);
    if (currentPolyline) map.removeLayer(currentPolyline);
  }

  // Origin marker
  L.circleMarker([origin.lat, origin.lon], {
    radius: 8, fillColor: '#22c55e', color: 'white', weight: 2, fillOpacity: 1
  }).addTo(map).bindPopup(`<b>From: ${origin.name}</b>`);

  // Dest marker
  L.circleMarker([dest.lat, dest.lon], {
    radius: 8, fillColor: '#0f2027', color: 'white', weight: 2, fillOpacity: 1
  }).addTo(map).bindPopup(`<b>To: ${dest.name}</b>`);

  // Route line
  currentPolyline = L.polyline([
    [origin.lat, origin.lon], [dest.lat, dest.lon]
  ], { color: '#22c55e', weight: 4, opacity: 0.8, dashArray: null }).addTo(map);

  map.fitBounds([[origin.lat, origin.lon],[dest.lat, dest.lon]], { padding: [40,40] });
}

// ── Render recommended card ──────────────────────────────────────────────────
function renderRecommended(rec, criteria) {
  const labels = { fastest:'OPTIMIZED FOR FASTEST', cheapest:'OPTIMIZED FOR CHEAPEST',
                   eco:'OPTIMIZED FOR ECO-FRIENDLY', shortest:'OPTIMIZED FOR SHORTEST' };
  document.getElementById('recOptLabel').textContent = labels[criteria] || 'RECOMMENDED';
  document.getElementById('recTitle').textContent    = `Take the ${rec.mode}`;
  document.getElementById('recSubtitle').textContent = rec.label || `Best for ${criteria}`;
  document.getElementById('recTime').textContent  = rec.time + ' min';
  document.getElementById('recCost').textContent  = rec.cost > 0 ? '₹' + rec.cost : '₹0';
  document.getElementById('recDist').textContent  = rec.dist + ' km';
  document.getElementById('recCO2').textContent   = rec.co2 + ' kg CO₂';
}

// ── Render mode cards ────────────────────────────────────────────────────────
function renderModeCards(modes, recMode) {
  const container = document.getElementById('modeCards');
  container.innerHTML = '';

  modes.forEach(m => {
    const isRec = m.mode === recMode.mode;
    const tagHTML = m.tags.map(t =>
      `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${t==='ECO-FRIENDLY'?'bg-green-100 text-green-600':t==='FASTEST'?'bg-blue-100 text-blue-600':'bg-amber-100 text-amber-600'}">${t}</span>`
    ).join('');

    const stepsHTML = m.steps.map((s,i) =>
      `<div class="flex gap-2 text-xs text-gray-600">
        <span class="text-green-500 font-bold mt-0.5">${i+1}</span>
        <span>${s}</span>
      </div>`
    ).join('');

    container.innerHTML += `
      <div class="mode-card bg-white rounded-2xl p-5 shadow-sm ${isRec ? 'recommended border-2 border-green-500' : ''} relative">
        ${isRec ? `<div class="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"><span>⭐</span> RECOMMENDED</div>` : ''}
        <div class="flex items-center justify-between mb-3">
          <div class="text-2xl">${m.icon}</div>
          <div class="flex gap-1">${tagHTML}</div>
        </div>
        <div class="font-black text-[#0f2027] text-xl mb-0.5">${m.mode}</div>
        ${m.label ? `<div class="text-green-500 text-xs font-semibold mb-3">${m.label}</div>` : '<div class="mb-3"></div>'}
        <div class="space-y-1.5 mb-4">${stepsHTML}</div>
        <div class="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
          <div>
            <div class="text-[10px] text-gray-400 font-bold tracking-widest">TIME</div>
            <div class="text-sm font-bold text-[#0f2027] flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              ${m.time} min
            </div>
          </div>
          <div>
            <div class="text-[10px] text-gray-400 font-bold tracking-widest">DISTANCE</div>
            <div class="text-sm font-bold text-[#0f2027] flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/></svg>
              ${m.dist} km
            </div>
          </div>
          <div>
            <div class="text-[10px] text-gray-400 font-bold tracking-widest">COST</div>
            <div class="text-sm font-bold text-[#0f2027] flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              ₹${m.cost}
            </div>
          </div>
          <div>
            <div class="text-[10px] text-gray-400 font-bold tracking-widest">CO₂</div>
            <div class="text-sm font-bold text-green-600 flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>
              ${m.co2} kg
            </div>
          </div>
        </div>
      </div>`;
  });
}

// ── Carbon savings banner ────────────────────────────────────────────────────
function updateCarbonBanner(modes, rec) {
  const car = modes.find(m => m.mode === 'Car');
  const saved = car ? Math.max(0, car.co2 - rec.co2) : 0;
  document.getElementById('carbonText').textContent =
    `You save ${saved.toFixed(2)} kg CO₂ by choosing ${rec.mode} over Car`;
}

// ── Main compare function ────────────────────────────────────────────────────
async function compareRoutes() {
  const originName = document.getElementById('origin').value;
  const destName   = document.getElementById('destination').value;

  if (!originName || !destName) { alert('Please select origin and destination'); return; }
  if (originName === destName)  { alert('Origin and destination must be different'); return; }

  const origin = LOCATIONS.find(l => l.name === originName);
  const dest   = LOCATIONS.find(l => l.name === destName);

  // Try backend first, fall back to client-side calculation
  let modes;
  try {
    const res = await fetch(`${API}/routes/compare?from=${encodeURIComponent(originName)}&to=${encodeURIComponent(destName)}&criteria=${activeCriteria}`);
    if (res.ok) modes = await res.json();
    else throw new Error('API error');
  } catch {
    modes = computeModes(origin, dest);
  }

  const rec = getRecommended(modes, activeCriteria);

  // Show results
  document.getElementById('results').classList.remove('hidden');

  renderMap(origin, dest);
  renderRecommended(rec, activeCriteria);
  renderModeCards(modes, rec);
  updateCarbonBanner(modes, rec);

  // Scroll to results
  document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Save trip if user logged in
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (user && rec.co2 === 0) {
    // eco trip — save to backend
    try {
      await fetch(`${API}/trips`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId:  user.id || user.email,
          from:    originName,
          to:      destName,
          mode:    rec.mode,
          co2Saved: modes.find(m=>m.mode==='Car')?.co2 || 0,
          distance: rec.dist,
          cost:     rec.cost,
        })
      });
    } catch { /* backend offline — no-op */ }
  }
}

// ── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  populateDropdowns();

  // Sync pill from dropdown
  document.getElementById('optimizeBy').addEventListener('change', e => {
    setCriteria(e.target.value);
  });

  // Set initial active pill
  setCriteria('fastest');
});
