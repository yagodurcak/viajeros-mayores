'use client';

import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import AlertMessage from './AlertMessage';

interface ProfileFormProps {
  formData: {
    username: string;
    fullName: string;
    bio: string;
  };
  saving: boolean;
  message: { type: 'success' | 'error'; text: string } | null;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onCancel: () => void;
}

export default function ProfileForm({
  formData,
  saving,
  message,
  onSubmit,
  onChange,
  onCancel,
}: ProfileFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
      <form onSubmit={onSubmit} className="space-y-6">
        <FormInput
          id="username"
          label="Nombre de usuario"
          name="username"
          value={formData.username}
          onChange={onChange}
          placeholder="Ingresa tu nombre de usuario"
          disabled={saving}
        />

        <FormInput
          id="fullName"
          label="Nombre completo público"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          placeholder="Ingresa tu nombre completo"
          disabled={saving}
        />

        <FormTextarea
          id="bio"
          label="Biografía"
          name="bio"
          value={formData.bio}
          onChange={onChange}
          placeholder="Cuéntanos sobre ti..."
          rows={4}
          helperText="Breve descripción para tu perfil. Máximo 200 caracteres."
          disabled={saving}
        />

        {message && <AlertMessage type={message.type} message={message.text} />}

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
              saving
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#FF6F61] hover:bg-[#E85A4F] hover:shadow-lg transform hover:scale-[1.02]'
            }`}
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Guardando...
              </span>
            ) : (
              'Guardar Cambios'
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
