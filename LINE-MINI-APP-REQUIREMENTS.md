# LINE MINI App — สิ่งที่ต้องเตรียม

> อ้างอิงเอกสาร LINE Developers · ตรวจสอบ 18 ก.ค. 2026
> โจทย์: ทำ Free Chart Check ให้อยู่ใน LINE เพื่อเป็น Layer 2 ของ product ladder

---

## ⚠️ อ่านข้อนี้ก่อน

**ในไทย คุณสมัคร verified MINI App เองไม่ได้**

เอกสาร LINE ระบุชัดว่า ถ้า Region to provide the service คือ **ไทยหรือไต้หวัน**
เฉพาะ channel ที่อยู่ภายใต้ **certified provider** เท่านั้นที่ยื่นขอ verification review ได้

แปลว่าต้องติดต่อ **LINE for Business Thailand** เพื่อขอเป็น certified provider ก่อน
ซึ่งเป็นขั้นตอนเชิงพาณิชย์ ไม่ใช่แค่กรอกฟอร์มใน console

> lineforbusiness.com/th/service/mini-app

**สิ่งที่ต้องรู้ก่อนตัดสินใจ (ข้อมูลยังไม่พอ ต้องถาม LINE เอง):**
- ค่าใช้จ่ายในการเป็น certified provider
- เงื่อนไขขั้นต่ำ เช่น ขนาดธุรกิจ นิติบุคคล ยอดผู้ใช้
- ระยะเวลาอนุมัติ

---

## ทางเลือก: เริ่มจาก Unverified ก่อน

**ใครก็สร้าง unverified MINI App ได้** ไม่ต้องผ่าน review

| | Unverified | Verified |
|---|---|---|
| ใครสร้างได้ | ใครก็ได้ | ต้องผ่าน certified provider (ในไทย) |
| เปิดจากลิงก์ / QR | ✅ | ✅ |
| เปิดจาก Rich Menu ใน OA | ✅ | ✅ |
| ค้นหาใน LINE ได้ | ❌ | ✅ |
| อยู่ใน Home tab | ❌ | ✅ |
| Add to Home Screen | ❌ | ✅ |
| Custom Path (URL สวย) | ❌ | ✅ |
| Channel consent simplification | ❌ | ✅ |
| Header แสดงอะไร | ชื่อ + domain | ชื่อ + badge ยืนยัน |

**ข้อเสนอ:** เริ่มจาก unverified ก่อน เพราะสิ่งที่คุณต้องการจริงๆ คือให้คนกดจาก Rich Menu ของ OA
ซึ่ง unverified ทำได้แล้ว ส่วนการค้นหาใน LINE ค่อยว่ากันตอนที่พิสูจน์แล้วว่ามีคนใช้จริง

---

## รายการที่ต้องเตรียม

### 1. บัญชีและสิทธิ์

- [ ] LINE Developers Console account
- [ ] Provider (ชื่อต้องตรงกับ "ผู้ให้บริการ" จริง ใช้ตอน review)
- [ ] LINE Official Account ที่ผูกกับ MINI App
- [ ] *(ถ้าจะทำ verified)* ติดต่อ LINE for Business Thailand เรื่อง certified provider

### 2. เอกสารและข้อความ

- [ ] **Channel name** ชื่อที่คนเห็น
- [ ] **Channel description** ⚠️ ข้อนี้มีผลต่อการ review โดยตรง
  - ❌ ไม่ดี: "The Unpopular Club คือคอมมูนิตี้ Human Design"
  - ✅ ดี: "บริการเช็ก Human Design chart ฟรี กรอกวันเวลาและสถานที่เกิด แล้วรับ chart พร้อมคำอธิบาย Type, Strategy และ Authority"
  - หลักคือ **บอกว่าผู้ใช้ทำอะไรได้ในแอป** ไม่ใช่บอกว่าแบรนด์คืออะไร
- [ ] **Privacy Policy** ต้องระบุชื่อบริษัทที่เก็บข้อมูลผู้ใช้ **ตรงกับชื่อ provider**
  - หน้า privacy-policy.html ที่มีอยู่ต้องแก้ให้ครอบคลุมการเก็บ LINE user ID และข้อมูลวันเกิด
- [ ] **Terms of Service**
- [ ] Region to provide the service = Thailand

### 3. ไอคอนและงานออกแบบ

- [ ] **App icon** ตามสเปกของ LINE (ต้องอ่าน icon guideline ก่อนทำ)
- [ ] **Loading icon** LINE มีข้อกำหนดเฉพาะ
- [ ] รองรับ **landscape safe area**
- [ ] Screen size บังคับเป็น `Full` เท่านั้น เลือกไม่ได้

> เชื่อมกับงานที่ค้างอยู่: logo concepts ยังไม่ได้ทำ ถ้าจะทำ MINI App ควรทำ logo ให้จบก่อน
> เพราะไอคอนต้องใช้ และแก้ทีหลังต้องส่ง review ใหม่

