import { Play } from 'lucide-react';
import { motion } from 'motion/react';

export function GameCard({ game, onClick }) {
  return (
    <motion.button
      whileHover={{ y: -4, x: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={() => onClick(game)}
      className="group relative bg-white border-4 border-black p-4 flex flex-col items-start text-left shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer h-full"
    >
      <div className="relative w-full aspect-video border-2 border-black overflow-hidden mb-4 bg-gray-100">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-none grayscale group-hover:grayscale-0"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-colors">
          <div className="bg-yellow-400 border-2 border-black p-3 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Play className="text-black fill-black" size={24} />
          </div>
        </div>
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase tracking-widest italic">
          {game.category}
        </div>
      </div>

      <h3 className="font-black text-xl uppercase tracking-tighter mb-1 line-clamp-1 group-hover:text-yellow-600 transition-colors">
        {game.title}
      </h3>
      <p className="text-sm text-black/60 line-clamp-2 font-medium leading-tight">
        {game.description}
      </p>
      
      <div className="mt-auto pt-4 flex items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-black/40">
          ID: {game.id.padStart(3, '0')}
        </span>
      </div>
    </motion.button>
  );
}
