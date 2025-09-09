export type Review = { id: string; name: string; stars: 1|2|3|4|5; text: string; avatar?: string };

export const REVIEWS: Review[] = [
    { id: 'r1', name: 'Chiara R.', stars: 5, text: 'Percorso concreto. Ho cambiato approccio al lavoro in 3 mesi.' },
    { id: 'r2', name: 'Luca M.',   stars: 5, text: 'Community fortissima e mentor preparati. Consigliato.' },
    { id: 'r3', name: 'Sara P.',   stars: 4, text: 'Academy chiara e pratica. Ho trovato nuovi clienti.' },
    { id: 'r4', name: 'Marco D.',  stars: 5, text: 'Incubazione ottima: da idea a prodotto in tempi stretti.' },
    { id: 'r5', name: 'Elena S.',  stars: 5, text: 'Sales Bootcamp top: pipeline e KPI, ora vendo con metodo.' }
];
