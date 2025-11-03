'use client';

import React from 'react';
import Link from 'next/link';
import { getCategoryLabel } from '@/lib/blog-utils';

interface NewsBreadcrumbProps {
  category: string;
  title: string;
}

const NewsBreadcrumb: React.FC<NewsBreadcrumbProps> = ({ category, title }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 ">
      <Link href="/" className="hover:text-[#FF6F61] transition-colors">
        Home
      </Link>
      <span>/</span>
      <Link href="/news" className="hover:text-[#FF6F61] transition-colors">
        News
      </Link>
      <span>/</span>
      <span className="text-[#FF6F61]">{getCategoryLabel(category)}</span>
      <span>/</span>
      <span className="text-[#FF6F61] truncate max-w-md">{title}</span>
    </nav>
  );
};

export default NewsBreadcrumb;
