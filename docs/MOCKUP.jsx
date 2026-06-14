// XplanTool — Phase 2.8 Mockup (V31)
// Aesthetic: Cursor (getdesign.md) — warm-cream editorial canvas, hairline depth (no shadows),
// Cursor Orange (#f54e00) primary, CursorGothic-style display + JetBrains Mono on data surfaces.
// Ephemeral visual check of docs/PRODUCT.md interpretation. Not live. No data persists.
import React, { useState } from "react";

/* ------------------------------------------------------------------ tokens */
const C = {
  canvas: "#f7f7f4", canvasSoft: "#fafaf7", card: "#ffffff",
  ink: "#26251e", body: "#5a5852", muted: "#807d72", mutedSoft: "#a09c92",
  hair: "#e6e5e0", hairSoft: "#efeee8", hairStrong: "#cfcdc4",
  primary: "#f54e00", primaryActive: "#d04200", onPrimary: "#ffffff",
  blue: "#9fbbe0", mint: "#9fc9a2", peach: "#dfa88f", lavender: "#c0a8dd", gold: "#c08532",
  error: "#cf2d56", success: "#1f8a65",
};

/* status pill colors */
const STATUS = {
  "Draft":               { bg: "#efeee8", fg: "#807d72" },
  "Submitted for Review":{ bg: "#e7f0fa", fg: "#3b5a7a" },
  "Approved":            { bg: "#e6f3ea", fg: "#1f8a65" },
  "Changes Requested":   { bg: "#fbe9e0", fg: "#b4502e" },
};

/* device category palette (default icon colors — user-overridable per spec) */
const CAT = {
  CCTV:     "#9fbbe0",
  WiFi:     "#9fc9a2",
  Network:  "#807d72",
  FDAS:     "#cf2d56",
  PA:       "#c0a8dd",
  Telephony:"#c08532",
  Access:   "#dfa88f",
};

/* ------------------------------------------------------------------ dummy data (PH ICT/ELV) */
const SCREENS = [
  ["dashboard", "Dashboard", "ready"],
  ["projects", "Projects", "ready"],
  ["editor", "Floor Plan Editor", "ready"],
  ["catalog", "Device Catalog", "ready"],
  ["bom", "BOM / Reports", "ready"],
  ["approvals", "Approvals", "ready"],
  ["mobile", "On-Site (Mobile)", "ready"],
  ["clients", "Clients", "stub"],
  ["projectDetail", "Project Detail", "stub"],
  ["export", "Export Dialog", "stub"],
  ["notifications", "Notifications", "stub"],
  ["logos", "Logo Library", "stub"],
  ["settings", "Settings", "stub"],
  ["admin", "Platform Admin", "stub"],
  ["login", "Login", "ready"],
];

const MOBILE_FIRST = new Set(["login", "mobile", "notifications"]);

const projects = [
  ["XPT-2026-0142", "CCTV & Network Upgrade", "SM City Lipa", "Approved", "Mardy Ramos", "2026-06-11", 84],
  ["XPT-2026-0139", "FDAS Compliance Retrofit", "Lipa Medical Center", "Submitted for Review", "Jenelyn Castillo", "2026-06-10", 47],
  ["XPT-2026-0137", "Campus WiFi Rollout", "STI College Batangas", "Draft", "Arnel Bautista", "2026-06-09", 31],
  ["XPT-2026-0131", "PA / Paging Installation", "Robinsons Place Tagaytay", "Changes Requested", "Kristine Aquino", "2026-06-06", 22],
  ["XPT-2026-0128", "Perimeter CCTV Expansion", "Megaworld BPO Tower", "Approved", "Paolo Mendoza", "2026-06-03", 63],
  ["XPT-2026-0124", "Structured Cabling — Bldg C", "San Miguel Brewery, Sta. Rosa", "Approved", "Divine Salazar", "2026-05-29", 118],
  ["XPT-2026-0119", "Access Control Pilot", "BDO Network Bank, Makati", "Submitted for Review", "Mardy Ramos", "2026-05-24", 16],
  ["XPT-2026-0112", "FDAS + PA Integration", "Calapan City Hall", "Draft", "Jenelyn Castillo", "2026-05-18", 54],
  ["XPT-2026-0108", "Warehouse WiFi + CCTV", "Pilmico Foods, Tanauan", "Approved", "Arnel Bautista", "2026-05-12", 72],
  ["XPT-2026-0101", "Mall-wide Paging Refresh", "Ayala Malls Feliz", "Approved", "Kristine Aquino", "2026-05-05", 90],
];

