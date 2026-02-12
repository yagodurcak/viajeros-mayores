/**
 * Guías descargables en bucket Supabase "guides".
 *
 * Flujo normal (sin tocar código):
 * 1. Subí el PDF en Supabase → Storage → bucket "guides".
 * 2. En el artículo poné: guía-descargable:nombre-del-archivo.pdf
 * Listo: se usará ese PDF con asunto genérico.
 *
 * Solo añadí una entrada aquí si querés asunto o texto del link personalizado para esa guía.
 *
 * En el content del post podés usar:
 * - guía-descargable              → guía por defecto
 * - guía-descargable:mi-guia.pdf   → cualquier PDF que esté en el bucket (dinámico)
 * - guía-descargable (mi-guia.pdf) → mismo
 */
export const GUIDE_CONFIG = {
  default: {
    filePath: 'descuentos-adultos-mayores-al-volar.pdf',
    subject: 'Tu guía gratuita (Viajeros Mayores) 📘',
    linkLabel: 'Descargar guía',
  },
  /** Ejemplo: asunto personalizado para esta guía (opcional) */
  'asientos-viajeros-mayores.pdf': {
    filePath: 'asientos-viajeros-mayores.pdf',
    subject: 'Tu guía de asientos (Viajeros Mayores) ✈️',
    linkLabel: 'Descargar guía',
  },
} as const;

const DEFAULT_GUIDE = {
  subject: 'Tu guía gratuita (Viajeros Mayores) 📘',
  linkLabel: 'Descargar guía',
} as const;

/** Nombre de archivo seguro: solo letras, números, guiones, guión bajo y .pdf */
function safeFileName(key: string): string | null {
  const cleaned = key.trim().toLowerCase();
  if (!cleaned || cleaned.length > 200) return null;
  if (!/^[a-z0-9_.-]+\.pdf$/i.test(cleaned)) return null;
  if (cleaned.includes('..')) return null;
  return cleaned;
}

export function getGuideConfig(guideKey?: string | null): {
  filePath: string;
  subject: string;
  linkLabel: string;
} {
  if (guideKey && guideKey in GUIDE_CONFIG) {
    return GUIDE_CONFIG[guideKey as keyof typeof GUIDE_CONFIG];
  }
  const filePath = guideKey ? safeFileName(guideKey) : null;
  if (filePath) {
    return { filePath, ...DEFAULT_GUIDE };
  }
  return GUIDE_CONFIG.default;
}
