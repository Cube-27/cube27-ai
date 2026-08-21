(() => {
  const id = document.currentScript?.dataset.measurementId;
  if (!id || navigator.globalPrivacyControl) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id, { anonymize_ip: true });

  const loadAnalytics = () => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.append(script);
  };

  // gtag.js is the only blocking script on the page, so it is kept out of the
  // load window entirely: the first real interaction pulls it in, and an idle
  // timer covers readers who only scroll-free read. Anything earlier shows up
  // as Total Blocking Time and fails the Lighthouse budget.
  const EVENTS = ["pointerdown", "keydown", "touchstart", "scroll"];
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    for (const event of EVENTS) window.removeEventListener(event, start);
    loadAnalytics();
  };

  const arm = () => {
    for (const event of EVENTS) {
      window.addEventListener(event, start, { once: true, passive: true });
    }
    window.setTimeout(start, 8000);
  };

  if (document.readyState === "complete") arm();
  else window.addEventListener("load", arm, { once: true });
})();
