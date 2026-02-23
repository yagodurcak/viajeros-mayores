/**
 * Format a date to a readable string
 * @param date - Date string or Date object
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }
): string {
  return new Date(date).toLocaleDateString('en-US', options);
}

/**
 * Format a date for join date display
 * @param date - Date string or Date object
 * @returns Formatted date string (e.g., "January 2024")
 */
export function formatJoinDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Truncate text to a maximum length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Cloudinary URL pattern: base + path after "image/upload/"
 * We insert quality/format params after "image/upload/" to reduce bandwidth and credits.
 */
const CLOUDINARY_UPLOAD_REGEX =
  /(https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.*)/;

/**
 * Optimize image URL for Cloudinary: lower quality and auto format to reduce credit usage.
 * Only modifies Cloudinary URLs; other URLs are returned unchanged.
 * @param url - Original image URL (e.g. from cover_image_url)
 * @returns URL with q_auto:low,f_auto when Cloudinary, otherwise unchanged
 */
export const getOptimizedImageUrl = (url: string): string => {
  if (!url || typeof url !== 'string') return url;
  const match = url.match(CLOUDINARY_UPLOAD_REGEX);
  if (!match) return url;
  const [, prefix, rest] = match;
  return `${prefix}q_auto:low,f_auto/${rest}`;
};
