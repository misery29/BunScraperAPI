const searchBtn = document.getElementById('search-btn');
const keywordInput = document.getElementById('keyword');
const resultsContainer = document.getElementById('results');

searchBtn.addEventListener('click', async () => {
  const keyword = keywordInput.value.trim();
  if (!keyword) {
    alert('Por favor, digite uma palavra-chave!');
    return;
  }

  resultsContainer.innerHTML = 'Carregando...';

  try {
    const res = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
    const products = await res.json();

    if (!Array.isArray(products) || products.length === 0) {
      resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
      return;
    }

    resultsContainer.innerHTML = '';
    products.forEach((product) => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p><strong>Rating:</strong> ${product.rating}</p>
        <p><strong>Reviews:</strong> ${product.reviews}</p>
      `;

      resultsContainer.appendChild(card);
    });
  } catch (err) {
    console.error('Erro:', err);
    resultsContainer.innerHTML = '<p>Erro ao buscar dados. Verifique o console.</p>';
  }
});
