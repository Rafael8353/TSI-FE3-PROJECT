// REQUISITO 2.1: Objeto Literal (Configurações)
export const AppConfig = {
    apiBaseUrl: "https://api.jikan.moe/v4",
    defaultImage: "https://via.placeholder.com/225x320?text=Sem+Imagem",
    defaultText: "N/A"
};

// REQUISITO 2.3: Função Construtora (Modelar a entidade Anime)
export function Anime(data) {
    this.id = data.mal_id;
    this.title = data.title;
    this.image = data.images.jpg.image_url || AppConfig.defaultImage;
    this.score = data.score || AppConfig.defaultText;
    this.year = data.year || (data.aired && data.aired.prop ? data.aired.prop.from.year : '?');
    this.type = data.type || 'TV';
}

// REQUISITO 2.2: Orientação Prototípica
Anime.prototype.formatInfo = function() {
    return `${this.year} • ${this.type}`;
};

// REQUISITO 2.3: Função Construtora (Personagem)
export function Character(data) {
    this.name = data.character.name;
    this.image = data.character.images.jpg.image_url || AppConfig.defaultImage;
    this.role = data.role;
}

// REQUISITO 3.1: Promise Customizada
export function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}