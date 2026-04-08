export default function CreditPage() {
  const floats = [
    { ch: 'ꦲ', top: '15%', left: '5%', delay: '0s' },
    { ch: 'ꦤ', top: '25%', right: '7%', delay: '1.5s' },
    { ch: 'ꦕ', top: '55%', left: '3%', delay: '3s' },
    { ch: 'ꦫ', top: '70%', right: '5%', delay: '2s' },
    { ch: 'ꦏ', top: '82%', left: '8%', delay: '.8s' },
    { ch: 'ꦢ', top: '40%', right: '3%', delay: '4s' },
  ];

  const infoCards = [
    {
      icon: 'fa-user',
      title: 'Tentang Saya',
      body: 'Saya seorang pelajar SMA yang memiliki ketertarikan pada dunia pemrograman. Saya aktif membangun proyek edukasi berbasis web.',
    },
    {
      icon: 'fa-lightbulb',
      title: 'Motivasi Proyek',
      body: 'Website ini berawal dari kepedulian saya terhadap minimnya media belajar aksara Jawa yang interaktif dan menarik. Tujuannya membantu siswa menghafal aksara dan menumbuhkan minat pada budaya leluhur, selain itu juga website ini dibuat secara mendadak untuk persiapan ulangan.',
    },
    {
      icon: 'fa-graduation-cap',
      title: 'Pendidikan',
      body: 'Saat ini saya menempuh pendidikan di <strong style="color:#E0AE42">SMA Negeri 1 Weleri</strong>. Saya aktif belajar web development secara mandiri, dan percaya bahwa anak muda bisa menjaga warisan budaya melalui teknologi.',
    },
    {
      icon: 'fa-map-marker-alt',
      title: 'Lokasi',
      body: 'Berbasis di <strong style="color:#E0AE42">Weleri, Kab Kendal, Prov. Jawa Tengah, Indonesia</strong> — aktif mengembangkan proyek-proyek digital.',
    },
    {
      icon: 'fa-star',
      title: 'Versi Website',
      body: 'Sinau Aksara Jawa — Sinau Seko Nol <strong style="color:#E0AE42">v1.6APR.26</strong> — dibangun dengan React + Vite. Font aksara: Noto Sans Javanese (Google Fonts).',
    },
    {
      icon: 'fa-heart',
      title: 'Dedikasi',
      body: 'Website ini didedikasikan untuk seluruh pecinta aksara dan budaya Jawa, serta pelajar di seluruh penjuru Nusantara.',
    },
  ];

  const techChips = [
    { icon: 'fa-brands fa-react', label: 'React 18' },
    { icon: 'fa-solid fa-bolt', label: 'Vite' },
    { icon: 'fa-brands fa-js', label: 'TypeScript' },
    { icon: 'fa-solid fa-font', label: 'Noto Sans Javanese' },
    { icon: 'fa-solid fa-icons', label: 'Font Awesome 6' },
    { icon: 'fa-solid fa-language', label: 'Unicode Javanese' },
    { icon: 'fa-solid fa-palette', label: 'Pure CSS Animations' },
    { icon: 'fa-solid fa-cube', label: 'CSS 3D Transforms' },
  ];

  return (
    <div style={{
      background: 'linear-gradient(160deg, #1A0800 0%, #2E0D04 40%, #5C2008 100%)',
      minHeight: '100vh', position: 'relative',
    }}>
      {/* Floating aksara */}
      {floats.map((f, i) => (
        <span
          key={i}
          style={{
            position: 'absolute', fontFamily: "'Noto Sans Javanese', serif",
            fontSize: '3.5rem', color: '#C8921E', opacity: 0.06,
            pointerEvents: 'none', userSelect: 'none',
            animation: `crFloat 10s ease-in-out infinite`,
            animationDelay: f.delay,
            top: f.top, left: (f as any).left, right: (f as any).right,
          }}
        >
          {f.ch}
        </span>
      ))}

      {/* Hero section */}
      <div style={{ padding: '80px 24px 60px', textAlign: 'center', position: 'relative' }}>
        {/* Decorative rings */}
        {[260, 320, 390].map((s, i) => (
          <div key={i} style={{
            position: 'absolute', left: '50%', top: `${100 - i * 30}px`,
            transform: 'translateX(-50%)',
            width: `${s}px`, height: `${s}px`,
            borderRadius: '50%',
            border: '1px solid rgba(200,146,30,0.15)',
            animation: 'ringExpand 4s ease-in-out infinite',
            animationDelay: `${i * 0.8}s`,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Avatar */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '28px' }}>
          <img
            src="https://i.ibb.co/3m8wN3tD/wmremove-transformed-1.png"
            alt="Muhammad David Aryanto"
            style={{
              width: '140px', height: '140px', borderRadius: '50%',
              border: '3px solid #C8921E', objectFit: 'cover', display: 'block',
              boxShadow: '0 0 0 6px rgba(200,146,30,0.2), 0 12px 40px rgba(0,0,0,0.5)',
              animation: 'avatarFloat 5s ease-in-out infinite',
            }}
          />
          <div style={{
            position: 'absolute', bottom: '-6px', right: '-6px',
            background: 'linear-gradient(135deg, #C8921E, #E0AE42)',
            width: '36px', height: '36px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.95rem', color: '#5C2008',
            boxShadow: '0 3px 12px rgba(200,146,30,0.5)',
            animation: 'badgePulse 2s ease-in-out infinite',
          }}>
            <i className="fa-solid fa-code" />
          </div>
        </div>

        <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(1.6rem,4vw,2.6rem)', color: '#E0AE42', marginBottom: '6px', letterSpacing: '0.06em', animation: 'fadeInUp 0.8s ease 0.2s both' }}>
          Muhammad David Aryanto
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,201,106,0.5)', marginBottom: '24px', animation: 'fadeInUp 0.8s ease 0.3s both' }}>
          <i className="fa-solid fa-laptop-code" style={{ marginRight: '7px' }} />
          Pelajar · Web Developer · Tech Enthusiast
        </div>
        <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '1.05rem', color: 'rgba(240,201,106,0.7)', maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.75, animation: 'fadeInUp 0.8s ease 0.4s both' }}>
          "Aksara Jawa bukan hanya huruf — ia adalah jendela menuju kearifan luhur nenek moyang kita."
        </p>

        {/* Social links */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '52px', animation: 'fadeInUp 0.8s ease 0.5s both' }}>
          <a href="#" className="soc-btn-gold" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 600, padding: '10px 20px', borderRadius: '50px', background: 'linear-gradient(135deg, #C8921E, #E0AE42)', color: '#5C2008', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '7px', boxShadow: '0 4px 14px rgba(200,146,30,0.4)', transition: '0.28s' }}>
            <i className="fa-brands fa-github" /> GitHub
          </a>
          <a href="https://github.com/MuhammadDavidd" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 600, padding: '10px 20px', borderRadius: '50px', background: 'transparent', color: '#F0C96A', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '7px', border: '1.5px solid rgba(200,146,30,0.4)', transition: '0.28s' }}>
            <i className="fa-brands fa-instagram" /> Instagram
          </a>
          <a href="https://www.instagram.com/dappkanaeruu?igsh=MWkzdmNkcnRlNW9oMg==" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 600, padding: '10px 20px', borderRadius: '50px', background: 'transparent', color: '#F0C96A', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '7px', border: '1.5px solid rgba(200,146,30,0.4)', transition: '0.28s' }}>
            <i className="fa-solid fa-envelope" /> Email
          </a>
        </div>
      </div>

      {/* Info cards */}
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: '18px', padding: '0 24px 52px', animation: 'fadeInUp 0.8s ease 0.55s both' }}>
        {infoCards.map((c, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(200,146,30,0.2)',
              borderRadius: '18px', padding: '26px 22px',
              backdropFilter: 'blur(8px)',
              transition: '0.28s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,146,30,0.08)'; e.currentTarget.style.borderColor = 'rgba(200,146,30,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(200,146,30,0.2)'; e.currentTarget.style.transform = ''; }}
          >
            <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, rgba(200,146,30,0.25), rgba(200,146,30,0.1))', border: '1px solid rgba(200,146,30,0.3)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#E0AE42', marginBottom: '14px' }}>
              <i className={`fa-solid ${c.icon}`} />
            </div>
            <h4 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '0.85rem', color: '#F0C96A', marginBottom: '8px' }}>{c.title}</h4>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: 'rgba(240,201,106,0.55)', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: c.body }} />
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <div style={{ textAlign: 'center', padding: '0 24px 52px', animation: 'fadeInUp 0.8s ease 0.65s both' }}>
        <h4 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1rem', color: '#E0AE42', marginBottom: '18px', letterSpacing: '0.05em' }}>
          <i className="fa-solid fa-wrench" style={{ marginRight: '8px' }} />Dibangun dengan
        </h4>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {techChips.map((t, i) => (
            <span
              key={i}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', fontWeight: 600, padding: '7px 16px', borderRadius: '20px', border: '1px solid rgba(200,146,30,0.25)', color: 'rgba(240,201,106,0.6)', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: '0.28s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,146,30,0.1)'; e.currentTarget.style.borderColor = 'rgba(200,146,30,0.45)'; e.currentTarget.style.color = '#F0C96A'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(200,146,30,0.25)'; e.currentTarget.style.color = 'rgba(240,201,106,0.6)'; }}
            >
              <i className={t.icon} /> {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '0 24px 60px', animation: 'fadeInUp 0.8s ease 0.75s both' }}>
        <blockquote style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(240,201,106,0.55)', lineHeight: 1.85, padding: '24px', border: '1px solid rgba(200,146,30,0.15)', borderRadius: '18px', background: 'rgba(200,146,30,0.04)', position: 'relative' }}>
          <span style={{ position: 'absolute', fontFamily: "'Cinzel Decorative', serif", fontSize: '4rem', color: 'rgba(200,146,30,0.25)', top: '-10px', left: '14px', lineHeight: 1 }}>"</span>
          Hana caraka data sawala, padha jayanya maga bathanga —<br />
          Ada dua utusan yang berselisih, keduanya sama saktinya, keduanya gugur.
          <cite style={{ display: 'block', marginTop: '10px', fontSize: '0.78rem', color: 'rgba(200,146,30,0.4)', letterSpacing: '0.1em', fontStyle: 'normal', textTransform: 'uppercase' }}>
            — Filosofi Aksara Jawa
          </cite>
        </blockquote>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(200,146,30,0.15)', padding: '24px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.73rem', color: 'rgba(240,201,106,0.3)', letterSpacing: '0.06em' }}>
          &copy; 2026 Aksara Jawa — Belajar dari Nol. Dibuat oleh Muhammad David Aryanto.
        </p>
        <div style={{ fontFamily: "'Noto Sans Javanese', serif", fontSize: '1.5rem', color: 'rgba(200,146,30,0.15)', marginTop: '12px', letterSpacing: '0.15em' }}>
          ꧋ꦲꦤꦕꦫꦏꦢꦠꦱꦮꦭꦥꦝꦗꦪꦚꦩꦒꦧꦛꦔ꧌
        </div>
      </div>

      <style>{`
        @keyframes crFloat { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-20px) rotate(5deg)} }
        @keyframes ringExpand { 0%,100%{opacity:.5;transform:translateX(-50%) scale(1)} 50%{opacity:.15;transform:translateX(-50%) scale(1.04)} }
        @keyframes avatarFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes badgePulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
