export const selectedItems = [];

// Troque pelo telefone real com DDI + DDD, somente números.
const WHATSAPP_NUMBER = '1799198481';
const whatsappUrl = (message = 'Olá! Vim pelo site da Brasa & Pão e gostaria de fazer um pedido.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.href = whatsappUrl();
  link.addEventListener('click', () => {
    const message = selectedItems.length
      ? `Olá! Gostaria de pedir: ${selectedItems.join(', ')}.`
      : undefined;
    link.href = whatsappUrl(message);
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();