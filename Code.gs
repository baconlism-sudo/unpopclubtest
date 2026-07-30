/**
 * THE UNPOPULAR CLUB — contact form receiver
 *
 * วางไฟล์นี้ใน Apps Script ที่ผูกกับ Google Sheet โดยตรง
 * ไม่ต้องมี Cloud project ไม่ต้องมี service account ไม่ต้องมีคีย์
 *
 * วิธีติดตั้งอยู่ใน SETUP-GOOGLE-SHEETS.md
 */

/* ── ตั้งค่า ─────────────────────────────── */

// รหัสลับ ต้องตรงกับ APPS_SCRIPT_SECRET ที่ Netlify
// สร้างใหม่ด้วยคำสั่งนี้ในเทอร์มินัล  openssl rand -hex 24
const SECRET = 'REPLACE_WITH_YOUR_SECRET';

// ชื่อแท็บใน Sheet
const SHEET_TAB = 'Sheet1';

// เขตเวลาสำหรับ Timestamp
const TIMEZONE = 'Asia/Bangkok';

/* ── รับข้อมูล ──────────────────────────── */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return reply({ ok: false, error: 'empty body' });
    }

    const body = JSON.parse(e.postData.contents);

    // กันคนอื่นยิงข้อมูลขยะเข้ามา
    if (body.secret !== SECRET) {
      return reply({ ok: false, error: 'unauthorized' });
    }

    const row = [
      Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd HH:mm:ss'),
      clean(body.name),
      clean(body.email),
      clean(body.topic),
      clean(body.message),
      body.pdpaConsent ? 'yes' : 'no',
      clean(body.sourcePage)
    ];

    if (!row[1] || !row[2] || !row[3] || !row[4]) {
      return reply({ ok: false, error: 'missing required fields' });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_TAB);
    if (!sheet) return reply({ ok: false, error: 'sheet tab not found: ' + SHEET_TAB });

    sheet.appendRow(row);
    return reply({ ok: true });

  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

/* เปิดด้วยเบราว์เซอร์แล้วจะเห็นข้อความนี้ ใช้เช็กว่า deploy สำเร็จ */
function doGet() {
  return reply({ ok: true, service: 'unpop contact receiver' });
}

/* ── ตัวช่วย ────────────────────────────── */

function clean(v) {
  return String(v == null ? '' : v).trim().slice(0, 5000);
}

function reply(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
