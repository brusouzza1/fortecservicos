// Interações do site FORTEC

const menuToggle = document.querySelector('#menuToggle');
const navMenu = document.querySelector('#navMenu');

// Fecha o menu do celular
function closeMenu() {
  navMenu.classList.remove('nav--open');

  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');

  menuToggle.innerHTML =
    '<svg class="icon"><use href="#icon-menu"></use></svg>';
}

// Abre e fecha o menu
menuToggle.addEventListener('click', () => {

  const isOpen = navMenu.classList.toggle('nav--open');

  menuToggle.setAttribute('aria-expanded', String(isOpen));

  menuToggle.setAttribute(
    'aria-label',
    isOpen ? 'Fechar menu' : 'Abrir menu'
  );

  menuToggle.innerHTML = `
    <svg class="icon">
      <use href="#icon-${isOpen ? 'close' : 'menu'}"></use>
    </svg>
  `;

});

// Fecha o menu quando o usuário clica em um link
navMenu.querySelectorAll('a').forEach((link) => {

  link.addEventListener('click', closeMenu);

});

// Fecha o menu pressionando Escape
document.addEventListener('keydown', (event) => {

  if (event.key === 'Escape') {
    closeMenu();
  }

});

// Ano automático no rodapé
const year = document.querySelector('#year');

if (year) {
  year.textContent = new Date().getFullYear();
}

// Exibe a logomarca quando o arquivo existir
const brandImage = document.querySelector('.brand__image');

if (brandImage) {

  const showRealLogo = () => {
    document.querySelector('.brand')
      .classList.add('brand--has-image');
  };

  if (brandImage.complete && brandImage.naturalWidth > 0) {

    showRealLogo();

  } else {

    brandImage.addEventListener(
      'load',
      showRealLogo,
      { once: true }
    );

  }

  brandImage.addEventListener(
    'error',
    () => brandImage.remove(),
    { once: true }
  );

}

// Animações suaves ao rolar a página
if (
  'IntersectionObserver' in window &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {

  const observer = new IntersectionObserver(
    (entries, activeObserver) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add('reveal--visible');

          activeObserver.unobserve(entry.target);

        }

      });

    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach((element) => {

    observer.observe(element);

  });

} else {

  document.querySelectorAll('.reveal').forEach((element) => {

    element.classList.add('reveal--visible');

  });

}