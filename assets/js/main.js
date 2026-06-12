/* =========================================
   NAVBAR — sombra ao rolar
========================================= */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* =========================================
   MENU MOBILE
========================================= */
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');
const cta    = document.getElementById('navCta');

toggle.addEventListener('click', () => {
  const open = toggle.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  links.classList.toggle('open', open);
  cta.classList.toggle('open', open);
});

links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    links.classList.remove('open');
    cta.classList.remove('open');
  });
});

/* =========================================
   SCROLL REVEAL
========================================= */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('visible'));
});

/* =========================================
   BACK TO TOP
========================================= */
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* =========================================
   FORMULÁRIO DE PARCERIA → WHATSAPP
========================================= */
const NUMERO_WA = '5585981020702';

document.getElementById('parceriaForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome     = this.nome.value.trim();
  const empresa  = this.empresa.value.trim();
  const cidade   = this.cidade.value.trim();
  const whatsapp = this.whatsapp.value.trim();
  const observacao = this.observacao.value.trim();

  // Limpa erros anteriores
  clearErrors();

  // Valida campos obrigatórios
  let valid = true;
  if (!nome)     { showError('err-nome',     'p-nome',     'Por favor, informe seu nome.'); valid = false; }
  if (!empresa)  { showError('err-empresa',  'p-empresa',  'Informe o nome da empresa ou clínica.'); valid = false; }
  if (!cidade)   { showError('err-cidade',   'p-cidade',   'Informe a cidade e o estado.'); valid = false; }
  if (!whatsapp) { showError('err-whatsapp', 'p-whatsapp', 'Informe seu WhatsApp.'); valid = false; }

  if (!valid) return;

  const mensagem =
    `Olá! Tenho interesse em fechar uma parceria com a GESTARE.\n\n` +
    `*Nome:* ${nome}\n` +
    `*Empresa/Clínica:* ${empresa}\n` +
    `*Cidade/Estado:* ${cidade}\n` +
    `*WhatsApp:* ${whatsapp}` +
    (observacao ? `\n*Mensagem:* ${observacao}` : '');

  const url = `https://wa.me/${NUMERO_WA}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
});

function showError(errId, inputId, msg) {
  const errEl   = document.getElementById(errId);
  const inputEl = document.getElementById(inputId);
  if (errEl)   errEl.textContent = msg;
  if (inputEl) inputEl.classList.add('error');
}

function clearErrors() {
  document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
  document.querySelectorAll('.form-group input.error, .form-group textarea.error')
    .forEach(el => el.classList.remove('error'));
}

// Remove erro inline ao digitar
document.querySelectorAll('#parceriaForm input, #parceriaForm textarea').forEach(el => {
  el.addEventListener('input', () => {
    el.classList.remove('error');
    const errId = 'err-' + el.name;
    const errEl = document.getElementById(errId);
    if (errEl) errEl.textContent = '';
  });
});
