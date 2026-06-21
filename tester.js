// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//  S3 Status Page â€” JavaScript
//  Membaca status dari URL eksternal (true/false)
//  dan menampilkan kondisi Server Object Storage S3
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const STATUS_URL = "https://raw.githubusercontent.com/adhamprojectteam/server/main/tester.json";
const REFRESH_INTERVAL = 1000; // 60 detik

let countdownTimer = null;
let countdownValue = 1;

async function fetchStatus() {
  try {
    const res = await fetch(STATUS_URL + "?_=" + Date.now(), {
      cache: "no-store"
    });
    const text = (await res.text()).trim().toLowerCase();
    const isOnline = text === "true";
    renderStatus(isOnline);
  } catch (e) {
    renderFetchError();
  }
}

function renderStatus(isOnline) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const dateStr = now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  // Hero section
  const heroEmoji = document.getElementById("heroEmoji");
  const heroTitle = document.getElementById("heroTitle");
  const heroDesc  = document.getElementById("heroDesc");
  const heroBadge = document.getElementById("heroBadge");
  const heroBadgeText = document.getElementById("heroBadgeText");
  const heroDot   = document.getElementById("heroDot");

  // Overall card
  const overallCard  = document.getElementById("overallCard");
  const overallIcon  = document.getElementById("overallIcon");
  const overallTitle = document.getElementById("overallTitle");
  const overallSub   = document.getElementById("overallSub");

  // Service card
  const serviceStatus  = document.getElementById("serviceStatus");
  const serviceLatency = document.getElementById("serviceLatency");
  const serviceChecked = document.getElementById("serviceChecked");

  // Uptime bar
  const uptimeBar  = document.getElementById("uptimeBar");
  const uptimePct  = document.getElementById("uptimePct");
  const uptimeText = document.getElementById("uptimeText");

  // Incident
  const incidentBox = document.getElementById("incidentBox");

  if (isOnline) {
    // â”€â”€ ONLINE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    heroEmoji.textContent = "âœ…";
    heroTitle.textContent = "Semua Sistem Normal";
    heroDesc.textContent  = "Server Object Storage S3 beroperasi penuh tanpa gangguan.";
    heroBadgeText.textContent = "Operasional";
    heroDot.style.background  = "#4ade80";
    heroDot.style.boxShadow   = "0 0 8px #4ade80";
    heroBadge.style.opacity   = "1";

    overallIcon.innerHTML       = '<i class="fa-solid fa-circle-check"></i>';
    overallIcon.dataset.state   = "ok";
    overallTitle.textContent    = "Semua Sistem Normal";
    overallTitle.dataset.state  = "ok";
    overallSub.textContent      = "Terakhir dicek: " + timeStr;

    serviceStatus.className     = "status-pill operational";
    serviceStatus.innerHTML     = '<span class="dot operational"></span> Normal';
    serviceLatency.textContent  = "Latensi: Optimal";
    serviceChecked.textContent  = timeStr + " Â· " + dateStr;

    uptimeBar.style.width       = "100%";
    uptimeBar.dataset.state     = "ok";
    uptimePct.textContent       = "100%";
    uptimePct.dataset.state     = "ok";
    uptimeText.textContent      = "Uptime 30 hari terakhir";

    incidentBox.innerHTML = `
      <div class="incident-empty">
        <i class="fa-solid fa-circle-check" style="color:var(--green);"></i>
        Tidak ada insiden aktif. Semua layanan berjalan normal.
      </div>`;

  } else {
    // â”€â”€ OFFLINE / GANGGUAN â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    heroEmoji.textContent = "ðŸš¨";
    heroTitle.textContent = "Gangguan Terdeteksi";
    heroDesc.textContent  = "Server Object Storage S3 sedang mengalami gangguan. Tim kami sedang menangani.";
    heroBadgeText.textContent = "Ada Gangguan Aktif";
    heroDot.style.background  = "#e53e3e";
    heroDot.style.boxShadow   = "0 0 8px #e53e3e";
    heroBadge.style.opacity   = "1";

    overallIcon.innerHTML       = '<i class="fa-solid fa-circle-xmark"></i>';
    overallIcon.dataset.state   = "down";
    overallTitle.textContent    = "Layanan Terganggu";
    overallTitle.dataset.state  = "down";
    overallSub.textContent      = "Terakhir dicek: " + timeStr;

    serviceStatus.className     = "status-pill down";
    serviceStatus.innerHTML     = '<span class="dot down"></span> Gangguan';
    serviceLatency.textContent  = "Latensi: Tidak tersedia";
    serviceChecked.textContent  = timeStr + " Â· " + dateStr;

    uptimeBar.style.width       = "72%";
    uptimeBar.dataset.state     = "down";
    uptimePct.textContent       = "72%";
    uptimePct.dataset.state     = "down";
    uptimeText.textContent      = "Uptime 30 hari terakhir";

    incidentBox.innerHTML = `
      <div class="incident-item">
        <div class="incident-item-header">
          <span class="incident-badge">ðŸ”´ Gangguan Aktif</span>
          <span class="incident-time">${timeStr}</span>
        </div>
        <div class="incident-item-title">Server Object Storage S3 mengalami gangguan</div>
        <div class="incident-item-desc">Layanan penyimpanan S3 sedang tidak dapat diakses. Tim teknis sedang menyelidiki dan memulihkan layanan sesegera mungkin. Mohon bersabar.</div>
      </div>`;
  }

  overallCard.style.opacity = "1";
  document.getElementById("lastUpdated").textContent = timeStr;

  // reset countdown
  resetCountdown();
}

function renderFetchError() {
  document.getElementById("heroEmoji").textContent = "â“";
  document.getElementById("heroTitle").textContent  = "Status Tidak Diketahui";
  document.getElementById("heroDesc").textContent   = "Gagal mengambil data status. Periksa koneksi internet kamu.";
  document.getElementById("lastUpdated").textContent = "Gagal memuat";
  resetCountdown();
}

function resetCountdown() {
  if (countdownTimer) clearInterval(countdownTimer);
  countdownValue = 1;
  updateCountdownUI();
  countdownTimer = setInterval(() => {
    countdownValue--;
    if (countdownValue < 0) countdownValue = 1;
    updateCountdownUI();
  }, 1000);
}

function updateCountdownUI() {
  const el = document.getElementById("countdown");
  if (el) el.textContent = countdownValue + "d";
}

// Init
fetchStatus();
setInterval(fetchStatus, REFRESH_INTERVAL);