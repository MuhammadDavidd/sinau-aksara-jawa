import { useState, useRef } from 'react';
import { toJw } from '../data/aksara';

function showToast(msg: string) {
  const t = document.getElementById('aj-toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

export default function NamaPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('ꦲꦏ꧀ꦱꦫꦗꦮ');
  const [echo, setEcho] = useState('Ketik nama untuk memulai');
  const [animKey, setAnimKey] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const doConvert = (val: string) => {
    const v = val.trim();
    if (!v) {
      setOutput('ꦲꦏ꧀ꦱꦫꦗꦮ');
      setEcho('Ketik nama untuk memulai');
      return;
    }
    setAnimKey(k => k + 1);
    setTimeout(() => {
      setOutput(toJw(v) || '—');
      setEcho(v.toUpperCase());
    }, 0);
  };

  const handleInput = (v: string) => { setInput(v); doConvert(v); };
  const setNm = (n: string) => { setInput(n); doConvert(n); };

  const copyNama = async () => {
    try {
      await navigator.clipboard.writeText(output);
      showToast('✓ Aksara disalin!');
    } catch {
      showToast('Gagal menyalin');
    }
  };

  const downloadNama = () => {
    const cv = canvasRef.current;
    if (!cv) return;
    cv.style.display = 'block';
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const W = 860, H = 320;
    ctx.clearRect(0, 0, W, H);
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, '#5C2008'); g.addColorStop(0.5, '#2E0D04'); g.addColorStop(1, '#7A2E12');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(200,146,30,.6)'; ctx.lineWidth = 3; ctx.strokeRect(14, 14, W - 28, H - 28);
    ctx.strokeStyle = 'rgba(200,146,30,.2)'; ctx.lineWidth = 1; ctx.strokeRect(24, 24, W - 48, H - 48);
    ctx.fillStyle = '#E0AE42';
    ctx.font = 'bold 88px "Noto Sans Javanese", serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(200,146,30,.4)'; ctx.shadowBlur = 22;
    ctx.fillText(output, W / 2, H / 2 - 10);
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(240,201,106,.4)';
    ctx.font = '400 18px "DM Sans", sans-serif';
    ctx.fillText(input.toUpperCase(), W / 2, H / 2 + 62);
    ctx.fillStyle = 'rgba(200,146,30,.25)';
    ctx.font = '12px sans-serif';
    ctx.fillText('Aksara Jawa — Belajar dari Nol', W / 2, H - 26);
    const a = document.createElement('a');
    a.download = `aksara-${(input || 'jawa').replace(/\s+/g, '_')}.png`;
    a.href = cv.toDataURL('image/png');
    a.click();
    cv.style.display = 'none';
    showToast('↓ Gambar diunduh!');
  };

  const shareNama = async () => {
    const txt = `Namaku dalam Aksara Jawa: ${output}`;
    if (navigator.share) {
      await navigator.share({ title: 'Aksara Jawa', text: txt });
    } else {
      await navigator.clipboard.writeText(txt);
      showToast('⬡ Teks disalin!');
    }
  };

  const examples = ['Budi', 'Sari', 'Rahmat', 'Dewi', 'Joko', 'Pratiwi', 'Agung', 'Wahyu', 'Listya', 'Hana', 'Nanda', 'Candra'];

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #5C2008 0%, #3A1005 55%, #7A2E12 100%)',
        padding: '52px 24px 40px', textAlign: 'center',
        borderBottom: '3px solid #C8921E', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(200,146,30,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', fontFamily: "'Noto Sans Javanese', serif", fontSize: '9rem', color: '#C8921E', opacity: 0.05, top: '50%', transform: 'translateY(-50%)', left: '-20px' }}>ꦩ</div>
        <div style={{ position: 'absolute', fontFamily: "'Noto Sans Javanese', serif", fontSize: '9rem', color: '#C8921E', opacity: 0.05, top: '50%', transform: 'translateY(-50%)', right: '-20px' }}>ꦚ</div>
        <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(1.1rem,3.5vw,1.9rem)', color: '#E0AE42', marginBottom: '7px', position: 'relative', letterSpacing: '0.05em' }}>
          <i className="fa-solid fa-pen-nib" style={{ color: '#C8921E', marginRight: '9px' }} />Tulis Namamu dalam Aksara Jawa
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'rgba(240,201,106,0.6)', position: 'relative' }}>Ubah namamu menjadi tulisan aksara yang indah</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '14px', position: 'relative' }}>
          <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, #C8921E)' }} />
          <span style={{ fontFamily: "'Noto Sans Javanese', serif", fontSize: '1.1rem', color: '#C8921E' }}>꧁</span>
          <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(90deg, #C8921E, transparent)' }} />
        </div>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '36px 24px 80px' }}>
        <div style={{
          display: 'flex', gap: '10px', alignItems: 'flex-start',
          background: 'linear-gradient(135deg, rgba(200,146,30,0.07), rgba(200,146,30,0.03))',
          border: '1px solid rgba(200,146,30,0.22)', borderLeft: '4px solid #C8921E',
          borderRadius: '0 10px 10px 0', padding: '13px 16px', marginBottom: '22px',
          fontFamily: "'Lora', serif", fontSize: '0.9rem', color: '#6B3518', lineHeight: 1.65,
        }}>
          <i className="fa-solid fa-lightbulb" style={{ color: '#C8921E', marginTop: '2px', flexShrink: 0 }} />
          <span>Gunakan ejaan fonetik Indonesia. Contoh: "Budi", "Sari", "Rahmat". Aksara ditampilkan menggunakan font Noto Sans Javanese.</span>
        </div>

        {/* Input row */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <input
            value={input}
            onChange={e => handleInput(e.target.value)}
            placeholder="Ketik namamu… (cth: Budi, Sari, Rahma)"
            style={{
              flex: 1, minWidth: '200px',
              fontFamily: "'DM Sans', sans-serif", fontSize: '1rem',
              padding: '14px 18px', borderRadius: '50px',
              border: '2px solid rgba(200,146,30,0.3)',
              background: '#FFFCF2', color: '#1A0800',
              outline: 'none', transition: '0.28s',
            }}
            onFocus={e => { e.target.style.borderColor = '#C8921E'; e.target.style.boxShadow = '0 0 0 4px rgba(200,146,30,0.12)'; }}
            onBlur={e => { e.target.style.borderColor = 'rgba(200,146,30,0.3)'; e.target.style.boxShadow = ''; }}
          />
          <button
            onClick={() => doConvert(input)}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 600,
              padding: '14px 22px', borderRadius: '50px', border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #5C2008, #7A2E12)', color: '#F0C96A',
              boxShadow: '0 4px 14px rgba(92,32,8,0.32)',
              display: 'flex', alignItems: 'center', gap: '7px', transition: '0.28s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(92,32,8,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 14px rgba(92,32,8,0.32)'; }}
          >
            <i className="fa-solid fa-wand-magic-sparkles" /> Ubah
          </button>
        </div>

        {/* Result display */}
        <div style={{
          background: 'linear-gradient(145deg, #5C2008 0%, #2E0D04 60%, #7A2E12 100%)',
          border: '2px solid rgba(200,146,30,0.35)',
          borderRadius: '20px', padding: '32px 24px', textAlign: 'center',
          marginBottom: '24px', boxShadow: '0 10px 40px rgba(92,32,8,0.4)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '10px', left: '10px', fontFamily: "'Noto Sans Javanese', serif", fontSize: '1.5rem', color: '#C8921E', opacity: 0.1 }}>꧁</div>
          <div style={{ position: 'absolute', top: '10px', right: '10px', fontFamily: "'Noto Sans Javanese', serif", fontSize: '1.5rem', color: '#C8921E', opacity: 0.1 }}>꧂</div>
          <div style={{ position: 'absolute', bottom: '10px', left: '10px', fontFamily: "'Noto Sans Javanese', serif", fontSize: '1.5rem', color: '#C8921E', opacity: 0.1 }}>꧁</div>
          <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontFamily: "'Noto Sans Javanese', serif", fontSize: '1.5rem', color: '#C8921E', opacity: 0.1 }}>꧂</div>
          <div
            key={animKey}
            style={{
              fontFamily: "'Noto Sans Javanese', serif",
              fontSize: 'clamp(2.5rem, 10vw, 5rem)',
              color: '#E0AE42', lineHeight: 1.4,
              textShadow: '0 2px 24px rgba(200,146,30,0.5)',
              animation: 'namaPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
              marginBottom: '12px',
            }}
          >
            {output}
          </div>
          <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '0.88rem', color: 'rgba(240,201,106,0.45)', letterSpacing: '0.15em' }}>
            {echo}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
          <button
            onClick={copyNama}
            style={{ flex: 1, fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600, padding: '12px 18px', background: 'linear-gradient(135deg, #C8921E, #E0AE42)', color: '#5C2008', border: 'none', borderRadius: '50px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(200,146,30,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: '0.28s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(200,146,30,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 14px rgba(200,146,30,0.35)'; }}
          >
            <i className="fa-solid fa-copy" /> Salin
          </button>
          <button
            onClick={downloadNama}
            style={{ flex: 1, fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600, padding: '12px 18px', background: 'transparent', color: '#C8921E', border: '2px solid #C8921E', borderRadius: '50px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: '0.28s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,146,30,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = ''; }}
          >
            <i className="fa-solid fa-download" /> Unduh Gambar
          </button>
          <button
            onClick={shareNama}
            style={{ flex: 1, fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600, padding: '12px 18px', background: 'transparent', color: '#6B3518', border: '2px solid rgba(92,32,8,0.25)', borderRadius: '50px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: '0.28s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(92,32,8,0.07)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = ''; }}
          >
            <i className="fa-solid fa-share-nodes" /> Bagikan
          </button>
        </div>

        {/* Examples */}
        <div style={{ background: '#FFFCF2', border: '1px solid rgba(200,146,30,0.22)', borderRadius: '14px', padding: '18px 20px' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', fontWeight: 600, color: '#C8921E', marginBottom: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <i className="fa-solid fa-sparkles" /> Coba nama ini:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {examples.map(nm => (
              <button
                key={nm}
                onClick={() => setNm(nm)}
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', fontWeight: 500,
                  padding: '7px 15px', borderRadius: '20px', cursor: 'pointer',
                  border: '1.5px solid rgba(200,146,30,0.25)',
                  background: input === nm ? '#5C2008' : 'transparent',
                  color: input === nm ? '#F0C96A' : '#6B3518',
                  transition: '0.28s',
                }}
                onMouseEnter={e => { if (input !== nm) { e.currentTarget.style.borderColor = '#C8921E'; e.currentTarget.style.background = 'rgba(200,146,30,0.1)'; } }}
                onMouseLeave={e => { if (input !== nm) { e.currentTarget.style.borderColor = 'rgba(200,146,30,0.25)'; e.currentTarget.style.background = 'transparent'; } }}
              >
                {nm}
              </button>
            ))}
          </div>
        </div>

        {/* Hidden canvas for download */}
        <canvas ref={canvasRef} width={860} height={320} style={{ display: 'none' }} />
      </div>

      <style>{`
        @keyframes namaPop { 0%{transform:scale(.8);opacity:0} 100%{transform:scale(1);opacity:1} }
      `}</style>
    </div>
  );
}
