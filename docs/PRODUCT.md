# XplanTool

## App Identity
Name:           XplanTool
Tagline:        Design, document, and validate ICT & low-voltage systems on a floor plan — devices, cabling, labeling, IP addressing, and coverage simulation in one tool.
Industry:       ICT / Low-Voltage (ELV) Systems Design — SaaS
Primary users:  ICT/low-voltage design engineers, project managers, and field technicians (with clients as view-only stakeholders)
Owner:          Powerbyte I.T. Solutions

## Problem Statement
Designing structured cabling and low-voltage systems (WiFi, CCTV, PABX, public address/paging, FDAS, networking) is today scattered across CAD drawings, spreadsheets, and separate vendor calculators — with no single source that ties physical device placement, cabling, naming/labeling, IP addressing, and signal/coverage validation together. XplanTool replaces that with one self-hostable web app: upload a floor plan, calibrate real-world scale, place generic devices, draw cabling and walls, assign labels and IPs, and validate coverage (WiFi heatmap, CCTV DORI cones, audio SPL for sounders/paging) — then export professional plans and a bill of materials. Existing predictive tools (Ekahau, Hamina, UniFi Design Center) handle WiFi only and are expensive; XplanTool covers the full multi-device ICT scope.

## Core User Flows
1. **Engineer sets up a design:** create Client → Project → Floor → upload floor-plan image (PNG/JPG, ≤25 MB, magic-byte validated, auto-optimized) → **mandatory scale calibration** (draw a reference line over a known length, e.g. a 2 m door, enter the real length → entire plan is scaled in m/ft). Error: if the floor is not calibrated, device placement, cabling lengths, and all coverage engines are blocked until calibration is completed.
2. **Engineer places & configures devices:** drag a generic device from the catalog (category → generic type) onto the plan → set icon + icon color (visual key, e.g. red bullet = 2MP) → set label/name → assign IP address → optionally add brand + model + specs → position. Selection stays "sticky" for placing many of the same type. Error: duplicate IP or duplicate device label within a floor is flagged before save.
3. **Engineer draws walls & cabling:** draw wall lines (material + thickness + RF/acoustic attenuation + CCTV opacity) and cabling runs (cable type: Cat5e/Cat6/Cat6A/fiber/coax/power-control; auto-length from scale). Error: a cable run with no valid start/end device is flagged; walls with no material default to a "generic" material and are flagged for review.
4. **Engineer runs coverage validation:** WiFi predictive heatmap (ITU-R P.1238, tunable path-loss exponent), CCTV DORI field-of-view cones (range/angle by height, resolution, lens — clipped by walls), and audio SPL coverage for FDAS sounders + PA/paging speakers (dB(A) falloff, reduced by wall thickness/material). Predictive results are clearly labeled "estimate." Error: a wireless/coverage device missing required specs falls back to a documented default and is flagged in the UI as an estimate.
5. **Engineer annotates & adds site evidence:** add on-plan text + freehand doodle, generic cosmetic shapes (line/rect/circle/arrow — adjustable color/size/thickness), and **non-obtrusive photo pins** (camera capture or upload; each pin named/tagged; image supports doodle + text markup). Error: oversized images are auto-compressed; a pin with no image is kept as a text-only note.
6. **Submit → review → approve:** Engineer submits a design (Draft → Submitted for Review). A Project Manager or Tenant Admin reviews and Approves or requests changes (→ back to Draft). Separation of duties: the approver cannot be the author — a PM-authored design must be approved by a Tenant Admin. On approve, the design is locked read-only until reopened. Notifications fire on submit/approve/reject. Error: a non-author with insufficient role cannot approve; self-approval is blocked.
7. **Field technician verifies on-site (mobile):** open the On-Site Mobile View → view plan, verify/check-off device positions, mark devices installed, make light edits (rename, nudge a pin, add note), capture photo pins. Error: edits to an Approved design require reopening (or are saved as field notes if locked).
8. **Export deliverables:** generate branded PDF/PNG/JPG with selectable content — coverage summary, threshold, device count, per-device detail table, BOM (generic type + brand/model, cable totals per type), wall/material summary, legend, optional "Site Photos" appendix (photo pins by location tag), scale & dimensions, floor notes. Multi-floor combined PDF supported. Error: export of an empty/uncalibrated floor is blocked with a clear message.
9. **Platform owner manages the SaaS:** Super Admin creates/suspends tenants, manages the global device catalog, manages billing/plans (Xendit), and has cross-tenant oversight. Error: tenant suspension preserves data (no destructive delete) and blocks tenant logins until reactivated.

