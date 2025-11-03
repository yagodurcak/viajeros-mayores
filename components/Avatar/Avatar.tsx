'use client';

import React from 'react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface AvatarProps {
  name: string;
  size?: AvatarSize;
  gradient?: boolean;
  className?: string;
}

const sizeClasses: Record<AvatarSize, { container: string; text: string }> = {
  xs: { container: 'w-6 h-6', text: 'text-xs' },
  sm: { container: 'w-8 h-8', text: 'text-xs' },
  md: { container: 'w-10 h-10', text: 'text-sm' },
  lg: { container: 'w-16 h-16', text: 'text-2xl' },
  xl: { container: 'w-20 h-20', text: 'text-3xl' },
  '2xl': { container: 'w-24 h-24', text: 'text-4xl' },
};

/**
 * Get initials from a full name
 * @param name - Full name of the user
 * @returns Initials (max 2 characters)
 */
function getInitials(name: string): string {
  if (!name) return 'U';

  const names = name.trim().split(' ');

  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }

  return name.substring(0, 2).toUpperCase();
}

const Avatar: React.FC<AvatarProps> = ({
  name,
  size = 'md',
  gradient = false,
  className = '',
}) => {
  const { container, text } = sizeClasses[size];
  const bgClass = gradient
    ? 'bg-gradient-to-br from-[#FF6F61] to-[#FF8A7A]'
    : 'bg-[#FF6F61]';

  return (
    <div
      className={`${container} rounded-full ${bgClass} flex items-center justify-center text-white font-semibold ${text} flex-shrink-0 ${className}`}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
