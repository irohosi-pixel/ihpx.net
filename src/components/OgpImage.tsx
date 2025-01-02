import fs from 'fs';
import satori from 'satori';
import sharp from 'sharp';

export async function getOgpImage(title: string) {
  // フォントを読み込む
  const fontBoldData = fs.readFileSync('src/styles/fonts/MPLUS2-Bold.ttf');

  // ベースのローカル画像を読み込む
  const baseImage = Uint8Array.from(fs.readFileSync('src/assets/ogpImageBase.png')).buffer;

  const svg = await satori(
    <div
      style={{
        width: '1200px',
        height: '630px',
        display: 'flex',
        position: 'relative',
      }}
    >
      <img
        /* @ts-ignore */
        src={baseImage}
        width={1600}
        height={630}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
      <div
        style={{
          width: '95%',
          height: '95%',
          position: 'absolute',
          padding: '30px',
          fontFamily: 'M PLUS 2',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            position: 'relative',
            top: '40px',
            left: '30px',
            fontSize: '68px',
            fontWeight: 700,
            lineHeight: '1.1',
            color: '#2e1065',
          }}
        >
          {title}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'M PLUS 2',
          data: fontBoldData,
          weight: 700,
          style: 'normal',
        },
      ],
    },
  );

  // SVGをPNGに変換
  return await sharp(Buffer.from(svg)).png().toBuffer();
}