## Modules + Features

### Tenancy & Accounts
- Multi-tenant SaaS with subdomain routing (`clientname.xplantool.powerbyte.app`).
- Tenant sign-up/onboarding, tenant-scoped users, strict per-tenant data isolation.
- Subscription billing per tenant via Xendit (automated).

### Project Workspace
- Hierarchy: Client → Project → Floor → Design. Designs saved and reusable.
- Copy floor (duplicate plan, calibration, walls, devices, cabling for similar floors).
- Per-floor notes (rich-text).
- Dashboard: projects by status, pending approvals, device counts, charts.

### Floor Plan Editor (HTML5 Canvas)
- Upload PNG/JPG (≤25 MB, magic-byte validated, auto-optimized for zoom quality).
- Mandatory two-point scale calibration (m/ft) before design.
- Zoom, fit-to-screen, 100%, adjustable plan opacity, grid + ruler overlay, snap-to-grid, margin around plan.

### Device Catalog (generic-first)
- Organized Category → Generic Device Type (seeded globally; tenants add custom devices).
- Generic device = shape/icon + customizable icon color (visual key for specs).
- Optional brand + model + specs metadata (drives BOM and coverage engines).
- Seeded categories (generic types — users add specific models/specs):
  - **Networking:** Router, Network Switch (PoE / non-PoE), Firewall/Gateway, Patch Panel, Media Converter.
  - **Wireless:** WiFi Access Point (indoor / outdoor).
  - **CCTV / Surveillance:** Bullet Camera, Dome Camera, Turret Camera, PTZ Camera, NVR/DVR.
  - **Telephony:** PABX / IP-PBX, IP Phone, Analog Phone, VoIP Gateway.
  - **Public Address / Paging:** Ceiling Speaker, Horn Speaker, Wall Speaker, Amplifier, Paging Console/Microphone.
  - **FDAS (Fire Detection & Alarm):** Smoke Detector, Heat Detector, Sounder/Horn, Strobe, Manual Call Point, Fire Alarm Control Panel (FACP).
  - **Access Control:** Door Reader, Electric Lock/Strike, Door Controller, Exit Button, Intercom.
  - **Infrastructure:** Equipment Rack/Cabinet, UPS, PoE Injector, Power Outlet.

### Device Placement & Identity
- Drag-drop placement with sticky selection (place many fast).
- Per-device properties: label/name, IP address, icon, icon color, brand, model, specs, mount height, orientation/azimuth, duplicate, delete.
- Per-floor uniqueness checks for IP and label.

### Walls (functional barriers — feed all coverage engines)
- Draw wall lines; classify by material; set thickness.
- Properties consumed by engines: RF attenuation (per band/material), CCTV opacity (blocks line-of-sight), acoustic transmission loss (by thickness/material).
- Click-select, delete individually, undo last, clear all.

### Cabling
- Draw cable runs between/among devices; assign cable type (Cat5e/Cat6/Cat6A/fiber/coax/power-control).
- Auto-calculated run length from calibrated scale; totals per cable type roll into the BOM.

### Coverage Engines
- **WiFi predictive heatmap:** ITU-R P.1238 indoor path loss + per-wall attenuation; received signal = Tx power + antenna gain − path loss − Σ wall losses; tunable path-loss exponent (2.0 open → 4.5 dense); gradient (RSSI) and pass/fail modes; threshold presets; real antenna pattern overlay where provided (isotropic fallback flagged as estimate); floor stats (AP count, % area meeting threshold); auto channel plan (interference graph + greedy coloring); auto AP placement (greedy max-coverage honoring walls).
- **CCTV DORI field-of-view:** per-camera coverage cone from mount height, resolution, lens/FOV, direction; graduated DORI zones (Detection ~25, Observation ~63, Recognition ~125, Identification ~250 px/m per EN 62676-4); cones clipped/blocked by walls.
- **Audio SPL coverage (FDAS sounders + PA/paging):** dB(A) at reference distance from brand/model specs; SPL falloff with distance; reduced by wall thickness/material (acoustic transmission loss); audibility threshold (≈75 dB(A) / +15 dB over ambient — verified during build).

### Annotation Layer (cosmetic, non-functional)
- On-plan free text + freehand doodle.
- Generic ready-made shapes (line/rectangle/circle/arrow) with adjustable color, size, thickness.
- Non-obtrusive photo pins: camera capture or upload; named/tagged location; per-image doodle + text + shape markup; plan-wide legend of pin locations.

