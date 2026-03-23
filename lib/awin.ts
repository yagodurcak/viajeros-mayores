/**
 * Awin Affiliate Link Generator
 *
 * Wraps any destination URL into an Awin tracking deep link.
 * Format: https://www.awin1.com/cread.php?awinmid=MERCHANT_ID&awinaffid=PUBLISHER_ID&ued=ENCODED_URL
 */

const PUBLISHER_ID =
  process.env.NEXT_PUBLIC_AWIN_PUBLISHER_ID || '';

// Booking.com merchant IDs by region on Awin
export const AWIN_MERCHANTS = {
  bookingLatam: process.env.NEXT_PUBLIC_AWIN_BOOKING_MERCHANT_ID || '18119',
  bookingNorthAmerica: '6776',
  bookingBrazil: '18120',
  bookingApac: '18117',
};

/**
 * Generates an Awin deep link for any destination URL.
 * @param destinationUrl - The target URL (e.g. a Booking.com hotel page)
 * @param merchantId - Awin merchant ID (defaults to Booking.com LATAM)
 */
export function awinLink(
  destinationUrl: string,
  merchantId: string = AWIN_MERCHANTS.bookingLatam
): string {
  if (!PUBLISHER_ID) {
    console.warn('NEXT_PUBLIC_AWIN_PUBLISHER_ID is not set — returning raw URL');
    return destinationUrl;
  }
  const encoded = encodeURIComponent(destinationUrl);
  return `https://www.awin1.com/cread.php?awinmid=${merchantId}&awinaffid=${PUBLISHER_ID}&ued=${encoded}`;
}
