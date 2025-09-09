import { useEffect, useMemo, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';
import type { Mode, PaletteName } from './types';
import { ThemeContext } from './theme-context';

const THEME_KEY = 'ui:mode';
const FIXED_PALETTE: PaletteName = 'aurora';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const root = document.documentElement;

    const [mode, setMode] = useState<Mode>(() => {
        const saved = localStorage.getItem(THEME_KEY) as Mode | null;
        if (saved === 'dark' || saved === 'light') return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        root.setAttribute('data-mode', mode);
        localStorage.setItem(THEME_KEY, mode);
    }, [mode, root]);

    useEffect(() => {
        root.setAttribute('data-theme', FIXED_PALETTE);
    }, [root]);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => {
            const saved = localStorage.getItem(THEME_KEY);
            if (!saved) setMode(mq.matches ? 'dark' : 'light');
        };
        mq.addEventListener?.('change', handler);
        return () => mq.removeEventListener?.('change', handler);
    }, []);

    const value = useMemo(
        () => ({ mode, palette: FIXED_PALETTE, toggleMode: () => setMode(m => (m === 'dark' ? 'light' : 'dark')) }),
        [mode]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
