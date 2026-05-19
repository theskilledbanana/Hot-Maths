import { Gamepad2, Search, X } from 'lucide-react';
import { motion } from 'motion/react';

export function Navbar({ searchQuery, setSearchQuery, onHomeClick }) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b-4 border-black px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <button 
          onClick={onHomeClick}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="bg-black text-white p-2 rounded-sm group-hover:rotate-12 transition-transform">
            <Gamepad2 size={24} />
          </div>
          <span className="font-display font-black text-2xl tracking-tighter uppercase italic">
            Unboxed Games
          </span>
        </button>

        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-black/50" size={20} />
          </div>
          <input
            type="text"
            placeholder="SEARCH GAMES..."
            className="w-full bg-white border-2 border-black py-2 pl-10 pr-10 focus:outline-none focus:ring-4 focus:ring-yellow-400 font-bold placeholder:text-black/30 placeholder:italic transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-red-500 transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
