import type { PagesFunction } from '@cloudflare/workers-types';
import { getCookies } from '../_utils/cookies';

interface Env {
    RESEND_API_KEY: string;
    CONTACT_TO: string;
    CONTACT_FROM: string;
}

const cors = {
    "Access-Control-Allow-Origin": "*", // restringi al tuo dominio se necessario
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-CSRF-Token",
    "Cache-Control": "no-store",
};

export const onRequestOptions: PagesFunction = async () =>
    new Response(null, { headers: cors });

// POST /api/contact
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
    try {
        const body = (await request.json()) as { name: string; email: string; message: string };
        const name = body?.name?.trim();
        const email = body?.email?.trim();
        const message = body?.message?.trim();

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: 'Bad Request' }), {
                status: 400, headers: { 'content-type': 'application/json', ...cors }
            });
        }

        // CSRF (double-submit: cookie + header)
        const cookies = getCookies(request);
        const csrfCookie = cookies['csrf_token'] ?? '';
        const csrfHeader = request.headers.get('X-CSRF-Token') ?? '';
        if (!csrfCookie || csrfCookie !== csrfHeader) {
            return new Response(JSON.stringify({ error: 'Invalid CSRF token' }), {
                status: 403, headers: { 'content-type': 'application/json', ...cors }
            });
        }

        if (env.RESEND_API_KEY && env.CONTACT_TO && env.CONTACT_FROM) {
            const res = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: env.CONTACT_FROM,
                    to: [env.CONTACT_TO],
                    subject: `Nuovo contatto dal sito — ${name}`,
                    reply_to: email,
                    text: `Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`
                })
            });

            if (!res.ok) {
                const t = await res.text();
                return new Response(JSON.stringify({ error: 'Resend error', detail: t }), {
                    status: 502, headers: { 'content-type': 'application/json', ...cors }
                });
            }

            return new Response(JSON.stringify({ ok: true }), {
                status: 200, headers: { 'content-type': 'application/json', ...cors }
            });
        }

        return new Response(JSON.stringify({ error: 'Email service not configured' }), {
            status: 501, headers: { 'content-type': 'application/json', ...cors }
        });
    } catch (err) {
        console.error('contact error:', err);
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
            status: 400, headers: { 'content-type': 'application/json', ...cors }
        });
    }
};
