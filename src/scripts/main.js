import { AnimeService } from './api.js';
import { Anime } from './models.js'; // Importa o modelo que definimos

console.log("1. main.js carregado"); // Debug

const animeService = new AnimeService();
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const mainContent = document.getElementById('main-content');

function createAnimeCard(animeData) {
    // Instancia usando o modelo Acadêmico
    const anime = new Anime(animeData);

    const card = document.createElement('div');
    card.className = 'anime-card';
    
    card.innerHTML = `
        <a href="details.html?id=${anime.id}">
            <img src="${anime.image}" alt="${anime.title}">
            <div style="padding: 1rem;">
                <h3>${anime.title}</h3>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem; color: #666; font-size: 0.9rem;">
                    <span style="color: var(--color-accent); font-weight: bold;">★ ${anime.score}</span>
                    <span>${anime.formatInfo()}</span>
                </div>
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

    animes.forEach(animeData => {
        const gridItem = createAnimeCard(animeData);
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

window.addEventListener('load', async () => {
    console.log("2. Página carregada");
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');

    if (query) {
        searchInput.value = query;
        const results = await animeService.searchAnimes(query);
        renderGallery(results);
    } else {
        const topAnimes = await animeService.getTopAnimes();
        renderGallery(topAnimes);
    }
});