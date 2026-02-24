import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type ResendEmailReceivedEvent = {
  type: 'email.received';
  created_at: string;
  data: {
    email_id: string;
    created_at: string;
    from: string;
    to: string[];
    bcc: string[];
    cc: string[];
    message_id: string | null;
    subject: string;
    attachments?: Array<{
      id: string;
      filename: string;
      content_type: string;
      content_disposition: string;
      content_id: string;
    }>;
  };
};

type ResendWebhookEvent = ResendEmailReceivedEvent | { type: string; [key: string]: unknown };

export const POST = async (request: NextRequest) => {
  try {
    const rawBody = await request.text();

    let event: ResendWebhookEvent;

    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
    if (webhookSecret) {
      const svixId = request.headers.get('svix-id');
      const svixTimestamp = request.headers.get('svix-timestamp');
      const svixSignature = request.headers.get('svix-signature');

      if (!svixId || !svixTimestamp || !svixSignature) {
        return NextResponse.json(
          { error: 'Missing webhook signature headers' },
          { status: 400 }
        );
      }

      try {
        event = resend.webhooks.verify({
          payload: rawBody,
          headers: {
            id: svixId,
            timestamp: svixTimestamp,
            signature: svixSignature,
          },
          webhookSecret,
        }) as ResendWebhookEvent;
      } catch {
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
      }
    } else {
      try {
        event = JSON.parse(rawBody) as ResendWebhookEvent;
      } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
      }
    }

    if (event.type === 'email.received') {
      const emailEvent = event as ResendEmailReceivedEvent;
      // Aquí podés procesar el cuerpo del email, attachments, etc.
      // Por ejemplo: guardar en DB, reenviar, notificar, etc.
      return NextResponse.json(emailEvent);
    }

    return NextResponse.json({});
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Error processing webhook';
    console.error('[api/events] error', e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
