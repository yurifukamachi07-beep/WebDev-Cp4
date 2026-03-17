function aplicarFiltros() {
  const selectCategoria = document.getElementById('tipo');
  const selectPreco = document.getElementById('preco');
  const cards = document.querySelectorAll('#grid-produtos .product-card');

  const categoriaSelecionada = selectCategoria ? selectCategoria.value : 'Todos os tipos';
  const precoSelecionado = selectPreco ? selectPreco.value : 'Todos os preços';

  let visiveis = 0;

  cards.forEach(card => {
    const categoriaCard = card.dataset.categoria;
    const precoCard = parseFloat(card.dataset.preco);
    const passaCategoria = verificarCategoria(categoriaCard, categoriaSelecionada);
    const passaPreco = verificarPreco(precoCard, precoSelecionado);

    if (passaCategoria && passaPreco) {
      card.style.display = 'flex';
      card.style.animation = 'none';
      requestAnimationFrame(() => {
        card.style.animation = 'fadeIn 0.3s ease';
      });
      visiveis++;
    } else {
      card.style.display = 'none';
    }
  });

  atualizarContadorResultados(visiveis);
}

function verificarCategoria(categoriaCard, filtro) {
  if (filtro === 'Todos os tipos') return true;

  const mapa = {
    'Moletons':    'moletons',
    'Camisetas':   'camisetas',
    'Acessórios':  'acessorios'
  };

  return categoriaCard === mapa[filtro];
}

function verificarPreco(preco, filtro) {
  switch (filtro) {
    case 'Até R$ 50':        return preco <= 50;
    case 'R$ 51 a R$ 100':   return preco > 50 && preco <= 100;
    case 'R$ 101 a R$ 150':  return preco > 100 && preco <= 150;
    case 'Acima de R$ 150':  return preco > 150;
    default:                 return true;
  }
}

function atualizarContadorResultados(quantidade) {
  const contador = document.getElementById('resultado-contador');
  if (!contador) return;
  contador.textContent = `${quantidade} produto${quantidade !== 1 ? 's' : ''} encontrado${quantidade !== 1 ? 's' : ''}`;
}

function limparFiltros() {
  const selectCategoria = document.getElementById('tipo');
  const selectPreco = document.getElementById('preco');

  if (selectCategoria) selectCategoria.value = 'Todos os tipos';
  if (selectPreco) selectPreco.value = 'Todos os preços';

  aplicarFiltros();
}

document.addEventListener('DOMContentLoaded', () => {
  const btnAplicar = document.getElementById('btn-aplicar-filtros');
  const btnLimpar = document.getElementById('btn-limpar-filtros');

  if (btnAplicar) btnAplicar.addEventListener('click', aplicarFiltros);
  if (btnLimpar) btnLimpar.addEventListener('click', limparFiltros);

  document.getElementById('tipo')?.addEventListener('change', aplicarFiltros);
  document.getElementById('preco')?.addEventListener('change', aplicarFiltros);
});
