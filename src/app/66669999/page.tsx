"use client";

import { useRouter } from "next/navigation";

export default function SecretPrankPage() {
  const router = useRouter();

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "12px" }}>
        🔥 SECRET CODE: 66669999
      </h1>

      <p style={{ marginBottom: "30px", color: "#ccc" }}>
        You found the secret prank! Are you brave enough?
      </p>

      <button
        onClick={() => router.push("/surprise")}
        style={{
          background: "#ff6a00",
          color: "#fff",
          padding: "22px 35px",
          fontSize: "20px",
          fontWeight: "bold",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
        }}
      >
        DON'T PRESS BUTTON
      </button>
    </main>
  );
}
