import React, { useState, useCallback, useRef } from 'react';
import { AppStep, UserInputState, AgentOption, GoalOption } from './types';
import { AGENTS, GOALS, TONES } from './constants';
import { generateOptimizedPrompt, executePrompt } from './services/geminiService';
import { StepIndicator } from './components/StepIndicator';
import { IconRenderer } from './components/IconRenderer';
import { 
  ArrowRight, ArrowLeft, Wand2, Copy, Play, Loader2, Sparkles, RefreshCw 
} from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.IDEA);
  const [isLoading, setIsLoading] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [executionResult, setExecutionResult] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'prompt' | 'result'>('prompt');
  
  // State for user inputs
  const [inputs, setInputs] = useState<UserInputState>({
    idea: '',
    agent: null,
    goal: null,
    audience: '',
    tone: '',
    language: 'Português (Brasil)',
  });

  const nextStep = () => {
    if (step < AppStep.RESULT) setStep(s => s + 1);
  };

  const prevStep = () => {
    if (step > AppStep.IDEA) setStep(s => s - 1);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const prompt = await generateOptimizedPrompt(inputs);
      setGeneratedPrompt(prompt);
      setStep(AppStep.RESULT);
    } catch (error) {
      alert("Erro ao gerar prompt. Verifique o console.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    setActiveTab('result');
    try {
      const result = await executePrompt(generatedPrompt);
      setExecutionResult(result);
    } catch (error) {
      setExecutionResult("Erro ao executar o prompt.");
    } finally {
      setIsExecuting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // --- RENDERERS FOR EACH STEP ---

  const renderIdeaStep = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">O que você quer criar hoje?</h2>
        <p className="text-slate-400">Comece descrevendo sua ideia bruta. Não se preocupe com detalhes ainda.</p>
      </div>
      <div className="relative group">
        <textarea
          value={inputs.idea}
          onChange={(e) => setInputs({ ...inputs, idea: e.target.value })}
          placeholder="Ex: Quero criar um curso sobre finanças pessoais para jovens..."
          className="w-full h-48 bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none shadow-inner"
        />
        <div className="absolute bottom-4 right-4">
          <span className={`text-xs ${inputs.idea.length > 10 ? 'text-green-500' : 'text-slate-500'}`}>
            {inputs.idea.length} caracteres
          </span>
        </div>
      </div>
    </div>
  );

  const renderAgentStep = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Quem é o especialista?</h2>
        <p className="text-slate-400">Escolha a "persona" que a IA deve adotar para este trabalho.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
        {AGENTS.map((agent) => (
          <button
            key={agent.id}
            onClick={() => setInputs({ ...inputs, agent })}
            className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-start gap-4 group
              ${inputs.agent?.id === agent.id 
                ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-500/20' 
                : 'bg-slate-800/50 border-slate-700 hover:border-indigo-400 hover:bg-slate-800'}`}
          >
            <div className={`p-3 rounded-lg ${inputs.agent?.id === agent.id ? 'bg-white/20' : 'bg-slate-700 group-hover:bg-slate-600'} transition-colors`}>
              <IconRenderer name={agent.iconName} className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-100">{agent.label}</h3>
              <p className={`text-sm mt-1 ${inputs.agent?.id === agent.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                {agent.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderGoalStep = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Qual é o objetivo final?</h2>
        <p className="text-slate-400">O que você espera receber como resultado tangível?</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
        {GOALS.map((goal) => (
          <button
            key={goal.id}
            onClick={() => setInputs({ ...inputs, goal })}
            className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-start gap-4 group
              ${inputs.goal?.id === goal.id 
                ? 'bg-fuchsia-600 border-fuchsia-500 shadow-lg shadow-fuchsia-500/20' 
                : 'bg-slate-800/50 border-slate-700 hover:border-fuchsia-400 hover:bg-slate-800'}`}
          >
            <div className={`p-3 rounded-lg ${inputs.goal?.id === goal.id ? 'bg-white/20' : 'bg-slate-700 group-hover:bg-slate-600'} transition-colors`}>
              <IconRenderer name={goal.iconName} className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-100">{goal.label}</h3>
              <p className={`text-sm mt-1 ${inputs.goal?.id === goal.id ? 'text-fuchsia-100' : 'text-slate-400'}`}>
                {goal.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderDetailsStep = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Refinamento Final</h2>
        <p className="text-slate-400">Dê contexto extra para tornar o prompt "World-Class".</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Audience */}
        <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300">Público Alvo</label>
            <input 
                type="text" 
                placeholder="Ex: C-Level, Estudantes, Desenvolvedores Senior..."
                value={inputs.audience}
                onChange={(e) => setInputs({...inputs, audience: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
        </div>

        {/* Language */}
        <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300">Idioma da Resposta</label>
            <select 
                value={inputs.language}
                onChange={(e) => setInputs({...inputs, language: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
                <option>Português (Brasil)</option>
                <option>English (US)</option>
                <option>Español</option>
                <option>Français</option>
            </select>
        </div>

        {/* Tone Selection */}
        <div className="col-span-1 md:col-span-2 space-y-3">
            <label className="block text-sm font-medium text-slate-300">Tom de Voz</label>
            <div className="flex flex-wrap gap-2">
                {TONES.map(t => (
                    <button
                        key={t}
                        onClick={() => setInputs({...inputs, tone: t})}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-colors
                            ${inputs.tone === t 
                                ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' 
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                    >
                        {t}
                    </button>
                ))}
            </div>
            <input 
                type="text" 
                placeholder="Ou digite um tom personalizado..."
                value={inputs.tone}
                onChange={(e) => setInputs({...inputs, tone: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none mt-2"
            />
        </div>
      </div>

      <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50 mt-6">
        <h4 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Resumo do Pedido</h4>
        <div className="flex flex-wrap gap-2 text-sm">
            {inputs.agent && <span className="bg-indigo-900/50 text-indigo-200 px-2 py-1 rounded border border-indigo-800">Agente: {inputs.agent.label}</span>}
            {inputs.goal && <span className="bg-fuchsia-900/50 text-fuchsia-200 px-2 py-1 rounded border border-fuchsia-800">Objetivo: {inputs.goal.label}</span>}
            {inputs.audience && <span className="bg-blue-900/50 text-blue-200 px-2 py-1 rounded border border-blue-800">Para: {inputs.audience}</span>}
        </div>
      </div>
    </div>
  );

  const renderResultStep = () => (
    <div className="space-y-6 animate-fade-in h-full flex flex-col">
      <div className="flex items-center justify-center gap-2 mb-4">
        <button 
            onClick={() => setActiveTab('prompt')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'prompt' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
            Prompt Gerado
        </button>
        <button 
            onClick={() => setActiveTab('result')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'result' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
            Resultado da IA
        </button>
      </div>

      <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden relative shadow-2xl">
        {activeTab === 'prompt' ? (
            <div className="h-full flex flex-col">
                <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                    <pre className="whitespace-pre-wrap font-mono text-sm text-indigo-100 leading-relaxed">
                        {generatedPrompt}
                    </pre>
                </div>
                <div className="p-4 bg-slate-800 border-t border-slate-700 flex justify-end gap-3">
                    <button 
                        onClick={() => copyToClipboard(generatedPrompt)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium text-sm"
                    >
                        <Copy size={16} /> Copiar
                    </button>
                    <button 
                        onClick={handleExecute}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium text-sm"
                    >
                       <Play size={16} /> Executar na IA Agora
                    </button>
                </div>
            </div>
        ) : (
            <div className="h-full flex flex-col">
                 <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-slate-950">
                    {isExecuting ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                            <Loader2 size={48} className="animate-spin text-indigo-500" />
                            <p>A IA está processando seu super prompt...</p>
                        </div>
                    ) : executionResult ? (
                        <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-white">
                           {/* Simple rendering of markdown-like text */}
                           {executionResult.split('\n').map((line, i) => (
                               <p key={i} className="mb-2">{line}</p>
                           ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4">
                            <Sparkles size={48} />
                            <p>Clique em "Executar" para ver a mágica acontecer.</p>
                             <button 
                                onClick={handleExecute}
                                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
                            >
                                Executar
                            </button>
                        </div>
                    )}
                 </div>
            </div>
        )}
      </div>
      
      <div className="text-center pt-2">
          <button 
            onClick={() => { setStep(AppStep.IDEA); setGeneratedPrompt(''); setExecutionResult(''); setInputs({ idea: '', agent: null, goal: null, audience: '', tone: '', language: 'Português' }); }}
            className="text-slate-500 hover:text-indigo-400 text-sm flex items-center justify-center gap-2 mx-auto"
          >
            <RefreshCw size={14} /> Criar Novo Prompt
          </button>
      </div>
    </div>
  );

  // --- NAVIGATION VALIDATION ---
  const isNextDisabled = () => {
      if (step === AppStep.IDEA) return inputs.idea.length < 5;
      if (step === AppStep.AGENT) return !inputs.agent;
      if (step === AppStep.GOAL) return !inputs.goal;
      return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-4 md:p-8">
      
      {/* Header */}
      <header className="w-full max-w-5xl flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/30">
                <Wand2 className="text-white" size={24} />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">PromptMaster <span className="text-indigo-400">AI</span></h1>
                <p className="text-xs text-slate-400">GenAI Prompt Engineer</p>
            </div>
        </div>
      </header>

      {/* Main Card */}
      <main className="w-full max-w-5xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:min-h-[700px]">
        
        {/* Progress Bar Area */}
        <div className="px-8 pt-8">
            <StepIndicator currentStep={step} setStep={(s) => { if(s < step) setStep(s) }} />
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 p-6 md:p-10 flex flex-col">
            <div className="flex-1">
                {step === AppStep.IDEA && renderIdeaStep()}
                {step === AppStep.AGENT && renderAgentStep()}
                {step === AppStep.GOAL && renderGoalStep()}
                {step === AppStep.DETAILS && renderDetailsStep()}
                {step === AppStep.RESULT && renderResultStep()}
            </div>
        </div>

        {/* Footer Navigation */}
        {step !== AppStep.RESULT && (
            <div className="p-6 md:p-10 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center">
                <button
                    onClick={prevStep}
                    disabled={step === AppStep.IDEA}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                        ${step === AppStep.IDEA ? 'opacity-0 cursor-default' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                    <ArrowLeft size={18} /> Voltar
                </button>

                {step === AppStep.DETAILS ? (
                     <button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                        {isLoading ? 'Gerando...' : 'Criar Prompt Perfeito'}
                    </button>
                ) : (
                    <button
                        onClick={nextStep}
                        disabled={isNextDisabled()}
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all
                            ${isNextDisabled() 
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                                : 'bg-white text-indigo-900 hover:bg-indigo-50 shadow-lg shadow-white/10'}`}
                    >
                        Próximo <ArrowRight size={18} />
                    </button>
                )}
            </div>
        )}
      </main>

      <footer className="mt-8 text-slate-500 text-sm">
        Powered by Gemini API • Developed with React & Tailwind
      </footer>

      {/* Styles specifically for this component instance */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5); 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.8); 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.5); 
        }
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
