import { ChevronLeft, Maximize2, RotateCcw } from 'lucide-react';
import { useRef, useState } from 'react';

export function GamePlayer({ game, onBack }) {
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleReload = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = game.iframeUrl;
    }
  };

  const handleFullscreen = () => {
    if (iframeRef.current) {
      iframeRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 px-4 py-2 bg-white border-2 border-black font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          BACK TO HUB
        </button>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleReload}
            className="p-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
            title="Reload Game"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={handleFullscreen}
            className="p-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
            title="Fullscreen"
          >
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      <div className="relative bg-black border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] aspect-video overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 z-10">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent animate-spin mb-4" />
            <p className="font-black uppercase tracking-widest text-yellow-400 animate-pulse italic">
              Loading {game.title}...
            </p>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={game.iframeUrl}
          className="w-full h-full border-none"
          onLoad={() => setIsLoading(false)}
          allowFullScreen
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>

      <div className="mt-8 bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="inline-block px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase tracking-widest italic mb-2">
              {game.category}
            </span>
            <h2 className="font-black text-3xl uppercase tracking-tighter italic">
              {game.title}
            </h2>
          </div>
        </div>
        <p className="font-medium text-black/70 leading-relaxed text-lg">
          {game.description}
        </p>
        
        <div className="mt-8 pt-8 border-t-2 border-black/10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-black/40 mb-1">Status</span>
            <span className="text-sm font-bold uppercase text-green-600">UNBLOCKED</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-black/40 mb-1">Version</span>
            <span className="text-sm font-bold">1.0.4-STABLE</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-black/40 mb-1">Engine</span>
            <span className="text-sm font-bold uppercase">{game.category === 'Idle' ? 'JS' : 'Unity/WebGL'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-black/40 mb-1">Server</span>
            <span className="text-sm font-bold uppercase">Primary-01</span>
          </div>
        </div>
      </div>
    </div>
  );
}
