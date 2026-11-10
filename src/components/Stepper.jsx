import React from 'react';

export default function Stepper({ currentStep = 1, onStepClick }) {
  const steps = [
    { number: 1, label: 'Search / Upload' },
    { number: 2, label: 'Verify & Edit' },
    { number: 3, label: 'Charges' },
    { number: 4, label: 'Review' },
    { number: 5, label: 'Complete' },
  ];

  return (
    <div className="w-full flex items-center justify-between max-w-5xl mx-auto px-4 py-2 select-none">
      {steps.map((step, idx) => {
        const isActive = step.number === currentStep;
        const isPast = step.number < currentStep;

        return (
          <React.Fragment key={step.number}>
            {/* Step Item */}
            <div
              onClick={() => onStepClick && onStepClick(step.number)}
              className="flex items-center gap-3 cursor-pointer group relative py-2"
            >
              {/* Number Circle */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#0062ff] text-white shadow-sm'
                    : isPast
                    ? 'bg-[#0062ff] text-white'
                    : 'text-gray-500 font-medium'
                }`}
              >
                {step.number}
              </div>

              {/* Step Label */}
              <div className="relative">
                <span
                  className={`text-[15px] whitespace-nowrap transition-colors ${
                    isActive
                      ? 'font-bold text-[#0062ff]'
                      : 'font-medium text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {step.label}
                </span>

                {/* Blue Underline indicator for active step (exactly like in screenshot) */}
                {isActive && (
                  <div className="absolute -bottom-2.5 left-0 right-0 h-[2.5px] bg-[#0062ff] rounded-full" />
                )}
              </div>
            </div>

            {/* Connecting Line between steps */}
            {idx < steps.length - 1 && (
              <div className="flex-1 mx-3 sm:mx-5">
                <div className="h-[1.5px] w-full bg-gray-300" />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

