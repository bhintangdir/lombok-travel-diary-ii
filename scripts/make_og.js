const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createOgImage() {
  const width = 1200;
  const height = 630;

  // 1. Prepare background: crop and resize tanjung-ann.webp to 1200x630
  const bgBuffer = await sharp('public/tanjung-ann.webp')
    .resize(width, height, { fit: 'cover', position: 'center' })
    .toBuffer();

  // 2. Resize logo-square.png to a nice framed size (e.g., 280x224 or 300x240)
  const logoBuffer = await sharp('public/logo-square.png')
    .resize(320, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // 3. Create SVG graphics overlay
  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a1428" stop-opacity="0.82"/>
        <stop offset="55%" stop-color="#0e1f3d" stop-opacity="0.65"/>
        <stop offset="100%" stop-color="#0a1428" stop-opacity="0.88"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="4" dy="6" stdDeviation="6" flood-color="#000" flood-opacity="0.45"/>
      </filter>
      <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="6" dy="8" stdDeviation="8" flood-color="#050a14" flood-opacity="0.6"/>
      </filter>
    </defs>

    <!-- Dark gradient backdrop -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>

    <!-- Decorative Top & Bottom Borders (Scrapbook Stitched Lines) -->
    <line x1="40" y1="36" x2="1160" y2="36" stroke="#f7c548" stroke-width="3" stroke-dasharray="10 8" opacity="0.75"/>
    <line x1="40" y1="594" x2="1160" y2="594" stroke="#f7c548" stroke-width="3" stroke-dasharray="10 8" opacity="0.75"/>

    <!-- Left Badge: Polaroid Card for Logo -->
    <g transform="translate(70, 115) rotate(-2.5)" filter="url(#cardShadow)">
      <!-- Polaroid white border -->
      <rect x="0" y="0" width="370" height="380" rx="16" fill="#fffdfa" stroke="#1b2a47" stroke-width="3"/>
      <!-- Inner cutout border -->
      <rect x="20" y="20" width="330" height="270" rx="8" fill="#111f38" stroke="#1b2a47" stroke-width="2"/>
      
      <!-- Polaroid bottom text -->
      <text x="185" y="340" text-anchor="middle" font-family="'Caveat', cursive, sans-serif" font-size="28" font-weight="700" fill="#e8553d">
        Lombok Travel Diary 🌴
      </text>

      <!-- Tape at the top of Polaroid -->
      <rect x="130" y="-14" width="110" height="30" rx="2" fill="#f7c548" fill-opacity="0.95" stroke="#1b2a47" stroke-width="1.5" transform="rotate(3 185 1)"/>
    </g>

    <!-- Right Content Area -->
    <g transform="translate(485, 120)">
      <!-- Web domain badge -->
      <g filter="url(#shadow)">
        <rect x="0" y="0" width="280" height="42" rx="21" fill="#f7c548" stroke="#1b2a47" stroke-width="2.5"/>
        <text x="140" y="27" text-anchor="middle" font-family="'Poppins', Arial, sans-serif" font-size="18" font-weight="700" fill="#1b2a47" letter-spacing="0.5">
          lomboktraveldiary.com
        </text>
      </g>

      <!-- Main Heading -->
      <text x="0" y="115" font-family="'Poppins', Arial, sans-serif" font-size="52" font-weight="800" fill="#ffffff" filter="url(#shadow)">
        Lombok Travel Diary
      </text>

      <!-- Tagline / Subtitle -->
      <text x="0" y="165" font-family="'Caveat', cursive, sans-serif" font-size="34" font-weight="700" fill="#ffd56b">
        Your Personal Island Journal &amp; Private Tours
      </text>

      <!-- Highlights Pills -->
      <g transform="translate(0, 205)">
        <!-- Pill 1 -->
        <rect x="0" y="0" width="185" height="40" rx="20" fill="rgba(255,255,255,0.15)" stroke="#ffffff" stroke-width="1.5"/>
        <text x="92" y="25" text-anchor="middle" font-family="'Poppins', Arial, sans-serif" font-size="14" font-weight="600" fill="#ffffff">
          🏝️ 3 Gili Hopping
        </text>

        <!-- Pill 2 -->
        <rect x="200" y="0" width="190" height="40" rx="20" fill="rgba(255,255,255,0.15)" stroke="#ffffff" stroke-width="1.5"/>
        <text x="295" y="25" text-anchor="middle" font-family="'Poppins', Arial, sans-serif" font-size="14" font-weight="600" fill="#ffffff">
          🌋 Sembalun &amp; Rinjani
        </text>

        <!-- Pill 3 -->
        <rect x="405" y="0" width="205" height="40" rx="20" fill="rgba(255,255,255,0.15)" stroke="#ffffff" stroke-width="1.5"/>
        <text x="507" y="25" text-anchor="middle" font-family="'Poppins', Arial, sans-serif" font-size="14" font-weight="600" fill="#ffffff">
          🌊 Waterfalls &amp; Culture
        </text>
      </g>

      <!-- CTA / Contact info box -->
      <g transform="translate(0, 275)" filter="url(#shadow)">
        <rect x="0" y="0" width="610" height="66" rx="12" fill="#2fa36b" stroke="#1b2a47" stroke-width="2.5"/>
        <text x="25" y="42" font-family="'Poppins', Arial, sans-serif" font-size="20" font-weight="700" fill="#ffffff">
          Direct WhatsApp Booking: +62 851-3893-9835
        </text>
      </g>
    </g>

    <!-- Stamp in bottom right -->
    <g transform="translate(1040, 480) rotate(8)" filter="url(#shadow)">
      <rect x="0" y="0" width="95" height="75" rx="6" fill="#e8553d" stroke="#fff" stroke-width="2" stroke-dasharray="4 3"/>
      <text x="47" y="32" text-anchor="middle" font-family="'Poppins', Arial, sans-serif" font-size="13" font-weight="800" fill="#fff">
        OFFICIAL
      </text>
      <text x="47" y="52" text-anchor="middle" font-family="'Poppins', Arial, sans-serif" font-size="11" font-weight="600" fill="#fff">
        DIARY 2026
      </text>
    </g>
  </svg>
  `;

  // Calculate coordinates for the logo inside the polaroid card:
  // Polaroid: transform(70, 115) rotate(-2.5)
  // Inner cutout is at (20, 20) relative to polaroid, size (330, 270)
  // We can overlay the logo on top of the composited image!
  // To keep rotation clean, let's first create the polaroid card with the logo composite, then rotate it onto the background!

  const polaroidW = 370;
  const polaroidH = 380;
  const polaroidBase = `
  <svg width="${polaroidW}" height="${polaroidH}" viewBox="0 0 ${polaroidW} ${polaroidH}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${polaroidW}" height="${polaroidH}" rx="16" fill="#fffdfa" stroke="#1b2a47" stroke-width="3"/>
    <rect x="20" y="20" width="330" height="270" rx="8" fill="#0f1f3a" stroke="#1b2a47" stroke-width="2"/>
    <text x="185" y="342" text-anchor="middle" font-family="'Caveat', cursive, sans-serif" font-size="30" font-weight="700" fill="#e8553d">
      Lombok Travel Diary 🌴
    </text>
    <!-- Tape at the top -->
    <rect x="130" y="-12" width="110" height="30" rx="2" fill="#f7c548" fill-opacity="0.95" stroke="#1b2a47" stroke-width="1.5" transform="rotate(3 185 1)"/>
  </svg>
  `;

  // Fit logo inside the cutout (310 x 250)
  const innerLogo = await sharp('public/logo-square.png')
    .resize(310, 250, { fit: 'contain', background: { r: 15, g: 31, b: 58, alpha: 1 } })
    .toBuffer();

  const polaroidWithLogo = await sharp(Buffer.from(polaroidBase))
    .composite([
      { input: innerLogo, top: 30, left: 30 }
    ])
    .png()
    .toBuffer();

  // Rotate polaroid slightly
  const rotatedPolaroid = await sharp(polaroidWithLogo)
    .rotate(-2.5, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Right side SVG without the polaroid card (so it won't clash)
  const mainOverlaySvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a1428" stop-opacity="0.82"/>
        <stop offset="55%" stop-color="#0e1f3d" stop-opacity="0.65"/>
        <stop offset="100%" stop-color="#0a1428" stop-opacity="0.88"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="4" dy="6" stdDeviation="6" flood-color="#000" flood-opacity="0.45"/>
      </filter>
    </defs>

    <!-- Dark gradient backdrop -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>

    <!-- Decorative Stitched Lines -->
    <line x1="40" y1="36" x2="1160" y2="36" stroke="#f7c548" stroke-width="3" stroke-dasharray="10 8" opacity="0.75"/>
    <line x1="40" y1="594" x2="1160" y2="594" stroke="#f7c548" stroke-width="3" stroke-dasharray="10 8" opacity="0.75"/>

    <!-- Right Content Area -->
    <g transform="translate(490, 115)">
      <!-- Domain Badge -->
      <g filter="url(#shadow)">
        <rect x="0" y="0" width="300" height="42" rx="21" fill="#f7c548" stroke="#1b2a47" stroke-width="2.5"/>
        <text x="150" y="27" text-anchor="middle" font-family="'Poppins', Arial, sans-serif" font-size="18" font-weight="700" fill="#1b2a47" letter-spacing="0.5">
          lomboktraveldiary.com
        </text>
      </g>

      <!-- Main Heading -->
      <text x="0" y="115" font-family="'Poppins', Arial, sans-serif" font-size="52" font-weight="800" fill="#ffffff" filter="url(#shadow)">
        Lombok Travel Diary
      </text>

      <!-- Tagline / Subtitle -->
      <text x="0" y="165" font-family="'Caveat', cursive, sans-serif" font-size="34" font-weight="700" fill="#ffd56b">
        Your Personal Island Journal &amp; Private Tours
      </text>

      <!-- Highlights Pills -->
      <g transform="translate(0, 205)">
        <rect x="0" y="0" width="185" height="42" rx="21" fill="rgba(255,255,255,0.12)" stroke="#ffffff" stroke-width="1.5"/>
        <text x="92" y="26" text-anchor="middle" font-family="'Poppins', Arial, sans-serif" font-size="14" font-weight="600" fill="#ffffff">
          🏝️ 3 Gili Hopping
        </text>

        <rect x="200" y="0" width="195" height="42" rx="21" fill="rgba(255,255,255,0.12)" stroke="#ffffff" stroke-width="1.5"/>
        <text x="297" y="26" text-anchor="middle" font-family="'Poppins', Arial, sans-serif" font-size="14" font-weight="600" fill="#ffffff">
          🌋 Sembalun &amp; Rinjani
        </text>

        <rect x="410" y="0" width="210" height="42" rx="21" fill="rgba(255,255,255,0.12)" stroke="#ffffff" stroke-width="1.5"/>
        <text x="515" y="26" text-anchor="middle" font-family="'Poppins', Arial, sans-serif" font-size="14" font-weight="600" fill="#ffffff">
          🚗 Car &amp; Airport Transfer
        </text>
      </g>

      <!-- WhatsApp Booking Banner -->
      <g transform="translate(0, 280)" filter="url(#shadow)">
        <rect x="0" y="0" width="620" height="68" rx="14" fill="#2fa36b" stroke="#1b2a47" stroke-width="2.5"/>
        <text x="30" y="43" font-family="'Poppins', Arial, sans-serif" font-size="20" font-weight="700" fill="#ffffff">
          💬 WhatsApp Booking: +62 851-3893-9835
        </text>
      </g>
    </g>

    <!-- Stamp in bottom right -->
    <g transform="translate(1045, 485) rotate(7)" filter="url(#shadow)">
      <rect x="0" y="0" width="95" height="75" rx="6" fill="#e8553d" stroke="#fff" stroke-width="2" stroke-dasharray="4 3"/>
      <text x="47" y="32" text-anchor="middle" font-family="'Poppins', Arial, sans-serif" font-size="13" font-weight="800" fill="#fff">
        OFFICIAL
      </text>
      <text x="47" y="52" text-anchor="middle" font-family="'Poppins', Arial, sans-serif" font-size="11" font-weight="600" fill="#fff">
        DIARY 2026
      </text>
    </g>
  </svg>
  `;

  // Final composite
  const finalImage = await sharp(bgBuffer)
    .composite([
      { input: Buffer.from(mainOverlaySvg), top: 0, left: 0 },
      { input: rotatedPolaroid, top: 100, left: 60 }
    ])
    .jpeg({ quality: 92 })
    .toFile('public/og-image.jpg');

  console.log('Successfully generated public/og-image.jpg', finalImage);

  // Also save PNG for opengraph-image.png
  await sharp('public/og-image.jpg').png().toFile('public/opengraph-image.png');
  await sharp('public/og-image.jpg').png().toFile('src/app/opengraph-image.png');
  console.log('Successfully saved opengraph-image.png');
}

createOgImage().catch(console.error);
