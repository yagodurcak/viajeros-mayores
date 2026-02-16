'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { PremiumModal } from '@/components/PremiumModal/PremiumModal';

type PremiumModalContextType = {
  openPremiumModal: (intendedPath?: string) => void;
  closePremiumModal: () => void;
};

const PremiumModalContext = createContext<PremiumModalContextType | null>(null);

const noop = () => {};

const defaultContext: PremiumModalContextType = {
  openPremiumModal: noop,
  closePremiumModal: noop,
};

export const usePremiumModal = (): PremiumModalContextType => {
  const context = useContext(PremiumModalContext);
  return context ?? defaultContext;
};

interface PremiumModalProviderProps {
  children: React.ReactNode;
}

export const PremiumModalProvider = ({ children }: PremiumModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [intendedPath, setIntendedPath] = useState<string>('/search');

  const openPremiumModal = useCallback((path: string = '/search') => {
    setIntendedPath(path);
    setIsOpen(true);
  }, []);

  const closePremiumModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ openPremiumModal, closePremiumModal }),
    [openPremiumModal, closePremiumModal]
  );

  return (
    <PremiumModalContext.Provider value={value}>
      {children}
      <PremiumModal
        isOpen={isOpen}
        onClose={closePremiumModal}
        intendedPath={intendedPath}
      />
    </PremiumModalContext.Provider>
  );
};
