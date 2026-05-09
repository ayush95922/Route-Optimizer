// SmartRoute — Champions Page Logic

if (typeof API === 'undefined') {
  var API = 'http://localhost:8080/api';
}

// Fallback demo data (matches screenshot exactly)
const DEMO_CHAMPIONS = [
  { rank:1, name:'Aarav Mehta',   co2Saved:74.4, ecoTrips:248, medal:'🥇', color:'#f59e0b' },
  { rank:2, name:'Priya Sharma',  co2Saved:58.5, ecoTrips:195, medal:'🥈', color:'#94a3b8' },
  { rank:3, name:'Rohan Patel',   co2Saved:48.6, ecoTrips:162, medal:'🥉', color:'#d97706' },
  { rank:4, name:'Anaya Verma',   co2Saved:40.2, ecoTrips:134 },
  { rank:5, name:'Kabir Joshi',   co2Saved:36.3, ecoTrips:121 },
  { rank:6, name:'Ishita Roy',    co2Saved:29.4, ecoTrips:98  },
  { rank:7, name:'Vedant Singh',  co2Saved:24.8, ecoTrips:83  },
  { rank:8, name:'Meera Tiwari',  co2Saved:21.1, ecoTrips:70  },
  { rank:9, name:'Arjun Sharma',  co2Saved:18.7, ecoTrips:62  },
  { rank:10,name:'Kavya Nair',    co2Saved:15.2, ecoTrips:51  },
];

// ── Render top 3 podium ──────────────────────────────────────────────────────
function renderTop3(champions) {
  const top3 = champions.slice(0, 3);
  const container = document.getElementById('top3Cards');

  // Reorder: 2nd, 1st, 3rd (podium layout — but screenshot shows 2,1,3 left-to-right)
  const order = [top3[1], top3[0], top3[2]]; // 2nd | 1st | 3rd

  container.innerHTML = '';
  order.forEach((c, idx) => {
    if (!c) return;
    const isFirst = c.rank === 1;
    container.innerHTML += `
      <div class="champ-card bg-white rounded-2xl p-7 shadow-sm border-2 ${isFirst ? 'border-green-400' : 'border-gray-100'} relative" style="animation-delay:${idx*0.1}s">
        <div class="flex items-start justify-between mb-6">
          <div class="w-10 h-10 ${c.rank===1?'text-amber-400':'text-gray-300'} flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="${c.rank<=3?'currentColor':'none'}" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div class="w-8 h-8 rounded-full flex items-center justify-center font-black text-white text-sm" style="background:${c.medal==='🥇'?'#f59e0b':c.medal==='🥈'?'#94a3b8':'#d97706'}">${c.rank}</div>
        </div>
        <h3 class="text-2xl font-black text-[#0f2027] mb-4">${c.name}</h3>
        <div class="text-5xl font-black text-green-500 leading-none">${c.co2Saved}</div>
        <div class="text-sm text-gray-400 font-semibold mt-1">kg CO₂ saved</div>
        <div class="text-sm text-gray-500 mt-3 font-semibold">${c.ecoTrips} ECO TRIPS</div>
      </div>`;
  });
}

// ── Render table rows (rank 4+) ──────────────────────────────────────────────
function renderTable(champions) {
  const tbody = document.getElementById('leaderTable');
  tbody.innerHTML = '';

  champions.slice(3).forEach((c, idx) => {
    tbody.innerHTML += `
      <tr class="border-b border-gray-50 hover:bg-gray-50 transition">
        <td class="px-6 py-4 text-sm font-bold text-gray-400">#${c.rank}</td>
        <td class="px-6 py-4 text-sm font-bold text-[#0f2027]">${c.name}</td>
        <td class="px-6 py-4 text-sm text-gray-500">
          <span class="font-semibold text-[#0f2027]">${c.ecoTrips}</span> trips
        </td>
        <td class="px-6 py-4 text-right">
          <span class="text-green-600 font-bold text-sm flex items-center justify-end gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>
            ${c.co2Saved} kg
          </span>
        </td>
      </tr>`;
  });
}

// ── Load champions from backend or use demo data ─────────────────────────────
async function loadChampions() {
  let champions = DEMO_CHAMPIONS;
  try {
    const res = await fetch(`${API}/champions`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        champions = data.map((c, i) => ({ ...c, rank: i+1 }));
      }
    }
  } catch { /* use demo data */ }

  renderTop3(champions);
  renderTable(champions);
}

// ── Highlight logged-in user ─────────────────────────────────────────────────
function highlightCurrentUser(champions) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) return;
  const rows = document.querySelectorAll('#leaderTable tr');
  rows.forEach(row => {
    if (row.textContent.includes(user.name || user.username || '')) {
      row.classList.add('bg-green-50', '!important');
    }
  });
}

// ── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  await loadChampions();
  highlightCurrentUser(DEMO_CHAMPIONS);
});
