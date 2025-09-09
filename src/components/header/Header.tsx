import React, { useState } from 'react';
import { useTheme } from '../../theme/ThemeProvider'

export const Header: React.FC = () => {
    const { mode, toggleMode } = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <header className="site-header glass" role="banner">
            <div className="container header-inner">
                {/* Brand */}
                <a className="brand" href="/" aria-label="Homepage">
                    <img
                        src="/icon/favicon.svg"          // <-- path ai tuoi asset
                        alt=""
                        className="brand-logo"
                        width={28}
                        height={28}
                    />
                    <span className="brand-text">Tiesse</span>
                </a>


                {/* Nav desktop */}
                <nav className="nav-desktop" aria-label="Navigazione principale">
                    <ul>
                        <li><a className="nav-link" href="#chi-siamo">Chi siamo</a></li>
                        <li><a className="nav-link" href="#servizi">Servizi</a></li>
                        <li><a className="nav-link" href="#contatti">Contattaci</a></li>
                    </ul>
                </nav>

                {/* Azioni: toggle tema + CTA + hamburger */}
                <div className="actions">
                    <button
                        onClick={toggleMode}
                        className="icon-btn"
                        aria-label={`Passa a tema ${mode === 'dark' ? 'chiaro' : 'scuro'}`}
                        aria-pressed={mode === 'dark'}
                    >
                        {mode === 'dark' ? (
                            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                            </svg>
                        ) : (
                            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 4V2m0 20v-2M4 12H2m20 0h-2M5 5 3.6 3.6M20.4 20.4 19 19M19 5l1.4-1.4M3.6 20.4 5 19" />
                                <circle cx="12" cy="12" r="4" />
                            </svg>
                        )}
                    </button>

                    <a className="btn-cta" href="#contatti">Contattaci</a>

                    <button
                        className="hamburger"
                        aria-label="Apri/chiudi menu"
                        aria-controls="mobileMenu"
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                    >
                        <span className="hamburger-bar" />
                        <span className="hamburger-bar" />
                        <span className="hamburger-bar" />
                    </button>
                </div>
            </div>

            {/* Menu mobile */}
            <nav id="mobileMenu" className={`mobile-drawer ${open ? 'is-open' : ''}`} aria-label="Menu mobile">
                <ul>
                    <li><a className="nav-link" href="#chi-siamo" onClick={() => setOpen(false)}>Chi siamo</a></li>
                    <li><a className="nav-link" href="#servizi" onClick={() => setOpen(false)}>Servizi</a></li>
                    <li><a className="nav-link" href="#contatti" onClick={() => setOpen(false)}>Contattaci</a></li>
                    <li><a className="btn-cta mobile" href="#contatti" onClick={() => setOpen(false)}>Scrivici</a></li>
                </ul>
            </nav>

            <div className="header-gradient" />
        </header>
    );
};
