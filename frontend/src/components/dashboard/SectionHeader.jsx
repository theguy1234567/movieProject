import React from "react";

function SectionHeader({ title, page, onPrev, onNext }) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="block h-5 w-1 rounded-full bg-accent" />
        <h2 className="text-lg font-black tracking-tight text-white">{title}</h2>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          aria-label="Previous page"
          className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/8 text-white/70 transition-all duration-200 hover:border-white/25 hover:bg-white/15 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="min-w-[20px] text-center text-xs font-black text-white/50">
          {page}
        </span>
        <button
          onClick={onNext}
          aria-label="Next page"
          className="grid h-8 w-8 place-items-center rounded-full bg-white/90 text-black/80 transition-all duration-200 hover:bg-white hover:scale-[1.05]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SectionHeader;
