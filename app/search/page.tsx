'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Leer parámetro q de la URL y realizar búsqueda automática
  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setSearchQuery(queryParam);
      // Realizar búsqueda automática después de un pequeño delay
      const timer = setTimeout(() => {
        performSearch(queryParam);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const performSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: query.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al buscar información');
      }

      const data = await response.json();
      setResult(data.text);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al buscar información'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    await performSearch(searchQuery);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#E36E4A] via-[#D45A36] to-[#C04A26] py-8 md:py-12">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 h-20 w-20 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 h-16 w-16 rounded-full bg-white/5 blur-xl"></div>

        {/* Content */}
        <div className="relative mx-auto max-w-5xl px-4">
          <div className="text-center">
            {/* Title */}
            <div className="mb-4">
              <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                Explora el Mundo
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-white/95 md:text-xl">
                Información detallada sobre cualquier destino del mundo con la
                ayuda de nuestro agente entrenado de inteligencia artificial
              </p>
            </div>

            {/* Search Input in Hero */}
            <form onSubmit={handleSearch} className="mx-auto mt-6 max-w-3xl">
              <div
                className={`relative rounded-2xl border-2 bg-white shadow-2xl transition-all duration-300 ${
                  isFocused
                    ? 'border-white scale-105 shadow-2xl'
                    : 'border-white/30 shadow-xl'
                }`}
              >
                <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:gap-4 md:p-6">
                  {/* Search Icon */}
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#E36E4A] to-[#D45A36] md:h-14 md:w-14">
                      <svg
                        className="h-6 w-6 text-white md:h-7 md:w-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Input */}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Ej: París, Francia, Machu Picchu, Tokio..."
                    className="flex-1 bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none md:text-lg"
                    disabled={isLoading}
                  />

                  {/* Search Button */}
                  <button
                    type="submit"
                    disabled={!searchQuery.trim() || isLoading}
                    className="flex-shrink-0 rounded-xl bg-gradient-to-r from-[#E36E4A] to-[#D45A36] px-8 py-4 font-bold text-white shadow-lg transition-all hover:from-[#D45A36] hover:to-[#C04A26] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-[#E36E4A] disabled:hover:to-[#D45A36] md:px-10"
                  >
                    {isLoading ? 'Buscando...' : 'Buscar'}
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Suggestions */}
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <span className="text-sm font-medium text-white/90">
                Búsquedas populares:
              </span>
              {['París', 'Tokio', 'Roma', 'Barcelona'].map((example) => (
                <button
                  key={example}
                  onClick={() => {
                    setSearchQuery(example);
                    performSearch(example);
                  }}
                  className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        {/* Loading State */}
        {isLoading && (
          <div className="mt-12 rounded-xl bg-white p-8 shadow-md">
            <div className="text-center">
              <div className="mb-4 inline-block animate-spin rounded-full border-4 border-[#E36E4A] border-t-transparent h-12 w-12"></div>
              <h3 className="mb-2 text-xl font-semibold text-gray-800">
                Buscando información sobre...
              </h3>
              <p className="text-lg font-medium text-[#E36E4A]">
                {searchQuery}
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Nuestro agente de IA está analizando el destino...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-12 rounded-xl bg-red-50 border-2 border-red-200 p-8 shadow-md">
            <div className="text-center">
              <div className="mb-4 text-4xl">❌</div>
              <h3 className="mb-2 text-xl font-semibold text-red-800">
                Error al buscar información
              </h3>
              <p className="text-sm text-red-600">
                {error || 'Por favor, intenta de nuevo más tarde.'}
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !isLoading && (
          <div className="mt-12 rounded-xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#E36E4A] to-[#D45A36]">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Información sobre {searchQuery}
                </h3>
                <p className="text-sm text-gray-500">
                  Respuesta generada por IA
                </p>
              </div>
            </div>
            <div className="markdown-content">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 first:mt-0">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-800">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="mb-2 mt-4 text-lg font-semibold text-gray-700">
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 leading-7 text-gray-700">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-4 ml-6 list-decimal space-y-2 text-gray-700">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="leading-7">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-900">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-gray-700">{children}</em>
                  ),
                  code: ({ children }) => (
                    <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-[#E36E4A]">
                      {children}
                    </code>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-4 border-l-4 border-[#E36E4A] bg-orange-50 pl-4 italic text-gray-700">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {result}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 rounded-xl bg-gradient-to-r from-[#E36E4A] to-[#D45A36] p-8 text-white shadow-lg">
          <h2 className="mb-6 text-2xl font-bold">
            ¿Qué información recibirás sobre tu destino?
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-lg font-semibold">
              <span>📋</span>
              <span>Resumen Rápido</span>
            </div>
            <div className="flex items-center gap-3 text-lg font-semibold">
              <span>🚇</span>
              <span>Transporte y Movilidad</span>
            </div>
            <div className="flex items-center gap-3 text-lg font-semibold">
              <span>🎯</span>
              <span>Atracciones: Accesibles ✔️ / Exigentes ⚠️</span>
            </div>
            <div className="flex items-center gap-3 text-lg font-semibold">
              <span>💡</span>
              <span>Consejos Personalizados</span>
            </div>
            <div className="flex items-center gap-3 text-lg font-semibold">
              <span>⚠️</span>
              <span>Advertencias Importantes</span>
            </div>
            <div className="flex items-center gap-3 text-lg font-semibold">
              <span>🏨</span>
              <span>Recomendaciones de Alojamiento</span>
            </div>
            <div className="flex items-center gap-3 text-lg font-semibold">
              <span>✨</span>
              <span>Versión Simplificada</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
