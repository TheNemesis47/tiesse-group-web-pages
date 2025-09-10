// Tipi per mantenere compatibilità con le tue classi attuali

export type Review = {
    id: string;
    name: string;
    stars: 1 | 2 | 3 | 4 | 5;
    text: string;
    avatar?: string; // opzionale
};

export type ReviewsDoc = {
    reviews: Review[];
};

export type Service = {
    id: string;
    title: string;
    desc: string;
    image?: string;
};

export type ServicesDoc = {
    services: Service[];
};

export type AboutDoc = {
    title: string;
    lead?: string;
    paragraphs?: string[];
    quote?: {
        text: string;
        footer?: string;
    };
};