const devices = [
  ["CAM-2F-014", "CCTV", "Dome Camera", "Hikvision DS-2CD2146G2", "10.20.2.114", "2F — Lobby", "Installed"],
  ["CAM-2F-021", "CCTV", "Bullet Camera", "Hikvision DS-2CD2086G2", "10.20.2.121", "2F — Corridor E", "Installed"],
  ["CAM-3F-007", "CCTV", "PTZ Camera", "Dahua SD6CE245XA", "10.20.3.107", "3F — Atrium", "Pending"],
  ["AP-2F-003", "WiFi", "Access Point", "Ubiquiti U6-Pro", "10.20.2.203", "2F — Open Office", "Installed"],
  ["AP-3F-009", "WiFi", "Access Point", "Ubiquiti U6-Enterprise", "10.20.3.209", "3F — Conference", "Pending"],
  ["SW-CORE-01", "Network", "Core Switch", "Aruba 6300M 48G", "10.20.0.2", "MDF — Rack A1", "Installed"],
  ["SW-2F-EDGE", "Network", "PoE Switch", "Aruba 6100 48G PoE", "10.20.2.2", "2F — IDF", "Installed"],
  ["SND-1F-003", "FDAS", "Sounder / Horn", "Bosch FNM-420V-A-BS", "—", "1F — Exit Hall", "Installed"],
  ["MCP-1F-005", "FDAS", "Manual Call Point", "Bosch FMC-420RW", "—", "1F — Stairwell B", "Pending"],
  ["SPKR-2F-018", "PA", "Ceiling Speaker", "TOA F-2352C", "—", "2F — Open Office", "Installed"],
  ["SPKR-2F-019", "PA", "Ceiling Speaker", "TOA F-2352C", "—", "2F — Pantry", "Installed"],
  ["PBX-MDF-01", "Telephony", "IP-PBX", "Yeastar P560", "10.20.0.20", "MDF — Rack A2", "Installed"],
  ["DR-2F-002", "Access", "Door Reader", "ZKTeco ProID30", "10.20.2.62", "2F — Server Room", "Pending"],
  ["AP-3F-011", "WiFi", "Access Point", "Ubiquiti U6-Pro", "10.20.3.211", "3F — Lounge", "Installed"],
  ["CAM-1F-002", "CCTV", "Turret Camera", "Hikvision DS-2CD2347G2", "10.20.1.102", "1F — Entrance", "Installed"],
  ["SND-2F-006", "FDAS", "Sounder / Horn", "Bosch FNM-420V-A-BS", "—", "2F — Corridor W", "Pending"],
];

const bomRows = [
  ["CCTV", "Dome Camera", "Hikvision DS-2CD2146G2", 8],
  ["CCTV", "Bullet Camera", "Hikvision DS-2CD2086G2", 6],
  ["CCTV", "PTZ Camera", "Dahua SD6CE245XA", 2],
  ["WiFi", "Access Point", "Ubiquiti U6-Pro", 11],
  ["Network", "PoE Switch", "Aruba 6100 48G PoE", 3],
  ["FDAS", "Sounder / Horn", "Bosch FNM-420V-A-BS", 9],
  ["PA", "Ceiling Speaker", "TOA F-2352C", 24],
  ["Telephony", "IP-PBX", "Yeastar P560", 1],
  ["Access", "Door Reader", "ZKTeco ProID30", 5],
];
const cableRows = [
  ["Cat6 U/UTP", 1840], ["Cat6A F/FTP", 620], ["Fiber OM3 (LC-LC)", 310],
  ["Coax RG6", 95], ["FP200 Fire-rated", 540],
];

