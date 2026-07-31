"use client";

import { useEffect, useRef, useState } from "react";

function avatarUrl(u) {
  if (u.avatar) {
    return `https://cdn.discordapp.com/avatars/${u.user_id}/${u.avatar}.png`;
  }
  const index = Number(BigInt(u.user_id) % 5n);
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
}

export default function MessageThread({ requestId, currentUserId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const listRef = useRef(null);

  async function load() {
    const res = await fetch(`/api/requests/${requestId}/messages`);
    if (res.ok) {
      const data = await res.json();
      setMessages(data.messages);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
    // Rafraîchit toutes les 8 s pour voir les nouveaux messages.
    const t = setInterval(load, 8000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // On scrolle uniquement le fil (pas la page entière).
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  async function send(e) {
    e.preventDefault();
    const body = text.trim();
    if (!body) return;
    setSending(true);
    const res = await fetch(`/api/requests/${requestId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    });
    if (res.ok) {
      setText("");
      await load();
    }
    setSending(false);
  }

  return (
    <div className="thread">
      <div className="thread-list" ref={listRef}>
        {loading ? (
          <p className="note">Chargement…</p>
        ) : messages.length === 0 ? (
          <p className="note">
            Aucun message pour l&apos;instant. Écris le premier ci-dessous.
          </p>
        ) : (
          messages.map((m) => {
            const mine = m.user_id === currentUserId;
            return (
              <div key={m.id} className={`msg ${mine ? "mine" : ""}`}>
                <img src={avatarUrl(m)} alt="" className="msg-avatar" />
                <div className="msg-bubble">
                  <div className="msg-head">
                    <strong>{m.global_name || m.username}</strong>
                    <span className="msg-time">
                      {new Date(m.created_at + "Z").toLocaleString("fr-FR")}
                    </span>
                  </div>
                  <div className="msg-body">{m.body}</div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <form className="thread-form" onSubmit={send}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Écris un message…"
          maxLength={2000}
        />
        <button className="btn" type="submit" disabled={sending}>
          {sending ? "…" : "Envoyer"}
        </button>
      </form>
    </div>
  );
}
