import { AnimeService } from './api.js';
// NOVO IMPORT: Trazendo o modelo de Personagem e o Delay (Promise)
import { Character, delay } from './models.js';

const animeService = new AnimeService();

const els = {
    img: document.getElementById('details-image'),
    title: document.getElementById('details-title'),
    titleEng: document.getElementById('details-title-english'),
    score: document.getElementById('details-score'),
    rank: document.getElementById('details-rank'),
    episodes: document.getElementById('details-episodes'),
    genres: document.getElementById('details-genres'),
    synopsis: document.getElementById('details-synopsis'),
    charactersGrid: document.getElementById('details-characters'),
    mainSection: document.querySelector('.details-main') 
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

        // Formata Gêneros
        els.genres.innerHTML = '';
        anime.genres.forEach(genre => {
            const tag = document.createElement('span');
            tag.innerText = genre.name;
            tag.style.cssText = `
                display: inline-block;
                background-color: var(--color-accent);
                color: #fff;
                padding: 4px 10px;
                border-radius: 15px;
                font-size: 0.8rem;
                margin-right: 5px;
                margin-bottom: 5px;
                font-weight: bold;
            `;
            els.genres.appendChild(tag);
        });

        document.title = `${anime.title} - Detalhes`;

        // Carrega extras
        loadCharacters(id);
        loadTrailer(id);
    }
}

async function loadCharacters(id) {
    // REQUISITO 3.1: Promise Customizada
    // Esperamos 500ms para não bloquear a API (Rate Limit)
    await delay(500);

    if (!animeService.getAnimeCharacters) return;

    const charactersData = await animeService.getAnimeCharacters(id);

    if (charactersData && charactersData.length > 0) {
        els.charactersGrid.innerHTML = ''; 
        
        charactersData.forEach(charData => {
            // REQUISITO 2.3: Função Construtora
            // Instanciamos o objeto Character para limpar os dados
            const char = new Character(charData);

            const card = document.createElement('div');
            card.className = 'character-card';
            
            // Agora usamos as propriedades limpas do objeto 'char'
            card.innerHTML = `
                <img src="${char.image}" alt="${char.name}">
                <div style="padding: 0.5rem;">
                    <h4 style="font-size: 0.9rem; margin-bottom: 2px;">${char.name}</h4>
                    <span style="font-size: 0.75rem; color: var(--color-text-secondary);">${char.role}</span>
                </div>
            `;
            els.charactersGrid.appendChild(card);
        });
    } else {
        els.charactersGrid.innerHTML = '<p>Personagens não disponíveis.</p>';
    }
}

async function loadTrailer(id) {
    // Pequeno delay também para o trailer, para garantir que não dê erro 429
    await delay(1000);

    if (!animeService.getAnimeVideos) return;

    const videos = await animeService.getAnimeVideos(id);
    
    if (videos && videos.promo && videos.promo.length > 0) {
        const trailerUrl = videos.promo[0].trailer.embed_url;
        
        if (trailerUrl) {
            const trailerContainer = document.createElement('div');
            trailerContainer.style.marginTop = "3rem";
            
            trailerContainer.innerHTML = `
                <h3>Trailer Oficial</h3>
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                    <iframe 
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                        src="${trailerUrl}" 
                        title="Anime Trailer" 
                        frameborder="0" 
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            `;
            els.mainSection.appendChild(trailerContainer);
        }
    }
}

window.addEventListener('load', loadDetails);