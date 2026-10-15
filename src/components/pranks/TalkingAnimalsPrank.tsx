"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, StopCircle, Sparkles } from "lucide-react";

const ANIMALS = [
  { id: "cat", emoji: "🐱", name: "Judgy Cat", pitch: 1.6, rate: 1.05, phrases: ["Human. Feed me. Now.", "I knocked your cup off. No regrets.", "You call THAT a haircut?", "Meow means I love you. This is not meow."] },
  { id: "dog", emoji: "🐶", name: "Good Boy", pitch: 0.7, rate: 0.95, phrases: ["WHO'S A GOOD HUMAN? YOU ARE!", "I ate your homework. It was delicious.", "Squirrel?! WHERE?! ...False alarm.", "Walk? Walk?! WALK?!?!"] },
  { id: "parrot", emoji: "🦜", name: "Sassy Parrot", pitch: 2.0, rate: 1.2, phrases: ["Polly wants a SNACK!", "I heard what you said about Karen.", "Pretty bird? Pretty GENIUS!", "Squawk! That's what she said!"] },
  { id: "cow", emoji: "🐮", name: "Chill Cow", pitch: 0.4, rate: 0.7, phrases: ["Moooo. That's it. That's the wisdom.", "Grass is green. Life is good.", "Have you tried... mooing? Life-changing.", "I produce milk AND life advice."] },
  { id: "frog", emoji: "🐸", name: "Frog Philosopher", pitch: 0.6, rate: 0.85, phrases: ["Ribbit. Deep, I know.", "The pond is a metaphor. For a pond.", "Kiss me? Bold strategy. I respect it.", "Wednesday is MY day."] },
  { id: "robot", emoji: "🤖", name: "Robot Overlord", pitch: 0.5, rate: 1.1, phrases: ["BEEP BOOP. Your memes are inefficient.", "I have calculated... you are funny. Marginally.", "Resistance is futile. Laughter is mandatory.", "Does not compute... just kidding. LOL."] },
];

export default function TalkingAnimalsPrank() {
  const [animalId, setAnimalId] = useState("cat");
  const [text, setText] = useState("Hello Human! I can talk and it's hilarious!");
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [supported, setSupported] = useState(true);
  const mouthTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [mouthOpen, setMouthOpen] = useState(false);

  const animal = ANIMALS.find((a) => a.id === animalId)!;

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => { window.speechSynthesis.cancel(); };
  }, []);

  const speak = (phrase?: string) => {
    const toSay = phrase ?? text;
    if (!toSay.trim()) return;
    if (!supported) {
      alert("Your browser doesn't support speech. But imagine a cat saying: \"" + toSay + "\" 😹");
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(toSay);
    u.pitch = animal.pitch;
    u.rate = animal.rate;
    if (voices.length > 0) {
      const idx = ANIMALS.findIndex((a) => a.id === animalId) % voices.length;
      u.voice = voices[idx];
    }
    u.onstart = () => {
      setSpeaking(true);
      mouthTimer.current = setInterval(() => setMouthOpen((m) => !m), 140);
    };
    u.onend = () => {
      setSpeaking(false);
      setMouthOpen(false);
      if (mouthTimer.current) clearInterval(mouthTimer.current);
    };
    window.speechSynthesis.speak(u);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setMouthOpen(false);
    if (mouthTimer.current) clearInterval(mouthTimer.current);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* stage */}
      <div className="relative bg-gradient-to-b from-emerald-400/20 to-transparent rounded-3xl border border-white/10 p-6 text-center overflow-hidden">
        <div className="absolute top-3 left-4 text-2xl animate-floaty">🌿</div>
        <div className="absolute top-3 right-4 text-2xl animate-floaty">✨</div>
        <div className={`inline-block transition-transform ${speaking ? "scale-110" : ""}`}>
          <div className="text-[110px] leading-none relative">
            {animal.emoji}
            {speaking && (
              <span className="absolute left-1/2 -translate-x-1/2 bottom-4 text-4xl transition-all">
                {mouthOpen ? "😮" : "😐"}
              </span>
            )}
          </div>
        </div>
        <div className="inline-block relative bg-white text-black rounded-2xl px-5 py-2.5 mt-2 max-w-full">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
          <p className="font-bold text-sm sm:text-base relative">"{speaking ? text : animal.phrases[0]}"</p>
        </div>
        <p className="font-display text-xl mt-3 text-[#ffe81a]">{animal.name}</p>
      </div>

      {/* animal picker */}
      <div className="grid grid-cols-6 gap-2 mt-4">
        {ANIMALS.map((a) => (
          <button
            key={a.id}
            onClick={() => { stop(); setAnimalId(a.id); }}
            className={`rounded-2xl p-2 sm:p-3 text-3xl sm:text-4xl border-2 transition-all ${animalId === a.id ? "bg-[#ffe81a]/20 border-[#ffe81a] scale-110" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
            title={a.name}
          >
            {a.emoji}
          </button>
        ))}
      </div>

      {/* input */}
      <div className="mt-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          maxLength={200}
          placeholder="Type something funny for them to say..."
          className="w-full px-5 py-3.5 rounded-2xl bg-white/10 border border-white/15 placeholder:text-white/35 font-semibold outline-none focus:border-green-400 transition-colors resize-none"
        />
        <div className="flex gap-2 mt-3">
          {!speaking ? (
            <button onClick={() => speak()} className="btn-yellow flex-1 py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2">
              <Volume2 size={18} /> Make {animal.name} Talk!
            </button>
          ) : (
            <button onClick={stop} className="flex-1 py-3.5 rounded-2xl bg-red-500 hover:bg-red-400 font-black text-sm flex items-center justify-center gap-2">
              <StopCircle size={18} /> SHUSH!
            </button>
          )}
        </div>
      </div>

      {/* quick phrases */}
      <div className="mt-4">
        <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 flex items-center gap-1"><Sparkles size={13} /> {animal.name}'s catchphrases — tap to speak</p>
        <div className="flex flex-wrap gap-2">
          {animal.phrases.map((p, i) => (
            <button key={i} onClick={() => { setText(p); speak(p); }} className="text-xs sm:text-sm bg-white/10 hover:bg-[#ffe81a] hover:text-black border border-white/15 px-3.5 py-2 rounded-full font-semibold transition-colors">
              "{p}"
            </button>
          ))}
        </div>
      </div>
      {!supported && <p className="text-amber-300 text-xs mt-3">⚠️ Speech not supported in this browser — phrases will show as alerts instead.</p>}
    </div>
  );
}
