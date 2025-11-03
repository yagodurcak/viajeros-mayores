'use client';

import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import ProfileForm from './components/ProfileForm';
import { useProfileForm } from './hooks/useProfileForm';

export default function EditProfile() {
  const {
    loading,
    saving,
    message,
    formData,
    handleChange,
    handleSubmit,
    handleCancel,
  } = useProfileForm();

  if (loading) {
    return <LoadingSpinner message="Loading profile..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="mt-2 text-gray-600">
            Update your personal information and profile settings
          </p>
        </div>

        <ProfileForm
          formData={formData}
          saving={saving}
          message={message}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
