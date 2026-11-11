import { selectedItems } from './app.js';

const items = [
  { name: 'Brasa Clássico', category: 'burgers', photo: 'assets/smash-burguer.png', tag: 'O favorito', desc: 'Blend 180g, cheddar inglês, cebola na brasa e molho da casa.', price: 32.90 },
  { name: 'Duplo Burguer', category: 'burgers', photo: 'assets/image.png', tag: 'Mais pedido', desc: 'Dois burgers na brasa, cheddar derretido, bacon crocante, alface e tomate.', price: 38.90 },
  { name: 'Bacon & Mel', category: 'burgers', photo: 'assets/burguer-costela.png', tag: 'Agridoce', desc: 'Blend 180g, bacon crocante, queijo, mel picante e rúcula.', price: 36.90 },
  { name: 'Fritas da Casa', category: 'acompanhamentos', photo: 'photo-1573080496219-bb080dd4f877', tag: 'Pra dividir', desc: 'Batatas crocantes com páprica defumada e maionese de alho.', price: 18.90 },
  { name: 'Onion rings', category: 'acompanhamentos', photo: 'photo-1639024471283-03518883512d', tag: 'Crocante', desc: 'Anéis de cebola empanados na hora. Acompanha molho da casa.', price: 19.90 },
  { name: 'Milk-shake', category: 'bebidas', photo: 'photo-1572490122747-3968b75cc699', tag: 'Geladinho', desc: 'Cremoso, feito com sorvete de verdade. Consulte os sabores.', price: 18.90 }
];

const money = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
const grid = document.querySelector('#menu-grid');
const toast = document.querySelector('#toast');

function renderMenu(filter = 'todos') {
  if (!grid) return;
  const visible = items.filter(item => filter === 'todos' || item.category === filter);
  grid.innerHTML = visible.map(item => `
    <article class="food-card">
      <div class="food-photo"><span class="tag">${item.tag}</span>
        <span class="food-emoji" role="img" aria-label="${item.name}" style="background-image:url('${item.photo.startsWith('assets/') ? item.photo : `https://images.unsplash.com/${item.photo}?auto=format&fit=crop&w=700&q=80`}')"></span>
      </div>
      <div class="food-info"><h3>${item.name}</h3><p>${item.desc}</p>
        <div class="food-bottom"><span class="price">${money(item.price)}</span>
          <button class="add" type="button" data-add="${item.name}" aria-label="Adicionar ${item.name} ao pedido">+</button>
        </div>
      </div>
    </article>`).join('');
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

renderMenu();
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
  renderMenu(button.dataset.filter);
}));

grid?.addEventListener('click', event => {
  const button = event.target.closest('[data-add]');
  if (!button) return;
  selectedItems.push(button.dataset.add);
  showToast(`${button.dataset.add} adicionado ao pedido (${selectedItems.length})`);
});
