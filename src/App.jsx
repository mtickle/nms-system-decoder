import { useMemo, useState } from 'react';

const DATA = {
  letters: {
    O: { name: 'Blue', drive: 'Indium', desc: 'Hottest, rarest, exotic planets.', color: 'text-indigo-400', bg: 'bg-indigo-900/20', border: 'border-indigo-500' },
    B: { name: 'Blue-White', drive: 'Indium', desc: 'Very hot, high-value resources.', color: 'text-blue-300', bg: 'bg-blue-900/20', border: 'border-blue-500' },
    A: { name: 'White', drive: 'Cadmium', desc: 'Hot, standard distribution.', color: 'text-slate-100', bg: 'bg-slate-700/20', border: 'border-slate-400' },
    F: { name: 'Yellow-White', drive: 'None', desc: 'Warm, high chance of Lush biomes.', color: 'text-yellow-100', bg: 'bg-yellow-600/10', border: 'border-yellow-200' },
    G: { name: 'Yellow', drive: 'None', desc: 'Temperate, Earth-like probability.', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500' },
    K: { name: 'Yellow-Orange', drive: 'Emeril', desc: 'Cool, diverse desert/arid types.', color: 'text-orange-400', bg: 'bg-orange-900/20', border: 'border-orange-500' },
    M: { name: 'Red', drive: 'Emeril', desc: 'Coolest, common, many dead moons.', color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-500' },
    E: { name: 'Green', drive: 'Viridium', desc: 'Exotic/Glitch planet specialist.', color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-500' },
  },
  suffixes: {
    p: { label: 'Peculiar', note: 'Likely contains Anomalous/Glitch planets.' },
    f: { label: 'Fresh', note: 'Water present. Look for oceans.' },
    m: { label: 'Metallic', note: 'Increased yield of rare metals.' },
    e: { label: 'Emission', note: 'High radiation / Rare element spikes.' },
    v: { label: 'Variable', note: 'Unstable star; chaotic weather patterns.' },
  }
};

export default function App() {
  const [code, setCode] = useState('');

  const analysis = useMemo(() => {
    const cleaned = code.trim();
    const match = cleaned.match(/^([OBAFGKME])([0-9])([a-z]+)?$/i);
    if (!match) return null;

    const [_, char, tempStr, suffStr] = match;
    const starLetter = char.toUpperCase();
    const tempDigit = parseInt(tempStr);
    const suffixes = (suffStr || '').toLowerCase();

    const star = DATA.letters[starLetter];
    const traits = suffixes.split('').filter(s => DATA.suffixes[s]).map(s => DATA.suffixes[s]);

    // Resource & Biome Logic
    const isExtreme = suffixes.includes('e');
    const mainMetal = star.drive === 'None' ? 'Copper' : star.drive;

    let primaryBiome = "Balanced";
    if (tempDigit <= 3) primaryBiome = "Scorched / Desert";
    else if (tempDigit >= 7) primaryBiome = "Frozen / Tundra";
    else primaryBiome = "Lush / Tropical";

    return {
      star,
      temp: tempDigit,
      traits,
      projections: {
        primaryBiome,
        commonMetal: isExtreme ? `Activated ${mainMetal}` : mainMetal,
        specialty: suffixes.includes('f') ? "Salt / Cyto-phosphate" : "Carbon / Ferrite"
      }
    };
  }, [code]);

  return (
    <div className="min-h-screen bg-black text-slate-300 font-mono p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <header className="mb-8 text-center">
          <h1 className="text-xs uppercase tracking-[0.3em] text-cyan-500 mb-2">Stellar Analyzer v1.1</h1>
          <div className="h-1 w-12 bg-cyan-500 mx-auto"></div>
        </header>

        <input
          type="text"
          maxLength={6}
          placeholder="ENTER CLASS (e.g. B5pf)"
          className="w-full bg-slate-900 border-b-2 border-slate-700 p-4 text-2xl text-center outline-none focus:border-cyan-500 transition-colors uppercase tracking-widest text-white placeholder:opacity-20"
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />

        {analysis ? (
          <div className={`mt-8 p-6 border-l-4 rounded-r-lg ${analysis.star.bg} ${analysis.star.border} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            {/* Header Section */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className={`text-3xl font-black uppercase ${analysis.star.color}`}>{analysis.star.name}</h2>
                <p className="text-sm opacity-70">Hyperdrive: <span className="text-white font-bold">{analysis.star.drive}</span></p>
              </div>
              <div className="text-right">
                <span className="text-4xl font-light">{analysis.temp}</span>
                <p className="text-[10px] uppercase opacity-50">Heat Index</p>
              </div>
            </div>

            <p className="mb-6 text-sm italic border-b border-white/5 pb-4">"{analysis.star.desc}"</p>

            {/* Traits List */}
            <div className="space-y-4 mb-6">
              {analysis.traits.length > 0 ? analysis.traits.map(t => (
                <div key={t.label} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 bg-cyan-400 rotate-45" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-tighter text-cyan-400">{t.label}</p>
                    <p className="text-xs opacity-80">{t.note}</p>
                  </div>
                </div>
              )) : (
                <p className="text-[10px] uppercase opacity-40 italic font-bold">No standard peculiarities detected</p>
              )}
            </div>

            {/* Projection Grid */}
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-[10px] uppercase tracking-widest text-cyan-500 mb-3 font-bold">Surface Scan Projections</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/40 p-3 rounded border border-white/5">
                  <p className="text-[9px] uppercase opacity-50 mb-1">Dominant Biome</p>
                  <p className="text-xs text-white font-bold">{analysis.projections.primaryBiome}</p>
                </div>
                <div className="bg-black/40 p-3 rounded border border-white/5">
                  <p className="text-[9px] uppercase opacity-50 mb-1">Primary Mineral</p>
                  <p className={`text-xs font-bold ${analysis.star.color}`}>
                    {analysis.projections.commonMetal}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[9px] opacity-40 text-center uppercase">System potential: {analysis.projections.specialty} sources detected</p>
            </div>
          </div>
        ) : (
          <div className="mt-12 text-center">
            <p className="text-xs opacity-40 animate-pulse uppercase tracking-tighter">Awaiting valid spectral coordinates...</p>
            <div className="flex justify-center gap-2 mt-4 opacity-20">
              {['O', 'B', 'A', 'F', 'G', 'K', 'M', 'E'].map(l => <span key={l} className="text-[10px]">{l}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}