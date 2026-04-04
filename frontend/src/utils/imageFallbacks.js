const makePlaceholder = (width, height, label) => {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e2e8f0"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="50%" y="50%" dy="0.35em" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#334155">
    ${label}
  </text>
</svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const PRODUCT_CARD_PLACEHOLDER = makePlaceholder(300, 200, 'RocketDrop Product');
export const GALLERY_PLACEHOLDER = makePlaceholder(900, 700, 'RocketDrop Preview');
