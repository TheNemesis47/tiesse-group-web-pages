import { useMemo, useState, type FC } from "react";
import { useJson } from "@/hooks/useJson";
import type { Service, ServicesDoc } from "@/types/content";

const clampClass = "line-clamp-2";
const SERVICES_URL = "/data/services.json";

// Placeholder SVG inline (contrasto alto, compatto)
const FALLBACK_IMG =
    `data:image/svg+xml;utf8,` +
    encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'>
       <defs>
         <linearGradient id='g' x1='0' x2='0' y1='0' y2='1'>
           <stop offset='0%' stop-color='%230b0f19'/>
           <stop offset='100%' stop-color='%2310162a'/>
         </linearGradient>
       </defs>
       <rect width='1200' height='675' fill='url(%23g)'/>
       <g fill='%239aa3b2' opacity='0.5'>
         <circle cx='105' cy='120' r='8'/><circle cx='210' cy='210' r='6'/><circle cx='320' cy='90' r='5'/>
         <circle cx='980' cy='140' r='7'/><circle cx='1080' cy='260' r='6'/><circle cx='860' cy='80' r='5'/>
       </g>
       <text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle'
             fill='white' font-family='system-ui, -apple-system, Segoe UI, Roboto, Arial'
             font-size='48' font-weight='800' opacity='0.8'>IMMAGINE SERVIZIO</text>
     </svg>`
    );

/** Normalizza src immagine:
 * - se assente → fallback
 * - se relativo senza "/" iniziale → prova a risolverlo in /images/services/{src}
 * - se è assoluto (http) o già '/...' → lascia invariato
 */
function normalizeImageSrc(src?: string): string {
    if (!src || !src.trim()) return FALLBACK_IMG;
    if (/^https?:\/\//i.test(src)) return src;
    if (src.startsWith("/")) return src;
    return `/images/services/${src}`;
}

export const Services: FC = () => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const [loaded, setLoaded] = useState<Record<string, boolean>>({});
    const { data, loading, error } = useJson<ServicesDoc>(SERVICES_URL);

    const items: Service[] = useMemo(() => data?.services ?? [], [data]);

    if (loading) return <section id="servizi" className="section container" aria-busy="true">Caricamento servizi…</section>;
    if (error)   return <section id="servizi" className="section container" role="alert">Errore nel caricamento servizi.</section>;
    if (!items.length) return <section id="servizi" className="section container">Nessun servizio disponibile.</section>;

    return (
        <section id="servizi" className="section container">
            <h2 className="section-title">I nostri servizi</h2>

            <div className="grid services-grid">
                {items.map((s) => {
                    const isOpen = !!expanded[s.id];
                    const descId = `desc-${s.id}`;
                    const imgSrc = normalizeImageSrc(s.image);

                    return (
                        <article key={s.id} className="card service-card has-media">
                            {/* Media con aspect-ratio + overlay titolo */}
                            <figure className="service-media">
                                <img
                                    src={imgSrc}
                                    alt={`Immagine del servizio: ${s.title}`}
                                    className={`service-img ${loaded[s.id] ? "is-loaded" : ""}`}
                                    loading="lazy"
                                    decoding="async"
                                    onLoad={() => setLoaded((m) => ({ ...m, [s.id]: true }))}
                                    onError={(e) => {
                                        const el = e.currentTarget;
                                        if (el.src !== FALLBACK_IMG) el.src = FALLBACK_IMG;
                                    }}
                                />
                                <figcaption className="service-caption">
                                    <h3 className="service-title overlay">{s.title}</h3>
                                </figcaption>
                            </figure>

                            {/* Corpo card */}
                            <div className="service-body">
                                <p id={descId} className={`service-desc ${isOpen ? "" : clampClass}`}>{s.desc}</p>

                                <button
                                    className="link-btn"
                                    onClick={() => setExpanded((m) => ({ ...m, [s.id]: !isOpen }))}
                                    aria-expanded={isOpen}
                                    aria-controls={descId}
                                >
                                    {isOpen ? "Mostra meno" : "Mostra di più"}
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};
