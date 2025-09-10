import { useEffect, useState, type FormEvent, type FC } from "react";

export const Contact: FC = () => {
    const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
    const [msg, setMsg] = useState("");
    const [csrf, setCsrf] = useState<string>("");

    // 1) Prendi un token CSRF e imposta un cookie HttpOnly lato server
    useEffect(() => {
        fetch("/api/csrf", { method: "GET" })
            .then((r) => r.json())
            .then((d) => setCsrf(d?.token ?? ""))
            .catch(() => setCsrf(""));
    }, []);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);
        const payload = {
            name: (fd.get("name") || "").toString().trim(),
            email: (fd.get("email") || "").toString().trim(),
            message: (fd.get("message") || "").toString().trim(),
        };

        if (!payload.name || !payload.email || !payload.message) {
            setState("err");
            setMsg("Compila tutti i campi.");
            return;
        }

        // Se per qualche motivo il token non è ancora arrivato, riprova a prenderlo al volo
        let token = csrf;
        if (!token) {
            try {
                const r = await fetch("/api/csrf");
                const d = await r.json();
                token = d?.token ?? "";
                setCsrf(token);
            } catch {
                // prosegui comunque: il server rifiuterà con 403 se manca il token valido
            }
        }

        setState("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": token || "", // ← USA il token → niente warning ESLint/TS
                },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setState("ok");
                setMsg("Messaggio inviato! Ti risponderemo presto.");
                e.currentTarget.reset();
            } else {
                const t = await res.text();
                console.warn("contact error", t);
                setState("err");
                setMsg("Invio fallito. Riprova più tardi.");
            }
        } catch (err) {
            console.error(err);
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
