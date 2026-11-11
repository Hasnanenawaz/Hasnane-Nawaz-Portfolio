"use client";

import { useRef, useState } from "react";

type Status = "idle" | "sending" | "ok" | "err";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    const nm = nameRef.current?.value.trim() ?? "";
    const em = emailRef.current?.value.trim() ?? "";
    const msg = msgRef.current?.value.trim() ?? "";

    if (!nm || !em || !msg) {
      setStatus("err");
      setNote("Please fill in name, email, and message first.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setStatus("err");
      setNote("That email address looks off — mind checking it?");
      return;
    }

    setStatus("sending");
    setNote("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nm, email: em, message: msg }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("ok");
        setNote(data.message ?? "Message sent!");
        if (nameRef.current) nameRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
        if (msgRef.current) msgRef.current.value = "";
      } else {
        setStatus("err");
        setNote(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("err");
      setNote("Network error. Please try emailing directly.");
    }
  };

  const noteColor =
    status === "ok" ? "#a9d820" : status === "err" ? "#ffd2b8" : "#9fb6a6";

  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <span className="eyebrow rv">Contact</span>
        <h2 className="title rv rv-d1">
          Let&apos;s build the next <em>growth story</em>.
        </h2>
        <p className="lede rv rv-d2">
          For growth roles, internships, freelance campaigns, and collaborations. The
          fastest path is email or phone — or fill the form and I&apos;ll get back to you.
        </p>
        <div className="contact-grid">
          <div className="c-info rv from-left">
            <a href="mailto:hasnanenawaz@gmail.com">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 6L2 7" />
                </svg>
              </span>
              hasnanenawaz@gmail.com
            </a>
            <a href="tel:+918269786782">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              </span>
              +91 8269 786 782
            </a>
            <div>
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              Durg, Chhattisgarh, India
            </div>
            <a
              href="https://www.linkedin.com/in/hasnane-nawaz-19ba32294/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                </svg>
              </span>
              linkedin.com/in/hasnane-nawaz-19ba32294
            </a>
          </div>

          <div className="c-form rv from-right rv-d1">
            <div className="field">
              <label htmlFor="nm">Name</label>
              <input id="nm" type="text" placeholder="Your name" ref={nameRef} />
            </div>
            <div className="field">
              <label htmlFor="em">Email</label>
              <input id="em" type="email" placeholder="you@company.com" ref={emailRef} />
            </div>
            <div className="field">
              <label htmlFor="msg">Message</label>
              <textarea
                id="msg"
                rows={4}
                placeholder="What growth problem can I help with?"
                ref={msgRef}
              />
            </div>
            <button
              className="btn btn-primary magnet"
              onClick={handleSend}
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : status === "ok" ? "Sent ✓" : "Send inquiry ↗"}
            </button>
            {note && (
              <p className="form-note" style={{ color: noteColor }}>
                {note}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
