"use client";
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { demoList } from "./demos/registry";
import { icons } from "./Icons";

const Ctx = createContext({ openDemo: () => {} });
export const useDemo = () => useContext(Ctx);

const store = {
  get: (k) => { try { return sessionStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { sessionStorage.setItem(k, v); } catch {} },
};

export default function DemoProvider({ children }) {
  const [active, setActive] = useState(null); // null | "picker" | demo id
  const [teaser, setTeaser] = useState(false);
  const path = usePathname();
  const closeRef = useRef(null);
  const lastFocus = useRef(null);

  const openDemo = useCallback((id) => {
    lastFocus.current = document.activeElement;
    setTeaser(false);
    store.set("se-teaser", "1");
    setActive(id && demoList.find((d) => d.id === id) ? id : "picker");
  }, []);
  const close = useCallback(() => { setActive(null); lastFocus.current?.focus?.(); }, []);

  useEffect(() => {
    document.body.classList.toggle("lock", !!active);
    if (active) setTimeout(() => closeRef.current?.focus(), 30);
    const esc = (e) => e.key === "Escape" && active && close();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [active, close]);

  useEffect(() => { setActive(null); }, [path]);

  // Teaser popup: appears once per visit after 12 seconds (not on contact/demos pages)
  useEffect(() => {
    if (store.get("se-teaser") || path?.startsWith("/contact") || path?.startsWith("/demos")) return;
    const t = setTimeout(() => setTeaser(true), 12000);
    return () => clearTimeout(t);
  }, [path]);
  const dismissTeaser = () => { setTeaser(false); store.set("se-teaser", "1"); };

  const demo = demoList.find((d) => d.id === active);
  const DemoComp = demo?.Component;

  return (
    <Ctx.Provider value={{ openDemo }}>
      {children}

      <button className="demo-launch" onClick={() => openDemo()} aria-label="Try a live demo">
        <span className="pulse">{icons.play}</span><span className="txt">Try a live demo</span>
      </button>

      {teaser && !active && (
        <div className="teaser" role="dialog" aria-label="Live demo invitation">
          <div className="teaser-top">
            <span className="av">{icons.sparkle}</span>
            <div><b>See AI work for your business</b><span>Interactive demo · 1 minute</span></div>
            <button className="teaser-x" onClick={dismissTeaser} aria-label="Close">×</button>
          </div>
          <div className="teaser-body">
            <p>Chat with an AI receptionist that answers questions and books appointments — the same assistant we can build for you.</p>
            <div className="btn-row">
              <button className="btn btn-sm" onClick={() => openDemo("chatbot")}>Try the AI assistant</button>
              <button className="btn btn-sm btn-ghost" onClick={() => openDemo()}>See all demos</button>
            </div>
          </div>
        </div>
      )}

      {active && (
        <div className="modal-back" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-head">
              {demo && <span className="live">LIVE DEMO</span>}
              <div>
                <h2 id="modal-title">{demo ? demo.title : "Try a live demo"}</h2>
                <p>{demo ? demo.sub : "Pick a demo to see what we can build for your business."}</p>
              </div>
              <button ref={closeRef} className="modal-x" onClick={close} aria-label="Close demo">×</button>
            </div>
            <div className="modal-body">
              {DemoComp ? <DemoComp /> : (
                <div className="picker">
                  {demoList.map((d) => (
                    <button key={d.id} onClick={() => setActive(d.id)}><b>{d.title}</b><span>{d.sub}</span></button>
                  ))}
                </div>
              )}
            </div>
            <div className="modal-foot">
              <span>{demo ? "This is a working sample. We build the real version around your business." : "All demos run right here in your browser."}</span>
              <div className="btn-row">
                {demo && <button className="btn btn-sm btn-ghost" onClick={() => setActive("picker")}>Other demos</button>}
                <Link href="/contact" className="btn btn-sm" onClick={close}>Get this for my business</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