### Approval Workflow
- Design status lifecycle: Draft → Submitted for Review → Approved (with Changes Requested/Rejected → Draft).
- Approver ≠ author; PM-authored designs require Tenant Admin approval; approved designs lock read-only until reopened.

### Notifications
- Triggered on submit / approve / reject.
- Channels: Email (live in v1); WhatsApp, Telegram, Slack wired/prepped, activated later. In-app notification center always on. (Handled in-app — no external automation platform.)

### Export & Reporting
- PDF / PNG / JPG via dialog with selectable content checkboxes (coverage %, threshold, environment, device count, per-device detail table, BOM, avg Tx power + PoE budget, wall/material summary with lengths, legend, view band/mode, scale & dimensions, floor notes, optional Site Photos appendix).
- Branding: "Generated for" client line, "Prepared by" line, generation date, project/floor name; global logo library (upload once, aspect-preserved).
- Multi-floor combined PDF (one page per floor + detail pages); predictive-model + antenna-fidelity disclaimers in footer.

### Productivity
- Master undo stack (place/move/delete devices & walls, batch accepts, channel plans, clear-all).
- Light/dark theme with system-preference detection.

### Platform Administration (Super Admin)
- Tenant management (create/suspend/reactivate/delete), global device catalog management, global user oversight, billing/plan management (Xendit), cross-tenant visibility.

## Roles + Permissions
| Role | Scope | Can do | Cannot do |
|------|-------|--------|-----------|
| Super Admin (Platform Owner) | Global | Create/suspend/delete tenants; manage global device catalog; manage all users; billing/plan control; cross-tenant access | (Superuser — no functional restriction) |
| Tenant Admin | Tenant | Manage users in own tenant; create/edit/delete own org's projects/floors/designs; approve any design (incl. PM-authored); manage tenant custom catalog | Cannot access other tenants; cannot manage the global catalog or other tenants |
| Project Manager | Tenant | Create/edit projects & designs; review and approve Engineer designs | Cannot manage users/tenants; cannot self-approve own-authored designs (requires Tenant Admin); cannot manage global catalog |
| Engineer | Tenant | Create/edit projects, floors & designs; place/label/IP devices; draw walls & cabling; run coverage engines; annotate; submit for review; export | Cannot approve designs; cannot manage users/tenants; cannot manage global catalog |
| Client | Tenant | View own org's designs; export/download deliverables | Cannot create/edit anything; cannot see other tenants; cannot approve |

## Data Entities
Tenant: id, name, slug/subdomain, plan, status (active/suspended), created_at, billing_ref
User: id, tenant_id (nullable for Super Admin), name, email, password_hash, role, status, last_login
Client: id, tenant_id, name, contact_name, email, phone, company_address, created_at
Project: id, tenant_id, client_id, name, description, status, created_by, created_at
Floor: id, project_id, name, level/order, image_ref, scale_ratio (px↔real), scale_unit (m/ft), opacity, notes
Design: id, floor_id, status (draft/submitted/approved/changes-requested), version, author_id, approver_id, approved_at, locked
DeviceCatalogItem: id, scope (global/tenant), tenant_id (nullable), category, generic_type, default_icon, default_specs, brand (opt), model (opt), specs (opt), verified|estimate
PlacedDevice: id, design_id, catalog_item_id, label, ip_address, icon, icon_color, brand, model, specs, x, y, mount_height, orientation/azimuth, installed_flag
Wall: id, design_id, points, material, thickness, rf_attenuation, cctv_opacity, acoustic_loss
CableRun: id, design_id, cable_type, path_points, length, from_device_id, to_device_id
Annotation: id, design_id, type (text/doodle/shape), shape_kind, color, size, thickness, geometry, content
PhotoPin: id, design_id, name/tag, x, y, image_ref, markup (doodle/text/shapes), created_by, created_at
BOMItem: derived — generic_type, brand/model, qty; cable totals per type
Logo: id, tenant_id, image_ref, name
Notification: id, tenant_id, user_id, type, channel, payload, read_flag, sent_at
AuditLog: id, tenant_id, actor_id, action, entity, entity_id, before/after, timestamp
Subscription: id, tenant_id, plan, status, xendit_ref, period_start, period_end

## Integrations
Email (SMTP): transactional + notification email — live in v1 — OSS/standard SMTP.
WhatsApp / Telegram / Slack: notification channels — wiring/prep in v1, activated later — API.
Xendit: automated subscription billing for tenants (SEA default gateway) — Paid/API.
Orqafy: planned future API integration (contract/hook only) — not built in v1.
[Coverage engines (WiFi/CCTV/audio) are internal computation, not external services.]

