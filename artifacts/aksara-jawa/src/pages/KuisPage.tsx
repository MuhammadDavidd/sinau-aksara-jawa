import { useState, useEffect, useRef } from 'react';
import { D, ALL, AksaraItem, shuf, msgs } from '../data/aksara';

type KuisType = 'dasar' | 'pasangan' | 'sandhangan' | 'campuran' | 'wilangan' | 'murda' | null;
type Screen = 'sel' | 'game' | 'result';

const kuisCats = [
  { type: 'dasar' as KuisType, ico: 'fa-seedling', title: 'Kuis Dasar', sub: 'Aksara Nglegena — 10 soal', color: '#2D5A3D' },
  { type: 'pasangan' as KuisType, ico: 'fa-link', title: 'Kuis Pasangan', sub: 'Aksara Pasangan — 10 soal', color: '#5C2008' },
  { type: 'sandhangan' as KuisType, ico: 'fa-music', title: 'Kuis Sandhangan', sub: 'Tanda vokal — 8 soal', color: '#7A2E12' },
  { type: 'campuran' as KuisType, ico: 'fa-shuffle', title: 'Kuis Campuran', sub: 'Semua jenis — 15 soal', color: '#9A3E1A' },
  { type: 'wilangan' as KuisType, ico: 'fa-hashtag', title: 'Angka Jawa', sub: 'Aksara Wilangan — 10 soal', color: '#B05A2A' },
  { type: 'murda' as KuisType, ico: 'fa-crown', title: 'Murda & Swara', sub: 'Kapital & Vokal — 10 soal', color: '#C8921E' },
];

