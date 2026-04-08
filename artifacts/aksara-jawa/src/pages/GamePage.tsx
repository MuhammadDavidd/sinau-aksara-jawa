import { useState, useEffect, useRef, useCallback } from 'react';
import { D, ALL, AksaraItem, shuf, msgs } from '../data/aksara';

type GameType = 'tebak' | 'latin' | 'memory' | null;
type Screen = 'sel' | 'tebak' | 'mem' | 'result';

interface MemCard {
  id: string;
  pair: number;
  type: 'jw' | 'lat';
  display: string;
  latin: string;
}

function PageHeader() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #5C2008 0%, #3A1005 55%, #7A2E12 100%)',
      padding: '52px 24px 40px', textAlign: 'center',
      borderBottom: '3px solid #C8921E', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(200,146,30,0.12) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', fontFamily: "'Noto Sans Javanese', serif", fontSize: '9rem', color: '#C8921E', opacity: 0.05, top: '50%', transform: 'translateY(-50%)', left: '-20px' }}>ꦗ</div>
      <div style={{ position: 'absolute', fontFamily: "'Noto Sans Javanese', serif", fontSize: '9rem', color: '#C8921E', opacity: 0.05, top: '50%', transform: 'translateY(-50%)', right: '-20px' }}>ꦔ</div>
      <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(1.3rem,3.5vw,2.1rem)', color: '#E0AE42', marginBottom: '7px', position: 'relative', letterSpacing: '0.05em' }}>
        <i className="fa-solid fa-gamepad" style={{ color: '#C8921E', marginRight: '9px' }} />Game Belajar
      </h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'rgba(240,201,106,0.6)', position: 'relative' }}>Uji kemampuan aksaramu dengan cara yang seru!</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '14px', position: 'relative' }}>
        <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, #C8921E)' }} />
        <span style={{ fontFamily: "'Noto Sans Javanese', serif", fontSize: '1.1rem', color: '#C8921E' }}>꧁</span>
        <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(90deg, #C8921E, transparent)' }} />
      </div>
    </div>
  );
}