## Deployment Config
Environments: dev / staging / prod
Hosting:      Single self-hosted server for v1 (architected to scale to multiple servers later)
Dev mode:     MODE A — WSL2 native (only supported mode — pre-locked)
Docker Hub:   enabled — hub_repo: bonitobonita24/xplantool

## Mobile Needs

**Native mobile app:** None — responsive mobile-first PWA (web only). No app store.
**Auth mode:** session (web PWA; standard authenticated sessions).

**Mobile scope split:** Phone = essentials (view plan, verify/check-off devices, mark installed, light edits, photo-pin capture). Tablet = closer to full PC editing. Desktop/PC browser = full heavy design.

**Per-page mobile strategy (auto-classified in Step 8b, reviewed by user):**

| # | Page | Strategy | Notes |
|---|------|----------|-------|
| 1 | Login | Mobile First | Accessed from anywhere incl. on-site |
| 2 | Tenant Sign-up / Onboarding | Mobile First | Customer-facing public flow |
| 3 | Forgot/Reset Password | Mobile First | Access from any device |
| 4 | On-Site Mobile View (view/verify/check-off, light edits, photo pins) | Mobile First | Core field workflow on phone |
| 5 | Notifications Center | Mobile First | Messaging-style, on-the-go |
| 6 | Tenant Dashboard | Mobile Ready | Data-dense desk overview |
| 7 | Clients (list/manage) | Mobile Ready | Data table |
| 8 | Projects (list) | Mobile Ready | Data table |
| 9 | Project Detail (floors) | Mobile Ready | Management view |
| 10 | Floor Plan Editor (full design) | Mobile Ready | Heavy canvas — desktop/tablet |
| 11 | Approvals / Review Queue | Mobile Ready | Review flow (PM/Admin may also use phone) |
| 12 | Device Catalog (tenant + custom) | Mobile Ready | Data management |
| 13 | BOM / Reports | Mobile Ready | Tabular, multi-section |
| 14 | Export Dialog | Mobile Ready | Config-heavy, paired with editor |
| 15 | Logo Library | Mobile Ready | Asset management |
| 16 | Tenant Settings / Users | Mobile Ready | Admin config |
| 17 | User Profile / Settings | Mobile Ready | Infrequent config |
| 18 | Platform Admin — Dashboard | Mobile Ready | Super-admin, data-dense |
| 19 | Platform Admin — Tenant Management | Mobile Ready | Super-admin tables |
| 20 | Platform Admin — Global Catalog | Mobile Ready | Catalog management |
| 21 | Platform Admin — Billing/Plans (Xendit) | Mobile Ready | Billing admin |

**Phase 4 implementation guidance:**
- Mobile First pages: design at 375px baseline, enhance up; touch targets ≥44×44px; single-column forms <768px.
- Mobile Ready pages: design desktop-first (1280px+), degrade gracefully (horizontal table scroll, collapsible sidebar, drawer nav).
- Both use shadcn/ui — difference is breakpoint priority only.

## Non-functional Requirements
Performance:    Interactive canvas editing remains smooth on typical floors; coverage recompute on change with no blocking UI; API responsive under normal tenant concurrency.
Uptime:         99.5% target for prod.
Data retention: Client/project data retained for the tenant's active subscription; export + delete-on-request honored per PH Data Privacy Act.
Compliance:     Philippine Data Privacy Act (RA 10173) baseline — confidential, client-sensitive data; strict tenant isolation. (No GDPR/PCI in v1; Xendit handles card data out-of-scope of app storage.)
Design system:  see docs/DESIGN.md (Cursor aesthetic — getdesign.md)

## Tenancy Model
multi
Subdomain routing (clientname.xplantool.powerbyte.app)
Shared global data: device catalog (global items only) — all design data is tenant-isolated.
DB isolation exception: none required in v1 (no payroll/banking). Floor-plan/security data treated as confidential and tenant-isolated via the L1–L6 security stack.

## User-Facing URLs
/                         public landing / login (per-tenant on subdomain)
/signup                   tenant sign-up / onboarding
/dashboard                tenant dashboard
/clients                  clients list
/projects                 projects list
/projects/[id]            project detail (floors)
/editor/[designId]        floor plan editor (full design)
/mobile/[designId]        on-site mobile view
/catalog                  device catalog (tenant + custom)
/reports                  BOM / reports
/approvals                review queue
/notifications            notification center
/logos                    logo library
/settings                 tenant settings / users / profile
/admin/                   platform admin (Super Admin only): tenants, global catalog, billing

