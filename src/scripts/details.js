import { AnimeService } from './api.js';

const animeService = new AnimeService();

// Elementos da DOM (baseados no seu details.html)
const els = {
    img: document.getElementById('details-image'),
    title: document.getElementById('details-title'),
    titleEng: document.getElementById('details-title-english'),
    score: document.getElementById('details-score'),
    rank: document.getElementById('details-rank'),
    episodes: document.getElementById('details-episodes'),
    genres: document.getElementById('details-genres'),
    synopsis: document.getElementById('details-synopsis')
};

async function loadDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
        alert('Anime não especificado!');
        window.location.href = 'index.html';
        return;
    }

    const anime = await animeService.getAnimeDetails(id);

    if (anime) {
        els.img.src = anime.images.jpg.large_image_url;
        els.title.innerText = anime.title;
        els.titleEng.innerText = anime.title_english || '';
        els.score.innerText = anime.score || 'N/A';
        els.rank.innerText = `#${anime.rank || '?'}`;
        els.episodes.innerText = anime.episodes || '?';
        els.synopsis.innerText = anime.synopsis;
        
        // Formata 
        const genresList = anime.genres.map(g => g.name).join(', ');
        els.genres.innerText = genresList;

        // Atualiza o título da página
        document.title = `${anime.title} - Detalhes`;
    }
}

window.addEventListener('load', loadDetails);