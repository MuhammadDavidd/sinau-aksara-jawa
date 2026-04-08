import { useState } from 'react';
import { D, SAND_FULL, AksaraItem } from '../data/aksara';

function speak(txt: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(txt.replace('Pa-', ''));
  u.lang = 'id-ID'; u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

function AksaraCard({ item }: { item: AksaraItem }) {
  return (
    <div
      onClick={() => speak(item.l)}
      title={item.e}
      style={{
        background: '#FFFCF2', border: '1.5px solid rgba(200,146,30,0.22)',
        borderRadius: '10px', padding: '16px 10px 13px',
        textAlign: 'center', cursor: 'pointer',
        transition: '0.28s cubic-bezier(0.34,1.56,0.64,1)',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(92,32,8,0.09)',
      }}
      onMouseEnter={e => {
        const card = e.currentTarget;
        card.style.transform = 'translateY(-5px)';
        card.style.borderColor = '#C8921E';
        card.style.boxShadow = '0 10px 24px rgba(92,32,8,0.2)';
        const jw = card.querySelector('.jw-char') as HTMLElement;
        if (jw) { jw.style.transform = 'scale(1.12)'; jw.style.color = '#C8921E'; }
        const sb = card.querySelector('.sound-btn') as HTMLElement;
        if (sb) sb.style.opacity = '1';
      }}
      onMouseLeave={e => {
        const card = e.currentTarget;
        card.style.transform = '';
        card.style.borderColor = 'rgba(200,146,30,0.22)';
        card.style.boxShadow = '0 2px 8px rgba(92,32,8,0.09)';
        const jw = card.querySelector('.jw-char') as HTMLElement;
        if (jw) { jw.style.transform = ''; jw.style.color = '#5C2008'; }
        const sb = card.querySelector('.sound-btn') as HTMLElement;
        if (sb) sb.style.opacity = '0';
      }}
    >
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2.5px', background: 'linear-gradient(90deg, #C8921E, #E0AE42)', transform: 'scaleX(0)', transition: '0.28s', transformOrigin: 'left' }} className="card-underline" />
      <i className="fa-solid fa-volume-high sound-btn" style={{ position: 'absolute', top: '6px', right: '7px', fontSize: '0.62rem', color: '#C8921E', opacity: 0, transition: '0.28s' }} />
      <span
        className="jw-char"
        style={{
          fontFamily: "'Noto Sans Javanese', serif",
          fontSize: '2.5rem', color: '#5C2008',
          display: 'block', marginBottom: '8px', lineHeight: 1.35,
          transition: '0.28s',
        }}
      >{item.j}</span>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: '#C8921E', display: 'block', marginBottom: '2px' }}>{item.l}</span>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: '#A06030' }}>{item.e}</span>
    </div>
  );
}

type Tab = 'ngl' | 'pas' | 'san' | 'mur' | 'swa' | 'rek' | 'wil';

