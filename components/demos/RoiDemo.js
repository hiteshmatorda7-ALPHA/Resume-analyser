"use client";
import { useState } from "react";
import Link from "next/link";

const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

function Range({ id, label, value, set, min, max, step = 1, fmt = (v) => v }) {
  return (
    <div className="range">
      <label htmlFor={id}>{label} <b>{fmt(value)}</b></label>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(+e.target.value)} />
    </div>
  );
}

export default function RoiDemo() {
  const [people, setPeople] = useState(8);
  const [hours, setHours] = useState(10);
  const [salary, setSalary] = useState(25000);
  const [auto, setAuto] = useState(60);

  const hourly = salary / 200; // ~200 working hours per month
  const hoursSavedMonth = people * hours * 4.3 * (auto / 100);
  const moneyMonth = hoursSavedMonth * hourly;
  const setup = Math.min(250000, Math.max(25000, people * hours * 1500));
  const payback = moneyMonth > 0 ? setup / moneyMonth : 0;
  const kept = people * hours * 4.3 - hoursSavedMonth;

  return (
    <div className="demo">
      <aside className="demo-side" style={{ gap: 22 }}>
        <div><h3>Your team today</h3><p>Move the sliders to match your business.</p></div>
        <Range id="r1" label="Team members" value={people} set={setPeople} min={1} max={50} />
        <Range id="r2" label="Hours per person each week on repetitive work" value={hours} set={setHours} min={1} max={30} fmt={(v) => `${v} h`} />
        <Range id="r3" label="Average monthly salary" value={salary} set={setSalary} min={10000} max={100000} step={1000} fmt={inr} />
        <Range id="r4" label="Share we can automate" value={auto} set={setAuto} min={20} max={80} step={5} fmt={(v) => `${v}%`} />
      </aside>
      <div className="demo-main">
        <div className="roi-out">
          <div className="big">
            <span>Estimated yearly savings</span>
            <b>{inr(moneyMonth * 12)}</b>
            <div className="roi-split">
              <div className="track" aria-hidden="true"><i style={{ flex: hoursSavedMonth }} /><i style={{ flex: kept }} /></div>
              <div className="legend"><span>Automated: {Math.round(hoursSavedMonth)} h/month</span><span>Still manual: {Math.round(kept)} h/month</span></div>
            </div>
          </div>
          <div className="counter"><b>{Math.round(hoursSavedMonth)} h</b><span>freed up every month</span></div>
          <div className="counter"><b>{inr(moneyMonth)}</b><span>saved every month</span></div>
          <div className="counter"><b>~{inr(setup)}</b><span>typical one-time setup</span></div>
          <div className="counter"><b>{payback < 1 ? "< 1" : payback.toFixed(1)} months</b><span>to pay back</span></div>
        </div>
        <p className="muted" style={{ fontSize: ".85rem", marginTop: 16 }}>An estimate based on your inputs. Our free automation audit gives you exact numbers for your processes.</p>
        <Link href="/contact" className="btn">Book a free automation audit</Link>
      </div>
    </div>
  );
}
