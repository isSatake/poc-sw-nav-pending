self.addEventListener("install", (_) => {
    console.log("[SW] install");
});

self.addEventListener("activate", (_) => {
    console.log("[SW] activate");
});

self.addEventListener("fetch", (event) => {
    if (event.request.mode === "navigate") {
        event.respondWith(navigateWithLog(event));
    }
});

async function navigateWithLog(event) {
    const req = event.request;
    const url = req.url;
    const start = performance.now();

    console.log("[SW] navigate start", {
        url,
        mode: req.mode,
        destination: req.destination,
        referrer: req.referrer,
        cache: req.cache,
        redirect: req.redirect,
        method: req.method,
    });

    try {
        // ★ This is the "fetch(event.request) that sometimes doesn't complete"
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort("pending"), 5000);

        const res = await fetch(req, { signal: controller.signal });
        clearTimeout(timeoutId);

        const end = performance.now();
        console.log("[SW] navigate fetch resolved", {
            url,
            status: res.status,
            ok: res.ok,
            redirected: res.redirected,
            timeMs: Math.round(end - start),
        });

        return res;
    } catch (e) {
        const end = performance.now();
        console.error("[SW] navigate fetch threw", {
            url,
            timeMs: Math.round(end - start),
            name: e.name,
            message: e.message,
        });
    }
}