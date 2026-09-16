(function () {
  // Load thư viện bắn pháo hoa
  if (!window.confetti) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
    document.head.appendChild(script);
  }

  const observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      for (let node of mutation.addedNodes) {
        if (node.classList && (node.classList.contains('medium-zoom-overlay') || node.classList.contains('medium-zoom-image--opened'))) {
          setTimeout(() => {
            showVNDialog();
          }, 1000);
        }
      }
      for (let node of mutation.removedNodes) {
        if (node.classList && node.classList.contains('medium-zoom-overlay')) {
          removeVNDialog();
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();

// ================= Web Audio API (Tạo âm thanh) =================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 1. Tiếng tít tít gõ chữ Visual Novel
function playTextBeep() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'sine';
  // Tần số âm thanh vừa phải, tạo cảm giác retro
  osc.frequency.setValueAtTime(600, audioCtx.currentTime);

  gain.gain.setValueAtTime(0.03, audioCtx.currentTime); // Âm lượng nhẹ nhàng
  gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.04);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.04);
}

// 2. Tiếng hiệu ứng chúc mừng Fanfare khi chọn đúng (Tụ hợp hợp âm vui tươi)
function playVictorySound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const notes = [523.25, 659.25, 783.99, 1046.50]; // Hợp âm Đô Trưởng (C5, E5, G5, C6)
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    }, idx * 100);
  });
}

// ================= Hiệu ứng gõ chữ + Âm thanh =================
function typeWriter(element, text, speed = 35, callback = null) {
  element.innerHTML = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      const char = text.charAt(i);
      element.innerHTML += char;
      
      // Phát tiếng tít nếu ký tự không phải là khoảng trắng
      if (char.trim() !== '') {
        playTextBeep();
      }
      
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

// Bắn pháo hoa
function triggerFireworks() {
  if (typeof confetti !== 'function') return;

  const count = 200;
  const defaults = { origin: { y: 0.7 } };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      zIndex: 9999999999
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

function showVNDialog() {
  if (document.getElementById('vn-avatar-dialog')) return;

  const dialog = document.createElement('div');
  dialog.id = 'vn-avatar-dialog';
  
  dialog.setAttribute('style', `
    position: fixed !important;
    bottom: 40px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    z-index: 999999999 !important;
    width: 90% !important;
    max-width: 600px !important;
    background-color: rgba(15, 23, 42, 0.95) !important;
    border: 2px solid #6366f1 !important;
    border-radius: 16px !important;
    padding: 20px 24px !important;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5) !important;
    font-family: inherit !important;
    color: #ffffff !important;
    box-sizing: border-box !important;
  `);

  dialog.innerHTML = `
    <style>
      @keyframes vnShake {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        20%, 60% { transform: translateX(calc(-50% - 12px)) translateY(0); }
        40%, 80% { transform: translateX(calc(-50% + 12px)) translateY(0); }
      }
      .vn-shake-effect { animation: vnShake 0.3s ease-in-out !important; }
    </style>
    
    <div id="vn-title" style="font-size: 13px; font-weight: 700; color: #818cf8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; height: 18px;"></div>
    <p id="vn-text" style="font-size: 16px; font-weight: 500; margin: 0 0 16px 0; color: #f1f5f9; line-height: 1.5; min-height: 24px;"></p>
    
    <div id="vn-actions" style="display: flex; gap: 12px; justify-content: flex-end; align-items: center; position: relative; opacity: 0; transition: opacity 0.3s ease;">
      <div id="vn-wrong-badge" style="display: none; position: absolute; left: 0; color: #ef4444; font-weight: 700; font-size: 13px; background: rgba(69, 10, 10, 0.9); border: 1px solid #ef4444; padding: 6px 12px; border-radius: 6px;"></div>

      <button id="vn-btn-wrong" style="padding: 8px 18px; font-size: 14px; font-weight: 600; border-radius: 8px; background: #1e293b; color: #cbd5e1; border: 1px solid #334155; cursor: pointer; transition: all 0.2s;">
        Xấu trai
      </button>

      <button id="vn-btn-right" style="padding: 8px 18px; font-size: 14px; font-weight: 600; border-radius: 8px; background: #4f46e5; color: #ffffff; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4); transition: all 0.2s;">
        Đẹp trai
      </button>
    </div>
  `;

  document.body.appendChild(dialog);

  const titleEl = document.getElementById('vn-title');
  const textEl = document.getElementById('vn-text');
  const actionsEl = document.getElementById('vn-actions');
  const btnWrong = document.getElementById('vn-btn-wrong');
  const btnRight = document.getElementById('vn-btn-right');
  const wrongBadge = document.getElementById('vn-wrong-badge');

  typeWriter(titleEl, 'SYSTEM PROMPT', 30, () => {
    typeWriter(textEl, 'Thấy anh này đẹp trai không?', 35, () => {
      actionsEl.style.opacity = '1';
    });
  });

  btnWrong.addEventListener('click', (e) => {
    e.stopPropagation();
    dialog.style.borderColor = '#ef4444';
    dialog.classList.add('vn-shake-effect');
    
    wrongBadge.style.display = 'block';
    typeWriter(wrongBadge, 'Sai lè lè! Chọn lại!', 25);

    setTimeout(() => {
      dialog.classList.remove('vn-shake-effect');
    }, 300);
  });

  btnRight.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // 1. Phát âm thanh chúc mừng chiến thắng!
    playVictorySound();

    // 2. Bắn pháo hoa rực rỡ
    triggerFireworks();

    actionsEl.style.opacity = '0';
    dialog.style.borderColor = '#22c55e';

    setTimeout(() => {
      titleEl.style.color = '#4ade80';
      typeWriter(titleEl, 'CHUẨN KHÔNG CẦN CHỈNH', 30);
      typeWriter(textEl, 'Quá chuẩn ní ơi, tinh mắt đấy!', 35, () => {
        setTimeout(() => {
          removeVNDialog();
          const overlay = document.querySelector('.medium-zoom-overlay');
          if (overlay) overlay.click();
        }, 1500);
      });
    }, 200);
  });
}

function removeVNDialog() {
  const dialog = document.getElementById('vn-avatar-dialog');
  if (dialog) dialog.remove();
}