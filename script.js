// Order State
let order = { classic: 0, spicy: 0, egg: 0 };

// Initialize on load
window.addEventListener('load', initAll);

function initAll() {
  // Hide loading screen
  setTimeout(() => {
    document.getElementById('loadingScreen').classList.add('hidden');
  }, 800);

  // Open/Closed Status
  updateBusinessStatus();

  // Welcome Popup
  setTimeout(() => {
    document.getElementById('welcome-popup').classList.add('show');
  }, 1200);
  setTimeout(() => {
    document.getElementById('welcome-popup').classList.remove('show');
  }, 5500);

  // Scroll Animation Observer
  setupScrollAnimations();
}

function updateBusinessStatus() {
  let h = new Date().getHours();
  let isOpen = h >= 7 && h < 20;
  document.getElementById('live-dot').style.background = isOpen ? "#2ecc71" : "#e74c3c";
  document.getElementById('live-text').innerText = isOpen ? "WE'RE OPEN!" : "CLOSED - BACK AT 7AM";
  
  let greeting = h < 11 ? "🌅 FRESH MORNING BATCH!" : h < 16 ? "☀️ LUNCH TIME SPECIAL!" : "🌙 DINNER TIME!";
  document.getElementById('time-header').innerText = greeting;
}

function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
  });
}

function updateQty(item, change) {
  order[item] = Math.max(0, order[item] + change);
  document.getElementById('qty-' + item).innerText = order[item];
  
  // Celebration confetti on add
  if (change > 0) {
    triggerMiniConfetti();
  }
  
  updateOrderSummary();
}

function updateOrderSummary() {
  let breakdown = '';
  let total = 0;

  if (order.classic > 0) {
    breakdown += `<div style="display:flex; justify-content:space-between; margin-bottom:8px;"><span>Classic Pastil (₱35) × ${order.classic}</span><span style="font-weight:700;">₱${order.classic * 35}</span></div>`;
    total += order.classic * 35;
  }
  if (order.spicy > 0) {
    breakdown += `<div style="display:flex; justify-content:space-between; margin-bottom:8px;"><span>Spicy Pastil (₱40) × ${order.spicy}</span><span style="font-weight:700;">₱${order.spicy * 40}</span></div>`;
    total += order.spicy * 40;
  }
  if (order.egg > 0) {
    breakdown += `<div style="display:flex; justify-content:space-between; margin-bottom:8px;"><span>Pastil w/ Egg (₱45) × ${order.egg}</span><span style="font-weight:700;">₱${order.egg * 45}</span></div>`;
    total += order.egg * 45;
  }

  if (total > 0) {
    breakdown += `<hr style="border:0; border-top:1px dashed rgba(255,255,255,0.3); margin:10px 0;">`;
  }

  document.getElementById('order-breakdown').innerHTML = breakdown;
  document.getElementById('grand-total').innerText = total;
}

function copyOrder() {
  let orderText = `🍛 CHICKEN PASTIL HOUSE - ORDER\n`;
  orderText += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  if (order.classic > 0) orderText += `▪️ Classic Pastil × ${order.classic} = ₱${order.classic * 35}\n`;
  if (order.spicy > 0) orderText += `▪️ Spicy Pastil × ${order.spicy} = ₱${order.spicy * 40}\n`;
  if (order.egg > 0) orderText += `▪️ Pastil w/ Egg × ${order.egg} = ₱${order.egg * 45}\n`;
  orderText += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  orderText += `💰 TOTAL: ₱${document.getElementById('grand-total').innerText}\n\n`;
  orderText += `📍 P1 Bololo, Guinobatan\n📞 09664562634`;

  navigator.clipboard.writeText(orderText).then(() => {
    const btn = document.getElementById('copyOrderBtn');
    btn.innerHTML = '<i class="fas fa-check-circle"></i> ORDER COPIED!';
    btn.classList.add('clicked');
    
    // Big celebration confetti!
    triggerBigConfetti();
    
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-clipboard-list"></i> COPY ORDER LIST';
      btn.classList.remove('clicked');
    }, 3000);
  });
}

function navigateTo(page) {
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  document.getElementById(page).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
  document.getElementById('link-' + page).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function tuneSpice() {
  let level = document.getElementById('heatRange').value;
  let labels = [
    "Standard Kick 🔥",
    "Local Heat 🔥🔥",
    "Sweaty Spice! 🔥🔥🔥",
    "Fire Mouth! 🔥🔥🔥🔥",
    "PINAKASILYO! 🔥🔥🔥🔥🔥"
  ];
  document.getElementById('heat-desc').innerText = labels[level - 1];
  
  // Update heat indicators
  for (let i = 1; i <= 5; i++) {
    let icon = document.getElementById('heat-' + i);
    icon.classList.toggle('active', i <= level);
  }
  
  // Shake effect at max
  let card = document.getElementById('spicy-card');
  if (level == 5) {
    card.classList.add('shaking');
  } else {
    card.classList.remove('shaking');
  }
}

function copyGcash() {
  navigator.clipboard.writeText("09664562634").then(() => {
    const btn = event.target.closest('.action-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check-circle"></i> GCASH NUMBER COPIED!';
    btn.classList.add('clicked');
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove('clicked');
    }, 2500);
  });
}

// Confetti Functions
function triggerMiniConfetti() {
  confetti({
    particleCount: 30,
    spread: 40,
    origin: { y: 0.6 },
    colors: ['#e67e22', '#d35400', '#ff4d00']
  });
}

function triggerBigConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#e67e22', '#d35400', '#ff4d00', '#FFB800']
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#e67e22', '#d35400', '#ff4d00', '#FFB800']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Update status every minute
setInterval(updateBusinessStatus, 60000);