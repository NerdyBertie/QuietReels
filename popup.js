const DEFAULT = 10;
const SITES = ["facebook.com", "instagram.com"];

const slider = document.getElementById("slider");
const pct = document.getElementById("pct");
const presets = document.querySelectorAll(".presets button");

function show(v) {
  slider.value = v;
  pct.textContent = v;
  slider.style.setProperty("--p", v + "%");
  presets.forEach((b) => b.classList.toggle("on", Number(b.dataset.v) === Number(v)));
}

(async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let host = "";
  try { host = new URL(tab.url).hostname.replace(/^(www|m|web)\./, ""); } catch (e) {}
  const site = SITES.find((s) => host === s || host.endsWith("." + s));

  if (!site) {
    document.getElementById("unsupported").hidden = false;
    return;
  }

  const KEY = "vol:" + site;
  document.getElementById("site").textContent = site === "facebook.com" ? "Facebook" : "Instagram";
  document.getElementById("ready").hidden = false;

  const saved = await chrome.storage.sync.get(KEY);
  show(typeof saved[KEY] === "number" ? Math.round(saved[KEY] * 100) : DEFAULT);

  const save = (v) => { show(v); chrome.storage.sync.set({ [KEY]: v / 100 }); };
  slider.addEventListener("input", () => save(Number(slider.value)));
  presets.forEach((b) => b.addEventListener("click", () => save(Number(b.dataset.v))));
})();
