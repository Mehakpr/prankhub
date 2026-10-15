"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const AdSpace = ({ number }: { number: number }) => (
    <div
      style={{
        width: "100%",
        maxWidth: "320px",
        minHeight: "70px",
        border: "1px dashed #555",
        borderRadius: "8px",
        backgroundColor: "#151515",
        color: "#888",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
      }}
    >
      AD SPACE {number}
    </div>
  );

  return (
    <main
      style={{
        minHeight: "100dvh",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "15px",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <AdSpace number={1} />
      <AdSpace number={2} />

      <button
        onClick={() => router.push("/surprise")}
        style={{
          backgroundColor: "#ff6a00",
          color: "#fff",
          padding: "22px 30px",
          fontSize: "19px",
          fontWeight: "bold",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          margin: "25px 0",
          boxShadow: "0 0 30px rgba(255,106,0,0.5)",
        }}
      >
        DON'T PRESS BUTTON
      </button>

      <AdSpace number={3} />
      <AdSpace number={4} />
    </main>
  );
}
