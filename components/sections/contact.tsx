"use client";

import { Check, Linkedin, Mail, Phone } from "lucide-react";
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

  return (
    <section className="section band-deep contact" id="contact">
      <div className="wrap contact-grid">
        <div>
          <span className="label ember bare rv">Contact</span>
          <h2 className="h2 rv rv-d1">
            Let&apos;s grow your <span className="serif">business</span>.
          </h2>
          <p className="lede rv rv-d2">
            Tell me what you&apos;re building. I&apos;ll reply with how I&apos;d approach it, and
            what AI can take off your plate.
          </p>
          <div className="c-info rv rv-d3">
            <a href="mailto:hasnanenawaz@gmail.com">
              <Mail aria-hidden="true" />
              <span><small>Email</small><strong>hasnanenawaz@gmail.com</strong></span>
            </a>
            <a href="tel:+918269786782">
              <Phone aria-hidden="true" />
              <span><small>Call</small><strong>+91 8269 786 782</strong></span>
            </a>
            <a
              href="https://www.linkedin.com/in/hasnane-nawaz-19ba32294/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin aria-hidden="true" />
              <span><small>LinkedIn</small><strong>Hasnane Nawaz</strong></span>
            </a>
          </div>
        </div>

        <div className="card c-form rv rv-d1">
          <div className="field">
            <label htmlFor="nm">Your name</label>
            <input id="nm" type="text" placeholder="Priya Sharma" ref={nameRef} />
          </div>
          <div className="field">
            <label htmlFor="em">Email</label>
            <input id="em" type="email" placeholder="you@company.com" ref={emailRef} />
          </div>
          <div className="field">
            <label htmlFor="msg">What do you need help with?</label>
            <textarea
              id="msg"
              rows={4}
              placeholder="Growing our Instagram, running Meta Ads, building a community…"
              ref={msgRef}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={handleSend}
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : <>Send inquiry <span className="arr" aria-hidden="true">→</span></>}
          </button>
          <div aria-live="polite">
            {status === "ok" && (
              <p className="form-note form-ok">
                <Check aria-hidden="true" /> Message sent.
              </p>
            )}
            {status === "err" && note && <p className="form-note err">{note}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
