import { useMemo, useState, useEffect } from 'react';

const DATA = {
  letters: {
    F: { name: 'Yellow-White', drive: 'Standard', metal: 'Copper', desc: 'Common. High chance of Lush biomes.', color: 'text-yellow-200', bg: 'bg-yellow-500/15', border: 'border-yellow-400/50' },
    G: { name: 'Yellow', drive: 'Standard', metal: 'Copper', desc: 'Sun-like. Balanced and common.', color: 'text-yellow-400', bg: 'bg-yellow-600/15', border: 'border-yellow-500/50' },
    K: { name: 'Yellow-Orange', drive: 'Cadmium Drive', metal: 'Cadmium', desc: 'Uncommon. Often uncharted. Desert/Arid worlds.', color: 'text-orange-400', bg: 'bg-orange-600/15', border: 'border-orange-500/50' },
    M: { name: 'Red', drive: 'Cadmium Drive', metal: 'Cadmium', desc: 'Coolest standard star. 95% are uncharted.', color: 'text-red-400', bg: 'bg-red-600/15', border: 'border-red-500/50' },
    E: { name: 'Green', drive: 'Emeril Drive', metal: 'Emeril', desc: 'Rare. Specialized exotic and glitch biomes.', color: 'text-emerald-400', bg: 'bg-emerald-600/15', border: 'border-emerald-500/50' },
    B: { name: 'Blue-White', drive: 'Indium Drive', metal: 'Indium', desc: 'Very hot and rare. Contains high-value resources.', color: 'text-cyan-300', bg: 'bg-cyan-600/15', border: 'border-cyan-400/50' },
    O: { name: 'Blue', drive: 'Indium Drive', metal: 'Indium', desc: 'Hottest/Rarest. Most extreme planetary conditions.', color: 'text-blue-400', bg: 'bg-blue-600/15', border: 'border-blue-500/50' },
    X: { name: 'Deep Purple', drive: 'Atlantid Drive', metal: 'Quartzite', desc: 'Void-touched. Gas Giants & Deep Oceans present.', color: 'text-purple-300', bg: 'bg-purple-600/15', border: 'border-purple-500/50' },
    Y: { name: 'Purple Dwarf', drive: 'Atlantid Drive', metal: 'Quartzite', desc: 'Hidden spectrum. High probability of Ruined planets.', color: 'text-violet-300', bg: 'bg-violet-600/15', border: 'border-violet-500/50' },
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
  const [demoCodes, setDemoCodes] = useState([]);

  const generateCodes = () => {
    const letters = Object.keys(DATA.letters);
    const suffixes = Object.keys(DATA.suffixes);

    const newCodes = Array.from({ length: 4 }, () => {
      const l = letters[Math.floor(Math.random() * letters.length)];
      const d = Math.floor(Math.random() * 10);
      const numSuffixes = Math.floor(Math.random() * 3); // 0 to 2 suffixes

      const shuffledSuffixes = [...suffixes].sort(() => 0.5 - Math.random());
      const s = shuffledSuffixes.slice(0, numSuffixes).join('');

      return `${l}${d}${s}`.toUpperCase();
    });

    setDemoCodes(newCodes);
  };

  useEffect(() => {
    generateCodes();
  }, []);

  const analysis = useMemo(() => {
    const cleaned = code.trim();
    const match = cleaned.match(/^([OBAFGKME XY])([0-9])([a-z]+)?$/i);
    if (!match) return null;

    const [_, char, tempStr, suffStr] = match;
    const starLetter = char.toUpperCase();
    const tempDigit = parseInt(tempStr);
    const suffixes = (suffStr || '').toLowerCase();

    const star = DATA.letters[starLetter];
    // If somehow a valid letter by regex isn't in data, fail gracefully
    if (!star) return null;

    const traits = suffixes.split('').filter(s => DATA.suffixes[s]).map(s => DATA.suffixes[s]);
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
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 to-slate-950 text-slate-200 font-mono p-4 sm:p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <header className="mb-8 text-center">
          <h1 className="text-xs font-bold uppercase tracking-[0.4em] text-cyan-400 mb-3 shadow-cyan-500/50 drop-shadow-md">Stellar Multi-Tool</h1>
          <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto rounded-full"></div>
        </header>

        <div className="relative group">
          <input
            type="text"
            maxLength={6}
            placeholder="ENTER CODE"
            className="w-full bg-slate-800/60 border border-slate-600 rounded-xl p-5 text-3xl text-center outline-none focus:border-cyan-400 focus:bg-slate-800 focus:ring-2 focus:ring-cyan-400/20 transition-all uppercase tracking-[0.2em] text-white placeholder:text-slate-500 shadow-inner backdrop-blur-sm"
            onChange={(e) => setCode(e.target.value)}
            value={code}
          />
        </div>

        {analysis ? (
          <div className={`mt-8 p-6 border-t-4 rounded-xl shadow-2xl backdrop-blur-md bg-slate-800/40 ${analysis.star.bg} ${analysis.star.border} animate-in fade-in zoom-in-95 duration-300`}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className={`text-2xl font-black uppercase tracking-tight drop-shadow-sm ${analysis.star.color}`}>{analysis.star.name} System</h2>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-1">Requires: <span className="text-slate-200">{analysis.star.drive}</span></p>
              </div>
              <div className="bg-slate-900/60 p-2 rounded-lg border border-white/10 text-center min-w-[56px] shadow-inner">
                <span className="text-2xl font-bold block leading-none text-white">{analysis.temp}</span>
                <span className="text-[8px] uppercase text-slate-400 font-bold tracking-wider">Heat</span>
              </div>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-slate-300 border-l-2 border-white/20 pl-3">
              {analysis.star.desc}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50 shadow-inner">
                <p className="text-[9px] uppercase text-slate-400 mb-1 font-bold tracking-wider">Projected Biome</p>
                <p className="text-xs text-white font-bold uppercase tracking-wide">{analysis.projections.primaryBiome}</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50 shadow-inner">
                <p className="text-[9px] uppercase text-slate-400 mb-1 font-bold tracking-wider">Primary Resource</p>
                <p className={`text-xs font-bold uppercase tracking-wide drop-shadow-sm ${analysis.star.color}`}>{analysis.projections.commonMetal}</p>
              </div>
            </div>

            {analysis.traits.length > 0 && (
              <div className="space-y-3 pt-5 border-t border-slate-700/50">
                {analysis.traits.map(t => (
                  <div key={t.label} className="flex items-center gap-3 bg-slate-800/30 p-2 rounded-md">
                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-cyan-300 tracking-wider">{t.label}: </span>
                      <span className="text-[10px] text-slate-300">{t.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-[9px] text-center text-slate-400 uppercase tracking-[0.2em] font-semibold">
                Scan Analysis: <span className="text-slate-300">{analysis.projections.specialty}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-12 text-center text-slate-500">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Awaiting Spectral Input</p>
          </div>
        )}

        {/* Demo Codes Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-3 px-1">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Detected Signatures</p>
            <button
              onClick={generateCodes}
              className="text-[10px] text-cyan-500 hover:text-cyan-300 uppercase tracking-widest font-bold transition-colors"
            >
              Rescan
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {demoCodes.map((demoCode, i) => (
              <button
                key={`${demoCode}-${i}`}
                onClick={() => setCode(demoCode)}
                className="bg-slate-800/50 hover:bg-slate-700/80 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-white text-xs sm:text-sm font-bold py-3 rounded-lg transition-all tracking-wider shadow-sm active:scale-95"
              >
                {demoCode}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}