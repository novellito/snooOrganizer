export const PRIMARY = '#fa7d09';
export const SECONDARY = '#ff4301';
export const SUCCESS = '#57AE5B';
export const DANGER = '#D64545';
export const TEXT_PRIMARY = '#7E7E7E';
export const TEXT_HEADER = '#3B3B3B';
export const SNOO_BLUE = '#24A0ED';
export const SNOO_MINT = '#0DD3BB';

export const getRandomColor = () => {
  const snooColors = [
    '#FF4500',
    '#FFCA00',
    '#FFB000',
    '#24A0ED',
    '#FF8717',
    '#0DD3BB',
    '#00A6A5',
    '#0079D3'
  ];

  return snooColors[Math.floor(Math.random() * 7)];
};
