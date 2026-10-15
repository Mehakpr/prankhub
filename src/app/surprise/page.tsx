"use client";

import { useEffect, useRef, useState } from "react";

export default function Surprise() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = false;
    video.volume = 1;

    video.play().catch(() => {
      setBlocked(true);
    });
  }, []);

  const playVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = false;
      await video.play();
      setBlocked(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100dvh",
        background: "#000",
        zIndex: 9999,
      }}
    >
      <video
        ref={videoRef}
        src="/videos/240035.mp4"
        playsInline
        autoPlay
        preload="auto"
        onEnded={() => {
          if (videoRef.current) {
            videoRef.current.style.display = "none";
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          background: "#000",
        }}
      />

      {blocked && (
        <button
          onClick={playVideo}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "18px 30px",
            background: "#ff6a00",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          ▶ TAP TO PLAY
        </button>
      )}
    </main>
  );
}