## Access Control
Public routes:    /, /signup, /login, /forgot-password, /reset-password
Protected routes: /dashboard, /clients, /projects, /editor, /mobile, /catalog, /reports, /approvals, /notifications, /logos, /settings (require login, tenant-scoped)
Admin-only:       /admin/* (Super Admin); user/tenant management within /settings (Tenant Admin); approval actions (Project Manager / Tenant Admin)

## Data Sensitivity
PII stored:       yes — user accounts (name, email), client contacts (name, email, phone, company address)
Financial data:   subscription/billing metadata only; card processing delegated to Xendit (not stored in app)
Health data:      no
Audit required:   create/edit/move device; wall & cabling changes; submit; approve/reject; export/download; tenant + user management — logged with actor + timestamp
GDPR/compliance:  PH Data Privacy Act (RA 10173) — data export + delete-on-request; confidential, tenant-isolated

## Security Requirements
Rate limiting:    public: 30/min | auth: 10/min | api: 120/min | upload: 20/min
CORS origins:     dev: localhost:* | staging: https://xplantool-staging.powerbyte.app | prod: https://xplantool.powerbyte.app (+ tenant subdomains)
Security layers:  L3 RBAC + L5 AuditLog + L6 Prisma guardrails always active; L1+L2+L4 multi-tenant isolation active (tenancy.mode: multi)
Bot protection:   Cloudflare Turnstile on public forms (login, signup, password reset) — framework default

## App Footer (locked default)
Content: `Powered by Powerbyte I.T. Solutions · © [year] All rights reserved.` (Powerbyte-owned; year dynamic)
Implementation: single `<Footer />` in app layout; text-muted-foreground, text-xs, py-4, centered.

## Environments Needed
dev / staging / prod

## Domain / Base URL Expectations
Dev:     http://localhost:[port assigned by Phase 3 — do not specify a number here]
Stage:   https://xplantool-staging.powerbyte.app
Prod:    https://xplantool.powerbyte.app  (tenants: https://[tenant].xplantool.powerbyte.app)

## Infrastructure Notes
All services run in Docker Compose — mono-server for dev/staging/prod (designed to scale out later).
Docker Hub publishing: enabled — hub_repo: bonitobonita24/xplantool
pgAdmin: included on all environments — credentials auto-generated by Phase 3
CREDENTIALS.md: generated by Phase 3 — master credentials list, strictly gitignored
Security: HTTP headers + rate limiter + DOMPurify sanitizer scaffolded by Phase 4 — always-on defaults
Spec stress-test: Phase 2.7 runs automatically before Phase 3
File storage: MinIO (dev) → S3/R2 (prod) via env var — floor images, logos, photo-pin images
Cache/queue: Valkey + BullMQ — background jobs for image optimization and notification delivery
Payments: Xendit (SEA default) — keys collected in Bootstrap credential gate; webhook x-callback-token verification enforced
AWS path when ready: RDS, S3, ElastiCache, SES — update .env.{env} only, zero code changes.

## Tech Stack Preferences
Frontend framework:        Next.js (App Router)
API style:                 tRPC
ORM / DB layer:            Prisma
Auth provider:             Auth.js v5 (email/password, social, magic link; sessions in PostgreSQL)
Auth strategy:             authjs
Primary database:          PostgreSQL
Cache / queue:             Valkey + BullMQ
File storage:              MinIO (dev) / S3 or R2 (prod)
UI component library:      shadcn/ui + Tailwind CSS (locked — no alternatives)
Canvas:                    plain HTML5 Canvas 2D (floor-plan editor, heatmap, DORI cones, audio SPL, annotations) — locked
Chart library:             shadcn/ui Chart (Recharts) — dashboard analytics
Map library:               none
Complex UI components:     Kibo UI — color picker, file dropzone, rich-text editor
Icon set:                  lucide-react (shadcn/ui default)
PDF:                       client-side PDF generation (exports)
Mobile UI library:         none (responsive mobile-first PWA using shadcn/ui + Tailwind)

## Out of Scope
- PDF / DWG / CAD floor-plan import (PNG/JPG image upload only in v1)
- Native mobile app / app-store distribution (responsive mobile-first PWA only)
- Full heavy design editing on phones (full design on desktop/tablet; phone = view/verify/light edits)
- Orqafy API integration (planned for a later version)
- n8n / OpenClaw external automation (not used in this project)
- AI/ML wall auto-detection from the floor image (walls drawn manually in v1)
- Real-time multi-user collaborative editing (one editor per design at a time)
- Multi-language / i18n (English only in v1)
- Public third-party API (no open API in v1)
