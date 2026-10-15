// Quiet Reels (extension side): reads your saved level and hands it to page.js.
(() => {
  const DEFAULT = 0.1;
  const site = location.hostname.replace(/^(www|m|web)\./, "");
  const KEY = "vol:" + site;

  function publish(v) {
    const root = document.documentElement;
    if (root) root.dataset.quietReelsLevel = String(v);
    else document.addEventListener("readystatechange", () => publish(v), { once: true });
  }

  publish(DEFAULT); // safe default right away, before storage answers
  chrome.storage.sync.get(KEY).then((saved) => {
    if (typeof saved[KEY] === "number") publish(saved[KEY]);
  });
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes[KEY]) {
      const v = changes[KEY].newValue;
      publish(typeof v === "number" ? v : DEFAULT);
    }
  });
})();
