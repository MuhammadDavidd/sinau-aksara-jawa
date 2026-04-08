import { useState, useCallback } from 'react';
import { D, AksaraItem } from '../data/aksara';

type Cat = 'ngl' | 'pas' | 'san' | 'mur' | 'swa' | 'rek' | 'wil';
type Mode = 'jl' | 'lj';

const cats: { id: Cat; icon: string; label: string }[] = [
  { id: 'ngl', icon: 'fa-font', label: 'Nglegena' },
  { id: 'pas', icon: 'fa-link', label: 'Pasangan' },
  { id: 'san', icon: 'fa-music', label: 'Sandhangan' },
  { id: 'mur', icon: 'fa-crown', label: 'Murda' },
  { id: 'swa', icon: 'fa-volume-high', label: 'Swara' },
  { id: 'rek', icon: 'fa-globe', label: 'Rekan' },
  { id: 'wil', icon: 'fa-hashtag', label: 'Wilangan' },
];

function shuf<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function FlashcardPage() {
  const [cat, setCat] = useState<Cat>('ngl');
  const [mode, setMode] = useState<Mode>('jl');
  const [cards, setCards] = useState<AksaraItem[]>([...D.ngl]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleSetCat = useCallback((c: Cat) => {
    setCat(c);
    setCards([...D[c]]);
    setIdx(0);
    setFlipped(false);
  }, []);

  const handleSetMode = useCallback((m: Mode) => {
    setMode(m);
    setFlipped(false);
  }, []);

  const handleNext = () => { setIdx((idx + 1) % cards.length); setFlipped(false); };
  const handlePrev = () => { setIdx((idx - 1 + cards.length) % cards.length); setFlipped(false); };
  const handleShuffle = () => { setCards(shuf(cards)); setIdx(0); setFlipped(false); };

  const card = cards[idx];
  const frontContent = mode === 'jl' ? card.j : card.l;
  const backContent = mode === 'jl' ? card.l : card.j;
  const frontIsJawa = mode === 'jl';
  const backIsJawa = mode !== 'jl';

  return (
    <div>
      {/* Page header */}
      <div style={{
        background: 'linear-gradient(135deg, #5C2008 0%, #3A1005 55%, #7A2E12 100%)',
        padding: '52px 24px 40px', textAlign: 'center',
        borderBottom: '3px solid #C8921E',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(200,146,30,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', fontFamily: "'Noto Sans Javanese', serif", fontSize: '9rem', color: '#C8921E', opacity: 0.05, top: '50%', transform: 'translateY(-50%)', left: '-20px' }}>ꦕ</div>
        <div style={{ position: 'absolute', fontFamily: "'Noto Sans Javanese', serif", fontSize: '9rem', color: '#C8921E', opacity: 0.05, top: '50%', transform: 'translateY(-50%)', right: '-20px' }}>ꦮ</div>
        <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(1.3rem,3.5vw,2.1rem)', color: '#E0AE42', marginBottom: '7px', position: 'relative', letterSpacing: '0.05em' }}>
          <i className="fa-solid fa-layer-group" style={{ color: '#C8921E', marginRight: '9px' }} />Flashcard
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'rgba(240,201,106,0.6)', position: 'relative' }}>Hafal aksara dengan kartu bolak-balik 3D</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '14px', position: 'relative' }}>
          <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, #C8921E)' }} />
          <span style={{ fontFamily: "'Noto Sans Javanese', serif", fontSize: '1.1rem', color: '#C8921E' }}>꧁</span>
          <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(90deg, #C8921E, transparent)' }} />
        </div>
      </div>

      <div style={{ maxWidth: '580px', margin: '0 auto', padding: '36px 24px 80px' }}>
        {/* Mode bar */}
        <div style={{ display: 'flex', background: '#F5EAD0', border: '1px solid rgba(200,146,30,0.22)', borderRadius: '10px', padding: '4px', marginBottom: '18px' }}>
          {[{ id: 'jl' as Mode, icon: 'fa-arrow-right', label: 'Aksara → Latin' }, { id: 'lj' as Mode, icon: 'fa-arrow-left', label: 'Latin → Aksara' }].map(m => (
            <button
              key={m.id}
              onClick={() => handleSetMode(m.id)}
              style={{
                flex: 1, fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 500,
                padding: '9px', border: 'none', borderRadius: '8px',
                background: mode === m.id ? 'linear-gradient(135deg, #5C2008, #7A2E12)' : 'transparent',
                color: mode === m.id ? '#F0C96A' : '#A06030',
                cursor: 'pointer', transition: '0.28s',
                boxShadow: mode === m.id ? '0 2px 8px rgba(92,32,8,0.3)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              }}
            >
              <i className={`fa-solid ${m.icon}`} /> {m.label}
            </button>
          ))}
        </div>

        {/* Cat buttons */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {cats.map(c => (
            <button
              key={c.id}
              onClick={() => handleSetCat(c.id)}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.73rem', fontWeight: 500,
                padding: '6px 13px', borderRadius: '20px',
                border: '1.5px solid',
                borderColor: cat === c.id ? '#5C2008' : 'rgba(92,32,8,0.18)',
                background: cat === c.id ? '#5C2008' : 'transparent',
                color: cat === c.id ? '#F0C96A' : '#6B3518',
                cursor: 'pointer', transition: '0.28s',
              }}
            >
              <i className={`fa-solid ${c.icon}`} style={{ marginRight: '4px' }} />{c.label}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{ flex: 1, height: '4px', background: '#F5EAD0', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg, #C8921E, #E0AE42)', borderRadius: '2px', transition: 'width 0.4s', width: `${((idx + 1) / cards.length) * 100}%` }} />
          </div>
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.73rem', color: '#A06030', textAlign: 'center', marginBottom: '14px' }}>
          <i className="fa-solid fa-cards-blank" style={{ marginRight: '4px' }} />Kartu {idx + 1} dari {cards.length}
        </div>

        {/* 3D Card */}
        <div
          style={{ perspective: '1400px', height: '290px', cursor: 'pointer', marginBottom: '26px' }}
          onClick={() => setFlipped(f => !f)}
          title="Klik untuk balik kartu"
        >
          <div style={{
            width: '100%', height: '100%',
            transformStyle: 'preserve-3d', position: 'relative',
            transition: 'transform 0.65s cubic-bezier(0.4,0.15,0.2,1)',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}>
            {/* Front */}
            <div style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden', borderRadius: '18px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 12px 40px rgba(92,32,8,0.2)',
              background: 'linear-gradient(145deg, #5C2008 0%, #2E0D04 100%)',
              border: '2px solid rgba(200,146,30,0.4)',
            }}>
              <span style={{
                fontFamily: frontIsJawa ? "'Noto Sans Javanese', serif" : "'Cinzel Decorative', serif",
                fontSize: frontIsJawa ? '5.5rem' : '3.5rem',
                color: '#E0AE42',
                lineHeight: 1.2, marginBottom: '10px',
                textShadow: '0 2px 20px rgba(200,146,30,0.4)',
              }}>{frontContent}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: 'rgba(240,201,106,0.5)' }}>
                <i className="fa-solid fa-rotate" style={{ marginRight: '4px' }} />Klik untuk balik
              </span>
            </div>

            {/* Back */}
            <div style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden', borderRadius: '18px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 12px 40px rgba(200,146,30,0.2)',
              background: 'linear-gradient(145deg, #C8921E 0%, #E0AE42 100%)',
              border: '2px solid rgba(92,32,8,0.25)',
              transform: 'rotateY(180deg)',
            }}>
              <span style={{
                fontFamily: backIsJawa ? "'Noto Sans Javanese', serif" : "'Cinzel Decorative', serif",
                fontSize: backIsJawa ? '5.5rem' : '3.5rem',
                color: '#5C2008', lineHeight: 1.2, marginBottom: '8px', fontWeight: 700,
              }}>{backContent}</span>
              <span style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.88rem', color: 'rgba(92,32,8,0.65)', marginTop: '6px' }}>{card.e}</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <button
            onClick={handlePrev}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600,
              padding: '12px 20px', borderRadius: '50px', border: '1px solid rgba(200,146,30,0.22)',
              background: '#F5EAD0', color: '#6B3518', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px', transition: '0.28s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#FAE4A8'; e.currentTarget.style.transform = 'translateX(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F5EAD0'; e.currentTarget.style.transform = ''; }}
          >
            <i className="fa-solid fa-chevron-left" /> Sebelumnya
          </button>
          <button
            onClick={() => setFlipped(f => !f)}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600,
              padding: '12px 20px', borderRadius: '50px', border: 'none',
              background: 'linear-gradient(135deg, #C8921E, #E0AE42)',
              color: '#5C2008', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(200,146,30,0.38)',
              display: 'flex', alignItems: 'center', gap: '6px', transition: '0.28s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(200,146,30,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(200,146,30,0.38)'; }}
          >
            <i className="fa-solid fa-eye" /> Jawaban
          </button>
          <button
            onClick={handleNext}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600,
              padding: '12px 20px', borderRadius: '50px', border: 'none',
              background: 'linear-gradient(135deg, #5C2008, #7A2E12)',
              color: '#F0C96A', cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(92,32,8,0.32)',
              display: 'flex', alignItems: 'center', gap: '6px', transition: '0.28s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
          >
            Selanjutnya <i className="fa-solid fa-chevron-right" />
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '18px' }}>
          <button
            onClick={handleShuffle}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', fontWeight: 600,
              padding: '10px 20px', borderRadius: '50px', cursor: 'pointer',
              background: 'transparent', color: '#C8921E',
              border: '2px solid #C8921E',
              display: 'inline-flex', alignItems: 'center', gap: '6px', transition: '0.28s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,146,30,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = ''; }}
          >
            <i className="fa-solid fa-shuffle" /> Acak Kartu
          </button>
        </div>
      </div>
    </div>
  );
}
