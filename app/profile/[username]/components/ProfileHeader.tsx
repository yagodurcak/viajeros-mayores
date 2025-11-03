import { PublicProfile } from '../hooks/usePublicProfile';
import { formatJoinDate } from '@/lib/utils';
import Avatar from '@/components/Avatar/Avatar';

interface ProfileHeaderProps {
  profile: PublicProfile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Avatar
            name={profile.full_name}
            size="xl"
            gradient
            className="shadow-md"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900">
            {profile.full_name}
          </h1>
          <p className="text-lg text-gray-600 mt-1">@{profile.username}</p>

          {profile.bio && (
            <p className="mt-4 text-gray-700 max-w-2xl">{profile.bio}</p>
          )}

          <div className="mt-4 flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Joined {formatJoinDate(profile.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
