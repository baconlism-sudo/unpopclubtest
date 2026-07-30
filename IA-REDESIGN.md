# The Unpopular Club — Information Architecture Redesign

> จาก "เว็บขายคอร์ส" → "หน้าบ้านของ decision intelligence platform"
> อ้างอิง: Executive Summary + Product Ladder 6 Layers + 3 Market Segments

---

## หลักการออกแบบ 4 ข้อ

**1. Problem language first, Human Design second**
คนไม่ได้ค้นหา "Human Design" — เขาค้นหา "ทำไมฉัน burnout" / "ควรลาออกไหม" / "ทีมไม่เข้ากัน"
Human Design คือคำตอบ ไม่ใช่หัวข้อ นี่คือการแก้ Strategic Risk ข้อ 3 โดยตรง

**2. เว็บไม่ปิดการขาย — เว็บทำหน้าที่ route**
ตาม Technology Strategy: Website = Brand, LINE = CRM, Skool = Learning
หน้าที่ของเว็บคือพาคนไปยัง layer ที่ใช่ ไม่ใช่บังคับให้ซื้อในหน้าเดียว

**3. ทุก layer ต้องมีที่ยืนบนเว็บ**
ปัจจุบันเว็บโชว์แค่ Layer 4 (คอร์ส) คนที่ยังไม่พร้อมจ่าย = ไม่มีที่ไปต่อ = หลุด
ต้องมี free entry point ที่ชัดเจน และ enterprise path ที่มองเห็นได้

**4. แยก segment แต่ไม่บังคับเลือกตั้งแต่วินาทีแรก**
Homepage พูดปัญหาที่ทุก segment เข้าใจ แล้วค่อยแยกทางกลางหน้า
บังคับเลือกเร็วเกินไป = คนที่ยังไม่รู้จักตัวเองจะหลุด

---

## โครงสร้าง Navigation ใหม่

```
LOGO                                                    [TH/EN]  [เช็ก Chart ฟรี →]

Start Here          สำหรับคุณ ▾        สำหรับองค์กร ▾      Learn ▾         About
                    ├ เช็ก Chart ฟรี    ├ Team Design      ├ Weekly Transit
                    ├ Living Your       ├ Leadership       ├ Beginner Guide
                    │  Design (LYD)     │  Development     ├ Case Studies
                    ├ BG5 Foundation    ├ Talent Placement └ Blog
                    └ Community (Skool) └ CPK Assessment
```

**เปลี่ยนอะไรจากเดิม**

| เดิม | ใหม่ | เหตุผล |
|---|---|---|
| LYD, BG5 อยู่ระดับเดียวกับ nav หลัก | ย้ายไปใต้ "สำหรับคุณ" | ชื่อคอร์สไม่สื่อปัญหา คนใหม่ไม่รู้ว่าคืออะไร |
| ไม่มี enterprise path | เพิ่ม "สำหรับองค์กร" | เปิด Layer 6 ที่มี margin สูงสุด |
| ไม่มี free entry | เพิ่ม "เช็ก Chart ฟรี" เป็น nav CTA | Layer 2 คือประตูเข้า funnel |
| Member Area → Patreon | เปลี่ยนเป็น Skool | ตาม tech strategy |
| Contact เป็น nav หลัก | ย้ายลง footer + ปุ่มใน enterprise page | Contact ไม่ใช่สิ่งที่คนมาเว็บเพื่อหา |

---

## รายการหน้าทั้งหมด

### Tier 1 — หน้าหลัก (ทำก่อน)

**1. `index.html` — Homepage**
เป้าหมาย: พูดภาษาปัญหา → สร้าง resonance → แยก segment → ส่งเข้า free entry
กลุ่ม: ทุก segment

