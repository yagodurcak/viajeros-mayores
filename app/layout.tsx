import type { Metadata } from 'next';
import { Alata, Nunito_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { defaultMetadata } from '@/lib/seo-config';
import { GoogleAnalytics } from '@/components/Analytics/GoogleAnalytics';
import { LeadCaptureModal } from '@/components/LeadCaptureModal/LeadCaptureModal';

const alata = Alata({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-alata',
});

const nunitoSans = Nunito_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-nunito-sans',
});

export const metadata: Metadata = defaultMetadata;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component cannot set cookies
          }
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://viajerosmasayores.com';

  // Structured Data (JSON-LD) para SEO - URLs limpias sin comillas
  const cleanBaseUrl = baseUrl.replace(/['"]/g, '');
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Viajeros Mayores',
    url: cleanBaseUrl,
    logo: `${cleanBaseUrl}/images/logo.png`,
    description:
      'Guía completa para viajar después de los 60 años. Consejos prácticos, destinos culturales y turismo de naturaleza para adultos mayores activos.',
    sameAs: [],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Viajeros Mayores',
    url: cleanBaseUrl,
    description:
      'Viajes culturales y consejos para mayores de 60 años. Turismo senior activo, destinos históricos y naturaleza para viajeros mayores.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${cleanBaseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="es">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          data-noptimize="1"
          data-cfasync="false"
          data-wpfc-render="false"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                  var script = document.createElement("script");
                  script.async = 1;
                  script.src = 'https://tpembars.com/NDY5NDU5.js?t=469459';
                  document.head.appendChild(script);
              })();
            `,
          }}
        />
      </head>
      <body className={`${alata.variable} ${nunitoSans.variable}`}>
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <Header session={session} />
        {children}
        <LeadCaptureModal />
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
