/**
 * PayPal REST API helpers (Orders v2).
 * Env: PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_API_BASE_URL (optional, default sandbox)
 */

const getBaseUrl = () =>
  process.env.PAYPAL_API_BASE_URL || 'https://api-m.sandbox.paypal.com';

export const getAccessToken = async (): Promise<string> => {
  const clientId = process.env.PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_CLIENT_SECRET!;
  const auth = Buffer.from(`${clientId}:${secret}`).toString('base64');

  const res = await fetch(`${getBaseUrl()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PayPal auth failed: ${err}`);
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
};

type CreateOrderParams = {
  amountValue: string;
  currencyCode?: string;
  returnUrl: string;
  cancelUrl: string;
  customId?: string;
  description?: string;
};

export const createOrder = async (
  params: CreateOrderParams
): Promise<{ orderId: string; approveUrl: string }> => {
  const token = await getAccessToken();
  const {
    amountValue,
    currencyCode = 'USD',
    returnUrl,
    cancelUrl,
    customId,
    description,
  } = params;

  const body = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: currencyCode,
          value: amountValue,
        },
        description: description ?? 'Acceso Premium Viajeros Mayores',
        ...(customId && { custom_id: customId }),
      },
    ],
    application_context: {
      return_url: returnUrl,
      cancel_url: cancelUrl,
      brand_name: 'Viajeros Mayores',
      // BILLING = muestra primero la página de pago con tarjeta (Guest Checkout).
      // Para que aparezca "Pagar con tarjeta sin cuenta", en la cuenta PayPal del comercio
      // hay que activar: Pagos web > Preferencias > "Cuenta PayPal opcional" = Activado.
      landing_page: 'BILLING',
    },
  };

  const res = await fetch(`${getBaseUrl()}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PayPal create order failed: ${err}`);
  }

  const data = (await res.json()) as {
    id: string;
    links?: Array< { rel: string; href: string }>;
  };

  const approveLink = data.links?.find((l) => l.rel === 'approve')?.href;
  if (!data.id || !approveLink) {
    throw new Error('PayPal order created but no approve link');
  }

  return { orderId: data.id, approveUrl: approveLink };
};

export const captureOrder = async (orderId: string): Promise<boolean> => {
  const token = await getAccessToken();

  const res = await fetch(
    `${getBaseUrl()}/v2/checkout/orders/${orderId}/capture`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: '{}',
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error('[paypal] capture failed', orderId, err);
    return false;
  }

  const data = (await res.json()) as { status?: string };
  return data.status === 'COMPLETED';
};

const CUSTOM_ID_MAX = 127;

export const encodePremiumCustomId = (email: string, intendedPath: string): string => {
  const payload = JSON.stringify({
    e: email.slice(0, 80),
    p: (intendedPath || '/search').slice(0, 40),
  });
  return payload.length > CUSTOM_ID_MAX ? payload.slice(0, CUSTOM_ID_MAX) : payload;
};

export const decodePremiumCustomId = (customId: string | undefined): { email: string; intendedPath: string } | null => {
  if (!customId || typeof customId !== 'string') return null;
  try {
    const parsed = JSON.parse(customId) as { e?: string; p?: string };
    if (typeof parsed.e !== 'string') return null;
    return {
      email: parsed.e,
      intendedPath: typeof parsed.p === 'string' ? parsed.p : '/search',
    };
  } catch {
    return null;
  }
};

export const getOrderDetails = async (orderId: string): Promise<{ custom_id?: string } | null> => {
  const token = await getAccessToken();
  const res = await fetch(`${getBaseUrl()}/v2/checkout/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { purchase_units?: Array<{ custom_id?: string }> };
  const unit = data.purchase_units?.[0];
  return unit ? { custom_id: unit.custom_id } : null;
};
