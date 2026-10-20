"use client";
import { useState, useRef, useEffect } from "react";
import { icons } from "../Icons";

const FLOWS = {
  lead: {
    label: "New website lead",
    nodes: [["form", "Form filled", "Website"], ["sparkle", "AI qualifies", "Budget & intent"], ["crm", "CRM entry", "Assigned to sales"], ["chat", "WhatsApp reply", "Within 5 sec"], ["bell", "Follow-up", "Day 2 reminder"]],
    logs: ["Lead received: Priya Sharma · interested in 'Business website' · budget ₹35k", "AI score 86/100 → hot lead (clear budget, wants to start this month)", "Contact created in CRM · deal ₹34,999 · owner: Aman", "WhatsApp sent: \"Hi Priya, thanks for reaching out! Here's our portfolio…\"", "Follow-up task scheduled for tomorrow 11:00 AM"],
    saved: 12,
  },
  order: {
    label: "New online order",
    nodes: [["cart", "Order placed", "Online store"], ["db", "Stock updated", "Inventory"], ["invoice", "GST invoice", "Auto-generated"], ["chat", "WhatsApp update", "Order confirmed"], ["bell", "Shipping booked", "Courier pickup"]],
    logs: ["Order #2318 · 3 items · ₹2,460 · paid via UPI", "Inventory: Organic honey 500g 41 → 40 · low-stock alert off", "GST invoice INV-2318 created and emailed (CGST 9% + SGST 9%)", "WhatsApp to customer: \"Your order #2318 is confirmed 🎉\"", "Shiprocket pickup booked · AWB 7745210093 · tracking link sent"],
    saved: 9,
  },
  invoice: {
    label: "Invoice payment due",
    nodes: [["invoice", "Invoice due", "Accounts"], ["mail", "Email reminder", "3 days before"], ["chat", "WhatsApp nudge", "With UPI link"], ["db", "Payment matched", "Bank sync"], ["bell", "Owner report", "Daily summary"]],
    logs: ["Invoice INV-1042 · Gupta Traders · ₹48,500 · due in 3 days", "Email reminder sent with PDF invoice attached", "WhatsApp: \"Gentle reminder — pay securely via UPI: upi://pay?…\"", "₹48,500 received · matched to INV-1042 · marked paid in Tally", "Daily report to owner: ₹1,82,000 collected today, 2 invoices overdue"],
    saved: 15,
  },
};

export default function AutomationDemo() {
  const [flow, setFlow] = useState("lead");
  const [step, setStep] = useState(-1);
  const [logs, setLogs] = useState([]);
  const [runs, setRuns] = useState(0);
  const [mins, setMins] = useState(0);
  const timers = useRef([]);
  const F = FLOWS[flow];
  const running = step >= 0 && step < F.nodes.length;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const reset = (f) => { timers.current.forEach(clearTimeout); setFlow(f); setStep(-1); setLogs([]); };

  const run = () => {
    timers.current.forEach(clearTimeout);
    setLogs([]);
    const t0 = new Date();
    F.nodes.forEach((_, i) => {
      timers.current.push(setTimeout(() => {
        setStep(i);
        const t = new Date(t0.getTime() + i * 1100).toLocaleTimeString("en-IN", { hour12: false });
        setLogs((l) => [...l, { t, text: F.logs[i] }]);
      }, i * 900));
    });
    timers.current.push(setTimeout(() => { setStep(F.nodes.length); setRuns((r) => r + 1); setMins((m) => m + F.saved); }, F.nodes.length * 900));
  };

  return (
    <div className="demo">
      <aside className="demo-side">
        <div><h3>Choose a workflow</h3><p>These run automatically, 24/7, every time the event happens.</p></div>
        <div className="seg" style={{ flexDirection: "column", alignItems: "stretch" }}>
          {Object.entries(FLOWS).map(([k, v]) => <button key={k} aria-pressed={flow === k} onClick={() => reset(k)} style={{ textAlign: "left" }}>{v.label}</button>)}
        </div>
        <button className="btn" onClick={run} disabled={running}>{running ? "Running…" : step === F.nodes.length ? "Run again" : "▶ Run automation"}</button>
        <p style={{ marginTop: "auto" }}>Works with WhatsApp, Gmail, Tally, Zoho, Google Sheets, Razorpay, Shiprocket and your own software.</p>
      </aside>
      <div className="demo-main">
        <div className="flowmap">
          {F.nodes.map(([ico, t, s], i) => (
            <div key={t} className={`node ${i < step || step === F.nodes.length ? "done" : i === step ? "on" : ""}`}>
              <div className="ni">{icons[ico]}</div><b>{t}</b><span>{s}</span>
            </div>
          ))}
        </div>
        <div className="console-log" aria-live="polite">
          {logs.length === 0 && <div style={{ color: "#6f849c" }}>Press “Run automation” to watch it work…</div>}
          {logs.map((l, i) => <div key={i}><span className="tm">{l.t}</span><span className={i === F.nodes.length - 1 ? "ok" : ""}>✓ {l.text}</span></div>)}
        </div>
        <div className="counters">
          <div className="counter"><b>{runs}</b><span>workflows run</span></div>
          <div className="counter"><b>{mins} min</b><span>manual work saved</span></div>
          <div className="counter"><b>0</b><span>human clicks needed</span></div>
        </div>
      </div>
    </div>
  );
}
