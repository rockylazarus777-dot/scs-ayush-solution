/**
 * Email service — Gmail SMTP via Nodemailer
 * Install: npm install nodemailer @types/nodemailer
 */
import nodemailer from "nodemailer";

// ── Gmail SMTP transporter ───────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,       // your Gmail address
    pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password (not account password)
  },
});

export async function verifyEmailConnection() {
  try {
    await transporter.verify();
    return true;
  } catch {
    return false;
  }
}

// ────────────────────────────────────────────────────────────
// ADMIN NOTIFICATION — new enquiry
// ────────────────────────────────────────────────────────────
export async function sendAdminEnquiryNotification(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  hospitalSize?: string;
  urgency?: string;
  message?: string;
  submittedAt: string;
}) {
  const subject = `🔔 New Enquiry: ${data.name} — ${data.service}`;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8"/>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; background: #f0f4ff; }
        .wrapper { max-width: 600px; margin: 0 auto; padding: 32px 16px; }
        .card { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(29,78,216,0.08); }
        .header { background: linear-gradient(135deg, #1d4ed8, #0891b2); padding: 32px; text-align: center; }
        .header h1 { color: #fff; margin: 0; font-size: 22px; font-weight: 700; }
        .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px; }
        .body { padding: 32px; }
        .badge { display: inline-block; background: #eff6ff; color: #1d4ed8; border-radius: 100px; padding: 4px 12px; font-size: 12px; font-weight: 600; margin-bottom: 24px; }
        .field { margin-bottom: 16px; }
        .label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 4px; }
        .value { font-size: 15px; color: #1e293b; font-weight: 500; background: #f8fafc; padding: 12px 16px; border-radius: 10px; border: 1px solid #e2e8f0; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .cta { text-align: center; margin: 24px 0 0; }
        .cta a { display: inline-block; background: linear-gradient(135deg, #1d4ed8, #0891b2); color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 600; font-size: 14px; }
        .footer { background: #f8fafc; padding: 20px 32px; text-align: center; }
        .footer p { color: #94a3b8; font-size: 12px; margin: 0; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="card">
          <div class="header">
            <h1>🏥 New Lead Alert</h1>
            <p>SCS Ayush Solution — Enquiry Management</p>
          </div>
          <div class="body">
            <span class="badge">📬 New Enquiry Received — ${data.submittedAt}</span>
            <div class="grid">
              <div class="field">
                <div class="label">Full Name</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="field">
                <div class="label">Service Requested</div>
                <div class="value">${data.service}</div>
              </div>
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value">${data.email}</div>
              </div>
              <div class="field">
                <div class="label">Phone Number</div>
                <div class="value">${data.phone}</div>
              </div>
              ${data.hospitalSize ? `
              <div class="field">
                <div class="label">Hospital Size</div>
                <div class="value">${data.hospitalSize}</div>
              </div>` : ""}
              ${data.urgency ? `
              <div class="field">
                <div class="label">Urgency Level</div>
                <div class="value">${data.urgency}</div>
              </div>` : ""}
            </div>
            ${data.message ? `
            <div class="field" style="margin-top:8px;">
              <div class="label">Message</div>
              <div class="value" style="white-space:pre-wrap;">${data.message}</div>
            </div>` : ""}
            <div class="cta">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/enquiries">View in Admin Panel →</a>
            </div>
          </div>
          <div class="footer">
            <p>SCS Ayush Solution · Your Trusted Healthcare Service Partner</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"SCS Ayush Solution" <${process.env.GMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject,
    html,
  });
}

// ────────────────────────────────────────────────────────────
// CUSTOMER AUTO-REPLY
// ────────────────────────────────────────────────────────────
export async function sendCustomerConfirmation(data: {
  name: string;
  email: string;
  service: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8"/>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; background: #f0f4ff; }
        .wrapper { max-width: 600px; margin: 0 auto; padding: 32px 16px; }
        .card { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(29,78,216,0.08); }
        .header { background: linear-gradient(135deg, #0f2562, #1d4ed8, #0891b2); padding: 48px 32px; text-align: center; }
        .logo { width: 60px; height: 60px; background: rgba(255,255,255,0.15); border-radius: 16px; display: inline-flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 16px; }
        .header h1 { color: #fff; margin: 0 0 8px; font-size: 26px; font-weight: 700; }
        .header p { color: rgba(255,255,255,0.8); margin: 0; font-size: 14px; }
        .body { padding: 40px 32px; }
        .greeting { font-size: 20px; font-weight: 600; color: #1e293b; margin-bottom: 16px; }
        .text { color: #475569; line-height: 1.7; font-size: 15px; margin-bottom: 16px; }
        .highlight-box { background: linear-gradient(135deg, #eff6ff, #ecfeff); border: 1px solid #bfdbfe; border-radius: 14px; padding: 20px 24px; margin: 24px 0; }
        .highlight-box p { margin: 0 0 8px; font-size: 14px; color: #1e40af; font-weight: 600; }
        .highlight-box span { font-size: 18px; font-weight: 700; color: #1d4ed8; }
        .steps { background: #f8fafc; border-radius: 14px; padding: 24px; margin: 24px 0; }
        .steps h3 { font-size: 14px; font-weight: 700; color: #374151; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 0.05em; }
        .step { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; }
        .step-num { width: 28px; height: 28px; background: linear-gradient(135deg,#1d4ed8,#0891b2); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: #fff; font-size: 12px; font-weight: 700; flex-shrink: 0; }
        .step-text { font-size: 14px; color: #475569; line-height: 1.5; padding-top: 4px; }
        .cta { text-align: center; margin: 32px 0; }
        .cta a { display: inline-block; background: linear-gradient(135deg, #1d4ed8, #0891b2); color: #fff; text-decoration: none; padding: 16px 40px; border-radius: 14px; font-weight: 700; font-size: 15px; box-shadow: 0 8px 24px rgba(29,78,216,0.3); }
        .contact { background: #f8fafc; border-radius: 14px; padding: 20px; display: flex; gap: 24px; flex-wrap: wrap; margin: 24px 0; }
        .contact-item { font-size: 13px; color: #475569; }
        .contact-item strong { display: block; color: #1e293b; font-weight: 600; margin-bottom: 2px; }
        .footer { background: linear-gradient(135deg, #f8fafc, #eff6ff); padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0; }
        .footer p { color: #94a3b8; font-size: 12px; margin: 4px 0; }
        .social { display: flex; justify-content: center; gap: 12px; margin-top: 12px; }
        .social a { color: #1d4ed8; text-decoration: none; font-size: 12px; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="card">
          <div class="header">
            <div class="logo">🏥</div>
            <h1>Thank You, ${data.name}!</h1>
            <p>Your enquiry has been received successfully</p>
          </div>
          <div class="body">
            <p class="greeting">We'll be in touch shortly 👋</p>
            <p class="text">
              Thank you for reaching out to <strong>SCS Ayush Solution</strong>.
              We have received your enquiry for <strong>${data.service}</strong> and our
              expert team will review it and contact you within <strong>24 business hours</strong>.
            </p>
            <div class="highlight-box">
              <p>SERVICE REQUESTED</p>
              <span>${data.service}</span>
            </div>
            <div class="steps">
              <h3>What Happens Next?</h3>
              <div class="step">
                <div class="step-num">1</div>
                <div class="step-text">Our team reviews your enquiry and assigns a dedicated consultant</div>
              </div>
              <div class="step">
                <div class="step-num">2</div>
                <div class="step-text">We contact you within 24 hours for an initial consultation call</div>
              </div>
              <div class="step">
                <div class="step-num">3</div>
                <div class="step-text">We prepare a customized solution proposal for your facility</div>
              </div>
              <div class="step">
                <div class="step-num">4</div>
                <div class="step-text">We begin working together to transform your healthcare operations</div>
              </div>
            </div>
            <p class="text">
              Need urgent assistance? You can also reach us directly:
            </p>
            <div class="contact">
              <div class="contact-item">
                <strong>📞 Phone</strong>
                ${process.env.CONTACT_PHONE || "+91 98765 43210"}
              </div>
              <div class="contact-item">
                <strong>📧 Email</strong>
                ${process.env.ADMIN_EMAIL || "info@scsayushsolution.com"}
              </div>
              <div class="contact-item">
                <strong>💬 WhatsApp</strong>
                +91 98765 43210
              </div>
            </div>
            <div class="cta">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}">Explore Our Services →</a>
            </div>
          </div>
          <div class="footer">
            <p><strong>SCS Ayush Solution</strong> · Your Trusted Healthcare Service Partner</p>
            <p>Mumbai, Maharashtra, India</p>
            <div class="social">
              <a href="#">LinkedIn</a>
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"SCS Ayush Solution" <${process.env.GMAIL_USER}>`,
    to: data.email,
    subject: `✅ Enquiry Received — SCS Ayush Solution`,
    html,
  });
}

// ────────────────────────────────────────────────────────────
// CAREER APPLICATION — HR notification
// ────────────────────────────────────────────────────────────
export async function sendCareerApplicationHRNotification(data: {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  resumeUrl?: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8"/>
      <style>
        body { font-family: -apple-system,sans-serif; margin:0; background:#f0f4ff; }
        .wrapper { max-width:580px; margin:0 auto; padding:24px 16px; }
        .card { background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(29,78,216,.08); }
        .header { background:linear-gradient(135deg,#1d4ed8,#7c3aed); padding:28px 32px; }
        .header h1 { color:#fff; margin:0; font-size:20px; }
        .header p { color:rgba(255,255,255,.7); margin:6px 0 0; font-size:13px; }
        .body { padding:28px 32px; }
        .field { margin-bottom:14px; }
        .label { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; color:#94a3b8; margin-bottom:4px; }
        .value { font-size:14px; color:#1e293b; background:#f8fafc; padding:10px 14px; border-radius:8px; border:1px solid #e2e8f0; }
        .cta a { display:inline-block; background:linear-gradient(135deg,#1d4ed8,#7c3aed); color:#fff; text-decoration:none; padding:12px 28px; border-radius:10px; font-weight:600; font-size:13px; }
        .footer { background:#f8fafc; padding:16px 32px; text-align:center; }
        .footer p { color:#94a3b8; font-size:11px; margin:0; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="card">
          <div class="header">
            <h1>👤 New Job Application</h1>
            <p>SCS Ayush Solution · HR Team</p>
          </div>
          <div class="body">
            <div class="field"><div class="label">Applicant Name</div><div class="value">${data.name}</div></div>
            <div class="field"><div class="label">Position Applied</div><div class="value">${data.position}</div></div>
            <div class="field"><div class="label">Email</div><div class="value">${data.email}</div></div>
            <div class="field"><div class="label">Phone</div><div class="value">${data.phone}</div></div>
            <div class="field"><div class="label">Experience</div><div class="value">${data.experience}</div></div>
            ${data.resumeUrl ? `<div class="field"><div class="label">Resume</div><div class="value"><a href="${data.resumeUrl}" style="color:#1d4ed8;">Download Resume</a></div></div>` : ""}
            <div class="cta" style="margin-top:20px;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/applications">Review in Admin →</a>
            </div>
          </div>
          <div class="footer"><p>SCS Ayush Solution — HR Management System</p></div>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"SCS Ayush Solution HR" <${process.env.GMAIL_USER}>`,
    to: process.env.HR_EMAIL,
    subject: `👤 New Application: ${data.name} — ${data.position}`,
    html,
  });
}

// ────────────────────────────────────────────────────────────
// CAREER APPLICATION — Applicant confirmation
// ────────────────────────────────────────────────────────────
export async function sendCareerApplicantConfirmation(data: {
  name: string;
  email: string;
  position: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8"/>
      <style>
        body { font-family: -apple-system,sans-serif; margin:0; background:#f0f4ff; }
        .wrapper { max-width:580px; margin:0 auto; padding:24px 16px; }
        .card { background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(29,78,216,.08); }
        .header { background:linear-gradient(135deg,#0f2562,#1d4ed8,#7c3aed); padding:40px 32px; text-align:center; }
        .header h1 { color:#fff; margin:0 0 8px; font-size:24px; }
        .header p { color:rgba(255,255,255,.8); margin:0; font-size:14px; }
        .body { padding:32px; }
        .text { color:#475569; line-height:1.7; font-size:15px; margin-bottom:16px; }
        .highlight { background:linear-gradient(135deg,#eff6ff,#faf5ff); border:1px solid #c7d2fe; border-radius:12px; padding:20px; margin:20px 0; text-align:center; }
        .highlight p { margin:0 0 6px; color:#6366f1; font-size:13px; font-weight:600; }
        .highlight span { font-size:20px; font-weight:700; color:#4338ca; }
        .footer { background:#f8fafc; padding:20px 32px; text-align:center; }
        .footer p { color:#94a3b8; font-size:12px; margin:4px 0; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="card">
          <div class="header">
            <h1>Application Received! 🎉</h1>
            <p>SCS Ayush Solution — Careers</p>
          </div>
          <div class="body">
            <p class="text">Dear <strong>${data.name}</strong>,</p>
            <p class="text">
              Thank you for applying to <strong>SCS Ayush Solution</strong>! We have received your
              application and our HR team will review it carefully.
            </p>
            <div class="highlight">
              <p>POSITION APPLIED FOR</p>
              <span>${data.position}</span>
            </div>
            <p class="text">
              We review all applications within <strong>3–5 business days</strong>. If your profile
              matches our requirements, our HR team will reach out to schedule an interview.
            </p>
            <p class="text">
              We look forward to potentially having you on our team. Thank you for your interest
              in building India's healthcare ecosystem with us.
            </p>
            <p class="text">Warm regards,<br/><strong>HR Team · SCS Ayush Solution</strong></p>
          </div>
          <div class="footer">
            <p><strong>SCS Ayush Solution</strong> · Your Trusted Healthcare Service Partner</p>
            <p>Mumbai, Maharashtra, India</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"SCS Ayush Solution HR" <${process.env.GMAIL_USER}>`,
    to: data.email,
    subject: `✅ Application Received — ${data.position} | SCS Ayush Solution`,
    html,
  });
}

// ────────────────────────────────────────────────────────────
// NEWSLETTER WELCOME
// ────────────────────────────────────────────────────────────
export async function sendNewsletterWelcome(email: string) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8"/>
      <style>
        body { font-family:-apple-system,sans-serif; margin:0; background:#f0f4ff; }
        .wrapper { max-width:540px; margin:0 auto; padding:24px 16px; }
        .card { background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(29,78,216,.08); }
        .header { background:linear-gradient(135deg,#0891b2,#06b6d4); padding:36px 32px; text-align:center; }
        .header h1 { color:#fff; margin:0 0 8px; font-size:22px; }
        .header p { color:rgba(255,255,255,.8); margin:0; font-size:13px; }
        .body { padding:32px; text-align:center; }
        .icon { font-size:48px; margin-bottom:16px; }
        .text { color:#475569; line-height:1.7; font-size:15px; }
        .footer { background:#f8fafc; padding:16px; text-align:center; }
        .footer p { color:#94a3b8; font-size:12px; margin:0; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="card">
          <div class="header">
            <h1>Welcome to SCS Insights! 📬</h1>
            <p>Healthcare Industry Intelligence · Delivered Weekly</p>
          </div>
          <div class="body">
            <div class="icon">🏥</div>
            <p class="text">You're now subscribed to <strong>SCS Ayush Solution's</strong> newsletter.
            Expect expert insights on NABH accreditation, hospital operations, healthcare regulations,
            and industry trends — delivered to your inbox every week.</p>
          </div>
          <div class="footer"><p>SCS Ayush Solution · Unsubscribe anytime</p></div>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"SCS Ayush Solution" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Welcome to SCS Insights Newsletter 🏥",
    html,
  });
}
