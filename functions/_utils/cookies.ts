export function getCookies(req: Request): Record<string, string> {
    const header = req.headers.get("Cookie") ?? "";
    const map: Record<string, string> = {};
    header.split(";").forEach((pair) => {
        const i = pair.indexOf("=");
        if (i > -1) {
            const k = pair.slice(0, i).trim();
            const v = pair.slice(i + 1).trim();
            if (k) map[k] = decodeURIComponent(v);
        }
    });
    return map;
}

export function serializeCookie(
    name: string,
    value: string,
    opts?: {
        path?: string;
        domain?: string;
        httpOnly?: boolean;
        secure?: boolean;
        sameSite?: "Strict" | "Lax" | "None";
        maxAge?: number;
    }
): string {
    let cookie = `${name}=${encodeURIComponent(value)}`;
    if (opts?.maxAge !== undefined) cookie += `; Max-Age=${Math.max(0, opts.maxAge)}`;
    cookie += `; Path=${opts?.path ?? "/"}`;
    if (opts?.domain) cookie += `; Domain=${opts.domain}`;
    if (opts?.httpOnly) cookie += `; HttpOnly`;
    if (opts?.secure) cookie += `; Secure`;
    if (opts?.sameSite) cookie += `; SameSite=${opts.sameSite}`;
    return cookie;
}
