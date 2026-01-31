
import React, { useState, useCallback, useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  Calculator as CalcIcon, 
  Info, 
  TrendingUp, 
  RefreshCcw, 
  Table as TableIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SimulationInputs, SimulationSummary, RateType, PeriodType } from './types';
import { calculateCompoundInterest, formatCurrency } from './utils/finance';
import InfoSection from './components/InfoSection';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<SimulationInputs>({
    initialValue: 1000,
    monthlyValue: 500,
    interestRate: 12,
    period: 10,
    rateType: 'yearly',
    periodType: 'yearly',
  });

  const [result, setResult] = useState<SimulationSummary | null>(null);
  const [showTable, setShowTable] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: name === 'rateType' || name === 'periodType' ? value : parseFloat(value) || 0,
    }));
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateCompoundInterest(inputs);
    setResult(res);
  };

  const handleClear = () => {
    setInputs({
      initialValue: 0,
      monthlyValue: 0,
      interestRate: 0,
      period: 1,
      rateType: 'yearly',
      periodType: 'yearly',
    });
    setResult(null);
  };

  const chartData = useMemo(() => {
    if (!result) return [];
    const step = Math.max(1, Math.floor(result.results.length / 40));
    return result.results.filter((_, idx) => idx % step === 0 || idx === result.results.length - 1);
  }, [result]);

  return (
    <div className="min-h-screen pb-20">
      {/* Header - Novo tom Azul/Índigo Profundo */}
      <header className="bg-indigo-950 text-white py-12 mb-8 shadow-lg border-b border-emerald-500/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-emerald-500 p-2 rounded-lg mr-4">
              <TrendingUp className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">SimuJuros</h1>
          </div>
          <p className="text-emerald-100/70 text-lg opacity-90 max-w-2xl mx-auto">
            Simule o crescimento do seu patrimônio com a inteligência dos juros compostos.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Section */}
          <div className="lg:col-span-4 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 lg:sticky lg:top-8 z-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <CalcIcon className="mr-2 text-emerald-700" /> Parâmetros
            </h2>
            
            <form onSubmit={handleCalculate} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Valor inicial (R$)</label>
                <input
                  type="number"
                  name="initialValue"
                  value={inputs.initialValue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-lg font-medium outline-none"
                  placeholder="Ex: 1000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Aporte mensal (R$)</label>
                <input
                  type="number"
                  name="monthlyValue"
                  value={inputs.monthlyValue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-lg font-medium outline-none"
                  placeholder="Ex: 500"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Taxa de juros (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="interestRate"
                    value={inputs.interestRate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-lg font-medium outline-none"
                    placeholder="8"
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">&nbsp;</label>
                  <select
                    name="rateType"
                    value={inputs.rateType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-emerald-500 outline-none appearance-none font-medium cursor-pointer"
                  >
                    <option value="yearly">Anual</option>
                    <option value="monthly">Mensal</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Período</label>
                  <input
                    type="number"
                    name="period"
                    value={inputs.period}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-lg font-medium outline-none"
                    placeholder="10"
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">&nbsp;</label>
                  <select
                    name="periodType"
                    value={inputs.periodType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-emerald-500 outline-none appearance-none font-medium cursor-pointer"
                  >
                    <option value="yearly">Anos</option>
                    <option value="monthly">Meses</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 shadow-lg shadow-emerald-200/50 transition-all active:scale-95"
                >
                  Calcular Simulação
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-full bg-gray-100 text-gray-500 py-3 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-all flex items-center justify-center"
                >
                  <RefreshCcw className="w-4 h-4 mr-2" /> Limpar Dados
                </button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-8 space-y-8 relative z-10">
            {result ? (
              <>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-emerald-700 text-white p-6 rounded-3xl shadow-lg border-b-8 border-emerald-900 transform hover:-translate-y-1 transition-transform">
                    <p className="text-xs uppercase font-bold opacity-80 mb-2">Valor Total Final</p>
                    <h3 className="text-2xl font-black">{formatCurrency(result.totalAmount)}</h3>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 transform hover:-translate-y-1 transition-transform">
                    <p className="text-xs uppercase font-bold text-gray-400 mb-2">Total Investido</p>
                    <h3 className="text-2xl font-black text-gray-800">{formatCurrency(result.totalInvested)}</h3>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 transform hover:-translate-y-1 transition-transform">
                    <p className="text-xs uppercase font-bold text-emerald-600 mb-2">Total em Juros</p>
                    <h3 className="text-2xl font-black text-emerald-700">{formatCurrency(result.totalInterest)}</h3>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                      <TrendingUp className="mr-2 text-emerald-600" /> Gráfico de Crescimento
                    </h2>
                    <div className="flex gap-4 text-xs font-bold">
                      <span className="flex items-center"><span className="w-3 h-3 bg-emerald-600 rounded-full mr-1"></span> Juros</span>
                      <span className="flex items-center"><span className="w-3 h-3 bg-slate-800 rounded-full mr-1"></span> Investido</span>
                    </div>
                  </div>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1e293b" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#1e293b" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="month" 
                          stroke="#94a3b8" 
                          fontSize={11} 
                          tickLine={false} 
                          axisLine={false}
                          tickFormatter={(val) => `Mês ${val}`}
                        />
                        <YAxis 
                          stroke="#94a3b8" 
                          fontSize={11} 
                          tickLine={false} 
                          axisLine={false}
                          tickFormatter={(val) => `R$ ${val / 1000}k`}
                        />
                        <Tooltip 
                          formatter={(value: number) => formatCurrency(value)}
                          labelFormatter={(label) => `Mês ${label}`}
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="totalAmount" 
                          name="Total Acumulado"
                          stroke="#059669" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorInterest)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="totalInvested" 
                          name="Capital Investido"
                          stroke="#1e293b" 
                          strokeWidth={2}
                          strokeDasharray="4 4"
                          fillOpacity={1} 
                          fill="url(#colorInvested)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                  <button 
                    onClick={() => setShowTable(!showTable)}
                    className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <TableIcon className="mr-3 text-emerald-600 w-5 h-5" />
                      <span className="font-bold text-gray-800">Ver Tabela de Evolução Mensal</span>
                    </div>
                    {showTable ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                  </button>
                  
                  {showTable && (
                    <div className="overflow-x-auto p-4 max-h-[500px] overflow-y-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0">
                          <tr>
                            <th className="px-4 py-3 font-bold">Mês</th>
                            <th className="px-4 py-3 font-bold">Juros</th>
                            <th className="px-4 py-3 font-bold">Total Investido</th>
                            <th className="px-4 py-3 font-bold">Total Juros</th>
                            <th className="px-4 py-3 font-bold">Total Acumulado</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {result.results.map((row) => (
                            <tr key={row.month} className="hover:bg-emerald-50/50 transition-colors">
                              <td className="px-4 py-3 font-medium text-slate-900">{row.month}</td>
                              <td className="px-4 py-3 text-emerald-600 font-medium">+{formatCurrency(row.interest)}</td>
                              <td className="px-4 py-3 text-slate-600">{formatCurrency(row.totalInvested)}</td>
                              <td className="px-4 py-3 text-emerald-800">{formatCurrency(row.totalInterest)}</td>
                              <td className="px-4 py-3 font-bold text-slate-900">{formatCurrency(row.totalAmount)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200 p-12 text-center text-gray-400">
                <CalcIcon className="w-20 h-20 mb-4 opacity-10" />
                <h3 className="text-xl font-bold mb-2 text-gray-500">Pronto para começar?</h3>
                <p>Insira os dados e visualize a evolução do seu dinheiro no tempo.</p>
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10">
          <InfoSection />
        </div>
      </main>

      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© {new Date().getFullYear()} SimuJuros - Planejamento inteligente.</p>
          <p className="text-xs opacity-50">Valores simulados. Rentabilidade passada não garante rentabilidade futura.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
