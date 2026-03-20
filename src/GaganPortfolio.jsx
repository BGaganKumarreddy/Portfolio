import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// ── Ambient Space Audio ────────────────────────────────────────────────────
function createAmbientAudio() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.07, ctx.currentTime);
    master.connect(ctx.destination);
    const freqs = [40, 60, 80, 120];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15 / (i + 1), ctx.currentTime);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(200, ctx.currentTime);
      osc.connect(filter); filter.connect(gain); gain.connect(master);
      osc.start();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.05 + i * 0.02, ctx.currentTime);
      lfoGain.gain.setValueAtTime(freq * 0.03, ctx.currentTime);
      lfo.connect(lfoGain); lfoGain.connect(osc.frequency); lfo.start();
    });
    const ping = () => {
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.frequency.setValueAtTime(880 + Math.random() * 440, ctx.currentTime);
      o.type = "sine";
      g.gain.setValueAtTime(0.03, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);
      o.connect(g); g.connect(master); o.start(); o.stop(ctx.currentTime + 2);
      setTimeout(ping, 4000 + Math.random() * 8000);
    };
    setTimeout(ping, 3000);
    return { ctx, master };
  } catch (e) { return null; }
}

// ── Real CV Data ───────────────────────────────────────────────────────────
const PROFILE = {
  name: "GAGAN KUMAR REDDY",
  shortName: "GAGAN",
  role: "Full Stack Developer",
  email: "gagankumarreddy.b@gmail.com",
  mobile: "+91-9000062869",
  github: "https://github.com/BGaganKumarreddy",
  linkedin: "https://www.linkedin.com/in/gagan-kumar-reddy/",
  university: "Lovely Professional University",
  degree: "B.Tech CSE",
  cgpa: "6.7",
  tagline: "Building full-stack systems at the intersection of logic and creativity.",
};

const PROJECTS = [
  {
    title: "STOCK MATE",
    subtitle: "Smart Inventory Management System",
    desc: "Full-stack inventory system with real-time stock tracking, efficient CRUD APIs for product & supplier management, JWT-based auth, and interactive data visualizations.",
    tech: ["MongoDB", "Express.js", "React", "Node.js", "Tailwind CSS"],
    period: "Sep '25 – Oct '25",
    color: "#00f5ff",
    icon: "📦",
  },
  {
    title: "AGRI INSIGHT",
    subtitle: "Smart Crop Recommendation System",
    desc: "Web-based agricultural decision platform analyzing datasets to recommend optimal crops using environment-driven logic with responsive real-time UI and dashboards.",
    tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    period: "Feb '25 – Mar '25",
    color: "#00cfff",
    icon: "🌾",
  },
];

const SKILLS = [
  { label: "JavaScript / React", val: 88 },
  { label: "Node.js / Express", val: 85 },
  { label: "Java / C++", val: 82 },
  { label: "MongoDB / MySQL", val: 84 },
  { label: "HTML / CSS / Tailwind", val: 90 },
  { label: "PHP", val: 72 },
  { label: "Git / GitHub", val: 86 },
  { label: "Figma / UI Design", val: 70 },
];

const CERTS = [
  { title: "Master Generative AI & GenAI Tools", org: "Infosys", date: "Aug '25" },
  { title: "ChatGPT-4 Prompt Engineering: GenAI & LLM", org: "Infosys", date: "Aug '25" },
  { title: "Build GenAI Apps with No-Code Tools", org: "Infosys", date: "Aug '25" },
  { title: "Computational Theory & Finite Automata", org: "Infosys", date: "Aug '25" },
  { title: "Bits & Bytes of Computer Networking", org: "Google / Coursera", date: "Sep '24" },
];

const ACHIEVEMENTS = [
  { icon: "⚡", text: "Solved 200+ algorithmic problems on competitive platforms" },
  { icon: "🏆", text: "Top 10 of 50+ teams in College Hackathon for innovative web solution" },
  { icon: "🎓", text: "DSA Training with C++ — 50+ problems, OOP, trees, heaps & DP" },
];

const SECTIONS = ["home", "about", "projects", "skills", "contact"];

