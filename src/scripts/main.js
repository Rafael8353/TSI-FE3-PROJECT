import { AnimeService } from './api.js';

const animeService = new AnimeService();

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const mainContent = document.getElementById('main-content');

function createAnimeCard(anime) {
    const card = document.createElement('div');
    card.className = 'anime-card';
    
    card.innerHTML = `
        <a href="details.html?id=${anime.mal_id}">
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h3>${anime.title}</h3>
            <div style="padding: 0 1rem 1rem; color: var(--color-accent);">
                ★ ${anime.score || 'N/A'}
            </div>
        </a>
    `;
    return card;
}

function renderGallery(animes) {
    mainContent.innerHTML = ''; 
    
    if (animes.length === 0) {
        mainContent.innerHTML = '<p>Nenhum anime encontrado.</p>';
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'anime-grid';

    animes.forEach(anime => {
        const gridItem = createAnimeCard(anime);
        grid.appendChild(gridItem);
    });

    mainContent.appendChild(grid);
}

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchInput.value;
    if (query) {
        mainContent.innerHTML = '<div class="loading">Buscando...</div>';
        const results = await animeService.searchAnimes(query);
        renderGallery(results);
    }
});

// busca os populares 
window.addEventListener('load', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');

    if (query) {
        searchInput.value = query;
        const results = await animeService.searchAnimes(query);
        renderGallery(results);
    } else {
        // Se não tiver pesquisa, carrega os TOP ANIMES
        const topAnimes = await animeService.getTopAnimes();
        renderGallery(topAnimes);
    }
});