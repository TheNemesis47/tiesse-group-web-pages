import React from 'react';

export const Hero: React.FC = () => {
    return (
        <section className="hero" aria-label="Copertina" role="img">
            <div className="hero-bg" />
            <div className="hero-overlay" />
            <div className="hero-content container">
                <h1 className="hero-title">TIESSE</h1>
                <p className="hero-sub">Formazione. Leadership. Impresa.</p>
                <a className="btn-cta" href="#chi-siamo">Scopri di più</a>
            </div>
            <div className="hero-scroll" aria-hidden="true">⌄</div>
        </section>
    );
};
