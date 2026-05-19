import { GameCard } from './GameCard';
import { motion, AnimatePresence } from 'motion/react';

export function GameGrid({ games, onGameClick, selectedCategory, setSelectedCategory }) {
  const categories = ['All', ...new Set(games.map(g => g.category))];

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1 font-black uppercase tracking-widest text-xs border-2 border-black transition-all ${
              selectedCategory === cat 
                ? 'bg-black text-white shadow-none translate-x-[2px] translate-y-[2px]' 
                : 'bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]'
            } cursor-pointer`}
          >
            {cat}
          </button>
        ))}
      </div>

      {games.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-4 border-dashed border-black/20">
          <p className="font-black text-2xl uppercase italic text-black/20">No games found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {games.map((game) => (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <GameCard game={game} onClick={onGameClick} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