export default function MateriPage() {
  const [activeTab, setActiveTab] = useState<Tab>('ngl');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const tabs: { id: Tab; icon: string; label: string }[] = [
    { id: 'ngl', icon: 'fa-font', label: 'Nglegena' },
    { id: 'pas', icon: 'fa-link', label: 'Pasangan' },
    { id: 'san', icon: 'fa-music', label: 'Sandhangan' },
    { id: 'mur', icon: 'fa-crown', label: 'Murda' },
    { id: 'swa', icon: 'fa-volume-high', label: 'Swara' },
    { id: 'rek', icon: 'fa-globe', label: 'Rekan' },
    { id: 'wil', icon: 'fa-hashtag', label: 'Wilangan' },
  ];

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
        <div style={{ position: 'absolute', fontFamily: "'Noto Sans Javanese', serif", fontSize: '9rem', color: '#C8921E', opacity: 0.05, top: '50%', transform: 'translateY(-50%)', left: '-20px' }}>ꦲ</div>
        <div style={{ position: 'absolute', fontFamily: "'Noto Sans Javanese', serif", fontSize: '9rem', color: '#C8921E', opacity: 0.05, top: '50%', transform: 'translateY(-50%)', right: '-20px' }}>ꦏ</div>
        <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(1.3rem,3.5vw,2.1rem)', color: '#E0AE42', marginBottom: '7px', position: 'relative', letterSpacing: '0.05em' }}>
          <i className="fa-solid fa-book-open" style={{ color: '#C8921E', marginRight: '9px' }} />
          Materi Aksara Jawa
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'rgba(240,201,106,0.6)', position: 'relative' }}>
          Panduan lengkap dari huruf dasar hingga angka Jawa
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '14px', position: 'relative' }}>
          <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, #C8921E)' }} />
          <span style={{ fontFamily: "'Noto Sans Javanese', serif", fontSize: '1.1rem', color: '#C8921E' }}>꧁</span>
          <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(90deg, #C8921E, transparent)' }} />
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '36px 24px 80px' }}>
        {/* Tab nav */}
        <div style={{
          display: 'flex', gap: '5px', flexWrap: 'wrap',
          background: '#F5EAD0', border: '1px solid rgba(200,146,30,0.22)',
          padding: '7px', borderRadius: '18px', marginBottom: '24px',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', fontWeight: 500,
                padding: '9px 14px', border: 'none', borderRadius: '10px',
                background: activeTab === tab.id ? 'linear-gradient(135deg, #5C2008, #7A2E12)' : 'transparent',
                color: activeTab === tab.id ? '#F0C96A' : '#6B3518',
                cursor: 'pointer', transition: '0.28s',
                display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap',
                boxShadow: activeTab === tab.id ? '0 3px 10px rgba(92,32,8,0.35)' : 'none',
              }}
            >
              <i className={`fa-solid ${tab.icon}`} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content sections */}
        {activeTab !== 'san' && (
          <div style={{ background: '#FFFCF2', border: '1px solid rgba(200,146,30,0.22)', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(92,32,8,0.09)' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 22px',
              background: 'linear-gradient(90deg, #FAE4A8, #F5EAD0)',
              borderBottom: '1px solid rgba(200,146,30,0.22)',
            }}>
              <i className={`fa-solid ${tabs.find(t => t.id === activeTab)?.icon}`} style={{ color: '#C8921E', fontSize: '1rem' }} />
              <h4 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '0.9rem', color: '#5C2008', margin: 0 }}>
                {activeTab === 'ngl' && 'Aksara Nglegena — 20 Huruf Dasar Hanacaraka'}
                {activeTab === 'pas' && 'Aksara Pasangan — Penghubung Konsonan'}
                {activeTab === 'mur' && 'Aksara Murda — Huruf Kapital Jawa'}
                {activeTab === 'swa' && 'Aksara Swara — Vokal Mandiri'}
                {activeTab === 'rek' && 'Aksara Rekan — Serapan Bahasa Asing'}
                {activeTab === 'wil' && 'Aksara Wilangan — Angka Jawa (0–9)'}
              </h4>
            </div>
            <div style={{ padding: '22px' }}>
              <div style={{
                display: 'flex', gap: '10px', alignItems: 'flex-start',
                background: 'linear-gradient(135deg, rgba(200,146,30,0.07), rgba(200,146,30,0.03))',
                border: '1px solid rgba(200,146,30,0.22)', borderLeft: '4px solid #C8921E',
                borderRadius: '0 10px 10px 0', padding: '13px 16px', marginBottom: '18px',
                fontFamily: "'Lora', serif", fontSize: '0.9rem', color: '#6B3518', lineHeight: 1.65,
              }}>
                <i className="fa-solid fa-circle-info" style={{ color: '#C8921E', marginTop: '2px', flexShrink: 0 }} />
                <span>
                  {activeTab === 'ngl' && 'Aksara Nglegena adalah 20 huruf dasar sistem Hanacaraka. Setiap huruf membawa bunyi konsonan + vokal "a" secara bawaan. Klik kartu untuk mendengar pelafalannya!'}
                  {activeTab === 'pas' && 'Pasangan ditulis di bawah/samping huruf untuk menghilangkan vokal "a" bawaan, memungkinkan dua konsonan bergabung tanpa vokal di antara keduanya.'}
                  {activeTab === 'mur' && 'Aksara Murda digunakan untuk menulis nama orang terhormat, gelar kehormatan, atau nama tempat istimewa.'}
                  {activeTab === 'swa' && 'Aksara Swara untuk menulis vokal yang berdiri sendiri di awal kata atau suku kata tanpa konsonan sebelumnya.'}
                  {activeTab === 'rek' && 'Aksara Rekan untuk bunyi konsonan dari bahasa Arab, Persia, dan bahasa asing lainnya yang tidak ada dalam aksara asli Jawa.'}
                  {activeTab === 'wil' && 'Sistem angka Jawa yang digunakan dalam naskah kuno dan prasasti Jawa.'}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(118px,1fr))', gap: '11px' }}>
                {D[activeTab]?.map((item, i) => (
                  <AksaraCard key={i} item={item} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sandhangan responsive table */}
        {activeTab === 'san' && (
          <div style={{ background: '#FFFCF2', border: '1px solid rgba(200,146,30,0.22)', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(92,32,8,0.09)' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 22px',
              background: 'linear-gradient(90deg, #FAE4A8, #F5EAD0)',
              borderBottom: '1px solid rgba(200,146,30,0.22)',
            }}>
              <i className="fa-solid fa-music" style={{ color: '#C8921E', fontSize: '1rem' }} />
              <h4 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '0.9rem', color: '#5C2008', margin: 0 }}>
                Sandhangan — Penanda Vokal & Tanda Baca
              </h4>
            </div>
            <div style={{ padding: '22px' }}>
              <div style={{
                display: 'flex', gap: '10px', alignItems: 'flex-start',
                background: 'linear-gradient(135deg, rgba(200,146,30,0.07), rgba(200,146,30,0.03))',
                border: '1px solid rgba(200,146,30,0.22)', borderLeft: '4px solid #C8921E',
                borderRadius: '0 10px 10px 0', padding: '13px 16px', marginBottom: '18px',
                fontFamily: "'Lora', serif", fontSize: '0.9rem', color: '#6B3518', lineHeight: 1.65,
              }}>
                <i className="fa-solid fa-circle-info" style={{ color: '#C8921E', marginTop: '2px', flexShrink: 0 }} />
                <span>Sandhangan adalah tanda diakritik yang mengubah vokal pada aksara. Klik baris untuk melihat detail lebih lanjut.</span>
              </div>

              {/* Mobile card view */}
              <div className="sandh-cards">
                {SAND_FULL.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                    style={{
                      border: '1px solid rgba(200,146,30,0.22)',
                      borderRadius: '12px',
                      marginBottom: '10px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: '0.28s',
                      boxShadow: expandedRow === i ? '0 4px 18px rgba(92,32,8,0.15)' : '0 2px 6px rgba(92,32,8,0.06)',
                    }}
                  >
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 16px',
                      background: expandedRow === i ? 'linear-gradient(90deg, rgba(200,146,30,0.12), rgba(200,146,30,0.05))' : '#FFFCF2',
                    }}>
                      <span style={{ fontFamily: "'Noto Sans Javanese', serif", fontSize: '2.4rem', color: '#5C2008', minWidth: '60px', textAlign: 'center' }}>{s.j}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, color: '#5C2008', fontSize: '0.95rem' }}>{s.n}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: '#6B3518', marginTop: '2px' }}>{s.f}</div>
                        <div style={{ fontFamily: "'Noto Sans Javanese', serif", fontSize: '1.3rem', color: '#C8921E', marginTop: '4px' }}>{s.c}</div>
                      </div>
                      <i className={`fa-solid fa-chevron-${expandedRow === i ? 'up' : 'down'}`} style={{ color: '#C8921E', fontSize: '0.8rem', transition: '0.28s' }} />
                    </div>
                    {expandedRow === i && (
                      <div style={{
                        padding: '14px 16px',
                        background: 'linear-gradient(135deg, rgba(200,146,30,0.05), rgba(250,228,168,0.2))',
                        borderTop: '1px solid rgba(200,146,30,0.15)',
                      }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: '#6B3518', lineHeight: 1.7 }}>
                          <i className="fa-solid fa-lightbulb" style={{ color: '#C8921E', marginRight: '7px' }} />
                          {s.detail}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop table */}
              <div className="sandh-table-wrap" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', fontWeight: 600, color: '#F0C96A', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '11px 14px', textAlign: 'center', background: 'linear-gradient(135deg, #5C2008, #7A2E12)' }}>
                        <i className="fa-solid fa-font" /> Aksara
                      </th>
                      <th style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', fontWeight: 600, color: '#F0C96A', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '11px 14px', textAlign: 'left', background: 'linear-gradient(135deg, #5C2008, #7A2E12)' }}>
                        <i className="fa-solid fa-tag" /> Nama
                      </th>
                      <th style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', fontWeight: 600, color: '#F0C96A', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '11px 14px', textAlign: 'left', background: 'linear-gradient(135deg, #5C2008, #7A2E12)' }}>
                        <i className="fa-solid fa-info-circle" /> Fungsi
                      </th>
                      <th style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', fontWeight: 600, color: '#F0C96A', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '11px 14px', textAlign: 'left', background: 'linear-gradient(135deg, #5C2008, #7A2E12)' }}>
                        <i className="fa-solid fa-pen" /> Contoh
                      </th>
                      <th style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', fontWeight: 600, color: '#F0C96A', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '11px 14px', textAlign: 'left', background: 'linear-gradient(135deg, #5C2008, #7A2E12)' }}>
                        <i className="fa-solid fa-circle-info" /> Detail
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {SAND_FULL.map((s, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(200,146,30,0.09)' }}>
                        <td style={{ fontFamily: "'Noto Sans Javanese', serif", fontSize: '2.2rem', textAlign: 'center', width: '68px', color: '#5C2008', padding: '13px 14px', verticalAlign: 'middle' }}>{s.j}</td>
                        <td style={{ padding: '13px 14px', verticalAlign: 'middle' }}>
                          <strong style={{ fontFamily: "'Lora', serif", fontWeight: 600, color: '#5C2008', display: 'block', marginBottom: '2px' }}>{s.n}</strong>
                        </td>
                        <td style={{ fontFamily: "'Lora', serif", fontSize: '0.88rem', color: '#6B3518', padding: '13px 14px', verticalAlign: 'middle' }}>{s.f}</td>
                        <td style={{ fontFamily: "'Noto Sans Javanese', serif", fontSize: '1.2rem', color: '#C8921E', padding: '13px 14px', verticalAlign: 'middle' }}>{s.c}</td>
                        <td style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.76rem', color: '#A06030', padding: '13px 14px', verticalAlign: 'middle', lineHeight: 1.55 }}>{s.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media(max-width: 640px) {
          .sandh-table-wrap { display: none !important; }
          .sandh-cards { display: block !important; }
        }
        @media(min-width: 641px) {
          .sandh-table-wrap { display: block !important; }
          .sandh-cards { display: none !important; }
        }
      `}</style>
    </div>
  );
}
