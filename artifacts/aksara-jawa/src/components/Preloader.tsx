import { useEffect, useState } from 'react';
import { PRELOADER_CHARS } from '../data/aksara';

interface Props {
  onDone: () => void;
}

export default function Preloader({ onDone }: Props) {
  const [progress, setProgress] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [charOpacity, setCharOpacity] = useState(1);
  const [charScale, setCharScale] = useState(1);

  useEffect(() => {
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 4 + 2;
      if (prog >= 100) {
        prog = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setOpacity(0);
          setTimeout(() => {
            setVisible(false);
            onDone();
          }, 700);
        }, 400);
      } else {
        setProgress(prog);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [onDone]);

  useEffect(() => {
    let idx = 0;
    const charInterval = setInterval(() => {
      setCharOpacity(0);
      setCharScale(0.7);
      setTimeout(() => {
        idx = (idx + 1) % PRELOADER_CHARS.length;
        setCharIdx(idx);
        setCharOpacity(1);
        setCharScale(1);
      }, 250);
    }, 600);
    return () => clearInterval(charInterval);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'linear-gradient(135deg, #5C2008 0%, #2E0D04 50%, #7A2E12 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.7s ease',
        opacity,
        overflow: 'hidden',
      }}
    >
      {/* Background floating characters */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {PRELOADER_CHARS.slice(0, 8).map((ch, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              fontFamily: "'Noto Sans Javanese', serif",
              fontSize: `${2 + Math.random() * 3}rem`,
              color: 'rgba(200,146,30,0.06)',
              top: `${10 + i * 11}%`,
              left: `${5 + (i % 4) * 25}%`,
              animation: `bgFloat ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {ch}
          </span>
        ))}
      </div>

      {/* Decorative rings */}
      <div style={{
        position: 'absolute',
        width: '300px', height: '300px',
        borderRadius: '50%',
        border: '1px solid rgba(200,146,30,0.12)',
        animation: 'ringPulse 3s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        width: '220px', height: '220px',
        borderRadius: '50%',
        border: '1px solid rgba(200,146,30,0.18)',
        animation: 'ringPulse 3s ease-in-out infinite 0.5s',
      }} />

      {/* Main changing aksara character */}
      <div style={{ position: 'relative', marginBottom: '20px', textAlign: 'center' }}>
        <div
          style={{
            fontFamily: "'Noto Sans Javanese', serif",
            fontSize: '5.5rem',
            color: '#F0C96A',
            lineHeight: 1.2,
            transition: 'opacity 0.25s ease, transform 0.25s ease',
            opacity: charOpacity,
            transform: `scale(${charScale})`,
            textShadow: '0 0 40px rgba(200,146,30,0.5)',
            display: 'block',
          }}
        >
          {PRELOADER_CHARS[charIdx]}
        </div>
        <div style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: '1.1rem',
          color: '#E0AE42',
          letterSpacing: '0.1em',
          marginTop: '4px',
          opacity: 0.8,
        }}>
          Aksara Jawa
        </div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.72rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(240,201,106,0.45)',
          marginTop: '6px',
        }}>
          Memuat Warisan Budaya…
        </div>
      </div>

      {/* Loading bar */}
      <div style={{
        width: '260px',
        marginTop: '28px',
        position: 'relative',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.68rem',
          color: 'rgba(240,201,106,0.4)',
          letterSpacing: '0.1em',
        }}>
          <span><i className="fa-solid fa-scroll" style={{ marginRight: '4px' }} />Hanacaraka</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div style={{
          height: '4px',
          background: 'rgba(200,146,30,0.15)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #C8921E, #F0C96A)',
            borderRadius: '4px',
            transition: 'width 0.15s ease',
            boxShadow: '0 0 12px rgba(200,146,30,0.6)',
          }} />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '6px',
          marginTop: '16px',
        }}>
          {PRELOADER_CHARS.slice(0, 5).map((ch, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Noto Sans Javanese', serif",
                fontSize: '1rem',
                color: `rgba(200,146,30,${progress > (i + 1) * 20 ? 0.9 : 0.2})`,
                transition: 'color 0.4s ease',
              }}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ringPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.05); }
        }
        @keyframes bgFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
}
