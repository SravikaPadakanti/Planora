// Curated Unsplash images per month (free-to-use, no auth required)
export const MONTH_IMAGES = {
  0:  { url: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&q=80', credit: 'Winter mountains', color: '#1e3a5f' },  // Jan
  1:  { url: 'https://images.unsplash.com/photo-1612099453745-c3ed39ac5dab?w=800&q=80', credit: 'Frozen forest', color: '#2d4a3e' },      // Feb
  2:  { url: 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=800&q=80', credit: 'Spring blossoms', color: '#5c3d6e' },    // Mar
  3:  { url: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80', credit: 'April flowers', color: '#2d5a3d' },      // Apr
  4:  { url: 'https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39?w=800&q=80', credit: 'May meadows', color: '#3d5a2d' },        // May
  5:  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', credit: 'Summer beach', color: '#1a4a6e' },       // Jun
  6:  { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', credit: 'Mountain peaks', color: '#2c4a6e' },     // Jul
  7:  { url: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80', credit: 'Late summer', color: '#4a3a2c' },        // Aug
  8:  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', credit: 'Autumn forest', color: '#5a3a1a' },      // Sep
  9:  { url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80', credit: 'Fall foliage', color: '#4a2a1a' },       // Oct
  10: { url: 'https://images.unsplash.com/photo-1477511801984-4ad318ed9846?w=800&q=80', credit: 'November mist', color: '#2a3a4a' },      // Nov
  11: { url: 'https://images.unsplash.com/photo-1544535830-9df3f56fff6a?w=800&q=80', credit: 'Winter snow', color: '#1a2a3a' },           // Dec
};

export function getMonthImage(monthIndex) {
  return MONTH_IMAGES[monthIndex] || MONTH_IMAGES[0];
}
