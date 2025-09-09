import { createContext, useContext } from 'react';
import type { Mode, PaletteName } from './types';

export type ThemeContextValue = {
    mode: Mode;
    palette: PaletteName;
    toggleMode: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme deve essere usato dentro <ThemeProvider>');
    return ctx;
}
