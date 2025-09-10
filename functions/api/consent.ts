import type { PagesFunction } from "@cloudflare/workers-types";
import { serializeCookie } from "../_utils/cookies";

const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export const onRequestOptions: PagesFunction = async () => new Response(null, { headers: cors });

export const onRequestPost: PagesFunction = async ({ request }) => {
    try {
        const { consent } = (await request.json()) as { consent: "yes" | "no" };
        const value = consent === "yes" ? "yes" : "no";

        const headers = new Headers({ "content-type": "application/json", ...cors });
        // 31536000 = 365 giorni
        headers.append(
            "Set-Cookie",
            serializeCookie("cookie_consent", value, {
                maxAge: 31536000,
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "Lax",
            })
        );

        return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
    } catch {
        return new Response(JSON.stringify({ error: "Bad Request" }), {
            status: 400,
            headers: { "content-type": "application/json", ...cors },
        });
    }
};
