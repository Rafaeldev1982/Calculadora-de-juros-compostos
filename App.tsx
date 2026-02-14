
import React, { useState, useMemo, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Calculator, TrendingUp, RefreshCcw, Table as TableIcon, ChevronDown, ChevronUp
} from 'lucide-react';
import { SimulationInputs, SimulationSummary } from './types.ts';
import { calculateCompoundInterest, formatCurrency } from './utils/finance.ts';
import InfoSection from './components/InfoSection.tsx';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<SimulationInputs>({
    initialValue: 5000,
    monthlyValue: 500,
    interestRate: 12,
    period: 10,
    rateType: 'yearly',
    periodType: 'yearly',
  });

  const [result, setResult] = useState<SimulationSummary | null>(null);
  const [showTable, setShowTable] = useState(false);

  // Calcula inicialmente para não abrir a tela vazia
  useEffect(() => {
    handleCalculate();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: name === 'rateType' || name === 'periodType' ? value : parseFloat(value) || 0,
    }));
  };

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const res = calculateCompoundInterest(inputs);
    setResult(res);
  };

  const handleClear = () => {
    setInputs({ initialValue: 0, monthlyValue: 0, interestRate: 0, period: 1, rateType: 'yearly', periodType: 'yearly' });
  };

  const chartData = useMemo(() => {
    if (!result) return [];
    const step = Math.max(1, Math.floor(result.results.length / 50));
    return result.results.filter((_, idx) => idx % step === 0 || idx === result.results.length - 1);
  }, [result]);

  return (
    <div className="min-h-screen">
      <header className="bg-indigo-950 text-white pt-16 pb-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-500 rounded-2xl mb-6 shadow-xl shadow-emerald-500/20">
            <TrendingUp size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">SimuJuros</h1>
          <p className="text-emerald-100/60 text-lg max-w-xl mx-auto font-medium">
            Projete seu futuro financeiro com precisão e clareza.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 -mt-12 relative z-20 pb-20">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar de Parâmetros */}
          <div className="lg:col-span-4 bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-950/5 border border-slate-100 lg:sticky lg:top-8 z-30">
            <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center">
              <Calculator className="mr-3 text-emerald-600" size={24} /> Configurações
            </h2>
            
            <form onSubmit={handleCalculate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Valor Inicial</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                  <input type="number" name="initialValue" value={inputs.initialValue} onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-slate-700 outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Aporte Mensal</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                  <input type="number" name="monthlyValue" value={inputs.monthlyValue} onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-slate-700 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Taxa (%)</label>
                  <input type="number" step="0.01" name="interestRate" value={inputs.interestRate} onChange={handleInputChange}
                    className="w-full px-4 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-slate-700 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Tipo</label>
                  <select name="rateType" value={inputs.rateType} onChange={handleInputChange}
                    className="w-full px-4 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-slate-700 appearance-none cursor-pointer">
                    <option value="yearly">Anual</option>
                    <option value="monthly">Mensal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Período</label>
                  <input type="number" name="period" value={inputs.period} onChange={handleInputChange}
                    className="w-full px-4 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-slate-700 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Tempo</label>
                  <select name="periodType" value={inputs.periodType} onChange={handleInputChange}
                    className="w-full px-4 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-slate-700 appearance-none cursor-pointer">
                    <option value="yearly">Anos</option>
                    <option value="monthly">Meses</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <button type="submit" className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-extrabold text-lg hover:bg-emerald-600 shadow-xl shadow-emerald-500/30 transition-all active:scale-[0.98] flex items-center justify-center">
                  Simular Agora
                </button>
                <button type="button" onClick={handleClear} className="w-full text-slate-400 py-2 text-sm font-bold hover:text-slate-600 transition-colors flex items-center justify-center">
                  <RefreshCcw size={14} className="mr-2" /> Resetar campos
                </button>
              </div>
            </form>
          </div>

          {/* Resultados */}
          <div className="lg:col-span-8 space-y-8 relative z-10">
            {result ? (
              <>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 rounded-[2rem] text-white shadow-xl">
                    <p className="text-xs font-bold uppercase opacity-60 mb-1">Montante Final</p>
                    <h3 className="text-2xl font-black">{formatCurrency(result.totalAmount)}</h3>
                  </div>
                  <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg">
                    <p className="text-xs font-bold uppercase text-slate-400 mb-1">Total Investido</p>
                    <h3 className="text-2xl font-black text-slate-800">{formatCurrency(result.totalInvested)}</h3>
                  </div>
                  <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg">
                    <p className="text-xs font-bold uppercase text-emerald-600 mb-1">Ganho em Juros</p>
                    <h3 className="text-2xl font-black text-emerald-600">{formatCurrency(result.totalInterest)}</h3>
                  </div>
                </div>

                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl min-h-[500px]">
                  <h2 className="text-xl font-bold text-slate-800 mb-10 flex items-center">
                    <TrendingUp className="mr-3 text-emerald-500" /> Evolução do Patrimônio
                  </h2>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `Mês ${v}`} />
                        <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `R$${v/1000}k`} />
                        <Tooltip 
                          formatter={(value: any) => formatCurrency(value)}
                          labelFormatter={(label) => `Mês ${label}`}
                          contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', padding: '15px' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="totalAmount" 
                          name="Montante Total" 
                          stroke="#10b981" 
                          strokeWidth={4} 
                          fillOpacity={1} 
                          fill="url(#colorTotal)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="totalInvested" 
                          name="Capital Investido" 
                          stroke="#1e293b" 
                          strokeWidth={2} 
                          strokeDasharray="5 5" 
                          fill="transparent" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-lg overflow-hidden">
                  <button onClick={() => setShowTable(!showTable)} className="w-full flex items-center justify-between p-8 hover:bg-slate-50 transition-colors">
                    <span className="font-bold text-slate-800 flex items-center">
                      <TableIcon className="mr-3 text-emerald-500" /> Tabela Detalhada
                    </span>
                    {showTable ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                  </button>
                  {showTable && (
                    <div className="overflow-x-auto custom-scrollbar max-h-[500px] border-t border-slate-50">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-400 uppercase bg-slate-50/50">
                          <tr>
                            <th className="px-8 py-4">Mês</th>
                            <th className="px-8 py-4">Juros</th>
                            <th className="px-8 py-4">Investido</th>
                            <th className="px-8 py-4">Acumulado</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {result.results.map((row) => (
                            <tr key={row.month} className="hover:bg-emerald-50/30 transition-colors">
                              <td className="px-8 py-4 font-bold text-slate-700">{row.month}</td>
                              <td className="px-8 py-4 text-emerald-600 font-medium">+{formatCurrency(row.interest)}</td>
                              <td className="px-8 py-4 text-slate-500">{formatCurrency(row.totalInvested)}</td>
                              <td className="px-8 py-4 font-bold text-slate-800">{formatCurrency(row.totalAmount)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            ) : null}
            <InfoSection />
          </div>
        </div>
      </main>

      <footer className="bg-indigo-950 text-slate-500 py-16 text-center border-t border-white/5">
        <div className="container mx-auto px-4">
          <p className="font-bold text-white/20 text-2xl mb-4 italic">SimuJuros</p>
          <p className="text-sm">© {new Date().getFullYear()} SimuJuros - Educação Financeira</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
