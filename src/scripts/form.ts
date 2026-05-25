const EMAILJS_PUBLIC_KEY = 'ZlIQISnC-Ydulg61b';
const EMAILJS_SERVICE_ID = 'service_85wytkb';
const EMAILJS_TEMPLATE_ID = 'template_vuxvtum';

import emailjs from '@emailjs/browser';

emailjs.init(EMAILJS_PUBLIC_KEY);

const contactForm = document.getElementById('contactForm') as HTMLFormElement | null;
if (!contactForm) throw new Error('Contact form not found');

const fieldIds = ['inpFirst', 'inpLast', 'inpEmail', 'inpPhone', 'svcSel', 'inpMsg'] as const;
const fieldFgs: Record<(typeof fieldIds)[number], string> = {
  inpFirst: 'fgFirst',
  inpLast: 'fgLast',
  inpEmail: 'fgEmail',
  inpPhone: 'fgPhone',
  svcSel: 'fgService',
  inpMsg: 'fgMsg',
};

fieldIds.forEach((id) => {
  document.getElementById(id)?.addEventListener('input', function () {
    this.closest('.fg')?.classList.remove('fg-error');
  });
});

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const sbBtn = document.getElementById('sb') as HTMLButtonElement;
  const fields = fieldIds.map((id) => ({ id, fg: fieldFgs[id] }));

  let valid = true;
  fields.forEach(({ id, fg }) => {
    const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const parent = document.getElementById(fg);
    parent?.classList.remove('fg-error');
    if (!el.value.trim()) {
      parent?.classList.add('fg-error');
      valid = false;
    }
  });

  const emailEl = document.getElementById('inpEmail') as HTMLInputElement;
  if (emailEl.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
    document.getElementById('fgEmail')?.classList.add('fg-error');
    valid = false;
  }

  const phoneEl = document.getElementById('inpPhone') as HTMLInputElement;
  if (
    phoneEl.value.trim() &&
    !/^\+?1?\s*\(?[0-9]{3}\)?[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/.test(phoneEl.value.trim())
  ) {
    document.getElementById('fgPhone')?.classList.add('fg-error');
    valid = false;
  }

  if (!valid) return;

  const first = (document.getElementById('inpFirst') as HTMLInputElement).value.trim();
  const last = (document.getElementById('inpLast') as HTMLInputElement).value.trim();
  const email = emailEl.value.trim();
  const phone = phoneEl.value.trim();
  const svc = (document.getElementById('svcSel') as HTMLSelectElement).value;
  const msg = (document.getElementById('inpMsg') as HTMLTextAreaElement).value.trim();

  sbBtn.innerHTML = 'Sending…';
  sbBtn.style.background = '#1B5FCC';
  sbBtn.disabled = true;

  emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      first,
      last,
      email,
      phone,
      service: svc,
      message: msg,
      to_email: 'aldairguerracedeno@gmail.com',
    })
    .then(() => {
      sbBtn.innerHTML = 'Message Sent ✓';
      sbBtn.style.background = '#2D7D46';
      setTimeout(() => {
        sbBtn.innerHTML = 'Send Message →';
        sbBtn.style.background = '';
        sbBtn.disabled = false;
      }, 5000);
      contactForm.reset();
    })
    .catch(() => {
      sbBtn.innerHTML = 'Error — try again';
      sbBtn.style.background = '#dc3545';
      setTimeout(() => {
        sbBtn.innerHTML = 'Send Message →';
        sbBtn.style.background = '';
        sbBtn.disabled = false;
      }, 4000);
    });
});
