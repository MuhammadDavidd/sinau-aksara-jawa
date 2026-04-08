type PageId = 'home' | 'materi' | 'flashcard' | 'game' | 'kuis' | 'nama' | 'tentang' | 'credit';
interface Props { goPage: (id: PageId) => void }

export default function TentangPage({ goPage }: Props) {
  const cards = [
    {
      icon: 'fa-scroll', title: 'Sejarah Aksara Jawa',
      body: 'Aksara Jawa, dikenal sebagai <strong>Hanacaraka</strong> atau <em>Carakan</em>, adalah sistem penulisan abugida yang berkembang dari aksara Brahmi India melalui Pallawa dan Kawi. Sejak abad ke-9 Masehi, aksara ini menjadi media penulisan utama di tanah Jawa — mengukir ribuan naskah sastra, kitab filsafat, dan prasasti kerajaan yang kini menjadi warisan peradaban dunia.',
    },
    {
      icon: 'fa-yin-yang', title: 'Filosofi Hanacaraka',
      body: 'Urutan aksara <strong>Ha-Na-Ca-Ra-Ka / Da-Ta-Sa-Wa-La / Pa-Dha-Ja-Ya-Nya / Ma-Ga-Ba-Tha-Nga</strong> mengandung kisah dua utusan (<em>caraka</em>) yang bertarung dengan kesetiaan dan gugur bersama. Legenda ini mengajarkan tentang integritas, keberanian, dan keadilan Ilahi.',
    },
    {
      icon: 'fa-landmark', title: 'Fungsi & Warisan',
      body: 'Aksara Jawa digunakan untuk menulis sastra klasik (kakawin, kidung, serat), naskah keagamaan, prasasti, dan kitab primbon. Hari ini aksara ini masih diajarkan di sekolah Jawa Tengah & Yogyakarta dan telah distandarisasi dalam <strong>Unicode U+A980–U+A9DF</strong>.',
    },
    {
      icon: 'fa-map', title: 'Pengaruh di Nusantara',
      body: 'Aksara Jawa melahirkan keluarga aksara Nusantara lainnya — aksara Bali, Sunda, Sasak, dan Madura. Naskah-naskah berbahasa Jawa telah masuk dalam daftar <strong>Memory of the World UNESCO</strong>.',
    },
  ];

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #5C2008 0%, #3A1005 55%, #7A2E12 100%)',
        padding: '52px 24px 40px', textAlign: 'center',
        borderBottom: '3px solid #C8921E', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(200,146,30,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', fontFamily: "'Noto Sans Javanese', serif", fontSize: '9rem', color: '#C8921E', opacity: 0.05, top: '50%', transform: 'translateY(-50%)', left: '-20px' }}>ꦱ</div>
        <div style={{ position: 'absolute', fontFamily: "'Noto Sans Javanese', serif", fontSize: '9rem', color: '#C8921E', opacity: 0.05, top: '50%', transform: 'translateY(-50%)', right: '-20px' }}>ꦥ</div>
        <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(1.3rem,3.5vw,2.1rem)', color: '#E0AE42', marginBottom: '7px', position: 'relative', letterSpacing: '0.05em' }}>
          <i className="fa-solid fa-scroll" style={{ color: '#C8921E', marginRight: '9px' }} />Tentang Aksara Jawa
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'rgba(240,201,106,0.6)', position: 'relative' }}>Sejarah, filosofi, dan keindahan warisan budaya Nusantara</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '14px', position: 'relative' }}>
          <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, #C8921E)' }} />
          <span style={{ fontFamily: "'Noto Sans Javanese', serif", fontSize: '1.1rem', color: '#C8921E' }}>꧁</span>
          <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(90deg, #C8921E, transparent)' }} />
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '36px 24px 80px' }}>
        {/* Hanacaraka banner */}
        <div style={{
          background: 'linear-gradient(145deg, #5C2008 0%, #2E0D04 100%)',
          border: '2px solid rgba(200,146,30,0.35)', borderRadius: '20px',
          padding: '32px 24px', textAlign: 'center', marginBottom: '36px',
          boxShadow: '0 10px 40px rgba(92,32,8,0.4)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(200,146,30,0.1) 0%, transparent 70%)' }} />
          <div style={{ fontFamily: "'Noto Sans Javanese', serif", fontSize: 'clamp(1.7rem,5vw,2.8rem)', color: '#E0AE42', opacity: 0.8, lineHeight: 1.7, marginBottom: '4px', position: 'relative' }}>
            ꦲꦤꦕꦫꦏ ꦢꦠꦱꦮꦭ
          </div>
          <div style={{ fontFamily: "'Noto Sans Javanese', serif", fontSize: 'clamp(1.7rem,5vw,2.8rem)', color: '#E0AE42', opacity: 0.8, lineHeight: 1.7, marginBottom: '16px', position: 'relative' }}>
            ꦥꦝꦗꦪꦚ ꦩꦒꦧꦛꦔ
          </div>
          <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '0.78rem', color: 'rgba(240,201,106,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase', position: 'relative' }}>
            <i className="fa-solid fa-star" style={{ marginRight: '8px' }} />
            Hanacaraka — Dua Puluh Aksara Dasar Jawa
            <i className="fa-solid fa-star" style={{ marginLeft: '8px' }} />
          </div>
        </div>

        {cards.map((c, i) => (
          <div
            key={i}
            style={{
              background: '#FFFCF2', border: '1px solid rgba(200,146,30,0.22)',
              borderRadius: '18px', padding: '26px 24px', marginBottom: '18px',
              boxShadow: '0 2px 10px rgba(92,32,8,0.09)',
              transition: '0.28s',
              borderLeft: '4px solid #C8921E',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(92,32,8,0.17)'; e.currentTarget.style.transform = 'translateX(5px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(92,32,8,0.09)'; e.currentTarget.style.transform = ''; }}
          >
            <h3 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1rem', color: '#5C2008', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '9px' }}>
              <i className={`fa-solid ${c.icon}`} style={{ color: '#C8921E', fontSize: '0.95rem' }} />
              {c.title}
            </h3>
            <p style={{ fontFamily: "'Lora', serif", fontSize: '0.95rem', color: '#6B3518', lineHeight: 1.78 }} dangerouslySetInnerHTML={{ __html: c.body }} />
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <button
            onClick={() => goPage('materi')}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.92rem', fontWeight: 600,
              padding: '14px 30px', borderRadius: '50px', cursor: 'pointer', border: 'none',
              background: 'linear-gradient(135deg, #5C2008, #7A2E12)', color: '#F0C96A',
              boxShadow: '0 6px 24px rgba(92,32,8,0.38)',
              display: 'inline-flex', alignItems: 'center', gap: '8px', transition: '0.28s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(92,32,8,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 24px rgba(92,32,8,0.38)'; }}
          >
            <i className="fa-solid fa-rocket" /> Mulai Belajar Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
