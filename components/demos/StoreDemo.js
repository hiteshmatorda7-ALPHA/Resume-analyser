"use client";
import { useState, useMemo } from "react";
import { icons } from "../Icons";

const PRODUCTS = [
  { id: 1, n: "Organic honey 500g", p: 449, e: "🍯", bg: "#fdf3dc" },
  { id: 2, n: "Cold-pressed mustard oil", p: 329, e: "🫒", bg: "#eef6e4" },
  { id: 3, n: "Millet muesli 750g", p: 399, e: "🥣", bg: "#f6efe6" },
  { id: 4, n: "Assam green tea", p: 279, e: "🍵", bg: "#e7f3ec" },
  { id: 5, n: "Premium dry-fruit box", p: 899, e: "🥜", bg: "#f7ebe3" },
  { id: 6, n: "Jaggery powder 1kg", p: 189, e: "🟫", bg: "#f3ece4" },
];
const inr = (n) => "₹" + n.toLocaleString("en-IN");
// Decorative QR-like pattern (not a real payment code)
const QR = Array.from({ length: 121 }, (_, i) => { const x = i % 11, y = Math.floor(i / 11); const f = (x < 3 && y < 3) || (x > 7 && y < 3) || (x < 3 && y > 7); return f ? !(x === 1 && (y === 1 || y === 9)) && !(x === 9 && y === 1) : (x * 7 + y * 13 + x * y) % 3 === 0; });

export default function StoreDemo() {
  const [cart, setCart] = useState({});
  const [stage, setStage] = useState("shop"); // shop | pay | done
  const [code, setCode] = useState("");
  const items = PRODUCTS.filter((p) => cart[p.id]);
  const sub = items.reduce((a, p) => a + p.p * cart[p.id], 0);
  const disc = code.trim().toUpperCase() === "WELCOME10" ? Math.round(sub * 0.1) : 0;
  const ship = sub - disc >= 999 || sub === 0 ? 0 : 49;
  const total = sub - disc + ship;
  const orderNo = useMemo(() => 2300 + Math.floor(Math.random() * 600), [stage]); // eslint-disable-line
  const add = (id, d = 1) => setCart((c) => { const q = (c[id] || 0) + d; const n = { ...c }; if (q <= 0) delete n[id]; else n[id] = q; return n; });

  return (
    <div className="demo">
      <aside className="demo-side">
        <h3>Your cart {items.length > 0 && `(${items.reduce((a, p) => a + cart[p.id], 0)})`}</h3>
        {stage === "shop" && (
          <>
            {items.length === 0 ? <p>Add products to see the cart update instantly.</p> : (
              <div>
                {items.map((p) => (
                  <div className="cart-line" key={p.id}>
                    <span>{p.n}</span>
                    <span className="qty"><button onClick={() => add(p.id, -1)} aria-label="Remove one">−</button>{cart[p.id]}<button onClick={() => add(p.id)} aria-label="Add one">+</button></span>
                  </div>
                ))}
                <div className="field" style={{ marginTop: 12 }}><label htmlFor="cpn">Coupon (try WELCOME10)</label><input id="cpn" value={code} onChange={(e) => setCode(e.target.value)} /></div>
                <div className="cart-line"><span>Subtotal</span><span>{inr(sub)}</span></div>
                {disc > 0 && <div className="cart-line" style={{ color: "var(--green)" }}><span>Discount</span><span>−{inr(disc)}</span></div>}
                <div className="cart-line"><span>Shipping</span><span>{ship ? inr(ship) : "Free"}</span></div>
                <div className="total"><span>Total</span><span>{inr(total)}</span></div>
              </div>
            )}
            <button className="btn" disabled={!items.length} onClick={() => setStage("pay")} style={{ marginTop: "auto" }}>Checkout · {inr(total)}</button>
          </>
        )}
        {stage !== "shop" && <p>Payment by UPI, cards, net banking or cash on delivery — through Razorpay or your bank.</p>}
      </aside>
      <div className="demo-main">
        {stage === "shop" && (
          <>
            <p className="muted" style={{ marginTop: 0 }}>Free shipping above ₹999 · Delivery in 2–4 days</p>
            <div className="products">
              {PRODUCTS.map((p) => (
                <div className="product" key={p.id}>
                  <div className="pimg" style={{ background: p.bg }} aria-hidden="true">{p.e}</div>
                  <div className="pbody">
                    <b>{p.n}</b><span>{inr(p.p)}</span>
                    <button className={`btn btn-sm ${cart[p.id] ? "" : "btn-ghost"}`} onClick={() => add(p.id)}>{cart[p.id] ? `In cart (${cart[p.id]}) · add more` : "Add to cart"}</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {stage === "pay" && (
          <div className="pay">
            <h3 style={{ margin: 0 }}>Pay {inr(total)} with UPI</h3>
            <p className="muted" style={{ margin: 0 }}>Scan with GPay, PhonePe or Paytm</p>
            <div className="qr" aria-hidden="true">{QR.map((on, i) => <i key={i} className={on ? "" : "w"} />)}</div>
            <p className="muted" style={{ fontSize: ".85rem", margin: 0 }}>Demo only — no real payment is taken.</p>
            <div className="btn-row" style={{ justifyContent: "center" }}>
              <button className="btn" onClick={() => setStage("done")}>Simulate successful payment</button>
              <button className="btn btn-ghost" onClick={() => setStage("shop")}>Back to cart</button>
            </div>
          </div>
        )}
        {stage === "done" && (
          <div className="pay">
            <div className="success">{icons.check}</div>
            <h3 style={{ margin: 0 }}>Order #{orderNo} confirmed</h3>
            <p className="muted" style={{ margin: 0 }}>{inr(total)} paid · invoice emailed · stock updated</p>
            <div className="wa-bubble"><b>WhatsApp</b><br />Hi! 🎉 Your order #{orderNo} is confirmed and will be shipped within 24 hours. Track it here: track.example/{orderNo}</div>
            <button className="btn btn-ghost" onClick={() => { setCart({}); setCode(""); setStage("shop"); }}>Start a new order</button>
          </div>
        )}
      </div>
    </div>
  );
}
