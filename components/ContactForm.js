"use client";
import { useState } from "react";
import { site, pillars } from "@/lib/site";
import { waLink } from "./WhatsApp";

const keyMissing = !site.web3formsKey || site.web3formsKey.startsWith("YOUR_");

export default function ContactForm({ defaultService }) {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return; // spam trap

    // No form key yet → send the enquiry through WhatsApp instead, so no lead is lost.
    if (keyMissing) {
      const msg = `New enquiry from website\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nService: ${data.service}\nBudget: ${data.budget}\n\n${data.message}`;
      window.open(waLink(msg), "_blank", "noopener");
      setStatus("sent");
      form.reset();
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.web3formsKey,
          subject: `New enquiry from ${data.name} — ${data.service}`,
          from_name: `${site.name} website`,
          ...data,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("Your message couldn't be sent. Check your connection and try again, or message us on WhatsApp.");
    }
  }

  if (status === "sent") {
    return (
      <div className="alert ok" role="status">
        Thanks — your enquiry has been sent. We'll reply within one working day with next steps.
        <div style={{ marginTop: 12 }}>
          <button className="btn btn-ghost" onClick={() => setStatus("idle")}>Send another enquiry</button>
        </div>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="company">Business name</label>
        <input id="company" name="company" autoComplete="organization" />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="phone">Phone / WhatsApp</label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" />
      </div>
      <div className="field">
        <label htmlFor="service">What do you need?</label>
        <select id="service" name="service" defaultValue={defaultService || "Business Websites"}>
          {pillars.map((p) => (
            <optgroup key={p.id} label={p.title}>{p.services.map((s) => <option key={s.slug}>{s.title}</option>)}</optgroup>
          ))}
          <option>Not sure yet</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="budget">Budget</label>
        <select id="budget" name="budget" defaultValue="₹15k – ₹35k">
          <option>Under ₹15k</option>
          <option>₹15k – ₹35k</option>
          <option>₹35k – ₹1L</option>
          <option>₹1L+</option>
          <option>Need guidance</option>
        </select>
      </div>
      <div className="field full">
        <label htmlFor="message">Tell us about your project</label>
        <textarea id="message" name="message" required placeholder="What does your business do, and what should the website or software help with?" />
      </div>
      {status === "error" && <div className="alert err full" role="alert">{error}</div>}
      <div className="full btn-row" style={{ alignItems: "center" }}>
        <button className="btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <span className="form-note">We reply within one working day.</span>
      </div>
    </form>
  );
}
