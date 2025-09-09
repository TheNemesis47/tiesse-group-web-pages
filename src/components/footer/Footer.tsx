import type { FC } from 'react';

export const Footer: FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer" role="contentinfo">
            <div className="container footer-grid">
                {/* Brand + descrizione */}
                <div className="footer-brand">
                    <a className="brand" href="/" aria-label="Homepage">
                        {/* Usa lo stesso logo dell'header; aggiorna il path se diverso */}
                        <img
                            src="/icon/favicon.svg"
                            alt=""
                            className="brand-logo"
                            width={28}
                            height={28}
                        />
                        <span className="brand-text">Tiesse Group</span>
                    </a>
                    <p className="footer-desc">
                        Formazione, leadership e impresa. Dal 2014, costruiamo percorsi concreti
                        per trasformare potenziale in risultati reali.
                    </p>

                    {/* Social (placeholders: sostituisci href) */}
                    <div className="footer-social" aria-label="Social">
                        <a className="social-link" href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7zm6.5-.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z"/></svg>
                        </a>
                        <a className="social-link" href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 22V12h3l1-4h-4V6a2 2 0 0 1 2-2h2V0h-3a5 5 0 0 0-5 5v3H6v4h3v10z"/></svg>
                        </a>
                        <a className="social-link" href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.06c.62-1.18 2.13-2.42 4.39-2.42 4.7 0 5.56 3.1 5.56 7.12V24h-5V16c0-1.91-.03-4.37-2.66-4.37-2.66 0-3.07 2.08-3.07 4.23V24h-5V8z"/></svg>
                        </a>
                    </div>
                </div>

                {/* Link veloci */}
                <nav className="footer-links" aria-label="Link veloci">
                    <div className="footer-col">
                        <h3 className="footer-title">Navigazione</h3>
                        <ul>
                            <li><a href="#chi-siamo">Chi siamo</a></li>
                            <li><a href="#servizi">Servizi</a></li>
                            <li><a href="#contatti">Contattaci</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h3 className="footer-title">Legale</h3>
                        {/* Punta a pagine reali quando le crei (public/privacy.html, ecc.) */}
                        <ul>
                            <li><a href="/privacy">Privacy</a></li>
                            <li><a href="/termini">Termini</a></li>
                            <li><a href="/cookie">Cookie</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h3 className="footer-title">Contatti</h3>
                        <ul className="contact-list">
                            <li><a href="mailto:info@tiesse.group">info@tiesse.group</a></li>
                            <li><a href="tel:+390000000000">+39 000 000 000</a></li>
                            <li>Italia</li>
                        </ul>
                    </div>
                </nav>
            </div>

            {/* Bottom bar */}
            <div className="footer-bottom">
                <div className="container footer-bottom-inner">
                    <span>© {year} TIESSE GROUP. Tutti i diritti riservati.</span>
                    <a href="#top" className="to-top" aria-label="Torna all'inizio">Torna su ↑</a>
                </div>
            </div>
        </footer>
    );
};
