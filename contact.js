/**
 * THE UNPOPULAR CLUB — contact form (สำหรับ host ที่ไม่ใช่ Netlify เช่น Vercel)
 * ตรรกะเดียวกับ netlify/functions/contact.js
 *
 * ตัวแปรที่ต้องตั้ง
 *   APPS_SCRIPT_URL     URL ของ Web App ลงท้ายด้วย /exec
 *   APPS_SCRIPT_SECRET  ต้องตรงกับ SECRET ใน Code.gs
 */
function clean(v) { return String(v == null ? "" : v).trim(); }

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST")    return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const submission = {
      name:        clean(body.name),
      email:       clean(body.email),
      topic:       clean(body.topic),
      message:     clean(body.message),
      pdpaConsent: Boolean(body.pdpaConsent),
      sourcePage:  clean(body.sourcePage || req.headers?.referer || "contact.html"),
    };

    if (!submission.name || !submission.email || !submission.topic || !submission.message) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const url    = process.env.APPS_SCRIPT_URL;
    const secret = process.env.APPS_SCRIPT_SECRET;
    if (!url || !secret) return res.status(500).json({ error: "Not configured" });

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      body: JSON.stringify({ ...submission, secret }),
    });
    const text = await r.text();
    let data;
    try { data = JSON.parse(text); }
    catch { throw new Error("Apps Script ตอบกลับไม่ใช่ JSON: " + text.slice(0, 200)); }
    if (!r.ok || !data.ok) throw new Error(data.error || "Apps Script ปฏิเสธคำขอ");

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error("contact api error:", err.message);
    return res.status(500).json({ error: "Submission failed" });
  }
};
