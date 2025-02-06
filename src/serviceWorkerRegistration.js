export function register() {
  // Check if the browser supports service workers
  if ("serviceWorker" in navigator) {
    // Wait for the page to fully load before registering the service worker
    window.addEventListener("load", () => {
      // Register the service worker with the given file path
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          // Log a success message once the service worker is registered
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          // Log an error message if the registration fails
          console.error("Service Worker registration failed:", error);
        });
    });
  }
}
