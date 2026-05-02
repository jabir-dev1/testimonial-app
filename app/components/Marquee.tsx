import React from 'react';

export function Marquee({ items }: { items: any[] }) {
  // We duplicate the array 3 times so the scrolling loop never runs out of cards!
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-transparent py-10">
      
      {/* The Scrolling Track */}
      <div className="flex w-max animate-marquee hover:pause items-stretch">
        {duplicatedItems.map((t, index) => (
          <div 
            key={`${t.id}-${index}`} 
            className="mx-4 w-80 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between whitespace-normal transition-all hover:shadow-md"
          >
            <div>
              <div className="flex gap-1 text-amber-400 mb-3 text-lg">
                {'⭐'.repeat(t.rating)}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed mb-6">"{t.message}"</p>
            </div>
            
            <div className="flex items-center gap-3 border-t border-slate-100 pt-4 mt-auto">
              <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold uppercase">
                {t.name ? t.name.charAt(0) : '?'}
              </div>
              <p className="font-bold text-slate-900">{t.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* The Left & Right Fade Effect (Makes it look premium) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-slate-50 to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-slate-50 to-transparent"></div>

      {/* The CSS Animation Engine for the buttery smooth scroll */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
}