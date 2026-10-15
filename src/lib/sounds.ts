// Synthesized funny sounds using Web Audio API — no external files needed.
let ctx: AudioContext | null = null;

export function getCtx(): AudioContext {
  if (!ctx) ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function osc(type: OscillatorType, freq: number, t0: number, dur: number, vol = 0.5, freqEnd?: number, dest?: AudioNode) {
  const c = getCtx();
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (freqEnd !== undefined) o.frequency.exponentialRampToValueAtTime(Math.max(1, freqEnd), t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(dest ?? c.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.05);
}

function noise(t0: number, dur: number, vol = 0.5, filterFreq = 1000, type: BiquadFilterType = "lowpass") {
  const c = getCtx();
  const len = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = type;
  f.frequency.value = filterFreq;
  const g = c.createGain();
  g.gain.setValueAtTime(vol, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(f).connect(g).connect(c.destination);
  src.start(t0);
}

export const SOUNDS: Record<string, { name: string; emoji: string; color: string; play: () => void }> = {
  airhorn: {
    name: "Air Horn", emoji: "📯", color: "bg-red-500",
    play() {
      const c = getCtx(); const t = c.currentTime;
      [233, 466, 622].forEach((f) => { osc("sawtooth", f, t, 1.2, 0.25); osc("square", f / 2, t, 1.2, 0.12); });
      noise(t, 1.2, 0.06, 3000, "highpass");
    },
  },
  fart: {
    name: "Fart", emoji: "💨", color: "bg-green-600",
    play() {
      const c = getCtx(); const t = c.currentTime;
      // wobbly low square with vibrato
      const o = c.createOscillator(); const g = c.createGain(); const lfo = c.createOscillator(); const lg = c.createGain();
      o.type = "square"; o.frequency.setValueAtTime(90, t);
      o.frequency.linearRampToValueAtTime(45, t + 0.7);
      lfo.frequency.value = 28; lg.gain.value = 30;
      lfo.connect(lg).connect(o.frequency);
      g.gain.setValueAtTime(0.4, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.75);
      o.connect(g).connect(c.destination);
      o.start(t); lfo.start(t); o.stop(t + 0.8); lfo.stop(t + 0.8);
      noise(t, 0.4, 0.05, 400);
    },
  },
  trombone: {
    name: "Sad Trombone", emoji: "🎺", color: "bg-blue-600",
    play() {
      const c = getCtx(); const t = c.currentTime;
      const notes: [number, number, number][] = [[233, 0, 0.35], [220, 0.35, 0.35], [208, 0.7, 0.35], [196, 1.05, 1.0]];
      notes.forEach(([f, dt, dur], i) => {
        const end = i === 3 ? f * 0.94 : f;
        osc("sawtooth", f, t + dt, dur, 0.3, end);
        osc("triangle", f * 2, t + dt, dur, 0.1, end * 2);
      });
    },
  },
  boing: {
    name: "Boing", emoji: "🌀", color: "bg-purple-500",
    play() {
      const c = getCtx(); const t = c.currentTime;
      osc("sine", 120, t, 0.7, 0.5, 600);
      osc("triangle", 240, t + 0.05, 0.6, 0.2, 900);
    },
  },
  laser: {
    name: "Laser", emoji: "🔫", color: "bg-cyan-500",
    play() {
      const c = getCtx(); const t = c.currentTime;
      for (let i = 0; i < 3; i++) osc("sawtooth", 1800 - i * 200, t + i * 0.18, 0.16, 0.3, 200);
    },
  },
  scream: {
    name: "Scream", emoji: "😱", color: "bg-orange-600",
    play() {
      const c = getCtx(); const t = c.currentTime;
      osc("sawtooth", 900, t, 0.9, 0.3, 400);
      osc("square", 1350, t, 0.9, 0.12, 600);
      noise(t, 0.9, 0.15, 2500, "bandpass");
    },
  },
  applause: {
    name: "Applause", emoji: "👏", color: "bg-pink-500",
    play() {
      const c = getCtx(); const t = c.currentTime;
      for (let i = 0; i < 40; i++) noise(t + Math.random() * 1.6, 0.06, 0.18, 2000 + Math.random() * 3000, "bandpass");
    },
  },
  burp: {
    name: "Burp", emoji: "🤢", color: "bg-lime-600",
    play() {
      const c = getCtx(); const t = c.currentTime;
      const o = c.createOscillator(); const g = c.createGain();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(160, t);
      o.frequency.linearRampToValueAtTime(70, t + 0.5);
      g.gain.setValueAtTime(0.35, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
      o.connect(g).connect(c.destination);
      o.start(t); o.stop(t + 0.6);
      noise(t, 0.3, 0.08, 500);
    },
  },
  alarm: {
    name: "Alarm", emoji: "🚨", color: "bg-red-600",
    play() {
      const c = getCtx(); const t = c.currentTime;
      for (let i = 0; i < 4; i++) {
        osc("square", 660, t + i * 0.4, 0.2, 0.25);
        osc("square", 520, t + i * 0.4 + 0.2, 0.2, 0.25);
      }
    },
  },
  cash: {
    name: "Cha-Ching", emoji: "💰", color: "bg-yellow-500",
    play() {
      const c = getCtx(); const t = c.currentTime;
      osc("sine", 880, t, 0.15, 0.4);
      osc("sine", 1320, t + 0.12, 0.5, 0.4);
    },
  },
  fart2: {
    name: "Squeak", emoji: "🐭", color: "bg-indigo-500",
    play() {
      const c = getCtx(); const t = c.currentTime;
      for (let i = 0; i < 5; i++) osc("sine", 2000 + Math.random() * 1500, t + i * 0.09, 0.08, 0.35, 3000);
    },
  },
  drums: {
    name: "Badum-Tss", emoji: "🥁", color: "bg-amber-600",
    play() {
      const c = getCtx(); const t = c.currentTime;
      noise(t, 0.15, 0.4, 300); // kick-ish
      noise(t + 0.25, 0.1, 0.3, 1500, "highpass");
      noise(t + 0.45, 0.1, 0.3, 1500, "highpass");
      osc("square", 200, t + 0.6, 0.1, 0.2);
      noise(t + 0.7, 0.8, 0.25, 5000, "highpass"); // crash
    },
  },
};

export function playJumpScream() {
  const c = getCtx(); const t = c.currentTime;
  osc("sawtooth", 1200, t, 1.4, 0.45, 180);
  osc("square", 800, t, 1.4, 0.25, 120);
  osc("sawtooth", 2400, t + 0.05, 1.2, 0.2, 300);
  noise(t, 1.4, 0.3, 1800, "bandpass");
}

export function playPop() {
  const c = getCtx(); const t = c.currentTime;
  osc("sine", 400, t, 0.12, 0.4, 900);
}

export function playSuccess() {
  const c = getCtx(); const t = c.currentTime;
  [523, 659, 784, 1047].forEach((f, i) => osc("triangle", f, t + i * 0.12, 0.3, 0.35));
}
