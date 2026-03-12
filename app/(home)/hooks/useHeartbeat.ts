'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

const HEARTBEAT_INTERVAL = 3 * 60 * 1000; // 3 minutes

export function useHeartbeat() {
  useEffect(() => {
    const supabase = createClient();

    const beat = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      await fetch('/api/members/heartbeat', { method: 'POST' });
    };

    beat();
    const interval = setInterval(beat, HEARTBEAT_INTERVAL);
    return () => clearInterval(interval);
  }, []);
}
