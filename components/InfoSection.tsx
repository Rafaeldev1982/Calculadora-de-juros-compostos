
import React from 'react';

const InfoSection: React.FC = () => {
  return (
    <div className="mt-12 space-y-12 text-gray-700 leading-relaxed max-w-4xl mx-auto px-4">
      <section>
        <h2 className="text-3xl font-bold text-emerald-900 mb-6 border-b-2 border-emerald-100 pb-2">Guia Prático: Como utilizar o simulador</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-emerald-800 mb-4 flex items-center">
              <span className="bg-emerald-800 text-white w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 text-sm">1</span>
              Aporte Inicial
            </h3>
            <p className="text-sm">Defina o montante que você já possui guardado ou que pretende depositar no primeiro dia do investimento.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-emerald-800 mb-4 flex items-center">
              <span className="bg-emerald-800 text-white w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 text-sm">2</span>
              Investimento Recorrente
            </h3>
            <p className="text-sm">Informe o valor que planeja economizar e investir todos os meses. É este campo que cria o efeito "bola de neve".</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-emerald-800 mb-4 flex items-center">
              <span className="bg-emerald-800 text-white w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 text-sm">3</span>
              Rentabilidade Estimada
            </h3>
            <p className="text-sm">Escolha a taxa de juros (mensal ou anual). Dica: A poupança rende cerca de 0,5% + TR, enquanto o CDI gira em torno da Taxa Selic.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-emerald-800 mb-4 flex items-center">
              <span className="bg-emerald-800 text-white w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 text-sm">4</span>
              Horizonte de Tempo
            </h3>
            <p className="text-sm">O tempo é o melhor amigo dos juros compostos. Quanto mais tempo o dinheiro ficar aplicado, maior será a curva de crescimento.</p>
          </div>
        </div>
      </section>

      <section className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">A Ciência por trás dos Juros Compostos</h2>
        <p className="mb-4">
          Diferente dos juros simples, onde o rendimento é calculado apenas sobre o capital inicial, nos <strong>juros compostos</strong> o rendimento de cada período é somado ao capital para o cálculo do juro seguinte.
        </p>
        <div className="bg-white p-6 rounded-lg text-center shadow-inner border border-emerald-200 my-6">
          <p className="text-lg font-mono font-bold text-emerald-800">M = C × (1 + i)^t</p>
        </div>
        <ul className="space-y-2 list-disc list-inside text-sm text-gray-600">
          <li><strong>M (Montante):</strong> O valor final acumulado.</li>
          <li><strong>C (Capital):</strong> O valor investido inicialmente.</li>
          <li><strong>i (Taxa):</strong> A taxa de juros em formato decimal.</li>
          <li><strong>t (Tempo):</strong> O período em que o dinheiro fica rendendo.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Por que investir a longo prazo?</h2>
        <p>
          Imagine investir <strong>R$ 1.000</strong> por mês a uma taxa de <strong>10% ao ano</strong>. Em 10 anos, você terá cerca de <strong>R$ 200 mil</strong>. Em 30 anos, esse valor salta para <strong>R$ 2,2 milhões</strong>. 
          A diferença gritante acontece porque, no final do período, os juros mensais gerados são muito maiores do que o valor que você tira do próprio bolso.
        </p>
        <div className="mt-6 p-4 bg-gray-50 rounded border-l-4 border-emerald-800 italic">
          "Os juros compostos são a oitava maravilha do mundo. Aquele que entende, ganha; aquele que não entende, paga." — Albert Einstein
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 pb-12">
        <div>
          <h3 className="font-bold text-lg text-emerald-900 mb-2 underline decoration-emerald-200">Aplicações Práticas</h3>
          <ul className="space-y-2 text-sm">
            <li>✅ <strong>Tesouro Direto:</strong> Empreste dinheiro ao governo com segurança.</li>
            <li>✅ <strong>CDBs:</strong> Empreste para bancos e receba com juros.</li>
            <li>✅ <strong>Dividendos:</strong> Reinvista lucros de ações para acelerar o processo.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg text-emerald-900 mb-2 underline decoration-emerald-200">O Lado Sombrio</h3>
          <p className="text-sm">
            Cuidado: os juros compostos também funcionam contra você no <strong>cartão de crédito</strong> e no <strong>cheque especial</strong>. Uma dívida pequena pode se tornar impagável em poucos meses devido a esse mesmo efeito exponencial.
          </p>
        </div>
      </section>
    </div>
  );
};

export default InfoSection;
