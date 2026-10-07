import MetallicPaint from '../reactbits/MetallicPaint/MetallicPaint.jsx';
import Waves from '../reactbits/Waves/Waves.jsx';
import DecryptedText from '../reactbits/DecryptedText/DecryptedText.jsx';
import { Mark, Wordmark } from '../ui/Brand.jsx';
import { Arrow, Visible } from '../ui/Primitives.jsx';
import { hasWebGL2, reduced, useReady } from '../../lib/hooks.js';

/* Hairline water field that bends around the cursor (React Bits Waves) */
export function InkField({ color = 'rgba(0, 0, 0, 0.2)', xGap = 11, yGap = 34 }) {
  if (reduced) return null;
  return (
    <Waves lineColor={color} backgroundColor="transparent" waveSpeedX={0.008} waveSpeedY={0.004}
      waveAmpX={36} waveAmpY={18} xGap={xGap} yGap={yGap} friction={0.92} tension={0.006} maxCursorMove={110} />
  );
}

/* The Hydris mark rendered as liquid metal (React Bits MetallicPaint), monochrome.
   Uses a pre-computed shape field so it appears instantly. */
export function LiquidMark() {
  if (!hasWebGL2 || reduced) return <Mark className="liquid__fallback" />;
  return (
    <MetallicPaint imageSrc="/brand/mark-field.png" preprocessed grayscale seed={21} scale={3} refraction={0} blur={0.012}
      liquid={0.42} speed={0.2} brightness={1.12} contrast={1} angle={24} fresnel={0.8} lightColor="#8a8a8a"
      darkColor="#000000" tintColor="#ffffff" patternSharpness={1} waveAmplitude={0.8} noiseScale={0.5}
      chromaticSpread={0} mouseAnimation={false} distortion={0.6} contour={0.45} />
  );
}

export default function Hero() {
  const ready = useReady();
  return (
    <section className={`hero ${ready ? 'is-in' : ''}`} aria-label="Hydris AI">
      <div className="hero__field"><Visible rootMargin="0px"><InkField /></Visible></div>
      <div className="hero__veil" aria-hidden="true" />

      <div className="hero__frame" aria-hidden="true"><i /><i /><i /><i /></div>

      <div className="hero__center">
        <div className="hero__logo"><Visible rootMargin="0px"><LiquidMark /></Visible></div>
        <h1 className="hero__word"><span className="sr-only">Hydris AI</span><Wordmark /></h1>
      </div>

      <div className="hero__foot">
        <p className="hero__cap">
          {ready
            ? <DecryptedText text="The intelligence layer for modern water operations" animateOn="inViewHover" sequential speed={26} revealDirection="start" encryptedClassName="dec-enc" />
            : <span className="dec-wait">The intelligence layer for modern water operations</span>}
        </p>
        <p className="hero__index">(01) Index</p>
        <a className="hero__scroll" href="#intro">Scroll <Arrow dir="down" /></a>
      </div>
    </section>
  );
}
