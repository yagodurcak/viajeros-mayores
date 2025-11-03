'use client';

import { useParams } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import ProfileHeader from './components/ProfileHeader';
import ProfileStats from './components/ProfileStats';
import ReviewsSection from './components/ReviewsSection';
import BadgesSection from './components/BadgesSection';
import { usePublicProfile } from './hooks/usePublicProfile';

export default function PublicProfile() {
  const params = useParams();
  const username = params.username as string;

  const { loading, profile, reviews, badges, error } =
    usePublicProfile(username);

  if (loading) {
    return <LoadingSpinner message="Loading profile..." />;
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Profile Not Found
          </h1>
          <p className="text-gray-600">
            The user @{username} doesn&apos;t exist or has been deleted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <ProfileHeader profile={profile} />

        <div className="mt-8">
          <ProfileStats
            reviewCount={reviews.length}
            badgeCount={badges.length}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ReviewsSection reviews={reviews} />
          </div>

          <div className="lg:col-span-1">
            <BadgesSection badges={badges} />
          </div>
        </div>
      </div>
    </div>
  );
}
