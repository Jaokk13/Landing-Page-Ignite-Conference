document.addEventListener('DOMContentLoaded', function() {
  
  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isOpen = faqItem.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
          item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });
      if (!isOpen) {
        faqItem.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      } else {
        faqItem.classList.remove('active');
        question.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ================================================================
  // SMOOTH SCROLLING PARA ÂNCORAS (COM CORREÇÃO)
  // ================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const header = document.querySelector('.main-header');
        const headerOffset = header ? header.offsetHeight : 0;
        let offsetPosition;

        // --- INÍCIO DA CORREÇÃO ---
        // Se o alvo for o topo (#inicio), a posição é 0.
        // Para todos os outros, calcula o deslocamento para descontar o header.
        if (targetId === '#inicio') {
          offsetPosition = 0;
        } else {
          offsetPosition = targetElement.offsetTop - headerOffset - 20;
        }
        // --- FIM DA CORREÇÃO ---

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Cronograma Interativo
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  if (tabButtons.length > 0 && tabPanes.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const dayId = button.dataset.day;
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(dayId).classList.add('active');
      });
    });
  }

  // Lógica do Menu Social Expansível
  const socialTrigger = document.getElementById('social-links-trigger');
  const socialPopup = document.getElementById('social-links-popup');
  if (socialTrigger && socialPopup) {
    socialTrigger.addEventListener('click', function(event) {
      event.stopPropagation();
      socialPopup.classList.toggle('active');
    });
    document.addEventListener('click', function(event) {
      if (socialPopup.classList.contains('active') && !socialPopup.contains(event.target) && !socialTrigger.contains(event.target)) {
        socialPopup.classList.remove('active');
      }
    });
  }

});