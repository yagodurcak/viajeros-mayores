'use client';

import type { Session } from '@supabase/supabase-js';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { LeadCaptureModal } from '@/components/LeadCaptureModal/LeadCaptureModal';

interface LayoutWithPremiumModalProps {
  children: React.ReactNode;
  session: Session | null;
}

export const LayoutWithPremiumModal = ({
  children,
  session,
}: LayoutWithPremiumModalProps) => {
  return (
    <>
      <Header session={session} />
      {children}
      <LeadCaptureModal />
      <Footer />
    </>
  );
};
