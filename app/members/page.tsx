import type { Metadata } from 'next';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import MembersClient from './MembersClient';

export const metadata: Metadata = {
  title: 'Miembros | Viajeros Mayores',
  description: 'Conocé a los viajeros de la comunidad Viajeros Mayores.',
};

export default async function MembersPage() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (list) => {
          try {
            list.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch { /* read-only */ }
        },
      },
    }
  );

  // Get initial online count (seen in last 10 minutes)
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { count: onlineCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .gte('last_seen_at', tenMinutesAgo);

  return <MembersClient initialOnlineCount={onlineCount ?? 0} />;
}
