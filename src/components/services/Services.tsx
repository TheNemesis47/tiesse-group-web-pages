import { useState } from 'react';
import type { FC } from 'react';
import { SERVICES, type Service } from '@/data/services';

const clampClass = 'line-clamp-2';

export const Services: FC = () => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    return (
        <section id="servizi" className="section container">
            <h2 className="section-title">I nostri servizi</h2>
            <div className="grid services-grid">
                {SERVICES.map((s: Service) => {
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
