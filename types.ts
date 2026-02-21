export interface GalleryImage {
  id: number;
  url: string;
  caption: string;
  rotation: number; // For the messy collage look
}

export interface CalendarDate {
  day: number;
  isWeddingDay: boolean;
  isWeekend: boolean;
}

export enum SectionType {
  COVER = 'COVER',
  LETTER = 'LETTER',
  GALLERY = 'GALLERY',
  CALENDAR = 'CALENDAR',
  LOCATION = 'LOCATION',
  GUESTBOOK = 'GUESTBOOK'
}