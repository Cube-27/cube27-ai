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

  const scheduleAnalytics = () => window.setTimeout(loadAnalytics, 3000);
  if (document.readyState === "complete") scheduleAnalytics();
  else window.addEventListener("load", scheduleAnalytics, { once: true });
})();
