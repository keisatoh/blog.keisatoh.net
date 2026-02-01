import satori from 'satori';
import sharp from 'sharp';
import { OG_IMAGE_CONFIG } from '../../config';

const { width: OG_WIDTH, height: OG_HEIGHT, fonts, styles } = OG_IMAGE_CONFIG;

let fontRegular: ArrayBuffer | null = null;
let fontBold: ArrayBuffer | null = null;

class FontLoadError extends Error {
  constructor(
    fontName: string,
    public readonly cause?: unknown
  ) {
    super(`Failed to load font: ${fontName}`);
    this.name = 'FontLoadError';
  }
}

async function fetchFont(url: string, fontName: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new FontLoadError(
      fontName,
      `HTTP ${response.status}: ${response.statusText}`
    );
  }
  return response.arrayBuffer();
}

async function loadFonts(): Promise<{
  fontRegular: ArrayBuffer;
  fontBold: ArrayBuffer;
}> {
  if (!fontRegular) {
    fontRegular = await fetchFont(fonts.regular, `${fonts.family} Regular`);
  }
  if (!fontBold) {
    fontBold = await fetchFont(fonts.bold, `${fonts.family} Bold`);
  }
  return { fontRegular, fontBold };
}

export async function generateOgImage(
  title: string,
  date?: string
): Promise<Buffer> {
  const { fontRegular, fontBold } = await loadFonts();

  const formattedDate = date
    ? new Date(date).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  const titleFontSize =
    title.length > styles.titleThreshold
      ? styles.titleFontSize.long
      : styles.titleFontSize.default;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: `${styles.padding}px`,
          background: styles.background,
          fontFamily: fonts.family,
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: `${titleFontSize}px`,
                      fontWeight: 400,
                      color: styles.textColor,
                      lineHeight: 1.4,
                      letterSpacing: '-0.02em',
                    },
                    children: title,
                  },
                },
                formattedDate && {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '18px',
                      fontWeight: 400,
                      color: styles.textColor,
                      letterSpacing: '0.05em',
                    },
                    children: formattedDate,
                  },
                },
              ].filter(Boolean),
            },
          },
        ],
      },
    },
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: [
        {
          name: fonts.family,
          data: fontRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: fonts.family,
          data: fontBold,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return png;
}