**2. `chart-check.html` — เช็ก Chart ฟรี** ⭐ ใหม่
เป้าหมาย: Lead capture หลักของทั้งเว็บ (Layer 2)
กลุ่ม: Consumer
ส่งต่อ: LINE OA
> นี่คือหน้าที่สำคัญที่สุดในเว็บใหม่ — ทุก CTA ควรวิ่งมาที่นี่

**3. `for-teams.html` — สำหรับองค์กร** ⭐ ใหม่
เป้าหมาย: Enterprise lead generation (Layer 6)
กลุ่ม: Enterprise (HR, Founder, Manager)
ส่งต่อ: Booking call
> ภาษาต้องเป็น business outcome ล้วน — turnover, team performance, hiring
> ห้ามพูด "Human Design" ในครึ่งหน้าแรก

**4. `living-your-design.html` — LYD** (มีอยู่แล้ว)
ปรับ: เพิ่ม framework 5-step + testimonials + เชื่อมกับ chart-check

**5. `bg5-foundation.html` — BG5** (มีอยู่แล้ว แต่ยังว่าง)
ปรับ: สร้างเนื้อหาเต็ม + แยกส่วน B2C / B2B ให้ชัด

**6. `about.html` — About** (มีอยู่แล้ว)
ปรับ: เน้น "ทำไม unpop ถึงต่าง" ไม่ใช่แค่ประวัติ

### Tier 2 — Content engine (ทำหลัง)

**7. `learn.html` — Content Hub** ⭐ ใหม่
รวม 12 content pillars — SEO engine + consideration stage

**8. `transit.html` — Weekly Transit** ⭐ ใหม่
Pillar 9 — เหตุผลให้คนกลับมาทุกสัปดาห์ (retention)

**9. `stories.html` — Case Studies** ⭐ ใหม่
Pillar 12 — social proof สำหรับทั้ง consumer และ enterprise

**10. `community.html` — Skool** ⭐ ใหม่
Layer 3 — อธิบายว่าเข้าไปแล้วเจออะไร

### Tier 3 — Support

`contact.html`, `privacy-policy.html`, `terms-conditions.html`, `disclaimer.html`, `thank-you.html` (มีอยู่แล้ว)

---

## Homepage — โครงใหม่ทีละ section

| # | Section | ทำหน้าที่อะไร | Tailwind Block |
|---|---|---|---|
| 1 | **Hero — ภาษาปัญหา** | ตะขอ ไม่พูด Human Design | Hero Sections |
| 2 | **Problem Resonance** | 6 ปัญหาให้คน "นี่แหละฉัน" | Feature Sections (grid) |
| 3 | **The Shift** | จาก "อ่าน chart" → "ใช้ chart ตัดสินใจ" | Content Sections |
| 4 | **Path Selector — 3 segments** | แยกทาง Consumer/Pro/Enterprise | Bento Grids |
| 5 | **Meet Khai** | Founder credibility | Team Sections |
| 6 | **Product Ladder** | โชว์ว่าเดินต่อได้ยังไง | Feature Sections (steps) |
| 7 | **Social Proof** | Stats + Testimonials | Stats + Testimonials |
| 8 | **Free Entry CTA** | → chart-check / LINE | CTA Sections |

**สิ่งที่ตัดออกจากหน้าแรกเดิม**
- Course hero slider — เอาคอร์สขึ้นก่อนเร็วเกินไป คนยังไม่รู้ว่าทำไมต้องสนใจ
- Open Courses grid — ย้ายไปอยู่ใต้ Product Ladder แทน

---

## Tailwind UI Blocks ที่เหมาะกับแต่ละหน้า

### Homepage
- **Hero Sections** → hero ใหม่ที่พูดภาษาปัญหา
- **Feature Sections** → problem resonance grid, product ladder
- **Bento Grids** → path selector 3 segments (ขนาดกล่องต่างกันได้ = ให้น้ำหนัก segment ที่โฟกัส)
- **Team Sections** → Meet Khai
- **Stats** → NPS 80, จำนวน community, ชั่วโมง consultation
- **Testimonials** → social proof
- **CTA Sections** → free chart check