// ── Glitch Hook ────────────────────────────────────────────────────────────
function useGlitch(text, active) {
  const [display, setDisplay] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ01";
  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    let iter = 0;
    const id = setInterval(() => {
      setDisplay(text.split("").map((c, i) =>
        i < iter ? c : c === " " ? " " : chars[Math.floor(Math.random() * chars.length)]
      ).join(""));
      iter += 0.5;
      if (iter >= text.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [active, text]);
  return display;
}

// ── Three.js Scene ─────────────────────────────────────────────────────────
function useThreeScene(canvasRef, scrollRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x00000a, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 0, 50);

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const starCount = 9000;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 1400;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 1400;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 900 - 100;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xaaddff, size: 0.7, transparent: true, opacity: 0.85, sizeAttenuation: true })));

    // Nebula
    for (let n = 0; n < 7; n++) {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(50 + Math.random() * 70, 8, 8),
        new THREE.MeshBasicMaterial({ color: n % 3 === 0 ? 0x002244 : n % 3 === 1 ? 0x001133 : 0x003366, transparent: true, opacity: 0.05 + Math.random() * 0.05, side: THREE.BackSide })
      );
      mesh.position.set((Math.random() - 0.5) * 350, (Math.random() - 0.5) * 350, -120 - Math.random() * 200);
      scene.add(mesh);
    }

    // Grid
    const grid = new THREE.GridHelper(500, 50, 0x00aaff, 0x002255);
    grid.material.transparent = true; grid.material.opacity = 0.12;
    grid.position.set(0, -35, -60);
    scene.add(grid);

    // Particles
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 140;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 140;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 220;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x00f5ff, size: 0.28, transparent: true, opacity: 0.55 }));
    scene.add(particles);

    // Central orb
    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(5, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x0070dd, transparent: true, opacity: 0.85 })
    );
    orb.position.set(0, 0, 8);
    scene.add(orb);
    for (let r = 0; r < 4; r++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(7 + r * 3.5, 0.1, 8, 80),
        new THREE.MeshBasicMaterial({ color: 0x00cfff, transparent: true, opacity: 0.28 - r * 0.05 })
      );
      ring.rotation.x = Math.PI / 2 + r * 0.4;
      ring.rotation.y = r * 0.6;
      orb.add(ring);
    }

    // Warp lines
    const warpLines = [];
    for (let i = 0; i < 70; i++) {
      const geo = new THREE.BufferGeometry();
      const x = (Math.random() - 0.5) * 90, y = (Math.random() - 0.5) * 90, z = -15 - Math.random() * 220;
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array([x, y, z, x * 1.6, y * 1.6, z - Math.random() * 50]), 3));
      const mat = new THREE.LineBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0 });
      scene.add(new THREE.Line(geo, mat));
      warpLines.push(mat);
    }

    const mouse = { x: 0, y: 0 };
    const onMM = (e) => { mouse.x = (e.clientX / window.innerWidth - 0.5) * 2; mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2; };
    window.addEventListener("mousemove", onMM);

    const camPath = [
      new THREE.Vector3(0, 0, 50),
      new THREE.Vector3(18, -5, 32),
      new THREE.Vector3(-14, 8, 12),
      new THREE.Vector3(10, -12, 2),
      new THREE.Vector3(0, 0, -18),
    ];

    let lastScroll = 0, warpTimer = 0;
    const clock = new THREE.Clock();
    let rafId;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const scroll = scrollRef.current || 0;

      const delta = Math.abs(scroll - lastScroll);
      if (delta > 0.004) warpTimer = 0.55;
      warpTimer = Math.max(0, warpTimer - 0.016);
      lastScroll = scroll;

      warpLines.forEach(mat => {
        const target = warpTimer > 0 ? 0.35 + Math.random() * 0.45 : 0;
        mat.opacity += (target - mat.opacity) * 0.09;
      });

      const sf = scroll * (camPath.length - 1);
      const si = Math.min(Math.floor(sf), camPath.length - 2);
      const frac = sf - si;
      const tp = new THREE.Vector3().lerpVectors(camPath[si], camPath[si + 1], frac);
      tp.x += mouse.x * 3.5; tp.y += mouse.y * 2.5;
      camera.position.lerp(tp, 0.055);
      camera.lookAt(0, 0, 0);

      orb.rotation.y = t * 0.35;
      orb.rotation.x = Math.sin(t * 0.18) * 0.25;
      particles.rotation.y = t * 0.012;
      particles.rotation.x = t * 0.006;
      grid.material.opacity = 0.08 + Math.sin(t * 0.4) * 0.04;
      grid.position.z = -60 + scroll * 90;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("mousemove", onMM); window.removeEventListener("resize", onResize); renderer.dispose(); };
  }, []);
}