const approvals = [
  ["XPT-2026-0139", "FDAS Compliance Retrofit", "Lipa Medical Center", "Jenelyn Castillo (Engineer)", "Submitted for Review", "2h ago"],
  ["XPT-2026-0119", "Access Control Pilot", "BDO Network Bank, Makati", "Mardy Ramos (Engineer)", "Submitted for Review", "5h ago"],
  ["XPT-2026-0131", "PA / Paging Installation", "Robinsons Place Tagaytay", "Kristine Aquino (Proj. Manager)", "Awaiting Tenant Admin", "1d ago"],
];

/* ------------------------------------------------------------------ atoms */
const mono = { fontFamily: "'JetBrains Mono','SFMono-Regular',Menlo,monospace" };
const disp = { fontFamily: "system-ui,'Helvetica Neue',Helvetica,Arial,sans-serif", letterSpacing: "-0.02em" };

function Pill({ s }) {
  const c = STATUS[s] || STATUS.Draft;
  return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
    style={{ background: c.bg, color: c.fg }}>{s}</span>;
}
function CatDot({ c }) {
  return <span className="inline-block h-2.5 w-2.5 rounded-full align-middle" style={{ background: CAT[c] || C.muted }} />;
}
function Btn({ children, kind = "primary", ...p }) {
  const base = "inline-flex items-center gap-1.5 rounded-md text-sm font-medium transition-colors h-10 px-4";
  const styles = kind === "primary"
    ? { background: C.primary, color: C.onPrimary }
    : kind === "dark"
    ? { background: C.ink, color: C.canvas }
    : { background: C.card, color: C.ink, border: `1px solid ${C.hairStrong}` };
  return <button {...p} className={base} style={styles}>{children}</button>;
}
function Card({ children, className = "", pad = "p-5", ...p }) {
  return <div {...p} data-loading-path="shadcn" className={`rounded-xl ${pad} ${className}`}
    style={{ background: C.card, border: `1px solid ${C.hair}` }}>{children}</div>;
}
function Label({ children }) {
  return <div className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: C.mutedSoft }}>{children}</div>;
}

/* ------------------------------------------------------------------ floor plan canvas (custom render) */
function FloorPlan() {
  return (
    <div data-loading-path="custom" className="relative w-full overflow-hidden rounded-lg"
      style={{ background: C.canvasSoft, border: `1px solid ${C.hair}`, aspectRatio: "16/10" }}>
      <svg viewBox="0 0 800 500" className="h-full w-full">
        <defs>
          <radialGradient id="wifi" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1f8a65" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#c08532" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#cf2d56" stopOpacity="0.05" />
          </radialGradient>
          <linearGradient id="dori" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9fbbe0" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9fbbe0" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {/* room outline / walls */}
        <rect x="40" y="40" width="720" height="420" fill="none" stroke={C.hairStrong} strokeWidth="3" />
        <line x1="320" y1="40" x2="320" y2="300" stroke={C.ink} strokeWidth="5" />
        <line x1="320" y1="300" x2="560" y2="300" stroke={C.ink} strokeWidth="5" />
        <line x1="560" y1="300" x2="560" y2="460" stroke={C.ink} strokeWidth="5" />
        {/* WiFi heatmap blob */}
        <circle cx="180" cy="180" r="150" fill="url(#wifi)" />
        {/* CCTV DORI cone (clipped feel) */}
        <polygon points="620,120 760,70 760,200" fill="url(#dori)" stroke={C.blue} strokeWidth="1" />
        {/* devices */}
        {[["180","180",CAT.WiFi,"AP"],["620","120",CAT.CCTV,"CAM"],["470","380",CAT.FDAS,"SND"],
          ["250","400",CAT.PA,"SPK"],["120","120",CAT.Network,"SW"],["680","380",CAT.Access,"DR"]].map(([x,y,col,t],i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r="11" fill={col} stroke="#fff" strokeWidth="2" />
            <text x={x} y={+y+24} textAnchor="middle" fontSize="11" fill={C.body} style={mono}>{t}</text>
          </g>
        ))}
        {/* cable run */}
        <path d="M120,120 L180,180 L470,380" fill="none" stroke={C.gold} strokeWidth="2" strokeDasharray="6 4" />
        {/* photo pin (non-obtrusive) */}
        <g>
          <circle cx="540" cy="160" r="6" fill={C.ink} />
          <text x="540" y="145" textAnchor="middle" fontSize="10" fill={C.ink} style={mono}>📷 PIN-03</text>
        </g>
        {/* scale bar */}
        <line x1="600" y1="440" x2="700" y2="440" stroke={C.ink} strokeWidth="2" />
        <text x="650" y="432" textAnchor="middle" fontSize="11" fill={C.muted} style={mono}>5.0 m</text>
      </svg>
      <div className="absolute left-3 top-3 rounded-md px-2 py-1 text-[11px] font-semibold"
        style={{ background: C.card, border: `1px solid ${C.hair}`, color: C.body, ...mono }}>
        Scale ✓ 1px = 0.025 m
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ screens */
function MobileBadge({ id }) {
  const first = MOBILE_FIRST.has(id);
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
      style={first ? { background: "#e7f0fa", color: "#3b5a7a" } : { background: C.hairSoft, color: C.muted }}>
      {first ? "📱 Mobile First" : "🖥️ Mobile Ready"}
    </span>
  );
}
function Head({ id, title, sub, actions }) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <div className="mb-1 flex items-center gap-2">
          <h1 className="text-2xl font-semibold" style={{ ...disp, color: C.ink }}>{title}</h1>
          <MobileBadge id={id} />
        </div>
        {sub && <p className="text-sm" style={{ color: C.body }}>{sub}</p>}
      </div>
      <div className="flex gap-2">{actions}</div>
    </div>
  );
}
function KPI({ label, value, hint, accent }) {
  return (
    <Card>
      <Label>{label}</Label>
      <div className="mt-2 text-3xl font-semibold" style={{ ...disp, color: accent || C.ink }}>{value}</div>
      {hint && <div className="mt-1 text-xs" style={{ color: C.muted }}>{hint}</div>}
    </Card>
  );
}

