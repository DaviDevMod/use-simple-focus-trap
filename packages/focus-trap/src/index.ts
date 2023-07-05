import type { Roots, TrapConfig, NormalisedTrapConfig } from './state.js';
import { build, resume, demolish, pause } from './trap-actions.js';
import { state } from './state.js';

type TrapAction = 'RESUME' | 'DEMOLISH' | 'PAUSE';

type TrapArg = Roots | TrapConfig | TrapAction;

export const focusTrap = (arg: TrapArg): NormalisedTrapConfig => {
  const result =
    typeof arg !== 'string'
      ? build(Array.isArray(arg) ? { roots: arg } : arg)
      : arg === 'DEMOLISH'
      ? demolish()
      : arg === 'PAUSE'
      ? pause()
      : resume();

  if (result.isErr) throw new Error(result.error);

  // There must be a config, otherwise an error would have been thrown.
  return { ...state.normalisedConfig! };
};

export type { TrapArg, Roots, TrapConfig, TrapAction, NormalisedTrapConfig };
