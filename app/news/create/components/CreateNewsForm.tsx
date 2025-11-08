'use client';

import React, { useState } from 'react';
import { useCreateNews } from '../hooks/useCreateNews';
import MarkdownPreview from '@/app/blog/create/components/MarkdownPreview';

const CATEGORIES = [
  {
    value: 'Transporte y Movilidad Accesible',
    label: 'Transporte y Movilidad Accesible',
  },
  { value: 'Destinos Accesibles', label: 'Destinos Accesibles' },
  {
    value: 'Innovación y Tecnología Accesible',
    label: 'Innovación y Tecnología Accesible',
  },
  {
    value: 'Turismo Senior y Bienestar Viajero',
    label: 'Turismo Senior y Bienestar Viajero',
  },
  { value: 'Tendencias Globales', label: 'Tendencias Globales' },
];

const CreateNewsForm: React.FC = () => {
  const { createNews, loading, error } = useCreateNews();
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'Transporte y Movilidad Accesible',
    cover_image_url: '',
    is_featured: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Generate slug from title
      const slug = formData.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
        .replace(/(^-|-$)/g, ''); // Remove leading/trailing hyphens

      await createNews({ ...formData, slug });
    } catch (err) {
      console.error('Error creating news:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 font-alata">
          Crear Nueva Noticia
        </h1>
        <p className="text-gray-600">
          Escribe tu noticia usando Markdown para dar formato al contenido
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Título <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent"
                placeholder="Título de la noticia"
              />
            </div>

            {/* Summary */}
            <div>
              <label
                htmlFor="summary"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Resumen <span className="text-red-500">*</span>
              </label>
              <textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent resize-none"
                placeholder="Breve resumen de la noticia"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Categoría <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Cover Image URL */}
            <div>
              <label
                htmlFor="cover_image_url"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                URL de Imagen de Portada <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="cover_image_url"
                name="cover_image_url"
                value={formData.cover_image_url}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_featured"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="w-5 h-5 text-[#FF6F61] border-gray-300 rounded focus:ring-[#FF6F61]"
              />
              <label
                htmlFor="is_featured"
                className="ml-3 text-sm font-semibold text-gray-700"
              >
                Marcar como destacada
              </label>
            </div>

            {/* Content - Markdown Editor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="content"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Contenido (Markdown) <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-sm text-[#FF6F61] hover:underline"
                >
                  {showPreview ? 'Ocultar' : 'Mostrar'} Vista Previa
                </button>
              </div>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent resize-none font-mono text-sm"
                placeholder="# Título de la noticia&#10;&#10;Escribe tu contenido aquí usando **Markdown**..."
              />
              <p className="text-xs text-gray-500 mt-2">
                Usa Markdown para dar formato:{' '}
                <code className="bg-gray-100 px-1 py-0.5 rounded">
                  # Título
                </code>
                ,{' '}
                <code className="bg-gray-100 px-1 py-0.5 rounded">
                  **negrita**
                </code>
                ,{' '}
                <code className="bg-gray-100 px-1 py-0.5 rounded">
                  *cursiva*
                </code>
                ,{' '}
                <code className="bg-gray-100 px-1 py-0.5 rounded">
                  [link](url)
                </code>
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#FF6F61] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#FF5A4A] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Creando...' : 'Crear Noticia'}
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>

          {/* Right Column - Preview */}
          {showPreview && (
            <div className="lg:sticky lg:top-8 h-fit">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 font-alata">
                  Vista Previa
                </h3>
                <div className="bg-white rounded-lg p-6 max-h-[800px] overflow-y-auto">
                  {formData.content ? (
                    <MarkdownPreview content={formData.content} />
                  ) : (
                    <p className="text-gray-400 italic">
                      Escribe contenido para ver la vista previa...
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateNewsForm;
