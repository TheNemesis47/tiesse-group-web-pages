import { useEffect, useState, type FormEvent, type FC } from "react";

type ContactOk = { ok: true };
type ContactErr = { error: string; detail?: string };

// Type guards per il body della response
const isContactErr = (x: unknown): x is ContactErr => {
    if (typeof x !== "object" || x === null) return false;
    const r = x as Record<string, unknown>;
    return typeof r.error === "string";
};
const isContactOk = (x: unknown): x is ContactOk => {
    if (typeof x !== "object" || x === null) return false;
    const r = x as Record<string, unknown>;
    return r.ok === true;
};

// Lettura JSON “safe”: non lancia mai anche se il body è vuoto/non-JSON
async function readJsonSafe(res: Response): Promise<unknown> {
    const ct = (res.headers.get("content-type") || "").toLowerCase();
    if (!ct.includes("application/json")) return null;
    try { return (await res.json()) as unknown; } catch { return null; }
}

export const Contact: FC = () => {
    const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
    const [msg, setMsg] = useState("");
    const [csrf, setCsrf] = useState<string>("");

    // 1) Prendi token CSRF (imposta anche il cookie HttpOnly lato server)
    useEffect(() => {
        fetch("/api/csrf", { method: "GET", cache: "no-store", credentials: "same-origin" })
            .then((r) => r.json())
            .then((d) => setCsrf((d && typeof d.token === "string") ? d.token : ""))
            .catch(() => setCsrf(""));
    }, []);

    // 2) Submit del form
    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);
        const payload = {
            name: (fd.get("name") || "").toString().trim(),
            email: (fd.get("email") || "").toString().trim(),
            message: (fd.get("message") || "").toString().trim(),
        };

        if (!payload.name || !payload.email || !payload.message) {
            setState("err"); setMsg("Compila tutti i campi."); return;
        }

        // Se non abbiamo ancora un token, tentiamo un refresh al volo
        let token = csrf;
        if (!token) {
            try {
                const r = await fetch("/api/csrf", { cache: "no-store", credentials: "same-origin" });
                const d = await r.json();
                token = (d && typeof d.token === "string") ? d.token : "";
                setCsrf(token);
            } catch { /* il server rifiuterà con 403 se il token manca */ }
        }

        setState("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": token || "",
                },
                body: JSON.stringify(payload),
                cache: "no-store",
                credentials: "same-origin",
            });

            const data = await readJsonSafe(res);

            // Se HTTP non ok o body d’errore strutturato → mostra messaggio chiaro
            if (!res.ok || isContactErr(data)) {
                const d = isContactErr(data) ? data : undefined;
                console.warn("contact server error:", { status: res.status, data });
                setState("err");
                setMsg(
                    d?.detail
                        ? `Errore: ${d.error} — ${d.detail.substring(0, 140)}`
                        : d?.error
                            ? `Errore: ${d.error}`
                            : `Invio fallito (HTTP ${res.status}). Riprova più tardi.`
                );
                return;
            }

            // HTTP ok → consideriamo successo anche se il body non è {ok:true}
            if (!isContactOk(data)) {
                console.debug("contact: HTTP 2xx con body inatteso", data);
            }

            setState("ok");
            setMsg("Messaggio inviato! Ti risponderemo presto.");
            e.currentTarget.reset();
        } catch (err) {
            // Qui entriamo SOLO per errori di rete reali (offline, CORS bloccato, ecc.)
            console.error("contact fetch failed:", err);
            setState("err");
            setMsg("Errore di rete.");
        }
    }

    return (
        <section id="contatti" className="contact-wrap">
            <div className="contact-card">
                <h2 className="contact-title">Contattaci</h2>
                <p className="contact-sub">Ti rispondiamo entro 24h lavorative.</p>

                <form className="form" onSubmit={onSubmit} noValidate>
                    <div className="field">
                        <label htmlFor="name">Nome</label>
                        <input id="name" name="name" type="text" autoComplete="name" required />
                    </div>

                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" autoComplete="email" required />
                    </div>

                    <div className="field">
                        <label htmlFor="message">Messaggio</label>
                        <textarea id="message" name="message" rows={6} required />
                    </div>

                    <button className="btn-cta btn-wide" disabled={state === "sending"}>
                        {state === "sending" ? "Invio…" : "Invia"}
                    </button>

                    {state !== "idle" && <p className={`form-msg ${state}`}>{msg}</p>}
                </form>
            </div>
        </section>
    );
};
