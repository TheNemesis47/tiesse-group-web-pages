import React from "react";
import { useJson } from "@/hooks/useJson";
import type { AboutDoc } from "@/types/content";

const ABOUT_URL = "/data/about.json";

/**
 * Presentazione dinamica: legge i testi da /public/data/about.json
 */
export const Presentazione: React.FC = () => {
    const { data, loading, error } = useJson<AboutDoc>(ABOUT_URL);

    if (loading) return <section id="chi-siamo" className="section container" aria-busy="true">Caricamento…</section>;
    if (error)   return <section id="chi-siamo" className="section container" role="alert">Errore nel caricamento dei contenuti.</section>;
    if (!data)   return <section id="chi-siamo" className="section container">Contenuto non disponibile.</section>;

    return (
        <section id="chi-siamo" className="section container">
            <div className="stack">
                <h2 className="section-title">{data.title}</h2>

                {data.lead && <p className="lead">{data.lead}</p>}

                {Array.isArray(data.paragraphs) && data.paragraphs.map((txt, i) => (
                    <p key={i}>{txt}</p>
                ))}

                {data.quote?.text && (
                    <blockquote className="quote">
                        <p>{data.quote.text}</p>
                        {data.quote.footer && <footer>{data.quote.footer}</footer>}
                    </blockquote>
                )}
            </div>
        </section>
    );
};
