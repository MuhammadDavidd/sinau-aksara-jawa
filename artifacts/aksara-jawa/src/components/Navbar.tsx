import { useState, useEffect } from 'react';

type PageId = 'home' | 'materi' | 'flashcard' | 'game' | 'kuis' | 'nama' | 'tentang' | 'credit';

interface Props {
  activePage: PageId;
  goPage: (id: PageId) => void;
}

const links: { id: PageId; icon: string; label: string }[] = [
  { id: 'home', icon: 'fa-house', label: 'Beranda' },
  { id: 'materi', icon: 'fa-book-open', label: 'Materi' },
  { id: 'flashcard', icon: 'fa-layer-group', label: 'Flashcard' },
  { id: 'game', icon: 'fa-gamepad', label: 'Game' },
  { id: 'kuis', icon: 'fa-trophy', label: 'Kuis' },
  { id: 'nama', icon: 'fa-pen-nib', label: 'Tulis Nama' },
  { id: 'tentang', icon: 'fa-scroll', label: 'Tentang' },
  { id: 'credit', icon: 'fa-user-pen', label: 'Pembuat' },
];

export default function Navbar({ activePage, goPage }: Props) {
  const [mobOpen, setMobOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    setHidden(false);
    setLastY(window.scrollY);
  }, [activePage]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY + 20 && y > 80) setHidden(true);
      else if (y < lastY - 10) setHidden(false);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  const handleGoPage = (id: PageId) => {
    goPage(id);
    setMobOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 800,
        height: '66px',
        background: 'linear-gradient(135deg, #5C2008 0%, #3A1005 100%)',
        borderBottom: '2px solid #C8921E',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px',
        boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <div
          onClick={() => handleGoPage('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textDecoration: 'none', flexShrink: 0 }}
        >
          <div style={{
            width: '40px', height: '40px',
            background: 'linear-gradient(135deg, #C8921E, #E0AE42)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Noto Sans Javanese', serif",
            fontSize: '1.35rem', color: '#5C2008',
            boxShadow: '0 0 0 2px rgba(200,146,30,0.5), 0 0 16px rgba(200,146,30,0.35)',
            animation: 'gemPulse 3s ease-in-out infinite',
          }}>ꦲ</div>
          <div>
            <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '0.96rem', color: '#F0C96A', letterSpacing: '0.04em', lineHeight: 1.2 }}>
              Aksara Jawa
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.62rem', color: 'rgba(240,201,106,0.45)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Belajar dari Nol
            </div>
          </div>
        </div>

        {/* Desktop nav */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: '2px', listStyle: 'none', margin: 0, padding: 0 }}>
          {links.map(link => (
            <li key={link.id} className="nav-item-desktop">
              <a
                href="#"
                onClick={e => { e.preventDefault(); handleGoPage(link.id); }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.78rem', fontWeight: 500,
                  color: activePage === link.id ? '#F0C96A' : 'rgba(240,201,106,0.65)',
                  textDecoration: 'none',
                  padding: '8px 11px',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', gap: '5px',
                  whiteSpace: 'nowrap',
                  borderBottom: activePage === link.id ? '1.5px solid #F0C96A' : '1.5px solid transparent',
                  transition: '0.28s',
                }}
              >
                <i className={`fa-solid ${link.icon}`} style={{ fontSize: '0.75rem' }} />
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setMobOpen(!mobOpen)}
          className="hamburger-btn"
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '6px',
            display: 'none', flexDirection: 'column', gap: '5px',
          }}
          aria-label="Menu"
        >
          <span style={{
            display: 'block', width: '22px', height: '2px',
            background: '#E0AE42', borderRadius: '2px',
            transform: mobOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            transition: '0.28s',
          }} />
          <span style={{
            display: 'block', width: '22px', height: '2px',
            background: '#E0AE42', borderRadius: '2px',
            opacity: mobOpen ? 0 : 1,
            transition: '0.28s',
          }} />
          <span style={{
            display: 'block', width: '22px', height: '2px',
            background: '#E0AE42', borderRadius: '2px',
            transform: mobOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            transition: '0.28s',
          }} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobOpen && (
        <div style={{
          position: 'fixed', top: '66px', left: 0, right: 0, zIndex: 799,
          background: 'linear-gradient(180deg, #3A1005, #5C2008)',
          borderBottom: '2px solid #C8921E',
          padding: '12px 16px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
        }}>
          {links.map(link => (
            <a
              key={link.id}
              href="#"
              onClick={e => { e.preventDefault(); handleGoPage(link.id); }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.9rem', fontWeight: 500,
                color: activePage === link.id ? '#F0C96A' : '#FAE4A8',
                textDecoration: 'none',
                padding: '12px 14px',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', gap: '10px',
                transition: '0.28s',
                background: activePage === link.id ? 'rgba(200,146,30,0.15)' : 'transparent',
              }}
            >
              <i className={`fa-solid ${link.icon}`} />
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @keyframes gemPulse {
          0%,100%{box-shadow:0 0 0 2px rgba(200,146,30,.5),0 0 16px rgba(200,146,30,.3)}
          50%{box-shadow:0 0 0 4px rgba(200,146,30,.3),0 0 28px rgba(200,146,30,.5)}
        }
        @media(max-width:768px){
          .nav-item-desktop{display:none!important}
          .hamburger-btn{display:flex!important}
        }
      `}</style>
    </>
  );
}