// ── Cursor Trail ───────────────────────────────────────────────────────────
function CursorTrail() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;top:0;left:0;pointer-events:none;z-index:9999;";
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const trail = []; let mouse = { x: 0, y: 0 };
    const onMove = (e) => { mouse = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    let rafId;
    const draw = () => {
      rafId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trail.push({ ...mouse });
      if (trail.length > 30) trail.shift();
      trail.forEach((p, i) => {
        const alpha = (i / trail.length) * 0.65;
        const size = (i / trail.length) * 7;
        ctx.beginPath(); ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,220,255,${alpha})`;
        ctx.shadowBlur = 14; ctx.shadowColor = "#00f5ff";
        ctx.fill();
      });
    };
    draw();
    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("mousemove", onMove); window.removeEventListener("resize", onResize); document.body.removeChild(canvas); };
  }, []);
  return null;
}

// ── Skill Bar ──────────────────────────────────────────────────────────────
function SkillBar({ label, val, delay }) {
  const [width, setWidth] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setWidth(val), delay); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [val, delay]);
  return (
    <div ref={ref} style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px" }}>
        <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "10px", color: "#00cfff", letterSpacing: "2px" }}>{label}</span>
        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "11px", color: "#0080ff" }}>{val}%</span>
      </div>
      <div style={{ height: "3px", background: "rgba(0,180,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${width}%`, background: "linear-gradient(90deg,#0050cc,#00f5ff)", borderRadius: "2px", transition: "width 1.3s cubic-bezier(0.4,0,0.2,1)", boxShadow: "0 0 14px #00f5ff77" }} />
      </div>
    </div>
  );
}

