// Register Service Worker on login screen
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/sw.js")
            .then((reg) => {
                console.log("[main] SW registered", reg.scope);
            })
            .catch((err) => {
                console.error("[main] SW register error", err);
            });
    });
}