### 4. งานพัฒนา

- [ ] Endpoint URL แบบ HTTPS
- [ ] หน้าเว็บที่ทำงานได้บน mobile เต็มจอ
- [ ] LIFF SDK สำหรับ init + ดึงโปรไฟล์ผู้ใช้
- [ ] ผ่าน **Performance guidelines** ของ LINE
- [ ] *(ถ้าจะทำ)* Custom action button สำหรับให้ผู้ใช้แชร์ต่อ
- [ ] Review channel กับ Published channel ต้องชี้ไปที่ service เดียวกัน

### 5. ฟีเจอร์เสริมที่น่าพิจารณา

- [ ] **Service Messages** ส่งข้อความหาผู้ใช้หลังทำ action เสร็จ
  → เหมาะกับการส่ง chart กลับไปให้ ตรงกับ use case ของคุณมาก
- [ ] **Common Profile Quick-fill** ลดแรงเสียดทานตอนกรอกฟอร์ม
- [ ] Payment / In-app purchase → **ยังไม่ต้อง** ในเฟสแรก
  ถ้าจะใช้ ต้องยื่นขออนุมัติแยกก่อน และระหว่างรอจะยื่น verification review ไม่ได้

---

## สิ่งที่ยังตอบไม่ได้ ต้องตัดสินใจก่อนเริ่ม

**1. MINI App นี้ทำอะไรกันแน่**

ตัวเลือกที่เห็น เรียงจากง่ายไปยาก:

| ระดับ | ทำอะไร | ความยาก |
|---|---|---|
| A | ฟอร์มกรอกวันเกิด แล้วคนส่งข้อมูลเข้ามา ทีมตอบกลับเอง | ต่ำ |
| B | คำนวณ chart อัตโนมัติ แสดงผลในแอปเลย | กลาง ต้องมี engine คำนวณ |
| C | B + เก็บ chart ไว้ในบัญชี + Daily Transit | สูง ต้องมี backend + database |

**ยังไม่รู้ว่าคุณจะเอาระดับไหน** และคำตอบเปลี่ยนขอบเขตงานทั้งหมด

**2. Chart engine จะเอามาจากไหน**

- เขียนเอง (คำนวณตำแหน่งดาว ต้องใช้ ephemeris)
- ใช้ API เจ้าอื่น (มีค่าใช้จ่ายต่อครั้ง + พึ่งพาคนอื่น)
- Jovian Archive มี API ให้ใช้ไหม ยังไม่ได้ตรวจสอบ

**3. เก็บข้อมูลผู้ใช้ที่ไหน**

ตอนนี้เว็บใช้ Netlify Forms กับ Tally ซึ่งไม่มี database
ถ้า MINI App ต้องจำผู้ใช้ ต้องมี backend จริง

**4. เชื่อมกับ Skool ยังไง**

ใน funnel คุณวาง LINE เป็น conversion และ Skool เป็น community
ยังไม่มีแผนว่าคนจะย้ายจาก LINE ไป Skool ยังไงโดยไม่หลุด

---

## ลำดับที่แนะนำ

**Phase 0 — ก่อนแตะโค้ด**
ตัดสินใจว่าจะเอาระดับ A, B หรือ C · ตรวจสอบเรื่อง chart engine · คุยกับ LINE for Business เรื่อง certified provider เพื่อรู้ต้นทุน

**Phase 1 — Unverified MVP**
สร้าง channel · ทำหน้าเดียวคือฟอร์มเช็ก chart · ผูกกับ Rich Menu ของ OA · วัดว่ามีคนใช้จริงกี่คน

**Phase 2 — ถ้า Phase 1 มีคนใช้จริง**
เพิ่ม Service Messages · ทำ logo/icon ให้จบ · ยื่นขอ verified ผ่าน certified provider

**Phase 3 — Daily Transit / AI Chat**
ตามที่วางไว้ใน content pillar 8 และ 9

---

## ข้อควรระวัง

**Review ใช้เวลา 1-2 สัปดาห์** และถ้าไม่ผ่านต้องแก้แล้วยื่นใหม่ กำหนดวันเสร็จเองไม่ได้

**หลังผ่าน review แล้ว search จะเปิดอัตโนมัติในวันที่ 31** ถ้าไม่กด Search enable เอง
ถ้ายังไม่พร้อมให้คนเจอ ต้องวางแผนช่วงเวลานี้ด้วย

**Platform dependency** ข้อนี้คุณเขียนไว้เองใน Strategic Risk ข้อ 1
การลงทุนหนักกับ LINE MINI App เพิ่มการพึ่งพา LINE
ควรเก็บ email ของคนที่เข้ามาผ่าน MINI App ไว้เป็นฐานของตัวเองด้วยตั้งแต่วันแรก
