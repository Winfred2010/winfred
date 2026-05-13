export function getRandomColor() {
  const colors = [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#96CEB4', // Green
    '#FFEAA7', // Yellow
    '#DDA0DD', // Plum
    '#98D8C8', // Mint
    '#F7DC6F', // Light Yellow
    '#BB8FCE', // Light Purple
    '#85C1E9', // Light Blue
    '#F8C471', // Orange
    '#82E0AA', // Light Green
    '#F1948A', // Light Red
    '#AED6F1', // Very Light Blue
    '#A3E4D7', // Light Teal
    '#F9E79F', // Pale Yellow
    '#D7BDE2', // Pale Purple
    '#A9DFBF', // Pale Green
    '#FAD7A0', // Pale Orange
    '#ABEBC6', // Very Pale Green
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}