"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";

export default function Avatar({ src, name, size = 104 }) {
  const [failed, setFailed] = useState(false);
  const initial = (name || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="avatar-ring" style={{ width: size, height: size }}>
      {src && !failed ? (

        <img
          className="avatar-img"
          src={asset(src)}
          alt=""
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="avatar-fallback">{initial}</span>
      )}
      <span className="avatar-status" title="En ligne" />
    </div>
  );
}
