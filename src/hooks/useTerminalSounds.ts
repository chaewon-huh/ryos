import { useCallback } from "react";
import { useAppStore } from "@/stores/useAppStore";

const noop = (..._args: unknown[]) => {};

/**
 * Shimmed hook that preserves the previous API surface while disabling all
 * audio processing. Components can keep calling these helpers without
 * triggering any Tone.js pipelines.
 */
export function useTerminalSounds() {
  const terminalSoundsEnabled = useAppStore((s) => s.terminalSoundsEnabled);
  const setTerminalSoundsEnabled = useAppStore(
    (s) => s.setTerminalSoundsEnabled
  );

  const toggleMute = useCallback(() => {
    setTerminalSoundsEnabled(!useAppStore.getState().terminalSoundsEnabled);
  }, [setTerminalSoundsEnabled]);

  return {
    playCommandSound: noop,
    playErrorSound: noop,
    playAiResponseSound: noop,
    playElevatorMusic: noop,
    stopElevatorMusic: noop,
    playDingSound: noop,
    playMooSound: noop,
    toggleMute,
    isMuted: !terminalSoundsEnabled,
  };
}
