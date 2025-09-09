import type { FC } from 'react';
// Usa l'alias corretto "@", già configurato in tsconfig.app.json
import { REVIEWS, type Review } from '@/data/reviews';

const Stars: FC<{ n: number }> = ({ n }) => (
    <div className="stars" aria-label={`${n} stelle`}>
        {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className={`star ${i < n ? 'fill' : ''}`} viewBox="0 0 24 24" aria-hidden="true">
                <path d="m12 17.27 6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z" />
            </svg>
        ))}
    </div>
);

const Card: FC<{ r: Review }> = ({ r }) => (
    <article className="review-card" role="listitem">
        <div className="avatar" aria-hidden="true">{(r.name[0] ?? 'U').toUpperCase()}</div>
        <Stars n={r.stars} />
        <p className="review-text">“{r.text}”</p>
        <div className="review-name">— {r.name}</div>
    </article>
);

export const Testimonials: FC = () => {
    // triplica per loop continuo
    const items = [...REVIEWS, ...REVIEWS, ...REVIEWS];

    return (
        <section className="section container" aria-labelledby="testimonials-title">
            <h2 id="testimonials-title" className="section-title">Testimonianze</h2>
            <div className="marquee allow-motion" aria-label="Recensioni clienti" role="list">
                <div className="marquee-track">
                    {items.map((r, idx) => <Card key={`${r.id}-${idx}`} r={r} />)}
                </div>
            </div>
        </section>
    );
};
