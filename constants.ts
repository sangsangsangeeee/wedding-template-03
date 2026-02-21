import { GalleryImage } from './types';

export const WEDDING_INFO = {
  date: new Date('2026-06-07T15:00:00'),
  groom: "상이",
  bride: "현아",
  location: "서울",
  venue: "서울여성플라자 피움 서울, \n국제회의장",
  address: "서울 동작구 여의대방로54길 18 (대방동)",
  mapCoordinates: { lat: 37.51137187820746, lng: 126.92713661961623 },
};

export const TRANSPORT_INFO = [
  { title: '지하철', content: '2호선 숲속역 3번 출구 도보 5분' },
  { title: '버스', content: '초록버스 1234번, 가든 입구 하차' },
  { title: '자가용', content: '네비게이션에 "그랜드 포레스트 가든" 검색 (주차 200대 가능)' },
];

export const INVITATION_TITLE = "초대합니다";

export const INVITATION_PARAGRAPHS = [
  "햇살이 가장 예쁜 6월에\n저희가 사랑의 결실을 \n맺게 되었습니다.",
  "늘 웃음 가득한 부부가 \n되겠습니다.",
  "평생을 함께 써 내려갈\n저희의 첫 페이지에\n소중한 분들을 초대합니다.",
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, url: "/assets/gallery-1.jpeg", caption: "케이크와 함께", rotation: -3 },
  { id: 2, url: "/assets/gallery-2.jpeg", caption: "달콤한 시간", rotation: 4 },
  { id: 3, url: "/assets/gallery-4.jpeg", caption: "계단에서", rotation: -2 },
  { id: 4, url: "/assets/gallery-6.jpeg", caption: "유리 낙서", rotation: 2 },
  { id: 5, url: "/assets/gallery-8.jpeg", caption: "꽃다발", rotation: -1 },
  { id: 6, url: "/assets/gallery-9.jpeg", caption: "블랙 커플룩", rotation: 3 },
  { id: 7, url: "/assets/gallery-13.jpeg", caption: "프러포즈", rotation: -4 },
  { id: 8, url: "/assets/gallery-14.jpeg", caption: "Will You Marry Me", rotation: 1 },
  { id: 9, url: "/assets/gallery-15.jpeg", caption: "마주보며", rotation: -2 },
  { id: 10, url: "/assets/gallery-16.jpeg", caption: "꽃 건네기", rotation: 2 },
];

// Mock calendar data for June 2026
// June 1st, 2026 is a Monday.
// Grid starts at Sunday (index 0).
// So index 1 is Monday (1st). day = index.
export const CALENDAR_DAYS = Array.from({ length: 35 }, (_, i) => {
    const day = i; 
    return day > 0 && day <= 30 ? day : null;
});