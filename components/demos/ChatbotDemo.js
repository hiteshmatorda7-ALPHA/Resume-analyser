"use client";
import { useState, useRef, useEffect } from "react";

// A scripted AI assistant. In a real project this is connected to an LLM trained on the client's data.
const BIZ = {
  clinic: {
    label: "Dental clinic",
    name: "SmileCare Dental",
    greet: "Hi! I'm the SmileCare assistant 🦷 I can answer questions, share prices or book your appointment. How can I help?",
    chips: ["Book an appointment", "Teeth cleaning price", "Clinic timings", "Where are you?"],
    book: { what: "appointment", slots: ["10:30 AM", "12:00 PM", "4:15 PM", "6:00 PM"] },
    intents: [
      [/price|cost|fee|charge|clean|scaling|rate/, "Teeth cleaning & polishing is ₹999. Consultation is ₹300 (free if you book a treatment the same day). Root canal starts at ₹4,500.\n\nWould you like to book a visit?"],
      [/time|timing|open|hour|sunday|close/, "We're open Mon–Sat, 10 AM – 8 PM, and Sunday 10 AM – 1 PM for emergencies."],
      [/where|address|location|map|reach/, "We're at SCO 12, Main Market, Rajpura — opposite the bus stand. Parking is available. I can send the Google Maps link on WhatsApp."],
      [/pain|emergency|urgent|hurt|swelling/, "Sorry you're in pain. We keep emergency slots every day — I can book the earliest one for you right now."],
      [/doctor|dentist|who/, "Dr. Mehta (BDS, MDS) has 12 years of experience in root canal and implants. Dr. Kaur specialises in braces and kids' dentistry."],
      [/insurance|card|upi|pay/, "We accept UPI, cards and cash, and most cashless insurance plans. EMI is available on treatments above ₹10,000."],
    ],
  },
  restaurant: {
    label: "Restaurant",
    name: "Spice Route Kitchen",
    greet: "Namaste! 🍛 Welcome to Spice Route Kitchen. I can share today's specials, take a table reservation or help you order. What would you like?",
    chips: ["Reserve a table", "Today's specials", "Do you deliver?", "Veg options"],
    book: { what: "table", slots: ["7:00 PM", "7:30 PM", "8:30 PM", "9:00 PM"] },
    intents: [
      [/special|menu|today|recommend|best/, "Today's specials:\n• Amritsari Kulcha thali — ₹249\n• Butter chicken + 2 naan — ₹329\n• Paneer tikka platter — ₹279\n\nShall I reserve a table?"],
      [/deliver|order|home|online|zomato|swiggy/, "Yes! Order directly on our website for free delivery within 5 km — and 10% off compared to delivery apps 🎉"],
      [/veg|vegetarian|jain|vegan/, "Over half our menu is vegetarian, and we can prepare Jain food on request."],
      [/time|open|hour|close/, "We're open every day from 12 PM to 11 PM."],
      [/party|birthday|group|event/, "We host parties up to 60 people with custom menus. I can connect you with our manager on WhatsApp."],
    ],
  },
  realestate: {
    label: "Real estate",
    name: "UrbanNest Realty",
    greet: "Hello! 🏡 I'm UrbanNest's property assistant. Looking to buy, rent or invest? Tell me your budget and preferred area.",
    chips: ["Book a site visit", "2 BHK under ₹50L", "Show 3 BHK options", "Home loan help"],
    book: { what: "site visit", slots: ["Sat 11 AM", "Sat 4 PM", "Sun 11 AM", "Sun 3 PM"] },
    intents: [
      [/2 ?bhk|50|budget|cheap|afford/, "We have 2 BHK flats in Green Valley from ₹42L (1,050 sq ft, ready to move) and Sunrise Heights from ₹48L (possession Dec 2027)."],
      [/3 ?bhk|villa|big|family/, "3 BHK options: Royal Residency ₹72L (1,650 sq ft, clubhouse + pool) and Orchid Villas from ₹95L with a private garden."],
      [/loan|emi|bank|finance/, "We partner with SBI, HDFC and ICICI. On a ₹40L loan the EMI is about ₹35,000/month over 20 years. Our team handles the paperwork for you."],
      [/where|location|area|near/, "Our projects are on the Rajpura–Chandigarh highway and Patiala Road — 25 minutes from Chandigarh."],
      [/rent|lease/, "Rentals start at ₹14,000/month for a furnished 2 BHK. Shall I book you a visit?"],
    ],
  },
};

