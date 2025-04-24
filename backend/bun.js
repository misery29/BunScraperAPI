import express from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = 3000;
app.use(cors());


// Rota de scraping
app.get('/api/scrape', async (req, res) => {
  const keyword = req.query.keyword;

  // Validação de parâmetro
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword é obrigatório' });
  }

  try {
    // Requisição à Amazon
    const apiKey = process.env.SCRAPER_API_KEY;
    const response = await axios.get(`http://api.scraperapi.com`, {
      params: {
        api_key: apiKey,
        url: `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`,
      },
    });
    

    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    const products = [];

    // Loop pelos itens da lista de resultados
    document.querySelectorAll('.s-result-item[data-asin]').forEach((product) => {
      const titleEl = product.querySelector('.a-size-medium.a-color-base.a-text-normal');
      const ratingEl = product.querySelector('.a-icon-alt');
      const reviewsEl = product.querySelector('.a-size-base.s-underline-text');
      const imageEl = product.querySelector('.s-image');

      // Apenas se todos os dados estiverem disponíveis
      if (titleEl && ratingEl && reviewsEl && imageEl) {
        products.push({
          title: titleEl.textContent.trim(),
          rating: ratingEl.textContent.trim(),
          reviews: reviewsEl.textContent.trim(),
          image: imageEl.src,
        });
      }
    });

    res.json(products);
  } catch (error) {
    console.error('Erro ao extrair dados:', error.message);
    res.status(500).json({ error: 'Erro ao extrair dados da Amazon' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
