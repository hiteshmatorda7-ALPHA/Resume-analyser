"use client";
import { demoList } from "./demos/registry";
import { useDemo } from "./DemoProvider";

const Vis = ({ v }) => {
  if (v === "chat") return <div className="dv-chat"><i /><i /><i /></div>;
  if (v === "flow") return <div className="dv-flow"><i /><i /><i /><i /></div>;
  if (v === "bars") return <div className="dv-bars">{[40, 55, 48, 70, 88, 62, 75, 96, 80].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>;
  if (v === "site") return <div className="dv-site"><i /><i /><i style={{ width: "60%" }} /><i /></div>;
  if (v === "store") return <div className="dv-store"><i /><i /><i /><i /><i /><i /></div>;
  return <div className="dv-roi"><div>₹3.1L<small>a year, for a team of 8</small></div></div>;
};

export default function DemoGallery({ only }) {
  const { openDemo } = useDemo();
  const list = only ? demoList.filter((d) => only.includes(d.id)) : demoList;
  return (
    <div className="demo-grid">
      {list.map((d) => (
        <button key={d.id} className="demo-card" onClick={() => openDemo(d.id)}>
          <span className="tag">{d.tag}</span>
          <div className="dc-vis" aria-hidden="true"><Vis v={d.vis} /></div>
          <div className="dc-body">
            <h3>{d.title}</h3>
            <p>{d.sub}</p>
            <span className="play"><i />Open live demo</span>
          </div>
        </button>
      ))}
    </div>
  );
}
