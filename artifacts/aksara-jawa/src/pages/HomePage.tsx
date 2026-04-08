import { useEffect, useRef } from 'react';
import { HANA, D } from '../data/aksara';

type PageId = 'home' | 'materi' | 'flashcard' | 'game' | 'kuis' | 'nama' | 'tentang' | 'credit';
interface Props { goPage: (id: PageId) => void }

export default function HomePage({ goPage }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    let t = 0;
    const chars = HANA;
    const rows: { x: number; y: number; char: string; speed: number; size: number }[] = [];
    for (let i = 0; i < 60; i++) {
      rows.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        char: chars[Math.floor(Math.random() * chars.length)],
        speed: 0.2 + Math.random() * 0.5,
        size: 20 + Math.random() * 30,
      });
    }
    let raf: number;
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${rows[0].size}px "Noto Sans Javanese"`;
      rows.forEach((r, i) => {
        const op = 0.025 + Math.sin(t + i * 0.3) * 0.01;
        ctx.globalAlpha = Math.max(0, op);
        ctx.fillStyle = '#5C2008';
        ctx.font = `${r.size}px "Noto Sans Javanese"`;
        ctx.fillText(r.char, r.x, r.y + Math.sin(t * r.speed + i) * 8);
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  const tickerStr = HANA.join('  ');

  return (
    <div style={{ minHeight: 'calc(100vh - 66px)', position: 'relative', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.045 }} />

      {/* Hero */}
      <div style={{
        minHeight: 'calc(100vh - 66px)',
        background: 'radial-gradient(ellipse 90% 70% at 50% 30%, rgba(200,146,30,0.07) 0%, transparent 65%), #FBF4E3',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '64px 24px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden',
        zIndex: 1,
      }}>
        {/* Ticker */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          background: '#5C2008', borderBottom: '1px solid rgba(200,146,30,0.4)',
          overflow: 'hidden', height: '32px', display: 'flex', alignItems: 'center',
        }}>
          <div style={{
            display: 'flex', whiteSpace: 'nowrap',
            animation: 'ticker 22s linear infinite',
          }}>
            <span style={{ fontFamily: "'Noto Sans Javanese', serif", fontSize: '1rem', color: '#E0AE42', opacity: 0.55, padding: '0 18px' }}>
              {tickerStr}&nbsp;&nbsp;&nbsp;{tickerStr}&nbsp;&nbsp;&nbsp;{tickerStr}&nbsp;&nbsp;&nbsp;{tickerStr}
            </span>
            <span aria-hidden style={{ fontFamily: "'Noto Sans Javanese', serif", fontSize: '1rem', color: '#E0AE42', opacity: 0.55, padding: '0 18px' }}>
              {tickerStr}&nbsp;&nbsp;&nbsp;{tickerStr}&nbsp;&nbsp;&nbsp;{tickerStr}&nbsp;&nbsp;&nbsp;{tickerStr}
            </span>
          </div>
        </div>

        {/* Decorative batik corners */}
        <div style={{ position: 'absolute', top: '48px', left: '20px', fontFamily: "'Noto Sans Javanese', serif", fontSize: '3rem', color: '#5C2008', opacity: 0.06, pointerEvents: 'none' }}>ꦲꦤꦕ</div>
        <div style={{ position: 'absolute', top: '48px', right: '20px', fontFamily: "'Noto Sans Javanese', serif", fontSize: '3rem', color: '#5C2008', opacity: 0.06, pointerEvents: 'none' }}>ꦫꦏꦢ</div>

        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          fontFamily: "'DM Sans', sans-serif", fontSize: '0.73rem', fontWeight: 600,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: '#C8921E',
          background: 'rgba(200,146,30,0.1)',
          border: '1px solid rgba(200,146,30,0.3)',
          padding: '7px 18px', borderRadius: '30px',
          marginBottom: '28px',
        }}>
          <i className="fa-solid fa-star" />
          Media Belajar Aksara Jawa Terbaik
        </span>

        <h1 style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: 'clamp(1.9rem, 5.5vw, 4rem)',
          color: '#5C2008', lineHeight: 1.12,
          marginBottom: '14px',
        }}>
          Kuasai <em style={{ fontStyle: 'italic', color: '#C8921E' }}>Aksara Jawa</em><br />dari Nol hingga Mahir
        </h1>

        <div style={{
          fontFamily: "'Noto Sans Javanese', serif",
          fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
          color: '#C8921E', opacity: 0.5, letterSpacing: '0.08em',
          marginBottom: '20px',
        }}>ꦲꦏ꧀ꦱꦫꦗꦮ</div>

        <p style={{
          fontFamily: "'Lora', serif", fontSize: '1.02rem',
          color: '#6B3518', maxWidth: '560px', lineHeight: 1.82,
          marginBottom: '40px', fontStyle: 'italic',
        }}>
          Pelajari warisan budaya Jawa yang agung — Hanacaraka, pasangan, sandhangan, hingga menulis namamu dalam aksara yang indah ini.
        </p>

        <div style={{
          display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center',
          marginBottom: '56px',
        }}>
          <button
            onClick={() => goPage('materi')}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.92rem', fontWeight: 600,
              padding: '14px 30px', borderRadius: '50px', cursor: 'pointer', border: 'none',
              background: 'linear-gradient(135deg, #5C2008, #7A2E12)',
              color: '#F0C96A',
              boxShadow: '0 6px 24px rgba(92,32,8,0.38)',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              transition: '0.28s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)')}
            onMouseLeave={e => (e.currentTarget.style.transform = '')}
          >
            <i className="fa-solid fa-rocket" /> Mulai Belajar
          </button>
          <button
            onClick={() => goPage('game')}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.92rem', fontWeight: 600,
              padding: '14px 30px', borderRadius: '50px', cursor: 'pointer',
              background: 'transparent', color: '#C8921E',
              border: '2px solid #C8921E',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              transition: '0.28s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,146,30,0.12)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = ''; }}
          >
            <i className="fa-solid fa-gamepad" /> Main Game
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center',
          animation: 'fadeInUp 0.8s ease 0.7s both',
        }}>
          {[
            { val: '20', lbl: 'Aksara Dasar', icon: 'fa-font' },
            { val: '9', lbl: 'Sandhangan', icon: 'fa-music' },
            { val: '3', lbl: 'Jenis Game', icon: 'fa-gamepad' },
            { val: '∞', lbl: 'Semangat', icon: 'fa-fire' },
          ].map((s) => (
            <div
              key={s.lbl}
              style={{
                background: '#FFFCF2', border: '1px solid rgba(200,146,30,0.22)',
                borderRadius: '18px', padding: '18px 26px', textAlign: 'center',
                boxShadow: '0 4px 18px rgba(92,32,8,0.09)',
                transition: '0.28s',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(92,32,8,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 18px rgba(92,32,8,0.09)'; }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2.5px', background: 'linear-gradient(90deg, #C8921E, #E0AE42)' }} />
              <span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.9rem', color: '#C8921E', display: 'block', lineHeight: 1 }}>
                {s.val}
              </span>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', color: '#A06030', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '5px' }}>
                <i className={`fa-solid ${s.icon}`} style={{ marginRight: '4px' }} />{s.lbl}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu grid */}
      <div style={{ padding: '56px 24px 80px', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h3 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.7rem', color: '#5C2008', marginBottom: '5px' }}>
            Mulai dari Mana?
          </h3>
          <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.95rem', color: '#A06030' }}>
            Pilih modul belajar yang sesuai kebutuhanmu
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px', justifyContent: 'center' }}>
            <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, #C8921E)' }} />
            <i className="fa-solid fa-diamond" style={{ color: '#C8921E', fontSize: '0.85rem' }} />
            <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(90deg, #C8921E, transparent)' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px,1fr))', gap: '18px' }}>
          {[
            { id: 'materi' as PageId, icon: 'fa-book-open', title: 'Materi Aksara', desc: 'Semua jenis aksara — Nglegena, Pasangan, Sandhangan, Murda, Swara, Rekan, Wilangan.', tag: 'Lengkap' },
            { id: 'flashcard' as PageId, icon: 'fa-layer-group', title: 'Flashcard 3D', desc: 'Kartu bolak-balik dengan animasi 3D untuk menghafalkan aksara secara efektif.', tag: 'Hafal Cepat' },
            { id: 'game' as PageId, icon: 'fa-gamepad', title: 'Game Belajar', desc: 'Tebak Aksara, Memory Match, dan mini-game lain untuk menguji kemampuanmu.', tag: 'Seru!' },
            { id: 'kuis' as PageId, icon: 'fa-trophy', title: 'Kuis Resmi', desc: 'Uji kemampuan dengan kuis berstruktur, ada timer dan penilaian akhir.', tag: 'Nilai!' },
            { id: 'nama' as PageId, icon: 'fa-pen-nib', title: 'Tulis Namamu', desc: 'Konversi namamu ke Aksara Jawa dan unduh sebagai gambar.', tag: '' },
            { id: 'credit' as PageId, icon: 'fa-user-pen', title: 'Tentang Pembuat', desc: 'Kenali sang pengembang di balik website belajar aksara ini.', tag: '' },
          ].map(card => (
            <div
              key={card.id}
              onClick={() => goPage(card.id)}
              style={{
                background: '#FFFCF2', border: '1px solid rgba(200,146,30,0.22)',
                borderRadius: '18px', padding: '26px 20px',
                cursor: 'pointer', textAlign: 'center',
                boxShadow: '0 2px 12px rgba(92,32,8,0.09)',
                transition: '0.28s',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px) rotate(-0.4deg)'; e.currentTarget.style.boxShadow = '0 18px 40px rgba(92,32,8,0.2)'; e.currentTarget.style.borderColor = '#C8921E'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 12px rgba(92,32,8,0.09)'; e.currentTarget.style.borderColor = 'rgba(200,146,30,0.22)'; }}
            >
              {card.tag && (
                <div style={{
                  position: 'absolute', top: '12px', right: '-22px',
                  background: '#C8921E', color: '#5C2008',
                  fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', fontWeight: 700,
                  padding: '3px 28px 3px 10px', transform: 'rotate(12deg)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}>
                  {card.tag}
                </div>
              )}
              <div style={{
                width: '58px', height: '58px',
                background: 'linear-gradient(135deg, #5C2008, #7A2E12)',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 14px', fontSize: '1.4rem', color: '#E0AE42',
                boxShadow: '0 4px 14px rgba(92,32,8,0.32)',
                transition: '0.28s',
              }}>
                <i className={`fa-solid ${card.icon}`} />
              </div>
              <h4 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '0.9rem', color: '#5C2008', marginBottom: '7px' }}>{card.title}</h4>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.76rem', color: '#A06030', lineHeight: 1.5 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes fadeInDown { from { opacity:0;transform:translateY(-22px) } to { opacity:1;transform:translateY(0) } }
        @keyframes fadeInUp { from { opacity:0;transform:translateY(26px) } to { opacity:1;transform:translateY(0) } }
      `}</style>
    </div>
  );
}
