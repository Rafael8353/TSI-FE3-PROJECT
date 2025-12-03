
import { AppConfig } from './models.js';

export class AnimeService {
    constructor() {

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