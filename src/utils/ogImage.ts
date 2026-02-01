import satori from 'satori';
import sharp from 'sharp';
import { SITE_TITLE, AUTHOR_NAME } from '../../config';

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const NOTO_SANS_JP_REGULAR_URL =
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-jp@latest/japanese-400-normal.woff';
const NOTO_SANS_JP_BOLD_URL =
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-jp@latest/japanese-700-normal.woff';

let fontRegular: ArrayBuffer | null = null;
let fontBold: ArrayBuffer | null = null;

async function loadFonts() {
  if (!fontRegular) {
    fontRegular = await fetch(NOTO_SANS_JP_REGULAR_URL).then((res) =>
      res.arrayBuffer()
    );
  }
  if (!fontBold) {
    fontBold = await fetch(NOTO_SANS_JP_BOLD_URL).then((res) =>
      res.arrayBuffer()
    );
  }
  return { fontRegular, fontBold };
}

export async function generateOgImage(title: string, date?: string): Promise<Buffer> {
  const { fontRegular, fontBold } = await loadFonts();

  const formattedDate = date
    ? new Date(date).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

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
          padding: '80px',
          background: '#ffffff',
          fontFamily: 'Noto Sans JP',
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
                      fontSize: title.length > 20 ? '44px' : '52px',
                      fontWeight: 400,
                      color: '#1f2778',
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
                      color: '#1f2778',
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
          name: 'Noto Sans JP',
          data: fontRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Noto Sans JP',
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
