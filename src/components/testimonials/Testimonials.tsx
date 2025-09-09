import React from 'react';

type Review = { id: string; name: string; stars: 1|2|3|4|5; text: string; avatar?: string };

const REVIEWS: Review[] = [
    { id: 'r1', name: 'Chiara R.', stars: 5, text: 'Percorso concreto. Ho cambiato approccio al lavoro in 3 mesi.' },
    { id: 'r2', name: 'Luca M.', stars: 5, text: 'Community fortissima e mentor preparati. Consigliato.' },
    { id: 'r3', name: 'Sara P.', stars: 4, text: 'Academy chiara e pratica. Ho trovato nuovi clienti.' },
    { id: 'r4', name: 'Marco D.', stars: 5, text: 'Incubazione ottima: da idea a prodotto in tempi stretti.' },
    { id: 'r5', name: 'Elena S.', stars: 5, text: 'Sales Bootcamp top: pipeline e KPI, ora vendo con metodo.' },
];

const Stars = ({ n }: { n: number }) => (
    <div className="stars" aria-label={`${n} stelle`}>
        {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className={`star ${i < n ? 'fill' : ''}`} viewBox="0 0 24 24" aria-hidden="true">
                <path d="m12 17.27 6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z"/>
            </svg>
        ))}
    </div>
);

const Card = ({ r }: { r: Review }) => (
    <article className="review-card">
        <div className="avatar" aria-hidden="true">{(r.name[0] ?? 'U').toUpperCase()}</div>
        <Stars n={r.stars} />
        <p className="review-text">“{r.text}”</p>
        <div className="review-name">— {r.name}</div>
    </article>
);

export const Testimonials: React.FC = () => {
    // Duplico la lista per loop continuo “seamless”
    const items = [...REVIEWS, ...REVIEWS];
    return (
        <section className="section container">
            <h2 className="section-title">Testimonianze</h2>
            <div className="marquee" aria-label="Recensioni clienti">
                <div className="marquee-track" role="list">
                    {items.map((r, idx) => <Card key={`${r.id}-${idx}`} r={r} />)}
                </div>
            </div>
        </section>
    );
};
