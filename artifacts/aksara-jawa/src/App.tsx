import { useState, useCallback } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MateriPage from './pages/MateriPage';
import FlashcardPage from './pages/FlashcardPage';
import GamePage from './pages/GamePage';
import KuisPage from './pages/KuisPage';
import NamaPage from './pages/NamaPage';
import TentangPage from './pages/TentangPage';
import CreditPage from './pages/CreditPage';

type PageId = 'home' | 'materi' | 'flashcard' | 'game' | 'kuis' | 'nama' | 'tentang' | 'credit';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [activePage, setActivePage] = useState<PageId>('home');

  const goPage = useCallback((id: PageId) => {
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      {loaded && (
        <>
          <Navbar activePage={activePage} goPage={goPage} />
          <main style={{ paddingTop: '66px', minHeight: '100vh', background: '#FBF4E3' }}>
            <div style={{ display: activePage === 'home' ? 'block' : 'none' }}>
              <HomePage goPage={goPage} />
            </div>
            <div style={{ display: activePage === 'materi' ? 'block' : 'none' }}>
              <MateriPage />
            </div>
            <div style={{ display: activePage === 'flashcard' ? 'block' : 'none' }}>
              <FlashcardPage />
            </div>
            <div style={{ display: activePage === 'game' ? 'block' : 'none' }}>
              <GamePage />
            </div>
            <div style={{ display: activePage === 'kuis' ? 'block' : 'none' }}>
              <KuisPage />
            </div>
            <div style={{ display: activePage === 'nama' ? 'block' : 'none' }}>
              <NamaPage />
            </div>
            <div style={{ display: activePage === 'tentang' ? 'block' : 'none' }}>
              <TentangPage goPage={goPage} />
            </div>
            <div style={{ display: activePage === 'credit' ? 'block' : 'none' }}>
              <CreditPage />
            </div>
          </main>

          <div id="aj-toast" />
        </>
      )}
    </>
  );
}
