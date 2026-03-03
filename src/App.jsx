import { useMemo, useState } from 'react';

const DATA = {
  letters: {
    // YELLOW (Standard)
    F: { name: 'Yellow-White', drive: 'Standard', metal: 'Copper', desc: 'Common. High chance of Lush biomes.', color: 'text-yellow-100', bg: 'bg-yellow-500/10', border: 'border-yellow-200' },
    G: { name: 'Yellow', drive: 'Standard', metal: 'Copper', desc: 'Sun-like. Balanced and common.', color: 'text-yellow-400', bg: 'bg-yellow-600/10', border: 'border-yellow-500' },

    // RED/ORANGE (Cadmium)
    K: { name: 'Yellow-Orange', drive: 'Cadmium Drive', metal: 'Cadmium', desc: 'Uncommon. Often uncharted. Desert/Arid worlds.', color: 'text-orange-500', bg: 'bg-orange-900/20', border: 'border-orange-600' },
    M: { name: 'Red', drive: 'Cadmium Drive', metal: 'Cadmium', desc: 'Coolest standard star. 95% are uncharted.', color: 'text-red-500', bg: 'bg-red-900/20', border: 'border-red-600' },

    // GREEN (Emeril)
    E: { name: 'Green', drive: 'Emeril Drive', metal: 'Emeril', desc: 'Rare. Specialized exotic and glitch biomes.', color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-500' },

    // BLUE (Indium)
    B: { name: 'Blue-White', drive: 'Indium Drive', metal: 'Indium', desc: 'Very hot and rare. Contains high-value resources.', color: 'text-cyan-300', bg: 'bg-cyan-900/10', border: 'border-cyan-400' },
    O: { name: 'Blue', drive: 'Indium Drive', metal: 'Indium', desc: 'Hottest/Rarest. Most extreme planetary conditions.', color: 'text-blue-400', bg: 'bg-blue-900/20', border: 'border-blue-500' },

    // PURPLE (Atlantid)
    X: { name: 'Deep Purple', drive: 'Atlantid Drive', metal: 'Quartzite', desc: 'Void-touched. Gas Giants & Deep Oceans present.', color: 'text-purple-400', bg: 'bg-purple-900/30', border: 'border-purple-600' },
    Y: { name: 'Purple Dwarf', drive: 'Atlantid Drive', metal: 'Quartzite', desc: 'Hidden spectrum. High probability of Ruined planets.', color: 'text-violet-500', bg: 'bg-violet-900/30', border: 'border-violet-600' },
  },
  suffixes: {
    p: { label: 'Peculiar', note: 'Anomalous/Glitch planetary signatures.' },
    f: { label: 'Fresh', note: 'Liquid water detected. (Oceans)' },
    m: { label: 'Metallic', note: 'Rich metal deposits in crust.' },
    e: { label: 'Emission', note: 'High radiation / Activated minerals.' },
    v: { label: 'Variable', note: 'Unstable star; volatile weather.' },
  }
};

export default function App() {
  const [code, setCode] = useState('');

  const analysis = useMemo(() => {
    const cleaned = code.trim();
    const match = cleaned.match(/^([OBAFGKME XY])([0-9])([a-z]+)?$/i);
    if (!match) return null;

    const [_, char, tempStr, suffStr] = match;
    const starLetter = char.toUpperCase();
    const tempDigit = parseInt(tempStr);
    const suffixes = (suffStr || '').toLowerCase();

    const star = DATA.letters[starLetter];
    const traits = suffixes.split('').filter(s => DATA.suffixes[s]).map(s => DATA.suffixes[s]);

    // Resource Logic
    const isExtreme = suffixes.includes('e');
    const isPurple = ['X', 'Y'].includes(starLetter);

    let primaryBiome = "Balanced";
    if (isPurple) primaryBiome = "Gas Giant / Ruined";
    else if (tempDigit <= 3) primaryBiome = "Scorched / Desert";
    else if (tempDigit >= 7) primaryBiome = "Frozen / Tundra";
    else primaryBiome = "Lush / Tropical";

    return {
      star,
      temp: tempDigit,
      traits,
      projections: {
        primaryBiome,
        commonMetal: isExtreme && star.metal !== 'Quartzite' ? `Activated ${star.metal}` : star.metal,
        specialty: isPurple ? "High chance: Deep Oceans" : (suffixes.includes('f') ? "Salt / Cyto-phosphate" : "Carbon / Ferrite")
      }
    };
  }, [code]);

  return (
    <div className="min-h-screen bg-black text-slate-300 font-mono p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <header className="mb-8 text-center">
          <h1 className="text-xs uppercase tracking-[0.4em] text-cyan-500 mb-2">Stellar Multi-Tool</h1>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto"></div>
        </header>

        <input
          type="text"
          maxLength={6}
          placeholder="ENTER CODE (B5PF)"
          className="w-full bg-transparent border-b border-slate-800 p-4 text-3xl text-center outline-none focus:border-cyan-500 transition-all uppercase tracking-[0.2em] text-white placeholder:opacity-10"
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />

        {analysis ? (
          <div className={`mt-8 p-6 border-t-2 rounded-b-xl ${analysis.star.bg} ${analysis.star.border} animate-in fade-in zoom-in-95 duration-300`}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className={`text-2xl font-black uppercase tracking-tight ${analysis.star.color}`}>{analysis.star.name} System</h2>
                <p className="text-[10px] uppercase tracking-widest opacity-60">Requires: <span className="text-white">{analysis.star.drive}</span></p>
              </div>
              <div className="bg-white/5 p-2 rounded text-center min-w-[50px]">
                <span className="text-2xl font-bold block leading-none">{analysis.temp}</span>
                <span className="text-[8px] uppercase opacity-50">Heat</span>
              </div>
            </div>

            <p className="mb-6 text-xs leading-relaxed opacity-80 border-l-2 border-white/10 pl-3">
              {analysis.star.desc}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-black/40 p-3 rounded border border-white/5">
                <p className="text-[9px] uppercase opacity-40 mb-1 font-bold">Projected Biome</p>
                <p className="text-xs text-white font-bold uppercase">{analysis.projections.primaryBiome}</p>
              </div>
              <div className="bg-black/40 p-3 rounded border border-white/5">
                <p className="text-[9px] uppercase opacity-40 mb-1 font-bold">Primary Resource</p>
                <p className={`text-xs font-bold uppercase ${analysis.star.color}`}>{analysis.projections.commonMetal}</p>
              </div>
            </div>

            {analysis.traits.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-white/5">
                {analysis.traits.map(t => (
                  <div key={t.label} className="flex items-center gap-3">
                    <div className="h-1 w-1 bg-cyan-400"></div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-cyan-400">{t.label}: </span>
                      <span className="text-[10px] opacity-70">{t.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="mt-6 text-[8px] text-center opacity-30 uppercase tracking-[0.2em]">
              Scan Analysis: {analysis.projections.specialty}
            </p>
          </div>
        ) : (
          <div className="mt-12 text-center opacity-20">
            <p className="text-[10px] uppercase tracking-[0.3em]">Awaiting Spectral Input</p>
          </div>
        )}
      </div>
    </div>
  );
}