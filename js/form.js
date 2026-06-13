/* ═══════════════════════════════════════════════════════════
   LN Chary Portfolio — Commission Form Validation
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('commission-form');
  const formWrapper = document.getElementById('commission-form-container');
  const successMessage = document.getElementById('form-success');

  if (!form) return;

  /* ── Validation rules ── */
  const validators = {
    name: {
      required: true,
      message: 'Please enter your name',
      validate: (v) => v.trim().length >= 2,
      errorMsg: 'Name must be at least 2 characters',
    },
    email: {
      required: true,
      message: 'Please enter your email',
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      errorMsg: 'Please enter a valid email address',
    },
    whatsapp: {
      required: true,
      message: 'Please enter your WhatsApp number',
      validate: (v) => /^[\d\s\+\-()]{7,15}$/.test(v.trim()),
      errorMsg: 'Please enter a valid phone number',
    },
    'commission-type': {
      required: true,
      message: 'Please select a commission type',
      validate: (v) => v !== '',
      errorMsg: 'Please select a commission type',
    },
  };

  /* ── Helper: show/clear error on a field ── */
  function showError(field, message) {
    field.classList.add('error');
    const errorEl = field.parentElement.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  }

  function clearError(field) {
    field.classList.remove('error');
    const errorEl = field.parentElement.querySelector('.form-error');
    if (errorEl) {
      errorEl.style.display = 'none';
    }
  }

  /* ── Live validation on blur ── */
  Object.keys(validators).forEach((fieldName) => {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (!field) return;

    field.addEventListener('blur', () => {
      validateField(fieldName, field);
    });

    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        validateField(fieldName, field);
      }
    });
  });

  function validateField(fieldName, field) {
    const rule = validators[fieldName];
    const value = field.value;

    if (rule.required && !value.trim()) {
      showError(field, rule.message);
      return false;
    }

    if (value.trim() && rule.validate && !rule.validate(value)) {
      showError(field, rule.errorMsg);
      return false;
    }

    clearError(field);
    return true;
  }

  /* ── Form submit ── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    Object.keys(validators).forEach((fieldName) => {
      const field = form.querySelector(`[name="${fieldName}"]`);
      if (field && !validateField(fieldName, field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      // Scroll to first error
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(form);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(async (response) => {
      const json = await response.json();
      if (response.status === 200) {
        // Success — show success message
        formWrapper.style.display = 'none';
        successMessage.classList.add('active');
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        console.error(json);
        alert(json.message || 'Something went wrong. Please try again.');
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Network error. Please check your connection and try again.');
    })
    .finally(() => {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    });
  });



  /* ── FAQ Accordion ── */
  const accordionTriggers = document.querySelectorAll('.accordion__trigger');

  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.parentElement;
      const body = item.querySelector('.accordion__body');
      const isActive = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.accordion__item.active').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('active');
          openItem.querySelector('.accordion__body').style.maxHeight = '0';
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        body.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });


  /* ── "Request This" buttons scroll to form ── */
  document.querySelectorAll('[data-commission-type]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-commission-type');
      const typeSelect = form.querySelector('[name="commission-type"]');
      if (typeSelect) {
        typeSelect.value = type;
      }
      const formSection = document.getElementById('commission-form-section');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
});
