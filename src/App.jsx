/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { GameGrid } from './components/GameGrid';
import { GamePlayer } from './components/GamePlayer';
import gamesData from './games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeGame, setActiveGame] = useState(null);

  const filteredGames = useMemo(() => {
    return gamesData.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleGameSelect = (game) => {
    setActiveGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setActiveGame(null);
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-black font-sans selection:bg-yellow-400 selection:text-black">
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onHomeClick={handleBack}
      />

      <main className="max-w-7xl mx-auto px-4 py-12 md:px-8">
        <AnimatePresence mode="wait">
          {!activeGame ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-12">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-4">
                  THE NEXUS OF <span className="text-yellow-600">UNBLOCKED</span> FUN
                </h1>
                <p className="text-xl font-bold text-black/40 uppercase tracking-widest max-w-2xl">
                  Bypassing restrictions since 2026. Explore our catalog of high-performance web games.
                </p>
              </div>

              <GameGrid 
                games={filteredGames} 
                onGameClick={handleGameSelect}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </motion.div>
          ) : (
            <motion.div
              key="player"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <GamePlayer game={activeGame} onBack={handleBack} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <footer className="mt-20 border-t-4 border-black bg-white px-4 py-12 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <span className="font-display font-black text-2xl tracking-tighter uppercase italic">
              Unboxed Games
            </span>
            <p className="text-xs font-bold text-black/40 mt-2">
              © 2026 UNBOXED ARCHIVE. ALL SYSTEMS OPERATIONAL.
            </p>
          </div>
          
          <div className="flex gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-black/40 mb-2">Navigation</span>
              <button onClick={handleBack} className="text-sm font-bold hover:underline py-1 text-left">GAMES HUB</button>
              <a href="#" className="text-sm font-bold hover:underline py-1">SURPRISE ME</a>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-black/40 mb-2">Legal</span>
              <a href="#" className="text-sm font-bold hover:underline py-1">PRIVACY</a>
              <a href="#" className="text-sm font-bold hover:underline py-1">DMCA</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
