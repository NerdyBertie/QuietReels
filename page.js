// Quiet Reels (runs inside the page itself).
// Scales the site's own volume: whatever volume Facebook/Instagram asks for
// gets multiplied by your Quiet Reels level. Their slider at 100% = your level.
// Muting and lowering with the site's own controls are always respected.
(() => {
  const ATTR = "quietReelsLevel"; // data-quiet-reels-level on <html>
  const proto = HTMLMediaElement.prototype;
  const native = Object.getOwnPropertyDescriptor(proto, "volume");
  if (!native || !native.set) return;

  const requested = new WeakMap(); // the volume the site asked for (0 to 1)
  const lastReal = new WeakMap();  // the actual volume we last set

  function level() {
    const root = document.documentElement;
    const v = root ? parseFloat(root.dataset[ATTR]) : NaN;
    return Number.isFinite(v) ? v : 0.1;
  }
  const clamp = (v) => Math.min(1, Math.max(0, Number(v) || 0));
  const realOf = (el) => native.get.call(el);

  // If the site changed the volume without going through us (some players
  // keep their own copy of the volume control), treat the new value as what
  // the site wants instead of snapping it back to the old number.
  function adoptOutsideChange(el) {
    const real = realOf(el);
    if (!lastReal.has(el)) {
      if (!requested.has(el)) requested.set(el, real);
    } else if (Math.abs(real - lastReal.get(el)) > 0.001) {
      requested.set(el, real);
    }
  }

  function applyReal(el) {
    const want = requested.has(el) ? requested.get(el) : 1;
    const real = clamp(want * level());
    lastReal.set(el, real);
    if (Math.abs(realOf(el) - real) > 0.001) native.set.call(el, real);
  }

  function sync(el) {
    adoptOutsideChange(el);
    applyReal(el);
  }

  Object.defineProperty(proto, "volume", {
    configurable: true,
    enumerable: native.enumerable,
    get() { return requested.has(this) ? requested.get(this) : realOf(this); },
    set(v) {
      requested.set(this, clamp(v));
      applyReal(this);
    },
  });

  // New videos, plus any volume change the site makes (mute, lowering).
  // Note: "muted" is never touched, so the site's mute button always wins.
  ["loadstart", "loadedmetadata", "play", "playing", "volumechange"].forEach((type) => {
    document.addEventListener(type, (e) => {
      if (e.target instanceof HTMLMediaElement) sync(e.target);
    }, true);
  });

  // When you move the Quiet Reels slider, rescale everything on the page.
  const watch = () => {
    new MutationObserver(() => document.querySelectorAll("video, audio").forEach(applyReal))
      .observe(document.documentElement, { attributes: true, attributeFilter: ["data-quiet-reels-level"] });
  };
  if (document.documentElement) watch();
  else document.addEventListener("readystatechange", watch, { once: true });
})();
