// Custom Ruffle player — modified WASM with simulate_key_down/up + audio + scaling
let _wasmMod = null;
let _importsMod = null;

async function loadWasm() {
  if (_wasmMod) return _wasmMod;
  const base = import.meta.url.replace(/[^/]+$/, "");
  const bgMod = await import(new URL("./ruffle_web_bg.js", import.meta.url).href);
  _importsMod = await import(new URL("./ruffle-imports.js", import.meta.url).href);
  const wasmUrl = new URL("./ruffle_web_bg.wasm", import.meta.url).href;
  const wasmResp = await fetch(wasmUrl);
  if (!wasmResp.ok) throw new Error("WASM fetch failed: " + wasmUrl);
  const wasmBytes = await wasmResp.arrayBuffer();
  const wasmObj = await WebAssembly.instantiate(wasmBytes, {
    "./ruffle_web_bg.js": bgMod,
    "./ruffle-imports": _importsMod,
  });
  bgMod.__wbg_set_wasm(wasmObj.instance.exports);
  wasmObj.instance.exports.__wbindgen_start();
  _wasmMod = bgMod;
  return bgMod;
}

window.RufflePlayer = {
  newest() {
    return {
      createPlayer() {
        let _handle = null, _builder = null, _events = {};
        const player = {
          style: { cssText: "", width: "", height: "" },
          config: {},
          load: async function(opts) {
            const bgMod = await loadWasm();
            console.log("Custom Ruffle WASM loaded — simulate_key_down/up ready");
            _builder = new bgMod.RuffleInstanceBuilder();
            _builder.setAllowFullscreen(false);
            if (window.__API_BASE__) {
              const api = window.__API_BASE__ + "/api/agi-proxy";
              ["armorgames\\.com", "addictinggames\\.com", "services\\.armorgames\\.com", "agi\\.armorgames\\.com"]
                .forEach(h => { try { _builder.addUrlRewriteRule(new RegExp("https?://(www\\.)?" + h + "/.*"), api); } catch(e) {} });
            }
            const container = document.getElementById("game-canvas") || document.body;
            container.innerHTML = "";
            container.style.position = "relative";
            const jsPlayer = {
              onCallbackAvailable: () => {}, getObjectId: () => "0", callFSCommand: () => {},
              displayMessage: () => {}, openVirtualKeyboard: () => {}, closeVirtualKeyboard: () => {},
              isVirtualKeyboardFocused: () => false, displayRootMovieDownloadFailedMessage: () => {},
              displayRestoredFromBfcacheMessage: () => {}, displayUnsupportedVideo: () => {},
              setFullscreen: () => {}, setMetadata: () => {}, suppressContextMenu: () => {},
              reloadWithCanvasRenderer: () => {}, isFullscreen: false, displayClipboardModal: () => {},
            };
            try {
              _handle = await _builder.build(container, jsPlayer);
              const canvas = container.querySelector("canvas");
              if (canvas) {
                const resize = () => {
                  const pw = container.clientWidth, ph = container.clientHeight;
                  if (pw === 0 || ph === 0) return;
                  const ASPECT = 5 / 4;
                  let w, h;
                  if (pw / ph > ASPECT) { h = ph; w = h * ASPECT; }
                  else { w = pw; h = w / ASPECT; }
                  w = Math.floor(w); h = Math.floor(h);
                  canvas.setAttribute("width", w); canvas.setAttribute("height", h);
                  canvas.style.setProperty("width", w + "px", "important");
                  canvas.style.setProperty("height", h + "px", "important");
                  canvas.style.setProperty("display", "block", "important");
                  canvas.style.setProperty("position", "absolute", "important");
                  canvas.style.setProperty("top", "50%", "important");
                  canvas.style.setProperty("left", "50%", "important");
                  canvas.style.setProperty("transform", "translate(-50%, -50%)", "important");
                };
                resize();
                new ResizeObserver(resize).observe(container);
                window.addEventListener("resize", resize);
                setInterval(resize, 500);
                player._resizeHandler = resize;
              }
            } catch(e) { console.error("Ruffle build failed:", e); return; }
            try { _handle.stream_from(opts.url, {}); }
            catch(e) { console.error("SWF load failed:", e); return; }
            _handle.play();
            player.simulate_key_down = (code) => { try { _handle.simulate_key_down(code); } catch(e) {} };
            player.simulate_key_up = (code) => { try { _handle.simulate_key_up(code); } catch(e) {} };
            console.log("Game running — Arrow keys: Fireboy, buttons: Watergirl");
            if (_events.loadedmetadata) setTimeout(() => _events.loadedmetadata(), 100);
          },
          addEventListener: function(name, fn) { _events[name] = fn; },
          remove: function() {
            if (player._resizeHandler) window.removeEventListener("resize", player._resizeHandler);
            if (_handle) { try { _handle.free(); } catch(e) {}; _handle = null; }
            if (_builder) { try { _builder.free(); } catch(e) {}; _builder = null; }
            // Stop audio
            if (_importsMod && _importsMod.resetAudio) _importsMod.resetAudio();
            const c = document.getElementById("game-canvas");
            if (c) c.innerHTML = "";
          },
        };
        return player;
      },
    };
  },
};