const isBook = /book|appoint|reserve|visit|table|slot|schedule/;

export default function ChatbotDemo() {
  const [biz, setBiz] = useState("clinic");
  const [log, setLog] = useState([]);
  const [typing, setTyping] = useState(false);
  const [stage, setStage] = useState(null); // null | slot | name
  const [slot, setSlot] = useState(null);
  const [input, setInput] = useState("");
  const logRef = useRef(null);
  const B = BIZ[biz];

  useEffect(() => {
    setLog([{ from: "bot", text: BIZ[biz].greet }]);
    setStage(null);
  }, [biz]);
  useEffect(() => { logRef.current?.scrollTo({ top: 99999, behavior: "smooth" }); }, [log, typing]);

  const botSay = (text, extra = []) => {
    setTyping(true);
    setTimeout(() => { setTyping(false); setLog((l) => [...l, { from: "bot", text }, ...extra]); }, 650 + Math.min(text.length * 6, 900));
  };

  const send = (raw) => {
    const text = raw.trim();
    if (!text || typing) return;
    setInput("");
    setLog((l) => [...l, { from: "me", text }]);
    const q = text.toLowerCase();

    if (stage === "slot") {
      const chosen = B.book.slots.find((s) => q.includes(s.toLowerCase())) || text;
      setSlot(chosen);
      setStage("name");
      return botSay(`Great — ${chosen} is available ✅\nMay I have your name and mobile number to confirm?`);
    }
    if (stage === "name") {
      setStage(null);
      const name = text.split(/[,\d]/)[0].trim() || "there";
      return botSay(`Thank you, ${name}! Your ${B.book.what} at ${B.name} is confirmed for tomorrow, ${slot}.`, [
        { from: "sys", text: "✓ Saved to CRM · WhatsApp confirmation sent · Reminder scheduled" },
      ]);
    }
    if (isBook.test(q)) {
      setStage("slot");
      return botSay(`Sure! Here are tomorrow's available times for your ${B.book.what}. Which suits you?`);
    }
    const hit = B.intents.find(([re]) => re.test(q));
    if (hit) return botSay(hit[1]);
    if (/hi|hello|hey|namaste/.test(q)) return botSay("Hello! 😊 What can I help you with today?");
    if (/thank/.test(q)) return botSay("You're welcome! Anything else I can help with?");
    botSay(`Good question! I've passed it to the ${B.name} team and they'll reply on WhatsApp within a few minutes. Meanwhile, can I help you book a ${B.book.what}?`);
  };

  const chips = stage === "slot" ? B.book.slots : stage === "name" ? [] : B.chips;

  return (
    <div className="demo">
      <aside className="demo-side">
        <div>
          <h3>Pick a business</h3>
          <p>The same AI assistant adapts to any business. Switch to see.</p>
        </div>
        <div className="seg">
          {Object.entries(BIZ).map(([k, v]) => (
            <button key={k} aria-pressed={biz === k} onClick={() => setBiz(k)}>{v.label}</button>
          ))}
        </div>
        <div>
          <h3>Try asking</h3>
          <p>Prices, timings, location, or say “book” to go through a full booking.</p>
        </div>
        <div className="insight" style={{ marginTop: "auto" }}>
          <span>In a real setup the assistant is trained on your services and FAQs, works on your website and WhatsApp, and sends every lead to your CRM.</span>
        </div>
      </aside>
      <div className="demo-main">
        <div className="chat">
          <div className="chat-top">
            <span className="av">{B.name[0]}</span>
            <div><b>{B.name} assistant</b><span>● Online · replies instantly</span></div>
          </div>
          <div className="chat-log" ref={logRef} aria-live="polite">
            {log.map((m, i) => <div key={i} className={`msg ${m.from}`}>{m.text}</div>)}
            {typing && <div className="msg bot typing" aria-label="Assistant is typing"><i /><i /><i /></div>}
          </div>
          {chips.length > 0 && (
            <div className="chips">{chips.map((c) => <button key={c} onClick={() => send(c)}>{c}</button>)}</div>
          )}
          <form className="chat-in" onSubmit={(e) => { e.preventDefault(); send(input); }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={stage === "name" ? "e.g. Rahul, 98765 00000" : "Type a message…"} aria-label="Message" />
            <button className="btn btn-sm" type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
