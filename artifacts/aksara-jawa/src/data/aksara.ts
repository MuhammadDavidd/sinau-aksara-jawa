export interface AksaraItem {
  j: string;
  l: string;
  e: string;
}

export interface SandhItem {
  j: string;
  n: string;
  f: string;
  c: string;
  detail: string;
}

export const D: Record<string, AksaraItem[]> = {
  ngl: [
    { j: 'ꦲ', l: 'Ha', e: 'Hana (ada)' },
    { j: 'ꦤ', l: 'Na', e: 'Nasi' },
    { j: 'ꦕ', l: 'Ca', e: 'Cara' },
    { j: 'ꦫ', l: 'Ra', e: 'Rasa' },
    { j: 'ꦏ', l: 'Ka', e: 'Kali' },
    { j: 'ꦢ', l: 'Da', e: 'Dara' },
    { j: 'ꦠ', l: 'Ta', e: 'Tani' },
    { j: 'ꦱ', l: 'Sa', e: 'Sapa' },
    { j: 'ꦮ', l: 'Wa', e: 'Wani' },
    { j: 'ꦭ', l: 'La', e: 'Lara' },
    { j: 'ꦥ', l: 'Pa', e: 'Pari' },
    { j: 'ꦝ', l: 'Dha', e: 'Dhadha' },
    { j: 'ꦗ', l: 'Ja', e: 'Jago' },
    { j: 'ꦪ', l: 'Ya', e: 'Yasa' },
    { j: 'ꦚ', l: 'Nya', e: 'Nyawa' },
    { j: 'ꦩ', l: 'Ma', e: 'Mata' },
    { j: 'ꦒ', l: 'Ga', e: 'Gara' },
    { j: 'ꦧ', l: 'Ba', e: 'Bapa' },
    { j: 'ꦛ', l: 'Tha', e: 'Thathit' },
    { j: 'ꦔ', l: 'Nga', e: 'Ngawi' },
  ],
  pas: [
    { j: '꧀ꦲ', l: 'Pa-Ha', e: 'Pasangan Ha' },
    { j: '꧀ꦤ', l: 'Pa-Na', e: 'Pasangan Na' },
    { j: '꧀ꦕ', l: 'Pa-Ca', e: 'Pasangan Ca' },
    { j: '꧀ꦫ', l: 'Pa-Ra', e: 'Pasangan Ra' },
    { j: '꧀ꦏ', l: 'Pa-Ka', e: 'Pasangan Ka' },
    { j: '꧀ꦢ', l: 'Pa-Da', e: 'Pasangan Da' },
    { j: '꧀ꦠ', l: 'Pa-Ta', e: 'Pasangan Ta' },
    { j: '꧀ꦱ', l: 'Pa-Sa', e: 'Pasangan Sa' },
    { j: '꧀ꦮ', l: 'Pa-Wa', e: 'Pasangan Wa' },
    { j: '꧀ꦭ', l: 'Pa-La', e: 'Pasangan La' },
    { j: '꧀ꦥ', l: 'Pa-Pa', e: 'Pasangan Pa' },
    { j: '꧀ꦝ', l: 'Pa-Dha', e: 'Pasangan Dha' },
    { j: '꧀ꦗ', l: 'Pa-Ja', e: 'Pasangan Ja' },
    { j: '꧀ꦪ', l: 'Pa-Ya', e: 'Pasangan Ya' },
    { j: '꧀ꦚ', l: 'Pa-Nya', e: 'Pasangan Nya' },
    { j: '꧀ꦩ', l: 'Pa-Ma', e: 'Pasangan Ma' },
    { j: '꧀ꦒ', l: 'Pa-Ga', e: 'Pasangan Ga' },
    { j: '꧀ꦧ', l: 'Pa-Ba', e: 'Pasangan Ba' },
    { j: '꧀ꦛ', l: 'Pa-Tha', e: 'Pasangan Tha' },
    { j: '꧀ꦔ', l: 'Pa-Nga', e: 'Pasangan Nga' },
  ],
  san: [
    { j: 'ꦶ', l: 'Wulu', e: 'Vokal /i/' },
    { j: 'ꦸ', l: 'Suku', e: 'Vokal /u/' },
    { j: 'ꦺ', l: 'Taling', e: 'Vokal /é/' },
    { j: 'ꦼ', l: 'Pepet', e: 'Vokal /ê/' },
    { j: 'ꦺꦴ', l: 'Taling Tarung', e: 'Vokal /o/' },
    { j: 'ꦂ', l: 'Layar', e: 'Bunyi /r/' },
    { j: 'ꦁ', l: 'Cecak', e: 'Bunyi /ng/' },
    { j: 'ꦃ', l: 'Wigyan', e: 'Bunyi /h/' },
    { j: '꧀', l: 'Pangkon', e: 'Mematikan vokal' },
  ],
  mur: [
    { j: 'ꦟ', l: 'Na Murda', e: 'Nama bangsawan' },
    { j: 'ꦑ', l: 'Ka Murda', e: 'Kerajaan' },
    { j: 'ꦡ', l: 'Ta Murda', e: 'Kehormatan' },
    { j: 'ꦯ', l: 'Sa Murda', e: 'Sang Raja' },
    { j: 'ꦦ', l: 'Pa Murda', e: 'Paduka' },
    { j: 'ꦘ', l: 'Nya Murda', e: 'Nyai Roro' },
    { j: 'ꦓ', l: 'Ga Murda', e: 'Gusti' },
    { j: 'ꦨ', l: 'Ba Murda', e: 'Baginda' },
  ],
  swa: [
    { j: 'ꦄ', l: 'A', e: 'Alas (hutan)' },
    { j: 'ꦆ', l: 'I', e: 'Ijo (hijau)' },
    { j: 'ꦈ', l: 'U', e: 'Uwi (ubi)' },
    { j: 'ꦌ', l: 'E', e: 'Emas' },
    { j: 'ꦎ', l: 'O', e: 'Omah' },
  ],
  rek: [
    { j: 'ꦏ꦳', l: 'Kha', e: 'Khabar' },
    { j: 'ꦒ꦳', l: 'Gha', e: 'Ghulam' },
    { j: 'ꦢ꦳', l: 'Dza', e: 'Dzikir' },
    { j: 'ꦥ꦳', l: 'Fa', e: 'Fatwa' },
    { j: 'ꦱ꦳', l: 'Za', e: 'Zakat' },
  ],
  wil: [
    { j: '꧐', l: '0 Nol', e: 'Nol' },
    { j: '꧑', l: '1 Siji', e: 'Satu' },
    { j: '꧒', l: '2 Loro', e: 'Dua' },
    { j: '꧓', l: '3 Telu', e: 'Tiga' },
    { j: '꧔', l: '4 Papat', e: 'Empat' },
    { j: '꧕', l: '5 Lima', e: 'Lima' },
    { j: '꧖', l: '6 Enem', e: 'Enam' },
    { j: '꧗', l: '7 Pitu', e: 'Tujuh' },
    { j: '꧘', l: '8 Wolu', e: 'Delapan' },
    { j: '꧙', l: '9 Songo', e: 'Sembilan' },
  ],
};

