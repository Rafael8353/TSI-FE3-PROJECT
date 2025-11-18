export class AnimeService {
    constructor() {
        this.baseUrl = "https://api.jikan.moe/v4";
    }

    async searchAnimes(query) {
        try {
            const response = await fetch(`${this.baseUrl}/anime?q=${query}&sfw`);
            if (!response.ok) throw new Error('Erro na busca');
            const data = await response.json();
            return data.data; // Retorna a lista de animes
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
}