// Ruffle WASM imports

// === Audio: Ring-buffer streaming to prevent glitches ===

let _audioCtx = null;
let _leftBuf = null;  // Float32Array ring buffer
let _rightBuf = null;
let _writePos = 0;
let _readPos = 0;
let _bufSize = 0;
const RING_SAMPLES = 65536; // ~1.5 seconds at 44.1kHz — plenty of headroom
let _procNode = null; // ScriptProcessorNode for continuous playback
let _audioInited = false;

function initAudio() {
  if (_audioInited) return;
  _audioInited = true;

  _audioCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 44100 });
  _leftBuf = new Float32Array(RING_SAMPLES);
  _rightBuf = new Float32Array(RING_SAMPLES);
  _writePos = 0;
  _readPos = 0;
  _bufSize = 0;

  // ScriptProcessorNode for gapless streaming playback
  // Buffer size 2048 = ~46ms latency — good balance
  _procNode = _audioCtx.createScriptProcessor(2048, 0, 2);
  _procNode.onaudioprocess = (e) => {
    const outL = e.outputBuffer.getChannelData(0);
    const outR = e.outputBuffer.getChannelData(1);
    const needed = outL.length;

    if (_bufSize < needed) {
      // Underrun — output silence and reset
      outL.fill(0);
      outR.fill(0);
      return;
    }

    for (let i = 0; i < needed; i++) {
      outL[i] = _leftBuf[_readPos];
      outR[i] = _rightBuf[_readPos];
      _readPos = (_readPos + 1) % RING_SAMPLES;
    }
    _bufSize -= needed;
  };
  _procNode.connect(_audioCtx.destination);

  // Resume if suspended (browser autoplay policy)
  if (_audioCtx.state === "suspended") _audioCtx.resume();
}

function destroyAudio() {
  if (_procNode) {
    try { _procNode.disconnect(); } catch(e) {}
    _procNode = null;
  }
  if (_audioCtx) {
    _audioCtx.close().catch(() => {});
    _audioCtx = null;
  }
  _leftBuf = null;
  _rightBuf = null;
  _audioInited = false;
  _bufSize = 0;
}

export function copyToAudioBufferInterleaved(pointer, data) {
  try {
    initAudio();
    const samples = new Float32Array(data);
    const frameCount = samples.length / 2;
    if (frameCount === 0) return;

    // Write interleaved samples to ring buffer
    // If buffer would overflow, drop oldest samples (glitch prevention)
    if (_bufSize + frameCount > RING_SAMPLES) {
      const drop = (_bufSize + frameCount) - RING_SAMPLES + 2048;
      _readPos = (_readPos + drop) % RING_SAMPLES;
      _bufSize -= drop;
      if (_bufSize < 0) _bufSize = 0;
    }

    for (let i = 0; i < frameCount; i++) {
      _leftBuf[_writePos] = samples[i * 2] || 0;
      _rightBuf[_writePos] = samples[i * 2 + 1] || 0;
      _writePos = (_writePos + 1) % RING_SAMPLES;
    }
    _bufSize += frameCount;
  } catch(e) {}
}

export function resetAudio() {
  destroyAudio();
}

// === ExternalInterface ===

export function callExternalInterface(method, values) {
  try {
    const fn = window[method];
    if (typeof fn === "function") return fn(...values);
    const parts = method.split(".");
    let obj = window;
    for (const part of parts) {
      obj = obj[part];
      if (!obj) return null;
    }
    if (typeof obj === "function") return obj(...values);
    return null;
  } catch (e) {
    return null;
  }
}
