import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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
