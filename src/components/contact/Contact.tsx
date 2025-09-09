import React, { useState } from 'react';

export const Contact: React.FC = () => {
    const [state, setState] = useState<'idle'|'sending'|'ok'|'err'>('idle');
    const [msg, setMsg] = useState('');

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const payload = {
            name: data.get('name')?.toString() ?? '',
            email: data.get('email')?.toString() ?? '',
            message: data.get('message')?.toString() ?? '',
        };
        if (!payload.name || !payload.email || !payload.message) { setMsg('Compila tutti i campi.'); setState('err'); return; }
        setState('sending');
        try {
            const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (res.ok) { setState('ok'); setMsg('Messaggio inviato, ti risponderemo presto.'); (e.currentTarget as HTMLFormElement).reset(); }
            else { setState('err'); setMsg('Invio fallito. Riprova più tardi.'); }
        } catch {
            setState('err'); setMsg('Errore di rete.');
        }
    }

    return (
        <section id="contatti" className="section container">
            <h2 className="section-title">Contattaci</h2>
            <form className="form" onSubmit={onSubmit}>
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
                    <textarea id="message" name="message" rows={5} required />
                </div>
                <button className="btn-cta" disabled={state==='sending'}>{state==='sending' ? 'Invio…' : 'Invia'}</button>
                {state !== 'idle' && <p className={`form-msg ${state}`}>{msg}</p>}
            </form>
        </section>
    );
};