export default function GamePage() {
  const [screen, setScreen] = useState<Screen>('sel');
  const [gType, setGType] = useState<GameType>(null);
  const [pool, setPool] = useState<AksaraItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [options, setOptions] = useState<AksaraItem[]>([]);
  const [answered, setAnswered] = useState(false);
  const [chosenL, setChosenL] = useState('');
  const [correctL, setCorrectL] = useState('');
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);
  const [timer, setTimer] = useState(15);
  const [timerPct, setTimerPct] = useState(100);
  const timRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Result
  const [resultScore, setResultScore] = useState(0);
  const [resultLabel, setResultLabel] = useState('');
  const [resultMsg, setResultMsg] = useState('');

  // Memory
  const [memCards, setMemCards] = useState<MemCard[]>([]);
  const [memFlipped, setMemFlipped] = useState<number[]>([]);
  const [memMatched, setMemMatched] = useState<number[]>([]);
  const [memTries, setMemTries] = useState(0);
  const [memTime, setMemTime] = useState(0);
  const [memLock, setMemLock] = useState(false);
  const memTimRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const TOTAL = 15;
  const MEM_N = 8;

  const clearTim = () => { if (timRef.current) clearInterval(timRef.current); };

  const buildOptions = useCallback((item: AksaraItem, type: GameType) => {
    const pool = ALL.filter(x => x.l !== item.l);
    const wrongs = shuf(pool).slice(0, 3);
    return shuf([...wrongs, item]);
  }, []);

  const nextQ = useCallback((newIdx: number, newPool: AksaraItem[]) => {
    if (newIdx >= TOTAL) return;
    const item = newPool[newIdx];
    setOptions(buildOptions(item, gType));
    setAnswered(false);
    setChosenL('');
    setCorrectL(item.l);
    setFeedback(null);
    let tv = 15;
    setTimer(tv);
    setTimerPct(100);
    clearTim();
    timRef.current = setInterval(() => {
      tv--;
      setTimer(tv);
      setTimerPct((tv / 15) * 100);
      if (tv <= 0) {
        clearTim();
        setAnswered(true);
        setFeedback({ ok: false, msg: 'Waktu habis!' });
        setWrong(w => w + 1);
        setTimeout(() => {
          setIdx(i => i + 1);
        }, 1400);
      }
    }, 1000);
  }, [gType, buildOptions]);

  useEffect(() => {
    if (screen === 'tebak' && idx < TOTAL && pool.length > 0) {
      nextQ(idx, pool);
    } else if (screen === 'tebak' && idx >= TOTAL) {
      clearTim();
      const pct = Math.round(correct / TOTAL * 100);
      setResultScore(pct);
      setResultLabel(`${correct} dari ${TOTAL} benar`);
      setResultMsg(msgs(pct));
      setScreen('result');
    }
    return () => clearTim();
  }, [idx, screen, pool]);

  const startGame = (type: GameType) => {
    setGType(type);
    setCorrect(0);
    setWrong(0);
    setIdx(0);
    setAnswered(false);
    setFeedback(null);
    if (type === 'memory') {
      setScreen('mem');
      startMemory();
      return;
    }
    const p = shuf([...ALL]).slice(0, TOTAL);
    setPool(p);
    setScreen('tebak');
  };

  const startMemory = () => {
    if (memTimRef.current) clearInterval(memTimRef.current);
    setMemTries(0);
    setMemTime(0);
    setMemFlipped([]);
    setMemMatched([]);
    setMemLock(false);
    const chosen = shuf([...D.ngl]).slice(0, MEM_N);
    const cards: MemCard[] = shuf(chosen.flatMap((c, i) => [
      { id: `j${i}`, pair: i, type: 'jw', display: c.j, latin: c.l },
      { id: `l${i}`, pair: i, type: 'lat', display: c.l, latin: c.l },
    ]));
    setMemCards(cards);
    memTimRef.current = setInterval(() => setMemTime(t => t + 1), 1000);
  };

  const handleAnswer = (opt: AksaraItem) => {
    if (answered) return;
    clearTim();
    setAnswered(true);
    setChosenL(opt.l);
    if (opt.l === correctL) {
      setCorrect(c => c + 1);
      setFeedback({ ok: true, msg: `Benar! Aksara ${correctL}` });
    } else {
      setWrong(w => w + 1);
      setFeedback({ ok: false, msg: `Salah! Jawaban: ${correctL}` });
    }
    setTimeout(() => setIdx(i => i + 1), 1750);
  };

  const flipMem = (i: number) => {
    if (memLock || memFlipped.length >= 2) return;
    if (memFlipped.includes(i) || memMatched.includes(memCards[i].pair)) return;
    const newFlipped = [...memFlipped, i];
    setMemFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMemLock(true);
      setMemTries(t => t + 1);
      const [a, b] = newFlipped;
      const ca = memCards[a], cb = memCards[b];
      if (ca.pair === cb.pair && ca.type !== cb.type) {
        setMemMatched(m => [...m, ca.pair]);
        setMemFlipped([]);
        setMemLock(false);
        if (memMatched.length + 1 === MEM_N) {
          if (memTimRef.current) clearInterval(memTimRef.current);
          setTimeout(() => {
            const tries = memTries + 1;
            setResultScore(tries);
            setResultLabel(`percobaan dalam ${memTime} detik`);
            setResultMsg(tries <= MEM_N + 2 ? 'Ingatan luar biasa!' : tries <= MEM_N * 2 ? 'Bagus! Terus latih!' : 'Terus berlatih!');
            setScreen('result');
          }, 600);
        }
      } else {
        setTimeout(() => { setMemFlipped([]); setMemLock(false); }, 1000);
      }
    }
  };

  const item = pool[idx] as AksaraItem | undefined;

  return (
    <div>
      <PageHeader />
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '36px 24px 80px' }}>
        {screen === 'sel' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.3rem', color: '#5C2008', marginBottom: '5px' }}>Pilih Permainan</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginTop: '12px' }}>
                <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, #C8921E)' }} />
                <i className="fa-solid fa-gamepad" style={{ color: '#C8921E' }} />
                <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(90deg, #C8921E, transparent)' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '16px' }}>
              {[
                { type: 'tebak' as GameType, icon: 'fa-question', title: 'Tebak Aksara', desc: 'Lihat aksara Jawa, pilih jawaban yang benar dari 4 opsi. Ada timer 15 detik!' },
                { type: 'latin' as GameType, icon: 'fa-spell-check', title: 'Tebak dari Latin', desc: 'Diberi huruf latin, pilih aksara yang tepat dari 4 opsi aksara.' },
                { type: 'memory' as GameType, icon: 'fa-brain', title: 'Memory Match', desc: 'Cocokkan 16 kartu aksara dengan pasangan latinnya. Uji ingatanmu!' },
              ].map(g => (
                <div
                  key={g.type}
                  onClick={() => startGame(g.type)}
                  style={{
                    background: '#FFFCF2', border: '1.5px solid rgba(200,146,30,0.22)',
                    borderRadius: '18px', padding: '28px 20px', cursor: 'pointer',
                    textAlign: 'center', boxShadow: '0 2px 12px rgba(92,32,8,0.09)',
                    transition: '0.28s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#C8921E'; e.currentTarget.style.transform = 'translateY(-7px) rotate(-0.5deg)'; e.currentTarget.style.boxShadow = '0 16px 36px rgba(92,32,8,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(200,146,30,0.22)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 12px rgba(92,32,8,0.09)'; }}
                >
                  <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #5C2008, #7A2E12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: '1.3rem', color: '#E0AE42', boxShadow: '0 3px 12px rgba(92,32,8,0.3)' }}>
                    <i className={`fa-solid ${g.icon}`} />
                  </div>
                  <h4 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '0.85rem', color: '#5C2008', marginBottom: '6px' }}>{g.title}</h4>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.73rem', color: '#A06030', lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: g.desc }} />
                </div>
              ))}
            </div>
          </>
        )}

        {screen === 'tebak' && item && (
          <>
            <button onClick={() => { clearTim(); setScreen('sel'); }} style={{ marginBottom: '18px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 600, padding: '9px 18px', cursor: 'pointer', background: 'transparent', color: '#C8921E', border: '2px solid #C8921E', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '6px', transition: '0.28s' }}>
              <i className="fa-solid fa-arrow-left" /> Menu Game
            </button>

            {/* Score header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFCF2', border: '1px solid rgba(200,146,30,0.22)', borderRadius: '18px', padding: '15px 20px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(92,32,8,0.09)' }}>
              <div style={{ textAlign: 'center' }}><span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.7rem', color: '#C8921E', display: 'block', lineHeight: 1 }}>{idx + 1}</span><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: '#A06030', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Soal</span></div>
              <div style={{ width: '1px', height: '38px', background: 'rgba(200,146,30,0.22)' }} />
              <div style={{ textAlign: 'center' }}><span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.7rem', color: '#2E7D32', display: 'block', lineHeight: 1 }}>{correct}</span><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: '#A06030', textTransform: 'uppercase', letterSpacing: '0.08em' }}><i className="fa-solid fa-check" /> Benar</span></div>
              <div style={{ width: '1px', height: '38px', background: 'rgba(200,146,30,0.22)' }} />
              <div style={{ textAlign: 'center' }}><span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.7rem', color: '#B71C1C', display: 'block', lineHeight: 1 }}>{wrong}</span><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: '#A06030', textTransform: 'uppercase', letterSpacing: '0.08em' }}><i className="fa-solid fa-xmark" /> Salah</span></div>
              <div style={{ width: '1px', height: '38px', background: 'rgba(200,146,30,0.22)' }} />
              <div style={{ textAlign: 'center' }}><span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.7rem', color: timer <= 5 ? '#B71C1C' : '#C8921E', display: 'block', lineHeight: 1 }}>{timer}</span><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: '#A06030', textTransform: 'uppercase', letterSpacing: '0.08em' }}><i className="fa-solid fa-clock" /> Detik</span></div>
            </div>

            {/* Timer bar */}
            <div style={{ height: '5px', background: '#F5EAD0', borderRadius: '3px', marginBottom: '24px', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: '3px', transition: 'width 1s linear, background 0.3s', width: `${timerPct}%`, background: timer <= 5 ? 'linear-gradient(90deg, #8B1A1A, #E53935)' : 'linear-gradient(90deg, #2D5A3D, #C8921E)' }} />
            </div>

            {/* Question */}
            <div style={{ background: '#FFFCF2', border: '2px solid rgba(200,146,30,0.22)', borderRadius: '18px', padding: '34px', textAlign: 'center', boxShadow: '0 4px 22px rgba(92,32,8,0.09)', marginBottom: '20px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(200,146,30,0.04) 0%, transparent 70%)' }} />
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8921E', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <i className="fa-solid fa-question-circle" />
                {gType === 'tebak' ? 'Aksara apakah ini?' : 'Pilih aksara yang tepat!'}
              </div>
              <span style={{
                fontFamily: gType === 'tebak' ? "'Noto Sans Javanese', serif" : "'Cinzel Decorative', serif",
                fontSize: 'clamp(4rem,14vw,7.5rem)',
                color: '#5C2008', lineHeight: 1.25, display: 'block', marginBottom: '6px',
                animation: 'qPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
              }}>{gType === 'tebak' ? item.j : item.l}</span>
              {gType === 'latin' && item.e && <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.88rem', color: '#A06030', marginTop: '4px' }}>({item.e})</div>}
            </div>

            {/* Options */}
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
                      fontFamily: gType === 'tebak' ? "'Lora', serif" : "'Noto Sans Javanese', serif",
                      fontSize: gType === 'tebak' ? '1rem' : '2rem',
                      fontWeight: 600,
                      padding: '17px 14px',
                      border: `2px solid ${borderColor}`,
                      borderRadius: '10px',
                      background: bg,
                      color,
                      cursor: answered ? 'default' : 'pointer',
                      transition: '0.28s',
                      boxShadow: isCorrect ? '0 8px 20px rgba(30,94,32,0.4)' : isWrong ? '0 4px 14px rgba(139,26,26,0.3)' : '0 2px 8px rgba(92,32,8,0.09)',
                      transform: isCorrect ? 'scale(1.05)' : '',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                      lineHeight: gType === 'tebak' ? 'normal' : '1.4',
                    }}
                    onMouseEnter={e => { if (!answered) { e.currentTarget.style.borderColor = '#C8921E'; e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(92,32,8,0.2)'; } }}
                    onMouseLeave={e => { if (!answered) { e.currentTarget.style.borderColor = 'rgba(92,32,8,0.15)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 8px rgba(92,32,8,0.09)'; } }}
                  >
                    {gType === 'tebak' ? opt.l : <span style={{ fontFamily: "'Noto Sans Javanese', serif" }}>{opt.j}</span>}
                    {isCorrect && <i className="fa-solid fa-check" style={{ fontSize: '1rem' }} />}
                    {isWrong && <i className="fa-solid fa-xmark" style={{ fontSize: '1rem' }} />}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
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
                <span dangerouslySetInnerHTML={{ __html: feedback.msg }} />
                {!feedback.ok && (
                  <span style={{ marginLeft: '4px', fontFamily: "'Noto Sans Javanese', serif", fontSize: '1.4rem', color: '#1B5E20' }}>
                    {pool[idx]?.j || ''}
                  </span>
                )}
              </div>
            )}
          </>
        )}

        {screen === 'mem' && (
          <>
            <button onClick={() => { if (memTimRef.current) clearInterval(memTimRef.current); setScreen('sel'); }} style={{ marginBottom: '18px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 600, padding: '9px 18px', cursor: 'pointer', background: 'transparent', color: '#C8921E', border: '2px solid #C8921E', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '6px', transition: '0.28s' }}>
              <i className="fa-solid fa-arrow-left" /> Menu Game
            </button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFCF2', border: '1px solid rgba(200,146,30,0.22)', borderRadius: '18px', padding: '15px 20px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(92,32,8,0.09)' }}>
              <div style={{ textAlign: 'center' }}><span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.7rem', color: '#C8921E', display: 'block', lineHeight: 1 }}>{memTries}</span><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: '#A06030', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Percobaan</span></div>
              <div style={{ width: '1px', height: '38px', background: 'rgba(200,146,30,0.22)' }} />
              <div style={{ textAlign: 'center' }}><span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.7rem', color: '#2E7D32', display: 'block', lineHeight: 1 }}>{memMatched.length}</span><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: '#A06030', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Cocok</span></div>
              <div style={{ width: '1px', height: '38px', background: 'rgba(200,146,30,0.22)' }} />
              <div style={{ textAlign: 'center' }}><span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.7rem', color: '#C8921E', display: 'block', lineHeight: 1 }}>{memTime}</span><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: '#A06030', textTransform: 'uppercase', letterSpacing: '0.08em' }}><i className="fa-solid fa-clock" /> Detik</span></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '9px', marginBottom: '18px' }}>
              {memCards.map((mc, i) => {
                const isFlipped = memFlipped.includes(i);
                const isMatched = memMatched.includes(mc.pair);
                return (
                  <div key={mc.id} style={{ aspectRatio: '1', cursor: 'pointer' }} onClick={() => flipMem(i)}>
                    <div style={{
                      width: '100%', height: '100%',
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.5s cubic-bezier(0.4,0.15,0.2,1)',
                      position: 'relative',
                      transform: (isFlipped || isMatched) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}>
                      <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #5C2008, #2E0D04)', border: '1.5px solid rgba(200,146,30,0.35)', boxShadow: '0 2px 8px rgba(92,32,8,0.09)', fontSize: '1.6rem', color: '#E0AE42' }}>
                        <i className="fa-solid fa-om" />
                      </div>
                      <div style={{
                        position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                        borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transform: 'rotateY(180deg)',
                        background: isMatched ? 'linear-gradient(135deg, #1B5E20, #2E7D32)' : (mc.type === 'jw' ? '#FAE4A8' : 'linear-gradient(135deg, #F5EAD0, #FAE4A8)'),
                        border: `1.5px solid ${isMatched ? '#2E7D32' : 'rgba(200,146,30,0.22)'}`,
                        boxShadow: '0 2px 8px rgba(92,32,8,0.09)',
                        fontFamily: mc.type === 'jw' ? "'Noto Sans Javanese', serif" : "'DM Sans', sans-serif",
                        fontSize: mc.type === 'jw' ? '1.7rem' : '0.85rem',
                        fontWeight: mc.type === 'lat' ? 700 : 400,
                        color: isMatched ? '#fff' : '#5C2008',
                        textAlign: 'center', padding: '4px',
                        animation: isMatched ? 'matchedPop 0.4s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
                      }}>
                        {mc.display}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {screen === 'result' && (
          <div style={{
            background: 'linear-gradient(145deg, #5C2008 0%, #2E0D04 100%)',
            borderRadius: '18px', padding: '48px 32px', textAlign: 'center',
            boxShadow: '0 14px 50px rgba(92,32,8,0.5)',
            border: '2px solid rgba(200,146,30,0.4)',
            animation: 'fadeInUp 0.6s cubic-bezier(0.34,1.56,0.64,1) both',
          }}>
            <div style={{ fontFamily: "'Noto Sans Javanese', serif", fontSize: '3rem', color: '#E0AE42', opacity: 0.35, marginBottom: '10px' }}>ꦲꦤꦕꦫꦏ</div>
            <span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '5.5rem', fontWeight: 900, color: '#E0AE42', display: 'block', lineHeight: 1, marginBottom: '4px' }}>{resultScore}</span>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: 'rgba(240,201,106,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>{resultLabel}</div>
            <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#F0C96A', marginBottom: '28px' }}>{resultMsg}</div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => { setScreen('sel'); startGame(gType); }} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', fontWeight: 600, padding: '13px 26px', background: 'linear-gradient(135deg, #C8921E, #E0AE42)', color: '#5C2008', border: 'none', borderRadius: '50px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '7px', transition: '0.28s' }}>
                <i className="fa-solid fa-rotate-right" /> Main Lagi
              </button>
              <button onClick={() => setScreen('sel')} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', fontWeight: 600, padding: '13px 26px', background: 'transparent', color: '#F0C96A', border: '1.5px solid rgba(200,146,30,0.4)', borderRadius: '50px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '7px', transition: '0.28s' }}>
                <i className="fa-solid fa-list" /> Pilih Lain
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes qPop { 0%{transform:scale(.3) rotate(-15deg);opacity:0} 100%{transform:scale(1) rotate(0);opacity:1} }
        @keyframes matchedPop { 0%{transform:rotateY(180deg) scale(.9)} 50%{transform:rotateY(180deg) scale(1.12)} 100%{transform:rotateY(180deg) scale(1)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
