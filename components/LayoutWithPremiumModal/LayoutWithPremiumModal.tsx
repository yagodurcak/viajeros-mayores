'use client';

import type { Session } from '@supabase/supabase-js';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { LeadCaptureModal } from '@/components/LeadCaptureModal/LeadCaptureModal';
import { PremiumModalProvider } from '@/context/PremiumModalContext';

interface LayoutWithPremiumModalProps {
  children: React.ReactNode;
  session: Session | null;
}

export const LayoutWithPremiumModal = ({
  children,
  session,
}: LayoutWithPremiumModalProps) => {
  return (
    <PremiumModalProvider>
      <Header session={session} />
      {children}
      <LeadCaptureModal />
      <Footer />
    </PremiumModalProvider>
  );
};