export const SAND_FULL: SandhItem[] = [
  {
    j: 'ꦶ',
    n: 'Wulu',
    f: 'Vokal /i/ — diletakkan di atas aksara',
    c: 'ꦏꦶ = ki',
    detail: 'Mengubah bunyi vokal menjadi /i/. Contoh: ꦧꦶ (bi), ꦱꦶ (si), ꦤꦶ (ni)',
  },
  {
    j: 'ꦸ',
    n: 'Suku',
    f: 'Vokal /u/ — diletakkan di bawah aksara',
    c: 'ꦏꦸ = ku',
    detail: 'Mengubah bunyi vokal menjadi /u/. Contoh: ꦧꦸ (bu), ꦱꦸ (su), ꦤꦸ (nu)',
  },
  {
    j: 'ꦺ',
    n: 'Taling',
    f: 'Vokal /é/ terbuka — diletakkan di depan/kiri aksara',
    c: 'ꦺꦏ = ke',
    detail: 'Mengubah bunyi vokal menjadi /é/. Contoh: ꦺꦧ (be), ꦺꦱ (se)',
  },
  {
    j: 'ꦼ',
    n: 'Pepet',
    f: 'Vokal /ê/ schwa — diletakkan di atas aksara',
    c: 'ꦏꦼ = kê',
    detail: 'Bunyi vokal /ê/ seperti pada "emas". Contoh: ꦧꦼ (bê), ꦱꦼ (sê)',
  },
  {
    j: 'ꦺꦴ',
    n: 'Taling Tarung',
    f: 'Vokal /o/ — kombinasi Taling + Tarung',
    c: 'ꦺꦏꦴ = ko',
    detail: 'Kombinasi dua tanda untuk bunyi /o/. Contoh: ꦺꦧꦴ (bo), ꦺꦱꦴ (so)',
  },
  {
    j: 'ꦂ',
    n: 'Layar',
    f: 'Bunyi /r/ di akhir suku kata — diletakkan di atas aksara',
    c: 'ꦏꦂ = kar',
    detail: 'Menutup suku kata dengan bunyi /r/. Contoh: ꦧꦂ (bar), ꦱꦂ (sar)',
  },
  {
    j: 'ꦁ',
    n: 'Cecak',
    f: 'Bunyi /ng/ nasalisasi — diletakkan di atas aksara',
    c: 'ꦏꦁ = kang',
    detail: 'Menutup suku kata dengan bunyi nasal /ng/. Contoh: ꦧꦁ (bang), ꦱꦁ (sang)',
  },
  {
    j: 'ꦃ',
    n: 'Wigyan',
    f: 'Bunyi /h/ aspirasi — diletakkan setelah aksara',
    c: 'ꦏꦃ = kah',
    detail: 'Menutup suku kata dengan bunyi /h/. Contoh: ꦧꦃ (bah), ꦱꦃ (sah)',
  },
  {
    j: '꧀',
    n: 'Pangkon',
    f: 'Mematikan vokal — diletakkan setelah aksara',
    c: 'ꦏ꧀ = k (mati)',
    detail: 'Menghilangkan vokal bawaan /a/. Digunakan sebelum pasangan atau di akhir kata',
  },
];

