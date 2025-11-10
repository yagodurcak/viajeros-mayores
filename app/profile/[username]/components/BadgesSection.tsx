import { Badge } from '../hooks/usePublicProfile';
import { formatJoinDate } from '@/lib/utils';

interface BadgesSectionProps {
  badges: Badge[];
}

export default function BadgesSection({ badges }: BadgesSectionProps) {
  if (badges.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Badges</h2>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <p className="text-gray-600 text-sm">No badges earned yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Badges ({badges.length})
      </h2>
      <div className="space-y-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-[#E36E4A]/5 to-transparent border border-[#E36E4A]/20 hover:border-[#E36E4A]/40 transition-colors"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#E36E4A] to-[#F4916F] rounded-full flex items-center justify-center text-2xl shadow-sm">
              {badge.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900">{badge.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {badge.description}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Earned {formatJoinDate(badge.earned_at)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
