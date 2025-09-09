import type { PagesFunction } from '@cloudflare/workers-types';

export const onRequestPost: PagesFunction = async (ctx) => {
    try {
        const { name, email, message } = await ctx.request.json() as {
            name: string; email: string; message: string;
        };

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: 'Bad Request' }), { status: 400 });
        }

        const RESEND = ctx.env?.RESEND_API_KEY as string | undefined;
        const TO     = ctx.env?.CONTACT_TO as string | undefined;
        const FROM   = ctx.env?.CONTACT_FROM as string | undefined;

        if (RESEND && TO && FROM) {
            const res = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${RESEND}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: FROM,
                    to: [TO],
                    subject: `Nuovo contatto dal sito — ${name}`,
                    reply_to: email,
                    text: `Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`
                })
            });
            if (!res.ok) {
                const t = await res.text();
                return new Response(JSON.stringify({ error: 'Resend error', detail: t }), { status: 502 });
            }
            return new Response(JSON.stringify({ ok: true }), { status: 200 });
        }

        return new Response(JSON.stringify({ error: 'Email service not configured' }), { status: 501 });
    } catch (err) {
        console.error('contact error:', err); // <-- così ESLint è felice
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
    }
};