export const ALL: AksaraItem[] = [
  ...D.ngl,
  ...D.pas,
  ...D.san,
  ...D.mur,
  ...D.swa,
  ...D.rek,
  ...D.wil,
];

export const HANA = [
  'ꦲ','ꦤ','ꦕ','ꦫ','ꦏ',
  'ꦢ','ꦠ','ꦱ','ꦮ','ꦭ',
  'ꦥ','ꦝ','ꦗ','ꦪ','ꦚ',
  'ꦩ','ꦒ','ꦧ','ꦛ','ꦔ',
];

export const PRELOADER_CHARS = ['ꦲ','ꦤ','ꦕ','ꦫ','ꦏ','ꦢ','ꦠ','ꦱ','ꦮ','ꦭ','ꦥ','ꦝ','ꦗ','ꦪ','ꦚ'];

export function shuf<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function msgs(pct: number): string {
  if (pct >= 90) return 'Luar biasa! Hampir sempurna!';
  if (pct >= 70) return 'Bagus sekali! Terus semangat!';
  if (pct >= 50) return 'Lumayan! Pelajari lagi materinya!';
  return 'Jangan menyerah! Ayo ulangi!';
}

const L2J: Record<string, string> = {
  'nga': 'ꦔ', 'nya': 'ꦚ', 'dha': 'ꦝ', 'tha': 'ꦛ',
  'ha': 'ꦲ', 'na': 'ꦤ', 'ca': 'ꦕ', 'ra': 'ꦫ', 'ka': 'ꦏ',
  'da': 'ꦢ', 'ta': 'ꦠ', 'sa': 'ꦱ', 'wa': 'ꦮ', 'la': 'ꦭ',
  'pa': 'ꦥ', 'ja': 'ꦗ', 'ya': 'ꦪ', 'ma': 'ꦩ', 'ga': 'ꦒ', 'ba': 'ꦧ',
  'a': 'ꦄ', 'i': 'ꦆ', 'u': 'ꦈ', 'e': 'ꦌ', 'o': 'ꦎ',
  'h': 'ꦲ꧀', 'n': 'ꦤ꧀', 'c': 'ꦕ꧀', 'r': 'ꦫ꧀', 'k': 'ꦏ꧀',
  'd': 'ꦢ꧀', 't': 'ꦠ꧀', 's': 'ꦱ꧀', 'w': 'ꦮ꧀', 'l': 'ꦭ꧀',
  'p': 'ꦥ꧀', 'j': 'ꦗ꧀', 'y': 'ꦪ꧀', 'm': 'ꦩ꧀', 'g': 'ꦒ꧀', 'b': 'ꦧ꧀',
  'f': 'ꦥ꦳꧀', 'v': 'ꦮ꧀', 'q': 'ꦏ꧀', 'z': 'ꦱ꦳꧀',
};

export function toJw(txt: string): string {
  let r = '', i = 0;
  const t = txt.toLowerCase();
  while (i < t.length) {
    if (t[i] === ' ') { r += ' '; i++; continue; }
    const t3 = t.slice(i, i + 3), t2 = t.slice(i, i + 2), t1 = t[i];
    if (L2J[t3]) { r += L2J[t3]; i += 3; }
    else if (L2J[t2]) { r += L2J[t2]; i += 2; }
    else if (L2J[t1]) { r += L2J[t1]; i++; }
    else { r += t1; i++; }
  }
  return r;
}
