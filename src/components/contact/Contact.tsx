import { useState } from 'react';
import type { FC, FormEvent } from 'react';

export const Contact: FC = () => {
    const [state, setState] = useState<'idle'|'sending'|'ok'|'err'>('idle');
    const [msg, setMsg] = useState('');

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const payload = {
            name: (fd.get('name') || '').toString().trim(),
            email: (fd.get('email') || '').toString().trim(),
            message: (fd.get('message') || '').toString().trim(),
        };
        if (!payload.name || !payload.email || !payload.message) {
            setState('err'); setMsg('Compila tutti i campi.'); return;
        }
        setState('sending');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                setState('ok'); setMsg('Messaggio inviato! Ti risponderemo presto.');
                e.currentTarget.reset();
            } else {
                const t = await res.text();
                console.warn('contact error', t);
                setState('err'); setMsg('Invio fallito. Riprova più tardi.');
            }
        } catch (err) {
            console.error(err);
            setState('err'); setMsg('Errore di rete.');
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
                    <button className="btn-cta btn-wide" disabled={state==='sending'}>
                        {state==='sending' ? 'Invio…' : 'Invia'}
                    </button>
                    {state !== 'idle' && <p className={`form-msg ${state}`}>{msg}</p>}
                </form>
            </div>
        </section>
    );
};
