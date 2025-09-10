import { useEffect, useState } from "react";

/**
 * Hook generico per caricare JSON da /public/data/* a runtime.
 * Usa cache: "no-store" per evitare caching aggressivo durante l'editing.
 */
export function useJson<T>(path: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setErr] = useState<Error | null>(null);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                setLoading(true);
                const res = await fetch(path, { cache: "no-store" });
                if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${path}`);
                const json = (await res.json()) as T;
                if (alive) setData(json);
            } catch (e) {
                if (alive) setErr(e as Error);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, [path]);

    return { data, loading, error };
}
