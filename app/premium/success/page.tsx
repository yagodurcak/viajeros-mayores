'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Mail, CheckCircle, Shield, AlertCircle } from 'lucide-react';

export default function PremiumSuccessPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 text-amber-600 mb-6">
            <AlertCircle className="w-12 h-12" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Algo no salió como esperábamos
          </h1>
          <p className="text-gray-600 mb-6">
            El pago pudo haberse procesado. Si descontaron el monto, revisá tu
            email para el link de acceso. Si tenés dudas, contactanos.
          </p>
          <Link
            href="/"
            className="inline-block w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl transition-all"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
          <CheckCircle className="w-12 h-12" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          ¡Pago recibido!
        </h1>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200 shadow-sm mb-8 text-left">
          <Mail className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900 mb-1">
              Revisá tu email
            </p>
            <p className="text-gray-600 text-sm">
              Te enviamos un link para entrar y crear tu contraseña cuando
              quieras. Con eso ya podés acceder a todo el contenido premium.
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-500 flex items-center justify-center gap-2 mb-8">
          <Shield className="w-4 h-4" />
          Si no ves el correo, revisá la carpeta de spam.
        </p>

        <Link
          href="/"
          className="inline-block w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl transition-all"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
