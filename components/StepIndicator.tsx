import React from 'react';
import { AppStep } from '../types';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: AppStep;
  setStep: (step: AppStep) => void;
}

const steps = [
  { id: AppStep.IDEA, label: 'Ideia' },
  { id: AppStep.AGENT, label: 'Agente' },
  { id: AppStep.GOAL, label: 'Objetivo' },
  { id: AppStep.DETAILS, label: 'Detalhes' },
  { id: AppStep.RESULT, label: 'Resultado' },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, setStep }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-800 rounded-full -z-10"></div>
        <div 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-indigo-500 rounded-full -z-10 transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center group cursor-default">
              <div 
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-slate-900 
                  ${isCompleted ? 'border-indigo-500 bg-indigo-500 text-white' : 
                    isCurrent ? 'border-indigo-400 text-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.5)]' : 
                    'border-slate-600 text-slate-600'}`}
              >
                {isCompleted ? <Check size={16} /> : <span className="text-sm font-bold">{step.id + 1}</span>}
              </div>
              <span className={`hidden md:block absolute top-12 text-xs font-medium transition-colors duration-300
                ${isCurrent || isCompleted ? 'text-indigo-200' : 'text-slate-600'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
