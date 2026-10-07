"use client";

import { Check } from "lucide-react";

export type StepId = "upload" | "cek" | "params" | "rab" | "offer";

export interface StepDef {
  id: StepId;
  label: string;
  done: boolean;
  disabled: boolean;
}

export function Stepper({
  steps,
  active,
  onSelect,
}: {
  steps: StepDef[];
  active: StepId;
  onSelect: (id: StepId) => void;
}) {
  const activeIndex = steps.findIndex((s) => s.id === active);
  return (
    <nav className="stepper no-print" aria-label="Langkah pengerjaan">
      <div className="stepper-progress" aria-hidden="true">
        <div className="stepper-progress-fill" style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }} />
      </div>
      <ol>
        {steps.map((s, i) => {
          const isActive = s.id === active;
          const state = isActive ? "active" : s.done ? "done" : "todo";
          return (
            <li key={s.id}>
              <button
                type="button"
                className="step"
                data-state={state}
                disabled={s.disabled}
                aria-current={isActive ? "step" : undefined}
                onClick={() => onSelect(s.id)}
              >
                <span className="step-dot">{s.done && !isActive ? <Check size={14} strokeWidth={3} /> : i + 1}</span>
                <span className="step-label">{s.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
