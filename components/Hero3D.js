"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { pillars } from "@/lib/site";

// 20 shards = 20 faces of the crystal → 4 services from each of the 5 practices
const SHARDS = pillars.flatMap((p) => p.services.slice(0, 4).map((s) => ({ ...s, pillar: p.title })));
const PILLAR_SHARDS = [0, 4, 8, 12, 16]; // first shard of each practice (labelled on phones)

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const range = (p, a, b) => clamp((p - a) / (b - a));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

// Interactive 3D hero. A faceted silver crystal sits in an AI network; as the visitor
// scrolls, the hero pins full-screen, the crystal moves to the centre and bursts into
// 20 shards that spread across the screen — each one carrying a service.
export default function Hero3D() {
  const mount = useRef(null);
  const layer = useRef(null);
  const labels = useRef([]);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (disposed || !mount.current) return;

      const el = mount.current;
      const scroller = el.closest(".hero-scroll");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        return; // no WebGL: the CSS background remains
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      el.prepend(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0, 9);
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.06).texture;

      const world = new THREE.Group();
      scene.add(world);

      // Invisible pivot that carries the crystal's spin; shards read their resting pose from it
      const pivot = new THREE.Object3D();
      world.add(pivot);

      // ── Shards: each face of the icosahedron is its own mesh ──
      const shardMat = new THREE.MeshPhysicalMaterial({ color: 0xd3dbe5, metalness: 1, roughness: 0.14, clearcoat: 1, clearcoatRoughness: 0.15, flatShading: true, side: THREE.DoubleSide });
      const edgeMat = new THREE.LineBasicMaterial({ color: 0x9fb8ff, transparent: true, opacity: 0 });
      const ico = new THREE.IcosahedronGeometry(1.55, 0).toNonIndexed();
      const pos = ico.attributes.position;
      const shards = [];
      for (let f = 0; f < pos.count / 3; f++) {
        const a = new THREE.Vector3().fromBufferAttribute(pos, f * 3);
        const b = new THREE.Vector3().fromBufferAttribute(pos, f * 3 + 1);
        const c = new THREE.Vector3().fromBufferAttribute(pos, f * 3 + 2);
        const centroid = a.clone().add(b).add(c).divideScalar(3);
        const g = new THREE.BufferGeometry().setFromPoints([a.sub(centroid), b.sub(centroid), c.sub(centroid)]);
        g.computeVertexNormals();
        const mesh = new THREE.Mesh(g, shardMat);
        mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(g), edgeMat));
        const normal = centroid.clone().normalize();
        const r = (s) => (Math.sin(f * 12.9898 + s * 78.233) * 43758.5453) % 1;
        mesh.userData = {
          centroid, normal,
          face: new THREE.Quaternion().setFromUnitVectors(normal, new THREE.Vector3(0, 0, 1)),
          spinAxis: new THREE.Vector3(r(1), r(2), r(3)).normalize(),
          seed: Math.abs(r(4)) * 6.28,
          target: new THREE.Vector3(),
        };
        scene.add(mesh);
        shards.push(mesh);
      }

      // Cobalt inner glow → becomes the burst flash
      const coreMat = new THREE.MeshBasicMaterial({ color: 0x3f6fff, transparent: true, opacity: 0.9 });
      const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.62, 1), coreMat);
      world.add(core);
      const flashMat = new THREE.MeshBasicMaterial({ color: 0xbfd2ff, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
      const flash = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), flashMat);
      world.add(flash);

      // Wireframe shell
      const shellMat = new THREE.LineBasicMaterial({ color: 0x6f95ff, transparent: true, opacity: 0.28 });
      const shell = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.35, 1)), shellMat);
      world.add(shell);

      // Orbit rings
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x9fb6e6, transparent: true, opacity: 0.25 });
      const rings = [3.1, 3.7].map((r, i) => {
        const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.006, 8, 160), ringMat);
        m.rotation.x = Math.PI / 2 + (i ? -0.5 : 0.35);
        m.rotation.y = i ? 0.4 : -0.2;
        world.add(m);
        return m;
      });

      // Network nodes + links (AI network)
      const N = 46, R = 3.4, pts = [];
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2, rr = Math.sqrt(1 - y * y), th = i * 2.399963;
        pts.push(new THREE.Vector3(Math.cos(th) * rr * R, y * R * 0.82, Math.sin(th) * rr * R));
      }
      const nodeGeo = new THREE.SphereGeometry(0.03, 12, 12);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0xcfe0ff, transparent: true });
      const accentMat = new THREE.MeshBasicMaterial({ color: 0x5b86ff, transparent: true });
      const nodes = new THREE.Group();
      pts.forEach((p, i) => { const m = new THREE.Mesh(nodeGeo, i % 5 === 0 ? accentMat : nodeMat); m.position.copy(p); if (i % 5 === 0) m.scale.setScalar(1.6); nodes.add(m); });
      const linePos = [];
      pts.forEach((a, i) => pts.forEach((b, j) => { if (j > i && a.distanceTo(b) < 1.75) linePos.push(a.x, a.y, a.z, b.x, b.y, b.z); }));
      const lg = new THREE.BufferGeometry();
      lg.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
      const linkMat = new THREE.LineBasicMaterial({ color: 0x5b86ff, transparent: true, opacity: 0.22 });
      nodes.add(new THREE.LineSegments(lg, linkMat));
      world.add(nodes);

      // Data pulses on the rings
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true });
      const pulses = [0, 1, 2].map(() => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), pulseMat); world.add(m); return m; });

      // Burst sparks
      const SP = 700;
      const sparkDir = new Float32Array(SP * 3), sparkSpeed = new Float32Array(SP);
      for (let i = 0; i < SP; i++) {
        const u = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2, s = Math.sqrt(1 - u * u);
        sparkDir.set([Math.cos(th) * s, u, Math.sin(th) * s], i * 3);
        sparkSpeed[i] = 0.35 + Math.random() * 1.1;
      }
      const sparkGeo = new THREE.BufferGeometry();
      sparkGeo.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(SP * 3), 3));
      const sparkMat = new THREE.PointsMaterial({ color: 0xcfe0ff, size: 0.045, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
      const sparks = new THREE.Points(sparkGeo, sparkMat);
      scene.add(sparks);

      scene.add(new THREE.AmbientLight(0xffffff, 0.4));
      const key = new THREE.DirectionalLight(0xffffff, 3); key.position.set(4, 5, 6); scene.add(key);
      const rim = new THREE.PointLight(0x4f7dff, 60, 20); rim.position.set(-4, -2, 3); scene.add(rim);
      const burstLight = new THREE.PointLight(0x8fb0ff, 0, 30); scene.add(burstLight);

      // ── Layout ──
      let shardPx = 60, W = 1, H = 1, wide = true, homeX = 0, homeY = 0, homeS = 1, halfW = 1, halfH = 1, shardScale = 0.3;
      const layout = () => {
        W = el.clientWidth; H = el.clientHeight;
        renderer.setSize(W, H, false);
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
        wide = W > 900;
        halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
        halfW = halfH * camera.aspect;
        homeX = wide ? halfW * 0.52 : 0;
        homeY = wide ? 0.1 : 0.4;
        homeS = wide ? Math.min(0.78, halfW * 0.16) : 0.7;
        const pxPerUnit = H / (2 * halfH);
        const gridTop = H * 0.06 + (wide ? 205 : 120), gridRows = wide ? 4 : 5;
        const rowGap = (H - 64 - gridTop) / (gridRows - 1);
        shardPx = Math.min(wide ? 56 : 42, rowGap * 0.32);
        shardScale = clamp(shardPx / (1.4 * pxPerUnit), 0.08, 0.42);
        // Targets: a grid below the title — desktop: one column per practice; phone: one row per practice
        const toWorld = (px, py, z = 0) => new THREE.Vector3((px / W - 0.5) * 2 * halfW, (0.5 - py / H) * 2 * halfH, z);
        const top = H * 0.06 + (wide ? 205 : 120), bottom = H - (wide ? 64 : 64);
        const cols = wide ? 5 : 4, rows = wide ? 4 : 5;
        const left = wide ? W * 0.1 : 34, right = wide ? W * 0.9 : W - 34;
        shards.forEach((m, i) => {
          const practice = Math.floor(i / 4), item = i % 4;
          const col = wide ? practice : item, row = wide ? item : practice;
          const px = left + ((right - left) * (col + 0.5)) / cols;
          const py = top + ((bottom - top) * row) / Math.max(rows - 1, 1) - (wide ? 30 : 22);
          m.userData.target.copy(toWorld(px + Math.sin(i * 7.1) * 6, py, Math.sin(i * 3.3) * 0.15));
        });
        layer.current?.classList.toggle("narrow", !wide);
      };
      layout();
      const ro = new ResizeObserver(layout);
      ro.observe(el);

      const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
      const onMove = (e) => { target.x = (e.clientX / window.innerWidth - 0.5) * 2; target.y = (e.clientY / window.innerHeight - 0.5) * 2; };
      window.addEventListener("pointermove", onMove);

      // Scroll progress through the pinned hero (0 → 1)
      let prog = 0;
      const readScroll = () => {
        if (!scroller) return 0;
        const r = scroller.getBoundingClientRect();
        const travel = r.height - el.clientHeight;
        return travel > 0 ? clamp(-r.top / travel) : 0;
      };

      const tmpPos = new THREE.Vector3(), tmpQuat = new THREE.Quaternion(), spinQ = new THREE.Quaternion(), wob = new THREE.Quaternion(), proj = new THREE.Vector3();
      const sparkPos = sparkGeo.attributes.position;
      let lastState = "";
      const clock = new THREE.Clock();

      const render = () => {
        const t = clock.getElapsedTime();
        cur.x += (target.x - cur.x) * 0.05; cur.y += (target.y - cur.y) * 0.05;
        prog += (readScroll() - prog) * (reduce ? 1 : 0.14);
        const p = prog;
        const a = ease(range(p, 0.0, 0.28));    // move to centre, grow, copy fades
        const b = range(p, 0.24, 0.62);         // burst
        const bE = easeOut(b);
        const c = ease(range(p, 0.5, 0.78));    // labels + title

        if (scroller) {
          scroller.style.setProperty("--a", a.toFixed(3));
          scroller.style.setProperty("--c", c.toFixed(3));
          const state = a > 0.92 ? (c > 0.6 ? "burst" : "pinned") : "rest";
          if (state !== lastState) { scroller.dataset.state = state; lastState = state; }
        }

        // World: from the right-hand position to centre stage, scaling up
        world.position.set(homeX * (1 - a), homeY * (1 - a), 0);
        world.scale.setScalar(homeS + (1.25 - homeS) * a * (1 - bE * 0.2));
        world.rotation.y = t * 0.12 + cur.x * 0.45 * (1 - c);
        world.rotation.x = cur.y * 0.25 * (1 - c);
        pivot.rotation.set(t * 0.18 * (1 - b), t * 0.35 * (1 - b) + a * 1.2, 0);
        world.updateMatrixWorld(true);
        pivot.getWorldQuaternion(tmpQuat);
        const restQuat = tmpQuat.clone();

        // Core charges up, then flashes
        const charge = range(p, 0.16, 0.26);
        core.scale.setScalar((1 + Math.sin(t * 2) * 0.06) * (1 + charge * 0.6) * (1 - bE));
        coreMat.opacity = 0.9 * (1 - b);
        core.rotation.y = -t * 0.6;
        const fl = b > 0 ? Math.sin(Math.min(b * 3, 1) * Math.PI) : 0;
        flash.scale.setScalar(0.4 + b * 5);
        flashMat.opacity = fl * 0.55;
        burstLight.intensity = fl * 120;

        // Shell, rings and network expand outward and fade into a starfield
        shell.scale.setScalar(1 + bE * 3.5); shellMat.opacity = 0.28 * (1 - bE);
        shell.rotation.y = -t * 0.08; shell.rotation.z = t * 0.05;
        rings.forEach((m) => m.scale.setScalar(1 + bE * 2.5)); ringMat.opacity = 0.25 * (1 - bE);
        nodes.scale.setScalar(1 + bE * 1.8); nodes.rotation.y = -t * 0.05;
        nodeMat.opacity = accentMat.opacity = 1 - bE * 0.55; linkMat.opacity = 0.22 * (1 - bE * 0.8);
        pulseMat.opacity = 1 - bE;
        pulses.forEach((pm, i) => {
          const ang = t * 0.7 + (i * Math.PI * 2) / 3, r = rings[i % 2].geometry.parameters.radius;
          pm.position.set(Math.cos(ang) * r, Math.sin(ang) * r, 0).applyEuler(rings[i % 2].rotation);
        });

        // Sparks fly out with the burst
        sparkMat.opacity = b > 0 && b < 1 ? Math.sin(b * Math.PI) * 0.95 : 0;
        if (sparkMat.opacity > 0) {
          for (let i = 0; i < SP; i++) {
            const d = bE * sparkSpeed[i] * (halfW * 1.4);
            sparkPos.setXYZ(i, sparkDir[i * 3] * d, sparkDir[i * 3 + 1] * d * 0.8, sparkDir[i * 3 + 2] * d);
          }
          sparkPos.needsUpdate = true;
        }

        // Shards: crystal at rest → explode outward → settle as labelled tiles across the screen
        const worldS = world.scale.x;
        shards.forEach((m, i) => {
          const u = m.userData;
          const lag = clamp((b - (i % 7) * 0.025) / 0.85);
          const e = ease(lag);
          tmpPos.copy(u.centroid).applyMatrix4(pivot.matrixWorld);
          const outward = tmpPos.clone().sub(world.position).normalize();
          const burstOut = Math.sin(e * Math.PI) * (2.2 + (i % 5) * 0.35);
          const float = c * Math.sin(t * 0.9 + u.seed) * 0.06;
          m.position.copy(tmpPos).lerp(u.target, e).addScaledVector(outward, burstOut);
          m.position.y += float;
          m.position.x += cur.x * 0.25 * c * (u.target.z + 1);
          m.position.y -= cur.y * 0.18 * c * (u.target.z + 1);
          // Orientation: crystal pose → facing the viewer, with a tumble in between
          const settled = u.face.clone().premultiply(wob.setFromEuler(new THREE.Euler(Math.sin(t * 0.7 + u.seed) * 0.25 * c, Math.cos(t * 0.6 + u.seed) * 0.3 * c, 0)));
          m.quaternion.copy(restQuat).multiply(new THREE.Quaternion()).slerp(settled, e);
          m.quaternion.multiply(spinQ.setFromAxisAngle(u.spinAxis, Math.sin(e * Math.PI) * Math.PI * 1.6));
          if (e === 0) m.quaternion.copy(restQuat);
          m.scale.setScalar(worldS + (shardScale * 1.6 - worldS) * e);
        });
        edgeMat.opacity = c * 0.8;

        renderer.render(scene, camera);

        // Labels follow their shards
        if (c > 0.01) {
          shards.forEach((m, i) => {
            const elL = labels.current[i];
            if (!elL) return;
            proj.copy(m.position).project(camera);
            const x = (proj.x * 0.5 + 0.5) * W, y = (-proj.y * 0.5 + 0.5) * H;
            const op = clamp(c * 1.6 - (i % 10) * 0.05);
            elL.style.transform = `translate(${x.toFixed(1)}px, ${(y + shardPx * 0.95).toFixed(1)}px) translate(-50%, 0) scale(${0.9 + op * 0.1})`;
            elL.style.opacity = op.toFixed(3);
          });
        } else if (labels.current[0]?.style.opacity !== "0") {
          labels.current.forEach((l) => l && (l.style.opacity = "0"));
        }
      };

      let visible = true, raf = 0;
      const loop = () => { cancelAnimationFrame(raf); if (!visible || disposed) return; render(); raf = requestAnimationFrame(loop); };
      const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) loop(); });
      io.observe(el);
      loop();
      el.classList.add("ready");

      cleanup = () => {
        cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        scene.traverse((o) => { o.geometry?.dispose?.(); o.material?.dispose?.(); });
        pmrem.dispose(); renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <div className="hero-canvas" ref={mount} aria-hidden="false">
      <div className="burst-layer" ref={layer}>
        <div className="burst-title">
          <h2>Everything we engineer</h2>
          <p>Pick a service to explore it</p>
          <Link href="/services" className="btn btn-sm btn-ghost-dark">All 26 services</Link>
        </div>
        {SHARDS.map((s, i) => (
          <Link key={s.slug} href={`/services/${s.slug}`} className={`shard-label${PILLAR_SHARDS.includes(i) ? " key" : ""}`}
            ref={(n) => (labels.current[i] = n)} style={{ opacity: 0 }}>
            {PILLAR_SHARDS.includes(i) && <span>{s.pillar}</span>}
            <b>{s.title}</b>
          </Link>
        ))}
      </div>
    </div>
  );
}
