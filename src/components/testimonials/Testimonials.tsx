import type { FC } from "react";
import { useJson } from "@/hooks/useJson";
import type { Review, ReviewsDoc } from "@/types/content";

const REVIEWS_URL = "/data/reviews.json";

const Stars: FC<{ n: number }> = ({ n }) => (
    <div className="stars" aria-label={`${n} stelle`}>
        {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className={`star ${i < n ? "fill" : ""}`} viewBox="0 0 24 24" aria-hidden="true">
                <path d="m12 17.27 6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z" />
            </svg>
        ))}
    </div>
);

const Card: FC<{ r: Review }> = ({ r }) => (
    <article className="review-card" role="listitem">
        {/* avatar: se manca, fallback all'iniziale già gestito con CSS attuale */}
        {r.avatar ? (
            <img src={r.avatar} alt={`Avatar di ${r.name}`} className="avatar" />
        ) : (
            <div className="avatar" aria-hidden="true">{(r.name[0] ?? "U").toUpperCase()}</div>
        )}
        <Stars n={r.stars} />
        <p className="review-text">“{r.text}”</p>
        <div className="review-name">— {r.name}</div>
    </article>
);

export const Testimonials: FC = () => {
    const { data, loading, error } = useJson<ReviewsDoc>(REVIEWS_URL);

    if (loading) return <section className="section container" aria-busy="true">Caricamento recensioni…</section>;
    if (error)   return <section className="section container" role="alert">Errore nel caricamento recensioni.</section>;

    const base: Review[] = data?.reviews ?? [];
    if (!base.length) return <section className="section container">Nessuna recensione disponibile.</section>;

    // loop continuo: triplichiamo i dati come in precedenza
    const items = [...base, ...base, ...base];

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
