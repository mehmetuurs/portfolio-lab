// ── TERMINAL ANIMATION ──
const lines = [
  { text: '$ whoami', color: 'green', delay: 300 },
  { text: 'mehmet_surmeli @ vizja-university', color: 'text', delay: 800 },
  { text: '', delay: 1100 },
  { text: '$ cat skills.txt', color: 'green', delay: 1300 },
  { text: '→ Network Security · TLS/SSL · IPSec VPN', color: 'blue', delay: 1800 },
  { text: '→ Docker · Nginx · OpenSSL · strongSwan', color: 'blue', delay: 2100 },
  { text: '→ Cisco Packet Tracer · Wireshark/TShark', color: 'blue', delay: 2400 },
  { text: '', delay: 2700 },
  { text: '$ openssl req -x509 -newkey rsa:4096 \\', color: 'green', delay: 2900 },
  { text: '  -keyout nginx.private.key -out nginx.crt \\', color: 'dim', delay: 3100 },
  { text: '  -days 365 -nodes', color: 'dim', delay: 3200 },
  { text: 'Generating a RSA private key ...', color: 'yellow', delay: 3600 },
  { text: 'writing new private key to \'nginx.private.key\'', color: 'yellow', delay: 4000 },
  { text: '', delay: 4400 },
  { text: '$ docker compose up -d', color: 'green', delay: 4600 },
  { text: '[+] Running 1/1', color: 'dim', delay: 5100 },
  { text: ' ✔ Container nginx-web-server  Started', color: 'green', delay: 5300 },
  { text: '', delay: 5600 },
  { text: '$ curl -k https://localhost | head -3', color: 'green', delay: 5800 },
  { text: '<!DOCTYPE html>', color: 'text', delay: 6300 },
  { text: '<html>  <!-- HTTPS is working! -->', color: 'text', delay: 6500 },
  { text: '', delay: 6800 },
  { text: '$ _', color: 'green', delay: 7000, cursor: true },
];

const output = document.getElementById('terminal-output');

function renderLine(line) {
  const el = document.createElement('div');
  if (line.cursor) {
    el.innerHTML = `<span class="t-${line.color || 'text'}">${line.text.slice(0, -1)}</span><span class="cursor"></span>`;
  } else {
    el.innerHTML = `<span class="t-${line.color || 'text'}">${escapeHtml(line.text)}</span>`;
  }
  output.appendChild(el);
  output.scrollTop = output.scrollHeight;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

lines.forEach(line => {
  setTimeout(() => renderLine(line), line.delay);
});

// ── SCROLL ANIMATIONS ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        bar.style.width = bar.getAttribute('data-width') || bar.style.width;
      });
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.lab-card, .other-card, .hs-step, .about-grid, .comparison-table').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Save skill bar widths as data attributes
document.querySelectorAll('.bar-fill').forEach(bar => {
  bar.setAttribute('data-width', bar.style.width);
  bar.style.width = '0';
});

// Trigger skill bars on scroll
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        setTimeout(() => {
          bar.style.width = bar.getAttribute('data-width');
        }, 100);
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-panel').forEach(el => skillsObserver.observe(el));

// ── HANDSHAKE STEP HOVER ──
document.querySelectorAll('.hs-step').forEach(step => {
  step.addEventListener('mouseenter', () => {
    document.querySelectorAll('.hs-step').forEach(s => s.classList.remove('active'));
    step.classList.add('active');
  });
});
