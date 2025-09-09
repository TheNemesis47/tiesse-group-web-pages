import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Mode, PaletteName } from './types';

type ThemeContextValue = {
    mode: Mode;
    palette: PaletteName;          // sola lettura
    toggleMode: () => void;        // toggle dark/light
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_KEY = 'ui:mode';      // 'dark' | 'light'
const FIXED_PALETTE: PaletteName = 'aurora';

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const root = document.documentElement;

    // Mode: rispetta sistema se non salvato
    const [mode, setMode] = useState<Mode>(() => {
        const saved = localStorage.getItem(THEME_KEY) as Mode | null;
        if (saved === 'dark' || saved === 'light') return saved;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    });

    // Applica mode
    useEffect(() => {
        root.setAttribute('data-mode', mode);
        localStorage.setItem(THEME_KEY, mode);
    }, [mode, root]);

    // Imposta SEMPRE palette fissa aurora
    useEffect(() => {
        root.setAttribute('data-theme', FIXED_PALETTE);
    }, [root]);

    // Sync con cambio preferenza sistema (se l'utente non ha salvato)
    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => {
            const saved = localStorage.getItem(THEME_KEY);
            if (!saved) setMode(mq.matches ? 'dark' : 'light');
        };
        mq.addEventListener?.('change', handler);
        return () => mq.removeEventListener?.('change', handler);
    }, []);

    const value = useMemo<ThemeContextValue>(
        () => ({
            mode,
            palette: FIXED_PALETTE,
            toggleMode: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')),
        }),
        [mode]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme deve essere usato dentro <ThemeProvider>');
    return ctx;
};