// ── Project Card ───────────────────────────────────────────────────────────
function ProjectCard({ p }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: hov ? "rgba(0,160,255,0.08)" : "rgba(0,15,45,0.75)",
      border: `1px solid ${hov ? p.color : "rgba(0,90,160,0.3)"}`,
      borderRadius: "6px", padding: "36px 30px",
      transform: hov ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
      transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
      boxShadow: hov ? `0 0 35px ${p.color}44,0 24px 48px rgba(0,0,0,0.6)` : "0 4px 24px rgba(0,0,0,0.4)",
      backdropFilter: "blur(12px)", cursor: "default",
    }}>
      <div style={{ fontSize: "28px", marginBottom: "16px" }}>{p.icon}</div>
      <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "10px", color: p.color, letterSpacing: "2px", marginBottom: "6px" }}>{p.period}</div>
      <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: "15px", color: "#e4f4ff", letterSpacing: "3px", marginBottom: "4px", fontWeight: 700 }}>{p.title}</h3>
      <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "11px", color: "#4a9ab8", marginBottom: "16px", letterSpacing: "1px" }}>{p.subtitle}</div>
      <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "12px", color: "#6aafc8", lineHeight: "1.85", marginBottom: "22px" }}>{p.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {p.tech.map(t => (
          <span key={t} style={{ fontFamily: "'Orbitron',monospace", fontSize: "8px", letterSpacing: "1.5px", padding: "4px 10px", border: `1px solid ${p.color}55`, color: p.color, borderRadius: "2px", background: `${p.color}0d` }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// ── Contact Form ───────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const handle = async () => {
    if (!form.name || !form.email || !form.message) { setStatus("error"); return; }
    setSending(true);
    await new Promise(r => setTimeout(r, 2000));
    setSending(false); setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };
  const inp = { width: "100%", background: "rgba(0,15,45,0.85)", border: "1px solid rgba(0,130,200,0.25)", borderRadius: "3px", padding: "14px 16px", color: "#9ad4ec", fontFamily: "'Share Tech Mono',monospace", fontSize: "13px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" };
  return (
    <div style={{ maxWidth: "540px", margin: "0 auto" }}>
      <div style={{ display: "grid", gap: "14px" }}>
        {["name", "email"].map(f => (
          <input key={f} placeholder={`// ${f.toUpperCase()}`} value={form[f]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))} style={inp} />
        ))}
        <textarea placeholder="// MESSAGE" rows={5} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} style={{ ...inp, resize: "vertical" }} />
        <button onClick={handle} disabled={sending} style={{ background: "transparent", border: "1px solid #00f5ff", color: "#00f5ff", fontFamily: "'Orbitron',monospace", fontSize: "10px", letterSpacing: "4px", padding: "16px", cursor: sending ? "not-allowed" : "pointer", transition: "all 0.3s", opacity: sending ? 0.6 : 1, boxShadow: "0 0 20px rgba(0,245,255,0.15)" }}>
          {sending ? "// TRANSMITTING..." : "// SEND TRANSMISSION"}
        </button>
        {status === "sent" && <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "12px", color: "#00ff9d", textAlign: "center", padding: "12px", border: "1px solid #00ff9d33", background: "rgba(0,255,157,0.04)" }}>✓ TRANSMISSION RECEIVED — GAGAN WILL RESPOND SHORTLY.</div>}
        {status === "error" && <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "12px", color: "#ff4466", textAlign: "center", padding: "12px", border: "1px solid #ff446633" }}>⚠ ALL FIELDS REQUIRED</div>}
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function GaganPortfolio() {
  const canvasRef = useRef();
  const scrollRef = useRef(0);
  const [activeSection, setActiveSection] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioSys, setAudioSys] = useState(null);
  const [glitchActive, setGlitchActive] = useState(true);
  const heroText = useGlitch(PROFILE.name, glitchActive);

  useThreeScene(canvasRef, scrollRef);

  useEffect(() => {
    setTimeout(() => setGlitchActive(false), 2200);
    const iv = setInterval(() => { setGlitchActive(true); setTimeout(() => setGlitchActive(false), 900); }, 9000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY, max = document.body.scrollHeight - window.innerHeight;
      scrollRef.current = top / max;
      setActiveSection(Math.min(Math.round(top / window.innerHeight), SECTIONS.length - 1));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleAudio = () => {
    if (!audioEnabled) { setAudioSys(createAmbientAudio()); setAudioEnabled(true); }
    else { audioSys?.ctx?.suspend(); setAudioEnabled(false); }
  };

  const scrollTo = (i) => window.scrollTo({ top: i * window.innerHeight, behavior: "smooth" });

  const sec = { height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 10 };
  const glass = { background: "rgba(0,8,28,0.78)", backdropFilter: "blur(22px)", border: "1px solid rgba(0,130,210,0.18)", borderRadius: "8px", padding: "56px 60px", maxWidth: "920px", width: "90%", boxShadow: "0 0 70px rgba(0,70,150,0.18),inset 0 1px 0 rgba(0,180,255,0.08)" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;cursor:none;}
        body{background:#00000a;overflow-x:hidden;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:#000010;}
        ::-webkit-scrollbar-thumb{background:#0070dd;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
        @keyframes pulse{0%,100%{opacity:0.5;}50%{opacity:1;}}
        .su>*{opacity:0;animation:fadeUp 0.85s ease forwards;}
        .su>*:nth-child(1){animation-delay:0.1s;}
        .su>*:nth-child(2){animation-delay:0.25s;}
        .su>*:nth-child(3){animation-delay:0.4s;}
        .su>*:nth-child(4){animation-delay:0.55s;}
        .su>*:nth-child(5){animation-delay:0.7s;}
        a{color:inherit;text-decoration:none;}
        button{cursor:pointer;}
      `}</style>

      {/* Scanlines */}
      <div style={{ position: "fixed", inset: 0, background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px)", pointerEvents: "none", zIndex: 5 }} />

      <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 1 }} />
      <CursorTrail />

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "18px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,14,0.65)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,90,180,0.12)" }}>
        <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "12px", color: "#00f5ff", letterSpacing: "4px" }}>GKR://</div>
        <div style={{ display: "flex", gap: "28px" }}>
          {SECTIONS.map((s, i) => (
            <button key={s} onClick={() => scrollTo(i)} style={{ background: "none", border: "none", fontFamily: "'Orbitron',monospace", fontSize: "9px", letterSpacing: "3px", color: activeSection === i ? "#00f5ff" : "rgba(80,160,210,0.45)", textTransform: "uppercase", transition: "color 0.3s", textShadow: activeSection === i ? "0 0 12px #00f5ff" : "none" }}>{s}</button>
          ))}
        </div>
        <button onClick={toggleAudio} style={{ background: "none", border: "1px solid rgba(0,180,255,0.25)", color: audioEnabled ? "#00f5ff" : "rgba(80,160,210,0.35)", fontFamily: "'Orbitron',monospace", fontSize: "8px", letterSpacing: "2px", padding: "7px 13px", transition: "all 0.3s" }}>
          {audioEnabled ? "◉ AUDIO" : "○ AUDIO"}
        </button>
      </nav>

      <div style={{ position: "relative", zIndex: 10 }}>

        {/* HERO */}
        <section style={sec}>
          <div style={{ textAlign: "center" }} className="su">
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "10px", color: "#0080ff", letterSpacing: "6px", marginBottom: "20px" }}>// FULL STACK DEVELOPER · LPU · INDIA</div>
            <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(36px,8vw,80px)", fontWeight: 900, color: "#e8f4ff", letterSpacing: "6px", lineHeight: 1.1, marginBottom: "10px", textShadow: "0 0 40px rgba(0,160,255,0.45),0 0 80px rgba(0,80,200,0.2)" }}>
              {heroText}
            </h1>
            <div style={{ width: "70px", height: "1px", background: "linear-gradient(90deg,transparent,#00f5ff,transparent)", margin: "26px auto" }} />
            <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "12px", color: "#4a90b5", letterSpacing: "2px", marginBottom: "44px", maxWidth: "500px" }}>
              {PROFILE.tagline}
            </p>
            <div style={{ display: "flex", gap: "18px", justifyContent: "center" }}>
              {[["VIEW PROJECTS", 2], ["CONTACT ME", 4]].map(([label, idx]) => (
                <button key={label} onClick={() => scrollTo(idx)} style={{ fontFamily: "'Orbitron',monospace", fontSize: "9px", letterSpacing: "3px", padding: "13px 28px", background: idx === 2 ? "rgba(0,80,180,0.2)" : "transparent", border: `1px solid ${idx === 2 ? "#00f5ff" : "rgba(0,130,200,0.35)"}`, color: idx === 2 ? "#00f5ff" : "#4a90b5", transition: "all 0.3s", boxShadow: idx === 2 ? "0 0 22px rgba(0,245,255,0.18)" : "none" }}>{label}</button>
              ))}
            </div>
            <div style={{ position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)", fontFamily: "'Share Tech Mono',monospace", fontSize: "9px", color: "rgba(0,130,190,0.45)", letterSpacing: "3px", animation: "pulse 2s ease infinite" }}>↓ SCROLL TO EXPLORE</div>
          </div>
        </section>

        {/* ABOUT */}
        <section style={sec}>
          <div style={glass} className="su">
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "9px", color: "#0080ff", letterSpacing: "4px", marginBottom: "6px" }}>// ABOUT.EXE</div>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "28px", color: "#e0f4ff", letterSpacing: "4px", marginBottom: "36px", fontWeight: 700 }}>SYSTEM PROFILE</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
              <div>
                <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "13px", color: "#6ab5cc", lineHeight: "1.9", marginBottom: "20px" }}>
                  I'm a Computer Science undergrad at Lovely Professional University building full-stack products that solve real problems. I work across the entire stack — from designing responsive UIs in React and Tailwind to architecting REST APIs, managing databases, and deploying secure, scalable systems.
                </p>
                <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "13px", color: "#6ab5cc", lineHeight: "1.9" }}>
                  I've shipped inventory systems, agricultural AI tools, and solved 200+ DSA problems. I move fast, build clean, and love working in teams. Currently open to internships and full-time opportunities.
                </p>
              </div>
              <div>
                {[
                  ["NAME", "Gagan Kumar Reddy"],
                  ["UNIVERSITY", "LPU Punjab"],
                  ["DEGREE", "B.Tech CSE"],
                  ["CGPA", "6.7 / 10"],
                  ["LOCATION", "Punjab, India"],
                  ["STATUS", "🟢 Open to Work"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid rgba(0,90,160,0.15)" }}>
                    <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "8px", color: "#0070cc", letterSpacing: "2px" }}>{k}</span>
                    <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "12px", color: "#9ad4ec" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section style={{ ...sec, height: "auto", minHeight: "100vh", paddingTop: "130px", paddingBottom: "90px" }}>
          <div style={{ maxWidth: "920px", width: "90%" }} className="su">
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "9px", color: "#0080ff", letterSpacing: "4px", marginBottom: "6px", textAlign: "center" }}>// DEPLOYED SYSTEMS</div>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "28px", color: "#e0f4ff", letterSpacing: "4px", marginBottom: "16px", fontWeight: 700, textAlign: "center" }}>PROJECTS</h2>
            <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "11px", color: "#3a7a95", textAlign: "center", letterSpacing: "2px", marginBottom: "48px" }}>// 2 LIVE SYSTEMS · FULL STACK · PRODUCTION GRADE</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(380px,1fr))", gap: "24px" }}>
              {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "32px" }}>
              <div style={{ background: "rgba(0,8,28,0.78)", backdropFilter: "blur(16px)", border: "1px solid rgba(0,100,180,0.18)", borderRadius: "6px", padding: "32px 28px" }}>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "9px", color: "#0080ff", letterSpacing: "3px", marginBottom: "18px" }}>// CERTIFICATES</div>
                {CERTS.map(c => (
                  <div key={c.title} style={{ borderBottom: "1px solid rgba(0,80,140,0.15)", padding: "12px 0" }}>
                    <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "11px", color: "#8dc8e0", lineHeight: "1.5", marginBottom: "3px" }}>{c.title}</div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "8px", color: "#0070cc", letterSpacing: "1px" }}>{c.org}</span>
                      <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "9px", color: "#3a6a80" }}>{c.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(0,8,28,0.78)", backdropFilter: "blur(16px)", border: "1px solid rgba(0,100,180,0.18)", borderRadius: "6px", padding: "32px 28px" }}>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "9px", color: "#0080ff", letterSpacing: "3px", marginBottom: "18px" }}>// ACHIEVEMENTS</div>
                {ACHIEVEMENTS.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "14px 0", borderBottom: i < ACHIEVEMENTS.length - 1 ? "1px solid rgba(0,80,140,0.15)" : "none" }}>
                    <span style={{ fontSize: "20px", flexShrink: 0 }}>{a.icon}</span>
                    <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "12px", color: "#7abccc", lineHeight: "1.7" }}>{a.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section style={sec}>
          <div style={glass} className="su">
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "9px", color: "#0080ff", letterSpacing: "4px", marginBottom: "6px" }}>// CAPABILITY MATRIX</div>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "28px", color: "#e0f4ff", letterSpacing: "4px", marginBottom: "40px", fontWeight: 700 }}>SKILLS</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 52px" }}>
              {SKILLS.map((s, i) => <SkillBar key={s.label} label={s.label} val={s.val} delay={i * 110} />)}
            </div>
            <div style={{ marginTop: "36px", paddingTop: "28px", borderTop: "1px solid rgba(0,90,160,0.15)" }}>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "9px", color: "#0060aa", letterSpacing: "3px", marginBottom: "16px" }}>// SOFT SKILLS</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {["Problem-Solving", "Team Collaboration", "Time Management", "Adaptability"].map(s => (
                  <span key={s} style={{ fontFamily: "'Orbitron',monospace", fontSize: "9px", letterSpacing: "2px", padding: "8px 16px", border: "1px solid rgba(0,120,200,0.25)", color: "#5aaccc", borderRadius: "2px", background: "rgba(0,80,160,0.08)" }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section style={sec}>
          <div style={glass} className="su">
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "9px", color: "#0080ff", letterSpacing: "4px", marginBottom: "6px", textAlign: "center" }}>// OPEN CHANNEL</div>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "28px", color: "#e0f4ff", letterSpacing: "4px", marginBottom: "10px", fontWeight: 700, textAlign: "center" }}>CONTACT</h2>
            <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "11px", color: "#3a7a95", textAlign: "center", letterSpacing: "2px", marginBottom: "36px" }}>// OPEN TO INTERNSHIPS, COLLABORATIONS & FULL-TIME ROLES</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginBottom: "36px" }}>
              {[{ label: "EMAIL", href: `mailto:${PROFILE.email}`, val: PROFILE.email }, { label: "MOBILE", href: `tel:${PROFILE.mobile}`, val: PROFILE.mobile }].map(item => (
                <a key={item.label} href={item.href} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "8px", color: "#0070cc", letterSpacing: "3px", marginBottom: "6px" }}>{item.label}</div>
                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "12px", color: "#7ac8e0" }}>{item.val}</div>
                </a>
              ))}
            </div>
            <ContactForm />
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "36px" }}>
              {[["GITHUB", PROFILE.github], ["LINKEDIN", PROFILE.linkedin]].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" style={{ fontFamily: "'Orbitron',monospace", fontSize: "9px", letterSpacing: "3px", color: "rgba(0,140,210,0.45)", padding: "8px 16px", border: "1px solid rgba(0,100,180,0.2)", borderRadius: "2px", transition: "color 0.3s" }}>{label} ↗</a>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* Dot nav */}
      <div style={{ position: "fixed", right: "24px", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "10px", zIndex: 100 }}>
        {SECTIONS.map((_, i) => (
          <div key={i} onClick={() => scrollTo(i)} style={{ width: activeSection === i ? "22px" : "4px", height: "4px", borderRadius: "2px", background: activeSection === i ? "#00f5ff" : "rgba(0,130,200,0.25)", cursor: "pointer", transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)", boxShadow: activeSection === i ? "0 0 10px #00f5ff" : "none" }} />
        ))}
      </div>
    </>
  );
}
