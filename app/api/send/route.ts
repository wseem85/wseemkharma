import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ServiceMessageData {
  service: string;
  name: string;
  email: string;
  message: string;
}

type ProjectInquiryData = Record<string, unknown>;

const escapeHtml = (input: unknown) =>
  String(input ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const displayValue = (input: unknown) =>
  Array.isArray(input) ? input.join(', ') : String(input ?? 'Not provided');

const projectScore = (data: ProjectInquiryData) => {
  let score = 1;
  const type = String(data.projectType ?? '');
  const features = Array.isArray(data.features) ? data.features.map(String) : [];
  const languages = Array.isArray(data.languages) ? data.languages.map(String) : [];
  if (type === 'E-commerce') score += 3;
  if (type === 'SaaS / Web Application') score += 5;
  if (features.some((item) => /login|account/i.test(item))) score += 2;
  if (features.some((item) => /dashboard/i.test(item))) score += 3;
  if (features.some((item) => /payment/i.test(item))) score += 3;
  if (features.some((item) => /api|integration/i.test(item))) score += 2;
  if (features.some((item) => /admin/i.test(item))) score += 3;
  if (languages.length > 1) score += 2;
  if (languages.includes('Arabic')) score += 1;
  if (String(data.pageRange ?? '').includes('16')) score += 2;
  if (data.design === 'You design it') score += 2;
  if (/content/i.test(String(data.contentStatus ?? ''))) score += 2;
  if (data.timeline === 'As soon as possible') score += 2;
  return score;
};

const complexityLevel = (score: number) =>
  score <= 5 ? 'Small' : score <= 10 ? 'Medium' : score <= 18 ? 'Complex' : 'Advanced';

async function sendProjectInquiry(data: ProjectInquiryData) {
  const name = String(data.name ?? '').trim();
  const email = String(data.email ?? '').trim();
  const phone = String(data.phone ?? '').trim();
  const goal = String(data.goal ?? '').trim();
  const service = String(data.service ?? 'website').trim();
  const websiteTrap = String(data.website ?? '').trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+[1-9]\d{7,14}$/;

  if (websiteTrap) return NextResponse.json({ error: 'Unable to submit inquiry.' }, { status: 400 });
  if (!name || !goal) return NextResponse.json({ error: 'Name and project goal are required.' }, { status: 400 });
  if (!email && !phone) return NextResponse.json({ error: 'A valid email or phone number is required.' }, { status: 400 });
  if (email && !emailRegex.test(email)) return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  if (phone && !phoneRegex.test(phone.replace(/[\s().-]/g, ''))) return NextResponse.json({ error: 'Please provide a valid phone number with country code.' }, { status: 400 });
  if (data.websiteUrl) {
    try {
      const websiteUrl = new URL(String(data.websiteUrl));
      if (!['http:', 'https:'].includes(websiteUrl.protocol)) throw new Error('Invalid protocol');
    } catch {
      return NextResponse.json({ error: 'Please provide a valid website URL.' }, { status: 400 });
    }
  }

  const score = projectScore(data);
  const level = complexityLevel(score);
  const receivingEmail = process.env.RECEIVING_EMAIL || process.env.NEXT_PUBLIC_RECEIVING_EMAIL || 'engwseem2@gmail.com';
  const brief = escapeHtml(JSON.stringify({ ...data, complexityScore: score, complexityLevel: level }, null, 2));
  const { data: sent, error } = await resend.emails.send({
    from: 'Portfolio Inquiries <onboarding@resend.dev>',
    to: [receivingEmail],
    subject: `New Service Inquiry — ${service} — ${name}`,
    replyTo: email || undefined,
    html: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:auto"><h1>New Service Inquiry</h1><p><strong>Requested service:</strong> ${escapeHtml(service)}</p><p><strong>Complexity:</strong> ${level} (${score})</p><pre style="white-space:pre-wrap;background:#f5f5f5;padding:16px;border-radius:8px">${brief}</pre></div>`,
  });
  if (error) {
    console.error('Project inquiry email error:', error);
    return NextResponse.json({ error: 'Failed to send project brief.' }, { status: 500 });
  }

  if (email) {
    const confirmation = await resend.emails.send({
      from: 'Wseem Kharma <onboarding@resend.dev>',
      to: [email],
      subject: 'Project brief received — Wseem Kharma',
      html: '<p>Thanks for sharing your project brief. I will review the requirements and get back to you with tailored next steps.</p>',
    });
    if (confirmation.error) console.error('Client confirmation email error:', confirmation.error);
  }

  return NextResponse.json({ message: 'Project brief received.', id: sent?.id }, { status: 200 });
}

async function sendServiceMessage(data: ServiceMessageData) {
  const name = String(data.name ?? '').trim();
  const email = String(data.email ?? '').trim();
  const message = String(data.message ?? '').trim();
  const service = String(data.service ?? 'general').trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  if (!emailRegex.test(email)) return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });

  const receivingEmail = process.env.RECEIVING_EMAIL || process.env.NEXT_PUBLIC_RECEIVING_EMAIL || 'engwseem2@gmail.com';
  const { data: sent, error } = await resend.emails.send({
    from: 'Portfolio Services <onboarding@resend.dev>',
    to: [receivingEmail],
    replyTo: email,
    subject: `New Service Request — ${service} — ${name}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:auto"><h1>New Service Request</h1><p><strong>Service:</strong> ${escapeHtml(service)}</p><p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p><strong>Message:</strong></p><div style="white-space:pre-wrap;background:#f5f5f5;padding:16px;border-radius:8px">${escapeHtml(message)}</div></div>`,
  });
  if (error) {
    console.error('Service request email error:', error);
    return NextResponse.json({ error: 'Failed to send service request.' }, { status: 500 });
  }
  return NextResponse.json({ message: 'Service request received.', id: sent?.id }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (body?.type === 'project-inquiry') {
      return sendProjectInquiry(body.data ?? {});
    }
    if (body?.type === 'service-message') {
      return sendServiceMessage(body.data ?? {});
    }
    const { name, email, subject, message }: ContactFormData = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email using Resend with sandbox domain (no verification needed)
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend's sandbox domain
      to: [process.env.NEXT_PUBLIC_RECEIVING_EMAIL || 'engwseem2@gmail.com'],
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #96001e; margin-bottom: 20px; border-bottom: 2px solid #96001e; padding-bottom: 10px;">
              New Contact Form Submission
            </h1>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #333; margin-bottom: 5px;">From:</h3>
              <p style="margin: 0; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">
                <strong>${name}</strong> &lt;${email}&gt;
              </p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #333; margin-bottom: 5px;">Subject:</h3>
              <p style="margin: 0; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">
                ${subject}
              </p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #333; margin-bottom: 5px;">Message:</h3>
              <div style="padding: 15px; background-color: #f5f5f5; border-radius: 5px; line-height: 1.6;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
              This email was sent from your portfolio contact form.<br>
              <strong>Sender's email:</strong> ${email}<br>
              <strong>Sent from:</strong> Portfolio Website
            </div>
          </div>
        </div>
      `,
      replyTo: email, // This allows you to reply directly to the sender
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Email sent successfully!',
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