export default function KuisPage() {
  const [screen, setScreen] = useState<Screen>('sel');
  const [kuisType, setKuisType] = useState<KuisType>(null);
  const [pool, setPool] = useState<AksaraItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [total, setTotal] = useState(10);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [options, setOptions] = useState<AksaraItem[]>([]);
  const [answered, setAnswered] = useState(false);
  const [chosenL, setChosenL] = useState('');
  const [correctL, setCorrectL] = useState('');
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);
  const [timer, setTimer] = useState(15);
  const [timerPct, setTimerPct] = useState(100);
  const [resultScore, setResultScore] = useState(0);
  const [resultLabel, setResultLabel] = useState('');
  const [resultMsg, setResultMsg] = useState('');
  const timRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTim = () => { if (timRef.current) clearInterval(timRef.current); };

  const startTimer = (item: AksaraItem, newTotal: number) => {
    clearTim();
    let tv = 15;
    setTimer(tv);
    setTimerPct(100);
    timRef.current = setInterval(() => {
      tv--;
      setTimer(tv);
      setTimerPct((tv / 15) * 100);
      if (tv <= 0) {
        clearTim();
        setAnswered(true);
        setWrong(w => w + 1);
        setFeedback({ ok: false, msg: 'Waktu habis!' });
        setTimeout(() => setIdx(i => i + 1), 1400);
      }
    }, 1000);
  };

  const buildOpts = (item: AksaraItem, p: AksaraItem[]) => {
    const extras = shuf([...ALL, ...p].filter(x => x.l !== item.l)).slice(0, 3);
    return shuf([...extras, item]);
  };

  useEffect(() => {
    if (screen !== 'game' || pool.length === 0) return;
    if (idx >= total) {
      clearTim();
      const pct = Math.round(correct / total * 100);
      setResultScore(pct);
      setResultLabel(`${correct} dari ${total} benar`);
      setResultMsg(msgs(pct));
      setScreen('result');
      return;
    }
    const item = pool[idx];
    setOptions(buildOpts(item, pool));
    setCorrectL(item.l);
    setAnswered(false);
    setChosenL('');
    setFeedback(null);
    startTimer(item, total);
    return () => clearTim();
  }, [idx, screen, pool]);

  const startKuis = (type: KuisType) => {
    setKuisType(type);
    let p: AksaraItem[] = [];
    let tot = 10;
    if (type === 'dasar') { p = D.ngl; tot = 10; }
    else if (type === 'pasangan') { p = D.pas; tot = 10; }
    else if (type === 'sandhangan') { p = D.san; tot = 8; }
    else if (type === 'campuran') { p = [...D.ngl, ...D.mur, ...D.swa, ...D.wil]; tot = 15; }
    else if (type === 'wilangan') { p = D.wil; tot = 10; }
    else { p = [...D.mur, ...D.swa]; tot = 10; }
    const sliced = shuf([...p]).slice(0, tot);
    setPool(sliced);
    setTotal(tot);
    setCorrect(0);
    setWrong(0);
    setIdx(0);
    setAnswered(false);
    setFeedback(null);
    setScreen('game');
  };

  const handleAnswer = (opt: AksaraItem) => {
    if (answered) return;
    clearTim();
    setAnswered(true);
    setChosenL(opt.l);
    if (opt.l === correctL) {
      setCorrect(c => c + 1);
      setFeedback({ ok: true, msg: `Benar! ${correctL}` });
    } else {
      setWrong(w => w + 1);
      setFeedback({ ok: false, msg: `Salah! Jawaban: ${correctL}` });
    }
    setTimeout(() => setIdx(i => i + 1), 1600);
  };

  const item = pool[idx] as AksaraItem | undefined;

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #5C2008 0%, #3A1005 55%, #7A2E12 100%)',
        padding: '52px 24px 40px', textAlign: 'center',
        borderBottom: '3px solid #C8921E', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(200,146,30,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', fontFamily: "'Noto Sans Javanese', serif", fontSize: '9rem', color: '#C8921E', opacity: 0.05, top: '50%', transform: 'translateY(-50%)', left: '-20px' }}>ꦭ</div>
        <div style={{ position: 'absolute', fontFamily: "'Noto Sans Javanese', serif", fontSize: '9rem', color: '#C8921E', opacity: 0.05, top: '50%', transform: 'translateY(-50%)', right: '-20px' }}>ꦧ</div>
        <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(1.3rem,3.5vw,2.1rem)', color: '#E0AE42', marginBottom: '7px', position: 'relative', letterSpacing: '0.05em' }}>
          <i className="fa-solid fa-trophy" style={{ color: '#C8921E', marginRight: '9px' }} />Kuis Aksara Jawa
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'rgba(240,201,106,0.6)', position: 'relative' }}>Uji pengetahuanmu secara terstruktur</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '14px', position: 'relative' }}>
          <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, #C8921E)' }} />
          <span style={{ fontFamily: "'Noto Sans Javanese', serif", fontSize: '1.1rem', color: '#C8921E' }}>꧁</span>
          <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(90deg, #C8921E, transparent)' }} />
        </div>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '36px 24px 80px' }}>
        {screen === 'sel' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.3rem', color: '#5C2008', marginBottom: '5px' }}>Pilih Kategori Kuis</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginTop: '12px' }}>
                <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, #C8921E)' }} />
                <i className="fa-solid fa-trophy" style={{ color: '#C8921E' }} />
                <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(90deg, #C8921E, transparent)' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px,1fr))', gap: '14px' }}>
              {kuisCats.map(cat => (
                <div
                  key={cat.type}
                  onClick={() => startKuis(cat.type)}
                  style={{
                    background: '#FFFCF2', border: '1.5px solid rgba(200,146,30,0.22)',
                    borderRadius: '18px', padding: '24px 18px', cursor: 'pointer', textAlign: 'center',
                    transition: '0.28s', boxShadow: '0 2px 10px rgba(92,32,8,0.09)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#C8921E'; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(92,32,8,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(200,146,30,0.22)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 10px rgba(92,32,8,0.09)'; }}
                >
                  <div style={{ width: '52px', height: '52px', background: `linear-gradient(135deg, ${cat.color}, ${cat.color}cc)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: `0 4px 14px ${cat.color}44` }}>
                    <i className={`fa-solid ${cat.ico}`} style={{ fontSize: '1.2rem', color: '#F0C96A' }} />
                  </div>
                  <h4 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '0.82rem', color: '#5C2008', marginBottom: '4px' }}>{cat.title}</h4>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: '#A06030' }}>{cat.sub}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {screen === 'game' && item && (
          <>
            <button onClick={() => { clearTim(); setScreen('sel'); }} style={{ marginBottom: '18px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 600, padding: '9px 18px', cursor: 'pointer', background: 'transparent', color: '#C8921E', border: '2px solid #C8921E', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="fa-solid fa-arrow-left" /> Kembali
            </button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFCF2', border: '1px solid rgba(200,146,30,0.22)', borderRadius: '18px', padding: '15px 20px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(92,32,8,0.09)' }}>
              <div style={{ textAlign: 'center' }}><span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.5rem', color: '#C8921E', display: 'block', lineHeight: 1 }}>{idx + 1}/{total}</span><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: '#A06030', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Soal</span></div>
              <div style={{ width: '1px', height: '38px', background: 'rgba(200,146,30,0.22)' }} />
              <div style={{ textAlign: 'center' }}><span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.5rem', color: '#2E7D32', display: 'block', lineHeight: 1 }}>{correct}</span><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: '#A06030', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Benar</span></div>
              <div style={{ width: '1px', height: '38px', background: 'rgba(200,146,30,0.22)' }} />
              <div style={{ textAlign: 'center' }}><span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.5rem', color: '#B71C1C', display: 'block', lineHeight: 1 }}>{wrong}</span><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: '#A06030', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Salah</span></div>
              <div style={{ width: '1px', height: '38px', background: 'rgba(200,146,30,0.22)' }} />
              <div style={{ textAlign: 'center' }}><span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.5rem', color: timer <= 5 ? '#B71C1C' : '#C8921E', display: 'block', lineHeight: 1 }}>{timer}</span><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: '#A06030', textTransform: 'uppercase', letterSpacing: '0.08em' }}><i className="fa-solid fa-clock" /></span></div>
            </div>
            <div style={{ height: '5px', background: '#F5EAD0', borderRadius: '3px', marginBottom: '24px', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: '3px', transition: 'width 1s linear, background 0.3s', width: `${timerPct}%`, background: timer <= 5 ? 'linear-gradient(90deg, #8B1A1A, #E53935)' : 'linear-gradient(90deg, #2D5A3D, #C8921E)' }} />
            </div>
            <div style={{ background: '#FFFCF2', border: '2px solid rgba(200,146,30,0.22)', borderRadius: '18px', padding: '34px', textAlign: 'center', boxShadow: '0 4px 22px rgba(92,32,8,0.09)', marginBottom: '20px', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(200,146,30,0.04) 0%, transparent 70%)', borderRadius: '18px' }} />
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8921E', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <i className="fa-solid fa-question-circle" /> Aksara apakah ini?
              </div>
              <span style={{ fontFamily: "'Noto Sans Javanese', serif", fontSize: 'clamp(4rem,14vw,7.5rem)', color: '#5C2008', lineHeight: 1.25, display: 'block', marginBottom: '6px', animation: 'qPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>{item.j}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {options.map((opt, i) => {
                const isChosen = answered && chosenL === opt.l;
                const isCorrect = answered && opt.l === correctL;
                const isWrong = answered && isChosen && opt.l !== correctL;
                let bg = '#FFFCF2';
                let borderColor = 'rgba(92,32,8,0.15)';
                let color = '#5C2008';
                if (isCorrect) { bg = 'linear-gradient(135deg, #1B5E20, #2E7D32)'; borderColor = '#2E7D32'; color = '#fff'; }
                else if (isWrong) { bg = 'linear-gradient(135deg, #7F1010, #B71C1C)'; borderColor = '#C62828'; color = '#fff'; }
                return (
                  <button
                    key={i}
                    onClick={() => !answered && handleAnswer(opt)}
                    disabled={answered}
                    style={{
                      fontFamily: "'Lora', serif", fontSize: '1rem', fontWeight: 600,
                      padding: '17px 14px', border: `2px solid ${borderColor}`, borderRadius: '10px',
                      background: bg, color, cursor: answered ? 'default' : 'pointer',
                      transition: '0.28s', boxShadow: isCorrect ? '0 8px 20px rgba(30,94,32,0.4)' : '0 2px 8px rgba(92,32,8,0.09)',
                      transform: isCorrect ? 'scale(1.05)' : '',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                    }}
                    onMouseEnter={e => { if (!answered) { e.currentTarget.style.borderColor = '#C8921E'; e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(92,32,8,0.2)'; } }}
                    onMouseLeave={e => { if (!answered) { e.currentTarget.style.borderColor = 'rgba(92,32,8,0.15)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 8px rgba(92,32,8,0.09)'; } }}
                  >
                    {opt.l}
                    {isCorrect && <i className="fa-solid fa-check" />}
                    {isWrong && <i className="fa-solid fa-xmark" />}
                  </button>
                );
              })}
            </div>
            {feedback && (
              <div style={{
                borderRadius: '10px', padding: '13px 16px',
                fontFamily: "'Lora', serif", fontSize: '0.93rem',
                display: 'flex', alignItems: 'center', gap: '10px',
                marginTop: '14px',
                background: feedback.ok ? '#E8F5E9' : '#FFEBEE',
                border: `1px solid ${feedback.ok ? '#A5D6A7' : '#EF9A9A'}`,
                color: feedback.ok ? '#1B5E20' : '#7F1010',
                animation: 'fadeInUp 0.28s ease both',
              }}>
                <i className={`fa-solid ${feedback.ok ? 'fa-circle-check' : 'fa-circle-xmark'}`} />
                <span>{feedback.msg}</span>
                {!feedback.ok && (
                  <span style={{ marginLeft: '4px', fontFamily: "'Noto Sans Javanese', serif", fontSize: '1.6rem', color: '#1B5E20' }}>
                    {item.j}
                  </span>
                )}
              </div>
            )}
          </>
        )}

        {screen === 'result' && (
          <>
            <button onClick={() => setScreen('sel')} style={{ marginBottom: '18px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 600, padding: '9px 18px', cursor: 'pointer', background: 'transparent', color: '#C8921E', border: '2px solid #C8921E', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="fa-solid fa-arrow-left" /> Kembali
            </button>
            <div style={{ background: 'linear-gradient(145deg, #5C2008 0%, #2E0D04 100%)', borderRadius: '18px', padding: '48px 32px', textAlign: 'center', boxShadow: '0 14px 50px rgba(92,32,8,0.5)', border: '2px solid rgba(200,146,30,0.4)', animation: 'fadeInUp 0.6s cubic-bezier(0.34,1.56,0.64,1) both' }}>
              <div style={{ fontFamily: "'Noto Sans Javanese', serif", fontSize: '3rem', color: '#E0AE42', opacity: 0.35, marginBottom: '10px' }}>ꦲꦤꦕꦫꦏ</div>
              <span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '5.5rem', fontWeight: 900, color: '#E0AE42', display: 'block', lineHeight: 1, marginBottom: '4px' }}>{resultScore}</span>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: 'rgba(240,201,106,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>{resultLabel}</div>
              <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#F0C96A', marginBottom: '28px' }}>{resultMsg}</div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => startKuis(kuisType)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', fontWeight: 600, padding: '13px 26px', background: 'linear-gradient(135deg, #C8921E, #E0AE42)', color: '#5C2008', border: 'none', borderRadius: '50px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
                  <i className="fa-solid fa-rotate-right" /> Ulangi
                </button>
                <button onClick={() => setScreen('sel')} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', fontWeight: 600, padding: '13px 26px', background: 'transparent', color: '#F0C96A', border: '1.5px solid rgba(200,146,30,0.4)', borderRadius: '50px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
                  <i className="fa-solid fa-list" /> Menu Kuis
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes qPop { 0%{transform:scale(.3) rotate(-15deg);opacity:0} 100%{transform:scale(1) rotate(0);opacity:1} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
