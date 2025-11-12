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

  return (
    <html lang="en">
      <head>
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
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
