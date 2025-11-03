'use client';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${location.origin}/reset-password`,
        }
      );

      if (resetError) {
        setError(resetError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError('Error al enviar el correo de recuperación. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Correo enviado!</h2>
          <p className="text-gray-600 mb-6">
            Hemos enviado un enlace de recuperación a <strong>{email}</strong>. Por favor,
            revisa tu correo electrónico (incluyendo la carpeta de spam) y sigue las instrucciones
            para restablecer tu contraseña.
          </p>
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 bg-[#FF6F61] text-white rounded-lg font-medium hover:bg-[#FF5A4A] transition-colors"
          >
            Volver a iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-[#FF6F61] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-[#FF6F61]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#FF6F61] mb-2">
            ¿Olvidaste tu contraseña?
          </h1>
          <p className="text-gray-600">
            No te preocupes, te enviaremos instrucciones para restablecerla
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Dirección de correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent outline-none transition-all"
              placeholder="tu@email.com"
            />
            <p className="mt-2 text-sm text-gray-500">
              Ingresa la dirección de correo electrónico asociada con tu cuenta
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FF6F61] text-white rounded-lg font-medium hover:bg-[#FF5A4A] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/login')}
            className="text-gray-600 text-sm hover:text-[#FF6F61] transition-colors"
          >
            ← Volver a iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