function Dashboard() {
  const counts = { total: 142, pending: 7, devices: 1284, approved: 96 };
  return (
    <div>
      <Head id="dashboard" title="Dashboard" sub="Welcome back, Mardy — Powerbyte Engineering"
        actions={<Btn>+ New Project</Btn>} />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPI label="Active Projects" value="142" hint="+6 this week" />
        <KPI label="Pending Approvals" value="7" hint="3 awaiting you" accent={C.primary} />
        <KPI label="Devices Placed" value="1,284" hint="across 38 floors" />
        <KPI label="Approved" value="68%" hint="of all designs" accent={C.success} />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <Label>Projects by Status</Label>
            <span className="text-xs" style={{ color: C.muted }}>last 30 days</span>
          </div>
          <div data-loading-path="custom" className="space-y-2.5">
            {[["Approved", 96, C.mint], ["Submitted for Review", 24, C.blue], ["Draft", 15, C.mutedSoft], ["Changes Requested", 7, C.peach]].map(([k, v, col]) => (
              <div key={k} className="flex items-center gap-3">
                <div className="w-44 text-sm" style={{ color: C.body }}>{k}</div>
                <div className="h-3 flex-1 rounded-full" style={{ background: C.hairSoft }}>
                  <div className="h-3 rounded-full" style={{ width: `${v}%`, background: col }} />
                </div>
                <div className="w-8 text-right text-sm" style={{ ...mono, color: C.ink }}>{v}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <Label>Device Mix</Label>
          <div className="mt-3 space-y-2">
            {Object.entries({ CCTV: 412, WiFi: 286, PA: 248, FDAS: 161, Network: 98, Telephony: 44, Access: 35 }).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2" style={{ color: C.body }}><CatDot c={k} />{k}</span>
                <span style={{ ...mono, color: C.ink }}>{v}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div>
      <Head id="projects" title="Projects" sub="All design projects across your clients"
        actions={<><Btn kind="ghost">Filter</Btn><Btn>+ New Project</Btn></>} />
      <Card pad="p-0">
        <div className="flex items-center gap-2 border-b p-3" style={{ borderColor: C.hair }}>
          <input placeholder="Search projects, clients, sites…"
            className="h-9 w-72 rounded-md px-3 text-sm outline-none"
            style={{ border: `1px solid ${C.hair}`, background: C.canvasSoft, color: C.ink }} />
          <span className="text-xs" style={{ color: C.muted }}>10 of 142</span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ color: C.muted }} className="text-left text-[11px] uppercase tracking-wide">
              <th className="px-4 py-2.5 font-semibold">Project #</th>
              <th className="px-4 py-2.5 font-semibold">Name</th>
              <th className="px-4 py-2.5 font-semibold">Client / Site</th>
              <th className="px-4 py-2.5 font-semibold">Status</th>
              <th className="px-4 py-2.5 font-semibold">Owner</th>
              <th className="px-4 py-2.5 font-semibold text-right">Devices</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((r) => (
              <tr key={r[0]} className="border-t" style={{ borderColor: C.hairSoft }}>
                <td className="px-4 py-2.5" style={{ ...mono, color: C.body }}>{r[0]}</td>
                <td className="px-4 py-2.5 font-medium" style={{ color: C.ink }}>{r[1]}</td>
                <td className="px-4 py-2.5" style={{ color: C.body }}>{r[2]}</td>
                <td className="px-4 py-2.5"><Pill s={r[3]} /></td>
                <td className="px-4 py-2.5" style={{ color: C.body }}>{r[4]}</td>
                <td className="px-4 py-2.5 text-right" style={{ ...mono, color: C.ink }}>{r[6]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Editor() {
  const [eng, setEng] = useState("WiFi");
  const palette = Object.keys(CAT);
  return (
    <div>
      <Head id="editor" title="Floor Plan Editor"
        sub="SM City Lipa · CCTV & Network Upgrade · 2F — Retail Level"
        actions={<><Btn kind="ghost">Undo</Btn><Btn kind="ghost">Export</Btn><Btn>Submit for Review</Btn></>} />
      <div className="grid gap-4" style={{ gridTemplateColumns: "180px 1fr 240px" }}>
        {/* palette */}
        <Card pad="p-3">
          <Label>Device Catalog</Label>
          <div className="mt-3 space-y-1.5">
            {palette.map((c) => (
              <div key={c} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm"
                style={{ background: c === "CCTV" ? C.hairSoft : "transparent", color: C.body }}>
                <CatDot c={c} /> {c}
              </div>
            ))}
          </div>
          <div className="mt-4"><Label>Tools</Label>
            <div className="mt-2 flex flex-wrap gap-1.5 text-xs" style={{ color: C.body }}>
              {["Wall", "Cable", "Text", "Doodle", "Shape", "Photo Pin"].map((t) => (
                <span key={t} className="rounded-md px-2 py-1" style={{ border: `1px solid ${C.hair}` }}>{t}</span>
              ))}
            </div>
          </div>
        </Card>
        {/* canvas */}
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            {["WiFi", "CCTV (DORI)", "Audio (FDAS/PA)"].map((m) => {
              const key = m.split(" ")[0];
              const on = eng === key;
              return (
                <button key={m} onClick={() => setEng(key)}
                  className="rounded-md px-3 py-1.5 text-xs font-medium"
                  style={on ? { background: C.primary, color: "#fff" } : { background: C.card, border: `1px solid ${C.hair}`, color: C.body }}>
                  {m} coverage
                </button>
              );
            })}
            <span className="ml-auto text-xs" style={{ ...mono, color: C.muted }}>est. coverage · zoom 100%</span>
          </div>
          <FloorPlan />
          <div className="mt-2 flex flex-wrap gap-3 text-[11px]" style={{ color: C.muted }}>
            <span>🟢 ≥ -67 dBm</span><span>🟡 -75 dBm</span><span>🔴 &lt; -82 dBm</span>
            <span className="ml-auto italic">Predictive estimate · ITU-R P.1238 · n = 3.0</span>
          </div>
        </div>
        {/* properties */}
        <Card pad="p-4">
          <Label>Device · CAM-2F-014</Label>
          <div className="mt-3 space-y-3 text-sm">
            {[["Label", "CAM-2F-014"], ["IP Address", "10.20.2.114"], ["Type", "Dome Camera"], ["Brand / Model", "Hikvision DS-2CD2146G2"]].map(([k, v]) => (
              <div key={k}>
                <div className="text-[11px]" style={{ color: C.mutedSoft }}>{k}</div>
                <div className="rounded-md px-2 py-1.5" style={{ ...mono, border: `1px solid ${C.hair}`, color: C.ink, background: C.canvasSoft }}>{v}</div>
              </div>
            ))}
            <div>
              <div className="text-[11px]" style={{ color: C.mutedSoft }}>Icon Color (spec key)</div>
              <div className="mt-1 flex gap-1.5">
                {["#9fbbe0", "#cf2d56", "#1f8a65", "#c08532", "#c0a8dd"].map((x) => (
                  <span key={x} className="h-6 w-6 rounded-md" style={{ background: x, outline: x === "#9fbbe0" ? `2px solid ${C.ink}` : "none" }} />
                ))}
              </div>
              <div className="mt-1 text-[11px]" style={{ color: C.muted }}>blue = 4MP · red = 8MP</div>
            </div>
            <div>
              <div className="text-[11px]" style={{ color: C.mutedSoft }}>Mount height / DORI</div>
              <div className="rounded-md px-2 py-1.5 text-xs" style={{ ...mono, border: `1px solid ${C.hair}`, color: C.body, background: C.canvasSoft }}>
                3.2 m · Recognition ≤ 14 m
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Catalog() {
  return (
    <div>
      <Head id="catalog" title="Device Catalog"
        sub="Global types (shared) + your tenant's custom devices"
        actions={<Btn>+ Add Custom Device</Btn>} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries({
          CCTV: ["Bullet Camera", "Dome Camera", "Turret Camera", "PTZ Camera", "NVR/DVR"],
          WiFi: ["Access Point (Indoor)", "Access Point (Outdoor)"],
          Network: ["Router", "Core Switch", "PoE Switch", "Firewall", "Patch Panel"],
          FDAS: ["Smoke Detector", "Heat Detector", "Sounder/Horn", "Strobe", "Manual Call Point", "FACP"],
          PA: ["Ceiling Speaker", "Horn Speaker", "Amplifier", "Paging Console"],
          Access: ["Door Reader", "Electric Lock", "Door Controller", "Intercom"],
        }).map(([cat, items]) => (
          <Card key={cat}>
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-2 font-semibold" style={{ color: C.ink }}><CatDot c={cat} /> {cat}</span>
              <span className="text-[11px]" style={{ color: C.muted }}>{items.length} generic</span>
            </div>
            <div className="space-y-1 text-sm" style={{ color: C.body }}>
              {items.map((i) => <div key={i} className="flex items-center justify-between"><span>{i}</span><span className="text-[11px]" style={{ color: C.mutedSoft }}>generic</span></div>)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Bom() {
  return (
    <div>
      <Head id="bom" title="BOM / Reports" sub="XPT-2026-0142 · SM City Lipa · 3 floors"
        actions={<><Btn kind="ghost">CSV</Btn><Btn>Export PDF</Btn></>} />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2" pad="p-0">
          <div className="border-b px-4 py-3 font-semibold" style={{ borderColor: C.hair, color: C.ink }}>Devices</div>
          <table className="w-full text-sm">
            <thead><tr className="text-left text-[11px] uppercase tracking-wide" style={{ color: C.muted }}>
              <th className="px-4 py-2 font-semibold">Cat</th><th className="px-4 py-2 font-semibold">Generic Type</th>
              <th className="px-4 py-2 font-semibold">Brand / Model</th><th className="px-4 py-2 font-semibold text-right">Qty</th>
            </tr></thead>
            <tbody>{bomRows.map((r, i) => (
              <tr key={i} className="border-t" style={{ borderColor: C.hairSoft }}>
                <td className="px-4 py-2"><CatDot c={r[0]} /></td>
                <td className="px-4 py-2" style={{ color: C.ink }}>{r[1]}</td>
                <td className="px-4 py-2" style={{ ...mono, color: C.body }}>{r[2]}</td>
                <td className="px-4 py-2 text-right" style={{ ...mono, color: C.ink }}>{r[3]}</td>
              </tr>))}
            </tbody>
          </table>
        </Card>
        <Card pad="p-0">
          <div className="border-b px-4 py-3 font-semibold" style={{ borderColor: C.hair, color: C.ink }}>Cabling Totals</div>
          <table className="w-full text-sm">
            <tbody>{cableRows.map((r, i) => (
              <tr key={i} className="border-t" style={{ borderColor: C.hairSoft }}>
                <td className="px-4 py-2.5" style={{ color: C.body }}>{r[0]}</td>
                <td className="px-4 py-2.5 text-right" style={{ ...mono, color: C.ink }}>{r[1]} m</td>
              </tr>))}
            </tbody>
          </table>
          <div className="px-4 py-3 text-xs italic" style={{ color: C.muted, borderTop: `1px solid ${C.hair}` }}>
            Lengths auto-derived from calibrated scale.
          </div>
        </Card>
      </div>
    </div>
  );
}

function Approvals() {
  return (
    <div>
      <Head id="approvals" title="Approvals" sub="Designs awaiting your review (Project Manager / Tenant Admin)" />
      <div className="space-y-3">
        {approvals.map((a) => (
          <Card key={a[0]} className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span style={{ ...mono, color: C.body }}>{a[0]}</span>
                <span className="font-medium" style={{ color: C.ink }}>{a[1]}</span>
                <Pill s="Submitted for Review" />
              </div>
              <div className="mt-1 text-sm" style={{ color: C.body }}>{a[2]} · by {a[3]} · {a[5]}</div>
              {a[4].includes("Tenant") && <div className="mt-1 text-[11px]" style={{ color: C.primary }}>⚠ Author is a PM — requires Tenant Admin approval</div>}
            </div>
            <div className="flex gap-2">
              <Btn kind="ghost">View</Btn>
              <Btn kind="ghost">Request Changes</Btn>
              <Btn>Approve</Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Mobile() {
  return (
    <div>
      <Head id="mobile" title="On-Site (Mobile)" sub="Field verification — phone-first" />
      <div className="mx-auto w-full max-w-[390px]">
        <div className="overflow-hidden rounded-[28px]" style={{ border: `8px solid ${C.ink}`, background: C.canvas }}>
          <div className="px-4 py-3 text-sm font-semibold" style={{ background: C.ink, color: C.canvas }}>
            XPT-2026-0142 · 2F <span className="float-right" style={mono}>83% verified</span>
          </div>
          <div className="p-3">
            <div data-loading-path="custom" className="rounded-lg" style={{ border: `1px solid ${C.hair}`, background: C.canvasSoft }}>
              <svg viewBox="0 0 360 220" className="w-full">
                <rect x="14" y="14" width="332" height="192" fill="none" stroke={C.hairStrong} strokeWidth="2" />
                {[["90","80",CAT.CCTV],["220","70",CAT.WiFi],["160","160",CAT.FDAS],["280","150",CAT.PA]].map(([x,y,c],i)=>(
                  <circle key={i} cx={x} cy={y} r="9" fill={c} stroke="#fff" strokeWidth="2" />
                ))}
                <circle cx="250" cy="110" r="5" fill={C.ink} />
              </svg>
            </div>
            <div className="mt-3 space-y-2">
              {[["CAM-2F-014", "Installed", true], ["AP-2F-003", "Installed", true], ["SND-2F-006", "Pending", false]].map(([n, s, ok]) => (
                <div key={n} className="flex items-center justify-between rounded-md px-3 py-2 text-sm"
                  style={{ background: C.card, border: `1px solid ${C.hair}` }}>
                  <span style={{ ...mono, color: C.ink }}>{n}</span>
                  <span className="font-semibold" style={{ color: ok ? C.success : C.muted }}>{ok ? "✓ " : "○ "}{s}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Btn kind="ghost">＋ Add Note</Btn>
              <Btn>📷 Photo Pin</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Login() {
  return (
    <div className="mx-auto mt-6 w-full max-w-sm">
      <Head id="login" title="Sign in" sub="lipa-elec.xplantool.powerbyte.app" />
      <Card>
        <div className="space-y-3">
          <div><div className="text-[11px]" style={{ color: C.mutedSoft }}>Email</div>
            <input defaultValue="mardy.ramos@powerbyte.app" className="mt-1 h-10 w-full rounded-md px-3 text-sm" style={{ ...mono, border: `1px solid ${C.hair}`, background: C.canvasSoft, color: C.ink }} /></div>
          <div><div className="text-[11px]" style={{ color: C.mutedSoft }}>Password</div>
            <input type="password" defaultValue="123456789" className="mt-1 h-10 w-full rounded-md px-3 text-sm" style={{ border: `1px solid ${C.hair}`, background: C.canvasSoft }} /></div>
          <Btn kind="primary"><span className="w-full text-center">Sign in →</span></Btn>
          <div className="text-center text-xs" style={{ color: C.muted }}>Protected by Cloudflare Turnstile</div>
        </div>
      </Card>
    </div>
  );
}

function Stub({ id, title }) {
  return (
    <div>
      <Head id={id} title={title} />
      <Card className="flex flex-col items-center justify-center text-center" pad="p-12">
        <div className="text-3xl">🧩</div>
        <div className="mt-2 font-semibold" style={{ color: C.ink }}>{title}</div>
        <p className="mt-1 max-w-md text-sm" style={{ color: C.body }}>
          Declared screen — navigable in the mockup, simplified placeholder. Full layout follows in Phase 4.
        </p>
        <div className="mt-3 text-xs" style={{ color: C.muted }}>To expand: reply with “expand {title}”.</div>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ shell */
export default function XplanToolMockup() {
  const [screen, setScreen] = useState("dashboard");
  const render = () => {
    switch (screen) {
      case "dashboard": return <Dashboard />;
      case "projects": return <Projects />;
      case "editor": return <Editor />;
      case "catalog": return <Catalog />;
      case "bom": return <Bom />;
      case "approvals": return <Approvals />;
      case "mobile": return <Mobile />;
      case "login": return <Login />;
      default: return <Stub id={screen} title={SCREENS.find((s) => s[0] === screen)?.[1] || screen} />;
    }
  };
  return (
    <div className="min-h-screen w-full" style={{ background: C.canvas, color: C.body }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');`}</style>

      {/* mockup banner */}
      <div className="px-4 py-2 text-center text-[12px] font-semibold"
        style={{ background: "#fff6d6", color: "#7a5b00", borderBottom: "1px solid #ecdca0" }}>
        📐 PHASE 2.8 MOCKUP — XplanTool — Visual check of PRODUCT.md interpretation · Cursor aesthetic · Not live · No data persists
      </div>

      {/* top nav */}
      <header className="sticky top-0 z-10" style={{ background: C.canvas, borderBottom: `1px solid ${C.hair}` }}>
        <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-4 px-4">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md text-sm font-bold" style={{ background: C.primary, color: "#fff" }}>X</span>
            <span className="text-lg font-semibold" style={{ ...disp, color: C.ink }}>XplanTool</span>
          </div>
          <nav className="ml-2 flex flex-wrap gap-0.5 overflow-x-auto">
            {SCREENS.map(([id, title, kind]) => (
              <button key={id} onClick={() => setScreen(id)}
                className="whitespace-nowrap rounded-md px-2.5 py-1.5 text-[13px] font-medium"
                style={screen === id
                  ? { background: C.ink, color: C.canvas }
                  : { color: kind === "stub" ? C.mutedSoft : C.body }}>
                {title}
              </button>
            ))}
          </nav>
          <span className="ml-auto grid h-8 w-8 place-items-center rounded-full text-xs font-semibold"
            style={{ background: C.hairSoft, color: C.ink }}>MR</span>
        </div>
      </header>

      {/* content */}
      <main className="mx-auto max-w-[1200px] px-4 py-6">{render()}</main>

      <footer className="mx-auto max-w-[1200px] px-4 py-6 text-center text-[11px]" style={{ color: C.mutedSoft }}>
        Powered by Powerbyte I.T. Solutions · © 2026 · Mockup generated by Spec-Driven Platform V31 · Phase 2.8
      </footer>
    </div>
  );
}
