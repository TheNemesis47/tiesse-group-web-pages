import React, { useState } from 'react';

type Service = { id: string; title: string; desc: string };

const SERVICES: Service[] = [
    {
        id: 'mentorship',
        title: 'Mentorship 1:1',
        desc: 'Percorsi personalizzati con mentor senior: obiettivi, piano d’azione, accountability settimanale e supporto concreto nelle decisioni strategiche.',
    },
    {
        id: 'academy',
        title: 'Academy',
        desc: 'Programmi intensivi su leadership, soft skills e strumenti di business. Moduli pratici, case study e project work certificati.',
    },
    {
        id: 'incubation',
        title: 'Incubazione',
        desc: 'Dall’idea al modello di business: validazione, go-to-market, metriche e accesso a una rete di partner e advisor.',
    },
    {
        id: 'network',
        title: 'Networking & Community',
        desc: 'Eventi, masterclass e community di imprenditori: Creiamo connessioni di valore e opportunità reali di crescita.',
    },
    {
        id: 'sales',
        title: 'Sales Bootcamp',
        desc: 'Tecniche di vendita moderne, funnel e CRM. Role-play, KPI e training pratico per chiudere di più e meglio.',
    },
    {
        id: 'career',
        title: 'Career Coaching',
        desc: 'Ripensare la carriera: posizionamento, personal brand, portfolio e negoziazione. Strategia su misura per ogni profilo.',
    },
];

const clampClass = 'line-clamp-2';

export const Services: React.FC = () => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    return (
        <section id="servizi" className="section container">
            <h2 className="section-title">I nostri servizi</h2>
            <div className="grid services-grid">
                {SERVICES.map((s) => {
                    const isOpen = expanded[s.id];
                    return (
                        <article key={s.id} className="card service-card">
                            <h3 className="service-title">{s.title}</h3>
                            <p className={`service-desc ${isOpen ? '' : clampClass}`}>{s.desc}</p>
                            <button
                                className="link-btn"
                                onClick={() => setExpanded((m) => ({ ...m, [s.id]: !isOpen }))}
                                aria-expanded={isOpen}
                                aria-controls={`desc-${s.id}`}
                            >
                                {isOpen ? 'Mostra meno' : 'Mostra di più'}
                            </button>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};
