// ACADÊMICO: Importamos a configuração do Objeto Literal que criamos
import { AppConfig } from './models.js';

export class AnimeService {
    constructor() {
        // ACADÊMICO: Usamos a propriedade do objeto literal em vez de texto solto
        this.baseUrl = AppConfig.apiBaseUrl;
    }

    async searchAnimes(query) {
        try {
            const response = await fetch(`${this.baseUrl}/anime?q=${query}&sfw`);
            if (!response.ok) throw new Error('Erro na busca');
            const data = await response.json();
            return data.data; 
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getAnimeDetails(id) {
        try {
            const response = await fetch(`${this.baseUrl}/anime/${id}`);
            if (!response.ok) throw new Error('Erro ao buscar detalhes');
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
    async getTopAnimes() {
        try {
            const response = await fetch(`${this.baseUrl}/top/anime?filter=bypopularity&limit=12`);
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    // Busca os personagens do anime
    async getAnimeCharacters(id) {
        try {
            const response = await fetch(`${this.baseUrl}/anime/${id}/characters`);
            if (!response.ok) throw new Error('Erro ao buscar personagens');
            const data = await response.json();
            // Retorna apenas os 12 primeiros
            return data.data.slice(0, 12); 
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    // Busca os vídeos (trailers)
    async getAnimeVideos(id) {
        try {
            const response = await fetch(`${this.baseUrl}/anime/${id}/videos`);
            if (!response.ok) throw new Error('Erro ao buscar vídeos');
            const data = await response.json();
            return data.data; 
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}