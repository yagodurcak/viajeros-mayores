// Blog utilities

// Predefined colors for categories
const categoryColors: Record<string, string> = {
  destinos: 'bg-blue-500',
  consejos: 'bg-green-500',
  experiencias: 'bg-purple-500',
  tecnologia: 'bg-indigo-500',
  movilidad: 'bg-orange-500',
  guias: 'bg-pink-500',
};

// Predefined labels for categories
const categoryLabels: Record<string, string> = {
  destinos: 'Destinations',
  consejos: 'Tips',
  experiencias: 'Experiences',
  tecnologia: 'Technology',
  movilidad: 'Mobility',
  guias: 'Guides',
};

/**
 * Get Tailwind color class for a category
 * @param category - Category name
 * @returns Tailwind background color class
 */
export const getCategoryColor = (category: string): string => {
  return categoryColors[category.toLowerCase()] || 'bg-gray-500';
};

/**
 * Get formatted label for a category
 * @param category - Category name
 * @returns Capitalized or predefined label
 */
export const getCategoryLabel = (category: string): string => {
  const label = categoryLabels[category.toLowerCase()];
  return label || category.charAt(0).toUpperCase() + category.slice(1);
};

/**
 * Search for text with normalization (case-insensitive, accent-insensitive)
 * @param text - Text to search in
 * @param query - Query to search for
 * @returns True if query is found in text
 */
export const searchInText = (text: string, query: string): boolean => {
  if (!query) return true;
  const normalizedText = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remove accents
  const normalizedQuery = query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  return normalizedText.includes(normalizedQuery);
};

/**
 * Format date string for blog articles
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "Oct 15, 2024")
 */
export const formatBlogDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
