import type { PagesFunction } from "@cloudflare/workers-types";
import { serializeCookie } from "../_utils/cookies";

// Base64URL senza spread su Uint8Array → evita TS2802
function toBase64Url(bytes: Uint8Array): string {
    let str = "";
    for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
    const b64 = btoa(str);
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function randomToken(len = 32): string {
    const arr = new Uint8Array(len);
    crypto.getRandomValues(arr);
    return toBase64Url(arr);
}

export const onRequestGet: PagesFunction = async () => {
    const token = randomToken(32);
    const headers = new Headers({ "content-type": "application/json" });

    headers.append(
        "Set-Cookie",
        serializeCookie("csrf_token", token, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "Lax",
            maxAge: 3600, // 1 ora
        })
    );

    return new Response(JSON.stringify({ token }), { status: 200, headers });
};
