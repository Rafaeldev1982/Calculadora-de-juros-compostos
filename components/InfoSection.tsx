
import React from 'react';

const InfoSection: React.FC = () => {
  return (
    <div className="mt-16 space-y-12 text-gray-700 leading-relaxed max-w-4xl mx-auto">
      <section>
        <h2 className="text-3xl font-bold text-emerald-900 mb-6 border-b-2 border-emerald-100 pb-2">Guia do Investidor</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-50 hover:border-emerald-200 transition-colors">
            <h3 className="font-bold text-emerald-800 mb-3 flex items-center italic">Aporte Inicial</h3>
            <p className="text-sm text-gray-600">O pontapé de saída. Quanto maior o valor inicial, mais rápido os juros começam a trabalhar a seu favor.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-50 hover:border-emerald-200 transition-colors">
            <h3 className="font-bold text-emerald-800 mb-3 flex items-center italic">Constância Mensal</h3>
            <p className="text-sm text-gray-600">Aportes mensais alimentam a "máquina". Eles garantem que o principal cresça, gerando juros sobre valores cada vez maiores.</p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-emerald-900 to-indigo-950 p-10 rounded-3xl text-white shadow-xl">
        <h2 className="text-2xl font-bold mb-4">A Força do Exponencial</h2>
        <p className="mb-6 opacity-90">
          Nos juros compostos, o tempo não é apenas um fator somador, ele é um <strong>potencializador</strong>. 
          Enquanto no início a curva parece lenta, após alguns anos ela inclina-se drasticamente para cima.
        </p>
        <div className="bg-white/10 p-4 rounded-xl border border-white/20 text-center backdrop-blur-sm">
          <span className="text-sm uppercase tracking-widest opacity-60">Fórmula Mágica</span>
          <p className="text-2xl font-mono mt-2">M = C (1 + i)<sup>t</sup></p>
        </div>
      </section>

      <section className="pb-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Dicas de Sucesso</h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="text-emerald-500 mr-2">●</span>
            <span><strong>Reinvista os dividendos:</strong> Não saque os lucros se quiser ver o efeito bola de neve em sua plenitude.</span>
          </li>
          <li className="flex items-start">
            <span className="text-emerald-500 mr-2">●</span>
            <span><strong>Atenção à inflação:</strong> Lembre-se que o poder de compra muda. Considere taxas de juros reais (juros nominais - inflação).</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default InfoSection;