### chart-check.html
- **Hero Sections** (แบบมี form ในตัว)
- **Feature Sections** → "จะได้อะไรจากการเช็ก"
- **FAQs** → ลดแรงเสียดทานก่อนกรอก
- **CTA Sections** → LINE

### for-teams.html
- **Hero Sections** (แบบ enterprise — เน้น outcome)
- **Stats** → ตัวเลขปัญหา turnover / cost of bad hire
- **Feature Sections** → 4 บริการ (Team Design, Leadership, Talent Placement, CPK)
- **Logo Clouds** → ลูกค้าองค์กร (ถ้าเปิดเผยได้)
- **Testimonials** → case study แบบ B2B
- **Pricing Sections** → package tiers (หรือ "ติดต่อเพื่อรับใบเสนอราคา")
- **Contact Sections** → booking form

### living-your-design.html
- **Feature Sections** → framework 5-step ⭐ (Task 3 ที่ค้างอยู่)
- **Testimonials** ⭐ (Task 6 ที่ค้างอยู่)
- **Pricing Sections** → แทน CTA card ปัจจุบัน
- **FAQs** (มีแล้ว — ปรับให้ตรง pattern)

### bg5-foundation.html
- **Hero Sections**
- **Feature Sections** → เนื้อหาคอร์ส
- **Content Sections** → B2B section ⭐ (Task 5 ที่ค้างอยู่)
- **Pricing Sections**

### learn.html / transit.html / stories.html
- **Blog Sections** → content hub, transit archive
- **Content Sections** → บทความเดี่ยว
- **Newsletter Sections** → เก็บ email เป็น owned channel (แก้ Risk ข้อ 1)

### Global
- **Headers** → nav แบบมี dropdown (ปัจจุบันเป็น flat list)
- **Flyout Menus** → dropdown "สำหรับคุณ" / "สำหรับองค์กร"
- **Banners** → announcement bar (มีแล้ว)
- **Footers** → footer ใหม่ที่มี sitemap ครบ

---

## Priority — ลำดับการทำ

**Phase 1 — Foundation (แก้ positioning)**
1. Nav ใหม่ + dropdown
2. Homepage rewrite ทั้งหน้า
3. `chart-check.html`

**Phase 2 — Revenue (เปิด enterprise)**
4. `for-teams.html`
5. BG5 page เนื้อหาเต็ม + B2B section
6. LYD framework + testimonials

**Phase 3 — Growth (content engine)**
7. `learn.html` + `transit.html`
8. `stories.html`
9. `community.html`
10. Newsletter capture

---

## ข้อควรระวังเชิงกลยุทธ์

**Owned data (Risk ข้อ 1)**
ทุกหน้าควรมีจุดเก็บ email อย่างน้อยหนึ่งจุด แม้คนจะเข้า LINE หรือ Skool แล้วก็ตาม
ถ้าวันหนึ่ง LINE เปลี่ยนนโยบาย หรือ Skool ขึ้นราคา — คุณยังมีฐานลูกค้าของตัวเอง

**Founder dependency (Risk ข้อ 2)**
ระวังการเขียน copy ที่ผูกกับตัวคุณมากเกินไป เช่น "เรียนกับ Khai"
ควรเขียนเป็น "The Unpopular Club method" เพื่อให้ระยะยาวมีคนอื่นสอนแทนได้
Meet Khai section ควรวางเป็น "ผู้ก่อตั้ง" ไม่ใช่ "ตัวสินค้า"

**ภาษา (Risk ข้อ 3)**
กฎง่ายๆ: **หน้าจอแรกของทุกหน้า ห้ามมีคำว่า Human Design**
ให้คนรู้สึกว่า "เข้าใจปัญหาฉัน" ก่อน แล้วค่อยเฉลยว่าใช้เครื่องมืออะไร
